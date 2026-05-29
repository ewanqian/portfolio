import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

const copy = {
  zh: {
    heading: '站点结构',
    intro: '这个网站分为四个主要部分：Gallery 呈现作品画廊；Production Works 整理商业、活动与交付型制作项目；Spatial 收录空间样本与网页嵌入；Writing 记录方法、研究与工作流。',
    paths: [
      {
        id: 'gallery',
        title: '作品画廊',
        summary: '收录代表性的艺术项目与公开呈现，作为进入实践方向的第一层画廊。',
        relatedProjects: ['Artworks', 'Live Visuals', 'Audiovisual'],
        ctaLabel: '进入画廊',
        ctaTo: '/',
        ctaState: { scrollTo: 'works' }
      },
      {
        id: 'production',
        title: 'Production Works / 制作项目',
        summary: '整理商业案例、活动视觉系统、舞台视觉、公共空间内容与交付条件，面向机构、品牌、策展方和制作团队。',
        relatedProjects: ['Production Works', 'Collaboration', 'Delivery'],
        ctaLabel: '查看制作',
        ctaTo: '/production'
      },
      {
        id: 'spatial',
        title: 'Spatial / 空间样本',
        summary: '收录 Gaussian Splat、空间保存、网页嵌入与 Vision Pro / XR 相关样本，呈现空间影像方法的实验层。',
        relatedProjects: ['Gaussian Splat', 'Web Embed', 'XR'],
        ctaLabel: '查看空间样本',
        ctaTo: '/gaussian-scenes'
      },
      {
        id: 'writing',
        title: 'Writing / 写作与方法',
        summary: '记录围绕作品、现场、空间影像和制作系统展开的方法、研究笔记与工作流文本。',
        relatedProjects: ['Methods', 'Notes', 'Workflow'],
        ctaLabel: '查看写作',
        ctaTo: '/writing'
      }
    ]
  },
  en: {
    heading: 'Site Structure',
    intro: 'The site is organized into four main sections: Gallery presents selected artworks; Production Works gathers commercial, event, and delivery-based production projects; Spatial collects spatial samples and web embeds; Writing holds methods, research, and workflow notes.',
    paths: [
      {
        id: 'gallery',
        title: 'Gallery',
        summary: 'Selected artworks and public presentations form the first gallery layer of the practice.',
        relatedProjects: ['Artworks', 'Live Visuals', 'Audiovisual'],
        ctaLabel: 'Open Gallery',
        ctaTo: '/',
        ctaState: { scrollTo: 'works' }
      },
      {
        id: 'production',
        title: 'Production Works',
        summary: 'Commercial cases, event visual systems, stage visuals, public-space content, delivery conditions, and production formats for institutions, brands, curators, and production teams.',
        relatedProjects: ['Production Works', 'Collaboration', 'Delivery'],
        ctaLabel: 'Open Production',
        ctaTo: '/production'
      },
      {
        id: 'spatial',
        title: 'Spatial',
        summary: 'Gaussian Splat, spatial preservation, web embeds, and Vision Pro / XR samples show the spatial-image research layer.',
        relatedProjects: ['Gaussian Splat', 'Web Embed', 'XR'],
        ctaLabel: 'Open Spatial',
        ctaTo: '/gaussian-scenes'
      },
      {
        id: 'writing',
        title: 'Writing',
        summary: 'Methods, research notes, workflow texts, and essays around works, live contexts, spatial image systems, and production practice.',
        relatedProjects: ['Methods', 'Notes', 'Workflow'],
        ctaLabel: 'Open Writing',
        ctaTo: '/writing'
      }
    ]
  }
}

const PracticeLines = () => {
  const { language } = useLanguage()
  const content = copy[language]

  return (
    <section id="practice-lines" className="section reading-paths-section">
      <div className="container">
        <div className="eyebrow">Site Structure</div>
        <h2 className="section-title">{content.heading}</h2>
        <p className="section-intro">{content.intro}</p>

        <div className="reading-paths-list">
          {content.paths.map((path, index) => (
            <article key={path.id} className="reading-path-row">
              <div className="reading-path-index">{String(index + 1).padStart(2, '0')}</div>
              <div className="reading-path-body">
                <h3>{path.title}</h3>
                <p>{path.summary}</p>
                <div className="practice-line-projects">
                  {path.relatedProjects.map((project) => (
                    <span key={project} className="practice-line-tag">{project}</span>
                  ))}
                </div>
              </div>
              <Link to={path.ctaTo} state={path.ctaState} className="btn btn-outline reading-path-cta">
                {path.ctaLabel}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PracticeLines
