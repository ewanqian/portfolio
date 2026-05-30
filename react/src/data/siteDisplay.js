const imagePathOverrides = {
  '/portfolio/assets/home/featured-dropflow-main.jpg': '/portfolio/assets/home/featured-dropflow-hangzhou-biennale-scene.jpg',
  '/portfolio/assets/home/featured-perceptual-environments.jpg': '/portfolio/assets/raw-library/observation-symbiosis-large.png',
  '/portfolio/assets/home/featured-timer-main.jpg': '/portfolio/assets/raw-library/timer-red-spatial-preview.png',
  '/portfolio/assets/home/featured-timer-visionpro.jpg': '/portfolio/assets/home/archive-timer-clean.jpg'
}

const imageIdOverrides = {
  'ar-shenzhen-resort-2022': '/portfolio/assets/web-candidates/ar-shenzhen-info-resort-sohu.png',
  'babel-bottle': '/portfolio/assets/raw-library/event-2025-babel-bottle-new-media-artist-simulator-exhibition.jpg',
  'can-festival': '/portfolio/assets/public-nodes/can-festival.jpg',
  'drop-flow': '/portfolio/assets/raw-picks/dropflow-concept-250426.jpg',
  'drop-flow-hangzhou-biennale': '/portfolio/assets/public-nodes/dropflow-hangzhou.jpg',
  'drop-flow-ufo-2025': '/portfolio/assets/raw-library/ufo-terminal-drop-flow-creation-camp.jpg',
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
  'observation-and-symbiosis': '/portfolio/assets/raw-library/observation-symbiosis-large.png',
  'observe-symbiosis-pingshan': '/portfolio/assets/raw-library/observation-symbiosis-large.png',
  'observe-symbiosis-exhibit-2025': '/portfolio/assets/raw-library/observation-symbiosis-large.png',
  'observe-symbiosis-workshop-2026': '/portfolio/assets/raw-library/observation-symbiosis-large.png',
  'rain-singapore-visual-2026': '/portfolio/assets/rain-singapore/rain-singapore-cover.jpg',
  'sre-realtime-liveset-2026': '/portfolio/assets/sre-realtime-liveset/sre-benchmark-all-visible.png',
  'shanhaifusheng2-visual-2025': '/portfolio/assets/raw-library/floating-life-ii-performance.jpg',
  'timer': '/portfolio/assets/raw-library/timer-red-spatial-preview.png',
  'timer-loading-access-2-2024': '/portfolio/assets/raw-library/timer-red-spatial-preview.png',
  'timer-series-visual-2024': '/portfolio/assets/raw-library/timer-red-spatial-preview.png',
  'vrplay-hackathon-visual-2025': '/portfolio/assets/raw-picks/vrplay-keynote-16x9.jpg',
  'yujiayun-45ping-visual-2025': '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-46s-orange-arc.jpg',
  'ufo-terminal': '/portfolio/assets/raw-library/ufo-terminal-drop-flow-creation-camp.jpg'
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
    return '/portfolio/assets/public-nodes/ufo-terminal.jpg'
  }

  return imageIdOverrides[item.id] || imagePathOverrides[item.image] || item.image || '/portfolio/assets/public-nodes/ufo-terminal.jpg'
}

export function getWorkTargetUrl(work) {
  if (work?.id === 'kashiwa' || work?.id === 'kashiwa-bo-live-shenzhen') {
    return '/portfolio/projects/kashiwa-titan'
  }

  if (work?.id === 'yujiayun-45ping-visual-2025') {
    return '/portfolio/projects/yujiayun-45m2'
  }

  if (work?.id === 'rain-singapore-visual-2026') {
    return '/portfolio/projects/rain-singapore'
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
