import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const writings = {
  featured: [
    {
      id: 'space-image-experience',
      title: '从空间内部展开的图像经验',
      type: 'Essay',
      date: '2025',
      summary: '围绕 Drop Flow 的空间性、流体结构与沉浸式观看展开的一篇作品评论。',
      relatedWork: 'drop-flow',
      relatedNode: null,
      status: 'published'
    },
    {
      id: 'timer-not-sync',
      title: 'TIMER 不是“卡点视频”',
      type: 'Essay',
      date: '2024–2025',
      summary: '讨论 TIMER 系列如何把节拍、频段与时间结构转成图像组织，而不是停留在表层同步。',
      relatedWork: 'timer',
      relatedNode: null,
      status: 'published'
    },
    {
      id: 'live-collab-not-bg',
      title: '现场合作不是背景视觉',
      type: 'Field Note',
      date: '2025',
      summary: '从 Kashiwa / TITAN 等合作出发，讨论现场视觉如何成为空间经验的一部分，而不是附属屏幕内容。',
      relatedWork: 'kashiwa',
      relatedNode: 'can-festival',
      status: 'published'
    },
    {
      id: 'archive-redesign',
      title: '个人档案系统为什么要重新设计',
      type: 'Research',
      date: '2025',
      summary: '关于 archive、viewer、内容协议与作品长期组织方式的一篇研究笔记。',
      relatedWork: null,
      relatedNode: null,
      status: 'published'
    }
  ],
  essays: [
    {
      id: 'space-image-experience',
      title: '从空间内部展开的图像经验',
      type: 'Essay',
      date: '2025',
      summary: '围绕空间内部、流体感与观看关系展开。',
      relatedWork: 'drop-flow',
      relatedNode: null,
      status: 'published'
    },
    {
      id: 'timer-temporal',
      title: 'TIMER 系列中的时间控制与感知组织',
      type: 'Essay',
      date: '2024–2025',
      summary: '讨论节拍、频段、视觉结构与观看节奏。',
      relatedWork: 'timer',
      relatedNode: null,
      status: 'published'
    },
    {
      id: 'kashiwa-collab',
      title: '机械光合：现场合作中的结构与氛围',
      type: 'Essay',
      date: '2025',
      summary: '讨论合作项目中的视觉角色、空间段落与现场氛围。',
      relatedWork: 'kashiwa',
      relatedNode: 'can-festival',
      status: 'published'
    },
    {
      id: 'observation-symbiosis',
      title: '观察与共生：环境如何成为作品的一部分',
      type: 'Essay',
      date: '2023–2025',
      summary: '围绕扫描、数字自然与环境逻辑展开。',
      relatedWork: null,
      relatedNode: 'observation-and-symbiosis',
      status: 'published'
    }
  ],
  notes: [
    {
      id: 'practice-lines-not-list',
      title: '为什么我会把作品分成“实践线”而不是单纯项目列表',
      type: 'Note',
      date: '2025',
      summary: '',
      relatedWork: null,
      relatedNode: null,
      status: 'draft'
    },
    {
      id: 'public-nodes-not-news',
      title: '为什么公开节点不等于“新闻”',
      type: 'Note',
      date: '2025',
      summary: '',
      relatedWork: null,
      relatedNode: null,
      status: 'draft'
    },
    {
      id: 'viewer-specs-part-of-system',
      title: '为什么 viewer / specs 会成为作品系统的一部分',
      type: 'Note',
      date: '2025',
      summary: '',
      relatedWork: null,
      relatedNode: null,
      status: 'draft'
    },
    {
      id: 'practice-then-production',
      title: '为什么首页应该先读 Practice，再进入 Production',
      type: 'Note',
      date: '2025',
      summary: '',
      relatedWork: null,
      relatedNode: null,
      status: 'draft'
    },
    {
      id: 'nodal-organization',
      title: '为什么作品、节点、图片、文章应该被节点化组织',
      type: 'Note',
      date: '2025',
      summary: '',
      relatedWork: null,
      relatedNode: null,
      status: 'draft'
    }
  ],
  fieldNotes: [
    {
      id: 'ufo-terminal-testing',
      title: 'UFO Terminal 的现场测试与结构调整',
      type: 'Field Note',
      date: '2025',
      summary: '',
      relatedWork: 'drop-flow',
      relatedNode: 'ufo-terminal',
      status: 'planned'
    },
    {
      id: 'bo-live-debrief',
      title: 'BO LIVE 演出的视觉段落复盘',
      type: 'Field Note',
      date: '2025',
      summary: '',
      relatedWork: 'kashiwa',
      relatedNode: null,
      status: 'planned'
    },
    {
      id: 'venue-screen-distance',
      title: '关于场地、屏幕和观看距离的记录',
      type: 'Field Note',
      date: '2025',
      summary: '',
      relatedWork: null,
      relatedNode: null,
      status: 'planned'
    },
    {
      id: 'viewer-test-changes-work',
      title: '一次 viewer / playback 测试为什么会改变作品结构',
      type: 'Field Note',
      date: '2025',
      summary: '',
      relatedWork: null,
      relatedNode: null,
      status: 'planned'
    },
    {
      id: 'rehearsal-to-public-node',
      title: '从 rehearsal 到 public node：现场条件如何反过来塑造作品',
      type: 'Field Note',
      date: '2025',
      summary: '',
      relatedWork: null,
      relatedNode: null,
      status: 'planned'
    }
  ],
  research: [
    {
      id: 'portfolio-not-enough',
      title: '个人作品网站为什么不能只是 portfolio',
      type: 'Research',
      date: '2025',
      summary: '',
      relatedWork: null,
      relatedNode: null,
      status: 'planned'
    },
    {
      id: 'graph-native-structure',
      title: 'graph-native website 的基本结构',
      type: 'Research',
      date: '2025',
      summary: '',
      relatedWork: null,
      relatedNode: null,
      status: 'planned'
    },
    {
      id: 'archive-vs-public-node',
      title: 'archive 与 public node 的区别',
      type: 'Research',
      date: '2025',
      summary: '',
      relatedWork: null,
      relatedNode: null,
      status: 'planned'
    },
    {
      id: 'viewer-venue-spec-objects',
      title: 'viewer / venue / spec 为什么需要成为内容对象',
      type: 'Research',
      date: '2025',
      summary: '',
      relatedWork: null,
      relatedNode: null,
      status: 'planned'
    },
    {
      id: 'content-protocol',
      title: '内容协议如何支撑个人站、团队站与作品查看层',
      type: 'Research',
      date: '2025',
      summary: '',
      relatedWork: null,
      relatedNode: null,
      status: 'planned'
    }
  ]
}

