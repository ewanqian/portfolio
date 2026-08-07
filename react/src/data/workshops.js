import generatedWorkshops from './generated/workshops'

export const workshopSeries = generatedWorkshops

export function getWorkshopSeries(slug) {
  return workshopSeries.find((series) => series.slug === slug)
}
