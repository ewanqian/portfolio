# Personal A/V Instrument — Demos

本目录是《音画同源乐器 / Personal A/V Instrument》工作坊的可运行 Demo 区。后续 Starter、Golden Demo、宣传录屏与参与者可复用原型都优先在这里迭代。

> **2026-08-23 current control-model update:** Demo 不再只按“乐器 / 演出系统”二分，还需要用 `State / Feedback / Stability / Controllability / Observability / Robustness` 检查。当前 Starter Ladder 见 [`../starter-control-model.md`](../starter-control-model.md)，理论教材见 [`../../../research/performance-control-model/README.md`](../../../research/performance-control-model/README.md)，8.29 P0 见 Issue #59。尚未真正制作完成的 Starter 00–03 不得标记为 playable。

从 2026-08-21 起，Demo 正式拆成两条线：

- **Instrument Line / 乐器线**：关注按键、素材、Mapping、个人 sample pack 与“像乐器一样玩”。
- **Performance System Line / 演出系统线**：关注 BPM、Phrase、Arrangement、Section、Transition 与观众视角的完整 Live Set。

从 2026-08-23 起，在这两条线之上增加一层共同判断：

```text
Input
↓
State Change
↓
System Behaviour
↓
Sound / Visual
↓
Feedback
↓
Next Decision
```

也就是说，Mapping 仍然重要，但一个成熟 Live System 还必须回答：系统现在是什么状态、如何继续、怎样退出、怎样避免连续操作后失控。

---

# 8.29 Starter Ladder / 当前 P0

以下是开发顺序，不代表已经全部完成：

1. `00_TRIGGER_BASELINE` — 故意保留最简单的 one-shot Mapping 作为对照；
2. `01_STATE` — 同一个输入在不同 State 中产生不同结果；
3. `02_SAFE_LOOP` — transport / quantization / gain / density 由系统保护，人控制 ADD / REMOVE / HOLD / RELEASE；
4. `03_SHARED_STATE_A/V` — Sound / Visual 读取同一高层 State，但不做廉价 1:1 reactive；
5. `common-source-liveset` — 60–90 秒 Golden Mini Live System，先让 AUTO 成立，再让 PERFORM 接管结构判断。

如果 8.29 前时间不足，优先完成 00 / 01 / 02 + Golden。不要为了凑数量另建平行 runtime。

---

# A · Instrument Line / 乐器线

## Demo 01 — NFI Keyboard Liveset

- 路径：[`./nfi-keyboard-liveset/`](./nfi-keyboard-liveset/)
- 类型：QWERTY 键盘音画乐器 / Web Audio / Browser Instrument
- 状态：v0.2 playable prototype
- 目标：以干净的文字、纯色与基础几何建立即时 Sound + Visual 反馈，并承载真实语音 sample pack。

它在当前控制模型中的角色进一步明确为：

> **Personal Material / Instrument Identity。**

`叮 / 咚 / 鸡 / 大 / 狗 / 叫` 证明具体个人素材可以非常快地形成“我想继续按”的身份感，但它不需要被强行扩展成 5–10 分钟完整 Live Set。

## Demo 02 — NIULAI TAP / 牛来 Tap

- 路径：[`./niulai-tap/`](./niulai-tap/)
- 说明：[`./niulai-tap/README.md`](./niulai-tap/README.md)
- 当前可玩单文件入口：[`../../../../niulai-tap-v03.html`](../../../../niulai-tap-v03.html)
- 类型：Theme Pack / 26-key Audiovisual Instrument / fixed formant browser synth
- 状态：v0.3 playable prototype
- 目标：测试 meme / personal material 如何快速变成“我也想按一下”的音画乐器。

Instrument Line 的研究重点：

`Input → Mapping → Sound / Visual → Personal Material → Playability`

---

# B · Performance System Line / 演出系统线

## Demo 03 — COMMON SOURCE / 同源场（Instrument reference）

- 路径：[`./common-source-instrument/`](./common-source-instrument/)
- 说明：[`./common-source-instrument/README.md`](./common-source-instrument/README.md)
- 类型：Shared-source Audiovisual Instrument / Web Audio + Canvas
- 状态：v0.1 reference instrument
- 用途：保留为 Mapping / shared-source 的教学参考，不再作为“完整 Live Set”的最终答案。

