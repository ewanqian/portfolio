# NFI-P3D-ARTWORK-180 — Artwork P3D Sheet

> **Project code:** `NFI-P3D-ARTWORK-180`  
> **Artwork:** 《无需进一步输入 / No Further Input Required》  
> **Role:** Exhibition artwork visual production study  
> **Engine target:** Processing + P3D  
> **Duration target:** 180 seconds / loop  
> **Reviewer:** Ewan + ChatGPT  
> **Executor:** local Codex  
> **Important:** This document is **NOT** the Performance / QWERTY P3D Harness. Do not import its 36-key instrument assumptions into this artwork.

---

# 0｜Current source of truth

Before implementation, read in this order:

1. GitHub Issue #56 — latest artwork R&D and all 2026-08-24 comments.
2. `works/no-further-input-required.html` — current canonical exhibition runtime.
3. `works/no-further-input-required-3min.html` — independent 180-second study.
4. `projects/no-further-input-required-2026.md` — project history / concept.
5. 2026-08-17 visual reference branch:
   - branch: `agent/audiovisual-instrument-special-20260817`
   - visual reference: `works/audiovisual-instrument-special.html`
6. Only when needed for historical visual behaviours, inspect older NFI/browser prototypes.

Do **not** use `research/performance-control-model/experiments/nfi-p3d-harness/` as the artwork source of truth. That project belongs to the Performance / Personal A/V Instrument line.

---

# 1｜Frozen artwork decisions — 2026-08-24

These are not open to Executor redesign.

```text
DURATION       180 seconds / loop
MODE           fully autonomous exhibition playback
INTERACTION    no ongoing audience interaction
VISIBLE UI     none
STRUCTURE      four continuous dramaturgical phases
VISUAL MOTHER  downward triangle / recursive partition / decomposition
SECONDARY      route / sparse field / residue / incomplete structures
PALETTE        black / white / very low-color disturbance
```

Timeline:

```text
00:00–00:35  REGISTRATION / 发生
00:35–01:25  ABSORPTION / 沉积
01:25–02:15  RECALL / 回返
02:15–03:00  REMAINDER / 余项
```

No hard scene switching. These are temporal conditions, not four screens.

---

# 2｜What “extend from the 8/17 version” means

The 2026-08-17 branch is a **visual DNA reference**, not the final artwork architecture.

The reference is valuable because it has a restrained visual field:

- very dark background;
- off-white thin strokes;
- basic geometric primitives;
- large negative space;
- sparse events;
- clear figure / ground separation;
- line, frame, circle, radial and trace-like behaviours;
- low object count;
- limited palette;
- quiet, technical but not overloaded composition.

The artwork should preserve this restraint while removing its instrumental/demo character.

## KEEP from 8/17

```text
thin line discipline
black field
large negative space
clear geometric hierarchy
few simultaneous subjects
restrained motion
small registration-like events
simple forms that can accumulate meaning over time
```

## DO NOT inherit from 8/17

```text
state selector UI
BPM UI
pointer-driven visual position
five-mode switching
one-shot toy feedback
interaction-as-content
“each state is a different effect” logic
radial burst used only because a click occurred
```

The target is:

> **8/17 visual restraint + current 3-minute artwork dramaturgy + true spatial depth.**

---

# 3｜P3D principle: add depth, do not invent a new aesthetic

The P3D move is not permission to add generic 3D visuals.

Do not translate:

```text
2D minimal system
→ particles + spheres + camera orbit + glow
```

Translate instead:

```text
2D line / partition / route language
→ spatial hierarchy
→ historical layers
→ occlusion
→ depth relationships
→ residue occupying different Z planes
```

The strongest test is:

> If the scene is viewed nearly orthographically or flattened, it should still feel related to the 8/17 visual family and the current downward-partition language.

3D must add **history and spatial hierarchy**, not replace the language.

---

# 4｜2D → P3D translation table

## LINE

2D:

```text
thin line / short registration mark
```

P3D:

```text
polyline at controlled depth
line crossing several Z planes
partial contour of a transparent plane
```

Avoid glowing laser lines.

## RECT / FRAME

2D:

```text
rect / frame / cell
```

P3D:

```text
transparent plane outline
stacked frames with shallow Z offsets
open-sided spatial frame
```

Avoid default solid cubes.

## CIRCLE / PULSE

2D:

```text
circle / expanding pulse
```

P3D:

```text
very sparse planar ellipse / shell section
propagating contour through several depth planes
```

Use rarely. It is secondary language, not the hero system.

## PARTITION / DECOMPOSE

2D:

```text
downward triangle
recursive subdivision
whole → parts
```

P3D:

```text
stacked triangular / polygonal planes
recursive spatial subdivision
fragments offset in depth while preserving parent structure
partial extrusion only where it clarifies hierarchy
```

This is the **primary P3D benchmark**.

## ROUTE

2D:

```text
path / line / history route
```

P3D:

