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
            <Link to="/writing">{isZh ? '写作' : 'Writing'}</Link>
            <Link to="/writing/performable-music-2026">{isZh ? '近期研究：可表演音乐' : 'Current research: Performable Music'}</Link>
            <a href="https://github.com/ewanqian" target="_blank" rel="noreferrer">GitHub</a>
          </div>
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
        <HomeInfo />
      </main>
      <Footer />
    </>
  )
}

export default Home
