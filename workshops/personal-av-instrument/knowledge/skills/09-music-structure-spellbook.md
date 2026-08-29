# Skill 09 — Music Structure / Prompt Spellbook

给第一次用 AI 写网页音画乐器的人使用。目标不是学习完整音乐制作，而是掌握一组足够准确的词，让 AI 能理解你想要的时间结构、声音行为和音画关系。

---

## 1. 先选声音技术

### Web Audio API
浏览器原生音频系统。适合：
- 自己控制 oscillator / sample / gain / filter / delay / reverb；
- 精确调度 beat、sequencer、drum machine；
- 做自定义交互和声音图；
- 不想引入额外库。

对 AI 可以说：

```text
使用原生 Web Audio API。建立一个 AudioContext，并使用统一 scheduler / transport 管理所有声音事件。不要为每个声音建立独立 setInterval。
```

### Tone.js
建立在 Web Audio API 上的音乐框架。适合：
- 想快速得到 Transport、Loop、Sequence、Synth、Sampler、Effects；
- 需要 BPM、量化、音序器；
- 希望代码更接近音乐制作逻辑。

对 AI 可以说：

```text
使用 Tone.js 的 Transport 作为唯一时间源，用 Sequence / Loop 调度事件。声音和视觉都从同一个 Transport 时间与 State 读取信息。
```

### Strudel
浏览器中的 live coding / pattern 系统。适合：
- 想快速写复杂节奏、pattern、变奏；
- 想研究 live coding；
- 已经愿意使用文字编码音乐。

第一次工作坊不必强制使用。可以先让 AI 用 Web Audio API 或 Tone.js 完成结构，再把 pattern 思路迁移到 Strudel。

---

## 2. 最值得记住的音乐“咒语”

### 时间 / Transport
- `BPM`：每分钟拍数
- `Beat`：拍
- `Bar / Measure`：小节
- `Subdivision`：1/4、1/8、1/16 等细分
- `Transport`：统一播放时间轴
- `Quantize`：把人的输入放到最近或下一个节拍边界
- `Swing`：让偶数 subdivision 稍微延迟，产生律动
- `Look-ahead scheduler`：提前少量调度声音，减少 JavaScript 抖动

### 事件 / Pattern
- `Trigger / One-shot`：一次输入触发一次事件
- `Phrase`：有起点和结束的短音乐句子
- `Loop`：循环
- `Sequence / Sequencer`：按时间顺序播放事件
- `Step Sequencer`：用 8 / 16 / 32 格组织节奏
- `Drum Machine`：kick / snare / hi-hat 等节奏层
- `Arpeggiator`：按规则轮流播放和弦中的音
- `Pattern`：重复但可变化的事件结构
- `Probability`：某一步不是每次都发生
- `Euclidean Rhythm`：把若干击打平均分布在固定步数中

### 声音变化
- `Attack`：声音从无到有
- `Decay`：峰值后下降
- `Sustain`：按住时保持的电平
- `Release`：松开后的消失时间
- `ADSR Envelope`：Attack / Decay / Sustain / Release
- `Filter / Cutoff / Resonance`：频率过滤与共振
- `Delay / Feedback`：延迟与回授
- `Reverb`：空间尾音
- `LFO`：慢速周期控制参数
- `Gain staging`：让每一层音量合理，不全部顶满
- `Compressor / Limiter`：防止多层叠加后爆音

---

## 3. 一个按钮可以有 5 个音乐状态

不要只写 `mousedown = play sound`。

```text
TAP
→ 0.08–0.18 s 的 one-shot / transient

PRESS / ATTACK
→ 一段 0.5–1.0 s 的 opening phrase

HOLD
→ 进入持续层 / drone / rhythmic loop / arpeggiator

RELEASE
→ 一个与按下不同的 release phrase / reverse / tail

IDLE
→ 没有输入时系统仍可保留 ambience / residue / decay
```

### Prompt Seed

```text
把一个按钮做成 5 段时间结构，而不是单次触发。

1. Tap：如果按下后 180ms 内松开，播放一个约 0.12 秒的短促声音，并触发一个紧凑视觉事件。
2. Press：按下瞬间进入一个约 0.8–1 秒的 opening phrase。
3. Hold：按住超过 350ms 后进入持续状态；持续声音必须跟随全局 BPM，并可以循环但不能机械重复。
4. Release：松开时播放与 Press 不同的 release phrase，同时让视觉从高能状态进入衰减。
5. Idle：停止操作后保留少量 ambience / memory，随后缓慢回到安静状态。

所有状态共享同一个 BPM / Transport / State。声音和视觉不要使用两套独立 timer。
```

