# NFI-P3D-HARNESS — TASKBOOK

> Local Codex executes. Reviewer decides.

This taskbook is intentionally staged. **Do not skip ahead.**

---

# Stage model

```text
R000  Harness bootstrap
R001  Transport + StructuralScore
R002  ControlBus + Event model
R003  v0.7 QWERTY instrument port
R004  Diagnostic P3D proof
R005  FIELD P3D
R006  ORBIT P3D
R007  REWIND / MEMORY P3D
R008  CELLS / PARTITION / ROUTE
R009  AudioObserver + offline fast-analysis
R010  transition / autoplay / performance integration
R011  human test / repertoire
```

Only one stage may be `ACTIVE` in `A-SHEET.md`.

---

# R000 — Harness bootstrap

## Goal

Create a Processing project that can be built, launched, configured, replayed and captured before any artistic P3D work begins.

## Required output

```text
research/performance-control-model/experiments/nfi-p3d-harness/runtime/
  NFI_Performance_P3D/
  harness/
  captures/
  reports/
```

The exact runtime location may be adjusted once if local repository constraints require it; record any change in A-SHEET.

## Required Processing sketch minimum

- `size(..., P3D)` or `fullScreen(P3D)` selectable via config;
- black / dark background;
- diagnostic HUD showing:
  - build id;
  - current harness mode;
  - FPS;
  - BPM;
  - bar / beat / step;
  - current state id;
  - random seed;
- no final visual design.

## Required config

Suggested fields:

```text
BUILD_ID
DEFAULT_BPM = 104
WINDOW_MODE = WINDOWED / FULLSCREEN
WINDOW_W
WINDOW_H
SEED
HARNESS_MODE
TIME_SCALE
AUDIO_ENABLED
HUD_ENABLED
CAPTURE_ENABLED
```

## Harness scripts

Create the simplest local scripts compatible with the user's machine. Examples:

```text
harness/run-live.*
harness/run-fast.*
harness/run-replay.*
harness/clean-captures.*
```

If Processing CLI is available, use it. If not, document exact manual launch steps and prepare scripts only for what is actually automatable.

## R000 test

1. clean launch;
2. resize / fullscreen smoke if supported;
3. stable 60-second idle run;
4. no uncaught exception;
5. capture one screenshot;
6. restart with same seed;
7. diagnostic values must initialize identically.

## Evidence

```text
captures/R000/idle.png
reports/R000-report.md
```

## Forbidden

- no particles;
- no new state designs;
- no audio composition redesign;
- no gesture system;
- no random visual showcase.

## Failure handling

If build fails:

- do not redesign architecture;
- record compiler output;
- fix only bootstrap issue;
- rerun same test;
- never mark PASS yourself.

---

# R001 — Transport + StructuralScore

## Goal

Establish the musical and structural clock independent of frame rate.

## Implement

### Transport

Default:

```text
104 BPM
4/4
16 steps / bar
```

Must expose bar / beat / step and boundary events.

### StructuralScore

Use a 32-bar fixture with:

```text
OPEN 1–8
BUILD 9–16
HOLD 17–20
HIT 21
RELEASE 22–26
EMPTY / RETURN 27–32
```

Store target curves for:

```text
energy
tension
density
space
memory
activity
```

Do not argue whether these are the final artistic variables. They are current test fields.

## FAST mode

Add `TIME_SCALE` support for simulation only.

Required scales:

```text
1x
2x
4x
8x
16x
```

In FAST mode, the score may advance faster than realtime audio. Audio can be muted.

## R001 deterministic test

For each timescale:

- run the same score;
- log exact section transitions;
- expected bar numbers must match;
- no skipped / duplicate boundary;
- `HOLD` test: request hold before a boundary and verify score behaviour matches spec;
- resume and verify continuity.

## Evidence

```text
reports/R001-transport-log.txt
reports/R001-score-log.txt
captures/R001/open.png
captures/R001/build.png
captures/R001/hit.png
captures/R001/release.png
```

Diagnostic screenshots can be plain HUD; artistic quality irrelevant here.

## Technical gate facts to report

- observed mean FPS;
- bar transition sequence;
- timescale sequence;
- duplicate boundary count;
- missed boundary count;
- restart consistency.

---

# R002 — ControlBus + EventBus + constraints

## Goal

Create normalized state communication and prove the system cannot accumulate forever.

## Implement `ControlBus`

Required initial channels:

```text
energy 0..1
tension 0..1
density 0..1
space 0..1
memory 0..1
hit 0..1 transient
motion 0..1
direction -1..1
humanActivity 0..1
machineActivity 0..1
```

## Resolve order

Prototype this order:

```text
score target
→ observer contribution (mock for now)
→ human/replay disturbance
→ smoothing / decay / clamp
→ final bus
```

## EventBus

Must support finite-lifetime events.

Required event categories:

```text
KEY
COMMAND
HIT
STATE_REQUEST
TRANSITION
MOUSE_IMPULSE
SYSTEM
```

## Safety test

Inject deliberately excessive input for 30 seconds:

```text
rapid keys
repeated hit
continuous positive density request
```

Verify:

- no ControlBus scalar exceeds documented range;
- transient hit decays;
- event list does not grow without bound;
- PANIC / RESET returns known baseline;
- no NaN / infinity.

## Evidence

```text
reports/R002-controlbus.csv
reports/R002-stress-test.md
captures/R002/baseline.png
captures/R002/stress.png
captures/R002-reset.png
```

---

# R003 — v0.7 QWERTY instrument port

## Goal

Port the most valuable v0.7 performance behaviour before designing new visuals.

## Canonical keyboard topology

```text
1234567890
QWERTYUIOP
ASDFGHJKL
ZXCVBNM
```

## Implement

- `KeyDescriptor` for all 36 keys;
- normalized physical layout;
- note identity close to v0.7;
- energy / row identity close to v0.7;
- quantized event request;
- row query;
- ordered sweep replay.

## v0.7 musical identity to preserve initially

The port should keep the roles of:

```text
continuous pad
bass
melodic pluck / motif
gesture tone
restrained rhythm
state-dependent intensity
```

Exact synthesis can differ if Processing Sound imposes limitations. Deviations must be documented.

## Do NOT implement final state visuals

For R003, render each key only as diagnostic typography / point / line at its canonical flat layout.

## Required replay fixture `keyboard-sweep-01`

Sequence:

```text
1 → 0
Q → P
A → L
Z → M
```

with musically quantized spacing.

Add second fixture:

```text
Q W E R
A S D F
Z X C V
```

with deliberate rests.

## Test questions local Codex reports as facts

- Did every expected key event fire exactly once?
- Was every event scheduled on a quantized boundary?
- Did row/index values remain stable?
- Did transport continue through whole replay?
- Did audio produce exceptions / stuck voices?

Do NOT report “it feels musical”. Reviewer decides that from recording.

## Evidence

```text
reports/R003-key-map.csv
reports/R003-quantization-log.txt
captures/R003/keyboard-flat.png
captures/R003/qwerty-sweep.png
recordings/R003-keyboard-sweep.*
```

If automated recording is unavailable, record exact manual steps and still save screenshots / logs.

## Reviewer gate

R003 must pass before any P3D state design.

---

# R004 — Diagnostic P3D proof

## Goal

Prove true 3D infrastructure without designing an artwork state.

## Implement

Create a diagnostic spatial keyboard mapping:

```text
row 0 → Z -300
row 1 → Z -100
row 2 → Z +100
row 3 → Z +300
```

or equivalent clearly separated depth lanes.

Add stable camera with visible perspective.

## Required evidence of actual 3D

- one front / perspective screenshot;
- one small camera offset screenshot;
- visible occlusion or parallax;
- same key topology still recoverable.

## Forbidden

- no orbit art;
- no particle art;
- no dramatic camera movement;
- no extra geometry.

## Purpose

This is a renderer proof only.

---

# R005 — STATE 02: FIELD P3D

## Why FIELD first

The v0.7 FIELD already has a coherent grid / deformation concept but only XY motion. It is the cleanest benchmark for proving P3D actually adds something.

## Keep from v0.7

- ordered field;
- grid relationships;
- restrained continuous motion;
- beat can influence local response;
- keyboard topology can map into field positions.

## Replace

- 2D ±pixel wobble;
- generic pulse squares;
- flat grid masquerading as space.

## Required P3D model

Use true XYZ points / lines.

One acceptable starting model:

```text
base XY = ordered grid / keyboard-derived field
Z = wave(time, row, index) × amplitude
```

ControlBus relationships for first experiment:

```text
space   → Z range / camera distance
tension → curvature / compression
density → visible connections / active layers
energy  → wave amplitude / response speed
hit     → local travelling impulse
```

These are specified test mappings; do not invent extra ones.

## Mouse / key behaviour

Input injects local impulse. It must not set point positions directly.

## Required captures

```text
idle
q-only
qwerty-sweep
row-sweep
tension-low
tension-high
space-low
space-high
10-second no-input continuation
```

## Required recording

At least one deterministic 20–30 second replay with HUD off.

## Reviewer checks

Reviewer will judge:

- does it truly read as spatial?
- does it preserve order?
- is it calmer / stronger than random P3D?
- does input create consequence instead of dragging?
- can one see meaningful difference between energy / tension / space?

Local Codex does not answer these artistically.

---

# R006 — STATE 03: ORBIT P3D

## Status of v0.7 ORBIT

The visual implementation is **not a reference to preserve**. Only the concept of orbital / rotational organization and sparse musical identity may survive.

## Required model

Four keyboard rows become four orbital shells / tracks.

Each key owns a stable location derived from:

```text
row
index
rowLength
```

Key press applies:

```text
impulse
phase offset
angular velocity change
radius breathing
local tilt
```

not absolute center movement.

## Required constraints

- no pointer-tethered orbit center;
- no random starfield;
- no giant glowing sphere;
- no constant camera orbit;
- no particle explosion;
- keyboard spatial identity recoverable;
- motion continues and decays after input;
- accumulated angular impulse clamped.

## Required replay

```text
Q → P
A → L
Q A Q A
1 Q A Z vertical-descending phrase
```

## Required captures / recording

Same evidence pattern as FIELD plus stable-camera depth proof.

---

# R007 — STATE 04: REWIND / MEMORY DEPTH

## Concept

Past events become spatial history rather than flat copied lines.

## Keep from v0.7

- event history;
- reverse / rewind idea;
- older events fade;
- current event and past event coexist.

## P3D proposal fixed for first test

Map event age to depth:

```text
new event    Z near front
older event  moves deeper / farther
```

or inverse if reviewer later requests.

Do not invent other memory metaphors for first implementation.

## Test

Replay identical 16-key phrase twice and verify:

- deterministic depth placement;
- old events decay / expire;
- memory list bounded;
- current events visually separable from history.

---

# R008 — ROUTE / CELLS / PARTITION

These states are lower priority after FIELD / ORBIT / REWIND prove the architecture.

Implement one at a time only after reviewer chooses order.

## ROUTE P3D candidate

- keep path progression;
- rows may become depth rails;
- do not overcomplicate if 2D order is already strong.

## CELLS P3D candidate

- use extrusion / depth / activation volume;
- not random boxes;
- activation must have decay / budget.

## PARTITION P3D candidate

- recursive rectangles become planes / shallow rooms / layers;
- preserve recursive partition logic;
- avoid generic architectural flythrough.

Reviewer will write exact active spec before implementation.

---

# R009 — AudioObserver + offline analysis

## Goal

Add continuous audio observation without replacing structural timing.

Separate:

```text
Transport = exact structural clock
AudioObserver = continuous current sound features
```

## Initial features

```text
amplitude
low
mid
high
sizzle
silence
onset hint
```

Stereo bias only if reliable.

## Realtime mode

Normalize / smooth raw data into ControlBus contribution.

## Offline mode

If feasible with Processing Sound / external helper, preprocess test audio into a deterministic feature file.

Preferred format:

```json
{
  "time": 23.2,
  "energy": 0.74,
  "low": 0.62,
  "mid": 0.37,
  "high": 0.28,
  "sizzle": 0.19,
  "onset": 1,
  "silence": 0
}
```

Do not block earlier stages on this.

---

# R010 — Performance integration

Only after at least two P3D states have reviewer approval.

Integrate:

- structural transition;
- crossfade / coexistence if appropriate;
- AUTO phrase behaviour;
- pending next state;
- HOLD;
- RELEASE;
- safe recovery;
- audio continuity;
- no reset of global transport.

AUTO should evolve from simple time-based state switching toward **autoplayer / authored structural phrase**, but only after reviewer specifies phrase behaviour.

---

# R011 — Human validation

Required eventually:

```text
Sound-only
Visual-only
Screen + Sound
HUD-off
novice 5-minute performance
performer agency test
audience causality test
```

Also test the user's known preferred gesture:

```text
left-to-right row sweep
row-by-row descent
ordered phrase
```

Do not claim final performance quality before this stage.

---

# If a stage fails

Local Codex does not choose a new design.

Procedure:

```text
1 stop
2 preserve current evidence
3 update A-SHEET with observed failure
4 include relevant logs / capture paths
5 state likely technical cause separately from artistic speculation
6 do not change scope
7 wait for Reviewer Decision
```

Reviewer may answer:

```text
REVISE-SAME-DESIGN
REVERT
REDUCE
REIMPLEMENT
UNLOCK-ARCHITECTURE
PASS
REJECT-STATE
```

Only then continue.
