import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import Hero from './components/sections/Hero.jsx'
import ArtisticOverview from './components/sections/ArtisticOverview.jsx'
import SelectedWorks from './components/sections/SelectedWorks.jsx'
import ImageWall from './components/sections/ImageWall.jsx'
import CreativeTimeline from './components/sections/CreativeTimeline.jsx'
import CreativeNetwork from './components/sections/CreativeNetwork.jsx'
import PracticeMap from './components/sections/PracticeMap.jsx'
import ArchiveEntry from './components/sections/ArchiveEntry.jsx'
import ProductionServices from './components/sections/ProductionServices.jsx'
import FAQ from './components/sections/FAQ.jsx'
import Contact from './components/sections/Contact.jsx'
import './styles/global.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ArtisticOverview />
        <SelectedWorks />
        <ImageWall />
        <CreativeTimeline />
        <CreativeNetwork />
        <PracticeMap />
        <ArchiveEntry />
        <section id="events" className="section">
          <div className="container">
            <div className="eyebrow">Public Events</div>
            <h2 className="section-title">公共活动与日程</h2>
            <p className="section-intro">
              工作坊、讲座、开放日与其他公开呈现。
            </p>
            <div style={{ marginTop: '32px' }}>
              <iframe 
                src="https://luma.com/embed/calendar/cal-pJpAEYZW4waStHL/events" 
                width="100%" 
                height="450" 
                frameBorder="0" 
                style={{ border: '1px solid var(--line)', borderRadius: 0 }} 
                allowFullScreen 
                aria-hidden="false" 
                tabIndex="0" 
              />
            </div>
          </div>
        </section>
        <ProductionServices />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
