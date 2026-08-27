export const GRID_SIZE = 4
export const NODE_COUNT = GRID_SIZE ** 3
export const CYCLE_SECONDS = 90

export const RULE = Object.freeze({
  EXPAND: 'EXPAND',
  CONNECT: 'CONNECT',
  PRUNE: 'PRUNE',
  MUTATE: 'MUTATE',
})

export const PHASE = Object.freeze({
  ORIGIN: 'ORIGIN',
  DIFFERENTIATION: 'DIFFERENTIATION',
  RELATION: 'RELATION',
  EVOLUTION: 'EVOLUTION',
  SELF_INPUT: 'SELF_INPUT',
})

export const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value))
export const lerp = (a, b, amount) => a + (b - a) * amount
export const smooth = (value) => {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}

export function index3(x, y, z) {
  return x + y * GRID_SIZE + z * GRID_SIZE * GRID_SIZE
}

export function coordinates3(index) {
  const z = Math.floor(index / (GRID_SIZE * GRID_SIZE))
  const remainder = index - z * GRID_SIZE * GRID_SIZE
  const y = Math.floor(remainder / GRID_SIZE)
  return [remainder - y * GRID_SIZE, y, z]
}

export const CELLS = Object.freeze(
  Array.from({ length: NODE_COUNT }, (_, index) => {
    const [x, y, z] = coordinates3(index)
    return Object.freeze({ index, x, y, z })
  }),
)

function buildNeighbors(includeDiagonals) {
  return CELLS.map(({ x, y, z }) => {
    const neighbors = []
    for (let dz = -1; dz <= 1; dz += 1) {
      for (let dy = -1; dy <= 1; dy += 1) {
        for (let dx = -1; dx <= 1; dx += 1) {
          const distance = Math.abs(dx) + Math.abs(dy) + Math.abs(dz)
          if (distance === 0 || (!includeDiagonals && distance !== 1)) continue
          const nx = x + dx
          const ny = y + dy
          const nz = z + dz
          if (nx < 0 || nx >= GRID_SIZE || ny < 0 || ny >= GRID_SIZE || nz < 0 || nz >= GRID_SIZE) continue
          neighbors.push(index3(nx, ny, nz))
        }
      }
    }
    return Object.freeze(neighbors)
  })
}

export const ORTHOGONAL_NEIGHBORS = Object.freeze(buildNeighbors(false))
export const ALL_NEIGHBORS = Object.freeze(buildNeighbors(true))

