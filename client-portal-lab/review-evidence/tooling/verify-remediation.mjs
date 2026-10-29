/* Read-only regression checks. Never rewrites HTML, CSS, JS, or rankings.
   Run from this directory with Playwright's browser installed, or supply
   CHROMIUM_PATH (and any required LD_LIBRARY_PATH for a packaged browser).
   node verify-remediation.mjs F03 F04    (omit IDs to check all 100 versions)
   Results go to the ignored .arena directory unless QA_OUTPUT is specified. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const here = path.dirname(fileURLToPath(import.meta.url));
const lab = path.resolve(here, '../..');
const root = path.resolve(lab, '..');
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:8130';
const filter = process.argv.slice(2);
const families = fs.readdirSync(path.join(lab, 'families')).sort().filter(f => !filter.length || filter.includes(f.slice(0, 3)));
const cases = families.flatMap(f => ['V1','V2','V3','V4','V5'].map(v => `families/${f}/${v}/index.html`));
const output = process.env.QA_OUTPUT || path.join(root, '.arena/remediation-checks.json');
const results = [];
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--use-gl=angle', '--use-angle=swiftshader', '--no-zygote'],
});

async function check(sourcePath) {
  const source = fs.readFileSync(path.join(lab, sourcePath), 'utf8');
  const syntax = [];
  for (const [i, match] of [...source.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].entries()) {
    if (/\bsrc\s*=/.test(match[1]) || /application\/(?:json|ld\+json)/.test(match[1])) continue;
    try { new vm.Script(match[2], { filename: `${sourcePath}:script-${i + 1}` }); }
    catch (e) { syntax.push(e.message); }
  }
  const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const result = { path: sourcePath, syntax, pageErrors: [], resourceErrors: [], views: [], accessibility: {} };
  page.on('pageerror', e => result.pageErrors.push(e.message));
  page.on('response', r => { if (r.status() >= 400) result.resourceErrors.push(`${r.status()} ${r.url()}`); });
  try {
    await page.goto(`${base}/client-portal-lab/${sourcePath}`, { waitUntil: 'networkidle', timeout: 15000 });
    result.h1 = await page.locator('h1').allTextContents();
    for (const width of [1440, 768, 390, 360]) {
      await page.setViewportSize({ width, height: width < 500 ? 844 : 1000 });
      await page.evaluate(() => { document.documentElement.classList.remove('dark'); window.scrollTo(0, 0); });
      const metrics = await page.evaluate(() => {
        window.scrollTo(10000, 0);
        const overflow = window.scrollX;
        window.scrollTo(0, 0);
        const outside = [...document.querySelectorAll('main *, header *')].filter(el => {
          const r = el.getBoundingClientRect();
          return r.width && r.height && r.right > innerWidth + 1 && !el.closest('[hidden], .sr-only, .skip-link');
        }).slice(0, 5).map(el => ({ tag: el.tagName, cls: el.className?.baseVal ?? el.className, right: Math.round(el.getBoundingClientRect().right) }));
        return { width: innerWidth, overflow, outside };
      });
      result.views.push(metrics);
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.addScriptTag({ path: path.join(here, 'node_modules/axe-core/axe.min.js') });
    for (const [theme, width] of [['light', 1440], ['dark', 1440], ['mobileLight', 390], ['mobileDark', 390]]) {
      await page.setViewportSize({ width, height: width < 500 ? 844 : 1000 });
      await page.evaluate(dark => document.documentElement.classList.toggle('dark', dark), theme === 'dark' || theme === 'mobileDark');
      const a = await page.evaluate(async () => await axe.run(document, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
      }));
      result.accessibility[theme] = a.violations.map(v => ({
        id: v.id, impact: v.impact,
        nodes: v.nodes.map(n => ({ target: n.target, message: n.failureSummary, html: n.html })),
      }));
    }
  } catch (e) { result.checkError = e.message; }
  await context.close();
  results.push(result);
  const issues = result.syntax.length + result.pageErrors.length + result.resourceErrors.length + result.views.filter(v => v.overflow > 0).length + Object.values(result.accessibility).reduce((n, a) => n + a.length, 0) + (result.h1?.length === 1 ? 0 : 1) + (result.checkError ? 1 : 0);
  console.log(`${issues ? 'CHECK' : 'PASS'} ${sourcePath} ${issues ? JSON.stringify({ syntax: result.syntax, errors: result.pageErrors, resources: result.resourceErrors, overflow: result.views.filter(v=>v.overflow>0).map(v=>[v.width,v.overflow]), axe: Object.fromEntries(Object.entries(result.accessibility).map(([t,a])=>[t,a.map(v=>`${v.id}:${v.nodes.length}`)])), checkError:result.checkError }) : ''}`);
}

try {
  // Three independent pages at a time; this is validation only, not an auto-fixer.
  for (let i = 0; i < cases.length; i += 3) await Promise.all(cases.slice(i, i + 3).map(check));
} finally { await browser.close(); }
results.sort((a,b)=>a.path.localeCompare(b.path));
fs.mkdirSync(path.dirname(output), { recursive: true });
const report = { checkedUtc: new Date().toISOString(), browser: 'Chromium', cases: results.length, viewportWidths: [1440,768,390,360], reducedMotion: true, results };
fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
console.log(`Read-only results: ${output}`);
if (results.some(r => r.syntax.length || r.pageErrors.length || r.resourceErrors.length || r.h1?.length !== 1 || r.views.some(v=>v.overflow>0) || Object.values(r.accessibility).some(a=>a.length) || r.checkError)) process.exitCode = 1;
