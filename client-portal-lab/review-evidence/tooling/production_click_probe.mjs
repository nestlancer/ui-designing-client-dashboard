import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
const OUT = path.resolve('..', 'raw', 'production-click-facts.json');
const PASSWORD = process.env.NL_PASSWORD || '';
if (!PASSWORD) process.exit(2);
const WORDS = ['Overview','Progress','Milestones','Deliverables','Messages','Files','Timeline','Attachments','Status','Receipt','Invoice','Reply','Accept','Decline','Pay','Download','Contract','Budget','Try again','Draft','Send','Thread','Conversation'];
async function facts(page){
  return page.evaluate((words)=>{
    const text=(document.querySelector('main')?.innerText||'').replace(/\s+/g,' ');
    return {path:location.pathname.replace(/\/[0-9a-f-]{8,}|\/[^/]*\d[^/]*/gi,'/:id'),h1:document.querySelectorAll('h1').length,composer:!!document.querySelector('textarea,[contenteditable="true"]'),hScroll:document.documentElement.scrollWidth-innerWidth,len:text.length,words:words.filter(w=>text.toLowerCase().includes(w.toLowerCase()))};
  }, WORDS);
}
const browser=await chromium.launch({headless:true});
const page=await (await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce',timezoneId:'Asia/Kolkata'})).newPage();
page.on('dialog',d=>d.dismiss());
const writes=[];
page.on('response',r=>{const m=r.request().method(); if(['POST','PUT','PATCH','DELETE'].includes(m)&&/nestlancer\.com$/.test(new URL(r.url()).hostname)) writes.push(m+' '+new URL(r.url()).pathname.replace(/\/[0-9a-f-]{8,}/gi,'/:id')+' '+r.status());});
const report={};
try{
  await page.goto('https://app.nestlancer.com/login',{waitUntil:'domcontentloaded',timeout:30000});
  await page.waitForSelector('#email'); await page.waitForTimeout(800);
  if(await page.getByRole('button',{name:/^Dismiss$/}).count()) await page.getByRole('button',{name:/^Dismiss$/}).click().catch(()=>{});
  await page.locator('#email').fill('arjun.mehta@nestlancer.com');
  await page.locator('#password').fill(PASSWORD);
  await page.locator('form button[type="submit"]').click();
  await page.waitForURL(u=>!u.pathname.includes('/login'),{timeout:20000});
  await page.locator('h1').first().waitFor({state:'visible',timeout:15000});
  async function clickFirst(list, selector){
    await page.goto('https://app.nestlancer.com'+list,{waitUntil:'domcontentloaded'});
    await page.locator('h1').first().waitFor({state:'visible',timeout:15000});
    const before=page.url();
    const loc=page.locator(selector).first();
    const count=await loc.count();
    if(!count) return {opened:false};
    const label=((await loc.innerText().catch(()=>''))||'').slice(0,40);
    if(/pay now|approve|accept|send|delete|download|upload/i.test(label)) return {opened:false, reason:'mutating label skipped'};
    await loc.click({timeout:4000}).catch(()=>{});
    await page.waitForTimeout(1200);
    return {opened:page.url()!==before, ...(await facts(page))};
  }
  report.project=await clickFirst('/projects','main a, main [role="link"], main article, main tbody tr');
  report.payment=await clickFirst('/payments','main tbody tr a, main tbody tr');
  report.message=await clickFirst('/messages','main a, main [role="link"], main li');
  report.logout=await page.evaluate(async()=>(await fetch('/api/auth/logout',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:'{}'})).status);
}catch(err){ report.error=String(err.message).slice(0,160); }
finally{ report.writes=[...new Set(writes)].filter(x=>!/auth\/(login|logout|refresh)/.test(x)); await browser.close(); }
const text=JSON.stringify(report,null,2);
if(text.includes(PASSWORD)) throw new Error('credential in output');
fs.writeFileSync(OUT,text+'\n');
console.log(text);
