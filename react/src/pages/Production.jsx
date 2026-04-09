import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const services = [
  {
    id: 'live-visuals',
    title: 'Live Visuals / 现场视觉',
    description: '围绕音乐结构、演出节奏、空间氛围与现场观看关系组织视觉内容。',
    forUse: ['音乐演出', 'audiovisual 合作', 'opening visual', 'live performance support']
  },
  {
    id: 'spatial-image',
    title: 'Spatial Image & Immersive Content / 空间影像与沉浸内容',
    description: '围绕空间内部、观看路径、屏幕关系与环境感组织影像。',
    forUse: ['展厅', '多面屏', '穹顶', '沉浸空间', '装置类内容']
  },
  {
    id: 'previsualization',
    title: 'Previsualization & System Design / 预演与系统设计',
    description: '在项目真正制作前，先建立可视化预演和结构验证。',
    forUse: ['场景预演', '项目测试', 'mapping / viewer 相关流程', '技术验证']
  },
  {
    id: 'viewer-spec',
    title: 'Viewer / Spec Support / 查看器与技术规格支持',
    description: '帮助作品和项目进入更清晰的技术交付与场地适配流程。',
    forUse: ['resolution', 'fps', 'codec', 'container', 'Apple ProRes', 'playback', 'venue adaptation']
  },
  {
    id: 'research-consultation',
    title: 'Research / Consultation / Workshop / 研究、咨询与工作坊',
    description: '适合需要从创作、空间、技术与人工智能工具之间建立方法的人或团队。',
    forUse: ['方法讨论', '项目咨询', '课程 / workshop', '系统搭建与内容组织']
  }
]

const caseNotes = [
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
    title: '为什么 viewer / spec 需要提前确认',
    content: '分辨率、帧率、codec、播放条件和场地尺寸越晚确认，后期越容易出错，尤其在多屏、穹顶和特殊输出环境中更明显。'
  },
  {
    id: 'immersive-not-by-length',
    title: '为什么沉浸式内容不能只按“片长”报价',
    content: '空间项目的难度往往来自屏幕结构、版本数量、内容组织方式与场地适配，而不是单纯时长。'
  }
]

const viewerSpecs = {
  delivery: ['4K / 8K', '60fps', '多分辨率版本', 'multi-surface / dome / LED / projection'],
  codec: ['Apple ProRes', 'H.264 / H.265', 'MOV / MP4', '根据场地或媒体服务器要求调整'],
  venue: ['dome / curved surface', 'multi-screen', 'projection mapping environment', 'gallery / exhibition display'],
  workflow: ['test sample', 'playback check', 'color / exposure verification', 'content versioning', 'delivery note']
}

const faqs = [
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
    q: 'viewer / spec 支持适合什么类型的项目？',
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
]

const Production = () => {
  return (
    <>
      <Header />
      <main className="page-production">
        <section className="section">
          <div className="container">
            <div className="eyebrow">Production</div>
            <h1 className="section-title">制作与合作</h1>
            <p className="section-intro">
              这里不是把作品变成商品目录，而是说明我如何把创作经验转化为可协作的制作流程。
              它服务于现场视觉、空间影像、viewer/spec、项目预演与内容交付，也服务于与团队、机构、品牌和艺术家之间的实际合作。
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">Production Overview / 制作概览</h2>
            <p>
              我所参与的制作，不只是“做一段视觉”，而是围绕作品、场地、观看关系、屏幕条件与交付要求，组织出更完整的内容结构。
              这类工作既可能服务于演出与公共节点，也可能进入展览、空间环境、viewer / spec 支持与长期档案系统之中。
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">Service Categories / 服务类别</h2>
            <div className="services-grid">
              {services.map((service) => (
                <article key={service.id} className="card service-card-full">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="service-for-use">
                    <li className="service-for-use-label">用于：</li>
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
            <h2 className="section-title">Selected Case Notes / 制作案例说明</h2>
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
            <h2 className="section-title">Viewer / Spec Capability / 查看器与技术规格能力</h2>
            <div className="viewer-specs-grid-full">
              <div className="viewer-spec-card-full">
                <h3>Delivery</h3>
                <ul>
                  {viewerSpecs.delivery.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="viewer-spec-card-full">
                <h3>Codec / Container</h3>
                <ul>
                  {viewerSpecs.codec.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="viewer-spec-card-full">
                <h3>Venue Adaptation</h3>
                <ul>
                  {viewerSpecs.venue.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="viewer-spec-card-full">
                <h3>Workflow Notes</h3>
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
            <h2 className="section-title">Pricing / 报价</h2>
            <div className="pricing-tiers-full">
              <div className="pricing-tier-full">
                <h3>Entry-level / 轻量内容</h3>
                <p className="pricing-use">用于：</p>
                <ul>
                  <li>简短 AI 影像内容</li>
                  <li>轻量循环视觉</li>
                  <li>结构较简单的短内容</li>
                </ul>
              </div>
              <div className="pricing-tier-full featured">
                <h3>Mid-scale / 中等复杂度制作</h3>
                <p className="pricing-use">用于：</p>
                <ul>
                  <li>演出视觉</li>
                  <li>品牌视觉内容</li>
                  <li>展厅内容片段</li>
                  <li>多版本输出</li>
                </ul>
              </div>
              <div className="pricing-tier-full">
                <h3>Project-based / 项目制</h3>
                <p className="pricing-use">用于：</p>
                <ul>
                  <li>沉浸空间</li>
                  <li>viewer / spec 支持</li>
                  <li>多场地版本</li>
                  <li>双目 / 特殊交付</li>
                  <li>长周期合作</li>
                </ul>
              </div>
            </div>
            <p style={{ marginTop: '24px', color: 'var(--muted)', fontSize: '14px' }}>
              具体价格会因版本数量、场地条件、交付规格、协作方式与时限而变化。
              页面提供的是理解范围，不是最终合同价格。
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">FAQ / 常见问题</h2>
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
            <h2 className="section-title">Inquiry / 项目咨询</h2>
            <div className="contact-box">
              <p>如果你希望推进合作，请尽量提供：</p>
              <ul className="inquiry-list">
                <li>项目类型</li>
                <li>预期时间</li>
                <li>场地或平台</li>
                <li>分辨率 / 屏幕条件</li>
                <li>预算区间</li>
                <li>希望的输出形式</li>
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
