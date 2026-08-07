import { Link, Navigate, useParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { getWorkshopSeries } from '../data/workshops'
import { useLanguage } from '../i18n/LanguageContext.jsx'

function WorkshopSeries() {
  const { slug } = useParams()
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const series = getWorkshopSeries(slug)

  if (!series) {
    return <Navigate to="/workshops" replace />
  }

  return (
    <>
      <Header />
      <main>
        <section className="section workshop-detail-hero">
          <div className="container workshop-detail-grid">
            <div>
              <Link className="eyebrow workshop-backlink" to="/workshops">
                ← {isZh ? '工作坊计划' : 'Workshops'}
              </Link>
              <h1>{series.title[language]}</h1>
            </div>
            <div>
              <p className="workshop-detail-lead">{series.short[language]}</p>
              <p>{series.premise[language]}</p>
              <div className="workshop-series-tags">
                {series.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container workshop-detail-modules">
            <article>
              <span>01</span>
              <h2>{isZh ? 'Editions / 期次' : 'Editions'}</h2>
              <p>{isZh ? '不同城市、机构与参与者版本都保存在同一个系列页面下，形成连续档案。' : 'Each city, host, and participant edition stays under this stable series page as a continuous archive.'}</p>
            </article>
            <article>
              <span>02</span>
              <h2>Resources</h2>
              <p>{isZh ? '采集任务、模板、starter kit、示例与 FAQ 作为可复用资源与系列共同维护。' : 'Collection tasks, templates, starter kits, examples, and FAQs are maintained as reusable resources alongside the series.'}</p>
            </article>
            <article>
              <span>03</span>
              <h2>{isZh ? 'Outcomes / 成果' : 'Outcomes'}</h2>
              <p>{isZh ? '参与者作品、过程照片与现场记录用于呈现每一期真正发生了什么，而不是只保留活动海报。' : 'Participant works, process images, and documentation show what each edition actually produced rather than leaving only event posters.'}</p>
            </article>
            <article>
              <span>04</span>
              <h2>Join / Host</h2>
              <p>{isZh ? '参与者与机构合作使用同一系列入口，但分别对应报名与举办工作坊两种合作路径。' : 'Participants and institutions use the same series entry, with separate paths for joining and hosting a workshop.'}</p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default WorkshopSeries
