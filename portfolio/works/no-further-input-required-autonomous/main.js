import * as THREE from './vendor/three.module.min.js'
import {
  ALL_NEIGHBORS,
  CELLS,
  CYCLE_SECONDS,
  NODE_COUNT,
  ORTHOGONAL_NEIGHBORS,
  RULE,
  clamp,
  createCycle,
  fieldAt,
  lerp,
  smooth,
  splitAt,
} from './simulation.js'

const VERSION = '1.0.0-autonomous'
const DEFAULT_SEED = 'NFI-260827'
const OFF_WHITE = new THREE.Color(0xf0eee6)
const GRID_DARK = new THREE.Color(0x11110f)
const params = new URLSearchParams(window.location.search)
const seed = params.get('seed') || DEFAULT_SEED
const speed = clamp(Number(params.get('speed')) || 1, 0.05, 12)
const initialOffset = Math.max(0, Number(params.get('t')) || 0)

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: false,
  powerPreference: 'high-performance',
  preserveDrawingBuffer: false,
})
renderer.setClearColor(0x000000, 1)
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.xr.enabled = true
renderer.domElement.setAttribute('aria-label', 'No Further Input Required autonomous generative artwork')
document.body.appendChild(renderer.domElement)
document.documentElement.setAttribute('data-nfi-runtime', 'ready')

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)

const camera = new THREE.PerspectiveCamera(32, 16 / 9, 0.05, 60)
camera.position.set(4.7, 3.45, 5.9)
camera.lookAt(0, 0, 0)

const root = new THREE.Group()
root.name = 'autonomous-system'
scene.add(root)

scene.add(new THREE.HemisphereLight(0xffffff, 0x050505, 1.35))
const keyLight = new THREE.DirectionalLight(0xffffff, 2.1)
keyLight.position.set(3, 5, 4)
scene.add(keyLight)
const rimLight = new THREE.DirectionalLight(0xddd8ca, 0.72)
rimLight.position.set(-4, -2, 3)
scene.add(rimLight)

const unitBox = new THREE.BoxGeometry(1, 1, 1)
const nodeMaterial = new THREE.MeshStandardMaterial({
  color: OFF_WHITE,
  vertexColors: true,
  roughness: 0.84,
  metalness: 0,
})

function createInstancedMesh(material, count = NODE_COUNT) {
  const mesh = new THREE.InstancedMesh(unitBox, material, count)
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  mesh.frustumCulled = false
  root.add(mesh)
  return mesh
}

const currentNodes = createInstancedMesh(nodeMaterial)
currentNodes.renderOrder = 4

const ancestryMeshes = [0, 1, 2, 3].map((level) => {
  const material = new THREE.MeshBasicMaterial({
    color: 0xdedbd1,
    wireframe: true,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  })
  const mesh = createInstancedMesh(material, 8)
  mesh.name = `ancestry-${2 ** level}`
  mesh.renderOrder = 2
  return mesh
})

const generationGhosts = [0, 1, 2].map((layer) => {
  const material = new THREE.MeshBasicMaterial({
    color: 0xd6d2c8,
    wireframe: true,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  })
  const mesh = createInstancedMesh(material)
  mesh.name = `generation-memory-${layer + 1}`
  mesh.renderOrder = 1
  return mesh
})

class DynamicLines {
  constructor(maxSegments, color) {
    this.positions = new Float32Array(maxSegments * 6)
    this.geometry = new THREE.BufferGeometry()
    this.attribute = new THREE.BufferAttribute(this.positions, 3)
    this.attribute.setUsage(THREE.DynamicDrawUsage)
    this.geometry.setAttribute('position', this.attribute)
    this.geometry.setDrawRange(0, 0)
    this.material = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    })
    this.lines = new THREE.LineSegments(this.geometry, this.material)
    this.lines.frustumCulled = false
    this.lines.renderOrder = 3
    this.count = 0
    root.add(this.lines)
  }

  begin(opacity) {
    this.count = 0
    this.material.opacity = opacity
    this.lines.visible = opacity > 0.001
  }

  add(a, b) {
    if (this.count * 6 >= this.positions.length) return
    const offset = this.count * 6
    this.positions[offset] = a.x
    this.positions[offset + 1] = a.y
    this.positions[offset + 2] = a.z
    this.positions[offset + 3] = b.x
    this.positions[offset + 4] = b.y
    this.positions[offset + 5] = b.z
    this.count += 1
  }

  finish() {
    this.geometry.setDrawRange(0, this.count * 2)
    this.attribute.needsUpdate = true
  }
}

const ancestryLines = new DynamicLines(96, 0xbbb8af)
const relationLines = new DynamicLines(192, 0xe0ddd4)
const latticeLines = new DynamicLines(192, 0xbcb9b0)
const activeLines = new DynamicLines(512, 0xf0eee6)
const memoryLines = new DynamicLines(192, 0xaaa79f)

const dummy = new THREE.Object3D()
const instanceColor = new THREE.Color()
const zero = new THREE.Vector3()
const working = new THREE.Vector3()
const workingB = new THREE.Vector3()
const fieldPositions = Array.from({ length: NODE_COUNT }, () => new THREE.Vector3())
const gridPositions = CELLS.map(({ x, y, z }) => new THREE.Vector3(
  (x - 1.5) * 0.78,
  (y - 1.5) * 0.78,
  (z - 1.5) * 0.78,
))

const ORTHOGONAL_EDGES = []
for (let from = 0; from < NODE_COUNT; from += 1) {
  for (const to of ORTHOGONAL_NEIGHBORS[from]) {
    if (to > from) ORTHOGONAL_EDGES.push([from, to])
  }
}

function writeInstance(mesh, index, position, scale, brightness = 1, rotation = 0, stretch = null) {
  dummy.position.copy(position)
  dummy.rotation.set(rotation * 0.48, rotation * 0.73, rotation)
  if (stretch) {
    dummy.scale.set(scale * stretch[0], scale * stretch[1], scale * stretch[2])
  } else {
    dummy.scale.setScalar(scale)
  }
  dummy.updateMatrix()
  mesh.setMatrixAt(index, dummy.matrix)
  if (mesh.instanceColor !== null || mesh.material.vertexColors) {
    instanceColor.copy(GRID_DARK).lerp(OFF_WHITE, clamp(brightness))
    mesh.setColorAt(index, instanceColor)
  }
}

function hideUnused(mesh, start, count = mesh.count) {
  for (let index = start; index < count; index += 1) {
    writeInstance(mesh, index, zero, 0, 0)
  }
}

function finishInstances(mesh) {
  mesh.instanceMatrix.needsUpdate = true
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
}

function popCount(value) {
  let count = 0
  let remaining = value
  while (remaining) {
    count += remaining & 1
    remaining >>= 1
  }
  return count
}

function stagePositionsFor(cycle) {
  const levels = [[new THREE.Vector3()]]
  const spreads = [0, 0.42, 0.57, 0.72]
  for (let level = 1; level <= 3; level += 1) {
    const positions = []
    for (let index = 0; index < 2 ** level; index += 1) {
      const point = new THREE.Vector3()
      for (let bit = 0; bit < level; bit += 1) {
        const axis = cycle.axisOrder[bit]
        const direction = ((index >> bit) & 1) === 1 ? 1 : -1
        point.setComponent(axis, direction * spreads[level])
      }
      positions.push(point)
    }
    levels.push(positions)
  }
  return levels
}

function octantForCell(cycle, cell) {
  const coordinates = [cell.x, cell.y, cell.z]
  let octant = 0
  for (let bit = 0; bit < 3; bit += 1) {
    const axis = cycle.axisOrder[bit]
    let high = coordinates[axis] >= 2
    if (cycle.mirrorAxes[axis]) high = !high
    if (high) octant |= 1 << bit
  }
  return octant
}

function localRank(cell) {
  return (cell.x & 1) + (cell.y & 1) * 2 + (cell.z & 1) * 4
}

function makeVisualCycle(cycle) {
  const stages = stagePositionsFor(cycle)
  const octants = CELLS.map((cell) => octantForCell(cycle, cell))
  const originTarget = cycle.finalMetrics.centroid
  let originIndex = 0
  let closest = Infinity
  for (const cell of CELLS) {
    if (!cycle.finalState[cell.index]) continue
    const dx = (cell.x - 1.5) / 1.5 - originTarget[0]
    const dy = (cell.y - 1.5) / 1.5 - originTarget[1]
    const dz = (cell.z - 1.5) / 1.5 - originTarget[2]
    const distance = dx * dx + dy * dy + dz * dz
    if (distance < closest) {
      closest = distance
      originIndex = cell.index
    }
  }
  return { cycle, stages, octants, originIndex }
}

const cycles = [createCycle(seed)]
const visualCycles = [makeVisualCycle(cycles[0])]

function ensureCycle(index) {
  while (cycles.length <= index) {
    const previous = cycles[cycles.length - 1]
    const next = createCycle(
      seed,
      previous.finalState,
      previous.previousFinalState,
      cycles.length,
    )
    cycles.push(next)
    visualCycles.push(makeVisualCycle(next))
  }
}

function ancestryOpacity(level, time) {
  if (level === 0) {
    if (time < 9) return 0
    if (time < 15) return lerp(0, 0.4, smooth((time - 9) / 6))
    if (time < 22) return lerp(0.4, 0.15, smooth((time - 15) / 7))
    if (time < 30) return lerp(0.15, 0.065, smooth((time - 22) / 8))
    return 0.045
  }
  if (level === 1) {
    if (time < 15) return 0
    if (time < 22) return lerp(0.4, 0.15, smooth((time - 15) / 7))
    if (time < 30) return lerp(0.15, 0.075, smooth((time - 22) / 8))
    return 0.058
  }
  if (level === 2) {
    if (time < 22) return 0
    if (time < 30) return lerp(0.4, 0.15, smooth((time - 22) / 8))
    return 0.075
  }
  if (time < 30) return 0
  if (time < 50) return lerp(0.38, 0.14, smooth((time - 30) / 20))
  return 0.1
}

function updateAncestryMeshes(visual, time, collapse) {
  for (let level = 0; level <= 3; level += 1) {
    const mesh = ancestryMeshes[level]
    const positions = visual.stages[level]
    const opacity = ancestryOpacity(level, time) * (1 - collapse * 0.88)
    mesh.material.opacity = opacity
    mesh.visible = opacity > 0.001
    for (let index = 0; index < positions.length; index += 1) {
      const weight = level === 3 ? visual.cycle.parentWeights[index] : 1
      const scale = (0.082 + level * 0.009) * lerp(0.78, 1, weight)
      writeInstance(mesh, index, positions[index], scale, 1)
    }
    hideUnused(mesh, positions.length, 8)
    finishInstances(mesh)
  }
}

function updateAncestryLines(visual, time, collapse) {
  const progress = smooth(clamp((time - 9) / 25))
  ancestryLines.begin(0.13 * progress * (1 - collapse))
  for (let level = 1; level <= 3; level += 1) {
    const reveal = smooth(clamp((time - [9, 15, 22][level - 1]) / 6))
    if (reveal <= 0) continue
    const parents = visual.stages[level - 1]
    const children = visual.stages[level]
    for (let child = 0; child < children.length; child += 1) {
      const parent = child % parents.length
      working.copy(parents[parent]).lerp(children[child], reveal)
      ancestryLines.add(parents[parent], working)
    }
  }
  ancestryLines.finish()
}

function updateRelationGraph(positions, level, opacity) {
  relationLines.begin(opacity)
  for (let from = 0; from < positions.length; from += 1) {
    for (let to = from + 1; to < positions.length; to += 1) {
      if (popCount(from ^ to) === 1 && (from ^ to) < 2 ** level) {
        relationLines.add(positions[from], positions[to])
      }
    }
  }
  relationLines.finish()
}

function updateEarlySystem(visual, time) {
  const split = splitAt(time)
  const level = Math.round(Math.log2(split.to))
  const fromLevel = Math.round(Math.log2(split.from))
  const parents = visual.stages[fromLevel]
  const targets = visual.stages[level]
  const pulse = time < 9 ? 0.5 + 0.5 * Math.sin((time / 9) * Math.PI) : 0

  for (let index = 0; index < targets.length; index += 1) {
    const parent = parents[index % parents.length]
    working.copy(parent).lerp(targets[index], split.progress)
    let scale = 0.115
    let brightness = 0.95
    let stretch = null
    if (time < 9) scale *= 0.88 + pulse * 0.12
    if (level === 1) {
      const difference = index === 0 ? 1.12 : 0.86
      scale *= lerp(1, difference, split.progress)
    }
    if (level === 2) {
      stretch = index & 1 ? [1.35, 0.78, 0.78] : [0.78, 1.35, 0.78]
      brightness = index & 2 ? 0.78 : 0.98
    }
    if (level === 3) brightness = lerp(0.72, 1, visual.cycle.parentWeights[index])
    writeInstance(currentNodes, index, working, scale, brightness, 0, stretch)
  }
  hideUnused(currentNodes, targets.length)
  finishInstances(currentNodes)

  const graphOpacity = time < 15 ? smooth(clamp((time - 11) / 4)) * 0.26 : 0.32
  const currentPositions = targets.map((target, index) => {
    const point = new THREE.Vector3()
    point.copy(parents[index % parents.length]).lerp(target, split.progress)
    return point
  })
  updateRelationGraph(currentPositions, level, graphOpacity)
  latticeLines.begin(0)
  latticeLines.finish()
  activeLines.begin(0)
  activeLines.finish()
  memoryLines.begin(0)
  memoryLines.finish()
  generationGhosts.forEach((mesh) => { mesh.visible = false })
}

function relationPosition(visual, index, progress, target) {
  const cell = CELLS[index]
  const parent = visual.stages[3][visual.octants[index]]
  const rankDelay = localRank(cell) * 0.018
  const travel = smooth(clamp((progress - rankDelay) / Math.max(0.1, 1 - rankDelay)))
  return target.copy(parent).lerp(gridPositions[index], travel)
}

function updateLatticeGraph(positions, opacity, collapse = 0) {
  latticeLines.begin(opacity * (1 - collapse))
  for (const [from, to] of ORTHOGONAL_EDGES) latticeLines.add(positions[from], positions[to])
  latticeLines.finish()
}

function updateRelationSystem(visual, time) {
  const progress = smooth(clamp((time - 30) / 20))
  const baseState = visual.cycle.snapshots[0].state

  for (let index = 0; index < NODE_COUNT; index += 1) {
    const cell = CELLS[index]
    const position = relationPosition(visual, index, progress, fieldPositions[index])
    const birth = smooth(clamp(progress * 1.28 - localRank(cell) * 0.035))
    const inherited = visual.cycle.parentWeights[visual.octants[index]]
    const settled = baseState[index] ? 1 : 0.045
    const brightness = lerp(inherited * 0.66, settled, smooth(clamp((progress - 0.55) / 0.45)))
    const scale = lerp(0.025, lerp(0.027, 0.118, brightness), birth)
    writeInstance(currentNodes, index, position, scale, brightness)
  }
  finishInstances(currentNodes)

  updateLatticeGraph(fieldPositions, progress * 0.115)
  relationLines.begin(lerp(0.32, 0.09, progress))
  const parents = visual.stages[3]
  for (let index = 0; index < NODE_COUNT; index += 1) {
    relationLines.add(parents[visual.octants[index]], fieldPositions[index])
  }
  relationLines.finish()
  activeLines.begin(progress * 0.22)
  for (const [from, to] of ORTHOGONAL_EDGES) {
    if (baseState[from] && baseState[to]) activeLines.add(fieldPositions[from], fieldPositions[to])
  }
  activeLines.finish()
  memoryLines.begin(0)
  memoryLines.finish()
  generationGhosts.forEach((mesh) => { mesh.visible = false })
}

function interpolateMetrics(field) {
  const amount = field.mix
  const from = field.from.metrics
  const to = field.to.metrics
  return {
    density: lerp(from.density, to.density, amount),
    symmetry: lerp(from.symmetry, to.symmetry, amount),
    stability: lerp(from.stability, to.stability, amount),
    entropy: lerp(from.entropy, to.entropy, amount),
    meanDegree: lerp(from.meanDegree, to.meanDegree, amount),
    centroid: [0, 1, 2].map((axis) => lerp(from.centroid[axis], to.centroid[axis], amount)),
  }
}

