const directions = [
  {
    title: 'AI + 三维视觉开发',
    description: '围绕 AI 影像生成、数字环境、风格测试与视觉提案，发展更稳定的内容开发工作流。'
  },
  {
    title: '双目 / Apple Vision Pro / XR 内容',
    description: '推进双目影像、空间观看与沉浸式数字环境方向的测试、样片与定制内容开发。'
  },
  {
    title: '数字展览与展示系统',
    description: '将作品整理、展品分类、页面结构、策展说明与展示入口组织成更完整的线上专展与数字展览系统。'
  },
  {
    title: '实时系统、项目归档与工作流整理',
    description: '围绕实时系统、项目归档、页面组织与服务流程，持续把长期工作方法整理成更稳定的结构。'
  }
]

const publicSignals = [
  'UFO Terminal「加载…创作营」',
  'UFO Terminal「加载…权限 2」展览',
  'UFO Terminal × PRE / Rooooooom719 音画现场',
  'BO LIVE Shenzhen Audiovisual 展演专场',
  '杭州双年展开幕与常设展',
  'ChinaGraph 2024 电子剧场优秀音乐作品二等奖',
  '杭州国际电子音乐作曲比赛一等奖',
  '工作坊、研究与协作项目'
]

function ProfileDirections() {
  return (
    <section id="profile-directions" className="section">
      <div className="container">
        <div className="eyebrow">Profile / Current Directions</div>
        <h2 className="section-title">简介与当前方向</h2>
        <p className="section-intro" style={{ marginBottom: '14px' }}>
          钱誉文（Ewan Qian）是一位媒体艺术家、空间影像创作者与现场视觉制作人，工作横跨现场演出视觉、展览影像、沉浸式空间与数字媒介系统。
        </p>
        <p className="section-intro" style={{ marginBottom: '14px' }}>
          他的实践关注图像、声音、时间与空间如何共同构成一种可进入、可感知、可被重新组织的现场经验，并持续在艺术创作、现场制作与系统方法之间建立自己的工作路径。
        </p>
        <p className="section-intro">
          Ewan Qian is a media artist, spatial image creator, and live visual producer working across live performance visuals, exhibition image-making, immersive environments, and digital media systems.
        </p>

        <div className="grid-3" style={{ marginTop: '32px' }}>
          {directions.slice(0, 3).map((direction) => (
            <div key={direction.title} className="overview-card">
              <h4>{direction.title}</h4>
              <p>{direction.description}</p>
            </div>
          ))}
        </div>

        <div className="grid-3" style={{ marginTop: '18px' }}>
          <div className="overview-card">
            <h4>{directions[3].title}</h4>
            <p>{directions[3].description}</p>
          </div>
        </div>

        <div style={{ marginTop: '28px' }}>
          <div className="eyebrow">Selected Public Signals</div>
          <div className="signal-strip">
            {publicSignals.map((signal) => (
              <span key={signal} className="social-pill signal-pill">{signal}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileDirections
