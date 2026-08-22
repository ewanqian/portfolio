import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import MarkdownReader from '../components/content/MarkdownReader.jsx'
import writings from '../data/generated/writings'
import '../styles/writing-detail.css'

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function ControlLoopDiagram() {
  return (
    <section className="control-model-diagram" aria-label="Performance Control Model diagram">
      <div className="control-model-node strong">人的意图<br /><span>我要把演出带到哪里？</span></div>
      <div className="control-model-arrow">↓</div>
      <div className="control-model-node">控制器<br /><span>Human + Agent + Safety Rules</span></div>
      <div className="control-model-arrow">↓</div>
      <div className="control-model-node state">State<br /><span>Energy · Tension · Density · Time</span></div>
      <div className="control-model-arrow">↓</div>
      <div className="control-model-media-grid">
        <div>Music<br /><span>时间 / 能量</span></div>
        <div>Visual<br /><span>形态 / 记忆</span></div>
        <div>Light<br /><span>空间 / 注意力</span></div>
      </div>
      <div className="control-model-arrow">↓</div>
      <div className="control-model-node feedback">Feedback<br /><span>听见 / 看见 / 再判断</span></div>
      <div className="control-model-loop-note">↺ 回到下一次人的判断</div>
    </section>
  )
}

const STATE_OUTPUTS = {
  OPEN: { label: '稀疏进入', note: '同一个输入只留下一个低密度 pulse，给后面留空间。', level: 24 },
  BUILD: { label: '推进 / 细分', note: '同一个输入增加 subdivision 和 tension，但暂时不 release。', level: 55 },
  PEAK: { label: '强 Accent', note: '同一个输入在高能状态成为一次明确的身体性冲击。', level: 92 },
  BREAK: { label: '长 Tail', note: '同一个输入不继续堆密度，而是留下残响并打开空间。', level: 35 }
}

function TriggerStateDemo() {
  const [mode, setMode] = useState('state')
  const [state, setState] = useState('OPEN')
  const [hits, setHits] = useState(0)
  const output = mode === 'trigger'
    ? { label: '永远同一个 Trigger', note: '无论什么时候按，结果都一样。第一次很直接，但很快被看穿。', level: 48 }
    : STATE_OUTPUTS[state]

  return (
    <section className="reader-lab" aria-labelledby="lab-trigger-title">
      <div className="reader-lab-head">
        <div>
          <div className="reader-lab-kicker">PLAY 01</div>
          <h2 id="lab-trigger-title">Trigger vs State</h2>
          <p>按钮没有变。只比较“结果只由输入决定”和“结果同时由当前 State 决定”。</p>
        </div>
        <div className="reader-lab-toggle" role="group" aria-label="Trigger or state mode">
          <button type="button" className={mode === 'trigger' ? 'active' : ''} onClick={() => setMode('trigger')}>Trigger</button>
          <button type="button" className={mode === 'state' ? 'active' : ''} onClick={() => setMode('state')}>State</button>
        </div>
      </div>

      <div className="reader-state-buttons" aria-label="Choose performance state">
        {Object.keys(STATE_OUTPUTS).map((item) => (
          <button type="button" key={item} disabled={mode === 'trigger'} className={state === item && mode === 'state' ? 'active' : ''} onClick={() => setState(item)}>{item}</button>
        ))}
      </div>

      <div className="reader-demo-stage">
        <div className="reader-demo-meter"><span style={{ width: `${output.level}%` }} /></div>
        <strong>{output.label}</strong>
        <p>{output.note}</p>
        <div className="reader-demo-count">触发次数 {hits}</div>
      </div>
      <button type="button" className="reader-primary-action" onClick={() => setHits((value) => value + 1)}>按同一个输入</button>
    </section>
  )
}

const AUTO_PHASES = [
  { name: 'OPEN', energy: 22 },
  { name: 'BUILD', energy: 52 },
  { name: 'PEAK', energy: 92 },
  { name: 'BREAK', energy: 32 }
]

