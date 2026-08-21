# Personal A/V Instrument — Demos

本目录是《音画同源乐器 / Personal A/V Instrument》工作坊的可运行 Demo 区。后续 Starter、Golden Demo、宣传录屏与参与者可复用原型都优先在这里迭代。

从 2026-08-21 起，Demo 正式拆成两条线：

- **Instrument Line / 乐器线**：关注按键、素材、Mapping、个人 sample pack 与“像乐器一样玩”。
- **Performance System Line / 演出系统线**：关注 BPM、Phrase、Arrangement、Section、Transition 与观众视角的完整 Live Set。

---

# A · Instrument Line / 乐器线

## Demo 01 — NFI Keyboard Liveset

- 路径：[`./nfi-keyboard-liveset/`](./nfi-keyboard-liveset/)
- 类型：QWERTY 键盘音画乐器 / Web Audio / Browser Instrument
- 状态：v0.2 playable prototype
- 目标：以干净的文字、纯色与基础几何建立即时 Sound + Visual 反馈，并承载真实语音 sample pack。

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

### 四个演出 Section

1. `GROUND / 铺垫`
2. `BUILD / 推进`
3. `PEAK / 主段`
4. `BRIDGE / 桥段`

`1–4` 切换的是 Arrangement State，而不只是颜色。

### 键盘结构

- `Q–P`：Motif phrases
- `A–L`：Pulse / rhythm phrases
- `Z–M`：Texture / transition phrases
- `[` / `]`：BPM -2 / +2
- `Space`：安全 Fill
- `H`：隐藏 HUD，进入纯观众画面
- `0 / Esc`：Reset

### 评价标准

Performance System Line 的第一评价标准不是“像不像乐器”，而是：

> **一个不具备专业音乐演奏能力的人，经过极短说明以后，能不能用它完成一段从观众角度成立的 5–10 分钟 Audio Visual Live Set？**

因此后续重点评估：

- internal BPM / quantization
- phrase duration / variation
- section transition
- visual continuity
- density protection
- novice performer safety
- audience-only video test

---

# 当前工作坊表达

工作坊不需要在“乐器”与“演出系统”之间二选一。

它们对应两个不同层级：

```text
Personal Material
      ↓
Instrument / Mapping
      ↓
Phrase
      ↓
BPM / Section / Arrangement
      ↓
Live Performance
```

因此：

`NFI / NIULAI / 大狗叫叮咚鸡` 可以负责趣味性、个人素材和即时参与；

`COMMON SOURCE — LIVE SET` 负责专业性、时间结构和真正的舞台演出问题。

### 迭代规则

1. 先保证第一次打开就能理解并开始玩；
2. Instrument Line 评估 Mapping 与素材个性；
3. Performance Line 评估 5–10 分钟整体演出是否成立；
4. 一个 Live Set key 至少应支撑 2–8 秒，而不是单次闪现；
5. Section 切换必须产生结构变化，而不只是换色；
6. 所有音乐性内容尽量通过 scale / grid / quantization 保护非音乐专业表演者；
7. Demo 同时服务于线上试玩、工作坊 Starter Kit、演讲与 promotion 录屏。
