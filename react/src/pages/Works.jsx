import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import works from '../data/generated/works'
import { getDisplayImage, getWorkTargetUrl, sortWorksForArchive } from '../data/siteDisplay'
import { galleryWorkIds } from '../data/siteTaxonomy'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { localizeWork } from '../i18n/content.js'

const pageCopy = {
  zh: {
    title: '作品画廊',
    intro: '作品画廊只保留代表性的艺术项目与公开呈现，用于建立对实践方向、现场质量和视觉语言的第一层判断。',
    open: '查看',
    featured: '代表作品'
  },
  en: {
    title: 'Gallery',
    intro: 'Gallery keeps selected artworks and public presentations as the first layer of the practice, focused on artistic direction, public quality, and visual language.',
    open: 'Open',
    featured: 'Selected Artworks'
  }
}

function resolveTarget(work) {
  const target = getWorkTargetUrl(work)

  if (!target || target === '/archive') {
    return ''
  }

  return target
}

function WorkCard({ work, language, ctaLabel }) {
  const localizedWork = localizeWork(work, language)
  const target = resolveTarget(work)
  const Wrapper = target ? 'a' : 'article'
  const wrapperProps = target ? { href: target } : {}

  return (
    <Wrapper className="works-rail-card" {...wrapperProps}>
      <span className="works-rail-thumb">
        <img src={getDisplayImage(work)} alt={localizedWork.title} loading="lazy" />
      </span>
      <span className="works-rail-copy">
        <span className="works-rail-meta">{localizedWork.years} · {localizedWork.subtitle}</span>
        <strong>{localizedWork.title}</strong>
        <span>{localizedWork.summary}</span>
        {target ? <em>{ctaLabel}</em> : null}
      </span>
    </Wrapper>
  )
}

function WorksSection({ title, items, language, ctaLabel }) {
  if (!items.length) {
    return null
  }

  return (
    <section className="section works-rail-section">
      <div className="container">
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="works-rail-wrap">
        <div className="works-rail">
          {items.map((work) => (
            <WorkCard key={work.id} work={work} language={language} ctaLabel={ctaLabel} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Works() {
  const { language } = useLanguage()
  const copy = pageCopy[language]
  const orderedWorks = sortWorksForArchive(works)
  const galleryIdSet = new Set(galleryWorkIds)
  const featuredWorks = orderedWorks.filter((work) => galleryIdSet.has(work.id))

  return (
    <>
      <Header />
      <main className="page-works">
        <section className="section works-simple-hero">
          <div className="container">
            <h1 className="section-title">{copy.title}</h1>
            <p className="section-intro">{copy.intro}</p>
          </div>
        </section>

        <WorksSection title={copy.featured} items={featuredWorks} language={language} ctaLabel={copy.open} />
      </main>
      <Footer />
    </>
  )
}

export default Works
