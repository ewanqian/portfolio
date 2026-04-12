import React from 'react'
import { Link } from 'react-router-dom'
import nodes from '../../data/generated/nodes.js'

const nodeLinks = {
  'can-festival': '/works/kashiwa.html',
  'drop-flow-hangzhou-biennale': '/works/drop-flow.html',
  'observation-and-symbiosis': '#/archive',
  'ufo-terminal': '/works/drop-flow.html'
}

const ImageWall = () => {
  return (
    <section className="image-wall">
      <div className="container">
        <div className="section-header">
          <h2>Selected Public Nodes / 公开呈现节点</h2>
          <p>第二圈公开节点和作品证据</p>
        </div>
        
        <div className="image-wall-grid">
          {nodes.map((node) => (
            <div key={node.id} className="image-wall-card">
              <a href={node.externalLink || nodeLinks[node.id] || '#/archive'} className="image-wall-link" target={node.externalLink ? '_blank' : undefined} rel={node.externalLink ? 'noopener noreferrer' : undefined}>
                <div className="image-wall-image">
                  <img src={node.image} alt={node.title} />
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
          ))}
        </div>
        
        <div className="image-wall-footer">
          <Link to="/archive" className="btn btn-primary">
            View Full Archive / 查看完整项目档案
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ImageWall
