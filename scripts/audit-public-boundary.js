import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const scanRoots = [
  'react/src',
  'content',
  'projects',
  'visual-arts',
  'docs',
  'assets/yujiayun-45ping'
]

const blockedPatterns = [
  { label: 'public-evidence wording', pattern: /公开证据/g },
  { label: 'public score wording', pattern: /评分/g },
  { label: 'intermediate-state wording', pattern: /中间态/g },
  { label: 'todo marker', pattern: /\bTODO\b/g },
  { label: 'casual old thanks', pattern: /做不出这么好的视觉作品/g },
  { label: 'raw source path wording', pattern: /source path/g },
  { label: 'online-search draft wording', pattern: /can find online/g },
  { label: 'Codex mention', pattern: /Codex/g },
  { label: 'mac local path', pattern: /\/Users\//g },
  { label: 'windows local path', pattern: /[A-Z]:[\\/]/g },
  { label: 'network path', pattern: /\\\\HQ-SERVER/gi }
]

const textExtensions = new Set([
  '.js',
  '.jsx',
  '.json',
  '.md',
  '.css',
  '.html',
  '.csv',
  '.txt'
])

function walk(dir) {
  if (!fs.existsSync(dir)) return []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist') return []
      return walk(fullPath)
    }
    return [fullPath]
  })
}

const files = scanRoots
  .map((relative) => path.join(root, relative))
  .flatMap(walk)
  .filter((filePath) => textExtensions.has(path.extname(filePath).toLowerCase()))

const findings = []

for (const filePath of files) {
  const relativePath = path.relative(root, filePath).replaceAll(path.sep, '/')
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/)
  lines.forEach((line, index) => {
    blockedPatterns.forEach(({ label, pattern }) => {
      pattern.lastIndex = 0
      if (pattern.test(line)) {
        findings.push({
          file: relativePath,
          line: index + 1,
          label,
          text: line.trim()
        })
      }
    })
  })
}

if (findings.length) {
  console.error('Public boundary audit failed:')
  findings.forEach((finding) => {
    console.error(`${finding.file}:${finding.line} [${finding.label}] ${finding.text}`)
  })
  process.exit(1)
}

console.log(`Public boundary audit passed. Checked ${files.length} files.`)
