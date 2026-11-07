#!/usr/bin/env node
// Public Atlas/Timeline/Cabinet regression gate. No network or private inbox access.
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const exists=p=>fs.existsSync(path.join(root,p));
const html=p=>fs.readFileSync(path.join(root,p),'utf8');
const issues=[];
const fail=(code,context)=>issues.push({code,context});
const enc=read('public/data/ewan-encyclopedia.json');
const active=read('database/active_practice.json').items;
const notes=read('database/notes_index.json');
const scenes=read('database/assets_index.json');
const records=read('content/cv-records-2026-11.json').records;
const collection=read('content/collection-items.json').items.filter(x=>x.public_visibility==='curated');
const permitted=new Set(['verified-public','ongoing','presented']);
const ids=[
 ...enc.records.filter(x=>permitted.has(x.status)).map(x=>x.id),
 ...active.filter(x=>x.publicVisibility!=='archive-until-packaged').map(x=>'concept-'+x.id),
 ...notes.filter(x=>x.status==='published').map(x=>'note-'+x.id),
 ...scenes.filter(x=>x.filename?.startsWith('assets/')).map(x=>'scene-'+x.id)
];
const requireFile=p=>{if(!exists(p))fail('MISSING_FILE',p);};
for(const p of ['works/atlas.html','works/cabinet.html','works/timeline.html'])requireFile(p);
for(const id of ids)requireFile('works/atlas/'+id+'.html');
if(new Set(ids).size!==ids.length)fail('DUPLICATE_ATLAS_ID',ids.length);
if(exists('works/atlas.html')){
 const atlas=html('works/atlas.html');
 if(!atlas.includes('.item[hidden]{display:none}'))fail('SEARCH_FILTER_NOT_HIDING','works/atlas.html');
 for(const id of ids)if(!atlas.includes('href="atlas/'+id+'.html"'))fail('MISSING_ATLAS_INDEX_LINK',id);
}
for(const id of ids){
 const p='works/atlas/'+id+'.html';
 if(!exists(p))continue;
 const page=html(p);
 if(!page.includes('href="../atlas.html"'))fail('NO_BACKLINK',id);
 if(!page.includes('Context / 语境'))fail('NO_CONTEXT',id);
 if(/<h1>\s*<\/h1>/.test(page))fail('BLANK_TITLE',id);
}
if(exists('works/cabinet.html')){
 const page=html('works/cabinet.html');
 if(page.includes('Next / 下一件')||page.includes('待对应照片及时间记录确认后添加'))fail('EDITORIAL_PLACEHOLDER','cabinet');
 for(const item of collection){
  if(!page.includes(item.title_zh))fail('COLLECTION_ITEM_MISSING',item.id);
  if(item.image?.startsWith('/')&&!exists(item.image.slice(1)))fail('COLLECTION_IMAGE_MISSING',item.image);
  for(const id of item.related_project_ids||[])requireFile('works/projects/'+id+'.html');
  for(const id of item.related_cv_record_ids||[])requireFile('works/records/'+id+'.html');
 }
}
if(exists('works/timeline.html')){
 const page=html('works/timeline.html');
 for(const r of records){
  if(!page.includes('href="records/'+r.id+'.html"'))fail('CV_TIMELINE_LINK_MISSING',r.id);
 }
 if(page.includes('未来经审核的朋友圈'))fail('EDITORIAL_PLACEHOLDER','timeline');
}
for(const p of ['react/src/components/layout/Header.jsx','react/src/pages/Home.jsx','react/src/components/layout/Footer.jsx']){
 if(!html(p).includes('/works/atlas.html'))fail('SITE_NAV_MISSING_ATLAS',p);
}
if(html('react/src/pages/Archive.jsx').includes("'/portfolio/assets/raw-library/onefive-classy-crush-signed.webp'"))fail('MISATTRIBUTED_ARCHIVE_COVER','@onefive signed sleeve is a cabinet item, not an MV cover');
console.log(JSON.stringify({atlas_nodes:ids.length,cv_records:records.length,collection_items:collection.length,errors:issues},null,2));
if(issues.length)process.exitCode=1;
