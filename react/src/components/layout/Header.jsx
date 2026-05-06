import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isLight, toggleTheme } = useTheme()
  const { language, setLanguage } = useLanguage()

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
    { id: 'overview', label: language === 'en' ? 'Overview' : '概览', scrollTo: 'profile-directions' },
    { id: 'selected', label: language === 'en' ? 'Selected' : '精选', scrollTo: 'works' }
  ]

  const routeNavItems = [
    { id: 'works', label: language === 'en' ? 'Works' : '作品', to: '/works' },
    { id: 'production', label: language === 'en' ? 'Production' : '合作', to: '/production' },
    { id: 'archive', label: language === 'en' ? 'Archive' : '档案', to: '/archive' },
    { id: 'writing', label: language === 'en' ? 'Writing' : '写作', to: '/writing' }
  ]

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <NavLink to="/" end className="brand" onClick={() => setMenuOpen(false)}>
          Ewan Qian / Portfolio
        </NavLink>
        <div className="topbar-actions">
          <div className="language-toggle" role="group" aria-label={language === 'en' ? 'Language switcher' : '语言切换'}>
            <button
              type="button"
              className={`language-toggle-option ${language === 'zh' ? 'active' : ''}`.trim()}
              onClick={() => setLanguage('zh')}
            >
              中
            </button>
            <button
              type="button"
              className={`language-toggle-option ${language === 'en' ? 'active' : ''}`.trim()}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
          </div>
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
