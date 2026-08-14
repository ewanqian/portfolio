import works from '../../data/generated/works'
import { getDisplayImage, getWorkTargetUrl } from '../../data/siteDisplay'
import { homeGalleryWorkIds, pickWorksByIds } from '../../data/siteTaxonomy'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { localizeWork } from '../../i18n/content.js'

const projectNotes = {
  'ersha-time-eternal-observer-2026': {
    label: 'Spatial film / 3D reconstruction',
    labelZh: '空间电影 / 三维重建',
    role: '3D Visual Artist / Capture & 3D Reconstruction',
    roleZh: '三维视觉 / 空间采集与三维重建'
  },
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
            <h2 className="section-title">{isZh ? '代表作品与系统' : 'Selected works and systems'}</h2>
          </div>
          <p className="section-intro">
            {isZh
              ? '从长期艺术作品、现场音画、空间影像到实时系统，以下项目构成当前个人实践的主要入口。'
              : 'From long-form artworks and live audiovisual work to spatial image and realtime systems, these projects form the main entry points into the current practice.'}
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
