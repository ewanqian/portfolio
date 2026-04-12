import { useEffect, useState } from 'react'

const THEME_STORAGE_KEY = 'theme'

function readStoredTheme() {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

function syncDocumentTheme(theme) {
  if (typeof document === 'undefined') {
    return
  }

  const isLight = theme === 'light'
  document.documentElement.classList.toggle('light', isLight)
  document.documentElement.style.colorScheme = isLight ? 'light' : 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState(() => readStoredTheme())

  useEffect(() => {
    syncDocumentTheme(theme)

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Ignore storage failures and keep the in-memory theme state working.
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return { isLight: theme === 'light', toggleTheme }
}
