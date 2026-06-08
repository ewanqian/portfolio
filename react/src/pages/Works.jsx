import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import works from '../data/generated/works'
import { getDisplayImage, getWorkTargetUrl, sortWorksForArchive } from '../data/siteDisplay'

const focusIds = [
  'drop-flow',
  'timer',
  'kashiwa',
  'yujiayun-45ping-visual-2025',
  'rain-singapore-visual-2026',
  'vrplay-hackathon-visual-2025'
]

const lineLabels = {
  'spatial-generation': '空间影像',
  'temporal-structure': '时间结构',
  'collaborative-performance': '现场合作',
  'perceptual-environments': '公共空间',
  'content-infrastructure': '系统研究'
}

function targetFor(work) {
  const target = getWorkTargetUrl(work)
  if (!target || target === '/archive') return '#work-index'
  return target
}

function WorkTile({ work, large = false }) {
  return (
    <a className={`front-work-tile ${large ? 'large' : ''}`} href={targetFor(work)}>
      <img src={getDisplayImage(work)} alt={work.title} loading={large ? 'eager' : 'lazy'} />
      <span>{lineLabels[work.practiceLine] || work.type}</span>
      <h3>{work.title}</h3>
      <p>{work.summary}</p>
    </a>
  )
}

function Works() {
  const orderedWorks = sortWorksForArchive(works)
  const focusWorks = focusIds
    .map((id) => orderedWorks.find((work) => work.id === id))
    .filter(Boolean)
  const restWorks = orderedWorks.filter((work) => !focusIds.includes(work.id))

  return (
    <>
      <main className="frontstage-page works-front">
        <nav className="frontstage-dock" aria-label="作品页导航">
          <Link to="/">首页</Link>
          <Link to="/production">制作</Link>
          <Link to="/archive">归档</Link>
          <Link to="/profile">个人</Link>
        </nav>

        <section className="frontstage-hero">
          <div>
            <span>Works</span>
            <h1>作品 / 现场</h1>
          </div>
          <p>
            主线作品、现场视觉、公共空间和工具研究。
            细节进入项目页。
          </p>
        </section>

        <section className="front-route" aria-label="作品浏览路径">
          <span>浏览路径</span>
          <a href="#focus-works">主线作品</a>
          <a href="#work-index">完整索引</a>
          <Link to="/production">制作合作</Link>
          <Link to="/gaussian-scenes">空间样本</Link>
        </section>

        <section className="front-focus-grid" id="focus-works" aria-label="重点作品">
          {focusWorks.map((work, index) => (
            <WorkTile key={work.id} work={work} large={index === 0} />
          ))}
        </section>

        <section className="front-index" id="work-index" aria-label="完整作品索引">
          <div className="front-index-head">
            <span>{orderedWorks.length} entries</span>
            <h2>完整索引</h2>
          </div>

          <div className="front-index-list">
            {restWorks.map((work) => (
              <a className="front-index-row" href={targetFor(work)} key={work.id}>
                <span>{work.years}</span>
                <strong>{work.title}</strong>
                <em>{lineLabels[work.practiceLine] || work.type}</em>
                <small>{work.summary}</small>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Works
