# MK-01 SYNTHETIC COMBAT BODY v0.1

First production prototype for Work in Progress 07 / MECHANIC BATTLE.

## Deliverables

- procedural model generator;
- Blender build/export helper;
- named system hierarchy: SHELL / FRAME / MUSCLE / SIGNAL / CORE;
- first ten-state WebGL viewer;
- local-server launch path.

The generated OBJ is intentionally kept out of the repository in this prototype commit; it is reproducible from the generator and included in the downloadable working bundle.

## Run order

1. Run `generate_mk01_obj.py`.
2. Inspect / edit in Blender.
3. Run `build_in_blender.py` to save .blend and export GLB.
4. Run the web prototype through a local HTTP server.
5. Iterate proportions and hero-detail submodels after the layer/state system is stable.

## Current success criterion

A body that is not yet a final hero sculpt, but is structurally separable, exportable, and controllable as a live instrument.
