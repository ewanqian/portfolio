import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { workshopSeries } from '../data/workshops'
import { useLanguage } from '../i18n/LanguageContext.jsx'

function WorkshopCard({ series, language, isZh }) {
  const isCurrent = series.kind === 'current-edition'

  return (
    <article className={`workshop-series-card ${isCurrent ? 'current-edition' : ''}`}>
      <span className="workshop-series-index">{isCurrent ? 'NOW' : 'SERIES'}</span>
      <div>
        <div className="eyebrow">
          {isCurrent
            ? (isZh ? '当前期次 / Current Edition' : 'Current Edition')
            : (isZh ? '长期系列 / Long-term Series' : 'Long-term Series')}
        </div>
        <h2>{series.title[language]}</h2>
        <p>{series.short[language]}</p>
        {(series.date || series.time || series.format?.[language]) && (
          <div className="workshop-event-meta">
            {series.date && <span>{series.date}</span>}
            {series.time && <span>{series.time}</span>}
            {series.format?.[language] && <span>{series.format[language]}</span>}
          </div>
        )}
        <div className="workshop-series-tags">
          {series.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <Link className="text-link" to={`/workshops/${series.slug}`}>
          {isZh ? '阅读完整项目说明' : 'Read full project document'}
        </Link>
      </div>
    </article>
  )
}

function Workshops() {
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const currentEditions = workshopSeries.filter((series) => series.kind === 'current-edition')
  const longTermSeries = workshopSeries.filter((series) => series.kind !== 'current-edition')

  return (
    <>
      <Header />
      <main>
        <section className="workshops-hero section">
          <div className="container workshops-hero-grid">
            <div>
              <div className="eyebrow">{isZh ? 'Workshop / Public Program' : 'Workshop / Public Program'}</div>
              <h1>{isZh ? '从正在发生的一期，进入长期方法。' : 'Enter the long-term method through a current edition.'}</h1>
            </div>
            <div className="workshops-hero-copy">
              <p>
                {isZh
                  ? '这里不再单独维护一套很快过期的网站文案。每个专题页直接读取 GitHub 中持续更新的 README，网站只负责更清楚的阅读、导航与当前期次入口。'
                  : 'The site no longer maintains a second copy of workshop text. Each topic page reads from the continuously maintained GitHub README, while the website focuses on presentation, navigation, and current editions.'}
              </p>
              <p>
                {isZh
                  ? 'Issue 用于内部研发和执行；README 用于公开阅读；网站把这些长期文档整理成更适合浏览的入口。'
                  : 'Issues hold internal R&D and execution; READMEs are the public source; the website turns those documents into a clearer reading layer.'}
              </p>
            </div>
          </div>
        </section>

        {currentEditions.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="eyebrow">{isZh ? '当前 / Upcoming' : 'Upcoming'}</div>
              <h2 className="section-title">{isZh ? '最近一期' : 'Current edition'}</h2>
              <div className="workshop-series-grid">
                {currentEditions.map((series) => (
                  <WorkshopCard key={series.slug} series={series} language={language} isZh={isZh} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section">
          <div className="container">
            <div className="eyebrow">{isZh ? '长期系列 / Series' : 'Long-term series'}</div>
            <h2 className="section-title">{isZh ? '持续维护的工作坊方法' : 'Long-term workshop methods'}</h2>
            <div className="workshop-series-grid">
              {longTermSeries.map((series) => (
                <WorkshopCard key={series.slug} series={series} language={language} isZh={isZh} />
              ))}
            </div>
          </div>
        </section>

        <section className="section workshop-structure-section">
          <div className="container">
            <div className="eyebrow">{isZh ? '文档结构' : 'Documentation structure'}</div>
            <h2 className="section-title">{isZh ? 'README 是公开母版，网站是阅读器' : 'README is the public source; the site is the reader'}</h2>
            <div className="workshop-structure-grid">
              <div><strong>01</strong><span>{isZh ? 'README：公开介绍与长期版本' : 'README: public source & versions'}</span></div>
              <div><strong>02</strong><span>{isZh ? 'Website：阅读、导航与当前期次' : 'Website: reading & navigation'}</span></div>
              <div><strong>03</strong><span>{isZh ? 'Issues：研发、执行与待做事项' : 'Issues: R&D & execution'}</span></div>
              <div><strong>04</strong><span>{isZh ? 'Archive：成果、媒体与后续版本' : 'Archive: outcomes & media'}</span></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Workshops
