# 2026-08-29｜极简输入：构建视听系统｜参与者课后延伸

这份文件给参加工作坊的朋友继续练习使用。

## 先记住一条主线

```text
INPUT
↓
MAPPING
↓
STATE / CLOCK / MEMORY
↙             ↘
SOUND         VISUAL
↓
FEEDBACK
↓
NEXT DECISION
```

工作坊结束以后，不需要一次做一整场 Live Set。更适合继续的方法是：每次只完成一个小关系，并把它保存下来。

## 练习 01｜一个按钮

从一个键开始：

```text
TAP
HOLD
RELEASE
IDLE
```

可以直接给 Agent：

```text
先读取当前项目，不要重写框架。
保持一个主要输入键。

加入四个状态：
- TAP：短促的声音与视觉事件；
- HOLD：按住后进入持续状态；
- RELEASE：松开后进入 1–3 秒衰减；
- IDLE：没有输入时仍保留轻微 ambience / residue。

声音与视觉都读取同一组 state。
保留 Reset / Panic。
完成后告诉我怎么测试。
```

入口：`/workshop-knowledge/exercise-01.html`

## 练习 02｜把输入放进节拍

```text
input
→ immediate feedback
→ pending
→ next 1/8 note
→ main event
```

提示词：

```text
给现有项目加入唯一的 BPM / Transport。
用户输入后立即给轻微反馈，但主声音和主视觉事件 quantize 到下一 1/8 note。
不要创建两套独立 timer。
Audio 和 Visual 都读取同一个 beat / bar。
```

## 练习 03｜增加 State，而不是增加按钮

从四个 Scene 开始：

```text
OPEN
BUILD
PEAK
BREAK
```

同一个 Trigger 在不同 Scene 中改变：

- density；
- release；
- brightness；
- pitch range；
- visual population；
- FX amount。

入口：`/workshop-state-instrument/`

## 练习 04｜视觉变体

视觉不必从“更多特效”开始。

可以选择一种空间组织变化：

- GRID；
- ORBIT；
- GLYPH；
- FIELD；
- GRAPH；
- PARTITION；
- TRAIL；
- TOPOLOGY。

要求每个 Variant 至少改变一种行为：运动、密度、空间关系、时间结构或 Release。

## 练习 05｜让键盘成为控制器

一个简单的控制图：

```text
SPACE     Main Trigger
↑ / ↓     BPM ±5
← / →     Scene
1–4       Visual Variant
A         Auto / Assist
F         Fullscreen
ESC       Panic / Reset
```

如果继续增加按键，先给每个键定义“角色”，不要只写成 Effect 1 / Effect 2 / Effect 3。

## 练习 06｜外部输入

可以继续把这些输入转成 0–1 参数：

- mouse X / Y；
- mouse velocity；
- repetition rate；
- camera brightness；
- frame difference；
- phone gyroscope X / Y / Z；
- MIDI knob / fader。

再让这些参数控制：

- energy；
- density；
- filter cutoff；
- visual scale；
- trail；
- pitch；
- spatial position。

## 进阶｜Processing / OSC / Syphon / Spout

浏览器版本适合快速原型和分享。

希望进一步进入现场系统时，可以继续研究：

```text
Phone / Sensor
↓
OSC
↓
Processing / TouchDesigner / Other Runtime
↓
Syphon / Spout
↓
Resolume / Stage Output
```

## 课后保存方式

建议每一个练习都保留：

```text
project-name/
├── index.html
├── assets/
├── README.md
└── state.json   (可选)
```

README 只需要回答：

1. 这是什么？
2. 怎么操作？
3. 这次只研究了哪一个关系？
4. 下一版想改什么？

## 发布成一个可以分享的网页

### 最简流程

1. 创建一个 GitHub Repository；
2. 上传 `index.html` 和 assets；
3. 保证资源使用相对路径；
4. Settings → Pages；
5. 选择发布分支；
6. 等待 Pages URL；
7. 用无痕窗口重新打开测试；
8. 把链接发给别人试玩。

### 可以直接给 Agent 的发布提示词

```text
请把当前静态网页项目整理成适合 GitHub Pages 发布的版本。

要求：
1. index.html 是入口；
2. 图片、声音、JS、CSS 全部使用相对路径；
3. 不把任何 token、密码、内网地址写进仓库；
4. 添加简短 README，说明操作方式；
5. 提交到我指定的 GitHub 仓库；
6. 告诉我 GitHub Pages 应如何开启；
7. 发布后重新检查最终 URL 是否可以正常打开、播放声音和进入全屏。
```

## 建议回到群里分享什么

不用写长总结。发三样即可：

- 一个可打开的 URL；
- 10–20 秒操作录屏；
- 一句话：这次只改了什么关系。

例如：

> 我这版只研究 Hold Duration。按住越久，声音密度和视觉残影越强；松开后会留下 2 秒 residue。

这样更容易让其他人继续试玩和给反馈。

## 快速入口

- `/mana-0829/` — 工作坊公开总结
- `/workshop-toys/` — Control Toybox
- `/workshop-knowledge/` — Knowledge / Prompt Library
- `/workshop-state-instrument/` — State Instrument
- `/workshop-demos/` — Demo Ladder
- `/workshop-demos/vl6-glyph-matrix-live.html` — Glyph Matrix Live
