import fs from 'node:fs'
import path from 'node:path'

const files = []
function walk(dir){
  for (const e of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,e.name)
    if(e.isDirectory()) walk(p); else files.push(p)
  }
}
walk('assets')
const rows=files.filter(f=>/\.(jpe?g|png|webp)$/i.test(f)).map(f=>({f:f.replaceAll('\\','/'),s:fs.statSync(f).size}))
const total=rows.reduce((a,b)=>a+b.s,0)
console.log('before_count=' + rows.length)
console.log('before_mb=' + (total/1048576).toFixed(2))
for (const r of rows.sort((a,b)=>b.s-a.s).slice(0,30)) console.log(`${(r.s/1048576).toFixed(2)}MB ${r.f}`)
