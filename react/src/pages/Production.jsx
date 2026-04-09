import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const services = [
  {
    id: 'live-visuals',
    title: 'Live Visuals / 现场视觉',
    description: '演出、发布会、展览开幕的实时视觉设计与执行',
    details: [
      'Opening / 开幕视觉',
      'Stage Performance / 舞台演出',
      'Festival / 音乐节视觉'
    ]
  },
  {
    id: 'immersive-installation',
    title: 'Immersive Installation / 沉浸装置',
    description: '空间影像、环境设计与交互体验的完整实现',
    details: [
      'Projection Mapping / 投影映射',
      'Spatial Audio / 空间音频',
      'Interactive Systems / 交互系统'
    ]
  },
  {
    id: 'previsualization',
    title: 'Previsualization / 预演与可视化',
    description: '项目前期的可视化与技术验证，降低现场风险',
    details: [
      'Concept Visualization / 概念可视化',
      'Technical Previz / 技术预演',
      'On-site Rehearsal / 现场排练'
    ]
  },
  {
    id: 'archive-design',
    title: 'Archive Design / 档案与知识系统',
    description: '作品档案、展示系统与知识网络的设计',
    details: [
      'Portfolio System / 作品集系统',
      'Documentation / 文献整理',
      'Knowledge Graph / 知识图谱'
    ]
  }
]

const caseNotes = [
  {
    id: 'opening-visual-pricing',
    title: '为什么开幕视觉会更贵？',
    content: '开幕现场往往意味着：\n\n- 只有一次机会，没有试错空间\n- 灯光音响时间窗口紧张\n- 嘉宾与媒体在场的压力\n\n所以开幕视觉的报价会基于：\n- 场地复杂度\n- 技术调试时间\n- 现场应变准备'
  },
  {
    id: 'stereo-test-first',
    title: '为什么双目项目建议先做测试？',
    content: '双目/立体项目包含很多变量：\n\n- 不同人的瞳距差异\n- 屏幕亮度与环境光\n- 播放设备的解码能力\n\n建议流程：\n1. 先做单通道版本确认内容\n2. 做小规模双目测试\n3. 完整场地验收'
  },
  {
    id: 'viewer-spec-early',
    title: '为什么 viewer/spec 要提前确认？',
    content: '技术参数不是“事后调整”的：\n\n- 分辨率决定素材制作\n- 编码决定服务器选择\n- 帧率影响视觉流畅度\n\n最好在项目启动第一周就确认：\n- 输出分辨率与帧率\n- 播放介质与编码\n- 现场条件与交付时间'
  }
]

const viewerSpecs = [
  {
    category: 'Resolution / 分辨率',
    items: ['1920×1080 (Full HD)', '3840×2160 (4K)', '7680×4320 (8K)', 'Custom / 定制分辨率']
  },
  {
    category: 'Frame Rate / 帧率',
    items: ['30 fps', '60 fps', '120 fps', 'Variable / 可变帧率']
  },
  {
    category: 'Codec & Format / 编码与格式',
    items: ['H.264 / H.265', 'Apple ProRes 422/444', 'DNxHD / DNxHR', 'Image Sequence / 序列帧']
  },
  {
    category: 'Delivery / 交付',
    items: ['File / 文件交付', 'Hardware Player / 硬件播放器', 'On-site Operation / 现场执行', 'Maintenance / 后期维护']
  }
]

const faqs = [
  {
    q: '项目周期一般是多长？',
    a: '从概念到交付，小项目2-4周，中型项目1-3个月，大型项目3个月以上。具体取决于场地条件、技术复杂度和内容量。'
  },
  {
    q: '如何开始合作？',
    a: '请先发送项目简介，包括：场地信息、时间节点、预算范围、参考案例。我们会安排一次30分钟的免费咨询，确认技术可行性和合作方式。'
  },
  {
    q: '可以只做设计不做执行吗？',
    a: '可以。我们提供概念设计、技术方案、素材指导等不同层级的服务。具体看项目需求和团队配置。'
  },
  {
    q: '现场出问题怎么办？',
    a: '所有现场项目都会有：技术预案、备份设备、冗余系统。重要项目会有技术总监在场，实时应对突发情况。'
  },
  {
    q: '报价是怎么定的？',
    a: '基于：内容复杂度、技术难度、场地条件、时间周期、团队配置。我们会提供清晰的分项报价，没有隐藏费用。'
  },
  {
    q: '外地项目怎么操作？',
    a: '外地项目需要提前沟通：差旅成本、设备运输、当地配合团队。我们会做详细的现场勘查和技术预案。'
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
            <h1 className="section-title">制作服务</h1>
            <p className="section-intro">
              将创作经验转化为可协作的制作流程，服务于项目和机构。
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">Service Categories</h2>
            <div className="grid-2">
              {services.map((service) => (
                <article key={service.id} className="card service-card">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="service-details">
                    {service.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">Selected Case Notes</h2>
            <div className="case-notes-grid">
              {caseNotes.map((note) => (
                <article key={note.id} className="case-note-card">
                  <h3>{note.title}</h3>
                  <div className="case-note-content">
                    {note.content.split('\n\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">Viewer / Spec Capability</h2>
            <div className="viewer-specs-grid">
              {viewerSpecs.map((spec, i) => (
                <div key={i} className="viewer-spec-card">
                  <h3>{spec.category}</h3>
                  <ul>
                    {spec.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">Pricing</h2>
            <div className="pricing-box">
              <div className="pricing-tiers">
                <div className="pricing-tier">
                  <h3>Small Project / 小项目</h3>
                  <p className="pricing-price">¥10,000–30,000</p>
                  <ul>
                    <li>单通道内容</li>
                    <li>2-4周周期</li>
                    <li>基础技术支持</li>
                  </ul>
                </div>
                <div className="pricing-tier featured">
                  <h3>Medium Project / 中型项目</h3>
                  <p className="pricing-price">¥30,000–100,000</p>
                  <ul>
                    <li>多通道/沉浸项目</li>
                    <li>1-3个月周期</li>
                    <li>完整技术方案</li>
                    <li>现场执行支持</li>
                  </ul>
                </div>
                <div className="pricing-tier">
                  <h3>Large Project / 大型项目</h3>
                  <p className="pricing-price">¥100,000+</p>
                  <ul>
                    <li>复杂系统/定制开发</li>
                    <li>3个月以上周期</li>
                    <li>专属团队配置</li>
                    <li>长期维护支持</li>
                  </ul>
                </div>
              </div>
              <p style={{ marginTop: '24px', color: 'var(--muted)', fontSize: '14px' }}>
                以上为参考区间，具体报价基于项目需求定制。
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">FAQ</h2>
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
            <h2 className="section-title">Inquiry</h2>
            <div className="contact-box">
              <p>欢迎通过以下方式联系，我们会在3个工作日内回复：</p>
              <div className="socials">
                <a className="social-pill" href="https://www.instagram.com/ewanqian/" target="_blank" rel="noreferrer">Instagram ↗</a>
                <a className="social-pill" href="https://space.bilibili.com/2380485" target="_blank" rel="noreferrer">Bilibili ↗</a>
                <a className="social-pill" href="https://www.xiaohongshu.com/user/profile/60d73226000000000101f30e" target="_blank" rel="noreferrer">Xiaohongshu ↗</a>
              </div>
              <p style={{ marginTop: '24px', color: 'var(--muted)', fontSize: '13px' }}>
                如需正式咨询，请准备：项目简介、场地信息、时间节点、预算范围。
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Production
