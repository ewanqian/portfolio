# vL5 — Glyph Matrix Proof

Status: IMPLEMENTED / USER TEST PENDING
Branch: `research/unicode-symbol-engine`

## What this version fixes

vL5 follows the Ponytail/Caveman audit instead of continuing vL4 ontology growth.

```text
6 CONTROL VERBS
+
30 PERSISTENT MATERIAL VARIANTS
+
2 EVENT OPERATORS
=
32 PLAYABLE MATERIAL STATES
```

Visible control verbs:

```text
◌ FIELD
● PULSE
➜ ROUTE
↻ ORBIT
╳ PARTITION
↶ RELEASE
```

`✦ / ⊙` are implemented as transient event logic rather than persistent regions.

## Visual system

- one global `40×24` low-resolution light raster;
- grid is renderer substrate, never performance ontology;
- black / white / graphite baseline;
- one functional accent colour at a time;
- stage-light behaviours: shutter, route beams, orbit, partition cuts, flash, collapse, residue;
- previous frames persist through one controlled history buffer;
- topology edges remain sparse and secondary.

No visible Chinese / English labels.

## Interaction

Inside one semantic region:

```text
X
→ material variant selection
→ phase / phrase span

Y
→ probability / density
→ visual pressure / scale

FAST CROSS
→ transient flash

HIGH DWELL
→ transient light event

PARTITION fast gesture
→ impact / collapse event

EXIT
→ heat decays; sound and image leave residue
```

Micro-sequencer is embedded into each glyph body. ORBIT uses circular steps; PARTITION uses 4×4 internal score; other families use compact line scores.

## Music

One shared 142 BPM transport.

Five curated procedural phrase variants per control verb:

- FIELD ×5;
- PULSE ×5;
- ROUTE ×5;
- ORBIT ×5;
- PARTITION ×5;
- RELEASE ×5.

Shared processing:

- master compressor;
- short delay;
- generated convolution reverb;
- voice limit;
- state heat / residue.

This is still a browser-synthesis proof, not the final audio-material bank.

## AUTO

`∞` traverses:

```text
◌ → ● → ➜ → ↻ → ╳ → ↶ → ◌
```

A transition occurs every four bars to expose the long-form relationship.

## Quality gate

Test only these questions:

1. Does 40×24 read as one stage-light surface rather than a grid UI?
2. Are six control verbs enough to understand the performance space?
3. Does X feel like meaningful material / phrase variation?
4. Does Y feel like controlled density / instability rather than arbitrary parameter mapping?
5. Can 32 materials exist without creating 32 visible controls?
6. Does the AUTO route form a recognisable open → motion → build → release arc?
7. Are the low-res light behaviours worth keeping before WebGL refinement?

Do not expand ontology until these pass.