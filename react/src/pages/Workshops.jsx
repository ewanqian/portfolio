import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { workshopSeries } from '../data/workshops'
import { useLanguage } from '../i18n/LanguageContext.jsx'

function WorkshopCard({ series, language, isZh }) {
  return (
    <article className="workshop-series-card">
      <span className="workshop-series-index">2026</span>
      <div>
        <div className="eyebrow">{isZh ? '已举办 / Delivered' : 'Delivered workshop'}</div>
        <h2>{series.title[language]}</h2>
        <p>{series.short[language]}</p>
        <div className="workshop-event-meta">
          {series.date && <span>{series.date}</span>}
          {series.format?.[language] && <span>{series.format[language]}</span>}
        </div>
        <div className="workshop-series-tags">
          {(series.tags || []).map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <Link className="text-link" to={`/workshops/${series.slug}`}>
          {isZh ? '查看工作坊记录' : 'View workshop record'}
        </Link>
      </div>
    </article>
  )
}

function Workshops() {
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const delivered = workshopSeries
    .filter((series) => series.kind === 'past-edition' && series.publicVisibility !== 'archive')
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))

  return (
    <>
      <Header />
      <main>
        <section className="workshops-hero section">
          <div className="container workshops-hero-grid">
            <div>
              <div className="eyebrow">Workshops / Public Programs</div>
              <h1>{isZh ? '从实际举办的工作坊，回到创作现场。' : 'Workshops rooted in delivered practice.'}</h1>
            </div>
            <div className="workshops-hero-copy">
              <p>
                {isZh
                  ? '这里记录已举办的公众工作坊与可复用的教学方法。以活动对外正式名称、实际日期和公开履历为准，不把研发原型或历史策划名称当作额外举办的课程。'
                  : 'A record of delivered public workshops and the methods behind them. Public event titles, actual dates and verified teaching credits take precedence over earlier proposals and research prototypes.'}
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="eyebrow">{isZh ? '2026 / 已举办' : '2026 / Delivered'}</div>
            <h2 className="section-title">{isZh ? '公众工作坊' : 'Public workshops'}</h2>
            <div className="workshop-series-grid">
              {delivered.map((series) => (
                <WorkshopCard key={series.slug} series={series} language={language} isZh={isZh} />
              ))}
            </div>
          </div>
        </section>

        <section className="section workshop-structure-section">
          <div className="container">
            <div className="eyebrow">{isZh ? '研究与后续方法' : 'Research & further methods'}</div>
            <h2 className="section-title">{isZh ? '教学原型与教材，保留在研究档案中' : 'Teaching prototypes remain in the research archive'}</h2>
            <p>
              {isZh
                ? '极简输入实验室、场景铸造 Reader 和演出 Copilot 记录的是持续发展的方法、教材与测试，不代表另有同名工作坊已经举办。'
                : 'Minimal Input Lab, the Scene Forge Reader and Show Copilot are ongoing methods, teaching materials and experiments—not additional delivered events.'}
            </p>
            <a className="text-link" href="https://github.com/ewanqian/portfolio/tree/main/workshops/minimal-input-lab" target="_blank" rel="noreferrer">
              {isZh ? '查看研究与课程档案 ↗' : 'Research & teaching archive ↗'}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Workshops
