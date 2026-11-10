import archive from '../../../../assets/data/titan-tracks.json'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import './TitanTracks.css'
export default function TitanTracks() {
 const {language}=useLanguage();const zh=language==='zh'
 const prefix=window.location.pathname.startsWith('/portfolio')?'/portfolio/':'/'
 const asset=file=>prefix+archive.asset_base+file
 return <section className="section titan-tracks" id="titan-tracks"><div className="container">
  <div className="titan-tracks-heading"><div><p className="eyebrow">TITAN / VISUAL ARCHIVE</p><h2 className="section-title">{zh?'逐曲视觉档案':'Track-by-track visuals'}</h2></div><a className="button" href={prefix+'works/titan-tracks.html'}>{zh?'独立浏览':'Open archive'} ↗</a></div>
  <p className="section-intro">{zh?'从 Lead 的金属构成到 Aurora 的光线结构，十个视觉单元组织出不同的节奏、密度与空间。':'From the metallic forms of Lead to the light structures of Aurora, ten visual studies explore distinct rhythms, densities and spaces.'}</p>
  <div className="titan-track-grid">{archive.tracks.map(track=><article className="titan-track" key={track.id} data-track-id={track.id}>
   <a href={asset(track.original||track.cover)} target="_blank" rel="noopener noreferrer"><img src={asset(track.preview)} alt={`${track.title} — ${zh?(track.original?'视觉画面':'曲目封面'):(track.original?'visual still':'track cover')}`} loading="lazy"/></a>
   <div className="titan-track-title"><span>{track.id}</span><h3>{track.title}</h3></div>
   <div className="titan-track-links">
    {track.original&&<a href={asset(track.original)} target="_blank" rel="noopener noreferrer">{zh?'原始画面':'Original still'} · {track.width} × {track.height} ↗</a>}
    <a href={asset(track.cover)} target="_blank" rel="noopener noreferrer">{zh?'曲目封面':'Track cover'} ↗</a>
    {track.mana&&<a href={track.mana} target="_blank" rel="noopener noreferrer">MANA ↗</a>}
    {track.bilibili&&<a href={track.bilibili} target="_blank" rel="noopener noreferrer">Bilibili ↗</a>}
    {track.related_video&&<a href={track.related_video} target="_blank" rel="noopener noreferrer">Phantom · CAN Festival ↗</a>}
   </div>
  </article>)}</div>
 </div></section>
}
