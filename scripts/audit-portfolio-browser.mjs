#!/usr/bin/env node
/**
 * Portfolio browser QA with stock Chrome/Chromium + Node 22 CDP.
 * Does NOT modify assets. Requires Vite preview already running on 4173.
 * Output: docs/media-intake/browser-qa-2026-11.json
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawn } from 'node:child_process'
const base = process.env.PORTFOLIO_PREVIEW_URL || 'http://127.0.0.1:4173'
const chrome = process.env.CHROME_BIN || ['/usr/bin/google-chrome','/usr/bin/chromium','/usr/bin/chromium-browser'].find(fs.existsSync)
if (!chrome) { console.error('NOT RUN: Chromium not found'); process.exit(3) }
const tmp = fs.mkdtempSync(path.join(os.tmpdir(),'portfolio-cdp-'))
const processChrome = spawn(chrome,['--headless=new','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-first-run','--remote-debugging-port=0',`--user-data-dir=${tmp}`,'about:blank'],{stdio:'ignore'})
const sleep = ms=>new Promise(r=>setTimeout(r,ms))
let ws, seq=0
const pending = new Map()
const report = {browser:'Chromium CDP',routes:[],digitalGardenMotion:{status:'NOT RUN'},mp4Playback:{status:'NOT RUN'},viewport:{width:1440,height:900},runDate:new Date().toISOString()}
async function connect() {
  let port
  for(let i=0;i<100;i++){const f=path.join(tmp,'DevToolsActivePort');if(fs.existsSync(f)){port=fs.readFileSync(f,'utf8').split('\n')[0];break}await sleep(100)}
  if(!port)throw Error('Chrome DevToolsActivePort unavailable')
  const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()
  const tab=list.find(x=>x.type==='page')
  if(!tab)throw Error('No CDP page')
  ws=new WebSocket(tab.webSocketDebuggerUrl)
  ws.addEventListener('message',event=>{
    const msg=JSON.parse(event.data)
    if(msg.id&&pending.has(msg.id)){const p=pending.get(msg.id);pending.delete(msg.id);msg.error?p.reject(Error(JSON.stringify(msg.error))):p.resolve(msg.result)}
  })
  await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true})})
}
function command(method,params={}) {
  const id=++seq
  return new Promise((resolve,reject)=>{pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));setTimeout(()=>{if(pending.has(id)){pending.delete(id);reject(Error('CDP timeout '+method))}},20000)})
}
async function evalJs(expression){
  const result=await command('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true})
  if(result.exceptionDetails)throw Error(result.exceptionDetails.text||'JS evaluation error')
  return result.result.value
}
async function navigate(url){
  await command('Page.navigate',{url})
  await sleep(1500)
}
const auditExpression=`(async()=>{
  const imgs=[...document.querySelectorAll('img')];
  for(const im of imgs) im.loading='eager';
  const checks=await Promise.all(imgs.map(async im=>{
    let error='';
    try{await Promise.race([im.decode(),new Promise((_,reject)=>setTimeout(()=>reject(Error('decode timeout')),8000))])}catch(e){error=String(e?.message||e)}
    return {src:im.currentSrc||im.src,complete:im.complete,width:im.naturalWidth,height:im.naturalHeight,error}
  }));
  const anchors=[...document.querySelectorAll('a[href]')].map(a=>({href:a.href,text:a.textContent.trim().slice(0,80)}));
  return {title:document.title,h1:[...document.querySelectorAll('h1')].map(n=>n.textContent.trim()),images:checks,links:anchors,
    workCards:document.querySelectorAll('.editorial-work-card').length,workIndexRows:document.querySelectorAll('.work-index-row').length,
    workshopCards:document.querySelectorAll('.workshop-series-card').length,
    reducedMotion:matchMedia('(prefers-reduced-motion: reduce)').matches}
})()`
const routes=[
  ['home','/'],['work','/#/works'],['workshops','/#/workshops'],['archive','/#/archive'],
  ['about','/#/profile'],['digital-garden','/#/projects/digital-garden'],
  ['natgeo-crystal','/#/projects/natgeo-crystal'],['system-ersha','/#/projects/system-ersha'],
  ['work-compat','/portfolio/#/works'],
  ['titan-static','/portfolio/works/titan.html'],
  ['drop-flow-static','/portfolio/works/drop-flow.html'],
  ['timer-static','/portfolio/works/timer.html'],
  ['mke-static','/portfolio/works/mke-terminal.html'],
  ['rain-project','/#/projects/rain-singapore'],
  ['yujiayun-project','/#/projects/yujiayun-45m2']
]
async function motionCheck(){
  await navigate(base+'/#/projects/digital-garden')
  return evalJs(`(async()=>{
    const src='/portfolio/assets/digital-garden/digital-garden-loop.avif';
    const im=new Image();im.src=src;im.style.cssText='position:fixed;left:0;top:0;width:240px;height:90px;z-index:999999';
    document.body.appendChild(im);
    try {await im.decode()} catch(e){return {status:'FAIL',reason:'decode failed: '+String(e)}}
    const canvas=document.createElement('canvas');canvas.width=240;canvas.height=90;
    const ctx=canvas.getContext('2d',{willReadFrequently:true});
    const sample=()=>{ctx.clearRect(0,0,240,90);ctx.drawImage(im,0,0,240,90);return ctx.getImageData(0,0,240,90).data.slice()}
    const a=sample(); await new Promise(r=>setTimeout(r,1400));const b=sample();await new Promise(r=>setTimeout(r,1400));const c=sample();
    const count=(x,y)=>{let n=0;for(let i=0;i<x.length;i+=4){if(Math.abs(x[i]-y[i])+Math.abs(x[i+1]-y[i+1])+Math.abs(x[i+2]-y[i+2])>18)n++}return n}
    const diff1=count(a,b),diff2=count(b,c)
    im.remove()
    return {status:diff1>100||diff2>100?'PASS':'FAIL',width:im.naturalWidth,height:im.naturalHeight,changedPixelsAB:diff1,changedPixelsBC:diff2,framesSampled:3,intervalMs:1400}
  })()`)
}
try{
  await connect()
  await command('Page.enable')
  await command('Runtime.enable')
  await command('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false})
  for(const [name,route] of routes){
    await navigate(base+route)
    const details=await evalJs(auditExpression)
    const badImages=details.images.filter(i=>!i.width||i.error)
    report.routes.push({name,path:route,...details,badImages})
    console.log(name,JSON.stringify({h1:details.h1,images:details.images.length,badImages:badImages.length,workCards:details.workCards,workIndexRows:details.workIndexRows,workshopCards:details.workshopCards}))
  }
  report.digitalGardenMotion=await motionCheck()
  await navigate(base+'/#/projects/digital-garden')
  report.mp4Playback=await evalJs(`(async()=>{
    const video=document.querySelector('video.project-motion-video')
    if(!video)return {status:'FAIL',reason:'Video element missing'}
    let playError=''
    try{await Promise.race([video.play(),new Promise((_,reject)=>setTimeout(()=>reject(Error('play timeout')),6000))])}
    catch(e){playError=String(e)}
    const first=video.currentTime
    await new Promise(r=>setTimeout(r,1500))
    const second=video.currentTime
    return {status:second>first+0.3?'PASS':'FAIL',first,second,readyState:video.readyState,paused:video.paused,
      videoWidth:video.videoWidth,videoHeight:video.videoHeight,playError}
  })()`)
  console.log('Digital Garden MP4 browser playback:',JSON.stringify(report.mp4Playback))
  console.log('Digital Garden Chromium pixels:',JSON.stringify(report.digitalGardenMotion))
  await command('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]})
  await navigate(base+'/#/projects/digital-garden')
  report.reducedMotion=await evalJs(`({reduced:matchMedia('(prefers-reduced-motion: reduce)').matches,videoHidden:getComputedStyle(document.querySelector('.project-motion-video')).display==='none',stillVisible:getComputedStyle(document.querySelector('.project-motion-reduced')).display!=='none'})`)
  // Verify both language branches without relying on the runner's English locale.
  await navigate(base+'/')
  await evalJs("localStorage.setItem('portfolio-lang','zh')")
  report.chineseRoutes=[]
  for(const [name,route] of [['home','/'],['work','/#/works'],['workshops','/#/workshops'],['digital-garden','/#/projects/digital-garden']]){
    await command('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false})
    await navigate(base+route)
    await command('Page.reload',{ignoreCache:true})
    await sleep(1200)
    const details=await evalJs(auditExpression)
    report.chineseRoutes.push({name,...details,badImages:details.images.filter(i=>!i.width||i.error)})
    if(['home','work','workshops'].includes(name)){
      for(const [label,width,height] of [['desktop',1440,900],['mobile',390,844]]){
        await command('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:label==='mobile'})
        await sleep(350)
        const screenshot=await command('Page.captureScreenshot',{format:'png',fromSurface:true})
        const destination=path.resolve('docs/media-intake/qa-screenshots/'+name+'-zh-'+label+'.png')
        fs.mkdirSync(path.dirname(destination),{recursive:true})
        fs.writeFileSync(destination,Buffer.from(screenshot.data,'base64'))
      }
    }
    console.log('zh '+name,JSON.stringify({h1:details.h1,badImages:details.images.filter(i=>!i.width||i.error).length,workCards:details.workCards,workIndexRows:details.workIndexRows}))
  }
  const failures=[...report.routes,...(report.chineseRoutes||[])].flatMap(r=>r.badImages.map(i=>({route:r.name,src:i.src,error:i.error})))
  console.log('Broken image decode:',JSON.stringify(failures.slice(0,60)))
  if(failures.length)process.exitCode=2
  const home=report.routes.find(r=>r.name==='home')
  const work=report.routes.find(r=>r.name==='work')
  const workshop=report.routes.find(r=>r.name==='workshops')
  report.releaseGate={homeSelected:home?.workCards,workSelected:work?.workCards,additionalWork:work?.workIndexRows,workshopEntry:workshop?.links?.some(a=>a.href.includes('/20261031/web/'))}
  if(home?.workCards!==4||work?.workCards!==4||work?.workIndexRows<5||!report.releaseGate.workshopEntry)process.exitCode=2
  if(report.mp4Playback.status!=='PASS')process.exitCode=2
  if(!report.reducedMotion?.videoHidden||!report.reducedMotion?.stillVisible)process.exitCode=2
  const output=path.resolve('docs/media-intake/browser-qa-2026-11.json')
  fs.mkdirSync(path.dirname(output),{recursive:true})
  fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n')
  console.log('QA saved:',output,'releaseGate:',JSON.stringify(report.releaseGate),'exitCode:',process.exitCode||0)
}catch(e){console.error('Browser QA FAIL:',e);process.exitCode=2}
finally{
  ws?.close()
  processChrome.kill('SIGKILL')
  await Promise.race([new Promise(resolve=>processChrome.once('exit',resolve)),sleep(2500)])
  try {fs.rmSync(tmp,{force:true,recursive:true,maxRetries:10,retryDelay:250})}
  catch(e){console.warn('Chrome temporary profile cleanup warning:',String(e))}
}
