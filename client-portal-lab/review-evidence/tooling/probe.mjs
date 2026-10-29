// Follow-up diagnostics for F03 pilot anomalies (same browser/conditions as capture.mjs).
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const TOOLING = path.dirname(fileURLToPath(import.meta.url));
const EV = path.resolve(TOOLING, '..');
const BASE = 'http://127.0.0.1:8130/client-portal-lab/families/F03-dashboard-overview';
const axeSrc = readFileSync(path.join(TOOLING, 'node_modules', 'axe-core', 'axe.min.js'), 'utf8');
const browser = await chromium.launch();
const out = {};

for (const v of ['V1','V2','V3','V4','V5']) {
  const r = {};
  // ---- desktop probes ----
  let ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce', colorScheme: 'light' });
  let page = await ctx.newPage();
  await page.goto(`${BASE}/${v}/index.html`, { waitUntil: 'networkidle' }); await page.waitForTimeout(2000);
  r.desktop = await page.evaluate(() => {
    const q = s => document.querySelector(s);
    const rect = el => el ? (x => ({ w: Math.round(x.width), h: Math.round(x.height), left: Math.round(x.left), right: Math.round(x.right) }))(el.getBoundingClientRect()) : null;
    const menu = [...document.querySelectorAll('button,a')].find(e => /navigation menu/i.test(e.getAttribute('aria-label') || ''));
    const theme = q('#theme') || q('#themeBtn') || [...document.querySelectorAll('button')].find(e => /dark|light|theme/i.test(e.getAttribute('aria-label') || ''));
    return {
      h1Count: document.querySelectorAll('h1').length,
      h1Text: q('h1') ? q('h1').innerText.trim().slice(0, 80) : null,
      headingOutline: [...document.querySelectorAll('h1,h2,h3')].slice(0, 10).map(h => h.tagName + ':' + h.innerText.trim().slice(0, 40)),
      roleTabCount: document.querySelectorAll('[role="tab"]').length,
      dataTabCount: document.querySelectorAll('[data-tab]').length,
      dataTabRoles: [...document.querySelectorAll('[data-tab]')].map(e => ({ tag: e.tagName, role: e.getAttribute('role'), sel: e.getAttribute('aria-selected'), text: e.innerText.trim().slice(0, 30) })),
      tabPanelRoles: document.querySelectorAll('[role="tabpanel"]').length,
      dataPanelCount: document.querySelectorAll('[data-panel]').length,
      menuBtn: menu ? { rect: rect(menu), id: menu.id, expanded: menu.getAttribute('aria-expanded') } : null,
      themeBtn: theme ? { id: theme.id, label: theme.getAttribute('aria-label'), pressed: theme.getAttribute('aria-pressed'), rect: rect(theme) } : null,
      brandClip: (() => { const b = q('.brand'); if (!b) return null; const br = b.getBoundingClientRect();
        return { brandRight: Math.round(br.right), scrollW: b.scrollWidth, clientW: b.clientWidth, text: b.innerText.trim().slice(0,30) }; })(),
      pipelineBars: [...document.querySelectorAll('[class*="bar"] i, [class*="bar"] b, .fill, [class*="fill"]')].slice(0, 6)
        .map(e => ({ cls: String(e.className).slice(0, 30), w: Math.round(e.getBoundingClientRect().width), bg: getComputedStyle(e).backgroundColor })),
    };
  });
  // axe contrast detail
  await page.evaluate(src => { const s = document.createElement('script'); s.textContent = src; document.head.appendChild(s); }, axeSrc);
  r.contrastDetail = await page.evaluate(async () => {
    const res = await window.axe.run(document, { runOnly: { type: 'rule', values: ['color-contrast'] } });
    return res.violations.flatMap(vio => vio.nodes.map(n => ({
      target: n.target.join(' '), html: n.html.slice(0, 140),
      summary: (n.failureSummary || '').replace(/\s+/g, ' ').slice(0, 260) })));
  });
  // V3 drawer / V4 alternative interaction probe: click first awaiting/queue row-like button if tabs absent
  if (v === 'V3' || v === 'V4') {
    r.altTask = await page.evaluate(() => {
      const cands = [...document.querySelectorAll('button,a,[role="button"]')]
        .filter(e => e.getBoundingClientRect().width > 0)
        .map(e => ({ text: (e.innerText || e.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim().slice(0, 60),
                     data: [...e.attributes].filter(a => a.name.startsWith('data-')).map(a => a.name + '=' + a.value).join(' ') }));
      const dialogs = [...document.querySelectorAll('[role="dialog"],dialog,[class*="drawer"],[class*="sheet"]')]
        .map(d => ({ cls: String(d.className).slice(0, 40), hidden: d.hidden, role: d.getAttribute('role') }));
      return { clickableSample: cands.slice(0, 25), dialogs };
    });
  }
  await ctx.close();

  // ---- mobile probes ----
  ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce', colorScheme: 'light' });
  page = await ctx.newPage();
  await page.goto(`${BASE}/${v}/index.html`, { waitUntil: 'networkidle' }); await page.waitForTimeout(2000);
  r.mobile = await page.evaluate(async () => {
    const iw = innerWidth;
    let maxR = null;
    for (const el of document.querySelectorAll('body *')) {
      const b = el.getBoundingClientRect(), s = getComputedStyle(el);
      if (b.width && s.display !== 'none' && (!maxR || b.right > maxR.right))
        maxR = { tag: el.tagName, cls: String(el.className && el.className.baseVal === undefined ? el.className : '').slice(0, 50),
                 id: el.id, right: Math.round(b.right), left: Math.round(b.left), position: s.position, transform: s.transform.slice(0, 40) };
    }
    const before = scrollX; window.scrollTo(200, 0); await new Promise(r2 => setTimeout(r2, 120));
    const scrolledX = scrollX; window.scrollTo(0, 0);
    const menu = [...document.querySelectorAll('button,a')].find(e => /navigation menu/i.test(e.getAttribute('aria-label') || ''));
    const mr = menu ? menu.getBoundingClientRect() : null;
    const bell = [...document.querySelectorAll('button,a')].find(e => /notif/i.test(e.getAttribute('aria-label') || ''));
    const br = bell ? bell.getBoundingClientRect() : null;
    return { innerWidth: iw, docScrollWidth: document.documentElement.scrollWidth, bodyScrollWidth: document.body.scrollWidth,
             actualHScrollPx: scrolledX, maxRightElement: maxR,
             bodyOverflowX: getComputedStyle(document.body).overflowX, htmlOverflowX: getComputedStyle(document.documentElement).overflowX,
             menuBtn: menu ? { w: Math.round(mr.width), h: Math.round(mr.height), left: Math.round(mr.left), right: Math.round(mr.right) } : null,
             bellBtn: bell ? { w: Math.round(br.width), left: Math.round(br.left), right: Math.round(br.right), label: bell.getAttribute('aria-label') } : null };
  });
  // mobile: does menu button open nav? (click if hittable)
  try {
    const menu = page.locator('button[aria-label*="navigation menu" i], #menuBtn').first();
    await menu.click({ timeout: 2500 });
    await page.waitForTimeout(500);
    r.mobileNavAfterClick = await page.evaluate(() => {
      const side = document.querySelector('.side, aside, [class*="side"]');
      const b = side ? side.getBoundingClientRect() : null;
      const menu = [...document.querySelectorAll('button,a')].find(e => /navigation menu/i.test(e.getAttribute('aria-label') || ''));
      return { sideClass: side ? String(side.className).slice(0, 60) : null,
               sideRect: b ? { left: Math.round(b.left), right: Math.round(b.right), w: Math.round(b.width) } : null,
               expanded: menu ? menu.getAttribute('aria-expanded') : null };
    });
    const shot = `F03-${v}-mobile-light-navopen.png`;
    await page.screenshot({ path: path.join(EV, 'screenshots', 'F03', shot) });
    r.mobileNavShot = `review-evidence/screenshots/F03/${shot}`;
  } catch (e) { r.mobileNavAfterClick = 'CLICK_FAILED: ' + String(e).slice(0, 160); }
  await ctx.close();
  out[v] = r;
  console.log(v, JSON.stringify({ h1: r.desktop.h1Text, tabs: r.desktop.roleTabCount, dataTabs: r.desktop.dataTabCount,
    mScrollW: r.mobile.docScrollWidth, actualHScroll: r.mobile.actualHScrollPx, maxRight: r.mobile.maxRightElement?.cls, menuW: r.mobile.menuBtn?.w }));
}
fs.writeFileSync(path.join(EV, 'raw', 'F03-probe.json'), JSON.stringify(out, null, 2) + '\n');
await browser.close();
console.log('saved raw/F03-probe.json');
