import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const openingSequence = [
  {
    title: '01 / Pre-opening technical field',
    titleZh: '01 / 开场前技术场',
    description: 'The intro opens with star fields, measurement lines, icon-like figures, and scan structures. These frames establish the cold technical layer before the warm flash section enters.',
    descriptionZh: 'Opening 从星点、测量线、图标化人物和扫描结构进入，先建立冷静的技术场，再进入后面的暖色快闪段落。',
    images: [
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-18s-line-grid.jpg',
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-28s-figure-grid.jpg',
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-34s-white-scan.jpg'
    ]
  },
  {
    title: '02 / Amber pressure build',
    titleZh: '02 / 琥珀色压力推进',
    description: 'The white scan collapses into amber organic traces. This short bridge is dense and quick, so the page keeps only a few frames with clear shape, depth, and color shift.',
    descriptionZh: '白色扫描压缩成琥珀色有机轨迹。这一段密度很高、切换很快，页面只保留形态、纵深和颜色转变最清楚的几帧。',
    images: [
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-38s-preflash-amber.jpg',
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-40s-orange-organic.jpg',
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-42s-heat-depth.jpg'
    ]
  },
  {
    title: '03 / Orange flash montage',
    titleZh: '03 / 橙色快闪蒙太奇',
    description: 'A cluster of orange cuts moves through architectural fragments, vertical sweeps, blurred depth, and heat-like motion. This is the strongest visual run in the intro and works best as a short sequence.',
    descriptionZh: '橙色快闪穿过建筑碎片、竖向扫动、模糊纵深和热感运动。这是 intro 里最强的一组视觉段落，适合按连续帧展示。',
    images: [
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-44s-orange-cut.jpg',
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-45s-orange-vertical.jpg',
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-46s-orange-arc.jpg',
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-52s-architecture.jpg'
    ]
  },
  {
    title: '04 / Return to black spatial line',
    titleZh: '04 / 回到黑场空间线',
    description: 'After the flash, the system returns to black space, falling traces, linear motion, and a particle-based title resolve. The ending links the intro back to the wider 45m2 stage language.',
    descriptionZh: '快闪后回到黑场、下落痕迹、线性运动和粒子标题收束，把 Opening 接回 45m2 的整体舞台语言。',
    images: [
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-56s-black-return.jpg',
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-62s-linear-return.jpg',
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-82s-title-resolve.jpg'
    ]
  }
]

