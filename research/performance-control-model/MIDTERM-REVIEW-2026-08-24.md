# Performance Control Model — Midterm Review

**Date:** 2026-08-24  
**Scope:** browser performance-control research from the first trigger/quantization demos through D5 v11, plus the Spatial Playground bridge  
**Status:** MIDTERM REVIEW / CANONICAL CHECKPOINT

## 0. Midterm conclusion

The research has made stronger progress on **control architecture** than on **artistic material quality**.

The first half successfully clarified:

```text
shared transport
quantized intent
clip / capsule distinction
signal guard
manual vs automatic control
performer UI vs audience output
full-screen control surface
2D continuous input → future spatial adapter
```

But the latest tests also show:

```text
more control sophistication
≠
better music
≠
better visuals
≠
a complete performance
```

The second half therefore changes priority.

> Do not add control features unless they solve a measured performance problem. Put musical curation, long-form structure, graphical language and full-screen visual quality ahead of new parameter count.

---

# 1. What survived the experiments

## A. Shared authoritative transport — KEEP

One clock / one timing authority remains correct.

```text
BPM
BEAT
BAR
PHRASE
QUANTIZATION
```

Human timing can be imprecise while musical execution stays coherent.

## B. Immediate feedback + quantized body — KEEP

The performer needs immediate acknowledgement, but the actual phrase can still enter on a safe boundary.

```text
INPUT
├─ immediate ACK
└─ quantized musical body
```

This is both perceptually clear and structurally safe.

## C. Clip-first material — KEEP

A useful performance input should launch or enter a complete behaviour, not merely a tiny sound.

```text
ENTER
→ DEVELOP
→ TRANSFORM
→ RELEASE
→ RESIDUE
```

The sequencer cannot rescue weak material.

## D. Signal Guard — KEEP

Useful safeguards:

```text
DEBOUNCE
DUPLICATE CHECK
ROLE / SPECTRAL BUDGET
MAX ACTIVE
MASTER HEADROOM
PANIC
```

These directly reduce invalid or destructive live actions.

## E. AUTO ASSIST / DRIVE — KEEP AS SUPPORT

Automatic control is useful when it:

- fills structural gaps;
- protects continuity;
- changes density safely;
- yields to deliberate human actions.

It should not become an autonomous random-content generator that hides weak composition.

## F. Edit / Perform separation — KEEP

Detailed preparation and minimal live operation should remain separate surfaces.

## G. Full-screen performance surface — KEEP

The screen itself becoming the instrument is more promising than a conventional panel of buttons.

## H. Pointer / spatial gesture as process input — KEEP

The useful rule remains:

```text
path / velocity / direction / dwell
→ process state
→ autonomous behaviour continues
```

Avoid literal cursor-following as the main visual idea.

---

# 2. What was useful but overextended

## A. 8×8 hidden variation model — REJECT

Reason:

- too many hidden sequencers;
- poor observability;
- complexity increased faster than expressive value.

## B. Sequencer-first composition — REJECT AS PRIMARY MODEL

The unified step grid was useful for understanding timing and editability, but it became a false centre of the instrument.

A step sequencer is an optional authoring / arrangement tool, not the source of musical quality.

## C. Weak / strong per-cell editing as primary performance logic — REJECT

It was too granular for live use.

Accent remains useful as authoring data, not as the main interaction contract.

## D. Mini-DAW direction — STOP

Mixer and synthesis modules are useful internally, but the project should not expand toward a browser DAW.

The research contribution is performance control and structure, not recreating production software.

## E. 16 isolated 4×4 regions — REJECT AS FINAL VISUAL LANGUAGE

The 4×4 field was useful as a fast control experiment, but the latest test exposed major weaknesses:

- local effects felt disconnected;
- screen composition became visually noisy;
- region boundaries dominated the artwork;
- full-screen visual causality was inconsistent;
- the grid did not itself carry musical meaning.

The grid remains a debug / workshop view only.

