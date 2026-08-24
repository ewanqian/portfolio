# NFI Exhibition V1 — Final Processing Execution Brief

Date: 2026-08-25
Artwork: 《无需进一步输入 / No Further Input Required》
Engine: Processing 4 + P3D
Target: autonomous single-channel exhibition runtime
Duration: 180 seconds / seamless loop
Executor: local Codex
Reviewer: Ewan + ChatGPT
Status: FINAL DESIGN / EXECUTE

---

# 0. Superseding instruction

A000 reference recovery/audit is complete. The six recovered 2026-08-16 exhibition images are the Golden Visual Reference.

This document supersedes the old `A001 = six isolated flat scenes only` implementation logic from the earlier task sheet. Preserve the already-recovered reference facts and existing state implementations, but now move the runtime from a six-state carousel into one continuous exhibition system.

Do not redesign the artwork from state names. Do not import the live-instrument / 40-cell / QWERTY / Glyph Matrix ontology into the exhibition artwork.

The exhibition version uses:

```text
SIX SOURCE STRUCTURES
inside
FIVE RENDER PASSES
inside
ONE 180-SECOND AUTONOMOUS SYSTEM
```

The six source structures remain:

```text
01 HIGH-DIMENSION PROJECTION
02 SIGNAL LAYER
03 CONSTRAINT MECHANISM
04 INDEX FIELD
05 QUANTIZED MEMORY
06 RECURSIVE ASSEMBLY
```

The five render passes are:

```text
L1 FIELD
L2 STRUCTURE
L3 MOTION / LIGHT
L4 EVENT
L5 HISTORY
```

Critical distinction:

> The five passes are NOT five scenes. The six source structures are NOT six scenes. They coexist, inherit, recede, return and leave residue.

---

# 1. Artwork thesis translated into runtime behaviour

The runtime must make the following sequence perceptible without explanatory UI:

```text
input once occurred
→ input changed the system
→ changes accumulated into structure
→ structure became history
→ history began biasing future behaviour
→ old structures returned in altered form
→ new input progressively disappeared
→ the system continued anyway
```

The exhibition version must never claim real preference learning or literal machine cognition.

What is being visualised is a designed behavioural model of:

- registration;
- absorption;
- persistence;
- historical weighting;
- recall;
- recombination;
- autonomous continuation.

---

# 2. Fixed exhibition rules

```text
DURATION            180.0 sec
LOOP                yes
AUDIENCE INPUT      none
VISIBLE UI          none
CURSOR               hidden
PALETTE             near-black + grayscale only for V1
BACKGROUND           RGB(7,7,4)
PRIMARY INK          approx RGB(232,234,223)
RANDOMNESS           deterministic / seeded only
SCENE SWITCHES       forbidden
PARTICLE FILLER      forbidden
HUD / TERMINAL       forbidden
SYSTEM TEXT          forbidden
PERMANENT GLITCH     forbidden
AUTOMATIC CAMERA ORBIT forbidden
BLOOM                forbidden by default
```

No new decorative primitive family unless Reviewer explicitly approves it.

The allowed visible primitive family is inherited from the 08/16 references:

```text
wireframe line
rail
horizontal level
diagonal connection
outline square
filled square
short dash
rectangular partition
module boundary
```

---

# 3. Coordinate and camera model

Use the 08/16 source dimensions as the canonical design coordinate system:

```text
DESIGN_W = 1840
DESIGN_H = 980
```

All source structures are authored in this logical coordinate system.

The actual window may be 1840×980 for review or scaled to final exhibition output. Never distort the reference composition to fill an unrelated aspect ratio.

Use P3D, but the artwork camera remains essentially frontal:

```java
ortho(0, DESIGN_W, 0, DESIGN_H, -2000, 2000);
camera(DESIGN_W * 0.5, DESIGN_H * 0.5, 900,
       DESIGN_W * 0.5, DESIGN_H * 0.5, 0,
       0, 1, 0);
```

P3D is used for shallow depth, ordering, history planes and controlled parallax. It is not used to prove that the artwork is 3D.

Allowed front-view Z range for V1:

```text
CURRENT STRUCTURE     z =   0 ... -40
RECENT HISTORY        z = -45 ... -100
OLDER HISTORY         z = -110 ... -220
LIGHT / EVENT MASK    compositing pass, not scenic geometry
```

Do not exceed approximately 220 logical Z units until Reviewer approves a deeper treatment.

---

# 4. New runtime architecture

