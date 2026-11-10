#!/usr/bin/env node
// Chromium-only, non-destructive audit. Keep the legacy script name for CI callers.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import {spawn} from 'node:child_process'
import {homeMainlineWorkIds} from '../react/src/data/siteTaxonomy.js'
const expectedCount=homeMainlineWorkIds.length
if(!expectedCount||new Set(homeMainlineWorkIds).size!==expectedCount)throw Error('Invalid canonical homepage selection')
const bin=process.env.CHROME_BIN || ['/usr/bin/google-chrome','/usr/bin/chromium','/usr/bin/chromium-browser'].find(fs.existsSync)
if(!bin){console.error('NOT RUN: Chrome unavailable');process.exit(3)}
const home='http://127.0.0.1:4173/'
const dir=path.resolve('docs/media-intake/home-nine-qa')
fs.mkdirSync(dir,{recursive:true})
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'portfolio-home-'))
let stderr=''
const proc=spawn(bin,['--headless=new','--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--remote-debugging-port=0',`--user-data-dir=${tmp}`,'about:blank'],{stdio:['ignore','ignore','pipe']})
proc.stderr.on('data',chunk=>{stderr=(stderr+chunk.toString()).slice(-20000)})
const sleep=ms=>new Promise(r=>setTimeout(r,ms))
let ws,seq=0
const pending=new Map()
function call(method,params={}){
 const id=++seq
 return new Promise((resolve,reject)=>{
  const timer=setTimeout(()=>{pending.delete(id);reject(Error(method+' timed out'))},30000)
  pending.set(id,{resolve,reject,timer})
  ws.send(JSON.stringify({id,method,params}))
 })
}
async function evaluate(expression){
 const r=await call('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true})
 if(r.exceptionDetails)throw Error(r.exceptionDetails.text)
 return r.result.value
}
const report={date:new Date().toISOString(),origin:home,expectedIds:homeMainlineWorkIds,samples:[],limitations:['Chromium only, not Safari/Firefox','External URLs may be unavailable independently of deployment','Image crop aesthetic requires human review']}
try{
 let port
 for(let i=0;i<300;i++){const f=path.join(tmp,'DevToolsActivePort');if(fs.existsSync(f)){port=fs.readFileSync(f,'utf8').split('\n')[0];break}if(proc.exitCode!==null)throw Error('Chrome exited '+proc.exitCode+': '+stderr);await sleep(100)}
 if(!port)throw Error('Chrome did not start: '+stderr)
 const pages=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json()
 ws=new WebSocket(pages.find(x=>x.type==='page').webSocketDebuggerUrl)
 await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true})})
 ws.addEventListener('message',e=>{const v=JSON.parse(e.data);if(v.id&&pending.has(v.id)){const p=pending.get(v.id);clearTimeout(p.timer);pending.delete(v.id);v.error?p.reject(Error(JSON.stringify(v.error))):p.resolve(v.result)}})
 await call('Page.enable');await call('Runtime.enable')
 await call('Page.navigate',{url:home});await sleep(1000)
 await evaluate("localStorage.setItem('portfolio-lang','zh')")
 for(const [mode,width,height] of [['desktop',1440,900],['mobile',390,844]]){
  await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:mode==='mobile'})
  await call('Page.navigate',{url:home});await sleep(1700)
  const result=await evaluate(`(async()=>{
   const cards=[...document.querySelectorAll('.editorial-work-card')]
   const images=await Promise.all(cards.map(async c=>{
    const image=c.querySelector('img'),link=c.querySelector('a[href]'),rect=image?.getBoundingClientRect()
    let error=''
    try{if(image)await Promise.race([image.decode(),new Promise((_,rej)=>setTimeout(()=>rej(Error('decode timeout')),7000))])}
    catch(e){error=String(e.message||e)}
    return {title:c.querySelector('h3')?.textContent?.trim(),src:image?.currentSrc||image?.src,
      naturalWidth:image?.naturalWidth,naturalHeight:image?.naturalHeight,
      displayedWidth:Math.round(rect?.width||0),displayedHeight:Math.round(rect?.height||0),
      objectFit:image?getComputedStyle(image).objectFit:'',link:link?.href,error}
   }))
   const grid=document.querySelector('.editorial-work-grid')
   const research=document.querySelector('.home-current-research')?.innerText||''
   return {title:document.title,cards:cards.length,columns:grid?new Set(cards.map(c=>Math.round(c.getBoundingClientRect().left))).size:0,
     images,hasBpmReport:research.includes('BPM System 2026'),hasProfileLink:!!document.querySelector('a[href*="profile"]'),
     horizontalOverflow:document.documentElement.scrollWidth>innerWidth+2,
     intro:document.querySelector('.editorial-intro-copy')?.innerText?.slice(0,350)}
  })()`)
  report.samples.push({mode,width,height,...result})
  const img=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true})
  fs.writeFileSync(path.join(dir,'home-'+mode+'.png'),Buffer.from(img.data,'base64'))
  console.log(mode,JSON.stringify({cards:result.cards,expectedCount,columns:result.columns,bpm:result.hasBpmReport,badImages:result.images.filter(i=>i.error||!i.naturalWidth),overflow:result.horizontalOverflow}))
 }
 const bad=report.samples.flatMap(s=>s.images.filter(x=>x.error||!x.naturalWidth||!x.link||!x.title).map(x=>({mode:s.mode,...x})))
 report.failures=bad
 report.passed=report.samples.every(s=>s.cards===expectedCount&&new Set(s.images.map(i=>i.link)).size===expectedCount&&s.columns===(s.mode==='desktop'?3:2)&&s.hasBpmReport&&s.hasProfileLink&&!s.horizontalOverflow)&&bad.length===0
 fs.writeFileSync(path.join(dir,'report.json'),JSON.stringify(report,null,2)+'\n')
 if(!report.passed)process.exitCode=2
}catch(e){console.error('QA ERROR',String(e));report.error=String(e);fs.writeFileSync(path.join(dir,'report.json'),JSON.stringify(report,null,2)+'\n');process.exitCode=2}
finally{for(const p of pending.values())clearTimeout(p.timer);ws?.close();proc.kill('SIGKILL');fs.writeFileSync(path.join(dir,'chromium-stderr.txt'),stderr);await sleep(300);fs.rmSync(tmp,{recursive:true,force:true})}
