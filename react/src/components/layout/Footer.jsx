import { useLanguage } from '../../i18n/LanguageContext.jsx'

function Footer() {
  const { language } = useLanguage()

  return (
    <footer className="footer">
      <div className="container">
        {language === 'en'
          ? '© Ewan Qian / VIRTURA. This website works as a portfolio, service reader, and inquiry entry for ongoing works, commissions, and collaborations.'
          : '© Ewan Qian / VIRTURA。这个网站同时承担作品入口、服务说明与项目咨询入口，用于持续中的作品、合作与委托。'}
      </div>
    </footer>
  )
}

export default Footer
