import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const servicesByLanguage = {
  zh: [
    {
      id: 'live-visuals',
      title: '现场视觉 / Live Visuals',
      description: '适合演出、专场和现场段落，需要视觉和音乐结构、节奏推进与现场气质一起成立的合作。',
      forUse: ['音乐演出', 'audiovisual 合作', '开场段落', '现场视觉支持']
    },
    {
      id: 'spatial-image',
      title: '空间影像与沉浸内容 / Spatial Image & Immersive Content',
      description: '适合展厅、多面屏、穹顶和装置内容，需要围绕空间路径、屏幕关系与环境感组织影像的项目。',
      forUse: ['展厅', '多面屏', '穹顶', '沉浸空间', '装置类内容']
    },
    {
      id: 'previsualization',
      title: '前期预演与方案确认 / Previsualization',
      description: '适合还在前期判断阶段的项目，先把结构、节奏、屏幕关系和关键风险做成可讨论的预演。',
      forUse: ['场景预演', '项目测试', '方案确认', '技术验证']
    },
    {
      id: 'viewer-spec',
      title: '交付规格与播放支持 / Delivery Specs',
      description: '适合要进入真实交付的项目，把分辨率、播放、格式、版本和场地适配提前理顺。',
      forUse: ['分辨率', '帧率', '编码格式', '封装格式', 'Apple ProRes', '播放测试', '场地适配']
    },
    {
      id: 'research-consultation',
      title: '研究咨询与工作坊 / Consultation & Workshop',
      description: '适合团队方法搭建、方向讨论和工作坊场景，用来帮合作方建立判断和工作流。',
      forUse: ['方法讨论', '项目咨询', '课程 / workshop', '系统搭建与内容组织']
    }
  ],
  en: [
    {
      id: 'live-visuals',
      title: 'Live Visuals',
      description: 'Best suited to performances, special sets, and live segments where image, musical structure, pacing, and atmosphere all need to hold together at once.',
      forUse: ['music performances', 'audiovisual collaborations', 'opening visuals', 'live visual support']
    },
    {
      id: 'spatial-image',
      title: 'Spatial Image & Immersive Content',
      description: 'Best suited to exhibitions, multi-surface displays, domes, and installation content where the work needs to be organized around movement paths, screen relations, and environmental feeling.',
      forUse: ['exhibitions', 'multi-screen surfaces', 'domes', 'immersive environments', 'installation content']
    },
    {
      id: 'previsualization',
      title: 'Previsualization',
      description: 'Best suited to projects still in an early decision phase, where structure, pacing, screen relations, and risk need to be turned into something discussable before production expands.',
      forUse: ['scene previs', 'project tests', 'proposal validation', 'technical feasibility']
    },
    {
      id: 'viewer-spec',
      title: 'Delivery Specs',
      description: 'Best suited to projects moving toward real delivery, where resolution, playback, format, versioning, and venue adaptation need to be clarified early.',
      forUse: ['resolution', 'frame rate', 'codec', 'container', 'Apple ProRes', 'playback tests', 'venue adaptation']
    },
    {
      id: 'research-consultation',
      title: 'Consultation & Workshop',
      description: 'Best suited to teams building methods, discussing directions, or designing workshop formats. The value here is not only deliverables but the shared judgment and workflow that gets built.',
      forUse: ['method sessions', 'project consultation', 'courses / workshops', 'workflow and system design']
    }
  ]
}

const caseNotesByLanguage = {
  zh: [
    {
      id: 'opening-visual-pricing',
      title: '为什么 opening visual 通常比普通循环内容更贵',
      content: '因为它通常承担项目整体气质建立、叙事起点与观看预期设定，不只是“多一条视频”。'
    },
    {
      id: 'stereo-test-first',
      title: '为什么双目内容建议先做测试样片',
      content: '双目、空间深度与观看舒适度会显著影响最终结果，先做短样片更能避免后期返工。'
    },
    {
      id: 'viewer-spec-early',
      title: '为什么交付规格需要提前确认',
      content: '分辨率、帧率、编码格式、播放条件和场地尺寸越晚确认，后期越容易出错，尤其在多屏、穹顶和特殊输出环境中更明显。'
    },
    {
      id: 'immersive-not-by-length',
      title: '为什么沉浸式内容不能只按“片长”报价',
      content: '空间项目的难度往往来自屏幕结构、版本数量、内容组织方式与场地适配，不能只按时长判断。'
    }
  ],
  en: [
    {
      id: 'opening-visual-pricing',
      title: 'Why opening visuals usually cost more than looping content',
      content: 'Because they often establish the project’s atmosphere, narrative entry point, and viewing expectation. They are not just “one more video.”'
    },
    {
      id: 'stereo-test-first',
      title: 'Why stereo content should usually begin with a short test',
      content: 'Stereo depth, spatial comfort, and viewing fatigue can all change the final result dramatically. A short test sample avoids expensive rework later.'
    },
    {
      id: 'viewer-spec-early',
      title: 'Why delivery specs should be confirmed early',
      content: 'The later resolution, frame rate, codec, playback conditions, and venue size are confirmed, the more likely errors become, especially for multi-screen, dome, or unusual output environments.'
    },
    {
      id: 'immersive-not-by-length',
      title: 'Why immersive content cannot be priced by duration alone',
      content: 'The real difficulty usually comes from screen structure, version count, content organization, and venue adaptation rather than clip length.'
    }
  ]
}

