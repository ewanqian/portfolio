# Round 01 Checkpoint — 2026-08-24

## ACTIVE TASK

Prove quantized audiovisual capsules on one authoritative Web Audio transport.

## LOCKED

- browser runtime core: Web Audio + Three.js/WebGL + WebSocket;
- runtime hierarchy: Asset → Capsule/Cell → Clip → Sequence → Layer → State → Show;
- input devices are adapters, not separate musical engines;
- WebXR remains P1 until the runtime produces a stable performance fragment;
- Touch:waves is treated as a comparative precedent, not a source-code dependency.

## RESULT

Current scope is intentionally reduced to:

```text
1 AudioContext transport
4–8 capsules
beat/bar quantization
pending trigger queue
shared audio/visual timestamps
density/voice ceiling
reset
```

## STATUS

```text
RESEARCH MAP          DONE
RUNTIME SPEC          DONE
ACTIVE TASK           DEFINED
CAPSULE PROTOTYPE     NOT YET IMPLEMENTED
```

## HYGIENE

- preserve NFI v0.7 as a historical reference;
- keep IMPLEMENTED / TESTED / PASSED separate.

## PARKING LOT

8-layer sequencer, AI clip generation, AudioWorklet, WebXR D01, OSC/MIDI bridge, PWM/electronics teaching experiments and large-format output remain parked.
