import { Link } from 'react-router-dom'

function ArchiveEntry() {
  return (
    <section id="archive" className="section">
      <div className="container">
        <div className="eyebrow">Archive</div>
        <h2 className="section-title">档案索引 / Archive</h2>
        <p className="section-intro">
          作品精选之外的公开节点、空间样本和原始项目索引，都从这里继续进入。这里是对外可读的档案入口，不再和首页精选重复抢第一视线。
        </p>
        <div className="hero-cta" style={{ marginTop: '24px' }}>
          <Link to="/archive" className="button primary">查看档案索引</Link>
          <Link to="/gaussian-scenes" className="button">查看空间样本</Link>
          <a href="https://github.com/ewanqian/portfolio/tree/main/projects" target="_blank" rel="noreferrer" className="button">
            查看原始项目索引
          </a>
        </div>
      </div>
    </section>
  )
}

export default ArchiveEntry
