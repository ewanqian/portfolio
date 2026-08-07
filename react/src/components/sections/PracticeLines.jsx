import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

const practiceLines = [
  {
    id: 'live',
    title: { zh: '现场音画', en: 'Live Audiovisual' },
    summary: {
      zh: '把声音、图像、时间与现场空间组织成可演奏、可控制的视觉结构。',
      en: 'Sound, image, time, and performance space organized into playable and controllable visual structures.'
    },
    tags: ['Performance', 'Live Visual', 'AV Systems'],
    image: '/portfolio/assets/raw-picks/titan-bolive-clean-16x9.webp',
    to: '/works'
  },
  {
    id: 'spatial',
    title: { zh: '空间影像与扫描', en: 'Spatial Image & Scanning' },
    summary: {
      zh: '通过扫描、点云与高斯场景，把真实环境转译成可以保存、重组和再次进入的数字空间。',
      en: 'Scanning, point clouds, and Gaussian scenes translate physical environments into digital spaces that can be preserved, recomposed, and revisited.'
    },
    tags: ['Scanning', 'Gaussian', 'Spatial Archive'],
    image: '/portfolio/assets/gaussian-scenes/dropflow-collection-rooms719.webp',
    to: '/gaussian-scenes'
  },
  {
    id: 'systems',
    title: { zh: '实时系统与创作工具', en: 'Realtime Systems & Creative Tools' },
    summary: {
      zh: '将程序化图像、实时控制、AI 与跨软件工作流做成可复用的个人创作基础设施。',
      en: 'Procedural image, realtime control, AI, and cross-software workflows become reusable personal creative infrastructure.'
    },
    tags: ['Realtime', 'Creative Coding', 'Toolmaking'],
    image: '/portfolio/assets/raw-library/timer-red-spatial-preview.webp',
    to: '/production'
  },
  {
    id: 'workshops',
    title: { zh: '工作坊与共享方法', en: 'Workshops & Shared Methods' },
    summary: {
      zh: '把个人实践拆成可以参与、学习和继续改造的方法：从生活材料制作个人数字系统，再到自己的音画演出系统。',
      en: 'Personal practice is opened into methods that others can enter, learn, and modify—from everyday materials to personal digital systems and audiovisual instruments.'
    },
    tags: ['Tools for One', 'AV Instrument', 'Open Resources'],
    image: '/portfolio/assets/home/featured-perceptual-environments.webp',
    to: '/workshops'
  }
]

function PracticeLines() {
  const { language } = useLanguage()
  const isZh = language === 'zh'

  return (
    <section id="practice-lines" className="section practice-system-section">
      <div className="container">
        <div className="practice-system-heading">
          <div>
            <div className="eyebrow">{isZh ? '实践结构' : 'Practice Structure'}</div>
            <h2 className="section-title">{isZh ? '四条相互连接的实践线' : 'Four connected practice lines'}</h2>
          </div>
          <p className="section-intro">
            {isZh
              ? '它们不是互相分开的职业标签，而是同一套创作方法的不同输出：作品、空间、工具与共享方法。'
              : 'These are not separate job titles. They are different outputs of the same practice: works, spaces, tools, and shared methods.'}
          </p>
        </div>

        <div className="practice-system-grid">
          {practiceLines.map((line, index) => (
            <article key={line.id} className="practice-system-card" data-reveal>
              <Link to={line.to} className="practice-system-image">
                <img src={line.image} alt={line.title[language]} loading={index < 2 ? 'eager' : 'lazy'} />
              </Link>
              <div className="practice-system-card-copy">
                <span className="practice-system-index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{line.title[language]}</h3>
                <p>{line.summary[language]}</p>
                <div className="practice-system-tags">
                  {line.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <Link className="text-link" to={line.to}>
                  {isZh ? '进入这一条线' : 'Open this line'}
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
