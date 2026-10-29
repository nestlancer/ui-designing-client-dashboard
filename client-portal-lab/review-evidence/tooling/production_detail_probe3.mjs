import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
const OUT = path.resolve('..', 'raw', 'production-detail-observations.json');
const PASSWORD = process.env.NL_PASSWORD || '';
if (!PASSWORD) process.exit(2);
const scrub = (s) => String(s ?? '').split(PASSWORD).join('[redacted]').replace(/[₹$€£]\s?[\d,]+(?:\.\d+)?/g, '[amount]').replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[email]').replace(/\b(?:arjun|samira|rahul|mehta|patel|desai)\b/gi, '[account]').replace(/\s+/g, ' ').trim().slice(0, 70);
const safe = (s) => { const t = scrub(s); return !t || /\[(email|amount|account|redacted)\]/.test(t) || t.split(' ').length > 5 ? '' : t; };
const pat = (raw) => { try { return new URL(raw, 'https://app.nestlancer.com').pathname.replace(/\/[0-9a-f-]{8,}|\/[^/]*\d[^/]*/gi, '/:id'); } catch { return '/'; } };
async function outline(page) {
  const raw = await page.evaluate(() => {
    const text = (el) => (el.getAttribute('aria-label') || el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 60);
    return { h1: [...document.querySelectorAll('h1')].slice(0, 2).map(text), h2: [...document.querySelectorAll('h2')].slice(0, 6).map(text), tabs: [...document.querySelectorAll('[role="tab"]')].slice(0, 8).map(text), hScroll: document.documentElement.scrollWidth - innerWidth };
  });
  return { path: pat(page.url()), h1: raw.h1.map(safe).filter(Boolean), h2: raw.h2.map(safe).filter(Boolean), tabs: raw.tabs.map(safe).filter(Boolean), hScroll: raw.hScroll };
}
const browser = await chromium.launch({ headless: true });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce', timezoneId: 'Asia/Kolkata' })).newPage();
const writes = [];
page.on('response', (r) => { const m = r.request().method(); if (['POST','PUT','PATCH','DELETE'].includes(m)) writes.push(`${m} ${pat(r.url())} ${r.status()}`); });
const report = { pages: {}, linkPatterns: {} };
try {
  await page.goto('https://app.nestlancer.com/login', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForSelector('#email');
  if (await page.getByRole('button', { name: /^Dismiss$/ }).count()) await page.getByRole('button', { name: /^Dismiss$/ }).click().catch(() => {});
  await page.locator('#email').fill('arjun.mehta@nestlancer.com');
  await page.locator('#password').fill(PASSWORD);
  await page.locator('form button[type="submit"]').click();
  await page.waitForURL((u) => !u.pathname.includes('/login'), { timeout: 20000 });
  await page.waitForSelector('h1', { timeout: 10000 });
  report.dashboardTabs = (await page.getByRole('tab').allInnerTexts()).map(safe).filter(Boolean);
  for (const list of ['/requests', '/projects', '/quotes', '/payments', '/messages']) {
    await page.goto('https://app.nestlancer.com' + list, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.waitForSelector('h1', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(1500);
    const patterns = await page.evaluate(() => [...document.querySelectorAll('a[href]')].map((a) => { try { return new URL(a.href).pathname; } catch { return ''; } }).filter(Boolean));
    const counts = {};
    for (const p of patterns) {
      const key = p.replace(/\/[0-9a-f-]{8,}|\/[^/]*\d[^/]*/gi, '/:id');
      counts[key] = (counts[key] || 0) + 1;
    }
    report.linkPatterns[list] = counts;
    const target = patterns.find((p) => p.startsWith(list + '/') && !p.includes('/new') && !p.includes('/methods') && !p.includes('/inbox'));
    if (!target) { report.pages[list] = { opened: false }; continue; }
    await page.goto('https://app.nestlancer.com' + target, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.waitForSelector('h1, main', { timeout: 8000 }).catch(() => {});
    report.pages[list] = { opened: !page.url().includes('/login'), ...(await outline(page)) };
  }
  report.logout = await page.evaluate(async () => (await fetch('/api/auth/logout', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: '{}' })).status);
} catch (err) { report.error = scrub(err.message); }
finally {
  report.writes = [...new Set(writes)].filter((x) => !/auth\/(login|logout|refresh)/.test(x));
  await browser.close();
}
const text = JSON.stringify(report, null, 2);
if (text.includes(PASSWORD)) throw new Error('credential in output');
fs.writeFileSync(OUT, text + '\n');
console.log(text);
