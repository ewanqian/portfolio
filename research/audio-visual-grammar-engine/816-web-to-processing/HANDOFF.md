# 816 Web → Local Processing Handoff

Status: working implementation brief
Date: 2026-08-25

## 0. Goal

Do **not** copy the webpage as pixels, DOM, cards, or decorative assets.

Translate the webpage / reference logic into a Processing runtime by preserving:

- hierarchy;
- rhythm;
- spatial relation;
- state transitions;
- input → mapping → behavior;
- accumulation / decay / residue;
- the difference between stable structure and transient event.

The target is a **performable visual system**, not a webpage screenshot rendered in Java.

## 1. Translation rule

Use this chain for every source feature:

```text
SOURCE FEATURE
→ VISUAL ROLE
→ DRIVER
→ BEHAVIOR
→ PROCESSING PRIMITIVE
→ STATE / TRANSITION
```

Example:

```text
bright edge light
→ edge pressure
→ stereo bias / hit
→ one-frame flash + exponential decay
→ line / glow band / field brightness
→ PRESSURE_CHAMBER
```

This follows the existing Audio Visual Grammar Engine rule: **reproduce behavior, not assets**.

## 2. Shared control data

Keep renderer-specific code downstream of a normalized control bus.

```text
energy       0..1
pressure     0..1
tension      0..1
density      0..1
space        0..1
memory       0..1
hit          0..1 transient
direction   -1..1
stereoBias  -1..1
sizzle       0..1
```

Raw audio, BPM, MIDI, pointer, keyboard, replay data, and autonomous score all map into this bus first.

Do not connect raw FFT bins directly to geometry.

## 3. Eight grammar states

These are not eight unrelated effects. They are eight views of the same control system.

### 1 — FLOWCHAIN

Role: directional motion + data flow.

Behavior:

- agents move through a coherent vector field;
- density grows with pressure;
- direction biases the field, not object position;
- event hits locally bend trajectories;
- system continues after input stops.

Processing primitives:

- indexed agents;
- short line segments;
- curl / simplex-like field;
- sparse node links;
- bounded trail lifetime.

Avoid:

- random particle soup;
- full-screen equal-density fill;
- mouse = particle position.

### 2 — RING_WAVE

Role: event timing made spatial.

Behavior:

- exact hit creates a ring at the hit frame;
- ring expands, thins, and decays;
- stronger pressure changes radius / ring count / deformation;
- multiple recent rings may coexist as a short memory.

Processing primitives:

- arcs;
- elliptical rings;
- polar points;
- radial spokes.

### 3 — SCAR_FLASH

Role: directional hit / cut / interruption.

Behavior:

- a hit creates a line or broken scar with **no anticipation**;
- birth is immediate, decay is short;
- direction controls orientation / placement;
- repeated hits build a phrase, not an explosion.

Processing primitives:

- line strips;
- polyline fracture;
- one-frame white field / edge accent;
- short alpha decay.

### 4 — RESIDUE_FIELD

Role: previous events remain as weak bias.

Behavior:

- selected traces survive;
- new motion is slightly attracted / repelled by residue;
- memory grows through repeated similar actions;
- residue decays slowly enough to make the system history-dependent.

Processing primitives:

- persistent points;
- faded curves;
- attractor list;
- low-alpha history buffer implemented as state, not framebuffer smear.

### 5 — SIZZLE_GRAIN

Role: high-frequency activity / microscopic agitation.

Behavior:

- high / sizzle changes local micro-motion and fragmentation;
- macro composition stays stable;
- use small-scale instability as material, not global camera shake.

Processing primitives:

- point flicker;
- short line jitter;
- small-radius displacement;
- sparse scan / spark structures.

### 6 — PRESSURE_CHAMBER

Role: large-scale tension and asymmetric pressure.

Behavior:

- left / right edge fields respond asymmetrically;
- raw pressure changes inward compression;
- high tension reduces empty space;
- release restores space gradually.

Processing primitives:

- edge bands;
- perspective planes;
- field brightness;
- inward-moving line curtains.