function updateFieldPositions(field, rule, collapse) {
  const pulse = Math.sin(Math.PI * field.mix)
  let scale = 1
  if (rule === RULE.EXPAND) scale += pulse * 0.072
  if (rule === RULE.PRUNE) scale -= pulse * 0.085

  for (const cell of CELLS) {
    const position = fieldPositions[cell.index].copy(gridPositions[cell.index]).multiplyScalar(scale)
    if (rule === RULE.MUTATE && pulse > 0.001) {
      const sign = ((cell.x * 3 + cell.y * 5 + cell.z * 7 + field.to.generation * 2) % 11) < 5 ? -1 : 1
      position.x += sign * (cell.y - 1.5) * 0.028 * pulse
      position.y += sign * (cell.z - 1.5) * 0.028 * pulse
      position.z += sign * (cell.x - 1.5) * 0.028 * pulse
    }
    if (rule === RULE.CONNECT && pulse > 0.001) position.multiplyScalar(1 - pulse * 0.025)
    position.lerp(zero, collapse)
  }
}

function updateGenerationGhost(mesh, state, positions, opacity, collapse) {
  mesh.material.opacity = opacity * (1 - collapse)
  mesh.visible = mesh.material.opacity > 0.001 && Boolean(state)
  if (!state) return
  for (let index = 0; index < NODE_COUNT; index += 1) {
    const scale = state[index] ? 0.102 : 0
    writeInstance(mesh, index, positions[index], scale, 1)
  }
  finishInstances(mesh)
}

function previousSnapshots(cycle, current) {
  let index = cycle.snapshots.indexOf(current)
  if (index < 0) index = 0
  return [0, 1, 2].map((distance) => cycle.snapshots[Math.max(0, index - distance)] || null)
}

function updateMemoryGraph(state, positions, opacity) {
  memoryLines.begin(opacity)
  if (state) {
    for (const [from, to] of ORTHOGONAL_EDGES) {
      if (state[from] && state[to]) memoryLines.add(positions[from], positions[to])
    }
  }
  memoryLines.finish()
}

function updateActiveGraph(field, positions, opacity, collapse) {
  const amplitudes = new Float32Array(NODE_COUNT)
  for (let index = 0; index < NODE_COUNT; index += 1) {
    amplitudes[index] = lerp(field.from.state[index], field.to.state[index], field.mix)
  }

  activeLines.begin(opacity * (1 - collapse))
  for (const [from, to] of ORTHOGONAL_EDGES) {
    if (amplitudes[from] > 0.43 && amplitudes[to] > 0.43) activeLines.add(positions[from], positions[to])
  }

  if (field.rule === RULE.CONNECT) {
    for (let from = 0; from < NODE_COUNT; from += 1) {
      if (amplitudes[from] <= 0.5) continue
      for (const to of ALL_NEIGHBORS[from]) {
        if (to <= from || amplitudes[to] <= 0.5) continue
        const a = CELLS[from]
        const b = CELLS[to]
        const distance = Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z)
        if (distance !== 2 || (from + to + field.to.generation) % 3 !== 0) continue
        activeLines.add(positions[from], positions[to])
      }
    }
  }
  activeLines.finish()
}

function updateInputChannels(visual, field, positions, time, collapse) {
  if (time >= 70 || collapse >= 1) {
    relationLines.begin(0)
    relationLines.finish()
    return
  }

  const fade = 1 - smooth(clamp((time - 66) / 4))
  relationLines.begin(0.105 * fade * (1 - collapse))
  for (let octant = 0; octant < 8; octant += 1) {
    working.set(0, 0, 0)
    let weight = 0
    for (let index = 0; index < NODE_COUNT; index += 1) {
      if (visual.octants[index] !== octant) continue
      const activity = lerp(field.from.state[index], field.to.state[index], field.mix)
      if (activity <= 0.08) continue
      working.addScaledVector(positions[index], activity)
      weight += activity
    }
    if (weight <= 0) continue
    working.multiplyScalar(1 / weight)
    relationLines.add(visual.stages[3][octant], working)
  }
  relationLines.finish()
}

function updateFieldSystem(visual, time) {
  const cycle = visual.cycle
  const field = fieldAt(cycle, time)
  const metrics = interpolateMetrics(field)
  const collapse = smooth(clamp((time - 86) / 4))
  const rulePulse = Math.sin(Math.PI * field.mix)
  updateFieldPositions(field, field.rule, collapse)

  for (let index = 0; index < NODE_COUNT; index += 1) {
    const activity = lerp(field.from.state[index], field.to.state[index], field.mix)
    let scale = lerp(0.027, 0.122, activity)
    let brightness = lerp(0.045, 1, activity)
    let rotation = 0
    if (field.rule === RULE.MUTATE) {
      const signature = (CELLS[index].x * 3 + CELLS[index].y * 5 + CELLS[index].z * 7 + field.to.generation * 2) % 11
      if (signature === 0 || signature === 5) rotation = rulePulse * 0.9
    }
    if (collapse > 0) {
      if (index === visual.originIndex) {
        scale = lerp(scale, 0.115, collapse)
        brightness = lerp(brightness, 1, collapse)
      } else {
        scale *= 1 - collapse
        brightness *= 1 - collapse
      }
    }
    writeInstance(currentNodes, index, fieldPositions[index], scale, brightness, rotation)
  }
  finishInstances(currentNodes)

  const latticeOpacity = lerp(0.09, 0.058, metrics.density) * (1 - collapse)
  updateLatticeGraph(fieldPositions, latticeOpacity, collapse)
  const relationOpacity = field.rule === RULE.CONNECT ? 0.48 : 0.3
  updateActiveGraph(field, fieldPositions, relationOpacity, collapse)

  const history = previousSnapshots(cycle, field.from)
  updateGenerationGhost(generationGhosts[0], history[0]?.state, fieldPositions, 0.36, collapse)
  updateGenerationGhost(generationGhosts[1], history[1]?.state, fieldPositions, 0.135, collapse)
  updateGenerationGhost(generationGhosts[2], history[2]?.state, fieldPositions, 0.05, collapse)
  updateMemoryGraph(history[1]?.state, fieldPositions, 0.048 * (1 - collapse))
  updateInputChannels(visual, field, fieldPositions, time, collapse)

  const feedbackRotation = (1 - metrics.symmetry) * 0.22 + (metrics.entropy - 0.5) * 0.08
  root.rotation.y = lerp(0.12 + feedbackRotation, -0.12, collapse)
  root.rotation.x = lerp((0.5 - metrics.density) * 0.13, 0, collapse)
  root.position.set(
    metrics.centroid[0] * -0.04 * (1 - collapse),
    metrics.centroid[1] * -0.04 * (1 - collapse),
    metrics.centroid[2] * -0.04 * (1 - collapse),
  )

  return { field, metrics, collapse }
}

let lastGenerationKey = ''

function announceGeneration(cycleIndex, field) {
  const key = `${cycleIndex}:${field.to.generation}`
  if (key === lastGenerationKey) return
  lastGenerationKey = key
  document.dispatchEvent(new CustomEvent('nfi:generation', {
    detail: {
      cycle: cycleIndex,
      generation: field.to.generation,
      autonomous: field.to.autonomous,
      rule: field.to.rule,
      metrics: field.to.metrics,
    },
  }))
}

function updateScene(totalTime) {
  const cycleIndex = Math.floor(totalTime / CYCLE_SECONDS)
  ensureCycle(cycleIndex)
  const localTime = totalTime - cycleIndex * CYCLE_SECONDS
  const visual = visualCycles[cycleIndex]
  const collapse = smooth(clamp((localTime - 86) / 4))

  updateAncestryMeshes(visual, localTime, collapse)
  updateAncestryLines(visual, localTime, collapse)

  if (localTime < 30) {
    updateEarlySystem(visual, localTime)
    root.rotation.y = lerp(-0.12, 0.08, smooth(localTime / 30))
    root.rotation.x = lerp(0.04, 0, smooth(localTime / 30))
    root.position.set(0, 0, 0)
  } else if (localTime < 50) {
    updateRelationSystem(visual, localTime)
    root.rotation.y = lerp(0.08, 0.14, smooth((localTime - 30) / 20))
    root.rotation.x = 0
    root.position.set(0, 0, 0)
  } else {
    const state = updateFieldSystem(visual, localTime)
    announceGeneration(cycleIndex, state.field)
  }

  if (cycleIndex > 0 && localTime < 8) {
    const residue = 0.04 * (1 - smooth(localTime / 8))
    generationGhosts[2].material.opacity = Math.max(generationGhosts[2].material.opacity, residue)
  }

  root.updateMatrixWorld()
  window.NFI.current = {
    cycle: cycleIndex,
    time: localTime,
    phase: localTime < 15 ? 'ORIGIN' : localTime < 30 ? 'DIFFERENTIATION' : localTime < 50 ? 'RELATION' : localTime < 70 ? 'EVOLUTION' : 'SELF_INPUT',
    autonomous: cycleIndex > 0 || localTime >= 70,
    generation: localTime >= 50 ? fieldAt(visual.cycle, localTime).to.generation : 0,
  }
  document.documentElement.setAttribute('data-nfi-phase', window.NFI.current.phase)
}

