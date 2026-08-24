# Performance Control Model — Current Mainline

**Status:** CANONICAL MAINLINE  
**Updated:** 2026-08-24  
**Parent:** Performance Control Model / Issue #59  
**Related tracks:** R1 Runtime & Temporal Control + R2 Spatial / Alternative Input Control

## 0. Current mainline in one sentence

The current research mainline is to combine:

```text
Touch:waves-like direct audiovisual triggering
+
Playground-like graphical / adjacent / navigable interaction
+
Performance Control Model state / timing / safety
+
2D → 3D WebXR spatial compatibility
```

into one playable audiovisual control language.

The goal is no longer to build a denser button bank, a larger sequencer, or a browser DAW.

The current research question is:

> **Can musical structure be embedded into the geometry and topology of a control space so that a performer can navigate a complete audiovisual form through intuitive movement, while the runtime maintains timing, compatibility, safety and long-form coherence?**

---

# 1. Four sources are being combined, but they have different roles

## A. Touch:waves — directness and curated compatibility

What is retained conceptually:

- one gesture / key should produce an immediate and legible audiovisual response;
- material should be selected for compatibility rather than generated without review;
- backing / ground continuity matters;
- quantization can protect musical timing without requiring keyboard skill;
- the interface should remain fast and playful even when the internal system is complex;
- distinctive special sounds such as AIR / HISS / METAL / GLASS / IMPACT can create strong identity without carrying the whole harmonic structure.

What is **not** copied:

- source code;
- exact interface;
- exact samples;
- 26-key structure as a fixed target.

Touch:waves is a structural reference, not a dependency.

## B. Playground — spatial adjacency and graphical affordance

The key value is not cartoon styling itself.

The important principle is:

> neighbouring states and graphical forms have meaningful relationships.

The performer should be able to infer behaviour from shape and position:

```text
CIRCLE / ORBIT
→ loop / recurrence / rotation

LINE / RAIL
→ travel / scan / phrase progression

FIELD / CLOUD
→ enter / dwell / pressure / release

PARTITION / CROSS
→ cross / split / stutter / structural segmentation

BRANCH
→ choose an alternative / return to junction

SINK / DROP
→ approach tension / commit / impact / release
```

Adjacency must encode musical compatibility, not merely screen proximity.

## C. Performance Control Model — system memory and reliability

The graphical interaction still enters one guarded runtime.

Keep:

```text
Result = Input + State + History
```

and:

```text
INPUT
↓
IMMEDIATE ACK
↓
SEMANTIC ACTION / INTENT
↓
QUANTIZED OR SAFE EXECUTION
↓
AUDIO + VISUAL STATE CHANGE
↓
RESIDUE / HISTORY
```

Machine responsibilities:

```text
BPM / TRANSPORT
QUANTIZATION
HARMONIC / SPECTRAL COMPATIBILITY
MAX VOICES
DENSITY BUDGET
SIGNAL GUARD
TRANSITION SAFETY
AUTO DECAY
RESET / PANIC
```

Human responsibilities:

```text
ENTER
TRAVEL
DWELL
CHOOSE BRANCH
HOLD
RETRACE
RELEASE
RETURN
```

## D. WebXR — spatial extension, not a second engine

The 2D language must be designed so it can be lifted directly to 3D.

```text
2D NODE      → 3D VOLUME
2D EDGE      → SPATIAL CORRIDOR / ARC
2D PATH      → HAND TRAJECTORY
2D FIELD     → NAVIGABLE CONTROL VOLUME
POINTER SPEED → HAND VELOCITY
DWELL        → SPATIAL DWELL / PINCH HOLD
LOOP         → HAND-PATH LOOP
```

The music runtime does not change.

Vision Pro / WebXR is an input geometry adapter to the same R1 runtime.

---

# 2. Current interface model: topological performance field

The 4×4 grid is no longer the final performance language.

It remains useful only as:

```text
DEBUG VIEW
WORKSHOP VIEW
MAPPING TEST VIEW
```

The audience-facing instrument becomes:

```text
NODE
= prepared audiovisual phrase family

EDGE
= meaningful / compatible transition

PATH
= phrase or section progression

LOOP
= repeatable musical form

FIELD
= complete navigable performance space
```

The topology itself should carry musical information.

A performer should be able to understand:

- where to go to increase energy;
- where to go to thin the system;
- which neighbour is a safe continuation;
- which branch creates contrast;
- where a peak / drop / release is available;
- how to return to a stable field.

---

# 3. Global directional semantics

The next 2D prototype should test one stable world-scale directional grammar.

