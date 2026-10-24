import works from '../../data/generated/works'
import { getDisplayImage, getWorkTargetUrl } from '../../data/siteDisplay'
import { homeMainlineWorkIds, pickWorksByIds } from '../../data/siteTaxonomy'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { localizeWork } from '../../i18n/content.js'

const projectNotes = {
  kashiwa: {
    label: 'Live audiovisual collaboration',
    labelZh: '现场音画合作',
    role: 'Visual production / spatial illusion content',
    roleZh: '视觉制作 / 空间幻象内容',
    titleZh: '柏大辅《TITAN》'
  },
  'drop-flow': {
    label: 'Long-form audiovisual work',
    labelZh: '长期音画作品',
    role: 'Media artist / visual system',
    roleZh: '媒体艺术 / 视觉系统'
  },
  timer: {
    label: 'Media artwork / temporal system',
    labelZh: '媒体艺术 / 时间系统',
    role: 'Media artist',
    roleZh: '媒体艺术'
  },
  'digital-garden-visual-2025': {
    label: 'Public-space digital environment',
    labelZh: '公共空间数字环境',
    role: 'Unity VFX Graph / spatial image',
    roleZh: 'Unity VFX Graph / 空间影像'
  }
}

function ProjectGrid({ items, language }) {
  const isZh = language === 'zh'

  return (
    <div className="selected-project-grid">
      {items.map((work, index) => {
        const targetUrl = getWorkTargetUrl(work)
        const localizedWork = localizeWork(work, language)
        const note = projectNotes[work.id]
        const title = isZh && note?.titleZh ? note.titleZh : localizedWork.title
        const label = isZh ? note?.labelZh || localizedWork.type : note?.label || localizedWork.type
        const role = isZh ? note?.roleZh || localizedWork.subtitle : note?.role || localizedWork.subtitle

        return (
          <article key={work.id} className={`selected-project-card selected-project-card-${index + 1}`}>
            <a href={targetUrl} className="selected-project-thumb">
              <img src={getDisplayImage(work)} alt={title} />
            </a>
            <div className="selected-project-content">
              <span className="selected-project-index">{String(index + 1).padStart(2, '0')}</span>
              <div className="selected-project-label">{label}</div>
              <h3><a href={targetUrl}>{title}</a></h3>
              <p>{localizedWork.years} / {role}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
}

function SelectedWorks() {
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const selectedWorks = pickWorksByIds(works, homeMainlineWorkIds)

  return (
    <section id="works" className="section selected-projects-section">
      <div className="container">
        <div className="section-heading-row">
          <div>
            <div className="eyebrow">{isZh ? '代表作品 / Selected Works' : 'Selected Works'}</div>
            <h2 className="section-title">{isZh ? '现场音画、空间影像与媒体艺术' : 'Live audiovisual, spatial image, and media art'}</h2>
          </div>
          <p className="section-intro">
            {isZh
              ? '一组已经形成清晰公开结果的项目，集中呈现现场演出、长期音画作品与公共空间视觉。研究中项目与制作过程保留在档案层，不占用主页。'
              : 'A concise selection of completed, public-facing work across live audiovisual performance, long-form media practice, and spatial image. Ongoing research and process material remain in the archive.'}
          </p>
        </div>
        <ProjectGrid items={selectedWorks} language={language} />
      </div>
    </section>
  )
}

export default SelectedWorks
