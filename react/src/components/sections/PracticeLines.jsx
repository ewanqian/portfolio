import { Link } from 'react-router-dom'

const practiceLines = [
  {
    id: 'live-performance',
    title: 'Live Performance Visuals / 现场演出视觉',
    summary: '在舞台和现场环境中构建实时视听关系',
    relatedProjects: ['Drop Flow', 'Kashiwa Daisuke'],
    image: '/portfolio/assets/home/featured-dropflow-main.jpg'
  },
  {
    id: 'spatial-image',
    title: 'Spatial Image & Immersive Environments / 空间影像与沉浸环境',
    summary: '探索空间感知与数字环境的共生',
    relatedProjects: ['Observation and Symbiosis'],
    image: '/portfolio/assets/public-nodes/observation-symbiosis.jpg'
  },
  {
    id: 'real-time-systems',
    title: 'Real-time Systems & Previsualization / 实时系统与预演方法',
    summary: '开发工具链支撑创作与预演',
    relatedProjects: ['TIMER', 'SceneForge'],
    image: '/portfolio/assets/home/featured-timer-main.jpg'
  },
  {
    id: 'research-archive',
    title: 'Research, Archive & Digital Tools / 研究、归档与数字工具',
    summary: '整理实践脉络并构建工具生态',
    relatedProjects: ['Portfolio', 'Newsroom'],
    image: '/portfolio/assets/home/posterwall.jpg'
  }
]

const PracticeLines = () => {
  return (
    <section id="practice-lines" className="section">
      <div className="container">
        <div className="eyebrow">Practice Lines</div>
        <h2 className="section-title">实践主线</h2>
        <p className="section-intro">
          四条并行推进的创作主线，每条都有自己的项目脉络和探索方向。
        </p>
        
        <div className="practice-lines-grid">
          {practiceLines.map((line) => (
            <article key={line.id} className="practice-line-card">
              <div className="practice-line-image">
                <img src={line.image} alt={line.title} />
              </div>
              <div className="practice-line-content">
                <h3>{line.title}</h3>
                <p>{line.summary}</p>
                <div className="practice-line-projects">
                  {line.relatedProjects.map((project, i) => (
                    <span key={i} className="practice-line-tag">{project}</span>
                  ))}
                </div>
                <Link to="/archive" className="btn btn-outline">
                  Open Archive
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
