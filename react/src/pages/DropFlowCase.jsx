import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer'

const facts = [
  ['时间', '2024-2026'],
  ['方向', '空间影像 / 数字自然 / 点云视觉系统'],
  ['呈现', 'UFO Terminal、杭州艺术与科技双年展相关现场版本'],
  ['方法', 'Blender、音频曲线、Geometry Nodes、Simulation Zone、点云材料'],
  ['角色', '视觉艺术、场景建构、空间影像系统、数字内容制作']
]

const structure = [
  {
    title: 'Drop',
    text: '作品从一个微小的点、水滴或信号开始。它不是叙事装饰，而是整个空间场景的生成源。'
  },
  {
    title: 'Flow',
    text: '点生成线，线形成路径、根系、声波和扫描轨迹。声音不只是伴奏，而是参与运动和密度变化。'
  },
  {
    title: 'Garden',
    text: '高斯衍生点云、数字植物、几何框架和屏幕光场共同形成一座持续生成的数字花园。'
  }
]

const methods = [
  '把 Blender 当作完整音画创作环境，而不是单纯渲染工具。',
  '把音频曲线、手动关键帧和程序化节点放在同一条时间线上调度。',
  '把扫描数据和高斯衍生点云整理成可编辑、可流动、可再次呈现的图像材料。',
  '把屏幕、空间、身体和观看距离作为作品结构的一部分。'
]

const gallery = [
  '/portfolio/assets/home/hero-dropflow-ufo-2025.jpeg',
  '/portfolio/assets/drop-flow/optimized/dropflow-field-216.webp',
  '/portfolio/assets/drop-flow/optimized/dropflow-field-187.webp',
  '/portfolio/assets/drop-flow/optimized/dropflow-field-226.webp',
  '/portfolio/assets/home/featured-dropflow-hangzhou-biennale-scene.jpg',
  '/portfolio/assets/drop-flow/optimized/hero-hangzhou-performance.webp'
]

function DropFlowCase() {
  return (
    <>
      <main className="case-page dropflow-case">
        <nav className="frontstage-dock case-dock" aria-label="项目导航">
          <Link to="/">首页</Link>
          <Link to="/works">作品</Link>
          <Link to="/gaussian-scenes">空间</Link>
          <Link to="/archive">归档</Link>
        </nav>

        <section className="case-hero">
          <div className="case-hero-media">
            <img src="/portfolio/assets/home/hero-dropflow-ufo-2025.jpeg" alt="Drop Flow live spatial image" />
          </div>
          <div className="case-hero-copy">
            <span>Spatial Audiovisual Work</span>
            <h1>Drop Flow / 滴流</h1>
            <p>
              一件由声音、点云、扫描数据与程序化视觉系统构成的空间影像作品。
              它从“一滴水生成一座花园”的意象出发，将数字自然、流场和屏幕空间组织成持续展开的记忆场景。
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
          <strong>概念生成</strong>
          <strong>视觉结构</strong>
          <strong>空间材料</strong>
          <strong>方法系统</strong>
        </section>

        <section className="case-reading">
          <div>
            <span>Concept</span>
            <h2>从一滴水到一座可进入的数字花园</h2>
          </div>
          <p>
            《Drop Flow / 滴流》关注自然经验如何在数字空间中被保存、迁移和重新进入。
            作品中的自然不是直接再现的风景，而是由城市记忆、植物痕迹、扫描数据、点云材料和声音结构共同生成的空间状态。
            它更接近一件可被演奏的视觉乐器：声音推动密度、亮度、流动和转场，场景则在屏幕环境中持续组织新的观看关系。
          </p>
        </section>

        <section className="case-structure" aria-label="视觉结构">
          {structure.map((item) => (
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
            <h2>声音、点云与空间屏幕共同工作</h2>
          </div>
          <ul>
            {methods.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="case-next" aria-label="继续观看">
          <Link to="/projects/timer">
            <span>方法前史</span>
            <strong>TIMER / 控时者</strong>
          </Link>
          <Link to="/gaussian-scenes">
            <span>空间样本</span>
            <strong>高斯空间扫描库</strong>
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

export default DropFlowCase
