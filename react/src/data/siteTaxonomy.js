export const homeGalleryWorkIds = [
  'timer',
  'drop-flow',
  'kashiwa',
  'mke-terminal',
  'digital-garden-visual-2025',
  'sre-realtime-liveset-2026'
]

export const galleryWorkIds = [
  'drop-flow',
  'kashiwa',
  'timer',
  'mke-terminal',
  'sre-realtime-liveset-2026'
]

export const productionWorkIds = [
  'xtep-xdna22aw-visual-2022',
  'zcool-hp-live-2021',
  'kashiwa',
  'kashiwa-band-visual-2025',
  'yujiayun-45ping-visual-2025',
  'rain-singapore-visual-2026',
  'vrplay-hackathon-visual-2025',
  'shanhaifusheng2-visual-2025',
  'digital-garden-visual-2025',
  'ar-shenzhen-resort-2022',
  'hallu-resonance-live-2024',
  'glance-thousand-install-2023',
  'sre-realtime-liveset-2026'
]

export function pickWorksByIds(works, ids) {
  const byId = new Map(works.map((work) => [work.id, work]))
  return ids.map((id) => byId.get(id)).filter(Boolean)
}
