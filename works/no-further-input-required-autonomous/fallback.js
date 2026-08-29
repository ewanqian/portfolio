(() => {
  const root = document.documentElement
  const params = new URLSearchParams(window.location.search)
  const speed = Math.max(0.05, Math.min(12, Number(params.get('speed')) || 1))
  const initialOffset = Math.max(0, Number(params.get('t')) || 0)
  const seedText = params.get('seed') || 'NFI-260827'
  const cells = []
  const edges = []
  const generations = []
  let seed = 2166136261
  let canvas = null
  let context = null
  let frame = 0
  let startedAt = 0
  let width = 1
  let height = 1
  let pixelRatio = 1

  for (let index = 0; index < seedText.length; index += 1) {
    seed ^= seedText.charCodeAt(index)
    seed = Math.imul(seed, 16777619) >>> 0
  }

  const clamp = (value, low = 0, high = 1) => Math.max(low, Math.min(high, value))
  const smooth = (value) => {
    const normalized = clamp(value)
    return normalized * normalized * (3 - 2 * normalized)
  }
  const hash = (value) => {
    let result = (value ^ seed) >>> 0
    result = Math.imul(result ^ (result >>> 16), 0x7feb352d)
    result = Math.imul(result ^ (result >>> 15), 0x846ca68b)
    return (result ^ (result >>> 16)) >>> 0
  }
  const indexAt = (x, y, z) => x + y * 4 + z * 16

  for (let z = 0; z < 4; z += 1) {
    for (let y = 0; y < 4; y += 1) {
      for (let x = 0; x < 4; x += 1) {
        const index = indexAt(x, y, z)
        cells[index] = { x: x - 1.5, y: y - 1.5, z: z - 1.5 }
        if (x < 3) edges.push([index, indexAt(x + 1, y, z)])
        if (y < 3) edges.push([index, indexAt(x, y + 1, z)])
        if (z < 3) edges.push([index, indexAt(x, y, z + 1)])
      }
    }
  }

  function neighbors(index) {
    const cell = cells[index]
    const result = []
    const offsets = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]
    for (const [dx, dy, dz] of offsets) {
      const x = cell.x + 1.5 + dx
      const y = cell.y + 1.5 + dy
      const z = cell.z + 1.5 + dz
      if (x >= 0 && x < 4 && y >= 0 && y < 4 && z >= 0 && z < 4) result.push(indexAt(x, y, z))
    }
    return result
  }

  const neighborhood = cells.map((_, index) => neighbors(index))

  function measure(state, previous = state) {
    const active = state.reduce((sum, value) => sum + value, 0)
    const density = active / state.length
    let mirrored = 0
    let unchanged = 0
    for (let index = 0; index < state.length; index += 1) {
      const cell = cells[index]
      const mirror = indexAt(3 - (cell.x + 1.5), cell.y + 1.5, cell.z + 1.5)
      if (state[index] === state[mirror]) mirrored += 1
      if (state[index] === previous[index]) unchanged += 1
    }
    const entropy = density <= 0 || density >= 1
      ? 0
      : -(density * Math.log2(density) + (1 - density) * Math.log2(1 - density))
    return {
      density,
      symmetry: mirrored / state.length,
      stability: unchanged / state.length,
      entropy,
    }
  }

  function selectRule(metrics) {
    if (metrics.density < 0.24) return 'EXPAND'
    if (metrics.density > 0.66) return 'PRUNE'
    if (metrics.stability > 0.88) return 'MUTATE'
    if (metrics.entropy > 0.86) return 'CONNECT'
    return metrics.symmetry > 0.78 ? 'MUTATE' : 'CONNECT'
  }

  function evolve(previous, rule, generation) {
    return previous.map((value, index) => {
      const activeNeighbors = neighborhood[index].reduce((sum, neighbor) => sum + previous[neighbor], 0)
      const signal = hash(index * 97 + generation * 131) % 11
      if (rule === 'EXPAND') return value || (activeNeighbors > 0 && signal < 7) ? 1 : 0
      if (rule === 'PRUNE') return value && activeNeighbors >= 2 && activeNeighbors <= 5 && signal > 1 ? 1 : 0
      if (rule === 'CONNECT') return value || (activeNeighbors >= 2 && signal < 4) ? 1 : 0
      return signal === 0 || signal === 5 ? 1 - value : value
    })
  }

  function createGenerations() {
    let state = cells.map((cell, index) => {
      const corner = Math.abs(cell.x) === 1.5 && Math.abs(cell.y) === 1.5 && Math.abs(cell.z) === 1.5
      return corner || hash(index * 41) % 9 === 0 ? 1 : 0
    })
    let previous = state
    const seededRules = ['EXPAND', 'CONNECT', 'PRUNE', 'MUTATE', 'CONNECT', 'PRUNE', 'EXPAND', 'CONNECT', 'MUTATE', 'PRUNE']
    for (let generation = 0; generation < 24; generation += 1) {
      const metrics = measure(state, previous)
      const autonomous = generation >= 10
      const rule = autonomous ? selectRule(metrics) : seededRules[generation]
      generations.push({ state, metrics, rule, autonomous })
      previous = state
      state = evolve(state, rule, generation + 1)
    }
  }

  createGenerations()

  function resize() {
    width = Math.max(1, window.innerWidth)
    height = Math.max(1, window.innerHeight)
    pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
    canvas.width = Math.round(width * pixelRatio)
    canvas.height = Math.round(height * pixelRatio)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  }

  function project(point, angleY, angleX, scale = 1) {
    const cosY = Math.cos(angleY)
    const sinY = Math.sin(angleY)
    const xzX = point.x * cosY - point.z * sinY
    const xzZ = point.x * sinY + point.z * cosY
    const cosX = Math.cos(angleX)
    const sinX = Math.sin(angleX)
    const yzY = point.y * cosX - xzZ * sinX
    const yzZ = point.y * sinX + xzZ * cosX
    const perspective = 1 / (1 + yzZ * 0.075)
    const unit = Math.min(width, height) * 0.165 * scale
    return {
      x: width * 0.5 + xzX * unit * perspective,
      y: height * 0.5 - yzY * unit * perspective,
      depth: yzZ,
      perspective,
    }
  }

  function line(a, b, alpha, lineWidth = 1) {
    context.strokeStyle = `rgba(240,238,230,${clamp(alpha)})`
    context.lineWidth = lineWidth
    context.beginPath()
    context.moveTo(a.x, a.y)
    context.lineTo(b.x, b.y)
    context.stroke()
  }

  function node(point, radius, alpha, wire = false) {
    const size = Math.max(0.55, radius * point.perspective)
    context.beginPath()
    context.arc(point.x, point.y, size, 0, Math.PI * 2)
    if (wire) {
      context.strokeStyle = `rgba(240,238,230,${clamp(alpha)})`
      context.lineWidth = 0.8
      context.stroke()
    } else {
      context.fillStyle = `rgba(240,238,230,${clamp(alpha)})`
      context.fill()
    }
  }

  function binaryPositions(level) {
    if (level === 0) return [{ x: 0, y: 0, z: 0 }]
    const positions = []
    for (let index = 0; index < 2 ** level; index += 1) {
      positions.push({
        x: level > 0 ? ((index & 1) ? 1 : -1) * 0.72 : 0,
        y: level > 1 ? ((index & 2) ? 1 : -1) * 0.62 : 0,
        z: level > 2 ? ((index & 4) ? 1 : -1) * 0.62 : 0,
      })
    }
    return positions
  }

  function drawAncestry(angleY, angleX, opacity, collapse = 0) {
    const levels = [binaryPositions(0), binaryPositions(1), binaryPositions(2), binaryPositions(3)]
    const weights = [0.16, 0.11, 0.075, 0.05]
    for (let level = 0; level < levels.length; level += 1) {
      const projected = levels[level].map((point) => project(point, angleY, angleX, 1 - collapse))
      for (let index = 0; index < projected.length; index += 1) {
        if (level > 0) line(projected[Math.floor(index / 2)], projected[index], weights[level] * opacity * (1 - collapse))
        node(projected[index], 2.3 - level * 0.28, weights[level] * opacity * (1 - collapse), true)
      }
    }
  }

  function drawOrigin(time) {
    const angleY = 0.56
    const angleX = -0.34
    const firstSplit = smooth((time - 9) / 6)
    const origin = project({ x: 0, y: 0, z: 0 }, angleY, angleX)
    if (firstSplit <= 0) {
      node(origin, 3.2, smooth(time / 3))
      return
    }
    const children = binaryPositions(1).map((point) => ({ x: point.x * firstSplit, y: 0, z: 0 }))
    for (const child of children) {
      const projected = project(child, angleY, angleX)
      line(origin, projected, 0.2 * firstSplit)
      node(projected, 3, firstSplit)
    }
    node(origin, 2.2, 0.22 * (1 - firstSplit), true)
  }

  function drawDifferentiation(time) {
    const angleY = 0.56
    const angleX = -0.34
    const level = time < 20 ? 1 : time < 25 ? 2 : 3
    const local = smooth(((time - 15) % 5) / 5)
    const parents = binaryPositions(Math.max(0, level - 1))
    const children = binaryPositions(level)
    const projectedParents = parents.map((point) => project(point, angleY, angleX))
    children.forEach((child, index) => {
      const parent = parents[Math.floor(index / 2)]
      const point = {
        x: parent.x + (child.x - parent.x) * local,
        y: parent.y + (child.y - parent.y) * local,
        z: parent.z + (child.z - parent.z) * local,
      }
      const projected = project(point, angleY, angleX)
      line(projectedParents[Math.floor(index / 2)], projected, 0.22)
      node(projected, 2.8 - level * 0.2, 0.92)
    })
    drawAncestry(angleY, angleX, 0.55)
  }

  function drawField(time) {
    const generationIndex = clamp(Math.floor((time - 50) / 2), 0, generations.length - 1)
    const generation = generations[generationIndex]
    const previous = generations[Math.max(0, generationIndex - 1)]
    const older = generations[Math.max(0, generationIndex - 2)]
    const gridBuild = smooth((time - 30) / 20)
    const collapse = smooth((time - 86) / 4)
    const metrics = generation.metrics
    const angleY = 0.56 + (metrics.entropy - 0.5) * 0.24
    const angleX = -0.34 + (metrics.density - 0.5) * 0.14
    const fieldScale = (0.82 + metrics.density * 0.22) * (1 - collapse)
    const eight = binaryPositions(3)
    const positions = cells.map((cell) => {
      const octant = (cell.x > 0 ? 1 : 0) + (cell.y > 0 ? 2 : 0) + (cell.z > 0 ? 4 : 0)
      const source = eight[octant]
      return project({
        x: source.x + (cell.x * 0.52 - source.x) * gridBuild,
        y: source.y + (cell.y * 0.52 - source.y) * gridBuild,
        z: source.z + (cell.z * 0.52 - source.z) * gridBuild,
      }, angleY, angleX, fieldScale)
    })

    for (const [from, to] of edges) {
      const active = generation.state[from] && generation.state[to]
      line(positions[from], positions[to], active ? 0.22 * (1 - collapse) : 0.045 * gridBuild * (1 - collapse), active ? 1.15 : 0.7)
    }

    for (let index = 0; index < positions.length; index += 1) {
      if (older.state[index]) node(positions[index], 3.2, 0.05 * (1 - collapse), true)
      if (previous.state[index]) node(positions[index], 3.5, 0.13 * (1 - collapse), true)
      const active = generation.state[index]
      node(positions[index], active ? 3.15 : 1.05, active ? 0.94 * (1 - collapse) : 0.075 * gridBuild * (1 - collapse))
    }

    drawAncestry(angleY, angleX, 0.75, collapse)

    if (collapse > 0) {
      const activePoints = positions.filter((_, index) => generation.state[index])
      const centroid = activePoints.length
        ? activePoints.reduce((result, point) => ({ x: result.x + point.x / activePoints.length, y: result.y + point.y / activePoints.length }), { x: 0, y: 0 })
        : { x: width * 0.5, y: height * 0.5 }
      node({ ...centroid, perspective: 1 }, 3.4, collapse)
    }
  }

  function draw(timestamp) {
    if (root.getAttribute('data-nfi-runtime') === 'ready') {
      stop()
      return
    }
    const total = initialOffset + ((timestamp - startedAt) / 1000) * speed
    const time = ((total % 90) + 90) % 90
    context.clearRect(0, 0, width, height)
    context.fillStyle = '#000'
    context.fillRect(0, 0, width, height)
    if (time < 15) drawOrigin(time)
    else if (time < 30) drawDifferentiation(time)
    else drawField(time)
    frame = window.requestAnimationFrame(draw)
  }

  function stop() {
    if (frame) window.cancelAnimationFrame(frame)
    window.removeEventListener('resize', resize)
    window.removeEventListener('keydown', handleKey)
    window.removeEventListener('dblclick', toggleFullscreen)
    if (canvas) canvas.remove()
    canvas = null
    context = null
  }

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen({ navigationUI: 'hide' })
      else await document.exitFullscreen()
    } catch (error) {
      console.warn(error)
    }
  }

  function handleKey(event) {
    if (event.key.toLowerCase() === 'f') toggleFullscreen()
  }

  function start() {
    if (canvas || root.getAttribute('data-nfi-runtime') === 'ready') return
    canvas = document.createElement('canvas')
    canvas.setAttribute('aria-label', 'No Further Input Required compatibility rendering')
    canvas.setAttribute('data-nfi-fallback', 'canvas-2d')
    document.body.appendChild(canvas)
    context = canvas.getContext('2d', { alpha: false })
    if (!context) return
    root.setAttribute('data-nfi-runtime', 'fallback')
    startedAt = performance.now()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('keydown', handleKey)
    window.addEventListener('dblclick', toggleFullscreen)
    resize()
    frame = window.requestAnimationFrame(draw)
  }

  window.addEventListener('error', (event) => {
    if (/webgl|three|main\.js/i.test(`${event.message || ''} ${event.filename || ''}`)) start()
  })
  window.addEventListener('unhandledrejection', (event) => {
    if (/webgl|three/i.test(String(event.reason || ''))) start()
  })
  window.setTimeout(start, 2200)
  window.NFIFallback = { start, stop }
})()
