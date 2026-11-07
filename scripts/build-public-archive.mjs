#!/usr/bin/env node
// Public projection only: preserve source records and never promote evidence status.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = p => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));
const pick = (obj, keys) => Object.fromEntries(keys.filter(k => obj[k] !== undefined).map(k => [k, obj[k]]));
const cv = read('content/cv-records-2026-11.json');
const registry = read('content/project-registry-2026-11.json');
const ledger = read('database/evidence-reconciliation-2026-11.json');
const mediaRegister = read('database/media-publication-register-2026-11.json');
const projectById = new Map(registry.projects.map(p => [p.id,p]));
const sourcesByProject = new Map(ledger.projects.map(p => [p.project_id,p.sources||[]]));
const mediaByProject = new Map(mediaRegister.assets.map(a => [a.project_id,a]));
const fullById = new Map(cv.records.map(r => [r.id, r]));
const records = cv.records.map(r => ({...pick(r, ['id','section','year','project_id','project_url','related_work_ids']),zh:r.cv_zh||r.zh,en:r.cv_en||r.en}));
const projects = registry.projects.map(p => ({
  ...pick(p, ['id', 'zh', 'en', 'year', 'category', 'url', 'image']),
  variants: (p.variants || []).map(v => pick(v, ['year', 'title']))
}));
const out = path.join(root, 'assets/data');
fs.mkdirSync(out, { recursive: true });
for (const [name, value] of Object.entries({
  'cv-records-2026-11.json': { schema: 'ewanqian.public-cv.v1', records },
  'project-registry-2026-11.json': { schema: 'ewanqian.public-projects.v1', projects }
})) fs.writeFileSync(path.join(out, name), JSON.stringify(value, null, 2) + '\n');

// Reuse the existing shell and editorial sections. Only replace the generated
// record paragraph and remove internal audit panels; retain URLs and media links.
const escape = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
for (const r of records) {
  if (!/^[a-z0-9-]+$/.test(r.id)) throw Error('Invalid record ID');
  const full=fullById.get(r.id);
  const file = path.join(root, 'works/records', r.id + '.html');
  let html = fs.readFileSync(file, 'utf8');
  // A record headline is a title, not the entire raw archival paragraph.
  html = html.replace(/<h1>[\\s\\S]*?<\\/h1>/, '<h1>'+escape(r.zh)+'</h1>');
  html = html.replace(/<title>[\\s\\S]*?<\\/title>/, '<title>'+escape(r.zh)+' — Ewan Qian Archive</title>');
  const ids = [...new Set([full.project_id,...(full.related_work_ids||[])].filter(Boolean))];
  const parent = ids.map(id=>projectById.get(id)).filter(Boolean);
  const own = typeof full.external_evidence==='string'&&/^https:\\/\\//.test(full.external_evidence)?[full.external_evidence]:[];
  const sourceUrls = [...new Set([...own,...ids.flatMap(id=>(sourcesByProject.get(id)||[]).map(s=>s.url).filter(u=>typeof u==='string'&&/^https:\\/\\//.test(u)))])].slice(0,8);
  const sourceLinks=sourceUrls.map(u=>'<a href="'+escape(u)+'" rel="noopener" target="_blank">'+escape(new URL(u).hostname)+'</a>').join(' ');
  const projectLinks=parent.map(p=>'<a href="../projects/'+escape(p.id)+'.html">'+escape(p.zh)+'</a>').join(' ');
  const coverProject=parent.find(p=>p.image && mediaByProject.has(p.id));
  const cover=coverProject?'<figure><img loading="lazy" src="'+escape(coverProject.image)+'" alt="'+escape(coverProject.zh)+'" style="display:block;max-width:100%;max-height:440px;object-fit:contain"><figcaption class="sources">关联母项目影像；不一定是此条活动的现场照片。</figcaption></figure>':'';
  const enrichment='<!-- PORTFOLIO_OS_ENRICHMENT_START --><section class="section record-extras" aria-label="Archive connections"><h2>Connections / 资料与关联</h2><div class="linkline">'+(projectLinks||'<span class="sources">当前记录无已核实的母项目关联</span>')+'</div>'+cover+(sourceLinks?'<h3 style="font-size:12px;margin:22px 0 7px">External references / 公开出处线索</h3><div class="linkline">'+sourceLinks+'</div><p class="sources">来源只证明其记载范围，个人职责仍以相应署名资料为准。</p>':'')+'</section><!-- PORTFOLIO_OS_ENRICHMENT_END -->';
  const a=html.indexOf('<!-- PORTFOLIO_OS_ENRICHMENT_START -->'),b=html.indexOf('<!-- PORTFOLIO_OS_ENRICHMENT_END -->');
  if(a>=0&&b>a)html=html.slice(0,a)+html.slice(b+'<!-- PORTFOLIO_OS_ENRICHMENT_END -->'.length);
  html=html.replace('</main>',enrichment+'</main>');
  // Keep previous full details; a compact heading above helps quick comprehension.
  html=html.replace('</head>','<style>.body>.record-extras{grid-column:2;min-width:0}.record-extras .linkline{align-items:start}.record-extras figure{margin:22px 0}.record-english{color:#58645e}h1{overflow-wrap:break-word;line-break:strict;word-break:normal}@media(max-width:700px){.body>.record-extras{grid-column:1}}</style></head>');

  const record = /(<section class="section"><h2>Record \/ 履历记录<\/h2>)<p>[\s\S]*?<\/p>/;
  if (!record.test(html)) throw Error('Unexpected record template: ' + r.id);
  html = html.replace(record, (_, prefix) => prefix + '<p>' + escape(full.zh) + '</p>');
  html = html.replace(/<p class="record-english" lang="en">[\s\S]*?<\/p>/g, '');
  if (full.en) html = html.replace('<h2>Record / 履历记录</h2><p>' + escape(full.zh) + '</p>', '<h2>Record / 履历记录</h2><p>' + escape(full.zh) + '</p><p class="record-english" lang="en">' + escape(full.en) + '</p>');
  html = html.replace(/<p class="sources">此条仍需要[\s\S]*?<\/p>/g, '')
    .replace(/<section class="section"><h2>Archive metadata \/ 档案信息<\/h2>[\s\S]*?<\/section>/g, '')
    .replace('This entry is an archival record, not a claim of independent organizer verification. ', '');
  fs.writeFileSync(file, html);
}
console.log(`Public archive projection: ${records.length} CV records, ${projects.length} projects`);
