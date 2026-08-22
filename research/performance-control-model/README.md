# 音画同源控制模型
## Performance Control Model — v0.1

> **类型：** 工作教材 / Working Text  
> **建议阅读：** 1 分钟 / 10–15 分钟 / 深入阅读  
> **用途：** Live A/V System、数字乐器、工作坊、DJ / Concert 结构研究、AI Agent 协作  
> **状态：** 可用于内部教学与研发引用；不是一套宣称已经完成的独立学术理论。

这篇文章只有一个目的：把“一个网页按键为什么很容易像玩具，而一套真正的现场系统为什么能让人持续演奏”讲清楚。

我们借用控制论的几个基础概念，但不要求先懂公式。公式只在它真的能压缩一个问题时出现，并且每一个公式都必须先被翻译成人能直接理解的动作和结果。

---

# 一分钟版本

一场现场演出可以先看成一个不断循环的系统：

```text
现在系统是什么状态
+
人刚刚做了什么
+
现场发生了什么
↓
系统进入下一个状态
↓
音乐 / 视觉 / 灯光产生结果
↓
人听见、看见、感受到结果
↓
再做下一次判断
```

如果一定要用一个控制论式公式表示，它可以写成：

```text
x(t+1) = F(x(t), u(t), d(t))
```

但在这里直接把它读成：

> **下一刻的系统 = 现在的系统 + 人的操作 + 外部条件经过规则处理后的结果。**

其中：

- `x`：当前状态，例如能量、段落、正在运行的声音层、视觉层、历史；
- `u`：人的操作，例如 ENTER、HOLD、ADD、REMOVE、RELEASE；
- `d`：扰动，例如早按、晚按、延迟、素材差异、现场变化；
- `F`：系统规则。

真正重要的不是公式，而是一个变化：

> **以后不要只问“这个按钮触发什么”，先问“系统现在在哪里，我这个动作准备把它带到哪里”。**

---

# 十分钟版本

## 1. 为什么 Trigger 很快就会无聊

最简单的网页乐器通常是：

```text
A → 一个声音 + 一个圆
B → 一个声音 + 一条线
C → 一个声音 + 一组粒子
```

它当然是一种 Mapping，但它的问题是：结果几乎只由输入决定。

```text
Result = Input
```

所以你第一次按 A 和一分钟以后再按 A，本质上没有区别。

一个更深的现场系统应该是：

```text
Result = Input + State + History
```

同一个输入，在不同状态里有不同意义。

```text
A 在 OPEN
→ 稀疏进入一个 pulse

A 在 BUILD
→ 增加 subdivision

A 在 PEAK
→ 形成一次强 accent

A 在 BREAK
→ 留下一条长 tail
```

按钮没有变多，系统反而变深了。

这也是为什么本项目现在不再把“26 个键是否都有效果”当作主要完成标准。

---

## 2. State：系统现在在哪里

第一版 Live System 并不需要几十个复杂参数。

可以先只保存：

```text
SECTION
ENERGY
TENSION
DENSITY
SPACE
MEMORY
ACTIVE AUDIO LAYERS
ACTIVE VISUAL LAYERS
TIME / BAR / PHRASE
```

例如：

```text
SECTION = BUILD
ENERGY = 0.62
TENSION = 0.81
DENSITY = 0.48
SPACE = 0.55
```

此时用户按 `HOLD`。

`HOLD` 不再等于“把一个音拉长”。

它可以代表：

> **暂时不要进入下一次释放。**

于是三种媒介分别解释这个决定：

```text
MUSIC
保持 tension，不把完整 kick / bass 放出来

VISUAL
减少新主体，但让已有结构继续积累

LIGHT
维持狭窄、暗、未完全打开的空间
```

这就是 Shared State：声音、视觉、灯光不需要做同一个动作，但它们知道“现在仍然不能释放”。

---

## 3. Feedback：现场为什么必须是一个回路

固定视频更像：

```text
时间轴
↓
播放
↓
结束
```

这是 Open Loop。

Live Performance 更接近：

```text
人做判断
↓
系统产生结果
↓
人听 / 看结果
↓
重新判断
↓
再次介入
```

这是 Closed Loop。

但完全开放的 Closed Loop 很容易失控。

所以我们目前最需要的是第三种：

## Hybrid Control / Controlled Improvisation

```text
预先设计并试听过的可靠材料
+
系统自动维持节拍、调性、音量和密度安全
+
人在少数关键位置做结构决策
```

这比“所有东西都提前写死”更有现场性，也比“现场全部随机生成”更可靠。

---

## 4. Stability：为什么自由度不能无限加

一个系统连续按：

