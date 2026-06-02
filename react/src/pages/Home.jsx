import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import SelectedWorks from '../components/sections/SelectedWorks'
import StageStrip from '../components/sections/StageStrip'
import DropFlowMainline from '../components/sections/DropFlowMainline'
import { useLanguage } from '../i18n/LanguageContext.jsx'

function ProfileBlock() {
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const officialBio = isZh
    ? [
        '钱誉文 / Ewan Qian 是媒体艺术家、现场视觉创作者与独立制作人，工作围绕现场音画、空间影像、程序化图像系统与数字场景展开。',
        '他通过 Virtura 组织长期作品线和现场系统，也与音乐人、声音艺术家和制作团队合作，把视觉推进到演出结构内部。'
      ]
    : [
        'Ewan Qian is a media artist, live visual creator, and independent producer working across live audiovisual performance, spatial images, procedural image systems, and digital scenes.',
        'Through Virtura and independent collaborations, he develops long-form work lines and live visual systems that move image-making into the structure of performance.'
      ]

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