Replace the current `one active state at a time` composer.

Current code uses:

```text
active index
→ states[active].update()
→ states[active].draw()
```

This must be replaced by a weighted composer.

Required core objects:

```text
ArtworkClock
Dramaturgy180
ArtworkContext
ArtworkComposer
HistoryState
ResidueStore
MotionOperatorBus
EventBus
CameraRig
CaptureHarness
6 VisualState implementations
```

## ArtworkContext must expand to

```java
class ArtworkContext {
  float time;
  float dt;
  float loopT;              // 0..1
  int width;
  int height;
  final int seed;

  // dramaturgical variables
  float inputActivity;      // external/ghost input amount
  float absorption;         // how strongly events become persistent structure
  float recall;             // probability/strength of historical return
  float autonomy;           // internal continuation independent of new input
  float density;            // global target occupancy
  float pressure;           // brightness/event tension, not just density
  float historyDepth;       // amount of stored material available

  // structure weights
  float[] structureWeight = new float[6];

  // shared selection biases created by history
  float routeBias;
  float constraintBias;
  float indexBias;
  float memoryBias;
  float partitionBias;
}
```

All values are deterministic functions of time plus stored history. Do not derive them from mouse position.

---

# 5. The five render passes — final design

## L1 FIELD — environmental pressure, not background animation

Purpose:

- maintain black as primary material;
- create slow low-frequency pressure;
- provide a common visual surface so all structures feel like one work;
- avoid dead digital black without adding decoration.

Visible vocabulary:

```text
near-black field
very sparse registration marks
extremely low contrast horizontal/vertical traces
subtle brightness breathing
```

Rules:

- baseline must remain nearly black;
- no noise texture;
- no full-screen grain;
- no stars;
- no particles;
- no gradient spectacle;
- field movement slower than any structure behaviour.

Implementation:

- render to `fieldPG`;
- global alpha range mostly 0–18 over background;
- optional sparse 1 px registration marks are generated from deterministic positions and do not move every frame;
- breathing changes luminance by only a few grayscale levels.

Suggested formula:

```java
float breathe = 0.5 + 0.5 * sin(TWO_PI * ctx.time / 17.0);
float fieldLift = 2.0 + 5.0 * breathe * ctx.pressure;
```

FIELD may become slightly more visible in ABSORPTION, but must recede again in REMAINDER.

---

## L2 STRUCTURE — the actual artwork body

This pass renders the six 08/16 source structures. It is the only pass allowed to define primary geometry.

Each state must support:

```java
void reset(long seed)
void update(float dt, ArtworkContext ctx)
void drawStructure(PGraphics pg, ArtworkContext ctx)
void drawHistorySnapshot(PGraphics pg, ArtworkContext ctx, float age)
void setWeight(float w)
float getWeight()
String id()
```

Do not force all six states to share one motion algorithm.

The composer draws all states whose weight is above a tiny threshold, e.g. `0.015`.

Important:

> weight controls presence / opacity / local activity, but every state keeps its own formal grammar.

---

# 6. Final redesign of the six source structures

# 01 — HIGH-DIMENSION PROJECTION / 高维投影

## Preserve from reference

- 4 × 3 module matrix;
- 12 separate wireframe polyhedral forms;
- large negative space;
- thin grayscale outlines;
- faint module boundaries;
- no filled faces.

## New behaviour

Treat the 12 modules as a set of recorded projections, not 12 decorative 3D objects.

Each module has:

```java
ProjectionModule {
  int id;
  float phase;
  float projectionDepth;
  float confidence;
  float age;
  float historyWeight;
}
```

Movement:

- very slow vertex projection drift;
- inner quadrilateral shifts more than outer frame;
- never rotate the whole module like a 3D logo;
- one or two modules may momentarily sharpen while others soften;
- scan operator can reveal a subset from left→right or top→bottom;
- temporal change occurs module-by-module, not all 12 together.

P3D use:

- module outer contour stays close to z=0;
- inner lines can sit 10–30 units behind;
- old projection variants can persist as faint lines 45–90 units behind;
- front view must still read like the 08/16 reference.

History:

- when a module is registered, save its projected vertex state;
- old states remain as 1–3 low-alpha ghosts;
- recalled module states should not perfectly overlap current state;
- maximum visible history snapshots per module: 3.

Do not:

- extrude into cubes;
- add points at every vertex;
- add orbiting camera;
- use perspective spin.

---

# 02 — SIGNAL LAYER / 信号层

