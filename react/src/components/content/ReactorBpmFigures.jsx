import React from 'react'

const ASSET_ROOT = '/portfolio/assets/reactor-bpm'
const RA_EVENT = 'https://ra.co/events/2534022'
const RA_POSTER = 'https://imgproxy.ra.co/_/quality%3A66/aHR0cHM6Ly9pbWFnZXMucmEuY28vYjhjOTk2MDE4OGI2ZTA2MWI4MzNlY2Y3NmVmOWIxNjM1ZWQxZWZhOS5wbmc%3D'

const captureStills = [
  {
    src: `${ASSET_ROOT}/reactor-operator-view.jpg`,
    title: '03 / 演出操作台',
    caption: '作者提供的现场视频截帧：电脑端的 DJ 播放器状态与控制设备同时进入镜头。',
    alt: '现场电脑显示 DJ 播放器信息窗口，前景是演出操作设备'
  },
  {
    src: `${ASSET_ROOT}/reactor-beatlink-transport.jpg`,
    title: '04 / Beat Link Trigger',
    caption: '播放器与节拍信息的观察窗口。它显示可读的曲目结构，不代表已建立对 Arena 的自动同步。',
    alt: 'Beat Link Trigger 窗口显示彩色波形、播放位置和速度信息'
  },
  {
    src: `${ASSET_ROOT}/reactor-beatlink-waveform.jpg`,
    title: '05 / Waveform / Cue',
    caption: '波形与播放进度可以辅助判断过渡、停顿与重音；最终仍由演出者根据听觉决定。',
    alt: '软件窗口中彩色的 DJ 波形与播放位置'
  }
]

export default function ReactorBpmFigures() {
  return (
    <section className="reactor-article-media" aria-label="REACTOR BPM System 现场图文">
      <div className="reactor-article-kicker">Field notes / REACTOR · 2026</div>
      <div className="reactor-article-intro">
        <p>从现场到工程。下面的照片、活动海报和操作视频截帧分别记录空间、活动语境与播放器信息；它们不是同一种证据。</p>
      </div>
      <div className="reactor-article-opening">
        <figure className="reactor-article-cover">
          <img src={`${ASSET_ROOT}/reactor-venue-photo.jpg`} alt="昏暗俱乐部空间里，观众剪影、垂直光束与舞台投影" loading="eager" decoding="async" />
          <figcaption><strong>01 / 现场摄影</strong><span>暗场、观众、光束与屏幕；作者提供的环境记录。</span></figcaption>
        </figure>
        <figure className="reactor-article-poster">
          <a href={RA_EVENT} target="_blank" rel="noreferrer" aria-label="查看 REACTOR Grand Opening Day 1 活动档案">
            <img src={RA_POSTER} alt="REACTOR Grand Opening 2026 官方活动海报，列出 9 月 24 日与 25 日的演出阵容" loading="lazy" decoding="async" />
          </a>
          <figcaption><strong>02 / Grand Opening · 24—25 Sep 2026</strong><span>活动宣传海报，来源：<a href={RA_EVENT} target="_blank" rel="noreferrer">REACTOR / Resident Advisor</a>。非作者摄影作品。</span></figcaption>
        </figure>
      </div>
      <div className="reactor-article-figure-head">
        <span>THE METHOD / 方法图解</span>
        <h2>三种时间，不是三台机器。</h2>
        <p>持续影像负责空间存在；节拍层建立可重复的速度；人工触发负责随时介入、撤除和恢复。</p>
      </div>
      <div className="reactor-article-clock" role="img" aria-label="三种时间：持续时间是底层空间，节拍时间负责脉冲与节拍，人工时间负责触发和释放">
        <div><small>01 / CONTINUOUS</small><strong>持续时间</strong><span>BASE / LOOP</span></div>
        <div><small>02 / CLOCKED</small><strong>节拍时间</strong><span>BPM / BAR / ENVELOPE</span></div>
        <div><small>03 / HUMAN</small><strong>瞬时时间</strong><span>TRIGGER / STOP</span></div>
      </div>
      <div className="reactor-article-figure-head reactor-article-technical-head">
        <span>ON-SITE VIDEO STILLS / 操作记录</span>
        <h2>演出者看见的时间。</h2>
        <p>选自作者上传的操作视频，画面保留原比例。这里展示的是可观察的信息，而非一条已验证的自动控制链路。</p>
      </div>
      <div className="reactor-article-stills">
        {captureStills.map(({src, title, caption, alt}) => (
          <figure key={src}>
            <img src={src} alt={alt} loading="lazy" decoding="async" />
            <figcaption><strong>{title}</strong><span>{caption}</span></figcaption>
          </figure>
        ))}
      </div>
      <p className="reactor-article-media-credit">摄影与视频截帧：作者提供；具体拍摄日期未由原始元数据核实。活动日期与宣传视觉：REACTOR Grand Opening，Resident Advisor 活动档案。</p>
    </section>
  )
}
