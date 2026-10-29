/** One read-only pass for authorized account C. Does not visit /notifications. */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('..', 'raw', 'production-inventory.json');
const PASSWORD = process.env.NL_PASSWORD || '';
const EMAIL = 'rahul.desai@nestlancer.com';
if (!PASSWORD) process.exit(2);
const ALLOW = /^\/(dashboard|requests|projects|quotes|messages|payments|invoices|profile|settings)(\/|$)/;
const SKIP = /\/notifications(\/|$)|\/messages\/(?!new\/direct|inbox)[^/]+|download|delete|approve|pay|create-intent|logout/i;

function scrub(value, limit = 140) {
  let s = String(value ?? '');
  if (PASSWORD) s = s.split(PASSWORD).join('[redacted]');
  s = s.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[email]');
  s = s.replace(/[₹$€£]\s?[\d,]+(?:\.\d+)?/g, '[amount]');
  s = s.replace(/\b(?:arjun(?:\.mehta)?|samira(?:\.patel)?|rahul(?:\.desai)?|mehta|patel|desai)\b/gi, '[account]');
  return s.replace(/\s+/g, ' ').trim().slice(0, limit);
}
function pattern(raw) {
  const u = new URL(raw, 'https://app.nestlancer.com');
  return u.pathname.split('/').map((seg) => !seg ? seg : (/[0-9]/.test(seg) || seg.length > 18 ? ':id' : seg.toLowerCase())).join('/');
}
async function snap(page) {
  const raw = await page.evaluate(() => {
    const label = (el) => (el.getAttribute('aria-label') || el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 70);
    return {
      title: document.title,
      headings: [...document.querySelectorAll('h1,h2')].slice(0, 6).map((h) => `${h.tagName}:${label(h)}`),
      tabs: [...document.querySelectorAll('[role="tab"]')].map(label).slice(0, 10),
      links: [...document.querySelectorAll('a[href]')].slice(0, 200).map((a) => a.getAttribute('href')),
      hScroll: document.documentElement.scrollWidth - innerWidth,
      h1: !!document.querySelector('h1'),
    };
  });
  return { ...raw, headings: raw.headings.map(scrub), tabs: raw.tabs.map(scrub), path: pattern(page.url()) };
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce', timezoneId: 'Asia/Kolkata', locale: 'en-IN' });
const page = await context.newPage();
page.on('dialog', (d) => d.dismiss());
const posts = [];
page.on('response', (res) => {
  const req = res.request();
  if (!/nestlancer\.com$/.test(new URL(res.url()).hostname)) return;
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method())) posts.push(`${req.method()} ${pattern(res.url())} ${res.status()}`);
});
const record = { id: 'C', login: null, pages: [], mobile: [], checks: {}, logout: null, posts: [] };
try {
  await page.goto('https://app.nestlancer.com/login', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForSelector('#email', { timeout: 15000 });
  await page.waitForTimeout(1500);
  const dismiss = page.getByRole('button', { name: /^Dismiss$/ });
  if (await dismiss.count()) await dismiss.click().catch(() => {});
  if (await page.locator('[data-testid="turnstile-widget"]').count()) {
    const ready = await page.waitForFunction(() => {
      const w = document.querySelector('[data-testid="turnstile-widget"]');
      return w && !/Loading security check|didn't load/i.test(w.innerText || '');
    }, { timeout: 20000 }).then(() => true).catch(() => false);
    if (!ready) record.login = { ok: false, blocked: true, detail: 'security check did not complete; not bypassed' };
  }
  if (!record.login) {
    await page.locator('#email').fill(EMAIL);
    await page.locator('#password').fill(PASSWORD);
    if (await page.locator('#rememberMe').isChecked().catch(() => false)) await page.locator('#rememberMe').uncheck();
    const pending = page.waitForResponse((r) => r.url().includes('/api/auth/login') && r.request().method() === 'POST', { timeout: 20000 }).catch(() => null);
    await page.locator('form button[type="submit"]').click();
    const response = await pending;
    if (!response) {
      const alert = await page.locator('[role="alert"]').allTextContents().catch(() => []);
      record.login = { ok: false, detail: scrub(alert.join(' ') || 'sign-in form did not reach the login endpoint', 160) };
    } else if (response.status() >= 200 && response.status() < 400) {
      await page.waitForURL((u) => !u.pathname.includes('/login'), { timeout: 15000 }).catch(() => {});
      record.login = page.url().includes('/login') ? { ok: false, http: response.status(), detail: 'shell did not open' } : { ok: true, http: response.status(), landing: pattern(page.url()) };
    } else {
      let detail = `HTTP ${response.status()}`;
      try { const data = await response.json(); detail = data?.error?.message || data?.message || detail; } catch {}
      record.login = { ok: false, http: response.status(), detail: scrub(detail, 160) };
    }
  }
  if (record.login.ok) {
    const search = page.getByRole('button', { name: /search/i }).first();
    if (await search.count()) {
      await search.click({ timeout: 4000 }).catch(() => {});
      await page.waitForTimeout(500);
      record.checks.search = await page.evaluate(() => ({
        opened: !!document.querySelector('[role="dialog"], [cmdk-root], input[placeholder*="Search" i]'),
        input: !!document.querySelector('[role="dialog"] input, input[placeholder*="Search" i]'),
      }));
      await page.keyboard.press('Escape');
    }
    const queue = ['https://app.nestlancer.com/dashboard'];
    const seen = new Set();
    while (queue.length && record.pages.length < 16) {
      const abs = queue.shift();
      const pat = pattern(abs);
      if (seen.has(pat) || SKIP.test(pat) || !ALLOW.test(pat)) continue;
      seen.add(pat);
      const res = await page.goto(abs, { waitUntil: 'domcontentloaded', timeout: 25000 }).catch((err) => ({ status: () => 0, err }));
      await page.waitForSelector('h1, main', { timeout: 8000 }).catch(() => {});
      if (page.url().includes('/login')) { record.pages.push({ path: pat, outcome: 'denied' }); break; }
      const s = await snap(page);
      record.pages.push({ path: s.path, outcome: 'reviewed', http: typeof res.status === 'function' ? res.status() : null, headings: s.headings, tabs: s.tabs, hScroll: s.hScroll, h1: s.h1 });
      if (pat === '/settings/account') {
        record.checks.settingsTabs = [];
        for (const tab of ['Security', 'Notifications', 'Files', 'Activity']) {
          const loc = page.getByRole('tab', { name: tab });
          if (!(await loc.count())) { record.checks.settingsTabs.push({ tab, outcome: 'not found' }); continue; }
          await loc.first().click({ timeout: 4000 }).catch(() => {});
          await page.waitForTimeout(500);
          const panel = await snap(page);
          record.checks.settingsTabs.push({ tab, path: panel.path, headings: panel.headings, hScroll: panel.hScroll });
        }
      }
      if (record.pages.length < 16) {
        const hrefs = await page.locator('a[href]').evaluateAll((els) => els.map((a) => a.getAttribute('href')).filter(Boolean));
        let details = 0;
        for (const href of hrefs) {
          let absNext; try { absNext = new URL(href, 'https://app.nestlancer.com'); } catch { continue; }
          if (absNext.origin !== 'https://app.nestlancer.com') continue;
          const next = pattern(absNext.pathname);
          if (!ALLOW.test(next) || SKIP.test(next) || seen.has(next) || queue.includes(absNext.origin + absNext.pathname)) continue;
          const detail = next.includes(':id');
          if (detail && /\/messages|\/notifications/.test(next)) continue;
          if (detail && details >= 1) continue;
          if (detail) details += 1;
          queue.push(absNext.origin + absNext.pathname);
        }
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    for (const root of ['/dashboard', '/requests', '/projects', '/settings/account']) {
      await page.goto('https://app.nestlancer.com' + root, { waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => {});
      record.mobile.push({ path: root, ...(await page.evaluate(() => ({ hScroll: document.documentElement.scrollWidth - innerWidth, h1: !!document.querySelector('h1'), menu: [...document.querySelectorAll('button')].some((b) => /menu|navigation/i.test(`${b.getAttribute('aria-label') || ''} ${b.innerText || ''}`)) }))) });
    }
    const accountBtn = page.getByRole('button', { name: /^Account$/ }).first();
    if (await accountBtn.count()) {
      await accountBtn.click({ timeout: 3000 }).catch(() => {});
      record.checks.accountMenu = (await page.getByRole('menuitem').allTextContents().catch(() => [])).map(scrub);
    }
    const logout = page.getByRole('button', { name: /log\s*out|sign\s*out/i }).or(page.getByRole('menuitem', { name: /log\s*out|sign\s*out/i })).or(page.getByRole('link', { name: /log\s*out|sign\s*out/i }));
    if (await logout.count()) {
      await logout.first().click({ timeout: 4000 }).catch(() => {});
      await page.waitForTimeout(800);
    }
    if (!page.url().includes('/login')) {
      const status = await page.evaluate(async () => (await fetch('/api/auth/logout', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: '{}' })).status).catch(() => 0);
      record.logout = { ok: status >= 200 && status < 400, detail: 'visible logout control not confirmed; app logout endpoint used', http: status };
    } else record.logout = { ok: true, detail: 'returned to sign-in' };
  }
} finally {
  record.posts = [...new Set(posts)];
  await context.close();
  await browser.close();
}
const data = JSON.parse(fs.readFileSync(OUT, 'utf8'));
data.accounts = data.accounts.filter((a) => a.id !== 'C').concat(record);
data.account_c_pass = 'single corrected attempt; notifications route not opened';
const text = JSON.stringify(data, null, 2);
if (text.includes(PASSWORD)) throw new Error('credential in output');
fs.writeFileSync(OUT, text + '\n');
console.log(JSON.stringify({ login: record.login, pages: record.pages.map((p) => p.path), logout: record.logout, posts: record.posts, search: record.checks.search, tabs: record.checks.settingsTabs }));
