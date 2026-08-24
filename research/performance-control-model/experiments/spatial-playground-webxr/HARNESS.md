# SP-WEBXR — Harness Specification

The harness exists to make Vision Pro experiments measurable, replayable and safe to extend. It is not part of the final visual language.

## 1. Runtime modes

### `mock`

Desktop browser mode. Generates synthetic viewer and hand data so volume logic, UI, state machines and networking can be developed without Vision Pro.

Required controls:

```text
mouse / keyboard → move mock joint
number keys → choose tracked point
space → simulate pinch
R → record
P → replay
0 → reset
```

### `xr`

Real WebXR mode on Vision Pro. All capability claims must be validated here.

### `replay`

Loads a recorded XR session and feeds it through the same feature / volume / control pipeline. Replay must not bypass production logic.

---

# 2. Module boundaries

```text
XRSource
  ↓
PoseFrame
  ↓
FeatureExtractor
  ↓
VolumeEngine
  ↓
ControlBus
  ↓
StateEngine
  ↓
Transport
```

## XRSource

Owns:

- XR session lifecycle;
- reference space;
- input-source enumeration;
- viewer pose acquisition;
- hand-joint pose acquisition;
- tracking-validity flags.

Must not own musical mapping.

## PoseFrame

One immutable snapshot per sampled frame.

Suggested structure:

```ts
interface PoseFrame {
  t: number
  seq: number
  viewer?: ViewerPose
  hands: {
    left?: HandPose
    right?: HandPose
  }
}
```

## FeatureExtractor

Pure or near-pure functions where possible.

Input:

```text
PoseFrame + previous PoseFrame
```

Output:

```text
pinch distance
velocity
acceleration
two-hand distance
palm approximation
head euler angles
```

No OSC code inside feature extraction.

## VolumeEngine

Input:

```text
tracked point pose
volume definition
previous occupancy state
```

Output:

```text
ENTER / STAY / EXIT
local XYZ
dwell
distance to center
```

The volume engine must be deterministic under replay.

## ControlBus

Named internal signals. This is the only interface later performance mappings should consume.

Example:

```text
raw.left.indexTip.xyz
derived.left.pinch
volume.texture.xyz
volume.texture.enter
macro.energy
state.current
action.release
```

## StateEngine

Owns:

- current state;
- pending transition;
- reset / panic;
- later quantized execution.

Does not directly query WebXR.

## Transport

Owns:

- WebSocket/WSS;
- serialization / OSC packing;
- reconnect;
- sequence numbers;
- telemetry.

Does not decide artistic mapping.

---

# 3. Debug views

The harness must support these views without changing source code.

## CAPABILITIES

```text
navigator.xr exists
immersive-vr supported
hand-tracking requested
hand-tracking granted
reference space
inputSources count
left hand present
right hand present
transient pointer count
```

## HANDS

For each joint:

```text
name
position
quaternion
radius
valid / unavailable
```

Visual options:

```text
all joints
selected joint only
joint labels
bone lines
velocity vector
```

## HEAD

```text
position
quaternion
yaw
pitch
roll
forward vector
```

## VOLUMES

```text
id
tracked point
inside / outside
local XYZ
dwell
enter margin
exit margin
```

## NETWORK

```text
socket state
session id
sent messages
received pong
RTT
send rate
queue size
sequence gaps
last error
```

## CONTROL

```text
current macro values
current state
pending state
last action
panic/reset count
```

---

# 4. Recorder

The recorder must be available in XR and replay-capable later.

Minimum session header:

```json
{
  "project": "SP-WEBXR",
  "schemaVersion": 1,
  "buildId": "...",
  "mode": "xr",
  "deviceNote": "Apple Vision Pro",
  "startedAt": "ISO-8601",
  "referenceSpace": "local"
}
```

Minimum frame record:

```json
{
  "t": 1234.56,
  "seq": 123,
  "viewer": {},
  "hands": {},
  "features": {},
  "volumes": {},
  "state": {}
}
```

JSONL is preferred during early research because partial recordings remain readable after a crash.

Do not store personally identifying imagery. The research requires pose traces, not camera recordings from the headset.

---

# 5. Replay

Replay is mandatory because device time is scarce.

Replay requirements:

1. load a recorded session;
2. preserve original relative timing or allow fixed-speed playback;
3. feed frames into the same FeatureExtractor and VolumeEngine;
4. allow pause / seek / single-step;
5. optionally re-send resulting control data to the Mac bridge;
6. display `REPLAY`, never pretend it is live tracking.

Determinism test:

```text
same capture
+ same volume definitions
+ same thresholds
→ same ENTER/EXIT sequence
```

---

# 6. Control volume definition

Suggested serializable schema:

```json
{
  "id": "texture-A",
  "shape": "sphere",
  "position": [0.25, 1.2, -0.8],
  "rotation": [0, 0, 0, 1],
  "size": [0.25, 0.25, 0.25],
  "trackedPoint": "right:index-finger-tip",
  "enterMargin": 0.0,
  "exitMargin": 0.03,
  "enabled": true
}
```

The same schema should support boxes by interpreting `size` as half/full extents consistently and documenting the choice once.

## Hysteresis

Use different thresholds for entering and exiting.

Conceptually:

```text
outside → inside only after ENTER boundary
inside → outside only after EXIT boundary
```

Do not solve boundary chatter by arbitrary long debounce if spatial hysteresis can express the physical intention more clearly.

---

# 7. Signal rates

Not every signal needs XR render-frame frequency.

Recommended initial policy:

```text
XR render / tracking       native XR frame cadence
local visual feedback      every XR frame
raw recorder               up to XR cadence
performance continuous     30 Hz default
critical discrete events   immediate
network telemetry          1–2 Hz
```

60 Hz OSC should be tested, not assumed necessary.

---

# 8. OSC namespace

Use a stable root:

```text
/sp
```

## Raw / diagnostic

```text
/sp/raw/head/position
/sp/raw/head/rotation
/sp/raw/hand/left/joint/<joint>/position
/sp/raw/hand/right/joint/<joint>/position
```

Raw routes may be disabled during performance.

## Derived

```text
/sp/feature/left/pinch
/sp/feature/right/pinch
/sp/feature/left/velocity
/sp/feature/right/velocity
/sp/feature/twoHandDistance
/sp/feature/head/yawPitchRoll
```

## Volume

```text
/sp/volume/<id>/enter
/sp/volume/<id>/exit
/sp/volume/<id>/xyz
/sp/volume/<id>/dwell
```

## Performance

```text
/sp/control/energy
/sp/control/density
/sp/control/space
/sp/control/tension
/sp/control/focus
/sp/control/weight
/sp/state/current
/sp/state/pending
/sp/action/<name>
```

---

# 9. Mac bridge

For the fastest web-first implementation:

```text
Vision Pro Safari
  ↓ WSS
Node bridge on Mac
  ↓ UDP OSC
performance application
```

The bridge should be intentionally boring.

Required CLI output:

```text
listening address
connected client count
session id
incoming message rate
last sequence number
sequence gaps
OSC destination host/port
last OSC route
```

Required configuration:

```text
WSS host / port
TLS certificate paths if local TLS is used
OSC destination host
OSC destination port
logging on/off
```

Do not bury destination ports in source code.

---

# 10. Secure-context strategy

WebXR and hand APIs require a secure context. The implementation must document exactly how the Vision Pro loads the page and connects to the bridge.

Two supported deployment profiles:

## FAST RESEARCH

```text
public HTTPS static host
+
secure WSS endpoint / tunnel to Mac bridge
```

Use for capability tests when deployment speed matters more than offline independence.

## LIVE / LOCAL TARGET

```text
Mac serves HTTPS + WSS locally
Vision Pro trusts the certificate
local network only
```

Use after the interaction model proves valuable. Local/offline reliability should not block D00.

---

# 11. Safety / failure behaviour

Any tracking loss or transport failure must have explicit behaviour.

Defaults:

```text
joint unavailable
→ do not reuse stale pose indefinitely

hand disappears while inside volume
→ controlled EXIT / LOST according to tested policy

WSS disconnected
→ freeze or safely decay continuous control values
→ no uncontrolled accumulation

state unknown
→ RESET available
```

The final performance demo must include a visible and OSC-addressable panic/reset path.

---

# 12. Evidence naming

```text
sessions/W001-20260824-001.jsonl
reports/W001-report.md
captures/W003-volume-test-001.mp4
```

Each report includes:

```text
build id
commit sha
device / visionOS version
Safari version or relevant system version
network topology
test protocol
observed result
PASS / REVISE / REJECT
known limitations
next single question
```
