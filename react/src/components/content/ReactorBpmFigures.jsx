import React, { useState } from 'react'

const ROOT = '/portfolio/assets/reactor-2026/'
const ARCHIVE = 'https://github.com/ewanqian/portfolio/tree/main/assets/reactor-2026'

function CaptionedPhoto({ src, title, caption, className = '' }) {
  return (
    <figure className={'bpm-side-photo ' + className}>
      <img src={ROOT + src} alt={title} loading="lazy" decoding="async" />
      <figcaption><strong>{title}</strong><span>{caption}</span></figcaption>
    </figure>
  )
}

function TimeDiagram() {
  return (
    <section className="bpm-side-group" aria-label="三种时间示意图">
      <div className="bpm-side-kicker">FIG. 01 / TIME STRUCTURE</div>
      <div className="bpm-time-tracks" aria-hidden="true">
        <div><span>CONTINUOUS</span><i className="bpm-track-sustain" /></div>
        <div><span>CLOCKED</span><i className="bpm-track-ticks" /></div>
        <div><span>HUMAN</span><i className="bpm-track-human" /></div>
      </div>
      <p>一条持续的基底、一组重复的节拍，以及人临时决定的瞬间。</p>
    </section>
  )
}

function RouteDiagram() {
  return (
    <section className="bpm-side-group" aria-label="视觉演出系统的输入与输出关系">
      <div className="bpm-side-kicker">FIG. 02 / SIGNAL FLOW</div>
      <div className="bpm-route-grid">
        <div className="bpm-route-box">鼠标 / MIDI 推子 / TouchDesigner OSC<small>实时改变透明度与触发</small></div>
        <div className="bpm-route-connector" aria-hidden="true"><span>↓</span></div>
        <div className="bpm-route-box bpm-route-main">Resolume Arena<small>BASE + CLOCK + HIT → 合成画面</small></div>
        <div className="bpm-route-connector" aria-hidden="true"><span>↓</span></div>
        <div className="bpm-route-box">LED / 投影 / 现场空间<small>最终输出与观看环境</small></div>
        <div className="bpm-route-observer">DJ 音乐、Beat Link 视图 → 演出者判断</div>
      </div>
    </section>
  )
}

const FADERS = [
  {name: 'L1 / BASE', note: '持续影像'},
  {name: 'L2 / CLOCK', note: 'BPM 节拍'},
  {name: 'L3 / HIT', note: '人工重音'}
]

function LayerMixer() {
  const [levels, setLevels] = useState([100, 45, 0])
  const [bpm, setBpm] = useState(100)
  const changeLevel = (index, value) => setLevels((previous) => previous.map((item, i) => i === index ? Number(value) : item))
  const presets = [
    ['OPEN', [70, 0, 0]],
    ['BUILD', [100, 48, 0]],
    ['PEAK', [100, 75, 80]],
    ['BREAK', [60, 0, 0]]
  ]
  return (
    <section className="bpm-side-group bpm-mixer" aria-label="交互式三轨透明度混合示例">
      <div className="bpm-side-kicker">PLAY / LAYER OPACITY</div>
      <div className="bpm-demo-composition" aria-label={'合成预览：背景 ' + levels[0] + '%，节拍层 ' + levels[1] + '%，重音层 ' + levels[2] + '%'}>
        <div className="bpm-demo-base" style={{opacity: levels[0] / 100}}>
          <span className="bpm-demo-plane one" /><span className="bpm-demo-plane two" /><span className="bpm-demo-plane three" />
        </div>
        <div className="bpm-demo-pulse" style={{opacity: levels[1] / 100, '--pulse-time': (60 / bpm) + 's'}}>
          <span /><span /><span />
        </div>
        <div className="bpm-demo-hit" style={{opacity: levels[2] / 100}}><span /></div>
        <div className="bpm-demo-canvas-label">COMPOSITION / PREVIEW</div>
      </div>
      <div className="bpm-demo-presets">
        {presets.map(([name, preset]) => <button type="button" key={name} onClick={() => setLevels(preset)}>{name}</button>)}
      </div>
      <div className="bpm-demo-faders">
        {FADERS.map((channel, i) => (
          <label key={channel.name} className="bpm-demo-fader">
            <span><strong>{channel.name}</strong><small>{levels[i]}%</small></span>
            <input type="range" min="0" max="100" step="1" value={levels[i]} onChange={(event) => changeLevel(i, event.target.value)} aria-label={channel.name + ' 透明度'} />
            <em>{channel.note}</em>
          </label>
        ))}
      </div>
      <label className="bpm-tempo-control">
        <span><strong>BPM</strong><span>{bpm}</span></span>
        <input type="range" min="70" max="160" value={bpm} onChange={(event) => setBpm(Number(event.target.value))} aria-label="动画演示 BPM" />
      </label>
      <p className="bpm-demo-note">拖动推子或切换四种状态，观察分层透明度如何改变合成画面。这是网页上的原理模型；现场控制由 Arena 接收鼠标、MIDI 或 OSC 输入。</p>
    </section>
  )
}

