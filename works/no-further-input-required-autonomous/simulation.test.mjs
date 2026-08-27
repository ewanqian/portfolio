import test from 'node:test'
import assert from 'node:assert/strict'
import {
  NODE_COUNT,
  ORTHOGONAL_NEIGHBORS,
  PHASE,
  RULE,
  applyRule,
  createCycle,
  measureState,
  phaseAt,
  selectRule,
  splitAt,
} from './simulation.js'

function stateArray(state) {
  return [...state]
}

test('the spatial system is a 4×4×4 lattice with 144 unique axial relations', () => {
  assert.equal(NODE_COUNT, 64)
  const edgeCount = ORTHOGONAL_NEIGHBORS.reduce((total, neighbors) => total + neighbors.length, 0) / 2
  assert.equal(edgeCount, 144)
})

test('the visible timeline keeps the five conceptual phases continuous', () => {
  assert.equal(phaseAt(0), PHASE.ORIGIN)
  assert.equal(phaseAt(14.999), PHASE.ORIGIN)
  assert.equal(phaseAt(15), PHASE.DIFFERENTIATION)
  assert.equal(phaseAt(30), PHASE.RELATION)
  assert.equal(phaseAt(50), PHASE.EVOLUTION)
  assert.equal(phaseAt(70), PHASE.SELF_INPUT)
  assert.equal(phaseAt(89.999), PHASE.SELF_INPUT)
  assert.equal(phaseAt(90), PHASE.ORIGIN)

  assert.deepEqual([splitAt(0).to, splitAt(12).to, splitAt(18).to, splitAt(28).to], [1, 2, 4, 8])
})

test('a seed produces the same complete evolution every time', () => {
  const first = createCycle('NFI-deterministic-test')
  const second = createCycle('NFI-deterministic-test')

  assert.deepEqual(first.axisOrder, second.axisOrder)
  assert.deepEqual(first.mirrorAxes, second.mirrorAxes)
  assert.equal(first.snapshots.length, second.snapshots.length)
  first.snapshots.forEach((snapshot, index) => {
    assert.equal(snapshot.rule, second.snapshots[index].rule)
    assert.equal(snapshot.time, second.snapshots[index].time)
    assert.deepEqual(stateArray(snapshot.state), stateArray(second.snapshots[index].state))
  })
})

test('every generation is calculated only from its immediate parent generation', () => {
  const cycle = createCycle('NFI-parent-dependency-test')
  for (let index = 1; index < cycle.snapshots.length; index += 1) {
    const parent = cycle.snapshots[index - 1]
    const child = cycle.snapshots[index]
    const calculated = applyRule(parent.state, child.rule, child.generation)
    assert.deepEqual(stateArray(child.state), stateArray(calculated))
  }
})

test('external rule seeding stops at 70 seconds and self-measurement chooses every later rule', () => {
  const cycle = createCycle('NFI-self-input-test')
  const external = cycle.snapshots.filter((snapshot) => snapshot.time < 70)
  const autonomous = cycle.snapshots.filter((snapshot) => snapshot.time >= 70)

  assert.ok(external.length > 1)
  assert.ok(external.every((snapshot) => snapshot.autonomous === false))
  assert.ok(autonomous.length > 2)
  assert.ok(autonomous.every((snapshot) => snapshot.autonomous === true))

  for (const child of autonomous) {
    const index = cycle.snapshots.indexOf(child)
    const parent = cycle.snapshots[index - 1]
    const grandparent = cycle.snapshots[Math.max(0, index - 2)]
    const measurements = measureState(parent.state, grandparent.state)
    assert.equal(child.rule, selectRule(measurements))
  }
})

test('the fixed rule vocabulary contains expansion, connection, pruning and mutation', () => {
  const cycle = createCycle('NFI-rule-vocabulary-test')
  const rules = new Set(cycle.snapshots.map((snapshot) => snapshot.rule))
  assert.ok(rules.has(RULE.EXPAND))
  assert.ok(rules.has(RULE.CONNECT))
  assert.ok(rules.has(RULE.PRUNE))
  assert.ok(rules.has(RULE.MUTATE))
})

test('the next cycle inherits the previous cycle output without a new external seed', () => {
  const first = createCycle('NFI-inheritance-test')
  const second = createCycle(first.seed, first.finalState, first.previousFinalState, 1)
  const inheritedActiveCount = second.snapshots[0].metrics.activeCount

  assert.equal(second.cycleIndex, 1)
  assert.equal(second.snapshots[0].autonomous, true)
  assert.equal(inheritedActiveCount, first.finalMetrics.activeCount)
  assert.ok(second.snapshots.slice(1).every((snapshot) => snapshot.autonomous))
})
