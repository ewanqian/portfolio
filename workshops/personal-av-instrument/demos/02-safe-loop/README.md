# Starter 02 — Safe Loop / Quantized Layering

**Role:** first workshop system that can continue without constant key mashing  
**Concept:** system protects time / gain / density; human controls a few structural decisions  
**BPM:** 120  
**Status:** source created 2026-08-23

## Controls

- `A / ADD` — request one extra layer at the next bar; max 3.
- `S / REMOVE` — request one layer removal at the next bar; never below 1.
- `D / HOLD` — freeze density and suspend automatic decay.
- `F / RELEASE` — request return to the open one-layer state at the next bar.
- `Space / ACCENT` — safe immediate accent.
- `Esc / RESET` — return transport display and density to the safe baseline.

## What the system handles

- unified 120 BPM transport;
- bar-boundary execution for ADD / REMOVE / RELEASE;
- compatible fixed pitch material;
- master gain + compressor;
- maximum 3 musical / visual layers;
- automatic decay every four bars when the performer does not HOLD;
- finite oscillator / noise events rather than hanging sustained voices;
- explicit reset path.

This is deliberately not a finished composition. It is the first proof of the workshop claim:

> **the performer should not need to manufacture every beat; the system keeps continuity while the human makes higher-value structural decisions.**

## Teaching test

1. Start the loop and do nothing for ~8 seconds.
2. ADD twice.
3. Stop touching it and hear the system keep time.
4. HOLD before automatic decay.
5. REMOVE or RELEASE.
6. Compare this experience with Starter 00.

## Validation

- JS syntax check: PASS in local Node `--check` before commit.
- Browser DOM smoke: NOT TESTED reliably in this environment.
- AudioContext first gesture: IMPLEMENTED, NOT MANUALLY TESTED.
- Quantized action logic: IMPLEMENTED, NOT MANUALLY AUDITIONED.
- Limiter / compressor: IMPLEMENTED, NOT MANUALLY AUDITIONED.
- Chrome: NOT TESTED.
- Safari: NOT TESTED.
- Public deployed URL: NOT VERIFIED.

Next test is not “add more controls.” It is whether a novice can understand ADD / REMOVE / HOLD / RELEASE in under two minutes and keep the system coherent.