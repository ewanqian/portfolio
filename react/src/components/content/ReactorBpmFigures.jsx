import React from 'react'

const ASSETS = '/portfolio/assets/reactor-2026/'
const EVENT_ARCHIVE = 'https://ra.co/events/2534022'

const STAGE_PHOTOS = [
  ['01', 'reactor-2026-01.webp', '开场空间', '红色几何构图与场地标识'],
  ['02', 'reactor-2026-02.webp', '演出者与画面', '舞台人物与机器结构影像'],
  ['03', 'reactor-2026-03.webp', '屏幕层次', '明暗分区与人群剪影'],
  ['04', 'reactor-2026-04.webp', '机械视觉', '结构性线条填充舞台空间'],
  ['05', 'reactor-2026-05.webp', '视觉细部', '机械影像与场地标识'],
  ['06', 'reactor-2026-06.webp', '空间与观众', '观众、激光与远端舞台'],
  ['07', 'reactor-2026-07.webp', '高亮状态', '同一空间中的亮度与密度变化'],
  ['08', 'reactor-2026-08.webp', '结构展开', '三角形构成与舞台轮廓'],
  ['09', 'reactor-2026-09.webp', '低位结构', '水平线条与画面留白']
]

function Photo({ src, title, note, className = '' }) {
  return <figure className={'reactor-editorial-photo ' + className}>
    <img src={ASSETS + src} alt={title + '，' + note} loading="lazy" decoding="async" />
    <figcaption><strong>{title}</strong><span>{note}</span></figcaption>
  </figure>
}

function Opening() {
  return <section className="reactor-editorial-opening" aria-label="REACTOR Opening field photographs">
    <div className="reactor-editorial-kicker"><span>REACTOR / FIELD JOURNAL</span><span>2026 · VISUAL PERFORMANCE</span></div>
    <div className="reactor-editorial-lead-grid">
      <Photo src="reactor-2026-02.webp" title="01 / REACTOR — Live Set" note="舞台、表演者与实时视觉的关系；来自作者作品集的 REACTOR 摄影档案。" className="reactor-editorial-cover" />
      <Photo src="reactor-opening-2026-poster.webp" title="Opening / 24—25 Sep 2026" note="活动宣传海报；活动信息见文末资料来源。" className="reactor-editorial-flyer" />
    </div>
    <p className="reactor-editorial-note">摄影展示的是现有 REACTOR 场景档案；上传媒体的逐张拍摄日期未独立核实，不把所有图像直接标成同一晚的现场证据。活动海报来自作者上传，<a href={EVENT_ARCHIVE} target="_blank" rel="noreferrer">活动信息由 Resident Advisor 存档</a>。</p>
  </section>
}

function ThreeTimes() {
  return <section className="reactor-editorial-figure" aria-label="Three kinds of time diagram">
    <div className="reactor-editorial-sectionlabel">FIG. 01 / THREE TIMES</div>
    <div className="reactor-editorial-times">
      <div><small>01 / CONTINUOUS</small><strong>持续时间</strong><span>不需要每拍重新触发</span><div className="reactor-time-line continuous" aria-hidden="true" /></div>
      <div><small>02 / CLOCKED</small><strong>节拍时间</strong><span>BPM / Beat / Bar / Envelope</span><div className="reactor-time-line clocked" aria-hidden="true" /></div>
      <div><small>03 / HUMAN</small><strong>瞬时时间</strong><span>随时进入，随时撤除</span><div className="reactor-time-line human" aria-hidden="true" /></div>
    </div>
    <p className="reactor-editorial-figure-note">三条时间线在同一个舞台叠加。这里的刻度是原理图，而不是任何一首现场曲目的真实波形。</p>
  </section>
}

function ArenaLayers() {
  return <section className="reactor-editorial-figure" aria-label="Arena six-layer performance composition diagram">
    <div className="reactor-editorial-sectionlabel">FIG. 02 / ARENA LAYER ROLES</div>
    <div className="reactor-editorial-layer-grid">
      <div className="reactor-layer-schematic">
        {[
          ['L6', 'EVENT / FLASH', '人工瞬时'],
          ['L5', 'UI / LABEL', '可读信息'],
          ['L4', 'SIGNAL / ENERGY', '节拍 / 动作'],
          ['L3', 'STRUCTURE', '分析 / 分解'],
          ['L2', 'HERO MACHINE', '主体影像'],
          ['L1', 'BASE / BLACK', '底层 / 恢复']
        ].map(([id, name, role]) => <div key={id}><b>{id}</b><strong>{name}</strong><span>{role}</span></div>)}
      </div>
      <Photo src="reactor-2026-04.webp" title="舞台影像 / Visual Composition" note="可以用同一组结构与材质，通过独立图层组织底层、节拍和人工重音。" />
    </div>
    <p className="reactor-editorial-figure-note">六层是 REACTOR 工程资料中的功能分类，不表示它们必须同时播放。初学练习先使用 BASE、CLOCK 和 HIT 三项即可。</p>
  </section>
}

function BeatLink() {
  return <section className="reactor-editorial-figure" aria-label="Beat Link Trigger field capture">
    <div className="reactor-editorial-sectionlabel">FIG. 03 / BEAT LINK TRIGGER · REAL CAPTURE</div>
    <div className="reactor-editorial-operator-grid">
      <Photo src="reactor-beatlink-waveform-square.jpg" title="播放波形 / Waveform" note="来自作者视频约 00:24 的 1:1 截帧。可见播放器 3、节拍、进度与 128 BPM 显示。" className="reactor-beatlink-square" />
      <Photo src="reactor-operator-view.jpg" title="操作视角 / Operator View" note="来自同一段操作视频，电脑屏幕与控制设备同框。" className="reactor-beatlink-operator" />
    </div>
    <p className="reactor-editorial-figure-note">这两张是作者提供的操作视频截图，不是官方界面示例。视频中出现的 128 BPM 属于当时播放器画面，不应误写为 REACTOR 教学工程的固定速度。</p>
    <p className="reactor-editorial-doc"><a href="https://blt-guide.deepsymmetry.org/beat-link-trigger/8.0.0/Players.html" target="_blank" rel="noreferrer">对照 Deep Symmetry 官方播放器界面说明 ↗</a></p>
  </section>
}

function Gallery() {
  return <section className="reactor-editorial-figure" aria-label="REACTOR stage photography archive">
    <div className="reactor-editorial-sectionlabel">FIELD ARCHIVE / REACTOR 2026</div>
    <p className="reactor-gallery-intro">这一组九张照片保留在原作品集的 <code>assets/reactor-2026/</code> 中。它们呈现空间、设备、观众和画面密度的不同状态，是现场方法的视觉语境，而不是对某一条具体技术链路的证明。</p>
    <div className="reactor-editorial-gallery">
      {STAGE_PHOTOS.map(([num, src, title, note]) => <Photo key={num} src={src} title={num + ' / ' + title} note={note} />)}
    </div>
  </section>
}

export default function ReactorBpmFigures({ section = 'opening' }) {
  if (section === 'times') return <ThreeTimes />
  if (section === 'arena') return <ArenaLayers />
  if (section === 'beatlink') return <BeatLink />
  if (section === 'gallery') return <Gallery />
  return <Opening />
}
