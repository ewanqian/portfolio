#!/usr/bin/env node
// QA-only contact sheet. Writes to ephemeral Vite dist output, never to source assets.
import fs from 'node:fs'
import path from 'node:path'
const assets=[
['Drop Flow — current collage','/portfolio/assets/home/featured-dropflow-main.webp'],
['Drop Flow — UFO stage 01','/portfolio/assets/drop-flow/optimized/ufo-stage-01.webp'],
['Drop Flow — UFO stage 02','/portfolio/assets/drop-flow/optimized/ufo-stage-02.webp'],
['Drop Flow — UFO stage 03','/portfolio/assets/drop-flow/optimized/ufo-stage-03.webp'],
['Drop Flow — event documentation','/portfolio/assets/raw-library/ufo-terminal-drop-flow-creation-camp.webp'],
['Drop Flow — Hangzhou live','/portfolio/assets/drop-flow/optimized/hero-hangzhou-performance.webp'],
['Drop Flow — Hangzhou video','/portfolio/assets/drop-flow/optimized/hangzhou-video-cover.webp'],
['Drop Flow — Gaussian collection','/portfolio/assets/gaussian-scenes/dropflow-collection-rooms719.webp'],
['Drop Flow — rooms collection','/portfolio/assets/drop-flow/optimized/rooms719-collection.webp'],
['TIMER — current hero','/portfolio/assets/home/archive-timer-clean.webp'],
['TIMER — public screen','/portfolio/assets/home/featured-timer-main.webp'],
['TIMER — Vision Pro','/portfolio/assets/home/featured-timer-visionpro.webp'],
['TITAN — live','/portfolio/assets/raw-picks/titan-bolive-clean-16x9.webp'],
['Digital Garden — site','/portfolio/assets/digital-garden/digital-garden-xian-mixc-01.webp']
]
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;')
const cards=assets.map(([label,src],i)=>`<article><div class="media"><img src="${escape(src)}" loading="eager" onerror="this.parentElement.classList.add('broken')" /></div><div class="label">${i+1} — ${escape(label)}</div><code>${escape(src)}</code></article>`).join('')
const html=`<!doctype html><html><head><meta charset="utf-8"><style>
*{box-sizing:border-box}body{margin:0;background:#111;color:#eee;font:15px Arial,sans-serif;padding:18px}
h1{font-size:22px;margin:0 0 20px}main{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
article{border:1px solid #454545;padding:8px;background:#191919;min-width:0}
.media{height:275px;display:flex;align-items:center;justify-content:center;background:#080808;position:relative}
.media.broken:before{content:'DECODE/HTTP FAILURE';color:#f77;position:absolute;top:50%;left:20%}
img{max-width:100%;max-height:100%;object-fit:contain}.label{font-weight:bold;margin:10px 0 6px}code{font:11px monospace;color:#aaa;overflow-wrap:anywhere}
</style></head><body><h1>Portfolio Cover Candidate Review — QA only / NOT PUBLISHED</h1><main>${cards}</main></body></html>`
const dest=path.resolve('react/dist/qa-cover-contact-sheet.html')
fs.writeFileSync(dest,html)
console.log('QA cover sheet generated:',dest,'candidates:',assets.length)
