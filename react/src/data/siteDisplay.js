const imagePathOverrides = {
  '/assets/home/featured-dropflow-main.jpg': '/assets/home/featured-dropflow-hangzhou-biennale-scene.jpg',
  '/assets/home/featured-kashiwa-bolive-shenzhen.jpeg': '/assets/home/featured-kashiwa-bolive-shenzhen-2.jpeg',
  '/assets/home/featured-perceptual-environments.jpg': '/assets/home/archive-observation-clean.jpg',
  '/assets/public-nodes/observation-symbiosis.jpg': '/assets/home/archive-observation-clean.jpg',
  '/assets/home/featured-timer-main.jpg': '/assets/home/archive-timer-clean.jpg',
  '/assets/home/featured-timer-visionpro.jpg': '/assets/home/archive-timer-clean.jpg'
}

const imageIdOverrides = {
  'babel-bottle': '/assets/home/archive-observation-clean.jpg',
  'can-festival': '/assets/public-nodes/can-festival.jpg',
  'drop-flow': '/assets/home/featured-dropflow-hangzhou-biennale-scene.jpg',
  'drop-flow-hangzhou-biennale': '/assets/public-nodes/dropflow-hangzhou.jpg',
  'kashiwa': '/assets/home/featured-kashiwa-bolive-shenzhen-2.jpeg',
  'kashiwa-bo-live-shenzhen': '/assets/home/featured-kashiwa-bolive-shenzhen-2.jpeg',
  'mke-terminal': '/assets/mke-terminal/pdf-p02-01.jpg',
  'observation-and-symbiosis': '/assets/home/archive-observation-clean.jpg',
  'observe-symbiosis-pingshan': '/assets/home/archive-observation-clean.jpg',
  'timer': '/assets/home/archive-timer-clean.jpg',
  'timer-series-visual-2024': '/assets/home/archive-timer-clean.jpg',
  'ufo-terminal': '/assets/public-nodes/ufo-terminal.jpg'
}

const practiceLineOrder = [
  'spatial-generation',
  'collaborative-performance',
  'temporal-structure',
  'perceptual-environments'
]

export const homeNodeIds = [
  'drop-flow-hangzhou-biennale',
  'kashiwa-bo-live-shenzhen',
  'can-festival',
  'babel-bottle',
  'observation-and-symbiosis',
  'ufo-terminal'
]

export const nodeLinks = {
  'babel-bottle': '/archive',
  'can-festival': '/works/kashiwa.html',
  'drop-flow-hangzhou-biennale': '/works/drop-flow.html',
  'observation-and-symbiosis': '/archive',
  'ufo-terminal': '/works/drop-flow.html'
}

export function getDisplayImage(item) {
  if (!item) {
    return '/assets/public-nodes/ufo-terminal.jpg'
  }

  return imageIdOverrides[item.id] || imagePathOverrides[item.image] || item.image || '/assets/public-nodes/ufo-terminal.jpg'
}

export function getWorkTargetUrl(work) {
  const detailLink = work.links?.find((link) => link.url?.includes('/works/') || link.url?.startsWith('./works/'))
  const rawUrl = detailLink?.url || work.repoLink

  if (!rawUrl) {
    return '/archive'
  }

  return rawUrl.startsWith('./') ? `/${rawUrl.replace(/^\.\//, '')}` : rawUrl
}

export function getNodeTargetUrl(node) {
  return node.externalLink || nodeLinks[node.id] || '/archive'
}

export function sortWorksForArchive(items) {
  return [...items].sort((a, b) => {
    const homeDelta = Number(b.showOnHome) - Number(a.showOnHome)

    if (homeDelta !== 0) {
      return homeDelta
    }

    const aPracticeRank = practiceLineOrder.includes(a.practiceLine) ? practiceLineOrder.indexOf(a.practiceLine) : 999
    const bPracticeRank = practiceLineOrder.includes(b.practiceLine) ? practiceLineOrder.indexOf(b.practiceLine) : 999
    const practiceDelta = aPracticeRank - bPracticeRank

    if (practiceDelta !== 0) {
      return practiceDelta
    }

    const priorityDelta = (a.priority ?? 999) - (b.priority ?? 999)

    if (priorityDelta !== 0) {
      return priorityDelta
    }

    return a.title.localeCompare(b.title)
  })
}

export function sortNodesForArchive(items) {
  const rankMap = new Map(homeNodeIds.map((id, index) => [id, index]))

  return [...items].sort((a, b) => {
    const rankDelta = (rankMap.get(a.id) ?? 999) - (rankMap.get(b.id) ?? 999)

    if (rankDelta !== 0) {
      return rankDelta
    }

    return a.title.localeCompare(b.title)
  })
}
