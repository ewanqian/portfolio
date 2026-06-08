import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Footer from '../components/layout/Footer'

gsap.registerPlugin(useGSAP)

const scenes = [
  {
    id: 'drop-flow',
    title: 'Drop Flow / 滴流',
    role: '01 主线作品',
    kicker: '声音、点云、数字自然',
    summary: '从一滴水生成一座数字花园。声音、扫描数据、点云和屏幕光场共同组成持续展开的空间影像。',
    image: '/portfolio/assets/home/hero-dropflow-ufo-2025.jpeg',
    route: '/projects/drop-flow',
    accent: '#ded1b1',
    position: 'center center'
  },
  {
    id: 'timer',
    title: 'TIMER / 控时者',
    role: '02 方法前史',
    kicker: '时间粒子、音频曲线',
    summary: '把节拍、频段和时间压力转成环绕式粒子场。它是 Drop Flow 之前的重要方法前史。',
    image: '/portfolio/assets/case-optimized/timer-red-spatial-1400.webp',
    route: '/projects/timer',
    accent: '#ef6048',
    position: 'center center'
  },
  {
    id: 'kashiwa',
    title: '柏大辅《TITAN》',
    role: '03 音乐人合作',
    kicker: '现场音画、屏幕幻觉',
    summary: '围绕日本音乐人、作曲家 KASHIWA Daisuke / 柏大辅的现场语境，处理纱幕、雾气、线框结构和空间深度。',
    image: '/portfolio/assets/case-optimized/kashiwa-bolive-1800.webp',
    route: '/projects/kashiwa-titan',
    accent: '#cdd8d6',
    position: 'center center'
  },
  {
    id: 'yujiayun',
    title: '余佳运「45㎡」Opening',
    role: '04 演唱会制作',
    kicker: '演唱会视觉、PGM、地屏',
    summary: '开场段落、部分曲目的环绕屏幕和地屏内容进入真实巡演交付。页面按 opening 与曲目状态组织。',
    image: '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-46s-orange-arc.jpg',
    route: '/projects/yujiayun-45m2',
    accent: '#ed8b2f',
    position: 'center center'
  },
  {
    id: 'gaussian',
    title: 'Shibuya Sakura Stage',
    role: '05 空间扫描',
    kicker: '3DGS、城市空间、点云档案',
    summary: '围绕 Shibuya Sakura Stage、新宿温室和东京塔下花园展开的高斯空间采样。它把真实地点转成可浏览、可嵌入、可继续进入 XR 的空间样本。',
    image: '/portfolio/assets/gaussian-scenes/shibuya-sakura-stage.webp',
    route: '/gaussian-scenes',
    accent: '#f0a3df',
    position: 'center center'
  }
]

const navItems = [
  { label: '作品', to: '/works' },
  { label: '制作', to: '/production' },
  { label: '空间', to: '/gaussian-scenes' },
  { label: '写作', to: '/writing' },
  { label: '个人', to: '/profile' },
  { label: '归档', to: '/archive' }
]

function SceneMedia({ scene }) {
  if (scene.motion) {
    return (
      <video
        key={`${scene.id}-motion`}
        src={scene.motion}
        poster={scene.image}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{ objectPosition: scene.position }}
      />
    )
  }

  return (
    <img
      key={scene.id}
      src={scene.image}
      alt={scene.title}
      style={{ objectPosition: scene.position }}
    />
  )
}

