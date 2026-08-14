# 《无需进一步输入 / No Further Input Required》 2026

> Work in Progress / Generative Audiovisual System / Single-channel Moving Image / Live System

- [专题页面 / Work Page](../works/no-further-input-required.html)

---

## 项目信息

| 项目 | 内容 |
|------|------|
| **时间** | 2026 |
| **当前版本** | Work in Progress |
| **展览交付方向** | 单通道影像 / Single-channel moving image |
| **计划时长** | 约 8–10 分钟，可循环 |
| **长期形态** | 生成式音画系统 / 影像版本 / Live performance system |
| **2026-08-15 更新** | 将作品从“关于自动化的影像”进一步明确为“能够实际运行并保存先前判断痕迹的音画系统” |
| **2026-08-14 V0** | 私人仓库已有可运行最小系统原型（6 states + transition + audio + NEXT/HOLD/AUTO）；**preference history 未实现** |

> 当前作品影像仍在制作中。专题页暂不使用替代性概念图冒充最终画面；系统图、研究结构与 WIP 信息可以公开，最终作品截图、声音与展览现场待完成后补录。

> **V0 可运行原型位置（private，非公开交付）：** `ewanqian/no-further-input-required` → `index.html`

---

## 作品简介

一套系统在不再需要外部输入之后，仍持续携带着先前输入的痕迹。

《无需进一步输入》围绕自动化与人类判断之间的关系展开。作品关注人的输入、修正与偏好如何逐步进入系统，并使系统最终呈现出能够自行运行的状态。当持续操作减少以后，人的判断并未随之消失，它仍可能以被选择的视觉模块、规则、参数、转移关系、权重与历史记录继续影响系统。

作品当前计划同时作为一套 **生成式音画系统** 和由该系统产生的 **单通道影像版本** 发展。系统并不以“AI 自动生成一切”为目标，而是将 AI 放在代码协作、可能性生成和系统设计的位置，再由艺术家持续筛选、删减、修改与组织。作品真正需要被看见的，是这些判断如何逐渐沉积为系统内部的结构。

---

# 2026-08-15 前期定向更新

## 1. 当前核心命题

此前作品已经提出：一个系统在吸收人的输入、修正和偏好后，最终可能看起来“不再需要人”。

今天进一步明确：**这个概念应该进入作品的真实制作机制，而不只停留在影像说明中。**

作品可以经历如下过程：

```text
AI / code collaboration
        ↓
visual possibilities
        ↓
human selection / deletion / correction
        ↓
approved visual vocabulary
        ↓
state transitions / weights / timing
        ↓
autonomous audiovisual runtime
        ↓
NO FURTHER INPUT REQUIRED
```

因此，“无需进一步输入”不代表人的判断被清空；它更接近一种判断的内化：人的选择从实时操作转移到系统的结构之中。

---

## 2. AI 在作品中的位置

AI 当前不被定义为最终画面的唯一生成器。

更重要的使用位置包括：

- 与艺术家共同产生不同的 drawing algorithm / shader / visual logic；
- 将同一个视觉想法改写成不同程序结构；
- 生成艺术家平时不会主动采用的代码路径与组合方法；
- 辅助建立状态机、转移逻辑与控制系统；
- 在大量候选结果中形成“生成—选择—修改—再生成”的循环。

艺术家的工作集中在：

- 哪些结果值得留下；
- 哪些只是技术效果；
- 哪些视觉需要删掉；
- 一个状态应该持续多久；
- 什么变化应该跟随声音；
- 什么变化应该保持自主；
- 什么时候停止继续生成。

**AI 负责扩大可能性，人的判断负责形成作品。系统随后保存这些判断留下的结构。**

后续如果加入“根据操作历史自动调整转移权重”的机制，应明确标记为真实实现后再写入最终作品说明。目前这一层仍属于 planned / not implemented。

---

# 系统结构 V0

## A. Visual Vocabulary / 视觉词汇库

先建立少量独立但完整的视觉状态，而不是直接制作一条完整时间线。

V0 目标：**6 个状态**。

每个状态都应是一套可以独立持续运行的 visual behaviour，而不是一段预渲染素材。

