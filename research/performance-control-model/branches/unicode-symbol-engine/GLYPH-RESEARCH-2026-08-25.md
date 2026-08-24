# Glyph Research — Unicode / Nothing / Stage Light / WebGL

Date: 2026-08-25
Branch: `research/unicode-symbol-engine`
Status: RESEARCH / DESIGN BASIS

## 0. Core correction

`glyph` must not mean "put Unicode characters on screen".

For this project, a glyph is a **deterministic visual token** carrying musical / spatial / temporal meaning.

The correct chain is:

```text
SEMANTIC TOKEN
→ GLYPH FORM
→ MOTION / LIGHT BEHAVIOUR
→ LOCAL SCORE STATE
→ FULL-SCREEN CONSEQUENCE
```

Unicode provides useful symbolic vocabulary, but platform font rendering must not define the art direction.

## 1. Character, grapheme, glyph are different

Unicode character is an abstract encoded element.

Grapheme cluster is a user-perceived text unit used for segmentation.

Glyph is the rendered visual form selected by font / shaping / rendering logic.

One character can render with different glyphs. Multiple characters can become one glyph. A grapheme cluster is not necessarily a single glyph.

Implication for this project:

- use Unicode codepoints / strings as semantic IDs if convenient;
- do not depend on system font fallback for final visuals;
- do not assume one codepoint = one stable shape across browsers / OSes;
- avoid ZWJ / combining / emoji sequences in the canonical performance alphabet;
- keep canonical symbols as single, stable grapheme clusters where possible.

## 2. Why raw Unicode rendering is risky

System rendering differs in:

- glyph proportions;
- stroke width;
- baseline / advance;
- font fallback;
- symbol vs emoji presentation;
- missing glyphs;
- platform-specific substitutions.

A live-performance identity cannot rely on those variations.

Therefore:

> Unicode is semantic source vocabulary; canonical stage glyphs use one controlled atlas.

## 3. Recommended canonical glyph set

Do not attempt full Unicode coverage.

Start with ~24–32 visual forms.

### Primary behavioural verbs

```text
◌  field / atmosphere
●  pulse / body
➜  travel / forward phrase
↻  loop / recurrence
╳  partition / structural crossing
✦  accent / ignition
⊙  commit / impact
↶  release / retrace
```

### State / modifier marks

```text
·   restrained / sparse
◐  active / playable
◉  dense / build
✺  peak / unstable
```

### Temporal / structural operators

```text
⌁  relation / route
∿  residue / memory
∅  negative space
▦  cell / subdivision
▮  gate / shutter
⇄  transition / exchange
⇥  scan
⋯  decay
```

The alphabet should remain small enough that the performer can learn it by repeated use.

## 4. Do not make 32 glyphs = 32 control concepts

Correct layering:

```text
6–8 CONTROL VERBS
×
4–8 MATERIAL VARIANTS EACH
=
32+ PLAYABLE MATERIAL STATES
```

Example:

`●` means pulse / body.

Its curated variants may include:

- clean sub bed;
- body pulse;
- rolling tom;
- distorted low pulse;
- drop impact;
- damped kick phrase.

They remain one semantic family because performer action remains legible.

## 5. Nothing Glyph Interface: useful principles

Nothing's useful lesson is not phone styling.

The design logic is:

### Light and sound are composed together

Preset ringtones have bespoke light patterns; the output is a coordinated light / sound behaviour rather than audio analysis added afterward.

For this project:

```text
PHRASE FAMILY
owns
AUDIO + GLYPH CHOREOGRAPHY + LIGHT ENVELOPE
```

Do not derive the whole visual system from FFT.

### Restriction creates language

Earlier Nothing phones created recognisable states with a small number of addressable light zones. Phone (3) expands this into a 25×25 Glyph Matrix / 489 micro-LED display.

The lesson:

> vocabulary comes from choreography of a constrained surface, not from adding more widgets.

### Simple input can operate rich output

Glyph Toys use very small interaction vocabulary: cycle / select / press / long press, while matrix output can still animate and communicate state.

For this instrument:

- enter;
- travel;
- dwell;
- fast cross;
- retrace;
- release;

is enough as a primary gesture grammar.

