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

export function applyDocumentLanguage(lang) {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN'
  document.documentElement.dataset.siteLang = lang
}

export function pickLanguage(language, zh, en) {
  return language === 'en' ? en : zh
}

export function initializeDocumentLanguage() {
  applyDocumentLanguage(getInitialLanguage())
}