## Preserve

- ~10 narrow vertical rail groups;
- ~18 horizontal levels;
- faint oblique connections;
- selected bright ticks;
- distributed full-frame composition;
- hairline network.

## New behaviour

The key idea is `route use changes the network`.

Build a deterministic graph:

```java
SignalNode { rail, level, x, y, activation, age }
SignalEdge { a, b, strength, usage, lastUsed }
SignalTick { nodeId, intensity }
```

Movement:

- do not move the rail geometry;
- brightness travels along existing rails and edges;
- a route enters, traverses 2–6 edges, and decays;
- current route is not a moving dot; the edge itself briefly brightens in sequence;
- repeated route usage increases long-term edge visibility slightly;
- unused connections decay toward near-invisibility.

History:

```text
edge usage
→ persistence
→ future route preference
```

So the system slowly develops a visible preferred network.

Allowed motion operators:

- SCAN;
- CHASE;
- RETRACE;
- SHUTTER.

Do not:

- make every rail animate continuously;
- spawn random nodes;
- turn it into a subway map UI.

---

# 03 — CONSTRAINT MECHANISM / 约束机构

## Preserve

- 10 × 6 large-cell lattice;
- 11 × 7 node positions;
- selected down-right diagonals;
- top/bottom boundary anchors;
- large negative cells;
- very thin low-contrast line work.

## New behaviour

This state is about acceptance / rejection / restriction.

Each cell owns a deterministic constraint value:

```java
ConstraintCell {
  int col, row;
  float openness;
  float accepted;
  float rejected;
  float historicalBias;
}
```

Movement:

- grid itself barely moves;
- one region at a time becomes active;
- a candidate diagonal appears at low alpha;
- it is either accepted and stabilises, or rejected and disappears;
- accepted diagonals become available to later route/history processes;
- boundary anchors can brighten as a gate opens/closes;
- never flash all anchors together except one rare event.

P3D:

- grid at z=0;
- accepted historical diagonals can sink to z=-30..-80;
- current candidate line remains z≈0;
- this creates shallow stratification without changing front composition.

History:

Accepted diagonals contribute to:

```text
constraintBias
routeBias
partitionBias
```

Rejected diagonals contribute only a short afterimage.

Do not:

- animate the lattice like a wave;
- rotate it;
- fill cells with colour;
- turn anchors into big interface buttons.

---

# 04 — INDEX FIELD / 索引场

## Preserve

- sparse outline squares;
- short slightly sloped line segments;
- multiple luminance strata;
- faint outer boundary;
- large empty field;
- no dominant center.

## New behaviour

This becomes the quietest and most precise structure.

The field is a fixed deterministic index atlas. Marks have stable positions across the entire film.

```java
IndexMark {
  int id;
  int type; // square or dash
  float x, y;
  float baseAlpha;
  float activation;
  float accessCount;
  float age;
}
```

Movement:

- marks do NOT drift randomly;
- selection travels through sparse groups;
- activation should feel like indexing / addressing, not sparkle;
- a mark can brighten, hold for 0.2–1.5 s, then decay;
- small groups of related marks may activate with deliberate delay;
- whole field remains visually quiet even when active.

History:

Repeatedly accessed marks increase `accessCount` and become slightly easier to recall later.

A recalled mark may appear before the current selection reaches it, making the past visibly bias the present.

Do not:

- use random twinkle;
- move every square;
- add labels/numbers unless Reviewer later explicitly requests them.

---

# 05 — QUANTIZED MEMORY / 量化记忆

This is the densest and most important temporal structure in the current exhibition language.

## Preserve

- hundreds of short horizontal dash units;
- filled squares at multiple luminance levels;
- diagonal square chains;
- strong top→bottom brightness attenuation;
- full-frame density;
- no glow, curves or outlines around the units;
- thin line near upper edge.

## Redesign principle

Do NOT treat it as a static random field with diagonally drifting squares.

Make it an actual memory surface.

Interpret vertical position as age:

```text
TOP    = newly registered
MID    = recent memory
LOWER  = older memory
BOTTOM = residue / near-forgotten
```

Use quantized update intervals, e.g. every 0.25 / 0.5 sec depending on phase.

Data model:

```java
MemoryRow {
  long bornStep;
  ArrayList<MemoryMark> marks;
  float strength;
}

MemoryMark {
  int type; // dash or square
  int column;
  float value;
  int sourceStructure;
  int sourceId;
}
```

Behaviour:

