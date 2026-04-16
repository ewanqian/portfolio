import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import scenes from '../data/generated/gaussianScenes'
import works from '../data/generated/works'

const categoryLabels = {
  'work-derived': 'Work Sample / 作品样本',
  'field-scan': 'Spatial Scan / 环境采样'
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
    title: '先把空间感保留下来',
    body: '相比只保留一段视频，这种形式更适合展示空间层次、观看路径和现场关系，也更适合作为项目样本或归档入口。'
  },
  {
    id: 'archive-before-app',
    title: '先形成可浏览样本，再决定要不要继续开发',
    body: '作品影像、现场资料和环境扫描都可以先整理成一个可浏览对象，便于判断它更适合归档、展示，还是继续进入后续开发。'
  },
  {
    id: 'visionpro-bridge',
    title: '需要时再接到 Vision Pro / XR',
    body: '当样本已经成立后，再往 Vision Pro、XR、空间视频或更完整的体验开发延伸，会比一开始就重投入更稳。'
  }
]

const researchTracks = [
  {
    id: 'work-derived-splats',
    title: 'Work Samples / 作品样本',
    status: 'active',
    body: '把既有作品影像整理成可浏览的空间样本，为作品页、提案页和归档页提供另一种观看入口。',
    note: '当前已收录 2 个作品样本。'
  },
  {
    id: 'field-scan-library',
    title: 'Field Scan Library / 环境采样样本',
    status: 'active',
    body: '把花园、温室和公共空间扫描整理成独立条目，让环境采样不再只是零散试验。',
    note: '当前已有 3 个环境采样条目。'
  },
  {
    id: 'visionpro-path',
    title: 'Vision Pro Path / 延伸展示路径',
    status: 'building',
    body: '把空间样本继续接到 Vision Pro、XR 展示、空间视频原型和轻量应用方向。',
    note: '更适合在已有样本成立后再继续推进。'
  },
  {
    id: 'workflow-method',
    title: 'Workflow Method / 方法说明',
    status: 'documented',
    body: '把采集、整理、空间转译、网页嵌入和后续展示这条链路沉淀成可复用说明。',
    note: '当前 workflow note 已可被作品页和服务页复用。'
  }
]

const progressColumns = [
  {
    id: 'work-samples',
    title: 'Work Samples / 作品样本',
    items: [
      'TIMER 与 Drop Flow 已形成可浏览的空间样本。',
      '作品页可以直接进入空间入口，而不只停留在视频层。',
      '适合作为作品归档、项目提案和网页展示的中间层。'
    ]
  },
  {
    id: 'field-scans',
    title: 'Field Scans / 环境采样',
    items: [
      '温室、花园和公共空间扫描已进入同一栏目。',
      '每个条目都保留缩略图、嵌入链接和基本说明。',
      '后续可以继续扩到展厅、演出和建筑空间。'
    ]
  },
  {
    id: 'service-path',
    title: 'Service Path / 合作方向',
    items: [
      '可用于网页嵌入、项目提案和空间归档。',
      '也可以继续延伸到 Vision Pro / XR 演示。',
      '更具体的合作方式和预算理解，建议继续看 Production。'
    ]
  }
]

const workflowSteps = [
  {
    id: 'capture',
    title: '1. 素材选择',
    body: '从作品影像、现场记录或环境采样里挑出适合转成空间样本的材料。'
  },
  {
    id: 'translate',
    title: '2. 空间转译',
    body: '通过图像整理和本地工作流，把二维素材推进到更接近空间对象的中间状态。'
  },
  {
    id: 'splat',
    title: '3. 场景整理',
    body: '在 Gaussian Splat / SuperSplat 中完成裁切、预览和可分享版本。'
  },
  {
    id: 'deploy',
    title: '4. 展示与延伸',
    body: '先作为网页入口或归档样本使用，再视需求继续延伸到 Vision Pro、XR 或更完整的体验开发。'
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
              这个栏目把作品样本和环境采样放进同一个公开入口，方便直接理解这种形式如何用于归档、展示和后续开发。
              它不是内部进度板，而是一组对外可读的空间样本：既能看作品如何被转成空间对象，也能看这种形式适合承载什么内容。
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
              <Link to="/production" className="button primary">Open Production / 查看合作方式</Link>
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
            <h2 className="section-title">Reading Angles / 阅读方式</h2>
            <p className="section-intro">
              这一页可以从三个角度来读：作品样本、环境采样，以及这种形式如何继续进入更完整的展示和合作路径。
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
            <h2 className="section-title">Current Scope / 当前范围</h2>
            <p className="section-intro">
              下面这三列不是内部进度，而是帮助外部读者快速理解：当前已经能看到什么、这种形式能承载什么、以及它能往哪种合作方向继续走。
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
            <h2 className="section-title">Spatial Archive Samples / 空间归档样本</h2>
            <p className="section-intro">
              下面两个样本展示的是：既有作品影像或现场资料如何被整理成可浏览的空间对象。它们不是替代视频，而是提供另一种更接近空间观看的入口。
            </p>
            <div className="gaussian-cta-panel" style={{ marginBottom: '24px' }}>
              <h3>想判断这种形式适不适合你的项目？</h3>
              <p>
                如果你更关心合作方式、预算理解和交付路径，下一步最值得看的就是 Production 页面；这里更适合先看样本和呈现方式。
              </p>
              <div className="hero-cta">
                <Link to="/production" className="button primary">Open Production / 查看合作方式</Link>
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
              这些条目展示的是环境采样如何被整理成可浏览样本。它们同样可以继续扩展到展厅、建筑、演出空间和其他现场语境。
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
              <h3>如果要继续往合作层走</h3>
              <p>
                这一页更适合作为样本入口；如果要继续讨论预算、交付范围、适合什么项目类型，下一步应该转到 Production 页面。
              </p>
              <div className="hero-cta">
                <Link to="/production" className="button primary">Open Production / 查看合作方式</Link>
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
