/** Read-only structural probe for production page ranking. No screenshots or field values. */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('..', 'raw', 'production-page-observations.json');
const PASSWORD = process.env.NL_PASSWORD || '';
if (!PASSWORD) process.exit(2);
const EMAIL = 'arjun.mehta@nestlancer.com';
const SKIP_CLICK = /^(pay|pay now|send|submit|approve|delete|upload|purchase|accept|decline|confirm|save|update|enable|disable|remove|download|export|mark all|mark as)\b/i;

function scrub(value, limit = 90) {
  let s = String(value ?? '');
  if (PASSWORD) s = s.split(PASSWORD).join('[redacted]');
  s = s.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[email]');
  s = s.replace(/[₹$€£]\s?[\d,]+(?:\.\d+)?/g, '[amount]');
  s = s.replace(/\b(?:arjun(?:\.mehta)?|samira(?:\.patel)?|rahul(?:\.desai)?|mehta|patel|desai)\b/gi, '[account]');
  s = s.replace(/\b[0-9a-f]{8}-[0-9a-f-]{20,}\b/gi, ':id');
  return s.replace(/\s+/g, ' ').trim().slice(0, limit);
}
function safe(value) {
  const s = scrub(value, 70);
  if (!s || /\[email\]|\[amount\]|\[account\]|\[redacted\]/.test(s)) return '';
  if (s.split(/\s+/).length > 6) return '';
  return s;
}
function pattern(raw) {
  try {
    const u = new URL(raw, 'https://app.nestlancer.com');
    return u.pathname.split('/').map((seg) => !seg ? seg : (/[0-9]/.test(seg) || seg.length > 18 ? ':id' : seg.toLowerCase())).join('/');
  } catch { return '/'; }
}

