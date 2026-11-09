import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import './Applications.css'

const APPLICATIONS = [
  {
    id:'spellcraft-east',updatedAt:'2026-11-09T17:00:31+08:00',name:'Spellcraft Atelier · Chinese Fantasy',
    category:'XR Interaction',kind:'WebXR / Hand Pose / Symbolic Action',
    type:'Six Playable Spell Gestures',number:'S05',
    subtitleZh:'六种中国术师玩法：画符发遣、御剑、剑阵、五行、封印和七星',
    subtitleEn:'Six interactive Chinese-fantasy hand spells, not decorative trigrams',
    summaryZh:'六种真正可触发的施法机制：剑指画圈后再指发符、蓄力九剑齐射、双掌列阵、五行命中相克目标、手掌镇定与剑指封印、七星顺序连招。包含三维浮动靶、评分与即时反馈；Quest 3 手势实测待完成。',
    summaryEn:'Six playable mechanics: draw/launch talismans, nine sword volleys, bimanual sword circle, five-element target interactions, binding seals and seven-star paths. Real volumetric targets, hit scoring and hand gestures; Quest 3 QA pending.',
    href:'https://ewanqian.github.io/performable-music/spatial-playground/hand-osc-lab/spellcraft.html?line=east',
    github:'https://github.com/ewanqian/performable-music/tree/main/spatial-playground/hand-osc-lab',
    platform:'QUEST 3 MR · VR · DESKTOP',
    icon:'hand',tone:'silver',
    features:['6 PLAYABLE SPELLS','DRAW → RELEASE','BIMANUAL SWORD ARRAY','TARGET / SCORE'],
    test:'选择画符 → 剑指画圈 → 松开再剑指发射；切换御剑/阵法/五行/封印/七星并观察命中与分数'
  },
  {
    id:'spellcraft-west',updatedAt:'2026-11-09T17:00:31+08:00',name:'Spellcraft Atelier · European Fantasy',
    category:'XR Interaction',kind:'Hand Spell / Projectile / WebXR',
    type:'Six Playable Magic Studies',number:'S04',
    subtitleZh:'六种欧洲奇幻施法：火球、冰冻、雷链、护盾、引力与空间门',
    subtitleEn:'Six hand-cast fantasy spells with real projectile and target feedback',
    summaryZh:'从 VR 游戏中提炼可验证的手势→释放→命中循环：掌心蓄火投掷、剑指冰冻后碎裂、指向雷链、掌心格挡、握拳引力聚拢、画圈后穿门射击。可桌面模拟和 Quest MR 交互；实机帧率与误触尚未验收。',
    summaryEn:'Six interactive spell studies: palm fireball throw, frost-lattice shatter, chain lightning, active ward blocking, fist gravity attraction and draw-to-open rift portal. Targets, scoring and spatial hand input; headset QA pending.',
    href:'https://ewanqian.github.io/performable-music/spatial-playground/hand-osc-lab/spellcraft.html?line=west',
    github:'https://github.com/ewanqian/performable-music/tree/main/spatial-playground/hand-osc-lab',
    platform:'QUEST 3 MR · VR · DESKTOP',
    icon:'field',tone:'silver',
    features:['6 SPELLS / LIVE TARGETS','PALM THROW / SHIELD','CHAIN LIGHTNING','DRAW RIFT'],
    test:'选择火球 → 张掌蓄能 → 握拳投出；切换冰/雷/盾/引力/空间门，并观察积分反馈'
  },
  {
    id:'gesture-dynamics',updatedAt:'2026-11-09T17:32:54+08:00',name:'Gesture Dynamics · Spatial Particles',
    category:'XR Interaction',kind:'Hand Gesture / Particle Physics / WebXR',
    type:'Quest 3 MR Prototype',number:'S03',
    subtitleZh:'挥手生灵气，握拳蓄能，剑指连续喷射紊流，张掌爆散',
    subtitleEn:'Sweep to gather energy, clench to charge, point to stream and open to burst',
    summaryZh:'V3 连续粒子流：快速挥手产生灵气拖尾并积累动能；任一手握拳吸附散落能量、持续蓄力；剑指从指尖连续喷射，蓄力越久爆发越强。张掌一次性爆散。1536 个上限的三维运动粒子、速度拖尾、涡旋力场、喷流/条带/紊流三模式；Quest 3 实机手势与帧率待验证。',
    summaryEn:'V3 continuous 3D energy flow: hand sweep leaves kinetic trails, either fist collects and charges energy, a sword pose emits a live jet with charge-scaled discharge, and open palm triggers an outward burst. Bounded 1536-particle simulation, velocity streaks and jet/ribbon/vortex modes. Quest 3 device QA pending.',
    href:'https://ewanqian.github.io/performable-music/spatial-playground/hand-osc-lab/gesture-dynamics.html',
    github:'https://github.com/ewanqian/performable-music/tree/main/spatial-playground/hand-osc-lab',
    platform:'QUEST 3 MR · VR · DESKTOP',
    icon:'field',tone:'silver',
    features:['CONTINUOUS ENERGY JET','FIST → CHARGE → SWORD','CURL FLOW / RIBBON / VORTEX','QUEST MR'],
    test:'桌面移动鼠标挥手 → 3 握拳蓄力 2 秒 → 1 剑指连续喷射 → 2 张掌爆散；切换喷流/条带/紊流。Quest Browser MR 需核查 25 关节指向与帧率'
  },
  {
    id:'spatial-waves-01',updatedAt:'2026-11-08T23:26:00+08:00',name:'Spatial Waves · 3D Sound Instrument',
    category:'AV Performance',kind:'Volumetric Hand Instrument / HRTF',
    type:'Spatial Performance Candidate',number:'S01',
    subtitleZh:'四个真正三维的声音体积与可演奏的双手场',
    subtitleEn:'Four real XYZ sound volumes, playable with both hands',
    summaryZh:'将 touch:waves 的动作—声音—视觉即时反馈转成独立的三维乐器：四个不同深度的声音体积、手指进入／退出、双手拉伸和四路 HRTF 空间声源；可导入本人拥有权利的四路等长音轨。WebAudio 时钟驱动 100 BPM 节奏；Quest 实机声像仍需验证。',
    summaryEn:'A spatial instrument with four genuine XYZ interaction volumes, XR index fingertip contact, dual-hand spread, independent HRTF PannerNodes, synchronized user-owned audio stems and an original 100 BPM sketch. Headset perceptual QA pending.',
    href:'https://ewanqian.github.io/performable-music/spatial-playground/hand-osc-lab/spatial-waves.html',
    github:'https://github.com/ewanqian/performable-music/tree/main/spatial-playground/hand-osc-lab',
    platform:'QUEST MR · DESKTOP · IPAD',
    icon:'hand',tone:'lime',
    features:['4 TRUE XYZ VOLUMES','HRTF SPATIAL AUDIO','IMPORT 4 STEMS','100 BPM'],
    test:'点击四个声音体积 → 启用空间音频 → 导入等长分轨 → 进入 Quest 用真实食指穿越三维场'
  },
  {
    id:'neural-field-01',updatedAt:'2026-11-08T23:17:54+08:00',name:'Neural Field · Spatial Brain AV',
    category:'AV Performance',kind:'Schematic Cortex / Synthetic Signal / WebXR',
    type:'Brain-Signal Themed Stage Study',number:'S02',
    subtitleZh:'四种脑结构观察模式与手势视听演奏',
    subtitleEn:'Four schematic brain layers controlled as an audiovisual instrument',
    summaryZh:'结构、剖面、电极示意和信号场四模式，复用 25 关节 XR 输入；捏合选择脑区，双手距离调节空间，内置 60 秒演出提示与本地合成声音。明确标注 SYNTHETIC：不是实测 EEG、MRI 模型或临床分析。',
    summaryEn:'Four legible modes—structure, section, illustrative sensors and synthetic signal—using existing WebXR hand inputs, a 60-second stage cue sketch and local audio. No EEG hardware or medical reconstruction claimed.',
    href:'https://ewanqian.github.io/performable-music/spatial-playground/hand-osc-lab/neural.html',
    github:'https://github.com/ewanqian/performable-music/tree/main/spatial-playground/hand-osc-lab',
    platform:'QUEST MR · DESKTOP',
    icon:'field',tone:'silver',
    features:['4 SPATIAL MODES','SYNTHETIC · NOT EEG','PINCH + SPREAD','60s CUE'],
    test:'切换 STRUCTURE / SECTION / ELECTRODES / SIGNAL → 手势聚焦 → 录制 60 秒合成信号声画演奏'
  },
  {
    id:'xr-cast',updatedAt:'2026-11-08T22:46:15+08:00',name:'XR Cast · 星宿场',
    category:'AV Performance',kind:'WebXR / Spatial Audio / Symbolic Field',
    type:'One-Take XR Experience',number:'01',
    subtitleZh:'戴上就玩：十二辰、五行、二十八宿与四声部',
    subtitleEn:'Put it on and play: twelve branches, five elements, 28 mansions and four voices',
    summaryZh:'一次进入，声音自动开始。左手十二辰标签沿环形排布并带引导线，右手五行与八卦，四周是二十八宿文字星环，前方是四声部圆环和一张手部图示。不需要再点“开启音频”。',
    summaryEn:'One entry, audio starts by itself. Ring-laid labels with leader lines on the left hand, five elements and trigrams on the right, a text-only 28-mansion ring, four voice pads and a drawn hand diagram in front.',
    href:'https://ewanqian.github.io/performable-music/spatial-playground/hand-osc-lab/xr-cast.html',
    github:'https://github.com/ewanqian/performable-music/tree/main/spatial-playground/hand-osc-lab',
    platform:'QUEST MR · AVP VR · DESKTOP',
    icon:'field',tone:'lime',
    features:['ONE-CLICK ENTER','AUTO AUDIO','RING LABEL LAYOUT','4 VOICES'],
    test:'戴头显 → 按一次进入 → 声音自动开始 → 手指穿过四声部圆环 → 拇指掐十二辰'
  },
  {
    id:'neuro-field',updatedAt:'2026-11-08T22:11:18+08:00',name:'Neuro Field · 脑电信号场',
    category:'AV Performance',kind:'Procedural Brain / Spike Audio / WebXR',
    type:'Spatial Data Instrument',number:'02',
    subtitleZh:'程序化脑结构与电信号，用手去刺激它',
    subtitleEn:'A procedural brain whose spikes you play with your hands',
    summaryZh:'2200 个程序化神经元与 3228 条连接，电信号沿网络传播，每个脉冲都是一个声音。桌面点击刺激，头显里捏合在指尖位置注入能量。不是医学影像，是可演奏的数据场。',
    summaryEn:'2200 procedural neurons and 3228 edges; spikes propagate and each one becomes a short tone. Click to stimulate on desktop, pinch to inject energy in XR. Not medical imaging: a playable data field.',
    href:'https://ewanqian.github.io/performable-music/spatial-playground/hand-osc-lab/neuro-field.html',
    github:'https://github.com/ewanqian/performable-music/tree/main/spatial-playground/hand-osc-lab',
    platform:'QUEST MR · DESKTOP',
    icon:'field',tone:'silver',
    features:['2200 NEURONS','SPIKE → SOUND','PINCH STIMULUS'],
    test:'点击或捏合 → 局部能量升高 → 脉冲沿连接扩散 → 声音密度上升'
  },
  {
    id:'hand-space-osc',updatedAt:'2026-11-05T05:50:28+08:00',name:'Hand / Space / OSC',
    category:'XR Interaction',kind:'Spatial Input / WebXR',
    type:'Research Instrument',number:'03',
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
    id:'organic-fields',updatedAt:'2026-11-08T04:36:40+08:00',name:'Organic Fields · Three Instruments',
    category:'AV Performance',kind:'Gesture Score / Web Audio / WebXR',
    type:'Playable Music Maps',number:'04',
    subtitleZh:'在空间中画八字，演奏三种原创声场',subtitleEn:'Draw paths through three original sound worlds',
    summaryZh:'从 iPad PlayGround 的触控演奏逻辑出发，提供器物打击、工业电子、程序化交响三个音乐地图；支持鼠标拖动、多指划动、Quest 手部输入与可选 OSC。',
    summaryEn:'PlayGround-style spatial sound maps: synthesized cookware, industrial electronic percussion and orchestral phrases. Play with mouse, multi-touch or Quest tracked fingertips.',
    href:'https://ewanqian.github.io/performable-music/spatial-playground/hand-osc-lab/playground.html',
    github:'https://github.com/ewanqian/performable-music/tree/main/spatial-playground/hand-osc-lab',
    platform:'IPAD · DESKTOP · QUEST MR',
    icon:'field',tone:'silver',
    features:['3 SOUND WORLDS','SWIPE / ∞ PATH','WEB AUDIO · OSC'],
    test:'滑动穿过器物区域 → 切换 Metal / Electro / Orchestra → 八字演奏'
  },
  {
    id:'hand-synth-v2',updatedAt:'2026-11-08T04:50:44+08:00',name:'Hand / Synth / Space V2',
    category:'AV Performance',kind:'Gesture Synth / Web Audio / OSC',
    type:'Performance Instrument',number:'05',
    subtitleZh:'双手手势驱动的实时合成器',subtitleEn:'A continuous synthesizer controlled by both hands',
    summaryZh:'保留 25 关节实时追踪，增加双手捏合、指节触碰、区域进出、滤波与延迟反馈；100 BPM 量化与 OSC 可选。不是空中钢琴。',
    summaryEn:'Original 25-joint tracking plus bimanual gestures, finger-to-joint contact, zone crossing, continuous filter/delay control and optional 100 BPM quantized OSC.',
    href:'https://ewanqian.github.io/performable-music/spatial-playground/hand-osc-lab/instrument.html',
    github:'https://github.com/ewanqian/performable-music/tree/main/spatial-playground/hand-osc-lab',
    platform:'QUEST MR · AVP VR · DESKTOP',
    icon:'hand',tone:'lime',
    features:['WEB AUDIO SYNTH','BIMANUAL GESTURES','BPM / OSC'],
    test:'捏合持续控制滤波和音色 → 双手 HOLD → 区域 ENTER / EXIT 触发音效'
  },
  {
    id:'spatial-studies-05',updatedAt:'2026-11-08T14:10:19+08:00',name:'Spatial Instrument Studies · 05',
    category:'AV Performance',kind:'Score / Tone.js / Spatial Pads',
    type:'Three Research Instruments',number:'06',
    subtitleZh:'四个可触控的伴奏声部与精细网页合成器',
    subtitleEn:'Touchable spatial score pads and advanced web synthesis',
    summaryZh:'四路伴奏现在有真正可触控的 PULSE / METAL / SHIMMER / DRONE 声音区域、即时声部触发与混音控制；还包括 Tone.js FM/AM 效果链。指节模拟器已经拆到独立页面。',
    summaryEn:'Four touchable score lanes with sonic accents, dynamic layer mixing, optional user audio stems and Tone.js FM/AM patches. Phalanx simulator is now a separate application.',
    href:'https://ewanqian.github.io/performable-music/spatial-playground/hand-osc-lab/studies.html?lab=score',
    github:'https://github.com/ewanqian/performable-music/tree/main/spatial-playground/hand-osc-lab',
    platform:'DESKTOP · IPAD · QUEST MR',
    icon:'field',tone:'lime',
    features:['4 REAL SOUND PADS','SCORE / STEMS','TONE FX'],
    test:'点击 PLAY ARRANGEMENT → 穿越四个声音圆圈 → 增加各层节奏 / 调节混音'
  },
  {
    id:'phalanx-approach',updatedAt:'2026-11-08T14:10:19+08:00',name:'Phalanx Approach · Three Strategies',
    category:'XR Interaction',kind:'Hand Contact / Threshold Research',
    type:'Strategy Comparison',number:'07',
    subtitleZh:'同一动作，三种指节判定策略对比',
    subtitleEn:'Three contact strategies compared on one gesture',
    summaryZh:'11 个目标（6 指节 + 4 指尖 + 掌心），重叠会同时触发，强度是渐变的而不是开关；并提供最近优先、按指长缩放、接近速度三种策略对比，失败原因逐条显示。',
    summaryEn:'Nearest-joint, reach-scaled and closing-velocity strategies side by side, with per-joint millimetre distance, threshold, dwell progress and an explicit rejection reason.',
    href:'https://ewanqian.github.io/performable-music/spatial-playground/hand-osc-lab/phalanx-approach.html',
    github:'https://github.com/ewanqian/performable-music/tree/main/spatial-playground/hand-osc-lab',
    platform:'DESKTOP · IPAD · QUEST MR',
    icon:'hand',tone:'lime',
    features:['3 STRATEGIES','MM / DWELL / REASON','AMBIGUITY GUARD'],
    test:'拖动拇指接近指节 → 切换三种策略 → 观察阈值与失败原因变化'
  },
  {
    id:'hand-seal-trainer',updatedAt:'2026-11-08T13:41:25+08:00',name:'Hand Seal Trainer · 掌诀训练器',
    category:'XR Interaction',kind:'Hand Joint / Cultural Gesture Learning',
    type:'Guided Hand Practice',number:'08',
    subtitleZh:'十二辰掌中认位与剑指姿势教学',
    subtitleEn:'Twelve-branch palm map and guided sword-finger pose training',
    summaryZh:'在现有 25 关节 WebXR 手部骨架上渲染宋体十二辰标签，检测拇指掐位、停留与松开；支持单手校准（导出的校准文件可跨设备复用）、十二辰顺序跟练、剑指五项姿势纠错，以及可打印的十二辰对照卡。',
    summaryEn:'CJK labels anchored to 25 WebXR hand joints, thumb-to-point contact and dwell detection, guided twelve-branch practice, explainable sword-finger pose coaching and six source-attributed Thunder Seal reading cards.',
    href:'https://ewanqian.github.io/performable-music/spatial-playground/hand-osc-lab/handseal-trainer.html',
    github:'https://github.com/ewanqian/performable-music/tree/main/spatial-playground/hand-osc-lab',
    platform:'QUEST MR · AVP VR · DESKTOP',
    icon:'hand',tone:'silver',
    features:['12 SERIF JOINT LABELS','ONE-HAND CALIBRATION','PRINTABLE CARD'],
    test:'拇指逐位掐点 → 十二辰跟练 → 剑指姿势纠错 → 雷诀文献对照'
  },
  {
    id:'gestural-atlas-perform',updatedAt:'2026-11-08T11:49:03+08:00',name:'Gestural Atlas · Performance',
    category:'AV Performance',kind:'Hand Gesture / Musical Expression',
    type:'Four Music Instruments',number:'09',
    subtitleZh:'四种可演奏的手部动作语法',subtitleEn:'Four musical hand-gesture interaction studies',
    summaryZh:'持续捏合合成器、双手距离与相位、八字路径记谱、六指节音序。以可演奏性和声画表现为目标，与传统文化图谱分开研究。',
    summaryEn:'Sustained hand-controlled synth, bimanual phase/spacing, figure-eight score and six-phalanx sequencer. Music-only research, separate from cultural interpretation.',
    href:'https://ewanqian.github.io/performable-music/spatial-playground/hand-osc-lab/atlas-music.html',
    github:'https://github.com/ewanqian/performable-music/tree/main/spatial-playground/hand-osc-lab',
    platform:'DESKTOP · IPAD · QUEST MR',
    icon:'hand',tone:'lime',
    features:['4 PLAY METHODS','BIMANUAL + TRACE','WEB AUDIO · OSC'],
    test:'捏合演奏 → 双手相位 → 画八字 → 触碰指节构成乐句'
  },
  {
    id:'gestural-atlas-culture',updatedAt:'2026-11-08T11:49:03+08:00',name:'Gestural Atlas · Cultural Symbols',
    category:'XR Interaction',kind:'Cinematic Choreography / Cultural Research',
    type:'Four Symbolic Interaction Studies',number:'10',
    subtitleZh:'剑诀、河图洛书、八卦和北斗星图',
    subtitleEn:'Sword fingers, Hetu-Luoshu, Bagua and seven-star routes',
    summaryZh:'参考林正英港式灵幻电影的动作与场景编排，结合有文献依据的剑诀、洛书九宫、河图数对、六爻和七星名称，转译为独立的现代交互页面。不复原法事。',
    summaryEn:'Film choreography and documented cultural diagrams reinterpreted as interactive gesture systems, not ritual reenactments. Sword-form drawing, numeric grids, hexagram combinations and star routes.',
    href:'https://ewanqian.github.io/performable-music/spatial-playground/hand-osc-lab/atlas-culture.html',
    github:'https://github.com/ewanqian/performable-music/tree/main/spatial-playground/hand-osc-lab',
    platform:'DESKTOP · IPAD · QUEST MR',
    icon:'field',tone:'silver',
    features:['SWORD FORM','HETU / BAGUA','SEVEN-STAR MAP'],
    test:'剑诀姿态 → 自创轨迹符形；九宫十五 → 六爻组合 → 七星连线'
  },
  {
    id:'critical-field-xr',updatedAt:'2026-11-05T04:48:03+08:00',name:'Critical Field XR',
    category:'AV Performance',kind:'Spatial Audiovisual / WebXR',
    type:'Performance Playground',number:'11',
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
    <div className="application-card-top"><span>{app.number} / {app.category.toUpperCase()}</span><time className="application-updated" dateTime={app.updatedAt} title="Source application last updated (Asia/Shanghai)">{zh?'更新':'UPDATED'} {app.updatedAt.slice(0,16).replace('T',' ')}</time></div>
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
  const [density,setDensity]=useState(4)
  const filtered=useMemo(()=>APPLICATIONS.filter(a=>
    (category==='ALL'||a.category===category)&&
    [a.name,a.category,a.kind,a.subtitleZh,a.summaryZh,a.platform].join(' ').toLowerCase().includes(query.toLowerCase())
  ).sort((a,b)=>Date.parse(b.updatedAt)-Date.parse(a.updatedAt)),[query,category])
  return <>
    <Header/>
    <main className="applications-page">
      <div className="applications-container">
        <div className="applications-nav"><Link to="/">{zh?'← 返回个人主页':'← Back to home'}</Link><span>EWAN QIAN / DIGITAL WORKSPACE</span></div>
        <header className="applications-hero">
          <div className="applications-eyebrow">PERSONAL RESEARCH SYSTEM / APPLICATION INDEX</div>
          <h1>Applications<span className="applications-period">.</span></h1>
          <p>{zh?'一个快速进入实时影像、XR 交互与可演奏音乐实验的应用目录。每个应用都直接打开可运行的测试页面，不复制工程、不混淆研究归属。 按各应用的源代码最后更新日期倒序排列。':'A launchpad for live image, XR interaction and performable music experiments. Open runnable research tools without duplicating their source. Sorted by the latest source update of each app.'}</p>
          <div className="applications-count"><span className="applications-dot"></span>{String(APPLICATIONS.length).padStart(2,'0')} {zh?'个应用 / 持续迭代':'APPLICATIONS / IN DEVELOPMENT'}<span>WEBXR · SPATIAL INPUT · AUDIOVISUAL</span></div>
        </header>
        <div className="applications-toolbar">
          <span className="applications-sort-label">{zh?'最近更新优先 ↓':'LATEST UPDATE FIRST ↓'}</span>
          <div className="applications-filters" aria-label={zh?'应用分类':'App categories'}>
            {['ALL','XR Interaction','AV Performance'].map(c=><button type="button" key={c} aria-pressed={category===c} onClick={()=>setCategory(c)} className={category===c?'active':''}>{c==='ALL'?(zh?'全部 / All':'All'):c}</button>)}
          </div>
          <label className="applications-search"><span aria-hidden="true">⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} aria-label={zh?'搜索应用':'Search apps'} placeholder={zh?'查找应用 / Search':'Search applications'}/></label>
          <div className="applications-density" role="group" aria-label={zh?'每行数量':'Columns per row'}>
            <span>{zh?'每行':'COLS'}</span>
            {[4,5,6].map(n=><button type="button" key={n} aria-pressed={density===n} className={density===n?'active':''} onClick={()=>setDensity(n)}>{n}</button>)}
          </div>
        </div>
        <div className="applications-grid" data-density={density}>{filtered.map(app=><ApplicationCard key={app.id} app={app} zh={zh}/>)}</div>
        {!filtered.length&&<p className="applications-empty">{zh?'没有找到匹配的应用。':'No matching applications.'}</p>}
        <section className="applications-notes">
          <div><span className="applications-eyebrow">RESEARCH ARCHITECTURE</span><h2>{zh?'应用与研究归属':'Application ownership'}</h2></div>
          <div><p><strong>Hand / Space / OSC</strong> — XR Interaction / Spatial Input。{zh?'是通用的空间输入研究，可用于音乐、装置、舞台控制。':'A reusable spatial input system for music, installations and stage control.'}</p><p><strong>Hand / Synth / Space V2</strong> — Gesture Synth / Web Audio。{zh?'保留原始传感器实验，加入实时合成、双手手势、轻量反馈与可选 OSC，不宣称已完成实机验收。':'Preserves the original sensor lab while adding continuous synthesis, bimanual gestures, light FX and optional OSC; hardware QA remains open.'}</p><p><strong>Organic Fields</strong> — Spatial Gesture Scores / Performable Music。{zh?'三种原创音色和图形空间演奏，不复用已停更 iPad App 的音色包；实机 Quest 延迟仍须验证。':'Three new sound worlds and gesture-based music maps, without reproducing the historic iPad app audio packs; headset latency remains unverified.'}</p><p><strong>Spatial Instrument Studies 05</strong> — Score / Studio / Tone.js / Sigil。{zh?'展示从原始手部输入到伴奏组织、声音塑形与指节序列的三个完整可测试方向；正式 Strudel 双向同步与硬件音频验收尚未完成。':'Three testable directions: arrangement, synthesis and phalanx-coded gestures. Bidirectional Strudel sync and real hardware audio QA are still open.'}</p><p><strong>Gestural Atlas / Performance</strong> — {zh?'四种音画演奏手势，以可演奏性为主要验收目标。':'Four musical gestures evaluated for expressive performance.'}</p>
<p><strong>Gestural Atlas / Cultural Symbols</strong> — {zh?'港式灵幻电影动作与传统数字图式的当代交互研究；区分史料、电影表达与原创设计。':'Cinematic gesture research and interpreted traditional diagrams, with separate source provenance.'}</p>
<p><strong>Critical Field XR</strong> — Audiovisual Performance / Spatial Instrument。{zh?'是上述输入技术在可演奏音乐中的一个应用场景。':'A performance use case for the same spatial interaction methods.'}</p><p className="applications-small">{zh?'目前源代码由 Performable Music 仓库管理，应用启动台只负责索引。是否可以进入透视 MR、读取关节和发送 OSC，取决于具体设备、浏览器权限以及本地桥接服务。':'Source currently remains in Performable Music. Device support and OSC delivery require actual headset permissions and a local secure bridge.'}</p></div>
        </section>
      </div>
    </main>
    <Footer/>
  </>
}
export default Applications
