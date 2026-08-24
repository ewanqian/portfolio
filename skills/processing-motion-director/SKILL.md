---
name: processing-motion-director
description: Translate webpage, Blender, p5.js, image, motion, or live-visual references into runnable Processing visual grammar while preserving behavior, timing, topology, and performance control. Use for realtime AV prototypes, visual-system studies, and the 816 web-to-Processing workflow.
---

# Processing Motion Director

## Purpose

Build **runnable visual systems**, not imitations of screenshots.

When given a webpage, reference image, Blender scene, motion clip, p5.js sketch, or verbal visual direction, first identify the underlying behavior and only then choose Processing primitives.

Canonical translation:

```text
SOURCE FEATURE
→ VISUAL ROLE
→ DRIVER
→ BEHAVIOR
→ PROCESSING PRIMITIVE
→ STATE / TRANSITION
```

The core rule is:

> Reproduce behavior, not assets.

## 1. Read the source as a system

Before coding, extract only what affects behavior:

- hierarchy;
- topology;
- spatial rule;
- timing;
- repetition;
- density;
- negative space;
- event birth;
- decay;
- residue / memory;
- interaction mapping;
- transition logic;
- camera or field behavior;
- what remains autonomous after input stops.

Do not begin by listing colors, gradients, card styles, icons, or decorative motifs.

## 2. Produce a behavior table

For every major feature, define:

| Role | Driver | Behavior | Primitive | Timescale |
| --- | --- | --- | --- | --- |
| edge pressure | stereo / pressure | compress inward, release slowly | bands / lines | medium + slow |
| exact hit | onset / key | born same frame, short decay | ring / scar | fast |
| memory | event history | survives and biases later motion | points / attractors | slow |

If a feature cannot be expressed this way, it is probably decorative rather than structural.

## 3. Normalize inputs before drawing

Raw input must enter a shared control layer first.

Preferred normalized values:

```text
energy      0..1
pressure    0..1
tension     0..1
density     0..1
space       0..1
memory      0..1
hit         0..1 transient
direction  -1..1
stereoBias -1..1
sizzle      0..1
```

Possible sources:

- audio analysis;
- BPM / bars;
- keyboard;
- MIDI;
- OSC;
- pointer / touch;
- prerecorded fixture JSON;
- autonomous score.

Forbidden shortcut:

```text
raw FFT bin → arbitrary object scale
```

Map, smooth, constrain, and name the semantic role first.

## 4. Motion hierarchy

Every good state needs at least three timescales.

```text
FAST     1–4 frames        exact hit / flash / cut
MEDIUM   0.2–2 seconds     expansion / bend / settle
SLOW     4–30 seconds      field drift / memory / section change
```

Do not animate every parameter continuously.

A static frame must already have a clear composition. Motion should reveal structure, not rescue a weak composition.

## 5. One dominant rule per state

Each state or variant must have:

1. one dominant spatial rule;
2. one secondary rhythm;
3. one transient response;
4. one decay / residue behavior;
5. intentional negative space.

Examples of dominant rules:

- coherent vector corridor;
- radial expansion;
- indexed grid;
- two-attractor crossing field;
- edge compression chamber;
- one continuous strand;
- branching graph;
- layered depth slices.

Avoid combining flow field + reaction diffusion + particles + tunnel + type + camera shake simply because all are available.

## 6. Input should inject intent, not leash geometry

Preferred:

```text
input gesture
→ velocity / curvature / loop / crossing / dwell / hit
→ force / density / topology / timing / mutation
→ system continues after release
```

Avoid:

```text
mouse position → object position
```

Mouse or touch may create an attractor, vortex, impulse, temporary constraint, cut, or phrase. It should rarely drag the final object directly.

## 7. Preserve topology when useful

If the input surface has a learnable physical structure, preserve it across transformations.

For keyboard performance, for example:

```text
1234567890
QWERTYUIOP
ASDFGHJKL
ZXCVBNM
```

may become rows, arcs, rings, cells, mirrored bands, or partitions, but adjacency should remain learnable.

Motor memory is part of the instrument.

## 8. Transitions are part of the design

Default state transition:

- 0.8–1.5 seconds;
- structural morph or crossfade;
- selected residue survives;
- optional pre-cue;
- hard cut only for an explicit HIT / BLACKOUT / BREAK event.

