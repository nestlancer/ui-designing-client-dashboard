/**
 * Read-only production inventory. Credentials stay in the environment.
 * No screenshots, traces, storage state, response bodies, or field values are saved.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const axeSource = fs.readFileSync(require.resolve('axe-core'), 'utf8');
const OUT = path.resolve('..', 'raw', 'production-inventory.json');
const PASSWORD = process.env.NL_PASSWORD || '';
const ACCOUNTS = [
  { id: 'A', email: 'arjun.mehta@nestlancer.com' },
  { id: 'B', email: 'samira.patel@nestlancer.com' },
  { id: 'C', email: 'rahul.desai@nestlancer.com' },
];
if (!PASSWORD) {
  console.error('credential env missing; refusing to start');
  process.exit(2);
}

const KEEP = new Set(`dashboard home requests new projects quotes messages inbox thread direct payments methods invoices notifications profile edit settings account activity security files search billing checkout portfolio help support login signup auth api v1 users me preferences status stats health overview archive center documents contracts receipts sessions channels privacy terms blog work notifications`.split(/\s+/));
const SKIP_PATH = /\/(logout|sign-out|signout|download|delete|approve|reject|upload|export|create-intent|bank-transfer|webhook|change-password)(\/|$)/i;
const SKIP_LABEL = /^(pay|pay now|send|submit|approve|delete|upload|purchase|accept|decline|confirm|save|update|enable|disable|remove|download|export|mark all|mark as)\b/i;
const CHROME = new Set(`overview dashboard requests request projects project quotes quote messages message billing invoices invoice notifications notification profile settings account security files file new search portfolio blog payment payments method methods checkout status work hub awaiting you workspace vitals live workbench recent activity to review inbox pay now dark mode light mode collapse sidebar open navigation menu signed in filter sort all active pending completed issued overdue unread read archive details milestones deliverables progress documents contracts preferences sessions appearance language timezone password factor channels back edit cancel close menu main explore theme help support skip content create view issued draft sent received general privacy data export danger zone two step verification authenticator backup codes sessions devices profile edit save changes not activated`.split(/\s+/));

function scrub(value, limit = 160) {
  let s = String(value ?? '');
  if (PASSWORD) s = s.split(PASSWORD).join('[redacted]');
  s = s.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[email]');
  s = s.replace(/\b(?:\+?\d[\d\s().-]{8,}\d)\b/g, '[phone]');
  s = s.replace(/[₹$€£]\s?[\d,]+(?:\.\d+)?/g, '[amount]');
  s = s.replace(/\b\d{1,3}(?:,\d{3})+(?:\.\d+)?\b/g, '[number]');
  s = s.replace(/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi, ':id');
  s = s.replace(/Bearer\s+\S+/gi, 'Bearer [redacted]');
  s = s.replace(/eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, '[jwt]');
  s = s.replace(/\b(?:arjun(?:\.mehta)?|samira(?:\.patel)?|rahul(?:\.desai)?|mehta|patel|desai)\b/gi, '[account]');
  return s.replace(/\s+/g, ' ').trim().slice(0, limit);
}

function safeLabel(value) {
  const s = scrub(value, 80);
  if (!s) return '';
  if (/\[email\]|\[phone\]|\[amount\]|\[jwt\]|\[redacted\]/.test(s)) return '[content omitted]';
  const words = s.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, ' ').split(/\s+/).filter(Boolean);
  if (!words.length || words.length > 6) return '[content omitted]';
  if (words.every((w) => CHROME.has(w) || /^\d+$/.test(w))) return s;
  return '[content omitted]';
}

function patternPath(raw) {
  let pathname = String(raw || '/');
  try { pathname = new URL(raw, 'https://app.nestlancer.com').pathname; } catch { /* keep */ }
  return pathname.split('/').map((seg) => {
    if (!seg) return seg;
    const low = decodeURIComponent(seg).toLowerCase();
    if (KEEP.has(low)) return low;
    if (/[0-9@%]/.test(low) || low.length > 18) return ':id';
    if (/mehta|patel|desai|arjun|samira|rahul/i.test(low)) return ':account';
    return low;
  }).join('/') || '/';
}

