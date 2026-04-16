import React from 'react'
import { Link } from 'react-router-dom'
import nodes from '../../data/generated/nodes.js'
import { getDisplayImage, getNodeTargetUrl, homeNodeIds, sortNodesForArchive } from '../../data/siteDisplay'

const ImageWall = () => {
  const featuredNodes = sortNodesForArchive(nodes).filter((node) => homeNodeIds.includes(node.id))

  return (
    <section id="image-wall" className="image-wall">
      <div className="container">
        <div className="section-header">
          <h2>公开项目节点 / Public Nodes</h2>
          <p>这里不再把所有公开节点重复堆一遍，而是保留最能快速建立判断的几项公开证据。</p>
        </div>
        
        <div className="image-wall-grid">
          {featuredNodes.map((node) => {
            const targetUrl = getNodeTargetUrl(node)

            return (
              <div key={node.id} className="image-wall-card">
                <a href={targetUrl} className="image-wall-link" target={node.externalLink ? '_blank' : undefined} rel={node.externalLink ? 'noopener noreferrer' : undefined}>
                  <div className="image-wall-image">
                    <img src={getDisplayImage(node)} alt={node.title} />
                  </div>
                  <div className="image-wall-overlay">
                    <h3>{node.title}</h3>
                    <div className="image-wall-meta">
                      <span className="year">{node.year}</span>
                      <span className="category">{node.category}</span>
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
            查看档案索引
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ImageWall
