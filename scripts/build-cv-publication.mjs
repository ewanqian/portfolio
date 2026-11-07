#!/usr/bin/env node
// One selected bilingual record set → screen rows and stable three-page print templates.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const data=JSON.parse(read('content/cv-records-2026-11.json'));
const profile=JSON.parse(read('content/cv-selection.json'));
const byId=new Map(data.records.map(r=>[r.id,r]));
const selected=profile.sections.flatMap(s=>s.record_ids);
if(new Set(selected).size!==selected.length)throw Error('Duplicate selected record');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
for(const section of profile.sections)for(const id of section.record_ids){
 const r=byId.get(id);if(!r||r.section!==section.id||!r.zh?.trim()||!r.en?.trim())throw Error('Incomplete bilingual selected record: '+id);
}
const label=(r,lang)=>lang==='zh'?(r.cv_zh||r.zh):(r.cv_en||r.en);
const portrait='data:image/jpeg;base64,'+fs.readFileSync(path.join(root,'assets/cv/portrait-r1.1.jpg')).toString('base64');
for(const lang of ['zh','en']){
 let html=read('docs/cv-publication/templates/cv-'+lang+'.html').replaceAll('{{portrait}}',portrait).replaceAll('{{release}}',profile.release);
 for(const section of profile.sections){
  const lines=section.record_ids.map(id=>{const r=byId.get(id),url='https://ewanqian.site/works/records/'+id+'.html';return '<div class="entry"><a class="year" href="'+url+'">'+esc(r.year)+'</a><div class="entry-text"><a href="'+url+'">'+esc(label(r,lang))+'</a></div></div>';}).join('');
  html=html.replace('{{section:'+section.id+'}}',lines);
 }
 if(/\{\{/.test(html))throw Error('Unfilled print template token');
 fs.writeFileSync(path.join(root,'works/cv-print-'+lang+'.html'),html);
}
let web=read('works/cv.html');
for(const section of profile.sections){
 const marker='<section class="records" id="'+section.id+'">';const start=web.indexOf(marker),end=web.indexOf('</section>',start);
 if(start<0||end<0)throw Error('Missing web section '+section.id);
 const block=web.slice(start,end),a=block.indexOf('<div class="rows">');
 if(a<0)throw Error('Missing rows '+section.id);
 const rows=section.record_ids.map(id=>{const r=byId.get(id);return '<a class="cv-row" href="records/'+id+'.html"><span class="year">'+esc(r.year)+'</span><span class="description">'+esc(label(r,'zh'))+'</span><span class="arrow" aria-hidden="true">↗</span></a>';}).join('\n');
 web=web.slice(0,start)+block.slice(0,a)+'<div class="rows">'+rows+'</div>'+web.slice(end);
}
web=web.replace(/Ewan_Qian_CV_2026-11_R[0-9.]+_(ZH|EN)\.pdf/g,(_,lang)=>'Ewan_Qian_CV_2026-11_R'+profile.release+'_'+lang+'.pdf');
web=web.replace(/Release [0-9.]+(?=<\/span>)/,'Release '+profile.release);
fs.writeFileSync(path.join(root,'works/cv.html'),web);
// React can consume the same public selection without importing internal source notes.
fs.mkdirSync(path.join(root,'react/src/data/generated'),{recursive:true});
const projection={release:profile.release,sections:profile.sections,records:selected.map(id=>{const r=byId.get(id);return {id:r.id,section:r.section,year:r.year,zh:label(r,'zh'),en:label(r,'en')};})};
fs.writeFileSync(path.join(root,'react/src/data/generated/cv.js'),'export default '+JSON.stringify(projection,null,2)+'\n');
console.log('Bilingual CV generated: '+selected.length+' selected records; release '+profile.release);
