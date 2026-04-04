import { timeline } from '../../data/timeline'

function CreativeTimeline() {
  return (
    <section id="creative-trajectory" className="section">
      <div className="container">
        <div className="eyebrow">Creative Timeline</div>
        <h2 className="section-title">创作时间线</h2>
        <div className="trajectory-grid" style={{ marginTop: '32px' }}>
          {timeline.map((item) => (
            <div key={item.id} className="trajectory-card">
              <h4>{item.title} / {item.subtitle}</h4>
              <p>
                {item.description}
              </p>
              <div className="inline-links" style={{ marginTop: '16px' }}>
                {item.links.map((link, index) => (
                  <a key={index} href={link.url} target={link.url.startsWith('http') ? '_blank' : undefined} rel={link.url.startsWith('http') ? 'noreferrer' : undefined}>
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CreativeTimeline
