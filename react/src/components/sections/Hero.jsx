import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { profileCopy } from '../../data/profile.js'

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

function Hero() {
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const profile = profileCopy[language]
  const [activeIndex, setActiveIndex] = useState(0)
  const [guiding, setGuiding] = useState(true)
  const mainWork = heroWorks[activeIndex]
  const progress = useMemo(() => `${((activeIndex + 1) / heroWorks.length) * 100}%`, [activeIndex])
  const visibleRail = heroWorks.filter((_, index) => index !== activeIndex).slice(0, 3)

  const stepBy = useCallback((delta) => {
    setActiveIndex((current) => (current + delta + heroWorks.length) % heroWorks.length)
    setGuiding(false)
  }, [])

  useEffect(() => {
    if (!guiding || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroWorks.length)
    }, 7800)

    return () => window.clearInterval(timer)
  }, [guiding])

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
            {profile.heroTitle.map((line) => <span key={line}>{line}</span>)}
          </h1>
          <p>{profile.heroIntro}</p>
          <div className="hero-home-v3-tags" aria-label={isZh ? '实践方向' : 'Practice fields'}>
            {profile.heroTags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <div className="hero-home-v3-actions">
            <Link to="/works">{isZh ? '精选作品' : 'Selected works'}</Link>
            <Link to="/profile">{isZh ? '个人介绍' : 'Profile'}</Link>
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
          {visibleRail.map((work) => (
            <Link to={work.to} className="hero-home-v3-rail-item" key={work.to + work.title.en}>
              <img src={work.image} alt={work.title[language]} />
              <span>
                <small>{work.role[language]}</small>
                <strong>{work.title[language]}</strong>
                <em>{work.type[language]}</em>
              </span>
            </Link>
          ))}
        </div>

        <div className="hero-guide-player" data-reveal aria-label={isZh ? '自动导览播放器' : 'Auto guide player'}>
          <button type="button" onClick={() => stepBy(-1)} aria-label={isZh ? '上一项' : 'Previous'}>‹</button>
          <button type="button" onClick={() => setGuiding((value) => !value)} aria-pressed={guiding}>
            {guiding ? 'Ⅱ' : '▶'}
          </button>
          <button type="button" onClick={() => stepBy(1)} aria-label={isZh ? '下一项' : 'Next'}>›</button>
          <span>{String(activeIndex + 1).padStart(2, '0')} / {String(heroWorks.length).padStart(2, '0')}</span>
          <i aria-hidden="true"><b style={{ width: progress }} /></i>
        </div>

      </div>
    </section>
  )
}

export default Hero