---

## 4. 让音乐一直变化，但不要随机到失控

可以把“持续变化”拆成几种可控变化：

### A. Pattern Variation
每 1 / 2 / 4 小节改变一次：
- 某一步是否出现；
- note order；
- octave；
- velocity；
- filter cutoff；
- visual density。

### B. Constrained Randomness
随机只在有限集合里发生：

```text
scale notes = [0, 3, 5, 7, 10]
pattern density = 20–70%
filter cutoff = 800–4200 Hz
variant = A / B / C / D
```

不要让 AI 每次生成完全随机音高、完全随机节奏。

### C. Scene / Energy State
用 4 个高层状态组织音乐：

```text
OPEN  → 稀疏 / 长尾 / 低频率
BUILD → 密度上升 / filter 打开
PEAK  → 短促 / 高频 / impact 增加
BREAK → 空间 / residue / 低密度
```

### D. Graph / Transition
不要每次随机跳到任意状态。

```text
OPEN → BUILD → PEAK → BREAK → OPEN
          ↘       ↗
             VOID
```

这样音乐会变化，但仍然像有结构。

### Prompt Seed

```text
让系统在没有新输入时也能持续产生变化，但变化必须受约束。
- 每 2 小节只允许修改 1–2 个参数；
- 音高限定在一个五声音阶或指定 scale；
- pattern 从 4 个预设 variant 中选择；
- OPEN / BUILD / PEAK / BREAK 之间使用有限状态图迁移；
- 不要每个 frame 随机改变声音；
- 用户输入优先级高于自动变化。
```

---

## 5. Sequencer / Drum Machine 可以怎么说

### 最小 Step Sequencer

```text
16 steps / 4 beats
kick: 1, 5, 9, 13
snare: 5, 13
hat: every 1/8 note
```

对 AI：

```text
加入一个 16-step sequencer。不要画复杂 DAW UI。
只需要一个共享 playhead，让 kick / percussion / visual pulse 都读取相同步号。
允许我用一个 Density 参数控制有多少 step 被激活。
```

### Drum Machine 的角色化
不要只说“加鼓”。可以说：

```text
KICK = 结构重音 / low impact
SNARE / CLAP = section marker
HI-HAT = 时间刻度 / high-frequency motion
PERCUSSION = variation / syncopation
NOISE = transition / release
```

这样视觉也容易对应角色，而不是单纯频谱分析。

---

## 6. Arpeggiator / Ostinato / Drone

### Arpeggiator
一个和弦拆成连续音符。

```text
hold → arpeggiator starts
x position → note order
hold time → octave range
release → arpeggio slows and dissolves
```

### Ostinato
持续重复的短型，可以作为稳定底层。

### Drone
持续音 / 长尾，适合 ambient / experimental electronic。

### Prompt Seed

```text
Hold 状态不要只是持续一个 oscillator。
建立一个 1/8 note arpeggiator + 低音 drone：
- arpeggiator 使用限定音阶；
- 每 2 小节改变一次 note order；
- drone 使用缓慢 filter LFO；
- release 时停止新的 note，但保留 delay / reverb tail；
- 视觉读取同一个 note index、energy 和 release state。
```

---

## 7. 音画同源：不要只做 Audio Reactive

不推荐：

```text
sound → analyser → visual
```

更推荐：

```text
INPUT
  ↓
STATE + CLOCK + PATTERN
 ↙                  ↘
AUDIO              VISUAL
```

例如：

```text
currentStep
energy
scene
noteIndex
holdDuration
releaseAmount
patternVariant
```

这些参数同时被声音和视觉读取。

### Prompt Seed

```text
不要把视觉仅仅做成 analyser / frequency-reactive。
建立一个 shared state object，至少包含：
BPM、beat、bar、step、energy、scene、holdDuration、releaseAmount、patternVariant。
Audio 和 Visual 分别读取这个对象并产生自己的结果。
```

---

## 8. 如果要“存下来”

先区分两件事：

### A. 保存“作品状态”
适合继续修改：
- BPM
- scale
- pattern
- mapping
- scene
- sample list
- visual parameters

保存为 JSON。

