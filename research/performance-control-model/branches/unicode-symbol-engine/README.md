# Unicode Symbol Engine Branch

Status: ACTIVE RESEARCH BRANCH
Parent: Performance Control Model
Branch: `research/unicode-symbol-engine`
Date: 2026-08-25

## Branch purpose

This branch isolates the Unicode / symbolic graphical language from the current main playground so it can be explored aggressively without destabilizing the canonical runtime.

Primary question:

> Can Unicode / typographic symbols become the native graphical, spatial and temporal language of a playable audiovisual instrument — not labels on top of an interface, but the actual particles, topology, score, motion and performance feedback?

The target quality bar is not a terminal gimmick or retro ASCII skin. The result should retain the directness and instant audiovisual legibility of Touch:waves-like instruments, the spatial curiosity and adjacency of Playground-like systems, and the guarded timing / state logic of the Performance Control Model.

## Core decision

Public / performer-facing UI should contain no Chinese or English labels.

Visible language is built from:

- Unicode geometry;
- typographic symbols;
- a very small number of emoji only when they communicate more clearly than a glyph;
- spatial position;
- animation;
- density;
- scale;
- brightness;
- rhythm;
- adjacency;
- local micro-sequencers.

Internal code IDs and research documentation may remain textual.

## Symbol families

The first symbolic grammar uses six families.

### FIELD

`◌ ○ ≈ ∿ ░ ▒ ▓`

Meaning: ground, atmosphere, sustained body, haze, memory.

Typical motion: breathing, drift, slow expansion, diffuse residue.

### PULSE

`● ◐ ◑ ▮ ▯ △`

Meaning: pulse, beat, offbeat, gate, subdivision, triplet.

Typical motion: discrete blink, repeated grouping, quantized jump, phase alternation.

### MOTION

`➜ ⇢ ⇥ ↻ ⟲ ⁙`

Meaning: route, scan, orbit, return, swarm, directional travel.

Typical motion: traversal, trajectory, circular phase, moving playhead, flow field.

### STRUCTURE

`╳ ┼ ▰ ▦ ▟ ▞`

Meaning: cut, partition, block, cell, staircase, phrase structure.

Typical motion: slicing, reconfiguration, stepping, tiling, block sequencing.

### PEAK

`✦ ✺ ⊙ ↟ ⇈`

Meaning: accent, strobe, impact, rise, pressure.

Typical motion: burst, flash, compression, radiate, tighten.

### RELEASE

`↶ ⊘ ∅ ∿ ⋯ ✧`

Meaning: rewind, suction, negative space, residue, decay, shimmer.

Typical motion: reverse, collapse, disappear, trail, evaporate.

## Behaviour operators

These operators should remain consistent across all chunks:

- `↘` ENTER
- `◎` INSIDE / ACTIVE
- `↗` EXIT
- `⌁` RELATION / ADJACENCY
- `↻` LOOP / PHASE
- `↶` RETRACE / RELEASE
- `⤢` EXPAND / STAGE
- `⊙` CONCENTRATE / COMMIT
- `⋯` DECAY / RESIDUE
- `∅` NEGATIVE SPACE / CLEAR

The performer should gradually learn these relations without reading labels.

## Symbol Engine

The next implementation should stop treating symbols as DOM labels and move toward a glyph rendering engine.

Preferred first implementation:

`WebGL2 + instanced glyph quads + SDF/MSDF symbol atlas`

WebGPU remains optional after the WebGL2 version proves the language.

### Render layers

1. Background field
   - sparse glyph haze;
   - slow global pressure;
   - low-cost ambient motion.

2. Chunk glyph field
   - chunk identity;
   - local score;
   - active / dormant state;
   - symbol family.

3. Motion / path layer
   - pointer trajectory;
   - route / scan / orbit;
   - neighbour relations;
   - future WebXR hand path.

4. Event layer
   - ENTER;
   - EXIT;
   - burst;
   - impact;
   - partition;
   - commit.

5. Residue / history layer
   - fading glyph traces;
   - previous-state memory;
   - controlled visual persistence.

### Per-glyph instance data

Each glyph instance should minimally support:

- position;
- velocity;
- scale;
- rotation;
- glyph index;
- family / chunk id;
- brightness;
- life / age;
- phase;
- density weight.

This lets the same engine express clouds, grids, orbits, bursts and residue while retaining one coherent visual material.

## Chunk contract

A Chunk is not an icon and not a one-shot effect.

Every retained chunk must define:

- SYMBOL FAMILY;
- PRIMARY GLYPH;
- MUSICAL ROLE;
- SPECTRAL ROLE;
- ENERGY RANGE;
- ENTER;
- INSIDE;
- EXIT;
- RESIDUE;
- MICRO-SEQUENCER;
- XY MAPPING;
- RECOMMENDED RELATIONS;
- FULL-SCREEN CONSEQUENCE;
- 3D TRANSLATION.

A visually attractive glyph animation without musical / spatial function is rejected.

## Sequencer interaction redesign

The local sequencer should no longer be primarily a row of editable steps.

Direct manipulation becomes the first interaction; step editing becomes secondary / deep edit.

### Inside a chunk

#### X axis

Controls structural width / complexity.

Working mapping:

- left → shorter / simpler / narrower phrase;
- right → longer / denser / more articulated phrase.

Candidate parameters:

- pattern length;
- subdivision;
- motif width;
- grouping;
- rotate amount;
- phase span.

#### Y axis

Controls scale / probability / instability.

Working mapping:

- down → sparse / stable / small / predictable;
- up → fuller / larger / more probabilistic / more unstable.