const viewerSpecsByLanguage = {
  zh: {
    delivery: ['4K / 8K', '60fps', '多分辨率版本', 'multi-surface / dome / LED / projection'],
    codec: ['Apple ProRes', 'H.264 / H.265', 'MOV / MP4', '根据场地或媒体服务器要求调整'],
    venue: ['dome / curved surface', 'multi-screen', 'projection mapping environment', 'gallery / exhibition display'],
    workflow: ['test sample', 'playback check', 'color / exposure verification', 'content versioning', 'delivery note']
  },
  en: {
    delivery: ['4K / 8K', '60fps', 'multi-resolution versions', 'multi-surface / dome / LED / projection'],
    codec: ['Apple ProRes', 'H.264 / H.265', 'MOV / MP4', 'adjusted to venue or media-server requirements'],
    venue: ['domes / curved surfaces', 'multi-screen environments', 'projection-mapping contexts', 'gallery / exhibition display'],
    workflow: ['test samples', 'playback checks', 'color / exposure verification', 'content versioning', 'delivery notes']
  }
}

const faqsByLanguage = {
  zh: [
    {
      q: '项目一般怎么开始？',
      a: '通常先做一次30分钟的免费咨询，确认项目方向、技术可行性与合作预期，然后进入正式的方案阶段。'
    },
    {
      q: '需要先提供哪些资料？',
      a: '项目类型、预期时间、场地或平台信息、分辨率/屏幕条件、预算区间、希望的输出形式，这些信息会帮助我们更快进入状态。'
    },
    {
      q: '是否可以先做测试样片？',
      a: '推荐这样做，尤其是对于多屏、双目、沉浸类项目。短样片可以提前验证观看效果、技术方案与场地适配。'
    },
    {
      q: '交付规格与播放支持适合什么类型的项目？',
      a: '适合需要清晰技术交付、多版本输出、场地适配、或与媒体服务器/特殊播放环境配合的项目。'
    },
    {
      q: '现场视觉和空间影像的合作方式有什么不同？',
      a: '现场视觉更强调实时性、音乐关系与现场应变；空间影像更强调观看路径、屏幕关系与环境感，两者的工作流与判断逻辑会有差异。'
    },
    {
      q: '价格一般会受哪些因素影响？',
      a: '版本数量、场地条件、交付规格、协作方式、时限要求，都是影响价格的重要因素，而不只是“内容时长”。'
    }
  ],
  en: [
    {
      q: 'How does a project usually begin?',
      a: 'It usually starts with a short consultation to confirm direction, technical feasibility, and collaboration expectations before moving into a formal proposal stage.'
    },
    {
      q: 'What information is most useful to provide first?',
      a: 'Project type, schedule, venue or platform, screen conditions, budget range, and expected deliverable all help the conversation move much faster.'
    },
    {
      q: 'Can we begin with a test sample?',
      a: 'Yes, and that is usually recommended, especially for multi-screen, stereo, or immersive work. A short sample validates viewing quality, technical choices, and venue fit early.'
    },
    {
      q: 'What kinds of projects benefit from delivery-spec support?',
      a: 'Projects that need clear technical delivery, multi-version output, venue adaptation, or coordination with media servers and unusual playback environments.'
    },
    {
      q: 'What is the difference between live visuals and spatial image work?',
      a: 'Live visuals emphasize realtime response, music relation, and on-site adaptability, while spatial image work emphasizes viewing paths, screen relations, and environmental feeling. The workflows are related but not identical.'
    },
    {
      q: 'What usually affects pricing?',
      a: 'Version count, venue conditions, delivery specs, collaboration structure, and time pressure all affect pricing, not just duration.'
    }
  ]
}

