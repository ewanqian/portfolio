import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const here = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(here, '..')
const contentDir = path.join(repoRoot, 'content')
const outputDir = path.join(repoRoot, 'react', 'src', 'data', 'generated')

fs.mkdirSync(outputDir, { recursive: true })

function readJsonFiles(dir) {
  if (!fs.existsSync(dir)) return []

  return fs.readdirSync(dir)
    .filter((file) => file.endsWith('.json'))
    .sort()
    .map((file) => {
      const filePath = path.join(dir, file)
      try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'))
      } catch (error) {
        throw new Error(`Error parsing ${filePath}: ${error.message}`)
      }
    })
}

function writeGenerated(name, data) {
  fs.writeFileSync(
    path.join(outputDir, `${name}.js`),
    `export default ${JSON.stringify(data, null, 2)}\n`
  )
}

function resolveRepositoryDocument(documentPath, label) {
  const absolutePath = path.resolve(repoRoot, documentPath)
  const relativePath = path.relative(repoRoot, absolutePath)

  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    throw new Error(`${label} escapes repository root: ${documentPath}`)
  }

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`${label} not found: ${documentPath}`)
  }

  return fs.readFileSync(absolutePath, 'utf8')
}

function attachWorkshopReadme(workshop) {
  if (!workshop.readmePath) return workshop

  return {
    ...workshop,
    readmeMarkdown: resolveRepositoryDocument(workshop.readmePath, 'Workshop README')
  }
}

function attachWritingArticle(writing) {
  if (!writing.articlePath) return writing

  return {
    ...writing,
    articleMarkdown: resolveRepositoryDocument(writing.articlePath, 'Writing article')
  }
}

const works = readJsonFiles(path.join(contentDir, 'works'))
const nodes = readJsonFiles(path.join(contentDir, 'nodes'))
const assets = readJsonFiles(path.join(contentDir, 'assets'))
const writings = readJsonFiles(path.join(contentDir, 'writings'))
  .map(attachWritingArticle)
const relations = readJsonFiles(path.join(contentDir, 'relations'))
const workshops = readJsonFiles(path.join(contentDir, 'workshops'))
  .map(attachWorkshopReadme)
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))

writeGenerated('works', works)
writeGenerated('nodes', nodes)
writeGenerated('assets', assets)
writeGenerated('writings', writings)
writeGenerated('relations', relations)
writeGenerated('workshops', workshops)

const creativeNetworkData = [
  {
    id: 'portfolio',
    title: 'portfolio',
    description: '个人入口，集中呈现作品、项目履历、实践主线与对外展示。',
    url: 'https://github.com/ewanqian/portfolio',
    type: 'public'
  },
  {
    id: 'virtura-collective',
    title: 'VIRTURA-Collective',
    description: '团队入口，用于说明个人实践与团队协作如何在同一网络中并行展开。',
    url: 'https://github.com/ewanqian/VIRTURA-Collective',
    type: 'public'
  },
  {
    id: 'virtura-spaceport',
    title: 'VIRTURA-SpacePort',
    description: '公共前厅，承载档案、知识网络、stations 与公共活动入口。',
    url: 'https://github.com/ewanqian/VIRTURA-SpacePort',
    type: 'public'
  },
  {
    id: 'virtura-newsroom',
    title: 'VIRTURA-Newsroom',
    description: '发布与评论层，负责文章、复盘、批评与方法整理。',
    url: 'https://github.com/ewanqian/VIRTURA-Newsroom',
    type: 'public'
  },
  {
    id: 'sceneforge',
    title: 'SceneForge / RepoForge',
    description: '工具与治理层，延伸到数字舞台、查看器、预演与 workflow 系统。',
    url: 'https://github.com/ewanqian/SceneForge',
    type: 'public'
  },
  {
    id: 'workforge',
    title: 'Forge / workforge（私有）',
    description: '隐藏支撑层，用于维护 skills、自动化与内部判断逻辑，不直接面向公众，但支撑整套公开网络的持续运行。',
    url: '#',
    type: 'private'
  }
]

writeGenerated('network', creativeNetworkData)

const networkGraphData = {
  nodes: [
    ...works.map((work) => ({ id: work.id, label: work.title, type: 'work' })),
    ...nodes.map((node) => ({ id: node.id, label: node.title, type: 'node' }))
  ],
  links: []
}

works.forEach((work) => {
  work.relatedNodes?.forEach((nodeId) => {
    networkGraphData.links.push({ source: work.id, target: nodeId })
  })
})

nodes.forEach((node) => {
  if (node.relatedWork) {
    networkGraphData.links.push({ source: node.id, target: node.relatedWork })
  }
})

writeGenerated('networkGraph', networkGraphData)

const timelineData = [...nodes]
  .sort((a, b) => parseInt(b.year, 10) - parseInt(a.year, 10))
  .map((node) => ({
    id: node.id,
    title: node.title,
    year: node.year,
    category: node.category,
    summary: node.summary
  }))

writeGenerated('timeline', timelineData)

const imageWallData = assets
  .filter((asset) => asset.featured)
  .map((asset) => ({
    id: asset.id,
    src: asset.filename,
    caption: asset.caption,
    year: asset.year,
    relatedWork: asset.relatedWork
  }))

writeGenerated('imageWall', imageWallData)

console.log(`Content build completed: ${works.length} works, ${nodes.length} nodes, ${workshops.length} workshop series.`)
