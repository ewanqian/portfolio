import { useLanguage } from '../../i18n/LanguageContext.jsx'

const MANA_ARCHIVE_TIME = Date.parse('2026-08-30T00:00:00+08:00')

function CurrentWork() {
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const workshopIsUpcoming = Date.now() < MANA_ARCHIVE_TIME

  return (
    <section id="current-work" className="section profile-block-section">
      <div className="container profile-block-grid">
        <div>
          <div className="eyebrow">
            {workshopIsUpcoming
              ? (isZh ? '近期公开活动 / Upcoming' : 'Upcoming Public Program')
              : (isZh ? '工作坊档案 / Workshop Archive' : 'Workshop Archive')}
          </div>
          <h2 className="section-title">
            {isZh ? 'MANA 8.29｜极简输入：构建视听系统' : 'MANA 8.29 · Minimal Input / Audiovisual System'}
          </h2>
        </div>

        <div className="profile-block-copy">
          {workshopIsUpcoming ? (
            <>
              <p>
                {isZh
                  ? '2026 年 8 月 29 日，13:30–16:30。三小时从一个输入出发，比较“太薄”和“太满”的失败系统，再进入 State、Feedback、Safe Loop 与最小 Live System。'
                  : 'Aug 29, 2026, 13:30–16:30. A three-hour workshop that starts from one input, compares systems that are too thin or too overloaded, then moves into state, feedback, safe loops, and a minimal live system.'}
              </p>
              <p>
                {isZh
                  ? '公开讲义已经把概念、课堂步骤与可玩的 Demo 放在同一条阅读路径中；理论页进一步解释状态、反馈、稳定性与可控性。'
                  : 'The public guide keeps concepts, classroom steps, and playable demos in one reading path, with a separate text on state, feedback, stability, and controllability.'}
              </p>
            </>
          ) : (
            <>
              <p>
                {isZh
                  ? '工作坊已完成。公开档案把现场录音与开发过程重新编辑为一条可继续使用的路径：从一个按键的 Tap / Hold / Release，到 BPM、Quantize、Shared State、视觉变体、演出系统与现场输出。'
                  : 'The workshop is complete. The archive edits the session and development process into a reusable path: from Tap / Hold / Release on a single key to BPM, quantization, shared state, visual variants, performance systems, and stage output.'}
              </p>
              <p>
                {isZh
                  ? '档案只保留方法、可运行 Demo、知识卡与后续练习；参与者身份、群聊、原始逐字稿和未核验的临时说法不进入公开页面。'
                  : 'The public archive keeps methods, runnable demos, skill cards, and follow-up exercises while excluding participant identities, chat logs, raw transcripts, and unverified provisional claims.'}
              </p>
            </>
          )}

          <div className="hero-cta">
            <a className="text-link" href={workshopIsUpcoming ? '/workshops/gamified-ai-new-media-art-engineer-101/' : '/mana-0829/'}>
              {workshopIsUpcoming
                ? (isZh ? '打开工作坊讲义' : 'Open workshop guide')
                : (isZh ? '打开工作坊公开档案' : 'Open workshop archive')}
            </a>
            <a className="text-link" href={workshopIsUpcoming ? '/research/performance-control-model/' : '/mana-0829/participant.html'}>
              {workshopIsUpcoming
                ? (isZh ? '阅读新媒体工程控制论' : 'Read the control model')
                : (isZh ? '参与者课后延伸' : 'Participant follow-up')}
            </a>
            {!workshopIsUpcoming && (
              <a className="text-link" href="/workshop-knowledge/">
                {isZh ? '打开知识库' : 'Open knowledge library'}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CurrentWork
