# 816 Web → Local Processing Handoff

Status: current source of truth
Date: 2026-08-25

## Goal

Keep it simple.

The webpage logic only needs to become **six clear Processing states**. Do not keep adding new grammars, modules, or effect families.

The translation rule is:

```text
web behavior
→ what changes
→ what drives it
→ how it moves
→ Processing primitive
```

Do not copy DOM, cards, layout chrome, or decorative assets. Rebuild the behavior.

## Shared rules

All six states share the same small set of values:

```text
energy    0..1
hit       0..1
motion    0..1
density   0..1
memory    0..1
direction -1..1
```

That is enough for the first Processing version.

Input should change **energy / direction / timing / topology**, not directly drag an object around.

```text
BAD
mouse position → object position

GOOD
mouse / key input → impulse → system reacts → system keeps moving
```

## The six states

These are the same six states already used by the previous NFI / P3D architecture:

```text
01 ROUTE
02 FIELD
03 ORBIT
04 REWIND
05 CELLS
06 PARTITION
```

The point now is not to invent more states. It is to make these six visually and behaviorally different enough.

---

## 01 — ROUTE

### What it is

A readable directional score.

The frame has several horizontal routes / lanes. Movement has a clear start, direction, and destination. It should feel like information being sent through a system rather than particles wandering around.

### Motion

- slow scan moves across the frame;
- each lane has a slightly different speed;
- key / click creates a pulse that travels along one route;
- old pulses fade, but the route itself remains stable;
- left → right input should be immediately readable.

### Processing primitives

```text
lines
small nodes
moving pulse
short tail
route intersections
```

### Avoid

- random flow-field soup;
- too many particles;
- every line moving independently.

The still frame should already look ordered.

---

## 02 — FIELD

### What it is

A real floating / buoyant state.

The previous version looked like a grid that merely wobbled. This one should actually feel suspended in a field.

### Motion

Use four horizontal layers.

Each layer has its own:

```text
amplitude
speed
phase
vertical range
```

Objects slowly rise and fall. Adjacent elements lag behind one another instead of moving together.

Input adds local buoyancy:

```text
press
→ nearby points rise / spread
→ energy dissipates
→ they slowly settle back into the field
```

### Processing primitives

```text
points / circles
soft vertical drift
layered depth
local spring force
slow phase lag
```

### Avoid

- simple sine-wave line;
- global shake;
- identical motion for every row.

---

## 03 — ORBIT

### What it is

A calm, controlled orbital structure.

Keep the orbit idea, but remove the clutter.

### Structure

Use four main rings. The four rings can correspond to four keyboard rows / four input groups.

```text
row 1 → ring 1
row 2 → ring 2
row 3 → ring 3
row 4 → ring 4
```

### Motion

- rings rotate at different but related speeds;
- input changes phase / speed / radius slightly;
- one press creates one clean orbital impulse;
- after release, the ring keeps moving;
- no radial explosion every time;
- no cursor-following center.

### Processing primitives

```text
ellipse / arc
polar coordinates
few satellites
phase offset
ring pulse
```

### Avoid

- too many satellites;
- full-screen bursts;
- orbit center following the mouse.

This state should feel quieter than ROUTE and FIELD.

---

## 04 — REWIND

### What it is

A typographic / trace state built around reverse motion and recall.

The old small flying letters were too weak. Here the input itself becomes a large graphic event.

### Motion

On a key press:

```text
key
→ large glyph appears
→ briefly expands / stretches
→ leaves 2–4 reverse traces
→ traces move back toward the origin
→ glyph fades
```

The glyph should be large enough to become composition, not annotation.

Recommended browser-independent Processing font fallback:

```text
SansSerif / Helvetica / Arial-style bold
```

Do not depend on a custom font file.

### Row differences

Different input rows can behave differently:

```text
digits → narrow / vertical
Q row  → wide / horizontal
A row  → centered / heavy
Z row  → low / compressed
```

### Processing primitives

```text
text()
scale
stretch
alpha trail
reverse position samples
```

### Avoid

- tiny labels;
- letters flying randomly;
- every key producing the same animation.

---

## 05 — CELLS

### What it is

A grid / score state where rows and columns genuinely behave differently.

### Structure

Use a stable matrix. Do not make it another particle scene.

Rows can use different visual grammar:

```text
row 1 → circles
row 2 → squares
row 3 → bars
row 4 → filled blocks
```

Columns can carry timing differences:

```text
odd columns  → short pulse
even columns → slow fill
selected cols → invert / connect
```

### Motion

- key press activates one cell;
- neighboring cells can respond with a weaker envelope;
- a phrase across keys becomes a visible path;
- activity fades back to a readable empty grid.

### Processing primitives

```text
indexed cells
rect / ellipse / line
row + column addressing
activation envelope
neighbor links
```

### Avoid

- every cell pulsing all the time;
- random activation;
- making every row visually identical.

---

## 06 — PARTITION

### What it is

A large rectangular composition state.

This one should be visually different from all point / line / orbit states.

### Structure

The frame is divided into a few large bands / panels.

Input changes the partition itself:

```text
press
→ open a section
→ close another section
→ fill a band
→ shift a divider
→ leave a short memory of the previous layout
```

### Motion

- dividers move slowly;
- large areas expand / contract;
- hits can produce a fast snap or inversion;
- after the hit, the layout settles into a new composition.

### Processing primitives

```text
rectangles
bands
moving dividers
mask-like fills
large negative space
```

### Avoid

- filling the whole screen with small details;
- turning it into another grid;
- decorative motion without changing composition.

---

## State difference

The six states should be recognizable even as black-and-white screenshots:

```text
ROUTE      = directional lines
FIELD      = floating layers
ORBIT      = concentric / circular structure
REWIND     = large type / reverse traces
CELLS      = indexed grid
PARTITION  = large blocks / bands
```

If two states look interchangeable in a still frame, one of them is not designed strongly enough yet.

## Timing

Only use three motion speeds:

```text
FAST    hit / key response        1–12 frames
MEDIUM  settle / expand / rewind  0.2–1.5 sec
SLOW    autonomous background     4–20 sec
```

No need for a larger dramaturgy system yet.

## Controls

First version only:

```text
1–6      select state
SPACE    hit
A        auto cycle
H        hold
R        reset
mouse    inject impulse / direction
keyboard performance keys can be added after the six states look right
```

## Acceptance

A state is good enough when:

1. one screenshot already shows its identity;
2. it moves differently from the other five;
3. input causes a clear response;
4. it keeps moving after input stops;
5. it has a quiet state;
6. it does not need extra effects to look complete.

That is the whole first milestone.

## Current implementation

Use:

`Processing816Six/Processing816Six.pde`

The earlier eight-state `Processing816Grammar` is kept only as an experiment/history. It is no longer the direction to continue.

The existing six-state architecture remains compatible with:

`research/performance-control-model/experiments/nfi-p3d-harness/PROCESSING-ARCHITECTURE.md`
