#!/usr/bin/env node
// Non-destructive publication guard. Checks publication synchronization, not historical truth.
import fs from 'node:fs';
import path from 'node:path';
const read=p=>fs.readFileSync(path.join(process.cwd(),p),'utf8');
const json=p=>JSON.parse(read(p));
const records=json('content/cv-records-2026-11.json').records;
const release=json('content/publication-manifest-2026-11.json');
const web=read('works/cv.html');
const problems=[];
const complain=(code,detail)=>problems.push({code,detail});
const byId=new Map(records.map(x=>[x.id,x]));
for(const r of records){if(typeof r.en!=='string'||!r.en.trim())complain('MISSING_ENGLISH',r.id)}
if(!byId.get('production-043-2026')?.en?.includes('AI Together'))complain('AI_GALA_EN_MISMATCH','production-043-2026');
if(!byId.get('production-044-2026')?.en?.includes('National Geographic'))complain('NATGEO_EN_MISMATCH','production-044-2026');
const ids=[...web.matchAll(/href="records\/([a-z0-9-]+)\.html"/g)].map(m=>m[1]);
const unique=[...new Set(ids)];
if(unique.length!==60)complain('RECORD_COUNT','expected 60 distinct CV links, found '+unique.length);
for(const id of unique){
 if(!byId.has(id))complain('UNKNOWN_RECORD',id);
 if(!fs.existsSync(path.join(process.cwd(),'works/records',id+'.html')))complain('MISSING_RECORD_PAGE',id);
}
if(ids.length!==unique.length)complain('DUPLICATE_RECORD_LINK',String(ids.length-unique.length));
for(const lang of ['zh','en']){
 const url=release.cv_pdf?.[lang]?.drive_url;
 if(!url || !url.startsWith('https://drive.google.com/file/d/'))complain('MISSING_PDF_URL',lang);
 else if(!web.includes(url))complain('PDF_URL_MISMATCH',lang+' '+url);
}
const critical=[
 {id:'award-chinagraph-2024-timer',terms:['ChinaGraph 2024','优秀音乐作品（二等）','徐昊、钱誉文']},
 {id:'exhibitions-018-2023',terms:['四组影像作品','AR','南昌路 312 号']},
 {id:'production-042-2026',terms:['二砂包豪斯','空间采集','三维重建']},
 {id:'workshops-037-2026',terms:['舞台复刻','Stage Replica']},
 {id:'exhibitions-024-2022',terms:['AI PLAZA','新媒体影像展览参与']}
];
for(const x of critical){
 const rec=byId.get(x.id);
 if(!rec){complain('CRITICAL_RECORD_MISSING',x.id);continue;}
 for(const t of x.terms){
  if(!rec.zh.includes(t))complain('RECORD_CONTENT_DRIFT',x.id+' '+t);
  if(!web.includes(t))complain('WEB_CONTENT_DRIFT',x.id+' '+t);
 }
}
if(web.includes('《元语者·棱镜现实》双个展'))complain('UNVERIFIED_EVENT_CLASSIFICATION','AI PLAZA double solo exhibition');
const report={schema:'cv-release-integrity.v1',checked_at:new Date().toISOString(),release:release.release,record_count:records.length,published_unique_records:unique.length,passed:problems.length===0,problems};
fs.mkdirSync('reports',{recursive:true});
fs.writeFileSync('reports/cv-release-integrity.json',JSON.stringify(report,null,2)+'\n');
const text=['## CV publication integrity','Release: '+release.release,'Published unique records: '+unique.length,'Problems: '+problems.length,...problems.map(x=>'- '+x.code+': '+x.detail).slice(0,20)].join('\n')+'\n';
process.stdout.write(text);
if(process.env.GITHUB_STEP_SUMMARY)fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,text);
if(problems.length)process.exitCode=1;
