# NFI-P3D-HARNESS — ACCEPTANCE / EVIDENCE PROTOCOL

> Local Codex executes tests. Reviewer owns artistic judgment and final stage decision.

---

# 1. Two-gate model

Every stage can have two separate gates:

```text
TECHNICAL GATE
ARTISTIC / PERFORMANCE GATE
```

Local Codex may report technical facts such as:

```text
COMPILE = PASS
NO EXCEPTION = PASS
EXPECTED EVENT COUNT = 36
MISSED BOUNDARIES = 0
FPS = 60 average
```

But it may not write:

```text
ARTISTIC PASS
GOOD VISUAL
BEAUTIFUL
PERFORMABLE
BETTER THAN V0.7
```

Only Reviewer writes final decision.

---

# 2. Required decision vocabulary

Reviewer uses one of:

```text
PASS
REVISE
REJECT
PAUSE
REVERT
```

Optional refinement:

```text
PASS-TECHNICAL
PASS-ARTISTIC
REVISE-SAME-DESIGN
REIMPLEMENT-SAME-SPEC
REDUCE-COMPLEXITY
REJECT-STATE
```

Local Codex leaves Reviewer Decision blank.

---

# 3. Evidence folder convention

Recommended:

```text
captures/
  R000/
  R001/
  ...
recordings/
  R003/
  R005/
reports/
  R000-report.md
  R001-report.md
logs/
```

Do not overwrite previous review evidence. If rerunning after revision:

```text
R005-a/
R005-b/
R005-c/
```

or equivalent revision suffix.

---

# 4. Build evidence

Every stage report must include:

```text
TASK ID
DATE/TIME
BRANCH
COMMIT SHA
PROCESSING VERSION
JAVA VERSION if relevant
OS
DEPENDENCIES
BUILD COMMAND / METHOD
BUILD RESULT
RUNTIME RESULT
CONSOLE ERRORS
KNOWN WARNINGS
```

If launch requires manual Processing IDE action, document it exactly.

---

# 5. Determinism evidence

For replayable stages report:

```text
SEED
REPLAY FILE
TIME SCALE
BPM
START STATE
EXPECTED EVENT COUNT
ACTUAL EVENT COUNT
MISSED EVENT COUNT
DUPLICATE EVENT COUNT
```

Repeat same replay at least twice for a deterministic gate when requested.

Important: deterministic replay does not mean audio sample-level identity. It means system event / score / key mapping sequence is reproducible enough to compare revisions.

---

# 6. Standard replay fixtures

## Fixture A — `keyboard-sweep-01`

```text
1 2 3 4 5 6 7 8 9 0
Q W E R T Y U I O P
A S D F G H J K L
Z X C V B N M
```

Purpose:

- topology;
- progression;
- row distinction;
- visual direction;
- quantization.

## Fixture B — `phrase-with-rests-01`

```text
Q W E R
REST
A S D F
REST
Z X C V
REST
Q P
```

Purpose:

- decay;
- no-input continuation;
- phrase articulation.

## Fixture C — `stress-01`

High-rate repeated key / command events for a fixed duration.

Purpose:

- clamp;
- density budget;
- voice safety;
- event expiry;
- recovery.

## Fixture D — `structure-60s`

Synthetic / score-driven structural test:

```text
00–10  quiet
10–20  energy ramp
20      hit
20–30  dense
30–35  silence / empty
35–45  left→right progression
45–50  repeated hits
50–60  release
```

Purpose:

- full-system fast evaluation;
- later repeated comparison across states.

---

# 7. Screenshot protocol

For P3D states use the same viewport / seed / replay unless task says otherwise.

Minimum set:

```text
idle.png
single-q.png
qwerty-sweep.png
row-sweep.png
low-energy.png
high-energy.png
low-space.png
high-space.png
no-input-after-5s.png
```

For 3D proof also capture:

```text
camera-reference.png
camera-offset-small.png
```

The camera offset exists only to prove depth / parallax, not as final choreography.

---

# 8. Recording protocol

When recording is available:

- HUD-off version preferred for artistic review;
- HUD-on diagnostic version optional;
- keep raw screen + sound;
- do not edit pacing to hide bad moments;
- no music replacement in post;
- filename includes task / revision / seed.

Example:

```text
R005-b-seed240829-hudoff.mp4
```

If recording cannot be automated, local Codex writes exact manual steps in A-SHEET.

---

# 9. Technical metrics

Useful metrics by stage:

### Transport

```text
missed boundaries
duplicate boundaries
bar order
time-scale correctness
```

### Event system

```text
active event count
peak event count
expired count
unbounded growth? yes/no
```

### Audio

```text
active voices
stuck voices
peak master level if measurable
exceptions
```

### P3D

```text
mean FPS
1% low if available
object / vertex / line count if meaningful
camera bounds
```

Do not optimize prematurely. Record facts first.

---

# 10. Reviewer artistic rubric

Local Codex does NOT score these. It only supplies evidence.

Reviewer checks:

## Stability

Does repeated operation push the system toward unusable chaos?

## Controllability

Can performer add and reduce / release / recover?

## Observability

Can performer understand current state / pending change / consequence?

## Robustness

Does early / late / sparse / dense input still remain viable?

## Expressivity

Can a small control set produce genuinely different phrases / decisions?

## Depth

Does it retain meaningful behaviour beyond the first obvious trick?

## State distinction

Does each state represent a different behavioural proposition, not the same effect layout?

## Spatial validity

For P3D: is depth actually meaningful and perceivable?

## Musical continuity

Does the system continue coherently when performer stops?

## Causality

Can an observer infer that performer actions matter without every beat being literal 1:1 reaction?

---

# 11. Failure taxonomy for reporting

Local Codex may classify failures factually:

```text
BUILD
RUNTIME
TIMING
AUDIO
MAPPING
EVENT-LIFECYCLE
PERFORMANCE
CAPTURE
DEPENDENCY
UNKNOWN
```

For visual/artistic problems it may only write descriptive observations, e.g.:

```text
Observed: camera moves continuously 360° despite spec limit.
Observed: Q and P occupy nearly same projected position in capture.
Observed: after stress replay active events remain > 500 after 10 s.
```

Not:

```text
Observed: composition is ugly.
```

---

# 12. Stop condition

After all required evidence is produced:

1. update A-SHEET;
2. include commit SHA and evidence paths;
3. set implementation status to `AWAITING_REVIEW`;
4. stop.

Do not begin another stage.
