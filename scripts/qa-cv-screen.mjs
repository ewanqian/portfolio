import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'
import {pathToFileURL} from 'node:url'
const {chromium}=await import(pathToFileURL(process.env.QA_PLAYWRIGHT).href)
const origin=(process.env.QA_ORIGIN||'http://127.0.0.1:4173').replace(/\/$/,'')
const dir=path.resolve(process.env.QA_ARTIFACT_DIR||'docs/media-intake/cv-screen-qa')
fs.mkdirSync(dir,{recursive:true})
const selection=JSON.parse(fs.readFileSync('content/cv-selection.json','utf8'))
const records=JSON.parse(fs.readFileSync('content/cv-records-2026-11.json','utf8')).records
const byId=new Map(records.map(x=>[x.id,x]))
const ids=selection.sections.flatMap(s=>s.record_ids)
const report={at:new Date().toISOString(),origin,samples:[],passed:false,limitations:['Chromium only; PDF typography unchanged; no external video playback']}
let browser
try{
 browser=await chromium.launch({headless:true})
 for(const prefix of ['','/portfolio'])for(const width of [375,768,1440]){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'})
  await context.addInitScript(()=>localStorage.setItem('portfolio-lang','zh'))
  const page=await context.newPage();page.setDefaultTimeout(25000)
  await page.goto(origin+prefix+'/#/cv',{waitUntil:'networkidle'})
  const errors=[];page.on('pageerror',e=>errors.push(e.message))
  for(const lang of ['zh','en']){
   await page.locator('.cv-language button').nth(lang==='zh'?0:1).click()
   await page.waitForFunction(l=>document.documentElement.dataset.siteLang===l,lang)
   assert.equal(await page.locator('.cv-screen-row').count(),ids.length)
   const rows=await page.locator('.cv-screen-row').evaluateAll(els=>els.map(e=>({id:e.dataset.recordId,text:e.querySelector('span').textContent,href:e.getAttribute('href')})))
   assert.deepEqual(rows.map(x=>x.id),ids,'same selected record IDs in both languages')
   for(const row of rows){const rec=byId.get(row.id);assert.equal(row.text,lang==='zh'?(rec.cv_zh||rec.zh):(rec.cv_en||rec.en))}
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false)
   await page.locator('.cv-screen-portrait img').evaluate(img=>img.decode())
   for(let i=0;i<selection.sections.length;i++){
    await page.locator('.cv-screen-index nav a').nth(i).click()
    await page.waitForFunction(id=>{const r=document.getElementById(id).getBoundingClientRect();return r.top>=-2&&r.top<220},'cv-'+selection.sections[i].id)
    assert.equal(new URL(page.url()).hash,'#/cv')
   }
   await page.evaluate(()=>scrollTo(0,0))
   await page.screenshot({path:path.join(dir,`${prefix?'compat':'root'}-${lang}-${width}.png`),fullPage:true,animations:'disabled'})
   assert.equal(await page.locator('.cv-screen-downloads a[href$=".pdf"]').count(),2)
   report.samples.push({prefix,width,lang,records:rows.length,chapters:selection.sections.length,errors})
  }
  // Main-site language preference is retained when leaving CV.
  await page.locator('.cv-screen-downloads a[href$="/profile"]').click()
  await page.locator('.profile-editorial-hero').waitFor()
  assert.equal(await page.evaluate(()=>document.documentElement.dataset.siteLang),'en')
  await context.close()
 }
 report.passed=true;console.log('CV SCREEN PASS',JSON.stringify({samples:report.samples.length,records:ids.length}))
}catch(e){report.error=e.stack||String(e);console.error(report.error);process.exitCode=1}
finally{fs.writeFileSync(path.join(dir,'report.json'),JSON.stringify(report,null,2));await browser?.close()}
