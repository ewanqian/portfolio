# Minimal Control Toybox / 极简控制玩具

这组 Toy 不是完整作品，而是从 2026-08 的工作坊开发过程里重新拆出来的最小控制问题。

开发路径已经留下了一个很清楚的递进：

```text
D0 Direct Trigger
→ D1 Quantized Capsules
→ D2 Four-Layer Sequencer
→ D3 Shared-State A/V
→ D4 Spatial Adapter
→ D5 Control Field / Topological Playground
→ vL5 / vL6 Glyph Matrix
```

它们可以继续被拆成更小的组件，让参与者在 30 秒内理解一个控制关系，然后把它复制进自己的作品。

公开试玩：`/workshop-toys/`

---

## T01 — Tempo Lever

### 问题
BPM 不应该只是一个设置数字。速度本身可以成为可演奏参数。

### 最小控制
- 竖向 Slider：连续改变 BPM；
- `+ / -`：离散步进；
- Play / Stop：共享 transport。

### 可以继续变体
- Slider 改成手势高度；
- 上推只允许加速，下拉只允许减速；
- 松手后 BPM 缓慢回到基准值；
- BPM 同时改变视觉网格密度、动画速度、delay time；
- 加入 1/2x、1x、2x 三档倍率，而不是任意 BPM。

### Prompt Seed

```text
把当前项目的 BPM 控制做成一个可演奏组件。
保留现有声音和视觉模块，只增加：
1. 一个竖向 tempo slider；
2. +/- 5 BPM 两个按钮；
3. 所有 audio / visual 读取同一个 clock；
4. BPM 改变时不要重启系统；
5. 显示 beat pulse，但 UI 保持极简。
最后说明：BPM 变化影响了哪些行为。
```

---

## T02 — Quantize Gate

### 问题
人不需要把每一下按得完全准确。系统可以区分“意图发生了”与“正式事件什么时候落下”。

```text
input now
→ pending feedback now
→ event on next beat / 1/8 / bar
```

### 可以继续变体
- 量化到 1/4、1/8、1/16；
- 根据按键力度决定落在 beat 还是 bar；
- pending 状态有轻微预反馈；
- 连续输入只保留最后一次 intent；
- 输入过密时自动合并。

### Prompt Seed

```text
为当前触发系统加入 quantized intent。
用户按下时立刻给一个轻量 visual acknowledgement，
正式声音和主视觉事件进入 pending queue，
并在下一个 1/8 note 边界执行。
不要创建第二套 timer；audio 和 visual 必须读取同一个 transport。
```

---

## T03 — Density Fader

### 问题
复杂度不一定来自更多按钮。一个连续参数可以控制“单位时间允许发生多少事情”。

### 最小控制
`0–100% Density` → event probability / active voices / visual population。

### 可以继续变体
- Density 同时控制音符概率与视觉粒子数量；
- 低密度留下长尾，高密度缩短 release；
- Density 超过 80% 时自动降低单事件音量；
- 加入 MAX ACTIVE / group cap 防止失控；
- Density 不直接线性映射，而是使用三段 curve。

### Prompt Seed

```text
不要增加新触发按钮。
只加入一个 DENSITY 参数，控制：
- 每 beat 的事件概率；
- 视觉元素数量；
- 最大并发声音数量。
需要有安全上限；高密度时自动做 gain compensation。
```

---

## T04 — Graph Router

### 问题
“下一步按哪个效果”可以变成“系统从当前节点走到哪里”。

```text
FIELD → PULSE → ROUTE → ORBIT → RELEASE
```

### 最小控制
一个 `NEXT` 按钮沿路径前进。

### 可以继续变体
- 同一个节点拥有 2–3 条可选边；
- 长按 NEXT 走主路径，短按走支路；
- 路径会根据 Energy / State 自动改变；
- 返回旧节点时，不恢复原样，而读取 history；
- 节点是功能角色，不是视觉 preset。

### Prompt Seed

```text
把当前 preset 列表改成一个小型 graph。
每个节点代表一种功能角色，而不是一个效果名称。
保留一个 NEXT 输入：
- 从 current node 沿 edge 前进；
- audio / visual 根据 node state 分别解释；
- UI 只显示当前节点与可到达节点；
- 回到旧节点时保留 history 差异。
```

---

## T05 — Release Memory

### 问题
输入结束以后，系统是否还保留痕迹？

### 最小控制
一个 Trigger + 一个 Memory Slider。

```text
Trigger
→ Event
→ Release
→ Residue
→ Decay
```

### 可以继续变体
- Memory 改变 visual trail + delay feedback；
- 过去事件逐渐变成 background field；
- 新输入会扰动旧 residue；
- Panic 只清 active，不清 memory；
- Break scene 才真正清空历史。

### Prompt Seed

```text
给当前 one-shot trigger 加入 RELEASE / MEMORY。
不要增加新的主按钮。
输入结束后保留一个可衰减的 residue，
同一个 memory 参数同时控制 visual trail 与 audio delay/reverb tail。
需要 Reset 和 Panic，并说明两者清除的状态是否不同。
```

---

## T06 — State Ladder

### 问题
同一个输入，在不同状态中应该有不同意义。

### 最小控制
`↑ / ↓` 只改变四个高层状态：

```text
OPEN
BUILD
PEAK
BREAK
```

Trigger 本身不变。

### 可以继续变体
- OPEN：稀疏、长 release、低亮度；
- BUILD：密度上升、频段打开；
- PEAK：短、亮、impact 强；
- BREAK：低频 / 空间 / residue；
- 状态切换 quantize 到下一个 bar；
- 允许系统自动建议下一个 state，但保留人工 override。

### Prompt Seed

```text
保持现有 Trigger 不变，只加入 4 个 high-level state：OPEN / BUILD / PEAK / BREAK。
同一个 Trigger 在四个 state 中分别改变 density、release、brightness、pitch range。
State 切换 quantize 到下一小节。
不要新增独立效果按钮。
```

---

# 还可以继续拆的 Toy

这些方向来自同一套开发逻辑，适合继续做成小组件：

1. **Hold Pressure** — 按住时间从 trigger 变成 accumulation。
2. **Velocity Without MIDI** — 用连续点击间隔估算输入“力度”。
3. **One Knob Scene Morph** — 一个旋钮在 OPEN → PEAK 之间连续 morph。
4. **Three-State Toggle** — 一个按钮不是 on/off，而是 OFF → ARM → LIVE。
5. **Cooldown Gate** — 输入过密时系统主动拒绝一部分事件。
6. **Voice Budget Meter** — 只显示剩余可用并发声音，不显示复杂 mixer。
7. **Bar Jump** — 一个按钮把所有层统一推进到下一 section，而不是重新开始。
8. **Human Override Window** — 人一操作，自动系统退让 1–2 小节。
9. **Probability Button** — 每次按同一个按钮，结果来自同一规则族但不是完全一样。
10. **Return With Memory** — 返回同一节点时读取上一次留下的 residue。

这些 Toy 的共同标准：

- 只研究一个控制问题；
- 10 秒内能理解；
- 30 秒后仍然有第二层可发现；
- 不靠堆 UI；
- Sound + Visual 尽量共享同一个参数 / state；
- 永远有可恢复路径；
- 最后能被复制进更大的实时系统。
