# NFI-P3D-HARNESS — Processing OOP Architecture

> This file defines **what classes exist, what they are allowed to know, and what they are forbidden to control**.

---

# 1. Architectural goal

The Processing implementation is not a monolithic sketch.

Target model:

```text
Transport
    │
    ├── StructuralScore
    │
    ├── AudioObserver
    │
    └── InputController
              │
              ↓
          ControlBus
              │
       ┌──────┴──────┐
       ↓             ↓
 StateController   AudioEngine
       │
       ↓
   VisualEngine
       │
       ↓
  P3D State Modules
```

The renderer must not own musical timing.  
The audio engine must not own global dramaturgy.  
Individual states must not redefine keyboard topology.  
Input code must not directly draw geometry.

---

# 2. Proposed sketch structure

```text
NFI_Performance_P3D/
├── NFI_Performance_P3D.pde
├── AppConfig.pde
├── Transport.pde
├── StructuralScore.pde
├── ScoreSection.pde
├── ControlBus.pde
├── InputController.pde
├── KeyboardMap.pde
├── KeyDescriptor.pde
├── PerformanceEvent.pde
├── EventBus.pde
├── StateController.pde
├── PerformanceState.pde
├── AudioEngine.pde
├── ProcessingSoundEngine.pde
├── AudioObserver.pde
├── VisualEngine.pde
├── CameraController.pde
├── HarnessMode.pde
├── ReplayController.pde
├── CaptureController.pde
├── State01Route.pde
├── State02Field.pde
├── State03Orbit.pde
├── State04Rewind.pde
├── State05Cells.pde
├── State06Partition.pde
└── data/
    ├── replay/
    ├── score/
    ├── audio-analysis/
    └── fixtures/
```

Local Codex may merge tiny value-object tabs if Processing tab ergonomics require it, but responsibilities must remain separated.

---

# 3. Core value objects

## 3.1 `KeyDescriptor`

Canonical fields:

```java
class KeyDescriptor {
  char key;
  int row;
  int index;
  int rowLength;

  float nx;       // normalized physical-keyboard x 0..1
  float ny;       // normalized row y 0..1
  int midiNote;
  float energy;
}
```

Rules:

- constructed once at startup;
- immutable after construction where practical;
- physical topology source of truth;
- state modules may **transform** descriptor coordinates into state-space but may not rewrite the descriptor.

## 3.2 `PerformanceEvent`

Suggested shape:

```java
class PerformanceEvent {
  long id;
  EventType type;
  double musicalTime;
  long wallTimeMs;

  KeyDescriptor key;

  float value;
  float energy;
  float x;
  float y;
  float z;

  int source;     // HUMAN / AUTO / REPLAY / AUDIO
  int stateId;
  int seed;
}
```

Do not store arbitrary visual objects inside PerformanceEvent.

---

# 4. `Transport`

## Responsibility

The authoritative musical time model.

Must expose at least:

```text
bpm
beatsPerBar
subdivision
absoluteStep
beat
bar
phaseInBeat
phaseInBar
phaseInSection
running
```

Default:

```text
BPM = 104
4 beats / bar
4 subdivisions / beat
= 16th-note internal step
```

Suggested API:

```java
class Transport {
  void start();
  void stop();
  void reset();
  void update(long nowNanos);

  long step();
  long bar();
  int beatInBar();
  int stepInBar();

  double secondsPerBeat();
  double secondsPerStep();

  double nextStepTime();
  double nextBeatTime();
  double nextBarTime();

  boolean crossedStep();
  boolean crossedBeat();
  boolean crossedBar();
}
```

### Important

Do not make `frameCount` the musical clock.

For first implementation, `System.nanoTime()` / monotonic timing is preferred over `millis()` when useful.

The first goal is internal consistency, not sample-perfect DAW synchronization.

---

# 5. `StructuralScore`

## Responsibility

Describes macro / meso performance intention over musical time.

It does NOT draw.  
It does NOT play notes.  
It outputs target state variables.