const songSurfaces = [
  {
    title: '防沉迷系统 / Fang Chenmi Xitong',
    note: 'PGM and floor LED are shown here as the main readable layers. Ring-screen material is kept out of the public page for now.',
    noteZh: '这一首按 PGM 和地屏整理。环屏素材先不放，页面只保留主屏和地屏两层。',
    preview: 'Preview source: Blender preview, final PGM, and surface render outputs.',
    previewZh: '预览来源：Blender 预览、最终 PGM 与地屏输出。',
    surfaces: [
      { label: 'PGM / long screen', labelZh: 'PGM / 主屏', src: '/portfolio/assets/yujiayun-45ping/final-song-layers/anti-addiction-pgm/anti-addiction-pgm-02-70s.jpg', ratio: 'wide' },
      { label: 'Floor LED', labelZh: '地屏', src: '/portfolio/assets/yujiayun-45ping/final-song-wide/anti-addiction-floor/anti-addiction-floor-04-115s.jpg', ratio: 'square' }
    ]
  },
  {
    title: '触碰不到的你 / Chupeng Budao De Ni',
    note: 'PGM-only long-screen state, built around black space, isolated figure movement, and horizon-line restraint.',
    noteZh: '这一首目前按 PGM 单层整理，画面重点是黑场、单人运动和水平线空间。',
    preview: 'Preview source: Blender preview, final PGM, and surface render outputs.',
    previewZh: '预览来源：Blender 预览与最终 PGM 输出。',
    surfaces: [
      { label: 'PGM / long screen', labelZh: 'PGM / 主屏', src: '/portfolio/assets/yujiayun-45ping/final-song-wide/touch/touch-05-230s.jpg', ratio: 'wide' }
    ]
  },
  {
    title: '尘埃 / Chen Ai',
    note: 'PGM particle field and floor/top-facing particle material were prepared as paired spatial states.',
    noteZh: '这一首按 PGM 与地面/顶面方向的粒子素材整理，是一组配合的空间状态。',
    preview: 'Preview source: Blender preview, final PGM, and surface render outputs.',
    previewZh: '预览来源：Blender 预览、最终 PGM 与地面/顶面输出。',
    surfaces: [
      { label: 'PGM / long screen', labelZh: 'PGM / 主屏', src: '/portfolio/assets/yujiayun-45ping/final-song-wide/chenai-pgm/chenai-pgm-05-150s.jpg', ratio: 'wide' },
      { label: 'Floor / top surface', labelZh: '地面 / 顶面', src: '/portfolio/assets/yujiayun-45ping/final-song-layers/chenai-floor/chenai-floor-02-95s.jpg', ratio: 'square' }
    ]
  },
  {
    title: '卸妆 / Xiezhuang',
    note: 'Floor-only song state with saturated modular pixels and repeated geometric rhythm.',
    noteZh: '这一首目前按地屏单层整理，视觉重点是高饱和像素格和重复几何节奏。',
    preview: 'Preview source: Blender preview, final PGM, and surface render outputs.',
    previewZh: '预览来源：Blender 预览与最终地屏输出。',
    surfaces: [
      { label: 'Floor LED', labelZh: '地屏', src: '/portfolio/assets/yujiayun-45ping/final-song-wide/xiezhuang-floor/xiezhuang-floor-04-120s.jpg', ratio: 'square' }
    ]
  },
  {
    title: '千禧 / Qianxi',
    note: 'PGM disc movement and floor LED checkerboard state work as a paired screen-floor system.',
    noteZh: '这一首按 PGM 圆盘运动和地屏棋盘格整理，是一组主屏与地屏配合的状态。',
    preview: 'Preview source: Blender preview, final PGM, and surface render outputs.',
    previewZh: '预览来源：Blender 预览、最终 PGM 与地屏输出。',
    surfaces: [
      { label: 'PGM / rotating disc', labelZh: 'PGM / 旋转圆盘', src: '/portfolio/assets/yujiayun-45ping/final-song-layers/qianxi-pgm/qianxi-pgm-02-110s.jpg', ratio: 'wide' },
      { label: 'Floor LED', labelZh: '地屏', src: '/portfolio/assets/yujiayun-45ping/final-song-wide/qianxi-floor/qianxi-floor-03-125s.jpg', ratio: 'square' }
    ]
  },
  {
    title: '夏夜入梦前 / Xia Ye Ru Meng Qian',
    note: 'PGM foliage and floor LED are shown here as a green spatial environment. Ring-screen material is kept out of the public page for now.',
    noteZh: '这一首按 PGM 植物画面和地屏绿色空间整理。环屏素材先不放。',
    preview: 'Preview source: Blender preview, final PGM, and surface render outputs.',
    previewZh: '预览来源：Blender 预览、最终 PGM 与地屏输出。',
    surfaces: [
      { label: 'PGM / long screen', labelZh: 'PGM / 主屏', src: '/portfolio/assets/yujiayun-45ping/final-song-layers/summer-night-pgm/summer-night-pgm-02-95s.jpg', ratio: 'wide' },
      { label: 'Floor LED', labelZh: '地屏', src: '/portfolio/assets/yujiayun-45ping/final-song-wide/summer-night-floor/summer-night-floor-03-110s.jpg', ratio: 'square' }
    ]
  }
]

const facts = [
  ['Project', 'Yu Jiayun "45m2" Concert Visual Production'],
  ['Primary record', 'Ningbo stop / 2025.11.01 / Ningbo Olympic Sports Center'],
  ['Later record', 'Shanghai closing show / 2026.04.04 / fan-recorded opening reference'],
  ['Scope', 'One-minute artist opening, main opening sequence, selected song visuals, floor LED content, multi-surface PGM delivery support'],
  ['Role', 'Visual Production / Delivery Engineering'],
  ['Frame source', 'Final render and output frames']
]