```text
polyline passing between historical planes
route with selected Z deviations
old route remains as faint spatial scaffold
```

Do not use chaotic splines.

## FIELD

2D:

```text
low-density point / line field
```

P3D:

```text
sparse XYZ points
low-amplitude depth displacement
selective neighbour connections
```

Field remains background / connective material. It must never become a starfield.

## RESIDUE

2D:

```text
old fragments / old path / incomplete structure remains
```

P3D:

```text
previous geometry persists on older depth planes
opacity decays but structure remains identifiable
old planes can be recalled and re-enter foreground
```

Residue is **not motion blur**.

---

# 5｜Spatial composition rules

## Camera

Default camera should be almost stable.

Allowed:

- slow breathing / dolly on long timescale;
- small perspective shift;
- rare controlled move during Recall;
- very subtle parallax.

Forbidden:

- continuous orbit camera;
- camera movement as default spectacle;
- fast handheld motion;
- random rotations;
- camera trying to compensate for weak geometry.

## Depth budget

Depth must be readable but restrained.

Initial recommendation:

```text
foreground     +250 to +600
primary plane   -80 to +180
history stack  -100 to -900
far residue    -900 to -1600
```

These are starting values, not artistic truth. Executor may tune only for legibility and must report changes.

## Simultaneous systems

At most three major behavioural families should be clearly active at once:

```text
PRIMARY STRUCTURE
SECONDARY ROUTE / FIELD
RESIDUE / HISTORY
```

Do not make every behaviour visible because it exists in code.

---

# 6｜180-second P3D dramaturgy

## 00:00–00:35 — REGISTRATION

Spatial condition:

- almost 2D;
- very shallow depth;
- few isolated structures;
- one plane / one route event can be clearly perceived;
- large negative space;
- decomposition starts slowly;
- residue begins but remains faint.

Goal:

> Establish that an event leaves a spatial consequence.

Do not “show 3D” aggressively here.

## 00:35–01:25 — ABSORPTION

Spatial condition:

- depth range gradually expands;
- partition planes begin to stack;
- routes pass between layers;
- field appears as connective tissue;
- older structure remains visible behind new structure;
- density rises while hierarchy stays readable.

Goal:

> New events no longer exist alone; they enter and alter an accumulating spatial system.

## 01:25–02:15 — RECALL

Spatial condition:

- old planes / routes return from historical depth;
- same geometry re-enters with altered scale / offset / subdivision;
- foreground and background exchange priority;
- old routes can cross or reframe current partition;
- maximum tension comes from **relationship between past and present**, not maximum object count.

Possible strongest gesture:

```text
current structure opens / separates
↓
older triangular parent structure becomes visible behind it
↓
route reconnects old and current fragments
↓
new partition occurs using historical boundaries
```

Do not use a generic explosion as climax.

## 02:15–03:00 — REMAINDER

Spatial condition:

- new geometry generation drops sharply;
- current foreground recedes;
- historical fragments remain at several depths;
- occasional route / boundary returns;
- field becomes sparse;
- space opens;
- the system continues without appearing idle.

Loop condition:

- do not clear all geometry at 180 s;
- keep a controlled history seed into next loop;
- opening of next cycle should be visually related to first opening but not identical.

Goal:

> No new input is required, yet the accumulated history continues to operate.

---

# 7｜Artwork OOP structure for Processing

Use small explicit classes. Do not build a generic creative-coding framework.

Suggested structure:

```text
NFI_Artwork_P3D/
├── NFI_Artwork_P3D.pde
├── AppConfig.pde
├── ArtworkClock.pde
├── ArtworkComposer.pde
├── Dramaturgy180.pde
├── HistoryState.pde
├── ResidueStore.pde
├── CameraRig.pde
├── CaptureHarness.pde
├── GeometryRecord.pde
├── PartitionSystem.pde
├── RouteSystem.pde
├── FieldSystem.pde
└── data/
    ├── fixtures/
    ├── captures/
    └── presets/
```

## `ArtworkClock`

- authoritative 180-second loop time;
- exposes normalized time `0..1` and phase time;
- supports LIVE and FAST modes;
- loop does not automatically clear HistoryState.

## `Dramaturgy180`

Outputs only phase envelopes / targets such as:

```text
registration
absorption
recall
remainder
newEventRate
historyVisibility
depthRange
partitionActivity
routeActivity
fieldActivity
```

No drawing.

## `HistoryState`

Tracks what has happened before:

```text
parent partitions
surviving fragments
routes
field anchors
age
recall count
loop age
```

History is a first-class artwork mechanism.

## `PartitionSystem`

Owns the downward / recursive decomposition visual mother.

## `RouteSystem`

Owns path/history connections.

## `FieldSystem`

Owns low-density connective spatial field only.

## `ResidueStore`

Controls long-lived visual remnants and recall eligibility.

## `CameraRig`

Camera only. It must not create dramaturgy.

## `ArtworkComposer`

Reads `Dramaturgy180 + HistoryState` and sets weights for the visual systems.