**V0 已实现的 6 个 behaviour 名称（私人原型，待视觉验收）：**

| ID | Name | Formal focus |
|----|------|----------------|
| 01 | FIELD | sparse residual field |
| 02 | LINES | offset accumulating lines |
| 03 | ARCS | expand / interrupt arcs |
| 04 | RECT | local rule rectangles |
| 05 | ACCUM | history accumulation |
| 06 | SPARSE | negative space + rare events |

可使用的形式变量：

- line / arc / rectangle / field 等少量 primitive；
- 重复、偏移、累积、删除；
- 残留与历史帧；
- 缓慢校正与突然中断；
- 局部规则变化；
- 密度、尺度、方向、速度与留白。

当前原则：**不要模仿 touch:waves 的白线视觉，不复制其视觉资产或代码；借鉴的是“一个输入对应一套完整音画行为”的交互语法。**

**状态：implemented in private V0 / awaiting visual QA**

---

## B. State Machine / 状态机

作品不依赖固定剪辑时间线，而由状态之间的关系组织时间。

每个状态至少具有：

- `entry`：进入条件；
- `duration`：持续时间范围；
- `behaviour`：内部运行规则；
- `exit`：退出条件；
- `transitionWeight`：下一状态的可能性。

系统可以存在确定转移、概率转移、基于声音的转移和基于历史的转移。

**V0 已实现：** 加权 transition graph + MANUAL / HOLD / AUTO 运行模式。基于历史的权重自适应 **未实现**。

**状态：implemented (core) / developing (tuning)**

---

## C. Audio Structure / 音画关系

音频不应只被映射成常见的 `bass → scale`、`treble → brightness`。

更值得测试的是让音乐结构决定 **什么时候允许系统发生变化**：

- onset → 是否允许触发局部事件；
- beat → 当前状态内部推进；
- phrase / 4–8 bars → 是否允许切换状态；
- energy → 状态的稳定程度或变化密度；
- silence / low activity → 增加自主运行或结构回返的可能性。

**V0 已实现：** WebAudio mic analyser + internal pulse fallback；energy / onset 用于 AUTO 转移门控与局部事件。完整 phrase / bar 结构仍属 developing。

**状态：implemented (interface) / developing (musical structure)**

---

## D. Human Control / 人工控制

Live 版本应尽量减少操作数量。

V0 可以只保留：

- `NEXT`：允许进入下一个状态；
- `HOLD`：维持当前状态；
- `AUTO`：进入自主运行；
- `RESET`：回到初始结构（可后续加入）。

**V0 已实现：** NEXT / HOLD / AUTO + 键盘快捷键；操作写入 in-memory log。

**状态：implemented**

---

## E. Preference History / 判断历史（计划层）

如果后续技术实现稳定，可以让系统记录人工干预：

- 某个状态经常被提前 NEXT；
- 某种转移经常被保留；
- 某个视觉状态总是被 HOLD 更久；
- 某些组合持续被避开。

这些行为可以逐步修改状态持续时间和转移权重。

到这一层时，作品中的“人的判断进入系统”才成为真正可运行的机制，而不只是概念文本。

**状态：planned / not yet implemented**

V0 仅保存 operation log，**不**根据日志改权重，**不**宣称系统已学习艺术家偏好。

---

# 三种作品形态

## 1. Gallery / 展览系统

系统持续运行。观众面对的是不断变化、但不完全重复的音画过程。

可以隐藏控制 UI，只保留作品本身。

## 2. Film / 单通道影像

系统运行较长时间后，由艺术家选取、组织或记录其中一段 8–10 分钟的执行结果，形成外滩大会等展览所需的单通道版本。

影像版本与系统版本属于同一作品的不同 manifestation，而不是互相独立的项目。

> 点云 + 数据流图谱的影像结构见 Issue #24；与本系统 V0 并行，不互相替代。

## 3. Live / 演出系统

音乐实时进入系统。艺术家通过少量控制进行 NEXT / HOLD / AUTO 等干预。

长期目标是让它成为可以持续用于现场的个人音画系统：人工操作减少，但之前形成的视觉判断与结构仍持续参与演出。

---

# 艺术分析框架