function HomeV9() {
  const rootRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [attentionPaused, setAttentionPaused] = useState(false)
  const active = scenes[index]

  const progress = useMemo(() => `${((index + 1) / scenes.length) * 100}%`, [index])
  const autoGuiding = playing && !attentionPaused

  const jumpTo = useCallback((nextIndex) => {
    setIndex(nextIndex)
    setPlaying(false)
  }, [])

  const stepBy = useCallback((delta) => {
    setIndex((value) => (value + delta + scenes.length) % scenes.length)
    setPlaying(false)
  }, [])

  useGSAP(() => {
    gsap.from('.home-v9-stage, .home-v9-identity, .home-v9-rail, .home-v9-controller', {
      y: 16,
      duration: 0.72,
      ease: 'power3.out',
      stagger: 0.045
    })
  }, { scope: rootRef })

  useGSAP(() => {
    gsap.fromTo(
      '.home-v9-stage-media img, .home-v9-copy, .home-v9-index-card',
      { opacity: 0.82, y: 10, scale: 1.012 },
      { opacity: 1, y: 0, scale: 1, duration: 0.58, ease: 'power2.out', stagger: 0.025 }
    )
  }, { scope: rootRef, dependencies: [index], revertOnUpdate: true })

  useEffect(() => {
    if (!autoGuiding || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % scenes.length)
    }, 10500)

    return () => window.clearInterval(timer)
  }, [autoGuiding])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return

      const tagName = event.target?.tagName
      if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') return

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        stepBy(1)
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        stepBy(-1)
      }

      if (event.key === ' ') {
        event.preventDefault()
        setPlaying((value) => !value)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [stepBy])

  return (
    <>
      <main className="home-v9" ref={rootRef} style={{ '--accent': active.accent }}>
        {active.motion ? (
          <video
            className="home-v9-backdrop"
            src={active.motion}
            poster={active.image}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        ) : (
          <img className="home-v9-backdrop" src={active.image} alt="" aria-hidden="true" />
        )}

        <Link className="home-v9-identity" to="/profile" aria-label="钱誉文个人页面">
          <strong>钱誉文 / Ewan</strong>
          <span>现场视觉与空间影像</span>
        </Link>

        <nav className="home-v9-rail" aria-label="主要页面">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>{item.label}</Link>
          ))}
        </nav>

        <section
          className="home-v9-stage"
          aria-label="钱誉文作品导览"
          onPointerEnter={() => setAttentionPaused(true)}
          onPointerLeave={() => setAttentionPaused(false)}
          onFocus={() => setAttentionPaused(true)}
          onBlur={() => setAttentionPaused(false)}
        >
          <figure className="home-v9-stage-media">
            <SceneMedia scene={active} />
          </figure>

          <div className="home-v9-copy">
            <span>{active.role}</span>
            <em>{active.kicker}</em>
            <h1>{active.title}</h1>
            <p>{active.summary}</p>
            <Link to={active.route}>观看项目</Link>
          </div>

          <div className="home-v9-index-card" aria-hidden="true">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <i />
          </div>
        </section>

        <section
          className="home-v9-controller"
          aria-label="自动观看控制"
          data-paused={attentionPaused ? 'true' : 'false'}
          onPointerEnter={() => setAttentionPaused(true)}
          onPointerLeave={() => setAttentionPaused(false)}
          onFocus={() => setAttentionPaused(true)}
          onBlur={() => setAttentionPaused(false)}
        >
          <div className="home-v9-control-head">
            <span>{attentionPaused ? '浏览中' : '导览'}</span>
            <button type="button" onClick={() => stepBy(-1)} aria-label="上一项">‹</button>
            <button type="button" onClick={() => setPlaying((value) => !value)}>
              {autoGuiding ? 'Ⅱ' : '▶'}
            </button>
            <button type="button" onClick={() => stepBy(1)} aria-label="下一项">›</button>
          </div>

          <div className="home-v9-progress" aria-hidden="true">
            <i style={{ width: progress }} />
          </div>

          <div className="home-v9-path" aria-live="polite">
            <strong>{active.role}</strong>
            <span>{active.kicker}</span>
          </div>

          <div className="home-v9-strip">
            {scenes.map((scene, sceneIndex) => (
              <button
                key={scene.id}
                type="button"
                className={sceneIndex === index ? 'active' : ''}
                onClick={() => jumpTo(sceneIndex)}
                aria-label={`查看 ${scene.title}`}
              >
                <img src={scene.image} alt="" loading="lazy" />
                <span>{String(sceneIndex + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default HomeV9
