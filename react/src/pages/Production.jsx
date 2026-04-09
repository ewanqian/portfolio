import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const services = [
  {
    id: 'live-visuals',
    title: 'Live Visuals / 现场视觉',
    description: '演出、发布会、展览开幕的实时视觉设计'
  },
  {
    id: 'immersive-installation',
    title: 'Immersive Installation / 沉浸装置',
    description: '空间影像、环境设计与交互体验'
  },
  {
    id: 'previsualization',
    title: 'Previsualization / 预演与可视化',
    description: '项目前期的可视化与技术验证'
  },
  {
    id: 'archive-design',
    title: 'Archive Design / 档案设计',
    description: '作品档案与知识系统的设计'
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
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">Pricing</h2>
            <div className="pricing-box">
              <p>定制化报价，根据项目规模和复杂度确定。</p>
              <a href="#contact" className="btn btn-primary">Request a Quote</a>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">FAQ</h2>
            <div className="faq-list">
              <article className="faq-item">
                <h3>Q: 项目周期一般是多长？</h3>
                <p>A: 从几周到几个月不等，取决于项目类型和复杂度。</p>
              </article>
              <article className="faq-item">
                <h3>Q: 如何开始合作？</h3>
                <p>A: 请先发送项目简介，我们会安排一次免费咨询。</p>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container">
            <h2 className="section-title">Inquiry</h2>
            <div className="contact-box">
              <p>欢迎通过以下方式联系：</p>
              <div className="socials">
                <a className="social-pill" href="mailto:hello@ewanqian.com">Email</a>
                <a className="social-pill" href="https://www.instagram.com/ewanqian/" target="_blank" rel="noreferrer">Instagram</a>
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
