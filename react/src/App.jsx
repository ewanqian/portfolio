import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Writing from './pages/Writing.jsx'
import WritingDetail from './pages/WritingDetail.jsx'
import Production from './pages/Production.jsx'
import Archive from './pages/Archive.jsx'
import GaussianScenes from './pages/GaussianScenes.jsx'
import Works from './pages/Works.jsx'
import Profile from './pages/Profile.jsx'
import Workshops from './pages/Workshops.jsx'
import WorkshopSeries from './pages/WorkshopSeries.jsx'
import YuJiayun45m2 from './pages/YuJiayun45m2.jsx'
import RainSingapore from './pages/RainSingapore.jsx'
import KashiwaTitan from './pages/KashiwaTitan.jsx'
import DigitalGarden from './pages/DigitalGarden.jsx'
import CommissionedVisualProject from './pages/CommissionedVisualProject.jsx'
import MotionSystem from './motion/MotionSystem.jsx'
import './styles/global.css'
import './styles/home-system.css'
import './styles/navigation-adjustments.css'

const STATIC_WORK_SLUGS = {
  'drop-flow': true,
  'timer': true,
  'titan': true,
  'kashiwa': true,
  'mke-terminal': true,
  'sre-realtime-liveset': true,
  'no-further-input-required': true,
}

function App() {
  const location = useLocation()
  const { key, pathname, state } = location

  useEffect(() => {
    const match = pathname.match(/^\/works\/([^/?#]+)/)
    if (!match) {
      return
    }

    const slug = decodeURIComponent(match[1]).replace(/\.html$/i, '')
    if (!STATIC_WORK_SLUGS[slug]) {
      return
    }

    const base = window.location.pathname.indexOf('/portfolio') === 0 ? '/portfolio' : ''
    window.location.replace(`${base}/works/${slug}`)
  }, [pathname])

  useEffect(() => {
    const targetId = state?.scrollTo

    const frame = window.requestAnimationFrame(() => {
      if (targetId) {
        const element = document.getElementById(targetId)

        if (element) {
          element.scrollIntoView({ behavior: 'auto', block: 'start' })
          return
        }
      }

      window.scrollTo({ top: 0, behavior: 'auto' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [key, pathname, state])

  return (
    <MotionSystem routeKey={key}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/workshops/:slug" element={<WorkshopSeries />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/writing/:slug" element={<WritingDetail />} />
        <Route path="/production" element={<Production />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/gaussian-scenes" element={<GaussianScenes />} />
        <Route path="/projects/titan" element={<KashiwaTitan />} />
        <Route path="/projects/kashiwa-titan" element={<KashiwaTitan />} />
        <Route path="/projects/yujiayun-45m2" element={<YuJiayun45m2 />} />
        <Route path="/projects/rain-singapore" element={<RainSingapore />} />
        <Route path="/projects/digital-garden" element={<DigitalGarden />} />
        <Route path="/projects/xtep-xdna" element={<CommissionedVisualProject projectId="xtep" />} />
        <Route path="/projects/zcool-hp-g8" element={<CommissionedVisualProject projectId="zcool" />} />
      </Routes>
    </MotionSystem>
  )
}

export default App
