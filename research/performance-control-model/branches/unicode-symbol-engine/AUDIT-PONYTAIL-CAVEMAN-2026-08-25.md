# Performance Control Model — Ponytail / Caveman Audit

Date: 2026-08-25
Branch: `research/unicode-symbol-engine`
Status: CANONICAL BRANCH AUDIT

## Why this audit exists

The last iterations became harder to reason about because four different quantities were repeatedly treated as if they were the same thing:

- number of available materials;
- number of visible control nodes;
- number of visual states;
- number of sequencers / editable structures.

User feedback asking for more richness was often answered by increasing all four at once. That is the core loss of control.

This audit applies Ponytail's rule — understand the real flow, then stop at the first solution that holds — and Caveman's communication rule — retain technical substance, remove decorative explanation.

## The invariant logic that survived the whole research

These are not optional stylistic preferences. They are the repeated findings across the prototypes.

1. **One authoritative transport**
   - one BPM / beat / bar / phrase clock;
   - all timing derives from it.

2. **Immediate acknowledgement + safe musical execution**
   - gesture is acknowledged immediately;
   - phrase body may enter on a quantized boundary.

3. **Prepared behaviour beats tiny one-shot events**
   - useful input launches a complete phrase / behaviour;
   - `ENTER → DEVELOP → TRANSFORM → EXIT → RESIDUE` remains correct.

4. **Continuous ground matters**
   - performance must survive pauses between gestures;
   - user should not need to continuously wiggle to keep music alive.

5. **Signal Guard is infrastructure**
   - max active;
   - spectral / role budget;
   - duplicate suppression;
   - master headroom;
   - panic / reset;
   - automatic decay.

6. **Many available materials, few coherently active materials**
   - material library may be large;
   - simultaneous active layers remain small.

7. **The screen itself is the performance surface**
   - important gestures must have screen-scale consequence;
   - audience output must not read like independent widgets.

8. **Continuous gesture is process input**
   - path / speed / direction / dwell alter behaviour;
   - literal cursor-following is insufficient.

9. **State and history remain part of the result**
   - `Result = Input + State + History`;
   - previous actions alter current residue, density, continuation.

10. **Topology should carry musical information**
    - node / edge / path / loop / field are meaningful only if adjacency has a compositional reason.

11. **2D must translate to 3D without creating a second runtime**
    - node → volume;
    - edge → corridor;
    - path → hand trajectory;
    - music engine unchanged.

12. **Quality gates precede expansion**
    - audio-only must work;
    - visual-only must work;
    - one 30–60 second route must work before multiplying nodes.

## Version history: what each era actually proved

### D0–D1

Proved baseline:

- raw direct trigger is boring;
- quantized intent is useful.

No reason to return to `INPUT → ONE SHOT` as main model.

### D5 v2–v6

Useful engineering discoveries:

- one global transport;
- visible sequence state;
- stable live editing;
- authoring / performance split.

Drift:

- sequencer became false centre;
- parameter count grew faster than musical value;
- browser mini-DAW direction appeared.

Correct response was not a better sequencer. It was v8 Clip-First.

### D5 v7–v9

Important correction:

- material count ≠ active-layer count;
- complete clips / phrase families matter;
- Signal Guard / AUTO support matter.

This remains one of the strongest sections of the project.

### D5 v10

Strong proof:

- full-screen continuous 2D control has real value;
- pointer can become process input;
- good bridge toward future WebXR.

### D5 v11

Explicit negative evidence:

- 4×4 isolated regions fragment the image;
- grid boundaries dominate artwork;
- local effects do not automatically make one performance system.

The repository explicitly classified 4×4 as debug / workshop / mapping view, not canonical audience language.

### D5 v12–v13

Correct conceptual move:

- topology;
- explicit enter / exit / corridor;
- micro-sequencer embedded as local score;
- route / adjacency as musical structure.

Failed quality gate:

- source music still weak;
- visuals not strong enough;
- path still felt too singular / underpopulated.

Important: v12/v13 failed because of **material and visual quality**, not because topology was wrong.

### vL1

Good reset.

Low-fi notes + multi-route + editable sequencer was the right debugging move because it separated structure from art direction.