function absolute(raw) {
  const u = new URL(raw, 'https://app.nestlancer.com');
  if (u.origin !== 'https://app.nestlancer.com') return null;
  return u.origin + u.pathname;
}

const report = {
  schema: 'nestlancer-production-readonly-inventory',
  url: 'https://app.nestlancer.com/',
  started_at: new Date().toISOString(),
  mode: 'read-only; no screenshots; no stored sessions; no mutating controls activated',
  prior_pass: 'A corrected navigation bug left the first authenticated pass with only /dashboard actually reviewed. This file replaces that incomplete crawl. The earlier local session was closed without a visible logout control.',
  accounts: [],
  stopped_reason: null,
};

function save() {
  const text = JSON.stringify(report, null, 2);
  if (PASSWORD && text.includes(PASSWORD)) throw new Error('refusing to write output that contains the credential');
  if (/set-cookie|authorization:\s*bearer|document\.cookie/i.test(text)) throw new Error('refusing to write session material');
  fs.writeFileSync(OUT, text + '\n');
}

async function axeSummary(page) {
  try {
    await page.evaluate(axeSource);
    return await page.evaluate(async () => {
      const r = await window.axe.run(document, { resultTypes: ['violations'] });
      return r.violations.slice(0, 15).map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length }));
    });
  } catch (err) {
    return [{ id: 'axe-not-run', impact: null, nodes: 0, note: scrub(err.message, 80) }];
  }
}

async function snapshot(page) {
  return page.evaluate(() => {
    const visible = (el) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return r.width > 1 && r.height > 1 && s.visibility !== 'hidden' && s.display !== 'none';
    };
    const label = (el) => (el.getAttribute('aria-label') || [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join(' ') || el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 80);
    return {
      title: document.title,
      headings: [...document.querySelectorAll('h1,h2')].slice(0, 8).map((h) => `${h.tagName} ${label(h)}`),
      tabs: [...document.querySelectorAll('[role="tab"]')].filter(visible).slice(0, 12).map(label),
      headers: [...document.querySelectorAll('th')].slice(0, 12).map(label),
      buttons: [...document.querySelectorAll('button')].filter(visible).slice(0, 40).map(label),
      links: [...document.querySelectorAll('a[href]')].slice(0, 300).map((a) => ({ label: label(a), href: a.getAttribute('href'), inNav: !!a.closest('nav,header,aside,[role="navigation"]'), visible: visible(a) })),
      inputs: [...document.querySelectorAll('input,textarea,select')].slice(0, 24).map((el) => ({ type: el.getAttribute('type') || el.tagName.toLowerCase(), name: el.getAttribute('name') || el.getAttribute('aria-label') || el.id || '' })),
      hScroll: document.documentElement.scrollWidth - window.innerWidth,
      hasMain: !!document.querySelector('main'),
      skip: !!document.querySelector('a[href="#main"], a[href="#content"], a[href*="main"]'),
      sidebar: [...document.querySelectorAll('nav a, aside a')].some(visible),
      alerts: [...document.querySelectorAll('[role="alert"],[role="status"]')].slice(0, 4).map(label),
    };
  });
}

function pack(snap) {
  const links = snap.links.map((l) => ({ ...l, label: safeLabel(l.label), href: patternPath(l.href || ''), raw: l.href || '' }));
  return {
    path: patternPath(snap.path || ''),
    title: safeLabel(snap.title) || '[title omitted]',
    headings: snap.headings.map((h) => { const m = h.match(/^(H\d)\s*(.*)$/); return `${m?.[1] || 'H'} ${safeLabel(m?.[2] || h) || '[content omitted]'}`; }),
    tabs: snap.tabs.map(safeLabel).filter(Boolean),
    headers: snap.headers.map(safeLabel).filter(Boolean),
    buttons: [...new Set(snap.buttons.map(safeLabel).filter((x) => x && x !== '[content omitted]'))].slice(0, 20),
    nav: links.filter((l) => l.inNav).slice(0, 40).map(({ label, href }) => ({ label, href })),
    inputs: snap.inputs.map((i) => ({ type: scrub(i.type, 24), name: safeLabel(i.name) || '[name omitted]' })),
    hScroll: snap.hScroll,
    hasMain: snap.hasMain,
    skip: snap.skip,
    sidebar: snap.sidebar,
    alerts: snap.alerts.map(safeLabel).filter(Boolean),
    discovered: links,
  };
}

