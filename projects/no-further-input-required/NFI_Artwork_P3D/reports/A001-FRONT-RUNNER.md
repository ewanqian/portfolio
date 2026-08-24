# A001 — Front Fidelity Runner

Status: `RUNNABLE / WAIT FOR PER-STATE REVIEW`

## Result

- Processing: 4.3
- Renderer: `P3D`
- Window: 1840 × 980
- Seed: `160826`
- Default: automatic six-state review loop, 12 seconds per state
- Visible HUD: none
- Audio: none
- Camera: fixed orthographic front view
- Z-depth extension: none
- Cross-state mixing: none
- 180-second dramaturgy: not started

## Controls

```text
1–6   select state and stop auto advance
A     resume auto advance
SPACE pause / resume
R     reset deterministic state
S     capture current state
ESC   exit
```

## Captures

```text
captures/A001/01-front.png
captures/A001/02-front.png
captures/A001/03-front.png
captures/A001/04-front.png
captures/A001/05-front.png
captures/A001/06-front.png
```

## Implementation boundary

Each state has an independent `VisualState` implementation. Shared code supplies only renderer, clock, camera, deterministic seed, selection, and capture behaviour.

No external library was added in A001. Processing core P3D already supplies required front-view rendering. PeasyCam, shaders, depth buffers beyond default P3D, and other extensions remain deferred until A002; adding them now would not improve the required 2D fidelity gate.

## Review gate

Executor does not assign PASS / REVISE / REJECT. Reviewer decides each state independently:

```text
01 PASS / REVISE / REJECT
02 PASS / REVISE / REJECT
03 PASS / REVISE / REJECT
04 PASS / REVISE / REJECT
05 PASS / REVISE / REJECT
06 PASS / REVISE / REJECT
```
