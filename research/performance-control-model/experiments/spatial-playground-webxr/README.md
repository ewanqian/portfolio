# Spatial Playground / WebXR Performance Control

**Project code:** `SP-WEBXR`  
**Parent research:** [`Performance Control Model`](../../README.md)  
**Status:** research specification / implementation not yet validated on device  
**Started:** 2026-08-24

## 0. What this project is

Spatial Playground is a WebXR research branch for turning a low-dimensional music-control interface into a spatial performance instrument on Apple Vision Pro.

The project does not treat Vision Pro as a replacement MIDI controller. Its research question is:

> **How can a small number of spatial human actions control a much larger audiovisual performance system while remaining observable, stable, reversible and playable?**

It extends the parent Performance Control Model from conventional input devices into tracked 3D input:

```text
human movement
+ current system state
+ spatial context
↓
feature extraction
↓
control state
↓
shared mapping
↓
audio / visual / light / spatial behaviour
↓
feedback
↓
next human decision
```

The key translation from the existing Playground idea is:

```text
2D Playground
P(x, y)

↓

Spatial Playground
P(x, y, z, state, gesture features)
```

The goal is not to make every UI element three-dimensional. The goal is to test which spatial variables add genuine performance value.

---

# 1. Current platform truth

As of 2026-08-24, the fastest viable route is a browser-first WebXR prototype rather than a native visionOS application.

## Supported and useful

Safari on visionOS supports immersive WebXR sessions. WebXR hand tracking can expose a standard `XRHand` with 25 joints per hand. Each joint can be queried as an `XRJointPose`, giving pose data relative to an XR reference space. Viewer/head pose can be queried every XR frame with `XRFrame.getViewerPose()`, providing position and orientation. This makes head yaw, pitch and roll derivable from the orientation quaternion.

Vision Pro also supports the privacy-preserving `transient-pointer` interaction model: look at a target, pinch, then continue manipulating it with the hand. Full hand tracking can be enabled alongside this interaction mode.

Safari 26.2 on visionOS added WebGPU support inside WebXR, but the first implementation should use Three.js/WebGL unless WebGPU produces a measurable benefit.

## Important boundaries

The web page should **not** be designed around continuous raw eye-gaze coordinates. Vision Pro's web interaction exposes gaze in a privacy-preserving way for target selection; it does not provide a general continuous gaze stream for performance control.

`immersive-ar` on Vision Pro is not a reliable target for this phase. The browser research must therefore assume a fully immersive WebXR control space rather than requiring passthrough, room mesh or real-world occlusion.

A normal browser cannot directly open an arbitrary UDP socket to send OSC. The WebXR client therefore sends OSC-compatible data over WebSocket to a bridge running on the Mac; the bridge forwards it as UDP OSC to Max, TouchDesigner, Ableton-related tooling, Resolume, SuperCollider or another OSC receiver.

---

# 2. Data that matters

The experiment separates **raw tracking data**, **derived features**, **control events** and **performance state**.

## Raw tracking

### Head / viewer

```text
position        x y z
orientation     qx qy qz qw
orientation*    yaw pitch roll  // derived
```

The tracked viewer pose represents the headset/head pose, not a neck skeleton.

### Left and right hands

Each WebXR hand exposes 25 standard joints:

```text
wrist
thumb:  metacarpal / proximal / distal / tip
index:  metacarpal / proximal / intermediate / distal / tip
middle: metacarpal / proximal / intermediate / distal / tip
ring:   metacarpal / proximal / intermediate / distal / tip
pinky:  metacarpal / proximal / intermediate / distal / tip
```

For each joint the harness should make visible:

```text
position
orientation
joint radius
tracking validity
```

## Derived features

Raw joints should not be sent directly to the performance system by default. The harness derives a smaller control vocabulary:

```text
pinchDistance
handOpenness
palmPosition
palmNormal
handVelocity
handAcceleration
twoHandDistance
twoHandCenter
headYaw
headPitch
headRoll
```

Additional features may be added only when a demo proves a distinct performance use.

## Spatial control events

A control volume is a named 3D region. Any tracked point can be tested against it.

```text
ENTER
STAY
EXIT
```

A volume can also expose normalized local coordinates:

```text
localX 0..1
localY 0..1
localZ 0..1
```

