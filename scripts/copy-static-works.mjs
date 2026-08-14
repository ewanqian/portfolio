import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const fromDir = path.join(root, 'works')
const toDir = path.join(root, 'dist', 'works')

if (!fs.existsSync(fromDir)) {
  console.warn(`Static works folder not found: ${fromDir}`)
  process.exit(0)
}

fs.mkdirSync(toDir, { recursive: true })

const copied = []
for (const name of fs.readdirSync(fromDir)) {
  if (!name.endsWith('.html')) continue
  fs.copyFileSync(path.join(fromDir, name), path.join(toDir, name))
  copied.push(name)
}

console.log(`Copied ${copied.length} works HTML file(s) → dist/works/: ${copied.join(', ')}`)
