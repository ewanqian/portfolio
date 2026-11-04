import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import '../styles/home-release.css'

const projects = [
  {
    id: 'titan',
    title: 'TITAN',
    contextZh: '柏大辅 · BO LIVE 深圳 · 2025',
    contextEn: 'Kashiwa Daisuke · BO LIVE Shenzhen · 2025',
    roleZh: '现场视觉 / 空间幻象',
    roleEn: 'Live visual / spatial illusion',
    image: '/portfolio/assets/raw-picks/titan-bolive-clean-16x9.webp',
    url: '/portfolio/works/titan.html'
  },
  {
    id: 'drop-flow',
    title: 'Drop Flow / 滴流',
    contextZh: '音画作品 · 空间呈现 · 2025',
    contextEn: 'Audiovisual work · Spatial presentation · 2025',
    roleZh: '生成视觉 / 空间编排',
    roleEn: 'Generative visual / spatial composition',
    image: '/portfolio/assets/home/hero-dropflow-ufo-2025.webp',
    url: '/portfolio/works/drop-flow.html'
  },
  {
    id: 'timer',
    title: 'TIMER / 控时者',
    contextZh: 'UFO Terminal「加载…权限 2」· 2024',
    contextEn: 'UFO Terminal · Loading… Access 2 · 2024',
    roleZh: '时间结构 / 视听装置',
    roleEn: 'Time structure / audiovisual installation',
    image: '/portfolio/assets/home/archive-timer-clean.webp',
    url: '/portfolio/works/timer.html'
  },
  {
    id: 'digital-garden',
    title: 'Digital Garden / 数字游园',
    contextZh: '西安万象城 · 2025',
    contextEn: 'Xi’an MixC · 2025',
    roleZh: 'Unity VFX Graph / 公共空间影像',
    roleEn: 'Unity VFX Graph / public-space image',
    image: '/portfolio/assets/digital-garden/digital-garden-xian-mixc-01.webp',
    url: '/portfolio/#/projects/digital-garden'
  }
]

const research = [
  {
    id: 'reactor-bpm-system-2026',
    index: '01',
    title: 'REACTOR — BPM System',
    zh: '实时演出系统：自动节拍与人工即兴',
    en: 'Real-time performance control between clock and improvisation',
    summaryZh: '把持续影像、BPM 同步与瞬时触发组织成可表演的 Arena 系统。节拍保持连续，密度、停顿和释放由人决定。',
    summaryEn: 'Continuous imagery, BPM-synchronised motion and momentary triggers form a playable Arena system; the performer decides density, interruption and release.',
    kindZh: '研究报告 / 现场系统',
    kindEn: 'Research report / live system'
  },
  {
    id: 'entropy-two-screen-2026',
    index: '02',
    title: 'ENTROPY — Atmospheric Escape',
    zh: '双屏幕视觉世界与现场预演',
    en: 'Two-screen visual world and live previsualisation',
    summaryZh: '从星图、航天器与科学终端语言出发，讨论超宽主屏、顶部屏幕及实时控制如何在同一个舞台空间协作。',
    summaryEn: 'Coordinating an ultra-wide main screen, ceiling screen and controllable visual states within one stage environment.',
    kindZh: '演出研究 / 空间系统',
    kindEn: 'Performance research / spatial system'
  },
  {
    id: 'performable-music',
    index: '03',
    title: 'Performable Music',
    zh: '可表演音乐与音画同源',
    en: 'Composed and playable music',
    summaryZh: '从创作意图、Ableton 编曲到实时音画演奏：研究音乐怎样既能编辑，也能被现场操作。',
    summaryEn: 'From compositional intention and Ableton arrangements to realtime audiovisual performance.',
    kindZh: '长期研究 / 创作方法',
    kindEn: 'Ongoing research / creative method'
  }
]

