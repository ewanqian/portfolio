# Performance Control Model — 2026-08-24 / Round 13

## ACTIVE QUESTION

Can the Clip-first performance surface become a full-screen generative control field rather than a bank of discrete buttons, while preserving low-error control and direct musical response?

## CORRECTION

Round 12 improved automatic filtering and arrangement, but the performance surface still behaved mainly as:

```text
16 BUTTONS
→ trigger 16 clips
```

That preserves directness but underuses the richer spatial interaction already developed in No Further Input Required / Playground research.

The useful prior rule is:

```text
pointer path
→ velocity / curvature / dwell / repetition
→ process energy / topology
→ autonomous behaviour continues after release
```

The pointer should not directly leash an object.

## D5 v10 — FULLSCREEN CONTROL FIELD

### Performance surface

The entire viewport is now the instrument.

```text
FULL SCREEN
└─ 4 × 4 MATERIAL CONTROL FIELDS
   ├─ 8 structured clips
   └─ 8 capsule / FX clips
```

The previous bottom 16-pad deck is removed from PERFORM.

Each region is simultaneously:

1. a direct clip trigger;
2. an XY continuous controller for that material;
3. a gesture sensor;
4. a visual feedback field.

## UNIFIED INPUT CONTRACT

```text
ZONE TAP / KEY
→ trigger complete clip

DRAG X
→ material-specific continuous parameter 1

DRAG Y
→ material-specific continuous parameter 2

DRAG VELOCITY
→ process energy / micro-event intensity

PATH CURVATURE
→ topology / branching / rotational disturbance

LONG HOLD
→ DEEP / sustain / memory

RELEASE
→ continuous input stops, autonomous process and residue continue
```

Keyboard arrows control the exact same selected XY field:

```text
ARROWS
→ coarse XY nudge

SHIFT + ARROWS
→ fine XY nudge

ENTER
→ retrigger selected material
```

This makes keyboard control a precision fallback rather than a second architecture.

## MATERIAL-SPECIFIC XY MAPPINGS

Examples:

```text
A ROUTE       X BRANCH      Y PULSE
S FIELD       X WIDTH       Y PRESSURE
D ORBIT       X RADIUS      Y SPEED
F REWIND      X DEPTH       Y REVERSE
J CELLS       X SPREAD      Y DENSITY
K PARTITION   X SPLIT       Y BLOCKS
L SCAN        X POSITION    Y SHARPNESS
; DROP        X SPREAD      Y WEIGHT
```

FX regions also expose meaningful continuous controls rather than generic X/Y labels.

## AUDIO CONTROL

Each material owns a continuous audio bus:

```text
clip voices
→ material filter
→ material pan
→ material gain
→ master safety bus
```

The XY / hold state changes that bus in real time.

This allows dragging after a Clip is launched to affect its current sonic state rather than only the next trigger.

Fast gestures can inject small material-specific accents. Long hold introduces a low-level DEEP voice which is released when the gesture ends.

## VISUAL CONTROL

Long-form Clip identity remains primary.

The active visual behaviour reads the current material control state continuously.

Examples:

- PARTITION: X changes split count; Y changes block density; long hold introduces persistent sliced/stutter geometry.
- ORBIT: X changes radius; Y changes ring count; gesture velocity changes angular motion.
- FIELD: X changes spatial deformation; Y changes line/density pressure.
- ROUTE: X changes branching; Y changes path amplitude/pulse.

The process does not disappear when the pointer is released. Input parameters slowly relax toward autonomous drifting targets.

## CONTROL-THEORY INTERPRETATION

The performance interface now separates two time scales:

```text
DISCRETE INTENT
clip trigger / material selection

CONTINUOUS INTERVENTION
XY / velocity / curvature / dwell
```

Both enter the same guarded runtime.

This is a better bridge between Touch:waves-like direct triggering and Playground/WebXR continuous spatial control.

## SAFETY PRESERVED

Round 12 safety remains conceptually intact:

- shared BPM and transport;
- quantized clip body;
- material-specific immediate response;
- maximum active clips;
- role / spectral occupancy budgets;
- AUTO ASSIST / DRIVE;
- master dynamics protection;
- PANIC.

Continuous control changes material state but does not bypass the clip-launch safety layer.

## VISION PRO BRIDGE

Do not build a separate XR music system.

The v10 contract can be lifted directly:

```text
2D REGION XY
→ 3D CONTROL VOLUME XYZ

pointer velocity
→ hand velocity

long hold / dwell
→ spatial dwell / pinch hold

curvature
→ hand-path curvature

selected material
→ selected spatial field
```

The runtime and Clip library remain the same.

## STATUS

```text
D5 v10 fullscreen control field   IMPLEMENTED / USER TEST PENDING
D5 v9 auto conductor              CONTROL / SAFETY BASELINE
D5 v8 clip-first                  CLIP CONTENT BASELINE
Vision Pro                        HOLD UNTIL v10 INTERACTION TEST
```

## TEST GATE

1. Tap K and drag inside K field while its 5.4-second phrase runs.
2. Check whether X/Y changes are perceptible without turning into literal cursor-following.
3. Hold and drag K long enough to enter DEEP; release and confirm the autonomous visual process remains.
4. Select K and use arrow keys; compare coarse arrow vs Shift+arrow fine control.
5. Test ORBIT / FIELD / ROUTE to judge whether material-specific XY mappings feel genuinely different.
6. Turn GUIDE OFF and verify the screen still reads as a performance rather than a control UI.
7. Turn AUTO ASSIST / DRIVE on while manually performing gestures and verify the system does not fight the performer.

## NEXT GATE

Do not add more gesture types yet.

First decide whether the combination below is sufficient:

```text
TRIGGER
+
XY
+
VELOCITY
+
CURVATURE
+
HOLD
+
AUTONOMOUS RESIDUE
```

If it is, this becomes the canonical 2D control adapter for the later WebXR version.