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

const statusLabels = {
  active: 'Active / 持续推进',
  building: 'Building / 正在搭建',
  documented: 'Documented / 已成知识块'
}

const relatedWorkOverrides = {
  'drop-flow-ufo-2025': {
    title: 'Drop Flow',
    url: '/portfolio/works/drop-flow.html',
    label: 'Open Drop Flow Detail / 查看作品详情'
  },
  'drop-flow': {
    title: 'Drop Flow',
    url: '/portfolio/works/drop-flow.html',
    label: 'Open Drop Flow Detail / 查看作品详情'
  },
  'timer-series-visual-2024': {
    title: 'TIMER 控时者',
    url: '/portfolio/works/timer.html',
    label: 'Open TIMER Detail / 查看作品详情'
  },
  'timer': {
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

const researchTracks = [
  {
    id: 'work-derived-splats',
    title: 'Work-derived Splats / 作品转译研究',
    status: 'active',
    body: '把 TIMER、DropFlow 这类既有作品影像、成员素材和残余光场转成可浏览的空间对象，让作品正文之外多一层高斯入口。',
    note: '当前已经有 2 个作品相关高斯嵌入。'
  },
  {
    id: 'field-scan-library',
    title: 'Field Scan Library / 环境采样档案',
    status: 'active',
    body: '把花园、温室、东京塔周边、涩谷公共空间这类环境采样整理成可索引的场景库，而不是散落的实验片段。',
    note: '当前已有 3 个 field scan 条目。'
  },
  {
    id: 'visionpro-path',
    title: 'Vision Pro Path / 空间观看路径',
    status: 'building',
    body: '把高斯场景当成较轻的前置资产，再往 Apple Vision Pro、XR 演示、空间视频原型和应用开发推进。',
    note: '这一层适合继续接到服务表达和报价结构。'
  },
  {
    id: 'workflow-method',
    title: 'Workflow Method / 工作坊方法块',
    status: 'documented',
    body: '把本地相册、ComfyUI、AppleSharp 模型、Gaussian Splat、SuperSplat 编辑与网页嵌入这条链路沉淀成可引用的方法说明。',
    note: '当前 workflow note 已经可被作品页和服务页复用。'
  }
]

const progressColumns = [
  {
    id: 'done',
    title: 'Done / 已完成',
    items: [
      '5 个场景已经归档，并保存本地缩略图。',
      'DropFlow 与 TIMER 已接入作品页的高斯空间入口。',
      'Gaussian Scenes 已经成为独立前台栏目。'
    ]
  },
  {
    id: 'active',
    title: 'Active / 正在推进',
    items: [
      '把高斯内容从单纯展示页推进为“档案库 + 研究板块 + 任务模块”。',
      '继续统一分类、标签、相关作品与场景说明。',
      '把空间扫描保存和 Vision Pro / XR 路径挂到更清晰的服务表达里。'
    ]
  },
  {
    id: 'next',
    title: 'Next / 下一步',
    items: [
      '补演出场景扫描、建筑和室内空间案例。',
      '把 workflow note 提升成正式 Writing 条目。',
      '补一套报价层级：采集、整理、嵌入、展示、后续应用开发。'
    ]
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
  const workDerivedScenes = scenes.filter((scene) => scene.category === 'work-derived')
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
            <div className="eyebrow">Gaussian Archive Library</div>
            <h1 className="section-title">高斯档案库 / Gaussian Archive Library</h1>
            <p className="section-intro">
              这个栏目把 DropFlow、TIMER、花园扫描、城市空间采样和之后的演出场景归到同一个前台入口。
              它现在不只是一个场景页，而是一个更明确的档案库、研究板块和任务推进模块：
              一边展示高斯空间对象，一边保留方法、研究方向和当前推进状态。
            </p>
            <div className="gaussian-stat-row">
              <div className="gaussian-stat-card">
                <strong>{scenes.length}</strong>
                <span>Archived Scenes / 已归档场景</span>
              </div>
              <div className="gaussian-stat-card">
                <strong>{workDerivedScenes.length}</strong>
                <span>Work-derived Splats / 作品转译</span>
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
              <Link to="/writing" className="button">Open Writing / 查看研究</Link>
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
            <h2 className="section-title">Research Tracks / 研究方向</h2>
            <p className="section-intro">
              这个档案库的目标不是只陈列结果，而是把高斯相关的工作分成几条能持续增长的研究线，让方法、场景和后续开发方向都能被看见。
            </p>
            <div className="gaussian-info-grid">
              {researchTracks.map((track) => (
                <article key={track.id} className="gaussian-info-card">
                  <div className="gaussian-badge-row">
                    <span className="gaussian-badge">{statusLabels[track.status]}</span>
                  </div>
                  <h3>{track.title}</h3>
                  <p>{track.body}</p>
                  <p className="gaussian-card-note">{track.note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">Task Progress / 任务推进</h2>
            <p className="section-intro">
              这里可以继续承担“研究进度板”的作用。你后面补新的扫描、方法或提案模块时，也都可以顺着这套结构继续长。
            </p>
            <div className="gaussian-progress-grid">
              {progressColumns.map((column) => (
                <article key={column.id} className="gaussian-progress-card">
                  <h3>{column.title}</h3>
                  <div className="gaussian-progress-list">
                    {column.items.map((item) => (
                      <div key={item} className="gaussian-progress-item">{item}</div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">Featured Embeds / 作品相关高斯入口</h2>
            <p className="section-intro">
              这两条先直接挂作品相关的空间入口。它们不是替代视频，而是把成员影像、光场残影、空间颗粒与过程线索压缩成一个可以继续浏览的对象。
            </p>
            <div className="gaussian-cta-panel" style={{ marginBottom: '24px' }}>
              <h3>如果你是从公开节点或成员素材入口进来的</h3>
              <p>
                这里更适合看方法样本和空间保存方式；如果你想快速判断是否适合合作、预算如何理解、项目该怎么继续推进，直接去 Production 页面会更有效。
              </p>
              <div className="hero-cta">
                <Link to="/production" className="button primary">Open Production / 查看合作简介</Link>
              </div>
            </div>
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
            <h2 className="section-title">Why This Archive Library / 为什么做成档案库</h2>
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
