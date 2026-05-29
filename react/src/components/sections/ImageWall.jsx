import { Link } from 'react-router-dom'
import nodes from '../../data/generated/nodes.js'
import { getDisplayImage, getNodeTargetUrl, sortNodesForArchive } from '../../data/siteDisplay'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { localizeNode } from '../../i18n/content.js'

const proofNodeIds = [
  'drop-flow-hangzhou-biennale',
  'kashiwa-bo-live-shenzhen',
  'can-festival',
  'babel-bottle'
]

const sectionCopy = {
  zh: {
    title: '公开证据',
    intro: '这里只保留几项最能快速建立判断的公开节点。完整项目记录、版本线索和扩展条目放到 Production Records。',
    cta: '查看项目记录'
  },
  en: {
    title: 'Public Proofs',
    intro: 'Only a few public-facing proof points stay here. Full project records, version trails, and expanded entries live in Production Records.',
    cta: 'Open Production Records'
  }
}

const ImageWall = () => {
  const { language } = useLanguage()
  const featuredNodes = sortNodesForArchive(nodes).filter((node) => proofNodeIds.includes(node.id))
  const copy = sectionCopy[language]

  return (
    <section id="image-wall" className="image-wall">
      <div className="container">
        <div className="section-header">
          <h2>{copy.title}</h2>
          <p>{copy.intro}</p>
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
            {copy.cta}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ImageWall
