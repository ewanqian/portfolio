# No Further Input Required — Doubao Build

A fullscreen Three.js / WebGL generative artwork. One continuous system in five phases:

1. **ORIGIN** — a single central node.
2. **DIFFERENTIATION** — recursive spatial binary subdivision 1 → 2 → 4 → 8 (structurally inspired by Taiji → Liangyi → Sixiang → Bagua; no iconography).
3. **RELATION** — edges and constraints appear; complexity arises from relationships.
4. **EVOLUTION** — the 8 states expand into a 4×4×4 / 64-node lattice; each generation is computed only from the previous one.
5. **SELF-INPUT** — external seeding stops. The system measures its own density, symmetry, stability and entropy, and selects among four fixed rule variants (EXPAND / CONNECT / PRUNE / MUTATE) for the next generation. Its output becomes its next input.

Ancestry is preserved as faint traces of parent generations. The ~90 s sequence loops seamlessly.

## Technical notes

- Three.js r160 via CDN importmap — no build step, no external assets.
- `InstancedMesh` for all node geometry (64 live + 64 traces + 15 skeleton).
- Deterministic seeded PRNG (mulberry32) — the same initial condition every load.
- WebXR-ready: `renderer.setAnimationLoop`, `renderer.xr.enabled`, VR button only when immersive VR is supported.
- Responsive 16:9 letterboxing, 60 fps desktop target.
- Hidden test hooks: `?t=<seconds>&freeze=1` jumps to a timeline position (no UI).

## This is the Doubao build

This folder is an independent version produced with Doubao. It is separate from the other `no-further-input-required` directories in this repository and does not share code with them.

Open `index.html` directly, or visit the deployed page at:
https://ewanqian.site/works/no-further-input-required-doubao/
