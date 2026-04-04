import { useState } from 'react'
import { services } from '../../data/services'

function ProductionServices() {
  const [activeService, setActiveService] = useState(0)

  return (
    <section id="services" className="section">
      <div className="container">
        <div className="eyebrow">Services</div>
        <h2 className="section-title">制作与交付服务</h2>
        <p className="section-intro">
          这里不是把"我会什么"全部堆出来，而是帮助合作方快速判断：你的需求属于哪种服务、从什么预算开始、适不适合继续往下聊。
        </p>
        <div className="columns-2" id="serviceCards">
          {services.map((service, index) => (
            <article 
              key={service.id}
              className={`service-card ${index === activeService ? 'active' : ''}`}
              onClick={() => setActiveService(index)}
            >
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <div className="service-meta">{service.meta}</div>
            </article>
          ))}
        </div>
        <div className="service-detail" id="serviceDetail">
          <h3>{services[activeService].title}</h3>
          <p>{services[activeService].detail}</p>
          <ul>
            {services[activeService].bullets.map((bullet, index) => (
              <li key={index}>{bullet}</li>
            ))}
          </ul>
        </div>

        <div className="section" style={{ padding: '48px 0 0' }}>
          <div className="eyebrow">Pricing Snapshot</div>
          <h2 className="section-title">参考报价概览</h2>
          <p className="section-intro">
            先给出一个可理解的价格分层。详细逻辑建议后续再放进 `pricing-policy` 页面中解释。
          </p>
          <div className="pricing-grid">
            <div className="price-tier">
              <h3>Entry / 低门槛入口</h3>
              <p>适合先开始合作、先看方向、先做轻量服务。</p>
              <div className="price-list">
                <div className="price-item">
                  <strong>15 秒 AI 视觉短视频 — ¥1000 起</strong>
                  <span>适合抖音 / 小红书 / 活动预热 / 品牌测试</span>
                </div>
                <div className="price-item">
                  <strong>项目咨询 — ¥300–500 / 30 分钟</strong>
                  <span>适合快速判断方向与可行性</span>
                </div>
                <div className="price-item">
                  <strong>作品集 / 创作咨询 — ¥200 / 30 分钟</strong>
                  <span>适合学生、申请与创作结构梳理</span>
                </div>
                <div className="price-item">
                  <strong>工程诊断轻服务 — ¥800 起</strong>
                  <span>适合工程结构检查、问题定位与建议</span>
                </div>
              </div>
            </div>
            <div className="price-tier">
              <h3>Standard / 主力服务</h3>
              <p>适合大多数真实合作与项目开发。</p>
              <div className="price-list">
                <div className="price-item">
                  <strong>15–30 秒 AI 视频 — ¥2500 起</strong>
                  <span>含基础镜头组织与节奏处理</span>
                </div>
                <div className="price-item">
                  <strong>单条视觉内容开发 — ¥3000 起</strong>
                  <span>适合舞台、空间、loop 与背景内容</span>
                </div>
                <div className="price-item">
                  <strong>概念视觉 / moodboard / 风格探索 — ¥1500–3000</strong>
                  <span>适合前期方向判断与提案支持</span>
                </div>
                <div className="price-item">
                  <strong>半天工作坊 — ¥4000–6000 起</strong>
                  <span>适合 AI 视觉、数字展览、XR 基础入门</span>
                </div>
              </div>
            </div>
            <div className="price-tier">
              <h3>Premium / 高价值项目</h3>
              <p>复杂度高、容错低、版本重或交付压力大的项目。</p>
              <div className="price-list">
                <div className="price-item">
                  <strong>Opening Visual — ¥8000–30000+</strong>
                  <span>演唱会、发布会、live set 核心段落</span>
                </div>
                <div className="price-item">
                  <strong>双目 / XR 样片 — ¥5000 起</strong>
                  <span>适合 proof of concept 与方向验证</span>
                </div>
                <div className="price-item">
                  <strong>双目演出背景 / Apple Vision Pro 内容 — ¥8000–40000+</strong>
                  <span>取决于平台、格式、时长与展示条件</span>
                </div>
                <div className="price-item">
                  <strong>数字展览 / 展示系统 — ¥8000 起</strong>
                  <span>含展品分类、页面结构与公开入口组织</span>
                </div>
              </div>
            </div>
          </div>
          <p className="section-intro" style={{ marginTop: '22px' }}>
            以上为参考起步区间。最终报价通常会根据内容复杂度、版本数量、修改轮次、平台要求、展示场景、是否需要现场配合与版权范围进行调整。
          </p>
          <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <a href="./services/case-notes.html#opening-visual" className="button">
              为什么开场视觉更贵？
            </a>
            <a href="./services/case-notes.html#xr-test" className="button">
              为什么双目/XR建议先做测试？
            </a>
            <a href="./services/case-notes.html#engineering" className="button">
              为什么工程调试按小时？
            </a>
            <a href="./services/pricing-policy.html" className="button primary">
              完整报价政策说明 →
            </a>
          </div>
        </div>

        <div className="section" style={{ padding: '48px 0 0' }}>
          <div className="eyebrow">About</div>
          <h2 className="section-title">为什么找我合作</h2>
          <p className="section-intro">
            我不是只做图，也不是只讲概念。我更适合那些需要把视觉、空间、结构、版本和交付一起做起来的项目。
          </p>
          <div className="why-grid">
            <div className="why-card">
              <h4>作品与服务并行</h4>
              <p>既有作品线，也能把能力整理成可购买、可交付的服务结构。</p>
            </div>
            <div className="why-card">
              <h4>懂结构，不只做画面</h4>
              <p>会处理视觉内容、项目版本、展示逻辑与交付流程，而不只是单张视觉效果。</p>
            </div>
            <div className="why-card">
              <h4>适合复杂但需要清楚的人</h4>
              <p>尤其适合舞台、空间、双目 / XR、数字展览和 workflow 不清的项目。</p>
            </div>
            <div className="why-card">
              <h4>兼顾艺术感与落地性</h4>
              <p>既能保持风格和表达，也会考虑预算、版本、平台、屏幕比例与真实交付。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductionServices
