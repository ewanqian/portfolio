import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import SelectedWorks from '../components/sections/SelectedWorks'
import { useLanguage } from '../i18n/LanguageContext.jsx'

function HomeInfo() {
  const { language } = useLanguage()
  const isZh = language === 'zh'

  return (
    <section className="home-info-section">
      <div className="container home-info-grid">
        <div className="home-info-label">{isZh ? '关于 / About' : 'About'}</div>
        <div className="home-info-copy">
          <p>
            {isZh
              ? '钱誉文 / Ewan Qian，上海的新媒体艺术家与实时视听系统创作者，VIRTURA 发起人。实践涵盖音乐现场、异形屏与大型空间影像、建筑点云扫描、XR 空间输入及 AI 辅助实时视觉系统；从作品设计到现场交付，并持续公开创作研究与方法。'
              : 'Ewan Qian is a Shanghai-based media artist and realtime audiovisual systems creator, and founder of VIRTURA. His practice spans live performance, architectural screens, point-cloud spatial capture, XR input and AI-assisted realtime visual systems, connecting artistic research with production and on-site delivery.'}
          </p>
          <div className="home-info-links">
            <Link to="/profile">{isZh ? '个人资料' : 'Profile'}</Link>
            <a href="/works/archive-2026.html">{isZh ? '完整项目档案' : 'Project archive'}</a>\n            <a href="/works/cv-records.html">{isZh ? '完整履历 / CV' : 'CV records'}</a>
            <a href="/works/no-further-input-required.html">{isZh ? '无需进一步输入' : 'No Further Input Required'}</a>\n            <Link to="/apps">{isZh ? '应用 / Playgrounds' : 'Applications / Playgrounds'}</Link>
            <Link to="/writing">{isZh ? '写作' : 'Writing'}</Link>
            <a href="https://github.com/ewanqian" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function CurrentResearch() {
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const notes = [
    {
      id: 'reactor-bpm-system-2026',
      title: 'BPM System 2026 / REACTOR',
      sub: isZh ? '重点研究报告 · 实时演出系统' : 'Featured research report · Realtime show systems',
      description: isZh
        ? '从音乐时间线、BPM 同步到视觉层、手动 Cue 与实时控制：一套从素材组织走向可演奏现场系统的实践研究。'
        : 'A practice-based study of music timelines, BPM sync, visual layers, manual cues and realtime controls—from clips to a performable live system.'
    },
    {
      id: 'entropy-two-screen-2026',
      title: 'ENTROPY — Atmospheric Escape',
      sub: isZh ? '双屏幕视觉世界' : 'Two-screen visual world',
      description: isZh
        ? '超宽主屏、顶屏与空间图像的协调。'
        : 'Coordinating an ultra-wide main screen, ceiling screen and spatial imagery.'
    },
    {
      id: 'performable-music',
      title: 'Performable Music',
      sub: isZh ? '可表演音乐' : 'Playable music research',
      description: isZh
        ? '编曲、音画同源与可实时控制的音乐。'
        : 'Composition and music that can be controlled in live performance.'
    }
  ]
  return (
    <section className="home-current-research" aria-labelledby="home-research-heading">
      <div className="container home-current-research-grid">
        <div className="home-current-research-label" id="home-research-heading">
          {isZh ? '重点研究与写作 / 2026' : 'Research & Writing / 2026'}
        </div>
        <div className="home-current-research-content">
          <div className="home-research-notes">
            {notes.map((note) => (
              <article key={note.id} className="home-research-note">
                <Link to={`/writing/${note.id}`}><strong>{note.title}</strong> <span>/ {note.sub}</span></Link>
                <p>{note.description}</p>
              </article>
            ))}
          </div>
          <Link className="home-research-index-link" to="/writing">{isZh ? '查看研究报告与全部文章' : 'Research reports and all writing'} ↗</Link>
        </div>
      </div>
    </section>
  )
}

function Home() {
  return (
    <>
      <Header />
      <main className="editorial-home">
        <Hero />
        <SelectedWorks />
        <CurrentResearch />
        <HomeInfo />
      </main>
      <Footer />
    </>
  )
}

export default Home
