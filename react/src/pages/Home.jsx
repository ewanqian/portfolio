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
  const officialBio = isZh
    ? [
        '钱誉文 / Ewan Qian 是媒体艺术家、现场视觉创作者与独立制作人，Virtura Collective 与 Virtura Spaceport 方向发起人之一。他的工作围绕现场音画、空间影像、程序化图像系统与数字场景展开，关注声音、图像、材质与空间气氛如何在现场形成清晰的演出结构。',
        '近年来，他以 Virtura 团队身份参与制作和发展 TIMER / 控时者、Drop Flow / 滴流等项目，并建立面向现场演出的实时音画系统。TIMER 将时间、音频曲线和点云粒子组织为空间运动；Drop Flow 将声音、自然记忆、扫描数据和空间屏幕延展为长期发展的音画作品线。',
        '他与徐昊、KASHIWA Daisuke / 柏大辅、RÖ、Shukai / Mark 等音乐人和创作者展开合作与长期研究，同时使用 AI 建立资料分析、音频处理、控制插件和个人演出工具，持续推进一条更独立的现场音画创作路径。'
      ]
    : [
        'Ewan Qian is a media artist, live visual creator, and independent producer, and one of the initiators of Virtura Collective and Virtura Spaceport. His work spans live audiovisual performance, spatial image-making, procedural image systems, and digital scenes, with a focus on how sound, image, material, and atmosphere form clear structures in live environments.',
        'In recent years, he has worked with Virtura on TIMER and Drop Flow while building a realtime audiovisual system for live performance. TIMER organizes time, audio curves, and point-cloud particles into spatial motion; Drop Flow extends sound, natural memory, scanned data, and spatial screens into a long-term audiovisual work line.',
        'He has developed collaborations and long-term research with Hao Xu, KASHIWA Daisuke, RÖ, Shukai / Mark, and other musicians and creators. His AI-assisted workflow supports intermediate analysis, audio processing, control plugins, and personal performance tools, continuing an independent path in live audiovisual creation.'
      ]

  return (
    <section id="profile-directions" className="section profile-block-section">
      <div className="container profile-block-grid">
        <div>
          <div className="eyebrow">{isZh ? '介绍文本' : 'Profile Text'}</div>
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
        <ProfileBlock />
        <SelectedWorks />
      </main>
      <Footer />
    </>
  )
}

export default Home
