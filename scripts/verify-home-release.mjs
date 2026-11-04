#!/usr/bin/env node
// Release QA: rendered homepage hierarchy, static image decoding, writing routes,
// mobile overflow, bilingual switch. No network except localhost.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import {spawn} from 'node:child_process'
const chrome=process.env.CHROME_BIN||'/usr/bin/google-chrome'
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'release-qa-'))
const child=spawn(chrome,['--headless=new','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--remote-debugging-port=0',`--user-data-dir=${dir}`,'about:blank'],{stdio:'ignore'})
const sleep=ms=>new Promise(r=>setTimeout(r,ms))
let ws,id=0;const callbacks=new Map()
const report={release:'home-editorial-reactor',date:new Date().toISOString(),checks:[]}
async function send(method,params={}){
  const token=++id;const answer=new Promise((resolve,reject)=>{callbacks.set(token,{resolve,reject});setTimeout(()=>{if(callbacks.has(token)){callbacks.delete(token);reject(Error('CDP timeout '+method))}},16000)})
  ws.send(JSON.stringify({id:token,method,params}))
  return answer
}
async function evaluate(expression) {
  const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true})
  if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails))
  return r.result.value
}
async function page(url){await send('Page.navigate',{url});await sleep(1100)}
const origin='http://127.0.0.1:4173'
async function check(name,pathPart,lang,width,height) {
  await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600})
  await page(origin+'/')
  await evaluate(`localStorage.setItem('portfolio-lang',${JSON.stringify(lang)})`)
  await page(origin+pathPart)
  await send('Page.reload',{ignoreCache:true})
  await sleep(900)
  const data=await evaluate(`(async()=>{
    const imgs=[...document.querySelectorAll('img')];
    for(const im of imgs){im.loading='eager'}
    const images=await Promise.all(imgs.map(async im=>{
      try{await im.decode()}catch(e){}
      return {src:im.currentSrc,ok:im.naturalWidth>0,w:im.naturalWidth,h:im.naturalHeight}
    }));
    return {h1:[...document.querySelectorAll('h1')].map(x=>x.textContent.trim()),
      projectCount:document.querySelectorAll('.release-project').length,
      projectLinks:[...document.querySelectorAll('.release-project-image')].map(x=>x.getAttribute('href')),
      researchLinks:[...document.querySelectorAll('.release-research-item h3 a')].map(x=>x.getAttribute('href')),
      linkCount:document.querySelectorAll('a[href]').length,
      writingHeading:[...document.querySelectorAll('.writing-card h3')].map(x=>x.textContent.trim()),
      imageErrors:images.filter(x=>!x.ok),
      horizontalOverflow:document.documentElement.scrollWidth>innerWidth+2,
      docWidth:document.documentElement.scrollWidth,
      text:document.body.innerText.slice(0,800)
    }
  })()`)
  const result={name,route:pathPart,lang,width,height,...data}
  report.checks.push(result)
  console.log(name,JSON.stringify({h1:data.h1,projectCount:data.projectCount,researchLinks:data.researchLinks,writingHeading:data.writingHeading.slice(0,4),imageErrors:data.imageErrors.length,horizontalOverflow:data.horizontalOverflow}))
  return result
}
let error
try{
  let port
  for(let i=0;i<80;i++){
    const f=path.join(dir,'DevToolsActivePort')
    if(fs.existsSync(f)){port=fs.readFileSync(f,'utf8').split('\n')[0];break}
    await sleep(100)
  }
  if(!port)throw Error('Chrome CDP port missing')
  const tabs=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json()
  ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl)
  ws.addEventListener('message',event=>{const v=JSON.parse(event.data);if(callbacks.has(v.id)){const p=callbacks.get(v.id);callbacks.delete(v.id);v.error?p.reject(Error(JSON.stringify(v.error))):p.resolve(v.result)}})
  await new Promise(res=>ws.addEventListener('open',res,{once:true}))
  await send('Runtime.enable');await send('Page.enable')
  const en=await check('home-en-desktop','/','en',1440,900)
  const zh=await check('home-zh-mobile','/','zh',390,844)
  const works=await check('work-en','/#/works','en',1440,900)
  const writing=await check('writing-zh','/#/writing','zh',1440,900)
  const reactor=await check('reactor-report','/#/writing/reactor-bpm-system-2026','zh',1440,900)
  const entropy=await check('entropy-report','/#/writing/entropy-two-screen-2026','zh',1440,900)
  const music=await check('music-report','/#/writing/performable-music','zh',1440,900)
  const expected=['/writing/reactor-bpm-system-2026','/writing/entropy-two-screen-2026','/writing/performable-music']
  if(en.projectCount!==4||zh.projectCount!==4)throw Error('Exactly four selected projects required')
  if(JSON.stringify(en.researchLinks.map(x=>x.replace(/^#/,'')))!==JSON.stringify(expected))throw Error('Research hierarchy incorrect')
  if(!writing.writingHeading.some(t=>/REACTOR/.test(t)))throw Error('REACTOR missing on Writing page')
  if(!reactor.text.includes('REACTOR')||!entropy.text.includes('ENTROPY')||!music.text.includes('Performable'))throw Error('Research article details missing')
  for(const p of report.checks){if(p.imageErrors.length||p.horizontalOverflow)throw Error(p.name+': decoded images or horizontal overflow')}
}catch(e){error=String(e);report.error=error;console.error(error)}
finally{
  fs.mkdirSync('docs/portfolio-maintenance-os/release-qa',{recursive:true})
  fs.writeFileSync('docs/portfolio-maintenance-os/release-qa/home-release-check.json',JSON.stringify(report,null,2))
  ws?.close();child.kill('SIGKILL')
  await Promise.race([new Promise(resolve=>child.once('exit',resolve)),sleep(2000)])
  try{fs.rmSync(dir,{recursive:true,force:true,maxRetries:5,retryDelay:100})}catch{}
}
if(error)process.exit(1)
console.log('HOME RELEASE QA PASS')
