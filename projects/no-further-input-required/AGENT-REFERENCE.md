# AGENT REFERENCE — No Further Input Required

> Machine-readable implementation brief for agents working on NFI or derivative audiovisual instruments.

## Scope

Use this file when:

- modifying **No Further Input Required**;
- building a new browser-based Live Set instrument that may reuse the v0.7 performance framework;
- deciding what to preserve vs. redesign from `works/no-further-input-required.html`;
- prototyping the next process-based gallery version.

## Canonical current playable reference

- Source: `works/no-further-input-required.html`
- Snapshot: `Interactive V0.7`
- Public URL: `https://ewanqian.site/works/no-further-input-required.html`
- Human design record: `projects/no-further-input-required/v0.7-performance-reference.md`
- Main project document: `projects/no-further-input-required-2026.md`

---

# Part I — v0.7 reusable performance framework

## Preserve these behaviours

1. Continuous generative background music.
2. One global BPM / bar clock shared by music and visuals.
3. Autonomous playback that remains alive without performer input.
4. Sparse manual overrides such as NEXT / HOLD / AUTO.
5. Multiple audiovisual behaviours inside one runtime.
6. Keyboard as optional fallback / trigger layer, not mandatory primary UI.
7. Fullscreen browser-first presentation.
8. Immediate audiovisual response to pointer/touch/keyboard.
9. Event behaviours that can continue after a gesture ends.
10. Minimal interface during actual performance.

## Do not preserve these behaviours by default

1. Literal cursor-following graphics.
2. Objects permanently tethered to the mouse position.
3. Hard scene switching as the main compositional device.
4. Six current visual state names as a fixed ontology.
5. Current Canvas 2D renderer if a different renderer better serves the new work.
6. Visual effects that respond only with generic scale/position changes.

## Pointer interaction rule

**BAD**

```text
pointer.x / pointer.y
    → object.x / object.y
```

**PREFERRED**

```text
raw pointer/touch path
    ↓
gesture analysis
(position, velocity, curvature, repetition, crossing, dwell)
    ↓
behaviour trigger / modulation
    ↓
audiovisual phrase
    ↓
continued autonomous evolution / residue
```

The pointer should inject energy, topology, timing or intention into the system. It should not behave as a leash.

---

# Part II — Live Set / touch-instrument derivative direction

## Interaction references

The target performance grammar combines:

- **NFI v0.7**: continuous music + autonomous runtime + multiple behaviours;
- **touch:waves-like event grammar**: one input launches a coherent audiovisual behaviour;
- **PlayGround-like touch performance**: swipe/tap/trace spatial shapes to control musical flow without requiring a piano-style interface.

Do not clone visual assets or code from reference works. Borrow interaction principles only.

## Required gesture analyser

Create a reusable `GestureInterpreter` that can expose at minimum:

```ts
interface GestureMetrics {
  position: Vec2;
  velocity: number;
  acceleration: number;
  direction: number;
  curvature: number;
  pathLength: number;
  crossingCount: number;
  dwellTime: number;
  repetitionRate: number;
  energy: number;
  loopDetected: boolean;
}
```

Possible higher-level gesture semantics:

```text
TAP
SWIPE
LOOP
FIGURE_EIGHT
SCRUB
CROSS
DWELL
ERASE
CIRCLE_EXISTING_EVENT
RAPID_REPEAT
```

Do not force exact recognition for every path. Soft classification / confidence weights are acceptable.

## Example behaviour mappings

- repeated figure-eight → increase phrase density / syncopation / orbital crossing;
- loop around an existing object → harmonize, duplicate or excite it;
- rapid repeated stroke → granular burst / rhythmic subdivision;
- slow dwell → sustain / accumulate / freeze locally;
- crossing two trails → collision / chord / branch event;
- erase gesture → suppress, mute or clear part of the system;
- release → created behaviour remains active for a decay period.

## Musical safety / playability

Prefer systems that remain musically usable even with imprecise gestures:

- quantize onset timing when useful;
- constrain pitch to curated scales / pitch sets;
- use gesture intensity to control phrase structure rather than raw pitch whenever possible;
- allow continuous music to provide context beneath sparse manual gestures;
- avoid requiring pixel-perfect dragging.

---

# Part III — NFI gallery direction: process-based runtime

The gallery work should no longer be organized primarily as six scene presets.

Use:

```text
persistent world
+ active machine process
+ residual traces from previous processes
```

Each active process should have an internal temporal structure:

```text
INPUT
→ PARSE
→ EXPAND / SEARCH
→ COMPARE / SUPPRESS
→ COMMIT
→ RESIDUE
```

The exact path, duration and density should vary per event.

## Shared world state

Agents should design future modules around a shared state rather than isolated canvases.

Suggested model:

```ts
interface NFIWorldState {
  time: number;
  bpm: number;
  bar: number;
  humanInput: number;
  machineAutonomy: number;
  activeProcesses: ProcessInstance[];
  nodes: KnowledgeNode[];
  traces: ResidualTrace[];
  mediaFragments: MediaFragment[];
  decisions: DecisionRecord[];
  attractors: Attractor[];
  density: number;
  entropy: number;
}
```

All modules may read this state. Selected modules may write back into it.

---

# Part IV — eight process modules to prototype

## P01 DECOMPOSE

Preserve and extend the strongest current triangular / downward decomposition language.

**Meaning:** input becomes material rather than final output.

**Sequence:**

```text
compact object / triangle
→ internal subdivisions appear
→ layers descend / separate
→ fragments receive indices or small labels
→ geometry loses original hierarchy
→ selected fragments survive as traces
```

**Visual requirements:**

- 2D + 3D hybrid is allowed;
- depth should be legible;
- avoid decorative exploding particles;
- subdivision must look procedural / consequential;
- residue should feed later processes.

**Output to world state:** fragments, weights, selected geometry.

---

## P02 TOKEN FIELD

**Meaning:** continuous language/media is converted into discrete processable units.

**Sequence:**

```text
incoming phrase / image identifier
→ rapid segmentation
→ numbers / words / short labels flash
→ clusters form
→ some tokens gain weight and scale
→ most disappear
→ selected tokens become context nodes
```

**Visual language:** typography, tables, counters, small graphs, sparse 3D depth.

**Important:** do not fake a literal LLM chain-of-thought. Treat this as an artistic representation of machine-readable segmentation / feature extraction.

**Output:** token nodes + importance weights.

---

## P03 CONTEXT ASSEMBLY

**Meaning:** a current decision is influenced by previous and retrieved context.

**Sequence:**

```text
new input
→ fragments from older states return
→ text / image / video-frame tiles appear at different depths
→ tiles reorder rapidly
→ temporary constellations form
→ some fragments are pulled close, others pushed away
→ a context bundle stabilizes briefly
```

**Visual language:** image fragments, text blocks, frame strips, depth planes, connection lines.

**Output:** context bundle referenced by later processes.

---

## P04 BRANCH SEARCH

**Meaning:** many possible paths are generated; most are suppressed.

**Sequence:**

```text
single node
→ branching burst
→ branches fork at different rates
→ temporary parallel hypotheses
→ conflict / pruning waves
→ dead branches dim or collapse
→ 1–3 surviving routes remain
```

**Visual language:** node graph, branching topology, spatial tree, sparse numeric annotations.

**Performance:** growth should sometimes be explosive and sometimes hesitant.

**Output:** surviving candidate routes + rejected-route residues.

---

## P05 WEIGHT SPACE

**Meaning:** the system continuously redistributes importance.

**Sequence:**

```text
context nodes enter a 3D field
→ invisible forces rearrange distance / scale / orbit
→ several competing attractors emerge
→ dominant weights pull structures together
→ weaker structures drift outward
→ a temporary hierarchy stabilizes
```

**Visual language:** 3D weighted field, orbit/cube/volume, gravity-like motion, depth and occlusion.

**Critical interaction rule:** do NOT attach the object directly to the mouse. Pointer gestures may perturb forces, insert attractors, rotate the field or change energy, but the world must retain its own dynamics.

**Output:** updated weights / attractors.

---

## P06 COMMIT / COLLAPSE

**Meaning:** a huge internal possibility space becomes one small visible output.

**Sequence:**