Provisional mapping:

```text
UP
→ brighter / denser / faster / more peak

DOWN
→ sparser / slower / longer / release / residue

RIGHT
→ more rhythmic / structured / percussive / performative

LEFT
→ more atmospheric / continuous / textural / spatial
```

Therefore:

```text
TOP-RIGHT
→ peak / burst / partition / drop

BOTTOM-LEFT
→ field / residue / release

RIGHT SIDE
→ route / groove / pulse / structural rhythm

LEFT SIDE
→ cloud / texture / atmosphere / spectral field
```

This is provisional and must be tested perceptually rather than treated as a universal rule.

---

# 4. Node behaviour contract

Every node must be redesigned for the interaction environment.

Do not preserve a visual element merely because an older demo already used it.

A node only survives if it passes the current interaction and quality gates.

Each node must define:

```text
SHAPE
MUSICAL ROLE
FULL-SCREEN VISUAL ROLE
ENTER
STAY / TRAVEL
EXIT
RESIDUE
COMPATIBLE NEIGHBOURS
BUILD DIRECTION
RELEASE DIRECTION
```

Minimum behavioural envelope:

```text
ENTER
→ DEVELOP WHILE INSIDE / TRAVELLING
→ TRANSFORM
→ EXIT
→ RESIDUE
```

The performer should not need to continuously wiggle the pointer to keep the result alive.

---

# 5. Candidate node families for the next proof

These are design families, not inherited demo objects.

## FIELD

Shape: cloud / soft region  
Role: atmosphere / low harmonic pressure / stable base  
Interaction: enter, dwell, move deeper, move outward  
Exit: slow release and residue

## ROUTE

Shape: directional line / rail  
Role: pulse / phrase progression / groove  
Interaction: travel along direction; speed changes subdivision / energy

## ORBIT

Shape: circle / ring  
Role: recurrence / cyclic high rhythm / motif memory  
Interaction: circle, radius, direction, retrace

## PARTITION

Shape: cross / split plane / divided field  
Role: chord blocks / segmentation / build  
Interaction: cross boundaries, repeat crossing, redistribute emphasis

## BURST

Shape: star / spike / ignition point  
Role: accent / strobe / peak energy  
Interaction: enter or pierce; rapid recurrence increases intensity

## DROP

Shape: gravity well / sink  
Role: commit / impact / sub / collapse  
Interaction: approach edge → tension; enter centre → commit; exit → debris / residue

## REWIND

Shape: return arrow / folded rail  
Role: descend / reverse / release / recovery  
Interaction: move backward / retrace

## RESIDUE

Shape: tail / floating arc / memory trace  
Role: continuity / history / release  
Interaction: dwell to strengthen memory; leave to decay

The first v12 proof should use only 6–8 nodes.

---

# 6. Adjacency is a compositional decision

Edges must be curated.

Initial compatibility hypothesis:

```text
FIELD
↔ ROUTE
↔ ORBIT
↔ PARTITION
↔ DROP
↔ REWIND / RESIDUE
↔ FIELD
```

Useful branch:

```text
PARTITION
├─ BURST → DROP
├─ DROP → RESIDUE
└─ REWIND → FIELD
```

Preferred examples:

```text
FIELD → ROUTE
stable base → motion

ROUTE → ORBIT
motion → cyclic detail

ORBIT → PARTITION
high detail → structural segmentation

PARTITION → DROP
build → commit / peak

DROP → REWIND
impact → controlled withdrawal

REWIND → FIELD
release → stable base
```

Avoid arbitrary adjacency when the transition has no musical explanation.

The value of the topology is that the next action is partly composed into the space.

---

# 7. Route and loop become musical form

The main next proof is not a collection of nodes.

It is one route that already works as a short performance.

Candidate:

```text
FIELD
→ ROUTE
→ ORBIT
→ PARTITION
→ DROP
→ REWIND
→ RESIDUE
→ FIELD
```

Alternative peak branch:

```text
PARTITION
→ BURST
→ DROP
```

A complete traversal should form:

```text
OPEN
→ MOTION
→ BUILD
→ PEAK
→ RELEASE
→ RETURN
```

Target length:

```text
30–60 seconds per complete route
```

Repeating the route should be:

```text
recognisable
but not identical
```

using constrained variation, history and density budgets.

The same route should remain listenable after repeated traversal.

---

# 8. Musical quality gate

The first-half research produced useful control architecture but insufficient musical quality.

Therefore the second half uses a strict audio gate.

Before a node / route is promoted:

