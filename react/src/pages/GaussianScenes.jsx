import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import scenes from '../data/generated/gaussianScenes'
import works from '../data/generated/works'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { localizeScene, localizeWork } from '../i18n/content.js'

const pageCopy = {
  zh: {
    eyebrow: 'Point Cloud Research Project',
    title: '高斯空间扫描库',
    intro: '围绕高斯重建、点云查看、环境采样和网页呈现整理出的独立空间研究项目。它与 TIMER、Drop Flow 一起构成钱誉文长期实践中的空间影像方法线。',
    statArchived: '已归档场景',
    statWorkDerived: '团队项目转译',
    statField: '环境采样',
    statViews: '可见浏览量',
    ctaProduction: '查看合作方式',
    ctaArchive: '返回档案索引',
    ctaWorkflow: '查看方法说明',
    readTitle: '扫描与查看结构',
    readIntro: '这一页按作品转译、环境扫描、查看位置和后续空间展示四个层级组织。每个条目保留高清图、SuperSplat 查看链接和基本扫描说明。',
    progressTitle: '档案层级',
    progressIntro: '当前样本覆盖项目转译、环境扫描和合作延展三类用途。',
    featuredTitle: '作品空间化研究',
    featuredIntro: 'TIMER 和 Drop Flow 的高斯化方向来自既有作品资料与现场阶段素材。这里展示的是钱誉文对这些资料进行空间转译、网页查看和长期保存的研究结果。',
    featuredPanelTitle: '查看方式',
    featuredPanelBody: '每个条目都保留 SuperSplat 场景链接、嵌入链接和本地缩略图。网页用于快速观看，高清图册和后续 XR 版本会按项目继续扩展。',
    fieldTitle: '环境扫描与花园图册',
    fieldIntro: '新宿御苑温室、东京塔下花园与涩谷 Sakura Stage 被整理为独立环境扫描。它们不是项目边角料，而是数字自然、城市空间和高斯查看方法的长期素材库。',
    valueTitle: '为什么保留为空间扫描',
    flowTitle: '扫描流程与查看位置',
    flowPanelTitle: '当前查看位置',
    flowPanelBody: '网页先展示压缩图、条目说明和 SuperSplat 链接。后续高清图册、东京塔花园画册和新宿温室详情页会从这里继续展开。',
    ctaScene: '查看空间样本',
    ctaEmbed: '查看嵌入链接',
    ctaReadme: '查看完整说明',
    metaViews: '浏览',
    unknownSize: '大小待补充',
    unknownTime: '时间待补充',
    relatedWorkLabel: '查看作品详情',
    categoryLabels: {
      'work-derived': '团队项目转译',
      'field-scan': '个人环境采样'
    },
    statusLabels: {
      active: '持续推进',
      building: '正在搭建',
      documented: '已成知识块'
    },
    researchTracks: [
      {
        id: 'work-derived-splats',
        title: '团队项目转译样本',
        status: 'active',
        body: '把团队项目里的既有场景、现场资料和图像素材转成可浏览的空间样本，为作品页、提案页和归档页提供另一种观看入口。',
        note: '当前已收录 2 个作品样本。'
      },
      {
        id: 'field-scan-library',
        title: '个人环境采样档案',
        status: 'active',
        body: '把花园、温室和公共空间扫描整理成独立条目，让个人环境采样形成持续积累的空间保存样本。',
        note: '当前已有 3 个环境采样条目。'
      },
      {
        id: 'visionpro-path',
        title: 'Vision Pro / XR 延伸路径',
        status: 'building',
        body: '把空间样本继续接到 Vision Pro、XR 展示、空间视频原型和轻量应用方向。',
        note: '更适合在已有样本成立后再继续推进。'
      },
      {
        id: 'workflow-method',
        title: '方法说明',
        status: 'documented',
        body: '把采集、整理、空间转译、网页嵌入和后续展示这条链路沉淀成可复用说明。',
        note: '当前 workflow note 已可被作品页和服务页复用。'
      }
    ],
    progressColumns: [
      {
        id: 'work-samples',
        title: '团队项目样本',
        items: [
          'TIMER 与 Drop Flow 已形成可浏览的团队项目空间样本。',
          '项目本身属于团队实践，高斯化整理、网页嵌入和归档编排由钱誉文单独完成。',
          '它们适合作为作品归档、项目提案和网页展示的中间层。'
        ]
      },
      {
        id: 'field-scans',
        title: '个人环境采样',
        items: [
          '温室、花园和公共空间扫描已进入同一栏目。',
          '每个条目都保留缩略图、嵌入链接和基本说明。',
          '这些扫描由钱誉文独立完成，后续可以继续扩到展厅、演出和建筑空间。'
        ]
      },
      {
        id: 'service-path',
        title: '合作方向',
        items: [
          '可用于网页嵌入、项目提案和空间归档。',
          '也可以继续延伸到 Vision Pro / XR 演示。',
          '更具体的合作方式和预算理解，建议继续看 Production。'
        ]
      }
    ],
    valueCards: [
      {
        id: 'lighter-than-engine',
        title: '保存空间感',
        body: '相比只保留一段视频，这种形式更适合把团队项目场景或现场资料先保存成可浏览对象，也更容易让外部读者理解空间层次和观看路径。'
      },
      {
        id: 'archive-before-app',
        title: '形成可浏览样本',
        body: '团队项目资料和个人环境采样可以先整理成可浏览样本，再进入归档、网页展示或更完整的应用开发。'
      },
      {
        id: 'visionpro-bridge',
        title: '需要时再接到 Vision Pro / XR',
        body: '当样本已经成立后，再往 Vision Pro、XR、空间视频或更完整的体验开发延伸，会比一开始就重投入更稳。'
      }
    ],
    workflowSteps: [
      {
        id: 'capture',
        title: '1. 素材选择',
        body: '从作品影像、现场记录或环境采样里挑出适合转成空间样本的材料。'
      },
      {
        id: 'translate',
        title: '2. 空间转译',
        body: '通过本地 AppleSharp 模型、ComfyUI 和图像整理，把二维素材推进到更接近空间对象的中间状态。'
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
    ],
    serviceCards: [
      {
        id: 'spatial-archive',
        title: '空间扫描保存',
        body: '适合把作品过程、演出场景、花园、建筑或展厅状态转成可长期索引的空间档案。'
      },
      {
        id: 'web-embed',
        title: '网页嵌入展示',
        body: '比单纯视频更接近空间观看，也更适合作为项目页面、提案页面或作品详情页里的中间层入口。'
      },
      {
        id: 'visionpro',
        title: 'Vision Pro / XR 路径',
        body: '把高斯场景作为更轻量的前置资产，再推进到 Apple Vision Pro、XR 演示或体验设计。'
      }
    ]
  },
  en: {
    eyebrow: 'Gaussian Archive Library',
    title: 'Gaussian Archive Library',
    intro: 'A spatial sample library for team-project translations, independent field scans, web embeds, XR presentation paths, and long-term archive work.',
    statArchived: 'Archived Scenes',
    statWorkDerived: 'Team Samples',
    statField: 'Field Scans',
    statViews: 'Documented Views',
    ctaProduction: 'Open Production',
    ctaArchive: 'Back to Archive',
    ctaWorkflow: 'Open Method Note',
    readTitle: 'Spatial Sample Structure',
    readIntro: 'The archive is organized through team-project translations, independent field scans, XR extension paths, and reusable method notes.',
    progressTitle: 'Archive Layers',
    progressIntro: 'The current samples cover project translation, environmental scanning, and collaboration extensions.',
    featuredTitle: 'Team Project Spatial Samples',
    featuredIntro: 'The two samples below both come from team-project contexts. The projects themselves belong to collective practice, while the Gaussian translation, web embedding, and archive arrangement were completed independently by Ewan Qian. They open a different, more spatial way of entering the work.',
    featuredPanelTitle: 'Judge whether this format fits your project',
    featuredPanelBody: 'Production explains collaboration structure, pricing logic, and delivery path. This page focuses on inspecting the samples themselves.',
    fieldTitle: 'Field Scan Archive',
    fieldIntro: 'The entries below are independently captured field scans by Ewan Qian. They preserve gardens, greenhouses, and public urban spaces under specific lighting and volumetric conditions, and they can keep expanding toward exhibitions, architecture, live venues, and other site contexts.',
    valueTitle: 'Why Preserve These as Spatial Archives',
    flowTitle: 'From Sample to Collaboration',
    flowPanelTitle: 'Move toward collaboration',
    flowPanelBody: 'This page works as a sample entry. Production covers pricing, delivery scope, and project fit.',
    ctaScene: 'Open Scene',
    ctaEmbed: 'Open Embed URL',
    ctaReadme: 'Open Full Note',
    metaViews: 'views',
    unknownSize: 'size pending',
    unknownTime: 'time pending',
    relatedWorkLabel: 'Open Related Work',
    categoryLabels: {
      'work-derived': 'Team Project Translation',
      'field-scan': 'Field Scan'
    },
    statusLabels: {
      active: 'Active',
      building: 'Building',
      documented: 'Documented'
    },
    researchTracks: [
      {
        id: 'work-derived-splats',
        title: 'Team Project Samples',
        status: 'active',
        body: 'Existing scenes, live material, and image sources from team projects are translated into browseable spatial samples that give work pages, proposals, and archive pages another way to be entered.',
        note: 'Currently includes 2 work-derived samples.'
      },
      {
        id: 'field-scan-library',
        title: 'Field Scan Library',
        status: 'active',
        body: 'Gardens, greenhouse interiors, and public-space scans are organized as independent entries so environmental capture becomes a sustained archive.',
        note: 'Currently includes 3 field-scan entries.'
      },
      {
        id: 'visionpro-path',
        title: 'Vision Pro / XR Extension',
        status: 'building',
        body: 'These spatial samples can continue into Vision Pro viewing, XR presentation, spatial-video prototypes, and lighter application paths once the sample layer is stable.',
        note: 'Best extended after the sample layer is already working.'
      },
      {
        id: 'workflow-method',
        title: 'Workflow Method',
        status: 'documented',
        body: 'The chain from capture and organization to spatial translation, web embedding, and later display has already been consolidated into a reusable method note.',
        note: 'The workflow note can already be reused across work pages and service pages.'
      }
    ],
    progressColumns: [
      {
        id: 'work-samples',
        title: 'Team Samples',
        items: [
          'TIMER and Drop Flow already exist as browseable spatial samples derived from team-project contexts.',
          'The projects themselves belong to collective practice, while Gaussian structuring, web embedding, and archive arrangement were completed by Ewan Qian.',
          'These samples function well as a middle layer between project archives, proposals, and public-facing work pages.'
        ]
      },
      {
        id: 'field-scans',
        title: 'Field Scans',
        items: [
          'Greenhouse, garden, and public-space scans now sit inside one shared section.',
          'Each entry keeps a thumbnail, embed link, and short contextual note.',
          'These scans were captured independently by Ewan Qian and can later extend toward exhibition, performance, and architectural-space references.'
        ]
      },
      {
        id: 'service-path',
        title: 'Service Path',
        items: [
          'They can be used for web embedding, project proposals, and spatial archiving.',
          'They can also continue into Vision Pro / XR demonstrations.',
          'For collaboration structure and pricing logic, the next page to read is Production.'
        ]
      }
    ],
    valueCards: [
      {
        id: 'lighter-than-engine',
        title: 'Preserve the spatial feeling first',
        body: 'Compared with preserving only a video, this format is better for keeping a browseable spatial object from a team-project scene or field sample, and it makes spatial depth and viewing paths easier to communicate to an outside reader.'
      },
      {
        id: 'archive-before-app',
        title: 'Build a readable sample before deciding on heavier development',
        body: 'Team-project material and field scans can first become readable, embeddable samples. After that, it becomes easier to decide whether the next step should be archival, web presentation, or a fuller application path.'
      },
      {
        id: 'visionpro-bridge',
        title: 'Extend to Vision Pro / XR only when needed',
        body: 'Once the sample layer holds together, extending toward Vision Pro, XR, spatial video, or fuller experience development becomes much more stable than forcing that investment too early.'
      }
    ],
    workflowSteps: [
      {
        id: 'capture',
        title: '1. Source Selection',
        body: 'Choose image material from work documentation, live records, or field captures that can meaningfully become spatial samples.'
      },
      {
        id: 'translate',
        title: '2. Spatial Translation',
        body: 'Use the local AppleSharp-model workflow, ComfyUI, and image preparation to push flat material toward an intermediate state that behaves more like a spatial object.'
      },
      {
        id: 'splat',
        title: '3. Scene Editing',
        body: 'Use Gaussian Splat / SuperSplat to crop, preview, and prepare a shareable version of the scene.'
      },
      {
        id: 'deploy',
        title: '4. Display and Extension',
        body: 'Use the result first as a web entry or archive sample, then extend it toward Vision Pro, XR, or fuller experience development if the next step justifies it.'
      }
    ],
    serviceCards: [
      {
        id: 'spatial-archive',
        title: 'Spatial Archive',
        body: 'Best suited to preserving work process, performance scenes, gardens, buildings, or exhibition states as long-term indexed spatial records.'
      },
      {
        id: 'web-embed',
        title: 'Web Embed Display',
        body: 'This sits closer to spatial viewing than plain video and works well as a middle-layer entry for project pages, proposals, and work-detail pages.'
      },
      {
        id: 'visionpro',
        title: 'Vision Pro / XR Path',
        body: 'These Gaussian samples can act as lighter precursor assets before moving into Apple Vision Pro, XR presentation, or experience-design development.'
      }
    ]
  }
}

const relatedWorkPages = {
  'drop-flow-ufo-2025': '/works/drop-flow.html',
  'drop-flow': '/works/drop-flow.html',
  'timer-series-visual-2024': '/works/timer.html',
  timer: '/works/timer.html'
}

function formatPublishedAgo(value, language) {
  if (!value) {
    return language === 'en' ? 'time pending' : '时间待补充'
  }

  if (language === 'en') {
    return value
  }

  const monthMatch = value.match(/^(\d+)\s+months?\s+ago$/i)
  if (monthMatch) {
    return `${monthMatch[1]} 个月前`
  }

  const dayMatch = value.match(/^(\d+)\s+days?\s+ago$/i)
  if (dayMatch) {
    return `${dayMatch[1]} 天前`
  }

  const yearMatch = value.match(/^(\d+)\s+years?\s+ago$/i)
  if (yearMatch) {
    return `${yearMatch[1]} 年前`
  }

  return value
}

function getRelatedWork(scene, language) {
  if (!scene.relatedWork) {
    return null
  }

  const work = works.find((item) => item.id === scene.relatedWork)
  const pageUrl = relatedWorkPages[scene.relatedWork]

  if (!work && !pageUrl) {
    return null
  }

  const localizedWork = work ? localizeWork(work, language) : null
  const detailLink = work?.links?.find((link) => link.url?.includes('/works/') || link.url?.startsWith('./works/'))
  const rawUrl = pageUrl || detailLink?.url || work?.repoLink
  const resolvedUrl = rawUrl?.startsWith('./') ? `/${rawUrl.replace(/^\.\//, '')}` : rawUrl

  if (!resolvedUrl) {
    return null
  }

  return {
    title: localizedWork?.title || work?.title || scene.relatedWork,
    url: resolvedUrl,
    label: language === 'en' ? 'Open Related Work' : '查看作品详情'
  }
}

function GaussianScenes() {
  const { language } = useLanguage()
  const copy = pageCopy[language]
  const localizedScenes = scenes.map((scene) => localizeScene(scene, language))
  const featuredScenes = localizedScenes.filter((scene) => scene.featured)
  const fieldScenes = localizedScenes.filter((scene) => scene.category === 'field-scan')
  const workDerivedScenes = localizedScenes.filter((scene) => scene.category === 'work-derived')
  const totalViews = localizedScenes.reduce((sum, scene) => {
    const views = Number.parseInt(String(scene.views || '0').replace(/,/g, ''), 10)
    return Number.isNaN(views) ? sum : sum + views
  }, 0)

  return (
    <>
      <Header />
      <main className="page-gaussian-scenes">
        <section className="section">
          <div className="container gaussian-hero">
            <div className="eyebrow">{copy.eyebrow}</div>
            <h1 className="section-title">{copy.title}</h1>
            <p className="section-intro">{copy.intro}</p>
            <div className="gaussian-stat-row">
              <div className="gaussian-stat-card">
                <strong>{localizedScenes.length}</strong>
                <span>{copy.statArchived}</span>
              </div>
              <div className="gaussian-stat-card">
                <strong>{workDerivedScenes.length}</strong>
                <span>{copy.statWorkDerived}</span>
              </div>
              <div className="gaussian-stat-card">
                <strong>{fieldScenes.length}</strong>
                <span>{copy.statField}</span>
              </div>
              <div className="gaussian-stat-card">
                <strong>{totalViews.toLocaleString()}</strong>
                <span>{copy.statViews}</span>
              </div>
            </div>
            <div className="hero-cta">
              <Link to="/production" className="button primary">{copy.ctaProduction}</Link>
              <Link to="/archive" className="button">{copy.ctaArchive}</Link>
              <a
                href="https://github.com/ewanqian/portfolio/blob/main/archive/gaussian-scenes/gaussian-spatial-workflow-note.md"
                target="_blank"
                rel="noreferrer"
                className="button"
              >
                {copy.ctaWorkflow}
              </a>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">{copy.readTitle}</h2>
            <p className="section-intro">{copy.readIntro}</p>
            <div className="gaussian-info-grid">
              {copy.researchTracks.map((track) => (
                <article key={track.id} className="gaussian-info-card">
                  <div className="gaussian-badge-row">
                    <span className="gaussian-badge">{copy.statusLabels[track.status]}</span>
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
            <h2 className="section-title">{copy.progressTitle}</h2>
            <p className="section-intro">{copy.progressIntro}</p>
            <div className="gaussian-progress-grid">
              {copy.progressColumns.map((column) => (
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
            <h2 className="section-title">{copy.featuredTitle}</h2>
            <p className="section-intro">{copy.featuredIntro}</p>
            <div className="gaussian-cta-panel" style={{ marginBottom: '24px' }}>
              <h3>{copy.featuredPanelTitle}</h3>
              <p>{copy.featuredPanelBody}</p>
              <div className="hero-cta">
                <Link to="/production" className="button primary">{copy.ctaProduction}</Link>
              </div>
            </div>
            <div className="gaussian-feature-grid">
              {featuredScenes.map((scene) => {
                const relatedWork = getRelatedWork(scene, language)

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
                        <span className="gaussian-badge">{copy.categoryLabels[scene.category] || scene.category}</span>
                        {relatedWork ? <span className="gaussian-badge subtle">{relatedWork.title}</span> : null}
                      </div>
                      <h3>{scene.displayTitle}</h3>
                      <p className="gaussian-meta-line">
                        {scene.location} · {formatPublishedAgo(scene.publishedAgo, language)} · {scene.size || copy.unknownSize}
                      </p>
                      <p>{scene.summary}</p>
                      <p className="gaussian-card-note">{scene.captureMoment}</p>
                      <div className="gaussian-note-list">
                        {(scene.notes || []).map((note) => (
                          <div key={note} className="gaussian-note">{note}</div>
                        ))}
                      </div>
                      <div className="gaussian-tags">
                        {(scene.tags || []).map((tag) => (
                          <span key={tag} className="gaussian-tag">{tag}</span>
                        ))}
                      </div>
                      <div className="hero-cta">
                        <a href={scene.sceneUrl} target="_blank" rel="noreferrer" className="button primary">
                          {copy.ctaScene}
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
            <h2 className="section-title">{copy.fieldTitle}</h2>
            <p className="section-intro">{copy.fieldIntro}</p>
            <div className="gaussian-scene-grid">
              {fieldScenes.map((scene) => (
                <article key={scene.id} className="gaussian-scene-card">
                  <div className="gaussian-scene-image">
                    <img src={scene.thumbnail} alt={scene.displayTitle} loading="lazy" />
                  </div>
                  <div className="gaussian-scene-content">
                    <div className="gaussian-badge-row">
                      <span className="gaussian-badge">{copy.categoryLabels[scene.category] || scene.category}</span>
                      <span className="gaussian-badge subtle">{scene.location}</span>
                    </div>
                    <h3>{scene.displayTitle}</h3>
                    <p className="gaussian-meta-line">
                      {scene.views || '0'} {copy.metaViews} · {scene.size || copy.unknownSize} · {formatPublishedAgo(scene.publishedAgo, language)}
                    </p>
                    <p>{scene.summary}</p>
                    <p className="gaussian-card-note">{scene.captureMoment}</p>
                    <p className="gaussian-scene-note">{scene.notes?.[0]}</p>
                    <div className="gaussian-tags">
                      {(scene.tags || []).map((tag) => (
                        <span key={tag} className="gaussian-tag">{tag}</span>
                      ))}
                    </div>
                    <div className="hero-cta">
                      <a href={scene.sceneUrl} target="_blank" rel="noreferrer" className="button primary">
                        {copy.ctaScene}
                      </a>
                      <a href={scene.embedUrl} target="_blank" rel="noreferrer" className="button">
                        {copy.ctaEmbed}
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
            <h2 className="section-title">{copy.valueTitle}</h2>
            <div className="gaussian-info-grid">
              {copy.valueCards.map((card) => (
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
            <h2 className="section-title">{copy.flowTitle}</h2>
            <div className="gaussian-workflow-grid">
              {copy.workflowSteps.map((step) => (
                <article key={step.id} className="gaussian-info-card">
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
            <div className="gaussian-service-grid">
              {copy.serviceCards.map((card) => (
                <article key={card.id} className="gaussian-service-card">
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
            <div className="gaussian-cta-panel">
              <h3>{copy.flowPanelTitle}</h3>
              <p>{copy.flowPanelBody}</p>
              <div className="hero-cta">
                <Link to="/production" className="button primary">{copy.ctaProduction}</Link>
                <a
                  href="https://github.com/ewanqian/portfolio/blob/main/archive/gaussian-scenes/README.md"
                  target="_blank"
                  rel="noreferrer"
                  className="button"
                >
                  {copy.ctaReadme}
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
