import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Writing from './pages/Writing.jsx'
import Production from './pages/Production.jsx'
import Archive from './pages/Archive.jsx'
import './styles/global.css'

function App() {
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
