import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

const heroImages = [
  {
    src: '/portfolio/assets/raw-picks/titan-bolive-clean-16x9.jpg',
    title: 'KASHIWA Daisuke / TITAN',
    titleZh: '柏大辅《TITAN》',
    meta: 'Live audiovisual system',
    metaZh: '现场音画视觉系统'
  },
  {
    src: '/portfolio/assets/raw-picks/dropflow-concept-250426.jpg',
    title: 'DROP FLOW',
    titleZh: 'DROP FLOW',
    meta: 'Immersive audiovisual work',
    metaZh: '沉浸式音画作品'
  },
  {
    src: '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-52s-architecture.jpg',
    title: 'Yu Jiayun 45m2',
    titleZh: '余佳运「45m2」',
    meta: 'Concert visual delivery',
    metaZh: '演唱会视觉交付'
  },
  {
    src: '/portfolio/assets/raw-picks/timer-main.jpg',
    title: 'TIMER',
    titleZh: 'TIMER',
    meta: 'Temporal visual system',
    metaZh: '时间结构视觉系统'
  }
]

function Hero() {
  const { language } = useLanguage()

  return (
    <section className="hero hero-editorial">
      <div className="container hero-editorial-grid">
        <div className="hero-copy">
          <div className="hero-kicker">{language === 'en' ? 'Ewan Qian / 钱誉文' : '钱誉文 / Ewan Qian'}</div>
          <h1 className="hero-title">
            {language === 'en'
              ? 'Live visuals, immersive spatial media, AI visual systems.'
              : '现场视觉、沉浸空间影像与 AI 视觉系统。'}
          </h1>
          <p className="hero-subtitle">
            {language === 'en'
              ? 'Visual systems for performances, exhibitions, spatial image work, and virtual environments.'
              : '面向现场演出、展演空间、空间影像与虚拟环境的视觉系统。'}
          </p>
          <p className="hero-tagline">
            {language === 'en'
              ? 'Works are arranged by project, context, role, and output, with production records kept close to the visual evidence.'
              : '项目按场景、角色与交付内容呈现，制作记录与视觉证据放在相邻入口。'}
          </p>
          <div className="hero-cta">
            <Link className="button primary" to="/" state={{ scrollTo: 'works' }}>
              {language === 'en' ? 'Projects' : '项目'}
            </Link>
            <Link className="button" to="/production">
              {language === 'en' ? 'Production Records' : '制作记录'}
            </Link>
          </div>
        </div>

        <div className="hero-media-grid" aria-label="Selected visual works">
          {heroImages.map((image, index) => (
            <figure key={image.title} className={`hero-media-card hero-media-card-${index + 1}`}>
              <img src={image.src} alt={image.title} />
              <figcaption>
                <span>{language === 'en' ? image.title : image.titleZh || image.title}</span>
                <small>{language === 'en' ? image.meta : image.metaZh || image.meta}</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
