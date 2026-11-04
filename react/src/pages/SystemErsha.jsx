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
    ['钱誉文 / Ewan Qian', '空间扫描、点云处理与特效影像制作'],
    ['项目语境', 'SYSTEM 纪录影像合作 / 郑州二砂']
  ],
  en: [
    ['Year', '2026'],
    ['Site', 'China Second Grinding Wheel Factory, Zhengzhou'],
    ['Format', 'Spatial scanning / point-cloud media / architectural study'],
    ['Workflow', 'Capture → cleanup → separation → alignment → 3D reconstruction'],
    ['Ewan Qian', 'Spatial scanning, point-cloud processing and VFX moving image'],
    ['Project context', 'SYSTEM documentary-image production / ERSHA']
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
              <div className="eyebrow">{isZh ? 'Point Cloud Factory' : 'Point Cloud Factory'}</div>
              <p className="section-intro">{isZh
                ? '建筑在扫描后被拆解为可移动的空间层：立面、楼层与内部结构重新成为镜头路径和影像构图的一部分。点云既保存了现场比例，也提供了进一步进行特效影像创作的材料。'
                : 'After scanning, façades, floors and interior structures become movable spatial layers. The resulting point cloud preserves the site's proportions while offering material for camera movement and VFX imagery.'}</p>
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
            <div className="eyebrow">{isZh ? '空间再演绎' : 'Spatial reinterpretation'}</div>
            <div>
              <p>{isZh
                ? '我计划使用这些空间扫描素材制作个人剪辑和重新配乐的影像版本，从原有纪录片中抽离建筑结构与运动轨迹，重新组织观看节奏。该版本仍在制作筹备中。'
                : 'A personal re-edited and re-scored version is planned, focusing on the building’s spatial structure and camera movement rather than reproducing the documentary cut. This edition is not yet released.'}</p>
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
