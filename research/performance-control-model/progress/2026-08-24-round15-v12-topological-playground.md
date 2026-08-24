# Performance Control Model — 2026-08-24 / Round 15

## ACTIVE QUESTION

Can the current mainline be expressed as one small navigable graphical topology whose route itself forms a coherent audiovisual phrase, instead of another grid / pad bank / sequencer interface?

## D5 v12 — TOPOLOGICAL PLAYGROUND

Status:

```text
IMPLEMENTED SOURCE
USER TEST PENDING
AUDIO QUALITY NOT PASSED
VISUAL QUALITY NOT PASSED
WEBXR TRANSLATION NOT DEVICE-TESTED
```

This version intentionally starts over at the artistic surface while retaining only reusable runtime principles from earlier rounds.

## 1. No 4×4 performance grid

The screen now contains eight irregular graphical nodes:

```text
FIELD
ROUTE
ORBIT
PARTITION
BURST
DROP
REWIND
RESIDUE
```

Their forms are part of the interaction contract:

- FIELD = soft region / enter / dwell / pressure;
- ROUTE = directed rail / travel / speed;
- ORBIT = circle / recurrence / direction;
- PARTITION = cross / boundary crossing / segmentation;
- BURST = star / pierce / peak accent;
- DROP = gravity well / approach / commit;
- REWIND = return arrow / retrace / release;
- RESIDUE = tail / memory / decay.

## 2. Curated adjacency

The performer cannot freely drag from every node to every other node.

Current edges:

```text
FIELD ↔ ROUTE
ROUTE ↔ ORBIT
ORBIT ↔ PARTITION
PARTITION ↔ BURST
BURST ↔ DROP
PARTITION ↔ DROP
DROP ↔ REWIND
PARTITION ↔ REWIND
REWIND ↔ RESIDUE
RESIDUE ↔ FIELD
```

A non-adjacent travel request is visibly rejected as `NO EDGE`.

The topology therefore carries a first compositional constraint.

## 3. Route as musical form

Primary route:

```text
FIELD
→ ROUTE
→ ORBIT
→ PARTITION
→ BURST
→ DROP
→ REWIND
→ RESIDUE
→ FIELD
```

Alternate repeat route:

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

At 148 BPM, AUTO advances every 4 bars. The 8-node route is therefore approximately 52 seconds; the alternate route is approximately 45 seconds.

AUTO alternates the routes so repetition has identity but is not exact repetition.

## 4. Musical world

This version removes the step sequencer from the foreground.

The audio structure is:

```text
CONTINUOUS GROUND
+
NODE PHRASE FAMILY
+
TRANSITION PHRASE
+
GESTURE MICRO-EVENTS
+
EXIT / RESIDUE
```

All nodes use one related synthesized pitch / spectral world. Special noise / metal / hiss events punctuate the structure rather than acting as the whole composition.

Each node has a complete phrase family rather than one short tone.

This is still browser-native synthesized material and must be judged by listening; implementation does not imply musical quality.

## 5. Gesture meaning

Primary interaction:

```text
ENTER NODE
→ phrase enters on a quantized boundary

TRAVEL TO AN ADJACENT NODE
→ transition + next phrase

RELEASE
→ node-specific exit / residue
```

Within-node process input:

```text
FIELD      depth / dwell → harmonic pressure
ROUTE      travel speed → subdivisions / higher transient energy
ORBIT      circular direction → cyclic high events
PARTITION  boundary crossing → cut / accent
BURST      velocity → stronger burst / strobe
DROP       center depth → impact / low-frequency commit
REWIND     backward travel → reverse / descending events
RESIDUE    dwell → memory reinforcement
```

## 6. Full-screen visual vocabulary

Node shapes are control affordances, but the visual result is not confined to them.

Current screen-scale behaviours:

```text
FIELD      global pressure / haze
ROUTE      directional full-screen flow lines
ORBIT      large recurring screen-scale rings
PARTITION  full-screen cuts / partitions
BURST      full-screen flash + rays
DROP       full-screen collapse / gravity rings
REWIND     reverse directional streaks
RESIDUE    large persistent arcs / tail
```

The art direction is intentionally reduced:

```text
dark
high contrast
precise line / spectral language
experimental electronic performance identity
Playground-like clarity only in the affordance / topology
```

## 7. World directional semantics

The node placement tests the current provisional world grammar:

```text
UP    → denser / brighter / closer to peak
DOWN  → release / residue / space
RIGHT → rhythm / structure / commit
LEFT  → field / texture / continuity
```

The performer should be able to infer where to move for `more explosive` vs `more sparse` without reading parameter labels.

## 8. Reused infrastructure

Only these earlier ideas are intentionally inherited:

```text
one authoritative transport
148 BPM shared clock
quantized intent
continuous ground
master compressor / voice budget
complete phrase rather than tiny event
immediate visual acknowledgement
reset / panic
input-agnostic node / edge / path concept
```

Not inherited:

```text
4×4 performance grid
16 isolated effects
8×8 hidden variations
sequencer-first composition
mini-DAW controls
arbitrary XY parameter labels
old visual elements merely because they already existed
```

## 9. 2D → 3D contract

v12 is deliberately structured so the same graph can later become:

```text
2D node     → WebXR volume
2D edge     → spatial corridor / arc
2D path     → hand trajectory
node depth  → local XYZ / distance
velocity    → hand velocity
release     → exit from volume
```

No second music engine is needed.

## 10. TEST GATE

Do not add nodes before these tests:

### AUDIO-ONLY

Run `AUTO ROUTE`, ignore / hide the screen, and judge whether one 45–52 second loop is worth listening to.

### VISUAL-ONLY

Mute audio and judge whether the audience view reads as one full-screen visual system rather than eight widgets.

### INTERACTION

Manually travel:

```text
FIELD → ROUTE → ORBIT → PARTITION → BURST → DROP → REWIND → RESIDUE → FIELD
```

Then try the direct branch:

```text
PARTITION → DROP
```

Confirm geometry suggests the actions and invalid jumps are understandable rather than merely frustrating.

### REPETITION

Run AUTO for two loops and judge whether the second loop is recognisable but not immediately fatiguing.

### 3D READINESS

For each node, verify that its 2D affordance still has a meaningful volume / corridor equivalent.

## NEXT GATE

If the route is not musically strong, do not add interaction features.

Revise:

```text
sound palette
phrase composition
harmonic / spectral compatibility
ground arrangement
transition timing
```

If the visual is weak, do not add more node types.

Revise only the small global vocabulary until it reaches a coherent stage identity.
