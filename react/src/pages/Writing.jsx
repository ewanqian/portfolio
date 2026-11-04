import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import writings from '../data/generated/writings'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { localizeWriting } from '../i18n/content.js'

const editorialPriority = ['reactor-bpm-system-2026', 'entropy-two-screen-2026', 'performable-music']
const categoryMeta = [
  { id: 'essay', title: '作品评论 / Essays' },
  { id: 'note', title: '方法笔记 / Notes' },
  { id: 'field-note', title: '现场与过程记录 / Field Notes' },
  { id: 'research', title: '研究条目 / Research' }
]

const statusLabels = {
  draft: 'Working Draft',
  planned: 'Coming Soon',
  published: 'Published'
}

const statusRank = {
  published: 0,
  draft: 1,
  planned: 2
}

function sortWritings(items) {
  return [...items].sort((a, b) => {
    const orderDelta = (a.order ?? 999) - (b.order ?? 999)
    if (orderDelta !== 0) return orderDelta

    const statusDelta = (statusRank[a.status] ?? 999) - (statusRank[b.status] ?? 999)
    if (statusDelta !== 0) return statusDelta

    return a.title.localeCompare(b.title, 'zh-Hans-CN')
  })
}

function WritingTitle({ writing }) {
  if (!writing.articlePath) return <h3>{writing.title}</h3>
  return (
    <h3>
      <Link to={`/writing/${writing.slug || writing.id}`}>{writing.title}</Link>
    </h3>
  )
}

function WritingList({ items, title }) {
  if (!items.length) return null

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <div className="writing-list">
          {items.map((writing) => (
            <article key={writing.id} className="writing-list-item">
              <div className="writing-list-type">{writing.type}</div>
              <div className="writing-list-content">
                <WritingTitle writing={writing} />
                {writing.summary ? <p>{writing.summary}</p> : null}
              </div>
              <div className="writing-list-date">
                {writing.date}
                {writing.status !== 'published' ? <span className={`writing-status ${writing.status}`}>{statusLabels[writing.status]}</span> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Writing() {
  const { language } = useLanguage()
  // Public writing is an actual reader, not a list of unlinked planned concepts.
  const localizedWritings = writings
    .filter((writing) => writing.status === 'published' && writing.articlePath)
    .map((writing) => localizeWriting(writing, language))
  const featuredWritings = editorialPriority.map((id) => localizedWritings.find((item) => item.id === id)).filter(Boolean)
  const allWritings = sortWritings(localizedWritings)
  const localizedCategoryMeta = language === 'en'
    ? [
        { id: 'essay', title: 'Essays' },
        { id: 'note', title: 'Method Notes' },
        { id: 'field-note', title: 'Field Notes and Process Records' },
        { id: 'research', title: 'Research Entries' }
      ]
    : categoryMeta
  const writingsByCategory = Object.fromEntries(
    localizedCategoryMeta.map((section) => [section.id, sortWritings(localizedWritings.filter((writing) => writing.category === section.id))])
  )

  return (
    <>
      <Header />
      <main className="page-writing">
        <section className="section">
          <div className="container">
            <div className="eyebrow">Writing</div>
            <h1 className="section-title">{language === 'en' ? 'Writing and Notes' : '写作与笔记'}</h1>
            <p className="section-intro">
              {language === 'en'
                ? 'Research reports and field notes on how audiovisual works and real-time performance systems are built, controlled, tested and experienced.'
                : '从现场演出中的控制系统出发，记录实时图像、舞台预演、时间结构与创作方法。优先呈现已有完整正文的研究报告，不把尚未撰写的选题当作文章。'}
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">{language === 'en' ? 'Selected research reports' : '重点研究报告'}</h2>
            <div className="grid-2">
              {featuredWritings.map((writing) => (
                <article key={writing.id} className="card writing-card">
                  <div className="writing-type">{writing.type}</div>
                  <WritingTitle writing={writing} />
                  {writing.summary ? <p>{writing.summary}</p> : null}
                  <div className="writing-meta">
                    {writing.date}
                    {writing.status !== 'published' ? <span className={`writing-status ${writing.status}`}>{statusLabels[writing.status]}</span> : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Published, readable articles are listed once below, not repeated in category silos. */}

        <section className="section">
          <div className="container">
            <h2 className="section-title">{language === 'en' ? 'All Writing' : '全部写作 / All Writing'}</h2>
            <div className="writing-list">
              {allWritings.map((writing) => (
                <article key={writing.id} className="writing-list-item">
                  <div className="writing-list-type">{writing.type}</div>
                  <div className="writing-list-content">
                    <WritingTitle writing={writing} />
                    {writing.summary ? <p>{writing.summary}</p> : null}
                  </div>
                  <div className="writing-list-date">
                    {writing.date}
                    {writing.status !== 'published' ? <span className={`writing-status ${writing.status}`}>{statusLabels[writing.status]}</span> : null}
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

export default Writing
