import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const openingSequence = [
  {
    title: '01 / Technical prelude',
    titleZh: '01 / 技术前奏',
    description: 'The opening begins with star fields, measurement lines, figure-like icons, and white scan structures. This section sets up the cold technical field before the color temperature turns warm.',
    descriptionZh: 'Opening 先从星点、测量线、图标化人物和白色扫描结构进入，建立冷静的技术场，再把色温推向后面的暖色段落。',
    images: [
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-08s-star-field.webp',
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-18s-line-grid.webp',
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-28s-figure-grid.webp',
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-34s-white-scan.webp'
    ]
  },
  {
    title: '02 / Amber threshold',
    titleZh: '02 / 琥珀色阈值',
    description: 'The white scan collapses into amber organic traces. The bridge is short, but it carries the first strong shift in material, depth, and pressure.',
    descriptionZh: '白色扫描压缩成琥珀色有机轨迹。这段很短，但第一次把材质、纵深和压力感明显推起来。',
    images: [
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-38s-preflash-amber.webp',
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-40s-orange-organic.webp',
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-42s-heat-depth.webp',
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-44s-orange-cut.webp'
    ]
  },
  {
    title: '03 / Orange quick-cut run',
    titleZh: '03 / 橙色快闪段落',
    description: 'A dense burst of orange cuts moves through architectural fragments, vertical sweeps, blurred depth, red density, and hard light flashes. This is treated as the strongest visual run of the intro.',
    descriptionZh: '橙色快闪穿过建筑碎片、竖向扫动、模糊纵深、红色密度和强光切换。这组是 intro 里最有冲击力的视觉段落。',
    images: [
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-45s-orange-vertical.webp',
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-46s-orange-arc.webp',
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-47s-red-density.webp',
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-49s-hard-flash.webp',
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-52s-architecture.webp'
    ]
  },
  {
    title: '04 / Fall, line, title resolve',
    titleZh: '04 / 下落、线性、标题收束',
    description: 'After the flash, the sequence returns to black space, falling traces, linear motion, and a particle-based title resolve. The ending connects the opening to the wider 45m2 stage language.',
    descriptionZh: '快闪后回到黑场、下落痕迹、线性运动和粒子标题收束，把 Opening 接回 45㎡ 的整体舞台语言。',
    images: [
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-56s-black-return.webp',
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-62s-linear-return.webp',
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-70s-title-build.webp',
      '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-82s-title-resolve.webp'
    ]
  }
]

