#!/usr/bin/env node
// Rebuild the sitemap from stable public project/CV identifiers, not transient filenames.
import fs from 'node:fs';
import path from 'node:path';
const ROOT=process.cwd(),site='https://ewanqian.site';
const read=p=>JSON.parse(fs.readFileSync(path.join(ROOT,p),'utf8'));
const projects=read('content/project-registry-2026-11.json').projects;
const records=read('content/cv-records-2026-11.json').records;
const paths=new Set(['/','/works/cv.html','/works/archive-2026.html','/works/cv-records.html']);
for(const p of projects){
 paths.add('/works/projects/'+p.id+'.html');
 if(p.url?.startsWith(site+'/')){
  const u=new URL(p.url);
  if(fs.existsSync(path.join(ROOT,u.pathname.slice(1))))paths.add(u.pathname);
 }
}
for(const r of records)paths.add('/works/records/'+r.id+'.html');
for(const pathSuffix of [
 '/works/vaoe.html','/works/onefive-semicolonc.html','/works/system-ersha.html',
 '/works/observation-and-symbiosis.html','/works/dialogue-of-forms.html',
 '/works/digital-tundra.html','/works/no-further-input-required.html'
]){
 if(fs.existsSync(path.join(ROOT,pathSuffix.slice(1))))paths.add(pathSuffix);
}
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const xml='<?xml version="1.0" encoding="UTF-8"?>\n'
 +'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
 +[...paths].sort().map(p=>'  <url><loc>'+esc(site+p)+'</loc></url>').join('\n')
 +'\n</urlset>\n';
const dest=path.join(ROOT,'sitemap.xml');
if(!fs.existsSync(dest)||fs.readFileSync(dest,'utf8')!==xml)fs.writeFileSync(dest,xml);
console.log('Generated sitemap with '+paths.size+' canonical URLs');
