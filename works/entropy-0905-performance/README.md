# ENTROPY / 2026-09-05 Performance Asset Archive

**Post-show status:** performance completed; archive / case-study packaging active.  
**Portfolio PM priority:** P0 as of 2026-10-29.

This folder preserves reusable production assets from the 2026-09-05 ENTROPY performance work.

For the post-show evidence boundary, final-publication blockers and shipped-vs-planned reconciliation, read:

**[`POST-SHOW-CLOSEOUT.md`](./POST-SHOW-CLOSEOUT.md)**

## Archive rule

Do not keep important baked structures only inside one show HTML file.

Each reusable production state may preserve:

- `assets/baked/<asset>-vNNN.js` — immutable baked geometry / point-cloud data
- `config/cameras.json` — canonical camera presets
- `states/manifest.json` — asset + camera + layer combinations encoded in the production archive
- `runtime/load-state.js` — shared loader for viewers / show builds
- `archive/` — old complete show prototypes, only as reference

## Canonical repository asset

`assets/baked/network-rich-v001.js`

This is the first canonical production bake preserved from the working ENTROPY system. Never overwrite `v001`; if the structure is genuinely reused or evolved in a future project, create a new version rather than mutating the archived identity.

## State identity

A repository state can be represented as:

`BAKED ASSET + CAMERA PRESET + LAYERS + MOTION / PERFORMANCE PHRASE`

This separation is the reusable idea worth preserving beyond the show.

### Evidence boundary

A state or asset existing in this archive proves that it was encoded as part of the production system.

It does **not automatically prove that it was used live onsite** on 2026-09-05. Final public copy must follow the post-show verification in `POST-SHOW-CLOSEOUT.md`.

## Historical candidate assets — not current TODOs

Earlier production planning proposed additional baked asset families:

- `network-branching-v002`
- `volume-lattice-v001`
- `globe-shell-v001`
- `nerve-bundle-v001`
- `terrain-volume-v001`
- `ring-volume-v001`
- `constellation-depth-v001`

These names are retained only as **historical R&D candidates**.

They are **not an active post-show backlog** and should not be implemented merely to complete the old production plan. A future project may revive one only when it has a concrete visual / performance requirement.

## Current next step

The current task is not to expand the asset library.

It is to close the performance archive:

1. select final live documentation;
2. verify final credits and output configuration;
3. classify planned elements as `SHIPPED_LIVE`, `SHIPPED_AS_FALLBACK_OR_ASSET`, `TESTED_NOT_USED`, or `PLANNED_NOT_COMPLETED`;
4. extract one readable final system diagram;
5. prepare an evidence-backed public case study.

Tracking:
- Portfolio PM: Issue #93
- ENTROPY production source: Issue #70
