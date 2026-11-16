import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header.jsx'
import Footer from '../components/layout/Footer.jsx'
import works from '../data/generated/works.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import './MusicRelease.css'

const work = works.find((item) => item.id === 'reawakening-2026')

function MusicRelease() {
  const { language } = useLanguage()
  const isZh = language === 'zh'
  const [audioError, setAudioError] = useState(false)
  const [widgetOpen, setWidgetOpen] = useState(false)
  const audioRef = useRef(null)
  const release = work.release

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Reawakening — Ewan Qian'
    return () => { document.title = previousTitle }
  }, [])

  return (
    <>
      <Header />
      <main className="music-release">
        <div className="container">
          <div className="music-release-heading">
            <p>{isZh ? '音乐发行' : 'Music releases'}</p>
            <span>{release.format} · {work.years}</span>
          </div>

          <article className="music-release-grid" aria-labelledby="music-release-title">
            <figure className="music-release-artwork">
              <img
                src={work.image}
                alt={isZh ? 'Reawakening 封面，深红背景中的机械有机体与金属框架' : 'Reawakening artwork, a mechanical organic form inside a metal frame against deep red'}
                width="810"
                height="810"
              />
            </figure>

            <div className="music-release-content">
              <p className="music-release-artist">{release.artist}</p>
              <h1 id="music-release-title">Reawakening</h1>
              <p className="music-release-subtitle">复苏</p>

              <div className="music-release-facts">
                <span>{release.genre}</span>
                <span>1 {isZh ? '首' : 'track'}</span>
                <span>1:50</span>
              </div>

              <section className="music-release-listen" aria-labelledby="music-listen-heading">
                <h2 id="music-listen-heading">{isZh ? '收听' : 'Listen'}</h2>
                <audio
                  ref={audioRef}
                  controls
                  preload="metadata"
                  src={release.audioUrl}
                  aria-label={isZh ? '播放 Reawakening' : 'Play Reawakening'}
                  onError={() => setAudioError(true)}
                  onPlay={() => setWidgetOpen(false)}
                />
                {audioError ? (
                  <p className="music-release-error" role="status">
                    {isZh ? '音源暂时无法载入，可通过下方 SoundCloud 链接收听。' : 'The audio could not load. Listen through the SoundCloud link below.'}
                  </p>
                ) : null}
                <a className="music-release-external" href={release.soundcloudUrl} target="_blank" rel="noreferrer">
                  {isZh ? '在 SoundCloud 收听' : 'Listen on SoundCloud'} <span aria-hidden="true">↗</span>
                </a>
              </section>

              <p className="music-release-description">
                {isZh ? release.descriptionZh : release.descriptionEn}
              </p>
              <p className="music-release-credit">{isZh ? release.creditZh : release.creditEn}</p>

              <details
                className="music-release-widget"
                open={widgetOpen}
                onToggle={(event) => {
                  const isOpen = event.currentTarget.open
                  if (isOpen) audioRef.current?.pause()
                  setWidgetOpen(isOpen)
                }}
              >
                <summary>{isZh ? 'SoundCloud 播放器' : 'SoundCloud player'}</summary>
                {widgetOpen ? (
                  <iframe
                    title="Reawakening by ewan qian on SoundCloud"
                    src={release.embedUrl}
                    width="100%"
                    height="166"
                    allow="autoplay"
                    loading="lazy"
                  />
                ) : null}
              </details>
            </div>
          </article>

          <section className="music-release-about" aria-labelledby="music-artist-heading">
            <h2 id="music-artist-heading">{isZh ? '关于艺术家' : 'About the artist'}</h2>
            <div>
              <p>
                {isZh
                  ? '钱誉文 Ewan Qian，媒介艺术家。创作横跨声音、动态影像与实时系统，以音画表演和电子声音探索时间、节奏与空间感知。'
                  : 'Ewan Qian is a media artist working across sound, moving image and realtime systems. Through audiovisual performance and electronic sound, he explores time, rhythm and spatial perception.'}
              </p>
              <Link to="/profile">{isZh ? '艺术家介绍' : 'Artist profile'} <span aria-hidden="true">↗</span></Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default MusicRelease
