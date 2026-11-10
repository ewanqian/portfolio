import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import cv from '../data/generated/cv.js'
import './CV.css'

const labels = {
  education: ['教育经历', 'Education'], awards: ['入选与荣誉', 'Selections & Recognition'],
  exhibitions: ['展览与作品', 'Exhibitions & Works'], live: ['现场视听与演出', 'Live Audiovisual & Performance'],
  workshops: ['公开工作坊', 'Public Workshops'], production: ['精选制作', 'Selected Production'],
  research: ['持续创作与研究', 'Ongoing Practice & Research']
}

export default function CV() {
  const { language, setLanguage } = useLanguage()
  const isZh = language === 'zh'
  const location = useLocation()
  const title = id => labels[id]?.[isZh ? 0 : 1] || id
  const base = window.location.pathname.startsWith('/portfolio') ? '/portfolio' : ''
  const recordUrl = id => `${base}/works/records/${id}.html`
  const pdfUrl = lang => `/assets/cv/Ewan_Qian_CV_2026-11_R${cv.release}_${lang}.pdf`
  const byId = new Map(cv.records.map(record => [record.id, record]))
  useEffect(() => {
    const id = location.state?.scrollTo || decodeURIComponent(location.hash.slice(1))
    if (!id) return
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({block:'start'}))
    return () => cancelAnimationFrame(frame)
  }, [location.key, location.hash, location.state])
  return <>
    <Header />
    <main className="cv-screen">
      <section className="cv-screen-hero container">
        <div className="cv-screen-intro">
          <div className="cv-screen-topline">
            <p className="eyebrow">CURRICULUM VITAE</p>
            <div className="cv-language" role="group" aria-label={isZh ? '履历语言' : 'CV language'}>
              <button type="button" aria-pressed={isZh} onClick={() => setLanguage('zh')}>中文</button>
              <button type="button" aria-pressed={!isZh} onClick={() => setLanguage('en')}>English</button>
            </div>
          </div>
          <h1>{isZh ? '钱誉文' : 'Ewan Qian'}<span>{isZh ? 'Ewan Qian / 履历' : '钱誉文 / CV'}</span></h1>
          <p className="cv-screen-lead">{isZh ? '媒体艺术家，常驻上海。创作围绕实时视听、空间影像与交互系统展开。' : 'A Shanghai-based media artist working across realtime audiovisual performance, spatial imagery and interactive systems.'}</p>
          <div className="cv-screen-downloads">
            <a className="button primary" href={pdfUrl('ZH')} target="_blank" rel="noopener noreferrer">{isZh ? '中文 PDF' : 'Chinese PDF'} ↗</a>
            <a className="button" href={pdfUrl('EN')} target="_blank" rel="noopener noreferrer">English PDF ↗</a>
            <Link className="button" to="/profile">{isZh ? '个人介绍' : 'Artist profile'}</Link>
          </div>
          <p className="cv-release">{isZh ? '中英文 PDF · 各三页' : 'Chinese & English PDFs · Three pages each'}</p>
        </div>
        <figure className="cv-screen-portrait"><img src={`${base}/assets/profile/ewan-portrait-formal.webp`} alt="Ewan Qian / 钱誉文" /></figure>
      </section>
      <div className="container cv-screen-body">
        <aside className="cv-screen-index">
          <p className="eyebrow">{isZh ? '履历目录' : 'Contents'}</p>
          <nav aria-label={isZh ? '履历章节' : 'CV sections'}>
            {cv.sections.map(section => <Link key={section.id} to="/cv" state={{scrollTo:`cv-${section.id}`}}>{title(section.id)}</Link>)}
          </nav>
          <div className="cv-screen-related"><Link to="/works">{isZh ? '代表作品' : 'Selected works'} ↗</Link><Link to="/writing">{isZh ? '写作与研究' : 'Writing & research'} ↗</Link><a href={`${base}/works/cv-records.html`}>{isZh ? '履历检索' : 'Record index'} ↗</a></div>
        </aside>
        <div className="cv-screen-sections">
          {cv.sections.map((section,index) => <section className="cv-screen-section" id={`cv-${section.id}`} key={section.id}>
            <header className="cv-screen-section-heading"><span>{String(index+1).padStart(2,'0')}</span><h2>{title(section.id)}</h2></header>
            <div className="cv-screen-rows">{section.record_ids.map(id => {
              const record=byId.get(id)
              return <a className="cv-screen-row" key={id} data-record-id={id} href={recordUrl(id)}><time>{record.year}</time><span>{isZh ? record.zh : record.en}</span><span aria-hidden="true">↗</span></a>
            })}</div>
          </section>)}
        </div>
      </div>
    </main>
    <Footer />
  </>
}
