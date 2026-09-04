import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const reactRoot = path.resolve(dirname, '..')
const repoRoot = path.resolve(reactRoot, '..')
const distRoot = path.join(reactRoot, 'dist')
const portfolioDistRoot = path.join(distRoot, 'portfolio')

const sourceAssetsDir = path.join(repoRoot, 'assets')
const targetAssetsDir = path.join(distRoot, 'assets')
const portfolioAssetsDir = path.join(portfolioDistRoot, 'assets')
const sourceWorksDir = path.join(repoRoot, 'works')
const targetWorksDir = path.join(distRoot, 'works')
const portfolioWorksDir = path.join(portfolioDistRoot, 'works')
const sourcePersonalAvDemosDir = path.join(repoRoot, 'workshops', 'personal-av-instrument', 'demos')
const targetPersonalAvDemosDir = path.join(distRoot, 'lab', 'personal-av-instrument')
const portfolioPersonalAvDemosDir = path.join(portfolioDistRoot, 'lab', 'personal-av-instrument')
const targetCanonicalPersonalAvDemosDir = path.join(distRoot, 'workshops', 'personal-av-instrument', 'demos')
const portfolioCanonicalPersonalAvDemosDir = path.join(portfolioDistRoot, 'workshops', 'personal-av-instrument', 'demos')
const sourceManaGuide = path.join(repoRoot, 'workshops', 'gamified-ai-new-media-art-engineer-101', 'runbook-20260829.html')
const targetManaGuideDir = path.join(distRoot, 'workshops', 'gamified-ai-new-media-art-engineer-101')
const portfolioManaGuideDir = path.join(portfolioDistRoot, 'workshops', 'gamified-ai-new-media-art-engineer-101')
const sourceControlModel = path.join(repoRoot, 'research', 'performance-control-model', 'index.html')
const targetControlModelDir = path.join(distRoot, 'research', 'performance-control-model')
const portfolioControlModelDir = path.join(portfolioDistRoot, 'research', 'performance-control-model')

// Post-workshop public archive and participant resources live at repository root.
// The production site is built from react/dist, so these paths must be copied
// explicitly after Vite finishes. Mirror them under /portfolio as well because
// older generated links still use that compatibility prefix.
const workshopPublicDirs = [
  'mana-0829',
  'workshop-knowledge',
  'workshop-toys',
  'workshop-state-instrument',
  'workshop-demos',
  'av-system-0905'
]
const workshopPublicFiles = [
  '0829.html',
  'workshop-reader.html'
]

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

function publishWorkshopDirectory(name) {
  const sourceDir = path.join(repoRoot, name)
  if (!fs.existsSync(sourceDir)) {
    console.warn(`Workshop public directory not found: ${sourceDir}`)
    return
  }

  const targetDir = path.join(distRoot, name)
  const portfolioTargetDir = path.join(portfolioDistRoot, name)
  copyWithCloudflareLimit(sourceDir, targetDir)
  copyWithCloudflareLimit(sourceDir, portfolioTargetDir)
  console.log(`Published workshop directory → /${name}/ + /portfolio/${name}/`)
}

function publishWorkshopFile(name) {
  const sourcePath = path.join(repoRoot, name)
  if (!fs.existsSync(sourcePath)) {
    console.warn(`Workshop public file not found: ${sourcePath}`)
    return
  }

  fs.mkdirSync(distRoot, { recursive: true })
  fs.mkdirSync(portfolioDistRoot, { recursive: true })
  fs.copyFileSync(sourcePath, path.join(distRoot, name))
  fs.copyFileSync(sourcePath, path.join(portfolioDistRoot, name))
  console.log(`Published workshop file → /${name} + /portfolio/${name}`)
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
    const sourcePath = path.join(sourceWorksDir, name)
    const stats = fs.statSync(sourcePath)

    if (stats.isDirectory()) {
      copyWithCloudflareLimit(sourcePath, path.join(targetWorksDir, name))
      copyWithCloudflareLimit(sourcePath, path.join(portfolioWorksDir, name))
      copied.push(`${name}/`)
      continue
    }

    if (name.endsWith('.html')) {
      fs.copyFileSync(sourcePath, path.join(targetWorksDir, name))
      fs.copyFileSync(sourcePath, path.join(portfolioWorksDir, name))
      copied.push(name)
    }
  }
  console.log(`Copied ${copied.length} standalone work entry(s) → dist/works/ + dist/portfolio/works/: ${copied.join(', ')}`)
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

// Publish the actual post-workshop archive/resources into the same production
// output as the portfolio app. This closes the gap between a successful root
// GitHub Pages artifact and the React/Cloudflare production build.
for (const name of workshopPublicDirs) publishWorkshopDirectory(name)
for (const name of workshopPublicFiles) publishWorkshopFile(name)

if (skippedLargeFiles.length > 0) {
  console.warn(
    `Skipped ${skippedLargeFiles.length} asset(s) larger than 25 MiB for Cloudflare Pages: ${skippedLargeFiles.join(', ')}`
  )
}

console.log('Workspace static copy completed.')