const pricingCardsByLanguage = {
  zh: [
    { title: 'Entry-level / 轻量内容', items: ['简短 AI 影像内容', '轻量循环视觉', '结构较简单的短内容'] },
    { title: 'Mid-scale / 中等复杂度制作', items: ['演出视觉', '品牌视觉内容', '展厅内容片段', '多版本输出'] },
    { title: 'Project-based / 项目制', items: ['沉浸空间', '交付规格支持', '多场地版本', '双目 / 特殊交付', '长周期合作'] }
  ],
  en: [
    { title: 'Entry-Level', items: ['short AI image pieces', 'light looping visuals', 'short-form content with simpler structure'] },
    { title: 'Mid-Scale Production', items: ['live visuals', 'brand-driven visual content', 'exhibition segments', 'multi-version output'] },
    { title: 'Project-Based', items: ['immersive environments', 'delivery-spec support', 'multi-venue versions', 'stereo / special delivery', 'longer collaboration cycles'] }
  ]
}

const contactChecklistByLanguage = {
  zh: ['项目类型', '预期时间', '场地或平台', '分辨率 / 屏幕条件', '预算区间', '希望的输出形式'],
  en: ['project type', 'timeline', 'venue or platform', 'resolution / screen conditions', 'budget range', 'expected deliverable']
}

