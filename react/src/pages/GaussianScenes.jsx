import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import scenes from '../data/generated/gaussianScenes'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { localizeScene } from '../i18n/content.js'

const methodNoteUrl = 'https://github.com/ewanqian/portfolio/blob/main/archive/gaussian-scenes/gaussian-spatial-workflow-note.md'
const archiveUrl = 'https://github.com/ewanqian/portfolio/tree/main/archive/gaussian-scenes'

const pageCopy = {
  zh: {
    eyebrow: 'Gaussian / Spatial Capture',
    title: 'Gaussian Scenes',
    intro: '360°影像、摄影测量与 Gaussian Splatting 的空间采集记录。这里集中保留实际场景、采集信息与 SuperSplat 查看入口。',
    statScenes: '场景',
    statField: '实地采集',
    statDerived: '项目素材',
    scenesTitle: 'Scenes',
    scenesIntro: '当前页面只展示已经归档并有可访问链接的场景。',
    fieldLabel: 'Field Capture',
    derivedLabel: 'Project Material',
    openScene: 'Open SuperSplat',
    openEmbed: 'Open Embed',
    methodTitle: 'Capture Method',
    methodIntro: '从二砂及后续 360° 扫描试验中逐步稳定下来的处理方式。根据素材条件，Metashape 与 COLMAP 都可以进入重建环节。',
    methodSteps: [
      {
        id: 'capture',
        title: '01 / Capture',
        body: '使用 360° 相机、无人机全景或连续影像采集。设备型号不是流程前提，重点是覆盖、稳定性与可用纹理。'
      },
      {
        id: 'equirectangular',
        title: '02 / Equirectangular',
        body: '将鱼眼或多镜头素材先合成为 2:1 等距柱状全景，再进入抽帧与重建。'
      },
      {
        id: 'sampling',
        title: '03 / Frame Sampling',
        body: '视频通常从 1 fps 开始；根据移动速度与场景纹理提高到 3–5 fps。继续增加往往只是增加重复帧与计算量。'
      },
      {
        id: 'reconstruction',
        title: '04 / Metashape / COLMAP',
        body: '完成图像对齐、相机位姿与稀疏点云。当前 360° 工作流中，Metashape 在实际处理上更直接；COLMAP 仍适合标准多视图重建。'
      },
      {
        id: 'gaussian',
        title: '05 / Gaussian + SuperSplat',
        body: '将已经对齐的图像、相机参数与稀疏点云交给 Gaussian 流程，再用 SuperSplat 做查看、裁切与分享。'
      }
    ],
    erShaTitle: '二砂 / Zhengzhou Ersha',
    erShaBody: '前期曾尝试把全景图拆成多个透视面再重新对齐，实际会把大量时间消耗在重复匹配和相机关系重建上。现在优先保留 360° 全景的连续采集关系，抽帧后直接进入相机求解与稀疏点云，再交给 Gaussian。二砂目前作为 Capture Method 的实践记录保留；没有对应 SuperSplat 链接时，不伪装成场景卡片。',
    archiveTitle: 'Archive',
    archiveBody: '场景元数据、SuperSplat 链接与生成脚本集中维护在同一归档目录。',
    methodLink: 'Read Capture Method',
    archiveLink: 'Open Archive',
    backArchive: 'Back to Archive'
  },
  en: {
    eyebrow: 'Gaussian / Spatial Capture',
    title: 'Gaussian Scenes',
    intro: 'A compact archive of spatial captures made with 360° imagery, photogrammetry, Gaussian Splatting, and SuperSplat. Only documented scenes, capture notes, and working viewer links are kept here.',
    statScenes: 'Scenes',
    statField: 'Field Captures',
    statDerived: 'Project Material',
    scenesTitle: 'Scenes',
    scenesIntro: 'This page only lists archived scenes with working scene records and viewer links.',
    fieldLabel: 'Field Capture',
    derivedLabel: 'Project Material',
    openScene: 'Open SuperSplat',
    openEmbed: 'Open Embed',
    methodTitle: 'Capture Method',
    methodIntro: 'A practical pipeline refined through the Zhengzhou Ersha scan and later 360° capture tests. Metashape and COLMAP are used according to the source material.',
    methodSteps: [
      {
        id: 'capture',
        title: '01 / Capture',
        body: 'Capture with a 360° camera, drone panorama, or continuous video. Camera model is secondary to coverage, stability, and usable texture.'
      },
      {
        id: 'equirectangular',
        title: '02 / Equirectangular',
        body: 'Stitch fisheye or multi-lens footage into a 2:1 equirectangular panorama before frame extraction and reconstruction.'
      },
      {
        id: 'sampling',
        title: '03 / Frame Sampling',
        body: 'Start around 1 fps for video. Increase to 3–5 fps when movement or scene texture requires it; denser sampling often adds redundancy more than useful geometry.'
      },
      {
        id: 'reconstruction',
        title: '04 / Metashape / COLMAP',
        body: 'Solve image alignment, camera poses, and a sparse point cloud. In the current 360° workflow, Metashape has been the more direct practical route; COLMAP remains useful for conventional multi-view reconstruction.'
      },
      {
        id: 'gaussian',
        title: '05 / Gaussian + SuperSplat',
        body: 'Pass aligned images, camera parameters, and the sparse point cloud into the Gaussian pipeline, then use SuperSplat for inspection, cropping, and sharing.'
      }
    ],
    erShaTitle: 'Zhengzhou Ersha',
    erShaBody: 'Early tests split panoramas into multiple perspective faces and aligned them again. In practice this created unnecessary matching and camera-reconstruction work. The current route keeps the continuity of the 360° capture, extracts frames, solves cameras and a sparse cloud, and then moves into Gaussian processing. Ersha stays here as a capture-method case until a corresponding SuperSplat scene is actually archived.',
    archiveTitle: 'Archive',
    archiveBody: 'Scene metadata, SuperSplat links, and the archive script are maintained in one directory.',
    methodLink: 'Read Capture Method',
    archiveLink: 'Open Archive',
    backArchive: 'Back to Archive'
  }
}

