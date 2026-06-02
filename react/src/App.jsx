import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Writing from './pages/Writing.jsx'
import Production from './pages/Production.jsx'
import Archive from './pages/Archive.jsx'
import GaussianScenes from './pages/GaussianScenes.jsx'
import Works from './pages/Works.jsx'
import Profile from './pages/Profile.jsx'
import YuJiayun45m2 from './pages/YuJiayun45m2.jsx'
import RainSingapore from './pages/RainSingapore.jsx'
import KashiwaTitan from './pages/KashiwaTitan.jsx'
import MotionSystem from './motion/MotionSystem.jsx'
import './styles/global.css'

function App() {
  const location = useLocation()
  const { key, pathname, state } = location

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
        <Route path="/writing" element={<Writing />} />
        <Route path="/production" element={<Production />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/gaussian-scenes" element={<GaussianScenes />} />
        <Route path="/projects/kashiwa-titan" element={<KashiwaTitan />} />
        <Route path="/projects/yujiayun-45m2" element={<YuJiayun45m2 />} />
        <Route path="/projects/rain-singapore" element={<RainSingapore />} />
      </Routes>
    </MotionSystem>
  )
}

export default App
