import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import works from '../data/generated/works'
import { getDisplayImage, getWorkTargetUrl, sortWorksForArchive } from '../data/siteDisplay'
import { galleryWorkIds, productionWorkIds, pickWorksByIds } from '../data/siteTaxonomy'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { localizeWork } from '../i18n/content.js'

const pageCopy = {
  zh: {
    eyebrow: 'Gallery',
    title: '画廊 / Gallery',
    intro: '这里保留艺术作品、现场音画项目与空间影像研究。制作项目和完整时间线分别进入 Production 与 Archive。',
    open: '查看',
    featured: '精选作品',
    index: '作品接触表',
    indexIntro: '用更接近胶片接触印相的方式浏览作品：缩略图、年份、方向、角色和入口保持在同一行。',
    productionLink: '制作项目',
    archiveLink: '完整归档',
    labels: {
      personal_work: '个人作品',
      team_work: '团队作品',
      external_collaboration: '外部合作',
      collaboration: '合作作品',
      service_work: '项目制作'
    }
  },
  en: {
    eyebrow: 'Gallery',
    title: 'Gallery',
    intro: 'Selected artworks, live audiovisual projects, and spatial-image research. Production records and the full timeline sit in Production and Archive.',
    open: 'Open',
    featured: 'Selected Works',
    index: 'Contact Sheet Index',
    indexIntro: 'A compact contact-sheet view for works: image, year, direction, role, and entry point stay on one line.',
    productionLink: 'Production',
    archiveLink: 'Full Archive',
    labels: {
      personal_work: 'Personal Work',
      team_work: 'Team Work',
      external_collaboration: 'External Collaboration',
      collaboration: 'Collaboration',
      service_work: 'Production Work'
    }
  }
}

const authorshipById = {
  'drop-flow': 'team_work',
  'drop-flow-visual-2025': 'team_work',
  'drop-flow-ufo-2025': 'team_work',
  'timer-series-visual-2024': 'team_work',
  'kashiwa-titan-visual-2025': 'external_collaboration',
  'kashiwa-band-visual-2025': 'external_collaboration',
  'observe-symbiosis-exhibit-2025': 'collaboration',
  'observe-symbiosis-workshop-2026': 'collaboration'
}

function resolveAuthorshipType(work) {
  if (authorshipById[work.id]) {
    return authorshipById[work.id]
  }

  if (work.type === 'stage-visual') {
    return 'service_work'
  }

  if (work.practiceLine === 'collaborative-performance') {
    return 'collaboration'
  }

  return 'personal_work'
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
  const label = pageCopy[language].labels[resolveAuthorshipType(work)]
  const Wrapper = target ? 'a' : 'article'
  const wrapperProps = target ? { href: target } : {}

  return (
    <Wrapper className="works-rail-card" {...wrapperProps}>
      <span className="works-rail-thumb">
        <img src={getDisplayImage(work)} alt={localizedWork.title} loading="lazy" />
      </span>
      <span className="works-rail-copy">
        <span className="works-rail-label">{label}</span>
        <span className="works-rail-meta">{localizedWork.years} · {localizedWork.subtitle}</span>
        <strong>{localizedWork.title}</strong>
        <span>{localizedWork.summary}</span>
        {target ? <em>{ctaLabel}</em> : null}
      </span>
    </Wrapper>
  )
}

function FeaturedWorksSection({ title, items, language, ctaLabel }) {
  if (!items.length) {
    return null
  }

  return (
    <section className="section works-feature-section">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <div className="works-feature-grid">
          {items.map((work) => (
            <WorkCard key={work.id} work={work} language={language} ctaLabel={ctaLabel} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSheetRow({ work, language, ctaLabel }) {
  const localizedWork = localizeWork(work, language)
  const target = resolveTarget(work)
  const label = pageCopy[language].labels[resolveAuthorshipType(work)]

  return (
    <article className="contact-sheet-row">
      <a href={target || '#'} className={`contact-sheet-thumb ${target ? '' : 'disabled'}`.trim()} aria-label={localizedWork.title}>
        <img src={getDisplayImage(work)} alt="" loading="lazy" />
      </a>
      <div className="contact-sheet-year">{localizedWork.years}</div>
      <div className="contact-sheet-title">
        <h3>{localizedWork.title}</h3>
        <p>{localizedWork.subtitle}</p>
      </div>
      <div className="contact-sheet-role">{label}</div>
      <p className="contact-sheet-summary">{localizedWork.summary}</p>
      {target ? <a href={target} className="contact-sheet-open">{ctaLabel}</a> : <span />}
    </article>
  )
}

function Works() {
  const { language } = useLanguage()
  const copy = pageCopy[language]
  const orderedWorks = sortWorksForArchive(works)
  const galleryWorks = pickWorksByIds(works, galleryWorkIds)
  const productionIdSet = new Set(productionWorkIds)
  const indexWorks = orderedWorks.filter((work) => (
    galleryWorkIds.includes(work.id) ||
    (!productionIdSet.has(work.id) && work.practiceLine !== 'content-infrastructure')
  ))

  return (
    <>
      <Header />
      <main className="page-works">
        <section className="section works-index-hero">
          <div className="container works-hero">
            <div>
              <div className="eyebrow">{copy.eyebrow}</div>
            <h1 className="section-title">{copy.title}</h1>
            <p className="section-intro">{copy.intro}</p>
              <div className="hero-cta">
                <a className="button primary" href="#contact-sheet">{copy.open}</a>
                <a className="button" href="#/production">{copy.productionLink}</a>
                <a className="button" href="#/archive">{copy.archiveLink}</a>
              </div>
            </div>
            <div className="works-stat-grid">
              <div className="works-stat-card">
                <strong>{galleryWorks.length}</strong>
                <span>{language === 'en' ? 'selected gallery entries' : '精选画廊条目'}</span>
              </div>
              <div className="works-stat-card">
                <strong>{indexWorks.length}</strong>
                <span>{language === 'en' ? 'artwork and research records' : '艺术与研究记录'}</span>
              </div>
            </div>
          </div>
        </section>

        <FeaturedWorksSection title={copy.featured} items={galleryWorks} language={language} ctaLabel={copy.open} />

        <section id="contact-sheet" className="section">
          <div className="container">
            <h2 className="section-title">{copy.index}</h2>
            <p className="section-intro">{copy.indexIntro}</p>
            <div className="contact-sheet-list">
              {indexWorks.map((work) => (
                <ContactSheetRow key={work.id} work={work} language={language} ctaLabel={copy.open} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Works
