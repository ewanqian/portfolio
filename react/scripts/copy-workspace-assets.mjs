import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const reactRoot = path.resolve(dirname, '..')
const repoRoot = path.resolve(reactRoot, '..')
const sourceAssetsDir = path.join(repoRoot, 'assets')
const targetAssetsDir = path.join(reactRoot, 'dist', 'assets')

if (!fs.existsSync(sourceAssetsDir)) {
  console.warn(`Workspace assets not found: ${sourceAssetsDir}`)
  process.exit(0)
}

fs.cpSync(sourceAssetsDir, targetAssetsDir, {
  recursive: true,
  force: true
})

console.log(`Copied workspace assets to ${targetAssetsDir}`)