const songSurfaces = [
  {
    title: '防沉迷系统 / Fang Chenmi Xitong',
    note: 'PGM and floor LED work as a paired screen-floor system. The page shows the long-screen state and the floor layer that carries the stage geometry.',
    noteZh: '这一首按 PGM 与地屏的配合整理。页面展示主屏状态和承接舞台几何关系的地屏层。',
    preview: 'Preview source: Blender preview, final PGM, and surface render outputs.',
    previewZh: '预览来源：Blender 预览、最终 PGM 与地屏输出。',
    surfaces: [
      { label: 'PGM / long screen', labelZh: 'PGM / 主屏', src: '/portfolio/assets/yujiayun-45ping/final-song-layers/anti-addiction-pgm/anti-addiction-pgm-02-70s.webp', ratio: 'wide' },
      { label: 'Floor LED', labelZh: '地屏', src: '/portfolio/assets/yujiayun-45ping/final-song-wide/anti-addiction-floor/anti-addiction-floor-04-115s.webp', ratio: 'square' }
    ]
  },
  {
    title: '触碰不到的你 / Chupeng Budao De Ni',
    note: 'PGM-only long-screen state, built around black space, isolated figure movement, and horizon-line restraint.',
    noteZh: '这一首目前按 PGM 单层整理，画面重点是黑场、单人运动和水平线空间。',
    preview: 'Preview source: Blender preview, final PGM, and surface render outputs.',
    previewZh: '预览来源：Blender 预览与最终 PGM 输出。',
    surfaces: [
      { label: 'PGM / long screen', labelZh: 'PGM / 主屏', src: '/portfolio/assets/yujiayun-45ping/final-song-wide/touch/touch-05-230s.webp', ratio: 'wide' }
    ]
  },
  {
    title: '尘埃 / Chen Ai',
    note: 'PGM particle field and floor/top-facing particle material were prepared as paired spatial states, with fine dust-like motion across both screen and stage surface.',
    noteZh: '这一首按 PGM 与地面/顶面方向的粒子素材整理，屏幕和舞台表面共同形成细密的尘埃运动。',
    preview: 'Preview source: Blender preview, final PGM, and surface render outputs.',
    previewZh: '预览来源：Blender 预览、最终 PGM 与地面/顶面输出。',
    surfaces: [
      { label: 'PGM / long screen', labelZh: 'PGM / 主屏', src: '/portfolio/assets/yujiayun-45ping/final-song-wide/chenai-pgm/chenai-pgm-05-150s.webp', ratio: 'wide' },
      { label: 'Floor / top surface', labelZh: '地面 / 顶面', src: '/portfolio/assets/yujiayun-45ping/final-song-layers/chenai-floor/chenai-floor-02-95s.webp', ratio: 'square' }
    ]
  },
  {
    title: '卸妆 / Xiezhuang',
    note: 'Floor-only song state with saturated modular pixels and repeated geometric rhythm.',
    noteZh: '这一首目前按地屏单层整理，视觉重点是高饱和像素格和重复几何节奏。',
    preview: 'Preview source: Blender preview, final PGM, and surface render outputs.',
    previewZh: '预览来源：Blender 预览与最终地屏输出。',
    surfaces: [
      { label: 'Floor LED', labelZh: '地屏', src: '/portfolio/assets/yujiayun-45ping/final-song-wide/xiezhuang-floor/xiezhuang-floor-04-120s.webp', ratio: 'square' }
    ]
  },
  {
    title: '千禧 / Qianxi',
    note: 'PGM disc movement and floor LED checkerboard state work as a paired system. The rotating disc gives the long screen a clear central motion cue.',
    noteZh: '这一首按 PGM 圆盘运动和地屏棋盘格整理。旋转圆盘让主屏形成明确的中心运动线索。',
    preview: 'Preview source: Blender preview, final PGM, and surface render outputs.',
    previewZh: '预览来源：Blender 预览、最终 PGM 与地屏输出。',
    surfaces: [
      { label: 'PGM / rotating disc', labelZh: 'PGM / 旋转圆盘', src: '/portfolio/assets/yujiayun-45ping/final-song-layers/qianxi-pgm/qianxi-pgm-02-110s.webp', ratio: 'wide' },
      { label: 'Floor LED', labelZh: '地屏', src: '/portfolio/assets/yujiayun-45ping/final-song-wide/qianxi-floor/qianxi-floor-03-125s.webp', ratio: 'square' }
    ]
  },
  {
    title: '夏夜入梦前 / Xia Ye Ru Meng Qian',
    note: 'PGM foliage and floor LED are shown as a green spatial environment, with the floor layer extending the song state into the stage plane.',
    noteZh: '这一首按 PGM 植物画面和地屏绿色空间整理，地屏把曲目的视觉状态延展到舞台平面。',
    preview: 'Preview source: Blender preview, final PGM, and surface render outputs.',
    previewZh: '预览来源：Blender 预览、最终 PGM 与地屏输出。',
    surfaces: [
      { label: 'PGM / long screen', labelZh: 'PGM / 主屏', src: '/portfolio/assets/yujiayun-45ping/final-song-layers/summer-night-pgm/summer-night-pgm-02-95s.webp', ratio: 'wide' },
      { label: 'Floor LED', labelZh: '地屏', src: '/portfolio/assets/yujiayun-45ping/final-song-wide/summer-night-floor/summer-night-floor-03-110s.webp', ratio: 'square' }
    ]
  }
]

