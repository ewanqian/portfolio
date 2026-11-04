# REACTOR — BPM System
## 在自动节拍与人工即兴之间

**Ewan Qian / 钱誉文 · 2026 · Live Visual Field Notes**

我把 REACTOR 的现场视觉工程称作 **BPM System**。它不是一组自动播放的视频，也不是把所有效果交给实时音频分析。它由持续运行的图像、与节拍同步的视觉层，以及可以随时打断的人工触发共同组成。系统处理重复、节拍和基础结构；演出者处理什么时候进入、什么时候加重、什么时候停下。

现场操作最重要的不是让每一次打击都产生画面，而是能控制整段音乐的密度与方向。

### 01 / 三种时间

**持续时间。** 最底层是一段能够长时间存在的影像。它可以是循环视频、预先制作的视觉场景，也可以来自 TouchDesigner 或网页实时渲染。它不需要不断切换，用来建立舞台的空间、底色和呼吸。

**节拍时间。** 中间层跟随 BPM，以不同的 envelope 组织闪烁、淡入淡出、遮罩和剪辑素材。我准备多种节拍密度：较长的起伏、稳定的脉冲、短促的重音，以及更接近切分节奏的快速变化。快进快出、慢进慢出与留有尾迹的曲线，会让同一素材承担不同的音乐功能。这一层为演出提供持续的时间感，但不替代演出者的判断。

**瞬时时间。** 顶层是手动触发。在 Resolume Arena 中，我使用 **Piano Trigger Style**：按下即进入，松开即退出。它适合处理不规则的碎拍、突然出现的声音、局部爆闪、短暂的半透明叠加，以及那些无法可靠地通过固定 BPM 预测的瞬间。

这三层互相独立，也能随时叠加。底层保持空间，中间层建立速度，顶层回应现场。

### 02 / 一套可以演奏的 Arena 工程

我会提前制作几组功能明确的触发素材，而不是在现场从一个巨大的素材库里寻找下一张画面。不同的 clip 承担不同任务：低频重音、瞬间闪光、较轻的透明叠加、带有运动轨迹的片段，以及可以保持更久的视觉状态。大部分变化发生在层之间，而不是每次都更换整个画面。

Arena 在这里是一台快速合成与演奏的工具。视频与网页实时内容可以进入同一工程，通过 clip、layer、opacity、blend、effect 与颜色控制重新组织。需要更强烈的状态时，我提高图像的节拍密度和明暗对比；需要让音乐呼吸时，则把层撤掉，让持续影像重新显现。

在 club 环境里，图像不需要从第一分钟就达到峰值。开场可以更暗、更单色，例如限制在深红色系，压住高亮与对比度，随着 DJ 的结构逐渐打开更明亮的画面。一个可以**做减法**的工程，比只能不断叠加效果的工程可靠得多。

### 03 / BPM 负责同步，耳朵和眼睛负责判断

BPM Sync 能让 clip 按照共享节拍推进。Ableton Link 可以把支持 Link 的软件保持在相近的速度与节拍相位上。这解决的是**时间同步**，不是对音乐情绪的理解。

实际演出中，我会持续听 DJ 的声音，同时观察 DJ 播放界面或辅助系统中的波形、频段提示和即将到来的空白区域。图像在低频强烈的部分可以更重；高频或碎拍出现时，可以改用较短促的手动 trigger。但这些不是应当机械化套用的规则。真正需要判断的是：下一段音乐是要继续积累，还是马上结束？

尤其在 break 或 drop 附近，**停止一层图像**往往比再增加一个效果更有力度。波形上的空白可能提示一个即将发生的段落变化，但必须结合监听和 DJ 的实际操作确认；不能把频谱颜色当成普遍适用的音乐语义。

### 04 / 四踏板与有限输入

脚踏控制让手可以继续处理 Arena，同时把几个最重要的动作放到脚下。我实际采用过的核心输入包括 **Tap** 与若干效果/状态触发。四个踏板的完整、固定映射仍需要按最终演出工程整理，因此这篇文章不把推测中的脚踏功能写成正式接线表。

我希望最终的踏板不是四个随意的效果按钮，而是一组可以在演出中重复建立肌肉记忆的操作：建立节拍、保持/恢复状态、触发短促事件、撤除或释放。演出者只需要少量输入，就能控制多个正在运行的层。

### 05 / 从 REACTOR 到 Live Copilot

这个系统的经验也正在进入 **Live Copilot / 演出副驾** 的课程准备：如何用少量输入控制一个长时间运行的演出，如何把 BPM 的重复性交给系统，把意外、停顿、强弱与转换留给人。

Live Copilot 不是让 Agent 替人决定每一个音画事件。它更适合承担排练记录、Cue / 状态提示、参数预设、错误恢复与信息整理；演出者继续保留对速度、能量和时间结构的最终判断。

这套方法可以由不同素材和工具实现。关键不在使用多少软件，而在于系统是否允许人随时**进入、保持、叠加、退出和恢复**。

---

### A note on synchronization

Resolume's BPM Sync controls clip playback against the composition tempo. Piano Trigger Style starts a clip on press and stops it on release. Ableton Link shares tempo, beat and phase across compatible participants; it does **not** provide the DJ waveform, spectrum colours or phrase detection described above. Those observations come from the performance environment and the artist's listening/visual judgement. The engineering goal is not automatic music interpretation, but a playable system that combines continuous image, clocked motion and human interruption.

### Further reading
- [Resolume — Clips / Trigger Style](https://resolume.com/support/en/clips)
- [Resolume — Video / BPM Sync](https://resolume.com/support/en/video)
- [Resolume — Ableton Link](https://resolume.com/support/en/link)
- [Ableton — Link reference](https://ableton.github.io/link/)
- [Minimal Input Lab / 极简输入实验室](../../workshops/minimal-input-lab/README.md)
- [Performance Control Model](../../research/performance-control-model/README.md)
