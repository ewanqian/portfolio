#!/usr/bin/env node
/**
 * Offline Instagram JSON export adapter -> normalized social items.
 * Usage: node scripts/import-instagram-export.mjs /absolute/path/to/unzipped-instagram-export
 * No login, network, third-party upload, or publication.
 * Only reads JSON under "content/posts", "content/stories", or similarly named export dirs.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const src=process.argv[2];
if(!src) { console.error('Usage: node scripts/import-instagram-export.mjs /path/to/extracted-export'); process.exit(2); }
const base=path.resolve(src);
if(!fs.statSync(base).isDirectory()) throw Error('Input must be an extracted Instagram export directory.');
const repo=process.cwd();
const privateDir=path.join(repo,'inbox','private');
fs.mkdirSync(privateDir,{recursive:true});
const files=[];
const allowed=/(?:^|[\\/_-])(posts?|stories|reels?|media)(?=[\\/_.-]|$)/i;
function walk(d,depth=0) {
 if(depth>8)return;
 for(const ent of fs.readdirSync(d,{withFileTypes:true})) {
  if(ent.isSymbolicLink())continue;
  const p=path.join(d,ent.name);
  if(ent.isDirectory()) walk(p,depth+1);
  else if(ent.isFile()&&p.endsWith('.json')&&allowed.test(path.relative(base,p))&&!/messages|inbox|direct|comments|liked|saved/i.test(path.relative(base,p)))files.push(p);
 }
}
walk(base);
const items=[],seen=new Set(),warnings=[];
function iso(timestamp) {
 if(typeof timestamp==='number'&&Number.isFinite(timestamp))return new Date(timestamp*1000).toISOString();
 if(typeof timestamp==='string'&&timestamp.trim()&&Number.isFinite(Date.parse(timestamp)))return new Date(timestamp).toISOString();
 return null;
}
function safeMedia(uri) {
 if(typeof uri!=='string'||!uri.trim()||/^(https?:|data:)/i.test(uri))return null;
 const full=path.resolve(base,uri.replace(/\\/g,'/'));
 if(!(full===base||full.startsWith(base+path.sep)))return null;
 return fs.existsSync(full)&&fs.statSync(full).isFile()?full:null;
}
function strings(v) {
 if(typeof v==='string')return v;
 if(Array.isArray(v))return v.map(strings).filter(Boolean).join(' ');
 if(v&&typeof v==='object')return typeof v.value==='string'?v.value:'';
 return '';
}
function collect(n,file,depth=0) {
 if(depth>15||!n||typeof n!=='object')return;
 if(Array.isArray(n)){n.forEach(x=>collect(x,file,depth+1));return}
 // Meta commonly exports posts/stories as objects with media:[{uri,creation_timestamp,title,...}].
 if(Array.isArray(n.media)&&n.media.some(m=>m&&typeof m.uri==='string')) {
  const paths=n.media.map(m=>safeMedia(m.uri)).filter(Boolean);
  const rawUri=n.media.map(m=>m?.uri).filter(Boolean);
  const caption=strings(n.title)||strings(n.caption)||strings(n.media.map(m=>m.title).filter(Boolean));
  const timestamp=n.creation_timestamp??n.timestamp??n.media.find(m=>m?.creation_timestamp)?.creation_timestamp;
  const relative=path.relative(base,file).replaceAll(path.sep,'/');
  const kind=/stories/i.test(relative)?'story':/reels/i.test(relative)?'reel':'post';
  const seed=JSON.stringify([relative,timestamp,rawUri,caption]);
  const id=crypto.createHash('sha256').update(seed).digest('hex');
  if(!seen.has(id)){seen.add(id);items.push({
   source:'instagram_export',source_id:id,created_at:iso(timestamp),
   caption,media_paths:paths,missing_media_count:rawUri.length-paths.length,
   original_media_uris:rawUri,source_url:null,visibility:'unknown',
   contains_others:null,contains_comments:false,rights_confirmed:false,
   export_category:kind,export_json:relative
  });}
  return;
 }
 for(const [key,v] of Object.entries(n))if(v&&typeof v==='object'&&!/messages|inbox|comments|followers|following|contacts/i.test(key))collect(v,file,depth+1);
}
for(const f of files){
 try {collect(JSON.parse(fs.readFileSync(f,'utf8')),f);}
 catch(e){warnings.push(path.relative(base,f)+': '+String(e.message).slice(0,180));}
}
const out=path.join(privateDir,'instagram-normalized-'+new Date().toISOString().slice(0,10)+'.json');
if(fs.existsSync(out))throw Error('Destination exists; refusing overwrite: '+out);
fs.writeFileSync(out,JSON.stringify({schema:'ewanqian.instagram-normalized.v1',input_directory:base,items,warnings},null,2)+'\n',{mode:0o600});
console.log(JSON.stringify({output:out,items:items.length,matched_json_files:files.length,warnings,missing_media:items.reduce((n,i)=>n+i.missing_media_count,0)},null,2));
console.log('Private only. Review normalized JSON, then run: node scripts/triage-social-import.mjs '+out);
