import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const facts = {
  zh: [
    ['项目', '西安万象城「数字游园 Digital Garden」'],
    ['时间', '2025/07'],
    ['地点', "西安万象城 / Xi'an MixC"],
    ['类型', '公共空间视觉 / 环境屏幕内容'],
    ['技术方向', 'Unity VFX Graph'],
    ['角色', '视觉制作']
  ],
  en: [
    ['Project', 'Digital Garden / Xi’an MixC'],
    ['Date', '2025/07'],
    ['Location', 'Xi’an MixC'],
    ['Type', 'Public-space visual / environmental screen content'],
    ['Technical Direction', 'Unity VFX Graph'],
    ['Role', 'Visual Production']
  ]
}

const credits = {
  zh: [
    ['出品', 'Special 1'],
    ['视觉指导', '郭晓彤'],
    ['视觉制作', '钱誉文 / Ewan Qian']
  ],
  en: [
    ['Production', 'Special 1'],
    ['Visual Direction', 'Guo Xiaotong'],
    ['Visual Production', 'Ewan Qian / 钱誉文']
  ]
}

const galleryItems = [
  {
    title: { zh: '作品截图 01', en: 'Visual Frame 01' },
    body: {
      zh: '绿色粒子和点云碎片在横向屏幕中形成森林般的流动密度。',
      en: 'Green particles and point-cloud fragments build a forest-like density across the horizontal screen.'
    },
    image: '/portfolio/assets/digital-garden/digital-garden-frame-01.webp'
  },
  {
    title: { zh: '作品截图 02', en: 'Visual Frame 02' },
    body: {
      zh: '画面在浅色背景中展开，枝叶、光线和碎片被组织为连续运动的数字花园。',
      en: 'Branches, light, and fragments unfold into a moving digital garden against a bright field.'
    },
    image: '/portfolio/assets/digital-garden/digital-garden-frame-02.webp'
  },
  {
    title: { zh: '作品截图 03', en: 'Visual Frame 03' },
    body: {
      zh: '点云结构进入更高密度状态，形成接近灌木、雾气和风场的屏幕质感。',
      en: 'The point-cloud structure moves into a denser state, close to shrubs, mist, and wind-like screen texture.'
    },
    image: '/portfolio/assets/digital-garden/digital-garden-frame-03.webp'
  },
  {
    title: { zh: '作品截图 04', en: 'Visual Frame 04' },
    body: {
      zh: '绿色光线沿屏幕横向铺开，让装置从建筑表面变成可穿行的影像界面。',
      en: 'Green light spreads horizontally, turning the architectural surface into a walkable image field.'
    },
    image: '/portfolio/assets/digital-garden/digital-garden-frame-04.webp'
  },
  {
    title: { zh: '现场图 01', en: 'Site View 01' },
    body: {
      zh: '装置全景显示屏幕、拱门和西安万象城建筑之间的尺度关系。',
      en: 'The full site view shows the scale between screen, archway, and Xi’an MixC architecture.'
    },
    image: '/portfolio/assets/digital-garden/digital-garden-xian-mixc-01.webp'
  },
  {
    title: { zh: '现场图 02', en: 'Site View 02' },
    body: {
      zh: '纵深视角呈现屏幕内容如何进入公共空间的人流和观看路径。',
      en: 'The depth view shows how the screen content enters public circulation and viewing paths.'
    },
    image: '/portfolio/assets/digital-garden/digital-garden-xian-mixc-02.webp'
  }
]

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

function DigitalGarden() {
  const { language } = useLanguage()
  const isZh = language === 'zh'

  return (
    <>
      <Header />
      <main className="project-page">
        <section className="project-hero">
          <div className="container project-hero-grid">
            <div className="project-hero-copy">
              <div className="eyebrow">{isZh ? '公共空间视觉' : 'Public-Space Visual'}</div>
              <h1>{isZh ? '西安万象城「数字游园」' : 'Digital Garden / Xi’an MixC'}</h1>
              <p>
                {isZh
                  ? '「数字游园 Digital Garden」把点云森林、绿色粒子、流动光线和公共空间屏幕结合起来，使西安万象城入口装置形成一种可穿行的数字花园视觉。'
                  : 'Digital Garden combines point-cloud forest material, green particles, flowing light, and public-space screens, turning the Xi’an MixC site into a walkable digital garden.'}
              </p>
            </div>
            <div className="project-hero-media">
              <img src="/portfolio/assets/digital-garden/digital-garden-xian-mixc-01.webp" alt={isZh ? '西安万象城数字游园现场' : 'Digital Garden at Xi’an MixC'} />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container project-two-column">
            <div>
              <h2 className="section-title">{isZh ? '项目信息' : 'Project Facts'}</h2>
              <FactTable rows={facts[language]} />
            </div>
            <div>
              <h2 className="section-title">{isZh ? '制作署名' : 'Credits'}</h2>
              <FactTable rows={credits[language]} />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container project-caption-band">
            <div className="eyebrow">{isZh ? '动态视觉' : 'Motion Sample'}</div>
            <div>
              <picture className="project-motion-sample">
                <source srcSet="/portfolio/assets/digital-garden/digital-garden-loop.avif" type="image/avif" />
                <img src="/portfolio/assets/digital-garden/digital-garden-xian-mixc-03.webp" alt={isZh ? '数字游园动态视觉样本' : 'Digital Garden motion sample'} loading="lazy" />
              </picture>
              <p>
                {isZh
                  ? '横向动态样本保留屏幕视觉的流动状态：绿色粒子、点云碎片和光线在数字花园中持续漂移。'
                  : 'The horizontal motion sample keeps the screen visual in motion: green particles, point-cloud fragments, and light drift through the digital garden.'}
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-heading-row">
              <div>
                <div className="eyebrow">{isZh ? '项目图册' : 'Project Gallery'}</div>
                <h2 className="section-title">{isZh ? '作品截图与现场图' : 'Visual Frames and Site Views'}</h2>
              </div>
              <p className="section-intro">
                {isZh
                  ? '前四张来自动态视觉，后两张呈现装置和现场尺度。'
                  : 'The first four images are visual frames; the last two show the installation and site scale.'}
              </p>
            </div>
            <div className="project-gallery-grid">
              {galleryItems.map((item) => (
                <article className="project-gallery-card" key={item.title.en}>
                  <div className="project-gallery-image">
                    <img src={item.image} alt={item.title[language]} loading="lazy" />
                  </div>
                  <div className="project-gallery-copy">
                    <h3>{item.title[language]}</h3>
                    <p>{item.body[language]}</p>
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

export default DigitalGarden
