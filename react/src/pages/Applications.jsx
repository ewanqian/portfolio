import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import './Applications.css'

const APPLICATIONS = [
  {
    id:'hand-space-osc',name:'Hand / Space / OSC',
    category:'XR Interaction',kind:'Spatial Input / WebXR',
    type:'Research Instrument',number:'01',
    subtitleZh:'手部关节、空间区域与 OSC',subtitleEn:'Hand joints, spatial regions and OSC',
    summaryZh:'低面数手部骨架、逐关节角度、三维区域 ENTER / EXIT、WSS → OSC。Quest MR 优先。',
    summaryEn:'Fine joint skeleton, spatial enter/exit events and WSS-to-OSC. Quest passthrough first.',
    href:'https://ewanqian.github.io/performable-music/spatial-playground/hand-osc-lab/',
    github:'https://github.com/ewanqian/performable-music/tree/main/spatial-playground/hand-osc-lab',
    platform:'QUEST MR · AVP VR · DESKTOP',
    icon:'hand',tone:'lime',
    features:['25 JOINTS × 2','ZONE ENTER / EXIT','WSS → OSC'],
    test:'手指穿过空间控制区 → 区域事件 → OSC'
  },
  {
    id:'critical-field-xr',name:'Critical Field XR',
    category:'AV Performance',kind:'Spatial Audiovisual / WebXR',
    type:'Performance Playground',number:'02',
    subtitleZh:'四幕空间视听场景',subtitleEn:'Four-act immersive audiovisual space',
    summaryZh:'INITIAL CONDITION / FIELD / OVERRIDE / AFTERIMAGE。立体空间、Show Score、桌面与头显预览。',
    summaryEn:'Four spatial acts, shared Show Score, desktop preview and immersive headset view.',
    href:'https://ewanqian.github.io/performable-music/spatial-playground/',
    github:'https://github.com/ewanqian/performable-music/tree/main/spatial-playground',
    platform:'AVP VR · QUEST VR · DESKTOP',
    icon:'field',tone:'silver',
    features:['FOUR SCENES','SHOW SCORE','RECORD / REPLAY'],
    test:'进入空间 → 切换四幕 → 导出 Show Score'
  }
]
function Glyph({kind}){
  return <svg className="applications-glyph" viewBox="0 0 80 80" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round">
    {kind==='hand'? <><path d="M22 56L20 40Q20 37 23 36Q26 36 28 41L29 25Q29 21 32 21Q35 21 35 25L36 36L39 17Q40 14 43 15Q46 16 45 20L43 37L48 23Q50 20 53 22Q55 24 53 27L49 40L55 35Q58 33 60 36Q62 39 59 42L47 59L41 63L28 62Z"/><circle cx="24" cy="42" r="2.8"/><circle cx="32" cy="25" r="2.8"/><circle cx="43" cy="18" r="2.8"/><circle cx="52" cy="26" r="2.8"/><circle cx="57" cy="39" r="2.8"/><circle cx="42" cy="57" r="3"/><path strokeDasharray="2 4" d="M24 42L42 57L57 39L52 26L43 18L32 25L24 42"/><circle cx="57" cy="39" r="15" strokeDasharray="2 4" opacity=".5"/></>:<><ellipse cx="40" cy="40" rx="31" ry="13" transform="rotate(-28 40 40)"/><ellipse cx="40" cy="40" rx="31" ry="13" transform="rotate(25 40 40)"/><ellipse cx="40" cy="40" rx="28" ry="28"/><circle cx="40" cy="40" r="5" fill="currentColor" stroke="none"/><path d="M40 3V77M3 40H77" strokeDasharray="2 5" opacity=".6"/></>}
  </svg>
}
function ApplicationCard({app,zh}){
  return <article className={`application-card application-card--${app.tone}`}>
    <div className="application-card-top"><span>{app.number} / {app.category.toUpperCase()}</span><span className="application-type">{app.type}</span></div>
    <div className="application-icon"><Glyph kind={app.icon}/></div>
    <div className="application-body">
      <h2>{app.name}</h2>
      <p className="application-subtitle">{zh?app.subtitleZh:app.subtitleEn}</p>
      <p className="application-description">{zh?app.summaryZh:app.summaryEn}</p>
      <div className="application-tags">{app.features.map(f=><span key={f}>{f}</span>)}</div>
    </div>
    <div className="application-availability">{app.platform}</div>
    <div className="application-actions">
      <a className="application-launch" href={app.href} target="_blank" rel="noopener noreferrer">{zh?'打开应用 / Launch':'Open app / Launch'} <span aria-hidden="true">↗</span></a>
      <a className="application-source" href={app.github} target="_blank" rel="noopener noreferrer" aria-label={`Open source for ${app.name}`}>SOURCE ↗</a>
    </div>
  </article>
}
function Applications(){
  const {language}=useLanguage(),zh=language!=='en'
  const [query,setQuery]=useState('')
  const [category,setCategory]=useState('ALL')
  const filtered=useMemo(()=>APPLICATIONS.filter(a=>
    (category==='ALL'||a.category===category)&&
    [a.name,a.category,a.kind,a.subtitleZh,a.summaryZh,a.platform].join(' ').toLowerCase().includes(query.toLowerCase())
  ),[query,category])
  return <>
    <Header/>
    <main className="applications-page">
      <div className="applications-container">
        <div className="applications-nav"><Link to="/">{zh?'← 返回个人主页':'← Back to home'}</Link><span>EWAN QIAN / DIGITAL WORKSPACE</span></div>
        <header className="applications-hero">
          <div className="applications-eyebrow">PERSONAL RESEARCH SYSTEM / APPLICATION INDEX</div>
          <h1>Applications<span className="applications-period">.</span></h1>
          <p>{zh?'一个快速进入实时影像、XR 交互与可演奏音乐实验的应用目录。每个应用都直接打开可运行的测试页面，不复制工程、不混淆研究归属。':'A launchpad for live image, XR interaction and performable music experiments. Open runnable research tools without duplicating their source.'}</p>
          <div className="applications-count"><span className="applications-dot"></span>02 {zh?'个应用 / 持续迭代':'APPLICATIONS / IN DEVELOPMENT'}<span>WEBXR · SPATIAL INPUT · AUDIOVISUAL</span></div>
        </header>
        <div className="applications-toolbar">
          <div className="applications-filters" aria-label={zh?'应用分类':'App categories'}>
            {['ALL','XR Interaction','AV Performance'].map(c=><button type="button" key={c} aria-pressed={category===c} onClick={()=>setCategory(c)} className={category===c?'active':''}>{c==='ALL'?(zh?'全部 / All':'All'):c}</button>)}
          </div>
          <label className="applications-search"><span aria-hidden="true">⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} aria-label={zh?'搜索应用':'Search apps'} placeholder={zh?'查找应用 / Search':'Search applications'}/></label>
        </div>
        <div className="applications-grid">{filtered.map(app=><ApplicationCard key={app.id} app={app} zh={zh}/>)}</div>
        {!filtered.length&&<p className="applications-empty">{zh?'没有找到匹配的应用。':'No matching applications.'}</p>}
        <section className="applications-notes">
          <div><span className="applications-eyebrow">RESEARCH ARCHITECTURE</span><h2>{zh?'应用与研究归属':'Application ownership'}</h2></div>
          <div><p><strong>Hand / Space / OSC</strong> — XR Interaction / Spatial Input。{zh?'是通用的空间输入研究，可用于音乐、装置、舞台控制。':'A reusable spatial input system for music, installations and stage control.'}</p><p><strong>Critical Field XR</strong> — Audiovisual Performance / Spatial Instrument。{zh?'是上述输入技术在可演奏音乐中的一个应用场景。':'A performance use case for the same spatial interaction methods.'}</p><p className="applications-small">{zh?'目前源代码由 Performable Music 仓库管理，应用启动台只负责索引。是否可以进入透视 MR、读取关节和发送 OSC，取决于具体设备、浏览器权限以及本地桥接服务。':'Source currently remains in Performable Music. Device support and OSC delivery require actual headset permissions and a local secure bridge.'}</p></div>
        </section>
      </div>
    </main>
    <Footer/>
  </>
}
export default Applications
