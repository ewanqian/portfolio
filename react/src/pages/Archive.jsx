import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import works from '../data/generated/works'
import nodes from '../data/generated/nodes'
import { getDisplayImage, getNodeTargetUrl, getWorkTargetUrl, homeNodeIds, sortNodesForArchive, sortWorksForArchive } from '../data/siteDisplay'

const Archive = () => {
  const orderedWorks = sortWorksForArchive(works)
  const featuredWorks = orderedWorks.filter((work) => work.showOnHome)
  const extendedWorks = orderedWorks.filter((work) => !work.showOnHome)
  const orderedNodes = sortNodesForArchive(nodes)
  const featuredNodes = orderedNodes.filter((node) => homeNodeIds.includes(node.id))
  const extendedNodes = orderedNodes.filter((node) => !homeNodeIds.includes(node.id))

  return (
    <>
      <Header />
      <main className="page-archive">
        <section className="section">
          <div className="container">
            <div className="eyebrow">Archive</div>
            <h1 className="section-title">档案索引 / Archive</h1>
            <p className="section-intro">
              这一页不再和首页重复做筛选，而是把当前对外可读的作品、公开节点和空间样本拆成几层来读。
              更深层的对象沉淀与补录材料仍保留在 `database/` 与 `projects/` 层。
            </p>
            <div className="hero-cta">
              <Link to="/gaussian-scenes" className="button primary">查看空间样本</Link>
              <Link to="/production" className="button">查看合作方式</Link>
              <Link to="/writing" className="button">查看写作与研究</Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="entry-banner archive-entry-banner">
              <div className="entry-banner-content">
                <h2>空间样本子库 / Gaussian Archive</h2>
                <p>团队项目的空间转译样本、个人环境采样档案，以及空间保存与网页嵌入的方法说明，都集中在这个子栏目里。</p>
                <Link to="/gaussian-scenes" className="button primary">查看空间样本</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">优先作品入口 / Primary Works</h2>
            <p className="section-intro">
              这里先保留最值得优先进入的三项核心作品，它们对应时间结构、空间生成与合作现场三条最重要的公开主线。
            </p>
            <div className="archive-grid">
              {featuredWorks.map((work) => (
                <article key={work.id} className="archive-item">
                  <div className="archive-item-image">
                    <img src={getDisplayImage(work)} alt={work.title} />
                  </div>
                  <div className="archive-item-content">
                    <h3>{work.title}</h3>
                    <p className="archive-item-years">{work.years}</p>
                    <p>{work.summary}</p>
                    <div className="archive-item-actions">
                      <a href={getWorkTargetUrl(work)} className="button">查看详情</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">扩展作品档案 / Extended Works</h2>
            <p className="section-intro">
              这一层补足系列分支、展览节点、实验阶段和较新的扩展条目，适合在已经建立基本判断之后继续往下读。
            </p>
            <div className="archive-grid">
              {extendedWorks.map((work) => (
                <article key={work.id} className="archive-item">
                  <div className="archive-item-image">
                    <img src={getDisplayImage(work)} alt={work.title} />
                  </div>
                  <div className="archive-item-content">
                    <h3>{work.title}</h3>
                    <p className="archive-item-years">{work.years}</p>
                    <p className="archive-item-category">{work.subtitle}</p>
                    <p>{work.summary}</p>
                    <div className="archive-item-actions">
                      <a href={getWorkTargetUrl(work)} className="button">查看详情</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">核心公开节点 / Key Public Nodes</h2>
            <p className="section-intro">
              这些条目是作品之外最重要的公开证据，帮助外部读者快速理解这套实践如何进入展览、演出与公共空间。
            </p>
            <div className="archive-grid">
              {featuredNodes.map((node) => (
                <article key={node.id} className="archive-item">
                  <div className="archive-item-image">
                    <img src={getDisplayImage(node)} alt={node.title} />
                  </div>
                  <div className="archive-item-content">
                    <h3>{node.title}</h3>
                    <p className="archive-item-years">{node.year}</p>
                    <p className="archive-item-category">{node.category}</p>
                    <p>{node.summary}</p>
                    <div className="archive-item-actions">
                      <a href={getNodeTargetUrl(node)} className="button" target={node.externalLink ? '_blank' : undefined} rel={node.externalLink ? 'noreferrer' : undefined}>
                        查看记录
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">扩展公开记录 / Extended Public Records</h2>
            <p className="section-intro">
              这些条目补上同一研究线在不同城市、不同展览语境和不同公开阶段里的延展版本。
            </p>
            <div className="archive-grid">
              {extendedNodes.map((node) => (
                <article key={node.id} className="archive-item">
                  <div className="archive-item-image">
                    <img src={getDisplayImage(node)} alt={node.title} />
                  </div>
                  <div className="archive-item-content">
                    <h3>{node.title}</h3>
                    <p className="archive-item-years">{node.year}</p>
                    <p className="archive-item-category">{node.category}</p>
                    <p>{node.summary}</p>
                    <div className="archive-item-actions">
                      <a href={getNodeTargetUrl(node)} className="button" target={node.externalLink ? '_blank' : undefined} rel={node.externalLink ? 'noreferrer' : undefined}>
                        查看记录
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Archive
