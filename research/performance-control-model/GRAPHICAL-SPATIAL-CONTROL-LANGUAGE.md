# Graphical / Spatial Control Language

**Parent:** Performance Control Model  
**Tracks:** R1 Runtime & Temporal Control + R2 Spatial / Alternative Input Control  
**Status:** SPECIFIED / NOT YET VALIDATED  
**Midterm date:** 2026-08-24

## 0. Why this document exists

The recent browser prototypes proved that a full-screen surface is more promising than a conventional control panel, but they also exposed a failure mode:

```text
more zones
+ more mappings
+ more local effects
≠
more musical or visual quality
```

The next phase therefore stops treating the interface as a bank of buttons or a fixed 4×4 grid.

The new question is:

> Can music be represented as a navigable graphical topology, where shape, direction and adjacency already suggest how the performer should interact, and where the same language can later be lifted from 2D to 3D?

The grid remains useful for debugging and teaching, but it is no longer the target performance language.

---

# 1. Core model: TOPOLOGICAL PERFORMANCE FIELD

The performance surface is a graph, not a matrix.

```text
NODE
= one prepared musical / audiovisual role or phrase family

EDGE
= an allowed / meaningful transition

PATH
= a phrase or section-level browsing order

LOOP
= a repeatable musical form

FIELD
= the whole navigable performance space
```

The performer does not need to remember sixteen arbitrary mappings.

The geometry itself should communicate:

- what kind of action is natural here;
- what direction increases or decreases energy;
- which neighbouring states are compatible;
- whether this place is transient, sustained, branching or terminal;
- where a phrase can continue next.

---

# 2. Shape is an interaction affordance

Different graphical forms should imply different control grammars.

## Circle / Orbit

Suggests:

```text
circle / arc gesture
→ rotation / recurrence / cycle

radius
→ intensity / orchestration width

clockwise / counter-clockwise
→ forward / reverse variation
```

Musical role:

- cyclic high rhythm;
- repeated motif;
- orbiting spectral material;
- loop memory.

## Line / Rail

Suggests:

```text
travel along direction
→ phrase progression

position
→ spectral / rhythmic position

speed
→ subdivision / energy
```

Musical role:

- scan;
- rise / fall;
- rewind;
- route / transition.

## Field / Cloud

Suggests:

```text
enter / dwell
→ sustained pressure

move deeper
→ density / harmonic pressure

move outward
→ release / thinning
```

Musical role:

- atmosphere;
- low field;
- texture;
- sustained harmonic bed.

## Split / Partition

Suggests:

```text
cross boundary
→ split / alternate

move between partitions
→ redistribute emphasis

repeat crossing
→ stutter / subdivision
```

Musical role:

- chord blocks;
- sectional rhythm;
- pre-peak build;
- structural cut.

## Branch

Suggests:

```text
choose a branch
→ choose one musical alternative

return to junction
→ recover shared phrase

linger on branch
→ increase survival weight
```

Musical role:

- controlled variation;
- harmonic alternative;
- build / decision.

## Sink / Drop / Gravity well

Suggests:

```text
enter center
→ commit / impact

approach edge
→ tension

exit outward
→ residue / release
```

Musical role:

- drop;
- impact;
- collapse;
- low-frequency punctuation.

These are not decorative icons. The geometry is part of the control contract.

---

# 3. Adjacency must have musical meaning

The next node should not merely be the closest point on screen.

Edges represent compatibility.

An edge may mean:

```text
SAFE NEXT
works after current phrase

BUILD NEXT
raises density / energy

RELEASE NEXT
removes or thins material

RECALL NEXT
returns historical material

CONTRAST NEXT
creates a deliberate break
```

This creates a compositional graph.

Example:

```text
FIELD
├─ ROUTE       build motion
├─ ORBIT       add high cyclic detail
└─ PARTITION   introduce harmonic segmentation

PARTITION
├─ DROP        commit / peak
├─ REWIND      release / descend
└─ RESIDUE     leave memory
```

The performer can still jump elsewhere, but the interface should visually communicate which transitions are structurally preferred.

---

# 4. Path = musical phrase

A path through the field should be able to constitute a complete phrase without requiring an external sequencer grid.

Two initial path grammars are worth testing.

## A. Snake / continuous route

```text
START
→ sparse pulse
→ field
→ cyclic detail
→ partition
→ impact
→ residue
→ return
```