### B. 录下“这一次演奏”
适合分享：
- Web Audio 输出接到 `MediaStreamAudioDestinationNode`；
- Canvas 可使用 `captureStream()`；
- 用 `MediaRecorder` 录制音频或音画 WebM；
- 如果只需要保存音频，可单独录 Web Audio stream。

### Prompt Seed

```text
加入两个独立功能：
1. SAVE STATE：把 BPM、pattern、mapping、scene 与参数保存成 JSON；
2. RECORD PERFORMANCE：使用 MediaRecorder 录制这一次实时演奏。
不要把“保存参数”和“录音”混成同一个功能。
```

---

## 9. 声音不好听时，对 AI 说什么

不要只说“更好听”。可以具体说：

```text
统一 scale / key，不要让不同 voice 随机跑调。
减少同时发声的 voice 数量。
给 low / mid / high / fx 分角色。
降低 oscillator 的尖锐高频。
使用 filter envelope，而不是全程固定 cutoff。
高频事件缩短 release；ambient 层加长 release。
减少 reverb wet，增加 pre-delay / delay distinction。
加入 master compressor + limiter，并做 gain compensation。
不要每个事件都同样响，加入 velocity hierarchy。
```

---

# 10. 工作坊可直接复制的完整版 Prompt

```text
你好，我想做一个浏览器里的实时音画乐器。

技术：
- Visual 使用 Canvas 2D 或 WebGL；
- Audio 优先使用 Web Audio API；如果时间结构实现更稳定，也可以使用 Tone.js；
- 不使用复杂后端；
- 页面打开后由第一次用户操作启动 AudioContext。

核心输入只有一个按钮 / Space 键。
这个输入需要有不同的时间行为：

1. TAP
如果 180ms 内松开，播放一个约 0.12 秒的短促 transient，并触发一个紧凑的视觉事件。

2. PRESS
按下瞬间启动一个与 Tap 不同的 0.5–1 秒 opening phrase。

3. HOLD
按住超过 350ms 后进入持续状态。
持续状态使用共享 BPM / Transport，默认约 138–148 BPM。
它可以包含 arpeggiator、短 loop、drone 或 step sequencer，但不要机械重复。
每 1–2 小节允许在有限 variant 中产生一次小变化。

4. RELEASE
松开按钮时进入独立的 release phrase：停止产生新的主事件，但保留 delay / reverb / visual residue，并在 1–3 秒内衰减。

5. IDLE
没有输入时不要立刻归零。系统可以保留很轻的 ambience / memory，然后缓慢退回安静状态。

音乐方向：
实验电子 / ambient electronic / audiovisual performance。
整体可以较快、较强烈，但不要刺耳或完全随机。
使用一个统一 scale / key，并明确 low / mid / high / fx 的角色。

结构：
- 使用共享 clock；
- Audio 与 Visual 不要使用两套 timer；
- 可以有 OPEN / BUILD / PEAK / BREAK 四个 energy state；
- 自动变化必须受约束，用户操作优先；
- 至少有 Reset / Panic；
- 控制最大同时发声数量；
- Master 加 compressor / limiter，避免爆音。

音画关系：
建立 shared state：BPM、beat、bar、step、energy、scene、holdDuration、releaseAmount、patternVariant。
声音和视觉都读取这个 shared state。
不要只做 frequency analyser 驱动画面。

先完成一个可玩的最小版本，不要添加复杂 UI。
完成后告诉我：
1. INPUT / STATE / CLOCK / AUDIO / VISUAL 分别在哪里；
2. 哪些参数最值得我继续修改；
3. 如何测试 Tap / Hold / Release；
4. 如何降低复杂度而不是继续增加功能。
```

---

## 11. 一句话词库

当你不知道怎么描述时，可以从这里挑词给 AI：

`BPM` · `Transport` · `Beat` · `Bar` · `1/8 note` · `16-step sequencer` · `Quantize` · `Swing` · `One-shot` · `Phrase` · `Loop` · `Pattern` · `Probability` · `Drum Machine` · `Arpeggiator` · `Ostinato` · `Drone` · `ADSR` · `Attack` · `Sustain` · `Release` · `LFO` · `Filter Envelope` · `Delay Feedback` · `Reverb Tail` · `Voice Limit` · `Gain Staging` · `Compressor` · `Limiter` · `Shared Clock` · `Shared State` · `Scene` · `Variant` · `Energy` · `Transition Graph` · `Residue` · `Memory` · `MediaRecorder` · `Save State JSON`
