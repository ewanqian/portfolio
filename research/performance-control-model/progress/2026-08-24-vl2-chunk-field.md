# 2026-08-24 — vL2 Chunk Field

## Decision

The low-fi playground is no longer constrained to a 4×4 or 16-node grid. The primary unit is now a **Chunk**: a meaningful playable region with a musical role, visual role, entry behaviour, inside behaviour, exit behaviour and local sequencer.

The screen may contain as many chunks as remain legible and musically useful. The current first pass uses 24 chunks, grouped into six semantic families:

- FIELD — ground / atmosphere / sustained body
- PULSE — pulse / groove / subdivision
- MOTION — route / scan / orbit / directional movement
- STRUCT — chord / partition / cells / phrase structure
- PEAK — burst / strobe / impact / rise
- RELEASE — rewind / suction / residue / negative space

## Current chunk set

FIELD
- DRIFT / 漂移场
- DRONE / 持续音
- SUB / 低频床
- HAZE / 颗粒雾

PULSE
- KICK / 主脉冲
- OFFBEAT / 反拍
- TRIPLET / 三连音
- GATE / 门控节奏

MOTION
- ROUTE / 路线
- SCAN / 扫描
- ORBIT / 轨道
- SWARM / 群集

STRUCT
- CHORD / 和声块
- PARTITION / 切分
- CELLS / 细胞格
- STEP / 阶梯句

PEAK
- BURST / 爆点
- STROBE / 频闪
- IMPACT / 冲击
- RISE / 上升压强

RELEASE
- REWIND / 回撤
- SUCTION / 吸走
- RESIDUE / 残留
- SILENCE / 负空间
- SHIMMER / 闪烁尾纹

## What counts as a valid chunk

A chunk is kept only if it answers all five questions:

1. **Musical identity** — what useful role does it add to a live set?
2. **Spatial affordance** — what does its shape suggest the performer should do?
3. **ENTER / INSIDE / EXIT** — is entering, dwelling and leaving meaningfully different?
4. **Composition relation** — what other chunks does it transition well into?
5. **Full-screen consequence** — does an important action affect the performance image beyond the local icon?

A visually attractive effect without these answers is not a valid chunk.

## Conflict control

The system should not avoid conflict by keeping the library small. It should allow a large library while controlling collision by:

- semantic cluster roles;
- spectral band metadata;
- per-chunk energy;
- probability and level;
- decay / heat rather than permanent activation;
- soft ducking / crossfade for competing material;
- a master voice and density safety budget.

The preferred principle is:

> MANY AVAILABLE SIGNALS → FEW COHERENTLY ACTIVE SIGNALS

not:

> FEW AVAILABLE SIGNALS → SAFE SYSTEM

## Sequencer

Every chunk contains a small visible 8 / 12 / 16-step score. The selected chunk opens a larger editor supporting:

- step on/off;
- Shift + click accent;
- rotate;
- density up/down;
- length 8 / 12 / 16;
- probability;
- level;
- clear / reset.

The micro-sequencer is not decoration. It is the local score of the chunk and directly controls its scheduled events on the shared transport.

## Interaction model

The map is free to browse. Adjacency is advisory rather than a hard gate.

```text
ENTER CHUNK
→ immediate phrase / activation

INSIDE CHUNK
→ local gesture increases / modulates its energy

EXIT CHUNK
→ release phrase / visual residue

BETWEEN CHUNKS
→ existing signals continue to decay
```

Recommended links can be shown when needed, but the performer is not forced onto a single route.

## Visual quality gate

Low-fi is allowed, meaningless clutter is not.

Current visual grammar remains intentionally reduced:

- field / haze;
- route / scan;
- orbit;
- partition;
- full-screen burst / strobe;
- collapse / impact;
- rewind / residue.

The next visual pass should improve the quality of these global behaviours before adding decorative local effects.

## Audio quality gate

The current browser synthesis is still a structural placeholder. Once chunk relationships and sequencer behaviour are validated, the next major quality step is a curated original phrase / sample library (WAV / OGG / AudioBuffer) with compatibility metadata.

## 2D → WebXR

Chunk remains the canonical unit for future spatial translation:

```text
2D CHUNK
→ 3D VOLUME / SURFACE / CORRIDOR

ENTER
→ hand / body enters volume

INSIDE
→ hand position / velocity / curvature / dwell

EXIT
→ spatial release

MICRO SEQUENCER
→ local temporal score attached to that spatial object
```

This preserves the current Touch:waves × Playground × Performance Control Model mainline while allowing the interface to become spatial rather than remaining a flat button matrix.
