import network from '../../data/generated/network'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { localizeNetworkItem } from '../../i18n/content.js'

function CreativeNetwork() {
  const { language } = useLanguage()

  return (
    <section id="repository-network" className="section">
      <div className="container">
        <div className="eyebrow">A Distributed Practice</div>
        <h2 className="section-title">{language === 'en' ? 'A Distributed Practice' : '一种分布式创作实践'}</h2>
        <p className="section-intro">
          {language === 'en'
            ? 'These pages, repositories, archives, and tools form a distributed practice in which works, research, publishing, collaboration, and system development happen across different layers at the same time.'
            : '这些页面、仓库、档案与工具共同构成一种分布式的创作实践：作品、研究、发布、协作与系统开发在不同层级上同时发生。'}
        </p>
        <div className="grid-3" style={{ marginTop: '32px' }}>
          {network.map((item) => {
            const localizedItem = localizeNetworkItem(item, language)

            return (
            <a 
              key={item.id} 
              href={item.url} 
              target={item.url !== '#' ? '_blank' : undefined} 
              rel={item.url !== '#' ? 'noreferrer' : undefined}
              className="repo-card" 
              style={{ 
                display: 'block', 
                textDecoration: 'none',
                cursor: item.url === '#' ? 'default' : 'pointer'
              }}
            >
              <h4>{localizedItem.title}</h4>
              <p>{localizedItem.description}</p>
            </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CreativeNetwork
