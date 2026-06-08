import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Footer from '../components/layout/Footer'

gsap.registerPlugin(useGSAP)

const featuredWorks = [
  {
    id: 'drop-flow',
    number: '01',
    title: 'Drop Flow / 滴流',
    shortTitle: '滴流',
    type: '空间影像 / 数字自然',
    line: '声音、点云、扫描数据与程序化图像共同生成的空间影像作品。',
    image: '/portfolio/assets/home/featured-dropflow-hangzhou-biennale-scene.jpg',
    route: '/projects/drop-flow',
    accent: '#d8c6a0'
  },
  {
    id: 'timer',
    number: '02',
    title: 'TIMER / 控时者',
    shortTitle: '控时者',
    type: '时间粒子 / 音频曲线',
    line: '把节拍、频段与粒子运动组织成环绕式时间结构。',
    image: '/portfolio/assets/case-optimized/timer-red-spatial-1400.webp',
    route: '/projects/timer',
    accent: '#ef6048'
  },
  {
    id: 'kashiwa',
    number: '03',
    title: '柏大辅《TITAN》',
    shortTitle: '柏大辅',
    type: '现场视听 / BO LIVE',
    line: '围绕日本音乐人、作曲家 KASHIWA Daisuke / 柏大辅的现场音乐语境展开视觉系统。',
    image: '/portfolio/assets/case-optimized/kashiwa-bolive-1800.webp',
    route: '/projects/kashiwa-titan',
    accent: '#cdd8d6'
  },
  {
    id: 'yujiayun',
    number: '04',
    title: '余佳运「45㎡」Opening',
    shortTitle: '45㎡ Opening',
    type: '演唱会视觉 / 宁波',
    line: '开场段落、PGM 环绕屏幕与地屏内容进入真实巡演交付。',
    image: '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-46s-orange-arc.jpg',
    route: '/projects/yujiayun-45m2',
    accent: '#ed8b2f'
  }
]

const entryPoints = [
  { title: '画廊', note: '艺术作品', to: '/works' },
  { title: '制作', note: '现场交付', to: '/production' },
  { title: '空间', note: '高斯扫描', to: '/gaussian-scenes' },
  { title: '归档', note: '完整时间线', to: '/archive' }
]

function HomeV7() {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [guided, setGuided] = useState(true)
  const active = featuredWorks[activeIndex]

  const nextLabel = useMemo(
    () => featuredWorks[(activeIndex + 1) % featuredWorks.length].shortTitle,
    [activeIndex]
  )

  useGSAP(() => {
    gsap.from('.home-v7-shell > *', {
      opacity: 0.92,
      y: 10,
      duration: 0.58,
      ease: 'power3.out',
      stagger: 0.055
    })
  }, { scope: rootRef })

  useGSAP(() => {
    gsap.fromTo(
      '.home-v7-artwork, .home-v7-copy, .home-v7-progress-fill',
      { opacity: 0.9, scale: 1.008, y: 6 },
      { opacity: 1, scale: 1, y: 0, duration: 0.56, ease: 'power2.out' }
    )
  }, { scope: rootRef, dependencies: [activeIndex], revertOnUpdate: true })

  useGSAP((context, contextSafe) => {
    const stage = stageRef.current
    if (!stage || window.matchMedia('(pointer: coarse)').matches) return undefined

    const mediaX = gsap.quickTo('.home-v7-media', 'x', { duration: 0.55, ease: 'power3.out' })
    const mediaY = gsap.quickTo('.home-v7-media', 'y', { duration: 0.55, ease: 'power3.out' })
    const copyX = gsap.quickTo('.home-v7-copy', 'x', { duration: 0.45, ease: 'power3.out' })
    const copyY = gsap.quickTo('.home-v7-copy', 'y', { duration: 0.45, ease: 'power3.out' })

    const onMove = contextSafe((event) => {
      const rect = stage.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      mediaX(x * -10)
      mediaY(y * -8)
      copyX(x * 8)
      copyY(y * 6)
    })

    const onLeave = contextSafe(() => {
      mediaX(0)
      mediaY(0)
      copyX(0)
      copyY(0)
    })

    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerleave', onLeave)

    return () => {
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerleave', onLeave)
    }
  }, { scope: rootRef })

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!guided || reduced) return undefined

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % featuredWorks.length)
    }, 6200)

    return () => window.clearInterval(timer)
  }, [guided])

  const setScene = (index) => {
    setActiveIndex(index)
    setGuided(false)
  }

  return (
    <>
      <main className="home-v7" ref={rootRef} style={{ '--accent': active.accent }}>
        <section className="home-v7-shell" aria-label="钱誉文作品导览">
          <aside className="home-v7-side">
            <Link className="home-v7-brand" to="/profile">
              <strong>钱誉文 / Ewan Qian</strong>
              <span>现场视觉与空间影像</span>
            </Link>

            <nav className="home-v7-nav" aria-label="主要页面">
              {entryPoints.map((entry) => (
                <Link key={entry.title} to={entry.to}>
                  <strong>{entry.title}</strong>
                  <span>{entry.note}</span>
                </Link>
              ))}
            </nav>
          </aside>

          <article className="home-v7-stage" ref={stageRef} aria-live="polite">
            <div className="home-v7-media">
              <img
                className="home-v7-artwork"
                key={active.id}
                src={active.image}
                alt={active.title}
              />
              <div className="home-v7-media-shade" />
            </div>

            <div className="home-v7-copy">
              <span>{active.type}</span>
              <h1>{active.title}</h1>
              <p>{active.line}</p>
            </div>

            <div className="home-v7-actions">
              <Link className="home-v7-primary" to={active.route}>进入项目</Link>
              <Link className="home-v7-secondary" to="/archive">完整归档</Link>
            </div>

            <div className="home-v7-progress" aria-hidden="true">
              <span>{active.number}</span>
              <i>
                <b
                  className="home-v7-progress-fill"
                  style={{ transform: `scaleX(${(activeIndex + 1) / featuredWorks.length})` }}
                />
              </i>
              <span>{nextLabel}</span>
            </div>
          </article>

          <aside className="home-v7-sequence" aria-label="主线项目">
            <div className="home-v7-sequence-head">
              <span>主线</span>
              <button type="button" onClick={() => setGuided((value) => !value)}>
                {guided ? '自动导览' : '继续'}
              </button>
            </div>
            {featuredWorks.map((work, index) => (
              <button
                key={work.id}
                type="button"
                className={index === activeIndex ? 'active' : ''}
                onClick={() => setScene(index)}
              >
                <span>{work.number}</span>
                <strong>{work.shortTitle}</strong>
              </button>
            ))}
          </aside>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default HomeV7
