import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link to="/" className="brand" style={{ textDecoration: 'none', color: 'inherit' }}>
          Ewan Qian / Portfolio
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            className={`menu-toggle ${menuOpen ? 'active' : ''}`} 
            id="menuToggle" 
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
          </button>
          <nav className={`nav ${menuOpen ? 'open' : ''}`} id="navMenu">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Practice</Link>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => { window.location.hash = '#works'; setMenuOpen(false); }}>Works</Link>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => { window.location.hash = '#image-wall'; setMenuOpen(false); }}>Public Nodes</Link>
            <Link to="/writing" className={location.pathname === '/writing' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Writing</Link>
            <Link to="/archive" className={location.pathname === '/archive' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Archive</Link>
            <Link to="/production" className={location.pathname === '/production' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Production</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