Initial score vocabulary:

```text
OPEN
BUILD
HOLD
HIT
RELEASE
EMPTY
```

These names are implementation labels, not public theory.

Initial shared target vector:

```java
class ScoreTarget {
  float energy;
  float tension;
  float density;
  float space;
  float memory;
  float activity;
}
```

Example score fixture:

```text
bars 01–08  OPEN
energy   .20 → .30
tension  .10 → .20
density  .15 → .25
space    .85 → .75

bars 09–16  BUILD
energy   .35 → .70
tension  .25 → .75
density  .30 → .65
space    .70 → .45

bars 17–20 HOLD
bars 21    HIT
bars 22–26 RELEASE
bars 27–32 EMPTY / RETURN
```

Required behaviour:

- interpolate targets between section boundaries;
- allow `HOLD` to freeze score progression if requested by system state;
- allow test-time scale-up / fast-forward;
- expose current section name and next boundary.

---

# 6. `ControlBus`

## Responsibility

Single normalized communication layer between observations / score / input and outputs.

Initial fields:

```java
class ControlBus {
  float energy;
  float tension;
  float density;
  float space;
  float memory;

  float low;
  float mid;
  float high;
  float sizzle;
  float stereoBias;
  float silence;

  float hit;
  float motion;
  float direction;

  float humanActivity;
  float machineActivity;
}
```

Every field should normally remain in `0..1`, except intentionally signed values such as `stereoBias / direction` in `-1..1`.

### Rules

- no state module may create its own independent duplicate `energy` variable with different semantic meaning;
- transient values (`hit`) must decay;
- accumulated values must clamp;
- update order must be documented.

Suggested update order:

```text
1 ScoreTarget
2 AudioObserver
3 Human / Replay input
4 Constraint / smoothing
5 expose final ControlBus
```

Do not make raw FFT values directly equal visual parameters. Map / smooth / normalize first.

---

# 7. `InputController`

## Responsibility

Collect raw user intent and create semantic events.

First milestone only requires:

```text
keyboard
mouse disturbance
system commands
```

Keyboard command split:

### Performance keys

```text
1–0
Q–P
A–L
Z–M
```

### System keys

Must not collide with the 36-key performance surface. The exact bindings can be defined in AppConfig, but should include equivalents for:

```text
AUTO
HOLD
NEXT
PANIC / RESET
HUD
```

Rules:

- performance key press requests a quantized event;
- InputController does not draw;
- InputController does not directly manipulate P3D coordinates;
- mouse drag produces impulse / velocity / disturbance event, not `object.position = mouse`.

---

# 8. `KeyboardMap`

## Responsibility

Preserve physical QWERTY topology and provide reusable layout transforms.

Canonical rows:

```text
1234567890
QWERTYUIOP
ASDFGHJKL
ZXCVBNM
```

Required methods may include:

```java
KeyDescriptor find(char key);
ArrayList<KeyDescriptor> row(int rowIndex);
PVector flatPosition(KeyDescriptor key);
PVector ringPosition(KeyDescriptor key, float radius, float z);
PVector depthLanePosition(KeyDescriptor key, float depth);
```

Important: transforms live here or in dedicated mapping helpers, not duplicated ad hoc inside every state.

---

# 9. `EventBus`

## Responsibility

Store active and recent system events with finite lifetimes.

Needs:

```text
add
update / expire
query by type
query recent N
clear
```

History is important for REWIND / MEMORY states later.

Every event must have finite life or explicit persistence ownership.

---

# 10. `StateController`

## Responsibility

Own current visual / performance state and transition policy.

Must expose:

```text
currentState
previousState
pendingState
transitionProgress
stateStartBar
stateStartTime
```

Must support:

```text
manual NEXT
AUTO section request
HOLD
quantized transition request
```

### Key principle

A state change does not reset Transport.

### Future

StateController may use StructuralScore to decide **when transition is allowed**, but StructuralScore does not choose visual implementation details.

