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
const maxCloudflarePagesFileBytes = 25 * 1024 * 1024
const skippedLargeFiles = []

if (!fs.existsSync(sourceAssetsDir)) {
  console.warn(`Workspace assets not found: ${sourceAssetsDir}`)
  process.exit(0)
}

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

copyWithCloudflareLimit(sourceAssetsDir, targetAssetsDir)

fs.cpSync(targetAssetsDir, portfolioAssetsDir, {
  recursive: true,
  force: true
})

// Static project archive pages (kashiwa / timer / drop-flow / mke-terminal …)
if (fs.existsSync(sourceWorksDir)) {
  fs.mkdirSync(targetWorksDir, { recursive: true })
  const copied = []
  for (const name of fs.readdirSync(sourceWorksDir)) {
    if (!name.endsWith('.html')) continue
    fs.copyFileSync(path.join(sourceWorksDir, name), path.join(targetWorksDir, name))
    copied.push(name)
  }
  console.log(`Copied ${copied.length} works HTML file(s) → dist/works/: ${copied.join(', ')}`)
}

// Keep SPA from swallowing static HTML if a host uses rewrite rules
const redirectsPath = path.join(reactRoot, 'dist', '_redirects')
fs.writeFileSync(
  redirectsPath,
  [
    '/works/*  /works/:splat  200',
    '/*    /index.html   200',
  ].join('\n') + '\n'
)

if (skippedLargeFiles.length > 0) {
  console.warn(
    `Skipped ${skippedLargeFiles.length} asset(s) larger than 25 MiB for Cloudflare Pages: ${skippedLargeFiles.join(', ')}`
  )
}

console.log(`Copied workspace assets to ${targetAssetsDir} and ${portfolioAssetsDir}`)
