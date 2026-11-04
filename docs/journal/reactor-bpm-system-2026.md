**以 REACTOR Grand Opening 为现场案例 · 钱誉文 / Ewan Qian · 2026**

BPM System 是我的一套实时视觉演奏方法：让图像持续运行，让部分动作遵循节拍，同时把进入、叠加、停顿与释放保留给表演者。它的核心并非拥有多少特效，而是**能否像演奏音乐一样，随时改变各条视觉轨道的强度**。

# 01 / 三种时间

**持续时间（Continuous）**：最底层的影像不依赖鼓点，它建立空间、气氛与呼吸。即使手离开控制器，画面仍能成立。

**节拍时间（Clocked）**：独立的视觉层依据 BPM 和小节运行，产生重复的脉冲、遮罩、亮度变化或运动。速度可以同步，但软件并不会因此理解音乐的段落。

**瞬时时间（Human）**：一次按键、一次推子变化、一记短促闪光，或者在 Drop 之前突然撤去所有高亮层。这些由人的听觉与判断决定。

三种时间并行，而非顺序播放。**最重要的演出动作往往不是增加一层，而是撤去一层。**

# 02 / 最小系统：三条轨道与三支推子

在 Resolume Arena 新建一个 Composition，先只准备三条 Layer：

- **L1 · BASE**：持续背景或实时渲染，Opacity 通常保持较高。
- **L2 · CLOCK**：按节拍循环的结构或光影，Opacity 可以从 0 缓慢推入，再逐渐退回。
- **L3 · HIT**：短促重音、扫描或闪光，使用瞬时触发，必要时叠加透明度控制。

每层都保留独立的 **Layer Opacity**。三支推子就能完成一次 OPEN → BUILD → PEAK → BREAK：先只显示 BASE，再推入 CLOCK，人工触发 HIT，最后把 CLOCK 与 HIT 拉回 0。右侧的推子演示可以直接试这个过程。

真实制作时，还可扩展到机器主体、结构分析、信号、字幕等更多层；但新增轨道必须有明确作用，不必把六条 Layer 全部打开。无论使用视频、网页实时画面还是 TouchDesigner，控制逻辑都相同。

# 03 / 从鼠标到 MIDI：谁来推动透明度？

**入门只需要鼠标。** 直接在 Arena 的 Layer 面板拖动 Opacity，就能明白“多个独立画面如何在同一时间合成”。

接入 MIDI 控制器后，在 Arena 中进入 **Shortcuts → Edit MIDI**（Windows 默认 Ctrl+Shift+M），选择各层的 Opacity 控件，移动硬件推子完成学习映射。建议将控制器的前三个推子对应 L1 / L2 / L3。映射 Layer 时可以按位置绑定，便于在更换素材后保留控制习惯。

如果你已有 TouchDesigner、网页控制器或自己的实时系统，可以用 **OSC** 向 Arena 发送参数，例如把第一层透明度设为 25%：\`/composition/layers/1/video/opacity\`，值为 \`0.25\`。它与 MIDI 是两种不同的输入路径，均可作为人工控制层。

脚踏板适合承担 Tap Tempo 或短暂 Trigger，使双手继续操作推子；它是可选输入，**不是搭建这套系统的前提**。

# 04 / BPM：同步重复，不替人判断

节拍控制层可使用 Arena 的 **BPM Sync**，按 Beat、Bar 或更细的节奏驱动 Clip；瞬时层可以采用 **Piano Trigger**，按下进入、松开退出。要注意播放速度同步、触发量化与视觉透明度是三个独立参数。

在 REACTOR 的操作视频中，我拍到了 **Beat Link Trigger** 显示的播放器状态、波形、进度与 BPM。它为演出者提供另一种看见音乐时间的视角：观察接近的空白、可能的段落变化，再用耳朵和现场判断决定动作。它不是 Arena 的透明度控制器，也不等同于 Ableton Link。

Ableton Link 适合在支持 Link 的软件之间共享 Tempo、Beat 与 Phase；是否连接由实际演出链路决定。系统即使失去外部同步，也应能通过手动 Tempo、BASE 或安全黑场继续工作。

# 05 / 一次现场演奏：REACTOR Opening

REACTOR 的摄影保留了舞台机器结构、红色视觉、激光与观众之间的关系。现场视觉不能只考虑监视器中的一张图，还要考虑观看距离、暗场中人的适应、DJ 的节奏，以及屏幕与整个俱乐部空间的亮度比例。

一次有效的构成可以非常简单：**OPEN** 保持低密度背景；**BUILD** 慢慢推入节拍层；**PEAK** 只做少量人工重音；**BREAK** 拉低节拍与高亮层，让空间突然松开。实时演奏发生在这些选择之间，不发生在每一个鼓点都被转译成图像的瞬间。

# 06 / 工程原则

- **先确保每一层可撤除**：每个 Clip 都要知道如何停止与回到安全状态。
- **以用途命名**：BASE / CLOCK / HIT / BLACK，比素材版本号更适合暗场操作。
- **检查真正的同步**：Tempo 相同不等于相位相同；Beat Snap、循环长度与起点需要分别测试。
- **按实际输出排练**：编码、层数、GPU、屏幕比例和 Mapping 都属于演出系统，而不是最后的导出步骤。

更具体的 Arena 搭建、MIDI 映射、Ableton Live 练习与故障恢复步骤整理在文末附录，可在需要复现时展开阅读。

**相关文档**：[Resolume MIDI Shortcuts](https://resolume.com/support/en/midi-shortcuts) · [Resolume OSC](https://resolume.com/support/en/osc) · [Resolume Ableton Link](https://resolume.com/support/en/link) · [Beat Link Trigger](https://blt-guide.deepsymmetry.org/beat-link-trigger/8.0.0/Players.html) · [REACTOR 现场活动档案](https://ra.co/events/2534022)
