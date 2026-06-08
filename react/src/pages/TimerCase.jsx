import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer'

const facts = [
  ['时间', '2024-2025'],
  ['方向', '音画互动 / 时间结构 / 环绕屏幕'],
  ['相关呈现', 'UFO Terminal「加载…」创作营、杭州国际电子音乐节、ChinaGraph 电子剧场相关语境'],
  ['方法', '音频曲线、点云粒子、灯光控制、Geometry Nodes、环幕输出'],
  ['角色', '视觉设计、空间影像制作、现场视觉呈现']
]

const states = [
  {
    title: '时间沙粒',
    text: '粒子像沙粒一样聚集、流动、旋转和爆裂，使时间成为可以被观看的视觉物质。'
  },
  {
    title: '声音曲线',
    text: '音乐中的节奏和能量被转化为动画曲线，参与控制亮度、密度、运动和局部爆发。'
  },
  {
    title: '环绕感知',
    text: '图像不是只在矩形屏幕内播放，而是围绕观众形成一个持续运动的时间场。'
  }
]

const method = [
  '使用 Blender 的 Bake Sound to F-Curves 工作流，把声音转化为可编辑的控制曲线。',
  '通过 Geometry Nodes 和点云粒子组织空间运动，让时间成为可见的材料。',
  '保留手动关键帧和作者判断，避免简单频谱化的机械反应。',
  '为后续 Drop Flow 中更复杂的点云、流场和数字自然系统建立方法基础。'
]

const gallery = [
  '/portfolio/assets/case-optimized/timer-red-spatial-1400.webp',
  '/portfolio/assets/case-optimized/timer-main-1800.webp',
  '/portfolio/assets/home/archive-timer-clean.jpg',
  '/portfolio/assets/gaussian-scenes/timer-gaussian-0531.webp'
]

function TimerCase() {
  return (
    <>
      <main className="case-page timer-case">
        <nav className="frontstage-dock case-dock" aria-label="项目导航">
          <Link to="/">首页</Link>
          <Link to="/works">作品</Link>
          <Link to="/gaussian-scenes">空间</Link>
          <Link to="/archive">归档</Link>
        </nav>

        <section className="case-hero">
          <div className="case-hero-media">
            <img src="/portfolio/assets/case-optimized/timer-red-spatial-1400.webp" alt="TIMER spatial audiovisual scene" />
          </div>
          <div className="case-hero-copy">
            <span>Audiovisual Spatial Work</span>
            <h1>TIMER / 控时者</h1>
            <p>
              一件围绕时间、节拍与空间影像展开的音画互动作品。
              它将音乐中的节奏和能量转化为环绕式点云粒子、灯光变化和空间运动。
            </p>
          </div>
        </section>

        <section className="case-facts" aria-label="项目信息">
          {facts.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </section>

        <section className="case-guide" aria-label="阅读路径">
          <span>阅读路径</span>
          <strong>时间物质</strong>
          <strong>声音曲线</strong>
          <strong>环幕感知</strong>
          <strong>方法前史</strong>
        </section>

        <section className="case-reading">
          <div>
            <span>Concept</span>
            <h2>把时间变成围绕身体运动的粒子场</h2>
          </div>
          <p>
            《TIMER / 控时者》不是把钟表作为图像符号，而是把时间理解为一种可被声音推动的物质。
            点云、粒子、灯光和环绕屏幕共同形成一个时间装置：节奏改变密度，频段推动运动，画面在聚集、停顿和爆裂之间形成空间压力。
            它也是《Drop Flow / 滴流》的重要前史，为后续的点云花园、流场和数字自然场景建立了音画方法。
          </p>
        </section>

        <section className="case-structure" aria-label="视觉状态">
          {states.map((item) => (
            <article key={item.title}>
              <span>{item.title}</span>
              <p>{item.text}</p>
            </article>
          ))}
        </section>

        <section className="case-gallery" aria-label="项目图册">
          {gallery.map((src) => (
            <img key={src} src={src} alt="" loading="lazy" />
          ))}
        </section>

        <section className="case-method">
          <div>
            <span>Method</span>
            <h2>音频曲线、点云和手动调度共同构成视觉乐器</h2>
          </div>
          <ul>
            {method.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="case-next" aria-label="继续观看">
          <Link to="/projects/drop-flow">
            <span>主线展开</span>
            <strong>Drop Flow / 滴流</strong>
          </Link>
          <Link to="/gaussian-scenes">
            <span>空间转译</span>
            <strong>TIMER 高斯化研究</strong>
          </Link>
          <Link to="/works">
            <span>返回</span>
            <strong>作品 / 现场</strong>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default TimerCase
