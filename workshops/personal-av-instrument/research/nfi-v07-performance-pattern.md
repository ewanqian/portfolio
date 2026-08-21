# NFI v0.7 Performance Pattern — Workshop Reference

This note links **No Further Input Required / 无需进一步输入 — Interactive V0.7** back into the Personal A/V Instrument workshop research line.

## Why it matters

The useful part of v0.7 is not its exact visual style. It demonstrates a reusable performance structure:

- continuous generative background music;
- one shared BPM / bar clock;
- multiple visual behaviours inside one runtime;
- autonomous activity when the performer stops;
- sparse manual intervention (`NEXT / HOLD / AUTO` plus keyboard / pointer);
- browser-first fullscreen presentation;
- interaction can launch behaviours that continue after the gesture ends.

Source: `works/no-further-input-required.html` (`Interactive V0.7`).

## Current limitation to fix

Do not inherit literal pointer-following behaviour. The performer should not spend the show dragging graphics around with the mouse.

Preferred model:

```text
gesture path
→ analyse velocity / curvature / loop / crossing / dwell
→ trigger or modulate an audiovisual phrase
→ phrase continues autonomously
→ residue affects later behaviour
```

## Workshop / derivative reuse

Future Live Set instruments may reuse v0.7 as an architecture reference while replacing its aesthetics, state names and exact mappings.

Read:

1. `projects/no-further-input-required/v0.7-performance-reference.md`
2. `projects/no-further-input-required/AGENT-REFERENCE.md`
3. `projects/no-further-input-required/P01-P08-PERFORMANCE-BRIDGE.md`

The target is not merely a digital instrument. The target is a system that a novice performer can organize into a several-minute audience-facing audiovisual performance without requiring advanced keyboard or music-theory technique.
