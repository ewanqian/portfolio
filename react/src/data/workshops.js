import generatedWorkshops from './generated/workshops'

export const workshopSeries = generatedWorkshops

const workshopAliases = {
  'tools-for-one': 'gamified-ai-new-media-art-engineer'
}

export function getWorkshopSeries(slug) {
  const canonicalSlug = workshopAliases[slug] || slug
  return workshopSeries.find((series) => series.slug === canonicalSlug)
}
