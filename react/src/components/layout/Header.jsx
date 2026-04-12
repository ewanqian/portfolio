import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isLight, toggleTheme } = useTheme()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.key])

  const goHome = (scrollTo) => {
    if (scrollTo) {
      navigate('/', { state: { scrollTo } })
    } else {
      navigate('/')
    }
    setMenuOpen(false)
  }

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <NavLink to="/" end className="brand" onClick={() => setMenuOpen(false)}>
          Ewan Qian / Portfolio
        </NavLink>
        <div className="topbar-actions">
          <button
            type="button"
            className="theme-toggle"
            aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
            aria-pressed={isLight}
            onClick={toggleTheme}
          >
            <span className="icon-sun" aria-hidden="true">☀</span>
            <span className="icon-moon" aria-hidden="true">☾</span>
          </button>
          <button
            type="button"
            className={`menu-toggle ${menuOpen ? 'active' : ''}`}
            id="menuToggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
        <nav className={`nav ${menuOpen ? 'open' : ''}`} id="site-nav" aria-label="Primary">
          <button type="button" className="nav-button" onClick={() => goHome()}>
            Practice
          </button>
          <button type="button" className="nav-button" onClick={() => goHome('works')}>
            Works
          </button>
          <button type="button" className="nav-button" onClick={() => goHome('image-wall')}>
            Public Nodes
          </button>
          <NavLink to="/writing" end className={({ isActive }) => (isActive ? 'active' : undefined)} onClick={() => setMenuOpen(false)}>
            Writing
          </NavLink>
          <NavLink to="/archive" end className={({ isActive }) => (isActive ? 'active' : undefined)} onClick={() => setMenuOpen(false)}>
            Archive
          </NavLink>
          <NavLink to="/production" end className={({ isActive }) => (isActive ? 'active' : undefined)} onClick={() => setMenuOpen(false)}>
            Production
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