## F. Arbitrary rich XY mapping — REDUCE

The richer XY version proved continuous control is valuable, but assigning a different abstract pair to every region created unnecessary cognitive load.

Future continuous controls should be suggested by geometry rather than memorised labels.

---

# 3. Demo history reclassified

## FOUNDATION / ARCHIVE

```text
D0 Direct Trigger
ARCHIVE
Proved the boring baseline: INPUT → EVENT.

D1 Quantized Capsules
ARCHIVE
Useful timing baseline.

D2 / D3
ARCHIVE / REJECTED
Did not produce enough musical or interaction value.
```

## STRUCTURE EXPERIMENTS

```text
D5 v2 8×8 variations
ARCHIVE / REJECTED MODEL

D5 v3 Unified Sequencer
ARCHIVE / IMPORTANT STRUCTURAL PROOF
One global transport + one shared visible grid was correct.

D5 v4 Live Edit Sequencer
ARCHIVE / CONTROL REFERENCE
Stable clickable grid, explicit random controls, clearer live semantics.

D5 v5 Curated Set
ARCHIVE / CONTENT REFERENCE
Role-aware patterns, collision-aware random, 15/20-step content work.

D5 v6 Edit / Perform
ARCHIVE / UI REFERENCE
Useful authoring/performance split and immediate ACK; began drifting toward mini-DAW complexity.
```

## MATERIAL EXPERIMENTS

```text
D5 v7 16-Material Pool
ARCHIVE / PARTIAL
Correctly separated material count from active-layer count, but material remained too short/simple.

D5 v8 Clip-First
KEEP AS MATERIAL PRINCIPLE
Backing ground + complete clips + optional arranger.

D5 v9 Auto Conductor
KEEP AS SAFETY / AUTO REFERENCE
Signal Guard + ASSIST / DRIVE.
```

## SPATIAL / INTERACTION EXPERIMENTS

```text
D5 v10 Fullscreen Control Field
KEEP AS RICH 2D INPUT REFERENCE
Confirmed full-screen continuous control is promising.

D5 v11 Simplified 4×4 Field
ARCHIVE / REJECT AS FINAL FORM
Useful simplification test, but visually fragmented and musically insufficient as a performance surface.
```

## SPATIAL PLAYGROUND / VISION PRO

```text
D4 v3 / WebXR branch
HOLD
Source exists, but real-device validation is still required.
```

Do not promote WebXR to the artistic mainline until the 2D graphical language and musical system pass their own gates.

---

# 4. Current capability audit

Scores are practical internal estimates, not claims of completion.

| Dimension | Midterm score | Assessment |
|---|---:|---|
| Transport / quantization | 8/10 | architecture is clear and reusable |
| Safety / error reduction | 7.5/10 | useful guard model exists |
| Control semantics | 7/10 | direct trigger + hold + auto + continuous input are understood |
| Authoring / performance separation | 7/10 | concept proven, UI still evolving |
| Musical material quality | 4/10 | audible and testable, not yet strong enough for a full set |
| Long-form musical structure | 4/10 | section logic exists conceptually but not yet compelling in sound |
| Full-screen visual quality | 4.5/10 | several behaviours exist, but no coherent visual art direction yet |
| 2D interaction potential | 8/10 | strong potential after moving beyond grid |
| Graphical/topological language | 3/10 | newly specified, not implemented |
| 3D / WebXR potential | 8.5/10 | strong conceptual fit, device proof still pending |
| Stage readiness | 3.5/10 | research prototype, not performance-ready |

The gap is obvious:

```text
CONTROL SYSTEM MATURITY
>
MATERIAL / COMPOSITION / VISUAL QUALITY
```

The second half should close that gap.

---

# 5. New midterm architecture

The original R1/R2/R3 map remains valid, but the next artistic proof lives at the R1–R2 boundary.

