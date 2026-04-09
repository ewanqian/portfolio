import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import works from '../data/generated/works'
import nodes from '../data/generated/nodes'

const Archive = () => {
  return (
    <>
      <Header />
      <main className="page-archive">
        <section className="section">
          <div className="container">
            <div className="eyebrow">Archive</div>
            <h1 className="section-title">完整档案</h1>
            <p className="section-intro">
              所有作品、项目与公开呈现的完整索引。
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">Works / 作品</h2>
            <div className="archive-grid">
              {works.map((work) => (
                <article key={work.id} className="archive-item">
                  <div className="archive-item-image">
                    <img src={work.image} alt={work.title} />
                  </div>
                  <div className="archive-item-content">
                    <h3>{work.title}</h3>
                    <p className="archive-item-years">{work.years}</p>
                    <p>{work.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">Public Nodes / 公开呈现节点</h2>
            <div className="archive-grid">
              {nodes.map((node) => (
                <article key={node.id} className="archive-item">
                  <div className="archive-item-image">
                    <img src={node.image} alt={node.title} />
                  </div>
                  <div className="archive-item-content">
                    <h3>{node.title}</h3>
                    <p className="archive-item-years">{node.year}</p>
                    <p className="archive-item-category">{node.category}</p>
                    <p>{node.summary}</p>
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

export default Archive
