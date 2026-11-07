#!/usr/bin/env node
/**
 * Non-networked social archive triage.
 * Usage: node scripts/triage-social-import.mjs /path/to/normalized.json
 * Input: [{source,created_at,caption,media_paths,source_url,visibility,...}]
 * Output: inbox/private/social-review-<day>.json (gitignored).
 * NEVER commits or publishes automatically.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=process.cwd();
const input=process.argv[2];
if(!input){console.error('Provide a local normalized JSON file. No network or WeChat account access is attempted.');process.exit(2);}
const raw=JSON.parse(fs.readFileSync(path.resolve(input),'utf8'));
const entries=Array.isArray(raw)?raw:Array.isArray(raw.items)?raw.items:[];
if(!entries.length)throw Error('Expected an array or {items:[...]}; Instagram ZIP/raw WeChat archive formats require an explicit adapter.');
const projects=JSON.parse(fs.readFileSync(path.join(root,'content/project-registry-2026-11.json'),'utf8')).projects;
const stop=new Set(['视觉','上海','艺术','制作','演出','作品','project','2026','2025','live','visual','research','music','image']);
const labels=projects.map(p=>({id:p.id,terms:[p.zh,p.en,...(p.aliases||[])].filter(x=>typeof x==='string'&&x.trim().length>=3&&!stop.has(x.toLowerCase()))}));
function time(x){const t=Date.parse(x??'');return Number.isFinite(t)?new Date(t).toISOString():null}
const seen=new Set(),result=[];
for(const item of entries){
 const caption=String(item.caption||item.text||'').slice(0,20000);
 const hash=crypto.createHash('sha256').update(JSON.stringify([item.source||'unknown',item.source_id||'',item.created_at||'',caption,item.media_paths||[]])).digest('hex');
 if(seen.has(hash))continue;seen.add(hash);
 const found=labels.map(p=>({id:p.id,hit:p.terms.filter(t=>caption.toLowerCase().includes(t.toLowerCase()))})).filter(p=>p.hit.length).slice(0,8);
 const confidential=['friends','private','only_me','close_friends','unknown'].includes(String(item.visibility||'unknown').toLowerCase());
 const risk=[
  ...(confidential?['original_visibility_not_public']:[]),
  ...(item.contains_others===true?['other_people_or_faces_require_review']:[]),
  ...(item.contains_comments===true?['private_comments_must_be_removed']:[]),
  ...(item.exact_location?['precise_location_requires_review']:[]),
  ...(item.rights_confirmed!==true?['media_rights_unverified']:[])
 ];
 const score=Math.min(100,found.length*25+(caption.length>=45?10:0)+(item.media_paths?.length?10:0)+(item.source_url?5:0)+(item.object_type==='signed_media'?20:0));
 result.push({id:'social-'+hash.slice(0,16),source:item.source||'unknown',source_id:item.source_id||null,created_at:time(item.created_at),imported_at:new Date().toISOString(),caption,media_paths:item.media_paths||[],source_url:item.source_url||null,original_visibility:item.visibility||'unknown',proposed_project_ids:found.map(x=>x.id),relevance_score:score,privacy_review:confidential?'not_public':'review_required',review_reasons:risk,public_status:'never_auto_publish',editor_decision:'pending',dedup_sha256:hash});
}
result.sort((a,b)=>b.relevance_score-a.relevance_score);
const out=path.join(root,'inbox/private');fs.mkdirSync(out,{recursive:true});
const day=new Date().toISOString().slice(0,10),dest=path.join(out,'social-review-'+day+'.json');
if(fs.existsSync(dest))throw Error('Review file already exists; not overwriting: '+dest);
fs.writeFileSync(dest,JSON.stringify({schema:'ewanqian.social-review.v1',generated:new Date().toISOString(),source_file:path.basename(input),items:result},null,2)+'\n',{mode:0o600});
console.log('Local-only review created: '+dest+'; items='+result.length+'; no public files changed.');
