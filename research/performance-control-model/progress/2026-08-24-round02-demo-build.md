# Performance Control Model — Round 02 Demo Build

**Date:** 2026-08-24  
**Status:** IMPLEMENTED / USER TEST PENDING

## Active research task

Prove quantized audiovisual capsules on one authoritative Web Audio transport, while preparing a directly comparable layer/state/WebXR test chain.

## Standalone test set

Canonical folder:

`research/performance-control-model/demos/2026-08-24/`

- `d0-direct-trigger.html` — low-level direct-trigger baseline.
- `d1-quantized-capsules.html` — Web Audio transport + pending queue + 1/8 or 1/4 quantization.
- `d2-four-layer-sequencer.html` — KICK / LOW / HIGH / TEXTURE; layer changes commit on bar boundaries.
- `d3-shared-state-av.html` — OPEN / BUILD / BREAK; shared high-level state interpreted separately by sound and visual behaviour.
- `d4-visionpro-spatial-adapter.html` — Vision Pro WebXR hand-pinch adapter controlling the same layer semantics as desktop buttons.
- `index.html` — test order and feedback format.

## Status boundary

```text
SOURCE CREATED      YES
DESKTOP USER TEST   PENDING
SCREEN RECORD       PENDING
VISION PRO TEST     PENDING
PASSED               NO CLAIM YET
```

## User feedback format

For each demo record only:

```text
WORKED
FAILED
NEXT CHANGE
```

Do not promote D2/D3/D4 into the canonical runtime until D1 timing/capsule behaviour has been tested and the user reports the result.
