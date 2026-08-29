# No Further Input Required — Autonomous WebGL WIP

This folder is the self-contained browser runtime for **No Further Input Required / 无需进一步输入**.

- Canonical portfolio entry: `https://ewanqian.site/works/no-further-input-required`
- Direct runtime: `https://ewanqian.site/works/no-further-input-required-autonomous/`
- GitHub Pages path: `https://ewanqian.github.io/portfolio/works/no-further-input-required-autonomous/`

The visual surface contains no interface, labels, imported media, decorative noise or explanatory text. Three.js is vendored locally so the runtime has no CDN or external-asset dependency.

## The 90-second system

| Time | Internal phase | Visible action |
| --- | --- | --- |
| 0–15 s | ORIGIN | One central condition becomes two distinct states. |
| 15–30 s | DIFFERENTIATION | Two become four through orientation; four become eight through relation. |
| 30–50 s | RELATION | Each of the eight ancestors unfolds into an octant of a 4×4×4 lattice. |
| 50–70 s | EVOLUTION | Node count stays fixed at 64 while local states and graph relations change from the previous generation. |
| 70–90 s | SELF_INPUT | External rule seeding stops. The field measures itself and selects its own next rule. Its final state becomes the seed of the following cycle. |

The transition at 90 seconds is not a replay cut. The active centroid of the final field contracts into the next origin, and the next cycle remaps the previous final state instead of creating a fresh random seed.

## Actual self-input loop

Every autonomous generation performs this closed loop:

```text
previous generation
        ↓
density · symmetry · stability · entropy
        ↓
EXPAND · CONNECT · PRUNE · MUTATE
        ↓
next generation
```

The four fixed rules are deliberately small:

- `EXPAND` grows into under-populated axial neighborhoods.
- `CONNECT` preserves viable nodes and forms additional local relations.
- `PRUNE` removes crowded or weakly supported states.
- `MUTATE` flips a sparse, coordinate-derived subset when the field remains too stable.

No autonomous generation reads a new random value. Every state is computed from the immediate previous state, the current measurements and a deterministic internal generation index.

## Ancestry

The 1 → 2 → 4 → 8 split tree remains as a faint wireframe inside the 64-node field. During evolution, three previous cellular generations remain at approximately 40%, 15% and 6% of the current generation's visual weight.

## Runtime architecture

- `index.html` — fullscreen, interface-free surface.
- `main.js` — Three.js scene, instancing, lineage, graph rendering, cycle handoff and WebXR session entry point.
- `fallback.js` — interface-free Canvas 2D compatibility renderer used only when the browser cannot create a WebGL context; it preserves the same 90-second hierarchy and deterministic state inheritance instead of leaving a black page.
- `simulation.js` — deterministic lattice, measurements, rule selection and generation history.
- `simulation.test.mjs` — mechanism tests proving parent dependency, input cutoff, deterministic output and cycle inheritance.
- `vendor/three.module.min.js` and `vendor/three.core.min.js` — locally vendored Three.js 0.185.1 runtime.

`renderer.xr.enabled` is active and the render loop uses `renderer.setAnimationLoop`. A future XR shell can pass an approved session through `window.NFI.enterXR(session)` without changing the simulation.

## Hidden presentation controls

These do not appear on the visual surface or alter the autonomous rule logic:

- `F` or double-click — browser fullscreen.
- `0` — restart the current execution from the original seed.
- `Space` — pause / resume for inspection.
- `R` — start / stop a 60 fps WebM canvas recording.
- `?seed=value` — choose a deterministic initial seed.
- `?t=70` — open at a timeline position for testing.
- `?speed=4` — accelerate time for testing.

Run the mechanism tests from the repository root:

```sh
node --test works/no-further-input-required-autonomous/simulation.test.mjs
```