```text
ADD
ADD
ADD
ADD
ADD
```

如果声音越来越响、视觉越来越满、灯光越来越亮，最后没有办法回来，它就是不稳定的。

所以系统必须主动拥有边界：

```text
MAX AUDIO VOICES
MAX VISUAL DENSITY
MAX LIGHT INTENSITY
LIMITER
AUTO DECAY
PRIORITY
RESET / PANIC
```

这不是削弱创作，而是在把最容易出错的部分交给系统处理。

**稳定不是“永远不变化”，而是无论怎么变化，都还有办法回来。**

---

## 5. Controllability：不仅要会增加，还要会退出

很多 generative demo 只有一种方向：越来越多。

真正可演奏的系统必须能：

```text
ENTER / EXIT
ADD / REMOVE
BUILD / RELEASE
ACCUMULATE / CLEAR
RECALL / FORGET
```

一个简单检查方法：

> 现在已经很满了，我能不能在 8 或 16 bars 内主动让它回到很空的状态？

如果做不到，再多效果也不等于可控。

---

## 6. Observability：演奏者必须知道系统正在做什么

舞台画面可以没有 UI，但演奏者不能失明。

他至少需要知道：

```text
当前 Section
当前 Energy / Density
哪些 Layer 正在运行
有没有 Pending Transition
下一次 musical boundary 在哪里
Reset 是否可用
```

因此要明确区分：

```text
PERFORMER UI
≠
AUDIENCE VISUAL
```

观众看到的是作品。

演奏者看到的是控制信息。

---

## 7. Robustness：用户不应该必须按得完美

如果一个系统只有作者本人、在某一台电脑、精准按在某一拍才能成立，它很难进入公众工作坊或真实舞台。

所以系统必须容忍：

- 早一点按；
- 晚一点按；
- 少按几次；
- 换一个操作者；
- 输入材料改变；
- 一部分效果失败。

其中一个最有效的办法就是 Quantization。

用户在第 15.72 bar 请求：

```text
PEAK
```

系统先记录：

```text
pending = PEAK
```

到第 16 bar 再真正进入。

人负责：

> **我要 Peak。**

机器负责：

> **什么时候落下去最不容易出错。**

---

## 8. 不同媒介需要不同的时间速度

音乐、视觉、灯光不能因为共享一个 State，就被迫每拍做一样的变化。

### Music：更快

音乐可以在 1/16、beat、bar、phrase 上组织变化。

它最擅长：

- rhythm；
- anticipation；
- withholding；
- build；
- drop；
- release。

### Visual：可以更慢

视觉中的一个结构能够持续存在几十秒，甚至跨越多个 Section。

它最擅长：

- persistence；
- accumulation；
- transformation；
- occlusion；
- memory；
- return。

### Light：直接控制现实空间

灯光既可以跟 beat，也可以花 8 bars 慢慢改变整个房间。

它最擅长：

- reveal；
- hide；
- isolate；
- narrow；
- expand；
- blackout；
- open the room。

所以同一个 `PEAK` 可以同时发生：

```text
Music：增加身体能量
Visual：反而删掉 70% 的细节，只留下一个主结构
Light：突然打开整个真实空间
```

它们没有做同一件事，但都在解释同一个状态。

---

## 9. Hierarchical Control：一个网页怎样一路长到大型演出

复杂演出不能由一个按钮层管理全部尺度。

可以分成：

```text
SHOW
↓
SET
↓
TRACK / PIECE
↓
SECTION
↓
PHRASE
↓
CELL / CAPSULE
↓
EVENT
```

EVENT 可能只有一个 kick 或一次 flash。

CELL 是一个自己能成立 1–8 秒的小行为。

PHRASE 是几个 Cell 的时间关系。

SECTION 是 BUILD / PEAK / BREAK 这一类更长的状态。

TRACK 是一首完整演出单元。

SET 是多首 Track 与转场。

SHOW 才是音乐、视觉、灯光、舞台、表演者和观众的整体。

这解释了一个重要问题：

> **小型网页乐器与大型现场并不是完全不同的世界。差别首先是控制层级、内容完成度和制作尺度。**

---

## 10. 向 DJ 学的不是音色，是长期状态控制

DJ 的专业性并不主要来自“现场重新生成一个 kick”。

大量判断发生在：

```text
什么时候进入
什么时候等
什么时候只加一层
什么时候删掉 kick
什么时候延长 bridge
什么时候做 false drop
什么时候真正 release
什么时候把旧材料重新带回来
```

因此研究 DJ Set 的第一步不是复制曲目，而是做 Structural Transcription：

