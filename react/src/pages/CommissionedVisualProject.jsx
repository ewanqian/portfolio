import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const projects = {
  xtep: {
    eyebrow: { zh: '制作合作 / 舞台影像', en: 'Selected Collaboration / Stage Visual' },
    title: {
      zh: 'XTEP XDNA — 上海时装周，2022 年 9 月',
      en: 'XTEP XDNA — Shanghai Fashion Week, September 2022'
    },
    intro: {
      zh: '为 XTEP XDNA 的上海时装周发布制作开场影像与部分单元视频，并完成屏幕内容交付和现场投影适配。影像沿多组悬挂屏幕与地面投影展开，使动态内容进入秀场的纵深和行进路径。',
      en: "For XTEP XDNA's Shanghai Fashion Week presentation, Ewan created the opening film and selected visual segments, and supported screen-ready delivery and on-site projection adaptation. The moving image extended across suspended screens and floor projection, entering the runway's depth and circulation path."
    },
    facts: {
      zh: [
        ['时间', '2022 年 9 月'],
        ['地点', '上海时装周 / 上海'],
        ['类型', '委托舞台影像'],
        ['角色', '视觉制作与工程交付'],
        ['工作范围', '开场影像、部分单元视频、屏幕内容交付、现场投影适配']
      ],
      en: [
        ['Date', 'September 2022'],
        ['Context', 'Shanghai Fashion Week / Shanghai'],
        ['Type', 'Commissioned stage visual'],
        ['Role', 'Visual production and technical delivery'],
        ['Scope', 'Opening film, selected visual segments, screen delivery, on-site projection adaptation']
      ]
    },
    role: {
      zh: '工作集中在动态影像内容与现场屏幕结构之间的衔接：为开场及部分单元制作视频，并根据悬挂屏、主屏与地面投影的关系完成输出和适配。',
      en: 'The work focused on connecting moving-image content to the site-specific screen structure: producing the opening and selected segments, then adapting the output across suspended displays, the main screen, and floor projection.'
    },
    hero: '/portfolio/assets/xtep-xdna/xtep-selected-01.webp',
    gallery: [1, 2, 3, 4, 5].map((index) => ({
      src: index === 4
        ? '/portfolio/assets/xtep-xdna/xtep-selected-04-v2.webp'
        : `/portfolio/assets/xtep-xdna/xtep-selected-0${index}.webp`,
      alt: {
        zh: `XTEP XDNA 上海时装周现场画面 ${index}`,
        en: `XTEP XDNA Shanghai Fashion Week site view ${index}`
      }
    }))
  },
  zcool: {
    eyebrow: { zh: '制作合作 / 实时音画', en: 'Selected Collaboration / Live Audiovisual' },
    title: {
      zh: '站酷 2021 CUBE 设计大会 — HP G8 工作站发布会',
      en: 'ZCOOL CUBE 2021 — HP G8 Workstation Launch'
    },
    intro: {
      zh: '在站酷 2021 CUBE 设计大会 HP G8 工作站发布会上，钱誉文参与实时音画互动表演的视觉制作与现场呈现。舞台画面与现场操作共同构成演出的视觉层。',
      en: 'At the ZCOOL CUBE 2021 HP G8 Workstation launch, Ewan developed and presented visuals for a realtime audiovisual performance. Stage imagery and live operation formed the visual layer of the presentation.'
    },
    facts: {
      zh: [
        ['时间', '2021 年 9 月'],
        ['地点', '北京'],
        ['场合', '站酷 CUBE 设计大会 / HP G8 工作站发布会'],
        ['类型', '实时音画 / 产品发布'],
        ['角色', '视觉制作']
      ],
      en: [
        ['Date', 'September 2021'],
        ['Location', 'Beijing'],
        ['Context', 'ZCOOL CUBE Design Conference / HP G8 Workstation Launch'],
        ['Type', 'Realtime audiovisual / product launch'],
        ['Role', 'Visual production']
      ]
    },
    role: {
      zh: '视觉工作服务于实时音画互动表演，包含现场画面的制作、组织与演出呈现。实时操作使图像的纹理、密度与变化节奏进入发布会的舞台结构。',
      en: 'The visual work supported a realtime audiovisual performance through image production, organization, and live presentation. Live operation brought changing image texture, density, and pacing into the structure of the stage.'
    },
    hero: '/portfolio/assets/zcool-hp-g8/zcool-hp-g8-live-collage.webp',
    gallery: [
      {
        src: '/portfolio/assets/zcool-hp-g8/zcool-hp-g8-live-collage.webp',
        alt: {
          zh: '站酷 CUBE 设计大会 HP G8 工作站发布会实时音画表演现场',
          en: 'Realtime audiovisual performance at the ZCOOL CUBE HP G8 Workstation launch'
        }
      }
    ]
  }
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

function CommissionedVisualProject({ projectId }) {
  const { language } = useLanguage()
  const project = projects[projectId]
  const isZh = language === 'zh'

  return (
    <>
      <Header />
      <main className="project-page">
        <section className="project-hero">
          <div className="container project-hero-grid">
            <div className="project-hero-copy">
              <div className="eyebrow">{project.eyebrow[language]}</div>
              <h1>{project.title[language]}</h1>
              <p>{project.intro[language]}</p>
            </div>
            <div className="project-hero-media">
              <img src={project.hero} alt={project.title[language]} />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container project-two-column">
            <div>
              <h2 className="section-title">{isZh ? '项目信息' : 'Project Facts'}</h2>
              <FactTable rows={project.facts[language]} />
            </div>
            <div>
              <h2 className="section-title">{isZh ? '我的工作' : 'My Role'}</h2>
              <p className="project-role-copy">{project.role[language]}</p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="eyebrow">{isZh ? '现场记录' : 'Site Documentation'}</div>
            <h2 className="section-title">{isZh ? '屏幕、舞台与观看关系' : 'Screens, Stage, and Viewing Relations'}</h2>
            <div className={`project-documentation-grid ${project.gallery.length === 1 ? 'single' : ''}`.trim()}>
              {project.gallery.map((item) => (
                <figure key={item.src}>
                  <img src={item.src} alt={item.alt[language]} loading="lazy" />
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default CommissionedVisualProject
