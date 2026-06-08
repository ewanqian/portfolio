import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import scenes from '../data/generated/gaussianScenes'

const dockItems = [
  { label: '首页', to: '/' },
  { label: '画廊', to: '/works' },
  { label: '制作', to: '/production' },
  { label: '空间', to: '/gaussian-scenes' },
  { label: '写作', to: '/writing' },
  { label: '个人', to: '/profile' },
  { label: '归档', to: '/archive' }
]

function getSceneImage(scene) {
  const image = scene.localThumbnail || scene.thumbnail || scene.ogImage

  if (!image) return '/portfolio/assets/gaussian-scenes/shinjuku-gyoen-greenhouse.webp'
  if (image.startsWith('/portfolio/')) return image
  if (image.startsWith('/assets/')) return `/portfolio${image}`
  if (image.startsWith('assets/')) return `/portfolio/${image}`
  return image
}

function getCategoryLabel(category) {
  if (category === 'work-derived') return '作品转译'
  if (category === 'field-scan') return '环境采样'
  return '空间样本'
}

function GaussianScenes() {
  const featured = scenes.filter((scene) => scene.featured)
  const fieldScans = scenes.filter((scene) => scene.category === 'field-scan')
  const totalViews = scenes.reduce((sum, scene) => sum + Number.parseInt(scene.views || 0, 10), 0)

  return (
    <>
      <main className="frontstage-page gaussian-front">
        <nav className="frontstage-dock" aria-label="主导航">
          {dockItems.map((item) => (
            <Link to={item.to} key={item.label}>{item.label}</Link>
          ))}
        </nav>

        <section className="frontstage-hero">
          <div>
            <span>Gaussian Spatial Archive</span>
            <h1>高斯空间档案</h1>
          </div>
          <p>
            围绕高斯重建、点云查看、环境采样和网页呈现整理出的空间研究项目。它与 TIMER、Drop Flow 一起构成长期实践中的空间影像方法线。
          </p>
        </section>

        <section className="front-route" aria-label="空间档案浏览路径">
          <span>浏览路径</span>
          <a href="#gaussian-overview">概览</a>
          <a href="#spatial-method">空间方法</a>
          <a href="#scene-index">样本索引</a>
          <Link to="/projects/drop-flow">Drop Flow</Link>
        </section>

        <section className="front-summary-grid" id="gaussian-overview" aria-label="空间档案概览">
          <article>
            <span>Scenes</span>
            <strong>{scenes.length}</strong>
            <p>已整理的空间样本。</p>
          </article>
          <article>
            <span>Works</span>
            <strong>{featured.length}</strong>
            <p>TIMER 与 Drop Flow 的作品转译。</p>
          </article>
          <article>
            <span>Scans</span>
            <strong>{fieldScans.length}</strong>
            <p>花园、温室与城市空间采样。</p>
          </article>
          <article>
            <span>Views</span>
            <strong>{totalViews || '452'}</strong>
            <p>SuperSplat 可见浏览量。</p>
          </article>
        </section>

        <section className="gaussian-hero-card" id="spatial-method">
          <img src={getSceneImage(scenes[0])} alt={scenes[0]?.displayTitle || 'Gaussian scene'} />
          <div>
            <span>Spatial Method</span>
            <h2>从影像资料到可浏览空间</h2>
            <p>
              这组样本把作品阶段资料、现场图像和环境扫描转成可在线查看的空间对象。网页用于快速观看；高清图册、嵌入链接和后续 XR 版本按项目继续扩展。
            </p>
            {scenes[0]?.sceneUrl && (
              <a href={scenes[0].sceneUrl} target="_blank" rel="noreferrer">打开 SuperSplat</a>
            )}
          </div>
        </section>

        <section className="gaussian-grid-section" id="scene-index">
          <div className="front-index-head">
            <div>
              <span>Scenes</span>
              <h2>空间样本</h2>
            </div>
          <p>每个样本都有独立详情页，保留采样地点、转译关系、查看位置和后续使用方向。外部 SuperSplat 只作为查看器入口。</p>
          </div>

          <div className="gaussian-scene-grid">
            {scenes.map((scene) => (
              <article key={scene.id}>
                <Link to={`/gaussian-scenes/${scene.slug}`}>
                  <img src={getSceneImage(scene)} alt={scene.displayTitle} loading="lazy" />
                </Link>
                <div>
                  <span>{getCategoryLabel(scene.category)} / {scene.location}</span>
                  <h3>{scene.displayTitle}</h3>
                  <p>{scene.summary}</p>
                  <div className="gaussian-links">
                    <Link to={`/gaussian-scenes/${scene.slug}`}>查看详情</Link>
                    {scene.sceneUrl && <a href={scene.sceneUrl} target="_blank" rel="noreferrer">SuperSplat</a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default GaussianScenes
