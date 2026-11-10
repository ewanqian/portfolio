import fs from 'node:fs';import {pathToFileURL} from 'node:url';import assert from 'node:assert/strict'
const {chromium}=await import(pathToFileURL(process.env.QA_PLAYWRIGHT).href)
const origin=process.env.QA_ORIGIN||'http://127.0.0.1:4175';const dir='qa-artifacts/titan-gallery';fs.mkdirSync(dir,{recursive:true})
const report={origin,samples:[],passed:false,limitations:['External MANA/Bilibili playback not verified; links restored from historical source','No PDF-derived images introduced']};let browser
try{browser=await chromium.launch({headless:true});for(const prefix of ['','/portfolio'])for(const width of [375,1440])for(const kind of ['react','static']){
 const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});await context.addInitScript(()=>localStorage.setItem('portfolio-lang','zh'));const page=await context.newPage();page.setDefaultTimeout(20000)
 await page.goto(origin+prefix+(kind==='react'?'/#/projects/kashiwa-titan':'/works/titan-tracks.html'),{waitUntil:'networkidle'})
 const cards=page.locator(kind==='react'?'.titan-track':'.track');await cards.first().waitFor();assert.equal(await cards.count(),10)
 await cards.locator('img').evaluateAll(imgs=>imgs.forEach(i=>i.loading='eager'))
 const images=await cards.locator('img').evaluateAll(async imgs=>Promise.all(imgs.map(async i=>{await i.decode();return {src:i.currentSrc,width:i.naturalWidth,height:i.naturalHeight}})));assert.ok(images.every(i=>i.width>0&&i.height>0))
 const links=await cards.locator('a').evaluateAll(els=>els.map(a=>a.getAttribute('href')));assert.equal(new Set(links.filter(x=>x.endsWith('.png'))).size,9);assert.equal(new Set(links.filter(x=>x.endsWith('.jpeg'))).size,10)
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false)
 await page.screenshot({path:`${dir}/${prefix?'compat':'root'}-${kind}-${width}.png`,fullPage:true,animations:'disabled'})
 report.samples.push({prefix,width,kind,images,passed:true});await context.close()
}report.passed=true;console.log('TITAN GALLERY PASS',report.samples.length)}catch(e){report.error=e.stack||String(e);console.error(report.error);process.exitCode=1}finally{fs.writeFileSync(dir+'/report.json',JSON.stringify(report,null,2));await browser?.close()}
