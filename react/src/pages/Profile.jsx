import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const pageCopy = {
  zh: {
    eyebrow: 'Profile',
    title: '钱誉文 / Ewan Qian',
    intro:
      '钱誉文是媒体艺术家、现场视觉创作者与独立制作人，Virtura Collective 与 Virtura Spaceport 方向发起人之一。他的工作介于现场音画、空间影像、程序化图像系统、数字场景与演出制作之间，长期关注声音、图像、材质、时间和空间气氛如何在现场共同形成可被感知的结构。',
    primaryCta: '作品画廊',
    secondaryCta: '制作项目',
    sections: [
      {
        eyebrow: 'Practice',
        title: '现场音画与空间影像',
        body:
          '他的创作将视觉视为演出结构的一部分。声音、图像、材质、亮度、密度、运动、停顿、空间尺度和观众身体感知共同形成现场状态。视觉系统既回应音乐，也保持自身的结构、时间和空间质地。'
      },
      {
        eyebrow: 'Digital Nature',
        title: '数字空间中的自然记忆',
        body:
          '自然在他的作品中以水流、植物、雾气、颗粒、光线、地形、扫描痕迹和点云材料进入图像系统。数字空间因此成为保存、迁移和重新组织记忆与感知经验的场所。'
      },
      {
        eyebrow: 'Virtura',
        title: '团队协作与长期研究容器',
        body:
          'Virtura 承载现场视觉、空间影像、音乐合作、数字场景实验与长期研究归档。涉及团队作品时，钱誉文将其视为协作成果；他的角色通常集中在创作发起、视觉系统设计、空间影像制作、Blender 工作流搭建、现场视觉组织、项目叙事和方法整理。'
      }
    ],
    workTitle: '核心作品线',
    works: [
      {
        title: 'TIMER / 控时者',
        meta: '时间粒子 / 音频曲线 / 环绕屏幕',
        body:
          'TIMER 是早期关键项目，围绕时间、节拍、频段和图像内部结构展开。作品将声音中的节奏和能量转化为点云粒子、灯光变化和空间运动，使时间成为可以流动、聚集、旋转并被声音推动的视觉材料。'
      },
      {
        title: 'Drop Flow / 滴流',
        meta: '数字自然 / 高斯衍生点云 / 记忆场景',
        body:
          'Drop Flow 从“一滴水生成一座花园”的意象出发，将声音、扫描数据、点云、高斯衍生图像材料、数字植物、几何结构、流场和屏幕光线组织成持续展开的空间场景。'
      }
    ],
    methodTitle: '方法',
    methods: [
      'Blender 被作为综合音画创作环境使用，整合时间线、手动关键帧、音频曲线、Geometry Nodes、Simulation Zone、点云导入、材质控制、灯光系统、镜头和屏幕输出。',
      '声音作为控制材料参与图像结构，可影响点云运动、材质亮度、流场强度、粒子密度、灯光闪烁和场景转场。',
      'AI 参与资料整理、结构推演、工具设计、参数测试和现场工作流优化，成为工具生产与方法更新的一部分。'
    ],
    collaborationTitle: '合作方向',
    collaborations:
      '他正在将个人创作、团队协作和音乐人合作整理为更清晰的现场艺术路径。近期合作与研究语境包括徐昊、KASHIWA Daisuke / 柏大辅、RÖ、Shukai / Mark 等，不同声音实践持续测试其视觉系统在节奏、密度、材质和空间组织上的适应能力。',
    photoTitle: '肖像与现场图像',
    photoIntro: '这一组图像保留个人肖像、现场工作、公开分享与空间化影像状态，作为个人资料、展演申请和媒体介绍的视觉补充。'
  },
  en: {
    eyebrow: 'Profile',
    title: 'Ewan Qian / 钱誉文',
    intro:
      'Ewan Qian is a media artist, live visual creator, and independent producer. He is one of the initiators of Virtura Collective and Virtura Spaceport. His work moves across live audiovisual performance, spatial image-making, procedural image systems, digital scenes, and performance production.',
    primaryCta: 'Gallery',
    secondaryCta: 'Production',
    sections: [
      {
        eyebrow: 'Practice',
        title: 'Live Audiovisual and Spatial Image Systems',
        body:
          'His practice treats visuals as part of the performance structure. Sound, image, material, brightness, density, motion, pause, spatial scale, and bodily perception work together to form the live environment.'
      },
      {
        eyebrow: 'Digital Nature',
        title: 'Natural Memory in Digital Space',
        body:
          'Nature enters his image systems through water, plants, mist, particles, light, terrain, scan traces, and point-cloud material. Digital space becomes a site for preserving, transferring, and reorganizing memory and perception.'
      },
      {
        eyebrow: 'Virtura',
        title: 'Collective Work and Long-Term Research',
        body:
          'Virtura holds live visual practice, spatial image work, music collaboration, digital-scene experiments, and long-term research archives. In collective works, Qian’s role often centers on visual system design, spatial image production, Blender workflow building, live visual organization, project narrative, and method documentation.'
      }
    ],
    workTitle: 'Core Work Lines',
    works: [
      {
        title: 'TIMER',
        meta: 'Temporal particles / audio F-curves / surrounding screens',
        body:
          'TIMER is an early key project built around time, rhythm, frequency, and internal image structure. It transforms sonic rhythm and energy into point-cloud particles, lighting shifts, and spatial motion.'
      },
      {
        title: 'Drop Flow',
        meta: 'Digital nature / Gaussian-derived point clouds / memory-scene',
        body:
          'Drop Flow begins with the image of a garden emerging from a single drop of water, organizing sound, scanned data, point clouds, Gaussian-derived image material, digital vegetation, geometry, flow fields, and screen light into an evolving spatial scene.'
      }
    ],
    methodTitle: 'Method',
    methods: [
      'Blender is used as an integrated audiovisual authoring environment, bringing together timeline editing, manual keyframes, audio F-curves, Geometry Nodes, Simulation Zone, point-cloud import, materials, lighting, cameras, and screen output.',
      'Sound functions as control material inside the image structure, shaping point-cloud motion, material brightness, flow intensity, particle density, lighting pulses, and scene transitions.',
      'AI supports research organization, structural reasoning, tool design, parameter testing, and live-workflow optimization as part of the production method.'
    ],
    collaborationTitle: 'Collaborations',
    collaborations:
      'Qian is developing a clearer live-art path across personal practice, collective work, and music collaboration. Recent collaboration and research contexts include Hao Xu, KASHIWA Daisuke, RÖ, Shukai / Mark, and other artists whose sound practices test the rhythm, density, materiality, and spatial organization of his visual systems.',
    photoTitle: 'Portraits and Live Images',
    photoIntro: 'This image set gathers portraits, live-working moments, public sharing contexts, and spatial personal images for artist profiles, presentation material, and media introductions.'
  }
}

