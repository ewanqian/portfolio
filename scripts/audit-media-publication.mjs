#!/usr/bin/env node
// Verifies project-cover identity, repository file existence, and change tracking.
// Does not determine ownership or grant permission to reuse media.
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd(),read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const projects=read('content/project-registry-2026-11.json').projects;
const entries=read('database/media-publication-register-2026-11.json').assets;
const errors=[],warnings=[];
const e=(code,id,detail)=>errors.push({code,id,detail});
const w=(code,id,detail)=>warnings.push({code,id,detail});
const projectsById=new Map(projects.map(p=>[p.id,p]));
const entriesByProject=new Map();
for(const a of entries){
 if(entriesByProject.has(a.project_id))e('DUPLICATE_ASSET_OWNER',a.project_id,a.url_or_path);
 entriesByProject.set(a.project_id,a);
 if(!projectsById.has(a.project_id))e('ORPHAN_ASSET',a.project_id,a.url_or_path);
}
const seenPaths=new Map();
for(const p of projects){
 const a=entriesByProject.get(p.id);
 if(!p.image){
  if(a)e('STALE_MEDIA_REGISTER',p.id,'Project no longer has an image; remove or archive old media register entry');
  continue;
 }
 if(!a){e('UNREGISTERED_PUBLIC_COVER',p.id,p.image);continue}
 if(a.url_or_path!==p.image)e('MEDIA_SOURCE_DRIFT',p.id,a.url_or_path+' vs '+p.image);
 if(seenPaths.has(p.image))e('SHARED_COVER_REQUIRES_EXPLICIT_REVIEW',p.id,'Already used by '+seenPaths.get(p.image));
 seenPaths.set(p.image,p.id);
 if(p.image.startsWith('/assets/')){
  const location=path.join(root,p.image.slice(1));
  if(!fs.existsSync(location))e('MISSING_IMAGE_FILE',p.id,location);
  else if(fs.statSync(location).size<1000)e('SUSPICIOUS_EMPTY_IMAGE',p.id,location);
 }else if(!/^https:\/\//.test(p.image)){
  e('INVALID_EXTERNAL_IMAGE',p.id,p.image);
 }
 if(!a.photographer_or_media_author)w('MISSING_IMAGE_CREDIT',p.id,'Photographer/media-author not yet recorded');
 if(a.permission_status!=='confirmed_for_portfolio')w('PERMISSION_REVIEW_REQUIRED',p.id,a.permission_status);
}
for(const p of projects){
 if(p.image?.endsWith('/posterwall.webp'))e('GENERIC_PLACEHOLDER_COVER',p.id,p.image);
 if(p.id==='semicolon-c-onefive'&&p.image?.includes('onefive-classy-crush'))e('WRONG_SONG_COVER',p.id,p.image);
}
const report={schema:'portfolio-media-integrity.v1',checked_at:new Date().toISOString(),registered_assets:entries.length,projects:projects.length,errors,warnings};
fs.mkdirSync(path.join(root,'reports'),{recursive:true});
fs.writeFileSync(path.join(root,'reports/portfolio-media-integrity.json'),JSON.stringify(report,null,2)+'\n');
const summary=['## Portfolio media identity and credit audit','',
 '- Project cover assignments: '+projects.filter(x=>x.image).length,
 '- Image register entries: '+entries.length,
 '- Structural errors: '+errors.length,
 '- Credit/permission review items: '+warnings.length,
 '', 'Technical pass does not equal copyright clearance.',
 ...errors.slice(0,20).map(x=>'- ERROR '+x.code+' '+x.id+' '+x.detail),
 ...warnings.slice(0,5).map(x=>'- REVIEW '+x.code+' '+x.id)].join('\n')+'\n';
console.log(summary);
if(process.env.GITHUB_STEP_SUMMARY)fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,summary);
if(errors.length)process.exitCode=1;
