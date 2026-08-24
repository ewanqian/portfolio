# SP-WEBXR — Acceptance Criteria

These criteria prevent the project from treating visual novelty or code completion as proof of a usable performance system.

## 0. Status vocabulary

Use only:

```text
NOT STARTED
IMPLEMENTED / UNVERIFIED
TESTED / FAILED
TESTED / REVISE
PASSED
REJECTED
BLOCKED
```

A feature is not `PASSED` until the stated test has actually run.

---

# 1. Platform capability gate

## WebXR

PASS when the real Vision Pro can:

- open the project in Safari;
- enter `immersive-vr`;
- obtain the chosen reference space;
- complete a 5-minute session without an uncaught exception.

## Hand tracking

PASS when:

- permission is granted;
- left/right handedness can be distinguished;
- the expected 25 WebXR joint names are observable for a tracked hand;
- selected joint poses update while the hand moves;
- invalid/missing poses are handled without stale-value runaway or NaN propagation.

Do not define a universal tracking-accuracy threshold before real-device data exists.

## Viewer/head tracking

PASS when:

- position changes when the user translates the head;
- quaternion changes when the head rotates;
- derived yaw, pitch and roll respond in expected directions;
- angle unwrap does not cause obvious ±π discontinuity failures in the debug view.

---

# 2. Transport gate

## Connection

PASS when:

- secure WebSocket connects from Vision Pro to Mac-side bridge;
- reconnect works after deliberate interruption;
- socket state is visible to the performer/debugger.

## Rate

Required test streams:

```text
10 Hz / 60 s
30 Hz / 60 s
60 Hz / 60 s
```

30 Hz is the initial live-control acceptance baseline.

PASS at 30 Hz when:

- no sustained sender queue growth occurs;
- sequence gaps are counted;
- the receiver does not silently reorder data;
- the bridge continues to forward OSC for the full run.

60 Hz may be retained only if it is stable and produces a meaningful control benefit.

## Round trip

Use ping/pong RTT rather than comparing unsynchronised device clocks.

Initial targets:

```text
median RTT   < 50 ms     preferred live target
p95 RTT      < 100 ms    preferred live target
```

If these targets are missed, record the actual values and test whether the performance mapping remains usable before rejecting the entire architecture.

---

# 3. Control-volume gate

For each volume type:

## Crossing consistency

Run 10 slow deliberate crossings and 10 fast deliberate crossings.

PASS when each valid crossing produces:

```text
1 ENTER
0 or more STAY
1 EXIT
```

No duplicate ENTER while already inside. No duplicate EXIT while already outside.

## Boundary chatter

Hold the tracked joint close to the boundary for 10 seconds.

PASS when hysteresis prevents rapid uncontrolled ENTER/EXIT alternation.

If chatter occurs, report event count and revise the spatial thresholds.

## Tracking loss

Hide/occlude the hand while inside a volume.

PASS when the system enters a documented safe state rather than maintaining an indefinite stale value.

## Local XYZ

PASS when normalized local coordinates:

- stay within the documented range or are explicitly clamped;
- move in the expected axis directions;
- are reproducible under replay.

---

# 4. 2D → 3D comparison gate

The test is comparative, not promotional.

All modes use identical content and target task.

## Modes

```text
SURFACE
DEPTH
VOLUME
```

Record for each:

```text
predictability 1..5
expressivity 1..5
effort 1..5
accidental exits
reset count
task completion
short qualitative note
```

A 3D mode is accepted as an improvement only when at least one benefit is clear without causing unacceptable loss elsewhere.

Examples of valid benefit:

- stronger expressive range with similar predictability;
- clearer intervention depth;
- easier transition from inactive to active control;
- better reversible control;
- less mode switching.

If the 2D mode remains better, that result is valid and should be preserved.

---

# 5. Performance Control Model gate

D03 is reviewed on six dimensions already used by the parent research.

## Stability

Can the system remain usable under continuous input?

PASS indicators:

- no uncontrolled permanent density/gain accumulation;
- control values remain bounded;
- tracking/network failure has safe behaviour;
- 90-second run completes without restart.

## Controllability

Can the performer intentionally move both toward and away from complexity?

Required proof:

```text
low → build → high → release → low
```

The system fails this gate if adding is easy but removing/releasing is not.

## Observability

Can the performer know:

```text
current state
active control volume
current high-level macros
pending transition if any
network status
tracking status
```

The final audience view may hide diagnostics; the operator/debug view may not.

## Robustness

Test:

- early action;
- late action;
- repeated action;
- brief tracking loss;
- one network interruption;
- one intentionally poor musical/spatial choice.

PASS when the system can continue or recover without a full app restart.

## Expressivity

PASS when a small control vocabulary can produce materially different performance trajectories rather than cosmetic parameter variation.

Evidence should be audible/visible in recorded A/B excerpts.

## Depth

For this phase, depth does not mean infinite complexity.

Minimum proof:

- one 5-minute exploratory session;
- more than one useful strategy for moving between low/high activity;
- no requirement to learn dozens of independent joint mappings.

---

# 6. Human test gate

Minimum:

```text
2 non-implementer participants
2-minute instruction maximum
5-minute use each
```

Record:

- what they thought each control did;
- whether they could intentionally reduce activity;
- whether they could recover from over-control;
- which spatial action felt most predictable;
- which action felt most expressive;
- which action should be removed.

The project should prefer deleting a confusing control over documenting a complex workaround.

---

# 7. Evidence gate

Every tested stage must produce:

```text
report
runtime/build identity
commit sha
device / system version
test procedure
result
known limitations
PASS / REVISE / REJECT
```

For tracking/control claims also require at least one of:

```text
session data capture
screen recording
external video
OSC receiver log
```

A screenshot alone cannot prove temporal behaviour.

---

# 8. Final phase acceptance

The first research phase is complete only when all of the following exist:

```text
D00 Sensor Scope           PASSED
WSS → OSC bridge           PASSED
D01 Control Volumes        PASSED or documented REJECTED variant
D02 2D→3D comparison       TESTED
D03 performance demo       PASSED
60–90 s proof performance  captured
5 min exploratory session  captured/logged
human validation           executed
research summary           written
```

The outcome may conclude that some spatial techniques are not worth keeping. Negative findings are part of the research result.
