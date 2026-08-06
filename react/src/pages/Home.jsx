import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import SelectedWorks from '../components/sections/SelectedWorks'
import StageStrip from '../components/sections/StageStrip'
import DropFlowMainline from '../components/sections/DropFlowMainline'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { profileCopy } from '../data/profile.js'

function ProfileBlock() {
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const officialBio = profileCopy[language].shortBio

  return (
    <section id="profile-directions" className="section profile-block-section">
      <div className="container profile-block-grid">
        <div>
          <div className="eyebrow">{isZh ? '个人简介' : 'Profile'}</div>
          <h2 className="section-title">{isZh ? '钱誉文 / Ewan Qian' : 'Ewan Qian / 钱誉文'}</h2>
        </div>
        <div className="profile-block-copy">
          {officialBio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <Link className="text-link" to="/profile">
            {isZh ? '阅读完整个人页' : 'Read full profile'}
          </Link>
        </div>
      </div>
    </section>
  )
}

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <DropFlowMainline />
        <StageStrip />
        <SelectedWorks />
        <ProfileBlock />
      </main>
      <Footer />
    </>
  )
}

export default Home
