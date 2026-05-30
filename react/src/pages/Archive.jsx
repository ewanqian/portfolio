import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import works from '../data/generated/works'
import nodes from '../data/generated/nodes'
import { getDisplayImage, getNodeTargetUrl, getWorkTargetUrl, sortNodesForArchive, sortWorksForArchive } from '../data/siteDisplay'
import { productionWorkIds } from '../data/siteTaxonomy'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { localizeNode, localizeWork } from '../i18n/content.js'

const backlogRows = [
  ['2025', 'future-string-tianhua-2025', '中央音乐学院王楚婷博士毕业音乐会', 'Audiovisual 新媒体视觉制作', '北京 / 音乐会'],
  ['2025', 'wavefilm-hackathon-staff-2025', '海浪电影周艺动 AI 电影黑客松', '活动执行', '阿那亚 / 黑客松'],
  ['2025', 'westbund-ambient-visual-2025', '上海西岸漩心', '环境视觉', '上海西岸 / 展览'],
  ['2025', 'flatland-mr-content-2025', 'WWDC Flatland: Mixed Reality Dreams', '内容制作', 'Santa Clara / Mixed Reality'],
  ['2025', 'drop-flow-qingdao-2025', '重庆「流光绘影」光影科技艺术节「滴流」', '异形屏幕装置', '重庆 / 光影科技艺术节'],
  ['2024', 'hallu-matrix-exhibit-2024', 'THE BOXX「幻觉矩阵」沉浸式多媒体展', '参展艺术家', '上海 THE BOXX / 展览'],
  ['2024', 'onefive-chocolove-video-2024', '@onefive「ChocoLove」/ Release Visual Record', '歌词视频制作记录', 'Official Release', '/portfolio/assets/raw-library/onefive-classy-crush-signed.png'],
  ['2023', 'onefive-underground-visual-2023', '@onefive「Underground」/ Live Visual Record', '舞台视觉制作记录', '日本 / Stage', '/portfolio/assets/raw-library/onefive-classy-crush-signed.png'],
  ['2023', 'onefive-overground-visual-2023', '@onefive「Overground」/ Live Visual Record', '舞台视觉制作记录', '日本 / Stage', '/portfolio/assets/raw-library/onefive-classy-crush-signed.png'],
  ['2023', 'lonely-av-live-2023', '上海广播艺术中心「孤独？」', '舞台视觉', '上海 / Stage', '/portfolio/assets/raw-library/event-2023-10-lonely-audiovisual-shanghai-broadcast-02.jpg'],
  ['2023', 'observe-symbiosis-k11-2023', '上海 K11「观察与共生」', '视频装置', '上海 K11 / 展览', '/portfolio/assets/raw-library/observation-symbiosis-large.png'],
  ['2023', 'vaoe-exhibition-2023', '虚拟航线 VAOE', '策划与呈现', '上海 / 展览'],
  ['2023', 'life-praise-install-2023', '上海世纪汇广场《生命的礼赞》', '气膜装置视觉制作', '上海 / Installation'],
  ['2023', 'nature-numeral-install-2023', '龙湖上海奉贤天街「数字空间与自然共生」', '视频艺术装置制作', '上海 / Installation'],
  ['2022', 'xiexindance-sixiang-gong-visual-2022', '谢欣舞蹈剧场《四相》《汞》', '影像视觉制作', '上海国际舞蹈中心 / 谢欣舞蹈剧场新锐编舞专场影像视觉制作。', '/portfolio/assets/raw-library/xiexin-sixiang-poster.png'],
  ['2022', 'watermusic-multi-visual-2022', 'CHINATIME Hamburg《Water Music》', '多媒体视觉', 'Hamburg / CHINATIME', '/portfolio/assets/raw-library/chinatime-water-music-visual.png'],
  ['2022', 'xtep-xdna22aw-visual-2022', '上海时装周 XTEP-XDNA', '视频制作', '上海时装周'],
  ['2022', 'migu-olympic-vfx-2022', '中国移动咪咕冬奥宣传片', '视觉制作', '中国 / Video'],
  ['2022', 'meta-speaker-install-2022', '西岸凤巢 AI PLAZA《元语者・棱镜现实》', '地面数字艺术装置', '上海西岸凤巢 AI PLAZA 数字艺术装置呈现，和个人介绍中的数字自然、空间感知线索相连。'],
  ['2022', 'matrix-navi-2022', '上海青年艺术博览会「矩阵导航」', '参展', '上海 / Art Fair'],
  ['2021', 'zcool-hp-live-2021', '站酷 2021 CUBE 设计大会 HP G8 工作站发布会', '视觉制作', '北京 / Stage'],
  ['2021', 'rythem-newyear-live-2021', '上海新天地 Rythem 新年跨年演出', '视觉制作', '上海 / Stage']
]

