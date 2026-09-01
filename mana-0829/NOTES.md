# 8.29 工作坊笔记｜极简输入：构建视听系统

**时间**：2026 年 8 月 29 日  
**讲者**：钱誉文 Ewan Qian、yiyisogreen  
**主题**：Audio Visual、Mapping、实时控制、网页音画乐器

这份笔记整理工作坊中使用的核心概念、两位讲者的关注点、课堂练习和后续工具。它可以独立阅读，也可以作为继续制作网页音画乐器的参考。

---

## 1. 课程从哪里开始

工作坊把“一个按键、一次鼠标移动、一次触摸”当作最小输入。

先观察它怎样改变声音、视觉和系统状态，再逐步加入节拍、记忆、场景和更多控制。

```text
输入 Input
↓
映射 Mapping
↓
状态 State / 时间 Clock / 记忆 Memory
↙                         ↘
声音 Sound                视觉 Visual
↓
反馈 Feedback
↓
下一次操作
```

每次修改都尽量回答一个具体问题：

- 输入是什么；
- 系统怎样解释它；
- 结果是否清楚；
- 下一次操作为什么还值得发生。

---

## 2. 两位讲者的关注点

### 钱誉文 Ewan Qian

主要从系统搭建、AI 辅助开发和实时视觉进入。

课堂内容包括：

- 从一个输入建立网页音画系统；
- Tap / Hold / Release / Idle；
- BPM、Quantize 与 Shared Clock；
- State、Scene、Memory；
- 键盘作为最小控制器；
- FRAME → FILL → FINISH 的开发顺序；
- 先做可运行版本，再补内容，最后测试与整理；
- 把小练习长期保存成 Scene、Variant 或可复用模块；
- 用 GitHub / GitHub Pages 保存和分享网页作品。

这里使用 AI 的重点是快速实现、比较和修改候选方案。系统最终保留什么，仍然由创作者判断。

### yiyisogreen

主要从 Audio Visual、Mapping、限制和表演界面进入。

分享内容包括：

- 一个鼠标或按键可以产生多深的控制；
- 离散输入怎样通过时间、速度、间隔和规则转成连续表现；
- 一对一 Mapping 为什么容易被迅速看穿；
- 怎样让观众理解“操作 → 结果”的因果关系；
- 限制为什么可以形成更明确的表演语言；
- 产品界面和表演界面的差异；
- 声音、视觉和身体动作之间的关系；
- 不完全控制、随机与表演深度。

---

## 3. 音画同源

课堂里的“音画同源”是一种工作方法。

声音和视觉尽量从同一个输入、参数或状态中产生，而不是等声音完成之后再让画面追随。

最简单的版本可以是：

```text
按一下
↙     ↘
声音   视觉
```

继续往下做时，可以加入：

- 当前 Scene；
- Hold Duration；
- 重复速度；
- 输入间隔；
- BPM / bar；
- Energy / Density；
- 前一次操作留下的 Memory。

同一个按键因此可以在不同时间和状态中产生不同意义。

---

## 4. 一对一 Mapping 与更深的 Mapping

一对一 Mapping 很适合建立最初的因果关系：

> 按一下 → 响一下 → 闪一下。

它的优点是清楚，缺点是很快会被理解完。

继续增加深度时，可以使用：

- 一个输入控制多个变量；
- 多个输入共同决定一个结果；
- 连续参数影响离散事件；
- 当前 State 改变同一 Trigger 的结果；
- 过去的操作继续影响下一次输出。

重点不是增加更多按钮，而是增加关系的层次。

---

## 5. 产品界面与表演界面

给别人长期使用的产品界面通常追求：

- 清楚；
- 稳定；
- 低学习成本；
- 行为可预测。

用于现场的表演界面还要考虑：

- 身体动作；
- 节奏；
- 反馈速度；
- 表演者的操作能否被观众感知；
- 系统是否允许积累、等待、释放和恢复。

两类界面可以使用相同技术，但设计目标不同。

---

## 6. 四个基本输入状态