```text
LISTEN
↓
标记 phrase / layer / bridge / release
↓
只留下结构
↓
换掉全部原音乐重新做一次
↓
看结构是否仍然成立
```

如果换掉原音乐以后立刻垮掉，说明我们喜欢的是原曲，而不是成功提取了结构。

---

# 深入阅读

## 11. “同源”可以是 Shared State，而不是 Shared Signal

最初的音画同源可以写成：

```text
INPUT
↙   ↘
SOUND VISUAL
```

它仍然有价值，但现在可以增加一层：

```text
              STATE / INTENTION
                     ↓
               CONTROL MODEL
                     ↓
       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
     MUSIC         VISUAL        LIGHT
       ↓             ↓             ↓
 Arrangement     Image Logic    Space Logic
```

真正共享的可能不是 FFT、音量或 Mouse X，而是：

```text
现在要不要释放？
现在要不要继续等待？
现在应该更空还是更满？
旧材料应该回来多少？
下一次结构变化什么时候发生？
```

这也是为什么“不同步”仍然可能是同源的。

---

## 12. 人和机器怎样分工

机器适合负责低价值但高风险的复杂度：

```text
BPM
CLOCK
QUANTIZATION
PITCH COMPATIBILITY
MAX VOICES
GAIN SAFETY
DENSITY BUDGET
TRANSITION SCHEDULING
RESET
```

人适合负责高价值判断：

```text
现在进入吗？
还要继续忍吗？
应该加还是减？
要让什么留下？
旧东西现在该回来吗？
现在应该释放了吗？
```

一句话：

> **机器负责降低出错概率，人负责决定为什么现在这样做。**

---

## 13. AI 最适合做什么

AI 在这里最适合成为四种角色。

### Analyst

- 提议 beat / bar / section；
- 帮助转录 DJ Set；
- 估计 energy / density curve；
- 比较不同结构版本。

### Arranger

给定结构不变，产生多个实现候选。

例如：

> 保持这个 16-bar BUILD 的 tension 和 release boundary，不改变大结构，给 10 种 drum / bass / visual arrangement。

### Implementer

- 写代码；
- 连接参数；
- Debug；
- 制作 variation；
- 批量整理素材。

### Critic

根据明确规则找：

- dead air；
- premature release；
- flat energy；
- density overload；
- repetitive mapping；
- visual exhaustion；
- stuck audio / missing reset。

AI 当前不应该被默认信任去完成：

- 判断一段音乐最终是否“真的好”；
- 未经试听直接生成现场最终 Set；
- 仅靠 prompt 决定长期 energy arc；
- 代替 rehearsal；
- 代替 audience test；
- 把复杂算法自动解释成艺术质量。

因此当前原则是：

> **AI 增加候选，人类减少候选。**

> **Generative Arrangement 优先于未经筛选的 Generative Material。**

---

## 14. System Identification：怎么从优秀作品里学习

控制论里有一个很实用的思想：如果不知道一个系统内部完整机制，可以通过观察输入与输出逐渐建立模型。

我们可以用类似方法研究 DJ、Concert 和音乐游戏。

### Pass 1 — Listen

只听，不做视觉。

记录：

- major transition；
- layer add / remove；
- bridge；
- hold；
- false drop；
- release；
- return。

### Pass 2 — Transcribe

暂时抽象成：

```text
ENERGY
TENSION
DENSITY
SPACE
MEMORY
TRANSITION
```

### Pass 3 — Transfer

换掉原音乐，用完全不同的声音材料执行相同结构。

### Pass 4 — Add Visual / Light

不要复制鼓点，分别写视觉和灯光解释。

### Pass 5 — Mutation

依次改变 20%、40%、70%。

如果最后仍然有效，就开始形成自己的 repertoire，而不是一直依赖 reference。

---

## 15. 先有 Performance，再反推 Instrument

数字乐器研究里一个对本项目特别有用的方法，是先用已经成立的声音和影像进行“假演奏”，观察什么动作看起来真的能够解释结果，再去实现 Mapping。

这会改变开发顺序：

```text
旧顺序
先造 Instrument
↓
希望最后可以演好
```

变成：

```text
新顺序
先做一段真的成立的 Performance
↓
Mime / 假装已经能控制
↓
找出真正有意义的动作
↓
实现 Instrument
```

因此 8 月 29 日前的 Golden Demo 不应该从“再加多少键”开始，而应该从 60–90 秒的 raw Screen + Sound performance 开始。

---

## 16. 怎么验证一个 Live System 不容易出丑

不要只检查“功能是否完成”。

每一版至少问六个问题。

### Stable / 稳定

连续操作以后会不会越来越乱？

### Controllable / 可控

能不能主动增加，也能主动减少、退出和恢复？

