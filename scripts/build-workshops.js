import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const here = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(here, '..')
const sourceDir = path.join(repoRoot, 'content', 'workshops')
const outputFile = path.join(repoRoot, 'react', 'src', 'data', 'generated', 'workshops.js')

const workshops = fs.readdirSync(sourceDir)
  .filter((file) => file.endsWith('.json'))
  .sort()
  .map((file) => JSON.parse(fs.readFileSync(path.join(sourceDir, file), 'utf8')))

fs.writeFileSync(outputFile, `export default ${JSON.stringify(workshops, null, 2)}\n`)
console.log(`Generated ${workshops.length} workshop series -> ${outputFile}`)
