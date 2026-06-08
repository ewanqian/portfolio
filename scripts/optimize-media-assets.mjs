import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const root = process.cwd()
const assetsRoot = path.join(root, 'assets')
const textRoots = ['react/src', 'content', 'projects', 'visual-arts', 'docs', 'works', 'about', 'services']
const textExtensions = new Set(['.js', '.jsx', '.json', '.md', '.html', '.css', '.txt'])
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp'])
const changed = []
const replacements = []

function walk(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist') return []
      return walk(full)
    }
    return [full]
  })
}

function probe(file) {
  const out = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0:s=x', file], { encoding: 'utf8' }).trim()
  const [width, height] = out.split('x').map(Number)
  return { width, height }
}

function targetWidthFor(file, width, height) {
  const rel = path.relative(root, file).replaceAll('\\', '/')
  const maxDim = Math.max(width, height)
  const ultraWide = width / Math.max(height, 1) >= 2.8
  if (ultraWide) return Math.min(width, 2600)
  if (rel.includes('profile/')) return Math.min(width, 1800)
  if (rel.includes('raw-library/') && maxDim > 4000) return Math.min(width, Math.round(width * 3000 / maxDim))
  if (width >= 3000 || height >= 3000) return Math.min(width, 2560)
  return Math.min(width, 2200)
}

function encodeWebp(source, target, width, quality) {
  const vf = `scale=${width}:-1:flags=lanczos`
  execFileSync('ffmpeg', ['-y', '-i', source, '-vf', vf, '-c:v', 'libwebp', '-quality', String(quality), '-compression_level', '6', '-metadata', 'comment=', target], { stdio: 'pipe' })
}

const imageFiles = walk(assetsRoot).filter((file) => imageExtensions.has(path.extname(file).toLowerCase()))

for (const source of imageFiles) {
  const ext = path.extname(source).toLowerCase()
  const stat = fs.statSync(source)
  const { width, height } = probe(source)
  const targetWidth = targetWidthFor(source, width, height)
  const quality = stat.size > 2 * 1024 * 1024 ? 78 : 82
  const target = ext === '.webp' ? source : source.slice(0, -ext.length) + '.webp'
  const temp = target + '.tmp.webp'

  if (target !== source && fs.existsSync(target)) {
    continue
  }

  encodeWebp(source, temp, targetWidth, quality)
  const tempSize = fs.statSync(temp).size
  const shouldUse = target !== source || tempSize < stat.size * 0.92

  if (shouldUse) {
    fs.renameSync(temp, target)
    if (target !== source) fs.unlinkSync(source)
    const beforeRel = path.relative(root, source).replaceAll('\\', '/')
    const afterRel = path.relative(root, target).replaceAll('\\', '/')
    replacements.push([beforeRel, afterRel])
    changed.push({ beforeRel, afterRel, before: stat.size, after: fs.statSync(target).size, width, height, targetWidth })
  } else {
    fs.unlinkSync(temp)
  }
}

function replaceAllLiteral(text, find, replace) {
  return text.split(find).join(replace)
}

const textFiles = textRoots.flatMap((dir) => walk(path.join(root, dir))).filter((file) => textExtensions.has(path.extname(file).toLowerCase()))
for (const file of textFiles) {
  let text = fs.readFileSync(file, 'utf8')
  const old = text
  for (const [beforeRel, afterRel] of replacements) {
    text = replaceAllLiteral(text, beforeRel, afterRel)
    text = replaceAllLiteral(text, beforeRel.replace(/^assets\//, '/assets/'), afterRel.replace(/^assets\//, '/assets/'))
    text = replaceAllLiteral(text, beforeRel.replace(/^assets\//, '/portfolio/assets/'), afterRel.replace(/^assets\//, '/portfolio/assets/'))
    text = replaceAllLiteral(text, path.basename(beforeRel), path.basename(afterRel))
  }
  if (text !== old) fs.writeFileSync(file, text)
}

const beforeTotal = changed.reduce((sum, item) => sum + item.before, 0)
const afterTotal = changed.reduce((sum, item) => sum + item.after, 0)
console.log(`optimized_count=${changed.length}`)
console.log(`optimized_before_mb=${(beforeTotal / 1048576).toFixed(2)}`)
console.log(`optimized_after_mb=${(afterTotal / 1048576).toFixed(2)}`)
console.log(`optimized_saved_mb=${((beforeTotal - afterTotal) / 1048576).toFixed(2)}`)
for (const item of changed.sort((a, b) => (b.before - b.after) - (a.before - a.after)).slice(0, 40)) {
  console.log(`${(item.before / 1048576).toFixed(2)} -> ${(item.after / 1048576).toFixed(2)} MB\t${item.width}x${item.height}\t${item.beforeRel} -> ${item.afterRel}`)
}
