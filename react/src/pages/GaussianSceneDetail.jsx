import { Link, useParams } from 'react-router-dom'
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

function getSeriesTitle(scene) {
  if (scene.category === 'work-derived') return '作品空间化系列'
  if (scene.tags?.includes('urban-space') || scene.tags?.includes('architecture')) return '城市空间扫描系列'
  return '花园与环境采样系列'
}

function getRelatedProject(scene) {
  if (scene.relatedWork?.includes('timer')) return { label: 'TIMER / 控时者', to: '/projects/timer' }
  if (scene.relatedWork?.includes('drop-flow')) return { label: 'Drop Flow / 滴流', to: '/projects/drop-flow' }
  return null
}

function GaussianSceneDetail() {
  const { slug } = useParams()
  const scene = scenes.find((item) => item.slug === slug) || scenes.find((item) => item.id === slug)
  const relatedProject = scene ? getRelatedProject(scene) : null
  const relatedScenes = scene
    ? scenes.filter((item) => item.slug !== scene.slug && item.category === scene.category).slice(0, 3)
    : []

  if (!scene) {
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
              <span>Gaussian Scene</span>
              <h1>样本不存在</h1>
            </div>
            <p>这个空间样本没有进入当前公开索引。</p>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <main className="frontstage-page gaussian-front gaussian-detail-page">
        <nav className="frontstage-dock" aria-label="主导航">
          {dockItems.map((item) => (
            <Link to={item.to} key={item.label}>{item.label}</Link>
          ))}
        </nav>

        <section className="gaussian-detail-hero">
          <img src={getSceneImage(scene)} alt={scene.displayTitle} />
          <div>
            <span>{getCategoryLabel(scene.category)} / {getSeriesTitle(scene)}</span>
            <h1>{scene.displayTitle}</h1>
            <p>{scene.summary}</p>
            <div className="gaussian-links">
              {scene.sceneUrl && <a href={scene.sceneUrl} target="_blank" rel="noreferrer">打开 SuperSplat</a>}
              {scene.embedUrl && <a href={scene.embedUrl} target="_blank" rel="noreferrer">嵌入视图</a>}
              <Link to="/gaussian-scenes">返回空间档案</Link>
            </div>
          </div>
        </section>

        <section className="gaussian-detail-facts" aria-label="样本信息">
          <article>
            <span>Location</span>
            <strong>{scene.location}</strong>
          </article>
          <article>
            <span>Capture</span>
            <strong>{scene.captureMoment}</strong>
          </article>
          <article>
            <span>Size / Views</span>
            <strong>{scene.size || '未记录'} / {scene.views || '未记录'}</strong>
          </article>
          <article>
            <span>Related</span>
            <strong>{relatedProject ? relatedProject.label : '个人环境采样'}</strong>
          </article>
        </section>

        <section className="gaussian-detail-notes">
          <div>
            <span>Sample Notes</span>
            <h2>这个样本为什么保留</h2>
          </div>
          <div className="gaussian-note-list">
            {(scene.notes || []).map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </section>

        <section className="gaussian-detail-viewer" aria-label="查看器">
          <div>
            <span>Viewer</span>
            <h2>在线查看位置</h2>
            <p>网页保留高清静帧和说明；SuperSplat 用于进入可旋转、可嵌入的空间查看器。后续 Vision Pro / XR 版本可以继续从这个样本扩展。</p>
          </div>
          {scene.embedUrl && (
            <iframe
              title={`${scene.displayTitle} SuperSplat viewer`}
              src={scene.embedUrl}
              allow="fullscreen; xr-spatial-tracking"
            />
          )}
        </section>

        <section className="case-next" aria-label="系列导向">
          {relatedProject && (
            <Link to={relatedProject.to}>
              <span>相关作品</span>
              <strong>{relatedProject.label}</strong>
            </Link>
          )}
          <Link to="/gaussian-scenes">
            <span>系列</span>
            <strong>高斯空间档案</strong>
          </Link>
          {relatedScenes.map((item) => (
            <Link to={`/gaussian-scenes/${item.slug}`} key={item.slug}>
              <span>{getCategoryLabel(item.category)}</span>
              <strong>{item.displayTitle}</strong>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default GaussianSceneDetail