## Demo 04 — COMMON SOURCE / 同源场 — LIVE SET

- 路径：[`./common-source-liveset/`](./common-source-liveset/)
- 说明：[`./common-source-liveset/README.md`](./common-source-liveset/README.md)
- 类型：Phrase-based Audiovisual Performance System / Internal BPM / Web Audio + Canvas
- 状态：v0.2 playable performance prototype
- 默认：124 BPM / 4-4 / 16-step grid

### 核心变化

旧版本的基本单位是：

`KEY → NOTE / HIT`

LIVE SET 版本改成：

`KEY → PHRASE → ENTER / DEVELOP / TRANSFORM / RELEASE`

也就是说，一次按键不再只闪一下或响一下，而要自己支撑数秒，内部包含多个声音与视觉事件。

当前下一步再增加一层：

```text
PHRASE
+
CURRENT STATE
+
HISTORY
↓
RESULT
```

同一个 Phrase 在不同结构位置不能只做换色或换 seed，而需要拥有真正不同的时间意义。

### 四个演出 Section

1. `GROUND / 铺垫`
2. `BUILD / 推进`
3. `PEAK / 主段`
4. `BRIDGE / 桥段`

这些名称继续作为当前工程结构，但已经降级为 **provisional taxonomy**：后续 DJ / Concert reference transcription 可能会修改它们。不要把四个名字包装成理论定论。

### 键盘结构

- `Q–P`：Motif phrases
- `A–L`：Pulse / rhythm phrases
- `Z–M`：Texture / transition phrases
- `[` / `]`：BPM -2 / +2
- `Space`：安全 Fill
- `H`：隐藏 HUD，进入纯观众画面
- `0 / Esc`：Reset

现有大键盘布局保留为历史实现，但下一轮 Golden Mini Live System 不再以“填满 26 键”为 P0。优先验证少量结构命令：

```text
HOLD
ADD
REMOVE
RELEASE
RECALL
ACCENT
```

### 评价标准

Performance System Line 的第一评价标准不是“像不像乐器”，而是：

> **一个不具备专业音乐演奏能力的人，经过极短说明以后，能不能用它完成一段从观众角度成立的 Audio Visual Live Set？**

当前进一步要求：

- system can continue without constant key mashing；
- performer can both increase and reduce energy；
- state / pending transition 对演奏者可观察；
- early / late input 不应轻易破坏 musical structure；
- random variation 必须受 density / voice / gain budget 保护；
- raw Screen + Sound 是验收，不靠 promo editing 补救。

---

# 当前工作坊表达

工作坊不需要在“乐器”与“演出系统”之间二选一。

它们对应不同层级：

```text
Personal Material
      ↓
Instrument / Mapping
      ↓
State / Feedback
      ↓
Phrase / Safe Continuity
      ↓
Section / Arrangement
      ↓
Live Performance
```

因此：

`NFI / NIULAI / 大狗叫叮咚鸡` 可以负责趣味性、个人素材和即时参与；

`COMMON SOURCE — LIVE SET` 负责专业性、时间结构和真正的舞台演出问题。

### 迭代规则

1. 先保证第一次打开就能理解并开始玩；
2. Instrument Line 评估 Mapping 与素材个性；
3. Performance Line 评估整段演出是否成立；
4. 一个 Live Set key / command 应改变可感知的时间行为，而不是单次闪现；
5. State / Section 切换必须产生结构变化，而不只是换色；
6. 音乐性底层尽量通过 scale / grid / quantization / gain / voice budget 保护非音乐专业表演者；
7. 必须同时拥有 ADD 与 REMOVE / RELEASE；
8. `RESET / PANIC` 是乐器的一部分，不是 debug 附件；
9. 所有未实际验证的 playable / deploy / browser compatibility 状态必须写 `NOT TESTED`；
10. Demo 同时服务于线上试玩、工作坊 Starter Kit、演讲与 promotion 录屏，但宣传不能反过来掩盖 raw performance 不成立。
