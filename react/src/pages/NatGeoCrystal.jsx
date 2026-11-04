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
    ['个人工作', '矿晶影像设计、多屏视觉制作、酒店及体验中心三维采集']
  ],
  en: [
    ['Year', '2026'],
    ['Context', 'Hospitality lobby and commercial interiors'],
    ['Format', 'Permanent multi-screen spatial media'],
    ['Canvases', 'Horizontal main screen / vertical columns / side displays'],
    ['Team context', 'VIRTURA'],
    ['Ewan role', 'Crystal-image design, multi-screen visual production, 3D site capture']
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
                ? '为中国国家地理酒店制作矿晶主题空间影像。我负责影像设计与多屏视觉制作，并参与酒店及体验中心的三维扫描采集。影像以晶体材质和动态构成为基础，分别适配主屏、立柱与侧屏。'
                : 'Crystal-themed spatial media for a National Geographic hospitality environment. My work includes moving-image design and multi-screen visual production, alongside 3D capture of the hotel and experience-centre spaces. The moving images are recomposed for the main, column and side displays.'}</p>
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
                ? '矿晶三维内容以材质、光线、运动与画面节奏为基础，在横向主屏、立柱屏与侧屏之间形成统一的空间体验。另一条制作线记录酒店与体验中心的公共区域，通过全景图像、局部模型及区域索引提供可浏览的数字空间档案。'
                : 'Crystal materials, light, motion and pacing are developed as one system across the main, column and side displays. A parallel capture workflow records the hotel and experience-centre public areas through panoramic views, a partial 3D model and a navigable spatial archive.'}</p>
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
                ? '空间数字档案保存了公共区域影像与展项索引；CNG 空间漫游另记录了八个区域、二十七个全景视点，并保留局部大堂模型。两种查看方式继续连接同一个空间项目。'
                : 'The design archive holds selected public-space views and exhibition information. The CNG spatial tour records eight areas and 27 panoramic viewpoints, with a partial lobby model. Both remain connected to the same spatial-media project.'}</p>
              <p><a className="text-link" href="https://github.com/ewanqian/cng-design-archive" target="_blank" rel="noreferrer">Design Archive ↗</a> · <a className="text-link" href="https://github.com/ewanqian/cng-spatial-tour" target="_blank" rel="noreferrer">Spatial Tour / Source ↗</a></p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default NatGeoCrystal
