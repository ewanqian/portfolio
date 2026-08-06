import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { profileCopy } from '../data/profile.js'

const portraits = [
  ['/portfolio/assets/profile/ewan-portrait-formal.webp', 'Portrait', '个人肖像'],
  ['/portfolio/assets/profile/ewan-portrait-outdoor-woods.webp', 'Field Portrait', '场域肖像'],
  ['/portfolio/assets/profile/ewan-strawberry-live.webp', 'Live Visual Work', '现场视觉工作'],
  ['/portfolio/assets/profile/ewan-ufo-sharing.webp', 'Public Program', '公开分享']
]

function Paragraphs({ items }) {
  return items.map((item) => <p key={item}>{item}</p>)
}

function Profile() {
  const { language } = useLanguage()
  const c = profileCopy[language]
  const isZh = language === 'zh'

  return (
    <>
      <Header />
      <main className="profile-editorial-page">
        <section className="profile-editorial-hero">
          <div className="container profile-editorial-grid">
            <div className="profile-editorial-copy">
              <p className="eyebrow">{c.roles}</p>
              <h1>{c.name}</h1>
              <p>{c.intro}</p>
              <div className="hero-cta">
                <Link className="button primary" to="/works">{c.ctaWorks}</Link>
                <Link className="button" to="/production">{c.ctaProduction}</Link>
              </div>
            </div>
            <figure className="profile-editorial-image">
              <img src="/portfolio/assets/profile/ewan-portrait-formal.webp" alt={c.name} />
            </figure>
          </div>
        </section>

        <section className="profile-editorial-body">
          <div className="container profile-body-grid">
            <aside className="profile-index">
              <div className="profile-facts">
                {c.facts.map(([label, value]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
              <nav aria-label={isZh ? '个人介绍章节' : 'Profile sections'}>
                {c.nav.map(([label, anchor]) => (
                  <a href={`#profile-${anchor}`} key={anchor}>{label}</a>
                ))}
              </nav>
            </aside>

            <div className="profile-essay">
              <section id="profile-statement" className="profile-essay-section">
                <span>{c.statement.label}</span>
                <h2>{c.statement.title}</h2>
                <div className="profile-paragraphs">
                  <Paragraphs items={c.statement.body} />
                </div>
              </section>

              <section id="profile-practice" className="profile-essay-section">
                <span>{isZh ? '实践方向' : 'Practice'}</span>
                <h2>{c.practiceTitle}</h2>
                <div className="profile-work-list profile-practice-list">
                  {c.practice.map((item) => (
                    <article key={item.title}>
                      <small>{item.meta}</small>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section id="profile-cv" className="profile-essay-section">
                <span>{isZh ? '经历' : 'CV'}</span>
                <h2>{c.cvTitle}</h2>
                <div className="profile-cv-groups">
                  {c.cvGroups.map((group) => (
                    <section className="profile-cv-group" key={group.title}>
                      <h3>{group.title}</h3>
                      <div className="profile-cv-list">
                        {group.items.map((item) => (
                          <article key={`${item.year}-${item.title}`}>
                            <time>{item.year}</time>
                            <div>
                              <strong>{item.title}</strong>
                              <p>{item.detail}</p>
                            </div>
                          </article>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </section>

              <section id="profile-collaboration" className="profile-essay-section profile-network">
                <span>{isZh ? '合作' : 'Collaboration'}</span>
                <h2>{c.collaborationTitle}</h2>
                <div className="profile-paragraphs">
                  <Paragraphs items={c.collaboration} />
                </div>
              </section>
            </div>
          </div>
        </section>

        <section id="profile-images" className="section">
          <div className="container">
            <div className="section-heading-row">
              <div>
                <div className="eyebrow">{isZh ? '图像' : 'Images'}</div>
                <h2 className="section-title">{c.imageTitle}</h2>
              </div>
              <p className="section-intro">{c.imageIntro}</p>
            </div>
            <div className="profile-photo-grid">
              {portraits.map(([src, title, titleZh], index) => (
                <article key={src} className={`profile-photo-card profile-photo-card-${index + 1}`}>
                  <img src={src} alt={isZh ? titleZh : title} loading="lazy" />
                  <div>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{isZh ? titleZh : title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Profile
