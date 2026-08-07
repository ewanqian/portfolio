import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

function Hero() {
  const { language } = useLanguage()
  const isZh = language === 'zh'

  return (
    <section className="home-system-hero" data-page-motion>
      <div className="home-system-hero-media" aria-hidden="true">
        <img src="/portfolio/assets/home/hero-dropflow-ufo-2025.webp" alt="" />
      </div>
      <div className="container home-system-hero-inner">
        <div className="home-system-hero-copy" data-reveal>
          <div className="home-system-hero-kicker">
            <span>{isZh ? '钱誉文 / Ewan Qian' : 'Ewan Qian / 钱誉文'}</span>
            <span>2026</span>
          </div>
          <h1>
            {isZh ? (
              <>
                <span>媒体艺术</span>
                <span>空间影像</span>
                <span>实时系统</span>
              </>
            ) : (
              <>
                <span>Media Art</span>
                <span>Spatial Image</span>
                <span>Realtime Systems</span>
              </>
            )}
          </h1>
          <p>
            {isZh
              ? '从现场音画、空间扫描到个人创作工具与工作坊，把数字技术组织成可以持续演化的作品、系统和方法。'
              : 'From live audiovisual work and spatial scanning to personal creative tools and workshops, digital technologies become evolving artworks, systems, and methods.'}
          </p>
          <div className="home-system-hero-actions">
            <Link className="button primary" to="/works">{isZh ? '查看作品' : 'View works'}</Link>
            <Link className="button" to="/workshops">{isZh ? '工作坊计划' : 'Workshops'}</Link>
          </div>
          <div className="home-system-hero-fields" aria-label={isZh ? '实践方向' : 'Practice fields'}>
            <span>Live AV</span>
            <span>Spatial Image</span>
            <span>Realtime Systems</span>
            <span>Workshops</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
