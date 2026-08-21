# P01–P08 PERFORMANCE BRIDGE

> Agent-facing bridge between **No Further Input Required v0.7** performance logic and the eight process modules in `AGENT-REFERENCE.md`.

## Purpose

The eight processes must **not** become eight full-screen presets.

They should behave as performable processes inside one persistent audiovisual runtime:

```text
continuous musical ground
+ global BPM / bar clock
+ autonomous activity
+ performer gesture
+ process phrase
+ residue
+ next process inherits the residue
```

The reference implementation is `works/no-further-input-required.html` (`Interactive V0.7`). Preserve its strongest structural idea: the background music and global time field continue while different behaviours appear, develop and disappear.

This document adds one further requirement:

> A performer without strong keyboard / music technique should still be able to produce an audience-facing Live Set with clear temporal form.

---

# 0. Shared performance grammar

## Internal time

- Keep one global BPM / bar clock.
- v0.7 currently starts at `104 BPM`; derivative instruments may expose a safe range rather than hard-code one value.
- Quantize major entries / commits / section changes to beats or bars when useful.
- Gestures may be imprecise; the performance should still remain coherent.

## Every input launches a phrase, not only an effect

Preferred envelope:

```text
GESTURE / KEY
→ ENTER
→ DEVELOP
→ TRANSFORM
→ RELEASE
→ RESIDUE
```

A useful phrase should normally remain legible for several beats after input ends.

## Pointer rule

Never make the core image behave like a cursor toy.

Avoid:

```text
mouse.x → object.x
mouse.y → object.y
```

Prefer:

```text
pointer path
→ velocity / curvature / loop / crossing / dwell / repetition
→ process energy or topology
→ autonomous behaviour continues
```

The pointer injects **energy, structure or intention**. It does not leash objects.

## Two input surfaces

Each process should support both:

1. **touch / pointer performance** as the richer spatial interface;
2. **QWERTY / MIDI fallback** as discrete triggers, rehearsal shortcuts or accessibility controls.

They must use the same underlying behaviour modules.

## Persistent music

Do not restart the whole soundtrack when changing process.

The musical ground should continue and processes should modify:

- density;
- voicing;
- register;
- rhythmic subdivision;
- filtering;
- foreground / background balance;
- phrase probability.

This is what allows the system to feel like **one performance**, not a collection of demos.

---

# 1. P01 — DECOMPOSE / 可演奏拆解

## Performance role

Opening / first intervention / controlled fragmentation.

## Touch grammar

- **tap** → place a compact seed object;
- **short swipe** → define decomposition direction;
- **slow drag** → stretch separation timing without dragging the fragments themselves;
- **figure-eight / repeated retrace** → increase internal subdivision density;
- **release** → fragments continue descending / separating for 1–2 bars.

## Musical behaviour

- start sparse;
- subdivision increases rhythmic micro-events;
- deeper decomposition introduces higher subdivisions / secondary timbres;
- release subtracts layers and leaves only a few residues.

## Audience test

One gesture should create a complete beginning–development–release sequence. The performer must not need to keep wiggling the mouse to keep it interesting.

---

# 2. P02 — TOKEN FIELD / 可演奏离散化

## Performance role

Rhythmic detail / language-media pulse / fast local activity.

## Touch grammar

- **swipe across field** → create a stream of discrete token events on the BPM grid;
- **dwell** → lock / sustain one token cluster;
- **rapid repeated stroke** → increase subdivision and token density;
- **circle a cluster** → select it as a recurring motif;
- **erase stroke** → suppress the selected cluster over the next beat/bar.

## Musical behaviour

Token density maps to rhythmic density and short timbral events, not raw volume alone.

The selected motif can remain active after the gesture and recur automatically for several bars.

---

# 3. P03 — CONTEXT ASSEMBLY / 可演奏重组

## Performance role

Build / layering / bringing earlier material back.

## Touch grammar

- **tap different regions** → introduce context fragments at different depths;
- **draw a path through fragments** → temporarily bind them into one phrase;
- **loop around old residue** → recall / harmonize / re-activate historical material;
- **cross two paths** → merge two context bundles;
- **release** → assembled bundle keeps reorganizing autonomously.

## Musical behaviour

Context fragments should re-enter as recognizable but transformed motifs.

This process is especially important for making the performance feel cumulative rather than scene-based.

---

# 4. P04 — BRANCH SEARCH / 可演奏分支

## Performance role

Build tension / controlled multiplication / pre-peak complexity.

## Touch grammar

- **single outward stroke** → initiate one branch;
- **crossing stroke** → introduce a fork / harmonic or rhythmic alternative;
- **rapid zig-zag** → temporary parallel candidates;
- **dwell on one branch** → increase its survival weight;
- **erase across branch** → prune it at the next quantized point.

## Musical behaviour

Branches may represent alternative rhythmic / tonal phrases. Only a small number survive.

Do not let every branch become another loud layer. Pruning and silence are part of the performance.

---

# 5. P05 — WEIGHT SPACE / 可演奏力场