## 技术 / Technology

当前 V0 实际使用：**Web Canvas 2D + WebAudio + 浏览器状态机**。

候选仍包括 WebGL / Processing / p5.js 等。最终技术栈尚未锁定。技术选择应服从视觉语言、稳定性和现场使用，不作为艺术价值本身。

**状态：developing**

## 媒介与形式 / Medium & Form

- generative audiovisual system；
- single-channel moving image；
- live audiovisual performance system；
- realtime / semi-autonomous software work。

作品的关键形式变化，是从固定线性影像进一步转向由状态、转移与运行过程共同组织的时间结构。

**状态：defined / developing**

## 艺术语言 / Artistic Language

当前艺术语言集中在：

- 状态之间的进入、停留、回返和退出；
- 重复中产生偏差；
- 修正过程留下痕迹；
- 已消失的输入仍通过当前结构继续产生影响；
- 视觉并不归零，而是带着历史继续运行；
- 人工控制逐渐减少，系统结构逐渐显现。

需要避免作品变成普通“漂亮生成动画”或 screensaver。每一种视觉状态都必须能够解释它在整个时间结构中的作用。

**状态：developing**

## 艺术问题 / Artistic Inquiry

- 当人的经验、修正与偏好已经进入系统，一个看似自主运行的系统中还保存着多少人的判断？
- 当艺术家不再持续操作，作者是否真的离开了作品？
- 当 AI 扩大了可以被迅速实现的形式可能性，艺术家的工作是否更多转向选择、删减、组织和判断？
- 当这些选择进一步被写回软件结构，系统是否开始携带一个创作者过去的判断历史？
- 一件作品能否同时是一段影像、一套乐器和一套持续演化的运行规则？

**状态：active inquiry**

## 理论 / Theory

当前不建立封闭理论体系，先使用以下 working concepts：

- external memory / 外部记忆；
- residual judgment / 残留判断；
- distributed authorship / 分布式作者性；
- rule-based / generative systems；
- audiovisual instrument；
- autonomy / feedback / state transition。

这些词需要继续通过作品形式和阅读验证，不作为宣传包装。

**状态：research**

---

# 当代新媒体艺术语境中的位置

## 1. 从“图像”转向“规则与系统”

Casey Reas 的 `Process` 系列把规则、软件执行与持续变化的图像连接起来：作品的重要部分并非某一张最终图像，而是能够产生图像的规则系统。

与本项目的连接：

- 都将规则和运行过程视为作品结构；
- 都允许系统产生超出单一固定构图的结果；
- 本项目进一步加入 AI-assisted coding、人工筛选、音画演出与“历史判断是否进入系统”的问题。

参考：<https://reas.com/process>

## 2. Audiovisual Instrument / 音画乐器

`sascacci + ksmt` 的《touch:waves》被 NTT ICC 定义为可通过触摸演奏的 visual instrument：画面分为 27 个区域，声音与对应视觉被映射在一起；sascacci 的公开简介也明确其使用 WebAudio / MIDI 进行互动音画表达。

与本项目的连接：

- 一个输入可以对应一套完整的声音—视觉行为；
- 浏览器 / 软件本身可以成为可演奏媒介；
- 交互结构可以确保输入很少但输出保持完整。

本项目不复制其视觉风格与代码。借鉴的重点是 **visual instrument 的组织逻辑**，并进一步把单次 trigger 扩展成可持续运行的 state / behaviour。

参考：
- <https://www.ntticc.or.jp/ja/archive/works/touch-waves/>
- <https://www.ntticc.or.jp/ja/archive/participants/sascacci/>
- <https://www.jfmusicwritterclass.com/entry/R-MONO_Lab>

## 3. 人—机器共同形成行为

Sougwen Chung 的 `Drawing Operations` 长期把人的动作、机器人行为、机器学习与共同表演放在同一创作过程中；机器并非只在最后生成一个成品，而是在实时协作和反馈中改变作品。

与本项目的连接：

- AI / 机器的意义可以存在于关系与过程，而不是“生成了一张 AI 图片”；
- 人过去形成的动作或资料可以进入机器行为；
- 机器的反馈又会改变人的下一次选择。

