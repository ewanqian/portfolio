import { Link, Navigate, useParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import MarkdownReader from '../components/content/MarkdownReader.jsx'
import { getWorkshopSeries } from '../data/workshops'
import { useLanguage } from '../i18n/LanguageContext.jsx'

function stripReadmeTitle(markdown = '') {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  let index = 0

  while (index < lines.length && !lines[index].trim()) index += 1
  while (index < lines.length && /^#{1,3}\s+/.test(lines[index].trim())) index += 1
  while (index < lines.length && !lines[index].trim()) index += 1

  return lines.slice(index).join('\n')
}

function WorkshopSeries() {
  const { slug } = useParams()
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const series = getWorkshopSeries(slug)

  if (!series) {
    return <Navigate to="/workshops" replace />
  }

  const isCurrentEdition = series.kind === 'current-edition'
  const markdown = stripReadmeTitle(series.readmeMarkdown)

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
              {isCurrentEdition && (
                <div className="workshop-current-badge">
                  {isZh ? '当前期次 / Current Edition' : 'Current Edition'}
                </div>
              )}
              <h1>{series.title[language]}</h1>
              {(series.date || series.time || series.format?.[language]) && (
                <div className="workshop-event-meta">
                  {series.date && <span>{series.date}</span>}
                  {series.time && <span>{series.time}</span>}
                  {series.format?.[language] && <span>{series.format[language]}</span>}
                </div>
              )}
            </div>
            <div>
              <p className="workshop-detail-lead">{series.short[language]}</p>
              <p>{series.premise[language]}</p>
              <div className="workshop-series-tags">
                {series.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              {series.githubUrl && (
                <a className="text-link" href={series.githubUrl} target="_blank" rel="noreferrer">
                  {isZh ? '在 GitHub 阅读 / 查看原文 ↗' : 'Read canonical README on GitHub ↗'}
                </a>
              )}
            </div>
          </div>
        </section>

        {markdown ? (
          <section className="section">
            <div className="container workshop-reader-shell">
              <MarkdownReader markdown={markdown} sourcePath={series.readmePath} />
              <aside className="workshop-reader-meta">
                <strong>{isZh ? 'Canonical document' : 'Canonical document'}</strong>
                <div>{isZh ? '本页正文直接来自仓库中的长期 README。网站负责阅读排版，GitHub 负责版本、历史与长期维护。' : 'This page reads directly from the repository README. The website handles presentation; GitHub keeps versions and history.'}</div>
                {series.githubUrl && (
                  <a href={series.githubUrl} target="_blank" rel="noreferrer">
                    GitHub README ↗
                  </a>
                )}
              </aside>
            </div>
          </section>
        ) : (
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
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}

export default WorkshopSeries
