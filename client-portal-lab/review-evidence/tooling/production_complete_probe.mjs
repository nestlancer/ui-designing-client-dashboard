/** Complete the unread production routes. No screenshots, values, sends, or payments. */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('..', 'raw', 'production-complete-observations.json');
const PASSWORD = process.env.NL_PASSWORD || '';
if (!PASSWORD) process.exit(2);
const EMAIL = 'arjun.mehta@nestlancer.com';

function scrub(value, limit = 80) {
  let s = String(value ?? '');
  if (PASSWORD) s = s.split(PASSWORD).join('[redacted]');
  s = s.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[email]');
  s = s.replace(/[₹$€£]\s?[\d,]+(?:\.\d+)?/g, '[amount]');
  s = s.replace(/\bNL-[A-Z0-9-]{4,}\b/g, '[document]');
  s = s.replace(/\b(?:arjun|samira|rahul|mehta|patel|desai)\b/gi, '[account]');
  s = s.replace(/\b[0-9a-f]{8}-[0-9a-f-]{20,}\b/gi, ':id');
  return s.replace(/\s+/g, ' ').trim().slice(0, limit);
}
function safe(value) {
  const s = scrub(value);
  if (!s || /\[(email|amount|account|redacted|document)\]/.test(s) || s.split(/\s+/).length > 6) return '';
  return s;
}
function pat(raw) {
  try {
    return new URL(raw, 'https://app.nestlancer.com').pathname.replace(/\/[0-9a-f-]{8,}|\/[^/]*\d[^/]*/gi, '/:id');
  } catch { return '/'; }
}
async function outline(page) {
  const raw = await page.evaluate(() => {
    const text = (el) => (el.getAttribute('aria-label') || el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 70);
    const vis = (el) => el.getBoundingClientRect().height > 0;
    return {
      h1: [...document.querySelectorAll('h1')].slice(0, 2).map(text),
      h2: [...document.querySelectorAll('h2')].slice(0, 8).map(text),
      tabs: [...document.querySelectorAll('[role="tab"]')].filter(vis).slice(0, 12).map(text),
      buttons: [...document.querySelectorAll('main button')].filter(vis).slice(0, 18).map(text),
      labels: [...document.querySelectorAll('main label, main dt, main th')].slice(0, 14).map(text),
      fields: [...document.querySelectorAll('main input, main textarea, main select')].slice(0, 14).map((el) => el.getAttribute('type') || el.tagName.toLowerCase()),
      hScroll: document.documentElement.scrollWidth - innerWidth,
      composer: !!document.querySelector('textarea, [contenteditable="true"]'),
      rows: document.querySelectorAll('main tbody tr, main [role="row"], main article, main li').length,
      empty: /nothing|no (requests|projects|quotes|messages|invoices|files|methods|payments)|empty/i.test(document.querySelector('main')?.innerText || ''),
    };
  });
  return {
    path: pat(page.url()),
    h1: raw.h1.map(safe).filter(Boolean),
    h2: raw.h2.map(safe).filter(Boolean),
    tabs: raw.tabs.map(safe).filter(Boolean),
    buttons: [...new Set(raw.buttons.map(safe).filter(Boolean))].slice(0, 14),
    labels: [...new Set(raw.labels.map(safe).filter(Boolean))].slice(0, 12),
    fields: raw.fields,
    hScroll: raw.hScroll,
    composer: raw.composer,
    rows: raw.rows,
    emptyHint: raw.empty,
  };
}
function remember(bucket, url, json) {
  const list = Array.isArray(json) ? json : json?.data || json?.items || json?.results || json?.conversations || json?.requests || json?.projects || json?.quotes || json?.payments || [];
  const rows = Array.isArray(list) ? list : [];
  const first = rows.find((row) => row && (row.id || row.uuid));
  if (first && !bucket.id) bucket.id = String(first.id || first.uuid);
  bucket.count = rows.length || bucket.count || 0;
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce', timezoneId: 'Asia/Kolkata', locale: 'en-IN' });
const page = await context.newPage();
page.on('dialog', (d) => d.dismiss());
const writes = [];
const ids = { requests: {}, projects: {}, quotes: {}, payments: {}, messages: {} };
page.on('response', async (res) => {
  try {
    const u = new URL(res.url());
    if (!/nestlancer\.com$/.test(u.hostname)) return;
    const method = res.request().method();
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) writes.push(`${method} ${pat(u.pathname)} ${res.status()}`);
    if (method !== 'GET' || res.status() !== 200) return;
    const pathName = u.pathname;
    const key = pathName.includes('/requests') ? 'requests' : pathName.includes('/projects') ? 'projects' : pathName.includes('/quotes') ? 'quotes' : pathName.includes('/payments') && !pathName.includes('/methods') ? 'payments' : pathName.includes('/conversations') ? 'messages' : '';
    if (!key || ids[key].id) return;
    const json = await res.json().catch(() => null);
    if (json) remember(ids[key], pathName, json);
  } catch { /* ignore */ }
});

