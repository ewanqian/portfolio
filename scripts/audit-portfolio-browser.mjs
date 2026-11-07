#!/usr/bin/env node
/**
 * Real-browser public site visual QA. Run from repository root after:
 * npm install --no-save --package-lock=false playwright
 * npx playwright install chromium
 * PORTFOLIO_SITE_BASE=https://ewanqian.site node scripts/audit-portfolio-browser.mjs
 *
 * Screenshot/click/DOM checks only; no login, modification or video autoplay.
 */
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const site=(process.env.PORTFOLIO_SITE_BASE||'https://ewanqian.site').replace(/\/+$/,'');
const output=path.resolve('reports/portfolio-browser-qa');
fs.mkdirSync(output,{recursive:true});
const configurations=[
  {id:'desktop',width:1440,height:900,isMobile:false},
  {id:'mobile-390',width:390,height:844,isMobile:true}
];
const pages=[
  {id:'home',path:'/'},
  {id:'atlas',path:'/works/atlas.html'},
  {id:'cabinet',path:'/works/cabinet.html'},
  {id:'timeline',path:'/works/timeline.html'},
  {id:'cv',path:'/works/cv.html'},
  {id:'project',path:'/works/projects/timer.html'}
];
const results=[],errors=[];
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
try{
 for(const viewport of configurations){
  const context=await browser.newContext({
   viewport:{width:viewport.width,height:viewport.height},
   isMobile:viewport.isMobile,deviceScaleFactor:1,
   reducedMotion:'reduce',locale:'zh-CN'
  });
  for(const target of pages){
   const entry={viewport:viewport.id,page:target.id,url:site+target.path,issues:[],warnings:[],imageCount:0};
   const page=await context.newPage();
   const resourceErrors=[];
   page.on('pageerror',error=>resourceErrors.push(error.message.slice(0,180)));
   try{
    const response=await page.goto(entry.url,{waitUntil:'domcontentloaded',timeout:35000});
    if(!response||!response.ok())entry.issues.push('HTTP '+(response?.status()??'no response'));
    await page.evaluate(()=>document.fonts.ready);
    await page.waitForTimeout(250);
    // Native loading=lazy images may be reported as complete with zero naturalWidth
    // before the browser has fetched them. Force their load before image integrity QA.
    await page.evaluate(async()=>{
      const images=Array.from(document.images);
      for(const img of images)img.loading='eager';
      await Promise.all(images.map(img=>img.decode().catch(()=>null)));
    });
    const state=await page.evaluate(()=>{
     const imgs=Array.from(document.images);
     const overflow=document.documentElement.scrollWidth-window.innerWidth;
     const bodyOverflow=document.body.scrollWidth-window.innerWidth;
     return {
      title:document.title,
      headings:Array.from(document.querySelectorAll('h1')).map(x=>x.textContent.trim()),
      documentWidth:document.documentElement.scrollWidth,
      viewportWidth:window.innerWidth,
      overflow:Math.max(overflow,bodyOverflow),
      brokenImages:imgs.filter(x=>x.complete&&x.naturalWidth===0).map(x=>x.currentSrc||x.src).slice(0,15),
      imageCount:imgs.length,
      horizontalElements:Array.from(document.querySelectorAll('body *')).filter(el=>{
       const r=el.getBoundingClientRect(),style=getComputedStyle(el);
       return style.position!=='fixed'&&r.width>0&&(r.left<-8||r.right>window.innerWidth+8);
      }).slice(0,8).map(el=>({tag:el.tagName,className:String(el.className).slice(0,80)}))
     };
    });
    Object.assign(entry,state);
    if(state.overflow>3)entry.issues.push('Horizontal overflow '+state.overflow+'px');
    if(!state.headings.length)entry.issues.push('No primary h1');
    if(state.brokenImages.length)entry.issues.push('Broken images: '+state.brokenImages.join(' | '));
    if(resourceErrors.length)entry.issues.push('Client runtime error: '+resourceErrors.join(' | '));
    if(target.id==='atlas'){
     const input=page.locator('#q');
     if(await input.count()){
      const cards=page.locator('#entries .item');
      entry.cardCount=await cards.count();
      await input.fill('nomatch-query-999999');
      const visible=await cards.evaluateAll(items=>items.filter(x=>getComputedStyle(x).display!=='none').length);
      entry.searchNoMatchVisible=visible;
      if(visible)entry.issues.push('Atlas search did not hide '+visible+' cards');
      await input.fill('TIMER');
      entry.searchTimerMatches=await cards.evaluateAll(items=>items.filter(x=>getComputedStyle(x).display!=='none').length);
      if(!entry.searchTimerMatches)entry.issues.push('Atlas TIMER search has zero visible matches');
      await input.fill('');
     }else entry.issues.push('Atlas search missing');
    }
    if(target.id==='cabinet'){
     const signed=page.locator('img[src*="onefive-classy-crush-signed"]');
     if(!await signed.count())entry.issues.push('Signed CD image absent');
    }
    if(target.id==='timeline'){
     entry.recordLinks=await page.locator('a[href^="records/"]').count();
     if(entry.recordLinks!==61)entry.issues.push('Timeline expected 61 record links; got '+entry.recordLinks);
    }
    if(target.id==='home'){
     const link=page.locator('a[href="/works/atlas.html"]');
     if(!await link.count())entry.issues.push('Home lacks Atlas entry');
     if(viewport.isMobile){
      const toggle=page.locator('#menuToggle');
      if(await toggle.count()){
       await toggle.click();
       entry.menuExpanded=await toggle.getAttribute('aria-expanded');
       if(entry.menuExpanded!=='true')entry.issues.push('Mobile menu did not expand');
       const nav=page.locator('#site-nav a[href="/works/atlas.html"]');
       if(!await nav.isVisible())entry.issues.push('Atlas navigation not visible in mobile menu');
       await toggle.click();
      }else entry.issues.push('Mobile nav toggle missing');
     }
    }
    // Screenshots always capture the original, unfiltered layout.
    await page.screenshot({path:path.join(output,viewport.id+'-'+target.id+'.png'),fullPage:true,animations:'disabled'});
    if(state.horizontalElements.length&&state.overflow>3)entry.warnings.push('Potential overflow origins in horizontalElements');
   }catch(error){entry.issues.push('Browser/navigation: '+String(error.message||error).slice(0,300))}
   finally{await page.close()}
   results.push(entry);
   if(entry.issues.length)errors.push({viewport:entry.viewport,page:entry.page,issues:entry.issues});
   console.log(viewport.id+' / '+target.id+' : '+(entry.issues.length?'FAIL':'PASS')+' '+entry.issues.join('; '));
  }
  await context.close();
 }
}finally{await browser.close()}
const report={schema:'ewanqian.portfolio.browser-qa.v1',checked_at:new Date().toISOString(),site,viewports:configurations,pages,results,errors,
  note:'Screenshots and browser DOM diagnostics. External video playback and third-party image rights are not tested.'};
fs.writeFileSync(path.resolve('reports/portfolio-browser-qa.json'),JSON.stringify(report,null,2)+'\n');
if(errors.length){console.error('Browser QA: '+errors.length+' failed page/viewport cases');process.exitCode=1}
else console.log('Browser QA: '+results.length+'/'+results.length+' page/viewport cases passed');
