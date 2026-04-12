import works from '../../data/generated/works'

const workHighlights = {
  'drop-flow': '杭州双年展开幕与常设展呈现，获杭州国际电子音乐作曲比赛一等奖，并入选 2025「流光绘影」光影科技艺术节优秀作品。',
  kashiwa: '与 Kashiwa Daisuke、Yuki Murata 在 BO LIVE Shenzhen 完成专场视听合作，包含全息纱幕、裸眼 3D 与音画互动段落。',
  timer: 'UFO Terminal「加载…创作营」支持创作，入选「加载…权限 2」展览，并获 ChinaGraph 2024 电子剧场优秀音乐作品二等奖。'
}

function SelectedWorks() {
  return (
    <section id="works" className="section">
      <div className="container">
        <div className="eyebrow">Selected Works</div>
        <h2 className="section-title">作品选集</h2>
        <p className="section-intro">
          当前优先阅读的作品入口。后续将继续扩展为更完整的作品墙与时间线系统。
        </p>
        <div className="grid-3">
          {works.map((work) => (
            <article key={work.id} className="card work-card">
              <a href={work.repoLink} className="thumb">
                <img src={work.image} alt={work.title} />
              </a>
              <div className="content">
                <h3><a href={work.repoLink}>{work.title}</a></h3>
                <p className="work-card-meta">{work.years} · {work.subtitle}</p>
                <p>{work.summary}</p>
                <p className="work-card-note">{workHighlights[work.id]}</p>
                <div className="inline-links">
                  {work.links && work.links.map((link, i) => (
                    <a key={i} href={link.url}>{link.text}</a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SelectedWorks
