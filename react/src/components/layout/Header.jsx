import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { language, setLanguage } = useLanguage()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.key])

  const routeNavItems = [
    { id: 'work', label: language === 'en' ? 'Work' : '项目', to: '/works', activeOn: ['/works', '/projects'] },
    {
      id: 'archive',
      label: language === 'en' ? 'Archive' : '归档',
      to: '/archive',
      activeOn: ['/archive', '/gaussian-scenes', '/production', '/writing']
    },
    { id: 'atlas', label: language === 'en' ? 'Atlas' : '图谱', href: '/works/atlas.html' },
    { id: 'apps', label: language === 'en' ? 'Apps' : '应用', to: '/apps' },
    { id: 'workshops', label: language === 'en' ? 'Workshops' : '工作坊', to: '/workshops', activeOn: ['/workshops'] },
    { id: 'about', label: language === 'en' ? 'About' : '关于', to: '/profile' }
  ]

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <NavLink to="/" end className="brand" onClick={() => setMenuOpen(false)}>
          Ewan Qian / 钱誉文
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
            const isActive = item.href ? false : item.activeOn
              ? item.activeOn.some((path) => location.pathname.startsWith(path))
              : location.pathname === item.to

            return item.href ? (
              <a key={item.id} href={item.href} className="nav-link" onClick={() => setMenuOpen(false)}>{item.label}</a>
            ) : (
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
