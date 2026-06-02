import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const sourceAssetsDir = path.join(repoRoot, 'assets')

function workspaceAssetsPlugin() {
  return {
    name: 'workspace-assets',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const rawUrl = req.url?.split('?')[0] || ''
        const normalizedUrl = rawUrl.startsWith('/portfolio/assets/')
          ? rawUrl.replace(/^\/portfolio\/assets\//, '/assets/')
          : rawUrl

        if (!normalizedUrl.startsWith('/assets/')) {
          next()
          return
        }

        const relativePath = decodeURIComponent(normalizedUrl.replace(/^\/assets\//, ''))
        const absolutePath = path.resolve(sourceAssetsDir, relativePath)

        if (!absolutePath.startsWith(sourceAssetsDir) || !fs.existsSync(absolutePath) || fs.statSync(absolutePath).isDirectory()) {
          next()
          return
        }

        const extension = path.extname(absolutePath).toLowerCase()
        const contentTypes = {
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.png': 'image/png',
          '.webp': 'image/webp',
          '.avif': 'image/avif',
          '.gif': 'image/gif',
          '.svg': 'image/svg+xml',
          '.mp4': 'video/mp4',
          '.mov': 'video/quicktime'
        }

        res.setHeader('Content-Type', contentTypes[extension] || 'application/octet-stream')
        fs.createReadStream(absolutePath).pipe(res)
      })
    }
  }
}

export default defineConfig({
  plugins: [react(), workspaceAssetsPlugin()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
