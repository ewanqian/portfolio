import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import ArtisticOverview from '../components/sections/ArtisticOverview'
import SelectedWorks from '../components/sections/SelectedWorks'
import ImageWall from '../components/sections/ImageWall'
import PracticeLines from '../components/sections/PracticeLines'

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ArtisticOverview />
        <SelectedWorks />
        <ImageWall />
        <PracticeLines />
        
        <section className="section">
          <div className="container">
            <div className="entry-banner">
              <div className="entry-banner-content">
                <h2>Writing</h2>
                <p>研究笔记、创作反思、方法整理</p>
                <Link to="/writing" className="btn btn-primary">Enter Writing</Link>
              </div>
            </div>
          </div>
        </section>
        
        <section className="section">
          <div className="container">
            <div className="eyebrow">Archive</div>
            <h2 className="section-title">更多作品与档案</h2>
            <p className="section-intro">
              完整的作品档案与项目记录正在整理中。
            </p>
            <div style={{ marginTop: '32px' }}>
              <a href="#" className="btn btn-outline">View Full Archive</a>
            </div>
          </div>
        </section>
        
        <section className="section">
          <div className="container">
            <div className="entry-banner">
              <div className="entry-banner-content">
                <h2>Production</h2>
                <p>制作服务与协作流程</p>
                <Link to="/production" className="btn btn-outline">Enter Production</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home