### Observable / 可观测

演奏者知道现在是什么状态、哪些层正在运行、下次转场什么时候生效吗？

### Robust / 鲁棒

早按、晚按、换个人、换一组素材还能玩吗？

### Expressive / 有表达空间

少量操作是否真的允许做出不同判断，而不是所有人最后都一样？

### Deep / 有深度

连续演 5–10 分钟以后是否还有新的关系可以发现？

然后再做四组测试：

```text
SOUND ONLY
音乐本身是否成立？

VISUAL ONLY
静音后视觉是否仍有时间结构？

SCREEN + SOUND
不给解释是否像 Performance？

NOVICE / AUDIENCE
两分钟说明后能不能演；观众能不能感到人的判断有后果？
```

任何没实际执行的测试都应该写：

```text
NOT TESTED
```

---

## 17. 8.29 工作坊怎样使用这套模型

三小时不需要讲完本文。

只让参与者亲手体验三个差异：

### A. Trigger vs State

同一个输入，为什么加入 State 以后不再只是一次性效果。

### B. Open Loop vs Controlled Loop

为什么系统可以自己持续，但人的 HOLD / ADD / REMOVE / RELEASE 仍然真正改变演出。

### C. Random vs Stable

为什么 max voices、density budget、quantization、decay 和 panic 并不是“工程细节”，而是演奏自由的前提。

课堂只保留一张总图：

```text
INTENTION
↓
HUMAN + SYSTEM CONTROL
↓
STATE
↓
MUSIC / VISUAL
↓
FEEDBACK
↓
NEXT DECISION
```

参与者不需要背控制论名词。

只需要在做自己的 V2 时能够回答：

> **现在是什么状态？我这个动作到底改变了什么？系统怎么防止我把它弹坏？**

---

# 当前研究边界

下面这些结论目前可以作为项目内部稳定原则：

1. Live A/V 不应只被看成 Trigger Mapping，而可以看成动态状态与反馈系统。
2. 同一个输入可以因 State 不同而得到不同结果。
3. 当前优先 Hybrid Control：可靠预制材料 + 人的高层判断。
4. Machine 处理 timing / quantization / safety；Human 处理 enter / wait / hold / add / remove / release / recall。
5. Music / Visual / Light 可以共享 State，但不要求 1:1 同步。
6. Performance first, instrument second。
7. 当前优先 Generative Arrangement，而不是把最终质量交给未经筛选的实时随机生成。
8. 正式 QA 必须包括 performer 与 audience，而不只是 console / FPS。

下面这些仍然是研究假设：

- `Energy / Tension / Density / Space / Memory` 是否是最终最好的状态变量；
- `OPEN / BUILD / PEAK / BREAK` 是否适合所有音乐类型；
- 同一个高层 Score 能否跨 DJ / Pop Concert / Club / Music Game 通用；
- AI 是否能够稳定评价长期结构；
- 灯光层是否应该进入公众 Starter Kit；
- 一套系统能够维持多长时间的表达深度。

这些必须继续通过作品和演出来验证，不能提前包装成已经成熟的理论。

---

# 阅读路径

## 先读

- Norbert Wiener / Cybernetics — feedback 与控制思想的历史背景
- 钱学森 / *Engineering Cybernetics* — 工程控制论的系统化方法
- David Wessel & Matthew Wright — *Problems and Prospects for Intimate Musical Control of Computers*，NIME 2001
- Andy Hunt, Marcelo Wanderley, Matthew Paradis — *The Importance of Parameter Mapping in Electronic Instrument Design*，NIME 2002
- Joel Chadabe — *The Limitations of Mapping as a Structural Descriptive in Electronic Instruments*，NIME 2002

## 再读

- Alon Ilsar, David Hughes, Andrew Johnston — *NIME or Mime: A Sound-First Approach to Developing an Audio-Visual Gestural Instrument*，NIME 2020
- Sam Trolland, Alon Ilsar, Jon McCormack — *Visually-Led Design for Gestural Audiovisual Instruments*，NIME 2025
- Fabio Morreale, Andrew McPherson — *Design for Longevity: Ongoing Use of Instruments from NIME 2010–14*，NIME 2017

完整链接与阅读备注维护在 [REFERENCES.md](./REFERENCES.md)。

---

# 最后一个问题

以后打开任何一个 Demo，不先问：

> 它有多少效果？

先问：

> **系统现在处于什么状态？这个人的动作会把它带到哪里？如果他什么都不做，系统会怎样继续？如果他做错了，系统还能不能回来？**

如果这四个问题开始变得清楚，网页才开始从一个效果集合，变成一件真正值得练习的现场系统。
