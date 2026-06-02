import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { initializeDocumentLanguage, LanguageProvider } from './i18n/LanguageContext.jsx'
import './index.css'

function initializeTheme() {
  if (typeof window === 'undefined') {
    return
  }

  try {
    const savedTheme = localStorage.getItem('theme')
    const isLight = savedTheme === 'light'
    document.documentElement.classList.toggle('light', isLight)
    document.documentElement.style.colorScheme = isLight ? 'light' : 'dark'
  } catch {
    document.documentElement.style.colorScheme = 'dark'
  }
}

initializeTheme()
initializeDocumentLanguage()

function normalizeLegacyPortfolioUrl() {
  if (typeof window === 'undefined') {
    return
  }

  const { pathname, hash } = window.location
  const hasHashRoute = hash.startsWith('#/')
  const isLegacyPath = pathname.includes('/works/') || pathname.includes('/projects/') || pathname.endsWith('.html')

  if (!hasHashRoute || !isLegacyPath) {
    return
  }

  const basePath = pathname.startsWith('/portfolio/') ? '/portfolio/' : '/'
  window.history.replaceState(null, '', `${basePath}${hash}`)
}

normalizeLegacyPortfolioUrl()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </LanguageProvider>
  </React.StrictMode>,
)
