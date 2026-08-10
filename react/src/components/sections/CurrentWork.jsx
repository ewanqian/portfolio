import works from '../../data/generated/works'
import { currentWorkIds, pickWorksByIds } from '../../data/siteTaxonomy'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

function CurrentWork() {
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const [work] = pickWorksByIds(works, currentWorkIds)

  if (!work) return null

  return (
    <section id="current-work" className="section profile-block-section">
      <div className="container profile-block-grid">
        <div>
          <div className="eyebrow">{isZh ? '正在进行 / Current' : 'Current / Ongoing'}</div>
          <h2 className="section-title">VRplay AI / XR Hackathon 2026</h2>
        </div>

        <div className="profile-block-copy">
          <p>
            {isZh
              ? '当前合作集中在品牌视觉、动态视觉系统、PPT / Keynote 模板与赛事信息组织，并尝试把专题网页做成一个可以独立传播的空间化动态海报。'
              : 'The current collaboration focuses on visual identity, motion language, PPT / keynote templates, and public event information, with a spatial web page developed as a campaign object in its own right.'}
          </p>
          <p>
            {isZh
              ? '网页概念从普通活动页进一步延伸到轻量 3D / GS 场景、档案查看、地图与角色化信息：用 ARG 式叙事和空间感知建立“进入活动”的感觉，而不是先承诺一套完整赛事后台。'
              : 'The web study extends beyond a conventional event page toward lightweight 3D / GS scenes, archive-like viewing, maps, and role-based information, using ARG-like narrative and spatial perception as communication devices.'}
          </p>
          <a className="text-link" href={work.repoLink} target="_blank" rel="noreferrer">
            {isZh ? '查看当前项目记录' : 'Open current project record'}
          </a>
        </div>
      </div>
    </section>
  )
}

export default CurrentWork