const allWriting = [
  ...writings.featured,
  ...writings.essays,
  ...writings.notes,
  ...writings.fieldNotes,
  ...writings.research
]

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
              {writing.summary && <p>{writing.summary}</p>}
            </div>
            <div className="writing-list-date">
              {writing.date}
              {writing.status === 'draft' && <span className="writing-status">draft</span>}
              {writing.status === 'planned' && <span className="writing-status">planned</span>}
            </div>
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
            <h1 className="section-title">写作与笔记</h1>
            <p className="section-intro">
              这里记录围绕作品、方法、现场经验、技术规格与档案系统展开的持续写作。
              它不是附属说明，而是创作实践的一部分：作品如何成立、如何被组织、如何进入空间、如何被交付、如何被继续阅读，都会在这里被展开。
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">Featured Writings / 重点写作</h2>
            <div className="grid-2">
              {writings.featured.map((writing) => (
                <article key={writing.id} className="card writing-card">
                  <div className="writing-type">{writing.type}</div>
                  <h3>{writing.title}</h3>
                  {writing.summary && <p>{writing.summary}</p>}
                  <div className="writing-meta">{writing.date}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <WritingList items={writings.essays} title="Essays / 作品评论" />
        <WritingList items={writings.notes} title="Notes / 方法笔记" />
        <WritingList items={writings.fieldNotes} title="Field Notes / 现场与过程记录" />
        <WritingList items={writings.research} title="Research / 研究条目" />
        
        <section className="section">
          <div className="container">
            <h2 className="section-title">All Writing / 全部写作</h2>
            <div className="writing-list">
              {allWriting.map((writing) => (
                <article key={writing.id} className="writing-list-item">
                  <div className="writing-list-type">{writing.type}</div>
                  <div className="writing-list-content">
                    <h3>{writing.title}</h3>
                    {writing.summary && <p>{writing.summary}</p>}
                  </div>
                  <div className="writing-list-date">
                    {writing.date}
                    {writing.status === 'draft' && <span className="writing-status">draft</span>}
                    {writing.status === 'planned' && <span className="writing-status">planned</span>}
                  </div>
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
