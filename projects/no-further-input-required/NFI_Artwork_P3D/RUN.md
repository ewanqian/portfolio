# NFI Artwork P3D — A001 Front Fidelity Runner

Processing 4.3 / Java mode / `P3D`.

## Default run

The program opens at 1840 × 980 and automatically advances through the six 2026-08-16 reference states every 12 seconds.

## Review keys

```text
1–6  select one state and stop auto advance
A    resume auto advance
SPACE pause / resume time
R    reset deterministic state
S    save current front capture
ESC  exit
```

No visible HUD is drawn.

## Deterministic A001 captures

Run with environment variable:

```bash
NFI_CAPTURE_A001=1 processing-java --sketch=/absolute/path/to/NFI_Artwork_P3D --run
```

This writes:

```text
captures/A001/01-front.png
captures/A001/02-front.png
captures/A001/03-front.png
captures/A001/04-front.png
captures/A001/05-front.png
captures/A001/06-front.png
```

A001 intentionally uses Processing core only. External camera / shader libraries are deferred: Front Fidelity must pass before A002 introduces depth, parallax, or depth-debug tooling.