---

# 8｜Harness modes

The local Codex must be able to test quickly.

## LIVE

```text
180 seconds
1× time
final visual timing
```

## FAST

Required:

```text
4×
8×
16×
```

Audio may be disabled in FAST mode.

## SNAPSHOT

Must be able to jump deterministically to:

```text
T000  00:00
T020  00:20
T035  00:35
T060  01:00
T085  01:25
T105  01:45
T135  02:15
T155  02:35
T179  02:59
```

For each checkpoint produce screenshot evidence.

## REPLAY

Same:

```text
seed
initial history
composer config
```

must produce comparable results.

---

# 9｜Visual constraints / forbidden shortcuts

Absolute non-goals:

```text
NO particle explosion as default
NO random starfield
NO giant glowing sphere
NO bloom used to fake finish
NO hacker UI
NO dashboard
NO visible state names
NO BPM / NEXT / AUTO / HOLD UI
NO QWERTY / keyboard instrument logic
NO mouse-following centre
NO constant camera orbit
NO random 3D primitives for richness
NO colour palette expansion without reviewer request
NO six-state preset carousel
```

If the result becomes “more 3D but less like the artwork”, it fails.

---

# 10｜First implementation task — A000

```text
TASK ID        A000
NAME           8/17 Visual DNA → P3D Baseline
STATUS         READY_FOR_EXECUTOR
ARTWORK TIME   diagnostic study only
AUDIO          OFF
UI             debug HUD allowed in capture B only; artwork capture must be clean
```

## Goal

Produce a minimal P3D study proving that the 8/17 restrained line/geometry language and the current downward-partition mother can coexist in real depth **without becoming a generic 3D demo**.

## Build only four studies

### STUDY 01 — FLAT / SHALLOW BASELINE

- near-orthographic camera;
- black background;
- off-white thin lines;
- one downward triangular / recursive partition;
- depth less than 150 units;
- should look close to a strong 2D composition.

### STUDY 02 — PARTITION DEPTH

- same composition;
- recursive child planes receive controlled Z offsets;
- parent remains partially visible;
- maximum 4–6 meaningful depth levels;
- no extrusion spectacle.

### STUDY 03 — ROUTE THROUGH HISTORY

- add one route;
- route crosses 2–4 partition depth layers;
- old route remains as faint residue;
- no field yet.

### STUDY 04 — RESIDUE STACK

- create 3 historical generations of the same parent structure;
- each generation differs slightly in subdivision / scale / position;
- older generations sit deeper and fainter;
- current generation remains dominant;
- history must still be identifiable.

## Required evidence

```text
captures/A000/study-01-flat.png
captures/A000/study-02-partition-depth.png
captures/A000/study-03-route-history.png
captures/A000/study-04-residue-stack.png
captures/A000/study-04-side-debug.png   # debug camera proving real depth
reports/A000-report.md
```

## Required report facts

```text
Processing version
P3D renderer result
window size
average FPS
stroke strategy
camera settings
depth ranges
object / vertex count
random seed
files changed
known technical limitations
```

## Stop condition

After A000:

```text
STOP
WAIT FOR REVIEW
```

Do **not** proceed to 180-second choreography.

Reviewer decides whether the visual baseline is close enough to the 8/17 family.

---

# 11｜A000 reviewer acceptance

The Reviewer will judge only these questions:

1. If depth is mentally flattened, does this still belong to the 8/17 visual family?
2. Is the downward partition still the dominant visual language?
3. Does P3D add hierarchy / history rather than generic spectacle?
4. Are old structures spatially legible without clutter?
5. Is the image still sparse and controlled?
6. Does the route feel embedded in structure instead of drawn on top?
7. Is real Z depth visible in the side-debug capture?
8. Could this visual baseline plausibly support the current 180-second artwork without inventing a new ontology?

Decision values:

```text
PASS
REVISE
REJECT
```

Local Codex must not decide this gate.

---

# 12｜After A000 — locked future order

Only if A000 passes:

```text
A001  REGISTRATION 35s composition
A002  ABSORPTION + persistent history
A003  RECALL mechanism
A004  REMAINDER + non-reset loop
A005  full 180s silent visual pass
A006  visual rhythm / density polish
A007  sound integration
A008  180s raw screen + sound QA
A009  exhibition stability / output
```

No new visual behaviour family should be added between A000 and A005 unless Reviewer explicitly approves it.

---

# 13｜Local Codex handoff

Use this exact instruction:

> Read `projects/no-further-input-required/P3D-ARTWORK-SHEET.md`, Issue #56 and the 2026-08-17 visual reference it names. Execute **A000 only**. Do not redesign the artwork, do not import the QWERTY Performance Harness, and do not add new visual vocabularies. Produce the required captures and factual report, commit them, then stop for reviewer judgment.

---

# 14｜Current artistic test sentence

> **Do not make the work “more 3D.” Make the history inside the existing image occupy real space.**
