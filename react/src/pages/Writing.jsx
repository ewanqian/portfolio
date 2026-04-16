import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import writings from '../data/generated/writings'

const categoryMeta = [
  { id: 'essay', title: '作品评论 / Essays' },
  { id: 'note', title: '方法笔记 / Notes' },
  { id: 'field-note', title: '现场与过程记录 / Field Notes' },
  { id: 'research', title: '研究条目 / Research' }
]

const statusLabels = {
  draft: 'draft',
  planned: 'planned',
  published: 'published'
}

const statusRank = {
  published: 0,
  draft: 1,
  planned: 2
}

function sortWritings(items) {
  return [...items].sort((a, b) => {
    const orderDelta = (a.order ?? 999) - (b.order ?? 999)

    if (orderDelta !== 0) {
      return orderDelta
    }

    const statusDelta = (statusRank[a.status] ?? 999) - (statusRank[b.status] ?? 999)

    if (statusDelta !== 0) {
      return statusDelta
    }

    return a.title.localeCompare(b.title, 'zh-Hans-CN')
  })
}

function WritingList({ items, title }) {
  if (!items.length) {
    return null
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <div className="writing-list">
          {items.map((writing) => (
            <article key={writing.id} className="writing-list-item">
              <div className="writing-list-type">{writing.type}</div>
              <div className="writing-list-content">
                <h3>{writing.title}</h3>
                {writing.summary ? <p>{writing.summary}</p> : null}
              </div>
              <div className="writing-list-date">
                {writing.date}
                {writing.status !== 'published' ? <span className="writing-status">{statusLabels[writing.status]}</span> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const featuredWritings = sortWritings(writings.filter((writing) => writing.featured))
const allWritings = sortWritings(writings)
const writingsByCategory = Object.fromEntries(
  categoryMeta.map((section) => [section.id, sortWritings(writings.filter((writing) => writing.category === section.id))])
)

function Writing() {
  return (
    <>
      <Header />
      <main className="page-writing">
        <section className="section">
          <div className="container">
            <div className="eyebrow">Writing</div>
            <h1 className="section-title">写作与笔记</h1>
            <p className="section-intro">
              这里记录围绕作品、方法、现场经验、交付规格与档案系统展开的持续写作。
              它不是附属说明，而是创作实践的一部分：作品如何成立、如何被组织、如何进入空间、如何被交付、如何被继续阅读，都会在这里被展开。
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">重点写作 / Featured Writings</h2>
            <div className="grid-2">
              {featuredWritings.map((writing) => (
                <article key={writing.id} className="card writing-card">
                  <div className="writing-type">{writing.type}</div>
                  <h3>{writing.title}</h3>
                  {writing.summary ? <p>{writing.summary}</p> : null}
                  <div className="writing-meta">
                    {writing.date}
                    {writing.status !== 'published' ? <span className="writing-status">{statusLabels[writing.status]}</span> : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {categoryMeta.map((section) => (
          <WritingList key={section.id} items={writingsByCategory[section.id]} title={section.title} />
        ))}

        <section className="section">
          <div className="container">
            <h2 className="section-title">全部写作 / All Writing</h2>
            <div className="writing-list">
              {allWritings.map((writing) => (
                <article key={writing.id} className="writing-list-item">
                  <div className="writing-list-type">{writing.type}</div>
                  <div className="writing-list-content">
                    <h3>{writing.title}</h3>
                    {writing.summary ? <p>{writing.summary}</p> : null}
                  </div>
                  <div className="writing-list-date">
                    {writing.date}
                    {writing.status !== 'published' ? <span className="writing-status">{statusLabels[writing.status]}</span> : null}
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