function resize() {
  const width = Math.max(1, window.innerWidth)
  const height = Math.max(1, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
  renderer.setSize(width, height, false)
  const aspect = width / height
  const presentationAspect = 16 / 9
  const baseFov = 32
  camera.aspect = aspect
  camera.fov = aspect < presentationAspect
    ? THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(baseFov / 2)) * (presentationAspect / aspect)))
    : baseFov
  camera.updateProjectionMatrix()
}

window.addEventListener('resize', resize, { passive: true })
resize()

let startedAt = performance.now() / 1000
let offset = initialOffset
let paused = false
let pausedAt = 0
let recorder = null
let recordedChunks = []

function elapsedAt(nowSeconds) {
  return paused ? pausedAt : offset + (nowSeconds - startedAt) * speed
}

function reset() {
  startedAt = performance.now() / 1000
  offset = 0
  pausedAt = 0
  paused = false
  lastGenerationKey = ''
}

async function toggleFullscreen() {
  if (!document.fullscreenElement) {
    try {
      await document.documentElement.requestFullscreen({ navigationUI: 'hide' })
    } catch (error) {
      console.warn(error)
    }
  } else {
    await document.exitFullscreen()
  }
}

function togglePause() {
  const now = performance.now() / 1000
  if (paused) {
    startedAt = now
    offset = pausedAt
    paused = false
  } else {
    pausedAt = elapsedAt(now)
    paused = true
  }
}

function toggleRecording() {
  if (recorder && recorder.state === 'recording') {
    recorder.stop()
    return
  }
  if (!window.MediaRecorder || !renderer.domElement.captureStream) return
  const stream = renderer.domElement.captureStream(60)
  const mimeType = [
    'video/webm;codecs=vp9',
    'video/webm;codecs=vp8',
    'video/webm',
  ].find((type) => MediaRecorder.isTypeSupported(type)) || ''
  recordedChunks = []
  recorder = new MediaRecorder(stream, mimeType ? { mimeType, videoBitsPerSecond: 24000000 } : undefined)
  recorder.addEventListener('dataavailable', (event) => {
    if (event.data && event.data.size) recordedChunks.push(event.data)
  })
  recorder.addEventListener('stop', () => {
    const blob = new Blob(recordedChunks, { type: recorder.mimeType || 'video/webm' })
    const anchor = document.createElement('a')
    anchor.href = URL.createObjectURL(blob)
    anchor.download = `no-further-input-required-${seed}.webm`
    anchor.click()
    window.setTimeout(() => URL.revokeObjectURL(anchor.href), 4000)
  })
  recorder.start(1000)
}

window.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase()
  if (key === 'f') toggleFullscreen()
  if (key === '0') reset()
  if (key === ' ') {
    event.preventDefault()
    togglePause()
  }
  if (key === 'r') toggleRecording()
})
window.addEventListener('dblclick', toggleFullscreen)

window.NFI = {
  version: VERSION,
  seed,
  renderer,
  scene,
  root,
  current: null,
  reset,
  pause: togglePause,
  enterXR: (session) => renderer.xr.setSession(session),
}

renderer.setAnimationLoop((time) => {
  updateScene(elapsedAt(time / 1000))
  renderer.render(scene, camera)
})