const Production = () => {
  const { language } = useLanguage()
  const services = servicesByLanguage[language]
  const caseNotes = caseNotesByLanguage[language]
  const viewerSpecs = viewerSpecsByLanguage[language]
  const faqs = faqsByLanguage[language]
  const pricingCards = pricingCardsByLanguage[language]
  const contactChecklist = contactChecklistByLanguage[language]

  return (
    <>
      <Header />
      <main className="page-production">
        <section className="section">
          <div className="container">
            <div className="eyebrow">Production</div>
            <h1 className="section-title">{language === 'en' ? 'Production and Collaboration' : '制作与合作'}</h1>
            <p className="section-intro">
              {language === 'en'
                ? 'This page is for clients and collaborators who need to make a quick judgment. It explains what kinds of projects fit this practice, how the work is usually structured, and which questions are most worth clarifying before the conversation goes further.'
                : '这个页面是给客户和合作方快速判断用的。你可以直接看我适合接什么项目、常见合作类型、为什么不同项目的制作逻辑不同，以及继续沟通前最值得先确认的几个问题。'}
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">{language === 'en' ? 'Production Overview' : 'Production Overview / 制作概览'}</h2>
            <p>
              {language === 'en'
                ? 'The strongest fit is projects where content, space, pacing, versions, and delivery all need to be organized together. Live visuals, spatial image work, immersive content, previs, and delivery-spec support can be judged here faster than on the work pages.'
                : '最适合的是需要把内容、空间、节奏、版本和交付一起梳理清楚的项目。演出视觉、空间影像、沉浸内容、预演测试和交付规格支持，可以在这里比作品页更快完成判断。'}
            </p>
            <div className="grid-3" style={{ marginTop: '28px' }}>
              <div className="overview-card">
                <h4>{language === 'en' ? 'Best-fit project types' : '适合什么合作'}</h4>
                <p>{language === 'en' ? 'Live visuals, spatial image work, opening sequences, exhibition content, multi-version delivery, previs, and specification support.' : '演出视觉、空间影像、开场段落、展厅内容、多版本交付、预演测试与规格支持。'}</p>
              </div>
              <div className="overview-card">
                <h4>{language === 'en' ? 'What clients should read first' : '客户先看什么'}</h4>
                <p>{language === 'en' ? 'Start with service categories and case notes, then judge whether your project is closer to content production, system support, or an earlier validation phase.' : '先看服务类别和案例说明，再判断你的项目更像内容制作、系统支持，还是前期验证。'}</p>
              </div>
              <div className="overview-card">
                <h4>{language === 'en' ? 'How to continue the conversation' : '怎么继续沟通'}</h4>
                <p>{language === 'en' ? 'Bringing schedule, venue, screen conditions, budget range, and expected output format into the conversation will make the process much more efficient.' : '带着时间、场地、屏幕条件、预算区间和预期输出形式来聊，效率会高很多。'}</p>
              </div>
            </div>
            <div className="hero-cta" style={{ marginTop: '24px' }}>
              <a href="#contact" className="button primary">{language === 'en' ? 'Contact Directly' : '直接联系'}</a>
              <Link to="/gaussian-scenes" className="button">{language === 'en' ? 'Open Spatial Samples' : '查看空间样本'}</Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="entry-banner production-gaussian-entry">
              <div className="entry-banner-content">
                <h2>{language === 'en' ? 'Spatial Samples and Method Notes / Gaussian Archive' : '空间样本与方法说明 / Gaussian Archive'}</h2>
                <p>{language === 'en' ? 'The Gaussian Archive supports spatial preservation, web embedding, and Vision Pro / XR paths through public samples and method notes.' : 'Gaussian Archive 通过公开样本和方法说明，支撑扫描保存、网页嵌入和 Vision Pro / XR 路径。'}</p>
                <div className="hero-cta" style={{ justifyContent: 'center' }}>
                  <Link to="/gaussian-scenes" className="button primary">{language === 'en' ? 'Open Spatial Samples' : '查看空间样本'}</Link>
                  <a href="https://github.com/ewanqian/portfolio/blob/main/archive/gaussian-scenes/gaussian-spatial-workflow-note.md" target="_blank" rel="noreferrer" className="button">
                    {language === 'en' ? 'Open Method Note' : '查看方法说明'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">{language === 'en' ? 'Service Categories' : '合作类型 / Service Categories'}</h2>
            <p className="section-intro">
              {language === 'en' ? 'These categories help a reader quickly judge what kind of collaboration structure a project is actually asking for.' : '下面这几类帮助客户快速判断：你的项目更接近哪一种合作结构。'}
            </p>
            <div className="services-grid">
              {services.map((service) => (
                <article key={service.id} className="card service-card-full">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="service-for-use">
                    <li className="service-for-use-label">{language === 'en' ? 'Used for:' : '用于：'}</li>
                    {service.forUse.map((use, i) => (
                      <li key={i}>{use}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">{language === 'en' ? 'Case Notes' : '合作判断 / Case Notes'}</h2>
            <p className="section-intro">
              {language === 'en' ? 'This section addresses the points clients most often misjudge, so it becomes easier to understand why some projects need tests, previs, or pricing logic that cannot be reduced to duration alone.' : '这部分专门解释客户最常误判的地方，帮助你理解为什么有些项目需要先测、先预演，或者不能只按时长判断。'}
            </p>
            <div className="case-notes-grid">
              {caseNotes.map((note) => (
                <article key={note.id} className="case-note-card">
                  <h3>{note.title}</h3>
                  <div className="case-note-content">
                    <p>{note.content}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">{language === 'en' ? 'Delivery Specs and Playback Support' : '交付规格与播放支持 / Delivery Specs'}</h2>
            <div className="viewer-specs-grid-full">
              <div className="viewer-spec-card-full">
                <h3>{language === 'en' ? 'Delivery Formats' : '交付格式'}</h3>
                <ul>
                  {viewerSpecs.delivery.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="viewer-spec-card-full">
                <h3>{language === 'en' ? 'Codec and Containers' : '编码与封装'}</h3>
                <ul>
                  {viewerSpecs.codec.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="viewer-spec-card-full">
                <h3>{language === 'en' ? 'Venue Adaptation' : '场地适配'}</h3>
                <ul>
                  {viewerSpecs.venue.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="viewer-spec-card-full">
                <h3>{language === 'en' ? 'Workflow' : '交付流程'}</h3>
                <ul>
                  {viewerSpecs.workflow.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">{language === 'en' ? 'Pricing' : 'Pricing / 报价'}</h2>
            <div className="pricing-tiers-full">
              {pricingCards.map((card, index) => (
                <div key={card.title} className={`pricing-tier-full ${index === 1 ? 'featured' : ''}`.trim()}>
                  <h3>{card.title}</h3>
                  <p className="pricing-use">{language === 'en' ? 'Used for:' : '用于：'}</p>
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p style={{ marginTop: '24px', color: 'var(--muted)', fontSize: '14px' }}>
              {language === 'en' ? 'Actual pricing shifts with version count, venue conditions, delivery specs, collaboration structure, and schedule pressure. The page gives an indicative range for early planning.' : '具体价格会因版本数量、场地条件、交付规格、协作方式与时限而变化。页面提供前期规划用的参考区间。'}
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">{language === 'en' ? 'FAQ' : '常见问题 / FAQ'}</h2>
            <div className="faq-list">
              {faqs.map((faq, i) => (
                <article key={i} className="faq-item">
                  <h3>Q: {faq.q}</h3>
                  <p>A: {faq.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container">
            <h2 className="section-title">{language === 'en' ? 'Inquiry' : '联系与项目咨询 / Inquiry'}</h2>
            <div className="contact-box">
              <p>{language === 'en' ? 'For a faster collaboration start, bring:' : '为了更快推进合作，请尽量提供：'}</p>
              <ul className="inquiry-list">
                {contactChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="socials">
                <a className="social-pill" href="https://www.instagram.com/ewanqian/" target="_blank" rel="noreferrer">Instagram ↗</a>
                <a className="social-pill" href="https://space.bilibili.com/2380485" target="_blank" rel="noreferrer">Bilibili ↗</a>
                <a className="social-pill" href="https://www.xiaohongshu.com/user/profile/60d73226000000000101f30e" target="_blank" rel="noreferrer">Xiaohongshu ↗</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Production