This allows a single volume to act as both a discrete state gate and a continuous three-dimensional controller.

---

# 3. System architecture

```text
APPLE VISION PRO / SAFARI

WebXR session
├─ XRViewerPose
├─ XRHand left / right
├─ transient-pointer
└─ Three.js scene
        │
        ↓
INPUT NORMALIZATION
├─ reference-space transform
├─ smoothing
├─ velocity
├─ gesture features
└─ tracking-validity guard
        │
        ↓
CONTROL VOLUME ENGINE
├─ sphere
├─ box
├─ capsule / custom field later
├─ enter / stay / exit
├─ hysteresis
└─ local XYZ
        │
        ↓
CONTROL BUS
├─ raw diagnostics
├─ derived features
├─ state events
└─ performance macros
        │
        ↓
WebSocket / WSS
        │
        ↓
MAC BRIDGE
├─ session logger
├─ WebSocket receiver
├─ OSC encoder / router
└─ UDP OSC
        │
        ├─ Max / MSP
        ├─ TouchDesigner
        ├─ Ableton bridge
        ├─ Resolume
        └─ other OSC target
```

Recommended first stack:

```text
Vite
TypeScript
Three.js
WebXR Device API
WebXR Hand Input
osc-js
Node.js bridge
```

Three.js is responsible for rendering and scene organisation. Raw WebXR APIs remain the source of truth for viewer and joint poses so that framework-specific controller assumptions do not hide the data being tested.

---

# 4. Four proof demos

The project is intentionally split into four experiments. A later demo cannot claim success if the earlier capability it depends on has not passed.

## D00 — Sensor Scope

Purpose: establish exactly what Safari on the real Vision Pro exposes.

Visible output:

- both hands drawn as 25 joints;
- joint names selectable for inspection;
- live XYZ + quaternion + radius;
- head XYZ + quaternion;
- derived head yaw/pitch/roll;
- pinch distance;
- hand velocity;
- tracking-loss indicator;
- session recorder.

This demo does not make music. It is the instrumentation layer for every later experiment.

## D01 — Control Volumes

Purpose: prove that tracked joints can reliably enter, remain inside and leave spatial regions.

Scene:

- one sphere;
- one box;
- one thin plane-volume;
- visible index-tip and wrist cursors;
- event log.

Tests:

```text
index tip → sphere
wrist → box
left hand → one field
right hand → another field
```

Each volume reports:

```text
ENTER
STAY
EXIT
local XYZ
occupancy time
```

Hysteresis must prevent boundary flicker.

## D02 — Playground 2D → 3D

Purpose: determine whether a familiar two-dimensional music-control mapping gains expressive value from depth.

Three modes use the same musical mapping:

```text
A / SURFACE
x y only

B / DEPTH
x y + z as control depth / amount

C / VOLUME
x y z all participate in the mapping
```

The same musical material must be used in all three modes. The experiment evaluates whether `z` improves control rather than merely increasing parameter count.

Candidate mappings:

```text
X → rhythmic / spectral position
Y → texture / density
Z → intervention amount or spatial spread
pinch → hold / commit
velocity → transient energy
```

## D03 — Performance Control Loop

Purpose: connect spatial input to the Performance Control Model and demonstrate a short playable audiovisual system.

The performer should not manipulate dozens of raw joints. Spatial data is compressed into a small set of high-value variables such as:

```text
ENERGY
DENSITY
SPACE
TENSION
FOCUS
CONTROL_WEIGHT
```

The same gesture may behave differently under different system states.

Minimum state set:

```text
OPEN
BUILD
PEAK
BREAK
```

Minimum performance actions:

```text
ENTER
HOLD
ADD
REMOVE
RELEASE
RESET
```

Audio and visual systems read the same high-level state but do not need to perform identical 1:1 reactions.

A 60–90 second recorded performance is the final proof artifact for this phase.

---

# 5. OSC and transport model

The web client should expose two levels of output.

## Diagnostic stream

Used for logging and debugging, not for normal performance routing.

Example logical paths:

```text
/sp/head/position
/sp/head/rotation
/sp/hand/left/joint/index-tip/position
/sp/hand/right/joint/index-tip/position
/sp/hand/left/pinch
/sp/hand/right/pinch
```

## Performance stream

