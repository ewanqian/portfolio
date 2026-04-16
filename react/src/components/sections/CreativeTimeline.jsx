import { timeline } from '../../data/timeline'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { localizeTimelineItem } from '../../i18n/content.js'

function CreativeTimeline() {
  const { language } = useLanguage()

  return (
    <section id="creative-trajectory" className="section">
      <div className="container">
        <div className="eyebrow">Creative Timeline</div>
        <h2 className="section-title">{language === 'en' ? 'Creative Timeline' : '创作时间线'}</h2>
        <div className="trajectory-grid" style={{ marginTop: '32px' }}>
          {timeline.map((item) => {
            const localizedItem = localizeTimelineItem(item, language)

            return (
            <div key={item.id} className="trajectory-card">
              <h4>{localizedItem.title} / {localizedItem.subtitle}</h4>
              <p>
                {localizedItem.description}
              </p>
              <div className="inline-links" style={{ marginTop: '16px' }}>
                {localizedItem.links.map((link, index) => (
                  <a key={index} href={link.url} target={link.url.startsWith('http') ? '_blank' : undefined} rel={link.url.startsWith('http') ? 'noreferrer' : undefined}>
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CreativeTimeline