function ControlledLoopDemo() {
  const [mode, setMode] = useState('controlled')
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [energy, setEnergy] = useState(AUTO_PHASES[0].energy)
  const [hold, setHold] = useState(false)
  const [message, setMessage] = useState('系统在运行；你只处理少量高价值判断。')

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (mode === 'open') {
        setPhaseIndex((value) => (value + 1) % AUTO_PHASES.length)
        return
      }
      if (!hold) {
        setEnergy((value) => clamp(value + (value < 70 ? 2 : -1), 12, 88))
      }
    }, 900)
    return () => window.clearInterval(timer)
  }, [mode, hold])

  useEffect(() => {
    if (mode === 'open') setEnergy(AUTO_PHASES[phaseIndex].energy)
  }, [mode, phaseIndex])

  const currentName = mode === 'open' ? AUTO_PHASES[phaseIndex].name : hold ? 'HOLD' : energy > 72 ? 'DRIVE' : energy < 30 ? 'OPEN' : 'BUILD'

  function controlledAction(type) {
    if (mode !== 'controlled') return
    if (type === 'HOLD') {
      setHold((value) => !value)
      setMessage(hold ? '解除 HOLD，系统可以继续发展。' : 'HOLD：暂时不进入下一次释放。')
      return
    }
    setHold(false)
    if (type === 'ADD') {
      setEnergy((value) => clamp(value + 14, 0, 100))
      setMessage('ADD：增加一层，但系统仍限制最大能量。')
    }
    if (type === 'REMOVE') {
      setEnergy((value) => clamp(value - 18, 0, 100))
      setMessage('REMOVE：主动做减法，不需要等系统自己结束。')
    }
    if (type === 'RELEASE') {
      setEnergy(28)
      setMessage('RELEASE：把积累的 tension 释放，并重新打开空间。')
    }
  }

  return (
    <section className="reader-lab" aria-labelledby="lab-loop-title">
      <div className="reader-lab-head">
        <div>
          <div className="reader-lab-kicker">PLAY 02</div>
          <h2 id="lab-loop-title">Open Loop vs Controlled Loop</h2>
          <p>固定 Timeline 很稳定；完全手动又容易乱。这里试一下“系统自己连续 + 人只做结构判断”。</p>
        </div>
        <div className="reader-lab-toggle" role="group" aria-label="Loop mode">
          <button type="button" className={mode === 'open' ? 'active' : ''} onClick={() => { setMode('open'); setHold(false); setMessage('Open Loop：系统按预先时间轴自动运行。') }}>Open Loop</button>
          <button type="button" className={mode === 'controlled' ? 'active' : ''} onClick={() => { setMode('controlled'); setEnergy(36); setMessage('Controlled Loop：系统保持连续，人接管少量关键判断。') }}>Controlled</button>
        </div>
      </div>

      <div className="reader-demo-stage">
        <div className="reader-demo-status"><span>{currentName}</span><span>Energy {Math.round(energy)}</span></div>
        <div className="reader-demo-meter large"><span style={{ width: `${energy}%` }} /></div>
        <p>{message}</p>
      </div>

      <div className="reader-action-grid">
        {['HOLD', 'ADD', 'REMOVE', 'RELEASE'].map((action) => (
          <button type="button" key={action} disabled={mode !== 'controlled'} className={action === 'HOLD' && hold ? 'active' : ''} onClick={() => controlledAction(action)}>{action}</button>
        ))}
      </div>
    </section>
  )
}

function StabilityDemo() {
  const [mode, setMode] = useState('stable')
  const [density, setDensity] = useState(18)
  const [events, setEvents] = useState(2)
  const [note, setNote] = useState('Stable 模式有 density budget、decay 和上限。')

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDensity((value) => Math.max(8, value - (mode === 'stable' ? 5 : 1)))
      setEvents((value) => Math.max(0, value - (mode === 'stable' ? 1 : 0)))
    }, 850)
    return () => window.clearInterval(timer)
  }, [mode])

  function fire() {
    if (mode === 'random') {
      setDensity((value) => clamp(value + 18 + Math.random() * 15, 0, 140))
      setEvents((value) => value + 3)
      setNote('Random：每次都继续叠加；没有人负责把系统带回来。')
      return
    }
    setDensity((value) => clamp(value + 14, 0, 82))
    setEvents((value) => Math.min(8, value + 2))
    setNote('Stable：仍然可以变满，但有上限、自动衰减和最大并发事件。')
  }

  const overload = density > 95 || events > 10

  return (
    <section className="reader-lab" aria-labelledby="lab-stability-title">
      <div className="reader-lab-head">
        <div>
          <div className="reader-lab-kicker">PLAY 03</div>
          <h2 id="lab-stability-title">Random vs Stable</h2>
          <p>连续触发几次。看“自由生成”什么时候变成无法恢复的过载。</p>
        </div>
        <div className="reader-lab-toggle" role="group" aria-label="Stability mode">
          <button type="button" className={mode === 'random' ? 'active' : ''} onClick={() => { setMode('random'); setDensity(18); setEvents(2) }}>Random</button>
          <button type="button" className={mode === 'stable' ? 'active' : ''} onClick={() => { setMode('stable'); setDensity(18); setEvents(2) }}>Stable</button>
        </div>
      </div>

      <div className={`reader-demo-stage ${overload ? 'overload' : ''}`}>
        <div className="reader-demo-status"><span>{overload ? 'OVERLOAD' : 'RUNNING'}</span><span>Events {events}</span></div>
        <div className="reader-demo-meter large"><span style={{ width: `${Math.min(100, density)}%` }} /></div>
        <p>{note}</p>
      </div>
      <div className="reader-action-grid two">
        <button type="button" onClick={fire}>ADD EVENT</button>
        <button type="button" onClick={() => { setDensity(8); setEvents(0); setNote('PANIC / RESET：系统必须永远有一个可靠的回到安全状态的方法。') }}>PANIC / RESET</button>
      </div>
    </section>
  )
}

