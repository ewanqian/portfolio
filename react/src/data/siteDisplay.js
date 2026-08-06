const imagePathOverrides = {
  '/portfolio/assets/home/featured-dropflow-main.webp': '/portfolio/assets/home/featured-dropflow-hangzhou-biennale-scene.webp',
  '/portfolio/assets/home/featured-perceptual-environments.webp': '/portfolio/assets/raw-library/observation-symbiosis-large.webp',
  '/portfolio/assets/home/featured-timer-main.webp': '/portfolio/assets/raw-library/timer-red-spatial-preview.webp',
  '/portfolio/assets/home/featured-timer-visionpro.webp': '/portfolio/assets/home/archive-timer-clean.webp'
}

const imageIdOverrides = {
  'ar-shenzhen-resort-2022': '/portfolio/assets/web-candidates/ar-shenzhen-info-resort-sohu.webp',
  'babel-bottle': '/portfolio/assets/raw-library/event-2025-babel-bottle-new-media-artist-simulator-exhibition.webp',
  'can-festival': '/portfolio/assets/public-nodes/can-festival.webp',
  'drop-flow': '/portfolio/assets/raw-picks/dropflow-concept-250426.webp',
  'drop-flow-hangzhou-biennale': '/portfolio/assets/public-nodes/dropflow-hangzhou.webp',
  'drop-flow-ufo-2025': '/portfolio/assets/raw-library/ufo-terminal-drop-flow-creation-camp.webp',
  'derive-dual-city-2024': '/portfolio/assets/raw-library/derive-dual-city-poster.webp',
  'digital-garden-visual-2025': '/portfolio/assets/digital-garden/digital-garden-xian-mixc-01.webp',
  'glance-thousand-install-2023': '/portfolio/assets/raw-library/glance-thousand-anchang-bridge-projection.webp',
  'hallu-resonance-live-2024': '/portfolio/assets/raw-library/ewan-event-phantom-resonance.webp',
  'kashiwa': '/portfolio/assets/raw-picks/titan-bolive-clean-16x9.webp',
  'kashiwa-band-visual-2025': '/portfolio/assets/raw-library/event-2025-can-festival-zhoushan-01.webp',
  'kashiwa-bo-live-shenzhen': '/portfolio/assets/raw-picks/titan-bolive-clean-16x9.webp',
  'lonely-av-live-2023': '/portfolio/assets/raw-library/event-2023-10-lonely-audiovisual-shanghai-broadcast-02.webp',
  'mke-terminal': '/portfolio/assets/mke-terminal/pdf-p02-01.webp',
  'new-media-artist-simulator-2025': '/portfolio/assets/raw-library/project-new-media-artist-simulator-main.webp',
  'ether-fragment-exhibit-2023': '/portfolio/assets/web-candidates/ether-fragment-sohu.webp',
  'observation-and-symbiosis': '/portfolio/assets/raw-library/observation-symbiosis-large.webp',
  'observe-symbiosis-pingshan': '/portfolio/assets/raw-library/observation-symbiosis-large.webp',
  'observe-symbiosis-exhibit-2025': '/portfolio/assets/raw-library/observation-symbiosis-large.webp',
  'observe-symbiosis-workshop-2026': '/portfolio/assets/raw-library/observation-symbiosis-large.webp',
  'rain-singapore-visual-2026': '/portfolio/assets/rain-singapore/gallery/its-raining-wide-05.webp',
  'sre-realtime-liveset-2026': '/portfolio/assets/sre-realtime-liveset/sre-benchmark-all-visible.webp',
  'shanhaifusheng2-visual-2025': '/portfolio/assets/raw-library/floating-life-ii-performance.webp',
  'timer': '/portfolio/assets/raw-library/timer-red-spatial-preview.webp',
  'timer-loading-access-2-2024': '/portfolio/assets/raw-library/timer-red-spatial-preview.webp',
  'timer-series-visual-2024': '/portfolio/assets/raw-library/timer-red-spatial-preview.webp',
  'vrplay-hackathon-visual-2025': '/portfolio/assets/raw-picks/vrplay-keynote-16x9.webp',
  'yujiayun-45ping-visual-2025': '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-46s-orange-arc.webp',
  'ufo-terminal': '/portfolio/assets/raw-library/ufo-terminal-drop-flow-creation-camp.webp'
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
  'babel-bottle': '#/archive',
  'can-festival': '/works/kashiwa.html',
  'drop-flow-hangzhou-biennale': '/works/drop-flow.html',
  'observation-and-symbiosis': '#/archive',
  'ufo-terminal': '/works/drop-flow.html'
}

const projectRouteByWorkId = {
  kashiwa: '#/projects/kashiwa-titan',
  'kashiwa-bo-live-shenzhen': '#/projects/kashiwa-titan',
  'yujiayun-45ping-visual-2025': '#/projects/yujiayun-45m2',
  'rain-singapore-visual-2026': '#/projects/rain-singapore',
  'digital-garden-visual-2025': '#/projects/digital-garden'
}

export function getDisplayImage(item) {
  if (!item) {
    return '/portfolio/assets/public-nodes/ufo-terminal.webp'
  }

  return imageIdOverrides[item.id] || imagePathOverrides[item.image] || item.image || '/portfolio/assets/public-nodes/ufo-terminal.webp'
}

export function getWorkTargetUrl(work) {
  if (projectRouteByWorkId[work?.id]) {
    return projectRouteByWorkId[work.id]
  }

  const detailLink = work.links?.find((link) => link.url?.includes('/works/') || link.url?.startsWith('./works/'))
  const rawUrl = detailLink?.url || work.repoLink

  if (!rawUrl) {
    return '/archive'
  }

  return rawUrl.startsWith('./') ? `/portfolio/${rawUrl.replace(/^\.\//, '')}` : rawUrl
}

export function getNodeTargetUrl(node) {
  return node.externalLink || nodeLinks[node.id] || '#/archive'
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
