# Agent 化作曲需要什么语法？
## 从“给我一首高级电子音乐”到可检验、可回滚、可演奏的音乐工程

**钱誉文 / Ewan Qian · Performable Music / 技术研究 · 2026 年 11 月**

如果要求一个语言模型“编一首四分钟、冷峻、震撼、带空间音效的实验电子音乐”，它可以产出一份漂亮的说明，也可能产生一段能听的音频。但仅凭文字，我们很难回答：它用了哪个动机？哪次重复改变了意义？演奏者可以在哪里介入？为什么这个低频应该在第十七小节缺席？

缺少这些答案，“Agent 化作曲”就只是把普通编曲命令包装成自然语言对话。要让它成为能够长期积累、反复修改、多人协作并进入舞台的音乐系统，必须给创作意图一种**中间表示**：先描述音乐结构，再允许不同工具执行它。

以下提出的 **Composition Plan v1** 是 Performable Music 自行设计的研究协议，不是已被音乐行业采纳的通用标准，也不是声称机器能够理解全部人类情绪的形式语法。

## 01｜区分五种语义：不能把它们全部写成“Energy”

| 层级 | 它描述什么 | 举例 | 谁最终执行 |
| --- | --- | --- | --- |
| **Form** | 全曲章节、各自的时长与衔接 | 暴露一个规则 → 延迟回归 → 释放 | 人/编曲 Agent |
| **Motif** | 可以识别的音符、事件或节奏关系 | 两小节低音和金属打击问答 | MIDI/事件引擎 |
| **Operation** | 已有素材发生何种音乐变化 | OMIT、DISPLACE、RETURN_TRANSFORMED | 编曲/作曲 Agent |
| **Timbre / Space** | 声音身份、前后距离、效果器状态 | 干 Bass + 中景短反射 + 远景共振 | DAW/合成器/混音 |
| **Performance** | 现场输入改变什么决定 | 脚踏请求推迟的 Bass 返回 | Conductor/Show Score |

如果只定义 `energy: 0.8`，不同 Agent 可能把它解释成响度、音符数、滤波器亮度或更快的 BPM。这些操作在音乐中并不等价。**每一个高层参数需要明确受控对象、范围、保持条件和听觉意义**。

## 02｜一句音乐意图应该拥有可检验的结构

先写：

> 一个带滑音的低音每四小节返回。作品让听众习惯这个规律，随后撤除一次预期回归；系统继续保留金属声作为节奏线索，最终由脚踏决定何时让低音以新的寄存器重新出现。

它的关键语法不是形容词，而是：

```text
MUSICAL_INTENTION
  = CONTEXT
  + ESTABLISHED_PATTERN
  + EXPECTED_EVENT
  + TRANSFORMATION
  + INVARIANTS
  + PERFORMANCE_RIGHT
  + TEST
```

可以进一步写成类型化的事件说明：

```json
{
  "plan_id": "recoil-expectation-a",
  "tempo_bpm": 128,
  "meter": [4, 4],
  "total_bars": 32,
  "motif": {
    "id": "rubber-metal-01",
    "length_bars": 2,
    "roles": ["bass-question", "metal-answer"]
  },
  "expectation": {
    "established_by_bars": [1, 8],
    "predicted_event": "bass-return",
    "predicted_bar": 17,
    "operation": "OMIT",
    "omission_bars": [17, 24],
    "fulfilment": {
      "bar": 25,
      "type": "RETURN_TRANSFORMED",
      "change": ["register", "attack"]
    }
  },
  "invariants": ["tempo", "motif_identity", "headroom"],
  "performance": {
    "trigger": "FOOT",
    "action": "REQUEST_FULFILMENT",
    "quantization": "NEXT_BAR"
  }
}
```

这是意图层的说明，不是可以直接发送给 SuperCollider 的音频信号。它还需要被编译成带有具体时间、音高、力度、时长和乐器指令的 MIDI/事件表；同样需要独立的 Sound Design 和 FX 配置。