const credits = [
  ['Director', 'KANES'],
  ['Visual Director', 'Chen Zhe'],
  ['Visual Production / Delivery Engineering', 'Ewan Qian / 钱誉文']
]

const externalRecordings = [
  {
    title: 'Opening reference / Shanghai closing show',
    titleZh: 'Opening 现场参考 / 上海收官场',
    note: 'Embedded here to show the full live opening sequence in context. The Bilibili page labels this segment as Xia Luo; this project page treats it as the concert opening record.',
    noteZh: '这里嵌入视频，是为了看完整 Opening 在现场的状态。B站分P写作“下落”，但项目页按 concert opening 处理。',
    href: 'https://www.bilibili.com/video/BV1JoDGB8EZQ?p=1',
    embed: 'https://player.bilibili.com/player.html?bvid=BV1JoDGB8EZQ&page=1&high_quality=1&autoplay=0'
  },
  {
    title: 'Ningbo stop / full fan recording',
    titleZh: '宁波站 / 全程跟拍参考',
    note: 'Context reference for the Ningbo show, not used as the primary project media source.',
    noteZh: '作为宁波场整体上下文参考，不作为项目页主素材来源。',
    href: 'https://www.bilibili.com/video/BV1pZyRBMEML?p=1'
  }
]

function ImageStrip({ images, tone = 'wide' }) {
  return (
    <div className={`project-image-strip ${tone}`}>
      {images.map((src) => (
        <img key={src} src={src} alt="" loading="lazy" />
      ))}
    </div>
  )
}

function SequenceBlock({ item, isZh }) {
  return (
    <article className="project-sequence-block">
      <div className="project-sequence-copy">
        <h3>{isZh ? item.titleZh || item.title : item.title}</h3>
        <p>{isZh ? item.descriptionZh || item.description : item.description}</p>
      </div>
      <ImageStrip images={item.images} tone={item.tone} />
    </article>
  )
}

function SongSurfaceBlock({ item, isZh }) {
  return (
    <article className="project-song-block">
      <div className="project-sequence-copy">
        <h3>{item.title}</h3>
        <p>{isZh ? item.noteZh || item.note : item.note}</p>
        <p className="project-preview-note">{isZh ? item.previewZh || item.preview : item.preview}</p>
      </div>
      <div className="project-surface-grid">
        {item.surfaces.map((surface) => (
          <figure key={surface.label} className={`project-surface-card ${surface.ratio}`}>
            <img src={surface.src} alt="" loading="lazy" />
            <figcaption>{isZh ? surface.labelZh || surface.label : surface.label}</figcaption>
          </figure>
        ))}
      </div>
    </article>
  )
}

