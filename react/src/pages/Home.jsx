import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import SelectedWorks from '../components/sections/SelectedWorks'
import { useLanguage } from '../i18n/LanguageContext.jsx'

function ProfileBlock() {
  const { language } = useLanguage()
  const isZh = language === 'zh'

  return (
    <section id="profile-directions" className="section profile-block-section">
      <div className="container profile-block-grid">
        <div>
          <div className="eyebrow">{isZh ? '个人介绍' : 'Profile'}</div>
          <h2 className="section-title">{isZh ? '钱誉文 / Ewan Qian' : 'Ewan Qian / 钱誉文'}</h2>
        </div>
        <div className="profile-block-copy">
          <p>
            {isZh
              ? '现场演出与沉浸空间视觉制作人 / 媒体艺术家，工作覆盖演唱会视觉、展演影像、空间图像系统、AI 生成环境与网页档案。'
              : 'Live and immersive visual producer / media artist working across concert visuals, exhibition media, spatial image systems, AI-generated environments, and web-based archives.'}
          </p>
          <p>
            {isZh
              ? '实践结合视觉制作、屏幕空间设计、工程交付、实时工具和公共文档系统，服务于现场演出、装置展览与虚拟空间。'
              : 'The practice combines visual production, screen-space thinking, delivery engineering, real-time tools, and public documentation for performances, installations, and virtual spaces.'}
          </p>
          <Link className="text-link" to="/profile">
            {isZh ? '打开个人照片页' : 'Open profile images'}
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
        <ProfileBlock />
        <SelectedWorks />
      </main>
      <Footer />
    </>
  )
}

export default Home
