# DESIGN / AESTHETIC CROSS-REFERENCE

Project: 《无需进一步输入 / No Further Input Required》
Date: 2026-08-25
Purpose: collect reusable visual/control ideas already present elsewhere in the repository before inventing new aesthetics.

This document is a pointer map. It does not merge the performance-system and exhibition-artwork branches.

## 1. 2026-08-16 Web → Processing grammar

### Source

`research/audio-visual-grammar-engine/816-web-to-processing/HANDOFF.md`

Useful rules:

- reproduce **behaviour**, not web assets;
- one screen should read as one visual system rather than a panel of widgets;
- input should become an impulse into system variables rather than directly dragging objects;
- use multiple time scales: frame-scale response, medium envelope, slow structural change;
- visual identities need to remain distinguishable even as behaviour overlaps;
- glyphs can operate graphically rather than as readable language.

Use in NFI:

- keep marks attached to temporal behaviour;
- do not make ASCII/Unicode a decorative font specimen;
- let the same mark family recur under different history conditions.

### Source

`research/audio-visual-grammar-engine/816-web-to-processing/visual_grammar.json`

Useful shared variables already existed:

```text
energy
motion
density
memory
direction
```

The historical grammar also explicitly required:

```text
quiet state
continue after input
no direct object-position tethering
```

Use in NFI:

- `memory`, `density`, `direction` are especially compatible with the current 30-second system;
- quiet is a designed state, not a lack of content;
- continuation after an event is a core visual behaviour.

### Source

`research/audio-visual-grammar-engine/816-web-to-processing/Processing816Six/Processing816Six.pde`

Useful visual ancestry:

- REWIND: large glyph / stamp behaviour plus reverse trace;
- CELLS: indexed grid grammar;
- PARTITION: large blocks, dividers and negative space;
- multiple behaviours were tied to shared system variables rather than independent animations.

Do not restore the old six-state UI. Extract only useful formal behaviour.

## 2. Performance Control Model — daily visual practice

### Source

`research/performance-control-model/DAILY-PRACTICE.md`

Relevant visual exercises:

```text
V01 Pulse / Gate
V02 Density Field
V03 Accumulation / Decay
V04 Phase / Scan
V05 Layer Mix
V06 State Interpretation
```

Most useful for the exhibition artwork:

- **Accumulation / Decay**: repeated events build residue; release clears gradually;
- **Phase / Scan**: repeating phase can reveal a field without moving every object;
- **Layer Mix**: coexistence/weighting is preferable to hard scene switching;
- repeated actions need ceilings and release behaviour;
- subtraction is part of control, not an afterthought.

Use in NFI:

- a glyph address can brighten a structural area rather than travel like a cursor;
- accumulated use can alter what remains visible;
- release should be visually designed and slower than activation where useful.

## 3. Performance Control Model — 2026-08-24 Round 02

### Source

`research/performance-control-model/progress/2026-08-24-round02.md`

Relevant findings:

- Phase Scan and Accumulation/Release are reusable visual-set behaviours;
- sound and image can interpret the same internal event/state differently;
- a shared state is stronger than a decorative meter;
- build and release both need to be controllable/testable.

Use in NFI:

- the current visual loop should expose shared `history / recall / pressure / density` through several layers without forcing 1:1 mappings;
- if sound is added later, it should read the same internal history rather than merely follow visual amplitude.

## 4. Graphical / Spatial Control Language

### Source

`research/performance-control-model/GRAPHICAL-SPATIAL-CONTROL-LANGUAGE.md`

Relevant aesthetic principles:

- topology and adjacency can carry meaning;
- a path can function as a phrase;
- a loop should remain recognisable while controlled details change;
- reduce vocabulary rather than adding more local effects;
- every important local event should have a screen-scale consequence;
- budget density;
- use subtraction and silence as strongly as addition;
- geometry should imply behaviour, not act as decoration.

Use in NFI:

- treat major-grid adjacency as a compositional relation;
- let diagonal constraints/index clusters form preferred historical routes;
- make a 30-second loop have a recognisable structural phrase while avoiding a visible reset;
- preserve negative space around dense memory events.

Important boundary:

The performance-control document moves toward navigable/performable topology. **Do not import that interaction layer into the exhibition version.** Only reuse its formal thinking about adjacency, phrase, recurrence, density and subtraction.

## 5. Current Nothing / Glyph research status

A repository-wide indexed search on 2026-08-25 for:

```text
Nothing
Glyph Matrix
glyph
Unicode
ASCII
```

found no separate older standalone document that clearly contains a complete `Nothing + Unicode` performance-system study outside the current NFI line.

The closest pre-existing aesthetic ancestors currently indexed are:

- the 08/16 audio-visual grammar `REWIND` glyph behaviour;
- indexed-cell / grid behaviours;
- Phase Scan / Accumulation / Release in Performance Control Model;
- topology / phrase / recurrence rules in Graphical Spatial Control Language.

Therefore the current canonical NFI document for this topic is:

`research/GLYPH-ASCII-NOTHING-RESEARCH.md`

If local Codex finds an unindexed local branch/private file that contains the remembered Nothing/Unicode performance study, append it below with:

```text
exact repository/path
commit or branch
what was actually tested
2–5 reusable aesthetic rules
what must NOT be imported into NFI
```

Do not claim such a source exists until it is located.

## 6. Current NFI synthesis

The current artwork can derive a coherent visual grammar from these existing strands:

```text
GRID / INDEX
    gives order and address

CONSTRAINT / ADJACENCY
    gives relation and directional choice

QUANTIZED MEMORY
    gives age, persistence and historical depth

PHASE / SCAN
    gives temporal reveal without constant motion

ACCUMULATION / DECAY
    gives residue and release

GLYPH / SYMBOL
    gives a non-verbal mechanical mark language

LOOP / PHRASE
    gives recognisable recurrence without exact repetition
```

This is enough vocabulary for R3–R10. Do not add another visual family until these relationships have been exhausted.

## 7. Taste test for importing any outside reference

Before borrowing from another repo/project, ask:

```text
Does it strengthen order?
Does it strengthen temporal memory?
Does it strengthen recurrence?
Does it create a meaningful hierarchy?
Does it improve negative space / density balance?
Can it be expressed with the current primitive family?
```

If the answer is mostly “it looks technological,” reject it.
