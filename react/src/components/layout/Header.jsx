import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
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

  const homeNavItems = [
    { id: 'overview', label: 'Overview', scrollTo: 'profile-directions' },
    { id: 'works', label: 'Works', scrollTo: 'works' }
  ]

  const routeNavItems = [
    { id: 'gaussian', label: 'Gaussian', to: '/gaussian-scenes' },
    { id: 'production', label: 'Production', to: '/production' },
    { id: 'archive', label: 'Archive', to: '/archive' },
    { id: 'writing', label: 'Writing', to: '/writing' }
  ]

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
          {homeNavItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="nav-link nav-button"
              onClick={() => goHome(item.scrollTo)}
            >
              {item.label}
            </button>
          ))}
          {routeNavItems.map((item) => {
            const isActive = item.activeOn ? item.activeOn.includes(location.pathname) : location.pathname === item.to

            return (
              <Link
                key={item.id}
                to={item.to}
                className={`nav-link ${isActive ? 'active' : ''}`.trim()}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export default Header
