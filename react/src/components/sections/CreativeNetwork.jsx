import network from '../../data/generated/network'

function CreativeNetwork() {
  return (
    <section id="repository-network" className="section">
      <div className="container">
        <div className="eyebrow">A Distributed Practice</div>
        <h2 className="section-title">一种分布式创作实践</h2>
        <p className="section-intro">
          这些页面、仓库、档案与工具并不指向同一个中心，它们共同构成了一种分布式的创作实践：作品、研究、发布、协作与系统开发在不同层级上同时发生。
        </p>
        <div className="grid-3" style={{ marginTop: '32px' }}>
          {network.map((item) => (
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
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CreativeNetwork
