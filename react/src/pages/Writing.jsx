import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const writings = [
  {
    id: 'drop-flow-note',
    title: '从空间内部展开的图像经验',
    type: 'Essay',
    date: '2025',
    summary: '关于 Drop Flow 系列的创作笔记',
    featured: true
  },
  {
    id: 'timer-method',
    title: 'TIMER 系列的时间控制方法',
    type: 'Note',
    date: '2024',
    summary: '节拍、频段与结构',
    featured: false
  },
  {
    id: 'kashiwa-collaboration',
    title: '现场合作的工作流',
    type: 'Field Note',
    date: '2025',
    summary: '与 Kashiwa Daisuke 合作的过程记录',
    featured: false
  },
  {
    id: 'archive-design',
    title: '个人档案系统的设计',
    type: 'Research',
    date: '2025',
    summary: '如何构建持续演进的作品档案',
    featured: true
  }
]

const Writing = () => {
  return (
    <>
      <Header />
      <main className="page-writing">
        <section className="section">
          <div className="container">
            <div className="eyebrow">Writing</div>
            <h1 className="section-title">写作</h1>
            <p className="section-intro">
              研究笔记、创作反思、方法整理，作为实践的智力层。
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">Featured Writings</h2>
            <div className="grid-2">
              {writings.filter(w => w.featured).map((writing) => (
                <article key={writing.id} className="card writing-card">
                  <div className="writing-type">{writing.type}</div>
                  <h3>{writing.title}</h3>
                  <p>{writing.summary}</p>
                  <div className="writing-meta">{writing.date}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">All Writing</h2>
            <div className="writing-list">
              {writings.map((writing) => (
                <article key={writing.id} className="writing-list-item">
                  <div className="writing-list-type">{writing.type}</div>
                  <div className="writing-list-content">
                    <h3>{writing.title}</h3>
                    <p>{writing.summary}</p>
                  </div>
                  <div className="writing-list-date">{writing.date}</div>
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

export default Writing
