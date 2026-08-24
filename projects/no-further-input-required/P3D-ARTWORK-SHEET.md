# NFI-P3D-ARTWORK-180 — Artwork P3D Sheet

> **Project code:** `NFI-P3D-ARTWORK-180`  
> **Artwork:** 《无需进一步输入 / No Further Input Required》  
> **Role:** Exhibition artwork visual production study  
> **Engine target:** Processing + P3D  
> **Duration target:** 180 seconds / loop  
> **Reviewer:** Ewan + ChatGPT  
> **Executor:** local Codex  
> **Correction:** 2026-08-24 — the visual Golden Reference is the **2026-08-16 exhibition study set**, NOT the 2026-08-17 audiovisual-instrument branch.

---

# 0｜Critical correction / source hierarchy

The previous revision incorrectly treated the 2026-08-17 audiovisual-instrument branch as the artwork visual baseline. That is now superseded.

## Current source hierarchy

1. **2026-08-16 exhibition visual study images — GOLDEN VISUAL REFERENCE.**
2. GitHub Issue #56 — latest artwork decisions, especially the 2026-08-24 180-second exhibition lock.
3. `works/no-further-input-required.html` — current canonical exhibition runtime / behaviour reference.
4. `works/no-further-input-required-3min.html` — current 180-second web study / timing reference.
5. `projects/no-further-input-required-2026.md` — concept / version history.
6. Older browser and performance prototypes are secondary implementation references only.

The following are explicitly **NOT** visual Golden References for this artwork:

```text
agent/audiovisual-instrument-special-20260817
research/performance-control-model/experiments/nfi-p3d-harness/
public Interactive v0.7 QWERTY instrument UI
```

They belong to the performance / instrument research line.

---

# 1｜2026-08-16 Golden Reference inventory

The local source folder contains at least these seven reference images:

```text
00-六状态预览.jpg
01-高维投影.jpg
02-信号层.jpg
03-约束机构.jpg
04-索引场.jpg
05-量化记忆.jpg
06-递归装配.jpg
```

These exact files are the current visual evidence.

## Important retrieval rule

Before artistic P3D implementation, local Codex must locate the original 2026-08-16 images in the local project / asset folders using the exact filenames above.

If any of the six state images `01–06` cannot be found:

```text
STATUS = BLOCKED_REFERENCE_MISSING
REPORT missing filenames
STOP
```

Do not reconstruct missing states from their names.
Do not use AI-generated replacement imagery.
Do not substitute 8/17 screenshots.

The state names are identifiers, not permission for Executor interpretation.

---

# 2｜Frozen artwork decisions — 2026-08-24

These remain valid after the baseline correction:

```text
DURATION       180 seconds / loop
MODE           fully autonomous exhibition playback
INTERACTION    no ongoing audience interaction
VISIBLE UI     none
STRUCTURE      four continuous dramaturgical phases
PALETTE        preserve the 8/16 exhibition reference family
P3D ROLE       spatial extension of an existing language, not a redesign
```

Current dramaturgy:

```text
00:00–00:35  REGISTRATION / 发生
00:35–01:25  ABSORPTION / 沉积
01:25–02:15  RECALL / 回返
02:15–03:00  REMAINDER / 余项
```

These are temporal conditions, not four scene presets.

---

# 3｜What “extend the 8/16 version into P3D” means

The first rule is **visual continuity**.

P3D is allowed to add:

```text
Z depth
layer separation
occlusion
parallax
spatial persistence
history planes
controlled camera perspective
real spatial relationships between existing forms
```

P3D is NOT allowed to add a new aesthetic vocabulary just to prove that the engine is 3D.

Forbidden default additions:

```text
new particle systems
star fields
random cubes
large spheres
glowing sci-fi objects
constant camera orbit
volumetric spectacle
bloom used as finish
new typography / HUD
new colours not present in reference
```

Core test:

> When the P3D result is flattened back toward an orthographic front view, it must still read as a direct descendant of the 2026-08-16 reference image.

---

# 4｜The six states are visual source material, not six mandatory scenes

The current reference vocabulary is indexed as:

```text
01 HIGH-DIMENSION PROJECTION / 高维投影
02 SIGNAL LAYER / 信号层
03 CONSTRAINT MECHANISM / 约束机构
04 INDEX FIELD / 索引场
05 QUANTIZED MEMORY / 量化记忆
06 RECURSIVE ASSEMBLY / 递归装配
```

