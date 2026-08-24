# SP-WEBXR — Taskbook

> Execution plan for `Spatial Playground / WebXR Performance Control`.
> Read `README.md`, `HARNESS.md`, `ACCEPTANCE.md`, `REFERENCES.md`, then `A-SHEET.md` before implementation.

## Operating rule

Each stage answers one research question. Do not unlock a later stage because it looks more interesting.

```text
IMPLEMENT
→ RUN
→ CAPTURE
→ REPORT
→ REVIEW
→ PASS / REVISE / REJECT
```

No evidence = not tested.

---

# W000 — Repository + Harness Bootstrap

**Question:** Can the experiment run as a reproducible WebXR project before any artistic mapping is added?

## Required

```text
web/
  package.json
  src/
    main.ts
    xr/
    debug/
    transport/
    volumes/
    state/

bridge/
  package.json
  src/
    server.ts

reports/
captures/
```

Stack:

```text
Vite
TypeScript
Three.js
WebXR
osc-js or equivalent OSC packet library
Node.js WebSocket/WSS → UDP bridge
```

Runtime modes:

```text
?mode=mock
?mode=xr
?mode=replay
```

The `mock` mode exists so most UI and control logic can be developed without wearing the headset.

## Visible diagnostic page

Show:

```text
BUILD ID
MODE
XR SUPPORT
SESSION MODE
HAND TRACKING REQUESTED / GRANTED
WSS STATUS
FRAME RATE
MESSAGE RATE
RECORDER STATUS
```

## Forbidden

- polished visual design;
- music system;
- performance-state mapping;
- custom gesture vocabulary;
- more than one networking method.

## Evidence

```text
reports/W000-report.md
captures/W000-desktop.png
```

## Gate

PASS when desktop mock mode builds, launches, reconnects after reload and produces no uncaught exception during a 60-second idle run.

---

# W001 — D00 Sensor Scope / Real Vision Pro Capability Probe

**Question:** What continuous data can Safari WebXR on the real Vision Pro actually expose reliably?

## Required XR session

Request:

```text
immersive-vr
optional / required feature: hand-tracking
local reference space
```

Support `transient-pointer` events separately from persistent hand input sources.

## Hand visualisation

For each detected hand:

- draw all 25 WebXR joints;
- draw bones/links for orientation only if this does not hide raw positions;
- show selected-joint position `x y z`;
- show selected-joint orientation quaternion;
- show `XRJointPose.radius`;
- show handedness;
- show missing/invalid pose state.

Required inspected joints:

```text
wrist
thumb-tip
index-finger-tip
middle-finger-tip
ring-finger-tip
pinky-finger-tip
index-finger-metacarpal
```

## Viewer/head scope

Per XR frame, expose:

```text
viewer position x y z
viewer orientation qx qy qz qw
derived yaw pitch roll
```

Head orientation must be visually testable with three axes or a forward vector.

## Derived hand features

Implement only:

```text
pinchDistance = distance(thumb-tip, index-finger-tip)
handVelocity = derivative(wrist position)
twoHandDistance = distance(left wrist, right wrist)
```

Do not implement semantic gesture recognition yet.

## Recorder

Record timestamped samples to JSONL or compact JSON:

```text
timestamp
viewer pose
all available hand joint poses
derived features
tracking-validity flags
```

Minimum capture scenarios:

1. both hands still for 10 s;
2. left hand moves through XYZ for 10 s;
3. right hand moves through XYZ for 10 s;
4. repeated pinch 10 times;
5. head yaw left/right;
6. head pitch up/down;
7. head roll left/right;
8. temporary hand occlusion / tracking loss.

## Evidence

```text
sessions/W001-<date>-sensor-scope.jsonl
captures/W001-hands.png
captures/W001-head.png
reports/W001-report.md
```

Report must contain observed facts, not assumptions.

## Gate

PASS only after real-device evidence confirms:

