import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const visualSequences = [
  {
    title: "It's Raining / Cubic rain flow",
    titleZh: "It's Raining / 立方体雨流",
    description: 'A wide-screen rain stream built from flowing cubic trajectories, radial audio-reactive motion, vertical movement, strobe accents, and drumbeat flashes.',
    descriptionZh: "为 Rain 郑智薰《It's Raining》（Remix Ver. / Not Like Us - Kendrick Lamar）制作的大屏幕音画舞台视觉。画面以立方体雨流、音频触发的放射轨迹、垂直运动、爆闪和鼓点光源为核心。",
    images: [
      '/portfolio/assets/rain-singapore/gallery/its-raining-wide-05.webp',
      '/portfolio/assets/rain-singapore/gallery/its-raining-wide-06.webp'
    ]
  },
  {
    title: 'Rainism / Backlit falling frame',
    titleZh: 'Rainism / 背光下坠框架',
    description: 'Backlit movement, high-speed falling effects, clean line frames, and light-source outlines translate the Rainism stage identity into a graphic screen system.',
    descriptionZh: '以背光运动、高速下坠、利落线条框架和光源轮廓组织画面，把 Rainism 的舞台气质转译成图形化大屏系统。',
    images: [
      '/portfolio/assets/rain-singapore/gallery/rainism-wide-02.webp',
      '/portfolio/assets/rain-singapore/gallery/rainism-wide-06.webp'
    ]
  },
  {
    title: 'La Song / Symmetric neon geometry',
    titleZh: 'La Song / 对称霓虹几何',
    description: 'Symmetrical repeated geometry, flowing neon, metallic-glass reflections, and disco-like rhythm support the retro-rock and playful show mood.',
    descriptionZh: '用对称重复几何、流动霓虹、金属玻璃反光和 disco 节奏，支撑复古摇滚与轻快表演气质。',
    images: [
      '/portfolio/assets/rain-singapore/gallery/lasong-wide-54s.webp',
      '/portfolio/assets/rain-singapore/gallery/lasong-wide-136s.webp'
    ]
  },
  {
    title: 'Opening / Artist entry material',
    titleZh: 'Opening / 艺人入场素材',
    description: 'Opening frames and transition materials prepared for the festival-stage context, kept separate from song-specific visual systems.',
    descriptionZh: '为跨年晚会舞台语境准备的开场与转场素材，和曲目视觉系统分开整理。',
    images: [
      '/portfolio/assets/rain-singapore/gallery/rain-opening-wide-04.webp',
      '/portfolio/assets/rain-singapore/gallery/rain-opening-wide-07.webp'
    ]
  }
]

const facts = [
  ['Project', 'Rain / Jung Ji-hoon stage visual production'],
  ['Event', 'SINGLAND Festival 2026 / Singapore'],
  ['Date', '2025.12.31 - 2026.01'],
  ['Scope', "Opening materials, It's Raining, Rainism, La Song, wide-screen stage visual delivery"],
  ['Role', 'Visual Production / Delivery Support'],
  ['Collaboration', 'Fortune Art Production']
]

const credits = [
  ['Artist', 'Rain / Jung Ji-hoon / 郑智薰'],
  ['Production', 'Fortune Art Production'],
  ['Visual Production / Delivery Support', 'Ewan Qian / 钱誉文']
]

const timeline = [
  ['It’s Raining', 'Cubic flow, radial movement, vertical rain stream, strobe and flash accents.'],
  ['Rainism', 'Backlit motion, falling light, typography outline, clean frame language.'],
  ['La Song', 'Symmetric geometry, neon flow, reflective material, disco-like rhythm.'],
  ['Opening', 'Artist entry and festival-stage transition material.']
]

const caption = {
  en: 'Wide-screen audiovisual stage visuals produced by Fortune Art Production for Rain / Jung Ji-hoon at SINGLAND Festival in Singapore, including It’s Raining (Remix Ver. / Not Like Us - Kendrick Lamar) and related song visual states.',
  zh: "Fortune Art Production 为 Rain 郑智薰在新加坡 SINGLAND Festival 跨年晚会制作的大屏幕音画舞台视觉，包含《It's Raining》（Remix Ver. / Not Like Us - Kendrick Lamar）及相关曲目视觉状态。"
}