1. listen with visuals hidden;
2. the route must sound intentional for 30–60 seconds;
3. one node must behave as a phrase family, not one short tone;
4. the continuous ground must carry pauses between human actions;
5. materials must share a coherent harmonic / spectral world;
6. special FX must punctuate structure rather than substitute for composition;
7. repeated loops must not become immediately fatiguing.

Sequencer / probability / random are support systems only.

They cannot rescue weak source material.

---

# 9. Visual quality gate

The visual system is being rebuilt for the new interaction environment.

Do not inherit old effects by default.

Reduce the audience-facing vocabulary to approximately:

```text
GLOBAL FLOW
GLOBAL FIELD / PRESSURE
GLOBAL ORBIT / RECURRENCE
GLOBAL PARTITION / CUT
GLOBAL COLLAPSE / RESIDUE
GLOBAL BURST / STROBE when justified
```

Quality rules:

- every important interaction has a screen-scale consequence;
- local geometry communicates control affordance, but does not become sixteen isolated widgets;
- direction must be readable at full-screen scale;
- enter / stay / exit must have distinct behaviour;
- subtraction / negative space are first-class behaviours;
- generic XYZ translation is not accepted as a main visual idea;
- only visually strong effects survive into the next version.

The visual style itself must be intentionally art-directed.

Current style spectrum to evaluate:

```text
A. professional electronic / experimental performance
   dark, precise, high-contrast, spectral, noisy, metallic, strobe-capable

B. playful / graphical Playground influence
   legible shapes, strong affordance, more character and immediate play value
```

Current preference:

> use A as the primary performance identity while borrowing B's clarity, adjacency and playability.

---

# 10. Current retained engineering principles

Keep as reusable infrastructure:

```text
ONE AUTHORITATIVE TRANSPORT
QUANTIZED INTENT
IMMEDIATE ACK
COMPLETE CLIP / PHRASE
CONTINUOUS GROUND
SIGNAL GUARD
ROLE / SPECTRAL BUDGET
MAX ACTIVE
AUTO ASSIST / DRIVE AS SUPPORT
EDIT / PERFORM SEPARATION
FULL-SCREEN AUDIENCE OUTPUT
RESET / PANIC
INPUT-AGNOSTIC CONTROL BUS
```

Do not silently restore:

```text
8×8 hidden variations
sequencer-first composition
16 isolated visual widgets
browser-DAW feature accumulation
one-shot short sounds as the main material
random as a replacement for curation
arbitrary XY labels for every node
```

---

# 11. Relationship to existing documents

Read in this order for the current mainline:

1. `MAINLINE.md` — current direction and decisions
2. `MIDTERM-REVIEW-2026-08-24.md` — why the project changed direction
3. `GRAPHICAL-SPATIAL-CONTROL-LANGUAGE.md` — node / edge / path / loop / 2D→3D grammar
4. `RUNTIME-SPEC.md` — shared musical / timing runtime
5. `RESEARCH-MAP.md` — R1 / R2 / R3 parent classification
6. `experiments/spatial-playground-webxr/README.md` — WebXR validation branch
7. `DEMO-ARCHIVE-2026-08-24.md` — what previous prototypes proved or rejected

---

# 12. Current development state

```text
CONTROL ARCHITECTURE       STRONG / REUSABLE
MUSICAL MATERIAL QUALITY   INSUFFICIENT / ACTIVE PRIORITY
FULL-SCREEN VISUAL LANGUAGE INSUFFICIENT / REBUILD
TOPOLOGICAL LANGUAGE       SPECIFIED / NOT YET PROVEN
2D PERFORMANCE PROOF       NEXT ACTIVE GATE
WEBXR DEVICE VALIDATION    HOLD UNTIL 2D LANGUAGE PASSES
```

The next version is provisionally:

```text
D5 v12 — Topological Playground
```

It must start with only 6–8 nodes.

---

# 13. Next single research gate

Do not add another general control system.

The next active research task is:

> **Design one coherent 6–8 node graphical topology and one 30–60 second closed / snake route whose audio works with the screen hidden, whose visual consequences operate at full-screen scale, and whose geometry can later become WebXR volumes and corridors without changing the musical runtime.**

Pass before expansion.

Acceptance:

```text
AUDIO-ONLY
route is worth listening to

VISUAL-ONLY
screen reads as one art-directed system

INTERACTION
geometry suggests how to enter / travel / leave

TOPOLOGY
adjacency has a musical explanation

REPETITION
same route remains recognisable but variable

3D READINESS
node / edge / path translate directly to volume / corridor / hand trajectory
```

This is the current canonical research mainline.