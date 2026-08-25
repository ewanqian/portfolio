# NFI Artwork Processing — 30s Exhibition Loop

Processing 4 / Java mode / `P3D` OpenGL.

## Start here

For local Codex or any new working session, read in this order:

```text
CODEX-HANDSHAKE.md
CURRENT-EXHIBITION-BOARD.md
EXHIBITION-30S-R3-BRIEF.md
research/GLYPH-ASCII-NOTHING-RESEARCH.md
research/DESIGN-AESTHETIC-CROSS-REFERENCE.md
```

Historical six-state code and the superseded 180-second plan are under `archive/`; they are not active sketch tabs.

## Current target

```text
3840 × 2160
60 fps target
30 sec deterministic seamless cycle
1800 frames per cycle
3 min screen recording = 6 cycles
no audience input
no visible UI
```

## Run

Open this folder as a Processing sketch:

```text
projects/no-further-input-required/NFI_Artwork_P3D/
```

Main tab:

```text
NFI_Artwork_P3D.pde
```

Press Run in Processing 4.

The default output is 4K. For a lighter 1920×1080 review window, start Processing with environment variable:

```text
NFI_REVIEW=1
```

If using `processing-java`:

```bash
NFI_REVIEW=1 processing-java --sketch=/absolute/path/to/NFI_Artwork_P3D --run
```

On Windows PowerShell:

```powershell
$env:NFI_REVIEW="1"
processing-java --sketch="C:\path\to\NFI_Artwork_P3D" --run
```

Remove `NFI_REVIEW` for the 3840×2160 master.

## Three refinement rounds built into one sketch

```text
1  ROUND 1 / ORDER
   Constraint + Index Field + Quantized Memory
   strict hierarchical grid, no symbol layer

2  ROUND 2 / MECHANICAL LANGUAGE
   Round 1 + ASCII / Unicode symbol layer
   addressable zone pulses + progress sequence

3  ROUND 3 / EXHIBITION CANDIDATE
   reduced scaffolding, stronger memory/recall,
   sparse mechanical glyphs, current recommended baseline
```

Keys:

```text
1 / 2 / 3  switch round
R          restart 30 sec loop at frame 0
SPACE      pause / resume
D          local debug overlay (hidden by default)
S          save a PNG frame
ESC        exit
```

For recording, use Round 3, press `R`, then begin the screen capture. Record at least 180 seconds if the submission needs a 3-minute file. The visual system itself repeats every 30 seconds.

## Performance rules

- `pixelDensity(1)` prevents a Retina/high-DPI window from silently rendering above 4K.
- `P3D` uses Processing's OpenGL renderer.
- `smooth(4)` is the current quality/performance compromise; if 4K misses 60 fps, test `smooth(2)` before changing visual logic.
- no blur, bloom, full-frame noise, particles or feedback FBO are used in the current candidate.
- animation time is frame-indexed rather than wall-clock based; at stable 60 fps the cycle is exactly 30 seconds and loops deterministically.
- no external library is required for R1–R3.

## Optional future library test

If a later round specifically requires GPU feedback, optical flow or shader-heavy image processing, evaluate PixelFlow on a separate branch. Do not add it to the submission runtime unless it creates a visible artistic improvement and survives a 4K stability test.

## QA before recording

1. Pull latest main and complete the `CODEX-HANDSHAKE.md` status block.
2. Run Round 3 at 1080p once before editing.
3. Run Round 3 at 4K for 10 minutes.
4. Use `D` briefly and record measured FPS, then turn debug off.
5. Watch the 29.5s → 0s boundary several times; there should be no obvious reset flash.
6. Check Unicode symbols on the exhibition Windows machine. If unsupported squares appear, remove/replace the symbol from `MechanicalGlyphLanguage.pde`; do not bundle font files into the repository as a quick fix.
7. Check the image from several metres / reduced preview size for line hierarchy and order.
8. Record the clean output with cursor hidden and debug off.

Current truth status: code is prepared in repository; **4K/60 runtime has not yet been physically benchmarked on the exhibition machine.**
