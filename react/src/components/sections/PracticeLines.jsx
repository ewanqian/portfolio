import { Link } from 'react-router-dom'

const readingPaths = [
  {
    id: 'works',
    title: '先看作品 / Selected Works',
    summary: '如果是第一次进入这个站，最有效的方式仍然是先看代表作品，先确认表达强度、公开呈现质量和三条主线之间的差异。',
    detail: '首页只保留 Drop Flow、Kashiwa、TIMER 三项核心入口，避免一开始就陷进过多枝节。',
    relatedProjects: ['Drop Flow', 'TIMER', 'Kashiwa Daisuke'],
    image: '/portfolio/assets/home/featured-dropflow-hangzhou-biennale-scene.jpg',
    ctaLabel: '查看作品',
    ctaTo: '/',
    ctaState: { scrollTo: 'works' }
  },
  {
    id: 'gaussian',
    title: '再看高斯档案库 / Gaussian Archive',
    summary: '如果你想看最近最新的模块，或者更关心空间保存、网页嵌入、Vision Pro / XR 路径，就继续进入高斯档案库。',
    detail: '这里集中放团队项目的空间转译样本、个人环境采样档案，以及正在形成的方法与服务路径。',
    relatedProjects: ['Dropflow Collection', 'TIMER Gaussian', 'Field Scans'],
    image: '/portfolio/assets/gaussian-scenes/dropflow-collection-rooms719.webp',
    ctaLabel: '查看空间样本',
    ctaTo: '/gaussian-scenes'
  },
  {
    id: 'production',
    title: '如果是合作，直接看 Production',
    summary: '如果你是客户、机构或合作团队，最有效的读法不是继续刷首页，而是直接进入 Production，看合作类型、预算理解和交付逻辑。',
    detail: '这一页会比作品页更快回答“适不适合合作、项目会怎么开始、哪些内容要先确认”。',
    relatedProjects: ['现场视觉', '空间影像', '交付规格'],
    image: '/portfolio/assets/public-nodes/can-festival.jpg',
    ctaLabel: '查看合作方式',
    ctaTo: '/production'
  },
  {
    id: 'writing',
    title: '再补方法与研究 / Writing',
    summary: '如果你想理解项目背后的方法、工作流和判断逻辑，Writing 会比作品页更接近“怎么做”和“为什么这样做”。',
    detail: '包括研究笔记、创作反思、系统整理，以及可以继续被服务页和作品页引用的知识块。',
    relatedProjects: ['Methods', 'Notes', 'Workflow'],
    image: '/portfolio/assets/home/archive-observation-clean.jpg',
    ctaLabel: '查看写作与研究',
    ctaTo: '/writing'
  },
  {
    id: 'archive',
    title: '最后补完整档案 / Archive',
    summary: '当你已经建立了基本判断，再进入 Archive 看完整项目履历、扩展条目、公开节点和版本线索，会更容易读清楚这套系统。',
    detail: 'Archive 负责“全”，Gaussian Archive 负责“新”和“方法线”，两者不再互相重复。',
    relatedProjects: ['Projects', 'Public Nodes', 'Versions'],
    image: '/portfolio/assets/public-nodes/ufo-terminal.jpg',
    ctaLabel: '查看档案索引',
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
          首页先建立基本判断，再把不同读者导到最合适的下一层。如果按推荐顺序读，建议先看作品，再进高斯档案库和 Production，最后补读 Writing 与 Archive。
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
                <p>{path.detail}</p>
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
