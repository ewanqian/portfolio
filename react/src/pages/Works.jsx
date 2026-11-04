import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import works from '../data/generated/works'
import { getDisplayImage, getWorkTargetUrl } from '../data/siteDisplay'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { localizeWork } from '../i18n/content.js'

const selectedIds = ['kashiwa', 'drop-flow', 'timer', 'digital-garden-visual-2025']

// Public Work is an editorial index, not a dump of every version/event object.
// Alternate versions and historical nodes remain available through Archive and project pages.
const workIndexIds = [
  'kashiwa',
  'drop-flow',
  'timer',
  'digital-garden-visual-2025',
  'natgeo-crystal-2026',
  'china-ai-gala-2026',
  'system-ersha-2026',
  'transit',
  'mke-terminal',
  'sre-realtime-liveset-2026',
  'new-media-artist-simulator-2025',
  'observe-symbiosis-exhibit-2025',
  'ether-fragment-exhibit-2023',
  'derive-dual-city-2024',
  'rain-singapore-visual-2026',
  'yujiayun-45ping-visual-2025',
  'shanhaifusheng2-visual-2025',
  'xtep-xdna22aw-visual-2022',
  'zcool-hp-live-2021',
  'vrplay-hackathon-visual-2025',
  'ar-shenzhen-resort-2022',
  'hallu-resonance-live-2024'
]

const recoveredEnglish = {
  'natgeo-crystal-2026': {
    title: 'National Geographic — Crystal Landscape',
    subtitle: 'Permanent multi-screen media for hospitality and commercial interiors',
    summary: 'A permanent mineral-and-crystal moving-image system coordinated across a horizontal main screen, vertical columns, and side displays for long-duration playback and future updates.'
  },
  'system-ersha-2026': {
    title: 'SYSTEM × ERSHA — Spatial Capture',
    subtitle: 'Spatial scanning / point-cloud media / architectural study',
    summary: 'A spatial capture of the China Second Grinding Wheel Factory in Zhengzhou, reorganising scan data into a working 3D model for spatial study, camera previsualisation, and moving-image production.'
  },
  'china-ai-gala-2026': {
    title: 'China AI Gala — AI Together Opening Show',
    subtitle: 'Stage image / robotics imagery / perspective mapping',
    summary: 'Large-format opening visuals developed for a box-shaped LED stage, combining robotic imagery, three-dimensional scenes and perspective-mapped compositions.'
  },
  transit: {
    title: 'Greenhouse in Transit',
    subtitle: 'A spatial narrative across a suitcase, web archive, and Vision Pro',
    summary: 'A portable greenhouse misdelivered into reality becomes the entry point to a narrative spanning a physical object, mobile web archive, and a point-cloud greenhouse unfolding in Vision Pro.'
  }
}

function buildWorkMap() {
  return new Map(works.map((work) => [work.id, work]))
}

function localizeEditorial(work, language) {
  if (language === 'en' && recoveredEnglish[work.id]) {
    return { ...work, ...recoveredEnglish[work.id] }
  }
  return localizeWork(work, language)
}

function targetFor(work) {
  const target = getWorkTargetUrl(work)
  return target && target !== '/archive' ? target : ''
}

function SelectedCard({ work, language, index }) {
  const item = localizeEditorial(work, language)
  const target = targetFor(work)
  return (
    <article className="editorial-work-card">
      {target ? (
        <a className="editorial-work-image" href={target}><img src={getDisplayImage(work)} alt={item.title} /></a>
      ) : (
        <div className="editorial-work-image"><img src={getDisplayImage(work)} alt={item.title} /></div>
      )}
      <div className="editorial-work-copy">
        <div className="editorial-work-meta"><span>{String(index + 1).padStart(2, '0')}</span><span>{item.years}</span></div>
        <h3>{target ? <a href={target}>{item.title}</a> : item.title}</h3>
        <p className="editorial-work-summary">{item.summary}</p>
        <div className="editorial-work-role">{item.subtitle}</div>
      </div>
    </article>
  )
}

function IndexRow({ work, language }) {
  const item = localizeEditorial(work, language)
  const target = targetFor(work)
  return (
    <article className="work-index-row">
      {target ? (
        <a className="work-index-thumb" href={target}><img src={getDisplayImage(work)} alt="" loading="lazy" /></a>
      ) : (
        <div className="work-index-thumb"><img src={getDisplayImage(work)} alt="" loading="lazy" /></div>
      )}
      <div className="work-index-year">{item.years}</div>
      <div className="work-index-copy">
        <h3>{target ? <a href={target}>{item.title}</a> : item.title}</h3>
        <p>{item.summary}</p>
      </div>
      <div className="work-index-role">{item.subtitle}</div>
      {target ? <a className="work-index-open" href={target}>↗</a> : <span />}
    </article>
  )
}

function Works() {
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const workMap = buildWorkMap()
  const selected = selectedIds.map((id) => workMap.get(id)).filter(Boolean)
  const index = workIndexIds.map((id) => workMap.get(id)).filter(Boolean)

  return (
    <>
      <Header />
      <main className="page-works editorial-index-page">
        <section className="editorial-index-intro">
          <div className="container editorial-index-intro-grid">
            <div>
              <div className="eyebrow">{isZh ? '项目 / Work' : 'Work'}</div>
              <h1>{isZh ? '作品按项目阅读。' : 'Read the work as projects.'}</h1>
            </div>
            <div>
              <p>{isZh
                ? '从现场影像、空间采集到实时音画，精选项目按画面、现场与创作角色呈现。'
                : 'Selected projects in live image, spatial capture and realtime audiovisual practice, presented through their images, contexts and creative roles.'}</p>
              <a className="text-link" href="/portfolio/#/archive">{isZh ? '查看完整归档 ↗' : 'Full archive ↗'}</a>
            </div>
          </div>
        </section>

        <section className="editorial-work-section">
          <div className="container">
            <div className="editorial-work-heading"><span>{isZh ? '代表作品' : 'Selected work'}</span><span>04</span></div>
            <div className="editorial-work-grid">
              {selected.map((work, index) => <SelectedCard key={work.id} work={work} language={language} index={index} />)}
            </div>
          </div>
        </section>

        <section className="work-index-section">
          <div className="container">
            <div className="editorial-work-heading"><span>{isZh ? '项目索引' : 'Project index'}</span><span>{String(index.length).padStart(2, '0')}</span></div>
            <div className="work-index-list">
              {index.map((work) => <IndexRow key={work.id} work={work} language={language} />)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Works
