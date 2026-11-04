import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

function Hero() {
  const { language } = useLanguage()
  const isZh = language === 'zh'

  return (
    <section className="editorial-intro" data-page-motion>
      <div className="container editorial-intro-grid">
        <div className="editorial-intro-name">
          <span>Ewan Qian</span>
          <span>钱誉文</span>
        </div>

        <div className="editorial-intro-copy">
          <p>
            {isZh
              ? '新媒体视觉艺术家 / 现场视觉表演者。以实时图像、空间影像和音画系统组织舞台、屏幕与数字空间。'
              : 'Media artist / live visual performer working with realtime image, spatial media, and audiovisual systems across stages, screens, and digital environments.'}
          </p>
          <div className="editorial-intro-meta">
            <span>Media Art</span>
            <span>Live Audiovisual</span>
            <span>Spatial Image</span>
          </div>
          <div className="editorial-intro-links">
            <Link to="/works">{isZh ? '代表作品' : 'Selected work'}</Link>
            <Link to="/profile">{isZh ? '个人资料' : 'Profile'}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
