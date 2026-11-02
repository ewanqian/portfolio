import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const media = [
  ['https://virtura.space/VIRTURA_WEBSITE_ASSETS/02_NATGEO_CRYSTAL/space-preview.gif', '现场动态', 'Motion study'],
  ['https://virtura.space/VIRTURA_WEBSITE_ASSETS/02_NATGEO_CRYSTAL/crystal-landscape-pink.webp', '三维矿晶景观', '3D crystal landscape'],
  ['https://virtura.space/VIRTURA_WEBSITE_ASSETS/02_NATGEO_CRYSTAL/hero-crystal.jpg', '晶簇主视觉', 'Key crystal visual'],
  ['https://virtura.space/VIRTURA_WEBSITE_ASSETS/02_NATGEO_CRYSTAL/mineral-scan-color.webp', '材质研究', 'Material study'],
  ['https://virtura.space/VIRTURA_WEBSITE_ASSETS/02_NATGEO_CRYSTAL/crystal-flow-pink.webp', '动态形态', 'Motion state'],
  ['https://virtura.space/VIRTURA_WEBSITE_ASSETS/02_NATGEO_CRYSTAL/crystal-data-glitch.webp', '多画幅适配测试', 'Multi-format study']
]

const facts = {
  zh: [
    ['年份', '2026'],
    ['场景', '酒店大堂与商业空间'],
    ['形式', '常设多屏空间影像'],
    ['画布', '横向主屏 / 竖向立柱 / 侧屏'],
    ['团队语境', 'VIRTURA'],
    ['个人记录', '参与空间影像制作；具体个人 credit 以已确认资料为准']
  ],
  en: [
    ['Year', '2026'],
    ['Context', 'Hospitality lobby and commercial interiors'],
    ['Format', 'Permanent multi-screen spatial media'],
    ['Canvases', 'Horizontal main screen / vertical columns / side displays'],
    ['Team context', 'VIRTURA'],
    ['Personal record', 'Spatial-media production participation; individual credit remains evidence-bounded']
  ]
}

function FactTable({ rows }) {
  return <dl className="project-fact-table">{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
}

function NatGeoCrystal() {
  const { language } = useLanguage()
  const isZh = language === 'zh'

  return (
    <>
      <Header />
      <main className="project-page">
        <section className="project-hero">
          <div className="container project-hero-grid">
            <div className="project-hero-copy">
              <div className="eyebrow">{isZh ? '常设空间影像 · 2026' : 'Permanent Spatial Media · 2026'}</div>
              <h1>{isZh ? '中国国家地理·矿晶空间影像' : 'National Geographic — Crystal Landscape'}</h1>
              <p>{isZh
                ? '为酒店大堂与商业空间开发的矿物与晶体主题常设影像。横向主屏、竖向立柱与侧屏采用不同画幅，同一套三维资产、材质与运动系统被重新构图，用于长时间循环播放和后续版本更新。'
                : 'A permanent mineral-and-crystal moving-image system for hospitality and commercial interiors. Horizontal, vertical, and side displays are recomposed from one shared 3D material and motion system for long-duration playback and future updates.'}</p>
            </div>
            <div className="project-hero-media">
              <img src="https://virtura.space/VIRTURA_WEBSITE_ASSETS/02_NATGEO_CRYSTAL/space-lobby.jpg" alt={isZh ? '酒店大堂矿晶空间影像现场' : 'Crystal Landscape installed in a hospitality lobby'} />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container project-two-column">
            <div>
              <div className="eyebrow">{isZh ? '项目信息' : 'Project facts'}</div>
              <FactTable rows={facts[language]} />
            </div>
            <div>
              <div className="eyebrow">{isZh ? '内容系统' : 'Content system'}</div>
              <p className="section-intro">{isZh
                ? '公开项目资料确认的 VIRTURA 团队范围包括矿晶三维内容研发、多画幅编排、非标准屏幕适配、分屏输出与版本管理。个人 Portfolio 保留团队语境，不把团队 scope 自动改写为单人独立完成。'
                : 'Public project material confirms VIRTURA’s team scope across 3D crystal-content development, multi-format composition, custom-screen adaptation, multi-output delivery, and version management. This personal record preserves that team context rather than rewriting the full team scope as solo authorship.'}</p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="editorial-work-heading"><span>{isZh ? '空间与内容' : 'Space and content'}</span><span>06</span></div>
            <div className="project-gallery-grid">
              {media.map(([src, zh, en]) => (
                <article className="project-gallery-card" key={src}>
                  <div className="project-gallery-image"><img src={src} alt={isZh ? zh : en} loading="lazy" /></div>
                  <div className="project-gallery-copy"><h3>{isZh ? zh : en}</h3></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container project-caption-band">
            <div className="eyebrow">{isZh ? '关联档案' : 'Related archive'}</div>
            <div>
              <p>{isZh
                ? '中国国家地理酒店空间数字档案与 CNG 空间漫游是这一项目的记录、浏览与空间验证层，不作为新的独立作品重复出现。'
                : 'The CNG design archive and spatial tour are documentation, browsing, and spatial-validation layers of this project rather than separate portfolio works.'}</p>
              <p><a className="text-link" href="https://github.com/ewanqian/cng-design-archive" target="_blank" rel="noreferrer">Design Archive ↗</a> · <a className="text-link" href="https://github.com/ewanqian/cng-spatial-tour" target="_blank" rel="noreferrer">Spatial Tour ↗</a></p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default NatGeoCrystal
