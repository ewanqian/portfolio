import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import works from '../data/generated/works'
import nodes from '../data/generated/nodes'
import { getDisplayImage, getNodeTargetUrl, getWorkTargetUrl, homeNodeIds, sortNodesForArchive, sortWorksForArchive } from '../data/siteDisplay'
import { productionWorkIds } from '../data/siteTaxonomy'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { localizeNode, localizeWork } from '../i18n/content.js'

const Archive = () => {
  const { language } = useLanguage()
  const productionIdSet = new Set(productionWorkIds)
  const orderedWorks = sortWorksForArchive(works).filter((work) => productionIdSet.has(work.id))
  const orderedNodes = sortNodesForArchive(nodes)
  const featuredNodes = orderedNodes.filter((node) => homeNodeIds.includes(node.id))
  const extendedNodes = orderedNodes.filter((node) => !homeNodeIds.includes(node.id))

  return (
    <>
      <Header />
      <main className="page-archive">
        <section className="section">
          <div className="container">
            <div className="eyebrow">Production Works</div>
            <h1 className="section-title">{language === 'en' ? 'Production Works' : 'Production Works / 制作项目'}</h1>
            <p className="section-intro">
              {language === 'en'
                ? 'Production Works gathers commercial, stage, event, spatial, and delivery-based project records. Gallery remains the selected artwork layer; this page focuses on production context and project delivery.'
                : 'Production Works 整理商业、演出、活动、空间与交付型项目记录。Gallery 保留为作品画廊；这一页更关注制作语境与项目交付。'}
            </p>
            <div className="hero-cta">
              <Link to="/gaussian-scenes" className="button primary">{language === 'en' ? 'Open Spatial Samples' : '查看空间样本'}</Link>
              <Link to="/production" className="button">{language === 'en' ? 'Open Production' : '查看制作'}</Link>
              <Link to="/writing" className="button">{language === 'en' ? 'Open Writing' : '查看写作与研究'}</Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="entry-banner archive-entry-banner">
              <div className="entry-banner-content">
                <h2>{language === 'en' ? 'Spatial Samples' : '空间样本 / Spatial'}</h2>
                <p>{language === 'en' ? 'Team-project spatial translations, independently scanned field samples, and method notes around spatial preservation and web embedding are gathered in this section.' : '团队项目的空间转译样本、个人环境采样，以及空间保存与网页嵌入的方法说明，都集中在这个空间样本栏目里。'}</p>
                <Link to="/gaussian-scenes" className="button primary">{language === 'en' ? 'Open Spatial Samples' : '查看空间样本'}</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">{language === 'en' ? 'Commercial and Delivery Records' : '商业与交付项目'}</h2>
            <p className="section-intro">
              {language === 'en' ? 'These entries are organized as production references: concerts, event visual systems, public-space content, stage visuals, and projects with clear delivery conditions.' : '这些条目作为制作参考整理，包含演唱会、活动视觉系统、公共空间内容、舞台视觉，以及具有明确交付条件的项目。'}
            </p>
            <div className="archive-grid">
              {orderedWorks.map((work) => {
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