## Do not infer behaviour from names alone

Until the original JPG is inspected, Executor may only record objective visual facts:

```text
background
composition
number / type of visible primitives
line weight
filled vs outline forms
position / scale
symmetry / asymmetry
repetition
occlusion
apparent depth cues
motion implied by the still
visual density
negative space
```

The Reviewer decides the formal interpretation.

## Artwork use

The six references may later become:

- behaviours that coexist;
- source grammars that transition into one another;
- foreground / midground / background layers;
- historical states that return;
- structures that get spatially recombined.

They are **not automatically six chronological scenes**.

---

# 5｜Mandatory Reference Audit before coding artwork

Create:

```text
reports/A000-REFERENCE-AUDIT.md
```

For each image 01–06, report only objective facts in this template:

```text
REFERENCE ID
SOURCE FILE
PIXEL SIZE
BACKGROUND
PRIMARY FORM
SECONDARY FORM
COMPOSITION CENTER
NEGATIVE SPACE
LINE / SURFACE CHARACTER
REPETITION
APPARENT LAYERS
APPARENT DEPTH
DENSITY 0..1
MOTION IMPLIED BY STILL
UNRESOLVED / AMBIGUOUS FACTS
```

Also create a contact sheet or review board:

```text
captures/A000/reference-board.png
```

It must show all six state references at equal review scale, labels outside the artwork frame.

No artistic redesign is allowed before this audit exists.

---

# 6｜P3D translation protocol: 2D fidelity first, depth second

Each state must go through **two gates**.

## Gate A — FRONT FIDELITY

Build a P3D scene using a near-orthographic / front-facing camera.

The rendered front view should reproduce the important formal relationships of the 8/16 reference:

- composition;
- scale hierarchy;
- negative space;
- density;
- primitive family;
- line / surface balance.

Do not improve it yet.

Required capture pattern:

```text
captures/A001/01-front.png
captures/A001/02-front.png
...
captures/A001/06-front.png
```

## Gate B — DEPTH EXTENSION

Only after Reviewer approves the front reproduction of a state, add controlled P3D depth.

Allowed first depth operations:

```text
separate existing layers along Z
turn existing flat surfaces into shallow planes
preserve parent / child structures at different depth
route an existing line through depth
place earlier states behind current state as history
allow limited occlusion
use slight perspective / parallax to reveal relationships
```

Do not add new geometry families during this gate.

Required capture pattern per approved state:

```text
XX-front-p3d.png
XX-perspective-a.png
XX-side-debug.png
```

`side-debug` exists only to prove actual Z depth and is not an artwork frame.

---

# 7｜Processing OOP structure

Do not build six monolithic sketches.

Suggested minimum structure:

```text
NFI_Artwork_P3D/
├── NFI_Artwork_P3D.pde
├── AppConfig.pde
├── ArtworkClock.pde
├── Dramaturgy180.pde
├── ArtworkComposer.pde
├── ReferenceRegistry.pde
├── HistoryState.pde
├── ResidueStore.pde
├── CameraRig.pde
├── CaptureHarness.pde
├── VisualState.pde
├── State01HighDimProjection.pde
├── State02SignalLayer.pde
├── State03ConstraintMechanism.pde
├── State04IndexField.pde
├── State05QuantizedMemory.pde
├── State06RecursiveAssembly.pde
└── data/
    ├── reference-0816/
    ├── captures/
    └── presets/
```

## `VisualState`

Common interface only. Do not force all states to share the same visual algorithm.

Suggested contract:

```java
interface VisualState {
  void reset(long seed);
  void update(float dt, ArtworkContext ctx);
  void draw(PGraphics pg, ArtworkContext ctx);
  void setWeight(float w);
  String id();
}
```

## `ReferenceRegistry`

Stores:

```text
reference filename
reference dimensions
approved visual facts
approved front-view camera
approved P3D depth range
review status
```

It must not generate design.

## `ArtworkComposer`

Later combines approved states over the 180-second dramaturgy.
It cannot modify the internal visual language of a frozen state.

---

# 8｜Harness modes

Required:

## REFERENCE

Show one reference image and its P3D front reproduction side-by-side or sequentially for local review.

## FRONT

Near-flat approved camera, used for fidelity review.

## DEPTH_DEBUG

Side / oblique camera used only to prove Z structure.

## SNAPSHOT