const Archive = () => {
  const { language } = useLanguage()
  const productionIdSet = new Set(productionWorkIds)
  const allWorks = sortWorksForArchive(works)
  const productionWorks = allWorks.filter((work) => productionIdSet.has(work.id))
  const orderedNodes = sortNodesForArchive(nodes)
  const publicRecords = orderedNodes
  const workIds = new Set(allWorks.map((work) => work.id))
  const stageRows = [
    ...allWorks.map((work) => {
      const localizedWork = localizeWork(work, language)
      return {
        id: `work-${work.id}`,
        year: localizedWork.years,
        title: localizedWork.title,
        role: localizedWork.type,
        context: localizedWork.summary,
        image: getDisplayImage(work),
        url: getWorkTargetUrl(work)
      }
    }),
    ...publicRecords.map((node) => {
      const localizedNode = localizeNode(node, language)
      return {
        id: `node-${node.id}`,
        year: localizedNode.year,
        title: localizedNode.title,
        role: localizedNode.category,
        context: localizedNode.summary,
        image: getDisplayImage(node),
        url: getNodeTargetUrl(node),
        external: Boolean(node.externalLink)
      }
    }),
    ...backlogRows
      .filter(([, slug]) => !workIds.has(slug))
      .map(([year, slug, title, role, context, image]) => ({
        id: `backlog-${slug}`,
        year,
        title,
        role,
        context,
        image
      }))
  ].sort((a, b) => {
    const yearA = Number.parseInt(String(a.year), 10) || 0
    const yearB = Number.parseInt(String(b.year), 10) || 0
    return yearB - yearA || a.title.localeCompare(b.title)
  })

  return (
    <>
      <Header />
      <main className="page-archive">
        <section className="section">
          <div className="container">
            <div className="eyebrow">Archive</div>
            <h1 className="section-title">{language === 'en' ? 'Project Archive' : '项目归档 / Project Archive'}</h1>
            <p className="section-intro">
              {language === 'en'
                ? 'This archive gathers artworks, production records, public presentation nodes, spatial samples, and method-related entries. It keeps the front page concise while preserving a fuller project map.'
                : '这里整理艺术作品、制作项目、公开呈现节点、空间样本与方法相关条目。首页保持简洁，完整项目地图放在归档页继续展开。'}
            </p>
            <div className="hero-cta">
              <Link to="/gaussian-scenes" className="button primary">{language === 'en' ? 'Open Spatial Samples' : '查看空间样本'}</Link>
              <Link to="/production" className="button">{language === 'en' ? 'Open Production' : '查看制作'}</Link>
              <Link to="/writing" className="button">{language === 'en' ? 'Open Writing' : '查看写作与研究'}</Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">{language === 'en' ? 'All Project Records' : '项目总档 / All Project Records'}</h2>
            <p className="section-intro">
              {language === 'en' ? 'A fuller index of the current work system, including artworks, live collaborations, research extensions, public-space projects, and production records.' : '当前作品系统的完整索引，包含艺术作品、现场合作、研究延展、公共空间项目与制作记录。'}
            </p>
            <div className="archive-grid">
              {allWorks.map((work) => {
                const localizedWork = localizeWork(work, language)

                return (
                  <article key={work.id} className="archive-item">
                    <div className="archive-item-image">
                      <img src={getDisplayImage(work)} alt={localizedWork.title} loading="lazy" />
                    </div>
                    <div className="archive-item-content">
                      <h3>{localizedWork.title}</h3>
                      <p className="archive-item-years">{localizedWork.years}</p>
                      <p className="archive-item-category">{localizedWork.type}</p>
                      <p>{localizedWork.summary}</p>
                      <div className="archive-item-actions">
                        <a href={getWorkTargetUrl(work)} className="button">{language === 'en' ? 'Open Detail' : '查看详情'}</a>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="entry-banner archive-entry-banner">
              <div className="entry-banner-content">
                <h2>{language === 'en' ? 'Spatial Samples' : '空间样本 / Spatial'}</h2>
                <p>{language === 'en' ? 'Team-project spatial translations, independently scanned field samples, and method notes around spatial preservation and web embedding are gathered in this section.' : '团队项目的空间转译样本、个人环境采样，以及空间保存与网页嵌入的方法说明，都集中在这个空间样本栏目里。'}</p>
                <Link to="/gaussian-scenes" className="button primary">{language === 'en' ? 'Open Spatial Samples' : '查看空间样本'}</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">{language === 'en' ? 'Production and Delivery Records' : '制作与交付项目'}</h2>
            <p className="section-intro">
              {language === 'en' ? 'These entries are organized as production references: concerts, event visual systems, public-space content, stage visuals, and projects with clear delivery conditions.' : '这些条目作为制作参考整理，包含演唱会、活动视觉系统、公共空间内容、舞台视觉，以及具有明确交付条件的项目。'}
            </p>
            <div className="archive-grid">
              {productionWorks.map((work) => {
                const localizedWork = localizeWork(work, language)

                return (
                  <article key={work.id} className="archive-item">
                    <div className="archive-item-image">
                      <img src={getDisplayImage(work)} alt={localizedWork.title} />
                    </div>
                    <div className="archive-item-content">
                      <h3>{localizedWork.title}</h3>
                      <p className="archive-item-years">{localizedWork.years}</p>
                      <p>{localizedWork.summary}</p>
                      <div className="archive-item-actions">
                        <a href={getWorkTargetUrl(work)} className="button">{language === 'en' ? 'Open Detail' : '查看详情'}</a>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">{language === 'en' ? 'Public Records' : '公开记录 / Public Records'}</h2>
            <p className="section-intro">
              {language === 'en' ? 'Public-facing records from exhibitions, festivals, performances, and project contexts. These are listed together rather than split into priority tiers.' : '展览、音乐节、演出和项目语境中的公开记录统一列在这里，不再拆成核心和扩展。'}
            </p>
            <div className="archive-timeline-list">
              {publicRecords.map((node) => {
                const localizedNode = localizeNode(node, language)

                return (
                  <article key={node.id} className="archive-timeline-row">
                    <div className="archive-row-year">{localizedNode.year}</div>
                    <div>
                      <h3>{localizedNode.title}</h3>
                      <p>{localizedNode.category}</p>
                    </div>
                    <p>{localizedNode.summary}</p>
                    <div className="archive-item-actions">
                      <a href={getNodeTargetUrl(node)} className="button" target={node.externalLink ? '_blank' : undefined} rel={node.externalLink ? 'noreferrer' : undefined}>
                        {language === 'en' ? 'Open' : '查看'}
                      </a>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">{language === 'en' ? 'Front-stage Project Index' : '项目上台清单 / Front-stage Project Index'}</h2>
            <p className="section-intro">
              {language === 'en' ? 'A long-form index that keeps existing works, public records, UFO Terminal nodes, production records, and repository project documents on the same stage.' : '把已有作品、公开节点、UFO Terminal 记录、制作项目和 GitHub 项目文档放在同一个长条清单里。已有专题页的项目也继续列出。'}
            </p>
            <div className="archive-timeline-list archive-backlog-list">
              {stageRows.map((item) => (
                <article key={item.id} className="archive-timeline-row">
                  <div className="archive-row-thumb">
                    {item.image ? <img src={item.image} alt="" loading="lazy" /> : null}
                  </div>
                  <div className="archive-row-year">{item.year}</div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.role}</p>
                  </div>
                  <p>{item.context}</p>
                  {item.url ? (
                    <div className="archive-item-actions">
                      <a href={item.url} className="button" target={item.external ? '_blank' : undefined} rel={item.external ? 'noreferrer' : undefined}>
                        {language === 'en' ? 'Open' : '查看'}
                      </a>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Archive