function HistoricalContext() {
  const references = [
    {year: '2016', name: 'Nosaj Thing × Daito Manabe', kind: '实时扫描 / 现场分工', detail: '扫描输入、实时图像程序、技术导演与现场支持彼此配合。学习如何把实时效果组织成可以运行的舞台系统。', url: 'https://research.rhizomatiks.com/en/works/nosaj_thing_coachella.html'},
    {year: '2020', name: 'DJ KRUSH × Daito Manabe', kind: '从音乐家动作得到信息', detail: '分析转盘与混音台的演奏动作，令图像回应真实操作，而不只是对着音量变化。', url: 'https://rhizomatiks.com/en/work/connected-world/'},
    {year: 'LIVE', name: 'Comix / Notch', kind: '现场参数与内容交付', detail: '将实时内容的可调参数、摄像机、灯光和时间信息纳入可演出的工作流。', url: 'https://www.thisiscomix.com/real-time'}
  ]
  return (
    <section className="bpm-side-group bpm-history" aria-label="现场视觉控制的专业案例">
      <div className="bpm-side-kicker">READING / LIVE VISUAL PRACTICE</div>
      <p className="bpm-history-intro">作品与方法：音乐信息如何进入视觉；实时图像如何被操作、如何交付。</p>
      <div className="bpm-history-rows">
        {references.map(({year,name,kind,detail,url}) => <article className="bpm-history-item" key={name}>
          <time>{year}</time><div><a href={url} target="_blank" rel="noreferrer"><strong>{name}</strong> ↗</a><em>{kind}</em><p>{detail}</p></div>
        </article>)}
      </div>
    </section>
  )
}

function StageCoordination() {
  return (
    <section className="bpm-side-group bpm-coordination" aria-label="VJ 与灯光系统的协作">
      <div className="bpm-side-kicker">PRODUCTION / 灯光协作</div>
      <div className="bpm-coordination-signal"><span>DJ / MUSIC</span><i /> <span>VJ / IMAGE</span><i /> <span>LD / LIGHT</span></div>
      <p>协调的核心不是所有设备都使用同一个控制器，而是共同确认 <strong>OPEN、BUILD、HOLD、PEAK、BREAK、BLACKOUT</strong> 六类 Cue 的含义。</p>
      <p>排练前对齐色调、亮度上限、空间主次、进入与退出的权限；固定段落可使用 Timecode，同步并非即兴段落的必要条件。</p>
      <div className="bpm-side-linkset">
        <a href="https://www.resolume.com/support/en/smpte" target="_blank" rel="noreferrer">Resolume · SMPTE ↗</a>
        <a href="https://help.malighting.com/grandMA3/2.5/HTML/timecode.html" target="_blank" rel="noreferrer">grandMA3 · Timecode ↗</a>
      </div>
    </section>
  )
}

function Vocabulary() {
  return (
    <section className="bpm-side-group bpm-vocabulary" aria-label="现场演出词汇速查">
      <div className="bpm-side-kicker">INDEX / 术语速查</div>
      <dl>
        <div><dt>VJ</dt><dd>现场视频操作与视觉表演者</dd></div>
        <div><dt>LD</dt><dd>Lighting Designer，灯光设计师</dd></div>
        <div><dt>Cue</dt><dd>演出某个时刻要执行的动作或状态</dd></div>
        <div><dt>Timecode</dt><dd>用统一时间位置对齐不同设备的事件</dd></div>
        <div><dt>Previs</dt><dd>在到达真实舞台前进行可视化预演</dd></div>
        <div><dt>IMAG</dt><dd>现场摄像机画面，用于舞台大屏呈现</dd></div>
      </dl>
    </section>
  )
}

