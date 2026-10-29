import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
const OUT = path.resolve('..', 'raw', 'production-complete-observations.json');
const PASSWORD = process.env.NL_PASSWORD || '';
if (!PASSWORD) process.exit(2);
const WORDS = ['Overview','Progress','Milestones','Deliverables','Messages','Files','Timeline','Attachments','Status','Approved','Pending','Receipt','Invoice','Reply','Accept','Decline','Pay','Back','Download','Contract','Terms','Due','Owner','Budget','Empty','Error','Try again','Send','Draft','Method','UPI','Card','Bank'];
function scrub(s){ s=String(s??''); if(PASSWORD) s=s.split(PASSWORD).join('[redacted]'); return s.replace(/[₹$€£]\s?[\d,]+(?:\.\d+)?/g,'[amount]').replace(/\b[0-9a-f]{8}-[0-9a-f-]{20,}\b/gi,':id').replace(/\s+/g,' ').trim().slice(0,80); }
async function facts(page){
  return page.evaluate((words)=>{
    const main=document.querySelector('main')||document.body;
    const text=(main.innerText||'').replace(/\s+/g,' ');
    const vis=el=>el.getBoundingClientRect().height>0;
    return {
      h1Count:document.querySelectorAll('h1').length,
      h2Count:document.querySelectorAll('h2').length,
      tabCount:[...document.querySelectorAll('[role="tab"]')].filter(vis).length,
      buttonCount:[...document.querySelectorAll('main button')].filter(vis).length,
      fieldCount:document.querySelectorAll('main input,main textarea,main select').length,
      composer:!!document.querySelector('textarea,[contenteditable="true"]'),
      hScroll:document.documentElement.scrollWidth-innerWidth,
      textLength:text.length,
      words:words.filter(w=>text.toLowerCase().includes(w.toLowerCase())),
      tryAgain:!![...document.querySelectorAll('button')].find(b=>/try again/i.test(b.innerText||'')),
    };
  }, WORDS);
}
async function waitReady(page){
  await page.waitForFunction(()=>{ const t=document.querySelector('main')?.innerText||''; return t.length>80 || /try again|not found|unavailable/i.test(t); }, {timeout:8000}).catch(()=>{});
}
const browser=await chromium.launch({headless:true});
const page=await (await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce',timezoneId:'Asia/Kolkata'})).newPage();
page.on('dialog',d=>d.dismiss());
const writes=[];
page.on('response',r=>{ const m=r.request().method(); if(['POST','PUT','PATCH','DELETE'].includes(m) && /nestlancer\.com$/.test(new URL(r.url()).hostname)) writes.push(m+' '+new URL(r.url()).pathname.replace(/\/[0-9a-f-]{8,}/gi,'/:id')+' '+r.status()); });
const report={pages:{}};
try{
  await page.goto('https://app.nestlancer.com/login',{waitUntil:'domcontentloaded',timeout:30000});
  await page.waitForSelector('#email'); await page.waitForTimeout(1000);
  if(await page.getByRole('button',{name:/^Dismiss$/}).count()) await page.getByRole('button',{name:/^Dismiss$/}).click().catch(()=>{});
  await page.locator('#email').fill('arjun.mehta@nestlancer.com');
  await page.locator('#password').fill(PASSWORD);
  await page.locator('form button[type="submit"]').click();
  await page.waitForURL(u=>!u.pathname.includes('/login'),{timeout:20000});
  async function openFrom(list, prefix){
    await page.goto('https://app.nestlancer.com'+list,{waitUntil:'domcontentloaded',timeout:25000});
    await waitReady(page);
    const listFacts=await facts(page);
    const href=await page.evaluate((prefix)=>{
      const bad=/pay now|approve|accept|send|delete|download|upload/i;
      for(const a of document.querySelectorAll('a[href]')){
        const path=new URL(a.href).pathname;
        if(!path.startsWith(prefix) || path.includes('/new') || path.includes('/methods')) continue;
        if(bad.test((a.innerText||a.getAttribute('aria-label')||''))) continue;
        return a.href;
      }
      return '';
    }, prefix);
    if(!href) return {opened:false, list:listFacts};
    await page.goto(href,{waitUntil:'domcontentloaded',timeout:25000});
    await waitReady(page);
    return {opened:!page.url().includes('/login'), list:listFacts, detail:await facts(page)};
  }
  report.pages.requests=await openFrom('/requests','/requests/');
  report.pages.projects=await openFrom('/projects','/projects/');
  report.pages.quotes=await openFrom('/quotes','/quotes/');
  report.pages.payments=await openFrom('/payments','/payments/');
  await page.goto('https://app.nestlancer.com/messages',{waitUntil:'domcontentloaded'});
  await waitReady(page);
  const msg=await page.evaluate(()=>[...document.querySelectorAll('a[href]')].map(a=>a.href).find(h=>{const p=new URL(h).pathname; return /\/messages\/.+/.test(p)&&!/new|inbox/.test(p);})||'');
  if(msg){ await page.goto(msg,{waitUntil:'domcontentloaded'}); await waitReady(page); }
  report.pages.thread={opened:!!msg, ...(await facts(page))};
  await page.goto('https://app.nestlancer.com/dashboard',{waitUntil:'domcontentloaded'});
  await waitReady(page);
  const tab=page.getByRole('tab',{name:/pay now/i});
  if(await tab.count()){ await tab.first().click().catch(()=>{}); await page.waitForTimeout(600); }
  report.pages.payNow={opened:await tab.count()>0, ...(await facts(page))};
  report.logout=await page.evaluate(async()=>(await fetch('/api/auth/logout',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:'{}'})).status);
}catch(err){ report.error=scrub(err.message); }
finally{
  report.writes=[...new Set(writes)].filter(x=>!/auth\/(login|logout|refresh)/.test(x));
  await browser.close();
}
const text=JSON.stringify(report,null,2);
if(text.includes(PASSWORD)) throw new Error('credential in output');
fs.writeFileSync(OUT,text+'\n');
console.log(text);
