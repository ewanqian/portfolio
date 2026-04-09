import works from '../../data/generated/works'

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
                <p>{work.summary}</p>
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
