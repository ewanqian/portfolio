import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomeLegacy from './pages/Home.jsx'
import Writing from './pages/Writing.jsx'
import Production from './pages/Production.jsx'
import Archive from './pages/Archive.jsx'
import HomeV4 from './pages/HomeV4.jsx'
import HomeV5 from './pages/HomeV5.jsx'
import HomeV6 from './pages/HomeV6.jsx'
import HomeV7 from './pages/HomeV7.jsx'
import HomeV8 from './pages/HomeV8.jsx'
import HomeV9 from './pages/HomeV9.jsx'
import Works from './pages/Works.jsx'
import Profile from './pages/Profile.jsx'
import GaussianScenes from './pages/GaussianScenes.jsx'
import GaussianSceneDetail from './pages/GaussianSceneDetail.jsx'
import DropFlowCase from './pages/DropFlowCase.jsx'
import TimerCase from './pages/TimerCase.jsx'
import KashiwaTitan from './pages/KashiwaTitan.jsx'
import YuJiayun45m2 from './pages/YuJiayun45m2.jsx'
import RainSingapore from './pages/RainSingapore.jsx'
import './styles/global.css'
import './styles/home-v4.css'
import './styles/home-v5.css'
import './styles/home-v6.css'
import './styles/home-v7.css'
import './styles/home-v8.css'
import './styles/home-v9.css'
import './styles/frontstage.css'

const legacyPathRedirects = {
  '/portfolio/works/drop-flow.html': '/portfolio/#/projects/drop-flow',
  '/portfolio/works/timer.html': '/portfolio/#/projects/timer',
  '/portfolio/works/kashiwa.html': '/portfolio/#/projects/kashiwa-titan',
  '/works/drop-flow.html': '/portfolio/#/projects/drop-flow',
  '/works/timer.html': '/portfolio/#/projects/timer',
  '/works/kashiwa.html': '/portfolio/#/projects/kashiwa-titan'
}

function LegacyPathRedirect() {
  useEffect(() => {
    const target = legacyPathRedirects[window.location.pathname]

    if (target) {
      window.location.replace(target)
    }
  }, [])

  return null
}

function App() {
  return (
    <>
      <LegacyPathRedirect />
      <Routes>
        <Route path="/" element={<HomeV9 />} />
        <Route path="/lab/home-legacy" element={<HomeLegacy />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/production" element={<Production />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/lab/home-v4" element={<HomeV4 />} />
        <Route path="/lab/home-v5" element={<HomeV5 />} />
        <Route path="/lab/home-v6" element={<HomeV6 />} />
        <Route path="/lab/home-v7" element={<HomeV7 />} />
        <Route path="/lab/home-v8" element={<HomeV8 />} />
        <Route path="/lab/home-v9" element={<HomeV9 />} />
        <Route path="/works" element={<Works />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/gaussian-scenes" element={<GaussianScenes />} />
        <Route path="/gaussian-scenes/:slug" element={<GaussianSceneDetail />} />
        <Route path="/projects/drop-flow" element={<DropFlowCase />} />
        <Route path="/projects/timer" element={<TimerCase />} />
        <Route path="/projects/kashiwa-titan" element={<KashiwaTitan />} />
        <Route path="/projects/yujiayun-45m2" element={<YuJiayun45m2 />} />
        <Route path="/projects/rain-singapore" element={<RainSingapore />} />
      </Routes>
    </>
  )
}

export default App
