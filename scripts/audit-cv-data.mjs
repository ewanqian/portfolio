#!/usr/bin/env node
import fs from 'node:fs';import crypto from 'node:crypto';
const json=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const records=json('content/cv-records-2026-11.json').records;
const profile=json('content/cv-selection.json');
const manifest=json('content/publication-manifest-2026-11.json');
const selected=profile.sections.flatMap(s=>s.record_ids),byId=new Map(records.map(r=>[r.id,r]));
const fail=m=>{throw Error(m)};
if(new Set(selected).size!==selected.length)fail('duplicate selected IDs');
for(const id of selected){const r=byId.get(id);if(!r?.zh?.trim()||!r?.en?.trim())fail('missing bilingual copy '+id);}
const publicRows=json('assets/data/cv-records-2026-11.json').records;
if(publicRows.length!==records.length)fail('public projection count');
for(const r of publicRows){if('source' in r||'evidence_status' in r||'note' in r)fail('internal field leak');if(r.en!==byId.get(r.id)?.en)fail('English projection drift '+r.id);}
const web=fs.readFileSync('works/cv.html','utf8');
const webIds=[...web.matchAll(/class="cv-row" href="records\/([^"/]+)\.html"/g)].map(m=>m[1]);
if(JSON.stringify(webIds)!==JSON.stringify(selected))fail('screen CV selection/order drift');
for(const lang of ['zh','en']){
 const html=fs.readFileSync('works/cv-print-'+lang+'.html','utf8');
 const targets=new Set([...html.matchAll(/\/works\/records\/([^"/]+)\.html/g)].map(m=>m[1]));
 if(targets.size!==selected.length||selected.some(id=>!targets.has(id)))fail('print ID drift '+lang);
 const pdf=manifest.cv_pdf[lang];
 const file='assets/cv/'+pdf.file_name;
 const hash=crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
 if(hash!==pdf.sha256)fail('PDF checksum drift '+lang);
}
for(const [name,file] of [['data_sha256','content/cv-records-2026-11.json'],['selection_sha256','content/cv-selection.json']]){
 const hash=crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
 if(hash!==manifest.bilingual_publication?.[name])fail('PDF regeneration required: '+file);
}
console.log('CV data gate passed: '+records.length+' bilingual records; '+selected.length+' shared selected IDs; public-field boundary; PDF hashes and source hashes');
