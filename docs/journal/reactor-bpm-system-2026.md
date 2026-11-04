# REACTOR — BPM System
## 三种时间，一套可以演奏的视觉工程

**钱誉文 Ewan Qian · 2026 · Live Performance / Visual SOP**

一场 Club 视觉演出不应该只有「放一条视频」和「让音频自动驱动画面」两种选择。REACTOR 的 BPM System 把时间分为三层：持续运行的空间影像、跟随共享节拍的动作，以及由表演者亲自触发的瞬间。系统负责稳定的重复，人负责密度、停顿、加重和释放。

这篇图文既是现场方法记录，也是可以照着搭建的入门 SOP。**Ableton Live** 可以管理音乐时间，**Resolume Arena** 负责视觉合成、播放与触发，**Beat Link Trigger** 为 DJ 播放器提供一个可观察的波形与状态窗口。它们可以协作，但职责并不相同。

### 00 / 一分钟理解三种时间

- **持续时间 / Continuous**：循环视频、低密度纹理或者实时场景。无人操作时画面仍可成立。
- **节拍时间 / Clocked**：按 BPM、Beat、Bar、Subdivision 运行的明暗、运动与 Envelope；节拍变化时，动作速度可以跟着变化。
- **瞬时时间 / Human**：按下、保持、松开或者直接撤除一层；处理碎拍、突发、停顿和人为重音。

记住：**底层让空间存在，中层让速度可感知，顶层允许人打断它。**

### 01 / 为什么要分开

**持续时间**是场景的呼吸。首先做一段足够耐看的暗部画面，不需要每次鼓点都切镜头。底层可以独立于 DJ 的每次节拍变化，甚至保持很久不变。

**节拍时间**是结构的重复。使用 1/1、1/2、1/4、1/8 等不同密度，以及 Attack、Decay、Sustain、Release 组织形态和明暗。速度被同步，并不代表软件理解音乐情绪。

**瞬时时间**是人的演奏。Resolume Arena 的 Piano Trigger Style 可以让 Clip 在按下时出现、在松开时退出。它与底层 Loop 相互独立，因此一次临时爆闪不需要摧毁基础画面。

### 02 / 最少准备四类素材

1. **BASE**：一段能连续运行 60 秒也不觉得急躁的影像或实时场景。
2. **CLOCK**：能看清重复周期的脉冲素材，先做最简单的每拍一次。
3. **HIT**：只有短暂出现才有力度的重音或透明叠加。
4. **BLACK**：真正的安全黑画面；失去同步或视觉过载时，可以立即退回。

先确保四项彼此独立，不要第一天就导入几百条效果。记录每个 Clip 的名称、层、Transport、BPM Beats、Trigger Style、快捷键和退出方法。

### 03 / 用一套 Ableton Live 教学工程认识三种时间

以下是面向初学者的**复现练习**，不是对当日私人 Ableton 工程文件的无依据复刻。

打开 Ableton Live Session View，新建一个 **4/4、100 BPM** 工程。100 BPM 时一拍是 0.6 秒，四小节是 16 拍，即 9.6 秒。REACTOR Opening Live Set 的工程说明同样采用 100 BPM / 四小节作为制作基线，但它不意味着当晚所有 DJ 曲目都使用这一速度。

- **Track 1 / BASE**：长 Pad、环境音或连续声场。让它运行，感受没有强拍的持续时间。
- **Track 2 / PULSE**：用 Drum Rack 建立四分音符 Pulse；再复制为八分、十六分，比较密度。
- **Track 3 / ACCENT**：One-shot，保留足够空白，不要让它自动每拍循环。
- **Track 4 / CUE**：建立 OPEN / BUILD / PEAK / BREAK 四个 Scene，供排练标记使用。

启动 BASE；加入 PULSE；在你觉得需要加重时手动触发 ACCENT；最后**停掉 PULSE**，只保留 BASE。观察「撤掉一层」为什么比继续增加效果更有张力。

