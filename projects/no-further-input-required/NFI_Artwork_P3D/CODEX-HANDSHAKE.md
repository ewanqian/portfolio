# CODEX HANDSHAKE — No Further Input Required / Frozen Exhibition Master

Date: 2026-08-25
Project: 《无需进一步输入 / No Further Input Required》
Repository: `ewanqian/portfolio`
Working directory: `projects/no-further-input-required/NFI_Artwork_P3D/`
Current master: **R4 FROZEN EXHIBITION MASTER**
Local Codex role: compile/run, runtime QA and narrow visual tuning only

## 0. First handshake

Do not redesign, migrate engine, add a visual family or refactor architecture when opening this directory.

Run this sequence first:

1. Pull latest `main`.
2. Read `CURRENT-EXHIBITION-BOARD.md`.
3. Read `FINAL-FREEZE-2026-08-25.md`.
4. Read `research/GLYPH-ASCII-NOTHING-RESEARCH.md` and `research/DESIGN-AESTHETIC-CROSS-REFERENCE.md`.
5. Inspect the active Processing files in the current board.
6. Compile and run **R4 unchanged once** before editing.
7. Reply with exactly:

```text
HANDSHAKE OK
Current master: R4 FROZEN
Runtime: WORKS / COMPILE ERROR / NOT TESTED
Resolution tested: ...
Observed FPS: ...
30s seam: PASS / FAIL / NOT TESTED
Distance-view hierarchy: PASS / FAIL / NOT TESTED
First proposed tuning: ...
Blockers: NONE / ...
```

Do not change code until R4 is visible locally or a specific compile/runtime blocker is isolated.

## 1. Source-of-truth precedence

```text
1. CURRENT-EXHIBITION-BOARD.md
2. FINAL-FREEZE-2026-08-25.md
3. CODEX-HANDSHAKE.md
4. current active .pde code
5. EXHIBITION-30S-R3-BRIEF.md as baseline history
6. research/ current documents
7. archive/ historical material only
```

## 2. Frozen artwork lock

```text
Processing 4 / Java / P3D OpenGL
3840 × 2160 target
60 fps target
30-second deterministic seamless loop
1800 frames per loop
~3-minute delivery capture = six loops
fully autonomous visual runtime
no audience input
no visible UI
```

Foreground system:

```text
CONSTRAINT MECHANISM
+
INDEX FIELD
+
QUANTIZED MEMORY
+
SPARSE HISTORICAL TOPOLOGY
+
DETERMINISTIC OUTLINE GLYPH LANGUAGE
```

Shared hierarchy:

```text
12 × 7 major grid
→ 24 × 14 index grid
→ 72 × 42 memory micro-grid
```

## 3. Meaning translated into engineering constraints

The viewer should feel:

```text
something happened
→ it left a structural consequence
→ the consequence accumulated
→ old structure returned in altered form
→ relation became briefly visible
→ new activity diminished
→ the system continued using what remained
```

Strongest acceptance question:

> “刚刚发生过的东西，怎么还在这里？”

Any proposed change must strengthen at least one of:

```text
order
history
recurrence
topology
subtraction
negative space
hierarchy
```

If it only makes the image more complex, reject it.

## 4. Frozen glyph rule

The runtime no longer relies on displayed Unicode characters. Unicode/ASCII research is semantic ancestry only.

Current geometric vocabulary:

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

Do not add another glyph family before final delivery.

Nothing Glyph is behavioural reference only:

```text
finite addressable zones
+ timed illumination
+ segmented progress
+ persistence
+ recall
```

Do not copy Nothing geometry, icons, branding or notification semantics.

## 5. Frozen topology rule

`drawHistoricalTopology()` is the only graph layer.

It uses:

```text
6 fixed historical anchors
7 fixed relations
recall/history envelope
```

It must remain sparse and subordinate to the grid/memory surface.

Reject any change that makes it look like:

```text
network visualisation
node editor
HUD
interactive graph
```

## 6. Taste constraints

Prioritise:

- black as primary material;
- grayscale line hierarchy;
- exact alignment;
- negative space;
- sparse/dense contrast;
- directional structure;
- repetition with controlled difference;
- long enough holds to perceive order;
- subtraction as event;
- history becoming visible structure.

Reject by default:

- random glitch;
- particle filler;
- decorative data visualisation;
- full-screen grain;
- bloom as fake richness;
- constant motion everywhere;
- hard scene cuts;
- generic camera orbit;
- literal audio amplitude mapping;
- readable explanatory text;
- performance-controller UI;
- sequencer/tree HUD from the research branch.

## 7. Ponytail final-delivery ladder

Before writing code, stop at the first rung that works:

```text
1. Does this need changing at all?
2. Can an existing parameter solve it?
3. Can an existing method solve it?
4. Can something be deleted instead?
5. Only then write the minimum correct code.
```

Bug/runtime fix = fix the shared cause once. Do not patch symptoms across multiple call sites.

## 8. Allowed final tuning

Only these families are open without reopening the artistic freeze:

```text
line weight
alpha / brightness
rare-event timing
memory density
topology visibility
glyph scale / density
smooth(4) → smooth(2) if measured 4K cost requires it
```

Each change should affect one coherent variable family only and be followed by a complete 30-second loop.

## 9. Required runtime evidence

Do not claim passed until physically measured:

```text
compile/run
3840 × 2160 FPS
29.5s → 0s seam
10-minute stability
3-minute six-loop recording
distance-view hierarchy
recording compression
```

If 4K misses target, first test `smooth(2)`. Do not simplify composition before measuring that change.

## 10. Stop conditions

Stop and request a taste decision if the next change would:

- add a primitive family;
- add a scene;
- add a library/renderer;
- add interaction/UI;
- materially change topology;
- make marks read as language/interface;
- make historical R4 comparison difficult.

The executor’s job after this freeze is evidence and tuning, not invention.
