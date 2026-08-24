# vL3 — Unicode Symbol Engine

Status: IMPLEMENTED / USER VALIDATION PENDING
Branch: `research/unicode-symbol-engine`

## Implemented

- pure symbol-facing surface: `◌ ● ➜ ↻ ╳ ✦ ⊙ ↶`;
- WebGL2 glyph atlas generated at runtime from Unicode glyphs;
- instanced glyph-quad renderer with up to 1800 visible glyph particles;
- persistent sparse background glyph field;
- eight representative chunks;
- family-specific ENTER particle behaviour;
- EXIT residue / history;
- shared 142 BPM transport;
- 8 / 12 / 16 step local micro-sequencers;
- XY direct manipulation:
  - X → pattern width / 8-12-16 length / phase;
  - Y → density / probability / glyph scale / instability;
- sequencer graphic changes continuously with XY state;
- family-specific audio behaviours for field, pulse, route, orbit, partition, burst, impact and release;
- previous chunks decay instead of stopping immediately;
- same-family soft suppression;
- active voice budget;
- optional recommended-relation overlay `⌁`;
- AUTO route `∞` for a repeatable listening test;
- fullscreen API + stage-mode fallback;
- input layer remains pointer-based and can later be replaced by WebXR hand coordinates.

## Files

- `index.html` — symbol-only surface;
- `core.js` — WebGL2 atlas, instanced glyph renderer, particle behaviours;
- `audio.js` — transport, XY sequencer morphing, audio/state/history;
- `view.js` — node map, local sequencer view, relation overlay and stage controls.

## Current route

`◌ → ● → ➜ → ↻ → ╳ → ✦ → ⊙ → ↶`

The route is available through `∞` and advances every four bars.

## What is deliberately not solved yet

- audio still uses browser synthesis; it is not the final sample / phrase bank;
- glyph atlas is alpha-texture based, not yet true SDF/MSDF;
- family-specific XY mappings currently share the same global semantic directions and need perceptual testing;
- no circular-gesture phase detector yet;
- no WebXR device input yet;
- no device performance benchmark yet;
- no audio-only quality pass yet.

## Acceptance status

- SYMBOL LANGUAGE — IMPLEMENTED / NOT VALIDATED
- XY SEQUENCER — IMPLEMENTED / NOT VALIDATED
- AUDIO-ONLY — NOT PASSED
- VISUAL-ONLY — NOT PASSED
- FULLSCREEN PERFORMANCE — IMPLEMENTED / NOT VALIDATED
- 3D READINESS — ARCHITECTURALLY READY / NOT DEVICE-VALIDATED

Do not expand back to 24+ chunks until the small gate is tested.