function Home() {
  const { language } = useLanguage()
  const zh = language === 'zh'
  return (
    <>
      <Header />
      <main className="release-home">
        <section className="release-opening" aria-labelledby="home-title">
          <div className="container release-opening-copy">
            <div className="release-overline">EWAN QIAN / 钱誉文 <span>MEDIA ART · LIVE AV · SPATIAL IMAGE</span></div>
            <h1 id="home-title">{zh ? '以空间为画布，\n以光影组织现场。' : 'Space as canvas.\nImage as performance.'}</h1>
            <p>{zh
              ? '现场音画、空间影像与实时系统。作品从屏幕延伸到舞台、建筑和可交互的数字环境。'
              : 'Live audiovisual work, spatial imagery and realtime systems across stages, architecture and interactive environments.'}</p>
            <div className="release-opening-actions">
              <a href="#selected-work">{zh ? '查看代表作品' : 'Selected projects'} <span aria-hidden="true">↓</span></a>
              <a href="#research">{zh ? '阅读研究' : 'Read research'} <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <a className="release-hero-image" href="/portfolio/works/drop-flow.html" aria-label={zh ? '打开 Drop Flow 作品' : 'Open Drop Flow project'}>
            <img src="/portfolio/assets/home/hero-dropflow-ufo-2025.webp" alt={zh ? 'Drop Flow 空间影像现场' : 'Drop Flow spatial image presentation'} fetchPriority="high" />
            <span className="release-image-caption">DROP FLOW <small>2025 / SELECTED VISUAL</small></span>
          </a>
        </section>
        <section id="selected-work" className="release-section release-selected container" aria-labelledby="selected-title">
          <div className="release-section-head">
            <div><span className="release-index">01 / WORK</span><h2 id="selected-title">{zh ? '代表作品' : 'Selected work'}</h2></div>
            <Link to="/works">{zh ? '查看全部项目' : 'All projects'} <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="release-project-grid">
            {projects.map((item, i) => (
              <article className="release-project" key={item.id}>
                <a className="release-project-image" href={item.url} aria-label={item.title}>
                  <img src={item.image} alt={item.title} loading="lazy" />
                </a>
                <div className="release-project-info">
                  <span className="release-project-number">{String(i + 1).padStart(2,'0')}</span>
                  <div>
                    <h3><a href={item.url}>{item.title}</a></h3>
                    <p>{zh ? item.contextZh : item.contextEn}</p>
                  </div>
                  <span className="release-project-role">{zh ? item.roleZh : item.roleEn}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="research" className="release-section release-research" aria-labelledby="research-title">
          <div className="container">
            <div className="release-section-head">
              <div><span className="release-index">02 / WRITING & SYSTEMS</span><h2 id="research-title">{zh ? '研究与写作' : 'Research & writing'}</h2></div>
              <Link to="/writing">{zh ? '全部文章' : 'All writing'} <span aria-hidden="true">↗</span></Link>
            </div>
            <p className="release-section-lead">{zh
              ? '不只展示最终画面。这里记录一套演出系统如何设计、控制、测试，并在现场成立。'
              : 'Beyond final images: how performance systems are designed, controlled, tested and made to work live.'}</p>
            <div className="release-research-grid">
              {research.map((item) => (
                <article key={item.id} className={item.index === '01' ? 'release-research-item release-research-primary' : 'release-research-item'}>
                  <div className="release-research-meta"><span>{item.index}</span><span>{zh ? item.kindZh : item.kindEn}</span></div>
                  <h3><Link to={`/writing/${item.id}`}>{item.title}</Link></h3>
                  <h4>{zh ? item.zh : item.en}</h4>
                  <p>{zh ? item.summaryZh : item.summaryEn}</p>
                  <Link className="release-read-link" to={`/writing/${item.id}`}>{zh ? '阅读完整报告' : 'Read the report'} <span aria-hidden="true">↗</span></Link>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="release-section release-footer-about">
          <div className="container release-about-grid">
            <div className="release-index">03 / ABOUT</div>
            <div>
              <p>{zh
                ? '钱誉文 / Ewan Qian。媒体艺术家与现场视觉创作者，关注音画交互、实时引擎及空间媒介的公共呈现。'
                : 'Ewan Qian is a media artist and live visual creator working with audiovisual interaction, realtime engines and spatial media.'}</p>
              <div className="release-about-links">
                <Link to="/profile">{zh ? '关于 / 履历' : 'Profile'}</Link>
                <Link to="/archive">{zh ? '项目归档' : 'Archive'}</Link>
                <Link to="/workshops">{zh ? '工作坊' : 'Workshops'}</Link>
                <a href="https://github.com/ewanqian" target="_blank" rel="noreferrer">GitHub</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home
