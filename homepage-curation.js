(function () {
  const preferredOrder = ['titan', 'drop-flow', 'timer', 'digital-garden']
  const hiddenMarkers = ['mke-terminal', 'sre-realtime-liveset']
  let scheduled = false

  function isHomeRoute() {
    const hash = window.location.hash
    return !hash || hash === '#' || hash === '#/' || hash.startsWith('#/?')
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

  function curateHomepage() {
    if (!isHomeRoute()) return

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

    const isZh = (document.documentElement.lang || '').toLowerCase().startsWith('zh')
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
