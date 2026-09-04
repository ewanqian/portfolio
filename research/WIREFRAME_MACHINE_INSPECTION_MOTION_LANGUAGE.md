# Wireframe Machine-Inspection Motion Language

A reusable visual-system note extracted from **ATMOSPHERIC ESCAPE / W03 SPACECRAFT INSPECTION**.

## 1. Core idea

Do not treat a wireframe model as a static object with a filter applied to it. Treat the model as a machine that can be **acquired, measured, sectioned, disassembled, indexed, rearranged, and reassembled**.

The visual language is closer to a scientific educational program, astronomical workstation, engineering atlas, or technical broadcast package than to a generic sci-fi HUD.

The machine remains the content core. UI exists to explain a structural event.

## 2. Wireframe rule

Use real model topology whenever possible.

Bad approach:
- arbitrary random line removal
- independent decorative strokes
- line sampling that breaks continuous structural members

Preferred approach:
- preserve connected mesh edges
- use lower raster resolution for character instead of deleting topology
- separate emphasis by line weight / brightness / reveal order
- for dense models, simplify by structural groups, not by random edge skipping

The visual should still read as a coherent machine at close range.

## 3. Reusable entrance choreography

**ACQUIRE → REVEAL → LOCK**

1. Start from a small amount of central geometry.
2. Reveal topology progressively.
3. Expand calibration circles / brackets.
4. Slow rotation begins only after the object becomes legible.
5. Annotation leaders enter after the object is locked.

This lets the object feel computed or discovered rather than simply faded in.

## 4. Reusable object-switch choreography

**DISASSEMBLE → HANDOFF → ASSEMBLE**

When changing from machine A to machine B:

1. A separates along local structural directions.
2. A reduces slightly in scale and loses emphasis.
3. A short handoff gap is allowed.
4. B appears in a dispersed state.
5. B assembles toward its normal topology.
6. UI labels update only after B becomes structurally legible.

Repeated inputs can queue this sequence. Do not hard-cut between machines.

## 5. Technical explanation states

A useful sequence:

1. Acquisition
2. Orthographic profile
3. Cutaway / section plane
4. Exploded diagram
5. Component inspection / detail window

Annotation order:
**target bracket → leader → component name → secondary data**

Keep only a few labels active at once.

## 6. Formation choreography

Keep spacecraft identities persistent between large states.

Recommended progression:

**LINE CATALOGUE → SLOT GRID → ORBITAL CAROUSEL → TELEMETRY LANES → MACHINE ASSEMBLY**

The same objects should interpolate from their current positions to the next layout. Do not destroy and recreate the fleet at each state.

Trajectory-memory lines can briefly show source-to-target movement during rearrangement.

## 7. Machine assembly

Existing spacecraft can become modules of a larger system:

- orbital station
- transfer vessel
- fuel/service farm
- docking cluster
- truss spine
- radial communication platform

Supplement the models with generated structural trusses, docking axes, datum circles, section rails, and measurement frames.

The generated geometry should look mechanically plausible and remain subordinate to the imported machine assets.

## 8. BPM behavior

Base clock: **100 BPM**.

Suggested hierarchy:
- quarter notes: large locks, camera settle, formation arrival
- eighth notes: scans, indicators, numeric flow, annotation pulses
- explicit event hits: inspection ring, component advance, object-switch choreography

Quantize input before firing visual events. This keeps improvised performance aligned without forcing autoplay.

## 9. Aesthetic constraints

- black background
- paper-white / gray line hierarchy
- hard pixels and deliberate raster scale
- no bloom
- no translucent glass panels
- no random sci-fi text
- every graph or window should have a technical meaning
- UI should expose a machine operation, not decorate the image

## 10. Reuse target

This language is intended to be reusable for:
- spacecraft
- truss structures
- engines
- satellites
- architectural assemblies
- industrial machines
- anatomical / scientific models
- technical product visualization

The key reusable idea is not “wireframe style.” It is **machine inspection as a performance grammar**.
