# 01｜一键输入
## One-Button Input
### Minimal Input Lab / 极简输入实验室

**版本：** Reader 0.1 · 2026-11-02  
**发起 / Instructor:** Ewan Qian

> 先不要做一整套控制器。只用一个输入，观察它怎样变成状态、节拍、声音、视觉和下一次决定。

---

## 1. 本期解决什么

很多实时视觉系统一开始就拥有太多按键、参数和效果。结果是功能很多，但使用者不知道什么时候该按、为什么要按，也很难形成身体记忆。

这一期反过来：**只保留一个主要输入。**

从一个按钮、Space 键、脚踏或 Pad 开始，把一次输入拆成不同时间状态，再让声音与视觉读取同一套状态。

核心不是“一个按钮能触发多少特效”，而是：

- 输入什么时候发生；
- 系统怎样理解它；
- 声音和视觉怎样共同回应；
- 状态怎样进入和退出；
- 操作者怎样知道下一步该做什么。

---

## 2. Learning Outcomes / 学习结果

完成本模块后，参与者应能够：

1. 用一个主要输入建立至少 **Press / Hold / Release / Idle** 四种状态；
2. 让声音和视觉读取同一组 state，而不是各自独立计时；
3. 加入一个统一 BPM / Clock，并把主要事件量化到节拍；
4. 建立至少两个明显不同的演奏状态，例如 Quiet / Active 或 OPEN / BUILD；
5. 保留 Panic / Reset / Resync 等恢复逻辑；
6. 完成一段 30–60 秒的短演奏，并说明自己什么时候推进、什么时候收回；
7. 保存 V1 / V2，并写清楚第二版只改了什么。

---

## 3. Course Map / 课程地图

```text
PLAY
↓
ONE INPUT
↓
PRESS / HOLD / RELEASE / IDLE
↓
ONE CLOCK / BPM
↓
SOUND + VISUAL
↓
SCENE / STATE
↓
PERFORM
↓
REVIEW
↓
V2
```

---

## 4. Core Model / 核心模型

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

这里最重要的是 **Mapping / 映射**。

不是“声音驱动画面”，而是一个动作如何同时改变声音和图像，以及为什么这个动作应该控制这些参数。

---

## 5. Standard Exercise / 标准答案

### 目标

只用 Space 键完成一个最小可演奏系统。

### 输入

- Space 键；
- 一套简单视觉；
- 一组最小声音；
- 一个统一 BPM。

### 状态

```text
TAP
HOLD
RELEASE
IDLE
```

### 最小行为

**TAP**  
一次短促事件。声音与视觉同时出现，但持续时间很短。

**HOLD**  
按住后进入持续状态。按得越久，density / brightness / filter / trail 中至少一个参数发生连续变化。

**RELEASE**  
松开后不是立即消失，而进入 1–3 秒衰减。

**IDLE**  
没有输入时系统仍保留极轻的 ambience / residue，不完全死亡。

### Clock

输入发生后可以立刻给一个很轻的反馈，但主要声音和视觉事件进入下一拍或下一 1/8 note。

### 完成条件

- [ ] Space 可以完整触发四种时间状态；
- [ ] Sound / Visual 使用同一个 state；
- [ ] 有唯一 BPM / Transport；
- [ ] 有 Reset / Panic；
- [ ] 录制一段 30 秒演奏；
- [ ] 不增加第二个主要输入。

---

## 6. Step-by-Step / 跟做

### Step 01｜让输入先有时间

**Goal**  
把一个按钮从 On / Off 变成有时间含义的输入。

**Action**  
建立 Press / Hold / Release / Idle。

**Done When**  
只看日志或 UI，也能明确知道系统现在在哪个状态。

**Failure Mode**  
所有事件都只发生在 keydown；Hold 和 Release 没有独立意义。

---

### Step 02｜声音和视觉读取同一个状态

**Goal**  
避免“音频一套逻辑、画面另一套逻辑”。

**Action**  
让 Sound 和 Visual 都读取同一个 state 对象或状态机。

**Done When**  
修改一次 Hold duration，声音和画面都能正确响应。

**Failure Mode**  
为了对齐效果不断写延迟和独立 timer。

---

### Step 03｜放进节拍

**Goal**  
让操作可以自由发生，但结果保持音乐时间结构。

```text
input
→ immediate feedback
→ pending
→ next subdivision
→ main event
```

**Done When**  
连续乱按也不会让主事件完全脱离节拍。

