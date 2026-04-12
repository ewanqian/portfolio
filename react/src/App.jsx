import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Writing from './pages/Writing.jsx'
import Production from './pages/Production.jsx'
import Archive from './pages/Archive.jsx'
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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/writing" element={<Writing />} />
      <Route path="/production" element={<Production />} />
      <Route path="/archive" element={<Archive />} />
    </Routes>
  )
}

export default App
