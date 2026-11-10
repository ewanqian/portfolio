// Verify existing CV detail -> original images -> complete track archive.
import fs from 'node:fs';import {pathToFileURL} from 'node:url';import assert from 'node:assert/strict';import {createHash} from 'node:crypto'
const {chromium}=await import(pathToFileURL(process.env.QA_PLAYWRIGHT).href)
const origin=(process.env.QA_ORIGIN||'http://127.0.0.1:4175').replace(/\/$/,'')
const dir='qa-artifacts/titan-gallery';fs.mkdirSync(dir,{recursive:true})
const source=JSON.parse(fs.readFileSync('assets/data/titan-tracks.json','utf8'))
const records=JSON.parse(fs.readFileSync('content/cv-records-2026-11.json','utf8')).records.filter(r=>r.project_id==='kashiwa-titan-2025'||r.related_work_ids?.includes('kashiwa-titan-2025'))
assert.ok(records.length>0,'TITAN must be linked from an existing CV record')
const report={origin,records:[],originals:[],passed:false};let browser
try{
 browser=await chromium.launch({headless:true})
 for(const prefix of ['','/portfolio'])for(const width of [375,1440])for(const record of records){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});const page=await context.newPage();page.setDefaultTimeout(30000)
  await page.goto(origin+prefix+'/works/records/'+record.id+'.html',{waitUntil:'domcontentloaded'})
  const images=page.locator('.cv-project-media img');assert.equal(await images.count(),3)
  await images.evaluateAll(els=>els.forEach(e=>e.loading='eager'))
  await images.evaluateAll(els=>Promise.all(els.map(e=>e.decode())))
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false)
  await page.screenshot({path:`${dir}/cv-media-${prefix?'compat':'root'}-${width}-${record.id}.png`,fullPage:true,animations:'disabled'})
  await page.locator('a[href="../titan-tracks.html"]').click();await page.locator('.track').first().waitFor();assert.equal(await page.locator('.track').count(),10)
  report.records.push({prefix,width,id:record.id,images:3,archiveCards:10,passed:true});await context.close()
 }
 for(const track of source.tracks.filter(t=>t.original)){
  const url=origin+'/'+source.asset_base+track.original
  const response=await fetch(url,{signal:AbortSignal.timeout(45000)});assert.equal(response.status,200,url)
  const bytes=Buffer.from(await response.arrayBuffer());const sha=createHash('sha1').update(Buffer.concat([Buffer.from('blob '+bytes.length+'\0'),bytes])).digest('hex')
  assert.equal(sha,track.blob,'Delivered original differs from historical blob')
  report.originals.push({id:track.id,url,bytes:bytes.length,blob:sha,passed:true})
 }
 report.passed=true;console.log('TITAN CV MEDIA PASS',JSON.stringify({records:report.records.length,originals:report.originals.length,origin}))
}catch(e){report.error=e.stack||String(e);console.error(report.error);process.exitCode=1}finally{fs.writeFileSync(`${dir}/cv-media-${origin.includes('127.0.0.1')?'preview':'live'}.json`,JSON.stringify(report,null,2));await browser?.close()}
