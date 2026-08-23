# Starter 01 — State Instrument

**Role:** first real control-model comparison  
**Concept:** `Result = Input + State`  
**Controls:** `1 = QUIET`, `2 = ACTIVE`, `Space = same input`  
**Status:** source created 2026-08-23

The button does not change. The current State changes how the same input is interpreted.

- `QUIET`: low density, long envelope, expanding residue.
- `ACTIVE`: short attack, more rhythmic sound, sharper directional visual.

The point is not that these are final artistic states. The point is to make one design principle physically obvious before introducing a transport or arrangement system.

## Teaching test

1. Trigger several times in QUIET.
2. Change only the State.
3. Trigger the same input several times in ACTIVE.
4. Ask: **what changed even though the input did not?**

Do not add more keys until the difference is legible without explanation.

## Validation

- JS syntax check: PASS in local Node `--check` before commit.
- Browser DOM smoke: NOT TESTED reliably in this environment.
- AudioContext first gesture: IMPLEMENTED, NOT MANUALLY TESTED.
- Chrome: NOT TESTED.
- Safari: NOT TESTED.
- Public deployed URL: NOT VERIFIED.
