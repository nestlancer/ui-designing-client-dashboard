// Generalized capture harness for F04-F22 (same conditions/rubric context as F03 pilot).
// Usage: node capture2.mjs <family_dir> [V1..V5 subset]
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const TOOLING = path.dirname(fileURLToPath(import.meta.url));
const LAB = path.resolve(TOOLING, '..', '..');
const EV = path.join(LAB, 'review-evidence');
const BASE = 'http://127.0.0.1:8130/client-portal-lab';
const axeSrc = readFileSync(path.join(TOOLING, 'node_modules', 'axe-core', 'axe.min.js'), 'utf8');
const SETTLE = 1500;

// Per-family core task (identical for all 5 versions of that family; safe, in-page only)
const CONFIG = {
  F04: { task: 'paletteType', query: 'pay', desc: 'Type "pay" in the palette field; ArrowDown; record filtered results' },
  F05: { task: 'filterOrSearch', query: 'razor', desc: 'Filter/search the work hub (status select or search "razor")' },
  F06: { task: 'formValidate', submit: /save draft/i, desc: 'Submit Save draft with invalid/short data; record validation' },
  F07: { task: 'button', match: /approve|direction|request changes|view/i, desc: 'Invoke the primary decision affordance; record feedback' },
  F08: { task: 'filterOrSearch', query: 'a', desc: 'Search/filter/sort the projects list' },
  F09: { task: 'tab', match: /milestone/i, desc: 'Switch project tab to Milestones' },
  F10: { task: 'filterOrSearch', query: 'a', desc: 'Filter/search the quotes list' },
  F11: { task: 'button', match: /request changes|counter|revise/i, desc: 'Open Request-changes/counter-propose path (not Accept & Pay)' },
  F12: { task: 'rowClick', desc: 'Select a conversation from the list; record preview/thread update' },
  F13: { task: 'button', match: /reply/i, desc: 'Open the reply composer (draft only, never send)' },
  F14: { task: 'filterSelect', text: /pending/i, desc: 'Set Status filter to Pending; record ledger result' },
  F15: { task: 'tabOrButton', match: /mandate|add (a )?(payment )?method|add card/i, desc: 'Switch to Mandates tab or open Add method' },
  F16: { task: 'button', match: /bank transfer|net ?banking|upi|card/i, desc: 'Choose a payment path/method (do not complete payment)' },
  F17: { task: 'button', match: /download receipt|invoice|document/i, desc: 'Open/download document or expand document row (demo)' },
  F18: { task: 'filterOrSearch', query: 'a', desc: 'Search/filter the invoices archive' },
  F19: { task: 'tab', index: 1, desc: 'Switch notification category tab (2nd tab)' },
  F20: { task: 'button', match: /edit/i, desc: 'Enter Edit mode; record editable fields (no save)' },
  F21: { task: 'tab', match: /security/i, desc: 'Switch Settings section to Security' },
  F22: { task: 'tabOrButton', match: /list|grid/i, desc: 'Toggle Grid/List view in the files library' },
};

const familyDir = process.argv[2];
if (!familyDir) { console.error('usage: node capture2.mjs <family_dir> [V#...]'); process.exit(2); }
const famId = familyDir.split('-')[0];
const cfg = CONFIG[famId] || { task: 'primary', desc: 'Primary CTA' };
const versions = process.argv.slice(3).length ? process.argv.slice(3) : ['V1','V2','V3','V4','V5'];
const shotDir = path.join(EV, 'screenshots', famId); const rawDir = path.join(EV, 'raw');
fs.mkdirSync(shotDir, { recursive: true }); fs.mkdirSync(rawDir, { recursive: true });
const VPs = { desktop: { width: 1440, height: 1000 }, mobile: { width: 390, height: 844 }, tablet: { width: 768, height: 1024 } };

async function toast(page) {
  return page.evaluate(() => { const t = document.querySelector('#toast,[role="status"],[aria-live="polite"]');
    return t ? { visible: !t.hidden && t.getBoundingClientRect().width > 0, text: (t.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 180) } : null; });
}
async function overflow(page) {
  return page.evaluate(async () => {
    window.scrollTo(200, 0); await new Promise(r => setTimeout(r, 80));
    const sx = scrollX; window.scrollTo(0, 0);
    let maxR = null;
    for (const el of document.querySelectorAll('body *')) { const b = el.getBoundingClientRect(), s = getComputedStyle(el);
      if (b.width && s.display !== 'none' && (!maxR || b.right > maxR.right))
        maxR = { tag: el.tagName, cls: String(el.className && el.className.baseVal === undefined ? el.className : '').slice(0, 45), right: Math.round(b.right) }; }
    return { innerWidth, scrollWidth: document.documentElement.scrollWidth, actualHScrollPx: sx, maxRight: maxR };
  });
}
async function axe(page, state) {
  await page.evaluate(src => { const s = document.createElement('script'); s.textContent = src; document.head.appendChild(s); }, axeSrc);
  const r = await page.evaluate(async () => {
    const x = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21aa','wcag22aa'] } });
    return { violations: x.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length,
      targets: v.nodes.slice(0, 2).map(n => n.target.join(' ')),
      summary: (v.nodes[0]?.failureSummary || '').replace(/\s+/g, ' ').slice(0, 170) })), passes: x.passes.length };
  });
  return { state, tool: 'axe-core 4.10.2', ...r };
}
async function pageFacts(page) {
  return page.evaluate(() => {
    const vis = el => { const r = el.getBoundingClientRect(), s = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && s.display !== 'none' && s.visibility !== 'hidden'; };
    const h1 = document.querySelector('h1');
    return {
      title: document.title, h1: h1 ? h1.innerText.replace(/\s+/g, ' ').trim().slice(0, 90) : null,
      headings: [...document.querySelectorAll('h1,h2')].slice(0, 10).map(h => h.tagName + ':' + h.innerText.trim().slice(0, 45)),
      buttons: [...document.querySelectorAll('main button, main a')].filter(vis).slice(0, 20)
        .map(e => (e.innerText || e.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim().slice(0, 45)).filter(Boolean),
      tabs: [...document.querySelectorAll('[role="tab"]')].map(e => e.innerText.trim().slice(0, 35)),
      inputs: [...document.querySelectorAll('main input, main select, main textarea')].slice(0, 14)
        .map(e => ({ t: e.tagName + (e.type ? ':' + e.type : ''), lab: (e.labels?.[0]?.innerText || e.getAttribute('aria-label') || e.placeholder || '').trim().slice(0, 40) })),
      tables: document.querySelectorAll('table').length,
      dialogs: [...document.querySelectorAll('[role="dialog"],dialog')].map(d => ({ hidden: d.hidden, label: d.getAttribute('aria-label') })),
    };
  });
}
async function tapTargets(page) {
  return page.evaluate(() => { let c = 0, s24 = 0; const ex = [];
    for (const el of document.querySelectorAll('a,button,input,select,[role="button"],[role="tab"]')) {
      const r = el.getBoundingClientRect(), s = getComputedStyle(el);
      if (!r.width || s.display === 'none' || s.visibility === 'hidden') continue; c++;
      if (Math.min(r.width, r.height) < 24) { s24++; if (ex.length < 6)
        ex.push({ text: ((el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 35)), w: Math.round(r.width), h: Math.round(r.height) }); } }
    return { checked: c, under24px: s24, examples: ex }; });
}
async function keyboardWalk(page, steps = 12) {
  await page.evaluate(() => document.activeElement?.blur());
  const seq = [];
  for (let i = 0; i < steps; i++) { await page.keyboard.press('Tab'); await page.waitForTimeout(50);
    seq.push(await page.evaluate(() => { const el = document.activeElement;
      if (!el || el === document.body) return { tag: 'BODY/none', focusStyled: false };
      const s = getComputedStyle(el), r = el.getBoundingClientRect();
      return { tag: el.tagName, text: ((el.innerText || el.getAttribute('aria-label') || el.value || '') + '').replace(/\s+/g, ' ').trim().slice(0, 40),
        focusStyled: (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || s.boxShadow !== 'none',
        inViewport: r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth }; })); }
  return seq;
}
function afterState(page) {
  return page.evaluate(() => ({
    url: location.href,
    selectedTab: document.querySelector('[role="tab"][aria-selected="true"]')?.innerText?.trim().slice(0, 40) || null,
    visibleDialog: [...document.querySelectorAll('[role="dialog"],dialog')].some(d => !d.hidden && d.getBoundingClientRect().width > 0),
    invalidCount: document.querySelectorAll('[aria-invalid="true"]').length,
    alerts: [...document.querySelectorAll('[role="alert"]')].map(a => a.innerText.replace(/\s+/g, ' ').trim().slice(0, 140)).filter(Boolean).slice(0, 4),
    visiblePanel: (() => { const p = document.querySelector('[role="tabpanel"]:not([hidden])'); return p ? p.innerText.replace(/\s+/g, ' ').trim().slice(0, 200) : null; })(),
    mainStart: (document.querySelector('main')?.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 220),
  }));
}
async function coreTask(page) {
  const urlBefore = page.url();
  const done = async (how) => { await page.waitForTimeout(650);
    const st = await afterState(page);
    return { task: cfg.desc, via: how, toast: await toast(page), ...st, urlChanged: st.url !== urlBefore }; };
  try {
    if (cfg.task === 'tab') {
      const tabs = page.locator('[role="tab"]'); const n = await tabs.count();
      if (n < 2) return { task: cfg.desc, result: 'not testable', detail: `role=tab count=${n}` };
      let idx = cfg.index ?? 1;
      if (cfg.match) for (let i = 0; i < n; i++) if (cfg.match.test((await tabs.nth(i).innerText().catch(() => '')) || '')) { idx = i; break; }
      const label = ((await tabs.nth(idx).innerText()) || '').trim();
      await tabs.nth(idx).scrollIntoViewIfNeeded(); await tabs.nth(idx).click();
      const r = await done(`tab "${label}"`);
      r.result = r.selectedTab ? 'pass' : 'partial'; return r;
    }
    if (cfg.task === 'paletteType') {
      const inp = page.locator('[role="dialog"] input, [class*="palette"] input, input[type="search"], input:not([type="hidden"])').first();
      if (!(await inp.count())) return { task: cfg.desc, result: 'not testable', detail: 'no palette input found' };
      await inp.click(); await inp.fill(cfg.query); await page.keyboard.press('ArrowDown');
      const r = await done(`typed "${cfg.query}"`);
      r.resultCount = await page.evaluate(() => document.querySelectorAll('[role="option"],[role="dialog"] button, [class*="palette"] button, [class*="result"]').length);
      r.result = 'pass'; return r;
    }
    if (cfg.task === 'formValidate') {
      const title = page.locator('main input[type="text"]').first();
      if (await title.count()) { await title.scrollIntoViewIfNeeded().catch(() => {}); await title.fill('Hi').catch(() => {}); }
      const btn = page.locator('button').filter({ hasText: cfg.submit }).first();
      if (!(await btn.count())) return { task: cfg.desc, result: 'not testable', detail: 'no Save draft button' };
      await btn.scrollIntoViewIfNeeded(); await btn.click();
      const r = await done('Save draft w/ invalid short title');
      r.result = (r.invalidCount > 0 || r.alerts.length || (r.toast && r.toast.visible)) ? 'pass' : 'partial'; return r;
    }
    if (cfg.task === 'filterSelect' || cfg.task === 'filterOrSearch') {
      const sel = page.locator('main select').first();
      if (await sel.count()) {
        const opts = await sel.evaluate(s => [...s.options].map(o => ({ v: o.value, t: o.text })));
        const pick = cfg.text ? opts.find(o => cfg.text.test(o.t)) : opts.find(o => o.v && !/all/i.test(o.t)) || opts[1];
        if (pick) { await sel.scrollIntoViewIfNeeded(); await sel.selectOption(pick.v);
          const r = await done(`select "${pick.t}"`); r.result = 'pass'; return r; }
      }
      if (cfg.task === 'filterSelect') { // fall through to tab/chip below
        const chip = page.locator('main button').filter({ hasText: cfg.text }).first();
        if (await chip.count()) { await chip.scrollIntoViewIfNeeded(); await chip.click();
          const r = await done('Pending chip/tab'); r.result = 'pass'; return r; }
        return { task: cfg.desc, result: 'not testable', detail: 'no status select/chip' };
      }
      const inp = page.locator('main input[type="search"], main input[placeholder*="Search" i]').first();
      if (await inp.count()) { await inp.scrollIntoViewIfNeeded(); await inp.fill(cfg.query);
        const r = await done(`searched "${cfg.query}"`); r.result = 'pass'; return r; }
      const tabs = page.locator('[role="tab"]');
      if ((await tabs.count()) > 1) { await tabs.nth(1).scrollIntoViewIfNeeded(); await tabs.nth(1).click();
        const r = await done('2nd tab'); r.result = r.selectedTab ? 'pass' : 'partial'; return r; }
      return { task: cfg.desc, result: 'not testable', detail: 'no select/search/tab found' };
    }
    if (cfg.task === 'rowClick') {
      const rows = page.locator('main [class*="conv"], main [class*="thread-item"], main li button, main [role="option"], main [data-conv], main [data-thread]');
      let el = rows.first();
      if (!(await el.count())) el = page.locator('main button').nth(3);
      await el.scrollIntoViewIfNeeded(); await el.click();
      const r = await done('first conversation-like item'); r.result = 'pass'; return r;
    }
    // button / tabOrButton / primary
    if (cfg.task === 'tabOrButton') {
      const tabs = page.locator('[role="tab"]'); const n = await tabs.count();
      for (let i = 0; i < n; i++) if (cfg.match.test((await tabs.nth(i).innerText().catch(() => '')) || '')) {
        await tabs.nth(i).scrollIntoViewIfNeeded(); await tabs.nth(i).click();
        const r = await done('matching tab'); r.result = r.selectedTab ? 'pass' : 'partial'; return r; }
    }
    const btn = page.locator('main button').filter({ hasText: cfg.match }).first();
    if (!(await btn.count())) return { task: cfg.desc, result: 'not testable', detail: `no button matching ${cfg.match}` };
    const label = ((await btn.innerText()) || '').replace(/\s+/g, ' ').trim().slice(0, 50);
    await btn.scrollIntoViewIfNeeded(); await btn.click();
    const r = await done(`button "${label}"`);
    r.result = (r.visibleDialog || (r.toast && r.toast.visible) || r.urlChanged || r.invalidCount > 0) ? 'pass' : 'partial';
    return r;
  } catch (e) { return { task: cfg.desc, result: 'error', detail: String(e).slice(0, 220) }; }
}

const browser = await chromium.launch();
console.log(`Chromium ${browser.version()} | ${familyDir} | task: ${cfg.desc}`);
for (const v of versions) {
  const rel = `families/${familyDir}/${v}/index.html`; const url = `${BASE}/${rel}`;
  const raw = { family: famId, familyDir, version: v, sourcePath: `client-portal-lab/${rel}`, url,
    capturedUtc: new Date().toISOString(), consoleErrors: [], pageErrors: [], failedRequests: [], shots: {}, checks: {} };
  console.log(`\n=== ${famId}/${v} ===`);
  for (const [name, vp] of Object.entries(VPs)) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, colorScheme: 'light', reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    page.on('console', m => { if (m.type() === 'error') raw.consoleErrors.push(`[${name}] ${m.text().slice(0, 170)}`); });
    page.on('pageerror', e => raw.pageErrors.push(`[${name}] ${String(e).slice(0, 170)}`));
    page.on('requestfailed', r => raw.failedRequests.push(`[${name}] ${r.url().slice(0, 140)}`));
    const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => null);
    raw.checks['http_' + name] = resp ? resp.status() : 'NAV_FAILED';
    await page.waitForTimeout(SETTLE); await page.mouse.move(5, 5);
    const shot = `${famId}-${v}-${name}-light-top.png`;
    await page.screenshot({ path: path.join(shotDir, shot) }); raw.shots[name] = `review-evidence/screenshots/${famId}/${shot}`;
    raw.checks['overflow_' + name] = await overflow(page);
    if (name === 'desktop') {
      raw.checks.factsDesktop = await pageFacts(page);
      raw.checks.axeDesktopDefault = await axe(page, 'desktop default');
      raw.checks.keyboardDesktop = await keyboardWalk(page);
      raw.checks.coreTaskDesktop = await coreTask(page);
      await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {});
      const t = `${famId}-${v}-desktop-light-task.png`;
      await page.screenshot({ path: path.join(shotDir, t) }).catch(() => {}); raw.shots.taskDesktop = `review-evidence/screenshots/${famId}/${t}`;
      // theme + demo-toast probe on a clean load
      await page.goto(url, { waitUntil: 'networkidle' }).catch(() => {}); await page.waitForTimeout(900);
      const tb = page.locator('#themeBtn, #theme, button[aria-label*="dark" i], button[aria-label*="theme" i]').first();
      if (await tb.count().catch(() => 0)) { const before = await page.evaluate(() => document.documentElement.classList.contains('dark'));
        await tb.click().catch(() => {}); await page.waitForTimeout(350);
        const after = await page.evaluate(() => document.documentElement.classList.contains('dark'));
        raw.checks.themeTask = { result: after !== before ? 'pass' : 'partial', detail: `dark ${before}->${after}` };
      } else raw.checks.themeTask = { result: 'not testable', detail: 'no theme control matched' };
      const demo = page.locator('[data-demo]').first();
      if (await demo.count().catch(() => 0)) { await demo.click().catch(() => {}); await page.waitForTimeout(450);
        raw.checks.demoToast = await toast(page); } else raw.checks.demoToast = null;
      // clean fullpage
      await page.goto(url, { waitUntil: 'networkidle' }).catch(() => {}); await page.waitForTimeout(SETTLE);
      await page.evaluate(() => { try { localStorage.setItem('lab-theme', 'light'); } catch {} document.documentElement.classList.remove('dark'); window.scrollTo(0, 0); });
      const f = `${famId}-${v}-desktop-light-fullpage.jpg`;
      await page.screenshot({ path: path.join(shotDir, f), fullPage: true, type: 'jpeg', quality: 78 }).catch(() => {});
      raw.shots.fullpageDesktop = `review-evidence/screenshots/${famId}/${f}`;
      raw.checks.fullPageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    }
    if (name === 'mobile') {
      raw.checks.factsMobile = await pageFacts(page);
      raw.checks.tapTargetsMobile = await tapTargets(page);
      raw.checks.coreTaskMobile = await coreTask(page);
      await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {});
      const t = `${famId}-${v}-mobile-light-task.png`;
      await page.screenshot({ path: path.join(shotDir, t) }).catch(() => {}); raw.shots.taskMobile = `review-evidence/screenshots/${famId}/${t}`;
      // mobile nav open check (data only)
      await page.goto(url, { waitUntil: 'networkidle' }).catch(() => {}); await page.waitForTimeout(900);
      try { const menu = page.locator('button[aria-label*="navigation menu" i], #menuBtn').first();
        const bw = await menu.evaluate(e => Math.round(e.getBoundingClientRect().width));
        await menu.click({ timeout: 2500 }); await page.waitForTimeout(450);
        raw.checks.mobileNav = await page.evaluate((bw) => { const s = document.querySelector('.side, aside');
          const b = s ? s.getBoundingClientRect() : null;
          return { btnWidth: bw, sideLeftAfter: b ? Math.round(b.left) : null, opened: b ? b.left > -20 : null }; }, bw);
      } catch (e) { raw.checks.mobileNav = { opened: false, error: String(e).slice(0, 120) }; }
    }
    await ctx.close();
    console.log(` ${name}: http=${raw.checks['http_' + name]} hscroll=${raw.checks['overflow_' + name].actualHScrollPx}px`);
  }
  const ctx = await browser.newContext({ viewport: VPs.desktop, colorScheme: 'dark', reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  page.on('pageerror', e => raw.pageErrors.push(`[dark] ${String(e).slice(0, 170)}`));
  await page.goto(`${url}?theme=dark`, { waitUntil: 'networkidle' }).catch(() => null);
  await page.waitForTimeout(SETTLE);
  raw.checks.darkClassApplied = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  raw.checks.axeDarkDefault = await axe(page, 'desktop dark');
  const d = `${famId}-${v}-desktop-dark-top.png`;
  await page.screenshot({ path: path.join(shotDir, d) }); raw.shots.dark = `review-evidence/screenshots/${famId}/${d}`;
  await ctx.close();
  fs.writeFileSync(path.join(rawDir, `${famId}-${v}-raw.json`), JSON.stringify(raw, null, 2) + '\n');
  console.log(` dark=${raw.checks.darkClassApplied} errors(c/p/f)=${raw.consoleErrors.length}/${raw.pageErrors.length}/${raw.failedRequests.length} axe=${raw.checks.axeDesktopDefault?.violations?.length} task=${raw.checks.coreTaskDesktop?.result}`);
}
await browser.close(); console.log('DONE ' + familyDir);
