# vL6 — Outline Glyph Kit

Status: DESIGN KIT / READY FOR RUNTIME INTEGRATION
Branch: `research/unicode-symbol-engine`

## Goal

Replace system-font Unicode rendering with a deterministic outline language.

Unicode remains semantic metadata. Stage output uses one controlled SVG / atlas family.

## Construction grammar

All glyphs derive from eight primitives:

`DOT / RING / BAR / ARC / CROSS / GRID / RAY / TRAIL`

Shared rules:

- square 100×100 viewBox;
- primary stroke width 6;
- secondary stroke width 3;
- no arbitrary corner radii;
- filled variants use the same outer silhouette;
- sequencer marks remain visually subordinate to the main silhouette;
- each family must remain recognisable at 24 px;
- motion may deform scale / phase / density, but must preserve family identity.

## Families

| Family | Unicode source | SVG silhouette | Musical role | Sequencer geometry | X | Y | Dominant motion | Full-screen consequence |
|---|---|---|---|---|---|---|---|---|
| CIRCLE | `◌ / ● / ⊙` | ring / core / concentric ring | field, pulse, pressure | radial ticks | phrase span / phase | density / scale | breathe / compress | field pressure / pulse bloom |
| TRIANGLE | `△ / ▶ / ➜` | open triangle / wedge / directional triangle | route, rise, push | steps along perimeter or base→apex | route length / subdivision | lift / instability | translate / shear | scan / directional beam |
| SQUARE | `□ / ■ / ▦` | open square / filled block / inner cells | gate, cell, architecture | 2×4 / 4×4 cell score | pattern width / grouping | fill / probability | shutter / tile | block cut / matrix light |
| CROSS | `╳ / ┼` | diagonal cross / orthogonal cross | partition, split, crossing | steps on four arms | split position / phase | subdivision / recurrence | split / cross | screen partition / shutter cut |
| DIAMOND | `◇ / ◆ / ⊙` | diamond / inset diamond / core | focus, commit, drop | perimeter→centre score | approach depth | impact pressure | concentrate / collapse | iris / impact contraction |
| ARC | `↶ / ↻ / ∿` | arc / hook / return trail | rewind, orbit, release | steps on arc | retrace depth / arc span | residue length / probability | rotate / reverse / trail | sweep / release / afterimage |
| STAR | `✦ / ✺` | four-ray / eight-ray burst | accent, burst, flare | event pulses on rays | spread / burst count | peak intensity | radiate | blinder / strobe / flare |
| LINE | `— / │ / ⇥ / ⌁` | rail / beam / segmented track | scan, chase, route support | linear step rail | travel / phase | beam width / density | translate / chase | beam / scan / wipe |

## Persistent vs event roles

Persistent control families:

`CIRCLE / TRIANGLE / SQUARE / CROSS / DIAMOND / ARC`

Event operators:

`STAR / selected LINE states`

LINE may also act as a global lighting operator rather than a navigation region.

## Variant rule

Every family has four visual states:

1. `BASE` — clean silhouette;
2. `SCORE` — embedded micro-sequencer;
3. `DENSE` — build / subdivided state;
4. `EVENT` — short peak / transition state.

These are states of one family, not four new control concepts.

## Sequencer embedding

### CIRCLE

- 8/12/16 ticks around circumference;
- playhead = one high-contrast tick;
- X expands active arc / phase span;
- Y increases active tick count and core radius.

### TRIANGLE

- steps distributed along three edges;
- alternate mode: base→apex progression;
- X extends route around perimeter;
- Y moves active weight toward apex and increases subdivision.

### SQUARE

- internal 2×4 / 3×4 / 4×4 cells;
- X changes active columns / grouping;
- Y changes fill / probability / shutter depth.

### CROSS

- four arms each contain temporal slots;
- centre = structural pivot / accent;
- X shifts emphasis horizontal↔vertical;
- Y increases crossing recurrence / subdivision.

### DIAMOND

- steps travel from perimeter toward centre;
- X changes path length / approach phase;
- Y increases centre pressure / commit probability.

### ARC

- steps follow path curvature;
- X changes arc span / retrace depth;
- Y changes trail persistence / release density.

### STAR

- each ray = event subdivision;
- X changes ray spread / count;
- Y changes peak intensity / duration;
- always time-limited by Signal Guard.

### LINE

- steps sit on rail;
- X moves playhead / phrase travel;
- Y changes beam thickness / repeat density.

## Runtime contract

Visible glyph state derives from the same performance state as audio.

```text
CONTROL VERB
→ MATERIAL VARIANT
→ LOCAL SCORE
→ GLYPH STATE
→ LIGHT OPERATOR
→ FULL-SCREEN FRAME
```

No FFT-only visual mapping.

## vL6 acceptance

- eight families read as one visual language;
- circle no longer dominates the identity;
- triangle / square / cross / diamond / arc remain legible at small size;
- score is embedded into silhouette, not shown as separate panel;
- X/Y can be inferred from geometry;
- family motion remains recognisable after animation;
- SVG paths can be rasterised into one deterministic atlas;
- adding material variants does not require adding glyph families.