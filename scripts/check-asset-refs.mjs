import fs from 'node:fs'
import path from 'node:path'
const roots = ['react/src', 'content', 'projects', 'visual-arts', 'docs', 'about', 'works']
const exts = new Set(['.js','.jsx','.json','.md','.html','.css'])
function walk(dir){ if(!fs.existsSync(dir)) return []; return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{ const p=path.join(dir,e.name); if(e.isDirectory()) return walk(p); return [p] }) }
const files = roots.flatMap(walk).filter(f=>exts.has(path.extname(f).toLowerCase()))
const refs=[]
const re=/['"]((?:\/portfolio)?\/assets\/[^'"?#]+\.(?:jpg|jpeg|png|webp|gif|avif|mp4|mov|webm))['"]/gi
for(const f of files){ const text=fs.readFileSync(f,'utf8'); let m; while((m=re.exec(text))) refs.push({file:f.replaceAll('\\','/'), ref:m[1]}) }
const missing=[]
for(const r of refs){ const local=r.ref.replace(/^\/portfolio\/assets\//,'assets/').replace(/^\/assets\//,'assets/'); if(!fs.existsSync(local)) missing.push({...r, local}) }
console.log(`asset_refs=${refs.length}`)
console.log(`missing_refs=${missing.length}`)
for(const m of missing.slice(0,200)) console.log(`${m.file}: ${m.ref} -> ${m.local}`)
process.exit(missing.length ? 1 : 0)
