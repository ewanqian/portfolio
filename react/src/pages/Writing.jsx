import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const writings = {
  featured: [
    {
      id: 'drop-flow-note',
      title: '从空间内部展开的图像经验',
      type: 'Essay',
      date: '2025',
      summary: '关于 Drop Flow 系列在杭州双年展的创作反思，讨论空间感知与实时生成的关系。',
      relatedWork: 'drop-flow',
      relatedNode: 'drop-flow-hangzhou-biennale'
    },
    {
      id: 'archive-design',
      title: '个人档案系统的设计',
      type: 'Research',
      date: '2025',
      summary: '如何构建持续演进的作品档案与知识系统，讨论文件结构、关系映射与自动化工具。',
      relatedWork: null,
      relatedNode: null
    }
  ],
  essays: [
    {
      id: 'timer-method',
      title: 'TIMER 系列的时间控制方法',
      type: 'Essay',
      date: '2024',
      summary: '节拍、频段与结构，讨论如何在视听系统中建立时间感知的层次。',
      relatedWork: 'timer',
      relatedNode: null
    },
    {
      id: 'kashiwa-collaboration',
      title: '现场合作的工作流',
      type: 'Essay',
      date: '2025',
      summary: '与 Kashiwa Daisuke 合作的过程记录，讨论排练、预演与现场应变。',
      relatedWork: 'kashiwa',
      relatedNode: 'can-festival'
    }
  ],
  notes: [
    {
      id: 'realtime-tools',
      title: '实时工具链笔记',
      type: 'Note',
      date: '2024',
      summary: 'TouchDesigner, Max, Unity 之间的工作流衔接与参数传递方案。',
      relatedWork: null,
      relatedNode: null
    },
    {
      id: 'projection-mapping',
      title: '投影映射的基础问题',
      type: 'Note',
      date: '2023',
      summary: '几何校正、边缘融合、亮度控制的常见坑点与解决方案。',
      relatedWork: null,
      relatedNode: null
    }
  ],
  fieldNotes: [
    {
      id: 'ufo-terminal-field',
      title: 'UFO Terminal 营地现场',
      type: 'Field Note',
      date: '2025',
      summary: '创作营期间的空间测试、技术故障与即兴调整记录。',
      relatedWork: 'drop-flow',
      relatedNode: 'ufo-terminal'
    },
    {
      id: 'hangzhou-setup',
      title: '杭州双年展开幕前夜',
      type: 'Field Note',
      date: '2025',
      summary: '场地勘查、设备调试、与观众的第一次接触。',
      relatedWork: 'drop-flow',
      relatedNode: 'drop-flow-hangzhou-biennale'
    }
  ],
  research: [
    {
      id: 'spatial-perception',
      title: '空间感知文献整理',
      type: 'Research',
      date: '2024',
      summary: '围绕沉浸体验、环境心理学与建筑现象学的阅读笔记。',
      relatedWork: null,
      relatedNode: null
    },
    {
      id: 'color-spaces',
      title: '色彩空间与显示设备',
      type: 'Research',
      date: '2023',
      summary: 'sRGB, Rec.709, P3 之间的转换，以及不同投影仪的特性记录。',
      relatedWork: null,
      relatedNode: null
    }
  ]
}

const WritingList = ({ items, title }) => (
  <section className="section">
    <div className="container">
      <h2 className="section-title">{title}</h2>
      <div className="writing-list">
        {items.map((writing) => (
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
)

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
              {writings.featured.map((writing) => (
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

        <WritingList items={writings.essays} title="Essays" />
        <WritingList items={writings.notes} title="Notes" />
        <WritingList items={writings.fieldNotes} title="Field Notes" />
        <WritingList items={writings.research} title="Research" />
      </main>
      <Footer />
    </>
  )
}

export default Writing
