import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const root = process.cwd()

const requiredFiles = [
  'docs/portfolio-maintenance-os/README.md',
  'docs/portfolio-maintenance-os/project-template.md',
  'docs/portfolio-maintenance-os/media-template.md',
  'docs/portfolio-maintenance-os/credit-template.md',
  'docs/portfolio-maintenance-os/publish-checklist.md',
  'docs/portfolio-maintenance-os/case-register.md',
  'docs/portfolio-maintenance-os/yujiayun-45m2-case-manifest.md',
  'docs/portfolio-maintenance-os/external-source-approval.md',
  'docs/portfolio-maintenance-os/roadmap.md',
  'projects/yujiayun-45ping-visual-2025.md',
  'visual-arts/45m2-ningbo/README.md',
  'content/works/yujiayun-45ping-visual-2025.json',
  'react/src/pages/YuJiayun45m2.jsx',
  'assets/yujiayun-45ping/README.md'
]

const requiredProjectSections = [
  '## One-line Summary',
  '## Project Facts',
  '## Context',
  '## My Role',
  '## Opening System',
  '## Song Surface Map',
  '## Delivery / Outputs',
  '## Credits',
  '## Links'
]

const requiredPageText = [
  'openingSequence',
  'songSurfaces',
  'deliveryNotes',
  '橙色快闪段落',
  'Visual Production / Delivery Engineering',
  'KANES',
  '陈哲'
]

const requiredSongs = [
  '防沉迷系统',
  '触碰不到的你',
  '尘埃',
  '卸妆',
  '千禧',
  '夏夜入梦前'
]

const findings = []

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8')
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath))
}

for (const filePath of requiredFiles) {
  if (!exists(filePath)) {
    findings.push(`Missing required file: ${filePath}`)
  }
}

if (exists('.gitignore')) {
  const gitignore = read('.gitignore')
  if (!gitignore.includes('.codex-local/')) {
    findings.push('Missing .codex-local/ in .gitignore')
  }
} else {
  findings.push('Missing .gitignore')
}

try {
  execFileSync('git', ['check-ignore', '.codex-local/memory/portfolio-maintenance-sprint.md'], {
    cwd: root,
    stdio: 'pipe'
  })
} catch {
  findings.push('.codex-local files are not ignored by Git')
}

if (exists('projects/yujiayun-45ping-visual-2025.md')) {
  const projectDoc = read('projects/yujiayun-45ping-visual-2025.md')
  for (const section of requiredProjectSections) {
    if (!projectDoc.includes(section)) {
      findings.push(`45m2 project doc missing section: ${section}`)
    }
  }
  for (const song of requiredSongs) {
    if (!projectDoc.includes(song)) {
      findings.push(`45m2 project doc missing song: ${song}`)
    }
  }
}

if (exists('react/src/pages/YuJiayun45m2.jsx')) {
  const page = read('react/src/pages/YuJiayun45m2.jsx')
  for (const text of requiredPageText) {
    if (!page.includes(text)) {
      findings.push(`45m2 page missing required text: ${text}`)
    }
  }

  const imageMatches = [...page.matchAll(/['"]\/portfolio\/assets\/([^'"]+)['"]/g)]
  if (imageMatches.length < 20) {
    findings.push(`45m2 page references too few local images: ${imageMatches.length}`)
  }
  for (const match of imageMatches) {
    const assetPath = path.join('assets', match[1])
    if (!exists(assetPath)) {
      findings.push(`45m2 page references missing asset: ${assetPath.replaceAll(path.sep, '/')}`)
    }
  }
}

if (exists('content/works/yujiayun-45ping-visual-2025.json')) {
  const work = JSON.parse(read('content/works/yujiayun-45ping-visual-2025.json'))
  if (!work.image?.includes('/portfolio/assets/yujiayun-45ping/')) {
    findings.push('45m2 content entry image does not use portfolio 45m2 asset path')
  }
  if (!work.sourceDocs?.includes('projects/yujiayun-45ping-visual-2025.md')) {
    findings.push('45m2 content entry missing project document source')
  }
}

if (findings.length) {
  console.error('Portfolio OS audit failed:')
  findings.forEach((finding) => console.error(`- ${finding}`))
  process.exit(1)
}

console.log('Portfolio OS audit passed.')
