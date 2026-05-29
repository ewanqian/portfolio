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
    eyebrow: 'Spatial Archive',
    title: '高斯空间档案库',
    intro: '高斯空间档案库收录作品场景、现场资料与环境扫描的空间化样本。这里的条目以可浏览场景、缩略图、来源语境和技术路径组织，呈现影像资料如何被保存为可进入、可索引、可延展的空间对象。',
    statArchived: '已归档场景',
    statWorkDerived: '团队项目转译',
    statField: '环境采样',
    statViews: '可见浏览量',
    ctaProduction: '制作项目',
    ctaArchive: '总档案',
    ctaWorkflow: '技术方法',
    lineageTitle: 'TIMER 与 Drop Flow',
    lineageIntro: '这两件作品构成一条连续的空间影像方法线：TIMER 将时间、节拍和声音组织为可运动的粒子场；Drop Flow 进一步把点云、扫描数据、数字植物和流动结构组织为从水滴生成花园的记忆场景。',
    lineageCards: [
      {
        id: 'timer',
        title: 'TIMER / 控时者',
        meta: '时间粒子 / 音频曲线 / 环绕屏幕',
        body: 'TIMER 是方法前史。作品使用 Blender 音频曲线、点云粒子、灯光与 Geometry Nodes，将节奏和能量转化为围绕观众运动的视觉场，使时间成为可见、可流动、可被声音推动的空间物质.'
      },
      {
        id: 'drop-flow',
        title: 'Drop Flow / 滴流',
        meta: '数字自然 / 高斯衍生点云 / 记忆场景',
        body: 'Drop Flow 是当前主线。作品从“一滴水生成一座花园”的意象出发，将抽象点线、流场、高斯衍生点云、数字植物、几何结构和屏幕光场组织成持续生成的空间影像系统。'
      }
    ],
    methodTitle: '方法关键词',
    methodCards: [
      {
        id: 'memory-scene',
        title: '记忆场景',
        body: '声音、图像、扫描数据、点云、灯光和观众经验被重新组织为空间中的可感知材料。'
      },
      {
        id: 'visual-instrument',
        title: '复合视觉乐器',
        body: 'Blender 场景被作为可演奏系统使用，音频曲线、关键帧、节点、灯光、材质和屏幕输出共同参与调度。'
      },
      {
        id: 'gaussian-derived',
        title: '高斯衍生点云',
        body: '从高斯重建或相关空间数据中提取并重新组织的点云式图像材料，保留结构和密度，同时进入可编辑的音画系统。'
      }
    ],
    readTitle: '档案结构',
    readIntro: '本页按作品场景样本、环境扫描档案与技术流程组织，呈现高斯空间样本的来源、观看入口和应用方向。',
    progressTitle: '馆藏范围',
    progressIntro: '高斯空间档案库覆盖作品资料转译、环境扫描、网页嵌入与 XR 展示路径。',
    featuredTitle: '作品场景样本',
    featuredIntro: '这些条目来自作品与团队项目资料，经由高斯化处理、场景清理和网页嵌入形成可浏览空间样本。它们补充视频与图片记录，保留作品中的空间关系、体积感和观看路径。',
    featuredPanelTitle: '制作语境',
    featuredPanelBody: 'Production 页面收录更完整的项目范围、交付方式与制作条件。',
    fieldTitle: '环境扫描档案',
    fieldIntro: '环境扫描档案保存花园、温室与公共空间在特定光线、尺度和体积关系中的状态。每个条目以空间样本形式记录现场，而不是只保留单张照片或线性视频。',
    valueTitle: '空间档案价值',
    flowTitle: '技术流程与应用方向',
    flowPanelTitle: '相关制作路径',
    flowPanelBody: 'Production 页面提供项目范围、制作条件和交付方式的进一步说明。',
    ctaScene: '查看空间样本',
    ctaEmbed: '查看嵌入链接',
    ctaReadme: '查看完整说明',
    metaViews: '浏览',
    unknownSize: '未标注尺寸',
    unknownTime: '未标注时间',
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
        body: '花园、温室和公共空间扫描会被整理成独立条目，逐步形成可持续积累的空间保存样本。',
        note: '当前已有 3 个环境采样条目。'
      },
      {
        id: 'visionpro-path',
        title: 'Vision Pro / XR 延伸路径',
        status: 'building',
        body: '把空间样本继续接到 Vision Pro、XR 展示、空间视频原型和轻量应用方向。',
        note: '适合在样本明确后进入展示版本设计。'
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
          '它们适合作为作品归档、项目提案和网页展示的空间入口。'
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
        title: '保留空间感',
        body: '相比只保留一段视频，这种形式更适合把团队项目场景或现场资料保存成可浏览对象，也更容易让外部读者理解空间层次和观看路径。'
      },
      {
        id: 'archive-before-app',
        title: '形成可浏览样本',
        body: '团队项目资料和个人环境采样可以整理成可浏览样本，并按项目语境进入归档、网页展示或更完整的应用开发。'
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
        body: '通过本地 AppleSharp 模型、ComfyUI 和图像整理，把二维素材转译为具有深度、体积和视角关系的空间样本。'
      },
      {
        id: 'splat',
        title: '3. 场景整理',
        body: '在 Gaussian Splat / SuperSplat 中完成裁切、预览和可分享版本。'
      },
      {
        id: 'deploy',
        title: '4. 展示与延伸',
        body: '整理为网页入口、归档样本或空间展示资产，并按项目需要继续延伸到 Vision Pro、XR 或更完整的体验开发。'
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
        body: '比单纯视频更接近空间观看，适合作为项目页面、提案页面或作品详情页里的空间预览入口。'
      },
      {
        id: 'visionpro',
        title: 'Vision Pro / XR 路径',
        body: '把高斯场景作为更轻量的前置资产，再推进到 Apple Vision Pro、XR 演示或体验设计。'
      }
    ]
  },
  en: {
    eyebrow: 'Spatial Archive',
    title: 'Gaussian Spatial Archive',
    intro: 'The Gaussian Spatial Archive gathers spatialized samples from artwork scenes, live documentation, and field scans. Each entry is organized as a browsable scene with context, thumbnail, source relation, and technical pathway, preserving image material as an indexed spatial object.',
    statArchived: 'Archived Scenes',
    statWorkDerived: 'Team Samples',
    statField: 'Field Scans',
    statViews: 'Documented Views',
    ctaProduction: 'Production',
    ctaArchive: 'Archive Index',
    ctaWorkflow: 'Technical Method',
    lineageTitle: 'TIMER and Drop Flow',
    lineageIntro: 'The two works form a continuous method line in spatial image-making. TIMER turns time, rhythm, and sound into an audio-driven particle field; Drop Flow extends that method into a memory-scene where point clouds, scanned data, digital vegetation, and flowing structures unfold from the image of a garden emerging from a single drop of water.',
    lineageCards: [
      {
        id: 'timer',
        title: 'TIMER',
        meta: 'Temporal particles / audio F-curves / surrounding screens',
        body: 'TIMER is the earlier method work. Using audio-driven F-curves, point-cloud particles, lighting, and Geometry Nodes in Blender, it transforms rhythm and sonic intensity into a surrounding visual field where time becomes visible, movable, and spatial.'
      },
      {
        id: 'drop-flow',
        title: 'Drop Flow',
        meta: 'Digital nature / Gaussian-derived point clouds / memory-scene',
        body: 'Drop Flow is the main evolving work. Beginning with the image of a garden emerging from a single drop of water, it organizes points, lines, flow fields, Gaussian-derived point clouds, digital vegetation, geometric structures, and screen light into a spatial audiovisual system.'
      }
    ],
    methodTitle: 'Method Terms',
    methodCards: [
      {
        id: 'memory-scene',
        title: 'Memory-Scene',
        body: 'Sound, image, scanned data, point clouds, lighting, and viewer experience are reorganized as perceptible material inside a spatial scene.'
      },
      {
        id: 'visual-instrument',
        title: 'Composite Visual Instrument',
        body: 'The Blender scene works as a playable system, combining audio F-curves, manual keyframes, Geometry Nodes, lighting, materials, cameras, and screen output.'
      },
      {
        id: 'gaussian-derived',
        title: 'Gaussian-Derived Point Cloud',
        body: 'A point-cloud image material extracted and reorganized from Gaussian or related spatial data, preserving structure and density while becoming editable inside an audiovisual system.'
      }
    ],
    readTitle: 'Archive Structure',
    readIntro: 'This page is organized through artwork scene samples, field scan records, and a technical pipeline for spatial-image preservation.',
    progressTitle: 'Collection Scope',
    progressIntro: 'The archive covers artwork-scene translation, field scans, web embedding, and XR-oriented display paths.',
    featuredTitle: 'Artwork Scene Samples',
    featuredIntro: 'These entries are derived from artwork and team-project material. Gaussian processing, scene cleanup, and web embedding turn existing image records into browsable spatial samples, preserving depth, volume, and viewing paths alongside video and still documentation.',
    featuredPanelTitle: 'Production Context',
    featuredPanelBody: 'The Production page carries more complete information on project scope, delivery conditions, and production formats.',
    fieldTitle: 'Field Scan Archive',
    fieldIntro: 'The field scan archive preserves gardens, greenhouse interiors, and public spaces under specific lighting, scale, and volumetric conditions. Each entry records a site as a spatial sample rather than only a still image or linear video.',
    valueTitle: 'Spatial Archive Value',
    flowTitle: 'Technical Pipeline and Applications',
    flowPanelTitle: 'Related Production Formats',
    flowPanelBody: 'The Production page provides further notes on project scope, production conditions, and delivery formats.',
    ctaScene: 'Open Scene',
    ctaEmbed: 'Open Embed URL',
    ctaReadme: 'Open Full Note',
    metaViews: 'views',
    unknownSize: 'size unlisted',
    unknownTime: 'time unlisted',
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
        body: 'Gardens, greenhouse interiors, and public-space scans are organized as independent entries so environmental capture can become a sustained archive rather than a loose set of tests.',
        note: 'Currently includes 3 field-scan entries.'
      },
      {
        id: 'visionpro-path',
        title: 'Vision Pro / XR Extension',
        status: 'building',
        body: 'These spatial samples can continue into Vision Pro viewing, XR presentation, spatial-video prototypes, and lighter application paths once the sample layer is stable.',
        note: 'Best extended after the spatial sample is clearly defined.'
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
          'These samples function as spatial entries for project archives, proposals, and public-facing work pages.'
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
        body: 'Use the local AppleSharp-model workflow, ComfyUI, and image preparation to translate flat material into spatial samples with depth, volume, and view-dependent structure.'
      },
      {
        id: 'splat',
        title: '3. Scene Editing',
        body: 'Use Gaussian Splat / SuperSplat to crop, preview, and prepare a shareable version of the scene.'
      },
      {
        id: 'deploy',
        title: '4. Display and Extension',
        body: 'Prepare the result as a web entry, archive sample, or spatial-display asset, then extend it toward Vision Pro, XR, or fuller experience development when the project requires it.'
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
        body: 'This sits closer to spatial viewing than plain video and works well as a spatial preview for project pages, proposals, and work-detail pages.'
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
  'drop-flow-ufo-2025': '/portfolio/works/drop-flow.html',
  'drop-flow': '/portfolio/works/drop-flow.html',
  'timer-series-visual-2024': '/portfolio/works/timer.html',
  timer: '/portfolio/works/timer.html'
}

function formatPublishedAgo(value, language) {
  if (!value) {
    return language === 'en' ? 'time unlisted' : '未标注时间'
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
  const resolvedUrl = rawUrl?.startsWith('./') ? `/portfolio/${rawUrl.replace(/^\.\//, '')}` : rawUrl

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
            <h2 className="section-title">{copy.lineageTitle}</h2>
            <p className="section-intro">{copy.lineageIntro}</p>
            <div className="gaussian-lineage-grid">
              {copy.lineageCards.map((card) => (
                <article key={card.id} className="gaussian-lineage-card">
                  <span>{card.meta}</span>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
            <h3 className="gaussian-subtitle">{copy.methodTitle}</h3>
            <div className="gaussian-method-grid">
              {copy.methodCards.map((card) => (
                <article key={card.id} className="gaussian-method-card">
                  <h4>{card.title}</h4>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">{copy.featuredTitle}</h2>
            <p className="section-intro">{copy.featuredIntro}</p>
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default GaussianScenes