function BeatLinkReading() {
  return (
    <section className="bpm-side-group bpm-beatlink-notes" aria-label="Beat Link 播放器截图阅读说明">
      <div className="bpm-side-kicker">FIG. 01 / BEAT LINK TRIGGER</div>
      <CaptionedPhoto src="reactor-beatlink-waveform-square.jpg" title="DJ PLAYER / TRACK OVERVIEW" caption="从 REACTOR 操作视频提取。先看播放位置，再看 BPM、节拍网格、接下来可能变化的段落。" />
      <ol>
        <li><strong>POSITION</strong><span>当前播到哪里，下一段还有多远</span></li>
        <li><strong>BPM / BEAT GRID</strong><span>现在的速度、拍子和小节位置</span></li>
        <li><strong>WAVEFORM</strong><span>音乐的能量起伏；颜色取决于显示模式</span></li>
        <li><strong>UPCOMING</strong><span>准备进入还是准备撤除视觉层</span></li>
      </ol>
      <a href="https://blt-guide.deepsymmetry.org/beat-link-trigger/8.0.0/Players.html" target="_blank" rel="noreferrer">Beat Link Trigger · Player Status ↗</a>
    </section>
  )
}

function Sidebar() {
  return (
    <div className="bpm-visual-sidebar">
      <CaptionedPhoto src="reactor-2026-06.webp" title="REACTOR / CLUB SPACE" caption="现场舞池、屏幕与光束之间的关系。" className="bpm-sidebar-lead" />
      <BeatLinkReading />
      <section className="bpm-side-group bpm-sync-reading">
        <div className="bpm-side-kicker">FIG. 02 / HOW BPM SYNC WORKS</div>
        <div className="bpm-sync-track"><span>120 BPM</span><i /><i /><i /><i /></div>
        <div className="bpm-sync-track bpm-sync-travel"><span>16 BEATS</span><b>4 BARS / 8 SEC</b></div>
        <p>设定 120 BPM、四小节循环为 16 Beats：同步的不仅是速度，还要检查画面在哪一拍开始。</p>
      </section>
      <div className="bpm-sidebar-pair">
        <CaptionedPhoto src="reactor-2026-08.webp" title="STAGE / STRUCTURE" caption="用于理解现场内容如何落入真实屏幕。" />
        <div className="bpm-side-quick-note"><div className="bpm-side-kicker">THREE TIMES</div><TimeDiagram /></div>
      </div>
      <RouteDiagram />
      <details className="bpm-mini-mixer">
        <summary>尝试 Layer Opacity <span>INTERACTIVE</span></summary>
        <LayerMixer />
      </details>
      <HistoricalContext />
      <StageCoordination />
      <Vocabulary />
      <p className="bpm-sidebar-archive"><a href={ARCHIVE} target="_blank" rel="noreferrer">REACTOR 摄影与操作图像档案 ↗</a></p>
    </div>
  )
}