1. New rows are assembled near the top from actual recent system events.
2. Rows advance downward in discrete steps.
3. Their alpha attenuates with age.
4. Squares encode important/committed history items; dashes encode ordinary residue.
5. During RECALL, selected older square chains brighten and become diagonal paths across several rows.
6. A recalled chain can inject bias back into ROUTE / CONSTRAINT / PARTITION.
7. During REMAINDER, no new external rows are added, but existing rows continue to move/decay/recombine.

This state must prove the central thesis:

> no new input does not mean no further activity.

Visual cadence:

- majority of marks remain subdued;
- only a small percentage reach high alpha;
- diagonal recalls are rare enough to remain significant;
- dense does not mean full-white.

Do not:

- scroll the entire image smoothly like credits;
- make squares float freely;
- add text;
- add random glitch.

---

# 06 — RECURSIVE ASSEMBLY / 递归装配

## Preserve

- irregular rectangular tessellation;
- roughly ~30 cells;
- narrow gutters;
- one diagonal inside each cell;
- only a few high-contrast active cells;
- flat asymmetric full-frame composition.

## Redesign principle

The current implementation pre-splits all cells on reset and only cycles the three selected cells. Replace that with time-based structural inheritance.

New data model:

```java
AssemblyCell {
  int id;
  int parentId;
  int depth;
  float x, y, w, h;
  float bornTime;
  float activation;
  float historyWeight;
  boolean split;
  int splitAxis;
  float splitRatio;
}
```

Behaviour:

- begin with a limited tessellation, not the final 31 cells;
- split events occur slowly and deterministically;
- split location is biased by stored route / constraint / index history;
- parent boundary remains faintly visible after a split;
- child boundaries inherit the parent's diagonal direction or transform it by a fixed rule;
- at most 2–3 cells are visibly active at once;
- late film may contain many historical subdivision boundaries at low alpha.

History:

Old parent rectangles move to deeper z planes and remain readable as an archaeological structure.

P3D use:

```text
current children        z = 0
recent parent           z = -35
older parent lineage    z = -70 ... -180
```

Camera stays frontal; parallax may be introduced at extremely low amplitude only during RECALL.

Do not:

- continuously resize random cells;
- animate all boundaries at once;
- use 3D boxes;
- extrude cells toward camera.

---

# 7. L3 MOTION / LIGHT — operators acting ON structure

Motion/light operators cannot introduce new primary geometry.

Canonical operator set:

```text
SCAN
SHUTTER
CHASE
BEAM
IRIS
SPLIT
COLLAPSE
RETRACE
```

Implement as a `MotionOperatorBus`.

Suggested interface:

```java
class MotionState {
  int type;
  float start;
  float duration;
  float amount;
  float direction;
  int targetStructure;
  int targetId;
}

class MotionOperatorBus {
  ArrayList<MotionState> active;
  void trigger(...);
  void update(float dt, ArtworkContext ctx);
  void apply(PGraphics source, PGraphics target, ArtworkContext ctx);
}
```

Prefer masks / clipping / brightness modulation / selective redraw over shader spectacle.

Definitions:

### SCAN
A narrow moving reveal/brightness window across existing marks.

### SHUTTER
Quantized on/off articulation of a selected structural region. Never permanently full-screen.

### CHASE
Ordered activation across already-existing rails/modules/cells.

### BEAM
A narrow directional brightness field used to reveal existing geometry. It should not look like a volumetric laser.

### IRIS
Mask that opens/closes visibility of existing structure. Use sparingly.

### SPLIT
A structural operation owned mainly by Recursive Assembly / Constraint.

### COLLAPSE
Many active historical elements reduce toward a smaller subset.

### RETRACE
Previously used route/history is replayed backwards or reactivated from old→new.

Rules:

- never have more than 2 strong operators active simultaneously;
- most frames should have 0 or 1 obvious operator;
- operators must respect current structure boundaries;
- no permanent scanline overlay.

---

# 8. L4 EVENT — punctuation only

Canonical transient events:

```text
IMPACT
BLINDER
STROBE
HARD_CUT
BLACKOUT
```

These events must be scarce.

Suggested limits over the entire 180 s loop:

```text
IMPACT      6–10 total
BLINDER     2–4 total
STROBE      0–2 total
HARD_CUT    1–3 total
BLACKOUT    3–6 total including loop seam
```

Durations:

