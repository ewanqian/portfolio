#!/usr/bin/env node
// Read-only live link probe. Run only from CI/explicitly authorized networked environment.
// This does NOT verify authorship, media rights, or visual fidelity.
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const cv=read('content/cv-records-2026-11.json').records;
const projects=read('content/project-registry-2026-11.json').projects;
const site='https://ewanqian.site';
const checks=[
  {url:site+'/',kind:'homepage'},
  {url:site+'/works/archive-2026.html',kind:'archive'},
  {url:site+'/works/cv-records.html',kind:'cv-index'},
  {url:site+'/content/cv-records-2026-11.json',kind:'source-json'},
  ...cv.map(x=>({url:site+'/works/records/'+x.id+'.html',kind:'cv-record',expected:x.id}))
];
for(const x of projects){
  if(x.url && x.url.startsWith(site+'/') && !checks.some(a=>a.url===x.url))checks.push({url:x.url,kind:'project-page'});
}
let cursor=0;
const results=[];
async function worker(){
  while(true){
    const idx=cursor++;
    if(idx>=checks.length)return;
    const item=checks[idx];
    let result={...item,ok:false,http_status:null,issue:null};
    try{
      const response=await fetch(item.url,{signal:AbortSignal.timeout(12000),headers:{'User-Agent':'EwanQian-PortfolioHealth/1.0'}});
      result.http_status=response.status;
      const body=await response.text();
      const isHtmlPage=item.kind!=='source-json' && /<html/i.test(body);
      result.ok=response.ok && (item.kind==='source-json'?body.includes('records'):isHtmlPage);
      if(item.expected && !body.includes(item.expected)) {
        result.ok=false;
        result.issue='Unexpected content: record ID missing (SPA fallback or stale deployment)';
      } else if(!result.ok)result.issue='HTTP or content-type/format check failed';
    }catch(e){result.issue='Network or timeout: '+String(e.message||e).slice(0,160);}
    results.push(result);
  }
}
await Promise.all(Array.from({length:5},()=>worker()));
results.sort((a,b)=>a.url.localeCompare(b.url));
const report={schema:'portfolio-live-health.v1',checked_at:new Date().toISOString(),status:'network-verified-as-returned-by-runner-only',checked:results.length,passed:results.filter(x=>x.ok).length,failed:results.filter(x=>!x.ok).length,results};
fs.mkdirSync(path.join(root,'reports'),{recursive:true});
fs.writeFileSync(path.join(root,'reports/portfolio-live-health.json'),JSON.stringify(report,null,2)+'\n');
const lines=['## Public website read-only link probe', '', '- Checked: '+report.checked, '- Returned expected HTML/JSON: '+report.passed, '- Failed/blocked: '+report.failed, '', '**Failures need human review; do not auto-replace URLs.**'];
for(const f of results.filter(x=>!x.ok).slice(0,25))lines.push('- '+f.url+' — '+(f.http_status??'network')+' — '+f.issue);
const text=lines.join('\n')+'\n';console.log(text);
if(process.env.GITHUB_STEP_SUMMARY)fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,text);
if(report.failed>0)process.exitCode=1;