如需和 Arena 一起练习，先把 Ableton Link 设置为启用，并检查 Arena 是否加入同一 Link 会话。Link 同步 tempo、beat 和 phase；并不会传送 DJ 波形、曲目信息或音乐段落分析。Link 中其他参与者也可能修改 Tempo，正式演出前必须商定修改权限和风险。

### 04 / Resolume Arena：从三层入门，到六层生产结构

REACTOR 的 Opening Live Set 工程描述采用以下六层功能分组：

1. **L1 / BASE · BLACK · TEXTURE**：安全黑场与持续背景。
2. **L2 / HERO MACHINE**：机器主体、Reactor、ACQUIRE。
3. **L3 / STRUCTURE · ANALYSIS**：剖切、爆炸分解、线框和分析。
4. **L4 / SIGNAL · ENERGY**：信号轨迹、局部照明与脉冲。
5. **L5 / UI · LABEL**：有实际信息意义的文字与标记。
6. **L6 / EVENT · FLASH · SCAN**：短促人工重音、闪烁和扫描。

这不是「六个层从头到尾一起放」。初学者只需 **L1、L4、L6**：底层保持、脉冲重复、人工触发。能够可靠地打开和撤除这些层后，再增加其他内容。

在 Clip 的 **Transport** 中选 BPM Sync，并检查 Beats 参数。一个四小节循环对应 16 beats；不能只看全局 BPM 数字正确就认为已经对拍。若是一次性的人工事件，可把 **Trigger Style → Piano**，测试按下与松开是否得到不同状态。

REACTOR 工程文档将 100 BPM、4 bars 的基础循环计算为 **9.6 秒**。25 fps 时一段 240 帧的循环可以从第 1 帧走到第 240 帧，并让第 241 帧回到第一帧的状态以实现无缝衔接；实际导出要避免多一帧重复带来的顿挫。

### 05 / Beat Link Trigger：用它观察，不要把它误认为 Link

随附的视频从操作台拍到了 Beat Link Trigger 的 DJ 播放器视图，其中可以观察到波形、节拍和播放状态。对于 VJ，波形可能帮助预判音乐的空白和转换，但不能代替听觉判断。

- **Beat Link / PRO DJ LINK 生态**：可从兼容 DJ 设备获取播放与曲目元数据、Beat Grid 和波形等信息，具体取决于设备及网络条件。
- **Ableton Link**：为支持 Link 的软件共享 Tempo、Beat、Phase。
- **Arena BPM Sync**：让特定 Clip 使用 Arena 的 BPM 时钟来控制其播放速度。
- **人的判断**：从听觉、DJ 的操作与空间实际效果中决定下一次 BUILD、HIT 或 BREAK。

这四件事是不同的。录到波形窗口，不等于已经打通 Beat Link Trigger → Ableton Link → Arena 的自动控制路径。

### 06 / 90 秒可重复搭建 SOP

1. **建立 BASE**：放在 L1，测试连续播放 60 秒；保留随时可触发的 BLACK。
2. **设置 CLOCK**：Arena 设定 100 BPM；将循环 Clip 设置为 BPM Sync、16 beats，检查每四小节是否正确回环。
3. **设置 HIT**：放在 L6，Trigger Style 设为 Piano，分配一个键并测试按下、松开。
4. **OPEN → BUILD**：先只开底层，再缓慢引入 CLOCK，而不是全层一起亮。
5. **PEAK → BREAK**：用一两次 HIT 加重，随后主动撤掉 CLOCK，让空间重新露出来。
6. **改变 BPM**：测试 100→110；确认 CLOCK 跟速、BASE 不丢失、HIT 仍可人工插入。
7. **模拟故障**：拔掉测试网络或退出 Link，观察行为；验证 BLACK、BASE 和人工输入仍可可靠使用。
8. **连续录屏 90 秒**：标注哪些变化是自动的、哪些是人工的、哪些是意外；不要只记录一帧漂亮画面。

可用作练习的时段：00:00 OPEN、00:20 BUILD、00:40 HOLD、00:55 PEAK、01:05 BREAK、01:20 RETURN。这只是教学剧本，不能替代真正听 DJ 演出的现场判断。

