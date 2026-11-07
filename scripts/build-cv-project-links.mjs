#!/usr/bin/env node
// Keep stable CV record pages connected to their parent project(s).
// Modifies only a clearly marked generated subsection; preserves manual editorial content.
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const cv=JSON.parse(fs.readFileSync(path.join(root,'content/cv-records-2026-11.json'),'utf8')).records;
const projects=JSON.parse(fs.readFileSync(path.join(root,'content/project-registry-2026-11.json'),'utf8')).projects;
const ids=new Set(projects.map(x=>x.id));
const start='<!-- PORTFOLIO_OS_RELATED_PROJECTS_START -->';
const end='<!-- PORTFOLIO_OS_RELATED_PROJECTS_END -->';
const esc=v=>String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let changed=0,linked=0;
for(const r of cv){
 const refs=[...new Set([r.project_id,...(r.related_work_ids||[])].filter(Boolean))];
 if(!refs.length)continue;
 const targets=refs.map(id=>{
  if(!ids.has(id))throw Error('Missing project for CV '+r.id+': '+id);
  const p=projects.find(p=>p.id===id);
  return '<a href="../projects/'+esc(id)+'.html">'+esc(p.zh)+' / '+esc(p.en)+'</a>';
 });
 const section=start+'<section class="section" aria-label="Related projects"><h2>Related projects / 关联母项目</h2><p>'+targets.join(' · ')+'</p></section>'+end;
 const filename=path.join(root,'works/records',r.id+'.html');
 if(!fs.existsSync(filename))throw Error('Missing CV record page: '+filename);
 let html=fs.readFileSync(filename,'utf8');
 const a=html.indexOf(start),b=html.indexOf(end);
 if(a>=0 && b>a)html=html.slice(0,a)+html.slice(b+end.length);
 if(!html.includes('</main>'))throw Error('Unexpected CV page structure: '+r.id);
 const updated=html.replace('</main>',section+'</main>');
 if(updated!==fs.readFileSync(filename,'utf8')){fs.writeFileSync(filename,updated);changed++;}
 linked++;
}
console.log('CV parent project links: '+linked+' records; '+changed+' files updated');
