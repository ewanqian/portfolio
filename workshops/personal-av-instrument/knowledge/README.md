# 极简输入 / 音画同源知识库

这是一套给工作坊参与者、Creative Coder 与 AI Agent 使用的参考库。

它不要求先掌握某个软件。每一条知识都尽量被整理成：

**概念 → 为什么有用 → 最小实现 → 可复制提示词 → 验收方法**

## 快速模型

```text
INPUT / GESTURE
      ↓
MAPPING / RULE
      ↓
STATE / CLOCK / MEMORY
   ↙              ↘
SOUND            VISUAL
      ↓
FEEDBACK / NEXT DECISION
```

## 推荐阅读顺序

1. `skills/01-beat-clock.md` — 节拍器不是装饰，而是统一时间坐标
2. `skills/02-graph-routing.md` — 用 Graph / Node / Route 组织演出，而不是堆按钮
3. `skills/03-shared-state-av.md` — 声音与视觉共享状态，不做简单 audio-reactive
4. `skills/04-variant-design.md` — 变体要改变行为，不只是换颜色
5. `skills/05-density-safety.md` — 自由度必须配合密度、声音数量与 Reset 保护
6. `skills/06-release-memory.md` — Release、Residue、Memory 决定系统有没有连续性
7. `skills/07-audio-voice-design.md` — 一个网页乐器如何避免“默认 synth 味”
8. `skills/08-blind-playtest.md` — 用陌生人试玩检验系统，而不是作者自己解释
9. `skills/09-music-structure-spellbook.md` — BPM、音序器、鼓机、琶音器、ADSR、录音与一键音画乐器提示词
10. `skills/10-state-instrument.md` — 把 Tap / Hold / Release、音乐 Scene 与 Visual State 组合成可演奏系统
11. `skills/11-video-reference-analysis.md` — 用 ffmpeg / ffprobe / Python 将参考视频拆成帧、音频与时间结构

## 从现有 Demo 学什么

### D0 — Direct Trigger
最小的一对一关系。适合快速理解 Mapping，也最容易在 20 秒后耗尽。

### D1 — Quantized Capsules
人的输入可以先表达“意图”，系统再把它放进 beat / bar 等稳定时间结构。

### D2 — Four-Layer Sequencer
输入不一定触发一次性事件，也可以进入一个持续运行的 Layer。

### D3 — Shared-State A/V
声音和视觉读取同一个高层 State，再分别解释。

### D4 — Spatial Adapter
当输入设备从键盘变成空间动作时，真正可复用的是 Mapping / State / Feedback，而不是控件外形。

### D5 — Control Field / Topological Playground
从 effect selection 进一步进入：连续控制、节点、路径、状态迁移与演出结构。

### vL5 / vL6 — Glyph Matrix
用六个角色组织系统：

```text
FIELD → PULSE → ROUTE → ORBIT → PARTITION → RELEASE
```

它们不是六个“效果”，而是六种演出功能。每个功能可以拥有多个 Variant，Variant 再影响声音、视觉、节奏与空间。

### State Instrument Exercise
把前面的 Toy 合并成一个更完整的练习：

```text
INPUT STATE   IDLE / TAP / HOLD / RELEASE
MUSIC STATE   OPEN / BUILD / PEAK / BREAK
VISUAL STATE  GRID / ORBIT / GLYPH / FIELD
SHARED        BPM / BEAT / BAR / ENERGY
```

键盘负责调 BPM、切换 Music State 与 Visual State，同时保留一个主输入。

## 给 Agent 的基本规则

当你把本知识库交给 ChatGPT、Codex、Claude Code、Kimi、豆包或其他 Agent 时，可以先附上：

```text
先读取本知识库，再读取当前项目。
不要先重写框架。
每次只修改一个明确关系。
优先保持：可运行、可理解、可恢复。
任何新增功能都需要说明它改变了 Input / Mapping / State / Feedback 中哪一层。
修改后给出：FILES CHANGED / HOW TO TEST / KNOWN LIMITATIONS。
```

## 当前公开试玩

- Workshop Deck: `/0829.html`
- Demo Index: `/workshop-demos/`
- Toybox: `/workshop-toys/`
- State Instrument Exercise: `/workshop-state-instrument/`
- Knowledge Reader: `/workshop-knowledge/`
- vL6 Glyph Matrix Live: `/workshop-demos/vl6-glyph-matrix-live.html`

## 一条判断

> 一个好 Demo 不只回答“按下去发生什么”，还应该让人逐渐发现：什么时候按、为什么按、什么时候停，以及系统在没有新输入时如何继续。