async function outline(page) {
  const raw = await page.evaluate(() => {
    const vis = (el) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return r.width > 1 && r.height > 1 && s.visibility !== 'hidden' && s.display !== 'none';
    };
    const text = (el) => (el.getAttribute('aria-label') || el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 80);
    const labels = [...document.querySelectorAll('label')].slice(0, 20).map((el) => text(el));
    return {
      title: document.title.slice(0, 80),
      h1: [...document.querySelectorAll('h1')].slice(0, 2).map(text),
      h2: [...document.querySelectorAll('h2')].slice(0, 6).map(text),
      tabs: [...document.querySelectorAll('[role="tab"]')].filter(vis).slice(0, 12).map(text),
      buttons: [...document.querySelectorAll('button')].filter(vis).slice(0, 24).map(text),
      labels,
      fields: [...document.querySelectorAll('input,textarea,select')].slice(0, 16).map((el) => el.getAttribute('type') || el.tagName.toLowerCase()),
      links: [...document.querySelectorAll('main a[href], [role="main"] a[href]')].slice(0, 40).map((a) => a.getAttribute('href')),
      hScroll: document.documentElement.scrollWidth - innerWidth,
      h1InView: [...document.querySelectorAll('h1')].some((h) => h.getBoundingClientRect().top < 700 && h.getBoundingClientRect().height > 0),
      hasMain: !!document.querySelector('main'),
      dialog: !!document.querySelector('[role="dialog"]'),
      composer: !!document.querySelector('textarea, [contenteditable="true"]'),
      tables: document.querySelectorAll('table').length,
      rows: document.querySelectorAll('tbody tr, [role="row"]').length,
    };
  });
  return {
    path: pattern(page.url()),
    title: safe(raw.title) || '[title omitted]',
    h1: raw.h1.map(safe).filter(Boolean),
    h1Present: raw.h1.some((x) => x.trim()),
    h2: raw.h2.map(safe).filter(Boolean),
    tabs: raw.tabs.map(safe).filter(Boolean),
    buttons: [...new Set(raw.buttons.map(safe).filter(Boolean))].slice(0, 16),
    labels: [...new Set(raw.labels.map(safe).filter(Boolean))].slice(0, 16),
    fields: raw.fields,
    hScroll: raw.hScroll,
    h1InView: raw.h1InView,
    hasMain: raw.hasMain,
    dialog: raw.dialog,
    composer: raw.composer,
    tables: raw.tables,
    rows: raw.rows,
    detailPatterns: [...new Set(raw.links.filter(Boolean).map(pattern).filter((p) => p.includes(':id') && !/messages|notifications|blog/.test(p)))].slice(0, 8),
  };
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce', timezoneId: 'Asia/Kolkata', locale: 'en-IN', colorScheme: 'light' });
const page = await context.newPage();
page.on('dialog', (d) => d.dismiss());
const writes = [];
page.on('response', (res) => {
  const m = res.request().method();
  if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(m)) return;
  if (!/nestlancer\.com$/.test(new URL(res.url()).hostname)) return;
  writes.push(`${m} ${pattern(res.url())} ${res.status()}`);
});
const report = { account: 'A', pages: {}, checks: {}, mobile: {}, writes: [] };
try {
  await page.goto('https://app.nestlancer.com/login', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForSelector('#email');
  await page.waitForTimeout(800);
  const dismiss = page.getByRole('button', { name: /^Dismiss$/ });
  if (await dismiss.count()) await dismiss.click().catch(() => {});
  await page.locator('#email').fill(EMAIL);
  await page.locator('#password').fill(PASSWORD);
  if (await page.locator('#rememberMe').isChecked().catch(() => false)) await page.locator('#rememberMe').uncheck();
  const pending = page.waitForResponse((r) => {
    const u = r.url();
    return r.request().method() === 'POST' && (u.includes('/api/auth/login') || u.endsWith('/login'));
  }, { timeout: 20000 }).catch(() => null);
  await page.locator('form button[type="submit"]').click();
  const response = await pending;
  await page.waitForURL((u) => !u.pathname.includes('/login'), { timeout: 15000 }).catch(() => {});
  const left = !page.url().includes('/login');
  report.login = { ok: left, http: response ? response.status() : null, detail: left ? 'shell opened' : 'still on sign-in' };
  if (!report.login.ok) throw new Error('login failed');

  const search = page.getByRole('button', { name: /search/i }).first();
  if (await search.count()) {
    await search.click({ timeout: 4000 }).catch(() => {});
    await page.waitForTimeout(400);
    report.checks.search = await page.evaluate(() => ({
      dialog: !!document.querySelector('[role="dialog"]'),
      input: !!document.querySelector('[role="dialog"] input, input[placeholder*="Search" i], [role="combobox"]'),
      list: !!document.querySelector('[role="dialog"] [role="listbox"], [role="dialog"] [role="option"], [cmdk-list]'),
    }));
    await page.keyboard.press('Escape');
  } else report.checks.search = { dialog: false, input: false, list: false };
  report.checks.theme = await page.getByRole('button', { name: /dark mode|light mode|theme/i }).count().then((n) => n > 0);

  const payTab = page.getByRole('tab', { name: /^Pay now$/i });
  if (await payTab.count()) {
    await payTab.first().click({ timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(400);
    report.checks.payNowTab = await outline(page);
    await page.keyboard.press('Escape').catch(() => {});
  } else report.checks.payNowTab = { present: false };

  const routes = ['/dashboard','/requests','/requests/new','/projects','/quotes','/messages','/payments','/payments/methods','/invoices','/profile','/settings/account','/settings/security','/settings/notifications','/settings/files','/settings/activity'];
  for (const route of routes) {
    const res = await page.goto('https://app.nestlancer.com' + route, { waitUntil: 'domcontentloaded', timeout: 25000 }).catch(() => null);
    await page.waitForSelector('h1, main', { timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(500);
    const snap = await outline(page);
    snap.http = res ? res.status() : null;
    snap.denied = page.url().includes('/login');
    report.pages[route] = snap;
  }
  // One GET detail per family, no mutating controls.
  const details = [];
  for (const [route, snap] of Object.entries(report.pages)) {
    for (const pat of snap.detailPatterns || []) {
      if (details.some((d) => d.pattern.replace(/\/:id.*/, '') === pat.replace(/\/:id.*/, ''))) continue;
      const hrefs = await page.goto('https://app.nestlancer.com' + route, { waitUntil: 'domcontentloaded' }).then(() => page.locator('a[href]').evaluateAll((els) => els.map((a) => a.getAttribute('href')))).catch(() => []);
      const match = hrefs.find((h) => h && pattern(h) === pat);
      if (!match) continue;
      const abs = new URL(match, 'https://app.nestlancer.com');
      if (abs.origin !== 'https://app.nestlancer.com') continue;
      const res = await page.goto(abs.href, { waitUntil: 'domcontentloaded', timeout: 25000 }).catch(() => null);
      await page.waitForSelector('h1, main', { timeout: 8000 }).catch(() => {});
      const one = await outline(page);
      one.http = res ? res.status() : null;
      one.from = route;
      details.push(one);
    }
  }
  report.details = details;
  // Messages thread only if a conversation link is present. Do not send.
  await page.goto('https://app.nestlancer.com/messages', { waitUntil: 'domcontentloaded' });
  const thread = await page.locator('a[href*="/messages/"]').evaluateAll((els) => els.map((a) => a.getAttribute('href')).filter((h) => h && !/inbox|new/.test(h))).catch(() => []);
  if (thread[0]) {
    const abs = new URL(thread[0], page.url());
    await page.goto(abs.href, { waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(600);
    report.checks.thread = await outline(page);
    report.checks.thread.opened = !page.url().includes('/login');
  } else report.checks.thread = { opened: false, reason: 'no thread link in the messages list' };

  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ['/dashboard','/requests','/projects','/messages','/payments','/settings/account','/profile']) {
    await page.goto('https://app.nestlancer.com' + route, { waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(400);
    report.mobile[route] = await page.evaluate(() => ({
      hScroll: document.documentElement.scrollWidth - innerWidth,
      h1: !!document.querySelector('h1'),
      menu: [...document.querySelectorAll('button')].some((b) => /menu|navigation/i.test(`${b.getAttribute('aria-label') || ''} ${b.innerText || ''}`) && b.getBoundingClientRect().width > 0),
    }));
  }
  const status = await page.evaluate(async () => (await fetch('/api/auth/logout', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: '{}' })).status).catch(() => 0);
  report.logout = { http: status, ok: status >= 200 && status < 400, detail: 'app logout endpoint used if visible control was not required for this probe' };
} catch (err) {
  report.error = scrub(err.message, 160);
} finally {
  report.writes = [...new Set(writes)];
  await context.close();
  await browser.close();
}
const text = JSON.stringify(report, null, 2);
if (PASSWORD && text.includes(PASSWORD)) throw new Error('credential in output');
fs.writeFileSync(OUT, text + '\n');
console.log(JSON.stringify({ login: report.login, pages: Object.keys(report.pages), details: (report.details || []).map((d) => d.path), search: report.checks.search, thread: report.checks.thread && report.checks.thread.path, writes: report.writes, error: report.error }, null, 2));
