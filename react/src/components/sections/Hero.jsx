import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

const heroWindows = [
  {
    to: '/projects/yujiayun-45m2',
    src: '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-46s-orange-arc.webp',
    title: { zh: '余佳运「45㎡」Opening', en: 'Yu Jiayun “45㎡” Opening' },
    meta: { zh: '演唱会视觉 / 宁波', en: 'Concert visual / Ningbo' }
  },
  {
    to: '/projects/kashiwa-titan',
    src: '/portfolio/assets/raw-picks/titan-bolive-clean-16x9.webp',
    title: { zh: '柏大辅「TITAN」现场音画', en: 'KASHIWA Daisuke “TITAN”' },
    meta: { zh: '全息纱幕 / BO LIVE', en: 'Holographic scrim / BO LIVE' }
  },
  {
    to: '/projects/rain-singapore',
    src: '/portfolio/assets/rain-singapore/gallery/its-raining-wide-05.webp',
    title: { zh: 'Rain 郑智薰 SINGLAND', en: 'Rain at SINGLAND' },
    meta: { zh: '新加坡跨年大屏幕视觉', en: 'Singapore stage screen visual' }
  }
]

function Hero() {
  const { language } = useLanguage()
  const isZh = language === 'zh'

  return (
    <section className="hero-spatial" data-page-motion>
      <img
        className="hero-spatial-backdrop"
        src="/portfolio/assets/home/hero-dropflow-ufo-2025.webp"
        alt=""
        aria-hidden="true"
      />
      <div className="hero-spatial-vignette" aria-hidden="true" />
      <div className="container hero-spatial-stage">
        <div className="hero-spatial-id" data-reveal>
          <span>{isZh ? '钱誉文 / Ewan Qian' : 'Ewan Qian / 钱誉文'}</span>
          <strong>{isZh ? '现场视觉与空间影像作品集' : 'Live Visuals and Spatial Image Portfolio'}</strong>
        </div>

        <Link to="/works" className="hero-spatial-main-window" data-reveal>
          <img src="/portfolio/assets/home/hero-dropflow-ufo-2025.webp" alt={isZh ? 'Drop Flow 空间影像现场' : 'Drop Flow spatial image performance'} />
          <span>
            <small>{isZh ? '主线作品' : 'Main Work Line'}</small>
            <strong>{isZh ? 'Drop Flow / 滴流' : 'Drop Flow'}</strong>
            <em>{isZh ? '声音、点云、数字自然与空间屏幕。' : 'Sound, point clouds, digital nature, and spatial screens.'}</em>
          </span>
        </Link>

        <div className="hero-spatial-copy" data-reveal>
          <p>
            {isZh
              ? '为现场演出、空间屏幕与数字场景制作视觉系统。'
              : 'Visual systems for live performance, spatial screens, and digital scenes.'}
          </p>
          <small>
            {isZh
              ? '媒体艺术 / 舞台视觉 / 演出制作 / 长期项目档案'
              : 'Media art / stage visuals / audiovisual production / long-form archives'}
          </small>
        </div>

        <div className="hero-spatial-window-stack" data-reveal>
          {heroWindows.map((item, index) => (
            <Link key={item.src} to={item.to} className={`hero-spatial-card hero-spatial-card-${index + 1}`}>
              <img src={item.src} alt={item.title[language]} />
              <span>
                <small>{String(index + 1).padStart(2, '0')}</small>
                <strong>{item.title[language]}</strong>
                <em>{item.meta[language]}</em>
              </span>
            </Link>
          ))}
        </div>

        <nav className="hero-spatial-launcher" aria-label={isZh ? '作品集入口' : 'Portfolio entries'} data-reveal>
          <Link to="/works">{isZh ? '画廊' : 'Gallery'}</Link>
          <Link to="/production">{isZh ? '制作' : 'Production'}</Link>
          <Link to="/archive">{isZh ? '归档' : 'Archive'}</Link>
          <Link to="/profile">{isZh ? '个人' : 'Profile'}</Link>
        </nav>
      </div>
    </section>
  )
}

export default Hero
