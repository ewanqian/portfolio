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

// Workshop demos are canonical inside workshops/personal-av-instrument/demos.
// Publish that canonical tree instead of maintaining parallel copies under works/.
// Resulting public paths:
//   /lab/personal-av-instrument/<demo>/
//   /portfolio/lab/personal-av-instrument/<demo>/
if (fs.existsSync(sourcePersonalAvDemosDir)) {
  copyWithCloudflareLimit(sourcePersonalAvDemosDir, targetPersonalAvDemosDir)
  fs.cpSync(targetPersonalAvDemosDir, portfolioPersonalAvDemosDir, {
    recursive: true,
    force: true
  })
  console.log('Copied Personal A/V Instrument demos → dist/lab/personal-av-instrument/ + dist/portfolio/lab/personal-av-instrument/')
}

if (skippedLargeFiles.length > 0) {
  console.warn(
    `Skipped ${skippedLargeFiles.length} asset(s) larger than 25 MiB for Cloudflare Pages: ${skippedLargeFiles.join(', ')}`
  )
}

console.log('Workspace static copy completed.')
