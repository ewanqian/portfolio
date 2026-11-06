#!/usr/bin/env node
// Periodic external-source reachability probe. This does NOT assert claims, take screenshots or copy media.
import fs from 'node:fs';
import path from 'node:path';
const base=process.cwd(),read=p=>JSON.parse(fs.readFileSync(path.join(base,p),'utf8'));
const ledger=read('database/evidence-reconciliation-2026-11.json');
const unique=new Map();
for(const p of ledger.projects)for(const src of p.sources||[]){
 const url=src.url;if(!url||!url.startsWith('https://'))continue;
 if(!unique.has(url))unique.set(url,{url,projects:[],kind:src.kind});
 unique.get(url).projects.push(p.project_id);
}
const urls=[...unique.values()];let next=0;const results=[];
async function worker(){
 while(next<urls.length){
  const target=urls[next++];let result={...target,http_status:null,reachability:'unchecked',error:null};
  try{
   const res=await fetch(target.url,{method:'GET',redirect:'follow',signal:AbortSignal.timeout(15000),headers:{'User-Agent':'EwanQian-Archive-SourceMonitor/1.0'}});
   result.http_status=res.status;
   result.reachability=res.ok?'reachable':([401,403,405,406,429].includes(res.status)||res.status>=500?'blocked_or_transient':'http_error');
   await res.body?.cancel();
  }catch(e){result.reachability='network_unverified';result.error=String(e.message||e).slice(0,170);}
  results.push(result);
 }
}
await Promise.all(Array.from({length:4},worker));
const summary={schema:'external-evidence-reachability.v1',checked_at:new Date().toISOString(),urls:urls.length,reachable:results.filter(x=>x.reachability==='reachable').length,not_confirmed:results.filter(x=>x.reachability!=='reachable').length,results:results.sort((a,b)=>a.url.localeCompare(b.url))};
fs.mkdirSync(path.join(base,'reports'),{recursive:true});fs.writeFileSync(path.join(base,'reports/external-evidence-health.json'),JSON.stringify(summary,null,2)+'\n');
const lines=['## External source link reachability', '',`- Distinct source URLs: ${summary.urls}`,`- Reachable: ${summary.reachable}`,`- Blocked, transient or not confirmed: ${summary.not_confirmed}`,'','**Do not automatically remove or change sources due to a blocked crawler response.**',...summary.results.filter(x=>x.reachability!=='reachable').slice(0,25).map(x=>'- '+x.url+' ['+x.reachability+']')];
const txt=lines.join('\n')+'\n';console.log(txt);if(process.env.GITHUB_STEP_SUMMARY)fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,txt);