**Failure Mode**  
为了“准”而让按钮完全没有即时反馈，导致手感迟钝。

---

### Step 04｜增加 State，不增加按钮

先用四个场景：

```text
OPEN
BUILD
PEAK
BREAK
```

同一个输入在不同 Scene 中改变：

- density；
- release；
- brightness；
- pitch range；
- visual population；
- FX amount。

**Done When**  
不增加新按钮，也能明显听出 / 看出不同能量状态。

---

### Step 05｜做一次 30–60 秒演奏

不要追求效果数量。

只练：

```text
LOW
→ BUILD
→ PEAK
→ DROP / BREAK
→ RETURN
```

操作者必须能主动让系统下降，而不是一直叠加。

---

## 7. Checkpoint / 检查点

### Checkpoint A｜Blind Play

把电脑交给另一个人，不解释。

观察：

- 他是否知道哪里可以按；
- Press / Hold / Release 是否有明显差异；
- 出错后是否能恢复；
- 控制是否形成身体记忆。

### Checkpoint B｜One Change Only

V2 只允许改一个关系，例如：

- Hold duration；
- Quantize subdivision；
- Release；
- Scene density；
- Feedback strength。

然后比较 V1 / V2。

---

## 8. Assessment / 验收

### Structure
输入和状态是否读得懂？

### Timing
事件是否有节拍和时间层次？

### Relation
声音和视觉是否来自同一套关系，而不是硬凑同步？

### Control
能否推进、收回、Reset、Resync？

### Iteration
是否真的根据试玩结果做了 V2？

### Documentation
别人能否打开、操作并理解？

---

## 9. Submit / 提交

每次练习只提交四样：

1. 一个可运行 URL 或完整工程；
2. 10–30 秒操作录屏；
3. 一句话：**这版只研究了什么关系？**
4. 一句话：**下一版只改什么？**

示例：

> 这版只研究 Hold Duration。按住越久，声音密度和视觉残影越强；松开后保留 2 秒 residue。下一版只测试把主事件量化到 1/8 note。

---

## 10. Case Notes / 实践提示

### 不要把“一键”理解成“功能少”

限制输入的目的，是迫使系统把更多变化放到：

- 时间；
- 状态；
- 上下文；
- 记忆；
- 节拍；
- 操作者判断。

### Recovery 也是乐器设计

如果现场系统失控，Clear / Panic / Resync 不是工程收尾，而是表演接口的一部分。

### AI / Agent 是构建副驾

Agent 可以帮助：

- 接键盘 / MIDI；
- 整理 state；
- 加入 BPM；
- 排查浏览器问题；
- 记录版本。

但演出时的听、看、判断仍由人完成。

---

## 11. Level Up / 下一关

### L1 COPY
完成标准答案。

### L2 MODIFY
只改一个变量。

### L3 COMPOSE
把 OPEN / BUILD / PEAK / BREAK 编成 30–60 秒。

### L4 COLLAB
让另一位音乐人 / 视觉作者使用你的系统，或者接入外部 MIDI / 脚踏。

### L5 PERFORM
进入真实扩声 / 屏幕环境，完成一次公开或半公开演奏并复盘。

---

## 12. Further Reading / 延伸阅读

### Required

- `workshops/personal-av-instrument/2026-08-29-participant-followup.md`
- `/workshop-knowledge/exercise-01.html`

### Optional

- Personal A/V Instrument 项目总览
- Found VJ Deck 实践案例
- State Instrument / Demo Ladder / Control Toybox

### Research Reference

数字乐器与 NIME 中关于 parameter mapping、gesture、instrument design、performance practice 与 instrument longevity 的研究，可作为长期校准，不要求在公众课上完整讲授。

---

## 13. Reflection / 复盘

1. 哪一个输入状态最像“真的在演奏”？
2. 哪一个效果只是好看但没有操作意义？
3. 系统什么时候最容易失控？
4. 如果只能保留一个变化，你保留什么？
5. 下一版只改哪一个关系？

---

## 14. Credits / Version

**Series:** Minimal Input Lab / 极简输入实验室  
**Module:** 01 One-Button Input / 一键输入  
**Instructor / Initiator:** Ewan Qian  
**Version:** Reader 0.1 · 2026-11-02

本 Reader 根据既有工作坊、Personal A/V Instrument 长期研发、一键输入练习与课后延伸重新编辑。它不是现场逐字稿。
