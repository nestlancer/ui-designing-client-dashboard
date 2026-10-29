import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
const OUT = path.resolve('..', 'raw', 'production-detail-facts.json');
const PASSWORD = process.env.NL_PASSWORD || '';
if (!PASSWORD) process.exit(2);
const WORDS = ['Overview','Progress','Milestones','Deliverables','Messages','Files','Timeline','Attachments','Status','Approved','Pending','Receipt','Invoice','Reply','Accept','Decline','Pay','Download','Contract','Terms','Budget','Try again','Draft','UPI','Card','Bank','Work Hub','Billing','Quote','Send'];
async function facts(page){
  return page.evaluate((words)=>{
    const text=(document.querySelector('main')?.innerText||'').replace(/\s+/g,' ');
    return {h1:document.querySelectorAll('h1').length,tabs:document.querySelectorAll('[role="tab"]').length,buttons:document.querySelectorAll('main button').length,fields:document.querySelectorAll('main textarea,main input,main select').length,composer:!!document.querySelector('textarea,[contenteditable="true"]'),hScroll:document.documentElement.scrollWidth-innerWidth,len:text.length,words:words.filter(w=>text.toLowerCase().includes(w.toLowerCase()))};
  }, WORDS);
}
async function settle(page){
  await page.locator('h1').first().waitFor({state:'visible', timeout:15000});
  await page.waitForTimeout(600);
}
const browser=await chromium.launch({headless:true});
const page=await (await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce',timezoneId:'Asia/Kolkata'})).newPage();
page.on('dialog',d=>d.dismiss());
const writes=[];
page.on('response',r=>{const m=r.request().method(); if(['POST','PUT','PATCH','DELETE'].includes(m)&&/nestlancer\.com$/.test(new URL(r.url()).hostname)) writes.push(m+' '+new URL(r.url()).pathname.replace(/\/[0-9a-f-]{8,}/gi,'/:id')+' '+r.status());});
const report={pages:{}};
try{
  await page.goto('https://app.nestlancer.com/login',{waitUntil:'domcontentloaded',timeout:30000});
  await page.waitForSelector('#email');
  await page.waitForTimeout(1000);
  if(await page.getByRole('button',{name:/^Dismiss$/}).count()) await page.getByRole('button',{name:/^Dismiss$/}).click().catch(()=>{});
  await page.locator('#email').fill('arjun.mehta@nestlancer.com');
  await page.locator('#password').fill(PASSWORD);
  await page.locator('form button[type="submit"]').click();
  await page.waitForURL(u=>!u.pathname.includes('/login'),{timeout:20000});
  await settle(page);
  report.login={ok:true};
  async function openFrom(list, prefix){
    await page.goto('https://app.nestlancer.com'+list,{waitUntil:'domcontentloaded',timeout:25000});
    await settle(page);
    const listFacts=await facts(page);
    const href=await page.evaluate((prefix)=>{
      const bad=/pay now|approve|accept|send|delete|download|upload/i;
      for(const a of document.querySelectorAll('a[href]')){
        const path=new URL(a.href).pathname;
        if(!path.startsWith(prefix)||path.includes('/new')||path.includes('/methods')) continue;
        if(bad.test(a.innerText||a.getAttribute('aria-label')||'')) continue;
        return a.href;
      }
      return '';
    }, prefix);
    if(!href) return {opened:false, list:listFacts};
    await page.goto(href,{waitUntil:'domcontentloaded',timeout:25000});
    await settle(page).catch(()=>{});
    return {opened:!page.url().includes('/login'), detail:await facts(page)};
  }
  for (const [name,list,prefix] of [['requests','/requests','/requests/'],['projects','/projects','/projects/'],['quotes','/quotes','/quotes/'],['payments','/payments','/payments/']]){
    report.pages[name]=await openFrom(list, prefix);
  }
  await page.goto('https://app.nestlancer.com/messages',{waitUntil:'domcontentloaded'});
  await settle(page);
  const msg=await page.evaluate(()=>[...document.querySelectorAll('a[href]')].map(a=>a.href).find(h=>{const p=new URL(h).pathname; return p.includes('/messages/')&&!/new|inbox/.test(p);})||'');
  if(msg){ await page.goto(msg,{waitUntil:'domcontentloaded'}); await settle(page).catch(()=>{}); }
  report.pages.thread={opened:!!msg, ...(await facts(page))};
  report.logout=await page.evaluate(async()=>(await fetch('/api/auth/logout',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:'{}'})).status);
}catch(err){ report.error=String(err.message).slice(0,180); }
finally{ report.writes=[...new Set(writes)].filter(x=>!/auth\/(login|logout|refresh)/.test(x)); await browser.close(); }
const text=JSON.stringify(report,null,2);
if(text.includes(PASSWORD)) throw new Error('credential in output');
fs.writeFileSync(OUT,text+'\n');
console.log(text);
