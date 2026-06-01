import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import works from '../data/generated/works'
import { getDisplayImage, getWorkTargetUrl, sortWorksForArchive } from '../data/siteDisplay'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { localizeWork } from '../i18n/content.js'

const pageCopy = {
  zh: {
    title: '作品选集',
    intro: '代表作、长期系列和项目入口。',
    open: '查看',
    featured: '代表作',
    ongoing: '持续项目',
    more: '更多作品',
    labels: {
      personal_work: '个人作品',
      team_work: '团队作品',
      external_collaboration: '外部合作',
      collaboration: '合作作品',
      service_work: '项目制作'
    }
  },
  en: {
    title: 'Selected Works',
    intro: 'Representative works, long-running series, and project entries.',
    open: 'Open',
    featured: 'Representative Works',
    ongoing: 'Ongoing Projects',
    more: 'More Works',
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
  const featuredWorks = orderedWorks.filter((work) => work.showOnHome)
  const ongoingWorks = orderedWorks.filter((work) => (
    work.lifecycle === 'active' ||
    work.practiceLine === 'content-infrastructure' ||
    work.type === 'tooling-research'
  ))
  const usedIds = new Set([...featuredWorks, ...ongoingWorks].map((work) => work.id))
  const moreWorks = orderedWorks.filter((work) => !usedIds.has(work.id))

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
        <WorksSection title={copy.ongoing} items={ongoingWorks} language={language} ctaLabel={copy.open} />
        <WorksSection title={copy.more} items={moreWorks} language={language} ctaLabel={copy.open} />
      </main>
      <Footer />
    </>
  )
}

export default Works
