# Performance Control Model — Daily Practice Protocol

**Purpose:** keep research moving while continuously producing reusable visual/audio material for workshops and performances.

## Daily structure

Every day contains two independent lanes:

```text
A. RESEARCH TASK
one system question only

B. MATERIAL PRACTICE
1–2 visual sets
+ 1 audio / sequencer study
```

The material practice must not replace the active research task, but it should produce assets that can later be reused by the runtime, workshop or live set.

---

# A — One active research task

Only one active research question per day.

Examples:

- Does beat/bar quantization make imperfect input musically stable?
- Can 8 layers remain controllable after repeated ADD / REMOVE?
- Does a spatial Z axis add useful control compared with XY only?
- Can one state change drive audio and visual without trivial 1:1 mapping?

Required evidence:

```text
QUESTION
TEST
RESULT
PASS / REVISE / REJECT
NEXT GATE
```

---

# B1 — Visual Set practice

Produce **1–2 small visual sets per day**.

A set is not a polished artwork. It is a reusable visual behaviour with a clear control grammar.

Each set should contain:

```text
SET NAME
INPUTS
STATE VARIABLES
ATTACK
DEVELOPMENT
RELEASE
RESET
PERFORMANCE RANGE
```

Recommended daily visual exercises:

### V01 — Pulse / Gate
One signal controls appearance/disappearance, but visual behaviour continues after the trigger.

### V02 — Density Field
One continuous value controls amount/density without simply scaling object count linearly.

### V03 — Accumulation / Decay
Repeated triggers build residue; release clears it gradually.

### V04 — Phase / Scan
A repeating phase scans through lines/points/geometry. Useful for sequencer visualisation.

### V05 — Layer Mix
Two visual layers coexist; control is ADD / REMOVE / WEIGHT, not hard scene switching.

### V06 — State Interpretation
The same trigger behaves differently under OPEN / BUILD / PEAK / BREAK.

Daily output target:

```text
1 short playable webpage
or
1 reusable visual module
+
10–30 s screen recording
```

---

# B2 — Audio / Sequencer practice

Produce **one small sequencer study per day**.

Do not begin with a complete song.

Use a fixed test format:

```text
BPM: 110–135
Length: 2 or 4 bars
Layers: 2–4 initially
Run time: 30–60 s
```

Each study tests one variable only.

## S01 — Quantization
Human triggers intentionally early/late.

Compare:

```text
RAW INPUT
vs
1/4 quantized
vs
1 bar quantized
```

Question: which version still feels responsive but remains stable?

## S02 — Layer Entry / Exit
Prepare 4 loops:

```text
KICK
LOW
HIGH
TEXTURE
```

Test only:

```text
ADD
REMOVE
```

Question: can structure emerge without changing the clips themselves?

## S03 — Density
One layer contains several pattern variants.

```text
DENSITY 0.2
DENSITY 0.5
DENSITY 0.8
```

Question: can one continuous macro create a meaningful structural gradient?

## S04 — Hold / Release
Build toward a transition, then test whether HOLD can delay it and RELEASE can resolve it cleanly.

## S05 — Variation
Keep rhythm role constant while changing event probability, subdivision or timbre.

Question: when does variation become a new clip rather than modulation of the current clip?

## S06 — 8-Layer rehearsal
Only after S01–S05 are stable.

Start all layers OFF and construct a 60–90 second form only through layer activation and removal.

Record the exact order of actions.

---

# Fast test sequence when opening the webpage

Use the same order every time so tests are comparable.

## 00 — Reset

```text
Reload
Audio unlock
RESET
all layers OFF
state = OPEN
```

## 01 — Baseline
Do nothing for 10 seconds.

Check:

- does the system remain stable?
- is autonomous content intentional or dead?
- CPU / FPS / gain normal?

## 02 — Single input
Trigger each capsule once.

Check:

- clear attack?
- clear development?
- clear release?
- visual/audio event identity legible?

## 03 — Bad timing test
Deliberately press early and late.

Check:

- pending state visible?
- quantization audible?
- response still feels connected to the action?

## 04 — Repetition stress
Trigger the same action 8–16 times.

Check:

- density ceiling?
- stuck voices?
- visual overload?
- reset works?

## 05 — Layer build

```text
1 → 2 → 3 → 4 layers
then
4 → 2 → 1
```

Check whether both build and release are controllable.

## 06 — 45-second performance
No debugging. Perform once from beginning to end.

Record screen + audio.

## 07 — Review
Immediately write only three notes:

```text
WORKED
FAILED
NEXT CHANGE
```

---

# Workshop organisation

Workshop material should be derived from validated daily exercises rather than developed separately.

Use this ladder:

```text
STARTER 00
Trigger baseline

STARTER 01
Capsule + envelope

STARTER 02
Quantization

STARTER 03
2–4 layer sequencing

STARTER 04
Shared audio/visual state

GOLDEN DEMO
60–90 s playable system
```

For teaching, each starter should answer one question and be playable in less than two minutes.

Do not expose the whole runtime architecture to participants at once.

---

# Performance organisation

The stage system uses the same material but at a higher hierarchy.

```text
DAILY VISUAL SETS
+
DAILY SEQUENCER STUDIES
↓
CURATED CAPSULE LIBRARY
↓
CLIPS
↓
8 LAYERS
↓
STATE / SECTION
↓
LIVE SET
```

Before a performance, select only tested material.

Suggested show preparation:

### T-7 to T-4
Collect / reject daily sets and clips.

### T-3
Freeze the 8 layers and their roles.

### T-2
Rehearse structural transitions only.

### T-1
No new features. Only stability, gain, reset, device/network and screen-output checks.

### SHOW
Perform high-level decisions only:

```text
ADD
REMOVE
HOLD
RELEASE
DENSITY
ENERGY
SPACE
RESET
```

---

# Daily archive rule

Each useful exercise gets:

```text
/YYYY-MM-DD/
  visual-set-a/
  visual-set-b/
  sequencer-study/
  capture/
  notes.md
```

A daily exercise is promoted to the shared runtime only after it has a recorded test and a clear reusable control behaviour.
