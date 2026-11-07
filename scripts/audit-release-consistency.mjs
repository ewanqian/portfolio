#!/usr/bin/env node
// Single source checks for current release pointers and counts.
// Do not confuse source/build consistency with browser, copyright, or external-video QA.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=process.cwd(),read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const manifest=read('content/publication-manifest-2026-11.json');
const records=read('content/cv-records-2026-11.json').records;
const projects=read('content/project-registry-2026-11.json').projects;
const selected=read('content/cv-selection.json').sections.flatMap(s=>s.record_ids);
const media=read('database/media-publication-register-2026-11.json').assets;
const rules=read('database/archive-preservation-checks.json').checks;
const errors=[],warnings=[];
const expect=(ok,code,detail)=>{if(!ok)errors.push({code,detail})};
const byId=new Map(records.map(r=>[r.id,r]));
expect(projects.length===manifest.project_registry_status?.root_or_presentation_entries,'PROJECT_COUNT','project count vs manifest');
expect(records.length===manifest.project_registry_status?.cv_record_pages,'CV_RECORD_COUNT','CV records vs manifest');
expect(records.every(r=>r.zh?.trim()&&r.en?.trim()),'MISSING_BILINGUAL','every CV record needs Chinese + English');
expect(selected.length===60&&new Set(selected).size===60,'SELECTED_COUNT','selected CV must be exactly 60 unique IDs');
expect(selected.every(id=>byId.has(id)),'SELECTED_RECORD_MISSING','selected CV ID missing in record registry');
expect(selected.length===manifest.bilingual_publication?.selected_records,'SELECTED_MANIFEST','selection count drift');
expect(records.filter(r=>!r.en?.trim()).length===manifest.bilingual_publication?.selected_missing_english,'EN_MANIFEST','English coverage drift');
expect(media.length===projects.filter(p=>p.image).length,'MEDIA_COVER_COUNT','cover assignments and register count drift');
expect((manifest.quality_gates?.preservation||'').includes(rules.length+'/'+rules.length),'PRESERVATION_COUNT','manifest must state current '+rules.length+'/'+rules.length+' rules');
expect((manifest.quality_gates?.live_links||'').includes('160/160'),'LIVE_BASELINE_STALE','last confirmed production QA count missing (does not re-run HTTP)');
for(const lang of ['zh','en']){
 const spec=manifest.cv_pdf?.[lang];
 if(!spec?.file_name||!spec?.sha256){errors.push({code:'PDF_MANIFEST_MISSING',detail:lang});continue}
 const p=path.join(root,'assets/cv',spec.file_name);
 if(!fs.existsSync(p)){errors.push({code:'PDF_MISSING',detail:p});continue}
 const bytes=fs.readFileSync(p);
 const hash=crypto.createHash('sha256').update(bytes).digest('hex');
 expect(hash===spec.sha256,'PDF_HASH_MISMATCH',lang+' '+hash);
 expect(bytes.length===spec.size_bytes,'PDF_SIZE_MISMATCH',lang+' '+bytes.length);
}
if(/57.*English|57.*英文|11 mandatory|Live site URL.*require subsequent independent/i.test(JSON.stringify(manifest)))warnings.push('Found historical-sounding or stale release narrative; review if present');
fs.mkdirSync(path.join(root,'reports'),{recursive:true});
const result={schema:'portfolio-release-consistency.v1',checked_at:new Date().toISOString(),release:manifest.release,projects:projects.length,cv_records:records.length,selected: selected.length,english_missing:records.filter(r=>!r.en?.trim()).length,media_entries:media.length,preservation_rules:rules.length,errors,warnings};
fs.writeFileSync(path.join(root,'reports/portfolio-release-consistency.json'),JSON.stringify(result,null,2)+'\n');
console.log('Release consistency '+manifest.release+': '+errors.length+' errors, '+warnings.length+' review notices; '+records.length+' bilingual records; '+rules.length+' preservation rules');
if(process.env.GITHUB_STEP_SUMMARY)fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,'## Release consistency\n\n'+JSON.stringify(result,null,2)+'\n');
if(errors.length)process.exitCode=1;
