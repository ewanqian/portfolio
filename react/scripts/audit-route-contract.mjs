import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const srcRoot = path.join(projectRoot, 'src')
const appSource = fs.readFileSync(path.join(srcRoot, 'App.jsx'), 'utf8')
const routeSource = fs.readFileSync(path.join(srcRoot, 'data', 'siteDisplay.js'), 'utf8')

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(fullPath) : [fullPath]
  })
}

const sourceFiles = walk(srcRoot).filter((filePath) => /\.(js|jsx)$/.test(filePath))
const findings = []

for (const filePath of sourceFiles) {
  const source = fs.readFileSync(filePath, 'utf8')
  const relativePath = path.relative(projectRoot, filePath).replaceAll(path.sep, '/')

  if (source.includes('/portfolio/projects/')) {
    findings.push(`${relativePath}: React project routes must use #/projects/...`)
  }

  if (source.includes('href="/portfolio/#/')) {
    findings.push(`${relativePath}: internal navigation must use a hash-relative href`)
  }
}

const projectTargets = [...routeSource.matchAll(/['"](#\/projects\/[^'"]+)['"]/g)]
  .map((match) => match[1].replace(/^#/, ''))

for (const route of new Set(projectTargets)) {
  if (!appSource.includes(`path="${route}"`)) {
    findings.push(`Missing React route for ${route}`)
  }
}

if (findings.length) {
  console.error('Route contract audit failed:')
  findings.forEach((finding) => console.error(`- ${finding}`))
  process.exit(1)
}

console.log(`Route contract audit passed. Checked ${sourceFiles.length} source files and ${new Set(projectTargets).size} project routes.`)
