import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import works from '../data/generated/works'
import nodes from '../data/generated/nodes'
import {
  getDisplayImage,
  getNodeTargetUrl,
  getWorkTargetUrl,
  sortNodesForArchive,
  sortWorksForArchive
} from '../data/siteDisplay'

const dockItems = [
  { label: '首页', to: '/' },
  { label: '作品', to: '/works' },
  { label: '制作', to: '/production' },
  { label: '个人', to: '/profile' }
]

const featuredIds = new Set([
  'drop-flow',
  'timer',
  'kashiwa-bo-live-shenzhen',
  'yujiayun-45ping-visual-2025',
  'rain-singapore-visual-2026',
  'timer-loading-access-2-2024'
])

function getYear(item) {
  return item.years || item.year || 'Ongoing'
}

function Archive() {
  const orderedWorks = sortWorksForArchive(works)
  const orderedNodes = sortNodesForArchive(nodes)
  const featuredWorks = orderedWorks.filter((work) => featuredIds.has(work.id)).slice(0, 6)
  const years = orderedWorks
    .map((work) => String(getYear(work)).match(/\d{4}/)?.[0])
    .filter(Boolean)
    .map(Number)
  const yearRange = years.length ? `${Math.min(...years)}-${Math.max(...years)}` : '2022-2026'

  return (
    <>
      <main className="frontstage-page archive-front">
        <nav className="frontstage-dock" aria-label="主导航">
          {dockItems.map((item) => (
            <Link to={item.to} key={item.label}>{item.label}</Link>
          ))}
        </nav>

        <section className="frontstage-hero">
          <div>
            <span>Archive</span>
            <h1>完整归档</h1>
          </div>
          <p>
            这里按时间、项目类型和呈现语境收拢全部条目。首页只负责导览，详细说明进入作品页、制作页和空间页。
          </p>
        </section>

        <section className="front-route" aria-label="归档浏览路径">
          <span>浏览路径</span>
          <a href="#archive-overview">概览</a>
          <a href="#archive-featured">重点条目</a>
          <a href="#archive-works">作品记录</a>
          <a href="#archive-context">呈现节点</a>
        </section>

        <section className="front-summary-grid" id="archive-overview" aria-label="归档概览">
          <article>
            <span>Works</span>
            <strong>{orderedWorks.length}</strong>
            <p>作品、制作记录与长期实践线。</p>
          </article>
          <article>
            <span>Nodes</span>
            <strong>{orderedNodes.length}</strong>
            <p>展演、现场与公共呈现语境。</p>
          </article>
          <article>
            <span>Years</span>
            <strong>{yearRange}</strong>
            <p>从早期项目到当前正在展开的现场视觉系统。</p>
          </article>
        </section>

        <section className="front-focus-grid archive-featured" id="archive-featured" aria-label="重点条目">
          {featuredWorks.map((work, index) => (
            <a
              className={`front-work-tile ${index === 0 ? 'large' : ''}`}
              href={getWorkTargetUrl(work)}
              key={work.id}
            >
              <img src={getDisplayImage(work)} alt={work.title} loading="lazy" />
              <span>{getYear(work)} / {work.type || work.category || 'Work'}</span>
              <h3>{work.title}</h3>
              <p>{work.summary}</p>
            </a>
          ))}
        </section>

        <section className="front-index archive-index" id="archive-works" aria-label="完整列表">
          <div className="front-index-head">
            <div>
              <span>Index</span>
              <h2>作品与制作记录</h2>
            </div>
            <p>短列表用于快速定位。背景、图册、署名与制作范围进入项目详情。</p>
          </div>

          <div className="front-index-list">
            {orderedWorks.map((work) => (
              <a className="front-index-row archive-row" href={getWorkTargetUrl(work)} key={work.id}>
                <em>{getYear(work)}</em>
                <strong>{work.title}</strong>
                <span>{work.type || work.category || 'Work'}</span>
                <small>{work.summary}</small>
              </a>
            ))}
          </div>
        </section>

        <section className="front-index archive-index" id="archive-context" aria-label="呈现节点">
          <div className="front-index-head">
            <div>
              <span>Context</span>
              <h2>呈现节点</h2>
            </div>
            <p>这些条目帮助理解作品进入场地、活动和公共语境的方式。</p>
          </div>

          <div className="front-index-list">
            {orderedNodes.map((node) => (
              <a className="front-index-row archive-row" href={getNodeTargetUrl(node)} key={node.id}>
                <em>{node.year || 'Node'}</em>
                <strong>{node.title}</strong>
                <span>{node.category || node.type || 'Context'}</span>
                <small>{node.summary}</small>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Archive