Deterministic capture using fixed seed.

## FAST

For later 180-second composition:

```text
1× / 4× / 8× / 16×
```

No timeline integration before the visual baseline gate passes.

---

# 9｜New implementation order

The previous task order is superseded.

## A000 — REFERENCE RECOVERY + AUDIT

Status: **READY_FOR_EXECUTOR**

Tasks:

1. locate all six `01–06` JPGs locally;
2. copy/link them into a local-only reference path or repository-safe path if rights/size permit;
3. record exact source paths without exposing private absolute paths publicly if sensitive;
4. create `A000-REFERENCE-AUDIT.md`;
5. create `reference-board.png`;
6. do not write artwork rendering code beyond a minimal image review utility if useful;
7. STOP.

Reviewer output:

```text
REFERENCE_LOCKED
or
REFERENCE_INCOMPLETE
```

## A001 — FRONT REPRODUCTION

Locked until A000 review.

Implement the six 8/16 references in P3D **as visually flat compositions first**.

No 180-second timeline.
No audio.
No cross-state mixing.
No depth spectacle.

Reviewer judges each state independently:

```text
01 PASS / REVISE / REJECT
02 PASS / REVISE / REJECT
03 PASS / REVISE / REJECT
04 PASS / REVISE / REJECT
05 PASS / REVISE / REJECT
06 PASS / REVISE / REJECT
```

States are frozen individually when passed.

## A002 — CONTROLLED DEPTH EXTENSION

Only approved front states enter A002.

For each state:

```text
front reference
→ shallow P3D
→ oblique debug
→ Reviewer comparison
```

No new primitives unless Reviewer explicitly authorizes them.

## A003 — STATE RELATION STUDY

Only after enough states pass P3D fidelity.

Test a small number of relationships, e.g.:

```text
state A persists while state B enters
state A becomes historical depth
state B uses a boundary left by state A
state C recalls an older layer
```

The relationship must emerge from approved state vocabularies.

## A004 — 180 SECOND COMPOSITION

Only after A003 passes.

Map the approved visual systems into:

```text
REGISTRATION
ABSORPTION
RECALL
REMAINDER
```

without turning the work into a six-preset carousel.

---

# 10｜Acceptance criteria for the visual baseline

Reviewer — not Codex — answers:

1. Does the front P3D reproduction visibly belong to the 8/16 reference?
2. Did the implementation preserve the reference's negative space?
3. Did it preserve density and hierarchy rather than merely primitive types?
4. Is the result still visually controlled when all debug UI is hidden?
5. Does the P3D extension reveal a spatial relationship that the 2D reference plausibly contains?
6. If flattened, does it return to the reference family?
7. Did the implementation add any generic creative-coding decoration not justified by the reference?
8. Are differences intentional reviewer-approved extensions, or Agent improvisation?

Decision:

```text
PASS
REVISE_SAME_DESIGN
REVERT
REJECT
```

The Executor does not own these decisions.

---

# 11｜Absolute non-goals

```text
NO 8/17 audiovisual-instrument visual baseline
NO QWERTY performance logic
NO five-state instrument UI
NO scene buttons
NO cursor-driven composition
NO arbitrary particles
NO starfield
NO random geometry filler
NO large glowing sphere
NO automatic camera orbit
NO generic cyber HUD
NO visual redesign based only on Chinese state names
NO advancing when the 8/16 reference files are missing
```

---

# 12｜Local Codex handoff

Use exactly this instruction:

> Read `projects/no-further-input-required/P3D-ARTWORK-SHEET.md`. The 2026-08-16 exhibition JPG set is the Golden Visual Reference. Execute **A000 only**: locate the six reference JPGs by exact filename, build the reference audit and contact sheet, report factual findings, commit, and STOP. Do not implement new artwork visuals and do not infer a state's design from its name. Wait for Reviewer before A001.

---

# 13｜Reviewer ownership

Local Codex provides:

```text
files
code
build
screenshots
measurements
reports
```

Ewan + ChatGPT decide:

```text
what in the 8/16 image actually matters
what is accidental
what is retained
what gets depth
what must remain flat
which state is strong enough to continue
how states relate in the 180-second work
PASS / REVISE / REJECT
```

The goal is no longer “make NFI more 3D.”

The goal is:

> **take the already-existing 2026-08-16 exhibition visual language, preserve its formal identity, and determine precisely where real spatial depth makes that language stronger.**