---

# 11. `PerformanceState` interface / abstract class

Recommended contract:

```java
abstract class PerformanceState {
  int id;
  String name;

  abstract void enter(StateContext ctx);
  abstract void update(StateContext ctx, float dt);
  abstract void render(StateContext ctx);
  abstract void onEvent(StateContext ctx, PerformanceEvent e);
  abstract void exit(StateContext ctx);

  void reset();
}
```

`StateContext` can expose read-only references to:

```text
Transport
ControlBus
KeyboardMap
EventBus
CameraController
AppConfig
```

Do not give states unrestricted access to rewrite global objects.

---

# 12. `VisualEngine`

## Responsibility

- calls active state update / render;
- manages transition render if needed;
- applies global background / safe HUD / debug overlays;
- coordinates CameraController;
- does not choose dramaturgy.

First milestone may render only diagnostic geometry / text.

---

# 13. `CameraController`

## Responsibility

Own canonical camera state:

```text
position
lookAt
yaw / pitch / roll if used
FOV / perspective
safe motion bounds
```

Suggested safety constraints for early experiments:

```text
camera angular deviation <= 12° normal
camera depth movement bounded
no continuous 360° orbit
no per-frame random camera motion
```

Camera responds to high-level `space / tension / hit`, not raw mouse position.

---

# 14. `AudioEngine` abstraction

Define an interface-like base even if Processing tabs do not enforce Java interfaces cleanly.

Desired API:

```java
abstract class AudioEngine {
  abstract void init();
  abstract void update(Transport transport, ControlBus bus);
  abstract void scheduleKey(PerformanceEvent e);
  abstract void scheduleBackground(Transport transport, ControlBus bus);
  abstract void panic();
  abstract void setMuted(boolean muted);
}
```

`ProcessingSoundEngine` first implementation should port the **roles**, not necessarily identical timbre:

```text
pad
bass
pluck / melodic gesture
gesture tone
kick
noise / hat
master safety
```

Harmony / motif identity should stay close to v0.7 until reviewer decides otherwise.

Document any deviations.

---

# 15. `AudioObserver`

Not required to be complete in R001.

When implemented, responsibilities:

```text
amplitude / envelope
FFT bands
onset / beat hint
silence
stereo bias if possible
```

Two separate conceptual streams:

```text
Structural Clock = Transport
Continuous Observation = AudioObserver
```

Never let amplitude substitute for section timing.

Offline analysis is allowed later for deterministic fast testing.

---

# 16. Harness classes

## `HarnessMode`

Modes:

```text
LIVE
FAST
REPLAY
CAPTURE
DIAGNOSTIC
```

## `ReplayController`

Loads deterministic scripted input:

```text
bar / beat / step
key
command
value
```

Example event representation:

```json
{"bar":3,"beat":1,"step":0,"type":"KEY","key":"Q"}
```

Replay must be scheduled against Transport, not wall-clock guessing.

## `CaptureController`

At minimum supports named screenshot moments.

Later may call external screen-recording script.

---

# 17. Initialization order

Recommended:

```text
settings() → P3D
setup()
  AppConfig
  KeyboardMap
  Transport
  StructuralScore
  ControlBus
  EventBus
  AudioEngine
  AudioObserver
  CameraController
  StateController
  ReplayController
  CaptureController
  VisualEngine
```

Then:

```text
draw()
  timing update
  transport update
  replay/input dispatch
  score update
  observer update
  control bus resolve
  audio engine update
  state update
  render
  capture/debug
```

The exact order may be tuned, but it must be deterministic and documented.

---

# 18. Non-goals for first milestone

Do not implement yet:

- MIDI learn;
- OSC;
- lighting protocol;
- webcam;
- gesture classification;
- AI runtime;
- post-processing stack;
- shader framework;
- complex asset manager;
- GUI editor;
- universal plugin architecture;
- final six-state visuals.

The first milestone is a reliable instrument core and harness.
