import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import selections from '../data/homeV2Selections'

const galleryLead = selections.find((item) => item.id === 'tokyo-tower-garden-still-01')
const galleryItems = selections.filter((item) => item.id !== galleryLead?.id)

const workLines = [
  {
    id: 'gaussian-scenes',
    kicker: 'Gaussian Spatial Archive',
    title: '高斯空间档案',
    summary:
      '以 Tokyo Tower Garden、Shinjuku Greenhouse、Sakura Stage 等扫描材料为核心，整理空间保存、点云查看、扫描流程与网页档案。',
    image: '/portfolio/assets/home-v2-optimized/shinjuku-greenhouse-1600.webp',
    meta: '3DGS / point cloud / spatial archive',
    score: '75–77'
  },
  {
    id: 'drop-flow',
    kicker: 'Drop Flow / drawflow',
    title: 'Drop Flow',
    summary:
      '从 Drop Flow 视觉研究、Rooms719 俯视素材与现场图像中组织数字自然生成的连续线索。',
    image: '/portfolio/assets/home-v2-optimized/dropflow-midstate-1600.webp',
    meta: 'mid-state / 360 record / digital garden',
    score: '71–77'
  },
  {
    id: 'timer',
    kicker: 'TIMER / Loading Access 2',
    title: 'TIMER 控时者',
    summary:
      '将 Loading Access 2 的现场图与 Timer 高斯化研究分开呈现：一个指向展览记录，一个进入空间化测试与时间粒子研究。',
    image: '/portfolio/assets/home-v2-optimized/timer-loading-access-1600.webp',
    meta: 'time structure / exhibition / gaussian test',
    score: '71'
  },
  {
    id: 'kashiwa-terminal',
    kicker: 'Live Visual Collaboration',
    title: 'Kashiwa / TITAN 与 Terminal 合作线',
    summary:
      '把 Kashiwa/TITAN 的 work in progress，与 Robakidz、Shukai、Ewan 的 Terminal 相关现场内容作为合作与现场视觉的同一组证据。',
    image: '/portfolio/assets/home-v2-optimized/kashiwa-lead-1600.webp',
    meta: 'live visual / wip / collaboration',
    score: '66–76'
  }
]

const archiveRows = [
  ['Selected works', '作品入口', '保留 Drop Flow、TIMER、Kashiwa、Gaussian Archive 等主线，减少重复介绍。'],
  ['Gallery', '顶部图像模块', '使用高分素材做视觉入口，同时显示过程截图与最终版成品之间的关系。'],
  ['Practice logic', '实践逻辑', '按“空间扫描 → 现场视觉 → 时间系统 → 合作网络”的顺序阅读。'],
  ['Writing / Archive / Production', '长读与制作', '把外部入口放到页面末尾，避免在首页中反复出现相似 CTA。']
]

function ScorePill({ score }) {
  return <span className="home-v2-score">Score {score}</span>
}

function HomeV2() {
  return (
    <>
      <Header />
      <main className="home-v2-page">
        <section className="home-v2-hero">
          <div className="container home-v2-hero-grid">
            <div className="home-v2-hero-copy">
              <p className="eyebrow">Home V2 Preview / 不替换当前首页</p>
              <h1>钱誉文 / Ewan Qian</h1>
              <p className="home-v2-role">媒体艺术家 / 现场视觉创作者 / 独立制作人</p>
              <p className="home-v2-intro">
                钱誉文的实践从现场音画出发，延伸到空间影像、程序化图像系统、数字场景、扫描档案与长期网页归档。他关注声音、图像、材质、时间和观看位置如何在现场形成清晰结构，也关注作品如何被整理成可以持续阅读的个人系统。
              </p>
              <div className="home-v2-actions">
                <a className="button primary" href="#home-v2-gallery">View Gallery</a>
                <a className="button" href="#home-v2-lines">Work Lines</a>
              </div>
            </div>
            <figure className="home-v2-hero-image">
              <img src={galleryLead.src} alt={galleryLead.titleZh} />
              <figcaption>
                <span>{galleryLead.group}</span>
                <strong>{galleryLead.titleZh}</strong>
                <ScorePill score={galleryLead.score} />
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="home-v2-gallery" className="section home-v2-gallery-section">
          <div className="container">
            <div className="section-heading-row home-v2-heading-row">
              <div>
                <div className="eyebrow">Gallery / scored selections</div>
                <h2 className="section-title">素材精选与页面入口</h2>
              </div>
              <p className="section-intro">
                这一组图像作为顶部 gallery：包含空间过程图、现场记录与成品图像，用来建立项目之间的视觉连续性。
              </p>
            </div>
            <div className="home-v2-gallery-grid">
              {galleryItems.map((item, index) => (
                <article className={`home-v2-gallery-card card-${index + 1}`} key={item.id}>
                  <img src={item.src} alt={item.titleZh} loading="lazy" />
                  <div className="home-v2-gallery-caption">
                    <span>{item.group}</span>
                    <h3>{item.titleZh}</h3>
                    <p>{item.note}</p>
                    <ScorePill score={item.score} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="home-v2-lines" className="section">
          <div className="container">
            <div className="eyebrow">Work Lines</div>
            <h2 className="section-title">按项目线重新整理首页逻辑</h2>
            <p className="section-intro">
              首页不再反复重复“创作实践 / 公开节点 / 实践主线”的相似描述，而是以四条当前最重要的线索组织：高斯空间档案、Drop Flow、TIMER、现场合作。
            </p>
            <div className="home-v2-line-grid">
              {workLines.map((line) => (
                <article className="home-v2-line-card" key={line.id}>
                  <div className="home-v2-line-image">
                    <img src={line.image} alt={line.title} loading="lazy" />
                  </div>
                  <div className="home-v2-line-copy">
                    <span>{line.kicker}</span>
                    <h3>{line.title}</h3>
                    <p>{line.summary}</p>
                    <div className="home-v2-line-meta">
                      <small>{line.meta}</small>
                      <ScorePill score={line.score} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section home-v2-text-standard">
          <div className="container home-v2-text-grid">
            <div>
              <div className="eyebrow">Text Standard</div>
              <h2 className="section-title">统一首页文字标准</h2>
            </div>
            <div className="home-v2-essay">
              <p>
                新版首页采用个人介绍页的写法：先说明身份与实践范围，再进入作品线和材料证据。标题层级控制在可缩放范围内，避免单个中文标题过大造成布局挤压，例如“Drop Flow / 滴流”不再作为超大字号单独占据页面。
              </p>
              <p>
                作品描述使用“工作对象 + 方法 + 展示状态”的结构：例如高斯空间档案说明扫描与查看位置，Drop Flow 连接 Rooms719 与数字自然，TIMER 区分展览记录与空间化研究，合作线保留现场与制作关系。
              </p>
            </div>
          </div>
        </section>

        <section className="section home-v2-archive-map">
          <div className="container">
            <div className="eyebrow">Page Order</div>
            <h2 className="section-title">建议的首页顺序</h2>
            <div className="home-v2-order-list">
              {archiveRows.map(([en, zh, body], index) => (
                <article key={en}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{en} / {zh}</h3>
                    <p>{body}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="home-v2-bottom-links">
              <Link className="button" to="/">Back to current Home</Link>
              <Link className="button" to="/archive">Archive</Link>
              <Link className="button" to="/production">Production</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default HomeV2