async function dismissCookieNote(page) {
  if (!(await page.getByText('essential cookies', { exact: false }).count())) return;
  const dismiss = page.getByRole('button', { name: /^Dismiss$/ });
  if (await dismiss.count()) await dismiss.click({ timeout: 3000 }).catch(() => {});
}

async function login(page, account) {
  await page.goto('https://app.nestlancer.com/login', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForSelector('#email', { timeout: 15000 });
  await page.waitForTimeout(1000);
  if (/just a moment|attention required/i.test(await page.title())) return { ok: false, blocked: true, detail: 'access interstitial; not bypassed' };
  await dismissCookieNote(page);
  if (await page.locator('[data-testid="turnstile-widget"]').count()) {
    const ready = await page.waitForFunction(() => {
      const w = document.querySelector('[data-testid="turnstile-widget"]');
      return w && !/Loading security check|didn't load/i.test(w.innerText || '');
    }, { timeout: 20000 }).then(() => true).catch(() => false);
    if (!ready) return { ok: false, blocked: true, detail: 'security check did not complete; not bypassed' };
  }
  await page.locator('#email').fill(account.email);
  await page.locator('#password').fill(PASSWORD);
  if (await page.locator('#rememberMe').isChecked().catch(() => false)) await page.locator('#rememberMe').uncheck();
  const pending = page.waitForResponse((r) => r.url().includes('/api/auth/login') && r.request().method() === 'POST', { timeout: 20000 }).catch(() => null);
  await page.locator('form button[type="submit"]').click();
  const response = await pending;
  if (!response) {
    const alert = await page.locator('[role="alert"]').allTextContents().catch(() => []);
    return { ok: false, detail: scrub(alert.join(' ') || 'sign-in form did not reach the login endpoint', 160) };
  }
  const http = response.status();
  if (http === 429) return { ok: false, blocked: true, http, detail: 'sign-in rate limited; stopped' };
  if (http >= 200 && http < 400) {
    await page.waitForURL((u) => !u.pathname.includes('/login'), { timeout: 15000 }).catch(() => {});
    const body = await page.locator('main').innerText().catch(() => '');
    if (/two-factor|verification code|authenticator|one-time/i.test(body)) return { ok: false, blocked: true, http, detail: 'second factor requested; not bypassed' };
    if (page.url().includes('/login')) return { ok: false, http, detail: 'login response was not an error but the shell did not open' };
    return { ok: true, http, landing: patternPath(page.url()) };
  }
  let detail = `sign-in endpoint returned HTTP ${http}`;
  try {
    const data = await response.json();
    detail = data?.error?.message || data?.message || detail;
  } catch { /* status only */ }
  return { ok: false, blocked: http === 403, http, detail: scrub(detail, 160) };
}

async function logout(page) {
  const name = /log\s*out|sign\s*out/i;
  async function clickNamed() {
    for (const role of ['menuitem', 'button', 'link']) {
      const loc = page.getByRole(role, { name });
      if (await loc.count()) {
        await loc.first().click({ timeout: 4000 });
        return true;
      }
    }
    return false;
  }
  if (!(await clickNamed())) {
    const buttons = page.locator('header button, [role="banner"] button');
    const n = Math.min(await buttons.count(), 12);
    for (let i = 0; i < n; i++) {
      const el = buttons.nth(i);
      const label = `${await el.getAttribute('aria-label') || ''} ${await el.innerText() || ''}`;
      if (/search|dark|light|notification|collapse|navigation|menu|billing/i.test(label)) continue;
      if (/account|profile|user|^[A-Z]{1,3}\b/.test(label) || (label.trim().length > 0 && label.trim().length < 48)) {
        await el.click({ timeout: 3000 }).catch(() => {});
        await page.waitForTimeout(300);
        if (await clickNamed()) break;
      }
    }
  }
  if (!(await page.url().includes('/login'))) {
    const confirm = page.getByRole('button', { name });
    if (await confirm.count()) await confirm.first().click({ timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(800);
  }
  if (!page.url().includes('/login')) {
    const status = await page.evaluate(async () => {
      const res = await fetch('/api/auth/logout', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: '{}' });
      return res.status;
    }).catch(() => 0);
    return { ok: status >= 200 && status < 400, detail: status ? 'visible logout control not found; app logout endpoint used' : 'logout not confirmed', http: status || null };
  }
  return { ok: true, detail: 'returned to sign-in' };
}

async function reviewAccount(browser, account, deep) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce', timezoneId: 'Asia/Kolkata', locale: 'en-IN', colorScheme: 'light' });
  const page = await context.newPage();
  const api = new Map();
  page.on('response', (res) => {
    try {
      const u = new URL(res.url());
      if (!/nestlancer\.com$/.test(u.hostname) || !u.pathname.includes('/api/')) return;
      const key = `${res.request().method()} ${u.hostname === 'app.nestlancer.com' ? '' : u.hostname}${patternPath(u.pathname)}`;
      if (!api.has(key)) api.set(key, res.status());
    } catch { /* ignore */ }
  });
  const record = { id: account.id, login: null, pages: [], mobile: [], checks: {}, logout: null, api: [] };
  try {
    record.login = await login(page, account);
    if (!record.login.ok) return record;
    const queue = [page.url()];
    const seen = new Set();
    const detailSeen = new Set();
    while (queue.length && record.pages.length < (deep ? 22 : 14)) {
      const target = queue.shift();
      const abs = absolute(target);
      const pat = patternPath(abs || target);
      if (!abs || seen.has(pat) || SKIP_PATH.test(pat)) continue;
      seen.add(pat);
      let http = null;
      try {
        if (patternPath(page.url()) !== pat) {
          const res = await page.goto(abs, { waitUntil: 'domcontentloaded', timeout: 25000 });
          http = res ? res.status() : null;
        }
        await page.waitForSelector('h1, h2, main', { timeout: 8000 }).catch(() => {});
      } catch (err) {
        record.pages.push({ path: pat, outcome: 'unavailable', detail: scrub(err.message, 120) });
        continue;
      }
      if (page.url().includes('/login')) { record.pages.push({ path: pat, outcome: 'denied', http }); continue; }
      const raw = await snapshot(page);
      raw.path = page.url();
      const snap = pack(raw);
      const axe = deep && record.pages.filter((p) => p.axe).length < 8 ? await axeSummary(page) : null;
      record.pages.push({ path: snap.path, outcome: http && http >= 400 ? 'http-error' : 'reviewed', http, title: snap.title, headings: snap.headings, tabs: snap.tabs, headers: snap.headers, buttons: snap.buttons, nav: snap.nav, inputs: snap.inputs, hScroll: snap.hScroll, hasMain: snap.hasMain, skip: snap.skip, sidebar: snap.sidebar, alerts: snap.alerts, axe });
      for (const link of snap.discovered) {
        if (!link.raw || link.raw.startsWith('#') || SKIP_PATH.test(link.href) || SKIP_LABEL.test(link.label)) continue;
        const next = absolute(link.raw);
        if (!next) continue;
        const nextPat = patternPath(next);
        if (seen.has(nextPat) || queue.includes(next)) continue;
        const isDetail = /\/:id$/.test(nextPat) || (nextPat.split('/').includes(':id'));
        if (isDetail && (/^\/messages/.test(nextPat) || /^\/notifications/.test(nextPat))) continue;
        if (isDetail && detailSeen.has(nextPat.replace(/\/:id/g, ''))) continue;
        if (isDetail) detailSeen.add(nextPat.replace(/\/:id/g, ''));
        if (queue.length < 30) queue.push(next);
      }
    }
    if (deep) {
      const search = page.getByRole('button', { name: /search/i }).first();
      if (await search.count()) {
        await search.click({ timeout: 3000 }).catch(() => {});
        await page.waitForTimeout(400);
        record.checks.search = await page.evaluate(() => {
          const dialog = document.querySelector('[role="dialog"], [role="combobox"]');
          const input = document.querySelector('[role="dialog"] input, [role="combobox"], input[placeholder*="Search" i]');
          return { opened: !!(dialog || input), input: !!(input) };
        });
        await page.keyboard.press('Escape');
      } else record.checks.search = { opened: false, input: false };
      record.checks.themeControl = await page.getByRole('button', { name: /dark mode|light mode|theme/i }).count().then((n) => n > 0);
      record.checks.focus = [];
      await page.goto('https://app.nestlancer.com/dashboard', { waitUntil: 'domcontentloaded' });
      for (let i = 0; i < 8; i++) {
        await page.keyboard.press('Tab');
        record.checks.focus.push(await page.evaluate(() => {
          const el = document.activeElement;
          if (!el || el === document.body) return { tag: 'BODY' };
          const s = getComputedStyle(el);
          return { tag: el.tagName, role: el.getAttribute('role'), type: el.getAttribute('type'), outline: s.outlineStyle, inChrome: !!el.closest('nav,header,aside') };
        }));
      }
    }
    const roots = [...new Set(record.pages.filter((p) => p.outcome === 'reviewed').map((p) => '/' + p.path.split('/').filter(Boolean)[0]))].filter(Boolean).slice(0, 8);
    await page.setViewportSize({ width: 390, height: 844 });
    for (const root of roots) {
      try {
        await page.goto('https://app.nestlancer.com' + root, { waitUntil: 'domcontentloaded', timeout: 20000 });
        await page.waitForSelector('h1, main', { timeout: 6000 }).catch(() => {});
        const box = await page.evaluate(() => ({
          hScroll: document.documentElement.scrollWidth - innerWidth,
          menu: [...document.querySelectorAll('button')].some((b) => /menu|navigation/i.test(`${b.getAttribute('aria-label') || ''} ${b.innerText || ''}`) && b.getBoundingClientRect().width > 0),
          h1: !!document.querySelector('h1'),
        }));
        record.mobile.push({ path: patternPath(page.url()), outcome: page.url().includes('/login') ? 'denied' : 'reviewed', ...box });
      } catch (err) {
        record.mobile.push({ path: root, outcome: 'unavailable', detail: scrub(err.message, 80) });
      }
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    record.logout = await logout(page);
    record.api = [...api.entries()].sort().slice(0, 100).map(([key, status]) => ({ key, status }));
  } finally {
    await context.close();
  }
  return record;
}

const browser = await chromium.launch({ headless: true });
try {
  const only = (process.env.NL_ONLY || '').split(',').filter(Boolean);
  for (const account of ACCOUNTS.filter((a) => !only.length || only.includes(a.id))) {
    if (report.stopped_reason) break;
    const rec = await reviewAccount(browser, account, account.id === 'A');
    report.accounts.push(rec);
    save();
    console.log(JSON.stringify({ account: account.id, login: !!(rec.login && rec.login.ok), pages: rec.pages.length, blocked: !!(rec.login && rec.login.blocked), logout: rec.logout && rec.logout.ok }));
    if (rec.login && rec.login.blocked) { report.stopped_reason = rec.login.detail; break; }
  }
} finally {
  report.finished_at = new Date().toISOString();
  save();
  await browser.close();
}
console.log('wrote', OUT);
