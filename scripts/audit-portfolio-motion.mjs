#!/usr/bin/env node
/**
 * Non-destructive portfolio media inventory. Requires ffprobe for frame/duration
 * metadata. Never rewrites or removes media. Run from repository root:
 * node scripts/audit-portfolio-motion.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { execFileSync } from 'node:child_process'

const root = path.resolve(import.meta.dirname, '..')
const output = path.join(root, 'docs/media-intake/motion-audit-2026-10.csv')
const extensions = new Set(['.gif', '.webp', '.avif', '.mov', '.mp4', '.webm'])
const excluded = new Set(['node_modules', '.git', 'dist', 'build', '.next'])
const found = []
function visit(dir) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (!excluded.has(entry.name)) visit(full)
    } else if (entry.isFile() && extensions.has(path.extname(entry.name).toLowerCase())) found.push(full)
  }
}
for (const dir of ['assets','react/public','public','works','projects','workshops']) visit(path.join(root, dir))

const references = []
function visitSource(dir) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes:true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) { if (!excluded.has(entry.name)) visitSource(full) }
    else if (entry.isFile() && /\.(jsx?|tsx?|json|md|html|css)$/i.test(entry.name)) {
      const raw = fs.readFileSync(full, 'utf8')
      const re = /[\w./%+@-]+\.(?:gif|webp|avif|mov|mp4|webm)(?:\?[^"'\s<>)]*)?/gi
      for (const match of raw.matchAll(re)) references.push({ file:path.relative(root,full).replaceAll('\\','/'), match:match[0] })
    }
  }
}
for (const dir of ['react/src','content','projects','works','workshops']) visitSource(path.join(root, dir))

let probeAvailable = true
try { execFileSync('ffprobe', ['-version'], { stdio:'ignore' }) } catch { probeAvailable = false }
function probe(file) {
  if (!probeAvailable) return { error:'ffprobe NOT RUN (binary unavailable)' }
  try {
    const out = execFileSync('ffprobe', [
      '-v','error','-count_frames',
      '-show_entries','stream=codec_name,codec_type,width,height,nb_frames,nb_read_frames,duration:format=duration',
      '-of','json',file
    ], { encoding:'utf8', maxBuffer:10*1024*1024 })
    const data = JSON.parse(out)
    const video = data.streams?.find(s=>s.codec_type === 'video') || data.streams?.[0] || {}
    return { width:video.width||'',height:video.height||'',
      frame_count:video.nb_read_frames||video.nb_frames||'',
      duration_seconds:video.duration||data.format?.duration||'',
      codec:video.codec_name||'', error:'' }
  } catch(e) { return {error:'ffprobe FAIL: '+String(e.message).slice(0,120)} }
}
const sha256 = file => {
  const h=crypto.createHash('sha256')
  h.update(fs.readFileSync(file))
  return h.digest('hex')
}
const q = value => '"' + String(value??'').replaceAll('"','""') + '"'
const columns = [
  'source_path','project_id','rights_credit','width','height','duration_seconds',
  'frame_count','format','file_size_bytes','sha256','current_site_url','http_status',
  'browser_playback','chosen_publication_format','references','probe_error'
]
const rows = found.map(file => {
  const rel = path.relative(root,file).replaceAll('\\','/')
  const info = probe(file)
  const basename = path.basename(file)
  const refs = references.filter(ref => ref.match.includes(basename)).map(ref=>ref.file)
  return {
    source_path:rel,project_id:'UNVERIFIED',rights_credit:'UNVERIFIED',
    width:info.width,height:info.height,duration_seconds:info.duration_seconds,
    frame_count:info.frame_count,format:path.extname(file).slice(1).toLowerCase(),
    file_size_bytes:fs.statSync(file).size,sha256:sha256(file),
    current_site_url:'NOT VERIFIED',http_status:'NOT RUN',browser_playback:'NOT RUN',
    chosen_publication_format:'PENDING',references:[...new Set(refs)].join('; '),
    probe_error:info.error||''
  }
})
fs.mkdirSync(path.dirname(output), {recursive:true})
fs.writeFileSync(output, [columns.map(q).join(','),...rows.map(row=>columns.map(c=>q(row[c])).join(','))].join('\n')+'\n')
const garden = rows.find(row=>row.source_path.endsWith('digital-garden-loop.avif'))
const verifiedFrameCount = garden && Number(garden.frame_count) > 1
console.log(JSON.stringify({
  files:rows.length, output:path.relative(root,output), ffprobe:probeAvailable?'AVAILABLE':'NOT RUN',
  digital_garden: garden ? {
    frames:garden.frame_count,width:garden.width,height:garden.height,
    codec:garden.format,bytes:garden.file_size_bytes,
    motion_verified:!!verifiedFrameCount,probe_error:garden.probe_error
  } : 'MISSING',
  browser_playback:'NOT RUN',rights:'UNVERIFIED'
},null,2))
if (!garden || !verifiedFrameCount) {
  console.error('Digital Garden: multi-frame animation is NOT VERIFIED; no PASS claim.')
  process.exitCode = 2
}
