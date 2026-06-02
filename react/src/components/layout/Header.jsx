import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { isLight, toggleTheme } = useTheme()
  const { language, setLanguage } = useLanguage()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.key])

  const routeNavItems = [
    { id: 'home', label: language === 'en' ? 'Home' : '首页', to: '/' },
    { id: 'works', label: language === 'en' ? 'Gallery' : '画廊', to: '/works' },
    { id: 'production', label: language === 'en' ? 'Production' : '制作', to: '/production' },
    { id: 'archive', label: language === 'en' ? 'Archive' : '归档', to: '/archive' },
    { id: 'spatial', label: language === 'en' ? 'Spatial' : '空间', to: '/gaussian-scenes' },
    { id: 'writing', label: language === 'en' ? 'Writing' : '写作', to: '/writing' },
    { id: 'profile', label: language === 'en' ? 'Profile' : '个人', to: '/profile' }
  ]

  const externalNavItems = [
    { id: 'collective', label: language === 'en' ? 'Collective' : '团队', href: '//virtura.space/' },
    { id: 'spaceport', label: 'SpacePort', href: '//spaceport.virtura.space/' },
    { id: 'newsroom', label: 'Newsroom', href: '//newsroom.virtura.space/' }
  ]

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <NavLink to="/" end className="brand" onClick={() => setMenuOpen(false)}>
          {language === 'en' ? 'Ewan Qian / Portfolio' : '钱誉文 / 作品集'}
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
          {externalNavItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="nav-link"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