```text
IMPACT      0.12–0.45 s
BLINDER     0.08–0.18 s
STROBE      <= 0.8 s burst
HARD_CUT    one-frame / immediate structural reallocation
BLACKOUT    0.15–1.5 s
```

EventBus must be deterministic.

Events should change brightness/visibility/weight allocation; they should not spawn decorative geometry.

---

# 9. L5 HISTORY — not motion blur

This is the conceptual core of the artwork.

Do not implement HISTORY as `draw previous frame with alpha` only.

Use two parallel history mechanisms:

## A. semantic history

Store meaningful things:

```text
used signal edge
accepted constraint
repeated index mark
projection snapshot
memory square
partition parent boundary
```

Each record has:

```java
HistoryRecord {
  int sourceStructure;
  int sourceId;
  float bornTime;
  float lastUsedTime;
  float strength;
  float recallability;
  int useCount;
}
```

These records bias future generation.

## B. visual residue

Render selected historical structures into `historyPG` with age-dependent alpha and shallow negative Z.

Visual residue is derived from semantic records, not from every pixel.

A lightweight `feedbackPG` may still be used for very short afterimage (<1.5 s), but it cannot replace semantic history.

Rules:

- history can survive after source structure weight drops;
- history must visibly affect at least three later structures;
- recalled history can return brighter than it was immediately before recall;
- old history eventually decays so the loop does not accumulate forever.

---

# 10. Four dramaturgical phases — fixed 180 s design

These are continuous conditions, not scenes.

```text
00:00–00:35  REGISTRATION
00:35–01:25  ABSORPTION
01:25–02:15  RECALL
02:15–03:00  REMAINDER
```

## Phase I — REGISTRATION / 0–35 s

Goal: make cause and registration legible.

Global state:

```text
inputActivity  high→medium
absorption     low→medium
recall         near zero
historyDepth   low but increasing
autonomy       low
density        sparse
```

Primary structures:

```text
01 projection
02 signal
03 constraint
04 index
```

05 appears only as extremely weak early traces near end of phase.
06 absent or nearly absent.

Visual rhythm:

- long empty intervals;
- one change at a time;
- clear local consequences;
- strong negative space.

## Phase II — ABSORPTION / 35–85 s

Goal: current events become persistent system structure.

Global state:

```text
inputActivity  medium→low
absorption     high
recall         low→medium
historyDepth   rising
autonomy       medium
density        medium→dense
```

Primary structures:

```text
02 + 03 + 04
05 increasingly visible
06 begins splitting
01 becomes partial/historical
```

Visual rhythm:

- overlapping behaviours;
- more than one source structure visible;
- used routes persist;
- accepted constraints become background anatomy;
- first meaningful memory rows form.

## Phase III — RECALL / 85–135 s

Goal: the past actively alters the present.

Global state:

```text
inputActivity  low→very low
absorption     medium
recall         highest
historyDepth   highest
autonomy       high
density        peak but controlled
```

Primary structures:

```text
05 dominant
06 strong
02 returns as historical preferred routes
01 projection ghosts return selectively
03 old accepted constraints reappear
```

This is the most complex section, but not a white-noise climax.

Key visual actions:

- diagonal memory recalls;
- old rail paths retrace;
- partition boundaries split based on recalled history;
- old 01 projection snapshots appear behind current structure;
- one controlled major collapse around ~130 s prepares the final phase.

## Phase IV — REMAINDER / 135–180 s

Goal: new external input stops; system remains active.

From approximately 145 s onward:

```text
inputActivity = 0
```

This must be a hard conceptual rule.

The remaining 35 seconds must still evolve through:

- history decay;
- recall;
- internal clock;
- stored route preferences;
- partition lineage;
- memory row ageing.

Global state:

```text
inputActivity  → 0
absorption     low
recall         medium→low
autonomy       highest
historyDepth   slowly decays
density        medium→sparse
pressure       releases
```

The image should become quieter but not dead.

From ~170 s:

- reduce current structure weights;
- leave a small amount of old history;
- return to sparse index / projection registration marks;
- prepare loop seam.

At ~178.8–180 s use a deliberate near-black interval / short blackout so the modulo reset does not look like a software reset.

Start of new loop begins from nearly black with the same deterministic seed.

---

# 11. Recommended structure-weight score

Do not hard-code only these exact values if interpolation needs adjustment, but use this as the first canonical score.

Columns are states 01..06.