A state should not reset the entire world unless reset itself is the concept.

## 9. Determinism and reproducibility

For exploration sketches:

- use an explicit seed;
- keep parameter values readable;
- isolate structural variables;
- make the same input fixture produce comparable variants;
- save frame / capture hooks early.

A beautiful accident that cannot be reproduced is not yet a reliable live-system component.

## 10. Variant generation

Do not polish the first result indefinitely.

Default exploration:

```text
1 grammar
→ 3 structural variants
→ same input / same transport
→ fullscreen run
→ keep / mute / delete
→ mutate only the strongest one
```

For a larger study:

```text
5–10 runnable sketches
× 3–10 parameter or structural variations
→ actual playback
→ deletion-first review
→ integrate 4–6 strongest behaviors
```

Change **one structural assumption** per variant whenever possible.

Good:

```text
FLOW-A parallel corridor
FLOW-B spiral field
FLOW-C crossing attractors
```

Weak:

```text
FLOW-A blue
FLOW-B red
FLOW-C purple
```

## 11. Processing implementation defaults

Use Processing 4 / Java mode first unless another renderer is explicitly required.

Prefer:

- `P2D` for dense flat graphic systems;
- `P3D` for depth, camera, strands, spatial fields;
- built-in primitives before dependencies;
- arrays / indexed agents for topology;
- explicit state objects rather than framebuffer smear when memory matters;
- `System.nanoTime()` or monotonic time logic when timing accuracy matters;
- BPM / bar transport independent from `frameCount`.

Do not add a library merely because it makes the code look sophisticated.

## 12. Architecture when the sketch grows

Start compact, then split responsibilities:

```text
Transport
→ InputController
→ ControlBus
→ StateController
→ VisualEngine
→ State Modules
```

Rules:

- renderer does not own musical time;
- input code does not draw;
- state modules do not redefine global controls;
- raw analysis does not bypass the control bus;
- visual modules may transform topology, not silently replace it.

## 13. Design-quality dials

Before generating variants, explicitly choose three dials from 1–10:

```text
STRUCTURAL_VARIANCE
MOTION_INTENSITY
VISUAL_DENSITY
```

For realtime AV work, a good default is:

```text
STRUCTURAL_VARIANCE  7
MOTION_INTENSITY     6
VISUAL_DENSITY       4
```

High motion does not imply high density.

## 14. Reference-code policy

External repositories may be used to learn:

- an algorithm;
- a timing pattern;
- shader structure;
- implementation architecture;
- interaction grammar;
- export / capture methods.

Do **not** reproduce another project's signature composition, identity, assets, or distinctive final look.

Method is reference. Final form must be rebuilt from the current project's grammar.

## 15. Review checklist

A candidate passes only if:

- [ ] still frame has a clear spatial hierarchy;
- [ ] motion adds information;
- [ ] exact hit is born at the intended moment;
- [ ] input changes a system variable rather than merely a coordinate;
- [ ] system remains alive after input stops;
- [ ] quiet / sparse condition exists;
- [ ] negative space is intentional;
- [ ] transition does not look like an accidental reset;
- [ ] memory / residue is stateful when claimed;
- [ ] same seed / fixture can reproduce the result;
- [ ] it can run for two minutes without obvious repetitive collapse;
- [ ] it is meaningfully different from adjacent variants.

## 16. Output format for each task

When asked to translate a reference into Processing, produce in this order:

1. **Behavior extraction** — 5–12 concise rules.
2. **Control map** — normalized drivers.
3. **Variant plan** — usually 3 variants.
4. **Runnable Processing sketch** — no placeholder pseudocode when implementation is requested.
5. **Controls** — exact keys / mouse / MIDI behavior.
6. **Review notes** — what to look for during fullscreen playback.
7. **Keep / delete recommendation** only after actual visual evidence is available.

## 17. Project-specific source

For the 816 translation, read first:

```text
research/audio-visual-grammar-engine/816-web-to-processing/HANDOFF.md
research/audio-visual-grammar-engine/816-web-to-processing/visual_grammar.json
research/audio-visual-grammar-engine/816-web-to-processing/Processing816Grammar/Processing816Grammar.pde
```

Use those as the current source of truth before inventing new states.
