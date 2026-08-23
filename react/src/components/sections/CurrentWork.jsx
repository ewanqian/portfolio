import { useLanguage } from '../../i18n/LanguageContext.jsx'

const MANA_ARCHIVE_TIME = Date.parse('2026-08-30T00:00:00+08:00')

function CurrentWork() {
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const workshopIsUpcoming = Date.now() < MANA_ARCHIVE_TIME

  if (!workshopIsUpcoming) return null

  return (
    <section id="current-work" className="section profile-block-section">
      <div className="container profile-block-grid">
        <div>
          <div className="eyebrow">{isZh ? '近期公开活动 / Upcoming' : 'Upcoming Public Program'}</div>
          <h2 className="section-title">{isZh ? 'MANA 8.29｜极简输入：构建视听系统' : 'MANA 8.29 · Minimal Input / Audiovisual System'}</h2>
        </div>

        <div className="profile-block-copy">
          <p>
            {isZh
              ? '2026 年 8 月 29 日，13:30–16:30。三小时从一个输入出发，比较“太薄”和“太满”的失败系统，再进入 State、Feedback、Safe Loop 与最小 Live System。'
              : 'Aug 29, 2026, 13:30–16:30. A three-hour workshop that starts from one input, compares systems that are too thin or too overloaded, then moves into state, feedback, safe loops, and a minimal live system.'}
          </p>
          <p>
            {isZh
              ? '公开讲义已经把概念、课堂步骤与可玩的 Demo 放在同一条阅读路径中；理论页进一步解释新媒体工程控制论的状态、反馈、稳定性与可控性。'
              : 'The public guide keeps concepts, classroom steps, and playable demos in one reading path. A separate control-model lecture expands on state, feedback, stability, and controllability.'}
          </p>
          <div className="hero-cta">
            <a className="text-link" href="/workshops/gamified-ai-new-media-art-engineer-101/">
              {isZh ? '打开工作坊讲义' : 'Open workshop guide'}
            </a>
            <a className="text-link" href="/research/performance-control-model/">
              {isZh ? '阅读新媒体工程控制论' : 'Read the control model'}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CurrentWork
