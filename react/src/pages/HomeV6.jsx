import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Footer from '../components/layout/Footer'

gsap.registerPlugin(useGSAP)

const focusWorks = [
  {
    id: 'drop-flow',
    title: 'Drop Flow / 滴流',
    zhTitle: '滴流',
    label: '01',
    category: '空间影像 / 数字自然',
    caption: '声音、点云、扫描数据与程序化图像共同生成的空间影像作品。',
    image: '/portfolio/assets/home/featured-dropflow-hangzhou-biennale-scene.jpg',
    route: '/projects/drop-flow',
    tone: '#d8c6a0'
  },
  {
    id: 'timer',
    title: 'TIMER / 控时者',
    zhTitle: '控时者',
    label: '02',
    category: '时间粒子 / 音频曲线',
    caption: '把节拍、频段与粒子运动组织成环绕式时间结构。',
    image: '/portfolio/assets/case-optimized/timer-red-spatial-1400.webp',
    route: '/projects/timer',
    tone: '#ef6048'
  },
  {
    id: 'kashiwa',
    title: '柏大辅《TITAN》',
    zhTitle: '柏大辅',
    label: '03',
    category: '现场视听 / BO LIVE',
    caption: '围绕日本音乐人、作曲家柏大辅的现场音乐语境展开视觉系统。',
    image: '/portfolio/assets/case-optimized/kashiwa-bolive-1800.webp',
    route: '/projects/kashiwa-titan',
    tone: '#cdd8d6'
  },
  {
    id: 'yujiayun',
    title: '余佳运「45㎡」Opening',
    zhTitle: '45㎡',
    label: '04',
    category: '演唱会视觉 / 宁波',
    caption: '开场段落、PGM 环绕屏幕与地屏内容进入真实巡演交付。',
    image: '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-46s-orange-arc.jpg',
    route: '/projects/yujiayun-45m2',
    tone: '#ed8b2f'
  }
]

const modes = [
  { label: '画廊', note: '艺术作品', to: '/works' },
  { label: '制作', note: '现场交付', to: '/production' },
  { label: '空间', note: '高斯扫描', to: '/gaussian-scenes' },
  { label: '归档', note: '完整时间线', to: '/archive' }
]

function HomeV6() {
  const rootRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [guided, setGuided] = useState(true)
  const active = focusWorks[activeIndex]
  const nextWorks = useMemo(
    () => focusWorks.filter((_, index) => index !== activeIndex),
    [activeIndex]
  )

  useGSAP(() => {
    gsap.from('.home-v6-brand, .home-v6-orbit, .home-v6-stage, .home-v6-radar, .home-v6-dock', {
      opacity: 0.86,
      y: 18,
      duration: 0.78,
      ease: 'power3.out',
      stagger: 0.07
    })
  }, { scope: rootRef })

  useGSAP(() => {
    gsap.fromTo(
      '.home-v6-image, .home-v6-title-block, .home-v6-caption',
      { opacity: 0.84, scale: 1.015, y: 8 },
      { opacity: 1, scale: 1, y: 0, duration: 0.72, ease: 'power2.out' }
    )
  }, { scope: rootRef, dependencies: [activeIndex], revertOnUpdate: true })

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!guided || reduced) return undefined

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % focusWorks.length)
    }, 5600)

    return () => window.clearInterval(interval)
  }, [guided])

  const choose = (index) => {
    setActiveIndex(index)
    setGuided(false)
  }

  return (
    <>
      <main className="home-v6" ref={rootRef} style={{ '--accent': active.tone }}>
        <section className="home-v6-screen" aria-label="钱誉文作品导览">
          <header className="home-v6-brand">
            <Link to="/profile" aria-label="进入个人页面">
              <span>钱誉文 / Ewan Qian</span>
              <strong>现场视觉与空间影像</strong>
            </Link>
          </header>

          <nav className="home-v6-orbit" aria-label="主导航">
            {modes.map((mode) => (
              <Link key={mode.label} to={mode.to}>
                <strong>{mode.label}</strong>
                <span>{mode.note}</span>
              </Link>
            ))}
          </nav>

          <article className="home-v6-stage" aria-live="polite">
            <div className="home-v6-image-wrap">
              <img
                className="home-v6-image"
                key={active.id}
                src={active.image}
                alt={active.title}
              />
            </div>

            <div className="home-v6-title-block">
              <span>{active.category}</span>
              <h1>{active.title}</h1>
            </div>

            <p className="home-v6-caption">{active.caption}</p>

            <div className="home-v6-actions">
              <Link className="home-v6-primary" to={active.route}>进入项目</Link>
              <Link className="home-v6-secondary" to="/works">全部作品</Link>
            </div>

            <div className="home-v6-index">
              <span>{active.label}</span>
              <i style={{ transform: `scaleX(${(activeIndex + 1) / focusWorks.length})` }} />
              <button type="button" onClick={() => setGuided((value) => !value)}>
                {guided ? '导览' : '继续'}
              </button>
            </div>
          </article>

          <aside className="home-v6-radar" aria-label="作品状态">
            {focusWorks.map((work, index) => (
              <button
                key={work.id}
                type="button"
                className={index === activeIndex ? 'active' : ''}
                onClick={() => choose(index)}
              >
                <span>{work.label}</span>
                <strong>{work.zhTitle}</strong>
              </button>
            ))}
          </aside>

          <div className="home-v6-dock" aria-label="后续作品">
            {nextWorks.slice(0, 3).map((work) => (
              <Link key={work.id} to={work.route}>
                <img src={work.image} alt={work.title} />
                <span>{work.title}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default HomeV6
