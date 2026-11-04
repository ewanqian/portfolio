import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const prefix = 'https://virtura.space/VIRTURA_WEBSITE_ASSETS/01_AI_GALA/'
const media = [
  ['detail_01_mapping.jpg', '机械臂与盒体结构', 'Robotic arm and box-stage structure'],
  ['detail_02_ai-figure.jpg', '人形机器人影像', 'Robotic figure'],
  ['detail_05_robot-light.webp', '机器人与空间光线', 'Robot figure and spatial light'],
  ['detail_04_final-stage.jpg', '开场秀舞台画面', 'Opening-show stage view']
]

const facts = {
  zh: [
    ['项目', '中国·AI盛典「AI在一起」开场秀'],
    ['年份', '2026'],
    ['形式', '盒体舞台影像 / 三维场景 / 透视映射'],
    ['制作语境', 'VIRTURA 合作项目'],
    ['钱誉文 / Ewan Qian', '舞台影像与视觉制作参与']
  ],
  en: [
    ['Project', 'China AI Gala — AI Together Opening Show'],
    ['Year', '2026'],
    ['Format', 'Box-stage visuals / 3D environments / perspective mapping'],
    ['Production context', 'VIRTURA collaborative production'],
    ['Ewan Qian', 'Stage-image / visual-production contribution']
  ]
}

function ChinaAIGala() {
  const { language } = useLanguage()
  const isZh = language === 'zh'

  return (
    <>
      <Header />
      <main className="project-page">
        <section className="project-hero">
          <div className="container project-hero-grid">
            <div className="project-hero-copy">
              <div className="eyebrow">{isZh ? '开场秀影像 · 2026' : 'Opening Show Visuals · 2026'}</div>
              <h1>{isZh ? '中国·AI盛典「AI在一起」' : 'China AI Gala — AI Together'}</h1>
              <p>{isZh
                ? '为大型盒体舞台组织机械结构、机器人角色与三维影像。制作围绕主观看位建立透视和屏幕映射，并以连续的镜头与转场完成开场段落。'
                : 'Robotic structures, figure imagery and three-dimensional environments form an opening sequence for a box-shaped LED stage. Perspective mapping is developed around the primary audience view.'}</p>
            </div>
            <div className="project-hero-media">
              <img src={prefix + 'detail_01_mapping.jpg'} alt={isZh ? '机械臂与盒体舞台的空间视觉画面' : 'Robotic arm inside a mapped box-stage visual'} />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container project-two-column">
            <div>
              <div className="eyebrow">{isZh ? '项目资料' : 'Project facts'}</div>
              <dl className="project-fact-table">
                {facts[language].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
              </dl>
            </div>
            <div>
              <div className="eyebrow">{isZh ? '空间映射' : 'Spatial mapping'}</div>
              <p className="section-intro">{isZh
                ? '画面首先与舞台几何对齐：盒体边界、中心开口、主观看位和内容安全区在预演中被确定，随后再展开角色、机械结构与镜头运动。'
                : 'Screen geometry comes first. Box boundaries, the central opening, the primary sightline and safe content areas are established in previsualisation before building figure imagery, mechanical forms and camera movement.'}</p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="editorial-work-heading"><span>{isZh ? '影像与舞台' : 'Stage and imagery'}</span><span>04</span></div>
            <div className="project-gallery-grid">
              {media.map(([filename, zh, en]) => (
                <article className="project-gallery-card" key={filename}>
                  <div className="project-gallery-image"><img src={prefix + filename} alt={isZh ? zh : en} loading="lazy" /></div>
                  <div className="project-gallery-copy"><h3>{isZh ? zh : en}</h3></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container project-caption-band">
            <div className="eyebrow">{isZh ? '项目来源' : 'Project source'}</div>
            <div>
              <p>{isZh
                ? '图片与项目资料来自 VIRTURA 对外公开的《中国·AI盛典「AI在一起」》开场秀记录。'
                : 'Selected images and project information are drawn from VIRTURA’s published China AI Gala opening-show documentation.'}</p>
              <a className="text-link" href="https://virtura.space/work/ai-gala.html" target="_blank" rel="noreferrer">{isZh ? 'VIRTURA 项目页 ↗' : 'VIRTURA project page ↗'}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default ChinaAIGala
