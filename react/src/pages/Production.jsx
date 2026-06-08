import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer'

const services = [
  {
    title: '现场视觉',
    meta: 'Live Visuals',
    text: '适合演出、专场和现场段落。重点是音乐结构、节奏推进、屏幕气质和现场观看关系一起成立。',
    tags: ['音乐演出', 'audiovisual 合作', 'opening visual', '现场视觉支持']
  },
  {
    title: '空间影像与沉浸内容',
    meta: 'Spatial Image',
    text: '适合展厅、多面屏、穹顶和装置内容。重点是空间路径、屏幕关系和环境感。',
    tags: ['展厅', '多面屏', '穹顶', '沉浸空间', '装置内容']
  },
  {
    title: '预演与方案确认',
    meta: 'Previsualization',
    text: '适合前期判断阶段。先把结构、节奏、屏幕关系和关键风险做成可讨论的预演。',
    tags: ['场景预演', '项目测试', '方案确认', '技术验证']
  },
  {
    title: '交付规格与播放支持',
    meta: 'Delivery Specs',
    text: '适合进入真实交付的项目。提前理顺分辨率、帧率、编码、版本和场地适配。',
    tags: ['4K / 8K', '60fps', 'Apple ProRes', 'MOV / MP4', '播放测试']
  },
  {
    title: '研究咨询与工作坊',
    meta: 'Research / Workshop',
    text: '适合团队方法搭建、方向讨论和课程场景，用来建立判断、工具链和内容组织方式。',
    tags: ['方法讨论', '项目咨询', '课程', 'workflow']
  }
]

const notes = [
  {
    title: 'Opening visual',
    text: '开场段落承担气质、叙事起点和观看预期，通常需要更完整的节奏设计、版本管理和现场测试。'
  },
  {
    title: '测试样片',
    text: '多屏、双目和沉浸内容建议先做短样片。深度、舒适度、比例和亮度问题越早发现，返工越少。'
  },
  {
    title: '规格确认',
    text: '分辨率、帧率、编码格式、播放条件和场地尺寸越晚确认，后期越容易出错。'
  },
  {
    title: '工作量判断',
    text: '空间项目的难度来自屏幕结构、版本数量、内容组织和场地适配，不只是内容时长。'
  }
]

const inquiry = ['项目类型', '预期时间', '场地或平台', '屏幕条件', '预算区间', '输出形式']

function Production() {
  return (
    <>
      <main className="frontstage-page production-front">
        <nav className="frontstage-dock" aria-label="制作页导航">
          <Link to="/">首页</Link>
          <Link to="/works">作品</Link>
          <Link to="/archive">归档</Link>
          <Link to="/profile">个人</Link>
        </nav>

        <section className="frontstage-hero">
          <div>
            <span>Production</span>
            <h1>制作与合作</h1>
          </div>
          <p>
            用来判断项目是否适合推进：现场视觉、空间影像、预演测试、交付规格和方法工作坊。
            案例细节进入项目页。
          </p>
        </section>

        <section className="front-route" aria-label="制作浏览路径">
          <span>浏览路径</span>
          <a href="#service-categories">合作类型</a>
          <a href="#case-notes">合作判断</a>
          <a href="#inquiry">项目开始</a>
          <Link to="/works">作品现场</Link>
        </section>

        <section className="front-service-grid" id="service-categories" aria-label="合作类型">
          {services.map((service) => (
            <article className="front-service-card" key={service.title}>
              <span>{service.meta}</span>
              <h2>{service.title}</h2>
              <p>{service.text}</p>
              <div>
                {service.tags.map((tag) => (
                  <em key={tag}>{tag}</em>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="front-note-grid" id="case-notes" aria-label="制作判断">
          <div className="front-index-head">
            <span>Case Notes</span>
            <h2>合作判断</h2>
          </div>

          <div className="front-note-list">
            {notes.map((note) => (
              <article key={note.title}>
                <h3>{note.title}</h3>
                <p>{note.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="front-inquiry" id="inquiry" aria-label="项目咨询">
          <div>
            <span>Inquiry</span>
            <h2>项目开始前</h2>
          </div>
          <ul>
            {inquiry.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="front-socials">
            <a href="https://www.instagram.com/ewanqian/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://space.bilibili.com/2380485" target="_blank" rel="noreferrer">Bilibili</a>
            <a href="https://www.xiaohongshu.com/user/profile/60d73226000000000101f30e" target="_blank" rel="noreferrer">Xiaohongshu</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Production
