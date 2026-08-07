import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { workshopSeries } from '../data/workshops'
import { useLanguage } from '../i18n/LanguageContext.jsx'

function Workshops() {
  const { language } = useLanguage()
  const isZh = language === 'zh'

  return (
    <>
      <Header />
      <main>
        <section className="workshops-hero section">
          <div className="container workshops-hero-grid">
            <div>
              <div className="eyebrow">{isZh ? '长期工作坊计划' : 'Long-term workshop program'}</div>
              <h1>{isZh ? '把个人创作方法变成可进入的工具。' : 'Turning personal practice into tools others can enter.'}</h1>
            </div>
            <div className="workshops-hero-copy">
              <p>
                {isZh
                  ? 'Workshop 不是独立于作品之外的教学栏目，而是个人实践的另一种输出：把扫描、实时图像、AI、creative coding 与现场系统拆成可学习、可修改、可继续使用的方法。'
                  : 'Workshops are not separate from the artworks. They are another output of the practice: scanning, realtime image, AI, creative coding, and live systems are opened into methods that can be learned, modified, and reused.'}
              </p>
              <p>
                {isZh
                  ? '每个系列使用稳定页面保存不同期次的现场记录、参与者成果与公开资源，因此这里同时是项目入口、长期档案和教学资源库。'
                  : 'Each series has a stable page for editions, participant outcomes, documentation, and public resources, making this both an entry point and a long-term archive.'}
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container workshop-series-grid">
            {workshopSeries.map((series, index) => (
              <article key={series.slug} className="workshop-series-card">
                <span className="workshop-series-index">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <div className="eyebrow">{isZh ? '系列' : 'Series'}</div>
                  <h2>{series.title[language]}</h2>
                  <p>{series.short[language]}</p>
                  <div className="workshop-series-tags">
                    {series.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <Link className="text-link" to={`/workshops/${series.slug}`}>
                    {isZh ? '打开系列页' : 'Open series'}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section workshop-structure-section">
          <div className="container">
            <div className="eyebrow">{isZh ? '长期结构' : 'Long-term structure'}</div>
            <h2 className="section-title">{isZh ? '每一期都进入同一套档案结构' : 'Every edition enters the same archive structure'}</h2>
            <div className="workshop-structure-grid">
              <div><strong>01</strong><span>{isZh ? '时间 / 地点 / 合作机构' : 'Date / place / host'}</span></div>
              <div><strong>02</strong><span>{isZh ? '参与者成果与过程记录' : 'Participant outcomes & process'}</span></div>
              <div><strong>03</strong><span>{isZh ? '模板 / Starter Kit / FAQ' : 'Templates / starter kit / FAQ'}</span></div>
              <div><strong>04</strong><span>{isZh ? '个人报名 / 机构合作' : 'Join / host a workshop'}</span></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Workshops
