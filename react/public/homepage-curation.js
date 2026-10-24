(function () {
  const preferredOrder = ['titan', 'drop-flow', 'timer', 'digital-garden']
  const hiddenMarkers = ['mke-terminal', 'sre-realtime-liveset']
  const curatedImages = {
    'drop-flow': './assets/pdf-media/dropflow-biennale-main.webp',
    timer: './assets/pdf-media/timer-loading-access-2-main.webp'
  }
  const canonicalCardTitles = {
    'drop-flow': { zh: 'Drop Flow / 滴流', en: 'Drop Flow' },
    timer: { zh: 'TIMER / 控时者', en: 'TIMER' }
  }
  const canonicalVisibleNames = {
    'Drop Flow': { zh: 'Drop Flow / 滴流', en: 'Drop Flow' },
    'Drop Flow / 杭州双年展开幕节点': { zh: 'Drop Flow / 滴流 — 杭州双年展开幕式', en: 'Drop Flow · Hangzhou Biennale' },
    'TIMER 控时者': { zh: 'TIMER / 控时者', en: 'TIMER' },
    'TIMER 控时者 影像环形版': { zh: 'TIMER / 控时者 —「加载…权限 2」', en: 'TIMER · Loading… Access 2' }
  }
  let scheduled = false

  function isHomeRoute() {
    const hash = window.location.hash
    return !hash || hash === '#' || hash === '#/' || hash.startsWith('#/?')
  }

  function isZhLanguage() {
    return (document.documentElement.lang || '').toLowerCase().startsWith('zh')
  }

  function cardKey(card) {
    const links = Array.from(card.querySelectorAll('a[href]')).map((link) => link.getAttribute('href') || '').join(' ')
    const text = card.textContent || ''

    if (/titan/i.test(links) || /TITAN/i.test(text) || /柏大辅/.test(text)) return 'titan'
    if (/drop-flow/i.test(links) || /Drop Flow/i.test(text)) return 'drop-flow'
    if (/timer/i.test(links) || /TIMER/i.test(text)) return 'timer'
    if (/digital-garden/i.test(links) || /Digital Garden|数字游园/i.test(text)) return 'digital-garden'
    if (hiddenMarkers.some((marker) => links.includes(marker))) return 'hidden'
    if (/MKE Terminal|Realtime Live System|SRE/i.test(text)) return 'hidden'
    return 'other'
  }

  function setText(element, value) {
    if (element && element.textContent !== value) {
      element.textContent = value
    }
  }

  function setImage(element, value) {
    if (element && element.getAttribute('src') !== value) {
      element.setAttribute('src', value)
    }
  }

  function canonicalizeVisibleNames() {
    const language = isZhLanguage() ? 'zh' : 'en'
    document.querySelectorAll('h1,h2,h3,h4,a,button,span,strong').forEach((element) => {
      const current = (element.textContent || '').trim()
      const replacement = canonicalVisibleNames[current]?.[language]
      if (replacement && current !== replacement) {
        element.textContent = replacement
      }
    })
  }

  function curateHomepage() {
    canonicalizeVisibleNames()
    if (!isHomeRoute()) return

    const heroFrame = document.querySelector('.home-system-hero-frame')
    if (heroFrame && !String(heroFrame.getAttribute('src') || '').includes('hero-curated.html')) {
      heroFrame.setAttribute('src', './hero-curated.html')
      heroFrame.setAttribute('title', 'Ewan Qian selected practice')
    }

    const currentWork = document.getElementById('current-work')
    if (currentWork) currentWork.remove()

    const sections = Array.from(document.querySelectorAll('.selected-projects-section'))
    if (!sections.length) return

    const primarySection = sections[0]
    const primaryGrid = primarySection.querySelector('.selected-project-grid')
    if (!primaryGrid) return

    const cards = Array.from(document.querySelectorAll('.selected-project-card'))
    const selected = new Map()

    cards.forEach((card) => {
      const key = cardKey(card)
      if (!preferredOrder.includes(key)) {
        card.remove()
        return
      }
      if (!selected.has(key)) selected.set(key, card)
      else card.remove()
    })

    Object.entries(curatedImages).forEach(([key, src]) => {
      setImage(selected.get(key)?.querySelector('img'), src)
    })

    document.querySelectorAll('img[src*="timer-red-spatial-preview"], img[src*="featured-timer-main"]').forEach((image) => {
      setImage(image, curatedImages.timer)
    })

    const language = isZhLanguage() ? 'zh' : 'en'
    Object.entries(canonicalCardTitles).forEach(([key, titles]) => {
      const titleElement = selected.get(key)?.querySelector('h3 a, h3')
      setText(titleElement, titles[language])
    })

    const desiredCards = preferredOrder.map((key) => selected.get(key)).filter(Boolean)
    desiredCards.forEach((card, index) => {
      const currentCard = primaryGrid.children[index]
      if (currentCard !== card) {
        primaryGrid.insertBefore(card, currentCard || null)
      }
    })

    sections.slice(1).forEach((section) => section.remove())

    Array.from(primaryGrid.querySelectorAll('.selected-project-card')).forEach((card, index) => {
      const indexEl = card.querySelector('.selected-project-index')
      setText(indexEl, String(index + 1).padStart(2, '0'))
    })

    const isZh = isZhLanguage()
    setText(primarySection.querySelector('.eyebrow'), isZh ? '代表作品 / Selected Works' : 'Selected Works')
    setText(
      primarySection.querySelector('.section-title'),
      isZh ? '现场音画、空间影像与媒体艺术' : 'Live audiovisual, spatial image, and media art'
    )
    setText(
      primarySection.querySelector('.section-intro'),
      isZh
        ? '一组已经形成清晰公开结果的项目，集中呈现现场演出、长期音画作品与公共空间视觉。研究中项目与制作过程保留在档案层，不占用主页。'
        : 'A concise selection of completed, public-facing work across live audiovisual performance, long-form media practice, and spatial image. Ongoing research and process material remain in the archive.'
    )
  }

  function scheduleCurate() {
    if (scheduled) return
    scheduled = true
    window.requestAnimationFrame(() => {
      scheduled = false
      curateHomepage()
    })
  }

  window.addEventListener('DOMContentLoaded', () => {
    scheduleCurate()
    const root = document.getElementById('root') || document.body
    const observer = new MutationObserver(scheduleCurate)
    observer.observe(root, { childList: true, subtree: true })
  })

  window.addEventListener('hashchange', scheduleCurate)
})()
