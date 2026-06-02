import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

const PracticeLines = () => {
  const { language } = useLanguage()
  const readingPaths = [
    {
      id: 'works',
      title: language === 'en' ? 'Start with the Works' : '先看作品',
      summary: language === 'en' ? 'Representative works establish the site’s first judgment: intensity, public-facing quality, and the difference between the core practice lines.' : '代表作品先建立第一层判断：表达强度、公开呈现质量和三条主线之间的差异。',
      detail: language === 'en' ? 'The homepage keeps Drop Flow, Kashiwa, and TIMER as the first three entries, giving the reader a clean first layer before the archive opens wider.' : '首页保留 Drop Flow、Kashiwa、TIMER 三项核心入口，让读者先获得清晰的第一层判断，再进入更完整的档案。',
      relatedProjects: ['Drop Flow', 'TIMER', 'Kashiwa Daisuke'],
      image: '/assets/home/featured-dropflow-hangzhou-biennale-scene.webp',
      ctaLabel: language === 'en' ? 'Open Works' : '查看作品',
      ctaTo: '/',
      ctaState: { scrollTo: 'works' }
    },
    {
      id: 'gaussian',
      title: language === 'en' ? 'Then Open the Gaussian Archive' : '再看高斯档案库',
      summary: language === 'en' ? 'The newest module gathers spatial preservation, web embeds, and Vision Pro / XR paths inside the Gaussian Archive.' : '最新模块把空间保存、网页嵌入、Vision Pro / XR 路径集中在高斯档案库里。',
      detail: language === 'en' ? 'It gathers team-project spatial translations, independently scanned field archives, and the service / method path now forming around them.' : '这里集中放团队项目的空间转译样本、个人环境采样档案，以及正在形成的方法与服务路径。',
      relatedProjects: ['Drop Flow Collection', 'TIMER Gaussian', 'Field Scans'],
      image: '/assets/gaussian-scenes/dropflow-collection-rooms719.webp',
      ctaLabel: language === 'en' ? 'Open Spatial Samples' : '查看空间样本',
      ctaTo: '/gaussian-scenes'
    },
    {
      id: 'production',
      title: language === 'en' ? 'For Collaboration, Open Production' : '合作请看 Production',
      summary: language === 'en' ? 'Clients, institutions, and partners can use Production to judge service type, budget logic, delivery structure, and fit much faster.' : '客户、机构和合作团队可以直接进入 Production，快速判断合作类型、预算逻辑、交付结构和适配度。',
      detail: language === 'en' ? 'That page answers much faster whether the collaboration fits, how a project starts, and what information should be confirmed first.' : '这一页会比作品页更快回答“适不适合合作、项目会怎么开始、哪些内容要先确认”。',
      relatedProjects: language === 'en' ? ['Live Visuals', 'Spatial Image', 'Delivery Specs'] : ['现场视觉', '空间影像', '交付规格'],
      image: '/assets/public-nodes/can-festival.webp',
      ctaLabel: language === 'en' ? 'Open Production' : '查看合作方式',
      ctaTo: '/production'
    },
    {
      id: 'writing',
      title: language === 'en' ? 'Then Fill in the Methods and Research' : '再补方法与研究',
      summary: language === 'en' ? 'Writing opens the methods, workflow, and judgment behind the work, getting closer to how and why each structure is built.' : 'Writing 展开作品背后的方法、工作流和判断逻辑，更接近“怎么做”和“为什么这样做”。',
      detail: language === 'en' ? 'It includes research notes, reflections, structural thinking, and knowledge blocks that can be reused by the service pages and work pages.' : '包括研究笔记、创作反思、系统整理，以及可以继续被服务页和作品页引用的知识块。',
      relatedProjects: ['Methods', 'Notes', 'Workflow'],
      image: '/assets/home/archive-observation-clean.webp',
      ctaLabel: language === 'en' ? 'Open Writing' : '查看写作与研究',
      ctaTo: '/writing'
    },
    {
      id: 'archive',
      title: language === 'en' ? 'Finally, Read the Full Archive' : '最后补完整档案',
      summary: language === 'en' ? 'Once a basic judgment is in place, Archive becomes the place to read project history, expanded entries, public nodes, and version trails with more clarity.' : '当你已经建立了基本判断，再进入 Archive 看完整项目履历、扩展条目、公开节点和版本线索，会更容易读清楚这套系统。',
      detail: language === 'en' ? 'Archive holds the full index; Gaussian Archive holds the newer spatial sample branch and method line. Their roles stay clear.' : 'Archive 负责“全”，Gaussian Archive 负责“新”和“方法线”，两者角色清楚。',
      relatedProjects: ['Projects', 'Public Nodes', 'Versions'],
      image: '/assets/public-nodes/ufo-terminal.webp',
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
          {language === 'en' ? 'The homepage builds a basic judgment first, then guides different readers into the next page that makes the most sense: works first, then the Gaussian Archive and Production, and finally Writing and Archive.' : '首页先建立基本判断，再把不同读者导到最合适的下一层：先看作品，再进高斯档案库和 Production，最后补读 Writing 与 Archive。'}
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
