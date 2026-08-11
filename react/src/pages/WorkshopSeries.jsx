import { useEffect, useMemo, useState } from 'react'
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
  const [runtimeMarkdown, setRuntimeMarkdown] = useState('')

  useEffect(() => {
    setRuntimeMarkdown('')

    if (!series?.readmePath || series.readmeMarkdown) return undefined

    const controller = new AbortController()
    const rawUrl = `https://raw.githubusercontent.com/ewanqian/portfolio/main/${series.readmePath}`

    fetch(rawUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`README fetch failed: ${response.status}`)
        return response.text()
      })
      .then(setRuntimeMarkdown)
      .catch((error) => {
        if (error.name !== 'AbortError') console.warn(error)
      })

    return () => controller.abort()
  }, [series])

  if (!series) {
    return <Navigate to="/workshops" replace />
  }

  const isCurrentEdition = series.kind === 'current-edition'
  const markdown = useMemo(
    () => stripReadmeTitle(series.readmeMarkdown || runtimeMarkdown),
    [series.readmeMarkdown, runtimeMarkdown]
  )

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

        <section className="section">
          <div className="container workshop-reader-shell">
            <div>
              {markdown ? (
                <MarkdownReader markdown={markdown} sourcePath={series.readmePath} />
              ) : (
                <div className="markdown-reader">
                  <h2>{isZh ? '完整文档正在从 GitHub 载入' : 'Loading the canonical README'}</h2>
                  <p>{isZh ? '如果当前网络无法访问 GitHub Raw，请直接打开右侧 README 原文。' : 'If GitHub Raw is unavailable on the current network, open the canonical README directly.'}</p>
                </div>
              )}
            </div>
            <aside className="workshop-reader-meta">
              <strong>Canonical document</strong>
              <div>{isZh ? '本页正文优先在构建时直接读取仓库 README；运行时仅作为兼容方式再次读取。网站负责阅读排版，GitHub 负责版本、历史与长期维护。' : 'The page reads the repository README at build time, with a runtime fallback. The website handles presentation; GitHub keeps versions and history.'}</div>
              {series.githubUrl && (
                <a href={series.githubUrl} target="_blank" rel="noreferrer">
                  GitHub README ↗
                </a>
              )}
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default WorkshopSeries
