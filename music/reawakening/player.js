const audio = document.getElementById('release-audio')
const audioStatus = document.getElementById('audio-status')
const shareStatus = document.getElementById('share-status')
const details = document.querySelector('.music-release-widget')
const canonical = 'https://ewanqian.site/music/reawakening/'
const shareData = {
  title: 'Reawakening 复苏 — Ewan Qian',
  desc: '电子音乐单曲 · 1分50秒。捕捉复苏最初的变化。',
  link: canonical,
  imgUrl: 'https://ewanqian.site/assets/music/reawakening/cover-square.jpg'
}

// A complete local Blob keeps seeking reliable on hosts without byte ranges.
const controller = new AbortController()
let audioObjectUrl
fetch(audio.dataset.src, { signal: controller.signal })
  .then(response => {
    if (!response.ok) throw new Error('Audio request failed')
    return response.blob()
  })
  .then(blob => {
    audioObjectUrl = URL.createObjectURL(blob)
    audio.src = audioObjectUrl
    audioStatus.textContent = ''
  })
  .catch(error => {
    if (error.name !== 'AbortError') audioStatus.textContent = '音源载入失败，请通过 SoundCloud 收听。'
  })
window.addEventListener('pagehide', () => {
  audio.pause()
  controller.abort()
  if (audioObjectUrl) URL.revokeObjectURL(audioObjectUrl)
})
window.addEventListener('pageshow', event => { if (event.persisted) location.reload() })
audio.addEventListener('error', () => { audioStatus.textContent = '音频暂时无法播放，请通过 SoundCloud 收听。' })
audio.addEventListener('play', () => { details.open = false })
details.addEventListener('toggle', () => {
  if (details.open) {
    audio.pause()
    if (!details.querySelector('iframe')) details.append(document.getElementById('soundcloud-frame').content.cloneNode(true))
  } else {
    details.querySelector('iframe')?.remove()
  }
})

document.getElementById('share-link').addEventListener('click', async () => {
  if (/MicroMessenger/i.test(navigator.userAgent)) {
    shareStatus.textContent = '点击微信右上角“···”，选择“发送给朋友”或“分享到朋友圈”。'
    return
  }
  try {
    if (navigator.share) {
      await navigator.share({ title: shareData.title, text: shareData.desc, url: canonical })
    } else {
      await navigator.clipboard.writeText(canonical)
      shareStatus.textContent = '作品链接已复制，可粘贴到微信。'
    }
  } catch (error) {
    if (error.name !== 'AbortError') shareStatus.textContent = `作品链接 ${canonical}`
  }
})

if (/MicroMessenger/i.test(navigator.userAgent)) configureWechat()

async function configureWechat() {
  try {
    const currentUrl = location.href.split('#')[0]
    const response = await fetch(`/api/wechat-share?url=${encodeURIComponent(currentUrl)}`)
    if (!response.ok) throw new Error('Share configuration unavailable')
    const config = await response.json()
    const script = document.createElement('script')
    script.src = 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js'
    const loaded = new Promise((resolve, reject) => { script.onload = resolve; script.onerror = reject })
    document.head.append(script)
    await loaded
    window.wx.config({ ...config, debug: false, jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] })
    window.wx.ready(() => {
      window.wx.updateAppMessageShareData(shareData)
      window.wx.updateTimelineShareData({ title: shareData.title, link: canonical, imgUrl: shareData.imgUrl })
    })
    window.wx.error(() => { shareStatus.textContent = '微信分享设置暂时未生效，可复制作品链接。' })
  } catch {
    shareStatus.textContent = '微信分享设置尚未启用，可从右上角菜单分享作品链接。'
  }
}
