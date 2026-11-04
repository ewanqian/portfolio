import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const media = [
  ['https://virtura.space/VIRTURA_WEBSITE_ASSETS/06_SYSTEM_ERSHA/detail_02_panorama.webp', '空间全景', 'Spatial overview'],
  ['https://virtura.space/VIRTURA_WEBSITE_ASSETS/06_SYSTEM_ERSHA/detail_01_xray.webp', '剖面关系', 'Section study'],
  ['https://virtura.space/VIRTURA_WEBSITE_ASSETS/06_SYSTEM_ERSHA/detail_04_facade.webp', '立面采集', 'Façade capture'],
  ['https://virtura.space/VIRTURA_WEBSITE_ASSETS/06_SYSTEM_ERSHA/detail_06_vertical.webp', '竖向空间', 'Vertical space'],
  ['https://virtura.space/VIRTURA_WEBSITE_ASSETS/06_SYSTEM_ERSHA/detail_03_structure.webp', '多层组织', 'Multi-level structure'],
  ['https://virtura.space/VIRTURA_WEBSITE_ASSETS/06_SYSTEM_ERSHA/process_blender.webp', '点云处理过程', 'Point-cloud processing']
]

const facts = {
  zh: [
    ['年份', '2026'],
    ['地点', '郑州中国第二砂轮厂'],
    ['形式', '空间扫描 / 点云影像 / 建筑空间观察'],
    ['流程', '采集 → 清理 → 分层 → 坐标整理 → 三维重组'],
    ['个人工作', '建筑点云扫描与特效影像'],
    ['项目关系', 'SYSTEM 纪录片影像制作']
  ],
  en: [
    ['Year', '2026'],
    ['Site', 'China Second Grinding Wheel Factory, Zhengzhou'],
    ['Format', 'Spatial scanning / point-cloud media / architectural study'],
    ['Workflow', 'Capture → cleanup → separation → alignment → 3D reconstruction'],
    ['Ewan role', 'Architectural point-cloud scanning and visual effects imagery'],
    ['Production context', 'SYSTEM documentary / moving-image production']
  ]
}

function FactTable({ rows }) {
  return <dl className="project-fact-table">{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
}

function SystemErsha() {
  const { language } = useLanguage()
  const isZh = language === 'zh'

  return (
    <>
      <Header />
      <main className="project-page">
        <section className="project-hero">
          <div className="container project-hero-grid">
            <div className="project-hero-copy">
              <div className="eyebrow">{isZh ? '空间采集 · 2026' : 'Spatial Capture · 2026'}</div>
              <h1>{isZh ? 'SYSTEM × ERSHA 建筑空间扫描' : 'SYSTEM × ERSHA — Spatial Capture'}</h1>
              <p>{isZh
                ? '对郑州中国第二砂轮厂的多层建筑、立面与内部结构进行空间采集。扫描数据经过清理、分层、尺度与坐标整理后重组为三维模型，继续用于空间观察、镜头预演与点云影像制作。'
                : 'A spatial capture of the multi-level architecture, façade, and interior structure of the China Second Grinding Wheel Factory in Zhengzhou. Scan data was cleaned, separated, scaled, and aligned into a working 3D model for spatial study, camera previsualisation, and point-cloud moving image.'}</p>
            </div>
            <div className="project-hero-media">
              <img src="https://virtura.space/VIRTURA_WEBSITE_ASSETS/06_SYSTEM_ERSHA/hero.webp" alt={isZh ? '郑州二砂建筑空间扫描点云' : 'ERSHA architectural point-cloud capture'} />
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
              <div className="eyebrow">{isZh ? '为什么保留' : 'Why it matters'}</div>
              <p className="section-intro">{isZh
                ? '在 SYSTEM 的纪录片制作语境中，我负责建筑点云扫描与特效影像。现场结构经过采集、清理与重组后，既能作为空间资料，也能进入镜头、透视与影像节奏的重新编排。'
                : 'For the SYSTEM documentary production, I worked on architectural point-cloud capture and visual-effects imagery. The collected geometry became both a spatial record and material for camera, perspective and moving-image composition.'}</p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="editorial-work-heading"><span>{isZh ? '扫描与重组' : 'Capture and reconstruction'}</span><span>06</span></div>
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
            <div className="eyebrow">{isZh ? '后续影像' : 'Further image study'}</div>
            <div>
              <p>{isZh
                ? '我计划以扫描空间与自制影像为材料，重新剪辑一部独立的空间影像短片，并为其制作新的声音。这个版本仍在准备中，将与原纪录片区分。'
                : 'A separate spatial-image edit, using selected capture material, newly composed images and an original soundtrack, is in development. It will be presented independently of the documentary.'}</p>
              <a className="text-link" href="https://virtura.space/work/system-ersha.html" target="_blank" rel="noreferrer">{isZh ? '公开项目源 ↗' : 'Public project source ↗'}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default SystemErsha
