#!/usr/bin/env node
// Non-destructive portfolio graph audit. Node 22+, no third-party packages.
// It reports missing links and ambiguous publication states; it never edits records.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const read = p => JSON.parse(fs.readFileSync(path.join(ROOT,p),'utf8'));
const exists = p => fs.existsSync(path.join(ROOT,p));
const projects = read('content/project-registry-2026-11.json').projects;
const records = read('content/cv-records-2026-11.json').records;
const dbWorks = read('database/works.json');
const legacyNames = read('database/canonical_names.json').projects || {};
const crosswalk = read('database/identity-crosswalk-2026-11.json').mappings || [];
const issues = [];
const add = (severity, code, id, detail) => issues.push({severity,code,id,detail});
const allIds = (items,label) => {
  const seen = new Set();
  for (const x of items) {
    if (!x.id || !/^[a-z0-9][a-z0-9-]*$/.test(x.id)) add('error','INVALID_ID',label,x.id);
    if (seen.has(x.id)) add('error','DUPLICATE_ID',label,x.id);
    seen.add(x.id);
  }
  return seen;
};
const projectIds = allIds(projects,'projects');
allIds(records,'cv-records');
const dbIds = allIds(dbWorks,'database/works.json');
const variantToRoot = new Map();
const aliasToRoot = new Map();
for (const mapping of crosswalk) {
  if (aliasToRoot.has(mapping.legacy_id)) add('error','CROSSWALK_COLLISION',mapping.legacy_id,'multiple alias targets');
  if (!projectIds.has(mapping.root_project_id)) add('error','CROSSWALK_BAD_ROOT',mapping.legacy_id,mapping.root_project_id);
  aliasToRoot.set(mapping.legacy_id,mapping.root_project_id);
}

for (const project of projects) {
  const variants = project.variants || [];
  for (const v of variants) {
    if (!v.legacy_id) continue;
    if (variantToRoot.has(v.legacy_id) && variantToRoot.get(v.legacy_id) !== project.id) {
      add('error','VARIANT_COLLISION',v.legacy_id,'multiple parent project IDs');
    }
    variantToRoot.set(v.legacy_id,project.id);
    if (aliasToRoot.has(v.legacy_id) && aliasToRoot.get(v.legacy_id) !== project.id) {
      add('error','CROSSWALK_VARIANT_DISAGREE',v.legacy_id,aliasToRoot.get(v.legacy_id)+' vs '+project.id);
    }
  }
  if (!project.zh) add('warning','NO_ZH_TITLE',project.id,'missing canonical Chinese title');
  if (!project.en) add('warning','NO_EN_TITLE',project.id,'missing English title');
  if (!project.image) add('warning','NO_COVER',project.id,'missing approved cover');
  if (project.image && project.image.startsWith('/') && !exists(project.image.replace(/^\/(?:portfolio\/)?/,'').replace(/^/,'').replace(/^assets\//,'assets/'))) {
    add('warning','IMAGE_PATH_MISSING',project.id,project.image);
  }
  if (!project.url) add('warning','NO_EDITORIAL_PAGE',project.id,'record/index may exist but an authored page is absent');
  if (project.url && project.url.includes('ewanqian.github.io/portfolio/')) add('warning','LEGACY_DOMAIN',project.id,project.url);
}
for (const work of dbWorks) {
  if (!projectIds.has(work.id) && !variantToRoot.has(work.id) && !aliasToRoot.has(work.id)) {
    add('warning','UNMAPPED_DATABASE_WORK',work.id,'manual legacy-to-root mapping needed; do not delete');
  }
}
for (const [id] of Object.entries(legacyNames)) {
  if (!dbIds.has(id) && !projectIds.has(id) && !variantToRoot.has(id) && !aliasToRoot.has(id)) {
    add('warning','UNMAPPED_CANONICAL_NAME',id,'name override references an unrecognized work id');
  }
}
for (const rec of records) {
  const filename = 'works/records/' + rec.id + '.html';
  if (!exists(filename)) add('error','RECORD_PAGE_MISSING',rec.id,filename);
  else if (!fs.readFileSync(path.join(ROOT,filename),'utf8').includes(rec.id)) add('error','RECORD_ID_NOT_IN_PAGE',rec.id,filename);
  if (!rec.en) add('warning','MISSING_ENGLISH_CV',rec.id,'human-reviewed English line required');
  if (!rec.project_id) add('info','RECORD_WITHOUT_PROJECT',rec.id,'valid for education or independent events; classify manually');
  if (rec.project_id && !projectIds.has(rec.project_id) && !variantToRoot.has(rec.project_id)) {
    add('error','BROKEN_PROJECT_REFERENCE',rec.id,rec.project_id);
  }
  if (!rec.evidence_status) add('warning','EVIDENCE_UNSPECIFIED',rec.id,'do not auto-publish new claims');
  if (rec.project_url && rec.project_url.includes('ewanqian.github.io/portfolio/')) {
    add('warning','LEGACY_CV_URL',rec.id,rec.project_url);
  }
}
for (const required of ['works/archive-2026.html','works/cv-records.html','AGENTS.md','database/README.md']) {
  if (!exists(required)) add('error','MISSING_SITE_ENTRY',required,required);
}
const count = name => issues.filter(x=>x.code===name).length;
const metrics = {
  root_projects:projects.length,
  records:records.length,
  legacy_database_works:dbWorks.length,
  exact_db_project_id_matches:dbWorks.filter(x=>projectIds.has(x.id)).length,
  mapped_variants:variantToRoot.size,
  explicit_legacy_aliases:aliasToRoot.size,
  database_works_with_root:dbWorks.filter(x=>projectIds.has(x.id)||variantToRoot.has(x.id)||aliasToRoot.has(x.id)).length,
  cv_missing_english:count('MISSING_ENGLISH_CV'),
  cv_without_project_ref:count('RECORD_WITHOUT_PROJECT'),
  projects_without_cover:count('NO_COVER'),
  projects_without_editorial_page:count('NO_EDITORIAL_PAGE'),
  project_images_missing_on_disk:count('IMAGE_PATH_MISSING'),
  legacy_works_without_crosswalk:count('UNMAPPED_DATABASE_WORK'),
  errors:issues.filter(x=>x.severity==='error').length,
  warnings:issues.filter(x=>x.severity==='warning').length
};
const result = {schema:'portfolio-health.v1',timestamp:new Date().toISOString(),metrics,issues};
fs.mkdirSync(path.join(ROOT,'reports'),{recursive:true});
fs.writeFileSync(path.join(ROOT,'reports/portfolio-health.json'),JSON.stringify(result,null,2)+'\n');
const lines = ['# Portfolio graph health', '', '| Metric | Value |','|---|---:|',...Object.entries(metrics).map(([k,v])=>'| '+k+' | '+v+' |'),'','## Priority findings'];
for(const i of issues.filter(x=>x.severity==='error').slice(0,20)) lines.push('- **ERROR** '+i.code+' '+i.id+': '+i.detail);
for(const key of ['UNMAPPED_DATABASE_WORK','IMAGE_PATH_MISSING','MISSING_ENGLISH_CV','NO_EDITORIAL_PAGE']){
  const items=issues.filter(x=>x.code===key);
  if(items.length) lines.push('- '+key+': '+items.length+' — '+items.slice(0,4).map(x=>x.id).join(', ')+(items.length>4?'…':''));
}
const summary=lines.join('\n')+'\n';
process.stdout.write(summary);
if(process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,summary);
if(metrics.errors>0) process.exitCode=1;  // Broken identities/routes fail CI; legacy content gaps are reported.
