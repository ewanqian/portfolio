import React, { useState } from 'react'
import practiceMap from '../../data/practiceMap.js'

const PracticeMap = () => {
  const [expandedNode, setExpandedNode] = useState(null)

  const toggleNode = (nodeId) => {
    setExpandedNode(expandedNode === nodeId ? null : nodeId)
  }

  return (
    <section className="practice-map">
      <div className="container">
        <div className="section-header">
          <h2>{practiceMap.title}</h2>
          <p>{practiceMap.introduction}</p>
        </div>
        
        <div className="practice-map-grid">
          {practiceMap.nodes.map((node) => (
            <div key={node.id} className="practice-map-node">
              <div 
                className="practice-map-node-header" 
                onClick={() => toggleNode(node.id)}
              >
                <h3>{node.title}</h3>
                <p className="subtitle">{node.subtitle}</p>
                <div className="expand-icon">
                  {expandedNode === node.id ? '−' : '+'}
                </div>
              </div>
              
              {expandedNode === node.id && (
                <div className="practice-map-node-content">
                  <p>{node.description}</p>
                  
                  {node.relatedWorks.length > 0 && (
                    <div className="related-section">
                      <h4>相关作品</h4>
                      <ul>
                        {node.relatedWorks.map((work, index) => (
                          <li key={index}>{work}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {node.relatedImages.length > 0 && (
                    <div className="related-section">
                      <h4>相关图片</h4>
                      <div className="image-grid">
                        {node.relatedImages.map((image, index) => (
                          <div key={index} className="image-item">
                            <img src={image} alt={node.title} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PracticeMap
