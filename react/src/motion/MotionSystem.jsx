import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const easeOutExpo = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function MotionSystem({ children, routeKey }) {
  const scopeRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      return undefined
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: easeOutExpo,
      smoothWheel: true,
      syncTouch: false
    })

    const raf = (time) => {
      lenis.raf(time * 1000)
    }

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', ScrollTrigger.update)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  useGSAP(() => {
    const reduceMotion = prefersReducedMotion()

    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

    if (reduceMotion) {
      gsap.set('main, [data-page-motion], [data-reveal], .selected-project-card, .archive-timeline-row, .archive-item, .contact-sheet-row, .works-rail-card, .gaussian-scene-card', {
        clearProps: 'all'
      })
      return undefined
    }

    gsap.fromTo(
      'main, [data-page-motion]',
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power3.out', overwrite: true }
    )

    const revealSelector = [
      '[data-reveal]',
      '.selected-project-card',
      '.archive-timeline-row',
      '.archive-item',
      '.contact-sheet-row',
      '.works-rail-card',
      '.gaussian-scene-card'
    ].join(', ')

    const revealTargets = gsap.utils.toArray(revealSelector, scopeRef.current)

    ScrollTrigger.batch(revealTargets, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(batch, {
          autoAlpha: 0,
          y: 18
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.64,
          ease: 'power3.out',
          stagger: 0.055,
          overwrite: true
        })
      }
    })

    const refreshFrame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      window.setTimeout(() => ScrollTrigger.refresh(), 350)
    })

    return () => {
      window.cancelAnimationFrame(refreshFrame)
    }
  }, { dependencies: [routeKey], scope: scopeRef, revertOnUpdate: true })

  return <div ref={scopeRef}>{children}</div>
}

export default MotionSystem