## Performance role

Spatial main section / sustained movement / deep continuous control.

## Critical correction from v0.7 review

This process must explicitly fix the uncomfortable literal pointer-following behaviour observed in the current orbit / mouse-responsive states.

## Touch grammar

- **tap** → inject a temporary attractor;
- **circular gesture** → add angular momentum to the whole field;
- **slow figure-eight** → create two competing attractors / alternating emphasis;
- **fast swipe** → send an impulse through the field;
- **dwell** → temporarily increase local gravity / harmonic focus;
- **release** → the field continues according to inertia and stored weights.

The pointer should never permanently own the object position.

## Musical behaviour

Weight affects orchestration / probability / register / filter emphasis rather than direct note-by-note pitch control.

This makes the field playable even by a non-musician.

---

# 6. P06 — COMMIT / COLLAPSE / 可演奏决定

## Performance role

Peak → cut / transition / strong structural punctuation.

## Touch grammar

- **double tap / deliberate hold** → arm COMMIT;
- COMMIT executes only on a musically safe quantized boundary;
- **rapid final stroke** may bias which candidate survives, but cannot directly drag it into place.

## Musical behaviour

The important gesture is subtraction:

```text
high density
→ tension / pause
→ collapse
→ one surviving phrase
→ space
```

Do not solve COMMIT with another impact sound plus flash. The audience should feel a structural decision.

---

# 7. P07 — KNOWLEDGE EDGE / 可演奏边界

## Performance role

Bridge / expansion / creation of new territory.

## Touch grammar

- the interior is mostly autonomous;
- **outward stroke at the boundary** → deform / extend the world boundary;
- **repeated outward strokes** → open a new unstable region;
- **trace along boundary** → modulate how quickly the system fills the new area;
- after release, machine activity begins completing / interpolating the new region by itself.

## Musical behaviour

Human gestures introduce discontinuity or new structure; autonomous music then stabilizes and fills that structure.

This should feel different from merely adding more notes.

---

# 8. P08 — RESIDUAL MEMORY / 可演奏残留

## Performance role

Continuity layer across the entire Live Set. It is not only a final scene.

## Touch grammar

- every meaningful process leaves traces;
- **circle an old trace** → strengthen / recall it;
- **cross new gesture with old trace** → allow inherited behaviour to modify the new process;
- **erase gesture** → weaken but not necessarily delete historical influence;
- **repeated use** → raises the probability that a residue returns later.

## Musical behaviour

Residual memory should alter future phrase selection / harmony / density / transition probability where possible.

If residue is only a faded visual overlay, the concept has not yet been implemented strongly enough.

---

# 9. The eight processes are a Live Set vocabulary, not a playlist

Do not perform them in a fixed `P01 → P02 → ... → P08` slideshow.

A more useful performance flow is:

```text
continuous ground
↓
P01 seed / decomposition
↓
P02 rhythmic token activity
+ P08 residue remains
↓
P03 recalls older fragments
↓
P04 grows alternatives
↓
P05 becomes the sustained main spatial field
↓
P06 collapses the accumulated density
↓
P07 opens a new boundary / bridge
↓
return to any earlier process under changed P08 memory
```

Processes can overlap. One may stay as background while another becomes foreground.

---

# 10. Performance safety layer

To make the system stage-usable by a novice performer:

- constrain pitch materials;
- quantize major event timing;
- cap maximum simultaneous foreground phrases;
- cap visual density;
- provide graceful decay instead of abrupt disappearance;
- provide a safe `GROUND / RESET` state;
- allow an autonomous musical bed to carry the performance during pauses;
- provide predictable section / energy changes without forcing music-theory knowledge.

A successful interaction should reward gesture quality and compositional judgment, not piano technique.

---

# 11. Evaluation protocol

Every derivative Live Set should pass all four tests.

## A. No-input test

Leave the pointer untouched for 30 seconds.

**Pass:** system remains alive and musically coherent.

## B. One-gesture test

Perform one deliberate gesture, then release.

**Pass:** the result keeps developing for multiple beats without needing cursor babysitting.

## C. Novice five-minute test

Give a new user two minutes of instructions, then let them perform for five minutes.

**Pass:** they can create clear energy changes, transitions and returns without knowing harmony / keyboard technique.

## D. Audience-only test

Hide HUD / controls and record 3–5 minutes.

Show the recording to a viewer who does not know how the interface works.

**Pass:** it reads as an intentionally structured audiovisual performance rather than someone moving a cursor around a browser.

---

# 12. Reuse instruction for agents

When a future project says:

> `reference NFI v0.7 performance system`

read, in order:

1. `projects/no-further-input-required/README.md`
2. `projects/no-further-input-required/v0.7-performance-reference.md`
3. `projects/no-further-input-required/AGENT-REFERENCE.md`
4. `projects/no-further-input-required/P01-P08-PERFORMANCE-BRIDGE.md`
5. `works/no-further-input-required.html`

Reuse the **architecture and interaction grammar**, not the exact visual style.
