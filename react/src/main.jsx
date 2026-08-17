import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { initializeDocumentLanguage, LanguageProvider } from './i18n/LanguageContext.jsx'
import './index.css'

const STATIC_WORK_SLUGS = {
  'drop-flow': true,
  'timer': true,
  'titan': true,
  'kashiwa': true,
  'mke-terminal': true,
  'sre-realtime-liveset': true,
  'no-further-input-required': true,
}

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

function getStaticWorkSlugFromHash(hash) {
  const match = hash.match(/^#\/works\/([^/?#]+)/)
  if (!match) {
    return null
  }

  const slug = decodeURIComponent(match[1]).replace(/\.html$/i, '')
  if (!slug || !STATIC_WORK_SLUGS[slug]) {
    return null
  }

  return slug
}

function redirectStaticWorkHashes() {
  if (typeof window === 'undefined') {
    return false
  }

  const slug = getStaticWorkSlugFromHash(window.location.hash)
  if (!slug) {
    return false
  }

  const base = window.location.pathname.indexOf('/portfolio') === 0 ? '/portfolio' : ''
  window.location.replace(`${base}/works/${slug}`)
  return true
}

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

  // Prefer the static /works/<slug> page when both pathname and hash point at it.
  // Do not strip a real static work path down to a blank HashRouter route.
  if (getStaticWorkSlugFromHash(hash)) {
    return
  }

  const pathSlugMatch = pathname.match(/\/works\/([^/]+)\/?$/)
  if (pathSlugMatch) {
    const slug = decodeURIComponent(pathSlugMatch[1]).replace(/\.html$/i, '')
    if (STATIC_WORK_SLUGS[slug]) {
      return
    }
  }

  const basePath = pathname.startsWith('/portfolio/') ? '/portfolio/' : '/'
  window.history.replaceState(null, '', `${basePath}${hash}`)
}

if (!redirectStaticWorkHashes()) {
  normalizeLegacyPortfolioUrl()
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </LanguageProvider>
  </React.StrictMode>,
)
