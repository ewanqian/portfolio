import works from '../../data/generated/works'
import { getDisplayImage, getWorkTargetUrl } from '../../data/siteDisplay'
import { homeGalleryWorkIds, pickWorksByIds } from '../../data/siteTaxonomy'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { localizeWork } from '../../i18n/content.js'

const projectNotes = {
  'drop-flow': {
    label: 'Artwork / Immersive audiovisual',
    labelZh: '艺术作品 / 沉浸式音画',
    role: 'Media artist / visual system',
    roleZh: '媒体艺术 / 视觉系统',
    note: 'Long-form work around time, image, sound, and spatial presentation.',
    noteZh: '围绕时间、图像、声音和空间呈现展开的长期作品线。'
  },
  kashiwa: {
    label: 'Live audiovisual collaboration',
    labelZh: '现场音画合作',
    role: 'Visual production / spatial illusion content',
    roleZh: '视觉制作 / 空间幻象内容',
    titleZh: '《机械光合：TITAN 的全息声林》',
    note: 'Live audiovisual collaboration built around TITAN by Japanese musician and composer KASHIWA Daisuke / 柏大辅, with holographic scrim, spatial depth, and screen illusion.',
    noteZh: '围绕日本音乐人、作曲家柏大辅《TITAN》展开的现场音画合作，结合全息纱幕、空间纵深与屏幕幻象。'
  },
  'yujiayun-45ping-visual-2025': {
    label: 'Concert production',
    labelZh: '演唱会制作',
    role: 'Visual production / delivery engineering',
    roleZh: '视觉制作 / 工程交付',
    titleZh: '余佳运「45㎡」演唱会宁波站',
    note: 'Opening visual system, floor LED content, and selected song deliverables under director and visual director guidance.',
    noteZh: '在导演与视觉导演指导下完成 Opening 视觉系统、地屏内容与部分曲目交付。'
  },
  'rain-singapore-visual-2026': {
    label: 'Stage visual delivery',
    labelZh: '舞台视觉交付',
    role: 'Production support',
    roleZh: '视觉制作支持',
    titleZh: 'Rain 郑智薰新加坡跨年专场',
    note: 'SINGLAND Festival stage visual production record across opening materials, It’s Raining, Rainism, and La Song wide-screen states.',
    noteZh: 'Rain 郑智薰新加坡 SINGLAND Festival 舞台视觉制作记录，包含开场素材与多首曲目的大屏幕视觉状态。'
  },
  timer: {
    label: 'Media artwork / temporal system',
    labelZh: '媒体艺术 / 时间系统',
    role: 'Media artist',
    roleZh: '媒体艺术',
    note: 'Time-structure visual work across performance, exhibition, and audiovisual presentation.',
    noteZh: '面向演出、展览和音画呈现的时间结构视觉作品。'
  },
  'vrplay-hackathon-visual-2025': {
    label: 'XR visual identity',
    labelZh: 'XR 活动视觉系统',
    role: 'Visual identity / spatial concept',
    roleZh: '主视觉 / 空间概念',
    titleZh: 'VRplay WORLD REMIX XR 黑客松',
    note: 'A complete visual identity and spatial-stage concept for an XR hackathon, stronger as a public-facing cover than internal tool screenshots.',
    noteZh: '面向 XR 黑客松的主视觉与空间舞台概念，保留项目的空间尺度与视觉方向。'
  },
  'sre-realtime-liveset-2026': {
    label: 'Realtime visual system',
    labelZh: '实时视觉系统',
    role: 'Tool / audiovisual pipeline',
    roleZh: '工具 / 音画流程',
    note: 'A system-facing entry for realtime image work, benchmarked output, and live-set preparation.',
    noteZh: '面向实时图像、输出测试和 live set 准备的系统入口。'
  }
}

const projectImageOverrides = {
  timer: '/portfolio/assets/raw-library/timer-red-spatial-preview.webp'
}

function SelectedWorks() {
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const homepageWorks = pickWorksByIds(works, homeGalleryWorkIds).filter((work) => work.id !== 'drop-flow')

  return (
    <section id="works" className="section selected-projects-section">
      <div className="container">
        <div className="section-heading-row">
          <div>
            <div className="eyebrow">{isZh ? '精选项目' : 'Selected Works'}</div>
            <h2 className="section-title">{isZh ? '作品墙' : 'Work Wall'}</h2>
          </div>
          <p className="section-intro">
            {language === 'en'
              ? 'A compact wall of works and production records. The long explanations move into project pages.'
              : '用更短的方式排列作品与制作记录。详细说明放进项目页。'}
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
            const summary = isZh
              ? `${localizedWork.years} / ${role}`
              : `${localizedWork.years} / ${role}`

            return (
              <article key={work.id} className={`selected-project-card selected-project-card-${index + 1}`}>
                <a href={targetUrl} className="selected-project-thumb">
                  <img src={projectImageOverrides[work.id] || getDisplayImage(work)} alt={title} />
                </a>
                <div className="selected-project-content">
                  <span className="selected-project-index">{String(index + 1).padStart(2, '0')}</span>
                  <div className="selected-project-label">{label}</div>
                  <h3><a href={targetUrl}>{title}</a></h3>
                  <p>{summary}</p>
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
