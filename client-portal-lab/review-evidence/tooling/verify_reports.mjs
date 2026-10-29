import { chromium } from 'playwright';
import fs from 'node:fs'; import path from 'node:path';
const lab=path.resolve('..','..'), s=JSON.parse(fs.readFileSync(path.join(lab,'review-evidence/scores.json')));
const urls=['/client-portal-lab/rank.html',...s.families.map(f=>`/client-portal-lab/families/${f.family_dir}/rank.html`)];
const browser=await chromium.launch({headless:true});let records=[];
for(const [name,viewport] of Object.entries({desktop:{width:1440,height:1000},mobile:{width:390,height:844}})){
 const context=await browser.newContext({viewport,reducedMotion:'reduce'});
 for(const url of urls){
  const page=await context.newPage();let errors=[];page.on('pageerror',e=>errors.push('pageerror: '+e.message));page.on('console',m=>{if(m.type()==='error')errors.push('console: '+m.text())});
  let response=await page.goto('http://127.0.0.1:8130'+url,{waitUntil:'load',timeout:30000});
  await page.keyboard.press('Tab');let firstFocus=await page.evaluate(()=>({tag:document.activeElement?.tagName,text:document.activeElement?.textContent?.trim().slice(0,75),visible:!!document.activeElement?.getBoundingClientRect().width}));
  let state=await page.evaluate(()=>({hscroll:document.documentElement.scrollWidth-innerWidth,failedLoadedImages:[...document.images].filter(i=>i.complete&&i.currentSrc&&!i.naturalWidth).map(i=>i.getAttribute('src'))}));
  records.push({viewport:name,url,http:response.status(),...state,firstFocus,errors});await page.close();
 }
 await context.close();
}
await browser.close();let out={tool:'Playwright 1.49.1, Chromium 131.0.6778.33',scope:'21 generated reports at desktop/mobile; load, first keyboard Tab, console/page errors, loaded image failures and document overflow. Not an exhaustive keyboard, accessibility, or visual audit.',records};fs.writeFileSync(path.join(lab,'review-evidence/raw/report-verification.json'),JSON.stringify(out,null,2)+'\n');console.log(JSON.stringify({runs:records.length,failures:records.filter(x=>x.http!==200||x.hscroll>0||x.errors.length||x.failedLoadedImages.length||!x.firstFocus.visible)},null,2));
