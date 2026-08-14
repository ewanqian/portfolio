import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const facts = {
  zh: [
    ['项目', '《机械光合：TITAN 的全息声林》'],
    ['音乐 / 作曲', '柏大辅 / KASHIWA Daisuke'],
    ['钢琴 / 现场音乐', '村田有希 / Yuki Murata'],
    ['时间', '2025.10.21'],
    ['地点', 'BO LIVE 前海店 / 深圳'],
    ['视觉范围', '全息纱幕、裸眼 3D、雾气纵深、音画互动视觉']
  ],
  en: [
    ['Project', "Mechanical Photosynthesis: TITAN's Holographic Sound Forest"],
    ['Music / Composition', 'KASHIWA Daisuke / 柏大辅'],
    ['Piano / Live Music', 'Yuki Murata / 村田有希'],
    ['Date', '2025.10.21'],
    ['Venue', 'BO LIVE Qianhai / Shenzhen'],
    ['Visual Scope', 'Holographic scrim, naked-eye 3D, haze-based depth, audiovisual interaction']
  ]
}

const credits = {
  zh: [
    ['音乐 / 作曲', '柏大辅 / KASHIWA Daisuke'],
    ['钢琴 / 现场音乐', '村田有希 / Yuki Murata'],
    ['现场视觉制作', '钱誉文 / Ewan Qian'],
    ['策划 / 统筹 / 技术 / 灯光 / 声音 / 场地方', '项目协作团队']
  ],
  en: [
    ['Music / Composition', 'KASHIWA Daisuke'],
    ['Piano / Live Music', 'Yuki Murata'],
    ['Live Visual Production', 'Ewan Qian'],
    ['Planning / Coordination / Technical / Lighting / Sound / Venue', 'Project collaboration team']
  ]
}

const gallery = [
  '/portfolio/assets/home/featured-kashiwa-bolive-shenzhen.webp',
  '/portfolio/assets/home/featured-kashiwa-bolive-shenzhen-2.webp',
  '/portfolio/assets/home/featured-kashiwa-bolive-shenzhen-3.webp'
]

function FactTable({ rows }) {
  return (
    <dl className="project-fact-table">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}

function KashiwaTitan() {
  const { language } = useLanguage()
  const isZh = language === 'zh'

  return (
    <>
      <Header />
      <main className="project-page">
        <section className="project-hero-section">
          <div className="container project-hero-grid">
            <div className="project-hero-copy">
              <p className="eyebrow">{isZh ? '现场音画视觉系统' : 'Live Audiovisual Visual System'}</p>
              <h1>{isZh ? '柏大辅《TITAN》深圳 BO LIVE 专场' : 'KASHIWA Daisuke / TITAN - BO LIVE Shenzhen'}</h1>
              <p>
                {isZh
                  ? '围绕日本音乐人、作曲家柏大辅 / KASHIWA Daisuke《TITAN》展开的现场音画项目。钱誉文负责现场视觉制作，内容包含全息纱幕、裸眼 3D、雾气纵深与音画互动段落。'
                  : 'A live audiovisual project centered on TITAN by Japanese musician and composer KASHIWA Daisuke. Ewan Qian was responsible for live visual production, including holographic scrims, naked-eye 3D, haze-based depth, and audiovisual interaction passages.'}
              </p>
            </div>
            <figure className="project-hero-image">
              <img src="/portfolio/assets/home/featured-kashiwa-bolive-shenzhen-2.webp" alt="" />
            </figure>
          </div>
        </section>

        <section className="section">
          <div className="container project-two-column">
            <div>
              <h2>{isZh ? '项目信息' : 'Project Facts'}</h2>
              <FactTable rows={facts[language]} />
            </div>
            <div>
              <h2>{isZh ? '我的工作' : 'My Role'}</h2>
              <p>
                {isZh
                  ? '视觉工作集中在屏幕空间、纱幕层次、雾气中的光线路径与声音触发的运动结构。公开页面优先呈现项目背景、视觉结果和制作范围；更长的制作笔记保留为后续档案。'
                  : 'The visual work focused on screen space, scrim depth, light paths in haze, and motion structures driven by sound. This public page foregrounds the project context, visual outcome, and production scope, with longer production notes kept as archive material.'}
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2>{isZh ? '现场画面' : 'Live Images'}</h2>
            <div className="project-image-strip wide">
              {gallery.map((src) => (
                <img key={src} src={src} alt="" loading="lazy" />
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container project-two-column">
            <div>
              <h2>{isZh ? '视觉系统' : 'Visual System'}</h2>
              <p>
                {isZh
                  ? '视觉语言围绕白空间深度、雾气、光线轨迹、环境过渡和沉浸错觉组织。部分段落更偏向音频结构触发，部分段落转向漂浮、缓慢和治愈性的空间状态。'
                  : 'The visual language is organized around white-space depth, haze, light trajectories, environmental transitions, and immersive illusion. Some passages respond to stronger audio structures, while others move into slower, floating, and healing spatial states.'}
              </p>
            </div>
            <div>
              <h2>{isZh ? '署名' : 'Credits'}</h2>
              <FactTable rows={credits[language]} />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2>{isZh ? '录像与完整档案' : 'Video and Full Archive'}</h2>
            <p className="section-intro">
              {isZh
                ? '制作笔记、曲目视觉基因库、现场测试与可下载方法文档保留在完整 HTML 档案页。Infrared 现场录像已在 Bilibili 公开。'
                : 'Production notes, track visual gene bank, on-site tests, and downloadable method docs live on the full HTML archive page. The Infrared live recording is public on Bilibili.'}
            </p>
            <div className="project-link-list">
              <a href="/works/kashiwa.html">{isZh ? '打开完整档案页' : 'Open full archive'}</a>
              <a href="https://www.bilibili.com/video/BV1wvZLBZEQS/" target="_blank" rel="noreferrer">
                Infrared — Bilibili
              </a>
              <a href="/works/mke-terminal.html">MKE Terminal</a>
              <a href="https://mp.weixin.qq.com/s/yNjtixkMIF5zXrl03DyU1g" target="_blank" rel="noreferrer">
                {isZh ? '微信回顾' : 'WeChat recap'}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default KashiwaTitan
