# Performance Control Model — 2026-08-24 / Round 14

## Active question

Can the full-screen 4×4 control field be simplified so that touch/mouse interaction is immediately legible while preserving the 16-material performance surface?

## D5 v11 — Simplified 4×4 Performance Field

Round 13 proved that the full screen can become the instrument, but the material-specific XY mappings were too semantically heavy. Round 14 keeps the 4×4 field and compresses the continuous grammar:

```text
TAP / ENTER
→ trigger complete clip

Y / vertical drag
→ MIN / LOW / MID / FULL / PEAK
→ prepared density / phrase state

X / horizontal drag
→ light material variation only

LONG HOLD
→ HOLD / deeper sustained state
```

The vertical axis is now the primary performance control. Higher means fuller/busier; lower means sparser. When a clip is already active, changing density injects the corresponding internal phrase at the next quantized point so the state change is audible, not only visual.

## Continuous surface

Pointer capture is intercepted at the whole 4×4 field rather than treating 16 zones as isolated buttons:

```text
pointer down
→ trigger current zone

drag across boundary
→ enter next zone
→ trigger that material
→ continue without releasing pointer
```

A global fading pointer trail and full-screen material overlays make the surface read as one instrument rather than 16 disconnected widgets.

## Keyboard grammar

```text
LEFT / RIGHT
→ move selection spatially across grid

UP / DOWN
→ change selected material density preset

SHIFT + LEFT / RIGHT
→ fine horizontal variation

ENTER
→ trigger selected material

SPACE short
→ trigger

SPACE long
→ HOLD while pressed

A/S/D/F/J/K/L/; + Q/W/E/R/U/I/O/P
→ direct select + trigger
```

## Visual correction

The v10 local XY visuals are retained as a base, with a new full-screen overlay layer:

- PARTITION can extend large split blocks beyond its local cell;
- ORBIT draws larger concentric systems;
- SCAN crosses the whole stage height;
- FIELD creates full-width lines;
- DROP / IMPACT generate stage-scale rings;
- AIR / CELLS create distributed streak fields;
- every accepted trigger gives a brief stage-wide flash plus local ring feedback.

This is meant to reduce the previous crude XYZ-displacement feeling and make gestures read as process activation.

## Control hierarchy

```text
PRIMARY     Y = prepared density / phrase state
SECONDARY   X = light variation
TERTIARY    HOLD / AUTO assistance
```

Minimal input is therefore not fewer materials; it is fewer semantic action types.

## Status

```text
D5 v11 simplified field     IMPLEMENTED / USER TEST PENDING
D5 v10 control field        RICHER XY BASELINE
D5 v9 auto conductor        SAFETY / AUTO BASELINE
Vision Pro                  HOLD
```

## Test gate

1. Fullscreen → Play.
2. Drag vertically in K / PARTITION from MIN to PEAK and judge whether density is immediately audible.
3. Repeat with ORBIT, FIELD and DROP.
4. Drag continuously across multiple zones without releasing the pointer; verify the surface does not feel locked to cells.
5. Compare horizontal variation against vertical control; X should remain secondary.
6. Use only arrow keys + Enter/Space and judge whether the grid has clear spatial orientation.
7. GUIDE OFF and judge whether the image still reads as a live visual performance.
