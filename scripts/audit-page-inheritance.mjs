import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()

const audits = {
  'kashiwa-titan': {
    page: 'react/src/pages/KashiwaTitan.jsx',
    sources: [
      'projects/kashiwa-titan-visual-2025.md',
      'visual-arts/kashiwa-daisuke/Shenzhen-BO-LIVE-2025-TITAN/README.md'
    ],
    groups: {
      identity: [
        '机械光合：TITAN 的全息声林',
        'KASHIWA Daisuke',
        '柏大辅',
        'Yuki Murata',
        '村田有希',
        'BO LIVE',
        '2025.10.21'
      ],
      roleAndScope: [
        '视觉制作',
        '全息纱幕',
        '裸眼 3D',
        '雾气',
        '音画互动',
        '折角纱幕',
        '冰屏',
        '混合渲染策略'
      ],
      credits: [
        '张秋童 Vickie',
        '欧阳毅',
        '雪山',
        '宽敬',
        '王以玮',
        '天赐',
        '韩俊谦'
      ],
      trackGenes: [
        '01 Lead',
        '02 Green',
        '03 Haze',
        '04 Infrared',
        '05 Whitenight',
        '06 Amb',
        '07 Rose',
        '08 Titan',
        '09 Phantom',
        '10 Aurora',
        '空间压力、深度错觉与声音建筑'
      ],
      publicLinks: [
        'https://mp.weixin.qq.com/s/yNjtixkMIF5zXrl03DyU1g',
        'https://mp.weixin.qq.com/s/Y5K6bm4jVqjb5uQn0KDJ9A',
        'https://www.manamana.net/video/detail?id=2831761#!zh',
        'https://www.manamana.net/video/detail?id=2831892#!zh'
      ]
    }
  }
}

const target = process.argv[2] || 'kashiwa-titan'
const config = audits[target]

if (!config) {
  console.error(`Unknown inheritance audit target: ${target}`)
  console.error(`Known targets: ${Object.keys(audits).join(', ')}`)
  process.exit(2)
}

function read(relativePath) {
  const fullPath = path.join(root, relativePath)
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing file: ${relativePath}`)
  }
  return fs.readFileSync(fullPath, 'utf8')
}

const pageText = read(config.page)
const sourceText = config.sources.map(read).join('\n')
const failures = []

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[./]/g, '/')
}

function containsText(haystack, needle) {
  return normalize(haystack).includes(normalize(needle))
}

for (const sourcePath of config.sources) {
  const fullPath = path.join(root, sourcePath)
  if (!fs.existsSync(fullPath)) {
    failures.push(`source file missing: ${sourcePath}`)
  }
}

for (const [group, tokens] of Object.entries(config.groups)) {
  for (const token of tokens) {
    if (!containsText(sourceText, token)) {
      failures.push(`${group}: token not found in source docs: ${token}`)
      continue
    }
    if (!containsText(pageText, token)) {
      failures.push(`${group}: token missing from page: ${token}`)
    }
  }
}

if (failures.length) {
  console.error(`Inheritance audit failed for ${target}`)
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log(`Inheritance audit passed for ${target}`)