本项目关注的不是机器人身体，而是 **艺术家的选择历史如何进入一个音画运行系统**。

参考：<https://sougwen.com/work/mimicry-drawing-operations>

## 4. AI 作为带有历史的观看 / 判断结构

Memo Akten 的 `Learning to See` 使用机器学习系统展示：机器只能通过已有训练经验的过滤去解释当前输入。作品把 AI 从一种视觉特效转向对“机器如何看、如何形成意义”的讨论。

与本项目的连接：

- 系统当前的行为受到过去材料与历史的影响；
- AI 重要的不只是产生结果，也包括它如何携带、读取和重组已有信息；
- 本项目进一步把这个问题转向创作判断：系统是否会通过过去的选择继续“像这个创作者一样”运行？

参考：<https://www.memo.tv/works/learning-to-see/>

## 5. Live audiovisual / computation 作为艺术实践

Daito Manabe 的长期实践将音乐、计算、视听、身体信号、人工生命与 AI agents 放入现场、装置和表演中。他的公开实践也显示：代码、系统和音乐结构可以同时作为艺术媒介，而不必把作品收缩成“技术展示”。

与本项目的连接：

- 音画系统可以同时具有作品、工具和演出媒介三种身份；
- realtime system 的艺术价值来自它如何组织关系、反馈、时间和感知；
- AI 可以进入一个更大的 computational / audiovisual practice，而不需要把作品简单归类为“AI art”。

参考：<https://daito.ws/en/>

---

# 当前最需要避免的问题

- **不要复制 touch:waves 的视觉皮肤。** 参考其交互语法、模块化和音画映射即可。
- **不要把 AI 使用本身当作主题。** AI 必须真实改变作品的制作关系、状态生成或判断沉积。
- **不要让“自主”只存在于文案。** 最终系统至少需要真实的状态机与自主转移。
- **不要让随机等于生成。** 状态之间需要有组织、有历史、有音乐结构。
- **不要让画面只剩高级 screensaver。** 每个 visual state 都需要明确的形式功能。
- **不要提前宣称系统“学习了艺术家”。** 只有 preference history / weight adaptation 真正实现后才使用这一表述。

---

# V0 制作目标

第一阶段不追求 8–10 分钟成片，先完成一个能够运行的最小系统：

1. 6 个视觉状态；
2. 1 个 transition graph；
3. 音频输入 / beat 或 phrase 信息；
4. `NEXT / HOLD / AUTO` 三个主要控制；
5. 可以连续运行 10–20 分钟；
6. 每次运行能够产生不同但仍然具有统一语言的结果；
7. 保存人工操作日志，为后续 preference history 做准备。

当 V0 能稳定运行，再从系统中发展最终单通道影像。

---

## Related

- [专题页面 / Work Page](../works/no-further-input-required.html)
- [`about/media-profile-2026.md`](../about/media-profile-2026.md)
- [Issue #21 — 2026-08 艺术家简介、创作方向与 AI 采访议题](https://github.com/ewanqian/portfolio/issues/21)
- [Issue #22 — Gallery 作品分析与维护框架](https://github.com/ewanqian/portfolio/issues/22)
- [Issue #24 — 外滩大会影像落地](https://github.com/ewanqian/portfolio/issues/24)
- Private V0 prototype: `ewanqian/no-further-input-required` (private)

## 后续补录

- [x] V0：6 个 visual states — **implemented in private repo; awaiting visual QA**
- [x] transition graph — **implemented (weights + AUTO)**
- [x] WebAudio / audio-structure prototype — **interface implemented; phrase structure developing**
- [x] NEXT / HOLD / AUTO control — **implemented**
- [ ] operation log / preference-history experiment — **log only; adaptation not implemented**
- [ ] 最终技术栈确认
- [ ] 完成影像结构与最终时长
- [ ] 补声音设计 / 音乐信息
- [ ] 补最终作品截图
- [ ] 补生成规则 / 系统图
- [ ] 补最终展览节点与现场照片
- [ ] 补作品史 / 版本变化
- [ ] 继续媒介史与理论阅读
- [ ] 完成后再评估是否进入 `content/works/` 前台 Gallery 内容层