### vL2 Chunk Field

First major second-half drift.

Good idea retained:

- `Chunk` as a complete behaviour;
- many available signals / few active signals;
- ENTER / INSIDE / EXIT / RESIDUE;
- large material library permitted.

Drift introduced:

- available material count became visible-node count;
- every chunk gained its own sequencer/editor;
- the system began multiplying ontology instead of improving material quality.

The sentence "screen may contain as many chunks as remain legible" was too permissive. It removed the earlier quality gate.

### vL3 Unicode Symbol Engine

Useful research branch:

- glyph as actual rendering material;
- pure symbolic performer surface;
- XY → sequencer / audiovisual change;
- WebGL proof.

But order was wrong:

- renderer architecture advanced before audio-only route passed;
- new engine complexity did not solve weak phrase material.

This is engineering-first drift repeating the midterm problem.

### vL4 Grid Stage Matrix

Current clearest contradiction.

It solved local feedback literally:

- "more effects" → 40 cells;
- "grid" → 10×4 matrix;
- "Nothing / stage light" → added as columns.

But it violated two existing canonical rules:

1. grid had already been rejected as final ontology;
2. Unicode branch explicitly said do not expand beyond 6–8 until vL3 gates pass.

Therefore vL4 is useful as a **material taxonomy / debugging sheet**, not as new performance ontology.

## Root cause of the loss of control

Not too many ideas.

Wrong layer response.

User says "more richness".

System should ask internally:

- more source material?
- more variation inside one behaviour?
- more routes?
- more simultaneous layers?
- more visible controls?

Instead, recent versions often answered all five with "more nodes".

That created repeated ontology inflation.

## Ponytail correction

Stop creating new control systems.

Reuse what already works:

```text
R1 shared runtime
+ authoritative transport
+ clip-first phrase material
+ Signal Guard
+ full-screen continuous control
+ topology
+ input-agnostic adapter
```

Do not add another engine unless a measured gate requires it.

### New layer separation

This is the minimum architecture that resolves the conflict:

```text
CONTROL ONTOLOGY
6–8 semantic verbs only

MATERIAL LIBRARY
32+ curated audiovisual phrase / effect variants

GLYPH LANGUAGE
symbols show state / score / direction

LIGHT RENDERER
full-screen global lighting behaviours

RUNTIME
transport / compatibility / history / safety
```

Crucial rule:

> 32 effects do not require 32 control nodes.

A performer may navigate 6–8 semantic regions while each region owns 4–8 curated material variants.

### Grid correction

Grid may survive only as one of these:

- low-resolution light matrix / raster;
- authoring / debugging view;
- sequencer visualization;
- stage-light pixel substrate.

Grid is **not** the performance ontology.

### Sequencer correction

One shared transport remains.

Local score is a visualisation / modulation of phrase behaviour, not a separate full editor for every material.

Performance control:

```text
X → phrase span / phase / variation
Y → density / instability / spectral lift
speed → subdivision / fill pressure
retrace → release / rewind
```

Detailed step editing returns to authoring mode only.

## Freeze / keep / remove

### KEEP

- authoritative transport;
- immediate ACK + quantized body;
- clip-first material;
- continuous ground;
- Signal Guard;
- topology;
- full-screen output;
- history / residue;
- Unicode branch as visual-language research;
- WebGL only where it materially improves full-screen rendering.

### FREEZE

- vL4 40-cell matrix as performance UI;
- new node-family creation;
- new sequencer features;
- WebXR expansion;
- new renderer abstractions.

### REMOVE FROM PERFORMANCE SURFACE

- per-node English / Chinese labels;
- per-node parameter panels;
- large visible matrix of effect buttons;
- arbitrary XY mappings;
- local-only effects.

## Next single gate

Build one short set using:

- 6 semantic regions;
- 32+ curated materials behind those regions;
- one shared light/glyph renderer;
- one 30–60 second route;
- one branch;
- one return path.

Pass conditions:

1. screen hidden → music still worth hearing;
2. sound muted → image reads as one system;
3. first-time user can infer build / peak / release direction;
4. repeated route recognisable but variable;
5. adding the 33rd material does not require adding a 7th control concept.

That is the current shortest path back to the mainline.