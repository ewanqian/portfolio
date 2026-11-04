import { useState } from 'react'

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

function Sidebar() {
  return (
    <div className="bpm-visual-sidebar">
      <CaptionedPhoto src="reactor-2026-06.webp" title="REACTOR / SPACE" caption="舞池、观众、激光与远端舞台。" className="bpm-sidebar-lead" />
      <div className="bpm-sidebar-pair">
        <CaptionedPhoto src="reactor-2026-08.webp" title="STAGE / STRUCTURE" caption="机械构成与舞台纵深。" />
        <CaptionedPhoto src="reactor-beatlink-waveform-square.jpg" title="OPERATOR / BEAT LINK" caption="作者拍摄的播放器波形界面。" />
      </div>
      <TimeDiagram />
      <LayerMixer />
      <RouteDiagram />
      <p className="bpm-sidebar-archive"><a href={ARCHIVE} target="_blank" rel="noreferrer">查看 REACTOR 摄影与操作图像档案 ↗</a></p>
    </div>
  )
}

function Appendix() {
  return (
    <section className="bpm-appendix" id="bpm-appendix" aria-label="BPM System SOP 附录">
      <div className="bpm-appendix-top"><span>APPENDIX / PLAYBOOK</span><h2>搭建与排练</h2><p>正文解释方法；以下步骤用于直接复现。按需要展开对应的软件流程。</p></div>
      <details>
        <summary><strong>A / Resolume 三轨与 MIDI 推子</strong><span>10 分钟基础搭建</span></summary>
        <ol>
          <li>新建 Composition；依次放入三条独立的 Layer：BASE、CLOCK、HIT。L1 放连续视频，L2 放四拍循环，L3 放短促事件。</li>
          <li>检查每条 Layer 都有独立的 Opacity；用鼠标把 L2、L3 从 0 推到 100%，确认叠加关系。</li>
          <li>接入 USB MIDI 控制器，在 Arena 的 MIDI Shortcuts 编辑模式中选择 L1 Opacity，移动第一个硬件推子；对 L2、L3 重复。推荐对 Layer 使用按位置绑定。</li>
          <li>L2 的 Clip Transport 设为 BPM Sync，并将四小节循环设为 16 beats；确认素材头尾衔接与小节起点。</li>
          <li>为 L3 的短促 Clip 使用 Piano Trigger 或相应即时触发模式；测试按下、松开和其他 Layer 的退出状态。</li>
          <li>保存一份 BASE、CLOCK、HIT、BLACK 的可靠初始工程，并记录各推子的映射。</li>
        </ol>
        <p><a href="https://resolume.com/support/en/midi-shortcuts" target="_blank" rel="noreferrer">Resolume MIDI / Shortcut 官方手册 ↗</a></p>
      </details>
      <details>
        <summary><strong>B / Ableton Live 时间训练</strong><span>附录练习，不是现场必需软件</span></summary>
        <ol>
          <li>新建 Session View，设定 4/4、100 BPM。此时一拍 0.6 秒，四小节为 9.6 秒。</li>
          <li>建立 Atmosphere、Pulse、Accent 三个 Track：分别播放持续音、每拍脉冲与人工 One-shot。</li>
          <li>尝试保持 Atmosphere，依次播放 Pulse、手动 Accent，再停止 Pulse。观察“叠加／撤除”与音乐结构的关系。</li>
          <li>把 100 BPM 调到 110 BPM，比较持续层、节拍层与人工重音的不同变化。若需要对接 Arena，再在双方启用 Ableton Link 并测试同步。</li>
        </ol>
        <p><a href="https://resolume.com/support/en/link" target="_blank" rel="noreferrer">Resolume Ableton Link 官方说明 ↗</a></p>
      </details>
      <details>
        <summary><strong>C / TouchDesigner、OSC 与外部系统</strong><span>自定义输入</span></summary>
        <ol>
          <li>在 Arena Preferences 的 OSC 页面启用 OSC；确认接收端口与发送设备在可访问的网络内。</li>
          <li>在 TouchDesigner 或网页桥接系统里输出范围 0–1 的参数。以 \`/composition/layers/1/video/opacity\` 为例发送 0.25，第一层透明度即为 25%。</li>
          <li>将不同的手势、脚踏或传感器映射到 Layer Opacity、Clip Trigger 或 Tap BPM；每种输入都应有停止与恢复方法。</li>
          <li>故意断开外部连接，检查手动控制、BASE 与安全黑场是否仍然可用。</li>
        </ol>
        <p><a href="https://resolume.com/support/en/osc" target="_blank" rel="noreferrer">Resolume OSC 地址与设置 ↗</a></p>
      </details>
      <details>
        <summary><strong>D / 一段 90 秒的演出测试</strong><span>记录结果与故障恢复</span></summary>
        <ol>
          <li>00:00–00:20：OPEN，只开 BASE。</li>
          <li>00:20–00:55：BUILD，把 CLOCK 从 0 缓慢推到约 50%；中途留一段 HOLD，不增加动作。</li>
          <li>00:55–01:05：PEAK，触发少量 HIT，避免持续叠满。</li>
          <li>01:05–01:20：BREAK，把 CLOCK 和 HIT 拉回 0，留下 BASE 或黑场。</li>
          <li>01:20–01:30：RETURN，重新进入低密度循环；录屏检查时间、图层、输入与输出是否符合预期。</li>
        </ol>
        <p>排练时还要验证素材格式、机器负载、Mapping、输出分辨率与黑场恢复；脚踏只是 Tap 与 Trigger 的可选扩展。</p>
      </details>
    </section>
  )
}

export default function ReactorBpmFigures({ section = 'sidebar' }) {
  if (section === 'appendix') return <Appendix />
  return <Sidebar />
}
