/* Read-only local regression checks for the manually repaired lab.
   No source files are changed. No screenshots, live APIs, or real mutations.
   Use QA_BASE_URL / CHROMIUM_PATH as in verify-remediation.mjs.
   Optional arguments: F03 F04 ...; QA_OUTPUT selects the JSON results file. */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const here = path.dirname(fileURLToPath(import.meta.url));
const lab = path.resolve(here, '../..');
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:8130';
const filter = process.argv.slice(2);
const cases = fs.readdirSync(path.join(lab, 'families')).sort()
  .filter(f => !filter.length || filter.includes(f.slice(0, 3)))
  .flatMap(f => ['V1', 'V2', 'V3', 'V4', 'V5'].map(v => ({ family: f.slice(0, 3), version: v, file: `families/${f}/${v}/index.html` })));
const browser = await chromium.launch({ headless: true,
  ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--use-gl=angle', '--use-angle=swiftshader', '--no-zygote'],
});
const results = [];

function checkLiteralLinks(file) {
  const full = path.join(lab, file), source = fs.readFileSync(full, 'utf8');
  for (const [, , href] of source.matchAll(/<a\b[^>]*\bhref=(['"])([^'"]+)\1/gi)) {
    if (/^(?:#|[a-z]+:|\/\/)/i.test(href) || /[+{}<>]/.test(href)) continue;
    const target = decodeURIComponent(href.split(/[?#]/)[0]);
    if (target) assert(fs.existsSync(path.resolve(path.dirname(full), target)), `Missing local link: ${href}`);
  }
  for (const [, ref] of source.matchAll(/<use\b[^>]*\bhref="([^"\s]+#[\w-]+)"/gi)) {
    const [svg, id] = ref.split('#');
    if (/[+{}<>]/.test(svg)) continue;
    const sprite = svg ? fs.readFileSync(path.resolve(path.dirname(full), svg), 'utf8') : source;
    assert(new RegExp(`\\bid=["']${id}["']`).test(sprite), `Missing SVG symbol: ${ref}`);
  }
}

async function check(c) {
  const r = { path: c.file, passed: [], pageErrors: [], blockedRequests: [] };
  const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
  // The test only opens local static pages; a non-GET or external request is a failure.
  await context.route('**/*', async route => {
    const request = route.request();
    if (request.method() !== 'GET' || !request.url().startsWith(`${base}/`)) {
      r.blockedRequests.push(`${request.method()} ${request.url()}`);
      await route.abort();
    } else await route.continue();
  });
  const page = await context.newPage();
  page.setDefaultTimeout(5000);
  page.on('pageerror', e => r.pageErrors.push(e.message));
  try {
    checkLiteralLinks(c.file);
    r.passed.push('Literal local links and SVG symbols resolve');
    await page.goto(`${base}/client-portal-lab/${c.file}`, { waitUntil: 'networkidle' });
    await page.keyboard.press('Escape'); // F04 intentionally starts with the palette open.
    const theme = page.locator('#themeBtn, #theme-toggle, #theme').first();
    assert(await theme.isVisible(), 'Theme control must be visible on mobile');
    const dark = await page.locator('html').evaluate(el => el.classList.contains('dark'));
    await theme.click();
    assert.notEqual(await page.locator('html').evaluate(el => el.classList.contains('dark')), dark);
    await theme.click();
    r.passed.push('Mobile theme toggle changes and restores theme');
    const menu = page.locator('#menuBtn, #mobile-menu-btn, #burger').first();
    assert(await menu.isVisible(), 'Navigation control must be visible');
    const rect = await menu.boundingBox();
    assert(rect.width >= 24 && rect.height >= 24, 'Mobile menu hit area must be at least 24px');
    await menu.click();
    const side = page.locator('aside[aria-label="Primary navigation"]').first();
    const drawer = await side.boundingBox();
    assert(drawer && drawer.x >= -1 && drawer.x + drawer.width <= 391, 'Mobile navigation must open inside the viewport');
    r.passed.push('Mobile navigation opens; menu target is not compressed');
    // Reload closes the navigation without relying on variant-specific dismissal markup.
    await page.reload({ waitUntil: 'networkidle' });
    await page.keyboard.press('Escape');
    await page.setViewportSize({ width: 1440, height: 1000 });

    if (c.family === 'F03') {
      assert.equal(await page.locator('h1').count(), 1);
      assert.match(await page.locator('h1').innerText(), /overview/i);
      const fills = await page.locator('.bar .fill').evaluateAll(els => els.map(el => ({ width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height })));
      assert(fills.length >= 2 && fills.every(x => x.width > 0 && x.height > 0), 'Pipeline fills must render real dimensions');
      for (const name of ['Pipeline & billing', 'Awaiting you', 'Recent activity']) {
        assert(await page.getByRole('heading', { name, exact: true }).count(), `Missing ${name}`);
      }
      await page.locator('#paletteBtn').click();
      assert(await page.locator('#paletteInput').isVisible());
      await page.keyboard.press('Escape');
      assert(!(await page.locator('#paletteInput').isVisible()));
      r.passed.push('Overview sections, real pipeline bars, and working palette');
    }
    if (c.family === 'F04') {
      await page.locator('#paletteBtn').click();
      const input = page.locator('#paletteInput');
      await input.fill('request');
      assert(await page.locator('#palette a, #palette button.cmd, #palette button[data-i]').count(), 'Search must render matching actions');
      await input.fill('<img src=x onerror=alert(1)>');
      assert.match(await page.locator('#palette').innerText(), /no (results|matches|actions)/i);
      assert.equal(await page.locator('#palette img').count(), 0);
      await page.keyboard.press('Escape');
      assert(!(await input.isVisible()));
      assert.equal(await page.locator('#paletteBtn').evaluate(el => el === document.activeElement), true);
      r.passed.push('Search renders, literal no-results query is safe, Escape restores focus');
    }
    if (c.family === 'F05') {
      const search = page.locator('#q');
      await search.fill('no-such-work-item-92876');
      const matching = await page.locator('[data-title][data-status]').evaluateAll(els => els.filter(el => el.getBoundingClientRect().height && getComputedStyle(el).display !== 'none').length);
      assert.equal(matching, 0);
      await search.fill('');
      if (c.version === 'V3') {
        await page.locator('button[data-prio="attention"]').click();
        assert.equal(await page.locator('div[data-prio][aria-pressed]').count(), 0);
      }
      await page.locator('button[data-open]:visible').first().click();
      assert(await page.locator('[role="dialog"]:visible').count());
      r.passed.push('Search filters and restores rows; detail opens; priority ARIA is button-only');
    }
    if (c.family === 'F06') {
      if (c.version === 'V3') {
        const help = page.locator('details.help').first();
        await help.locator('summary').click();
        assert.equal(await help.evaluate(el => el.open), true);
        assert(await help.locator('.pop').isVisible());
      } else {
        const help = page.locator('[data-help]').first();
        const id = await help.getAttribute('data-help');
        await help.click();
        assert(await page.locator(`#${id}`).isVisible());
      }
      await page.locator('.lab-tools > summary').click();
      await page.locator('[data-state="error"]').click();
      assert(await page.locator('#stateError').isVisible());
      assert(!(await page.locator('#stateError').innerText()).includes('POST /'));
      await page.locator('#retry').click();
      assert(!(await page.locator('#stateError').isVisible()));
      r.passed.push('Form help, human-readable error state, and retry');
    }
    if (c.family === 'F08' && c.version === 'V3') {
      await page.setViewportSize({ width: 390, height: 844 });
      const rect = await page.locator('.sticky-cta').boundingBox();
      assert(rect && rect.x >= 0 && rect.y >= 0 && rect.x + rect.width <= 391 && rect.y + rect.height <= 844);
      const padding = await page.locator('main').evaluate(el => parseFloat(getComputedStyle(el).paddingBottom));
      assert(padding >= rect.height + 24);
      r.passed.push('Sticky CTA is fully inside mobile viewport with reserved content space');
    }
    if (c.family === 'F08' && c.version === 'V5') {
      await page.locator('[data-project="b2b"]').click();
      assert.equal(await page.locator('#pvLink').innerText(), 'View Khandesh example');
      assert.match(await page.locator('#pvTitle').innerText(), /B2B/);
      assert(!(await page.locator('#pvText').innerText()).includes('/api/'));
      r.passed.push('B2B selection honestly labels the different project example');
    }
    if (c.family === 'F10') {
      assert.equal(await page.locator('.lab-tools').evaluate(el => el.open), false);
      assert(await page.locator('main').isVisible());
      const titles = page.locator('.request-title-note');
      if (await titles.count()) {
        const title = titles.first();
        await title.locator('summary').click();
        assert(await title.locator('code').isVisible());
        assert.equal(await title.locator('img').count(), 0);
      }
      r.passed.push('Client content is outside collapsed prototype tools; imported titles remain literal');
    }
    if (c.family === 'F11' && ['V1', 'V2', 'V3'].includes(c.version)) {
      await page.setViewportSize({ width: 390, height: 844 });
      const selector = c.version === 'V1' ? '.table-wrap' : c.version === 'V2' ? '.audit-panel[tabindex="0"]' : '#sec-items';
      const scroller = page.locator(selector).first();
      assert.equal(await scroller.getAttribute('tabindex'), '0');
      await scroller.focus();
      await page.keyboard.press('ArrowRight');
      await page.waitForFunction(sel => document.querySelector(sel).scrollLeft > 0, selector);
      r.passed.push('Quote matrix can be horizontally scrolled by keyboard without page overflow');
    }
    if (c.family === 'F17' && c.version === 'V4') {
      assert.match(await page.locator('#qtitle').innerText(), /No blockers/);
      assert(await page.locator('#qopen').isDisabled());
      await page.locator('[role="tab"]:not([aria-selected="true"])').click();
      assert.match(await page.locator('#qtitle').innerText(), /1 blocker/);
      assert(await page.locator('#qopen').isEnabled());
      await page.locator('#qopen').click();
      assert(await page.locator('#drawer').isVisible());
      await page.keyboard.press('Escape');
      await page.locator('[data-tab="completed"]').click();
      assert.match(await page.locator('#qtitle').innerText(), /No blockers/);
      assert(await page.locator('#qopen').isDisabled());
      r.passed.push('Completed and blocked payment states keep title, message, and action consistent');
    }
    if (c.family === 'F21' && c.version === 'V4') {
      await page.locator('#kLaunch2fa').click();
      assert(await page.locator('#p2Pw').isVisible());
      await page.locator('#p2Pw').fill('demo-only');
      await page.locator('#p2N1').click();
      await page.locator('#p2N2').click();
      await page.locator('#p2Otp').fill('123456');
      await page.locator('#p2Fin').click();
      assert.equal(await page.locator('#k2faTitle').innerText(), 'Enabled (TOTP)');
      r.passed.push('Inline demo 2FA wizard launches and completes locally');
    }
    if (c.family === 'F22' && c.version === 'V1') {
      const meter = page.getByRole('meter');
      assert.equal(await meter.getAttribute('aria-valuemin'), '0');
      assert.equal(await meter.getAttribute('aria-valuemax'), '5242880');
      assert.equal(await meter.getAttribute('aria-valuenow'), '41.1');
      assert.equal(await meter.getAttribute('aria-valuetext'), '41.1 KB used of 5 GB');
      r.passed.push('Storage meter exposes accurate, bounded usage');
    }
    assert.deepEqual(r.pageErrors, []);
    assert.deepEqual(r.blockedRequests, []);
  } catch (e) { r.error = e.message; }
  await context.close();
  results.push(r);
  console.log(`${r.error ? 'CHECK' : 'PASS'} ${c.file}${r.error ? `: ${r.error}` : ''}`);
}

try {
  for (let i = 0; i < cases.length; i += 3) await Promise.all(cases.slice(i, i + 3).map(check));
} finally { await browser.close(); }
results.sort((a,b) => a.path.localeCompare(b.path));
const output = process.env.QA_OUTPUT || path.resolve(lab, '../.arena/interaction-checks.json');
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify({ checkedUtc: new Date().toISOString(), cases: results.length, browser: 'Chromium', mobileViewport: [390,844], results }, null, 2) + '\n');
console.log(`Read-only interaction results: ${output}`);
if (results.some(r => r.error)) process.exitCode = 1;