Candidate parameters:

- density;
- probability;
- octave / spectral lift;
- glyph scale;
- visual field radius;
- random perturbation.

The exact mapping can vary by family, but the global semantic direction must stay readable.

### Gesture grammar

- enter region → activate phrase family;
- horizontal travel → expand / contract structural width;
- vertical travel → move between stable and generative modes;
- dwell → deepen current behaviour;
- circular motion → phase / loop / orbit;
- fast crossing → fill / burst / stutter depending on family;
- retrace → rewind / release;
- exit → autonomous decay, not abrupt stop.

The same gesture must produce a visible transformation in the local sequencer and a screen-scale audiovisual consequence.

## Sequencer visual transformation

The sequencer should behave like a musical organ, not a settings panel.

Examples:

- density rises → cells fill / multiply;
- probability rises → cells flicker or fluctuate in opacity;
- rotate → ring / row phase visibly shifts;
- scale mode → glyph cells expand / contract;
- random perturbation → controlled displacement, never meaningless jitter;
- accent → cell becomes a high-contrast glyph or larger pulse;
- subdivision → structure splits recursively.

The performer should be able to infer the musical change from the graphic state before hearing it.

## Music logic rewrite

The current oscillator-heavy browser synthesis is a structural placeholder and must not define the final sound world.

Music is separated into five layers:

1. GROUND
   - persistent rhythmic / atmospheric floor;
   - survives node transitions.

2. CHUNK PHRASE
   - recognisable phrase family belonging to the current chunk;
   - not just a tone.

3. MICRO-SEQUENCER
   - local temporal score;
   - controls articulation and variation.

4. TRANSITION / EVENT
   - enter;
   - cross;
   - impact;
   - burst;
   - rewind;
   - commit.

5. RESIDUE / HISTORY
   - previous actions remain audible for a controlled duration;
   - history affects the next result.

Canonical relation remains:

`Result = Input + State + History`

### Audio quality direction

After the interaction proof, build a curated original phrase / sample bank rather than continuing to improve oscillator presets.

Target:

- 16–32 phrase families initially;
- compatible tonal / spectral field;
- original WAV / OGG / AudioBuffer material;
- meaningful transient library;
- distinctive hiss / metal / air / impact / texture identity;
- metadata for role, band, energy, compatible neighbours, release behaviour.

The audio-only route must be worth listening to with the screen hidden.

## Many available signals, few coherent active signals

Do not reduce richness by keeping the library small.

Use:

- family roles;
- spectral bands;
- energy metadata;
- density budget;
- voice budget;
- decay;
- soft ducking;
- crossfade;
- quantized transition;
- Signal Guard.

Principle:

`MANY AVAILABLE SIGNALS → FEW COHERENTLY ACTIVE SIGNALS`

## Spatial / WebXR continuity

The Unicode branch must remain compatible with the existing 2D→3D research.

Mapping:

- glyph chunk → volume / surface / spatial field;
- route glyphs → corridor / trajectory;
- orbit → hand loop / curved volume;
- partition → plane / boundary crossing;
- impact → commit volume;
- residue → fading spatial trace;
- XY sequencer gesture → local hand position in a volume;
- glyph density → spatial particle density.

The music runtime remains shared with R1. WebXR only changes the input geometry.

## Visual quality bar

The branch should avoid two failure modes:

1. retro terminal cosplay;
2. emoji sticker wall.

Preferred identity:

- typographic;
- highly art-directed;
- sparse but information-dense;
- crisp monochrome / high contrast by default;
- glyphs moving as a physical material;
- precise negative space;
- large-scale consequences from small symbolic interactions;
- controlled noise, scan, shimmer, pressure and strobe;
- professional electronic / experimental performance identity.

## What is explicitly rejected

Do not reintroduce:

- visible Chinese / English labels in performer / audience surface;
- a fixed 4×4 as the final ontology;
- 16 arbitrary cells as a hard cap;
- local-only visual widgets;
- random effects without musical role;
- one-shot browser tones as the main material;
- DAW-like parameter panels as the main performance interaction;
- arbitrary XY mappings with no family semantics;
- emoji as decorative labels;
- terminal aesthetics without structural function.

## First implementation gate — vL3

Name: `vL3 — Unicode Symbol Engine`

Build only enough to test whether the new language is real.

### Scope

Use 6–8 representative chunks, one from each family plus 1–2 hybrids.

Recommended first set:

- `◌` FIELD
- `●` PULSE
- `➜` ROUTE
- `↻` ORBIT
- `╳` PARTITION
- `✦` BURST
- `⊙` IMPACT
- `↶` RELEASE

### Required proof

1. No visible Chinese / English.
2. WebGL glyph field renders smoothly fullscreen.
3. Every chunk has a recognisable symbolic body.
4. ENTER / INSIDE / EXIT are visibly different.
5. XY movement changes both sequencer state and audiovisual result.
6. At least three family-specific XY mappings feel intuitive without instructions.
7. Full-screen visual state is stronger than the current Canvas 2D prototype.
8. A 30–60 second route is musically coherent with screen hidden.
9. The same route is recognisable but variable on repetition.
10. Runtime remains input-agnostic and can later receive WebXR control.

### Acceptance labels

- SYMBOL LANGUAGE — PASSED / FAILED
- XY SEQUENCER — PASSED / FAILED
- AUDIO-ONLY — PASSED / FAILED
- VISUAL-ONLY — PASSED / FAILED
- FULLSCREEN PERFORMANCE — PASSED / FAILED
- 3D READINESS — PASSED / FAILED

Do not expand back to 24+ chunks until this small gate passes.
