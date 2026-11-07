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
