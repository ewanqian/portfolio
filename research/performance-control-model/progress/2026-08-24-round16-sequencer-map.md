# Performance Control Model — Round 16 / Sequencer Map

## Trigger

User feedback on v12:

- exit / outside-region state was not obvious;
- effects remained too local and visually monotonous;
- music was audible but not yet capable of carrying a full performance;
- new direction: treat the instrument as a **map / image**, and let small sequencer diagrams appear as playful musical landmarks inside the map;
- target quality should approach Touch:waves-level immediacy while preserving Playground-like adjacency and future WebXR compatibility.

## v13 — Sequencer Map

Public stable route remains:

`/playground`

The deployed experiment path remains:

`/lab/personal-av-instrument/topological-playground/`

v13 is implemented as a patch over the archived v12 runtime so the deployment route remains stable.

### Main interface change

```text
MAP / TOPOLOGY
+
SMALL MICRO-SEQUENCER ICONS INSIDE NODES
+
FULL-SCREEN AUDIOVISUAL CONSEQUENCES
```

The sequencer is no longer a large editing surface.
It becomes a small animated score / icon that communicates each node's rhythmic identity.

### Interaction state model

```text
ENTER
→ INSIDE
→ EXIT
→ CORRIDOR / BETWEEN
→ ENTER NEXT COMPATIBLE NODE
```

Leaving a node now explicitly clears the current node, triggers a release phrase and produces a screen-scale exit event.
While outside a node, the nearest compatible edge becomes a corridor with visual and audio transition feedback.
Non-neighbour jumps are rejected.

### Micro sequencer identities

Each node now has a visible 8- or 12-step miniature pattern:

- FIELD — sparse 8-step ground
- ROUTE — pulse / groove pattern
- ORBIT — denser 12-step high cyclic pattern
- PARTITION — cut / chord rhythm
- BURST — dense peak accents
- DROP — sparse heavy commitment pattern
- REWIND — reverse / release rhythm
- RESIDUE — sparse 12-step memory tail

The current global playhead animates inside every miniature score.

### Music layering correction

v13 adds continuously scheduled node patterns on top of v12's phrase entry system:

```text
CONTINUOUS GROUND
+
NODE ENTRY PHRASE
+
MICRO-SEQUENCER LOOP
+
GESTURE EVENTS
+
EXIT RELEASE
+
CORRIDOR TRANSITION
```

This is intended to make a node feel like a sustained musical location rather than one short sound.

### Visual correction

The node graphic remains a small map landmark.
Important events expand beyond the node:

- ENTER — multiple expanding full-space rings
- EXIT — large release arcs + full-screen wash
- CORRIDOR — highlighted path between compatible landmarks
- BURST — full-screen strobe layer
- PARTITION — screen-scale moving cut strip
- DROP — collapse remains full-screen / large scale

### Current status

```text
D5 v13 SEQUENCER MAP         IMPLEMENTED / USER TEST PENDING
EXIT / CORRIDOR STATE        IMPLEMENTED / USER TEST PENDING
MICRO-SEQUENCER ICONS        IMPLEMENTED / USER TEST PENDING
MUSICAL QUALITY              NOT PASSED
VISUAL QUALITY               NOT PASSED
WEBXR                        HOLD
```

## Next quality gate

Do not add more nodes.

Test whether the following three ideas are now perceptually clear:

1. the screen reads as one musical map, not eight isolated widgets;
2. exit / corridor / next-node navigation is obvious and musically meaningful;
3. micro sequencer patterns make each landmark feel like a persistent musical mechanism.

If the music is still too simple after this layer, the next task is **curated rendered audio assets / clip families**, not more Web Audio oscillator features.