export function hashSeed(value) {
  const text = String(value)
  let hash = 2166136261
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

export function seededRandom(seed) {
  let state = seed >>> 0
  return () => {
    state += 0x6d2b79f5
    let value = state
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

function countActive(state) {
  let count = 0
  for (let index = 0; index < NODE_COUNT; index += 1) count += state[index]
  return count
}

function mirrorIndex(cell, axis) {
  const point = [cell.x, cell.y, cell.z]
  point[axis] = GRID_SIZE - 1 - point[axis]
  return index3(point[0], point[1], point[2])
}

export function measureState(state, previousState = null) {
  const activeCount = countActive(state)
  const density = activeCount / NODE_COUNT
  const axisMatches = [0, 0, 0]
  let stableCount = previousState ? 0 : 0
  let degreeSum = 0
  const centroid = [0, 0, 0]

  for (const cell of CELLS) {
    const active = state[cell.index]
    if (previousState && active === previousState[cell.index]) stableCount += 1
    for (let axis = 0; axis < 3; axis += 1) {
      if (active === state[mirrorIndex(cell, axis)]) axisMatches[axis] += 1
    }
    if (!active) continue
    centroid[0] += cell.x - 1.5
    centroid[1] += cell.y - 1.5
    centroid[2] += cell.z - 1.5
    degreeSum += ORTHOGONAL_NEIGHBORS[cell.index].reduce((sum, neighbor) => sum + state[neighbor], 0)
  }

  const axisSymmetry = axisMatches.map((matches) => matches / NODE_COUNT)
  const symmetry = (axisSymmetry[0] + axisSymmetry[1] + axisSymmetry[2]) / 3
  const stability = previousState ? stableCount / NODE_COUNT : 0
  const entropy = density <= 0 || density >= 1
    ? 0
    : -(density * Math.log2(density) + (1 - density) * Math.log2(1 - density))

  if (activeCount > 0) {
    centroid[0] /= activeCount * 1.5
    centroid[1] /= activeCount * 1.5
    centroid[2] /= activeCount * 1.5
  }

  return Object.freeze({
    activeCount,
    density,
    symmetry,
    axisSymmetry: Object.freeze(axisSymmetry),
    stability,
    entropy,
    meanDegree: activeCount > 0 ? degreeSum / activeCount : 0,
    centroid: Object.freeze(centroid),
  })
}

export function selectRule(metrics) {
  if (metrics.density < 0.27) return RULE.EXPAND
  if (metrics.density > 0.64) return RULE.PRUNE
  if (metrics.stability > 0.82) return RULE.MUTATE
  if (metrics.entropy > 0.88 || metrics.meanDegree < 1.65 || metrics.symmetry < 0.58) return RULE.CONNECT
  return metrics.symmetry > 0.78 ? RULE.MUTATE : RULE.CONNECT
}

function activeNeighborCount(state, neighbors) {
  return neighbors.reduce((sum, index) => sum + state[index], 0)
}

function regulatePopulation(next, previous, generation) {
  let activeCount = countActive(next)
  if (activeCount < 6) {
    const candidates = CELLS
      .filter((cell) => !next[cell.index])
      .map((cell) => ({
        index: cell.index,
        score: activeNeighborCount(previous, ALL_NEIGHBORS[cell.index]) * 100 - ((cell.index * 17 + generation * 13) % 97),
      }))
      .sort((a, b) => b.score - a.score)
    for (const candidate of candidates) {
      next[candidate.index] = 1
      activeCount += 1
      if (activeCount >= 6) break
    }
  }

  if (activeCount > 56) {
    const candidates = CELLS
      .filter((cell) => next[cell.index])
      .map((cell) => ({
        index: cell.index,
        score: activeNeighborCount(next, ALL_NEIGHBORS[cell.index]) * 100 + ((cell.index * 19 + generation * 11) % 101),
      }))
      .sort((a, b) => b.score - a.score)
    for (const candidate of candidates) {
      next[candidate.index] = 0
      activeCount -= 1
      if (activeCount <= 56) break
    }
  }

  return next
}

export function applyRule(previous, rule, generation = 0) {
  const next = new Uint8Array(NODE_COUNT)

  for (const cell of CELLS) {
    const index = cell.index
    const active = previous[index] === 1
    const orthogonal = activeNeighborCount(previous, ORTHOGONAL_NEIGHBORS[index])
    const surrounding = activeNeighborCount(previous, ALL_NEIGHBORS[index])
    const parity = (cell.x + cell.y + cell.z + generation) & 1
    const signature = (cell.x * 3 + cell.y * 5 + cell.z * 7 + generation * 2) % 11

    if (rule === RULE.EXPAND) {
      next[index] = active
        ? Number(surrounding > 0)
        : Number(orthogonal === 1 || (orthogonal === 2 && parity === 0))
      continue
    }

    if (rule === RULE.PRUNE) {
      next[index] = active
        ? Number(orthogonal >= 1 && orthogonal <= 3 && (parity === 0 || orthogonal === 2))
        : Number(orthogonal === 3 && surrounding <= 11 && parity === 0)
      continue
    }

    if (rule === RULE.CONNECT) {
      next[index] = active
        ? Number(orthogonal > 0 || surrounding >= 4)
        : Number(orthogonal === 2 || (orthogonal === 1 && surrounding >= 4 && parity === 0))
      continue
    }

    const structuredFlip = signature === 0 || (signature === 5 && orthogonal === 2)
    if (structuredFlip) {
      next[index] = Number(!active)
    } else if (active) {
      next[index] = Number(surrounding > 0)
    } else {
      next[index] = Number(orthogonal === 3 && parity === 0)
    }
  }

  return regulatePopulation(next, previous, generation)
}

function createCornerSeed() {
  const state = new Uint8Array(NODE_COUNT)
  for (const z of [0, 3]) {
    for (const y of [0, 3]) {
      for (const x of [0, 3]) state[index3(x, y, z)] = 1
    }
  }
  return state
}

function remapState(state, axisOrder, mirrorAxes) {
  const result = new Uint8Array(NODE_COUNT)
  for (const cell of CELLS) {
    const source = [cell.x, cell.y, cell.z]
    const mapped = axisOrder.map((sourceAxis, targetAxis) => {
      const value = source[sourceAxis]
      return mirrorAxes[targetAxis] ? GRID_SIZE - 1 - value : value
    })
    result[index3(mapped[0], mapped[1], mapped[2])] = state[cell.index]
  }
  return result
}

function foldToOctants(state) {
  const weights = new Float32Array(8)
  for (const cell of CELLS) {
    const ox = cell.x >= 2 ? 1 : 0
    const oy = cell.y >= 2 ? 1 : 0
    const oz = cell.z >= 2 ? 1 : 0
    weights[ox + oy * 2 + oz * 4] += state[cell.index] / 8
  }
  for (let index = 0; index < 8; index += 1) weights[index] = 0.24 + weights[index] * 0.76
  return weights
}

function chooseInitialAxes(seedHash) {
  const random = seededRandom(seedHash)
  const order = [0, 1, 2]
  for (let index = order.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1))
    const value = order[index]
    order[index] = order[target]
    order[target] = value
  }
  return {
    axisOrder: order,
    mirrorAxes: [random() > 0.5, random() > 0.5, random() > 0.5],
  }
}

function chooseInheritedAxes(metrics) {
  const axisOrder = [0, 1, 2].sort((a, b) => metrics.axisSymmetry[a] - metrics.axisSymmetry[b])
  return {
    axisOrder,
    mirrorAxes: metrics.centroid.map((value) => value > 0),
  }
}

function generationInterval(metrics, rule) {
  const entropyRate = lerp(3.15, 1.8, metrics.entropy)
  if (rule === RULE.PRUNE) return entropyRate * 1.08
  if (rule === RULE.MUTATE) return entropyRate * 0.88
  return entropyRate
}

function snapshot(time, state, previous, rule, autonomous, generation, interval) {
  return Object.freeze({
    time,
    state,
    metrics: measureState(state, previous),
    rule,
    autonomous,
    generation,
    interval,
  })
}

export function createCycle(seed = 'NFI-260827', inheritedState = null, inheritedPreviousState = null, cycleIndex = 0) {
  const seedHash = hashSeed(seed)
  const inheritedMetrics = inheritedState ? measureState(inheritedState, inheritedPreviousState) : null
  const axes = inheritedMetrics ? chooseInheritedAxes(inheritedMetrics) : chooseInitialAxes(seedHash)
  const baseState = inheritedState
    ? remapState(inheritedState, axes.axisOrder, axes.mirrorAxes)
    : createCornerSeed()
  const parentWeights = inheritedState ? foldToOctants(baseState) : new Float32Array(8).fill(1)
  const snapshots = [snapshot(50, baseState, null, 'SEED', cycleIndex > 0, 0, 4)]

  let current = baseState
  let previous = inheritedPreviousState ? remapState(inheritedPreviousState, axes.axisOrder, axes.mirrorAxes) : null
  let generation = 1
  let time = 54
  const externalRules = [RULE.EXPAND, RULE.CONNECT, RULE.PRUNE, RULE.CONNECT]

  if (cycleIndex === 0) {
    for (const rule of externalRules) {
      const next = applyRule(current, rule, generation)
      snapshots.push(snapshot(time, next, current, rule, false, generation, 4))
      previous = current
      current = next
      generation += 1
      time += 4
    }
  } else {
    time = 53
  }

  while (time < 86) {
    const metrics = measureState(current, previous)
    const rule = selectRule(metrics)
    const interval = generationInterval(metrics, rule)
    const next = applyRule(current, rule, generation)
    snapshots.push(snapshot(time, next, current, rule, true, generation, interval))
    previous = current
    current = next
    generation += 1
    time += interval
  }

  return Object.freeze({
    seed: String(seed),
    seedHash,
    cycleIndex,
    axisOrder: Object.freeze([...axes.axisOrder]),
    mirrorAxes: Object.freeze([...axes.mirrorAxes]),
    parentWeights,
    snapshots: Object.freeze(snapshots),
    finalState: current,
    previousFinalState: previous,
    finalMetrics: measureState(current, previous),
  })
}

export function phaseAt(time) {
  const local = ((time % CYCLE_SECONDS) + CYCLE_SECONDS) % CYCLE_SECONDS
  if (local < 15) return PHASE.ORIGIN
  if (local < 30) return PHASE.DIFFERENTIATION
  if (local < 50) return PHASE.RELATION
  if (local < 70) return PHASE.EVOLUTION
  return PHASE.SELF_INPUT
}

export function splitAt(time) {
  const local = clamp(time, 0, 30)
  if (local < 9) return Object.freeze({ from: 1, to: 1, progress: smooth(local / 9) })
  if (local < 15) return Object.freeze({ from: 1, to: 2, progress: smooth((local - 9) / 6) })
  if (local < 22) return Object.freeze({ from: 2, to: 4, progress: smooth((local - 15) / 7) })
  return Object.freeze({ from: 4, to: 8, progress: smooth((local - 22) / 8) })
}

export function fieldAt(cycle, time) {
  const snapshots = cycle.snapshots
  if (time <= snapshots[0].time) {
    return Object.freeze({
      from: snapshots[0],
      to: snapshots[0],
      mix: 1,
      rule: snapshots[0].rule,
      metrics: snapshots[0].metrics,
    })
  }

  let from = snapshots[0]
  let to = snapshots[snapshots.length - 1]
  for (let index = 1; index < snapshots.length; index += 1) {
    to = snapshots[index]
    if (time <= to.time) break
    from = to
  }

  const duration = Math.max(0.001, to.time - from.time)
  const mix = from === to ? 1 : smooth(clamp(((time - from.time) / duration) * 1.45))
  return Object.freeze({ from, to, mix, rule: to.rule, metrics: to.metrics })
}
