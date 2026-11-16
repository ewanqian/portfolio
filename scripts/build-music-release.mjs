import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const work = JSON.parse(fs.readFileSync(path.join(root, 'content/works/reawakening-2026.json'), 'utf8'))
const release = work.release
const canonical = 'https://ewanqian.site/music/reawakening/'
const image = `https://ewanqian.site${work.image}`
const title = 'Reawakening 复苏 — Ewan Qian'
const description = 'Ewan Qian 音乐单曲 · 1分50秒。低频脉冲、碎片化节奏与合成器纹理，捕捉复苏最初的变化。'
const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]))
const css = fs.readFileSync(path.join(root, 'react/src/pages/MusicRelease.css'), 'utf8')
const html = `<!doctype html>
<html lang="zh-CN"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><meta name="description" content="${escape(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="music.song"><meta property="og:locale" content="zh_CN">
<meta property="og:site_name" content="Ewan Qian"><meta property="og:title" content="${title}">
<meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${canonical}">
<meta property="og:image" content="${image}"><meta property="og:image:secure_url" content="${image}">
<meta property="og:image:type" content="image/jpeg"><meta property="og:image:width" content="810"><meta property="og:image:height" content="810">
<meta property="og:image:alt" content="Reawakening 复苏，红黑机械有机体封面">
<meta property="music:duration" content="110"><meta name="author" content="Ewan Qian">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${escape(description)}"><meta name="twitter:image" content="${image}">
<meta itemprop="name" content="${title}"><meta itemprop="description" content="${escape(description)}"><meta itemprop="image" content="${image}">
<link rel="image_src" href="${image}"><link rel="icon" href="${work.image}" type="image/jpeg">
<style>
*{box-sizing:border-box}body{margin:0;background:#0d0c0b;color:#f2ede5;font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--font-mono:ui-monospace,monospace}a{color:inherit;text-decoration:none}button{font:inherit;cursor:pointer}a:focus-visible,button:focus-visible{outline:2px solid #e49b88;outline-offset:5px}.container{width:min(1240px,calc(100% - 40px));margin:auto}.site-header{border-bottom:1px solid #393632}.site-header>div{min-height:64px;display:flex;align-items:center;justify-content:space-between;gap:20px}.site-header a{font-size:12px}.site-header nav{display:flex;gap:24px}.site-footer{border-top:1px solid #393632;padding:28px 0;color:#aaa095;font-size:12px}.share-actions{display:flex;align-items:center;gap:22px;margin:22px 0}.share-actions button{background:transparent;color:#e6c7ba;border:1px solid #7b6f60;padding:10px 18px;border-radius:0}.share-status{font-size:12px;color:#c8beb0;line-height:1.8}.music-release{padding-top:32px}.music-release-description[lang=en]{font-size:13px;color:#aaa095}.music-release-about{grid-template-columns:1fr 2fr}.music-release-about p[lang=en]{font-size:13px;color:#aaa095}@media(max-width:680px){.music-release{padding-top:26px}.music-release-about{grid-template-columns:1fr}.site-header nav{gap:16px}}
${css}
.music-release{padding-top:32px}@media(max-width:680px){.music-release{padding-top:26px}}
</style>
<script src="/music/reawakening/player.js" defer></script>
</head><body>
<header class="site-header"><div class="container"><a href="/">Ewan Qian / 钱誉文</a><nav aria-label="导航"><a href="/#/works">作品</a><a href="/#/profile">关于</a></nav></div></header>
<main class="music-release"><div class="container">
<div class="music-release-heading"><p>音乐发行 / Music</p><span>Single · 2026</span></div>
<article class="music-release-grid" aria-labelledby="release-title">
<figure class="music-release-artwork"><img src="${work.image}" width="810" height="810" alt="Reawakening 复苏，深红背景中的机械有机体与金属框架"></figure>
<div class="music-release-content"><p class="music-release-artist">ewan qian</p><h1 id="release-title">Reawakening</h1><p class="music-release-subtitle">复苏</p>
<div class="music-release-facts"><span>Electronic</span><span>1 track</span><span>1:50</span></div>
<section class="music-release-listen" aria-labelledby="listen-title"><h2 id="listen-title">收听 / Listen</h2>
<audio id="release-audio" controls preload="metadata" aria-label="播放 Reawakening" data-src="${release.audioUrl}"></audio>
<p id="audio-status" class="share-status" role="status">正在载入音频…</p>
<a class="music-release-external" href="${release.soundcloudUrl}" target="_blank" rel="noopener">SoundCloud ↗</a></section>
<p class="music-release-description">${escape(release.descriptionZh)}</p><p class="music-release-description" lang="en">${escape(release.descriptionEn)}</p><p class="music-release-credit">编曲／Ewan Qian</p>
<div class="share-actions"><button id="share-link" type="button">分享作品</button><a href="${work.image}" download="Reawakening-cover.jpg">封面</a></div>
<p id="share-status" class="share-status" role="status"></p>
<details class="music-release-widget"><summary>SoundCloud 播放器</summary><template id="soundcloud-frame"><iframe title="Reawakening on SoundCloud" src="${escape(release.embedUrl)}" width="100%" height="166" allow="autoplay" loading="lazy"></iframe></template></details>
<noscript><p>音源 <a href="${release.audioUrl}">播放 Reawakening</a></p></noscript>
</div></article>
<section class="music-release-about"><h2>关于艺术家</h2><div><p>钱誉文 Ewan Qian，媒介艺术家。创作横跨声音、动态影像与实时系统，以音画表演和电子声音探索时间、节奏与空间感知。</p><p lang="en">Ewan Qian is a media artist working across sound, moving image and realtime systems. Through audiovisual performance and electronic sound, he explores time, rhythm and spatial perception.</p><a href="/#/profile">艺术家介绍 ↗</a></div></section>
</div></main><footer class="site-footer"><div class="container">© Ewan Qian / 钱誉文</div></footer>
</body></html>`
const directory = path.join(root, 'music/reawakening')
fs.mkdirSync(directory, { recursive: true })
fs.writeFileSync(path.join(directory, 'index.html'), html)
console.log('Built canonical music release /music/reawakening/')
