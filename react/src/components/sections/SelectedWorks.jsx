import works from '../../data/generated/works'
import { getDisplayImage, getWorkTargetUrl } from '../../data/siteDisplay'
import { homeGalleryWorkIds, homeMainlineWorkIds, pickWorksByIds } from '../../data/siteTaxonomy'
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
  'sre-realtime-liveset-2026': {
    label: '2026 realtime performance system',
    labelZh: '2026 实时演出系统',
    role: 'Realtime control / audiovisual pipeline',
    roleZh: '实时控制 / 音画流程'
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
  }
}

const projectImageOverrides = {
  timer: '/portfolio/assets/raw-library/timer-red-spatial-preview.webp'
}

function ProjectGrid({ items, language, startIndex = 0 }) {
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
        const displayIndex = startIndex + index + 1

        return (
          <article key={work.id} className={`selected-project-card selected-project-card-${index + 1}`}>
            <a href={targetUrl} className="selected-project-thumb">
              <img src={projectImageOverrides[work.id] || getDisplayImage(work)} alt={title} />
            </a>
            <div className="selected-project-content">
              <span className="selected-project-index">{String(displayIndex).padStart(2, '0')}</span>
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
  const mainlineWorks = pickWorksByIds(works, homeMainlineWorkIds)
  const branchWorks = pickWorksByIds(works, homeGalleryWorkIds)

  return (
    <>
      <section id="works" className="section selected-projects-section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <div className="eyebrow">{isZh ? '作品主线 / Mainline' : 'Practice Mainline'}</div>
              <h2 className="section-title">TIMER → Drop Flow → Realtime Live System</h2>
            </div>
            <p className="section-intro">
              {isZh
                ? '第一次进入本站，建议先沿这条线阅读：从时间与音画结构，进入空间化的长期作品，再到 2026 年的实时控制与现场系统。'
                : 'For a first visit, start here: temporal and audiovisual structure develops into a long-form spatial work, then into realtime control and live systems in 2026.'}
            </p>
          </div>
          <ProjectGrid items={mainlineWorks} language={language} />
        </div>
      </section>

      <section className="section selected-projects-section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <div className="eyebrow">{isZh ? '合作与空间实践' : 'Collaborations & Spatial Practice'}</div>
              <h2 className="section-title">{isZh ? '从主线向外展开' : 'Branches from the main practice'}</h2>
            </div>
            <p className="section-intro">
              {isZh
                ? '这些项目展示同一套方法如何进入音乐合作、空间影像与公共数字环境；它们作为支线补充主线，而不是按“最新”获得更高权重。'
                : 'These projects show the same methods entering music collaborations, spatial image, and public digital environments. They extend the mainline rather than being ranked simply by recency.'}
            </p>
          </div>
          <ProjectGrid items={branchWorks} language={language} startIndex={mainlineWorks.length} />
        </div>
      </section>
    </>
  )
}

export default SelectedWorks
