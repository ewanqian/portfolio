import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import scenes from '../data/generated/gaussianScenes'
import works from '../data/generated/works'

const categoryLabels = {
  'work-derived': 'Work-derived / 作品转译',
  'field-scan': 'Field Scan / 环境采样'
}

const relatedWorkOverrides = {
  'drop-flow-ufo-2025': {
    title: 'Drop Flow',
    url: '/portfolio/works/drop-flow.html',
    label: 'Open Drop Flow Detail / 查看作品详情'
  },
  drop-flow: {
    title: 'Drop Flow',
    url: '/portfolio/works/drop-flow.html',
    label: 'Open Drop Flow Detail / 查看作品详情'
  },
  'timer-series-visual-2024': {
    title: 'TIMER 控时者',
    url: '/portfolio/works/timer.html',
    label: 'Open TIMER Detail / 查看作品详情'
  },
  timer: {
    title: 'TIMER 控时者',
    url: '/portfolio/works/timer.html',
    label: 'Open TIMER Detail / 查看作品详情'
  }
}

const valueCards = [
  {
    id: 'lighter-than-engine',
    title: '不是完整实时引擎，仍能保留空间观看',
    body: '很多空间内容的保存以前要依赖完整三维工程或实时引擎。现在可以先把空间、影像和现场状态压缩成一个可浏览、可嵌入的高斯场景入口。'
  },
  {
    id: 'archive-before-app',
    title: '先形成空间对象，再决定后续开发',
    body: '这种方式很适合做中间层证据：成员素材、作品影像、花园和建筑扫描，都能先成为一个网页里可被索引、引用、展示的对象。'
  },
  {
    id: 'visionpro-bridge',
    title: '向 Vision Pro / XR / 建筑导览继续延伸',
    body: '高斯场景不只停留在归档层，也可以继续进入 Vision Pro 观看路径、空间视频原型、建筑导览或更完整的轻量应用开发。'
  }
]

const workflowSteps = [
  {
    id: 'capture',
    title: '1. 素材采集',
    body: '从本地相册、现场照片、360 采样或演出记录里挑出适合被空间化的材料。'
  },
  {
    id: 'translate',
    title: '2. 中间层转译',
    body: '通过本地 ComfyUI 与按当前工作坊口头称呼的 AppleSharp 模型，把图像推向更接近三维浮雕或空间拼接的中间状态。'
  },
  {
    id: 'splat',
    title: '3. Gaussian Splat / SuperSplat',
    body: '继续进入可编辑的高斯场景，在 SuperSplat 中做切片、裁切、预览和分享。'
  },
  {
    id: 'deploy',
    title: '4. 网页嵌入与后续开发',
    body: '先作为网页中的空间入口，再视项目需要继续推进到 Vision Pro、XR、数字展览或更完整的应用原型。'
  }
]

const serviceCards = [
  {
    id: 'spatial-archive',
    title: 'Spatial Archive / 空间扫描保存',
    body: '适合把作品过程、演出场景、花园、建筑或展厅状态转成可长期索引的空间档案。'
  },
  {
    id: 'web-embed',
    title: 'Web Embed / 网页嵌入展示',
    body: '比单纯视频更接近空间观看，也更适合作为项目页面、提案页面或作品详情页里的中间层入口。'
  },
  {
    id: 'visionpro',
    title: 'Vision Pro / XR Path / 空间观看路径',
    body: '把高斯场景作为更轻量的前置资产，再推进到 Apple Vision Pro、XR 演示或体验设计。'
  }
]

function getRelatedWork(scene) {
  if (!scene.relatedWork) {
    return null
  }

  if (relatedWorkOverrides[scene.relatedWork]) {
    return relatedWorkOverrides[scene.relatedWork]
  }

  const work = works.find((item) => item.id === scene.relatedWork)

  if (!work) {
    return null
  }

  const detailLink = work.links?.find((link) => link.url?.includes('/works/') || link.url?.startsWith('./works/'))
  const rawUrl = detailLink?.url || work.repoLink
  const resolvedUrl = rawUrl?.startsWith('./') ? `/portfolio/${rawUrl.replace(/^\.\//, '')}` : rawUrl

  if (!resolvedUrl) {
    return null
  }

  return {
    title: work.title,
    url: resolvedUrl,
    label: `Open ${work.title} / 查看相关作品`
  }
}

