import works from '../../data/generated/works'
import { getDisplayImage, getWorkTargetUrl } from '../../data/siteDisplay'
import { homeMainlineWorkIds, pickWorksByIds } from '../../data/siteTaxonomy'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { localizeWork } from '../../i18n/content.js'

const projectNotes = {
  titan: {
    titleZh: '柏大辅《TITAN》',
    context: 'BO LIVE Shenzhen · 2025',
    contextZh: 'BO LIVE 深圳 · 2025',
    role: 'Visual production / spatial illusion content',
    roleZh: '视觉制作 / 空间幻象内容',
    summary: 'Live visual work developed around Kashiwa Daisuke’s TITAN, using holographic scrim, white-space depth, naked-eye 3D, and audiovisual staging to extend the music into a spatial image.',
    summaryZh: '围绕柏大辅《TITAN》展开的现场视觉制作，以全息纱幕、白空间纵深、裸眼 3D 与音画结构，把音乐延展成舞台中的空间影像。'
  },
  'drop-flow': {
    context: 'Hangzhou Biennale · 2024–2025',
    contextZh: '杭州艺术与科技国际双年展 · 2024–2025',
    role: 'Media art / visual system',
    roleZh: '媒体艺术 / 视觉系统',
    summary: 'A long-form audiovisual series developed through realtime image, spatial migration, and public presentation. Its Hangzhou Biennale presentation placed the work in an immersive exhibition and performance context.',
    summaryZh: '持续发展的音画系列，以实时图像、空间迁移与公共呈现为主线。杭州双年展开幕式版本把《滴流》推进到沉浸式展陈与现场语境中。'
  },
  timer: {
    context: 'UFO Terminal · Loading… Access 2 · 2024',
    contextZh: 'UFO Terminal「加载…权限 2」· 2024',
    role: 'Media artist',
    roleZh: '媒体艺术',
    summary: 'An ongoing work about temporal structure across sound, image, and spatial display. The current representative public version is the circular-screen presentation at UFO Terminal’s Loading… Access 2.',
    summaryZh: '围绕时间、声音、影像结构与空间呈现展开的长期项目；目前最具代表性的公开版本，是 UFO Terminal「加载…权限 2」中的环形屏幕呈现。'
  },
  'digital-garden-visual-2025': {
    context: 'Xi’an MixC · 2025',
    contextZh: '西安万象城「数字游园」· 2025',
    role: 'Unity VFX Graph / spatial image',
    roleZh: 'Unity VFX Graph / 空间影像',
    summary: 'A public-space visual environment built with Unity VFX Graph, translating a point-cloud forest into a continuously flowing digital garden for Xi’an MixC.',
    summaryZh: '面向西安万象城公共空间的数字环境视觉，以 Unity VFX Graph 将点云森林转译为持续流动的数字花园。'
  }
}

function ProjectGrid({ items, language }) {
  const isZh = language === 'zh'

  return (
    <div className="selected-project-grid editorial-work-grid">
      {items.map((work, index) => {
        const targetUrl = getWorkTargetUrl(work)
        const localizedWork = localizeWork(work, language)
        const note = projectNotes[work.id] || {}
        const title = isZh && note.titleZh ? note.titleZh : localizedWork.title
        const context = isZh ? note.contextZh || localizedWork.years : note.context || localizedWork.years
        const role = isZh ? note.roleZh || localizedWork.subtitle : note.role || localizedWork.subtitle
        const summary = isZh ? note.summaryZh || localizedWork.summary : note.summary || localizedWork.summary

        return (
          <article key={work.id} className={`selected-project-card editorial-work-card selected-project-card-${index + 1}`}>
            <a href={targetUrl} className="selected-project-thumb editorial-work-image" aria-label={title}>
              <img src={getDisplayImage(work)} alt={title} />
            </a>
            <div className="selected-project-content editorial-work-copy">
              <div className="editorial-work-meta">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>{context}</span>
              </div>
              <h3><a href={targetUrl}>{title}</a></h3>
              <p className="editorial-work-summary">{summary}</p>
              <div className="editorial-work-role">{role}</div>
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
    <section id="works" className="selected-projects-section editorial-work-section">
      <div className="container">
        <div className="editorial-work-heading">
          <span>{isZh ? '代表作品' : 'Selected work'}</span>
          <span>2024—2026</span>
        </div>
        <ProjectGrid items={selectedWorks} language={language} />
      </div>
    </section>
  )
}

export default SelectedWorks
