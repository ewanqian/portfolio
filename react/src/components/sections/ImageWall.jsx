import React from 'react'
import { Link } from 'react-router-dom'
import nodes from '../../data/generated/nodes.js'
import { getDisplayImage, getNodeTargetUrl, homeNodeIds, sortNodesForArchive } from '../../data/siteDisplay'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { localizeNode } from '../../i18n/content.js'

const ImageWall = () => {
  const { language } = useLanguage()
  const featuredNodes = sortNodesForArchive(nodes).filter((node) => homeNodeIds.includes(node.id))

  return (
    <section id="image-wall" className="image-wall">
      <div className="container">
        <div className="section-header">
          <h2>{language === 'en' ? 'Public Nodes' : '公开项目节点'}</h2>
          <p>{language === 'en' ? 'Instead of repeating every public node, this section keeps only the public-facing evidence that most quickly helps a reader form a judgment.' : '这里不再把所有公开节点重复堆一遍，而是保留最能快速建立判断的几项公开证据。'}</p>
        </div>
        
        <div className="image-wall-grid">
          {featuredNodes.map((node) => {
            const targetUrl = getNodeTargetUrl(node)
            const localizedNode = localizeNode(node, language)

            return (
              <div key={node.id} className="image-wall-card">
                <a href={targetUrl} className="image-wall-link" target={node.externalLink ? '_blank' : undefined} rel={node.externalLink ? 'noopener noreferrer' : undefined}>
                  <div className="image-wall-image">
                    <img src={getDisplayImage(node)} alt={localizedNode.title} />
                  </div>
                  <div className="image-wall-overlay">
                    <h3>{localizedNode.title}</h3>
                    <div className="image-wall-meta">
                      <span className="year">{localizedNode.year}</span>
                      <span className="category">{localizedNode.category}</span>
                    </div>
                  </div>
                </a>
                {node.externalLink && (
                  <a href={node.externalLink} className="image-wall-external" target="_blank" rel="noopener noreferrer">
                    External ↗
                  </a>
                )}
              </div>
            )
          })}
        </div>
        
        <div className="image-wall-footer">
          <Link to="/archive" className="btn btn-primary">
            {language === 'en' ? 'Open Archive Index' : '查看档案索引'}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ImageWall