```text
                    PERFORMANCE CONTROL MODEL

R1 MUSICAL / TEMPORAL STRUCTURE
Transport · Clips · Phrase · State · Show
                    │
                    ↓
          GRAPHICAL CONTROL LANGUAGE
          Node · Edge · Path · Loop · Field
                    ↑
                    │
R2 INPUT GEOMETRY / SPATIAL CONTROL
Pointer · Touch · Keyboard · Hand · XYZ · Dwell
```

This is not a new parent project.

It is a shared interface between R1 and R2.

---

# 6. Second-half research question

The first-half question was approximately:

> How much system complexity can be controlled through minimal reliable input?

The second-half question becomes:

> Can musical structure be embedded into a graphical/spatial control topology so that the performer can navigate a complete audiovisual form through intuitive movement rather than micro-managing events?

This is a stronger bridge between:

- Touch:waves-like directness;
- Playground-like spatial control;
- the Performance Control Model;
- future Vision Pro 3D interaction.

---

# 7. Second-half development plan

## PHASE A — QUALITY GATE: MUSIC

Before more interface work:

- define one coherent sound world;
- curate / redesign 6–8 phrase families;
- establish harmonic / spectral compatibility;
- create a continuous ground capable of carrying silence between gestures;
- make one 30–60 second route musically satisfying without a visible interface;
- ensure repeat listening is tolerable and identity remains recognisable.

**Pass condition:** audio-only recording can carry a short performance segment.

## PHASE B — QUALITY GATE: VISUAL LANGUAGE

Reduce to 4–5 full-screen visual behaviours:

```text
FLOW
FIELD
PARTITION
ORBIT
COLLAPSE / RESIDUE
```

Every important input must change screen-scale composition, direction, density or persistence.

**Pass condition:** audience-only recording reads as one visual system, not a collection of widgets.

## PHASE C — v12 TOPOLOGICAL PLAYGROUND

Start with only 6–8 nodes.

```text
FIELD
→ ROUTE
→ ORBIT
→ PARTITION
→ DROP
→ RESIDUE
→ FIELD
```

One meaningful branch:

```text
PARTITION
→ REWIND
→ FIELD
```

No 16-node expansion yet.

**Pass condition:** one route creates a coherent 30–60 second audiovisual arc and can be repeated with controlled variation.

## PHASE D — ROUTE / LOOP PERFORMANCE

Study:

- snake paths;
- closed loops;
- retracing;
- branch choice;
- memory on repeated paths;
- path speed and dwell;
- safe return / release routes.

The route itself becomes a phrase / section controller.

## PHASE E — 3D TRANSLATION

Only after v12 passes in 2D:

```text
2D node      → spatial volume
2D edge      → 3D corridor / arc
2D path      → hand trajectory
2D field     → navigable control space
2D dwell     → spatial dwell / pinch hold
```

Then resume Spatial Playground device validation and compare 2D vs 3D with the same musical material.

---

# 8. Midterm quality gates

A future version is not promoted because it contains more code.

## Music gate

- Does one route sound intentional with eyes closed?
- Can it carry 30–60 seconds?
- Can it repeat without immediate fatigue?

## Visual gate

- Does every main action have screen-scale consequence?
- Is there a coherent composition and direction?
- Can local cues disappear in audience mode?

## Control gate

- Can a new user infer what to do from geometry?
- Can the performer recover from a bad move?
- Does the system filter invalid combinations without feeling unresponsive?

## Structure gate

- Does the path create a beginning, development, peak and release?
- Does history alter later behaviour?
- Can a repeated route remain recognisable but different?

## Spatial gate

- Is there a clear reason a future Z dimension improves the instrument?
- Can the same topology be represented as volumes and corridors?

---

# 9. Immediate next task

The next active research task is **not** another 16-control interface.

It is:

> Design and implement one 6–8 node topological route whose audio alone already forms a coherent 30–60 second phrase, then attach a reduced full-screen visual vocabulary to the same route.

Everything else goes to Parking Lot until this gate is tested.