function MaturityPanel() {
  return (
    <section className="reader-maturity" aria-labelledby="maturity-title">
      <div className="reader-lab-kicker">KNOWLEDGE STATUS</div>
      <h2 id="maturity-title">哪些已经能引用，哪些还不能</h2>
      <div className="reader-maturity-grid">
        <div>
          <strong>STABLE</strong>
          <p>State + Feedback、Hybrid Control、机器负责 timing / safety、人的结构判断、Performance first、正式 novice / audience QA。</p>
        </div>
        <div>
          <strong>PROVISIONAL</strong>
          <p>最终 State vector、固定 Section 分类、通用 Score schema、AI Critic、灯光是否进入普通 Starter。</p>
        </div>
        <div>
          <strong>TO PRODUCE</strong>
          <p>8.29 Golden Mini Live System、Reference Set 转录、Starter 00–03、真实录屏和现场测试。</p>
        </div>
      </div>
    </section>
  )
}

function PerformanceControlExtras() {
  return (
    <>
      <section className="reader-explainer">
        <div className="reader-lab-kicker">FORMULA → PLAIN LANGUAGE</div>
        <h2>先不要算公式，先看它在现场里说什么</h2>
        <div className="reader-formula">x(t+1) = F(x(t), u(t), d(t))</div>
        <p>翻译：<strong>下一刻的系统</strong>，由<strong>当前状态</strong>、<strong>人的操作</strong>和<strong>现场扰动</strong>经过规则共同决定。</p>
        <ControlLoopDiagram />
      </section>
      <TriggerStateDemo />
      <ControlledLoopDemo />
      <StabilityDemo />
      <MaturityPanel />
    </>
  )
}

function WritingDetail() {
  const { slug } = useParams()
  const writing = useMemo(() => writings.find((item) => (item.slug || item.id) === slug), [slug])
  const buildMarkdown = writing?.articleMarkdown || ''
  const [runtimeMarkdown, setRuntimeMarkdown] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setRuntimeMarkdown('')
    if (!writing?.articlePath || buildMarkdown) return undefined
    const controller = new AbortController()
    const rawUrl = `https://raw.githubusercontent.com/ewanqian/portfolio/main/${writing.articlePath}`
    fetch(rawUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Writing fetch failed: ${response.status}`)
        return response.text()
      })
      .then(setRuntimeMarkdown)
      .catch((error) => {
        if (error.name !== 'AbortError') console.warn(error)
      })
    return () => controller.abort()
  }, [writing?.articlePath, buildMarkdown])

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight
      setProgress(height > 0 ? clamp(window.scrollY / height, 0, 1) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!writing || !writing.articlePath) return <Navigate to="/writing" replace />

  const markdown = buildMarkdown || runtimeMarkdown
  const special = writing.id === 'performance-control-model'

  return (
    <>
      <Header />
      <div className="writing-progress" aria-hidden="true"><span style={{ width: `${progress * 100}%` }} /></div>
      <main className="writing-detail-page">
        <section className="section writing-detail-hero">
          <div className="container writing-detail-hero-grid">
            <div>
              <Link className="eyebrow workshop-backlink" to="/writing">← Writing</Link>
              <div className="writing-detail-status">{writing.status === 'published' ? 'Published' : 'Working Draft'} · {writing.date}</div>
              <h1>{writing.title}</h1>
              <p className="writing-detail-lead">{writing.summary}</p>
            </div>
            <aside className="writing-detail-tools">
              <strong>Reading mode</strong>
              {special ? (
                <div className="writing-reading-buttons">
                  <button type="button" onClick={() => scrollToSection('一分钟版本')}>1 MIN</button>
                  <button type="button" onClick={() => scrollToSection('十分钟版本')}>10 MIN</button>
                  <button type="button" onClick={() => scrollToSection('深入阅读')}>DEEP</button>
                </div>
              ) : null}
              {writing.githubUrl ? <a href={writing.githubUrl} target="_blank" rel="noreferrer">Canonical Markdown ↗</a> : null}
              <div className="writing-reader-note">正文由 GitHub Markdown 维护；网页负责阅读、图解和交互。</div>
            </aside>
          </div>
        </section>

        {special ? (
          <section className="section writing-special-labs">
            <div className="container"><PerformanceControlExtras /></div>
          </section>
        ) : null}

        <section className="section">
          <div className="container writing-reader-layout">
            <div>
              {markdown ? <MarkdownReader markdown={markdown} sourcePath={writing.articlePath} /> : <div className="markdown-reader"><h2>Loading canonical text</h2><p>如果 GitHub Raw 暂时不可访问，可以打开右侧 canonical Markdown。</p></div>}
            </div>
            <aside className="writing-reader-aside">
              <strong>Reader notes</strong>
              <p>公式不是阅读门槛。先理解状态、反馈、稳定与控制，再决定是否继续读数学表达。</p>
              {special ? <><a href="/workshops/personal-av-instrument">Personal A/V Instrument ↗</a><a href="https://github.com/ewanqian/portfolio/issues/59" target="_blank" rel="noreferrer">Current R&D Issue #59 ↗</a></> : null}
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default WritingDetail
