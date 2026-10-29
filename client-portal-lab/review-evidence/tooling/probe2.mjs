// F03 pilot: primary-action feedback + palette dialog behaviour, all 5 versions (S2 T3/T5).
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const TOOLING = path.dirname(fileURLToPath(import.meta.url));
const EV = path.resolve(TOOLING, '..');
const BASE = 'http://127.0.0.1:8130/client-portal-lab/families/F03-dashboard-overview';
const browser = await chromium.launch();
const out = {};

async function toastState(page) {
  return page.evaluate(() => {
    const t = document.querySelector('#toast, [role="status"], [aria-live]');
    return t ? { hidden: t.hidden, visible: t.getBoundingClientRect().width > 0 && !t.hidden,
                 text: (t.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 200) } : null;
  });
}

for (const v of ['V1','V2','V3','V4','V5']) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const errors = []; page.on('pageerror', e => errors.push(String(e).slice(0, 120)));
  await page.goto(`${BASE}/${v}/index.html`, { waitUntil: 'networkidle' }); await page.waitForTimeout(2000);
  const r = { pageErrors: errors };

  // --- primary action: first visible "Complete checkout" inside <main> ---
  try {
    const cta = page.locator('main button:has-text("Complete checkout"), main a:has-text("Complete checkout")').first();
    const urlBefore = page.url();
    await cta.scrollIntoViewIfNeeded(); await cta.click(); await page.waitForTimeout(600);
    r.primaryAction = { clicked: 'Complete checkout (first in main)', urlAfter: page.url(),
                        navigated: page.url() !== urlBefore, toast: await toastState(page) };
  } catch (e) { r.primaryAction = { clicked: null, error: String(e).slice(0, 160) }; }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: path.join(EV, 'screenshots', 'F03', `F03-${v}-desktop-light-primary.png`) });

  // --- demo affordance: sidebar "Requests" (documented demo in F03 shell) ---
  try {
    await page.goto(`${BASE}/${v}/index.html`, { waitUntil: 'networkidle' }); await page.waitForTimeout(1200);
    const nav = page.locator('.side button:has-text("Requests"), aside button:has-text("Requests")').first();
    await nav.click(); await page.waitForTimeout(500);
    r.demoNav = { clicked: 'sidebar Requests (data-demo)', toast: await toastState(page) };
  } catch (e) { r.demoNav = { clicked: null, error: String(e).slice(0, 160) }; }

  // --- palette: search trigger -> dialog, focus, Escape ---
  try {
    await page.goto(`${BASE}/${v}/index.html`, { waitUntil: 'networkidle' }); await page.waitForTimeout(1200);
    const trig = page.locator('#paletteBtn, button:has-text("Search")').first();
    await trig.click(); await page.waitForTimeout(500);
    r.paletteAfterOpen = await page.evaluate(() => {
      const p = document.querySelector('#palette, [role="dialog"]');
      const a = document.activeElement;
      return { dialogPresent: !!p, dialogHidden: p ? p.hidden : null,
               dialogVisible: p ? (p.getBoundingClientRect().width > 0 && !p.hidden) : false,
               focusTag: a ? a.tagName + (a.id ? '#' + a.id : '') : null,
               focusInDialog: p ? p.contains(a) : null };
    });
    await page.keyboard.press('Escape'); await page.waitForTimeout(400);
    r.paletteAfterEscape = await page.evaluate(() => {
      const p = document.querySelector('#palette, [role="dialog"]');
      return { dialogHidden: p ? p.hidden : null,
               focusReturnedTo: document.activeElement ? (document.activeElement.tagName + ':' + ((document.activeElement.innerText || document.activeElement.id || '').trim().slice(0, 30))) : null };
    });
  } catch (e) { r.palette = { error: String(e).slice(0, 200) }; }

  out[v] = r;
  console.log(v, JSON.stringify({ primary: r.primaryAction?.toast?.text || r.primaryAction?.error || '(no toast)',
    demo: r.demoNav?.toast?.text || '(no toast)', pal: r.paletteAfterOpen, esc: r.paletteAfterEscape }));
  await ctx.close();
}
fs.writeFileSync(path.join(EV, 'raw', 'F03-probe2.json'), JSON.stringify(out, null, 2) + '\n');
await browser.close(); console.log('saved raw/F03-probe2.json');