A single continuous drag can therefore produce a complete arc.

## B. Closed loop / circular route

```text
OPEN
→ BUILD
→ PEAK
→ RELEASE
→ OPEN
```

One loop is one musical sentence.

Repeating the same loop should preserve identity while changing controlled details:

```text
same route
+ variation seed
+ current history
+ density budget
→ recognisable but non-identical repetition
```

This is a stronger long-form model than repeatedly firing unrelated clips.

---

# 5. Interaction hierarchy

The next phase should keep the input grammar small.

## Primary

```text
ENTER / TOUCH NODE
→ activate phrase family

TRAVEL ALONG SHAPE
→ develop the phrase

MOVE TO CONNECTED NODE
→ transition

RELEASE
→ autonomous decay / residue
```

## Secondary

```text
SPEED
→ transient energy / subdivision

DIRECTION
→ forward / reverse / build / release bias

DWELL
→ sustain / deepen / memory

LOOP / RETRACE
→ recurrence / motif reinforcement
```

Avoid adding new gesture types until these prove insufficient.

---

# 6. Music is encoded by topology, not by visual decoration

The topology must correspond to prepared musical structure.

Each node owns:

```text
ROLE
PHRASE FAMILY
HARMONIC / SPECTRAL BAND
DENSITY RANGE
ATTACK
DEVELOPMENT
RELEASE
RESIDUE
COMPATIBLE NEXT NODES
```

Each edge owns:

```text
TRANSITION TYPE
QUANTIZATION BOUNDARY
CROSSFADE / OVERLAP RULE
ENERGY DELTA
DENSITY DELTA
PROBABILITY / VARIATION RANGE
```

The route therefore becomes a musical graph rather than a UI navigation graph.

---

# 7. Visual quality rule

The next visual phase should intentionally reduce vocabulary.

Use a small number of full-screen behaviours:

```text
GLOBAL FLOW / DIRECTION
GLOBAL FIELD / PRESSURE
GLOBAL PARTITION / CUT
GLOBAL ORBIT / RECURRENCE
GLOBAL COLLAPSE / RESIDUE
```

Local geometry is allowed as a control cue, but audience-facing output should not look like sixteen isolated widgets.

Rules:

- every important gesture must have a full-screen consequence;
- local feedback may identify the control source;
- full-screen behaviours may overlap, but density is budgeted;
- direction should be legible at screen scale;
- use subtraction and silence as strongly as addition;
- avoid generic XYZ translation as the primary visual response.

---

# 8. 2D → 3D continuity

This language is deliberately designed as a 2D projection of a later 3D instrument.

## 2D

```text
NODE      point / shape / area
EDGE      line / corridor
PATH      trajectory
FIELD     screen plane
DEPTH     inferred amount / dwell / state
```

## 3D

```text
NODE      sphere / volume / mesh region
EDGE      spatial corridor / arc
PATH      hand trajectory
FIELD     navigable volume
DEPTH     literal local Z / distance
```

Translation:

```text
2D position          → local XYZ
pointer velocity     → hand velocity
shape boundary       → volume boundary
hover / dwell        → spatial dwell
loop gesture         → hand-path loop
adjacent node        → adjacent volume
path traversal       → spatial phrase traversal
```

The musical runtime must remain the same. Only the input geometry changes.

---

# 9. Proposed v12 proof

Do not build a polished instrument first.

Build one topology with only 6–8 nodes:

```text
FIELD
→ ROUTE
→ ORBIT
→ PARTITION
→ DROP
→ RESIDUE
→ FIELD
```

Include one branch:

```text
PARTITION
↘ REWIND
  ↘ FIELD
```

Acceptance:

1. a new user can infer at least three interaction directions from geometry alone;
2. one continuous route produces a 30–60 second recognisable musical arc;
3. repeating the route remains recognisable but not identical;
4. route transitions sound intentional without manual micro-editing;
5. every node causes a full-screen visual consequence;
6. the topology can be described directly as a future 3D volume graph.

Until this passes, do not expand to sixteen graphical nodes or Vision Pro.

---

# 10. Research interpretation

The current research proposition becomes more precise:

> A complex performance system can be made playable not only by reducing the number of controls, but by embedding musical structure into the geometry and topology of the control space itself.

This creates a bridge between:

```text
R1 musical / temporal structure
+
R2 spatial / alternative input
```

without creating a second performance engine.
