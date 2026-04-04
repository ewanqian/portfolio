import React from 'react'
import publicNodes from '../../data/publicNodes.js'

const ImageWall = () => {
  return (
    <section className="image-wall">
      <div className="container">
        <div className="section-header">
          <h2>Selected Public Nodes / 公开呈现节点</h2>
          <p>第二圈公开节点和作品证据</p>
        </div>
        
        <div className="image-wall-grid">
          {publicNodes.map((node) => (
            <div key={node.id} className="image-wall-card">
              <a href={node.href} className="image-wall-link">
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
              {node.externalHref && (
                <a href={node.externalHref} className="image-wall-external" target="_blank" rel="noopener noreferrer">
                  External ↗
                </a>
              )}
            </div>
          ))}
        </div>
        
        <div className="image-wall-footer">
          <a href="#" className="btn btn-primary">
            View Full Archive / 查看完整项目档案
          </a>
        </div>
      </div>
    </section>
  )
}

export default ImageWall
