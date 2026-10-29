import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, locale: 'en-IN', timezoneId: 'Asia/Kolkata' });
const notes = [];
page.on('console', (m) => { if (m.type() === 'error') notes.push('console:' + m.text().slice(0, 160)); });
page.on('pageerror', (e) => notes.push('pageerror:' + String(e).slice(0, 160)));
await page.goto('https://app.nestlancer.com/login', { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(8000);
const state = await page.evaluate(() => {
  const widget = document.querySelector('[data-testid="turnstile-widget"]');
  const iframe = document.querySelector('iframe[src*="challenges.cloudflare.com"], iframe[src*="turnstile"]');
  return {
    title: document.title,
    widgetText: widget ? widget.innerText.slice(0, 240) : null,
    iframe: iframe ? iframe.src.split('?')[0] : null,
    iframeTitle: iframe ? iframe.title || iframe.getAttribute('aria-label') : null,
    submitDisabled: document.querySelector('form button[type="submit"]')?.disabled ?? null,
    inputs: [...document.querySelectorAll('input')].map((el) => el.id || el.type),
    bodySnippet: document.body.innerText.replace(/\s+/g, ' ').slice(0, 400),
  };
});
console.log(JSON.stringify({ state, notes: notes.slice(0, 8) }, null, 2));
await browser.close();
