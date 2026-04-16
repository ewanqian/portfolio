import { Link } from 'react-router-dom'

function ArchiveEntry() {
  return (
    <section id="archive" className="section">
      <div className="container">
        <div className="eyebrow">Archive</div>
        <h2 className="section-title">Archive / 档案入口</h2>
        <p className="section-intro">
          作品全集、公开节点和高斯样本现在统一收在档案体系里。首页保留精选入口；如果要继续查看完整索引、第二圈公开节点或空间归档样本，就从这里进入。
        </p>
        <div className="hero-cta" style={{ marginTop: '24px' }}>
          <Link to="/archive" className="button primary">Open Archive / 查看完整档案</Link>
          <Link to="/gaussian-scenes" className="button">Open Gaussian Archive / 查看空间归档</Link>
          <a href="https://github.com/ewanqian/portfolio/tree/main/projects" target="_blank" rel="noreferrer" className="button">
            Open Project Index / 查看原始项目索引
          </a>
        </div>
      </div>
    </section>
  )
}

export default ArchiveEntry