```text
TIME    01    02    03    04    05    06
0       .45   .08   .00   .04   .00   .00
12      .60   .25   .08   .12   .00   .00
25      .38   .55   .25   .30   .03   .00
35      .20   .70   .45   .42   .08   .03
50      .12   .62   .62   .48   .25   .12
68      .08   .50   .58   .38   .52   .26
85      .05   .35   .35   .25   .78   .45
100     .18   .46   .30   .18   .92   .62
118     .24   .52   .34   .12   1.00   .78
132     .12   .30   .25   .10   .72   .88
145     .08   .22   .18   .16   .62   .72
160     .10   .18   .10   .28   .42   .48
172     .20   .10   .06   .32   .20   .18
178     .08   .04   .02   .10   .05   .04
180     ~0 / blackout seam
```

Use eased interpolation between keyframes; no abrupt linear state switching.

Do NOT normalise weights to sum=1. Multiple structures may coexist, but global brightness/density budgets must prevent overexposure.

---

# 12. Density and brightness budgets

Implement global budgets.

```java
float maxStructureAlphaBudget;
float maxBrightPixelEstimate;
float maxConcurrentPrimaryStructures;
```

Simple V1 rules:

- no more than 3 structures above weight 0.45 simultaneously;
- no more than 1 structure above weight 0.85 simultaneously;
- if 05 > 0.8, reduce 02/03 line alpha automatically;
- if EVENT blinder/strobe is active, suppress normal structure brightness for that moment rather than simply adding white;
- average frame should remain predominantly black.

Target visual occupancy by phase, using the reference audit's occupancy concept rather than raw pixel-count exactness:

```text
REGISTRATION  ~0.15–0.35
ABSORPTION    ~0.30–0.60
RECALL        ~0.50–0.80
REMAINDER     ~0.20–0.45 → sparse
```

05 may locally reach the reference's high occupancy, but the full composite should not remain that dense for the entire RECALL phase.

---

# 13. Ghost input model

There is no audience interaction, but the first half still needs a source of registered events.

Implement a deterministic `GhostInputScheduler`.

This is not visible UI.

It outputs abstract events such as:

```java
GhostInput {
  float time;
  int family;
  int target;
  float intensity;
}
```

Families:

```text
REGISTER
ROUTE
ACCEPT
INDEX
COMMIT
```

These events can affect multiple structures.

Example:

```text
REGISTER → 01 new projection snapshot + 04 index activation
ROUTE    → 02 signal path
ACCEPT   → 03 accepted constraint
INDEX    → 04 accessed mark
COMMIT   → creates a square in 05 memory
```

Scheduler rules:

- dense event scheduling is forbidden;
- events are sparse in Phase I;
- moderately denser in Phase II;
- fewer in Phase III;
- NO external ghost input after 145 s.

From 145–180 s all change must be internally generated from history/clock/autonomy.

---

# 14. Determinism

For exhibition reliability, the 180 s loop must be repeatable for a fixed seed.

Use:

```text
seed = 160826
```

All pseudo-random choices must derive from stable hash / seeded Random with known step indices.

Do not call unseeded `random()` in a way that changes the sequence because frame rate dropped.

Prefer event-step-based deterministic values:

```java
stableHash(seed, eventIndex, objectId)
```

rather than `random()` every frame.

The same timestamp capture should reproduce the same composition.

---

# 15. Suggested file changes

Keep the existing project folder and evolve it instead of creating a new parallel Processing sketch.

Add:

```text
Dramaturgy180.pde
HistoryState.pde
ResidueStore.pde
GhostInputScheduler.pde
MotionOperatorBus.pde
EventBus.pde
StructureScore.pde
RenderPipeline.pde
```

Modify:

```text
ArtworkContext.pde
ArtworkComposer.pde
AppConfig.pde
NFI_Artwork_P3D.pde
State01HighDimProjection.pde
State02SignalLayer.pde
State03ConstraintMechanism.pde
State04IndexField.pde
State05QuantizedMemory.pde
State06RecursiveAssembly.pde
VisualState.pde / BaseVisualState if needed
CaptureHarness.pde
```

Do not delete the reference audit or reference images.

---

# 16. Required composer behaviour

Replace active-state switching with this conceptual structure:

