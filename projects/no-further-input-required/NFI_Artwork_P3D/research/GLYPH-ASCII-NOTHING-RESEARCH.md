# NFI — ASCII / Unicode / Glyph Logic Research

Date: 2026-08-25
Purpose: introduce a non-verbal mechanical symbol language into the exhibition runtime without turning the artwork into a terminal, readable text layer, or Nothing-device imitation.

## 1. Design position

The symbol layer is not copywriting and not code displayed for atmosphere.

It functions as another mechanical vocabulary inside the same grid:

```text
mark
→ address
→ illuminate
→ hold
→ decay
→ persist / return
```

Symbols must behave like machine states rather than words.

## 2. Nothing Glyph logic worth borrowing

Official Nothing documentation describes the Glyph Interface as addressable light components / zones that communicate through designed light patterns associated with events, sounds and notifications. Phone (2) exposes 33 individually addressable zones across 11 segments; Phone (2a) exposes 26 zones. Phone (3) moves the idea into a 489-micro-LED Glyph Matrix that can display notifications, countdown/progress information, volume states and small animations / toys.

Useful principles for NFI:

1. **finite addressable zones** — do not animate every element all the time;
2. **pattern as temporal composition** — meaning comes from which zones light, in what order, and for how long;
3. **progress without moving objects** — a sequence can be expressed by quantized illumination across fixed positions;
4. **persistence** — an addressed mark can remain after its original event, which maps naturally to NFI's historical residue;
5. **sound / light can share one event clock** without one merely visualising the amplitude of the other;
6. **low-resolution intentionality** — limited zones can feel more authored than an unlimited particle field.

What NOT to copy:

- Nothing logos;
- exact phone rear-light geometry;
- branded icons / Glyph Toys;
- actual notification meanings;
- circular Phone (3) matrix layout as a decorative motif.

The artwork borrows only the behavioural idea of **addressable zones + temporal patterns + persistence**.

Official references:

- Nothing Support — What is the Glyph Interface?
  https://support.nothing.tech/hc/en-us/articles/16770135458193-What-is-the-Glyph-Interface
- Nothing — Glyph Developer Kit
  https://us.nothing.tech/pages/glyph-developer-kit
- Nothing Phone (3) — Glyph Matrix / 489 micro-LEDs / countdown / volume / notifications
  https://in.nothing.tech/products/phone-3
- Nothing Developer Programme — Glyph Developer Kit
  https://github.com/Nothing-Developer-Programme/Glyph-Developer-Kit

## 3. Curated symbol palette

### ASCII — primary mechanical grammar

```text
+  -  =  /  \  |  :  .  _  <  >  [  ]
```

Reason:
- highly stable font support;
- reads as direction, boundary, relation and separation rather than prose;
- can disappear into line/grid composition.

### Unicode — geometric / structural grammar

```text
·  •  □  ■  ◇  ◆  △  ▽  ○  ●
─  │  ┼  ╱  ╲  ╳  ⊕  ⊙  ∷  ≡
```

Reason:
- mostly geometric;
- suitable as addressed states / anchors / memory marks;
- remains legible at very small scale;
- enough variation without becoming an encyclopaedia of symbols.

Avoid for the current round:

- emoji;
- alphabetic words;
- long mathematical equations;
- arrows everywhere;
- decorative occult / astrological symbols;
- rare Unicode characters with unreliable Windows font support;
- Braille blocks until the actual exhibition machine font rendering has been tested.

## 4. Rendering rule

Symbols use two installed Windows fonts only:

```text
Consolas          ASCII
Segoe UI Symbol   geometric Unicode
```

No font file is bundled in the repository.

If the final machine renders a missing-glyph square, remove the affected character from the palette. Do not solve this by adding a large font dependency immediately before delivery.

## 5. Three rounds

### R1 — ORDER

No symbols.

Only recover and merge:

```text
Constraint
Index Field
Quantized Memory
```

onto one hierarchical grid.

### R2 — MECHANICAL LANGUAGE

Add sparse ASCII/Unicode marks to finite addressable zones.

The marks do not drift randomly. They light through timed patterns, hold, decay and occasionally remain as history anchors.

### R3 — EXHIBITION

Reduce symbol density again.

The symbol layer should become less obvious but more consequential:

- a few persistent anchors;
- one segmented progress gesture;
- rare diagonal memory lane;
- recalled marks appearing slightly before the current system reaches them.

The result should feel like a machine has a language without presenting a language the viewer can simply read.

## 6. Relationship to the artwork

The visual logic becomes:

```text
MAJOR GRID
  ├─ constraint / acceptance / rejection
  ├─ index / addressing
  ├─ glyph zones / machine-state signalling
  └─ micro-grid memory / residue / recall
```

This keeps all visual material inside one spatial measure system and avoids a collage of unrelated effects.

The core perceptual question remains:

> Can the viewer feel that earlier decisions are still organising what happens now, even after new input has stopped?
