import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer'

const dockItems = [
  { label: '首页', to: '/' },
  { label: '作品', to: '/works' },
  { label: '制作', to: '/production' },
  { label: '归档', to: '/archive' }
]

const portraits = [
  {
    src: '/portfolio/assets/profile/ewan-portrait-main.jpg',
    title: 'Portrait',
    note: '个人照片'
  },
  {
    src: '/portfolio/assets/profile/ewan-ufo-sharing.jpg',
    title: 'UFO Terminal',
    note: '分享现场'
  },
  {
    src: '/portfolio/assets/profile/ewan-strawberry-live.jpg',
    title: 'Live',
    note: '现场状态'
  },
  {
    src: '/portfolio/assets/profile/ewan-profile-board.jpg',
    title: 'Studio',
    note: '工作板'
  }
]

const practiceLines = [
  {
    meta: '时间粒子 / 音频曲线 / 环绕屏幕',
    title: 'TIMER / 控时者',
    body: '早期关键作品线。声音被转成可编辑的时间曲线，点云、灯光和环绕屏幕共同形成一种围绕身体运动的时间结构。'
  },
  {
    meta: '数字自然 / 高斯衍生点云 / 记忆场景',
    title: 'Drop Flow / 滴流',
    body: '持续展开的主线作品之一。从“一滴水生成一座花园”的意象出发，把声音、扫描、点云、数字植物与空间屏幕组织成流动的场景。'
  },
  {
    meta: '现场视听 / 音乐人合作 / 屏幕幻觉',
    title: 'KASHIWA Daisuke / 柏大辅 合作线',
    body: '围绕日本音乐人 KASHIWA Daisuke / 柏大辅的现场语境展开。相关页面保留导演、视觉导演、音乐人和制作团队的署名结构。'
  },
  {
    meta: '演唱会视觉 / opening / PGM 与地屏',
    title: '余佳运 45㎡ 演唱会视觉制作',
    body: '面向真实巡演语境的制作与工程交付线，包括 opening、部分曲目的 PGM 环绕屏幕、地屏内容和 Blender 预览。'
  },
  {
    meta: '大屏幕舞台视觉 / Singapore / Fortune Art Production',
    title: 'Rain 郑智薰 / SINGLAND Festival',
    body: 'Fortune Art Production 为 Rain 郑智薰制作的 It’s Raining remix version 舞台大屏幕视觉，在新加坡跨年晚会语境中呈现。'
  },
  {
    meta: '3DGS / 空间保存 / 网页查看',
    title: 'Gaussian Spatial Archive / 高斯空间档案',
    body: '围绕高斯重建、空间保存、网页浏览和个人环境采样展开。它连接影像制作、空间扫描和作品集系统。'
  }
]

const methodNotes = [
  '把 Blender 当作音画创作环境：时间线、音频曲线、节点、灯光、材质、镜头和输出一起工作。',
  '把声音当作控制材料：它影响点云运动、材质亮度、流场强度、粒子密度、闪烁和转场。',
  '把现场交付放进创作：屏幕比例、PGM、地屏、cue、预览文件和授权边界都会改变最终呈现。',
  '把 AI 放在工作流内部：辅助归档、分析、工具设计、参数测试和文本整理，服务创作判断。'
]

