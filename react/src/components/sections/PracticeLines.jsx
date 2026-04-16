import { Link } from 'react-router-dom'

const readingPaths = [
  {
    id: 'works',
    title: '先看作品 / Selected Works',
    summary: '如果你想先确认表达气质、作品强度和公开呈现质量，先从代表作品入口开始。',
    relatedProjects: ['Drop Flow', 'TIMER', 'Kashiwa Daisuke'],
    image: '/portfolio/assets/home/featured-dropflow-main.jpg',
    ctaLabel: 'Open Works',
    ctaTo: '/',
    ctaState: { scrollTo: 'works' }
  },
  {
    id: 'production',
    title: '直接看合作 / Production',
    summary: '如果你是客户、机构或合作团队，最有效的读法是直接进入 Production，看服务类型、案例判断和沟通方式。',
    relatedProjects: ['Live Visuals', 'Spatial Image', 'Viewer / Spec'],
    image: '/portfolio/assets/public-nodes/can-festival.jpg',
    ctaLabel: 'Open Production',
    ctaTo: '/production'
  },
  {
    id: 'archive',
    title: '补看档案 / Archive',
    summary: '如果你需要更完整的项目履历、版本线索和公开记录，再继续进入项目档案页。',
    relatedProjects: ['Projects', 'Public Nodes', 'Versions'],
    image: '/portfolio/assets/home/posterwall.jpg',
    ctaLabel: 'Open Archive',
    ctaTo: '/archive'
  }
]

const PracticeLines = () => {
  return (
    <section id="practice-lines" className="section">
      <div className="container">
        <div className="eyebrow">Reading Paths</div>
        <h2 className="section-title">怎么读这个站</h2>
        <p className="section-intro">
          首页已经把创作方向放在前面了，这里不再重复讲一遍主线，而是给不同读者一条更有效的进入路径。
        </p>

        <div className="practice-lines-grid">
          {readingPaths.map((path) => (
            <article key={path.id} className="practice-line-card">
              <div className="practice-line-image">
                <img src={path.image} alt={path.title} />
              </div>
              <div className="practice-line-content">
                <h3>{path.title}</h3>
                <p>{path.summary}</p>
                <div className="practice-line-projects">
                  {path.relatedProjects.map((project) => (
                    <span key={project} className="practice-line-tag">{project}</span>
                  ))}
                </div>
                <Link to={path.ctaTo} state={path.ctaState} className="btn btn-outline">
                  {path.ctaLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PracticeLines
