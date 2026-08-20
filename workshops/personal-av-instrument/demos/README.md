# Personal A/V Instrument — Demos

本目录是《音画同源乐器 / Personal A/V Instrument》工作坊的可运行 Demo 区。后续所有 Starter、Golden Demo、宣传录屏与参与者可复用原型都优先在这里迭代。

## Demo 01 — NFI Keyboard Liveset

- 路径：[`./nfi-keyboard-liveset/`](./nfi-keyboard-liveset/)
- 类型：A–Z 键盘音画乐器 / Web Audio / Browser Instrument
- 状态：v0.1 playable prototype
- 目标：以干净的文字、纯色与基础几何建立即时 Sound + Visual 反馈，后续替换为真实语音 / 视频采样。

### 发布路径

`/workshops/personal-av-instrument/demos/nfi-keyboard-liveset/`

---

## Demo 02 — NIULAI TAP / 牛来 Tap

- 路径：[`./niulai-tap/`](./niulai-tap/)
- 说明：[`./niulai-tap/README.md`](./niulai-tap/README.md)
- 类型：Theme Pack / 26-key Audiovisual Instrument / browser synth
- 状态：v0.1 playable prototype
- 研究问题：一个熟悉、荒诞、可传播的主题素材包，能不能让完全不了解 Audio Visual 的人先产生“我想按一下”的冲动，再进入 Mapping 与系统设计？

### 当前双模式

1. **NIULAI CORE**：从“牛 / 来 / 欢迎 / 今天 / 昨天 / 将来 / 长大 / 不一样 / 一样”等短词出发，以浏览器合成人声、程序声音、文字与有机几何组成更接近“牛来 core”的状态。
2. **HATSUNE NIULAI / 初音牛来**：不使用初音未来音源，把“虚拟歌姬 / 电子偶像 / keyboard performance”的机制转译为更快、更亮、更 glitch 的牛来电子演奏模式。

### 发布路径

`/workshops/personal-av-instrument/demos/niulai-tap/`

Custom Domain：

`https://ewanqian.site/workshops/personal-av-instrument/demos/niulai-tap/`

GitHub Pages fallback：

`https://ewanqian.github.io/portfolio/workshops/personal-av-instrument/demos/niulai-tap/`

### 为什么保留两个 Demo

`NFI Keyboard Liveset` 更接近《无需进一步输入》的抽象视觉系统与工作坊 Starter；`NIULAI TAP` 则专门验证 **Theme Pack / meme / personal material → playable instrument** 的传播与教学逻辑。

后续参与者不应该复制某个固定视觉风格，而应理解下面这个可开源结构：

`Instrument Engine + Sound Pack + Visual Pack + Mapping Rules = Personal A/V Instrument`

### 迭代规则

1. 先保证第一次打开就能玩；
2. 先验证 8 键是否足够好玩，再扩展 26 键内容；
3. 每个声音单元必须拥有清楚的视觉反馈；
4. 不把版权素材写死进核心引擎，公开版优先使用原创 / 合成 / 授权素材；
5. 真实素材通过 sample pack / manifest 替换；
6. Demo 同时服务于线上试玩、工作坊 Starter Kit 与 15s/30s promotion 录屏；
7. 重点评估 playability、legibility、mapping depth，而不是效果数量。