```java
void update(ArtworkContext ctx) {
  dramaturgy.evaluate(ctx);
  ghostInputs.update(ctx);
  history.update(ctx);
  events.update(ctx);
  motion.update(ctx);

  for (int i = 0; i < states.length; i++) {
    states[i].setWeight(ctx.structureWeight[i]);
    states[i].update(ctx.dt, ctx);
  }
}

void draw(PGraphics target, ArtworkContext ctx) {
  pipeline.begin(target, ctx);

  pipeline.drawField(ctx);

  for (VisualState s : states) {
    if (s.getWeight() > 0.015) {
      pipeline.drawStructure(s, ctx);
    }
  }

  pipeline.drawMotion(ctx);
  pipeline.drawEvents(ctx);
  pipeline.drawHistory(ctx);
  pipeline.composite(target, ctx);
}
```

Implementation details may differ, but semantic order must remain.

---

# 17. Transition philosophy

There are no crossfades between six full-screen scenes because there are no six scenes.

Transition occurs through:

```text
weight transfer
history persistence
operator change
local subtraction
selective recall
structural takeover
```

Examples:

### 02 → 05 relationship

A used signal route becomes a pattern of committed square/dash memory entries rather than simply fading out while 05 fades in.

### 03 → 06 relationship

Accepted constraints bias where recursive partition splits occur.

### 04 → 05 relationship

Repeated index accesses become brighter/stronger memory squares.

### 05 → 02 recall

An old diagonal chain triggers retracing of a historical preferred signal route.

### 06 → 01 remainder

Old assembly boundaries recede; only a few projection/module registration fragments remain, preparing a return to the beginning.

---

# 18. Capture / debug modes

The exhibition runtime shows no UI, but developer modes must exist.

Required keyboard-only debug controls:

```text
1–6  isolate one structure for review
0    composite exhibition mode
R    reset deterministic loop
F    front camera
D    depth debug oblique camera
H    history-only debug
M    motion-only debug
E    event-only debug
Space pause/resume
[ ]  scrub backwards/forwards by fixed amount if practical
S    save capture
```

Debug text may appear only in explicit debug mode.

Exhibition mode must have no labels.

---

# 19. Required captures

Create:

```text
captures/V1/
  00-12s.png
  01-35s.png
  02-50s.png
  03-85s.png
  04-100s.png
  05-118s.png
  06-145s.png
  07-160s.png
  08-175s.png
  09-loop-seam.png
```

Also per state:

```text
captures/V1/states/01-front.png ... 06-front.png
```

And at least three depth debug captures proving actual shallow Z layering without turning artwork into 3D spectacle.

---

# 20. Technical performance target

First review target:

```text
1840×980
60 FPS target
P3D
no MSAA assumption required
```

If performance is stable, later scale output.

Do not optimise by visibly simplifying reference geometry before measurement.

Avoid:

- creating large temporary ArrayLists per frame;
- rebuilding deterministic topology every frame;
- unbounded history growth;
- per-frame loading of assets;
- excessive `PGraphics` allocations.

Use bounded history pools.

Suggested semantic history cap for V1:

```text
<= 500 meaningful HistoryRecord objects
```

Old records decay/remove or compress.

---

# 21. Acceptance criteria — artwork level

The V1 is acceptable only if all are true:

## Visual lineage

- flattened front view still clearly descends from the 08/16 images;
- black/white line discipline is preserved;
- negative space survives;
- no generic creative-coding decoration has been introduced.

## Continuous system

- it no longer reads as 01→02→03→04→05→06 presets;
- at least three moments clearly show multiple source structures coexisting;
- state inheritance is visible.

## History

- history is not only motion blur;
- at least three history types affect later structure generation;
- the viewer can feel that something older has returned;
- after new input stops, the system visibly continues.

## Dramaturgy

- first 35 s are sparse and legible;
- 35–85 s accumulates;
- 85–135 s contains the strongest recall/complexity;
- 135–180 s becomes autonomous and then sparse;
- ending does not feel like a conventional climax/credits finish;
- loop seam is intentional and not a visible software reset.

## 05 Quantized Memory

- reads as memory/age structure, not random dashes;
- new/recent/old/residue strata are visually distinct through brightness and position;
- diagonal recalls are meaningful and not constant decoration.

## 06 Recursive Assembly

- subdivisions appear over time;
- parent boundaries survive as history;
- splitting is affected by earlier system history;
- it is not merely a precomputed mosaic with cycling highlights.

---

# 22. Automated / measurable QA where practical

Add simple logs or report output for:

```text
average FPS
min FPS
current phase
external input event count
history record count
active structure count
peak structure weights
number of event bursts
```

During exhibition mode the logging is console/file only, not screen UI.

A 180-second run must prove:

```text
external input count after t=145s == 0
history still changes after t=145s == true
structure state still changes after t=145s == true
history record count bounded == true
loop reset deterministic == true
```

