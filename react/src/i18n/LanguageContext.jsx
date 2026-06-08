import { useEffect, useMemo, useState } from 'react'
import { LanguageContext } from './languageCore.js'
import { LANGUAGE_STORAGE_KEY, applyDocumentLanguage, getInitialLanguage } from './languageUtils.js'

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