### Matrix renderer, not matrix ontology

Nothing's SDK renders matrix frames and layers objects into one output surface.

This is the useful analogy:

- one global light raster;
- multiple coordinated render layers;
- one composed output frame.

Do not interpret the matrix as 625 independent buttons.

## 6. Proposed visual substrate: low-resolution stage matrix

A better Nothing / stage-light influence is a **global raster**, not a control grid.

Recommended first surface:

```text
32 × 18
or
40 × 24
```

Offscreen monochrome signal buffer.

Each frame stores intensity, not UI state.

Then upscale to full screen.

Benefits:

- deliberate low-resolution discipline;
- clear stage-light behaviour;
- good Unicode / dot-matrix affinity;
- easy scan / shutter / beam / partition effects;
- inexpensive history buffer;
- strong identity without many visual objects.

## 7. Five render layers only

Ponytail rule: no more renderer hierarchy until these fail.

### L1 FIELD

Low-frequency global pressure.

- haze;
- sparse dots;
- slow breathing;
- dark baseline.

### L2 SCORE / GLYPH

Current semantic token and micro-score.

- glyph stamp;
- sequence cells;
- active phase;
- neighbour hint.

### L3 ROUTE / LIGHT

Directional stage behaviours.

- scan;
- rail;
- shutter;
- beam chase;
- iris / aperture mask.

### L4 EVENT

Short high-contrast events.

- impact;
- burst;
- blinder;
- strobe;
- hard cut.

### L5 HISTORY

Previous state residue.

- afterimage;
- decay;
- shimmer;
- retraced path;
- fading glyph memory.

One composited frame leaves the renderer.

## 8. Stage-light grammar

Lighting behaviours should be global operators, not new navigation nodes.

Canonical operators:

```text
DIMMER
continuous brightness envelope

SHUTTER
quantized on/off articulation

BEAM
narrow directional energy

CHASE
ordered multi-beam travel

IRIS
spatial aperture / focus

ZOOM
width / pressure

FROST
diffusion / haze

BLINDER
short full-output peak

STROBE
short repeated peak

BLACKOUT
active subtraction / reset space
```

These operate on current musical state.

Example:

```text
PARTITION + SHUTTER
≠ new node

PARTITION phrase
→ shutter operator articulates its light body
```

## 9. Marathon influence: use discipline, not decoration

Relevant direction from current Marathon art development:

- dark / gritty / grounded science fiction;
- environmental storytelling;
- stronger role for sound;
- visual fidelity and immersion.

Translate into this instrument as:

- black is primary material;
- white signal is structural;
- colour appears only for functional state;
- grain / scan / clipping are event-level signs of pressure or failure;
- interface should look like an operating system / instrument under load, not a retro terminal skin;
- distressed visual texture should never replace composition.

### Colour rule

Default:

```text
BLACK
WHITE
GRAPHITE
```

At most one active signal colour at a time.

Possible semantic mapping:

- acid green → active route / valid continuation;
- amber → build / caution / rising pressure;
- magenta → unstable / peak;
- cyan → release / memory.

Colour is a state channel, not decoration.

## 10. WebGL implementation: shortest useful path

Current branch already proved WebGL2 instanced quads can render a glyph field.

Do not add WebGPU or a general typography engine now.

### v1 implementation

Use:

```text
WebGL2
+ one glyph atlas texture
+ instanced quads
+ one low-resolution framebuffer
+ one history framebuffer
+ 4–5 shader operators
```

Enough.

### SDF vs MSDF

For 24–32 curated symbols:

- normal bitmap atlas is enough if scale range is small;
- single-channel SDF is enough for moderate scaling;
- MSDF only becomes necessary if sharp corners visibly fail at large scale.

MSDF can reproduce sharp corners better than monochrome SDF, but adding it before a measured quality problem violates Ponytail.

### Troika / general text libraries

Troika is excellent when full Unicode text shaping, ligatures, fallback fonts, 3D text and dynamic font parsing are actual requirements.

Those are not current requirements.

Do not add Troika to render 32 art-directed symbols.

## 11. Canonical atlas strategy

Best final consistency:

1. choose Unicode-derived semantic forms;
2. redraw them into one bespoke geometric family;
3. export / generate one deterministic monochrome atlas;
4. runtime references atlas index, not system font glyph;
5. keep Unicode characters in metadata / debugging / documentation.

This gives:

- Unicode legibility;
- deterministic stage look;
- no emoji substitution;
- no cross-platform font drift;
- fast WebGL rendering.

## 12. Glyph family geometry

A coherent family should share a small construction kit.

Recommended primitives:

```text
DOT
RING
BAR
ARC
CROSS
GRID
RAY
TRAIL
```

All glyphs derive from these eight primitives.

Examples:

```text
◌ = RING
● = DOT
➜ = BAR + RAY / direction
↻ = ARC + direction
╳ = CROSS
▦ = GRID
✦ = RAY cluster
↶ = ARC + TRAIL
```

This is more important than whether the final shape exactly matches a Unicode font.

## 13. Motion grammar must preserve symbol identity

A glyph should not become arbitrary particles after activation.

Each family gets one dominant transform:

```text
FIELD       breathe / diffuse
PULSE       blink / compress
ROUTE       translate / scan
ORBIT       rotate / phase
PARTITION   split / cross
PEAK        radiate / overexpose
COMMIT      collapse / concentrate
RELEASE     reverse / trail
```

Secondary variation may alter density / scale / phase, but dominant motion stays recognisable.

## 14. Sequencer as visible physiology

Sequencer should not be a panel.

The local score becomes part of glyph body.

Examples:

### `●`

8–16 pulse marks around / beside core.

X:

- expands pattern span;
- changes phase / grouping.

Y:

- changes active mark count;
- accent probability;
- body scale.

### `↻`

steps live on orbit circumference.

X:

- changes arc length / phase span.

Y:

- changes ring count / recurrence density.

### `╳`

steps live on crossing segments.

X:

- moves partition positions.

Y:

- increases subdivision / crossing recurrence.

### `↶`

steps trail behind return arc.

X:

- changes retrace depth.

Y:

- changes residue length / probability.

Thus score and geometry become same object.

## 15. Audio mapping must be phrase-first

The glyph visual system does not fix music by itself.

Each control verb should own 4–8 curated phrase materials.

Minimum audio architecture:

```text
GROUND
persistent floor

CURRENT PHRASE
one selected family material

SECONDARY ROLE
max 1–2 compatible layers

TRANSIENT
event / impact / hiss / metal / fill

RESIDUE
controlled previous-state tail
```

No more than 3–5 sustained active layers.

The 32+ material requirement belongs here, not in visible node count.

## 16. Recommended material bank

Start with 32 curated items:

```text
FIELD       4
PULSE       5
ROUTE       4
ORBIT       4
PARTITION   4
PEAK        4
RELEASE     4
SPECIAL FX  3
```

Every item records:

- duration;
- role;
- spectral band;
- energy;
- tonal centre if any;
- compatible families;
- release type;
- glyph choreography preset;
- light operator preset.

## 17. New canonical distinction

This branch must keep three levels separate:

```text
CONTROL VERB
what performer means

MATERIAL VARIANT
what prepared phrase / effect is selected

GLYPH / LIGHT STATE
how that meaning becomes visible
```

Example:

```text
CONTROL VERB: ORBIT
MATERIAL: metallic arp 03
GLYPH: ↻ with 12-step ring
LIGHT: slow rotating beam + low haze
```

This separation prevents another ontology explosion.

## 18. Immediate next proof

Do not implement 40-cell vL4 UI.

Build one proof with six verbs:

```text
◌  FIELD
●  PULSE
➜  ROUTE
↻  ORBIT
╳  PARTITION
↶  RELEASE
```

Keep `✦ / ⊙` as event operators, not persistent regions.

Behind six verbs, attach at least 24–32 material variants.

Use one low-res global matrix renderer and one deterministic glyph atlas.

Acceptance:

1. audio-only route works 30–60 seconds;
2. visual-only output feels like one stage system;
3. six glyphs remain identifiable through motion;
4. X/Y changes local score visibly and musically;
5. Nothing-style light logic is visible without copying phone hardware;
6. Marathon influence appears through discipline / state / material, not decorative glitch;
7. adding new material does not add new control node.

This is the recommended Glyph direction.