- immersive session launches;
- hand tracking permission succeeds;
- expected WebXR joint names are exposed;
- joint positions update continuously while visible;
- viewer/head pose updates continuously;
- yaw/pitch/roll change in the expected direction;
- tracking loss does not crash or produce unguarded NaN values.

If hand tracking fails on device, stop. Do not implement later demos against mock data alone.

---

# W002 — Secure Transport + OSC Bridge

**Question:** Can Vision Pro browser data reach a Mac performance environment with stable, observable transport?

## Browser side

Implement one WebSocket/WSS client with:

```text
connect
reconnect
ping/pong
sequence number
send timestamp
message counter
queue / drop indicator
```

## Mac bridge

Implement:

```text
WSS receiver
session id
message parser
OSC packet/router
UDP output
plain console monitor
optional JSONL transport log
```

Do not allow the bridge to hide message loss.

## First OSC routes

```text
/sp/test/ping             float
/sp/head/rotation         yaw pitch roll
/sp/hand/left/pinch       float
/sp/hand/right/pinch      float
```

## Network evidence

Measure at least:

```text
WebSocket RTT
message rate
reconnect time
out-of-order sequence count
dropped sequence count
```

Test 10 Hz, 30 Hz and 60 Hz streams for 60 seconds each.

## Receiver proof

Use one OSC receiver on Mac and record proof that the values arrive. Max, TouchDesigner, SuperCollider, Processing or a small OSC monitor are acceptable.

## Evidence

```text
reports/W002-network-report.md
reports/W002-osc-log.txt
captures/W002-osc-receiver.png
```

## Gate

PASS when:

- WSS connection survives a 5-minute run;
- reconnect succeeds after one deliberate disconnect;
- no sustained queue growth occurs at 30 Hz;
- sequence loss is reported rather than hidden;
- `/sp/head/rotation` and both pinch values reach a UDP OSC receiver.

60 Hz is a performance target, not a blocker if 30 Hz proves stable and perceptually adequate.

---

# W003 — D01 Control Volumes

**Question:** Can spatial regions become reliable musical control primitives?

## Volume types

Implement exactly three:

```text
sphere
box
thin box / plane-volume
```

Each volume has:

```text
id
transform
size
enterMargin
exitMargin
active tracked point
```

`enterMargin` and `exitMargin` must support hysteresis so a joint near the boundary does not fire rapid ENTER/EXIT oscillation.

## Tracked-point choices

Minimum:

```text
left index-finger-tip
right index-finger-tip
left wrist
right wrist
```

## Events

```text
ENTER
STAY
EXIT
```

Continuous local coordinate output:

```text
u v w = normalized local XYZ in 0..1
```

Additional metrics:

```text
dwell time
distance to center
```

## Visual proof

The volume must visibly change state on ENTER/STAY/EXIT. The selected joint and volume boundary must remain visible.

## OSC proof

```text
/sp/volume/<id>/enter
/sp/volume/<id>/exit
/sp/volume/<id>/xyz
/sp/volume/<id>/dwell
```

## Test script

For each volume:

1. enter and exit slowly 10 times;
2. hover near boundary for 10 s;
3. enter quickly 10 times;
4. move through opposite sides;
5. hide the tracked hand while inside;
6. restore tracking.

## Evidence

```text
sessions/W003-control-volumes.jsonl
captures/W003-volumes.mp4 or equivalent short capture
reports/W003-report.md
```

## Gate

PASS when deliberate crossings produce one ENTER and one EXIT per crossing under the scripted test, boundary hover does not create uncontrolled chatter, and tracking loss resolves to a safe state.

---

# W004 — D02 Playground 2D → 3D Comparison

**Question:** Does a spatial third dimension improve performance control, or merely add complexity?

## Fixed material

Use exactly the same sound source, visual source and high-level mapping targets for all comparison modes.

Do not redesign content between modes.

## Mode A — SURFACE

```text
X → parameter family A
Y → parameter family B
Z ignored
```

