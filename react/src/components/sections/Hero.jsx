import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

const heroWorks = [
  {
    to: '/works',
    image: '/portfolio/assets/home/hero-dropflow-ufo-2025.webp',
    title: { zh: 'Drop Flow / 滴流', en: 'Drop Flow' },
    type: { zh: '空间音画 / 数字自然', en: 'Spatial audiovisual / digital nature' },
    role: { zh: '主线作品', en: 'Main work line' }
  },
  {
    to: '/works',
    image: '/portfolio/assets/raw-library/timer-red-spatial-preview.webp',
    title: { zh: 'TIMER / 控时者', en: 'TIMER' },
    type: { zh: '时间结构 / 空间影像', en: 'Temporal structure / spatial image' },
    role: { zh: '长期作品线', en: 'Long-form work line' }
  },
  {
    to: '/projects/kashiwa-titan',
    image: '/portfolio/assets/raw-picks/titan-bolive-clean-16x9.webp',
    title: { zh: '柏大辅《TITAN》', en: 'KASHIWA Daisuke “TITAN”' },
    type: { zh: '现场音画 / BO LIVE', en: 'Live audiovisual / BO LIVE' },
    role: { zh: '视觉制作', en: 'Visual production' }
  },
  {
    to: '/projects/rain-singapore',
    image: '/portfolio/assets/rain-singapore/gallery/its-raining-wide-05.webp',
    title: { zh: 'Rain 郑智薰 / SINGLAND', en: 'Rain / SINGLAND' },
    type: { zh: '新加坡舞台大屏幕视觉', en: 'Singapore stage screen visual' },
    role: { zh: '制作记录', en: 'Production record' }
  }
]

const navItems = [
  { to: '/works', zh: '画廊', en: 'Works' },
  { to: '/production', zh: '制作', en: 'Production' },
  { to: '/gaussian-scenes', zh: '空间', en: 'Spatial' },
  { to: '/archive', zh: '归档', en: 'Archive' },
  { to: '/writing', zh: '写作', en: 'Writing' },
  { to: '/profile', zh: '个人', en: 'Profile' }
]

function Hero() {
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const mainWork = heroWorks[0]

  return (
    <section className="hero-spatial hero-home-v3" data-page-motion>
      <div className="hero-home-v3-bg" aria-hidden="true">
        <img src={mainWork.image} alt="" />
      </div>
      <div className="container hero-home-v3-stage">
        <div className="hero-home-v3-copy" data-reveal>
          <div className="hero-home-v3-kicker">
            <span>{isZh ? '钱誉文 / Ewan Qian' : 'Ewan Qian / 钱誉文'}</span>
            <span>2026</span>
          </div>
          <h1>
            {isZh ? (
              <>
                <span>现场视觉</span>
                <span>与空间影像</span>
                <span>作品集</span>
              </>
            ) : (
              <>
                <span>Live Visuals</span>
                <span>Spatial Images</span>
                <span>Portfolio</span>
              </>
            )}
          </h1>
          <p>
            {isZh
              ? '为演出、展览与数字场景制作视觉系统。'
              : 'Visual systems for performance, exhibition, and digital scenes.'}
          </p>
          <div className="hero-home-v3-tags" aria-label={isZh ? '实践方向' : 'Practice fields'}>
            <span>{isZh ? '媒体艺术' : 'Media art'}</span>
            <span>{isZh ? '舞台视觉' : 'Stage visuals'}</span>
            <span>{isZh ? '空间屏幕' : 'Spatial screens'}</span>
            <span>{isZh ? '长期项目档案' : 'Long-form archive'}</span>
          </div>
        </div>

        <Link to={mainWork.to} className="hero-home-v3-feature" data-reveal>
          <img src={mainWork.image} alt={mainWork.title[language]} />
          <span className="hero-home-v3-feature-caption">
            <small>{mainWork.role[language]}</small>
            <strong>{mainWork.title[language]}</strong>
            <em>{mainWork.type[language]}</em>
          </span>
        </Link>

        <div className="hero-home-v3-rail" data-reveal>
          {heroWorks.slice(1).map((work, index) => (
            <Link to={work.to} className="hero-home-v3-rail-item" key={work.to + work.title.en}>
              <img src={work.image} alt={work.title[language]} />
              <span>
                <small>{String(index + 2).padStart(2, '0')}</small>
                <strong>{work.title[language]}</strong>
                <em>{work.type[language]}</em>
              </span>
            </Link>
          ))}
        </div>

        <nav className="hero-home-v3-dock" aria-label={isZh ? '作品集导航' : 'Portfolio navigation'} data-reveal>
          {navItems.map((item) => (
            <Link to={item.to} key={item.to}>{isZh ? item.zh : item.en}</Link>
          ))}
        </nav>
      </div>
    </section>
  )
}

export default Hero
