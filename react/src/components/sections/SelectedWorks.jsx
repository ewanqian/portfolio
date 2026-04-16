import works from '../../data/generated/works'
import { getDisplayImage, getWorkTargetUrl } from '../../data/siteDisplay'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { localizeWork } from '../../i18n/content.js'

const workHighlights = {
  zh: {
    'drop-flow': '杭州双年展开幕与常设展呈现，获杭州国际电子音乐作曲比赛一等奖，并入选 2025「流光绘影」光影科技艺术节优秀作品。',
    kashiwa: '与 Kashiwa Daisuke、Yuki Murata 在 BO LIVE Shenzhen 完成专场视听合作，包含全息纱幕、裸眼 3D 与音画互动段落。',
    timer: 'UFO Terminal「加载…创作营」支持创作，入选「加载…权限 2」展览，并获 ChinaGraph 2024 电子剧场优秀音乐作品二等奖。'
  },
  en: {
    'drop-flow': 'Publicly presented at the Hangzhou Biennale opening and permanent exhibition, awarded First Prize at the Hangzhou International Electronic Music Composition Competition, and selected for the 2025 “Luminous Currents” art-and-technology festival.',
    kashiwa: 'A special audiovisual collaboration with Kashiwa Daisuke and Yuki Murata at BO LIVE Shenzhen, combining holographic scrims, naked-eye 3D, and audiovisual interaction.',
    timer: 'Developed through the UFO Terminal Loading Camp, selected for the “Loading… Permission 2” exhibition, and awarded Second Prize at ChinaGraph 2024 in the electronic theatre music category.'
  }
}

function SelectedWorks() {
  const { language } = useLanguage()
  const homepageWorks = works
    .filter((work) => work.showOnHome === true)
    .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999))

  return (
    <section id="works" className="section">
      <div className="container">
        <div className="eyebrow">Selected Works</div>
        <h2 className="section-title">{language === 'en' ? 'Selected Works' : '作品选集'}</h2>
        <p className="section-intro">
          {language === 'en'
            ? 'The homepage keeps three works as primary entry points. Public nodes, research lines, and spatial samples continue further below.'
            : '首页先保留三项最值得优先进入的代表作。更完整的公开节点、研究线和空间样本，会在下方继续展开。'}
        </p>
        <div className="grid-3">
          {homepageWorks.map((work) => {
            const targetUrl = getWorkTargetUrl(work)
            const localizedWork = localizeWork(work, language)

            return (
              <article key={work.id} className="card work-card">
                <a href={targetUrl} className="thumb">
                  <img src={getDisplayImage(work)} alt={localizedWork.title} />
                </a>
                <div className="content">
                  <h3><a href={targetUrl}>{localizedWork.title}</a></h3>
                  <p className="work-card-meta">{localizedWork.years} · {localizedWork.subtitle}</p>
                  <p>{localizedWork.summary}</p>
                  {workHighlights[language][work.id] ? (
                    <p className="work-card-note">{workHighlights[language][work.id]}</p>
                  ) : null}
                  <div className="inline-links">
                    {work.links && work.links.map((link, i) => (
                      <a key={i} href={link.url}>{link.text}</a>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SelectedWorks
