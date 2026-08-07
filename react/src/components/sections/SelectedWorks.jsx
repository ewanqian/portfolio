import works from '../../data/generated/works'
import { getDisplayImage, getWorkTargetUrl } from '../../data/siteDisplay'
import { homeGalleryWorkIds, pickWorksByIds } from '../../data/siteTaxonomy'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { localizeWork } from '../../i18n/content.js'

const projectNotes = {
  timer: {
    label: 'Media artwork / temporal system',
    labelZh: '媒体艺术 / 时间系统',
    role: 'Media artist',
    roleZh: '媒体艺术'
  },
  'drop-flow': {
    label: 'Long-form audiovisual work',
    labelZh: '长期音画作品',
    role: 'Media artist / visual system',
    roleZh: '媒体艺术 / 视觉系统'
  },
  kashiwa: {
    label: 'Live audiovisual collaboration',
    labelZh: '现场音画合作',
    role: 'Visual production / spatial illusion content',
    roleZh: '视觉制作 / 空间幻象内容',
    titleZh: '柏大辅《TITAN》'
  },
  'mke-terminal': {
    label: 'Spatial audiovisual environment',
    labelZh: '空间音画环境',
    role: 'Spatial image / realtime presentation',
    roleZh: '空间影像 / 实时呈现'
  },
  'digital-garden-visual-2025': {
    label: 'Public-space digital environment',
    labelZh: '公共空间数字环境',
    role: 'Unity VFX Graph / spatial image',
    roleZh: 'Unity VFX Graph / 空间影像'
  },
  'sre-realtime-liveset-2026': {
    label: 'Realtime visual system',
    labelZh: '实时视觉系统',
    role: 'Tool / audiovisual pipeline',
    roleZh: '工具 / 音画流程'
  }
}

const projectImageOverrides = {
  timer: '/portfolio/assets/raw-library/timer-red-spatial-preview.webp'
}

function SelectedWorks() {
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const homepageWorks = pickWorksByIds(works, homeGalleryWorkIds)

  return (
    <section id="works" className="section selected-projects-section">
      <div className="container">
        <div className="section-heading-row">
          <div>
            <div className="eyebrow">{isZh ? '精选项目' : 'Selected Works'}</div>
            <h2 className="section-title">{isZh ? '六个入口，不重复陈列' : 'Six entries, no repeated wall'}</h2>
          </div>
          <p className="section-intro">
            {isZh
              ? '首页只保留能够快速解释实践结构的代表项目。完整履历、制作记录和历史节点进入 Works 与 Archive。'
              : 'The homepage keeps only representative projects that explain the practice quickly. Full history and production records stay in Works and Archive.'}
          </p>
        </div>

        <div className="selected-project-grid">
          {homepageWorks.map((work, index) => {
            const targetUrl = getWorkTargetUrl(work)
            const localizedWork = localizeWork(work, language)
            const note = projectNotes[work.id]
            const title = isZh && note?.titleZh ? note.titleZh : localizedWork.title
            const label = isZh ? note?.labelZh || localizedWork.type : note?.label || localizedWork.type
            const role = isZh ? note?.roleZh || localizedWork.subtitle : note?.role || localizedWork.subtitle

            return (
              <article key={work.id} className={`selected-project-card selected-project-card-${index + 1}`}>
                <a href={targetUrl} className="selected-project-thumb">
                  <img src={projectImageOverrides[work.id] || getDisplayImage(work)} alt={title} />
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
      </div>
    </section>
  )
}

export default SelectedWorks
