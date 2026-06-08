import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer'

const dockItems = [
  { label: '首页', to: '/' },
  { label: '作品', to: '/works' },
  { label: '制作', to: '/production' },
  { label: '个人', to: '/profile' }
]

const featured = [
  {
    type: 'Essay',
    date: '2025',
    title: '从空间内部展开的图像经验',
    summary: '围绕 Drop Flow 的空间性、流体结构与沉浸式观看展开的一篇作品评论。',
    to: '/projects/drop-flow'
  },
  {
    type: 'Essay',
    date: '2024-2025',
    title: 'TIMER 不是“卡点视频”',
    summary: '讨论 TIMER 如何把节拍、频段与时间结构转成图像组织，而不是停留在表层同步。',
    to: '/projects/timer'
  },
  {
    type: 'Field Note',
    date: '2025',
    title: '现场合作不是背景视觉',
    summary: '从柏大辅《TITAN》等合作出发，讨论现场视觉如何成为空间经验的一部分。',
    to: '/projects/kashiwa-titan'
  },
  {
    type: 'Research',
    date: '2025',
    title: '个人档案系统为什么要重新设计',
    summary: '关于 archive、viewer、内容协议与作品长期组织方式的研究笔记。',
    to: '/archive'
  }
]

const columns = [
  {
    label: '作品评论',
    items: [
      '从空间内部展开的图像经验',
      'TIMER 系列中的时间控制与感知组织',
      '机械光合：现场合作中的结构与氛围',
      '观察与共生：环境如何成为作品的一部分'
    ]
  },
  {
    label: '方法笔记',
    items: [
      '作品为什么要按实践线组织',
      '现场视觉怎样参与演出结构',
      'viewer / spec 为什么会成为作品系统',
      '从 rehearsal 到 public node'
    ]
  },
  {
    label: '现场记录',
    items: [
      'UFO Terminal 的现场测试与结构调整',
      'BO LIVE 演出的视觉段落复盘',
      '场地、屏幕和观看距离',
      '播放测试如何改变作品结构'
    ]
  }
]

function Writing() {
  return (
    <>
      <main className="frontstage-page writing-front">
        <nav className="frontstage-dock" aria-label="写作页导航">
          {dockItems.map((item) => (
            <Link to={item.to} key={item.label}>{item.label}</Link>
          ))}
        </nav>

        <section className="frontstage-hero">
          <div>
            <span>Writing</span>
            <h1>写作与方法</h1>
          </div>
          <p>
            这里放作品评论、现场记录和方法文章。它解释作品如何成立，也帮助读者理解现场、空间和交付之间的关系。
          </p>
        </section>

        <section className="front-route" aria-label="写作浏览路径">
          <span>浏览路径</span>
          <a href="#featured-writing">重点文章</a>
          <a href="#writing-map">写作线索</a>
          <Link to="/profile">个人叙事</Link>
          <Link to="/works">作品现场</Link>
        </section>

        <section className="writing-featured" id="featured-writing" aria-label="重点写作">
          {featured.map((item, index) => (
            <Link className={index === 0 ? 'large' : ''} to={item.to} key={item.title}>
              <span>{item.type} / {item.date}</span>
              <h2>{item.title}</h2>
              <p>{item.summary}</p>
            </Link>
          ))}
        </section>

        <section className="writing-map" id="writing-map" aria-label="写作线索">
          <div className="front-index-head">
            <div>
              <span>Reading Map</span>
              <h2>写作线索</h2>
            </div>
            <p>不把文章堆成列表，而是按作品、方法和现场经验进入。</p>
          </div>

          <div className="writing-column-grid">
            {columns.map((column) => (
              <article key={column.label}>
                <span>{column.label}</span>
                <ul>
                  {column.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Writing