const facts = [
  ['Project', 'Yu Jiayun "45m2" Concert Visual Production'],
  ['Primary record', 'Ningbo stop / 2025.11.01 / Ningbo Olympic Sports Center'],
  ['Later record', 'Shanghai closing show / 2026.04.04 / fan-recorded opening reference'],
  ['Scope', 'Per-artist opening package, main opening sequence, selected song visuals, floor LED content, multi-surface PGM delivery support'],
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
    title: 'Opening segment / Shanghai closing show',
    titleZh: 'Opening 段落 / 上海收官场',
    note: 'Embedded here to show the opening as a live sequence. The segment may be labeled under a song title on Bilibili, but this page uses it as an opening reference.',
    noteZh: '这里嵌入视频，是为了看 Opening 在现场的完整状态。B站分P可能按曲名标注，项目页按开场段落处理。',
    href: 'https://www.bilibili.com/video/BV1pZyRBMEML/',
    embed: 'https://player.bilibili.com/player.html?bvid=BV1pZyRBMEML&page=1&high_quality=1&autoplay=0'
  },
  {
    title: 'Shanghai segmented record',
    titleZh: '上海场分段记录',
    note: 'Segmented live recording reference for comparing the opening and later song states.',
    noteZh: '用于对照 Opening 和后续曲目状态的上海场分段记录。',
    href: 'https://www.bilibili.com/video/BV1JoDGB8EZQ/'
  },
  {
    title: 'Ningbo stop / full fan recording',
    titleZh: '宁波站 / 全程跟拍记录',
    note: 'Context reference for the Ningbo stop. Primary project media on this page uses selected final output frames.',
    noteZh: '作为宁波站整体上下文参考。页面主素材仍以本地最终输出帧整理。',
    href: 'https://www.bilibili.com/video/BV1AVLc6EEtK/'
  }
]

const deliveryNotes = [
  {
    title: 'Opening package',
    titleZh: 'Opening 包装',
    body: 'The one-minute artist opening and the main opening sequence were treated as the strongest page-level case material because they show rhythm, surface switching, color transition, and title resolve in one compact structure.',
    bodyZh: '一分钟艺人开场和主 Opening 作为页面重点展示，因为它们在一个紧凑结构里同时呈现节奏、屏幕切换、色彩转变和标题收束。'
  },
  {
    title: 'Surface delivery',
    titleZh: '屏幕交付',
    body: 'Song visuals are organized by surface rather than by raw source files: PGM long screen, floor LED, and floor/top-facing spatial layers. This keeps the public page readable while preserving the delivery structure.',
    bodyZh: '曲目视觉按屏幕层级整理，不按原始文件堆叠：PGM 主屏、地屏，以及地面/顶面方向的空间层。这样页面可读，也保留交付结构。'
  },
  {
    title: 'Role boundary',
    titleZh: '角色边界',
    body: 'The project is credited under director KANES and visual director Chen Zhe. Ewan Qian is listed for visual production and delivery engineering support.',
    bodyZh: '项目署名保留导演 KANES 与视觉导演陈哲。钱誉文在页面中以视觉制作与工程交付支持列出。'
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

function DeliveryNotes({ isZh }) {
  return (
    <div className="project-note-list">
      {deliveryNotes.map((item) => (
        <article key={item.title}>
          <h3>{isZh ? item.titleZh : item.title}</h3>
          <p>{isZh ? item.bodyZh : item.body}</p>
        </article>
      ))}
    </div>
  )
}

function YuJiayun45m2() {
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const localizedFacts = isZh
    ? [
      ['项目', '余佳运「45㎡」演唱会视觉制作'],
      ['主要记录', '宁波站 / 2025.11.01 / 宁波奥体中心体育馆'],
      ['后续记录', '上海收官场 / 2026.04.04 / Opening 现场参考'],
      ['范围', '艺人开场包装、主 Opening、部分曲目视觉、地屏内容、多屏 PGM 交付支持'],
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
              <h1>{isZh ? '余佳运「45㎡」演唱会视觉制作与工程交付支持' : 'Yu Jiayun "45m2" Concert Visual Production Support'}</h1>
              <p>
                {isZh
                  ? '为余佳运「45㎡」演唱会项目提供视觉制作与工程交付支持，覆盖艺人开场包装、主 Opening、部分曲目视觉、地屏内容与多屏 PGM 交付。'
                  : 'Visual production and delivery engineering support for Yu Jiayun\'s "45m2" concert project, including per-artist opening material, the main opening sequence, selected song visuals, floor LED content, and multi-surface PGM delivery.'}
              </p>
            </div>
            <div className="project-hero-media">
              <img src="/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-46s-orange-arc.webp" alt="Yu Jiayun 45m2 opening visual frame" />
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
            <DeliveryNotes isZh={isZh} />
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
                  ? '这里用最终长屏 PGM 输出帧整理 Opening。前半段密度很高，页面按技术前奏、琥珀阈值、橙色快闪和标题收束四组阅读。'
                  : 'Final output frames from the long-screen opening PGM, organized as technical prelude, amber threshold, orange quick cuts, and title resolve.'}
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
