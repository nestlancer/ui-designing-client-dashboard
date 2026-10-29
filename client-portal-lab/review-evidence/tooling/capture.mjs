// Reusable pilot/full capture harness - rank prompt S1/S2. Same conditions for every version.
// Usage: node capture.mjs <family_dir> [V1 V2 ...]   e.g. node capture.mjs F03-dashboard-overview
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

const familyDir = process.argv[2];
if (!familyDir) { console.error('usage: node capture.mjs <family_dir> [V#...]'); process.exit(2); }
const famId = familyDir.split('-')[0];
const versions = process.argv.slice(3).length ? process.argv.slice(3) : ['V1','V2','V3','V4','V5'];
const shotDir = path.join(EV, 'screenshots', famId);
const rawDir = path.join(EV, 'raw');
fs.mkdirSync(shotDir, { recursive: true }); fs.mkdirSync(rawDir, { recursive: true });

const VIEWPORTS = {
  desktop: { width: 1440, height: 1000 },
  mobile:  { width: 390,  height: 844 },
  tablet:  { width: 768,  height: 1024 },
};
const SETTLE_MS = 2000; // fixed settle (count-up etc.) - identical for every version

async function overflowInfo(page) {
  return page.evaluate(() => {
    const iw = window.innerWidth, sw = document.documentElement.scrollWidth;
    const offenders = [];
    if (sw > iw + 1) {
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect();
        if (r.width && (r.right > iw + 1 || r.left < -1) && offenders.length < 8)
          offenders.push({ tag: el.tagName, cls: (el.className && el.className.baseVal !== undefined ? '' : String(el.className)).slice(0, 60),
                           right: Math.round(r.right), left: Math.round(r.left) });
      }
    }
    return { innerWidth: iw, scrollWidth: sw, horizontalOverflow: sw > iw + 1, offenders };
  });
}

async function firstScreenInfo(page) {
  return page.evaluate(() => {
    const vis = el => { if (!el) return false; const r = el.getBoundingClientRect(), s = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && r.bottom > 0 && r.top < innerHeight; };
    const txt = el => (el.innerText || el.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim().slice(0, 120);
    const h1 = document.querySelector('h1');
    const ctas = [...document.querySelectorAll('a,button')].filter(vis).slice(0, 40)
      .map(el => ({ tag: el.tagName, text: txt(el) })).filter(x => x.text);
    return { h1: h1 ? txt(h1) : null, h1VisibleFirstScreen: h1 ? vis(h1) : false,
             title: document.title, firstScreenControls: ctas.slice(0, 12) };
  });
}

async function tapTargets(page) {
  return page.evaluate(() => {
    const els = [...document.querySelectorAll('a,button,input,select,[role="button"],[role="tab"]')];
    let small24 = 0, small44 = 0, checked = 0; const examples = [];
    for (const el of els) {
      const r = el.getBoundingClientRect(), s = getComputedStyle(el);
      if (!r.width || s.display === 'none' || s.visibility === 'hidden') continue;
      checked++;
      if (Math.min(r.width, r.height) < 24) { small24++; if (examples.length < 5)
        examples.push({ text: ((el.innerText||el.getAttribute('aria-label')||'').trim().slice(0,40)), w: Math.round(r.width), h: Math.round(r.height) }); }
      else if (Math.min(r.width, r.height) < 44) small44++;
    }
    return { checked, under24px: small24, between24and44px: small44, under24Examples: examples };
  });
}

async function runAxe(page, label) {
  await page.evaluate(src => { const s = document.createElement('script'); s.textContent = src; document.head.appendChild(s); }, axeSrc);
  const res = await page.evaluate(async () => {
    const r = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } });
    return { violations: r.violations.map(v => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.length,
             targets: v.nodes.slice(0, 3).map(n => n.target.join(' ')) })),
             passes: r.passes.length, incomplete: r.incomplete.map(v => v.id) };
  });
  return { state: label, tool: 'axe-core 4.10.2', ...res };
}

