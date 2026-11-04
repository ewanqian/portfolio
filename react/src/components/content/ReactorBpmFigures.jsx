import React from 'react'

const media = [
  ['/portfolio/assets/reactor-bpm/reactor-operator-view.jpg', '01 / THE LIVE SET', '真实操作台与 DJ 播放器信息窗口', 'On-site live-set operator video still'],
  ['/portfolio/assets/reactor-bpm/reactor-venue-photo.jpg', '02 / THE SPACE', '现场空间、人群、光束与低照度摄影', 'Venue photograph supplied by the author'],
  ['/portfolio/assets/reactor-bpm/reactor-beatlink-transport.jpg', '03 / PLAYER STATUS', 'Beat Link Trigger 的播放器信息与波形', 'Beat Link Trigger player display'],
  ['/portfolio/assets/reactor-bpm/reactor-beatlink-waveform.jpg', '04 / THE WAVEFORM', '波形与节拍是辅助观察，不等于自动同步已经建立', 'Beat and waveform visual observation']
]

export default function ReactorBpmFigures() {
  return (
    <div className="reactor-visual-essay">
      <header className="reactor-media-header"><span>REACTOR / BPM SYSTEM 2026</span><span>FIELD MEDIA / 现场摄影与操作记录</span></header>
      <div className="reactor-hero-media">
        {media.slice(0, 2).map(([src, title, caption, alt]) => (
          <figure key={src}><img src={src} alt={alt} loading="eager" /><figcaption><strong>{title}</strong><span>{caption}</span></figcaption></figure>
        ))}
      </div>
      <div className="reactor-concept-head">
        <span>THREE TIMES / 一张系统图</span>
        <h2>系统负责重复，人决定何时打断。</h2>
        <p>持续的底层、跟拍的中层与人工的瞬间，是三套独立运行、随时可以叠加与撤除的时间。</p>
      </div>
      <div className="reactor-time-system" aria-label="三种时间：持续时间、节拍时间、瞬时时间">
        <div><span>01 / CONTINUOUS</span><strong>持续时间</strong><p>BASE / LOOP / REALTIME</p></div>
        <div><span>02 / CLOCKED</span><strong>节拍时间</strong><p>BPM / ENVELOPE / BAR</p></div>
        <div><span>03 / HUMAN</span><strong>瞬时时间</strong><p>TRIGGER / STOP / RELEASE</p></div>
      </div>
      <div className="reactor-technical-stills">
        {media.slice(2).map(([src, title, caption, alt]) => (
          <figure key={src}><img src={src} alt={alt} loading="lazy" /><figcaption><strong>{title}</strong><span>{caption}</span></figcaption></figure>
        ))}
      </div>
      <p className="reactor-media-footer">图片来自作者提供的现场摄影和操作视频截帧。软件界面不是官方教程图；可见的播放器状态也不能单独证明 Link 或 Arena 自动同步已配置完成。</p>
    </div>
  )
}