Run a 30-minute stability test after the 180-second visual review passes.

---

# 23. Forbidden shortcuts

Do NOT solve weak animation by adding:

```text
particles
Perlin-noise displacement everywhere
constant jitter
camera orbit
chromatic aberration
film grain overlay
bloom
large text
ASCII rain
terminal UI
random Unicode symbols
procedural star field
floating cubes
3D wireframe sphere
full-screen audio reactive scale
```

If a moment is weak, improve:

```text
timing
weight relation
selection rule
history inheritance
spatial hierarchy
density contrast
local motion
negative space
```

before introducing anything new.

---

# 24. Implementation order for local Codex

Execute in this exact order.

## STEP 1 — Audit current code

Read all current `.pde` files and produce a short `reports/V1-CODE-AUDIT.md` recording:

- which states already visually match the reference reasonably well;
- which current behaviours are purely static;
- which code still uses six-state switching;
- which arrays/topologies can be retained;
- where current implementation violates this brief.

Do not stop for review unless build is blocked.

## STEP 2 — Replace active-state carousel

Implement `Dramaturgy180`, expanded `ArtworkContext`, weighted `ArtworkComposer`, `StructureScore`.

At this point all six existing state drawings should be able to coexist using weights even before redesign.

Capture one composite test.

## STEP 3 — Implement semantic history core

Add `HistoryState`, bounded `HistoryRecord`, and shared biases.

Prove that one structure can write a record and another can read it.

## STEP 4 — Redesign 05 first

Implement real quantized memory rows sourced from event/history data.

This is the first major visual review target.

## STEP 5 — Redesign 06

Make recursive subdivision happen over time and preserve parents.

## STEP 6 — Enhance 02 / 03 / 04

Implement route usage, accepted constraints and stable index access.

## STEP 7 — Enhance 01

Add controlled projection snapshots/history without 3D spectacle.

## STEP 8 — Implement MotionOperatorBus + EventBus

Only after structure/history already work.

## STEP 9 — Tune the 180-second score

Use the canonical weight table, then adjust only to maintain visual density/continuity.

## STEP 10 — Capture + QA

Produce required captures, one full 180-second screen recording if local capture is practical, QA report and 30-minute stability run after visual pass.

---

# 25. Codex completion report

Create:

```text
reports/V1-EXHIBITION-IMPLEMENTATION.md
```

Must include:

```text
FILES CHANGED
ARCHITECTURE CHANGES
STATE 01 CHANGES
STATE 02 CHANGES
STATE 03 CHANGES
STATE 04 CHANGES
STATE 05 CHANGES
STATE 06 CHANGES
HISTORY MODEL
DRAMATURGY MODEL
LOOP-SEAM METHOD
PERFORMANCE
TESTED / NOT TESTED
KNOWN PROBLEMS
CAPTURE PATHS
NEXT REVIEW QUESTIONS
```

Do not write "done" for untested behaviour.

---

# 26. Final implementation principle

The V1 succeeds when the six 08/16 structures stop behaving like separate sketches and begin behaving like different organs of one persistent system.

The final image language should still be reducible to:

```text
wireframe
rail
grid
square
dash
partition
```

The motion language should still be reducible to:

```text
scan
shutter
chase
split
collapse
retrace
```

The conceptual difference must come from:

```text
what was used
what was accepted
what remained
what returned
what began to act without new input
```

Do not add complexity unless the current system fails to express one of those five relationships.

---

# 27. One-line execution command

Local Codex should receive:

> Read `projects/no-further-input-required/P3D-ARTWORK-SHEET.md`, `projects/no-further-input-required/NFI_Artwork_P3D/reports/A000-REFERENCE-AUDIT.md`, and `projects/no-further-input-required/NFI_Artwork_P3D/EXHIBITION-V1-FINAL-EXECUTION-BRIEF.md`. Treat the 2026-08-16 six images as the immutable visual vocabulary, but replace the current six-state carousel with the continuous five-pass / six-structure / 180-second system defined in the final brief. Execute STEP 1 through STEP 10 in order, modifying the existing `NFI_Artwork_P3D` sketch rather than creating a parallel sketch. Do not ask for design clarification unless the project cannot build or a required reference is missing. Preserve deterministic output, produce the specified captures and `reports/V1-EXHIBITION-IMPLEMENTATION.md`, and stop only after a runnable composite exhibition V1 exists or a concrete build blocker is documented.