async function keyboardWalk(page, steps = 15) {
  await page.mouse.move(5, 5);
  await page.evaluate(() => { if (document.activeElement) document.activeElement.blur(); });
  const seq = [];
  for (let i = 0; i < steps; i++) {
    await page.keyboard.press('Tab');
    await page.waitForTimeout(60);
    seq.push(await page.evaluate(() => {
      const el = document.activeElement; if (!el || el === document.body) return { tag: 'BODY/none' };
      const s = getComputedStyle(el), r = el.getBoundingClientRect();
      const focusStyled = (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || s.boxShadow !== 'none';
      return { tag: el.tagName, text: ((el.innerText || el.getAttribute('aria-label') || el.value || '') + '').replace(/\s+/g, ' ').trim().slice(0, 50),
               focusStyled, outline: `${s.outlineStyle} ${s.outlineWidth}`, boxShadow: s.boxShadow !== 'none',
               inViewport: r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth };
    }));
  }
  return seq;
}

// Family core task (S2): F03 = switch workbench tab to "Pay now" (else 2nd tab). Safe, in-page only.
async function coreTask(page) {
  const tabs = page.locator('[role="tab"]');
  const n = await tabs.count().catch(() => 0);
  if (n > 1) {
    let idx = 1, label = '';
    for (let i = 0; i < n; i++) { const t = ((await tabs.nth(i).innerText().catch(() => '')) || '').trim();
      if (/pay/i.test(t)) { idx = i; label = t.replace(/\s+/g, ' '); break; } if (i === 1) label = t.replace(/\s+/g, ' '); }
    await tabs.nth(idx).scrollIntoViewIfNeeded().catch(() => {});
    await tabs.nth(idx).click();
    await page.waitForTimeout(700);
    const selected = await tabs.nth(idx).getAttribute('aria-selected').catch(() => null);
    const panelText = await page.evaluate(() => {
      const p = document.querySelector('[role="tabpanel"]:not([hidden])') || document.querySelector('[role="tabpanel"]');
      return p ? (p.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 300) : null; });
    await page.evaluate(() => window.scrollTo(0, 0));
    return { task: `switch workbench tab -> "${label}"`, result: selected === 'true' ? 'pass' : 'partial',
             detail: `aria-selected=${selected}; visible panel starts: ${panelText}` };
  }
  return { task: 'switch workbench tab', result: 'not testable', detail: `role=tab count=${n}` };
}

async function themeTask(page) {
  const before = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  const btn = page.locator('#theme, [aria-label*="theme" i], [aria-label*="dark" i], button:has-text("Dark")').first();
  if (await btn.count().catch(() => 0)) {
    await btn.click().catch(() => {});
    await page.waitForTimeout(400);
    const after = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    const pressed = await btn.getAttribute('aria-pressed').catch(() => null);
    return { task: 'theme toggle control', result: after !== before ? 'pass' : 'partial',
             detail: `dark ${before} -> ${after}; aria-pressed=${pressed}` };
  }
  return { task: 'theme toggle control', result: 'not testable', detail: 'no theme control matched' };
}

const browser = await chromium.launch();
console.log(`Chromium ${browser.version()} | family ${familyDir} | versions ${versions.join(',')}`);

for (const v of versions) {
  const rel = `families/${familyDir}/${v}/index.html`;
  const url = `${BASE}/${rel}`;
  const raw = { family: famId, familyDir, version: v, sourcePath: `client-portal-lab/${rel}`, url,
                capturedUtc: new Date().toISOString(), consoleErrors: [], pageErrors: [], failedRequests: [],
                shots: {}, checks: {} };
  console.log(`\n=== ${famId}/${v} ===`);

  for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, colorScheme: 'light', reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    page.on('console', m => { if (m.type() === 'error') raw.consoleErrors.push(`[${vpName}] ${m.text().slice(0, 200)}`); });
    page.on('pageerror', e => raw.pageErrors.push(`[${vpName}] ${String(e).slice(0, 200)}`));
    page.on('requestfailed', r => raw.failedRequests.push(`[${vpName}] ${r.url().slice(0, 160)}`));
    const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 }).catch(e => null);
    raw.checks[`http_${vpName}`] = resp ? resp.status() : 'NAVIGATION_FAILED';
    await page.waitForTimeout(SETTLE_MS);
    await page.mouse.move(5, 5);
    const shot = `${famId}-${v}-${vpName}-light-top.png`;
    await page.screenshot({ path: path.join(shotDir, shot) });
    raw.shots[vpName] = `review-evidence/screenshots/${famId}/${shot}`;
    raw.checks[`overflow_${vpName}`] = await overflowInfo(page);
    if (vpName === 'desktop') {
      raw.checks.firstScreenDesktop = await firstScreenInfo(page);
      raw.checks.axeDesktopDefault = await runAxe(page, 'desktop default');
      raw.checks.keyboardDesktop = await keyboardWalk(page);
      raw.checks.coreTaskDesktop = await coreTask(page);
      const tShot = `${famId}-${v}-desktop-light-task.png`;
      await page.screenshot({ path: path.join(shotDir, tShot) }); raw.shots.taskDesktop = `review-evidence/screenshots/${famId}/${tShot}`;
      // theme toggle test AFTER task shot (fresh state next reload anyway); then reload clean for fullpage
      raw.checks.themeTask = await themeTask(page);
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 }); await page.waitForTimeout(SETTLE_MS);
      await page.evaluate(() => { try { localStorage.setItem('lab-theme', 'light'); } catch {} document.documentElement.classList.remove('dark'); window.scrollTo(0,0); });
      const fShot = `${famId}-${v}-desktop-light-fullpage.png`;
      await page.screenshot({ path: path.join(shotDir, fShot), fullPage: true }); raw.shots.fullpageDesktop = `review-evidence/screenshots/${famId}/${fShot}`;
    }
    if (vpName === 'mobile') {
      raw.checks.firstScreenMobile = await firstScreenInfo(page);
      raw.checks.tapTargetsMobile = await tapTargets(page);
      raw.checks.coreTaskMobile = await coreTask(page);
      raw.checks.axeMobileDefault = await runAxe(page, 'mobile after task (tab switched)');
      const tShot = `${famId}-${v}-mobile-light-task.png`;
      await page.screenshot({ path: path.join(shotDir, tShot) }); raw.shots.taskMobile = `review-evidence/screenshots/${famId}/${tShot}`;
    }
    await ctx.close();
    console.log(` ${vpName}: http=${raw.checks['http_' + vpName]} overflow=${raw.checks['overflow_' + vpName].horizontalOverflow}`);
  }

  // dark check (desktop)
  const ctx = await browser.newContext({ viewport: VIEWPORTS.desktop, deviceScaleFactor: 1, colorScheme: 'dark', reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  page.on('pageerror', e => raw.pageErrors.push(`[dark] ${String(e).slice(0, 200)}`));
  await page.goto(`${url}?theme=dark`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => null);
  await page.waitForTimeout(SETTLE_MS);
  raw.checks.darkClassApplied = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  raw.checks.overflow_dark = await overflowInfo(page);
  raw.checks.axeDarkDefault = await runAxe(page, 'desktop dark');
  const dShot = `${famId}-${v}-desktop-dark-top.png`;
  await page.screenshot({ path: path.join(shotDir, dShot) }); raw.shots.dark = `review-evidence/screenshots/${famId}/${dShot}`;
  await ctx.close();
  console.log(` dark: classApplied=${raw.checks.darkClassApplied}`);

  fs.writeFileSync(path.join(rawDir, `${famId}-${v}-raw.json`), JSON.stringify(raw, null, 2) + '\n');
  console.log(` consoleErrors=${raw.consoleErrors.length} pageErrors=${raw.pageErrors.length} failedReq=${raw.failedRequests.length} axeViolations(desktop)=${raw.checks.axeDesktopDefault?.violations?.length}`);
}
await browser.close();
console.log('\nDONE');
