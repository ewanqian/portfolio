# 2026-08-29｜极简输入：构建视听系统｜工作坊结论

这份文档整理 2026-08-29 工作坊中已经形成、适合长期引用的内容。它不是逐字稿，也不保留现场聊天和临时中间态。

## 一句话

从一个最小输入开始，通过 Mapping、Clock、State、Memory 与 Feedback，把网页逐步变成一件可以练习、分享和演奏的音画系统。

## 工作坊实际推进的路径

```text
一个输入
↓
Tap / Hold / Release
↓
BPM / Beat / Quantize
↓
Shared State
↓
Sound + Visual
↓
Visual Variants / Scene
↓
Keyboard / Mouse / Continuous Control
↓
Performance System
↓
Processing / OSC / Syphon / Spout
↓
保存、发布、继续迭代
```

## 1. 极简输入不等于极简行为

一个按钮虽然只有 On / Off，但可以继续读取：

- 按下的瞬间；
- 按住的时长；
- 松开的瞬间；
- 连续按压的频率；
- 两次输入之间的间隔；
- 当前系统所处的 State。

因此一个按钮可以形成：

```text
IDLE → TAP → HOLD → RELEASE → RESIDUE
```

输入仍然很少，但系统已经具有时间和状态。

## 2. 离散输入可以被转成连续控制

按键本身是离散信号，但按压速度、重复频率、Hold Duration 等可以变成 0–1 的连续参数。

例如：

```text
button repetition rate
→ energy
→ audio density
→ visual density
```

这比继续增加按钮更值得研究。

## 3. BPM 是共享时间坐标，不只是一个节拍器数字

人的输入不需要每一下都绝对准确。

```text
input now
→ immediate acknowledgement
→ pending intent
→ next beat / 1/8 / bar
→ main sound + visual event
```

Audio 与 Visual 应尽量读取同一个 Transport / Clock，而不是各自运行一套不相关的计时器。

## 4. “音画同源”在本工作坊中的工作定义

本次工作坊用“音画同源”描述一种系统关系：声音和视觉尽量由同一个动作、参数、数据或状态共同产生。

```text
INPUT
↓
MAPPING / RULE
↓
SHARED STATE
↙          ↘
SOUND      VISUAL
```

它不要求声音和画面做完全相同的数值变化；二者可以各自解释同一个 State。

## 5. 演奏性来自关系，而不是按钮数量

工作坊中反复出现的判断是：演奏系统需要让观众能够感受到“动作与结果之间存在关系”，同时又不能在几秒内被完全看穿。

一个简单但成立的演奏关系可以是：

```text
左手：Trigger / Rhythm
右手：Intensity / Speed / Brightness
系统：State / Quantize / Safety
```

表演者因此不只是启动一个已经完成的动画，而是在持续改变系统。

## 6. 产品型交互与表演型交互是两条不同路径

### 给别人使用

重点通常是：

- 清楚；
- 好学；
- 立即获得反馈；
- 操作顺手。

### 给表演者使用

可以进一步考虑：

- 输入是否能形成身体动作；
- 观众是否能看出表演者正在注入能量；
- 某些控制是否需要练习；
- 表演者是否能在现场做出选择，而不是只播放结果。

两条路径可以共享技术，但评价标准并不完全相同。

## 7. 每日小练习可以累积成 Live Set

工作坊没有把“一次生成完整演出”作为目标。

更可靠的方法是：

```text
每天完成一个小型状态
↓
保证单独播放也成立
↓
保存版本
↓
逐渐积累声音与视觉单元
↓
整理为多个 Scene / Role / Variant
↓
进入 Live Set
```

一个练习值得留下的最低标准：

- 单独运行时不难受；
- 停在任何时刻画面仍然成立；
- 音量与频段不过载；
- 有明确的进入、持续、退出方式；
- 可以被下一次工程重新调用。

## 8. AI 在这里更适合承担“快速产生候选”

工作坊中的有效用法是：

```text
描述一个小问题
→ 让 Agent 快速实现
→ 运行
→ 比较
→ 删除
→ 保留
→ 再改一个关系
```

不是不断增加功能，也不是要求一次生成最终作品。

## 9. 从浏览器到更稳定的现场工具

浏览器适合：

- 快速原型；
- 分享链接；
- Web Audio / WebGL；
- 键盘、鼠标、手机输入；
- 低门槛测试。

当工程需要更长期维护或更稳定的现场链路时，可以继续进入：

- Processing / p5.js；
- OSC；
- 手机陀螺仪 / 传感器；
- Syphon（macOS）/ Spout（Windows）；
- TouchDesigner / Resolume Arena 等舞台工具。

## 10. 这次工作坊留下的可复用资源

- `/0829.html` — Workshop Deck
- `/workshop-demos/` — Demo Ladder
- `/workshop-toys/` — Minimal Control Toybox
- `/workshop-state-instrument/` — State Instrument Exercise
- `/workshop-knowledge/` — Knowledge / Prompt Library
- `/workshop-demos/vl6-glyph-matrix-live.html` — Glyph Matrix Live

## 后续练习方向

### A. 一个按钮

继续研究：Tap / Hold / Release / Repeat Rate / Duration / Interval。

### B. 一个滑块

让一个连续参数同时改变声音与视觉中的多个层级，例如 Density、Brightness、Filter、Trail。

### C. 一个状态机

从 OPEN / BUILD / PEAK / BREAK 出发，让同一个 Trigger 在不同 State 中产生不同意义。

### D. 一个 Graph

用 Node / Route 组织演出，不再把页面做成 effect list。

### E. 一个外部输入

把鼠标速度、摄像头亮度变化、手机陀螺仪等转成控制信号。

## 公开归档边界

公开版本只保存方法、可运行 Demo、公开案例和经过整理的工作坊结论。

不公开：

- 参与者姓名、工作单位、学校等可识别信息，除非本人明确同意；
- 微信群聊天、现场私聊和临时吐槽；
- 原始录音与完整逐字稿；
- 参与者尚未公开的个人项目细节；
- 临时 Token、账号、内网 IP、端口和其他凭证；
- 未核验的艺术史、人物、论文或作品事实；
- 未完成且已经被否定的临时 Demo，除非明确标记为研究过程。

## 归档原则

公开档案回答三个问题即可：

1. 这次工作坊真正研究了什么？
2. 哪些方法可以被别人继续使用？
3. 下一次打开这些资料时，从哪里继续？
