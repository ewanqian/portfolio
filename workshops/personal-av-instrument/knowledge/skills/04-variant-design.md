# Skill 04 — Variant Design

**Use when:** 系统看起来“有很多版本”，但实际上只是换颜色、seed 或位置。

## 核心

真正的 Variant 至少改变两层：

- 时间结构 / pattern
- 声音音色 / note set
- 视觉几何 / movement
- Hold / Repeat / Release 行为
- residue / memory

## Prompt Seed

```text
为当前一个 node 设计 5 个 variants。
禁止只换颜色、随机 seed、x/y 或 particle count。
每个 variant 至少改变：
1. 一个 temporal pattern；
2. 一个 audio behaviour；
3. 一个 visual behaviour。
重复触发同一 node 时循环或选择 variant，并保持 node 的总体角色不变。
先用表格列出 5 个 variant 的差异，再写代码。
```

## 验收

连续触发同一节点 5 次时，观众能感到“同一种角色的五种行为”，而不是五张皮肤。