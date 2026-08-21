# Personal A/V Instrument — Demos

本目录是《音画同源乐器 / Personal A/V Instrument》工作坊的可运行 Demo 区。后续所有 Starter、Golden Demo、宣传录屏与参与者可复用原型都优先在这里迭代。

## Demo 01 — NFI Keyboard Liveset

- 路径：[`./nfi-keyboard-liveset/`](./nfi-keyboard-liveset/)
- 类型：A–Z 键盘音画乐器 / Web Audio / Browser Instrument
- 状态：v0.2 playable prototype
- 目标：以干净的文字、纯色与基础几何建立即时 Sound + Visual 反馈，并承载真实语音 sample pack。

---

## Demo 02 — NIULAI TAP / 牛来 Tap

- 路径：[`./niulai-tap/`](./niulai-tap/)
- 说明：[`./niulai-tap/README.md`](./niulai-tap/README.md)
- 当前可玩单文件入口：[`../../../../niulai-tap-v03.html`](../../../../niulai-tap-v03.html)
- 类型：Theme Pack / 26-key Audiovisual Instrument / fixed formant browser synth
- 状态：v0.3 playable prototype
- 研究问题：一个熟悉、荒诞、可传播的主题素材包，能不能让完全不了解 Audio Visual 的人先产生“我想按一下”的冲动，再进入 Mapping 与系统设计？

### 当前双模式

1. **NIULAI CORE**：从“牛 / 来 / 欢迎 / 我的孩子 / 今天 / 将来 / 长大 / 不一样 / 一样”等短词出发，以固定 Formant Web Synth、程序声音、文字与有机几何组成“牛来 core”的状态。
2. **出音牛来 / CHUYIN NIULAI**：不使用初音未来音源或视觉资产，把 synthetic performer / electronic keyboard performance 的机制转译成更快、更亮、更 glitch 的牛来电子演奏模式。

### v0.3 更新

- 不再依赖设备自带 `SpeechSynthesis` TTS；
- 人声改为固定 Web Audio Formant Synth，不同设备的核心音色更一致；
- `Q / W` 保留 `牛 → 牛牛 → 牛牛牛` / `来 → 来来 → 来来来`；
- 支持 Hold、Space Drop、Tab 模式切换与 Reset；
- 鼓、Bass、Chord、FX 仍由 Web Audio 程序实时合成。

---

## Demo 03 — COMMON SOURCE / 同源场

- 路径：[`./common-source-instrument/`](./common-source-instrument/)
- 说明：[`./common-source-instrument/README.md`](./common-source-instrument/README.md)
- 类型：Golden Demo / Shared-source Audiovisual Instrument / Web Audio + Canvas
- 状态：v0.1 playable reference instrument
- 目标：提供一个不依赖 meme 或整活素材、可以正常持续演奏并用于公开讲解的完整参考作品。

### 三排键盘结构

- `Q–P · TONE`：音高 / ring / orbit
- `A–L · PULSE`：节奏 / bar / impact
- `Z–M · TEXTURE`：纹理 / field / contour

声音和视觉不采用“声音驱动画面”的单向关系，而是共同读取同一个 event / state：

`KEY / EVENT → STATE → SOUND + VISUAL`

`Tab` 可以直接打开 Mapping 面板，在演讲中展示当前输入怎样同时进入 Audio 与 Visual 两个维度。

### 三个 Demo 的分工

1. **COMMON SOURCE / 同源场**：专业参考 / Golden Demo，证明方法本身可以形成正常、完整的数字乐器。
2. **NFI Keyboard Liveset**：工作坊 Starter / 个人作品衍生实验，测试真实语音切片与文字视觉。
3. **NIULAI TAP**：Theme Pack / meme / personal material，测试传播性和“我也想按一下”的即时欲望。

因此工作坊的表达不再依赖某一种视觉风格，而是强调：

`Instrument Engine + Sound Pack + Visual Pack + Mapping Rules = Personal A/V Instrument`

### 迭代规则

1. 先保证第一次打开就能玩；
2. 先验证少量键位是否足够好玩，再扩展 26 键内容；
3. 每个声音单元必须拥有清楚的视觉反馈；
4. 不把版权素材写死进核心引擎，公开版优先使用原创 / 合成 / 授权素材；
5. 真实素材通过 sample pack / manifest 替换；
6. Demo 同时服务于线上试玩、工作坊 Starter Kit 与 15s/30s promotion 录屏；
7. 重点评估 playability、legibility、mapping depth，而不是效果数量。
