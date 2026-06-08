import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Footer from '../components/layout/Footer'

gsap.registerPlugin(useGSAP)

const scenes = [
  {
    id: 'drop-flow',
    title: 'Drop Flow / 滴流',
    kicker: '空间影像 / 数字自然',
    summary: '声音、点云、扫描数据与程序化视觉系统共同生成的空间影像作品。',
    image: '/portfolio/assets/home/featured-dropflow-hangzhou-biennale-scene.jpg',
    position: 'center center',
    route: '/portfolio/#/projects/drop-flow'
  },
  {
    id: 'timer',
    title: 'TIMER / 控时者',
    kicker: '时间粒子 / 音频曲线',
    summary: '把节拍、频段与粒子运动组织成环绕式时间结构。',
    image: '/portfolio/assets/case-optimized/timer-red-spatial-1400.webp',
    position: 'center center',
    route: '/portfolio/#/projects/timer'
  },
  {
    id: 'kashiwa',
    title: '柏大辅《TITAN》',
    kicker: '现场视听 / BO LIVE',
    summary: '围绕日本音乐人、作曲家柏大辅 / KASHIWA Daisuke 的现场音乐展开视觉系统。',
    image: '/portfolio/assets/case-optimized/kashiwa-bolive-1800.webp',
    position: 'center center',
    route: '/portfolio/#/projects/kashiwa-titan'
  }
]

const channels = [
  { label: '作品', to: '/works', note: '艺术作品与现场音画' },
  { label: '制作', to: '/production', note: '演出、屏幕与交付' },
  { label: '空间', to: '/gaussian-scenes', note: '高斯扫描与空间样本' },
  { label: '写作', to: '/profile', note: '个人叙事与方法' },
  { label: '归档', to: '/archive', note: '时间线与完整记录' }
]

const capabilityLine = [
  '现场视觉',
  '空间屏幕',
  '开场段落',
  '点云场景',
  '预演测试',
  '多版本交付'
]

function HomeV5() {
  const rootRef = useRef(null)
  const timerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isGuided, setIsGuided] = useState(true)
  const activeScene = scenes[activeIndex]

  const progressLabel = useMemo(
    () => `${String(activeIndex + 1).padStart(2, '0')} / ${String(scenes.length).padStart(2, '0')}`,
    [activeIndex]
  )

  useGSAP(() => {
    gsap.from('.home-v5-brand, .home-v5-channel, .home-v5-stage-window, .home-v5-sequence', {
      y: 18,
      opacity: 0,
      duration: 0.72,
      ease: 'power3.out',
      stagger: 0.08
    })
  }, { scope: rootRef })

  useGSAP(() => {
    gsap.fromTo(
      '.home-v5-media img, .home-v5-scene-copy',
      { autoAlpha: 0.28, scale: 1.018, y: 8 },
      { autoAlpha: 1, scale: 1, y: 0, duration: 0.68, ease: 'power2.out' }
    )
  }, { scope: rootRef, dependencies: [activeIndex], revertOnUpdate: true })

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced || !isGuided) {
      return undefined
    }

    timerRef.current = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % scenes.length)
    }, 6200)

    return () => window.clearInterval(timerRef.current)
  }, [isGuided])

  const selectScene = (index) => {
    setActiveIndex(index)
    setIsGuided(false)
  }

  return (
    <>
      <main className="home-v5" ref={rootRef}>
        <section className="home-v5-screen" aria-label="钱誉文作品导览">
          <div className="home-v5-brand">
            <span>钱誉文 / Ewan Qian</span>
            <strong>现场视觉与空间影像</strong>
          </div>

          <nav className="home-v5-channel" aria-label="站点导航">
            {channels.map((item) => (
              <Link key={item.label} to={item.to}>
                <strong>{item.label}</strong>
                <span>{item.note}</span>
              </Link>
            ))}
          </nav>

          <article className="home-v5-stage-window" aria-live="polite">
            <div className="home-v5-media">
              <img
                key={activeScene.id}
                src={activeScene.image}
                alt={activeScene.title}
                style={{ objectPosition: activeScene.position }}
              />
            </div>

            <div className="home-v5-scene-copy">
              <div>
                <span>{activeScene.kicker}</span>
                <h1>{activeScene.title}</h1>
              </div>
              <p>{activeScene.summary}</p>
              <div className="home-v5-actions">
                <a className="home-v5-action primary" href={activeScene.route}>打开项目</a>
                <Link className="home-v5-action" to="/works">浏览作品</Link>
              </div>
            </div>

            <div className="home-v5-progress">
              <span>{progressLabel}</span>
              <i style={{ transform: `scaleX(${(activeIndex + 1) / scenes.length})` }} />
            </div>

            <button
              className={isGuided ? 'home-v5-guide active' : 'home-v5-guide'}
              type="button"
              onClick={() => setIsGuided((value) => !value)}
            >
              {isGuided ? '导览中' : '继续导览'}
            </button>
          </article>

          <aside className="home-v5-sequence" aria-label="主线作品">
            {scenes.map((scene, index) => (
              <button
                key={scene.id}
                type="button"
                className={index === activeIndex ? 'active' : ''}
                onClick={() => selectScene(index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{scene.title}</strong>
                <small>{scene.kicker}</small>
              </button>
            ))}
          </aside>

          <div className="home-v5-capability" aria-label="能力线索">
            {capabilityLine.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default HomeV5
