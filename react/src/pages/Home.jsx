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
              ? '钱誉文 / Ewan Qian，新媒体视觉艺术家与现场视觉表演者。工作集中于现场音画、空间影像、实时图像系统，以及这些方法在舞台与数字空间中的迁移。'
              : 'Ewan Qian is a media artist and live visual performer working with audiovisual performance, spatial image, realtime image systems, and their movement across stages and digital environments.'}
          </p>
          <div className="home-info-links">
            <Link to="/profile">{isZh ? '个人资料' : 'Profile'}</Link>
            <Link to="/archive">{isZh ? '完整归档' : 'Archive'}</Link>
            <Link to="/apps">{isZh ? '应用 / Playgrounds' : 'Applications / Playgrounds'}</Link>
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
      title: 'REACTOR — BPM System',
      sub: isZh ? '实时演出控制系统' : 'Realtime performance control',
      description: isZh
        ? 'BPM 同步、持续视觉、触发器与人的现场判断。'
        : 'BPM sync, continuous imagery, triggers and live performer decisions.'
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
          {isZh ? '近期研究 / 2026—' : 'Current Research / 2026—'}
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
          <Link className="home-research-index-link" to="/writing">{isZh ? '全部写作' : 'All writing'} ↗</Link>
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
