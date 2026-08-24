# Performance Control Model — 2026-08-24 / Round 11

## Trigger

User feedback on D5 v7:

- PARTITION / K effect was not obvious enough;
- most materials still felt like short simple tones;
- materials did not reach Touch:waves-level completeness;
- the sequencer itself did not feel musically valuable.

## Correction

The previous prototypes asked the sequencer to create too much of the musical interest.

The corrected hierarchy is:

```text
BACKTRACK / GROUND
+
PREPARED CLIP / CAPSULE LIBRARY
+
QUANTIZATION
+
OPTIONAL ARRANGER
```

The musical identity must exist before arrangement.

A clip must survive the test:

> Trigger it alone over a simple backing track. Does it already feel like a complete audiovisual gesture?

If not, adding more sequencer logic is not a solution.

## Touch:waves precedent

The relevant precedent is not its button count or grid layout. The important construction method is:

- a backing rhythm is always available;
- each input triggers a pre-made sample and corresponding visual;
- material was auditioned and rejected until arbitrary combinations stayed musical;
- quantization keeps manual triggering aligned to the backing rhythm;
- interface simplicity is deliberately protected.

Therefore the current research should treat asset/capsule design as a first-class layer rather than synthesizing every identity from tiny step events.

## D5 v8 — Clip-First Performance Instrument

### Perform surface

16 direct materials remain:

Structured clips:

```text
A ROUTE       4.2s
S FIELD       5.2s
D ORBIT       4.8s
F REWIND      4.6s
J CELLS       4.0s
K PARTITION   5.6s
L SCAN        4.7s
; DROP        4.3s
```

Direct capsules / FX:

```text
Q AIR / HISS          2.4s
W METAL               2.6s
E GLASS               3.4s
R IMPACT              2.8s
U STUTTER / CUT       2.4s
I RISE / PRESSURE     4.5s
O REVERSE / SUCTION   3.8s
P RESIDUE / TAIL      5.0s
```

### Four backing tracks

A simple continuous musical ground is restored.

Backtrack 1–4 vary pulse / syncopation / high-rate texture / sparse pressure without changing the main clip library.

### Immediate ACK + quantized body

Input still gives immediate material-specific feedback.

The full clip begins on the selected 1/8 or 1/4 boundary.

### PARTITION benchmark

K / PARTITION is explicitly treated as the quality benchmark for this round.

Its 5.6-second phrase includes:

- multiple chord blocks rather than one chord hit;
- changing chord register / voicing;
- filter-spectrum changes;
- stereo offsets;
- AIR and high-frequency punctuations;
- a five-hit stutter tail;
- descending low-frequency sweep;
- final pressure-release residue.

Its visual behaviour persists for the same envelope and performs subdivision / reconfiguration / stutter-tail slicing.

### Other structured clips

All seven other structured materials were also changed from one-step voice identities to multi-event phrases with internal development.

### Optional arranger

The former sequencer is demoted.

The EDIT / ARRANGER surface contains a 16-step launcher where each cell calls a **complete clip**.

It does not synthesize tiny notes.

The arranger can be disabled completely without reducing the direct performance instrument.

## Runtime interpretation

The canonical hierarchy now becomes more concrete:

```text
ASSET
→ CAPSULE / CLIP  [musical identity lives here]
→ ARRANGEMENT     [orders complete behaviours]
→ LAYER / STATE
→ SHOW
```

This corrects a failure in recent versions where `SEQUENCE` was accidentally asked to generate the identity that should belong to `CAPSULE / CLIP`.

## Status

```text
D5 v8 clip-first instrument       IMPLEMENTED / USER TEST PENDING
K PARTITION benchmark             IMPLEMENTED / USER TEST PENDING
D5 v7 material-pool sequencer     ARCHIVED AS FAILED DIRECTION
Vision Pro                         HOLD
```

## Test gate

Do not evaluate the arranger first.

1. PLAY backtrack 1.
2. Trigger K by itself several times.
3. Judge whether K now has a recognisable 5–6 second identity.
4. Trigger A / S / D / F / J / L / ; individually.
5. Try arbitrary pairs and triples over the backing track.
6. Trigger Q/W/E/R/U/I/O/P as punctuation.
7. Only then enable EDIT / ARRANGER and judge whether automation adds value.

If the clips themselves are still weak, do not iterate the arranger. Improve material design / sound assets first.