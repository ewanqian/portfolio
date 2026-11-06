# Performable Music
## 可表演音乐 / Agent Music Performance

**Ewan Qian · Research in progress · 2026–**

音乐可以被写成固定作品，也可以被设计成一套能够进入现场、接受输入、发生变化并被再次演奏的结构。

**Performable Music** 研究这两种状态之间的工作方式：从创作意图、节拍与声部结构出发，让音乐在编曲软件、实时引擎、空间影像、灯光与交互设备之间保持可编辑的关系。

这个项目并不以“让 AI 自动作曲”作为终点。AI Agent 可以协助整理乐谱意图、生成与比较草稿、检查控制映射、记录排练和恢复版本；人的选择、听觉判断与演奏动作仍是作品的一部分。

### 研究的三个层次

**Score / 意图层** — 在 DAW 和实时播放之前描述段落、密度、进入、释放、角色与空间变化。Show Score 是这层的工作名称。

**Composition / 音乐层** — 在 Ableton Live 等环境中组织声音、片段、节奏与编曲，并保存能够重复修改的结构。

**Performance / 现场层** — 通过 MIDI、OSC、WebAudio、Max/MSP/Jitter、WebGL 与空间输入，把同一音乐结构带入现场视觉、屏幕、灯光或 XR。固定节目、可演奏片段与长时间生成状态可以同时存在。

### 当前问题

- 一段音乐在编曲完成后，还能留下多少可被演奏的部分？
- 一个简短动作怎样控制更复杂、仍然有音乐性的变化？
- 声音与视觉是否能够共享同一段落与时间结构，而不是互相追赶？
- 当 AI 能更快地产生方案，什么值得保留并进入最终作品？

### 与现有工作的关系

REACTOR / BPM System 提供节拍同步与人工触发的现场证据；Stage Casting 04 继续研究 Vision Pro / WebXR 空间输入和舞台控制；Minimal Input Lab 将其中可验证的动作转成练习。它们是相邻实践，不是同一件作品的不同名字。

**下一阶段：** 建立可复用的短篇音乐实验、共享时间线与录制/回放方法，并选出真正值得进入演出的部分。

---

### English

**Performable Music** is an ongoing inquiry into music that remains playable after composition. It connects authored score intentions, DAW-based composition and realtime performance systems without reducing musical agency to automation. Agent-assisted processes support exploration, mapping and documentation; timing, selection and expressive decisions remain part of the performer’s instrument.

*Research in progress, not a released music library or completed performance.*

### Writing / 公开研究专题

四篇可独立阅读的文章现归档于 [Performable Music / Writing](../../writings/performable-music/README.md)：

- [从声音物件到可编程音乐](../../writings/performable-music/01-from-tape-to-programmable-music.md)
- [七条声音谱系：从微声到空间表演](../../writings/performable-music/02-seven-audiovisual-lineages.md)
- [八件乐器，十六首作品](../../writings/performable-music/03-eight-instruments-sixteen-works.md)
- [一间由 Agent 协助的电子音乐工作室](../../writings/performable-music/04-human-agent-studio-reader.md)

这是研究与创作方法的公开文本，详细曲目规格、Agent 调度和可重建实验保存在 [performable-music](https://github.com/ewanqian/performable-music)；研究文章不意味着这些作品已经制作完成。

### Reading / systems
- [REACTOR — BPM System](../../docs/journal/reactor-bpm-system-2026.md)
- [Performance Control Model](../performance-control-model/README.md)
- [Minimal Input Lab](../../workshops/minimal-input-lab/README.md)

### Composition grammar and expectation research (2026-11-05)

- [音乐中的“期待”究竟是什么？](../../writings/performable-music/05-what-is-musical-expectation.md) — IDyOM、概率/信息量、五种作曲操作和 32 小节可证伪实验。
- [Agent 化作曲需要什么语法？](../../writings/performable-music/06-agent-composition-grammar.md) — 动机、乐段、操作、音色与现场控制的中间表示。
- [2026 年，Agent 化编曲到底能做什么？](../../writings/performable-music/07-2026-agent-music-systems.md) — Live MCP、Somax2、Magenta RealTime 2 等实际能力、成本和限制。
- [Composition Plan v1 / 开源执行协议](https://github.com/ewanqian/performable-music/tree/main/protocols/composition-plan-v1)；[32 小节 A/B MIDI 实验](https://github.com/ewanqian/performable-music/tree/main/studies/011-musical-expectation)。

这些文档说明可复用研究方法，不代表音乐质量或真实 Vision Pro 联调已经过关。

### MV 叙事、信息可视化与实时视觉 Runtime（2026-11-06）

- [音乐可以构成一座城市吗？](../../writings/performable-music/08-narrative-mv-and-live-runtime.md)：capsule / 百濑义行科幻动画三部曲、Gondry、Cunningham、Gantz Graf、Nosaj Thing 等的音乐影像叙事研究。
- [NINE / TRANSIT SIGNAL 视觉原型](https://ewanqian.github.io/performable-music/visual-runtime-lab/)：原生 WebGL 三维交通网络 + Canvas2D 信息图形、叙事事件、JSON 录制重放。
- [视觉 Runtime 工程任务书](https://github.com/ewanqian/performable-music/blob/main/visual-runtime-lab/AGENT_RUNTIME_BUILD_BRIEF.md)：从已有 Show Score/OSC 连接到音乐声部、几何节点资产和 WebXR 的分阶段实施计划。

当前原型只证明视觉与叙事状态的结构可运行，**不代表已经连接 DAW、Vision Pro、实时扫描或完成空间音频**。