function Profile() {
  return (
    <>
      <main className="frontstage-page profile-front">
        <nav className="frontstage-dock" aria-label="主导航">
          {dockItems.map((item) => (
            <Link to={item.to} key={item.label}>{item.label}</Link>
          ))}
        </nav>

        <section className="profile-hero">
          <div className="profile-hero-copy">
            <span>Profile</span>
            <h1>钱誉文 / Ewan Qian</h1>
            <p>
              媒体艺术家、现场视觉创作者与独立制作人。工作围绕现场音画、空间影像、程序化图像系统与数字场景展开。
            </p>
          </div>
          <figure className="profile-hero-image">
            <img src="/portfolio/assets/profile/ewan-portrait-main.jpg" alt="钱誉文 / Ewan Qian" />
          </figure>
        </section>

        <section className="front-route" aria-label="个人页浏览路径">
          <span>浏览路径</span>
          <a href="#official-bio">官方介绍</a>
          <a href="#long-read">个人叙事</a>
          <a href="#practice-lines">作品线索</a>
          <a href="#portraits">图像</a>
        </section>

        <section className="profile-official" id="official-bio">
          <span>Official Bio</span>
          <p>
            钱誉文 / Ewan Qian 是媒体艺术家、现场视觉创作者与独立制作人，Virtura Collective 与 Virtura Spaceport 方向发起人之一。他关注声音、图像、材质与空间气氛之间的协调关系，长期制作面向演出、展览和数字场景的视觉系统。近年来，他以 Virtura 团队身份参与 TIMER / 控时者、Drop Flow / 滴流等项目，并与徐昊、KASHIWA Daisuke / 柏大辅、RÖ、Shukai / Mark 等音乐人和创作者展开合作。
          </p>
        </section>

        <section className="profile-reading" id="long-read">
          <div className="front-index-head">
            <div>
              <span>Long Read</span>
              <h2>现场中的图像怎样成立</h2>
            </div>
            <p>这部分保留更完整的个人叙事。它像一篇专栏，用来解释作品背后的判断。</p>
          </div>

          <article>
            <h3>从声音进入图像</h3>
            <p>
              他的现场视觉从声音在空间里的状态开始。低频会改变身体的重量，高频会改变画面边缘的紧张感，停顿会让黑场、暗部和慢速运动变得重要。视觉在这里与声音共同建立现场时间。
            </p>
            <p>
              声音可以驱动画面，也可以被画面延迟、压住或重新组织。某些段落需要同步，某些段落需要让图像保留自己的速度。作者判断何时让音乐进入参数，何时让手动关键帧接管，何时让画面制造下一次听觉期待。
            </p>
          </article>

          <article>
            <h3>从自然记忆到数字场景</h3>
            <p>
              水滴、沙粒、植物、温室、扫描残影、点云和透明结构，经常出现在他的作品里。它们不是装饰性的自然图像，而是城市生活中被保存下来的自然碎片。
            </p>
            <p>
              Drop Flow 把这些碎片组织成持续展开的空间场景；TIMER 更早地把时间、节拍和点云粒子连接起来。两条线索共同推进一种方法：把声音转化为场景控制，把扫描和点云转化为可编辑的图像材料，把屏幕扩展成观众可以靠近和重新观看的空间。
            </p>
          </article>

          <article>
            <h3>从工具到现场判断</h3>
            <p>
              Blender 在他的工作中不只是动画软件。时间线、音频曲线、Geometry Nodes、Simulation Zone、点云导入、材质控制、灯光、镜头和屏幕输出，被组织成同一个创作环境。
            </p>
            <p>
              AI 也被放进这个工作结构中，参与资料整理、结构推演、工具设计、参数测试和现场流程优化。它的价值不只在图像生成，也在帮助建立更稳定的个人工作系统。
            </p>
          </article>
        </section>

        <section className="profile-lines" id="practice-lines" aria-label="作品线">
          <div className="front-index-head">
            <div>
              <span>Practice Lines</span>
              <h2>正在展开的作品与实践线</h2>
            </div>
          </div>
          <div className="profile-line-grid">
            {practiceLines.map((line) => (
              <article key={line.title}>
                <span>{line.meta}</span>
                <h3>{line.title}</h3>
                <p>{line.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="profile-method">
          <div>
            <span>Method</span>
            <h2>方法与工具</h2>
          </div>
          <ul>
            {methodNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>

        <section className="profile-portraits" id="portraits" aria-label="个人照片">
          <div className="front-index-head">
            <div>
              <span>Portraits</span>
              <h2>图像</h2>
            </div>
            <p>个人照片和现场状态单独放在这里，不挤占首页。</p>
          </div>
          <div className="profile-portrait-grid">
            {portraits.map((image) => (
              <figure key={image.src}>
                <img src={image.src} alt={image.title} />
                <figcaption>
                  <strong>{image.title}</strong>
                  <span>{image.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Profile
