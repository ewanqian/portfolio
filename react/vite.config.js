import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const repoAssetsRoot = path.join(repoRoot, 'assets')

const mimeTypes = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm'
}

function serveRepoAssets() {
  return {
    name: 'serve-repo-assets',
    configureServer(server) {
      server.middlewares.use('/portfolio/assets', (request, response, next) => {
        const requestPath = decodeURIComponent((request.url || '').split('?')[0]).replace(/^\/+/, '')
        const filePath = path.normalize(path.join(repoAssetsRoot, requestPath))

        if (!filePath.startsWith(repoAssetsRoot)) {
          next()
          return
        }

        fs.stat(filePath, (error, stat) => {
          if (error || !stat.isFile()) {
            next()
            return
          }

          response.setHeader('Content-Type', mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream')
          fs.createReadStream(filePath).pipe(response)
        })
      })
    }
  }
}

export default defineConfig({
  root: __dirname,
  plugins: [react(), serveRepoAssets()],
  base: '/portfolio/',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
