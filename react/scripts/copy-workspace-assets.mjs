import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const reactRoot = path.resolve(dirname, '..')
const repoRoot = path.resolve(reactRoot, '..')
const sourceAssetsDir = path.join(repoRoot, 'assets')
const targetAssetsDir = path.join(reactRoot, 'dist', 'assets')
const portfolioAssetsDir = path.join(reactRoot, 'dist', 'portfolio', 'assets')
const sourceWorksDir = path.join(repoRoot, 'works')
const targetWorksDir = path.join(reactRoot, 'dist', 'works')
const portfolioWorksDir = path.join(reactRoot, 'dist', 'portfolio', 'works')
const sourcePersonalAvDemosDir = path.join(repoRoot, 'workshops', 'personal-av-instrument', 'demos')
const targetPersonalAvDemosDir = path.join(reactRoot, 'dist', 'lab', 'personal-av-instrument')
const portfolioPersonalAvDemosDir = path.join(reactRoot, 'dist', 'portfolio', 'lab', 'personal-av-instrument')
const targetCanonicalPersonalAvDemosDir = path.join(reactRoot, 'dist', 'workshops', 'personal-av-instrument', 'demos')
const portfolioCanonicalPersonalAvDemosDir = path.join(reactRoot, 'dist', 'portfolio', 'workshops', 'personal-av-instrument', 'demos')
const sourceManaGuide = path.join(repoRoot, 'workshops', 'gamified-ai-new-media-art-engineer-101', 'runbook-20260829.html')
const targetManaGuideDir = path.join(reactRoot, 'dist', 'workshops', 'gamified-ai-new-media-art-engineer-101')
const portfolioManaGuideDir = path.join(reactRoot, 'dist', 'portfolio', 'workshops', 'gamified-ai-new-media-art-engineer-101')
const sourceControlModel = path.join(repoRoot, 'research', 'performance-control-model', 'index.html')
const targetControlModelDir = path.join(reactRoot, 'dist', 'research', 'performance-control-model')
const portfolioControlModelDir = path.join(reactRoot, 'dist', 'portfolio', 'research', 'performance-control-model')
const maxCloudflarePagesFileBytes = 25 * 1024 * 1024
const skippedLargeFiles = []

function copyWithCloudflareLimit(fromDir, toDir) {
  fs.cpSync(fromDir, toDir, {
    recursive: true,
    force: true,
    filter(sourcePath) {
      const stats = fs.statSync(sourcePath)

      if (stats.isFile() && stats.size > maxCloudflarePagesFileBytes) {
        skippedLargeFiles.push(path.relative(fromDir, sourcePath))
        return false
      }

      return true
    }
  })
}

function copyStandalonePage(sourcePath, targetDir, portfolioTargetDir, filename = 'index.html') {
  if (!fs.existsSync(sourcePath)) {
    console.warn(`Standalone page not found: ${sourcePath}`)
    return
  }

  fs.mkdirSync(targetDir, { recursive: true })
  fs.mkdirSync(portfolioTargetDir, { recursive: true })
  fs.copyFileSync(sourcePath, path.join(targetDir, filename))
  fs.copyFileSync(sourcePath, path.join(portfolioTargetDir, filename))
}

if (fs.existsSync(sourceAssetsDir)) {
  copyWithCloudflareLimit(sourceAssetsDir, targetAssetsDir)
  fs.cpSync(targetAssetsDir, portfolioAssetsDir, {
    recursive: true,
    force: true
  })
} else {
  console.warn(`Workspace assets not found: ${sourceAssetsDir}`)
}

// Static project archive pages must exist as real files in the deploy output,
// otherwise SPA hosts rewrite /works/*.html to index.html. Keep a mirrored
// /portfolio/works copy as a compatibility path for older generated links.
if (fs.existsSync(sourceWorksDir)) {
  fs.mkdirSync(targetWorksDir, { recursive: true })
  fs.mkdirSync(portfolioWorksDir, { recursive: true })
  const copied = []
  for (const name of fs.readdirSync(sourceWorksDir)) {
    if (!name.endsWith('.html')) continue
    const sourcePath = path.join(sourceWorksDir, name)
    fs.copyFileSync(sourcePath, path.join(targetWorksDir, name))
    fs.copyFileSync(sourcePath, path.join(portfolioWorksDir, name))
    copied.push(name)
  }
  console.log(`Copied ${copied.length} works HTML file(s) → dist/works/ + dist/portfolio/works/: ${copied.join(', ')}`)
}

// Workshop demos remain canonical under workshops/personal-av-instrument/demos.
// Publish both the short /lab path and the canonical /workshops path so public
// teaching pages can use stable relative links without maintaining duplicate source.
if (fs.existsSync(sourcePersonalAvDemosDir)) {
  copyWithCloudflareLimit(sourcePersonalAvDemosDir, targetPersonalAvDemosDir)
  fs.cpSync(targetPersonalAvDemosDir, portfolioPersonalAvDemosDir, {
    recursive: true,
    force: true
  })
  fs.cpSync(targetPersonalAvDemosDir, targetCanonicalPersonalAvDemosDir, {
    recursive: true,
    force: true
  })
  fs.cpSync(targetPersonalAvDemosDir, portfolioCanonicalPersonalAvDemosDir, {
    recursive: true,
    force: true
  })
  console.log('Copied Personal A/V Instrument demos → /lab/... + /workshops/personal-av-instrument/demos/...')
}

// Public MANA 8.29 guide. Keep the dated source in the repository, but publish
// it as a clean index route. Also keep the dated filename for direct references.
copyStandalonePage(sourceManaGuide, targetManaGuideDir, portfolioManaGuideDir)
if (fs.existsSync(sourceManaGuide)) {
  fs.copyFileSync(sourceManaGuide, path.join(targetManaGuideDir, 'runbook-20260829.html'))
  fs.copyFileSync(sourceManaGuide, path.join(portfolioManaGuideDir, 'runbook-20260829.html'))
  console.log('Published MANA workshop guide → /workshops/gamified-ai-new-media-art-engineer-101/')
}

// Public standalone control-model lecture. Only the reader-facing page is
// deployed here; internal experiments and R&D notes remain repository material.
copyStandalonePage(sourceControlModel, targetControlModelDir, portfolioControlModelDir)
if (fs.existsSync(sourceControlModel)) {
  console.log('Published control model → /research/performance-control-model/')
}

if (skippedLargeFiles.length > 0) {
  console.warn(
    `Skipped ${skippedLargeFiles.length} asset(s) larger than 25 MiB for Cloudflare Pages: ${skippedLargeFiles.join(', ')}`
  )
}

console.log('Workspace static copy completed.')
