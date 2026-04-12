import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-image">
          <img src="/portfolio/assets/home/about-ewanqian.jpg" alt="Ewan Qian portrait" />
        </div>
        <div className="hero-panel">
          <div>
            <div className="hero-kicker">Media Artist / Spatial Image Creator / Live Visual Producer</div>
            <h1 className="hero-title">钱誉文
              <br />
              Ewan Qian
            </h1>
            <p className="hero-subtitle">感知迁移 / 时间结构 / 空间生成 / 现场图像系统</p>
            <p className="hero-tagline">
              钱誉文的实践围绕时间、图像、空间与感知之间的连续关系展开。网页、舞台、环幕、数字展览、档案与接口研究，在这里构成的并非彼此独立的媒介分支，而是一条持续推进的创作网络。
            </p>
            <div className="hero-cta">
              <Link className="button primary" to="/" state={{ scrollTo: 'artistic-overview' }}>
                Artistic Practice / 创作实践
              </Link>
              <Link className="button" to="/production">
                Production Services / 制作服务
              </Link>
            </div>
          </div>
          <div>
            <div className="socials">
              <a className="social-pill" href="https://www.instagram.com/ewanqian/" target="_blank" rel="noreferrer">Instagram ↗</a>
              <a className="social-pill" href="https://space.bilibili.com/2380485" target="_blank" rel="noreferrer">Bilibili ↗</a>
              <a className="social-pill" href="https://www.xiaohongshu.com/user/profile/60d73226000000000101f30e" target="_blank" rel="noreferrer">Xiaohongshu ↗</a>
              <a className="social-pill" href="https://www.manamana.net/peopleCenter/432894/home#!zh" target="_blank" rel="noreferrer">ManaMana ↗</a>
              <a className="social-pill" href="https://github.com/ewanqian" target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
