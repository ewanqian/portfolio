# FINAL FREEZE — No Further Input Required

Date: 2026-08-25
Status: **R4 FROZEN EXHIBITION MASTER / RUNTIME QA PENDING**
Engine: Processing 4 / Java / P3D
Issue: #56

This is the artistic freeze for the current exhibition delivery. From this point, changes are limited to runtime fixes and measured taste tuning. Do not add another visual family, interaction model, UI layer or scene system.

## 1. Frozen composition

```text
near-black field
+
12 × 7 major grid
→ 24 × 14 address/index grid
→ 72 × 42 memory micro-grid
+
Constraint Mechanism
+
Index Field
+
Quantized Memory
+
Sparse Historical Topology
+
Deterministic Outline Glyph Language
```

The work remains one continuous 30-second deterministic loop with overlapping registration, absorption, recall and autonomy. There are no visible scenes.

## 2. The strongest visual decisions retained

### A. One measured world

Every element inherits the same grid. No floating widgets, no independent effect panels, no decorative particles.

### B. History becomes structure

Memory is not a trail effect. Earlier addresses can return before the present reaches them; during recall, a small fixed set of historical anchors may reveal their topology for a limited duration.

The graph is therefore:

```text
history becoming legible relation
```

not:

```text
network visualisation / HUD
```

### C. Glyphs become geometry

The frozen machine vocabulary no longer relies on OS-rendered Unicode glyphs. Unicode/ASCII research remains the semantic ancestry, but the artwork renders deterministic geometric outlines directly:

```text
point
line
square
triangle
diamond
cross
ring
return arc
```

This removes font-style drift and makes the glyph system belong to the same line language as the grid.

### D. Sparse / dense is compositional

Black remains the dominant material. Empty space is active. Density is allowed to peak only when the hierarchy remains legible from several metres away.

### E. Recurrence, not replay

A returned structure should be recognisable but changed by the history envelope. Repetition must read as recurrence rather than a scene restart.

## 3. Explicitly rejected material

Do not reintroduce:

- interactive Playground / WebXR controls;
- performance sequencer UI;
- top rhythm-tree HUD;
- 24/32/40 visible Chunk taxonomies;
- Nothing phone geometry;
- terminal text / readable labels;
- random glyph rain;
- generic sci-fi interface framing;
- particle filler;
- constant glitch / grain;
- bloom as richness;
- automatic camera orbit;
- hard scene cuts;
- literal audio-reactive behaviour.

The performance-control research contributed topology, recurrence, subtraction, density budgeting and glyph/form thinking. Its controller UI is not part of this exhibition artwork.

## 4. Active code decisions frozen today

### `MechanicalGlyphLanguage.pde`

- platform-font dependency removed from visual output;
- addressable-zone timing retained;
- progress/persistence retained;
- glyphs rendered as deterministic geometric primitives;
- vocabulary restricted to eight outline behaviours.

### `Exhibition30Composer.pde`

- existing R3 composition retained;
- one restrained `drawHistoricalTopology()` layer added during recall;
- topology uses six fixed historical anchors and seven fixed relations;
- no new scene/state system introduced.

## 5. Remaining work is QA, not redesign

Required local evidence:

```text
COMPILE / RUN
30-second seam
3840 × 2160 measured FPS
10-minute stability
3-minute six-loop capture
distance-view hierarchy
screen-record compression
```

Permitted final tuning:

```text
line weight
alpha
rare-event timing
memory density
topology visibility
glyph scale / density
anti-aliasing cost
```

Not permitted without reopening the artistic freeze:

```text
new primitive family
new scene
new renderer/library
new interaction
new UI
new visual ontology
```

## 6. Final acceptance

The freeze passes artistically only if the viewer can feel all of the following without explanatory text:

1. the image is measured and ordered before it becomes dense;
2. earlier decisions remain materially present;
3. historical relation becomes visible without looking like a diagram;
4. glyphs feel like machine material rather than typography;
5. subtraction and black carry as much weight as accumulation;
6. the 30-second boundary feels like continuation;
7. the densest frame remains composed rather than merely busy;
8. at distance, major structure remains readable before micro-detail.

## 7. Ponytail freeze rule

Before any further change, ask in order:

```text
Does the current code already express the requested idea?
Can one existing parameter solve it?
Can one existing method solve it?
Can something be deleted instead?
```

Only after those fail may code be added.

The current freeze intentionally prefers one coherent visual machine over a larger vocabulary.
