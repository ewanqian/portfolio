import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

function Footer() {
  const { language } = useLanguage()
  const isZh = language === 'zh'

  return (
    <footer className="footer">
      <div className="container footer-system-grid">
        <div>
          {isZh
            ? '© Ewan Qian / 钱誉文。个人作品、系统、工作坊与合作记录。'
            : '© Ewan Qian. Personal works, systems, workshops, and collaboration records.'}
        </div>
        <nav className="footer-system-links" aria-label={isZh ? '次级导航' : 'Secondary navigation'}>
          <Link to="/archive">{isZh ? '归档' : 'Archive'}</Link>
          <a href="/works/atlas.html">{isZh ? '个人图谱' : 'Atlas'}</a>
          <a href="/works/cabinet.html">{isZh ? '收藏室' : 'Cabinet'}</a>
          <a href="/works/timeline.html">{isZh ? '时间线' : 'Timeline'}</a>
          <Link to="/writing">{isZh ? '写作' : 'Writing'}</Link>
          <a href="https://github.com/ewanqian" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
