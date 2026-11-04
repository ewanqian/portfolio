import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import writings from '../data/generated/writings'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { localizeWriting } from '../i18n/content.js'
import '../styles/writing-index.css'

// Public Writing is a reading library, not a backlog of editorial placeholders.
// An entry without a complete article is kept in content/writings for future work
// but is not rendered as a published article.
const EDITORIAL_FEATURES = ['reactor-bpm-system-2026', 'scene-forge-reader-02']
const RESEARCH_NOTES = ['performable-music', 'performance-control-model']

function byOrder(items) {
  return [...items].sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
}

function titleFor(item, language) {
  return language === 'en' ? (item.titleEn || item.title) : item.title
}

function summaryFor(item, language) {
  return language === 'en' ? (item.summaryEn || item.summary) : item.summary
}

function EditorialEntry({ item, language, featured = false, kind = '' }) {
  return (
    <article className={featured ? 'writing-editorial-entry featured' : 'writing-editorial-entry'}>
      <div className="writing-editorial-index">{kind || item.type}</div>
      <div className="writing-editorial-content">
        <h3><Link to={`/writing/${item.slug || item.id}`}>{titleFor(item, language)}</Link></h3>
        <p>{summaryFor(item, language)}</p>
        {featured ? (
          <Link className="writing-editorial-read" to={`/writing/${item.slug || item.id}`}>
            {language === 'en' ? 'Read article' : '阅读全文'} <span aria-hidden="true">↗</span>
          </Link>
        ) : null}
      </div>
      <div className="writing-editorial-date">{item.date}</div>
    </article>
  )
}

function Writing() {
  const { language } = useLanguage()
  const records = writings.map((writing) => localizeWriting(writing, language))
  const byId = new Map(records.map((item) => [item.id, item]))
  const featured = EDITORIAL_FEATURES.map((id) => byId.get(id))
    .filter((item) => item?.articlePath && item.status === 'published')
  const otherPublished = byOrder(records.filter((item) =>
    item.articlePath && item.status === 'published' && !EDITORIAL_FEATURES.includes(item.id)
  ))
  const research = RESEARCH_NOTES.map((id) => byId.get(id)).filter((item) => item?.articlePath)

  return (
    <>
      <Header />
      <main className="page-writing writing-edition">
        <header className="section writing-edition-intro">
          <div className="container">
            <div className="eyebrow">Writing / Field Notes / Readers</div>
            <h1>{language === 'en' ? 'Writing & Research' : '写作与研究'}</h1>
            <p>{language === 'en'
              ? 'Selected accounts of performance systems, spatial practice and teaching methods. Each published text is a complete, readable document.'
              : '这里收录能够独立阅读的现场研究、创作方法与工作坊教材。以具体问题和实践经验为起点，保留作品形成的过程、可验证的资料与能够重复使用的方法。'}</p>
          </div>
        </header>

        <section className="section writing-edition-featured" aria-labelledby="writing-featured-heading">
          <div className="container">
            <div className="writing-edition-section-heading">
              <h2 id="writing-featured-heading">{language === 'en' ? 'Selected writing' : '重点写作'}</h2>
              <span>01 / SELECTED</span>
            </div>
            <div className="writing-editorial-feature-grid">
              {featured.map((item, index) => (
                <EditorialEntry key={item.id} item={item} language={language} featured kind={index === 0 ? 'FIELD ESSAY / SYSTEM' : 'WORKSHOP / READER'} />
              ))}
            </div>
          </div>
        </section>

        {otherPublished.length ? (
          <section className="section writing-edition-published" aria-labelledby="writing-published-heading">
            <div className="container">
              <div className="writing-edition-section-heading">
                <h2 id="writing-published-heading">Published Writing</h2>
                <span>02 / ARTICLES</span>
              </div>
              <div className="writing-editorial-list">
                {otherPublished.map((item) => <EditorialEntry key={item.id} item={item} language={language} kind="FIELD NOTES" />)}
              </div>
            </div>
          </section>
        ) : null}

        {research.length ? (
          <section className="section writing-edition-research" aria-labelledby="writing-research-heading">
            <div className="container">
              <div className="writing-edition-section-heading">
                <h2 id="writing-research-heading">{language === 'en' ? 'Research in progress' : '研究草案'}</h2>
                <span>03 / DEVELOPMENT</span>
              </div>
              <p className="writing-edition-category-note">{language === 'en'
                ? 'Proposals and evolving research models, presented separately from completed articles.'
                : '尚在发展的提案与方法模型，单独归档，不与已完成的文章混为一类。'}</p>
              <div className="writing-editorial-list">
                {research.map((item) => (
                  <EditorialEntry key={item.id} item={item} language={language}
                    kind={item.id === 'performable-music' ? 'PROPOSAL' : 'WORKING MODEL'} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  )
}

export default Writing
