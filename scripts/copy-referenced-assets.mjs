import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const reactSrc = path.join(repoRoot, 'react', 'src')
const outDir = path.join(repoRoot, 'react', 'dist')
const assetRoot = path.join(repoRoot, 'assets')

const textExtensions = new Set(['.js', '.jsx', '.ts', '.tsx', '.json', '.md', '.html', '.css'])
const assetPatterns = [
  /\/portfolio\/assets\/([^'"`)\s]+)/g,
  /(?<!portfolio)\/assets\/([^'"`)\s]+)/g
]

function walk(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    if (!textExtensions.has(path.extname(entry.name))) return []
    return [full]
  })
}

const refs = new Set()
const staleNestedApp = path.join(outDir, 'portfolio')

if (fs.existsSync(staleNestedApp)) {
  fs.rmSync(staleNestedApp, { recursive: true, force: true })
}

for (const file of walk(reactSrc)) {
  const body = fs.readFileSync(file, 'utf8')
  for (const pattern of assetPatterns) {
    for (const match of body.matchAll(pattern)) {
      refs.add(decodeURIComponent(match[1]))
    }
  }
}

let copied = 0
const missing = []

for (const ref of refs) {
  const source = path.join(assetRoot, ref)
  if (!fs.existsSync(source)) {
    missing.push(ref)
    continue
  }

  const target = path.join(outDir, 'assets', ref)
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.copyFileSync(source, target)
  copied += 1
}

console.log(`Copied ${copied} referenced asset(s) into react/dist/assets.`)

if (missing.length) {
  console.warn(`Missing referenced asset(s): ${missing.length}`)
  for (const ref of missing.slice(0, 20)) console.warn(`- ${ref}`)
}
