# No Further Input Required — Working Index

This directory contains reusable implementation and design records for **No Further Input Required / 无需进一步输入**.

## Start here for agents

- [`AGENT-REFERENCE.md`](./AGENT-REFERENCE.md) — implementation rules, v0.7 reuse policy, touch-performance architecture, and P01–P08 process prototypes.
- [`v0.7-performance-reference.md`](./v0.7-performance-reference.md) — human-readable record of what is valuable in Interactive v0.7 and what should not be inherited.
- [`P01-P08-PERFORMANCE-BRIDGE.md`](./P01-P08-PERFORMANCE-BRIDGE.md) — converts the eight process modules into a reusable Live Set grammar with BPM, gesture semantics, phrase envelopes, residue, novice safety and audience tests.

## Canonical project files

- Main project document: [`../no-further-input-required-2026.md`](../no-further-input-required-2026.md)
- Current playable source: [`../../works/no-further-input-required.html`](../../works/no-further-input-required.html)
- Public playable URL: `https://ewanqian.site/works/no-further-input-required.html`

## 2026 WebGL exhibition runtime

A separate browser-native exhibition build is preserved at [`../../works/no-further-input-required-webgl/`](../../works/no-further-input-required-webgl/).

- Stable public URL: `https://ewanqian.site/works/no-further-input-required-webgl.html`
- Engine: WebGL 2 fragment-shader system + Web Audio API
- Duration: 180 seconds, deterministic loop
- Audience UI: none after entry
- Click / `S`: enter fullscreen and start sound
- `F`: fullscreen toggle
- `0`: restart loop
- `1`–`5`: jump to review checkpoints (15 / 45 / 82 / 126 / 162 seconds)
- `R`: start / stop a browser-side WebM capture of the canvas; audio is included after sound has been started
- `?t=126`: open directly at a review time without changing the artwork logic

This WebGL build translates the exhibition grammar rather than the old interactive-instrument branch. The six structures coexist as weighted layers; the runtime emphasizes grid discipline, quantized memory, route persistence, constraint acceptance, index recall, recursive assembly, residue and autonomy. The Sierpinski reference appears only as a low-level recalled pattern inside the memory field rather than as a permanent central emblem.

## Rule

Keep v0.7 available as a historical playable performance reference. Develop the gallery work through new process prototypes rather than destructively rewriting the only preserved v0.7 implementation.
