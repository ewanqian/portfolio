import { useState } from 'react'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <div className="brand">Ewan Qian / Portfolio</div>
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
            <a href="#artistic-overview">Artistic</a>
            <a href="#works">Works</a>
            <a href="#services">Services</a>
            <a href="./services/project-types.html">Categories</a>
            <a href="./services/pricing-policy.html">Pricing</a>
            <a href="./services/faq.html">FAQ</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
