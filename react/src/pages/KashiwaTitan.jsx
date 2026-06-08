import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer'

const dockItems = [
  { label: '首页', to: '/' },
  { label: '画廊', to: '/works' },
  { label: '制作', to: '/production' },
  { label: '空间', to: '/gaussian-scenes' },
  { label: '写作', to: '/writing' },
  { label: '个人', to: '/profile' },
  { label: '归档', to: '/archive' }
]

const facts = [
  ['项目', '《机械光合：TITAN 的全息声林》'],
  ['音乐 / 作曲', '柏大辅 / KASHIWA Daisuke'],
  ['钢琴 / 现场音乐', '村田有希 / Yuki Murata'],
  ['时间', '2025/10/21'],
  ['地点', 'BO LIVE 前海店 / 深圳'],
  ['视觉范围', '全息纱幕、裸眼 3D、雾气纵深、音画互动段落']
]

const visualSystem = [
  {
    title: '折角纱幕 + 冰屏',
    text: '近侧折角纱幕负责贴近身体的投影层，远侧冰屏提供高亮补光和纵深延伸，两层共同构成现场空间。'
  },
  {
    title: '雾气中的光线路径',
    text: '雾气让光束、线框和粒子路径变成可见的空间材料，形成“全息声林”的层次，而不是单一平面影像。'
  },
  {
    title: '混合渲染策略',
    text: '以音频分析驱动、实时响应和预渲染框架共同工作，稳定长时段演出，同时保留钢琴与电子段落的现场呼吸。'
  }
]

const credits = [
  {
    title: '音乐与演出',
    rows: [
      ['音乐 / 作曲', '柏大辅 / KASHIWA Daisuke'],
      ['钢琴 / 现场音乐', '村田有希 / Yuki Murata']
    ]
  },
  {
    title: '我的工作',
    rows: [
      ['现场视觉制作', '钱誉文 / Ewan Qian'],
      ['视觉范围', '全息纱幕、裸眼 3D、雾气纵深、音画互动段落']
    ]
  },
  {
    title: '项目支持与现场制作',
    rows: [
      ['展演策划', '张秋童 Vickie'],
      ['演出统筹', '欧阳毅、雪山'],
      ['技术总监', '宽敬'],
      ['灯光师', '王以玮'],
      ['调音师', '天赐'],
      ['技术支持', '猪肉'],
      ['舞台总监', '韩俊谦'],
      ['艺人执行', '唐棣'],
      ['媒体宣传', '绵绵'],
      ['场地运营', '浪险、丫丫、洋葱']
    ]
  }
]

const trackGenes = [
  ['01 Lead', '不断生成的金属块体，通过光的节奏运动，螺旋旋转', '视觉欺骗建构空间感'],
  ['02 Green', '计算机生成的持续流动，金字塔结构的绵延感', '连续流动与结构延展'],
  ['03 Haze', '强烈的节奏打击感，动与静的鲜明对比，点与线连接', '配合雾气形成裸眼 3D 效果'],
  ['04 Infrared', '三维构成、点阵视觉、圆体切片伸缩与拆分', '无限循环的线连接'],
  ['05 Whitenight', '悬浮、发光、空间扩散与缓慢过渡', '白色氛围与爆发力粒子流'],
  ['06 Amb', '高氛围 ambient 视觉方向，远离激进音频分析', '漂浮、治愈、近乎超然的状态'],
  ['07 Rose', '深红色螺旋几何结构', '激烈的暗红色状态'],
  ['08 Titan', '与 TITAN 氛围相连的核心视听段落', '空间压力、深度错觉与声音建筑'],
  ['09 Phantom', '强光照射点阵矩阵', '在四个象限中游走的生成式视觉'],
  ['10 Aurora', '像极光一样的优雅曲线', '不断生成、螺旋上升的音频检测内容']
]

const publicLinks = [
  ['演出回顾', 'https://mp.weixin.qq.com/s/yNjtixkMIF5zXrl03DyU1g'],
  ['展演专场介绍', 'https://mp.weixin.qq.com/s/Y5K6bm4jVqjb5uQn0KDJ9A'],
  ['01 Lead', 'https://www.manamana.net/video/detail?id=2831761#!zh'],
  ['05 Whitenight', 'https://www.manamana.net/video/detail?id=2831703#!zh'],
  ['06 Amb', 'https://www.manamana.net/video/detail?id=2831826#!zh'],
  ['08 Titan', 'https://www.manamana.net/video/detail?id=2831892#!zh']
]

