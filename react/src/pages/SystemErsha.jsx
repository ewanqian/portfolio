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
    ['形式', '纪录片影像协作 / 空间扫描 / 点云特效'],
    ['流程', '采集 → 清理 → 分层 → 坐标整理 → 三维重组'],
    ['个人工作', '空间点云扫描、三维重建与特效影像'],
    ['合作', 'SYSTEM 影像项目']
  ],
  en: [
    ['Year', '2026'],
    ['Site', 'China Second Grinding Wheel Factory, Zhengzhou'],
    ['Format', 'Documentary media collaboration / spatial scanning / point-cloud VFX'],
    ['Workflow', 'Capture → cleanup → separation → alignment → 3D reconstruction'],
    ['Ewan role', 'Spatial scanning, point-cloud reconstruction and visual effects'],
    ['Collaboration', 'SYSTEM moving-image production']
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
                ? '在 SYSTEM 的影像项目中，我负责郑州二砂厂区的空间点云扫描、三维重建和特效影像。通过处理建筑立面、楼层与内部结构的扫描数据，将真实厂区转化为可以重新运镜和组织画面的数字场景。'
                : 'For a moving-image project with SYSTEM, I worked on spatial point-cloud capture, 3D reconstruction and visual effects at the China Second Grinding Wheel Factory in Zhengzhou. The captured architecture becomes a navigable digital scene for renewed camera movement and moving-image composition.'}</p>
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
              <div className="eyebrow">{isZh ? '影像制作' : 'Moving-image production'}</div>
              <p className="section-intro">{isZh
                ? '扫描数据经过清理、分层与坐标整理后，建筑的真实比例和空间关系被保留在点云模型中。镜头可以穿过厂房、剖开楼层、重新安排观察路径，使记录性的现场空间转化为具有运动感的影像。'
                : 'Captured data is cleaned, separated and aligned to preserve the site’s scale and spatial relationships. Camera movement can pass through the factory, reveal building sections and reorganise the viewing path, turning documentation into moving image.'}</p>
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
            <div className="eyebrow">{isZh ? '后续影像' : 'Further moving-image study'}</div>
            <div>
              <p>{isZh
                ? '我计划基于已有空间模型重新剪辑一段个人影像，并创作新的配乐。新版本将把注意力从纪录片叙述转向厂房本身的结构、尺度与运动，以原创镜头重新演绎这处工业空间。'
                : 'I am developing a separately edited moving-image study with new music, using the reconstructed spatial model as a source for original camera movement. The study will focus on the factory’s structure, scale and motion rather than reproducing the documentary edit.'}</p>
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