function FactTable({ rows }) {
  return (
    <dl className="project-fact-table">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}

function RecordingEmbed({ item, isZh }) {
  return (
    <article className="project-recording-card">
      {item.embed && (
        <div className="project-video-frame">
          <iframe
            src={item.embed}
            title={item.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
      <div className="project-recording-copy">
        <h3>{isZh ? item.titleZh || item.title : item.title}</h3>
        <p>{isZh ? item.noteZh || item.note : item.note}</p>
        <a href={item.href} target="_blank" rel="noreferrer">{isZh ? '打开 Bilibili' : 'Open on Bilibili'}</a>
      </div>
    </article>
  )
}

function YuJiayun45m2() {
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const localizedFacts = isZh
    ? [
      ['项目', '余佳运「45m2」演唱会视觉制作'],
      ['主要记录', '宁波站 / 2025.11.01 / 宁波奥体中心体育馆'],
      ['后续记录', '上海收官场 / 2026.04.04 / Opening 现场参考'],
      ['范围', '艺人开场、主 Opening、部分曲目视觉、地屏内容、多屏 PGM 交付支持'],
      ['角色', '视觉制作 / 工程交付支持'],
      ['帧来源', '最终渲染与输出帧']
    ]
    : facts
  const localizedCredits = isZh
    ? [
      ['导演', 'KANES'],
      ['视觉导演', '陈哲'],
      ['视觉制作 / 工程交付支持', 'Ewan Qian / 钱誉文']
    ]
    : credits

  return (
    <>
      <Header />
      <main className="project-page">
        <section className="project-hero">
          <div className="container project-hero-grid">
            <div className="project-hero-copy">
              <div className="eyebrow">{isZh ? '演唱会视觉制作' : 'Concert Visual Production'}</div>
              <h1>{isZh ? '余佳运「45m2」演唱会视觉制作与工程交付支持' : 'Yu Jiayun "45m2" Concert Visual Production Support'}</h1>
              <p>
                {isZh
                  ? '为余佳运「45m2」演唱会项目提供视觉制作与工程交付支持，覆盖艺人开场、主 Opening、部分曲目视觉、地屏内容与多屏 PGM 交付。'
                  : 'Visual production and delivery engineering support for Yu Jiayun\'s "45m2" concert project, including the one-minute artist opening, the main opening sequence, selected song visuals, floor LED content, and multi-surface PGM delivery.'}
              </p>
            </div>
            <div className="project-hero-media">
              <img src="/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-46s-orange-arc.jpg" alt="Yu Jiayun 45m2 opening visual frame" />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container project-two-column">
            <div>
              <h2 className="section-title">{isZh ? '项目信息' : 'Project Facts'}</h2>
              <FactTable rows={localizedFacts} />
            </div>
            <div>
              <h2 className="section-title">{isZh ? '制作署名' : 'Credits'}</h2>
              <FactTable rows={localizedCredits} />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-heading-row">
              <div>
                <div className="eyebrow">{isZh ? 'Opening 时间线' : 'Opening Sequence'}</div>
                <h2 className="section-title">{isZh ? '演唱会开场时间线' : 'Concert Opening Timeline'}</h2>
              </div>
              <p className="section-intro">
                {isZh
                  ? '这里用最终长屏 PGM 输出帧整理 Opening。Intro 密度很高，所以只保留最能说明时间线的关键画面。'
                  : 'Final output frames from the long-screen opening PGM. The page keeps the dense intro readable by showing only the strongest timeline beats.'}
              </p>
            </div>
            <div className="project-sequence-list">
              {openingSequence.map((item) => (
                <SequenceBlock key={item.title} item={item} isZh={isZh} />
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-heading-row">
              <div>
                <div className="eyebrow">{isZh ? '曲目屏幕层级' : 'Song Surface Map'}</div>
                <h2 className="section-title">{isZh ? '曲目视觉屏幕层级' : 'Song Visual Surface Map'}</h2>
              </div>
              <p className="section-intro">
                {isZh
                  ? '每首歌按屏幕层级整理：PGM 主屏、地屏，或地面/顶面方向内容。Ring screen 等非核心层先不放在页面里。'
                  : 'Each song is organized by surface: PGM long screen, floor LED, or top-facing spatial content. Ring-screen layers are kept out of the page for now.'}
              </p>
            </div>
            <div className="project-sequence-list">
              {songSurfaces.map((item) => (
                <SongSurfaceBlock key={item.title} item={item} isZh={isZh} />
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-heading-row">
              <div>
                <div className="eyebrow">{isZh ? '视频参考' : 'Video Records'}</div>
                <h2 className="section-title">{isZh ? 'Opening 现场视频参考' : 'Opening Video Reference'}</h2>
              </div>
              <p className="section-intro">
                {isZh
                  ? '这个视频块只负责看 Opening 在现场的完整状态。曲目画面以本地最终输出帧整理。'
                  : 'The embedded video is for seeing the opening as a live sequence. Song media on this page is organized from local final output frames.'}
              </p>
            </div>
            <div className="project-recording-grid">
              {externalRecordings.map((item) => (
                <RecordingEmbed key={item.title} item={item} isZh={isZh} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default YuJiayun45m2