const gallery = [
  '/portfolio/assets/case-optimized/kashiwa-bolive-1800.webp',
  '/portfolio/assets/home/featured-kashiwa-bolive-shenzhen-2.jpeg',
  '/portfolio/assets/home/featured-kashiwa-bolive-shenzhen-3.jpeg',
  '/portfolio/assets/raw-picks/titan-bolive-clean-16x9.jpg'
]

function KashiwaTitan() {
  return (
    <>
      <main className="case-page kashiwa-case">
        <nav className="frontstage-dock case-dock" aria-label="项目导航">
          {dockItems.map((item) => (
            <Link to={item.to} key={item.label}>{item.label}</Link>
          ))}
        </nav>

        <section className="case-hero">
          <div className="case-hero-media">
            <img src="/portfolio/assets/case-optimized/kashiwa-bolive-1800.webp" alt="KASHIWA Daisuke TITAN visual system" />
          </div>
          <div className="case-hero-copy">
            <span>Live Audiovisual Visual System</span>
            <h1>柏大辅《TITAN》</h1>
            <p>
              深圳 BO LIVE 专场。围绕日本音乐人、作曲家柏大辅 / KASHIWA Daisuke《TITAN》展开的现场音画项目。
              钱誉文负责现场视觉制作，内容包含全息纱幕、裸眼 3D、雾气纵深与音画互动段落。
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
          <strong>音乐语境</strong>
          <strong>空间装置</strong>
          <strong>曲目基因</strong>
          <strong>制作署名</strong>
        </section>

        <section className="case-reading">
          <div>
            <span>Role</span>
            <h2>把音乐现场转译为空间屏幕、雾气和声画结构</h2>
          </div>
          <p>
            这条合作线的重点不是把画面作为背景播放，而是让视觉参与现场空间的组织。
            项目围绕纱幕、雾气、线框结构、裸眼 3D 和声音段落建立观看层次，使柏大辅作品中的冷静、明亮和机械感进入真实演出环境。
            页面保留清晰署名：音乐与作品主体为柏大辅 / KASHIWA Daisuke，村田有希 / Yuki Murata 负责钢琴与现场音乐，钱誉文承担现场视觉制作。
          </p>
        </section>

        <section className="case-structure" aria-label="视觉系统">
          {visualSystem.map((item) => (
            <article key={item.title}>
              <span>{item.title}</span>
              <p>{item.text}</p>
            </article>
          ))}
        </section>

        <section className="case-reading">
          <div>
            <span>Visual Gene</span>
            <h2>十个曲目段落对应不同的空间与运动状态</h2>
          </div>
          <p>
            原始档案中最重要的信息不是“只有一张好看的现场图”，而是一套围绕音乐段落建立的视觉基因表。
            这里保留每首曲目的核心视觉方向，避免新版页面只剩概念口号，丢失真正的制作结构。
          </p>
        </section>

        <section className="case-track-grid" aria-label="曲目视觉基因">
          {trackGenes.map(([track, gene, space]) => (
            <article key={track}>
              <span>{track}</span>
              <strong>{gene}</strong>
              <p>{space}</p>
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
            <span>Credits</span>
            <h2>制作署名</h2>
          </div>
          <div className="case-credit-columns">
            {credits.map((group) => (
              <article key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.rows.map(([label, value]) => (
                    <li key={label}>
                      <strong>{label}</strong>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="case-method">
          <div>
            <span>Links</span>
            <h2>外部链接与精选曲目</h2>
          </div>
          <ul>
            {publicLinks.map(([label, href]) => (
              <li key={label}>
                <strong>{label}</strong>
                <a href={href} target="_blank" rel="noreferrer">{href}</a>
              </li>
            ))}
          </ul>
        </section>

        <section className="case-next" aria-label="继续观看">
          <Link to="/production">
            <span>制作范围</span>
            <strong>现场视觉与交付</strong>
          </Link>
          <Link to="/projects/rain-singapore">
            <span>舞台大屏</span>
            <strong>Rain / Singland</strong>
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

export default KashiwaTitan