function FactTable({ rows }) {
  return (
    <dl className="project-fact-table">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}

function SequenceBlock({ item, isZh }) {
  return (
    <article className="project-sequence-block">
      <div className="project-sequence-copy">
        <h3>{isZh ? item.titleZh || item.title : item.title}</h3>
        <p>{isZh ? item.descriptionZh || item.description : item.description}</p>
      </div>
      <div className="project-image-strip wide">
        {item.images.map((src) => (
          <img key={src} src={src} alt="" loading="lazy" />
        ))}
      </div>
    </article>
  )
}

function RainSingapore() {
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const localizedFacts = isZh
    ? [
      ['项目', 'Rain 郑智薰新加坡跨年舞台视觉制作'],
      ['活动', 'SINGLAND Festival / 新加坡跨年晚会'],
      ['时间', '2025.12.31 - 2026.01'],
      ['范围', "Opening 素材、《It's Raining》Remix、Rainism、La Song、大屏幕舞台视觉交付"],
      ['角色', '视觉制作 / 工程交付支持'],
      ['制作方', 'Fortune Art Production']
    ]
    : facts
  const localizedCredits = isZh
    ? [
      ['艺人', 'Rain / Jung Ji-hoon / 郑智薰'],
      ['制作方', 'Fortune Art Production'],
      ['视觉制作 / 工程交付支持', 'Ewan Qian / 钱誉文']
    ]
    : credits
  const localizedTimeline = isZh
    ? [
      ['It’s Raining', '立方体雨流、放射运动、垂直下落、爆闪和鼓点光源。'],
      ['Rainism', '背光运动、下坠光源、字体轮廓和利落框架。'],
      ['La Song', '对称几何、霓虹流动、反光材质和 disco 节奏。'],
      ['Opening', '艺人入场与跨年舞台转场素材。']
    ]
    : timeline

  return (
    <>
      <Header />
      <main className="project-page">
        <section className="project-hero">
          <div className="container project-hero-grid">
            <div className="project-hero-copy">
              <div className="eyebrow">{isZh ? '舞台视觉制作' : 'Stage Visual Production'}</div>
              <h1>{isZh ? 'Rain 郑智薰 / SINGLAND Festival 舞台视觉制作' : 'Rain / SINGLAND Festival Stage Visual Production'}</h1>
              <p>
                {isZh
                  ? '为 Rain 郑智薰新加坡 SINGLAND Festival 跨年晚会提供舞台视觉制作与交付支持，覆盖开场素材和多首曲目的大屏幕视觉状态。'
                  : 'Stage visual production and delivery support for Rain / Jung Ji-hoon at SINGLAND Festival, covering opening materials and song-specific wide-screen visual states.'}
              </p>
            </div>
            <div className="project-hero-media">
              <img src="/portfolio/assets/rain-singapore/rain-singapore-cover-wide.webp" alt="Rain SINGLAND wide stage visual frame" />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container project-two-column">
            <div>
              <h2 className="section-title">{isZh ? '项目信息' : 'Project Facts'}</h2>
              <FactTable rows={localizedFacts} />
            </div>
            <div>
              <h2 className="section-title">{isZh ? '制作署名' : 'Credits'}</h2>
              <FactTable rows={localizedCredits} />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container project-caption-band">
            <div className="eyebrow">{isZh ? '项目说明' : 'Project Caption'}</div>
            <p>{isZh ? caption.zh : caption.en}</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-heading-row">
              <div>
                <div className="eyebrow">{isZh ? '曲目视觉状态' : 'Visual States'}</div>
                <h2 className="section-title">{isZh ? '基于曲目的大屏幕视觉系统' : 'Song-Based Wide-Screen Systems'}</h2>
              </div>
              <p className="section-intro">
                {isZh
                  ? '页面使用本地渲染输出的全比例宽屏帧。每首歌按独立视觉状态整理，保留不同曲目的屏幕语言。'
                  : 'The page uses full-ratio wide frames from local render outputs. Each song is treated as a separate visual state with its own screen language.'}
              </p>
            </div>
            <div className="project-sequence-list">
              {visualSequences.map((item) => (
                <SequenceBlock key={item.title} item={item} isZh={isZh} />
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container project-two-column">
            <div>
              <div className="eyebrow">{isZh ? '分镜说明' : 'Storyboard Notes'}</div>
              <h2 className="section-title">{isZh ? '制作逻辑' : 'Production Logic'}</h2>
            </div>
            <div className="project-note-list">
              {localizedTimeline.map(([title, body]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
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

export default RainSingapore
