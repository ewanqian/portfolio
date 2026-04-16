import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export const LANGUAGE_STORAGE_KEY = 'portfolio-lang'

function detectBrowserLanguage() {
  if (typeof navigator === 'undefined') {
    return 'zh'
  }

  return navigator.language?.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

export function getInitialLanguage() {
  if (typeof window === 'undefined') {
    return 'zh'
  }

  try {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY)

    if (savedLanguage === 'zh' || savedLanguage === 'en') {
      return savedLanguage
    }
  } catch {
    return detectBrowserLanguage()
  }

  return detectBrowserLanguage()
}

function applyDocumentLanguage(lang) {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN'
  document.documentElement.dataset.siteLang = lang
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage)

  useEffect(() => {
    applyDocumentLanguage(language)

    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    } catch {
      return
    }
  }, [language])

  const value = useMemo(() => ({
    language,
    isChinese: language === 'zh',
    setLanguage: setLanguageState,
    toggleLanguage: () => setLanguageState((current) => (current === 'zh' ? 'en' : 'zh'))
  }), [language])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const value = useContext(LanguageContext)

  if (!value) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return value
}

export function pickLanguage(language, zh, en) {
  return language === 'en' ? en : zh
}

export function initializeDocumentLanguage() {
  applyDocumentLanguage(getInitialLanguage())
}
