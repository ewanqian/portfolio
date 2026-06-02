import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

function Hero() {
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const media = [
    {
      src: '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-46s-orange-arc.webp',
      title: isZh ? '余佳运「45㎡」Opening' : 'Yu Jiayun 45㎡ Opening',
      meta: isZh ? '演唱会视觉 / 宁波' : 'Concert visual / Ningbo'
    },
    {
      src: '/portfolio/assets/raw-picks/titan-bolive-clean-16x9.webp',
      title: isZh ? '柏大辅 TITAN' : 'KASHIWA Daisuke / TITAN',
      meta: isZh ? '现场音画 / BO LIVE' : 'Live audiovisual / BO LIVE'
    },
    {
      src: '/portfolio/assets/rain-singapore/gallery/its-raining-wide-05.webp',
      title: isZh ? 'Rain 郑智薰 / Singapore' : 'Rain / Singapore',
      meta: isZh ? '舞台大屏幕视觉' : 'Stage screen visual'
    },
    {
      src: '/portfolio/assets/raw-library/timer-red-spatial-preview.webp',
      title: isZh ? 'TIMER / 控时者' : 'TIMER',
      meta: isZh ? '时间结构 / 空间影像' : 'Temporal image system'
    }
  ]
  const routes = [
    {
      to: '/works',
      number: '01',
      title: isZh ? '画廊' : 'Gallery',
      body: isZh ? '艺术作品 / 公开呈现' : 'Artworks / Public presentations'
    },
    {
      to: '/production',
      number: '02',
      title: isZh ? '制作' : 'Production',
      body: isZh ? '舞台视觉 / 交付记录' : 'Stage visuals / Delivery records'
    },
    {
      to: '/gaussian-scenes',
      number: '03',
      title: isZh ? '空间' : 'Spatial',
      body: isZh ? '高斯 / XR / 空间样本' : 'Gaussian / XR / Spatial samples'
    },
    {
      to: '/writing',
      number: '04',
      title: isZh ? '写作' : 'Writing',
      body: isZh ? '方法 / 项目史 / 长文本' : 'Methods / Project histories'
    }
  ]

  return (
    <section className="hero-editorial">
      <div className="container hero-editorial-grid">
        <div className="hero-copy">
          <div className="hero-cover-topline">
            <span>{isZh ? '现场视觉索引' : 'Live Visual Index'}</span>
            <span>2026</span>
          </div>
          <div className="hero-cover-title">
            <div className="hero-kicker">{isZh ? '媒体艺术 / 现场视觉 / 空间影像系统' : 'Media Art / Live Visuals / Spatial Image Systems'}</div>
            <h1 className="hero-title">
              <span>{isZh ? '钱誉文' : 'Ewan Qian'}</span>
              <span>{isZh ? 'Ewan Qian' : '钱誉文'}</span>
            </h1>
          </div>
          <div className="hero-cover-bottom">
            <p className="hero-subtitle">
              {isZh
                ? '为演出、展览与数字场景组织视觉系统。'
                : 'Visual systems for performance, exhibition, and digital scenes.'}
            </p>
            <p className="hero-tagline">
              {isZh
                ? '现场音画、空间屏幕、程序化图像、舞台视觉制作与长期项目档案。'
                : 'Live audiovisual work, spatial screens, procedural image systems, stage visual production, and long-form project archives.'}
            </p>
            <nav className="hero-index-list" aria-label={isZh ? '作品集入口' : 'Portfolio sections'}>
              {routes.map((route) => (
                <Link key={route.to} to={route.to}>
                  <span className="hero-index-number">{route.number}</span>
                  <span className="hero-index-title">{route.title}</span>
                  <span className="hero-index-body">{route.body}</span>
                </Link>
              ))}
            </nav>
            <Link className="hero-archive-link" to="/archive">
              {isZh ? '完整项目归档' : 'Full project archive'}
            </Link>
          </div>
        </div>
        <div className="hero-media-grid">
          <figure className="hero-stage-frame">
            <img src={media[0].src} alt={media[0].title} />
            <figcaption>
              <span>{media[0].title}</span>
              <small>{media[0].meta}</small>
            </figcaption>
          </figure>
          <div className="hero-contact-sheet">
            {media.slice(1).map((item, index) => (
              <figure key={item.src} className={`hero-media-card hero-media-card-${index + 2}`}>
              <img src={item.src} alt={item.title} />
              <figcaption>
                <span>{item.title}</span>
                <small>{item.meta}</small>
              </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