const report = { pages: {}, writes: [] };
try {
  await page.goto('https://app.nestlancer.com/login', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForSelector('#email', { timeout: 15000 });
  await page.waitForTimeout(1200);
  if (await page.getByRole('button', { name: /^Dismiss$/ }).count()) await page.getByRole('button', { name: /^Dismiss$/ }).click().catch(() => {});
  await page.locator('#email').fill(EMAIL);
  await page.locator('#password').fill(PASSWORD);
  if (await page.locator('#rememberMe').isChecked().catch(() => false)) await page.locator('#rememberMe').uncheck();
  await page.locator('form button[type="submit"]').click();
  await page.waitForURL((u) => !u.pathname.includes('/login'), { timeout: 20000 });
  await page.waitForSelector('h1', { timeout: 12000 });
  report.login = { ok: true, landing: pat(page.url()) };

  async function openDetail(list, key, prefixes) {
    await page.goto('https://app.nestlancer.com' + list, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.waitForSelector('h1', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(1800);
    const listSnap = await outline(page);
    const href = await page.evaluate((prefixes) => {
      const bad = /pay|approve|accept|send|delete|download|upload/i;
      for (const a of document.querySelectorAll('a[href]')) {
        let path = '';
        try { path = new URL(a.href).pathname; } catch { continue; }
        if (!prefixes.some((p) => path.startsWith(p)) || path.endsWith('/new') || path.includes('/methods')) continue;
        const label = (a.getAttribute('aria-label') || a.innerText || '').trim();
        if (bad.test(label)) continue;
        return a.href;
      }
      return '';
    }, prefixes);
    let opened = false;
    if (href) {
      await page.goto(href, { waitUntil: 'domcontentloaded', timeout: 25000 });
      opened = true;
    } else if (ids[key]?.id && /^[A-Za-z0-9-]{8,}$/.test(ids[key].id)) {
      const target = prefixes[0] + ids[key].id;
      await page.goto('https://app.nestlancer.com' + target, { waitUntil: 'domcontentloaded', timeout: 25000 });
      opened = !page.url().includes('/login') && pat(page.url()) !== list;
    }
    await page.waitForSelector('h1, main', { timeout: 8000 }).catch(() => {});
    report.pages[key] = { list: listSnap, detail: opened ? { opened: true, via: href ? 'link' : 'list-id', ...(await outline(page)) } : { opened: false }, count: ids[key]?.count || 0 };
  }

  await openDetail('/requests', 'requests', ['/requests/']);
  await openDetail('/projects', 'projects', ['/projects/']);
  await openDetail('/quotes', 'quotes', ['/quotes/']);
  await openDetail('/payments', 'payments', ['/payments/']);

  await page.goto('https://app.nestlancer.com/messages', { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForSelector('h1', { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(1500);
  const before = writes.length;
  const msgHref = await page.evaluate(() => {
    for (const a of document.querySelectorAll('a[href]')) {
      const path = new URL(a.href).pathname;
      if (/\/messages\/.+/.test(path) && !/\/new|\/inbox/.test(path)) return a.href;
    }
    return '';
  });
  if (msgHref) await page.goto(msgHref, { waitUntil: 'domcontentloaded', timeout: 25000 });
  else if (ids.messages.id) await page.goto('https://app.nestlancer.com/messages/thread/' + ids.messages.id, { waitUntil: 'domcontentloaded', timeout: 25000 }).catch(() => {});
  await page.waitForTimeout(700);
  report.pages.thread = { opened: !page.url().includes('/login') && pat(page.url()) !== '/messages', ...(await outline(page)), writesDuringOpen: writes.slice(before).filter((x) => !/auth\/(login|logout|refresh)/.test(x)) };

  await page.goto('https://app.nestlancer.com/dashboard', { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForSelector('h1', { timeout: 10000 });
  await page.waitForTimeout(800);
  const pay = page.getByRole('tab', { name: /pay now/i });
  if (await pay.count()) {
    await pay.first().click({ timeout: 4000 }).catch(() => {});
    await page.waitForTimeout(500);
    report.pages.payNow = { opened: true, ...(await outline(page)) };
  } else report.pages.payNow = { opened: false, tabs: (await page.getByRole('tab').allInnerTexts()).map(safe).filter(Boolean) };

  for (const route of ['/payments/methods', '/profile', '/settings/files']) {
    await page.goto('https://app.nestlancer.com' + route, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.waitForSelector('h1', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(800);
    report.pages[route] = await outline(page);
  }
  report.logout = await page.evaluate(async () => (await fetch('/api/auth/logout', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: '{}' })).status);
} catch (err) {
  report.error = scrub(err.message, 180);
  report.login = report.login || { ok: false };
} finally {
  report.writes = [...new Set(writes)].filter((x) => !/auth\/(login|logout|refresh)|POST \/login/.test(x));
  report.counts = Object.fromEntries(Object.entries(ids).map(([k, v]) => [k, v.count || 0]));
  await context.close();
  await browser.close();
}
const text = JSON.stringify(report, null, 2);
if (PASSWORD && text.includes(PASSWORD)) throw new Error('credential in output');
fs.writeFileSync(OUT, text + '\n');
console.log(JSON.stringify({ login: report.login, error: report.error, counts: report.counts, keys: Object.keys(report.pages), writes: report.writes, thread: report.pages.thread && report.pages.thread.path, pay: report.pages.payNow && report.pages.payNow.opened }, null, 2));
