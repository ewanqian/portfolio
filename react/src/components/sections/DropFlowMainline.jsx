import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

const dropFlowImages = [
  {
    src: '/portfolio/assets/drop-flow/optimized/dropflow-main.webp',
    label: '01'
  },
  {
    src: '/portfolio/assets/drop-flow/optimized/ufo-stage-01.webp',
    label: '02'
  },
  {
    src: '/portfolio/assets/raw-picks/dropflow-concept-250426.webp',
    label: '03'
  }
]

function DropFlowMainline() {
  const { language } = useLanguage()
  const isZh = language === 'zh'

  return (
    <section className="section dropflow-mainline-section" data-reveal>
      <div className="container dropflow-mainline-grid">
        <div className="dropflow-mainline-copy">
          <div className="eyebrow">{isZh ? '主线作品' : 'Main Work Line'}</div>
          <h2 className="section-title">{isZh ? 'Drop Flow / 滴流' : 'Drop Flow'}</h2>
          <p className="section-intro">
            {isZh
              ? '一条围绕声音、自然记忆、扫描数据、点云材料和空间屏幕展开的长期音画作品线。'
              : 'A long-form audiovisual work line built around sound, natural memory, scanned data, point-cloud material, and spatial screens.'}
          </p>
          <p>
            {isZh
              ? '作品从“一滴水生成一座花园”的意象出发，把数字自然、流场、几何结构和现场屏幕组织成持续演化的空间影像。'
              : 'The work begins with the image of a garden emerging from one drop of water, turning digital nature, flow fields, geometric structures, and screen space into an evolving spatial image system.'}
          </p>
          <Link className="text-link" to="/works">
            {isZh ? '查看作品线' : 'Open work line'}
          </Link>
        </div>

        <div className="dropflow-mainline-media">
          {dropFlowImages.map((image) => (
            <figure key={image.src} className="dropflow-mainline-frame">
              <img src={image.src} alt="" loading="lazy" />
              <figcaption>{image.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DropFlowMainline
