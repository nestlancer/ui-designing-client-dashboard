import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
const OUT = path.resolve('..', 'raw', 'production-detail-observations.json');
const PASSWORD = process.env.NL_PASSWORD || '';
if (!PASSWORD) process.exit(2);
function scrub(s, n = 80) {
  s = String(s ?? '');
  if (PASSWORD) s = s.split(PASSWORD).join('[redacted]');
  return s.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[email]').replace(/[₹$€£]\s?[\d,]+(?:\.\d+)?/g, '[amount]').replace(/\b(?:arjun|samira|rahul|mehta|patel|desai)\b/gi, '[account]').replace(/\s+/g, ' ').trim().slice(0, n);
}
function safe(s) { const t = scrub(s); return !t || /\[(email|amount|account|redacted)\]/.test(t) || t.split(/\s+/).length > 5 ? '' : t; }
function pat(raw) { const u = new URL(raw, 'https://app.nestlancer.com'); return u.pathname.replace(/\/[0-9a-f-]{8,}|\/[^/]*\d[^/]*/gi, '/:id'); }
async function outline(page) {
  const raw = await page.evaluate(() => {
    const text = (el) => (el.getAttribute('aria-label') || el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 60);
    return { h1: [...document.querySelectorAll('h1')].slice(0, 2).map(text), h2: [...document.querySelectorAll('h2')].slice(0, 6).map(text), tabs: [...document.querySelectorAll('[role="tab"]')].slice(0, 8).map(text), buttons: [...document.querySelectorAll('main button')].slice(0, 12).map(text), hScroll: document.documentElement.scrollWidth - innerWidth, composer: !!document.querySelector('textarea,[contenteditable="true"]') };
  });
  return { path: pat(page.url()), h1: raw.h1.map(safe).filter(Boolean), h2: raw.h2.map(safe).filter(Boolean), tabs: raw.tabs.map(safe).filter(Boolean), buttons: raw.buttons.map(safe).filter(Boolean), hScroll: raw.hScroll, composer: raw.composer };
}
const browser = await chromium.launch({ headless: true });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce', timezoneId: 'Asia/Kolkata' })).newPage();
const writes = [];
page.on('response', (r) => { const m = r.request().method(); if (['POST','PUT','PATCH','DELETE'].includes(m) && /nestlancer\.com$/.test(new URL(r.url()).hostname)) writes.push(`${m} ${pat(r.url())} ${r.status()}`); });
const report = { pages: {} };
try {
  await page.goto('https://app.nestlancer.com/login', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForSelector('#email');
  if (await page.getByRole('button', { name: /^Dismiss$/ }).count()) await page.getByRole('button', { name: /^Dismiss$/ }).click().catch(() => {});
  await page.locator('#email').fill('arjun.mehta@nestlancer.com');
  await page.locator('#password').fill(PASSWORD);
  await page.locator('form button[type="submit"]').click();
  await page.waitForURL((u) => !u.pathname.includes('/login'), { timeout: 20000 });
  async function open(list, test) {
    await page.goto('https://app.nestlancer.com' + list, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.waitForTimeout(1200);
    const href = await page.locator('a[href]').evaluateAll((els, list) => els.map((a) => a.href).find((h) => { try { const u = new URL(h); return u.pathname.startsWith(list + '/') && u.pathname !== list + '/new' && !u.pathname.includes('/methods'); } catch { return false; } }) || '', list);
    if (!href) return { opened: false };
    const label = await page.locator(`a[href="${new URL(href).pathname}"]`).first().innerText().catch(() => '');
    if (/pay|approve|accept|send|delete|download/i.test(label)) return { opened: false, reason: 'only mutating-labeled link found' };
    await page.goto(href, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.waitForSelector('h1,main', { timeout: 8000 }).catch(() => {});
    return { opened: !page.url().includes('/login'), ...(await outline(page)) };
  }
  report.pages.requestDetail = await open('/requests');
  report.pages.projectDetail = await open('/projects');
  report.pages.quoteDetail = await open('/quotes');
  report.pages.paymentDetail = await open('/payments');
  await page.goto('https://app.nestlancer.com/dashboard', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);
  const tab = page.getByRole('tab', { name: /pay now/i });
  if (await tab.count()) { await tab.first().click().catch(() => {}); await page.waitForTimeout(400); report.pages.payNow = { opened: true, ...(await outline(page)) }; }
  else report.pages.payNow = { opened: false, tabCount: await page.getByRole('tab').count() };
  report.logout = await page.evaluate(async () => (await fetch('/api/auth/logout', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: '{}' })).status);
} catch (err) { report.error = scrub(err.message); }
finally { report.writes = [...new Set(writes)].filter((x) => !/login|logout|refresh/.test(x)); await browser.close(); }
const text = JSON.stringify(report, null, 2);
if (text.includes(PASSWORD)) throw new Error('credential in output');
fs.writeFileSync(OUT, text + '\n');
console.log(text);