完整版类型约束与可验证示例放在 [Composition Plan v1 工程协议](https://github.com/ewanqian/performable-music/tree/main/protocols/composition-plan-v1)。

## 03｜真正的作曲操作是动词，不是风格标签

一个可以被检验的初级操作集合：

- **ESTABLISH**：重复一个足够一致的关系，让它能够被听者学到。
- **REPEAT**：复制事件，明确保持的内容。
- **VARY**：限定改变的维度；例如只改变最后一个音的时长。
- **DISPLACE**：移到另一个节奏位置，保留可辨识身份。
- **AUGMENT / DIMINISH**：以明确比例放大/缩小节奏时值。
- **OMIT**：删除被预期的事件，但保留可以识别空缺的线索。
- **DEFER**：计划延后某个事件，同时定义最长等待和安全出口。
- **REHARMONIZE**：保持旋律身份，改变和声背景。
- **ORCHESTRATE**：保持事件结构，重新分配音色/声部。
- **RETURN_TRANSFORMED**：使早期材料在新语境中返回。
- **RELEASE**：完成、拒绝或清除已建立的音乐期待。

不是所有音乐都应该使用这些操作；它们是一种供研究和代理执行的**有限词汇表**，能帮助比较“Agent 到底改变了什么”。

例如你让 Agent “让这段更紧张”，它不能只回复“增加 Density”。它需要给出两个可比较候选：

- 方案 A：保持鼓的位置，移走每四小节的低频重返。
- 方案 B：保持低频，连续延长金属声的回应间隔，并降低其它声部。

这两种音乐性的后果不同；应先试听再选择，而不是让另一位 Agent 随便投票决定。

## 04｜什么应该是机器可验证的？

有四种检查可以自动执行：

**结构合法性。** 时间码不超界；小节长度和节拍单位匹配；引用的 motif 和声部存在；每个 event ID 唯一；声部同时发声的最大数量没有超过限制。

**变更完整性。** Agent 声称操作 `OMIT bass-return`，它产生的 MIDI 在目标小节确实不再含有该事件；不能只是改了命名或调了音量。

**可恢复性。** 每一次修改都有输入版本、输出版本、操作表、随机种子、音源/插件版本和可重开的 DAW 工程；能够退回到上一个被人选择的版本。

**信号安全性。** 音量与反馈参数有上下限，音轨没有不可预期地饱和；控制失联后进入中性/安全状态，最重要的人工急停不能只依靠同一条可能断开的网络链路。

而以下判断不能由自动测试代替：作品是否动人、何时的留白最有力量、声音是否显得廉价、动机是否真正值得听第二遍。

## 05｜Agent 应当如何组织？

```text
Research / Listening Evidence
             |
      HUMAN COMPOSER BRIEF
             |
    Composition Planner (LLM)
             |
    typed plan + invariants
             |
        FORM VALIDATOR
             |
        +----+----+
        |         |
  Symbolic Agent  Timbre Agent
 (MIDI/events)   (Synth/FX states)
        |         |
        +----+----+
             |
       DAW EXECUTOR
       (save / export)
             |
       rendered A/B WAV
             |
      AUDIO TECHNICAL QA
             |
      HUMAN BLIND LISTEN
             |
      Approve / Revise
             |
      PERFORMANCE MAPPING
             |
      Show Score + OSC + Replay
```

角色之间不是通过聊天记忆交接，而是通过版本化文件交接。例如 Composer 产出的 `plan.json` 应独立于 Surge XT、Ableton 或 Waveform；DAW Executor 只能在合法、可保存的项目副本上执行；Critic 应收到不知道哪个版本由哪个 Agent 产生的音频。

一个很有用的限制：**制作中的语言模型没有权限在实时音频线程持续改反馈、输出音量或设备安全参数。** 现场 DSP 依赖经过测试的程序、明确边界的控制量和可恢复状态；Agent 主要在制作与排练时协助生成、编辑和比较。

## 06｜在现实软件中哪一层可以实现？

**符号层：** MIDI、music21、Python 事件脚本、Strudel/TidalCycles 类型的 Pattern 语言以及 SuperCollider 的 Pattern 系统，都适合明确表达一定范围内的音高、节拍、重复与变化。但它们并不负责保证优秀的音乐发展。

**制作层：** Ableton Live 的第三方 MCP 服务器可以增删轨道、编写 MIDI、修改设备参数、安排片段并读取工程状态。它是可自动执行的编辑接口，不是一位掌握全部制作判断的作曲家。独立工程曾公开宣称具有 156 个专用工具，实际可用数量依安装版本而异。

**现场层：** Max、plugdata、SuperCollider 和专门的控制程序适合执行实时 DSP、OSC、状态和音频事件；音乐专用的实时共同即兴系统如 Somax2 可作为独立研究对象。

**生成音频层：** 直接文字生成完整音频可以形成丰富的草稿或声音材料，但生成的 stereo WAV 不等于具有可编辑的钢琴、鼓和效果器工程。声部和结构上的精确约束仍是研究困难点。

因此，“能生成四分钟歌曲”和“能以乐谱级精度修改第四十二小节的一个声音”不能归为同一种能力。

## 07｜从一个音乐操作到音画同源

作品进入现场后，两个系统都需要知道同一次事件发生了，而不仅是它们恰好在同一个 BPM 上运行：

```text
FOOT / OVERRIDE
   └── event_id: e-024
       ├── Music: fulfil deferred bass event
       ├── Instrument: resonance / pressure moves to next bounded state
       ├── Visual: spatial lattice re-aligns
       └── Recorder: event timestamp + control state
```

这也是为什么现场语义协议要与离线作曲协议分开：离线计划可以拥有复杂的乐段结构与编辑约束，实时 Show Score 必须足够小、可验证、延迟可控，并能可靠回退。

## 08｜最小研究实验

在 128 BPM / 32 小节的原创材料上，以同一素材做两版音乐：

- **A 版**只允许修改节奏与事件的期待关系。
- **B 版**只允许修改和声/音色的回归方式。
- 两版都导出音量相近的 WAV，以及可检查的 MIDI/事件与 FX 参数。
- 用真正的听觉比较记录两个时间码：哪里开始等待？哪里觉得兑现或失败？
- 只有音乐版成立后才映射到 Vision Pro/脚踏控制。

如果某个模型能同时提供可编辑结构、合法的 DAW 工程和一个优秀的 A/B 音频，再逐步扩大其权限。若不能，不必让模型假装万能，而是把它留在适合的层。

---

### 参考

- [Ableton Live MCP — 工具与限制](https://github.com/wstierhout/ableton-live-mcp)
- [Ableton Extensions SDK 官方限制](https://help.ableton.com/hc/en-us/articles/27303428331420-Ableton-Extensions-FAQ)
- [Magenta Studio — MIDI Continue / Groove / Drumify / Interpolate](https://magenta.withgoogle.com/studio/)
- [Somax2 — 实时共同即兴软件](https://github.com/DYCI2/Somax2)
- [2026 年音乐生成研究综述（音乐性、可控性、结构与评价）](https://link.springer.com/article/10.1007/s10462-026-11582-x)

**工程状态：** Composition Plan v1 是提议中的自定义协议，不是“已能用自然语言自动完成专业歌曲”的产品描述。真正的硬件、DAW 和听觉验收必须另行测试。