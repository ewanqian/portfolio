# NFI Lattice Three

Standalone Three.js study for **No Further Input Required / 无需进一步输入**.

This is a new 2026 lattice study. It is not the current exhibition master (Unicode Pictographic Processing) and it does not replace the archived WebGL six-structure experiment.

Public URL: https://ewanqian.site/works/no-further-input-required-lattice/

Short URL: https://ewanqian.site/nfi-lattice.html

## What it is

A 90-second continuous field on a black 16:9 frame:

1. ORIGIN — one central node
2. DIFFERENTIATION — spatial binary split 1 → 2 → 4 → 8 (Y, then X, then Z)
3. RELATION — edges and constraints between the eight states
4. EVOLUTION — 4×4×4 / 64-node lattice, von Neumann cellular rules
5. SELF-INPUT — density / symmetry / stability / entropy choose the next rule; the previous cycle seeds the next

Ancestry is kept: interior nodes remain tied to their octant parent, and dead cells leave a faint trace.

## Files

- `index.html` — local / project entry
- `nfir-lattice.js` — ESM engine (three r185, InstancedMesh, WebXR-ready)

Double-click enters WebXR when the browser supports it. There is no on-canvas UI or text.
