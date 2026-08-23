import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import PracticeLines from '../components/sections/PracticeLines'
import CurrentWork from '../components/sections/CurrentWork'
import SelectedWorks from '../components/sections/SelectedWorks'
import { useLanguage } from '../i18n/LanguageContext.jsx'

function ProfileBlock() {
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const officialBio = isZh
    ? [
        '钱誉文 / Ewan Qian 是媒体艺术家、空间影像创作者与现场视觉表演者，实践围绕现场音画、空间扫描、实时图像系统与数字场景展开。',
        '他把扫描、生成、实时控制与 AI 工具视为可持续演化的创作方法：它们既形成作品和演出系统，也逐渐转化为可以被分享、教学和继续迭代的个人工具与工作坊。'
      ]
    : [
        'Ewan Qian is a media artist, spatial image creator, and live visual performer working across audiovisual performance, spatial scanning, realtime image systems, and digital environments.',
        'He approaches scanning, generative processes, realtime control, and AI tools as evolving creative methods: they become artworks and performance systems, but also reusable tools and workshop formats that can be shared and iterated.'
      ]

  return (
    <section id="profile-directions" className="section profile-block-section">
      <div className="container profile-block-grid">
        <div>
          <div className="eyebrow">{isZh ? '个人实践' : 'Practice'}</div>
          <h2 className="section-title">{isZh ? '作品、系统与共享方法' : 'Works, systems, and shared methods'}</h2>
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
        <SelectedWorks />
        <CurrentWork />
        <PracticeLines />
        <ProfileBlock />
      </main>
      <Footer />
    </>
  )
}

export default Home
