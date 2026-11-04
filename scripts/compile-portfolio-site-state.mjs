#!/usr/bin/env node
/**
 * Convert actual Chromium CDP evidence into a site-state registry.
 * Independent audit lanes run concurrently; no external links are presumed reachable.
 * Run after scripts/audit-portfolio-browser.mjs. Non-destructive.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..')
const input=path.join(root,'docs/media-intake/browser-qa-2026-11.json')
if(!fs.existsSync(input)){console.error('NOT RUN: Chromium source evidence missing');process.exit(3)}
const browser=JSON.parse(fs.readFileSync(input,'utf8'))
const out=path.join(root,'docs/portfolio-maintenance-os/site-state')
fs.mkdirSync(out,{recursive:true})
const list=[...(browser.routes||[]).map(v=>({...v,language:'en',viewport:'desktop'})),
  ...(browser.chineseRoutes||[]).map(v=>({...v,language:'zh',viewport:'desktop'})),
  ...(browser.mobileRoutes||[]).map(v=>({...v,language:'en',viewport:'mobile'}))]
const routesSource=fs.readFileSync(path.join(root,'react/src/App.jsx'),'utf8')
const routerPatterns=[...routesSource.matchAll(/<Route\s+path="([^"]+)"/g)].map(x=>x[1])
const dist=path.join(root,'react/dist')
const quote=x=>'"'+String(x??'').replaceAll('"','""').replaceAll('\n',' ')+'"'
function csv(name,keys,rows){
 const file=path.join(out,name+'.csv')
 fs.writeFileSync(file,keys.map(quote).join(',')+'\n'+rows.map(x=>keys.map(k=>quote(x[k])).join(',')).join('\n')+'\n')
 return path.relative(root,file)
}
function matchRoute(route) {
 const r=decodeURIComponent(route||'/').split('?')[0]
 return routerPatterns.some(p=>{
   const exp='^'+p.replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/:[^/]+/g,'[^/]+')+'/?$'
   try{return new RegExp(exp).test(r)}catch{return false}
 })
}
function classify(raw,page){
 if(!raw?.trim())return {type:'empty',status:'FAIL',reason:'empty href'}
 if(/^(mailto:|tel:|sms:)/i.test(raw))return {type:'protocol',status:'MANUAL',reason:'system handler'}
 if(/^javascript:/i.test(raw))return {type:'unsafe',status:'FAIL',reason:'javascript href'}
 if(raw==='#'||raw.startsWith('#works'))return {type:'fragment',status:'REVIEW',reason:'HashRouter fragment may be treated as route'}
 let url
 try{url=new URL(raw,'http://127.0.0.1:4173'+(page?.path||'/'))}
 catch{return {type:'malformed',status:'FAIL',reason:'cannot parse URL'}}
 if(!['http:','https:'].includes(url.protocol))return {type:'scheme',status:'MANUAL',reason:url.protocol}
 if(!['localhost','127.0.0.1'].includes(url.hostname))return {type:'external',status:'NOT RUN',reason:'external network and redirects not checked'}
 const hash=url.hash
 if(hash.startsWith('#/')){
   const state=matchRoute(hash.slice(1))
   return {type:'spa',status:state?'SOURCE VERIFIED':'FAIL',reason:state?'React Route pattern exists':'No matching React Route'}
 }
 let pathname
 try{pathname=decodeURIComponent(url.pathname)}catch{return {type:'malformed',status:'FAIL',reason:'bad path encoding'}}
 if(pathname==='/'||pathname==='/portfolio/'||pathname==='/portfolio')return {type:'shell',status:'SOURCE VERIFIED',reason:'application index'}
 const stripped=pathname.replace(/^\/portfolio\//,'/')
 const file=path.resolve(dist,'.'+stripped)
 const file2=path.resolve(dist,'.'+pathname)
 if([file,file2].some(f=>f.startsWith(dist+path.sep)&&fs.existsSync(f)&&fs.statSync(f).isFile()))return {type:'file',status:'SOURCE VERIFIED',reason:'exists in build dist'}
 if([file+'/index.html',file2+'/index.html'].some(f=>f.startsWith(dist+path.sep)&&fs.existsSync(f)))return {type:'directory',status:'SOURCE VERIFIED',reason:'index file exists'}
 return {type:'static',status:'FAIL',reason:'file missing in build output (no route proof)'}
}
async function linksLane(){
 const records=[],unique=new Map(),findings=[]
 for(const page of list){
   for(const a of page.links||[]){
     const rule=classify(a.rawHref||a.href,page)
     const row={page:page.name,language:page.language,viewport:page.viewport,label:a.text||a.ariaLabel,
       href:a.href,raw_href:a.rawHref,target:a.target,visible:a.visible,width:a.width,height:a.height,
       type:rule.type,status:rule.status,reason:rule.reason}
     records.push(row)
     const key=row.href
     if(!unique.has(key))unique.set(key,{...row,occurrences:0})
     unique.get(key).occurrences++
     if(rule.status==='FAIL')findings.push({severity:'P0',page:page.name,category:'link',target:row.href,detail:rule.reason})
     else if(a.visible&&(a.width<24||a.height<20))findings.push({severity:'P2',page:page.name,category:'target-size',target:row.href,detail:`${a.width}x${a.height}px clickable region`})
     if(a.visible&&!a.withinViewport)findings.push({severity:'P2',page:page.name,category:'link-clipped',target:row.href,detail:'link extends outside viewport'})
   }
 }
 csv('clickable-links',['page','language','viewport','label','href','raw_href','target','visible','width','height','type','status','reason'],records)
 csv('unique-link-targets',['href','type','status','reason','occurrences'],[...unique.values()])
 return {lane:'links',pages:list.length,instances:records.length,unique:unique.size,
   internalSourceVerified:[...unique.values()].filter(v=>v.status==='SOURCE VERIFIED').length,
   externalNotRun:[...unique.values()].filter(v=>v.status==='NOT RUN').length,
   errors:findings.filter(v=>v.severity==='P0').length,findings}
}
async function mediaLane(){
 const records=[],findings=[]
 for(const page of list)for(const m of page.images||[]){
   const natural=m.naturalRatio??(m.height?m.width/m.height:0),actual=m.renderedRatio??(m.renderedHeight?m.renderedWidth/m.renderedHeight:0)
   const relative=natural&&actual?Math.abs(natural-actual)/natural:null
   let status=m.error||!m.width?'FAIL':'PASS'
   if(status==='PASS'&&relative>0.05&&m.objectFit==='fill')status='DISTORTION RISK'
   else if(status==='PASS'&&relative>0.2&&m.objectFit==='cover')status='CROP REVIEW'
   const row={page:page.name,language:page.language,viewport:page.viewport,source:m.src,
     original_width:m.width,original_height:m.height,display_width:m.renderedWidth,display_height:m.renderedHeight,
     original_ratio:natural,display_ratio:actual,object_fit:m.objectFit,
     difference_percent:relative===null?'':Math.round(relative*1000)/10,status}
   records.push(row)
   if(status==='FAIL'||status==='DISTORTION RISK')findings.push({
      severity:'P0',page:page.name,category:'image',target:m.src,detail:status+' (original/display aspect mismatch)'})
   else if(status==='CROP REVIEW')findings.push({
      severity:'P2',page:page.name,category:'intentional-crop-review',target:m.src,detail:'cover crop >20%; verify subject'})
 }
 csv('media-geometry',['page','language','viewport','source','original_width','original_height','display_width','display_height','original_ratio','display_ratio','object_fit','difference_percent','status'],records)
 return {lane:'media',images:records.length,unique:new Set(records.map(v=>v.source)).size,
   failed:records.filter(v=>v.status==='FAIL').length,distortion:records.filter(v=>v.status==='DISTORTION RISK').length,
   cropReview:records.filter(v=>v.status==='CROP REVIEW').length,findings}
}
async function layoutLane(){
 const records=[],findings=[]
 for(const p of list){
   const lo=p.layout||{}
   const row={page:p.name,language:p.language,viewport:p.viewport,viewport_width:lo.innerWidth,
     document_width:lo.documentWidth,horizontal_overflow:lo.overflowX,
     missing_h1:lo.noH1,multiple_h1:lo.multipleH1,clickables:p.clickables?.length??0}
   records.push(row)
   if(lo.overflowX)findings.push({severity:'P1',page:p.name,category:'horizontal-overflow',target:p.path,detail:`${lo.documentWidth} > ${lo.innerWidth}`})
   if(lo.noH1)findings.push({severity:'P2',page:p.name,category:'missing-h1',target:p.path,detail:'No H1 found'})
   if(lo.multipleH1)findings.push({severity:'P2',page:p.name,category:'multiple-h1',target:p.path,detail:'Multiple H1 on page'})
 }
 csv('responsive-layout',['page','language','viewport','viewport_width','document_width','horizontal_overflow','missing_h1','multiple_h1','clickables'],records)
 return {lane:'layout',pages:records.length,overflow:records.filter(x=>x.horizontal_overflow).length,
   missingH1:records.filter(x=>x.missing_h1).length,findings}
}
async function contentLane(){
 const home=browser.routes?.find(p=>p.name==='home')
 const work=browser.routes?.find(p=>p.name==='work')
 const workshops=browser.routes?.find(p=>p.name==='workshops')
 const records=[
  {item:'Home selected cards',observed:home?.workCards,expected:'4',status:home?.workCards===4?'PASS':'FAIL'},
  {item:'Work selected cards',observed:work?.workCards,expected:'4',status:work?.workCards===4?'PASS':'FAIL'},
  {item:'Work additional cards',observed:work?.workIndexRows,expected:'5–6',status:work?.workIndexRows>=5&&work?.workIndexRows<=6?'PASS':'FAIL'},
  {item:'Stage Replica public link',observed:workshops?.links?.some(a=>a.href.includes('/20261031/web/')),expected:'true',status:workshops?.links?.some(a=>a.href.includes('/20261031/web/'))?'PASS':'FAIL'},
  {item:'Digital Garden MP4',observed:browser.mp4Playback?.status,expected:'PASS',status:browser.mp4Playback?.status==='PASS'?'PASS':'FAIL'},
  {item:'Reduced-motion still',observed:browser.reducedMotion?.stillVisible,expected:'true',status:browser.reducedMotion?.stillVisible===true?'PASS':'FAIL'},
  {item:'Firefox',observed:'NOT RUN',expected:'manual browser QA',status:'NOT RUN'},
  {item:'Safari macOS/iOS',observed:'NOT RUN',expected:'manual browser QA',status:'NOT RUN'},
  {item:'Production domain',observed:'NOT RUN',expected:'production URL smoke test',status:'NOT RUN'},
  {item:'External redirects',observed:'NOT RUN',expected:'confirm final URL',status:'NOT RUN'},
  {item:'Media rights & credits',observed:'UNVERIFIED',expected:'human approval',status:'MANUAL'}
 ]
 csv('editorial-content',['item','observed','expected','status'],records)
 return {lane:'content',checks:records.length,passed:records.filter(v=>v.status==='PASS').length,
   notRun:records.filter(v=>v.status==='NOT RUN').length,
   findings:records.filter(v=>v.status==='FAIL').map(v=>({severity:'P0',category:'content',page:v.item,detail:'editorial acceptance gate failed'}))}
}
const audits=await Promise.allSettled([linksLane(),mediaLane(),layoutLane(),contentLane()])
const lanes=audits.map((v,i)=>v.status==='fulfilled'?v.value:{lane:['links','media','layout','content'][i],status:'ERROR',error:String(v.reason),findings:[]})
const findings=lanes.flatMap(v=>v.findings||[])
csv('findings',['severity','page','category','target','detail'],findings)
const summary={generatedAt:new Date().toISOString(),source:'actual Chromium rendered browser QA + local dist files',headSha:process.env.GITHUB_SHA||'NOT PROVIDED',pages:list.length,lanes:lanes.map(({findings,...v})=>v),
 severityCounts:{P0:findings.filter(x=>x.severity==='P0').length,P1:findings.filter(x=>x.severity==='P1').length,P2:findings.filter(x=>x.severity==='P2').length},
 limitations:['External URLs not tested (NOT RUN)','Click targets were inspected, not physically clicked','Ratio detection flags possible distortion, not aesthetic quality','Firefox/Safari/iOS devices NOT RUN','Production/CDN not verified','Credit and rights require human review']}
fs.writeFileSync(path.join(out,'summary.json'),JSON.stringify(summary,null,2)+'\n')
const fmt=v=>String(v??'')
const report=`# Portfolio site-state registry — ${summary.generatedAt}

Evidence: \`docs/media-intake/browser-qa-2026-11.json\` from real Chromium CDP. \`npm run build\` output checked for static paths. Not a production deployment test.

| Lane | Status summary |
| --- | --- |
${summary.lanes.map(v=>`| ${v.lane} | ${Object.entries(v).filter(([k])=>k!=='lane').map(([k,val])=>`${k}: ${fmt(val)}`).join('; ')} |`).join('\n')}

## Findings
${findings.length?findings.slice(0,120).map(v=>`- **${v.severity}** ${v.category} — ${v.page||''} — ${v.target||''}: ${v.detail}`).join('\n'):'No automated findings in sampled routes.'}

## Coverage limits
${summary.limitations.map(v=>'- '+v).join('\n')}

The canonical structured index consists of:
- \`clickable-links.csv\` — every rendered anchor occurrence
- \`unique-link-targets.csv\` — unique destinations and source verification
- \`media-geometry.csv\` — original and displayed ratios, object-fit, distortion/crop candidates
- \`responsive-layout.csv\` — viewport overflow, H1 and rendered controls
- \`editorial-content.csv\` — project and workshop acceptance gates
- \`findings.csv\` — actionable exceptions
- \`summary.json\` — machine-readable status
`
fs.writeFileSync(path.join(out,'README.generated.md'),report)
console.log(JSON.stringify(summary,null,2))
if(audits.some(v=>v.status==='rejected'))process.exitCode=2
