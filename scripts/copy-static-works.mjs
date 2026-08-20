import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function copyDirRecursive(fromDir, toDir) {
  if (!fs.existsSync(fromDir)) return 0
  fs.mkdirSync(toDir, { recursive: true })
  let count = 0
  for (const entry of fs.readdirSync(fromDir, { withFileTypes: true })) {
    const from = path.join(fromDir, entry.name)
    const to = path.join(toDir, entry.name)
    if (entry.isDirectory()) {
      count += copyDirRecursive(from, to)
    } else {
      fs.copyFileSync(from, to)
      count += 1
    }
  }
  return count
}

// Legacy standalone work pages.
const worksFrom = path.join(root, 'works')
const worksTo = path.join(root, 'dist', 'works')

if (fs.existsSync(worksFrom)) {
  fs.mkdirSync(worksTo, { recursive: true })
  const copied = []
  for (const name of fs.readdirSync(worksFrom)) {
    if (!name.endsWith('.html')) continue
    fs.copyFileSync(path.join(worksFrom, name), path.join(worksTo, name))
    copied.push(name)
  }
  console.log(`Copied ${copied.length} works HTML file(s) → dist/works/: ${copied.join(', ')}`)
} else {
  console.warn(`Static works folder not found: ${worksFrom}`)
}

// Workshop demos stay next to their workshop source, then are copied into dist
// so the canonical editable version remains under workshops/.
const demoFrom = path.join(root, 'workshops', 'personal-av-instrument', 'demos')
const demoTo = path.join(root, 'dist', 'workshops', 'personal-av-instrument', 'demos')
const demoCount = copyDirRecursive(demoFrom, demoTo)
console.log(`Copied ${demoCount} Personal A/V Instrument demo file(s) → dist/workshops/personal-av-instrument/demos/`)
