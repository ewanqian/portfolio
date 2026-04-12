import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import ArtisticOverview from '../components/sections/ArtisticOverview'
import ProfileDirections from '../components/sections/ProfileDirections'
import SelectedWorks from '../components/sections/SelectedWorks'
import ImageWall from '../components/sections/ImageWall'
import CreativeTimeline from '../components/sections/CreativeTimeline'
import CreativeNetwork from '../components/sections/CreativeNetwork'
import PracticeLines from '../components/sections/PracticeLines'
import ArchiveEntry from '../components/sections/ArchiveEntry'

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ArtisticOverview />
        <ProfileDirections />
        <SelectedWorks />
        <ImageWall />
        <CreativeTimeline />
        <CreativeNetwork />
        <PracticeLines />
        <ArchiveEntry />
        
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