function Appendix() {
  return (
    <section className="bpm-appendix" id="bpm-appendix" aria-label="BPM Sync 实操与训练">
      <div className="bpm-appendix-top"><span>APPENDIX / PRACTICE</span><h2>从一段素材到 Club Live Set</h2><p>按照需要展开练习。正文先讲听音乐、看波形、使用 BPM Sync 的方法；这里集中放菜单步骤、外设映射和排练。</p></div>
      <details>
        <summary><strong>A / 第一次使用 BPM Sync</strong><span>Resolume Arena · 10 分钟</span></summary>
        <ol>
          <li>新建 Composition，放入两段视频：一段不跟拍的背景，一段长度适合循环的动画。</li>
          <li>打开节奏动画的 Clip 面板，在 Transport 中把 Timeline 改为 BPM Sync。先设定 16 Beats（四小节，按 4/4 计算）。</li>
          <li>把全局 BPM 设为 120。四小节对应 8 秒；改成 100 BPM，则对应 9.6 秒。观察循环速度是否随 BPM 变化。</li>
          <li>在一个效果参数旁找到小齿轮／参数动画菜单，选择 BPM Sync；设置 4、8 或 16 Beats，并选择想要的 Envelope。观察效果参数的变化，不要与整段 Clip 的播放速度混淆。</li>
          <li>用 Tap 敲击音乐速度。在新的乐句第一拍使用 Resync；检查重复动作是否落在想要的拍点。</li>
          <li>让背景继续运行，关闭或降低节奏层，验证这两个时间体系能独立工作。</li>
        </ol>
        <p><a href="https://resolume.com/support/en/video" target="_blank" rel="noreferrer">Clip Transport ↗</a> · <a href="https://resolume.com/support/en/parameter-animation" target="_blank" rel="noreferrer">Parameter Animation ↗</a> · <a href="https://resolume.com/support/en/bpm" target="_blank" rel="noreferrer">BPM / Tap / Resync ↗</a></p>
      </details>
      <details>
        <summary><strong>B / 键盘、MIDI、推子与脚踏</strong><span>按习惯选择，不是必备采购单</span></summary>
        <ol>
          <li>先用 Arena 鼠标完成：触发 Clip、停止、控制 Layer Opacity，以及手动 Tap。</li>
          <li>打开 Keyboard Shortcuts 编辑，为常用触发与操作分配按键。把脚踏的四个按键（若可映射成键盘）设置为与常用键盘按键相同的功能。</li>
          <li>有 MIDI 控制器时进入 Shortcuts → Edit MIDI，选中 Layer 的 Opacity，再滑动硬件推子。换另一条 Layer 后重复。旋钮也可以映射到效果强度、速度或其他数值参数。</li>
          <li>先记住 3–5 个真正会用到的操作，不必把控制器上所有按钮都绑定满。完成后保存 Composition 与控制器映射。</li>
        </ol>
        <p><a href="https://resolume.com/support/en/keyboard-shortcuts" target="_blank" rel="noreferrer">Keyboard Shortcuts ↗</a> · <a href="https://resolume.com/support/en/midi-shortcuts" target="_blank" rel="noreferrer">MIDI Shortcuts ↗</a></p>
      </details>
      <details>
        <summary><strong>C / DJ 网络与外部时间源</strong><span>观察、同步、失联恢复分别测试</span></summary>
        <ol>
          <li>确认 DJ 播放器、网络与现场授权情况，检查能否在 Beat Link Trigger 中读取波形、播放位置、Tempo 与 Master 状态。</li>
          <li>明确这只是播放器信息观察，仍需另外验证 Arena 是否实际收到 BPM 和相位同步信息。</li>
          <li>如果使用 Ableton Link，确认所有参加的设备／软件确实支持 Link，并在同一网络中完成同步设置；不要把 Player Status 当成 Link 连接成功的证明。</li>
          <li>断开网络演练：回到手动输入 BPM、Tap、Resync，保证一个基础视觉层仍然稳定运行。</li>
        </ol>
        <p><a href="https://blt-guide.deepsymmetry.org/beat-link-trigger/8.0.0/Players.html" target="_blank" rel="noreferrer">Beat Link Player Status ↗</a> · <a href="https://resolume.com/support/en/link" target="_blank" rel="noreferrer">Ableton Link ↗</a></p>
      </details>
      <details>
        <summary><strong>D / Ableton Live：节拍感训练</strong><span>可选练习，非 Arena 使用前提</span></summary>
        <ol>
          <li>在 Session View 选择 4/4 与 100 BPM，准备持续环境、每拍脉冲和人工 One-shot 三个音轨。</li>
          <li>让环境声保持，脉冲跟随小节运行；人工 One-shot 不必每次打在同一拍。</li>
          <li>练习在四小节处进入，在下一段减少声音层。将 100 BPM 改为 110 BPM，比较自动重复与人工判断。</li>
          <li>若需要让支持 Link 的音乐软件与 Resolume 共同运行，再单独检查同步设置。</li>
        </ol>
      </details>
      <details>
        <summary><strong>E / TouchDesigner、OSC 和 90 秒测试</strong><span>可选扩展与演出前检查</span></summary>
        <ol>
          <li>若已有 TouchDesigner 或自制网页，使用 OSC 向 Resolume 的参数发送归一化数值。例如 <code>/composition/layers/1/video/opacity</code>，发送 0.25 即 25% 透明度。</li>
          <li>0–20 秒：保持背景，不操作节拍层；20–45 秒：逐步推入节奏；45–55 秒：人工短促触发；55–70 秒：撤除节奏层；70–90 秒：重新进入。</li>
          <li>录屏检查四件事：画面是否跟拍、是否知道下一个变化何时来、是否能快速撤除强光、失去外设后能否继续演出。</li>
        </ol>
        <p><a href="https://resolume.com/support/en/osc" target="_blank" rel="noreferrer">Resolume OSC ↗</a></p>
      </details>
    </section>
  )
}

export default function ReactorBpmFigures({ section = 'sidebar' }) {
  if (section === 'appendix') return <Appendix />
  return <Sidebar />
}