const sceneCopy = {
  zh: {
    b9ec0173: 'TIMER 场景资料形成的 Gaussian 空间样本。',
    '36db89a4': 'Drop Flow / Rooooooom719 阶段素材形成的 Gaussian 拼贴场景。',
    '0f404310': '新宿御苑温室的 360° Gaussian 扫描。',
    a90198a5: '东京塔周边花园的 360° Gaussian 扫描。',
    '87d112d3': '涩谷 Shibuya Sakura Stage 城市空间扫描。'
  },
  en: {
    b9ec0173: 'A Gaussian spatial sample built from TIMER scene material.',
    '36db89a4': 'A Gaussian collage scene built from Drop Flow / Rooooooom719 material.',
    '0f404310': 'A 360° Gaussian scan of the Shinjuku Gyoen greenhouse.',
    a90198a5: 'A 360° Gaussian scan of a garden near Tokyo Tower.',
    '87d112d3': 'An urban spatial scan of Shibuya Sakura Stage.'
  }
}

function GaussianScenes() {
  const { language } = useLanguage()
  const copy = pageCopy[language]
  const localizedScenes = scenes.map((scene) => localizeScene(scene, language))
  const fieldCount = localizedScenes.filter((scene) => scene.category === 'field-scan').length
  const derivedCount = localizedScenes.filter((scene) => scene.category === 'work-derived').length

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
                <span>{copy.statScenes}</span>
              </div>
              <div className="gaussian-stat-card">
                <strong>{fieldCount}</strong>
                <span>{copy.statField}</span>
              </div>
              <div className="gaussian-stat-card">
                <strong>{derivedCount}</strong>
                <span>{copy.statDerived}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">{copy.scenesTitle}</h2>
            <p className="section-intro">{copy.scenesIntro}</p>

            <div className="gaussian-scene-grid">
              {localizedScenes.map((scene) => (
                <article key={scene.id} className="gaussian-scene-card">
                  <div className="gaussian-scene-image">
                    <img src={scene.thumbnail} alt={scene.displayTitle} loading="lazy" />
                  </div>
                  <div className="gaussian-scene-content">
                    <div className="gaussian-badge-row">
                      <span className="gaussian-badge">
                        {scene.category === 'field-scan' ? copy.fieldLabel : copy.derivedLabel}
                      </span>
                      <span className="gaussian-badge subtle">{scene.location}</span>
                    </div>
                    <h3>{scene.displayTitle}</h3>
                    <p>{sceneCopy[language][scene.id] || scene.summary}</p>
                    <div className="gaussian-tags">
                      {(scene.tags || []).slice(0, 4).map((tag) => (
                        <span key={tag} className="gaussian-tag">{tag}</span>
                      ))}
                    </div>
                    <div className="hero-cta">
                      <a href={scene.sceneUrl} target="_blank" rel="noreferrer" className="button primary">
                        {copy.openScene}
                      </a>
                      <a href={scene.embedUrl} target="_blank" rel="noreferrer" className="button">
                        {copy.openEmbed}
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
            <h2 className="section-title">{copy.methodTitle}</h2>
            <p className="section-intro">{copy.methodIntro}</p>

            <div className="gaussian-workflow-grid">
              {copy.methodSteps.map((step) => (
                <article key={step.id} className="gaussian-info-card">
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>

            <div className="gaussian-cta-panel" style={{ marginTop: '24px' }}>
              <h3>{copy.erShaTitle}</h3>
              <p>{copy.erShaBody}</p>
              <div className="hero-cta">
                <a href={methodNoteUrl} target="_blank" rel="noreferrer" className="button primary">
                  {copy.methodLink}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">{copy.archiveTitle}</h2>
            <p className="section-intro">{copy.archiveBody}</p>
            <div className="hero-cta">
              <a href={archiveUrl} target="_blank" rel="noreferrer" className="button primary">
                {copy.archiveLink}
              </a>
              <Link to="/archive" className="button">{copy.backArchive}</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default GaussianScenes