```text
many active candidates
→ synchronized pause / tension
→ rapid comparison flashes
→ most structures collapse or retract
→ one form / phrase / route remains
→ COMMIT event
→ screen becomes unexpectedly sparse
```

**Visual language:** extreme density-to-sparsity contrast.

**Sound:** build pressure, then subtract rather than simply adding a hit.

**Output:** a decision record that influences future processes.

---

## P07 KNOWLEDGE EDGE

**Meaning:** machine completion within known space versus genuinely new human input that pushes a boundary.

**Sequence:**

```text
large accumulated knowledge body
→ machine activity rapidly fills / interpolates interior gaps
→ structure becomes smoother / more complete
→ human input occasionally appears at the boundary
→ boundary deforms outward
→ new region initially unstable
→ machine begins filling that new territory
```

**Visual language:** growing volume / membrane / field, interior interpolation, rare boundary rupture.

**Avoid:** literal infographic circles with explanatory labels as the main image. The concept should be embodied in spatial behaviour.

**Output:** changed world boundary / new unexplored region.

---

## P08 RESIDUAL MEMORY

**Meaning:** previous human and machine decisions remain after the original input disappears.

This is the conceptual core of the artwork.

**Sequence:**

```text
process ends
→ most visible content disappears
→ selected geometry / paths / weights remain faintly active
→ later process enters
→ old traces bias its starting conditions
→ repeated decisions become stronger attractors
→ avoided routes become less likely
```

**Visual language:** ghosts, persistent nodes, faded trajectories, inherited deformation, subtle historical layering.

**Implementation goal:** this should not only be visual decoration. Residue should alter actual system parameters where possible.

**Output:** modified future transition weights / initial conditions.

---

# Part V — composition rules across the eight processes

## Do not show them as eight full-screen presets

Processes may overlap.

Examples:

```text
TOKEN FIELD
    + old RESIDUAL MEMORY traces
    + a small BRANCH SEARCH region
```

or

```text
WEIGHT SPACE remains in background
    while CONTEXT ASSEMBLY flashes in foreground
    then COMMIT collapses both
```

## Density rule

The work needs strong density contrast:

- some moments nearly empty;
- some moments contain many simultaneous micro-events;
- density should emerge from computation stages, not random decoration;
- maximum density should be followed by subtraction, collapse or silence.

## Human / machine ratio

Maintain two conceptual variables:

```text
humanInput
machineAutonomy
```

Do not necessarily display them as UI meters.

Use them to change behaviour:

**higher human input**
- introduces discontinuity;
- can create new boundary regions;
- changes rules / structure rather than only adding more content.

**higher machine autonomy**
- increases interpolation, completion, repetition and internal recombination;
- can become smoother and more statistically stable;
- may gradually converge toward attractors / averaged structures.

This is a compositional proposition, not a scientific claim about intelligence.

---

# Part VI — prototype strategy for agents

Do not implement all modules in one pass.

Recommended process:

1. keep v0.7 untouched as playable reference;
2. create isolated prototypes for P01–P08;
3. each prototype must demonstrate **birth → development → decision/release → residue**;
4. capture screenshots / short recordings at several timestamps;
5. artist selects the strongest modules;
6. only selected modules enter the shared runtime;
7. then build overlap and persistent-world logic.

## Evaluation test for every prototype

A module passes only if:

1. the viewer can perceive that a process is unfolding;
2. the process changes what comes after it;
3. the behaviour suggests a machine-scale operation that is normally invisible to a human viewer.

If only #1 is true: motion design.

If #1 + #2 are true: generative system.

If all three are true: candidate for **No Further Input Required**.

---

# Part VII — technology preference

For quick isolated sketches:

- p5.js / p5 WEBGL;
- Canvas / SVG;
- small standalone HTML prototypes.

For the integrated next-generation runtime, prefer evaluating:

- TypeScript;
- Three.js;
- TSL / WebGPU where it provides real benefit;
- WebAudio / Tone.js;
- DOM/SVG/Canvas overlay for typography and data;
- a shared process/state architecture.

Technology is not the artwork. Choose the simplest system capable of producing the desired behaviour reliably in a gallery / performance browser environment.
