# vL1 — Topological Playground Low-fi Validation

Date: 2026-08-24
Status: IMPLEMENTED / USER TEST PENDING
Public source: `works/topological-playground.html`

## Why reset to low-fi

v12/v13 proved that a map / topology metaphor is promising, but the performance route was too singular, several audiovisual effects were weak, EXIT was not explicit enough, and the micro sequencer was more decorative than structural.

The current gate is therefore not visual polish. It is whether the system can support a readable performance grammar.

## vL1 validation questions

1. Can one map support several distinct performance paths instead of one canonical loop?
2. Does every region have a clear ENTER / INSIDE / EXIT / BETWEEN behaviour?
3. Does a micro sequencer function as the local musical score of a region rather than decoration?
4. Can the sequencer be edited quickly enough during rehearsal?
5. Can Chinese note-style explanations make the topology legible during design/testing?

## Regions

- FIELD / 场域区 — base, ambience, low energy
- ROUTE / 路径区 — pulse, groove, forward motion
- ORBIT / 轨道区 — cyclic motif, circular gesture
- PARTITION / 切分区 — build, cut, structural split
- BURST / 爆点区 — peak, strobe, transient accent
- DROP / 下坠区 — sub, commit, impact
- REWIND / 回撤区 — reverse, withdrawal, release
- RESIDUE / 余波区 — memory, tail, decay

Each region exposes its function directly in Chinese notes: purpose, enter, inside, exit and recommended adjacent regions.

## Multi-path templates

A / 平稳推进:
`FIELD → ROUTE → ORBIT → FIELD`

B / BUILD:
`FIELD → ROUTE → PARTITION → BURST → PARTITION`

C / 爆点:
`ROUTE → PARTITION → BURST → DROP → REWIND`

D / 回收:
`DROP → REWIND → RESIDUE → FIELD`

These templates are test scaffolds, not final composition rules. Manual traversal remains available through the richer adjacency graph.

## Editable micro sequencer

Every region has an 8- or 12-step local score. The map shows the pattern as a small icon and the editor exposes:

- step on/off
- Shift+click accent
- rotate left/right
- density +/-
- 8/12 step length
- probability
- reset

The same pattern drives actual node sound events and the visible playhead.

## Spatial grammar

`ENTER → INSIDE → EXIT → BETWEEN/CORRIDOR → NEXT ENTER`

Leaving a region is now a first-class event. The corridor is an intermediate performance state rather than empty screen space.

## Audio strategy

Still low-fi, but the structure is layered:

- global pulse / kick / high-frequency clock layer
- compatible harmonic cycle
- node-specific local sequencer
- enter phrase
- gesture micro-events
- exit phrase
- corridor transition

This is not an audio-quality pass. If the grammar works, the next audio gate is to replace browser-native timbres with a curated original AudioBuffer phrase/sample bank.

## Visual strategy

Only a few global grammar families remain in the validation build:

- FIELD
- FLOW / ROUTE
- ORBIT
- PARTITION
- BURST
- DROP
- REWIND
- RESIDUE

No visual effect survives merely because it existed in an older demo.

## Fullscreen

True Fullscreen API is attempted first. If unavailable, Stage Mode fills the viewport and hides design/debug panels. `F` toggles fullscreen; `Esc` exits Stage Mode.

## Acceptance gate

Before adding high-quality visual effects, test:

- paths A/B/C/D feel meaningfully different;
- manual branching feels less constrained than v12/v13;
- EXIT is obvious;
- the corridor reads as a transition state;
- editing a pattern changes the local musical identity;
- the map remains understandable with Chinese notes;
- fullscreen / Stage Mode is reliable.

If these fail, revise topology and sequencer behaviour. Do not add polish yet.
