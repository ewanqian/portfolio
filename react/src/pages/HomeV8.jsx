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
    label: '主线作品',
    meta: '声音 / 点云 / 数字自然 / 空间屏幕',
    text: '从一滴水生成一座数字花园。声音、扫描数据、点云和屏幕光场共同形成持续展开的空间影像。',
    image: '/portfolio/assets/home/featured-dropflow-hangzhou-biennale-scene.jpg',
    route: '/projects/drop-flow',
    accent: '#d8c6a0',
    position: 'center center'
  },
  {
    id: 'timer',
    title: 'TIMER / 控时者',
    label: '方法前史',
    meta: '时间粒子 / 音频曲线 / 环绕屏幕',
    text: '把节拍、频段和时间压力转成可见的粒子场。它为后续 Drop Flow 的点云、流场和空间影像建立方法基础。',
    image: '/portfolio/assets/case-optimized/timer-red-spatial-1400.webp',
    route: '/projects/timer',
    accent: '#ef6048',
    position: 'center center'
  },
  {
    id: 'kashiwa',
    title: '柏大辅《TITAN》',
    label: '现场合作',
    meta: 'KASHIWA Daisuke / BO LIVE / 屏幕幻觉',
    text: '围绕日本音乐人、作曲家柏大辅的现场音乐语境展开视觉系统，处理纱幕、雾气、线框结构和空间深度。',
    image: '/portfolio/assets/case-optimized/kashiwa-bolive-1800.webp',
    route: '/projects/kashiwa-titan',
    accent: '#cdd8d6',
    position: 'center center'
  },
  {
    id: 'gaussian',
    title: '高斯空间扫描库',
    label: '空间研究',
    meta: '3DGS / 环境采样 / 网页查看',
    text: '把作品资料、花园、温室和公共空间转译成可浏览的空间样本，连接影像制作、扫描流程和长期归档。',
    image: '/portfolio/assets/gaussian-scenes/tokyo-tower-garden-2.webp',
    route: '/gaussian-scenes',
    accent: '#9fb7ff',
    position: 'center center'
  },
  {
    id: 'yujiayun',
    title: '余佳运「45㎡」Opening',
    label: '制作记录',
    meta: '演唱会视觉 / PGM / 地屏 / 宁波',
    text: '开场段落、部分曲目的环绕屏幕和地屏内容进入真实巡演交付。页面按 opening 与曲目状态组织。',
    image: '/portfolio/assets/yujiayun-45ping/final-intro-wide/intro-46s-orange-arc.jpg',
    route: '/projects/yujiayun-45m2',
    accent: '#ed8b2f',
    position: 'center center'
  }
]

const capsules = [
  { label: '画廊', to: '/works' },
  { label: '制作', to: '/production' },
  { label: '空间', to: '/gaussian-scenes' },
  { label: '写作', to: '/writing' },
  { label: '个人', to: '/profile' },
  { label: '归档', to: '/archive' }
]

function HomeV8() {
  const rootRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const active = scenes[index]

  const progress = useMemo(() => `${((index + 1) / scenes.length) * 100}%`, [index])

  useGSAP(() => {
    gsap.from('.home-v8-shell', {
      opacity: 0.94,
      y: 12,
      duration: 0.62,
      ease: 'power3.out'
    })
  }, { scope: rootRef })

  useGSAP(() => {
    gsap.fromTo(
      '.home-v8-media img, .home-v8-reading, .home-v8-route',
      { opacity: 0.9, y: 8, scale: 1.006 },
      { opacity: 1, y: 0, scale: 1, duration: 0.52, ease: 'power2.out', stagger: 0.025 }
    )
  }, { scope: rootRef, dependencies: [index], revertOnUpdate: true })

  useEffect(() => {
    if (!playing || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % scenes.length)
    }, 6800)

    return () => window.clearInterval(timer)
  }, [playing])

  const jumpTo = (nextIndex) => {
    setIndex(nextIndex)
    setPlaying(false)
  }

  return (
    <>
      <main className="home-v8" ref={rootRef} style={{ '--accent': active.accent }}>
        <img className="home-v8-backdrop" src={active.image} alt="" aria-hidden="true" />

        <section className="home-v8-shell" aria-label="钱誉文作品导览">
          <aside className="home-v8-left">
            <Link className="home-v8-identity" to="/profile">
              <span>钱誉文</span>
              <strong>Ewan Qian</strong>
              <em>现场视觉与空间影像</em>
            </Link>

            <nav className="home-v8-capsules" aria-label="页面入口">
              {capsules.map((item) => (
                <Link key={item.to} to={item.to}>{item.label}</Link>
              ))}
            </nav>
          </aside>

          <article className="home-v8-stage">
            <div className="home-v8-media">
              <img
                key={active.id}
                src={active.image}
                alt={active.title}
                style={{ objectPosition: active.position }}
              />
            </div>

            <div className="home-v8-reading">
              <span>{active.label}</span>
              <h1>{active.title}</h1>
              <p>{active.text}</p>
              <Link className="home-v8-reading-link" to={active.route}>进入项目</Link>
            </div>

            <div className="home-v8-route">
              <span>{active.meta}</span>
              <Link to={active.route}>进入项目</Link>
            </div>
          </article>

          <aside className="home-v8-right" aria-label="主线队列">
            <div className="home-v8-player">
              <span>导览</span>
              <button type="button" onClick={() => setPlaying((value) => !value)}>
                {playing ? '暂停' : '继续'}
              </button>
            </div>

            <div className="home-v8-progress" aria-hidden="true">
              <i style={{ width: progress }} />
            </div>

            <div className="home-v8-queue">
              {scenes.map((scene, sceneIndex) => (
                <button
                  key={scene.id}
                  type="button"
                  className={sceneIndex === index ? 'active' : ''}
                  onClick={() => jumpTo(sceneIndex)}
                >
                  <img src={scene.image} alt="" loading="lazy" />
                  <span>{String(sceneIndex + 1).padStart(2, '0')}</span>
                  <strong>{scene.title}</strong>
                </button>
              ))}
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default HomeV8
