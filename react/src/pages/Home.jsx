import React from 'react'
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

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProfileDirections />
        <SelectedWorks />
        <PracticeLines />
        <ImageWall />
        <ArtisticOverview />
        <CreativeTimeline />
        <CreativeNetwork />
      </main>
      <Footer />
    </>
  )
}

export default Home
