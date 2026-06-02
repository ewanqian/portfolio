import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

const stripItems = [
  {
    src: '/portfolio/assets/raw-picks/titan-bolive-clean-16x9.webp',
    href: '/projects/kashiwa-titan',
    title: {
      zh: '柏大辅「TITAN」现场音画',
      en: 'KASHIWA Daisuke “TITAN”'
    },
    meta: {
      zh: '全息纱幕 / 空间错觉 / BO LIVE',
      en: 'Holographic scrim / spatial illusion / BO LIVE'
    }
  },
  {
    src: '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-46s-orange-arc.webp',
    href: '/projects/yujiayun-45m2',
    title: {
      zh: '余佳运「45㎡」Opening',
      en: 'Yu Jiayun “45㎡” Opening'
    },
    meta: {
      zh: '演唱会视觉 / 地屏与 PGM 状态',
      en: 'Concert visual / floor LED and PGM states'
    }
  },
  {
    src: '/portfolio/assets/rain-singapore/gallery/its-raining-wide-05.webp',
    href: '/projects/rain-singapore',
    title: {
      zh: 'Rain 郑智薰 SINGLAND Festival',
      en: 'Rain at SINGLAND Festival'
    },
    meta: {
      zh: '跨年晚会大屏幕舞台视觉',
      en: 'New Year stage screen visual'
    }
  },
  {
    src: '/portfolio/assets/raw-library/timer-red-spatial-preview.webp',
    href: '/works',
    title: {
      zh: 'TIMER / 控时者',
      en: 'TIMER'
    },
    meta: {
      zh: '时间结构 / 粒子场 / 环绕屏幕',
      en: 'Temporal structure / particle field / spatial screen'
    }
  },
  {
    src: '/portfolio/assets/public-nodes/can-festival.webp',
    href: '/archive',
    title: {
      zh: 'CAN Festival 舟山',
      en: 'CAN Festival Zhoushan'
    },
    meta: {
      zh: '音乐现场 / 舞台视觉语境',
      en: 'Music live context / stage visual'
    }
  }
]

function StageStrip() {
  const { language } = useLanguage()
  const isZh = language === 'zh'

  return (
    <section className="stage-strip-section">
      <div className="stage-strip-header container" data-reveal>
        <div>
          <div className="eyebrow">{isZh ? '舞台与屏幕' : 'Stage / Screen Works'}</div>
          <h2 className="section-title">
            {isZh ? '现场项目与屏幕状态' : 'Live projects and screen states'}
          </h2>
        </div>
        <p className="section-intro">
          {isZh
            ? '这些项目更接近演出中的屏幕、地屏、纱幕、环幕和现场 cue，而不是普通图片卡片。'
            : 'These projects are closer to screens, floor LEDs, scrims, circular displays, and live cues than ordinary portfolio cards.'}
        </p>
      </div>
      <div className="stage-strip-viewport">
        <div className="stage-strip-track">
          {stripItems.map((item, index) => (
            <Link
              key={item.src}
              to={item.href}
              className={`stage-strip-panel stage-strip-panel-${index + 1}`}
            >
              <img src={item.src} alt={item.title[language]} loading={index === 0 ? 'eager' : 'lazy'} />
              <span className="stage-strip-caption">
                <span className="stage-strip-index">{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.title[language]}</strong>
                <small>{item.meta[language]}</small>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StageStrip
