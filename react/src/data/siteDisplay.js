const imagePathOverrides = {
  '/portfolio/assets/public-optimized/dropflow-main-1600.webp': '/portfolio/assets/home/hero-dropflow-ufo-2025.jpeg',
  '/portfolio/assets/public-optimized/perceptual-environments-1600.webp': '/portfolio/assets/public-optimized/observation-symbiosis-1600.webp',
  '/portfolio/assets/case-optimized/timer-red-spatial-1400.webp': '/portfolio/assets/case-optimized/timer-red-spatial-1400.webp',
  '/portfolio/assets/home/featured-timer-visionpro.jpg': '/portfolio/assets/home/archive-timer-clean.jpg'
}

const imageIdOverrides = {
  'ar-shenzhen-resort-2022': '/portfolio/assets/web-candidates/ar-shenzhen-info-resort-sohu.png',
  'babel-bottle': '/portfolio/assets/raw-library/event-2025-babel-bottle-new-media-artist-simulator-exhibition.jpg',
  'can-festival': '/portfolio/assets/public-nodes/can-festival.jpg',
  'drop-flow': '/portfolio/assets/home/hero-dropflow-ufo-2025.jpeg',
  'drop-flow-hangzhou-biennale': '/portfolio/assets/public-nodes/dropflow-hangzhou.jpg',
  'drop-flow-ufo-2025': '/portfolio/assets/public-optimized/ufo-terminal-drop-flow-1600.webp',
  'derive-dual-city-2024': '/portfolio/assets/raw-library/derive-dual-city-poster.png',
  'glance-thousand-install-2023': '/portfolio/assets/raw-library/glance-thousand-anchang-bridge-projection.jpg',
  'hallu-resonance-live-2024': '/portfolio/assets/raw-library/ewan-event-phantom-resonance.jpg',
  'kashiwa': '/portfolio/assets/raw-picks/titan-bolive-clean-16x9.jpg',
  'kashiwa-band-visual-2025': '/portfolio/assets/raw-library/event-2025-can-festival-zhoushan-01.jpeg',
  'kashiwa-bo-live-shenzhen': '/portfolio/assets/raw-picks/titan-bolive-clean-16x9.jpg',
  'lonely-av-live-2023': '/portfolio/assets/raw-library/event-2023-10-lonely-audiovisual-shanghai-broadcast-02.jpg',
  'mke-terminal': '/portfolio/assets/mke-terminal/pdf-p02-01.jpg',
  'new-media-artist-simulator-2025': '/portfolio/assets/raw-library/project-new-media-artist-simulator-main.jpg',
  'ether-fragment-exhibit-2023': '/portfolio/assets/web-candidates/ether-fragment-sohu.png',
  'observation-and-symbiosis': '/portfolio/assets/public-optimized/observation-symbiosis-1600.webp',
  'observe-symbiosis-pingshan': '/portfolio/assets/public-optimized/observation-symbiosis-1600.webp',
  'observe-symbiosis-exhibit-2025': '/portfolio/assets/public-optimized/observation-symbiosis-1600.webp',
  'observe-symbiosis-workshop-2026': '/portfolio/assets/public-optimized/observation-symbiosis-1600.webp',
  'rain-singapore-visual-2026': '/portfolio/assets/rain-singapore/rain-singapore-cover.jpg',
  'sre-realtime-liveset-2026': '/portfolio/assets/sre-realtime-liveset/sre-benchmark-all-visible.png',
  'shanhaifusheng2-visual-2025': '/portfolio/assets/public-optimized/floating-life-ii-1600.webp',
  'timer': '/portfolio/assets/case-optimized/timer-red-spatial-1400.webp',
  'timer-loading-access-2-2024': '/portfolio/assets/case-optimized/timer-red-spatial-1400.webp',
  'timer-series-visual-2024': '/portfolio/assets/case-optimized/timer-red-spatial-1400.webp',
  'vrplay-hackathon-visual-2025': '/portfolio/assets/raw-picks/vrplay-keynote-16x9.jpg',
  'yujiayun-45ping-visual-2025': '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-46s-orange-arc.jpg',
  'ufo-terminal': '/portfolio/assets/public-optimized/ufo-terminal-drop-flow-1600.webp'
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
  'can-festival': '/portfolio/#/projects/kashiwa-titan',
  'drop-flow-hangzhou-biennale': '/portfolio/#/projects/drop-flow',
  'observation-and-symbiosis': '/archive',
  'ufo-terminal': '/portfolio/#/projects/drop-flow'
}

export function getDisplayImage(item) {
  if (!item) {
    return '/portfolio/assets/public-optimized/ufo-terminal-node-1600.webp'
  }

  const image = imageIdOverrides[item.id] || imagePathOverrides[item.image] || item.image || '/portfolio/assets/public-optimized/ufo-terminal-node-1600.webp'

  if (image.startsWith('/portfolio/assets/')) {
    return image
  }

  if (image.startsWith('/assets/')) {
    return `/portfolio${image}`
  }

  if (image.startsWith('assets/')) {
    return `/portfolio/${image}`
  }

  return image
}

export function getWorkTargetUrl(work) {
  if (work?.id === 'drop-flow' || work?.id === 'drop-flow-visual-2025' || work?.id === 'drop-flow-ufo-2025') {
    return '/portfolio/#/projects/drop-flow'
  }

  if (work?.id === 'timer' || work?.id === 'timer-series-visual-2024' || work?.id === 'timer-loading-access-2-2024') {
    return '/portfolio/#/projects/timer'
  }

  if (work?.id === 'kashiwa' || work?.id === 'kashiwa-bo-live-shenzhen') {
    return '/portfolio/#/projects/kashiwa-titan'
  }

  if (work?.id === 'yujiayun-45ping-visual-2025') {
    return '/portfolio/#/projects/yujiayun-45m2'
  }

  if (work?.id === 'rain-singapore-visual-2026') {
    return '/portfolio/#/projects/rain-singapore'
  }

  const detailLink = work.links?.find((link) => link.url?.includes('/works/') || link.url?.startsWith('./works/'))
  const rawUrl = detailLink?.url || work.repoLink

  if (!rawUrl) {
    return '/archive'
  }

  return rawUrl.startsWith('./') ? `/portfolio/${rawUrl.replace(/^\.\//, '')}` : rawUrl
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
