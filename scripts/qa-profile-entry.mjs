#!/usr/bin/env node
// Read-only Chromium acceptance: both published entry prefixes, both languages,
// chapter clicks, work links, image decode, CV hub and exact PDF bytes.
import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { pathToFileURL } from 'node:url'
const { chromium } = await import(process.env.QA_PLAYWRIGHT ? pathToFileURL(process.env.QA_PLAYWRIGHT).href : 'playwright')
const origin = (process.env.QA_ORIGIN || 'http://127.0.0.1:4173').replace(/\/$/, '')
const dir = path.resolve(process.env.QA_ARTIFACT_DIR || 'docs/media-intake/profile-entry-qa')
fs.mkdirSync(dir, {recursive:true})
const report = {at:new Date().toISOString(),origin,commit:process.env.GITHUB_SHA,samples:[],links:[],pdfs:[],limitations:['Chromium only; not Safari or a real headset','No email submission or third-party video playback'],passed:false}
let browser
try {
 browser = await chromium.launch({headless:true})
 for (const prefix of ['', '/portfolio']) for (const lang of ['zh','en']) for (const width of [375,768,1440]) {
  const context = await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'})
  await context.addInitScript(l => localStorage.setItem('portfolio-lang',l),lang)
  const page = await context.newPage()
  page.setDefaultTimeout(20000)
  const errors=[]
  page.on('pageerror',e=>errors.push(e.message))
  const url=origin+prefix+'/#/profile'
  const response=await page.goto(url,{waitUntil:'networkidle'})
  assert.equal(response.status(),200,url)
  await page.locator('.profile-editorial-hero h1').waitFor()
  assert.match(await page.locator('.profile-editorial-hero').innerText(),lang==='zh'?/媒体艺术家/:/media artist/i)
  assert.equal(await page.locator('.profile-index nav a').count(),7)
  assert.equal(await page.locator('.profile-work-list article').count(),6)
  await page.locator('.profile-editorial-page img').evaluateAll(imgs=>imgs.forEach(img=>img.loading='eager'))
  const images=await page.locator('.profile-editorial-page img').evaluateAll(async imgs=>Promise.all(imgs.map(async img=>{await img.decode();return {src:img.currentSrc,width:img.naturalWidth,height:img.naturalHeight}})))
  assert.equal(images.length,7)
  assert.ok(images.every(x=>x.width>0&&x.height>0))
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2)
  assert.equal(overflow,false,`overflow ${url} ${lang} ${width}`)
  const sample={prefix,lang,width,images,chapters:[],errors}
  report.samples.push(sample)
  for (const anchor of ['practice','longread','works','method','cv','network','images']) {
   const index=['practice','longread','works','method','cv','network','images'].indexOf(anchor)
   await page.locator('.profile-index nav a').nth(index).click()
   await page.waitForFunction(id=>{const r=document.getElementById(id)?.getBoundingClientRect();return r&&r.top>=-2&&r.top<220},'profile-'+anchor)
   assert.equal(new URL(page.url()).hash,'#/profile','chapter must not overwrite HashRouter')
   sample.chapters.push(anchor)
  }
  await page.evaluate(()=>scrollTo(0,0))
  await page.screenshot({path:path.join(dir,`${prefix?'compat':'root'}-${lang}-${width}.png`),fullPage:true,animations:'disabled'})
  assert.deepEqual(errors,[],`profile runtime errors ${url}`)
  // The language switch must update copy and keep the current route.
  await page.locator(`.language-toggle-option`).nth(lang==='zh'?1:0).click()
  await page.waitForFunction(l=>document.documentElement.dataset.siteLang===l,lang==='zh'?'en':'zh')
  assert.equal(new URL(page.url()).hash,'#/profile')
  if (width===1440&&lang==='zh') {
   for(let i=0;i<6;i++) {
    await page.goto(url,{waitUntil:'networkidle'})
    const link=page.locator('.profile-work-list article').nth(i).locator('a').first()
    const title=await link.innerText()
    await link.click()
    await page.waitForFunction(()=>location.hash!=='#/profile')
    await page.waitForFunction(()=>document.querySelector('main')?.innerText?.trim().length>100||document.body.innerText.trim().length>250)
    const target=page.url()
    assert.ok(!/404|not found/i.test(await page.title()),target)
    report.links.push({prefix,title,target,passed:true})
    await page.goBack({waitUntil:'domcontentloaded'})
    await page.locator('.profile-editorial-hero h1').waitFor()
   }
   await page.goto(url,{waitUntil:'networkidle'})
   await page.locator('.profile-editorial-hero a[href="/works/cv.html"]').click()
   await page.waitForURL('**/works/cv.html')
   assert.ok((await page.locator('a[href$=".pdf"]').count())>=2,'CV hub needs both PDF downloads')
   report.links.push({prefix,title:'CV hub',target:page.url(),passed:true})
   await page.goBack({waitUntil:'domcontentloaded'})
   await page.locator('.profile-editorial-hero h1').waitFor()
  }
  await context.close()
  console.log('PROFILE SAMPLE PASS',prefix||'/',lang,width)
 }
 const manifest=JSON.parse(fs.readFileSync('content/publication-manifest-2026-11.json','utf8'))
 for(const lang of ['zh','en']) {
  const spec=manifest.cv_pdf[lang]
  const url=origin+new URL(spec.public_url).pathname
  const response=await fetch(url,{signal:AbortSignal.timeout(30000)})
  assert.equal(response.status,200,url)
  const bytes=Buffer.from(await response.arrayBuffer())
  assert.equal(bytes.subarray(0,5).toString(),'%PDF-',url)
  const hash=createHash('sha256').update(bytes).digest('hex')
  assert.equal(hash,spec.sha256,'published PDF must match manifest')
  report.pdfs.push({lang,url,size:bytes.length,sha256:hash,passed:true})
 }
 report.passed=true
 console.log('PROFILE ACCEPTANCE PASS',JSON.stringify({samples:report.samples.length,chapterClicks:report.samples.reduce((n,s)=>n+s.chapters.length,0),links:report.links.length,pdfs:report.pdfs.length}))
} catch(e) {
 report.error=e.stack||String(e)
 console.error(report.error)
 process.exitCode=1
} finally {
 fs.writeFileSync(path.join(dir,'report.json'),JSON.stringify(report,null,2)+'\n')
 await browser?.close()
}