Stable, low-dimensional control interface:

```text
/sp/control/energy
/sp/control/density
/sp/control/space
/sp/control/tension
/sp/control/focus
/sp/control/weight
/sp/state/current
/sp/action/enter
/sp/action/hold
/sp/action/add
/sp/action/remove
/sp/action/release
/sp/action/reset
```

## Volume stream

```text
/sp/volume/<id>/enter
/sp/volume/<id>/exit
/sp/volume/<id>/xyz
/sp/volume/<id>/dwell
```

The browser connects through WebSocket/WSS. The Mac bridge converts messages to UDP OSC. Raw 25-joint data should be recordable, but the live OSC interface should default to derived features and state events.

---

# 6. Harness principle

Every experiment must be reproducible without rewriting the whole app.

The harness therefore contains:

```text
CAPABILITY PROBE
What APIs and features are actually granted?

SIGNAL MONITOR
What values are moving right now?

RECORDER
Can this session be saved as timestamped data?

REPLAY
Can the same input trace be replayed without wearing the headset?

VOLUME DEBUGGER
Why did ENTER / EXIT fire?

NETWORK MONITOR
What is WSS round-trip time and message rate?

OSC MONITOR
What exactly left the Mac bridge?

STATE MONITOR
What state and pending action does the performance system believe it is in?

RESET / PANIC
Can the system always return to a known condition?
```

Device sessions are evidence. A screenshot alone is not sufficient when the claim concerns tracking, latency or control behaviour.

---

# 7. Research method

Each demo follows the same loop:

```text
QUESTION
↓
IMPLEMENT MINIMUM PROBE
↓
RUN ON REAL DEVICE
↓
CAPTURE DATA + VIDEO + LOG
↓
PASS / REVISE / REJECT
↓
FREEZE WHAT WORKS
↓
NEXT DEMO
```

Every result must distinguish:

```text
SUPPORTED      platform/API fact
IMPLEMENTED    code exists
TESTED         test actually executed
PASSED         acceptance criteria met
PROVISIONAL    useful working hypothesis
REJECTED       tested and not retained
```

`IMPLEMENTED` must never be used as a synonym for `PASSED`.

---

# 8. Relationship to the Performance Control Model

Spatial tracking increases available input dimensions, but the parent theory argues that more inputs do not automatically create a better instrument.

Spatial Playground therefore tests three propositions:

1. **Dimensional compression:** many tracked joints can be reduced to a small number of meaningful performance variables.
2. **State-dependent mapping:** the meaning of an action can depend on the current musical/visual state rather than remaining a fixed input-effect mapping.
3. **Controllability through spatial boundaries:** enter/exit, distance, depth and direction can provide reversible and observable control structures that are difficult to express with ordinary 2D controls.

The research is successful only if the spatial version becomes more playable or more expressive under controlled comparison, not merely more technologically complex.

---

# 9. Repository structure

```text
research/performance-control-model/
  README.md
  AGENT-HANDOFF.md
  REFERENCES.md
  experiments/
    nfi-p3d-harness/
    spatial-playground-webxr/
      README.md
      TASKBOOK.md
      HARNESS.md
      ACCEPTANCE.md
      REFERENCES.md
      A-SHEET.md
      web/                 # implementation target
      bridge/              # Mac WSS → UDP OSC target
      sessions/            # ignored/generated runtime captures
      reports/             # experiment evidence
      captures/            # screenshots / short proof media
```

This experiment remains under `research/performance-control-model/experiments/` because its purpose is to test a control model. If it later becomes an autonomous artwork or public product, a separate public-facing work entry can be created while this research record remains canonical.

---

# 10. First implementation decision

Do not start by designing a polished instrument.

The first implementation target is **D00 Sensor Scope** plus a Mac bridge handshake. It must answer only these questions:

```text
Can Vision Pro Safari enter immersive WebXR reliably?
Can hand-tracking permission be granted?
Do both hands expose the expected 25 joints?
Can joint poses be visualised and recorded?
Can viewer/head position and orientation be recorded?
Can head yaw/pitch/roll be derived?
Can the browser reach the Mac over secure WebSocket?
Can the Mac forward one test value as UDP OSC?
```

Only after these facts are captured on the real device should D01 Control Volumes be unlocked.
