import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const reactRoot = path.resolve(dirname, '..')
const repoRoot = path.resolve(reactRoot, '..')
const sourceAssetsDir = path.join(repoRoot, 'assets')
const targetAssetsDir = path.join(reactRoot, 'dist', 'assets')
const maxCloudflarePagesFileBytes = 25 * 1024 * 1024
const skippedLargeFiles = []

if (!fs.existsSync(sourceAssetsDir)) {
  console.warn(`Workspace assets not found: ${sourceAssetsDir}`)
  process.exit(0)
}

fs.cpSync(sourceAssetsDir, targetAssetsDir, {
  recursive: true,
  force: true,
  filter(sourcePath) {
    const stats = fs.statSync(sourcePath)

    if (stats.isFile() && stats.size > maxCloudflarePagesFileBytes) {
      skippedLargeFiles.push(path.relative(sourceAssetsDir, sourcePath))
      return false
    }

    return true
  }
})

if (skippedLargeFiles.length > 0) {
  console.warn(
    `Skipped ${skippedLargeFiles.length} asset(s) larger than 25 MiB for Cloudflare Pages: ${skippedLargeFiles.join(', ')}`
  )
}

console.log(`Copied workspace assets to ${targetAssetsDir}`)
