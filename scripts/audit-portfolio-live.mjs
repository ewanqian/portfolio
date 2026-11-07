#!/usr/bin/env node
/**
 * Read-only post-deployment smoke test for Portfolio OS.
 * Validates *actual content identity*, not just HTTP 200.
 * Image existence does not establish permission to publish.
 *
 * PORTFOLIO_SITE_BASE=https://... node scripts/audit-portfolio-live.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const projects=read('content/project-registry-2026-11.json').projects;
const records=read('content/cv-records-2026-11.json').records;
const site=(process.env.PORTFOLIO_SITE_BASE||'https://ewanqian.site').replace(/\/+$/,'');
const checks=[
 {path:'/',kind:'homepage',expected:/<html/i},
 {path:'/works/cv.html',kind:'cv-page',expected:/Curriculum Vitae|完整履历/},
 {path:'/works/archive-2026.html',kind:'project-index',expected:/project-registry-2026-11\.json/},
 {path:'/works/cv-records.html',kind:'cv-index',expected:/cv-records-2026-11\.json/},
 {path:'/content/cv-records-2026-11.json',kind:'source-json',expected:/"records"/},
 {path:'/content/project-registry-2026-11.json',kind:'source-json',expected:/"projects"/}
];
for(const p of projects){
 checks.push({path:'/works/projects/'+p.id+'.html',kind:'project-record',expected:'name="archive-project-id" content="'+p.id+'"'});
 if(p.url?.startsWith('https://ewanqian.site/works/')){
   const workPath=new URL(p.url).pathname;
   if(fs.existsSync(path.join(root,workPath.slice(1))) && !checks.some(c=>c.path===workPath)){
     checks.push({path:workPath,kind:'editorial-work',expected:/<html/i});
   }
 }
}
for(const r of records){
 checks.push({path:'/works/records/'+r.id+'.html',kind:'cv-record',expected:r.id});
}
for(const file of new Set(projects.map(p=>p.image).filter(x=>typeof x==='string' && x.startsWith('/assets/')))){
 checks.push({path:file,kind:'cover-image'});
}
const unique=[...new Map(checks.map(c=>[c.path,c])).values()];
const results=[];let cursor=0;
async function worker(){
 while(cursor<unique.length){
  const check=unique[cursor++];
  const result={path:check.path,kind:check.kind,status:null,ok:false,issue:null,category:'unverified'};
  try{
   const response=await fetch(site+check.path,{
    redirect:'follow',signal:AbortSignal.timeout(16000),
    headers:{'User-Agent':'EwanQian-PortfolioOS-PostDeployQA/1.1','Accept':check.kind==='cover-image'?'image/*':'text/html, application/json, */*'}
   });
   result.status=response.status;
   if(!response.ok){
    result.issue='HTTP '+response.status;
    result.category=[401,403,429,503].includes(response.status)?'blocked_or_transient':'http_failure';
    await response.body?.cancel();
   }else if(check.kind==='cover-image'){
    const ct=response.headers.get('content-type')||'';
    result.ok=ct.toLowerCase().startsWith('image/');
    result.issue=result.ok?null:'Expected image media-type; returned '+ct;
    result.category=result.ok?'verified':'content_mismatch';
    await response.body?.cancel();
   }else{
    const body=await response.text();
    const expected=check.expected;
    result.ok=typeof expected==='string'?body.includes(expected):expected.test(body);
    const ct=response.headers.get('content-type')||'';
    if(check.kind==='source-json' && !/json/i.test(ct)){
     result.ok=false;result.issue='Expected JSON response, got '+ct;
    }
    if(!result.ok&&!result.issue)result.issue='200 response has wrong content (possible SPA fallback / outdated page)';
    result.category=result.ok?'verified':'content_mismatch';
   }
  }catch(error){
   result.issue=String(error.message||error).slice(0,220);
   result.category='network_unverified';
  }
  results.push(result);
 }
}
await Promise.all(Array.from({length:6},()=>worker()));
results.sort((a,b)=>a.path.localeCompare(b.path));
const stats={
 total:results.length,verified:results.filter(x=>x.ok).length,
 http_failure:results.filter(x=>x.category==='http_failure').length,
 content_mismatch:results.filter(x=>x.category==='content_mismatch').length,
 network_unverified:results.filter(x=>x.category==='network_unverified').length,
 blocked_or_transient:results.filter(x=>x.category==='blocked_or_transient').length,
 project_permalinks:projects.length,cv_record_pages:records.length,
 cover_images:[...new Set(projects.map(p=>p.image).filter(x=>x?.startsWith('/assets/')))].length
};
const report={schema:'portfolio-live-health.v2',checked_at:new Date().toISOString(),site,stats,results};
fs.mkdirSync(path.join(root,'reports'),{recursive:true});
fs.writeFileSync(path.join(root,'reports/portfolio-live-health.json'),JSON.stringify(report,null,2)+'\n');
const lines=['## Portfolio OS · Live post-deployment verification','',
 '- Target: '+site,
 '- Checks: '+stats.total,
 '- Correct live responses: '+stats.verified,
 '- HTTP failures: '+stats.http_failure,
 '- Unexpected content: '+stats.content_mismatch,
 '- Network not verified: '+stats.network_unverified,
 '- Blocked/transient: '+stats.blocked_or_transient,
 '- Project permalinks: '+stats.project_permalinks+' · CV records: '+stats.cv_record_pages,
 '- Cover images tested: '+stats.cover_images,
 '', '**An inaccessible crawler is not proof of a missing web page.**',
 ...results.filter(x=>!x.ok).slice(0,35).map(x=>'- '+x.category+' · '+x.path+' · '+(x.status??'?')+' · '+x.issue)];
const summary=lines.join('\n')+'\n';
console.log(summary);
if(process.env.GITHUB_STEP_SUMMARY)fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,summary);
if(stats.verified!==stats.total)process.exitCode=1;
