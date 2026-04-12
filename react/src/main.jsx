import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