function GaussianScenes() {
  const featuredScenes = scenes.filter((scene) => scene.featured)
  const fieldScenes = scenes.filter((scene) => scene.category === 'field-scan')
  const totalViews = scenes.reduce((sum, scene) => {
    const views = Number.parseInt(String(scene.views || '0').replace(/,/g, ''), 10)
    return Number.isNaN(views) ? sum : sum + views
  }, 0)

  return (
    <>
      <Header />
      <main className="page-gaussian-scenes">
        <section className="section">
          <div className="container gaussian-hero">
            <div className="eyebrow">Gaussian Scenes</div>
            <h1 className="section-title">空间扫描保存 / Gaussian Scenes</h1>
            <p className="section-intro">
              这个栏目把 DropFlow、TIMER、花园扫描、城市空间采样和之后的演出场景归到同一个前台入口。
              它既是档案，也是一条从采集、压缩、网页嵌入到 Vision Pro / XR 展示的制作路径。
            </p>
            <div className="gaussian-stat-row">
              <div className="gaussian-stat-card">
                <strong>{scenes.length}</strong>
                <span>Archived Scenes / 已归档场景</span>
              </div>
              <div className="gaussian-stat-card">
                <strong>{featuredScenes.length}</strong>
                <span>Work Embeds / 作品嵌入</span>
              </div>
              <div className="gaussian-stat-card">
                <strong>{fieldScenes.length}</strong>
                <span>Field Scans / 环境采样</span>
              </div>
              <div className="gaussian-stat-card">
                <strong>{totalViews.toLocaleString()}</strong>
                <span>Documented Views / 可见浏览量</span>
              </div>
            </div>
            <div className="hero-cta">
              <Link to="/production" className="button primary">Open Production / 查看服务</Link>
              <Link to="/archive" className="button">Open Archive / 返回档案</Link>
              <a
                href="https://github.com/ewanqian/portfolio/blob/main/archive/gaussian-scenes/gaussian-spatial-workflow-note.md"
                target="_blank"
                rel="noreferrer"
                className="button"
              >
                Workflow Note / 方法笔记
              </a>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">Featured Embeds / 作品相关高斯入口</h2>
            <p className="section-intro">
              这两条先直接挂作品相关的空间入口。它们不是替代视频，而是把成员影像、光场残影、空间颗粒与过程线索压缩成一个可以继续浏览的对象。
            </p>
            <div className="gaussian-feature-grid">
              {featuredScenes.map((scene) => {
                const relatedWork = getRelatedWork(scene)

                return (
                  <article key={scene.id} className="gaussian-feature-card">
                    <div className="gaussian-viewer">
                      <iframe
                        title={scene.displayTitle}
                        loading="lazy"
                        allow="fullscreen; xr-spatial-tracking"
                        src={scene.embedUrl}
                      />
                    </div>
                    <div className="gaussian-feature-copy">
                      <div className="gaussian-badge-row">
                        <span className="gaussian-badge">{categoryLabels[scene.category] || scene.category}</span>
                        {relatedWork ? <span className="gaussian-badge subtle">{relatedWork.title}</span> : null}
                      </div>
                      <h3>{scene.displayTitle}</h3>
                      <p className="gaussian-meta-line">
                        {scene.location} · {scene.publishedAgo || 'unknown publish time'} · {scene.size || 'unknown size'}
                      </p>
                      <p>{scene.summary}</p>
                      <div className="gaussian-note-list">
                        {scene.notes.map((note) => (
                          <div key={note} className="gaussian-note">{note}</div>
                        ))}
                      </div>
                      <div className="gaussian-tags">
                        {scene.tags.map((tag) => (
                          <span key={tag} className="gaussian-tag">{tag}</span>
                        ))}
                      </div>
                      <div className="hero-cta">
                        <a href={scene.sceneUrl} target="_blank" rel="noreferrer" className="button primary">
                          Open SuperSplat
                        </a>
                        {relatedWork ? (
                          <a href={relatedWork.url} target="_blank" rel="noreferrer" className="button">
                            {relatedWork.label}
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">Field Scans / 环境采样档案</h2>
            <p className="section-intro">
              花园、温室、东京塔周边与涩谷公共空间这些扫描条目，现在统一放在这里，后面新的演出空间和建筑采样也可以继续接进来。
            </p>
            <div className="gaussian-scene-grid">
              {fieldScenes.map((scene) => (
                <article key={scene.id} className="gaussian-scene-card">
                  <div className="gaussian-scene-image">
                    <img src={scene.thumbnail} alt={scene.displayTitle} loading="lazy" />
                  </div>
                  <div className="gaussian-scene-content">
                    <div className="gaussian-badge-row">
                      <span className="gaussian-badge">{categoryLabels[scene.category] || scene.category}</span>
                      <span className="gaussian-badge subtle">{scene.location}</span>
                    </div>
                    <h3>{scene.displayTitle}</h3>
                    <p className="gaussian-meta-line">
                      {scene.views || '0'} views · {scene.size || 'unknown size'} · {scene.publishedAgo || 'unknown publish time'}
                    </p>
                    <p>{scene.summary}</p>
                    <p className="gaussian-scene-note">{scene.notes[0]}</p>
                    <div className="gaussian-tags">
                      {scene.tags.map((tag) => (
                        <span key={tag} className="gaussian-tag">{tag}</span>
                      ))}
                    </div>
                    <div className="hero-cta">
                      <a href={scene.sceneUrl} target="_blank" rel="noreferrer" className="button primary">
                        Open Scene
                      </a>
                      <a href={scene.embedUrl} target="_blank" rel="noreferrer" className="button">
                        Embed URL
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">Why This Format / 为什么用这条格式保存</h2>
            <div className="gaussian-info-grid">
              {valueCards.map((card) => (
                <article key={card.id} className="gaussian-info-card">
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">Workflow & Service Path / 工作流与服务路径</h2>
            <div className="gaussian-workflow-grid">
              {workflowSteps.map((step) => (
                <article key={step.id} className="gaussian-info-card">
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
            <div className="gaussian-service-grid">
              {serviceCards.map((card) => (
                <article key={card.id} className="gaussian-service-card">
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
            <div className="gaussian-cta-panel">
              <h3>下一层可以怎么接</h3>
              <p>
                当前这个栏目已经适合作为正式前台入口。后面如果继续扩展，可以往报价结构、建筑扫描、Vision Pro 演示路径、演出场景档案和空间视频原型继续推进。
              </p>
              <div className="hero-cta">
                <Link to="/production" className="button primary">Open Production / 查看合作路径</Link>
                <a
                  href="https://github.com/ewanqian/portfolio/blob/main/archive/gaussian-scenes/README.md"
                  target="_blank"
                  rel="noreferrer"
                  className="button"
                >
                  Open Full Archive / 查看完整归档
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default GaussianScenes
