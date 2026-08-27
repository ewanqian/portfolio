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

// Standalone work pages and self-contained browser artworks.
const worksFrom = path.join(root, 'works')
const worksTo = path.join(root, 'dist', 'works')

if (fs.existsSync(worksFrom)) {
  fs.mkdirSync(worksTo, { recursive: true })
  const copied = []
  for (const entry of fs.readdirSync(worksFrom, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      const count = copyDirRecursive(path.join(worksFrom, entry.name), path.join(worksTo, entry.name))
      copied.push(`${entry.name}/ (${count})`)
      continue
    }
    if (!entry.name.endsWith('.html')) continue
    fs.copyFileSync(path.join(worksFrom, entry.name), path.join(worksTo, entry.name))
    copied.push(entry.name)
  }
  console.log(`Copied ${copied.length} standalone work entry(s) → dist/works/: ${copied.join(', ')}`)
} else {
  console.warn(`Static works folder not found: ${worksFrom}`)
}

const latticeSourceFrom = path.join(root, 'projects', 'no-further-input-required', 'NFI_Lattice_Three')
const latticeSourceTo = path.join(root, 'dist', 'projects', 'no-further-input-required', 'NFI_Lattice_Three')
const latticeSourceCount = copyDirRecursive(latticeSourceFrom, latticeSourceTo)
console.log(`Copied ${latticeSourceCount} NFI lattice source file(s) → dist/projects/no-further-input-required/NFI_Lattice_Three/`)

// Personal A/V Instrument demos stay next to their workshop source, then are
// copied into dist so the canonical editable version remains under workshops/.
const demoFrom = path.join(root, 'workshops', 'personal-av-instrument', 'demos')
const demoTo = path.join(root, 'dist', 'workshops', 'personal-av-instrument', 'demos')
const demoCount = copyDirRecursive(demoFrom, demoTo)
console.log(`Copied ${demoCount} Personal A/V Instrument demo file(s) → dist/workshops/personal-av-instrument/demos/`)

// MANA 8.29 public workshop guide. The dated source remains explicit in the
// repository, while the deployed folder also receives index.html for a clean URL.
const manaGuideFrom = path.join(root, 'workshops', 'gamified-ai-new-media-art-engineer-101', 'runbook-20260829.html')
const manaGuideTo = path.join(root, 'dist', 'workshops', 'gamified-ai-new-media-art-engineer-101')
if (fs.existsSync(manaGuideFrom)) {
  fs.mkdirSync(manaGuideTo, { recursive: true })
  fs.copyFileSync(manaGuideFrom, path.join(manaGuideTo, 'index.html'))
  fs.copyFileSync(manaGuideFrom, path.join(manaGuideTo, 'runbook-20260829.html'))
  console.log('Published MANA 8.29 workshop guide → dist/workshops/gamified-ai-new-media-art-engineer-101/')
}

// Standalone public lecture for the New Media Engineering Control Model.
const controlModelFrom = path.join(root, 'research', 'performance-control-model')
const controlModelTo = path.join(root, 'dist', 'research', 'performance-control-model')
const controlModelCount = copyDirRecursive(controlModelFrom, controlModelTo)
console.log(`Copied ${controlModelCount} control-model file(s) → dist/research/performance-control-model/`)
