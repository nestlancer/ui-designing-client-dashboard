/** Open missing equivalent production routes. No screenshots, values, sends, or payments. */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('..', 'raw', 'production-detail-observations.json');
const PASSWORD = process.env.NL_PASSWORD || '';
if (!PASSWORD) process.exit(2);
const EMAIL = 'arjun.mehta@nestlancer.com';

function scrub(value, limit = 80) {
  let s = String(value ?? '');
  if (PASSWORD) s = s.split(PASSWORD).join('[redacted]');
  s = s.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[email]');
  s = s.replace(/[₹$€£]\s?[\d,]+(?:\.\d+)?/g, '[amount]');
  s = s.replace(/\b(?:arjun(?:\.mehta)?|samira(?:\.patel)?|rahul(?:\.desai)?|mehta|patel|desai)\b/gi, '[account]');
  s = s.replace(/\bNL-[A-Z]+-\d{4}-\d+\b/g, '[document]');
  s = s.replace(/\b[0-9a-f]{8}-[0-9a-f-]{20,}\b/gi, ':id');
  return s.replace(/\s+/g, ' ').trim().slice(0, limit);
}
function safe(value) {
  const s = scrub(value);
  if (!s || /\[(email|amount|account|redacted|document)\]/.test(s) || s.split(/\s+/).length > 6) return '';
  return s;
}
function pattern(raw) {
  const u = new URL(raw, 'https://app.nestlancer.com');
  return u.pathname.split('/').map((seg) => !seg ? seg : (/[0-9]/.test(seg) || seg.length > 16 ? ':id' : seg.toLowerCase())).join('/');
}
async function outline(page) {
  const raw = await page.evaluate(() => {
    const text = (el) => (el.getAttribute('aria-label') || el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 70);
    return {
      h1: [...document.querySelectorAll('h1')].slice(0, 2).map(text),
      h2: [...document.querySelectorAll('h2')].slice(0, 6).map(text),
      tabs: [...document.querySelectorAll('[role="tab"]')].slice(0, 10).map(text),
      buttons: [...document.querySelectorAll('main button, [role="main"] button')].slice(0, 16).map(text),
      labels: [...document.querySelectorAll('main label, main dt')].slice(0, 12).map(text),
      fields: [...document.querySelectorAll('main input, main textarea, main select')].slice(0, 12).map((el) => el.getAttribute('type') || el.tagName.toLowerCase()),
      hScroll: document.documentElement.scrollWidth - innerWidth,
      composer: !!document.querySelector('textarea, [contenteditable="true"]'),
      dialog: !!document.querySelector('[role="dialog"]'),
    };
  });
  return { path: pattern(page.url()), h1: raw.h1.map(safe).filter(Boolean), h1Present: raw.h1.some((x) => x.trim()), h2: raw.h2.map(safe).filter(Boolean), tabs: raw.tabs.map(safe).filter(Boolean), buttons: raw.buttons.map(safe).filter(Boolean), labels: raw.labels.map(safe).filter(Boolean), fields: raw.fields, hScroll: raw.hScroll, composer: raw.composer, dialog: raw.dialog };
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce', timezoneId: 'Asia/Kolkata', locale: 'en-IN' });
const page = await context.newPage();
page.on('dialog', (d) => d.dismiss());
const writes = [];
page.on('response', (res) => {
  const method = res.request().method();
  if (['POST','PUT','PATCH','DELETE'].includes(method) && /nestlancer\.com$/.test(new URL(res.url()).hostname)) writes.push(`${method} ${pattern(res.url())} ${res.status()}`);
});
const report = { pages: {}, writes: [] };
try {
  await page.goto('https://app.nestlancer.com/login', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForSelector('#email');
  await page.waitForTimeout(700);
  const dismiss = page.getByRole('button', { name: /^Dismiss$/ });
  if (await dismiss.count()) await dismiss.click().catch(() => {});
  await page.locator('#email').fill(EMAIL);
  await page.locator('#password').fill(PASSWORD);
  await page.locator('form button[type="submit"]').click();
  await page.waitForURL((u) => !u.pathname.includes('/login'), { timeout: 20000 });
  report.login = { ok: true, landing: pattern(page.url()) };

  const menu = page.getByRole('button', { name: /command menu|search/i }).first();
  if (await menu.count()) {
    await menu.click({ timeout: 4000 }).catch(() => {});
    await page.waitForTimeout(500);
    report.commandMenu = await page.evaluate(() => ({
      dialog: !!document.querySelector('[role="dialog"]'),
      input: !!document.querySelector('[role="dialog"] input, [role="combobox"]'),
      options: document.querySelectorAll('[role="option"], [cmdk-item]').length,
    }));
    await page.keyboard.press('Escape');
  } else report.commandMenu = { dialog: false, input: false, options: 0 };

  async function openFirst(listPath, prefix) {
    await page.goto('https://app.nestlancer.com' + listPath, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.waitForTimeout(700);
    const href = await page.locator('a[href]').evaluateAll((els, prefix) => {
      const hit = els.map((a) => a.getAttribute('href')).find((h) => h && h.startsWith(prefix) && h.length > prefix.length);
      return hit || '';
    }, prefix);
    if (!href) return { opened: false, list: listPath };
    const abs = new URL(href, 'https://app.nestlancer.com');
    if (abs.origin !== 'https://app.nestlancer.com') return { opened: false, list: listPath };
    await page.goto(abs.href, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.waitForSelector('h1, main', { timeout: 8000 }).catch(() => {});
    return { opened: !page.url().includes('/login'), ...(await outline(page)) };
  }
  report.pages.requestDetail = await openFirst('/requests', '/requests/');
  report.pages.projectDetail = await openFirst('/projects', '/projects/');
  report.pages.quoteDetail = await openFirst('/quotes', '/quotes/');
  report.pages.paymentDetail = await openFirst('/payments', '/payments/');

  await page.goto('https://app.nestlancer.com/dashboard', { waitUntil: 'domcontentloaded' });
  const pay = page.getByRole('tab', { name: /pay now/i });
  if (await pay.count()) {
    await pay.first().click({ timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(400);
    report.pages.payNow = await outline(page);
  } else report.pages.payNow = { opened: false };

  await page.goto('https://app.nestlancer.com/messages', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(600);
  const convo = page.locator('main a[href*="message"], main a[href*="thread"], main [role="link"]').first();
  if (await convo.count()) {
    await convo.click({ timeout: 4000 }).catch(() => {});
    await page.waitForTimeout(500);
    report.pages.thread = { opened: true, ...(await outline(page)) };
  } else report.pages.thread = { opened: false, reason: 'no conversation link in main' };

  const status = await page.evaluate(async () => (await fetch('/api/auth/logout', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: '{}' })).status).catch(() => 0);
  report.logout = { ok: status >= 200 && status < 400, http: status };
} catch (err) {
  report.error = scrub(err.message);
} finally {
  report.writes = [...new Set(writes)].filter((x) => !/login|logout|refresh/.test(x));
  await context.close();
  await browser.close();
}
const text = JSON.stringify(report, null, 2);
if (PASSWORD && text.includes(PASSWORD)) throw new Error('credential in output');
fs.writeFileSync(OUT, text + '\n');
console.log(text.slice(0, 2500));
