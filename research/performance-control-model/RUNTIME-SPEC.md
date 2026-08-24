# Browser Performance Runtime — Canonical Specification

**Parent research:** Performance Control Model / Issue #59  
**Track:** R1 Runtime & Temporal Control  
**Status:** specification / implementation target  
**Updated:** 2026-08-24

This document defines the shared runtime that future browser instruments, No Further Input Required performance versions, workshops and WebXR control experiments can use.

It is intentionally independent of any single artwork or input device.

---

# 1. Technical boundary

Core browser stack:

```text
Web Audio
+
Three.js / WebGL
+
WebSocket
```

Optional adapters:

```text
WebXR
Web MIDI where browser support allows it
OSC / MIDI through a bridge
AudioWorklet for tighter audio scheduling
WebGPU only when it gives a measured benefit
```

The runtime must not depend on Vision Pro, QWERTY, MIDI or one visual renderer to define its musical logic.

---

# 2. Runtime hierarchy

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

## Asset

A primitive resource or generator:

- audio sample;
- synth voice;
- event pattern;
- visual primitive;
- shader / geometry behaviour.

## Capsule / Cell

A short coherent audiovisual behaviour with an envelope:

```text
trigger
→ attack
→ development
→ transformation
→ decay / residue
```

Typical duration: sub-beat to several beats.

## Clip

A repeatable musical/behavioural unit, normally aligned to a musical grid.

Clip types:

```text
RENDERED CLIP
sample / rendered audio

STRUCTURAL CLIP
event data + sampler/synth
```

## Sequence

Orders, repeats and varies clips on a shared transport.

## Layer

A continuously available performance channel. Initial target: 8 layers.

Suggested roles:

```text
L1 PULSE / KICK
L2 LOW
L3 PERCUSSION
L4 HIGH RHYTHM
L5 TONAL
L6 TEXTURE
L7 NOISE / FX
L8 ATMOSPHERE
```

Each layer exposes a compact contract:

```text
ACTIVE
GAIN
FILTER / SPECTRAL POSITION
DENSITY
VARIATION
RELEASE
```

## State

A higher-level relationship between layers and macros.

Initial provisional state vocabulary:

```text
OPEN
BUILD
PEAK
BREAK
```

Initial macro vocabulary:

```text
ENERGY
DENSITY
SPACE
TENSION
```

These names are provisional; the architecture is not.

## Show

The long-form progression of states, layers, transitions and performer decisions.

---

# 3. Transport is authoritative

All time-critical modules read one transport.

Transport owns:

```text
BPM
BEAT
BAR
PHRASE
LOOP POSITION
QUANTIZATION GRID
PENDING TRANSITION
```

Web Audio scheduling should use `AudioContext.currentTime` as the time source rather than relying on `setTimeout()` or `setInterval()` as the musical clock.

Recommended first scheduler:

```text
AudioContext.currentTime
↓
short look-ahead scheduler
↓
pre-schedule upcoming events
↓
AudioBufferSource / synth voice
```

AudioWorklet is a later optimisation when tighter timing is needed and has been measured to matter.

---

# 4. Quantized intent

Human input expresses intent; the runtime decides the valid execution boundary.

```text
INPUT NOW
↓
REQUEST ACTION
↓
PENDING
↓
NEXT VALID BEAT / BAR / PHRASE
↓
EXECUTE
```

Examples:

```text
ADD L3
REMOVE L5
STATE PEAK
RELEASE ALL HIGH LAYERS
```

This protects musical continuity without requiring perfect performer timing.

The performer UI must expose pending actions so the system remains observable.

---

# 5. Control bus

Inputs must not directly manipulate implementation-specific objects.

Adapters translate raw input into stable semantic actions.

```text
QWERTY A
MIDI NOTE 36
TOUCH REGION 3
WEBXR VOLUME ENTER
↓
TRIGGER_CAPSULE_07
```

or:

```text
MIDI CC
POINTER DEPTH
TWO-HAND DISTANCE
↓
MACRO_DENSITY / MACRO_SPACE
```

Canonical action family:

```text
TRIGGER
ENTER
ADD
REMOVE
HOLD
RELEASE
RESET
SET_STATE
SET_MACRO
```

The engine should not care which adapter produced the action.

---

# 6. Audio engine

The audio engine supports two complementary strategies.

## A. Curated/rendered material

Use pre-rendered clips when timbral reliability and low CPU cost matter.

## B. Structural/generative material

Store musical structure as data:

```text
BPM
BAR LENGTH
EVENT TIME
PITCH / SAMPLE ID
VELOCITY
DURATION
ROLE
DENSITY
```

