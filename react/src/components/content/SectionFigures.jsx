import React from 'react'

export default function SectionFigures({ figures = [] }) {
  if (!figures.length) return null
  return (
    <div className="article-section-figures" aria-label="本章节配图">
      {figures.map((figure, index) => (
        <figure key={figure.repoPath || figure.src || index} className="article-section-figure">
          <img src={figure.src} alt={figure.alt} loading="lazy" decoding="async" />
          <figcaption>
            {figure.label ? <strong>{figure.label} / </strong> : null}
            <span>{figure.caption}</span>
            {figure.credit ? <small>{figure.credit}</small> : null}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
