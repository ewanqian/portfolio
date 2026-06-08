import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const failures = []

function read(relativePath) {
  const fullPath = path.join(root, relativePath)
  if (!fs.existsSync(fullPath)) {
    failures.push(`missing file: ${relativePath}`)
    return ''
  }
  return fs.readFileSync(fullPath, 'utf8')
}

function loadScenes() {
  const text = read('react/src/data/generated/gaussianScenes.js')
  const jsonText = text
    .replace(/^export\s+default\s+/u, '')
    .replace(/;\s*$/u, '')

  return JSON.parse(jsonText)
}

const appText = read('react/src/App.jsx')
const listText = read('react/src/pages/GaussianScenes.jsx')
const detailText = read('react/src/pages/GaussianSceneDetail.jsx')

if (!appText.includes('/gaussian-scenes/:slug')) {
  failures.push('App route missing: /gaussian-scenes/:slug')
}

if (!listText.includes('/gaussian-scenes/${scene.slug}')) {
  failures.push('Gaussian list does not route cards to internal detail pages')
}

if (!detailText.includes('scene.notes') || !detailText.includes('scene.embedUrl') || !detailText.includes('scene.captureMoment')) {
  failures.push('Gaussian detail page does not render notes, embed URL, and capture moment')
}

const scenes = loadScenes()
const requiredSlugs = [
  'timer-gaussian-0531',
  'dropflow-collection-rooms719',
  'shinjuku-gyoen-greenhouse',
  'tokyo-tower-garden-2',
  'shibuya-sakura-stage'
]

if (!Array.isArray(scenes) || scenes.length < requiredSlugs.length) {
  failures.push(`expected at least ${requiredSlugs.length} gaussian scenes`)
}

const slugs = new Set(scenes.map((scene) => scene.slug))
for (const slug of requiredSlugs) {
  if (!slugs.has(slug)) {
    failures.push(`missing scene slug: ${slug}`)
  }
}

for (const scene of scenes) {
  for (const key of ['id', 'slug', 'displayTitle', 'category', 'summary', 'location', 'captureMoment', 'sceneUrl', 'embedUrl', 'localThumbnail']) {
    if (!scene[key]) {
      failures.push(`${scene.slug || scene.id || 'unknown'} missing ${key}`)
    }
  }

  if (!Array.isArray(scene.notes) || scene.notes.length < 2) {
    failures.push(`${scene.slug} needs at least two public notes`)
  }

  const localThumbnail = scene.localThumbnail?.replace(/^\/+/, '')
  if (localThumbnail && !fs.existsSync(path.join(root, localThumbnail))) {
    failures.push(`${scene.slug} thumbnail missing: ${scene.localThumbnail}`)
  }
}

if (failures.length) {
  console.error('Gaussian scene audit failed')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Gaussian scene audit passed. scenes=${scenes.length}`)
