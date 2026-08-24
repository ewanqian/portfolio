# Performance Control Model — Research Map

**Status:** canonical research map  
**Updated:** 2026-08-24  
**Parent:** GitHub Issue #59

This document is intentionally self-contained. It defines how the current performance-system research is grouped so that related ideas do not become isolated projects.

## 1. One parent research, not many disconnected projects

The parent question is:

> How can a complex audiovisual performance system be prepared, observed and controlled through a small number of reliable human decisions?

All current work belongs to one parent research line:

```text
PERFORMANCE CONTROL MODEL
│
├─ R1 Runtime & Temporal Control
├─ R2 Spatial / Alternative Input Control
└─ R3 Control Fundamentals

Applications / validation surfaces
├─ No Further Input Required
├─ Personal A/V Instrument / workshops
└─ future stage / large-visual / lighting systems
```

An application can have its own artwork or event identity, but it should not duplicate the underlying control research.

---

# R1 — Runtime & Temporal Control

This is the current central engineering/research track.

Merge the following previously separate ideas here:

- quantization;
- sequencer;
- electronic-music structure;
- control theory applied to electronic-music performance;
- clips / capsules;
- multi-layer arrangement;
- state;
- Web Audio scheduling;
- generative / AI-assisted musical structures;
- performer UI vs audience output;
- browser-native performance runtime;
- program architecture, replay, logging and QA.

Canonical chain:

```text
ASSET
↓
CAPSULE / CELL
↓
CLIP
↓
SEQUENCE
↓
LAYER
↓
STATE
↓
SHOW
```

Core runtime:

```text
Transport / Clock
        │
        ├─ Quantization
        ├─ Sequencers
        ├─ Layer State
        ├─ Pending Transitions
        └─ Safety / Reset
                │
                ↓
             Control Bus
          ↙               ↘
     Web Audio          WebGL / Three.js
```

The runtime should remain input-agnostic. Keyboard, touch, MIDI, WebXR and external control are adapters rather than separate instruments.

### Current hypothesis

A reliable live system becomes more playable when detailed composition is moved into pre-authored or constrained structures, while the performer controls higher-level actions such as:

```text
ENTER
ADD
REMOVE
HOLD
RELEASE
ENERGY
DENSITY
SPACE
TENSION
```

### Current implementation target

Build the runtime in stages:

```text
v0.8  Event → audiovisual capsule
v0.9  8-layer sequencer
v1.0  state + macro performance control
v1.1  spatial input adapter
v1.2  OSC / MIDI / external show control
```

These are research milestones, not six separate codebases.

---

# R2 — Spatial / Alternative Input Control

Canonical experiment: `experiments/spatial-playground-webxr/` / Issue #60.

This track studies how higher-dimensional input can be compressed into useful performance control.

Includes:

- Apple Vision Pro;
- WebXR hand tracking;
- head pose;
- 3D control volumes;
- gesture-derived features;
- WebSocket → Mac bridge → OSC;
- comparison of 2D vs 3D control;
- future controllers and sensors.

Canonical translation:

```text
RAW INPUT
↓
DERIVED FEATURE
↓
CONTROL PRIMITIVE
↓
PERFORMANCE ACTION
↓
R1 RUNTIME
```

Example:

```text
25 joints × 2 hands
↓
pinch / velocity / distance / region occupancy
↓
ADD / REMOVE / DENSITY / SPACE
↓
8-layer performance runtime
```

Spatial input must not create a second musical engine. It controls R1.

---

# R3 — Control Fundamentals

This is a foundation / laboratory track, not a competing artwork.

Merge here:

- one button becoming a continuous signal;
- PWM as a way to understand continuous control from discrete switching;
- voltage / current / resistance basics when relevant;
- sensing and signal conditioning;
- smoothing;
- hysteresis;
- feedback;
- stability;
- observability;
- controllability;
- sampling / update rate;
- latency;
- control-loop intuition;
- physical circuit knowledge that helps explain software control structures.

The purpose is not to become an electronics curriculum. Every topic must answer:

> What does this concept let us design or debug in a performance system?

Example transfer:

```text
BUTTON
↓
ON / OFF
↓
TIME-DOMAIN PATTERN
↓
DUTY / RATE / ENVELOPE
↓
CONTINUOUS PERCEPTUAL CONTROL
```

This creates a bridge between electronics, control theory and audiovisual software without opening a separate research project for every concept.

---

# Applications / validation surfaces

## A. No Further Input Required

`v0.7` remains a preserved artwork/performance reference.

It is not the canonical runtime itself. It is one place where runtime ideas are tested:

- continuous musical ground;
- AUTO + manual intervention;
- shared clock;
- multiple visual behaviours;
- keyboard fallback;
- transition from one-shot events toward capsules/layers/state.

New reusable runtime features should live under the parent research first, then be adopted by the artwork when they are useful.

## B. Personal A/V Instrument / workshop

The workshop is a teaching and novice-validation surface.

It tests whether the same model can be reduced to:

```text
Input
→ State
→ Controlled Output
→ Feedback
```

without requiring the participant to understand the full runtime.

## C. Large visual / stage / lighting output

Large-format visual, mapping and lighting are output and show-control research surfaces.

They should read the same state/control bus rather than inventing independent timing logic.

Raw note retained for later clarification: `豆瓣的大视觉 / 大视觉方向`.

---

# 2. Attention-management rule

A new idea is **not** a new project unless it has all three:

1. a distinct research question;
2. a distinct validation method;
3. an implementation that cannot reasonably live inside R1/R2/R3.

Otherwise classify it as:

```text
CONCEPT
EXPERIMENT
MODULE
APPLICATION
HYGIENE
```

instead of creating another parent directory or Issue.

---

# 3. Daily work rule

Every daily progress note must contain:

```text
ONE ACTIVE RESEARCH TASK
MAX TWO HYGIENE TASKS
ONE EVIDENCE / RESULT
PARKING LOT
```

## Active Research Task

Only one task can be marked `ACTIVE` per day inside this research line.

It must change knowledge or capability, for example:

- prove quantized capsule scheduling;
- compare 2D and 3D control;
- implement an 8-layer sequencer;
- test state-dependent mapping.

## Hygiene Tasks

Maximum two. Examples:

- fix broken route;
- remove console error;
- rename inconsistent file;
- add source citation;
- preserve v0.7 snapshot;
- update dependency;
- record device-test evidence.

Hygiene keeps the laboratory usable but must not become the day's research identity.

## Evidence / Result

At least one concrete artifact:

- commit;
- trace;
- recording;
- JSON session;
- screenshot;
- test result;
- written conclusion;
- rejected hypothesis.

## Parking Lot

New ideas go here first. They do not automatically interrupt the active task.

---

# 4. Current priority order

As of 2026-08-24:

```text
P0  R1 — Runtime / quantization / capsule / sequencer
P1  R2 — WebXR Sensor Scope and control adapter
P2  R3 — control/electronics fundamentals as needed by R1/R2
P3  extended show output / large visual / lighting integration
```

R2 can continue its sensor harness, but the next artistic proof depends on R1 becoming musically reliable.

---

# 5. Canonical rule

When an idea touches several topics, first ask:

```text
Does it change TIME / MUSIC STRUCTURE? → R1
Does it change HOW HUMAN INPUT ENTERS? → R2
Does it explain SIGNAL / FEEDBACK / CONTROL BASICS? → R3
Does it only apply the system to a work/event? → Application
Does it only keep the repo/system clean? → Hygiene
```

This map is the default classification rule for future daily updates and agent handoffs.
