import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Footer from '../components/layout/Footer'

gsap.registerPlugin(useGSAP)

const focusWorks = [
  {
    id: 'drop-flow',
    title: 'Drop Flow / 滴流',
    label: '主线作品',
    line: '声音、点云、数字自然与空间屏幕共同展开。',
    image: '/portfolio/assets/home/featured-dropflow-hangzhou-biennale-scene.jpg',
    position: 'center center',
    href: '/portfolio/#/projects/drop-flow'
  },
  {
    id: 'timer',
    title: 'TIMER / 控时者',
    label: '时间结构',
    line: '把节拍、音频曲线和粒子场组织成环绕式时间影像。',
    image: '/portfolio/assets/case-optimized/timer-main-1800.webp',
    position: 'center center',
    href: '/portfolio/#/projects/timer'
  },
  {
    id: 'kashiwa',
    title: '柏大辅《TITAN》',
    label: '现场视听',
    line: '为音乐现场建立纱幕、屏幕幻觉与声画结构。',
    image: '/portfolio/assets/raw-picks/titan-bolive-clean-16x9.jpg',
    position: 'center center',
    href: '/portfolio/#/projects/kashiwa-titan'
  }
]

const workIndex = [
  {
    title: 'Drop Flow / 滴流',
    type: '空间影像 / 数字自然',
    text: '从水滴、花园与点云生成持续发展的空间场景。',
    image: '/portfolio/assets/home/featured-dropflow-hangzhou-biennale-scene.jpg',
    href: '/portfolio/#/projects/drop-flow'
  },
  {
    title: 'TIMER / 控时者',
    type: '时间粒子 / 音频曲线',
    text: '早期关键作品线，建立声音、粒子与环绕屏幕的关系。',
    image: '/portfolio/assets/case-optimized/timer-main-1800.webp',
    href: '/portfolio/#/projects/timer'
  },
  {
    title: '柏大辅《TITAN》',
    type: '现场视听 / BO LIVE',
    text: '日本音乐人 KASHIWA Daisuke / 柏大辅合作线。',
    image: '/portfolio/assets/raw-picks/titan-bolive-clean-16x9.jpg',
    href: '/portfolio/#/projects/kashiwa-titan'
  },
  {
    title: '余佳运 45㎡',
    type: '演唱会视觉 / Opening',
    text: 'opening、PGM、地屏与曲目视觉制作记录。',
    image: '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-46s-orange-arc.jpg',
    href: '/portfolio/#/projects/yujiayun-45m2'
  },
  {
    title: 'Rain / SINGLAND',
    type: '舞台大屏幕视觉',
    text: 'Fortune Art Production 为 Rain 郑智薰制作的舞台视觉记录。',
    image: '/portfolio/assets/rain-singapore/rain-singapore-cover.jpg',
    href: '/portfolio/#/projects/rain-singapore'
  },
  {
    title: '高斯空间档案',
    type: '3DGS / 空间扫描',
    text: '高斯重建、环境采样与网页浏览的空间研究。',
    image: '/portfolio/assets/gaussian-scenes/shinjuku-gyoen-greenhouse.webp',
    href: '/portfolio/#/gaussian-scenes'
  }
]

const dockItems = [
  { label: '作品', to: '/works' },
  { label: '制作', to: '/production' },
  { label: '写作', to: '/profile' },
  { label: '归档', to: '/archive' }
]

function HomeV4() {
  const rootRef = useRef(null)
  const [activeFrame, setActiveFrame] = useState(0)
  const current = focusWorks[activeFrame]

  useGSAP(() => {
    gsap.from('.home-v4-brand, .home-v4-tour, .home-v4-dock, .home-v4-viewport', {
      opacity: 0,
      y: 18,
      duration: 0.72,
      ease: 'power3.out',
      stagger: 0.08
    })
  }, { scope: rootRef })

  useGSAP(() => {
    gsap.fromTo(
      '.home-v4-viewport-image, .home-v4-focus-copy',
      { opacity: 0.35, scale: 1.015 },
      { opacity: 1, scale: 1, duration: 0.64, ease: 'power2.out' }
    )
  }, { scope: rootRef, dependencies: [activeFrame], revertOnUpdate: true })

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    const timer = window.setInterval(() => {
      setActiveFrame((index) => (index + 1) % focusWorks.length)
    }, 5600)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <>
      <main className="home-v4" ref={rootRef}>
        <section className="home-v4-stage" aria-label="钱誉文作品前台">
          <div className="home-v4-shell">
            <aside className="home-v4-rail">
              <div className="home-v4-brand">
                <span>钱誉文 / Ewan Qian</span>
                <strong>现场视觉与空间影像</strong>
                <p>为演出、展览与数字场景制作可被观看、预演和交付的视觉系统。</p>
              </div>

              <nav className="home-v4-dock" aria-label="主导航">
                {dockItems.map((item) => (
                  <Link to={item.to} key={item.label}>{item.label}</Link>
                ))}
              </nav>
            </aside>

            <section className="home-v4-viewport" aria-label={current.title}>
              <div className="home-v4-viewport-media">
                <img
                  className="home-v4-viewport-image"
                  src={current.image}
                  alt={current.title}
                  key={current.id}
                  style={{ objectPosition: current.position }}
                />
              </div>

              <div className="home-v4-focus-copy">
                <div>
                  <span>{current.label}</span>
                  <h1>{current.title}</h1>
                </div>
                <p>{current.line}</p>
                <div className="home-v4-actions">
                  <a className="home-v4-button primary" href={current.href}>打开项目</a>
                  <Link className="home-v4-button" to="/works">全部作品</Link>
                </div>
              </div>

              <div className="home-v4-tour" aria-label="主线切换">
                {focusWorks.map((work, index) => (
                  <button
                    className={index === activeFrame ? 'active' : ''}
                    key={work.id}
                    type="button"
                    onClick={() => setActiveFrame(index)}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{work.title}</strong>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className="home-v4-index" aria-label="作品索引">
          <div className="home-v4-index-head">
            <span>Works</span>
            <h2>作品与制作记录</h2>
            <p>从主线作品、现场制作到空间扫描，按观看路径展开。详细背景进入项目页。</p>
          </div>

          <div className="home-v4-index-grid">
            {workIndex.map((work) => (
              <a className="home-v4-work" href={work.href} key={work.title}>
                <img src={work.image} alt={work.title} />
                <div>
                  <span>{work.type}</span>
                  <h3>{work.title}</h3>
                  <p>{work.text}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default HomeV4
