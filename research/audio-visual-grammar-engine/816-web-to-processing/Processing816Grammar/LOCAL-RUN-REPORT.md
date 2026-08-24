# Processing816Grammar — Local Run Report

Date: 2026-08-25  
Runtime: Processing 4.3 / Java Mode / macOS  
Status: `RUNNABLE HARNESS 0.1 / NOT FINAL VISUAL`

## Runtime corrections

Two repository-level blockers were found during the first local run:

1. `smooth(8)` in `setup()` caused Processing 4 to synthesize a second `settings()` method. It now lives inside the explicit `settings()` method.
2. Two offscreen OpenGL transition buffers failed framebuffer validation on this macOS runtime. The presentation surface remains `P3D`; transition buffers use `JAVA2D`. `CHROMA_STRAND` converts its internal Z displacement into a projected Y offset while rendered inside those buffers.

A deterministic capture hook is available only when:

```text
NFI_CAPTURE_MODE=816_GRAMMAR
```

Normal GUI runs are unchanged. Capture mode hides the HUD, warms each state for 45 frames, injects an exact hit into event-dependent states, saves eight 1280 × 720 frames, then exits.

## First visual evidence

Order in `captures/contact-sheet.png` is left-to-right, top-to-bottom.

| State | First-run evidence | Current action |
| --- | --- | --- |
| 01 FLOWCHAIN | autonomous field exists; still-frame hierarchy and route coherence remain too faint | REVISE |
| 02 RING_WAVE | exact event and short memory read immediately; composition is generic but functional | KEEP AS BASELINE |
| 03 SCAR_FLASH | immediate directional cut is readable; needs stronger phrase accumulation | KEEP AS BASELINE |
| 04 RESIDUE_FIELD | history is stateful but nearly absent as a composition | REVISE |
| 05 SIZZLE_GRAIN | macro band remains stable while micro-motion stays local | KEEP AS BASELINE |
| 06 PRESSURE_CHAMBER | strongest large-scale hierarchy and negative-space control | KEEP |
| 07 SCREEN_POINTS | readable topology and controlled activation path | KEEP |
| 08 CHROMA_STRAND | coherent low-density strand; survives as a still frame | KEEP |

These are Harness 0.1 decisions, not artwork PASS decisions.

## Next gate

Do not add grammar 9 or 10. Generate A/B/C structural variants only after this report is reviewed. Highest-priority variant work:

1. `FLOWCHAIN`: corridor / spiral / crossing attractors.
2. `RESIDUE_FIELD`: trace stack / attractor constellation / directional archive.
3. `PRESSURE_CHAMBER`, `SCREEN_POINTS`, and `CHROMA_STRAND`: preserve current baseline before branching.

Two-minute continuous playback and transition quality are not yet accepted by this screenshot run.
