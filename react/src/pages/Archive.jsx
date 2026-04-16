import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import works from '../data/generated/works'
import nodes from '../data/generated/nodes'
import { getDisplayImage, getNodeTargetUrl, getWorkTargetUrl, homeNodeIds, sortNodesForArchive, sortWorksForArchive } from '../data/siteDisplay'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { localizeNode, localizeWork } from '../i18n/content.js'

const Archive = () => {
  const { language } = useLanguage()
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
            <h1 className="section-title">{language === 'en' ? 'Archive Index' : '档案索引 / Archive'}</h1>
            <p className="section-intro">
              {language === 'en'
                ? 'This page no longer repeats the homepage selection. Instead, it breaks the public-facing site into readable layers of works, nodes, and spatial samples. Deeper objectization and backfill materials remain in the database and projects layers.'
                : '这一页不再和首页重复做筛选，而是把当前对外可读的作品、公开节点和空间样本拆成几层来读。更深层的对象沉淀与补录材料仍保留在 `database/` 与 `projects/` 层。'}
            </p>
            <div className="hero-cta">
              <Link to="/gaussian-scenes" className="button primary">{language === 'en' ? 'Open Spatial Samples' : '查看空间样本'}</Link>
              <Link to="/production" className="button">{language === 'en' ? 'Open Production' : '查看合作方式'}</Link>
              <Link to="/writing" className="button">{language === 'en' ? 'Open Writing' : '查看写作与研究'}</Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="entry-banner archive-entry-banner">
              <div className="entry-banner-content">
                <h2>{language === 'en' ? 'Gaussian Archive' : '空间样本子库 / Gaussian Archive'}</h2>
                <p>{language === 'en' ? 'Team-project spatial translations, independently scanned field archives, and the method notes around spatial preservation and web embedding are gathered in this sub-section.' : '团队项目的空间转译样本、个人环境采样档案，以及空间保存与网页嵌入的方法说明，都集中在这个子栏目里。'}</p>
                <Link to="/gaussian-scenes" className="button primary">{language === 'en' ? 'Open Spatial Samples' : '查看空间样本'}</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">{language === 'en' ? 'Primary Works' : '优先作品入口 / Primary Works'}</h2>
            <p className="section-intro">
              {language === 'en' ? 'This layer keeps the three most important entry works. Together they map the public-facing lines of temporal structure, spatial generation, and live collaboration.' : '这里先保留最值得优先进入的三项核心作品，它们对应时间结构、空间生成与合作现场三条最重要的公开主线。'}
            </p>
            <div className="archive-grid">
              {featuredWorks.map((work) => {
                const localizedWork = localizeWork(work, language)

                return (
                  <article key={work.id} className="archive-item">
                    <div className="archive-item-image">
                      <img src={getDisplayImage(work)} alt={localizedWork.title} />
                    </div>
                    <div className="archive-item-content">
                      <h3>{localizedWork.title}</h3>
                      <p className="archive-item-years">{localizedWork.years}</p>
                      <p>{localizedWork.summary}</p>
                      <div className="archive-item-actions">
                        <a href={getWorkTargetUrl(work)} className="button">{language === 'en' ? 'Open Detail' : '查看详情'}</a>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">{language === 'en' ? 'Extended Work Records' : '扩展作品档案 / Extended Works'}</h2>
            <p className="section-intro">
              {language === 'en' ? 'This layer fills in branches, exhibition nodes, experimental phases, and newer entries once the main judgment is already in place.' : '这一层补足系列分支、展览节点、实验阶段和较新的扩展条目，适合在已经建立基本判断之后继续往下读。'}
            </p>
            <div className="archive-grid">
              {extendedWorks.map((work) => {
                const localizedWork = localizeWork(work, language)

                return (
                  <article key={work.id} className="archive-item">
                    <div className="archive-item-image">
                      <img src={getDisplayImage(work)} alt={localizedWork.title} />
                    </div>
                    <div className="archive-item-content">
                      <h3>{localizedWork.title}</h3>
                      <p className="archive-item-years">{localizedWork.years}</p>
                      <p className="archive-item-category">{localizedWork.subtitle}</p>
                      <p>{localizedWork.summary}</p>
                      <div className="archive-item-actions">
                        <a href={getWorkTargetUrl(work)} className="button">{language === 'en' ? 'Open Detail' : '查看详情'}</a>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">{language === 'en' ? 'Key Public Nodes' : '核心公开节点 / Key Public Nodes'}</h2>
            <p className="section-intro">
              {language === 'en' ? 'These entries are the most important public-facing evidence beyond the works themselves, showing how the practice enters exhibitions, performances, and public space.' : '这些条目是作品之外最重要的公开证据，帮助外部读者快速理解这套实践如何进入展览、演出与公共空间。'}
            </p>
            <div className="archive-grid">
              {featuredNodes.map((node) => {
                const localizedNode = localizeNode(node, language)

                return (
                  <article key={node.id} className="archive-item">
                    <div className="archive-item-image">
                      <img src={getDisplayImage(node)} alt={localizedNode.title} />
                    </div>
                    <div className="archive-item-content">
                      <h3>{localizedNode.title}</h3>
                      <p className="archive-item-years">{localizedNode.year}</p>
                      <p className="archive-item-category">{localizedNode.category}</p>
                      <p>{localizedNode.summary}</p>
                      <div className="archive-item-actions">
                        <a href={getNodeTargetUrl(node)} className="button" target={node.externalLink ? '_blank' : undefined} rel={node.externalLink ? 'noreferrer' : undefined}>
                          {language === 'en' ? 'Open Record' : '查看记录'}
                        </a>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">{language === 'en' ? 'Extended Public Records' : '扩展公开记录 / Extended Public Records'}</h2>
            <p className="section-intro">
              {language === 'en' ? 'These entries fill in how the same research lines appear across different cities, exhibition settings, and public phases.' : '这些条目补上同一研究线在不同城市、不同展览语境和不同公开阶段里的延展版本。'}
            </p>
            <div className="archive-grid">
              {extendedNodes.map((node) => {
                const localizedNode = localizeNode(node, language)

                return (
                  <article key={node.id} className="archive-item">
                    <div className="archive-item-image">
                      <img src={getDisplayImage(node)} alt={localizedNode.title} />
                    </div>
                    <div className="archive-item-content">
                      <h3>{localizedNode.title}</h3>
                      <p className="archive-item-years">{localizedNode.year}</p>
                      <p className="archive-item-category">{localizedNode.category}</p>
                      <p>{localizedNode.summary}</p>
                      <div className="archive-item-actions">
                        <a href={getNodeTargetUrl(node)} className="button" target={node.externalLink ? '_blank' : undefined} rel={node.externalLink ? 'noreferrer' : undefined}>
                          {language === 'en' ? 'Open Record' : '查看记录'}
                        </a>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Archive
