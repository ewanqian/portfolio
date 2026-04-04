function ArtisticOverview() {
  return (
    <section id="artistic-overview" className="section">
      <div className="container">
        <div className="eyebrow">Artistic Overview</div>
        <h2 className="section-title">创作总览</h2>
        <p className="section-intro">
          钱誉文的实践围绕时间、图像、空间与感知之间的连续关系展开。早期工作首先集中在声音如何进入图像内部，并在节奏、频段与段落结构中形成视觉组织；随后，图像逐渐从单一屏幕关系中展开，进入身体、环境与空间尺度之中；近年的重点则进一步延伸到数字环境、扫描生态、双目观看与感知迁移系统。网页、舞台、环幕、数字展览、档案与接口研究，在这里构成的并非彼此独立的媒介分支，而是一条持续推进的创作网络。
        </p>
        <div className="grid-3" style={{ marginTop: '32px' }}>
          <div className="overview-card">
            <h4>Temporal Structure / 时间结构</h4>
            <p>节拍、频段、能量与段落变化被逐步纳入视觉内部，成为作品的组织材料。</p>
          </div>
          <div className="overview-card">
            <h4>Spatial Generation / 空间生成</h4>
            <p>图像开始与身体、环境、尺度和屏幕结构共同生成一种空间性的经验。</p>
          </div>
          <div className="overview-card">
            <h4>Perceptual Migration / 感知迁移</h4>
            <p>作品在不同界面和空间条件中的出现方式，构成了实践本身的重要部分。</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArtisticOverview
