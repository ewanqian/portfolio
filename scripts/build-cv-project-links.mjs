#!/usr/bin/env node
// Keep stable CV record pages connected to parent projects and verified media.
// Only replace the marked subsection; preserve detailed records and print PDFs.
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const cv=JSON.parse(fs.readFileSync(path.join(root,'content/cv-records-2026-11.json'),'utf8')).records;
const projects=JSON.parse(fs.readFileSync(path.join(root,'content/project-registry-2026-11.json'),'utf8')).projects;
const ids=new Set(projects.map(x=>x.id));
const start='<!-- PORTFOLIO_OS_RELATED_PROJECTS_START -->';
const end='<!-- PORTFOLIO_OS_RELATED_PROJECTS_END -->';
const esc=v=>String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const mediaPath=path.join(root,'assets/data/titan-tracks.json');
const titan=fs.existsSync(mediaPath)?JSON.parse(fs.readFileSync(mediaPath,'utf8')):null;
function projectMedia(refs){
 if(!refs.includes('kashiwa-titan-2025')||!titan)return '';
 const selected=titan.tracks.filter(t=>['01','03','08'].includes(t.id));
 if(selected.length!==3||selected.some(t=>!t.original))throw Error('Incomplete verified TITAN CV media');
 const figures=selected.map(t=>{
  const preview=path.join(root,titan.asset_base,t.preview),original=path.join(root,titan.asset_base,t.original);
  if(!fs.existsSync(preview)||!fs.existsSync(original))throw Error('Missing TITAN CV original: '+t.id);
  return '<figure style="margin:0;min-width:0"><a href="../../'+esc(titan.asset_base+t.original)+'" target="_blank" rel="noopener"><img src="../../'+esc(titan.asset_base+t.preview)+'" alt="'+esc(t.title)+' — visual still" loading="lazy" style="width:100%;height:auto;display:block;object-fit:contain"></a><figcaption style="font-size:12px;margin-top:10px">'+esc(t.id+' · '+t.title)+' / 视觉画面</figcaption></figure>';
 }).join('');
 return '<div class="cv-project-media" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:18px;margin:24px 0">'+figures+'</div><p><a href="../titan-tracks.html">TITAN · 逐曲视觉、原始画面与封面 / Track visuals, original stills & covers ↗</a></p>';
}
let changed=0,linked=0;
for(const r of cv){
 const refs=[...new Set([r.project_id,...(r.related_work_ids||[])].filter(Boolean))];
 if(!refs.length)continue;
 const targets=refs.map(id=>{
  if(!ids.has(id))throw Error('Missing project for CV '+r.id+': '+id);
  const p=projects.find(p=>p.id===id);
  return '<a href="../projects/'+esc(id)+'.html">'+esc(p.zh)+' / '+esc(p.en)+'</a>';
 });
 const section=start+'<section class="section" aria-label="Related projects"><h2>Related projects / 关联项目</h2><p>'+targets.join(' · ')+'</p>'+projectMedia(refs)+'</section>'+end;
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
