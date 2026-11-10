import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import TitanTracks from '../components/sections/TitanTracks'
import { useLanguage } from '../i18n/LanguageContext.jsx'
const facts={
 zh:[['项目','《机械光合：TITAN 的全息声林》'],['音乐 / 作曲','柏大辅 / KASHIWA Daisuke'],['钢琴 / 现场音乐','村田有希 / Yuki Murata'],['时间','2025.10.21'],['地点','BO LIVE 前海店 / 深圳'],['视觉范围','全息纱幕、裸眼 3D、雾气纵深、音画互动视觉']],
 en:[['Project',"Mechanical Photosynthesis: TITAN's Holographic Sound Forest"],['Music / Composition','KASHIWA Daisuke / 柏大辅'],['Piano / Live Music','Yuki Murata / 村田有希'],['Date','2025.10.21'],['Venue','BO LIVE Qianhai / Shenzhen'],['Visual Scope','Holographic scrim, naked-eye 3D, haze-based depth, audiovisual interaction']]
}
const credits={zh:[['音乐 / 作曲','柏大辅 / KASHIWA Daisuke'],['钢琴 / 现场音乐','村田有希 / Yuki Murata'],['现场视觉制作','钱誉文 / Ewan Qian'],['演出统筹','欧阳毅 / 雪山'],['展演策划','张秋童'],['技术总监','宽敬'],['灯光','王以玮'],['调音','天赐'],['技术支持','猪肉'],['舞台总监','韩俊谦'],['艺人执行','唐棣'],['媒体宣传','绵绵'],['场地运营','浪险 / 丫丫 / 洋葱']],en:[['Music / Composition','KASHIWA Daisuke'],['Piano / Live Music','Yuki Murata'],['Live Visual Production','Ewan Qian'],['Performance Coordination','欧阳毅 / 雪山'],['Curatorial Planning','张秋童'],['Technical Director','宽敬'],['Lighting','王以玮'],['Sound','天赐'],['Technical Support','猪肉'],['Stage Director','韩俊谦'],['Artist Liaison','唐棣'],['Media & Publicity','绵绵'],['Venue Operations','浪险 / 丫丫 / 洋葱']]}
const gallery=['featured-kashiwa-bolive-shenzhen.webp','featured-kashiwa-bolive-shenzhen-2.webp','featured-kashiwa-bolive-shenzhen-3.webp']
function FactTable({rows}){return <dl className="project-fact-table">{rows.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
export default function KashiwaTitan(){
 const {language}=useLanguage();const isZh=language==='zh'
 const base=window.location.pathname.startsWith('/portfolio')?'/portfolio':''
 return <><Header/><main className="project-page">
  <section className="project-hero-section"><div className="container project-hero-grid"><div className="project-hero-copy">
   <p className="eyebrow">{isZh?'现场音画视觉系统':'Live Audiovisual Visual System'}</p>
   <h1>{isZh?'柏大辅《TITAN》深圳 BO LIVE 专场':'KASHIWA Daisuke / TITAN — BO LIVE Shenzhen'}</h1>
   <p>{isZh?'围绕日本音乐人、作曲家柏大辅 / KASHIWA Daisuke《TITAN》展开的现场音画项目。钱誉文负责现场视觉制作，内容包含全息纱幕、裸眼 3D、雾气纵深与音画互动段落。':'A live audiovisual project centered on TITAN by Japanese musician and composer KASHIWA Daisuke. Ewan Qian was responsible for live visual production, including holographic scrims, naked-eye 3D, haze-based depth, and audiovisual interaction passages.'}</p>
   <a className="button" href={base+'/works/titan-tracks.html'}>{isZh?'逐曲视觉与原始画面':'Track visuals & original stills'} ↗</a>
  </div><figure className="project-hero-image"><img src={base+'/assets/home/featured-kashiwa-bolive-shenzhen-2.webp'} alt={isZh?'TITAN 深圳 BO LIVE 现场':'TITAN at BO LIVE Shenzhen'}/></figure></div></section>
  <section className="section"><div className="container project-two-column"><div><h2>{isZh?'项目信息':'Project Facts'}</h2><FactTable rows={facts[language]}/></div><div><h2>{isZh?'我的工作':'My Role'}</h2><p>{isZh?'视觉工作集中在屏幕空间、纱幕层次、雾气中的光线路径与声音触发的运动结构。音频分析、预渲染内容与现场控制共同组织不同曲目的节奏和空间。':'The visual work focused on screen space, scrim depth, light paths in haze, and motion structures driven by sound. Audio analysis, pre-rendered imagery and live control shape the rhythm and space of each musical passage.'}</p></div></div></section>
  <section className="section"><div className="container"><h2>{isZh?'现场画面':'Live Images'}</h2><div className="project-image-strip wide">{gallery.map((file,index)=><img key={file} src={base+'/assets/home/'+file} alt={isZh?`TITAN 现场画面 ${index+1}`:`TITAN live image ${index+1}`} loading="lazy"/>)}</div></div></section>
  <TitanTracks/>
  <section className="section"><div className="container project-two-column"><div><h2>{isZh?'视觉系统':'Visual System'}</h2><p>{isZh?'视觉语言围绕白空间深度、雾气、光线轨迹、环境过渡和沉浸错觉组织。部分段落由更强的音频结构触发，部分段落转向漂浮、缓慢与克制的空间状态。':'The visual language is organized around white-space depth, haze, light trajectories, environmental transitions, and immersive illusion. Some passages respond to stronger audio structures, while others move into slower, floating, and restrained spatial states.'}</p></div><div><h2>{isZh?'署名':'Credits'}</h2><FactTable rows={credits[language]}/></div></div></section>
  <section className="section"><div className="container"><h2>{isZh?'演出记录与制作笔记':'Documentation & Production Notes'}</h2><div className="project-link-list">
   <a href="https://www.bilibili.com/video/BV1wvZLBZEQS/" target="_blank" rel="noreferrer">Infrared — Bilibili</a>
   <a href="https://mp.weixin.qq.com/s/yNjtixkMIF5zXrl03DyU1g" target="_blank" rel="noreferrer">{isZh?'演出回顾':'Performance recap'}</a>
   <a href="https://mp.weixin.qq.com/s/Y5K6bm4jVqjb5uQn0KDJ9A" target="_blank" rel="noreferrer">{isZh?'演出文章':'Performance article'}</a>
   <a href="https://github.com/ewanqian/portfolio/blob/main/visual-arts/kashiwa-daisuke/Shenzhen-BO-LIVE-2025-TITAN/README.md" target="_blank" rel="noreferrer">{isZh?'制作方法与项目记录':'Production methods & project record'}</a>
  </div></div></section>
 </main><Footer/></>
}
