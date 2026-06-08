import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const reactRoot = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(reactRoot, '..')
const assetRoot = path.join(repoRoot, 'assets')

const contentTypes = new Map([
  ['.avif', 'image/avif'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.png', 'image/png'],
  ['.webp', 'image/webp'],
  ['.gif', 'image/gif'],
  ['.svg', 'image/svg+xml'],
  ['.mp4', 'video/mp4'],
  ['.mov', 'video/quicktime']
])

function servePortfolioAssets() {
  return {
    name: 'serve-portfolio-assets',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] || ''
        const prefix = '/portfolio/assets/'

        if (!url.startsWith(prefix)) {
          next()
          return
        }

        const relativePath = decodeURIComponent(url.slice(prefix.length))
        const resolvedPath = path.resolve(assetRoot, relativePath)

        if (!resolvedPath.startsWith(assetRoot) || !fs.existsSync(resolvedPath) || fs.statSync(resolvedPath).isDirectory()) {
          next()
          return
        }

        const contentType = contentTypes.get(path.extname(resolvedPath).toLowerCase())
        if (contentType) {
          res.setHeader('Content-Type', contentType)
        }

        fs.createReadStream(resolvedPath).pipe(res)
      })
    }
  }
}

export default defineConfig({
  root: process.cwd(),
  plugins: [react(), servePortfolioAssets()],
  base: '/portfolio/',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
