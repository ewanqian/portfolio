import { useLanguage } from '../../i18n/LanguageContext.jsx'

function Footer() {
  const { language } = useLanguage()

  return (
    <footer className="footer">
      <div className="container">
        {language === 'en'
          ? '© Ewan Qian / VIRTURA. Portfolio, production records, and collaboration contact.'
          : '© Ewan Qian / VIRTURA。作品集、制作记录与合作联系方式。'}
      </div>
    </footer>
  )
}

export default Footer