const portraits = [
  {
    src: '/portfolio/assets/profile/ewan-portrait-formal.jpg',
    title: 'Portrait',
    titleZh: '个人肖像'
  },
  {
    src: '/portfolio/assets/profile/ewan-portrait-outdoor-woods.jpg',
    title: 'Field portrait',
    titleZh: '场域肖像'
  },
  {
    src: '/portfolio/assets/profile/ewan-strawberry-live.jpg',
    title: 'Live visual work',
    titleZh: '现场视觉工作'
  },
  {
    src: '/portfolio/assets/profile/ewan-ufo-sharing.jpg',
    title: 'Public sharing',
    titleZh: '公开分享'
  },
  {
    src: '/portfolio/assets/profile/ewan-portrait-main.jpg',
    title: 'Studio and process',
    titleZh: '工作状态'
  },
  {
    src: '/portfolio/assets/profile/ewan-profile-board.jpg',
    title: 'Profile record',
    titleZh: '资料记录'
  }
]

function Profile() {
  const { language } = useLanguage()
  const copy = pageCopy[language]
  const isZh = language === 'zh'

  return (
    <>
      <Header />
      <main className="profile-page">
        <section className="profile-hero-section">
          <div className="container profile-hero-grid">
            <div className="profile-hero-copy">
              <p className="eyebrow">{copy.eyebrow}</p>
              <h1>{copy.title}</h1>
              <p>{copy.intro}</p>
              <div className="hero-cta">
                <Link className="button primary" to="/works">{copy.primaryCta}</Link>
                <Link className="button" to="/production">{copy.secondaryCta}</Link>
              </div>
            </div>
            <figure className="profile-hero-portrait">
              <img src="/portfolio/assets/profile/ewan-portrait-formal.jpg" alt={copy.title} />
            </figure>
          </div>
        </section>

        <section className="section profile-reading-section">
          <div className="container profile-reading-grid">
            {copy.sections.map((section) => (
              <article key={section.eyebrow} className="profile-text-panel">
                <span>{section.eyebrow}</span>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">{copy.workTitle}</h2>
            <div className="profile-work-grid">
              {copy.works.map((work) => (
                <article key={work.title} className="profile-work-card">
                  <span>{work.meta}</span>
                  <h3>{work.title}</h3>
                  <p>{work.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container profile-method-layout">
            <div>
              <div className="eyebrow">{isZh ? 'System' : 'System'}</div>
              <h2 className="section-title">{copy.methodTitle}</h2>
            </div>
            <div className="profile-method-list">
              {copy.methods.map((method) => (
                <p key={method}>{method}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container profile-collaboration-band">
            <div>
              <div className="eyebrow">{isZh ? 'Network' : 'Network'}</div>
              <h2>{copy.collaborationTitle}</h2>
            </div>
            <p>{copy.collaborations}</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-heading-row">
              <div>
                <div className="eyebrow">{isZh ? 'Images' : 'Images'}</div>
                <h2 className="section-title">{copy.photoTitle}</h2>
              </div>
              <p className="section-intro">{copy.photoIntro}</p>
            </div>
            <div className="profile-photo-grid">
              {portraits.map((item, index) => (
                <article key={item.src} className={`profile-photo-card profile-photo-card-${index + 1}`}>
                  <img src={item.src} alt={isZh ? item.titleZh : item.title} loading="lazy" />
                  <div>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{isZh ? item.titleZh : item.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Profile
