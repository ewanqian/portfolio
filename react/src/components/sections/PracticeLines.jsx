import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

const PracticeLines = () => {
  const { language } = useLanguage()
  const readingPaths = [
    {
      id: 'works',
      title: language === 'en' ? 'Start with the Works' : '先看作品',
      summary: language === 'en' ? 'If this is the first visit, the most effective way in is still through the representative works: they establish intensity, public-facing quality, and the difference between the core practice lines.' : '如果是第一次进入这个站，最有效的方式仍然是先看代表作品，先确认表达强度、公开呈现质量和三条主线之间的差异。',
      detail: language === 'en' ? 'The homepage keeps only Drop Flow, Kashiwa, and TIMER as the first three entries, so the reading path does not get diluted too early.' : '首页只保留 Drop Flow、Kashiwa、TIMER 三项核心入口，避免一开始就陷进过多枝节。',
      relatedProjects: ['Drop Flow', 'TIMER', 'Kashiwa Daisuke'],
      image: '/assets/home/featured-dropflow-hangzhou-biennale-scene.jpg',
      ctaLabel: language === 'en' ? 'Open Works' : '查看作品',
      ctaTo: '/',
      ctaState: { scrollTo: 'works' }
    },
    {
      id: 'gaussian',
      title: language === 'en' ? 'Then Open the Gaussian Archive' : '再看高斯档案库',
      summary: language === 'en' ? 'If the interest is in the newest module, spatial preservation, web embeds, or Vision Pro / XR paths, the next stop should be the Gaussian Archive.' : '如果你想看最近最新的模块，或者更关心空间保存、网页嵌入、Vision Pro / XR 路径，就继续进入高斯档案库。',
      detail: language === 'en' ? 'It gathers team-project spatial translations, independently scanned field archives, and the service / method path now forming around them.' : '这里集中放团队项目的空间转译样本、个人环境采样档案，以及正在形成的方法与服务路径。',
      relatedProjects: ['Dropflow Collection', 'TIMER Gaussian', 'Field Scans'],
      image: '/assets/gaussian-scenes/dropflow-collection-rooms719.webp',
      ctaLabel: language === 'en' ? 'Open Spatial Samples' : '查看空间样本',
      ctaTo: '/gaussian-scenes'
    },
    {
      id: 'production',
      title: language === 'en' ? 'For Collaboration, Go Straight to Production' : '如果是合作，直接看 Production',
      summary: language === 'en' ? 'If the reader is a client, institution, or partner, the most efficient route is not to keep scrolling the homepage but to move directly into Production.' : '如果你是客户、机构或合作团队，最有效的读法不是继续刷首页，而是直接进入 Production，看合作类型、预算理解和交付逻辑。',
      detail: language === 'en' ? 'That page answers much faster whether the collaboration fits, how a project starts, and what information should be confirmed first.' : '这一页会比作品页更快回答“适不适合合作、项目会怎么开始、哪些内容要先确认”。',
      relatedProjects: language === 'en' ? ['Live Visuals', 'Spatial Image', 'Delivery Specs'] : ['现场视觉', '空间影像', '交付规格'],
      image: '/assets/public-nodes/can-festival.jpg',
      ctaLabel: language === 'en' ? 'Open Production' : '查看合作方式',
      ctaTo: '/production'
    },
    {
      id: 'writing',
      title: language === 'en' ? 'Then Fill in the Methods and Research' : '再补方法与研究',
      summary: language === 'en' ? 'If the interest is in method, workflow, and judgment, Writing gets closer to how and why the work is built than the work pages do.' : '如果你想理解项目背后的方法、工作流和判断逻辑，Writing 会比作品页更接近“怎么做”和“为什么这样做”。',
      detail: language === 'en' ? 'It includes research notes, reflections, structural thinking, and knowledge blocks that can be reused by the service pages and work pages.' : '包括研究笔记、创作反思、系统整理，以及可以继续被服务页和作品页引用的知识块。',
      relatedProjects: ['Methods', 'Notes', 'Workflow'],
      image: '/assets/home/archive-observation-clean.jpg',
      ctaLabel: language === 'en' ? 'Open Writing' : '查看写作与研究',
      ctaTo: '/writing'
    },
    {
      id: 'archive',
      title: language === 'en' ? 'Finally, Read the Full Archive' : '最后补完整档案',
      summary: language === 'en' ? 'Once a basic judgment is in place, Archive becomes the place to read project history, expanded entries, public nodes, and version trails with more clarity.' : '当你已经建立了基本判断，再进入 Archive 看完整项目履历、扩展条目、公开节点和版本线索，会更容易读清楚这套系统。',
      detail: language === 'en' ? 'Archive is responsible for the full index; Gaussian Archive is responsible for the new branch and the method line. They should not collapse into each other.' : 'Archive 负责“全”，Gaussian Archive 负责“新”和“方法线”，两者不再互相重复。',
      relatedProjects: ['Projects', 'Public Nodes', 'Versions'],
      image: '/assets/public-nodes/ufo-terminal.jpg',
      ctaLabel: language === 'en' ? 'Open Archive Index' : '查看档案索引',
      ctaTo: '/archive'
    }
  ]

  return (
    <section id="practice-lines" className="section">
      <div className="container">
        <div className="eyebrow">Reading Paths</div>
        <h2 className="section-title">{language === 'en' ? 'How to Read This Site' : '怎么读这个站'}</h2>
        <p className="section-intro">
          {language === 'en' ? 'The homepage builds a basic judgment first, then routes different readers into the next page that makes the most sense. In the recommended order: works first, then the Gaussian Archive and Production, and finally Writing and Archive.' : '首页先建立基本判断，再把不同读者导到最合适的下一层。如果按推荐顺序读，建议先看作品，再进高斯档案库和 Production，最后补读 Writing 与 Archive。'}
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