This allows:

- controlled variation;
- AI-assisted generation;
- density changes;
- transposition when appropriate;
- shared event data with visual systems;
- deterministic replay.

AI should preferably generate candidate components under constraints rather than final long-form music without audition.

Recommended loop:

```text
GENERATE
↓
AUDITION / TEST
↓
REJECT OR KEEP
↓
COMPATIBLE CLIP BANK
```

---

# 7. Visual engine

Visual output should read semantic state and event streams rather than only audio amplitude.

Prefer:

```text
MUSICAL EVENT / STATE
↓
VISUAL BEHAVIOUR
```

instead of only:

```text
AUDIO FFT
↓
PARAMETER MOVEMENT
```

Audio analysis remains useful as one source, but it should not be the sole definition of audiovisual connection.

Each visual behaviour should be able to expose:

```text
ATTACK
LIFETIME
TRANSFORMATION
DECAY
RESIDUE
PRIORITY
DENSITY COST
```

Multiple behaviours should be allowed to coexist without requiring hard scene switching.

---

# 8. Performer UI and audience output are separate

```text
AUTHORING UI
        │
        ↓
PERFORMANCE RUNTIME
        ↑
        │
PERFORMER UI
        │
        ↓
AUDIENCE OUTPUT
```

Performer UI prioritises:

- active layers;
- current state;
- pending transition;
- next boundary;
- macro values;
- reset/panic;
- input feedback.

Audience output prioritises the artwork and should not be forced to expose diagnostics.

---

# 9. Deployment modes

## Standalone

One browser/device runs input, audio and visual output.

Useful for:

- workshop;
- research demo;
- portable web instrument.

## Stage

A Mac/host is authoritative for transport and show state.

```text
INPUT DEVICE / VISION PRO
        │ WebSocket
        ↓
MAC PERFORMANCE HOST
├─ authoritative transport
├─ audio engine
├─ sequencer/state
├─ audience renderer
├─ OSC bridge
└─ MIDI / external show output
```

This reduces dependence on headset rendering performance and makes integration with external tools possible.

## Desktop

Keyboard, touch/pointer or supported Web MIDI adapters control the same runtime for development and rehearsal.

---

# 10. WebXR relationship

WebXR is an input/control adapter, not a separate performance engine.

Spatial pipeline:

```text
HEAD / HAND TRACKING
↓
DERIVED FEATURES
↓
CONTROL VOLUMES / GESTURE FEATURES
↓
SEMANTIC ACTIONS / MACROS
↓
CONTROL BUS
↓
RUNTIME
```

The spatial branch should prove that 3D adds expressive or controllable value compared with a 2D baseline.

---

# 11. No Further Input Required relationship

`No Further Input Required v0.7` remains a historical playable reference.

Its useful properties are inherited conceptually:

- continuous musical ground;
- shared BPM/clock;
- AUTO + sparse manual intervention;
- keyboard fallback;
- multiple visual behaviours in one runtime.

Its limitations define the next tests:

```text
v0.7
one-shot event emphasis
↓
v0.8
quantized audiovisual capsules
↓
v0.9
8-layer sequencer
↓
v1.0
state + macro performance control
```

The artwork may adopt runtime modules, but the runtime remains a reusable research infrastructure.

---

# 12. Reliability requirements

Minimum runtime safeguards:

```text
MAX AUDIO VOICES
MASTER LIMITER
MAX VISUAL DENSITY / COST
AUTO DECAY
PRIORITY
TRACKING / INPUT VALIDITY
RESET / PANIC
DETERMINISTIC SESSION LOGGING WHERE POSSIBLE
```

Required evaluation dimensions:

```text
STABILITY
CONTROLLABILITY
OBSERVABILITY
ROBUSTNESS
EXPRESSIVITY
DEPTH
```

A feature is not considered complete because code exists. Status must distinguish:

```text
SPECIFIED
IMPLEMENTED
TESTED
PASSED
REJECTED
```

---

# 13. Current implementation sequence

Do not build every adapter first.

Recommended order:

```text
P0-1  Transport + quantization proof
P0-2  4–8 reliable audiovisual capsules
P0-3  8-layer sequencer
P0-4  add/remove/hold/release + pending transitions
P0-5  performer diagnostics + reset
P1    connect Spatial Playground adapter
P2    external OSC/MIDI/show-control outputs
```

The first artistic proof is not “a button logs an event.” It is:

> A performer can use very few actions to make a short musical/audiovisual structure clearly build, thin out, hold and transition while the system remains stable.