### Tap / 短按

一次明确的短事件。适合 transient、短视觉触发和节拍中的离散动作。

### Hold / 按住

把持续时间变成参数。可以进入 drone、loop、density、accumulation 或持续视觉。

### Release / 松开

不是简单停止。可以进入 decay、reverb tail、residue 或新的 phrase。

### Idle / 空闲

没有输入时的系统状态。可以保留轻微 ambience、memory 或自动变化。

---

## 7. 节拍与 Quantize

BPM 可以作为声音和视觉共享的时间坐标。

人的操作不一定要精确落在节拍上。系统可以先确认用户意图，再把正式事件放到下一拍、1/8 note 或下一小节。

```text
Human Input
↓
Pending Intent
↓
Quantize
↓
Beat / Bar
↙       ↘
Sound   Visual
```

这样可以保留人的操作感，同时让整体结构保持稳定。

---

## 8. State 与演出结构

当效果越来越多时，可以先把系统组织成几个 Scene。

一个最小的五段结构：

```text
OPEN     少、慢、留白
BUILD    增加重复、方向和密度
PEAK     最明确的能量与层级
BRIDGE   改变路径，保留连接
RELEASE  回收材料，留下残余或结束
```

声音、视觉和灯光不需要做完全相同的变化。它们只需要共同解释当前状态。

例如 BUILD：

- 声音增加 subdivision；
- 视觉增加 density；
- 空间仍然保持较窄；
- 输入开始具有更高的能量权重。

---

## 9. 课堂制作流程

```text
试玩 Demo
↓
选一个输入
↓
做出 Sound + Visual + State
↓
得到 V1
↓
换自己的声音 / 图片 / 图形
↓
交给别人直接试玩
↓
只找一个最明显的问题
↓
修改为 V2
```

试玩时，作者先不解释。

观察：

- 对方第一步会做什么；
- 是否能找到主输入；
- 是否能发现第二层行为；
- 哪里没有反馈；
- 什么时候开始重复；
- Reset / Recovery 是否清楚。

一次只修一个最明显的问题。

---

## 10. 工具

### Web Audio API

浏览器原生音频系统。适合 oscillator、sample、filter、delay、sequencer 和精确调度。

### Tone.js

基于 Web Audio 的音乐框架。Transport、Sequence、Loop、Synth、Sampler 适合快速搭建音乐结构。

### Strudel

浏览器里的 pattern / live coding 环境。适合继续研究节奏、pattern 和算法音乐。

### WebGL / Canvas

用于实时视觉。视觉可以读取同一套 State / Clock，而不是只依赖音频频谱。

### Processing / OSC

当项目需要外部控制器、手机传感器或多软件协同时，可以把同一套 Mapping 继续带到现场系统。

### GitHub Pages

把静态网页发布成可分享 URL，同时保存源码、版本和说明。

---

## 11. 继续练习

建议从小组件继续：

1. 一个按钮：Tap / Hold / Release / Idle；
2. 一个节拍器：BPM、Start / Stop、Quantize；
3. 一个 State Ladder：OPEN / BUILD / PEAK / BREAK；
4. 一个 Density Fader：一个滑块同时改变声音和视觉密度；
5. 一个 Graph Router：用 NEXT 在几个状态之间移动；
6. 一个 Release Memory：改变残留时间；
7. 一个键盘控制器：Space、方向键、1–4、F、Esc；
8. 一个可以发布到 GitHub Pages 的完整网页乐器。

---

## 12. 相关入口

- [公开档案](./index.html)
- [参与者课后延伸](./participant.html)
- [音画同源知识库](../workshop-knowledge/)
- [Control Toybox](../workshop-toys/)
- [State Instrument](../workshop-state-instrument/)
- [Demo](../workshop-demos/)
- [Glyph Matrix Live](../workshop-demos/vl6-glyph-matrix-live.html)

---

本笔记根据课程材料与课后整理编写，用于课程归档和后续学习；不包含参与者个人信息和现场私聊内容。