### 7 — SCREEN_POINTS

Role: readable spatial score / quantized structure.

Behavior:

- points live on an explicit grid / topology;
- density is controlled, not random;
- hits activate cells or neighborhoods;
- rows / columns / diagonals can carry phrases.

Processing primitives:

- indexed point matrix;
- adjacency lines;
- cell activation envelope;
- optional key / MIDI mapping.

### 8 — CHROMA_STRAND

Role: one coherent moving strand instead of many independent objects.

Behavior:

- one or several strands carry energy through the frame;
- direction and tension change curvature;
- hit creates a kink / pulse traveling along the strand;
- strand remains legible at low density.

Processing primitives:

- bezier / Catmull-like sampled curve;
- polyline ribbon;
- traveling pulse;
- depth offset in P3D.

## 4. Motion design rules

The visual system should feel designed even when nothing dramatic happens.

### Structure before effects

Every state needs:

1. one dominant spatial rule;
2. one secondary rhythm;
3. one transient response;
4. one decay / residue behavior;
5. intentional negative space.

### Timing hierarchy

Use at least three timescales:

```text
FAST     1–4 frames        exact hit / flash / cut
MEDIUM   0.2–2 sec         expansion / bend / settle
SLOW     4–30 sec          field drift / memory / section change
```

Do not make all parameters oscillate continuously.

### Input semantics

Preferred:

```text
input
→ impulse / velocity / density / topology / timing
→ autonomous behavior continues
```

Avoid:

```text
mouse position
→ object position
```

### Transition

State change is a designed event:

- 0.8–1.5 s crossfade or structural morph;
- pre-cue optional;
- keep selected residue across states;
- do not hard cut unless the score explicitly asks for HIT / BLACKOUT.

## 5. Performance surface

Initial controls:

```text
1–8       select grammar state
SPACE     inject exact hit
A         AUTO state cycle
H         HOLD current state
R         reset runtime / clear residue
S         save frame
mouse     inject directional disturbance, never direct dragging
```

Future inputs:

- MIDI / BPM;
- OSC;
- audio feature JSON;
- replay fixtures;
- 36-key keyboard topology.

## 6. Variant strategy

Do not polish one sketch forever.

For each grammar state, generate 3 variants with one changed structural assumption only.

Example:

```text
FLOWCHAIN-A  parallel corridor flow
FLOWCHAIN-B  spiral field
FLOWCHAIN-C  two-attractor crossing field
```

Then run them and delete weak versions.

Target loop:

```text
8 grammars
→ 2–3 variants each
→ run at fullscreen
→ compare with same control data
→ keep / mute / delete
→ select 4–6 strongest behaviors
→ integrate into performance runtime
```

## 7. Acceptance test

A state passes only if:

- it is visually readable in a still frame;
- motion adds information rather than decoration;
- an exact hit is visible at the correct moment;
- input changes a system variable, not just a coordinate;
- it still behaves when user stops touching it;
- it has at least one quiet / sparse condition;
- a second state can inherit residue without looking broken;
- it can run for 2 minutes without obvious repetitive collapse.

## 8. First implementation

The first runnable sketch is:

`Processing816Grammar/Processing816Grammar.pde`

It is intentionally dependency-free Processing 4 / Java mode and provides:

- P3D renderer;
- 104 BPM internal transport;
- 8 grammar states;
- normalized control bus;
- transient hit envelope;
- state crossfade;
- residue memory;
- keyboard performance controls;
- pointer-as-impulse behavior.

Treat this as a harness, not a final artwork.

## 9. Related project logic

This handoff is compatible with the existing Processing/OOP work in:

`research/performance-control-model/experiments/nfi-p3d-harness/PROCESSING-ARCHITECTURE.md`

If the sketch grows beyond one file, split responsibilities in the same way:

```text
Transport
→ InputController
→ ControlBus
→ StateController
→ VisualEngine
→ State Modules
```

Renderer does not own timing. Input does not draw. State modules do not redefine global controls.