The spatial controller acts like a floating 2D Playground surface.

## Mode B — DEPTH

```text
X → family A
Y → family B
Z → intervention amount / mapping depth
```

Recommended interpretation:

```text
output = base + mapping(X,Y) × depth(Z)
```

## Mode C — VOLUME

```text
X
Y
Z
```

all become meaningful dimensions in a bounded control volume.

## Optional expressive features

Only after A/B/C work:

```text
pinch → HOLD / COMMIT
velocity → transient energy
```

## Comparison protocol

For each mode:

- 2-minute familiarisation;
- 2-minute performance task;
- same target task;
- same audio/visual material;
- reset before each run.

Record:

```text
number of accidental exits
number of reset/panic uses
reachable parameter range
movement path length
performer rating: predictability 1..5
performer rating: expressivity 1..5
performer rating: effort 1..5
short qualitative note
```

## Gate

No mode automatically wins.

A spatial mode is retained only if it produces a clear performance benefit such as:

- greater expressive range with similar cognitive load;
- clearer intervention strength;
- better reversible control;
- meaningful separation between selection and expression.

If 2D Surface is better, preserve it. The research does not require 3D to win.

---

# W005 — D03 Performance Control Loop

**Question:** Can spatial input become a stable high-level performance instrument under the parent Performance Control Model?

## Input compression

Select no more than six high-level live variables from the tested signals:

```text
ENERGY
DENSITY
SPACE
TENSION
FOCUS
CONTROL_WEIGHT
```

These names are provisional. Replace only when a tested mapping is clearer.

## State

Minimum:

```text
OPEN
BUILD
PEAK
BREAK
```

## Actions

Minimum:

```text
ENTER
HOLD
ADD
REMOVE
RELEASE
RESET
```

Machine-owned functions may include:

```text
smoothing
limits
quantization
density budget
transition timing
panic/reset
```

Human-owned decisions remain high-level.

## Shared A/V state

Audio and visual systems must receive at least one shared state variable and interpret it differently.

Invalid proof:

```text
kick amplitude → visual scale
```

Valid direction:

```text
TENSION ↑
Audio: subdivision / spectral pressure changes
Visual: fragmentation / spatial compression changes
```

## Required performance

Record one uninterrupted 60–90 second performance containing:

```text
low activity
build
high activity
release
return to controllable low state
```

The operator must be able to recover from one deliberately bad input using the designed control model rather than restarting the application.

## Evidence

```text
captures/W005-performance.mp4
sessions/W005-performance.jsonl
reports/W005-report.md
```

## Gate

Review against Stability, Controllability, Observability, Robustness, Expressivity and Depth in `ACCEPTANCE.md`.

---

# W006 — Human Validation + Research Summary

**Question:** Which spatial controls remain understandable and useful when someone other than the implementer uses them?

Minimum protocol:

```text
2 participants other than implementer
2-minute instruction maximum
5-minute free use
1 structured performance task
short post-test rating
```

Questions:

```text
What did you think each control did?
Which action felt most predictable?
Which action felt expressive?
Which action caused uncertainty?
Could you intentionally become quieter / simpler?
Could you recover after making the system too dense?
```

Final research summary must separate:

```text
PLATFORM FACTS
IMPLEMENTATION FINDINGS
PERFORMANCE FINDINGS
FAILED IDEAS
PROVISIONAL HYPOTHESES
NEXT RESEARCH QUESTIONS
```

Do not convert two-participant observations into population-level HCI claims.

---

# Stage board

```text
W000 Harness Bootstrap                  READY
W001 D00 Sensor Scope                   LOCKED
W002 Secure Transport + OSC             LOCKED
W003 D01 Control Volumes                LOCKED
W004 D02 Playground 2D → 3D             LOCKED
W005 D03 Performance Control Loop       LOCKED
W006 Human Validation                   LOCKED
```

Only reviewer evidence unlocks the next stage.
