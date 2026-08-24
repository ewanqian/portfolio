import { useEffect } from 'react'

export default function TopologicalPlayground() {
  useEffect(() => {
    const base = window.location.pathname.indexOf('/portfolio') === 0 ? '/portfolio' : ''
    window.location.replace(`${base}/lab/personal-av-instrument/topological-playground/`)
  }, [])

  return (
    <main style={{ minHeight: '100vh', background: '#050505', color: '#aaa', display: 'grid', placeItems: 'center', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 12 }}>
      TOPLOGICAL PLAYGROUND / LOADING
    </main>
  )
}