### 07 / 工程化检查：国际 VJ 工作流值得借鉴什么

**以功能命名，不以「最终版」命名。** `L1_black_fallback`、`L4_signal_pulse`、`L6_flash_white` 比 `final_3.mp4` 更容易在黑暗演出现场找到。

**媒体编码是演出工程的一部分。** Resolume 官方建议用 Alley/DXV 制作适合 Arena 播放的文件，DXV Normal 是常用默认；Alpha 只有在源文件确实带有透明通道时才有效。网页上的 H.264 预览能播放，不等于大型输出工程不会掉帧。

**每个状态都要有出口。** PEAK 要能回到 BREAK，失控画面要能回到 BLACK。做减法和故障恢复同样属于现场表演控制。

**在真实链路上排练。** 实际分辨率、屏幕输出、网卡、接口、素材数量、存储负载和延迟，都要单独检查。只在笔记本预览窗口正常，不算现场链路通过。

### 08 / 常见失败及排查

- **BPM 对了但画面错位**：检查 Beats 数量、Beat Snap、循环边界及 Phase/Quantization；相同速度不等于同一个拍位。
- **按下事件后无法退出**：检查 Piano / Toggle / Normal Style、Clip Target、是否存在其他亮着的叠加层。
- **强度一路增长**：限制高亮事件的并发数，写出主动 REMOVE/BREAK 的手势，不依赖效果自行衰减。
- **DJ 改速后全部软件跟着乱**：检查谁拥有共享 Link 会话的 Tempo 修改权限。
- **Beat Link 有波形但 Arena 不动**：播放器信息可见不意味着 MIDI/OSC/Link 的控制链路已经配置完毕。
- **现场卡顿**：检查编码与输出分辨率、媒体磁盘、显卡负载、实时输入和实际同时运行的层数。

### 09 / 可选拓展：踏板与 Live Copilot

脚踏可以接管 Tap、瞬时 Trigger、保持和释放，使双手专注于 Arena。但完整的 REACTOR 四踏板实际逐键映射仍需要结合最终工程整理，因此不在主 SOP 中虚构一个固定接线表。

Live Copilot 属于后续研究：可用于 Cue 整理、排练日志、参数备份与错误恢复，而不直接替代人的音乐判断。先把三层时间做稳定，再继续增加智能辅助。

### 10 / 视频论文怎么剪

- **00:00–00:20 / 场所**：现场摄影和环境，交代人如何站在舞池与机器之间。
- **00:20–01:05 / 原理**：用三层时间图解说明 BASE、CLOCK 和 HUMAN。
- **01:05–02:10 / 工程**：Ableton 教学工程和 Arena 六层功能示意。
- **02:10–02:55 / 视角**：使用作者拍摄的实际操作视频，解释波形、节拍和人工判断。
- **02:55–03:40 / 演奏**：OPEN → BUILD → HOLD → PEAK → BREAK 的加法与减法。
- **03:40–04:00 / 收束**：撤掉 CLOCK 与 HIT，只留下 BASE，回到「谁决定何时停」的问题。

上面是可重复制作的剪辑结构，不表示四分钟完整成片已经存在。

---

### 官方参考与进一步阅读

- [Resolume Clips / Piano Trigger](https://resolume.com/support/en/clips)
- [Resolume Video / BPM Sync](https://resolume.com/support/en/video)
- [Resolume Ableton Link](https://resolume.com/support/en/link)
- [Resolume Alley / DXV](https://resolume.com/support/en/conversion-with-alley)
- [Ableton Link FAQ](https://help.ableton.com/hc/en-us/articles/209776125-Link-features-and-functions-FAQ)
- [Deep Symmetry — Beat Link](https://github.com/Deep-Symmetry/beat-link)
- [REACTOR GRAND OPENING DAY1 official event archive](https://ra.co/events/2534022)
- [Minimal Input Lab](../../workshops/minimal-input-lab/README.md)