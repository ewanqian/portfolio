import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

const stripItems = [
  {
    src: '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-46s-orange-arc.webp',
    href: '/projects/yujiayun-45m2',
    title: {
      zh: '余佳运「45㎡」Opening',
      en: 'Yu Jiayun “45㎡” Opening'
    },
    meta: {
      zh: '演唱会视觉 / 地屏与 PGM',
      en: 'Concert visual / floor LED and PGM'
    }
  },
  {
    src: '/portfolio/assets/digital-garden/digital-garden-xian-mixc-01.webp',
    href: '/projects/digital-garden',
    title: {
      zh: '西安万象城「数字游园」',
      en: 'Digital Garden / Xi’an MixC'
    },
    meta: {
      zh: '公共空间屏幕 / Unity VFX Graph',
      en: 'Public-space screen / Unity VFX Graph'
    }
  },
  {
    src: '/portfolio/assets/raw-picks/vrplay-keynote-16x9.webp',
    href: '/archive',
    title: {
      zh: 'VRplay WORLD REMIX XR',
      en: 'VRplay WORLD REMIX XR'
    },
    meta: {
      zh: 'XR 黑客松主视觉 / 活动系统',
      en: 'XR hackathon visual identity'
    }
  },
  {
    src: '/portfolio/assets/raw-library/floating-life-ii-performance.webp',
    href: '/archive',
    title: {
      zh: '《山海浮生II》',
      en: 'Floating Life II'
    },
    meta: {
      zh: '舞台视觉制作 / Edinburgh',
      en: 'Stage visual production / Edinburgh'
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
            {isZh ? '更多现场项目与屏幕状态' : 'More live projects and screen states'}
          </h2>
        </div>
        <p className="section-intro">
          {isZh
            ? '这一组聚焦演唱会、公共空间与活动视觉中的屏幕状态，作为主线作品之外的现场补充。'
            : 'This strip focuses on concert, public-space, and event visuals as live-screen complements to the main work line.'}
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
