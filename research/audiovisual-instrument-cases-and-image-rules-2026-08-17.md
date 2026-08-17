# 音画同源｜五个试玩、源头与图片使用规则

更新：2026-08-17

本轮不再把“一键 Live Set”理解成一个自动播放的 60–90 秒作品。课程真正的递进是：

**一个成立的最小单元 → 改变输入与 Mapping → 复制/变体 → 组织成多个状态 → 形成可演奏的乐器 / Live Set。**

开场“一按钮”只负责把这个思想压缩到最小；结尾的“五状态乐器”才负责展示多个有效单元如何组成一个可以演出的系统。

---

## 0. 与 2026-08-29 三小时课的关系

当前现场执行稿已经明确：

- 进场先玩现成的一个按钮版、鼠标版；
- 一个按钮是理解输入、时间和状态的小 Demo，不要求参与者从零复刻；
- Starter Case 阶段才由参与者自己选择 **一个输入 + 一条规则**，得到 **一个声音反应 + 一个画面反应 + 一个状态**；
- V1 被别人试玩后，只修一个最明显的问题，保存成 V2。

所以五个试玩不是“五个作业”，而是一套从最小限制到可演奏系统的参照物。

---

# 1. 五个试玩

## 01｜ONE BUTTON STUDY

文件：`works/audiovisual-one-button-study.html`

**课堂位置：开场。**

唯一的主要表演输入就是一个按钮。它不是“一按就自动播完整 set”，而是让同一个按钮因为**时间**而出现多种行为：

- 短按：进入下一个视觉 / 声音状态；
- 连续快速按：按键间隔变成 energy，画面与声音更强；
- 长按：进入持续控制，释放时发生另一种变化；
- 每次按下都让整个框架产生可见变化；
- 可额外打开 120 BPM 伴奏时钟，但 BPM 不是主要表演输入。

### 源头

这套“一按钮塞进多个时间关系”的具体教学例子，直接来自 2026-08-17 课程讨论：一次/二次/三次、循环计数、按键速度、长短按都可以成为状态判断。核心并不是炫技，而是**简化控制、打包控制，让表演者只需要专心向一个动作注入能量**。

Zach Lieberman 的 daily sketch 实践可以作为更大的方法论背景，但不要把“先做一个有效内容再复制”写成未经核对的逐字引语。他本人公开写过更稳妥的表述：从简单想法开始，通过 iteration / remix 把旧东西推成新东西；ECAL 的 Circle Studies 也让所有学生从同一个 circle 出发持续变体。

- Zach Lieberman, Daily Sketches / iteration: https://zachlieberman.medium.com/
- ECAL, Circle Studies: https://ecal.ch/en/feed/projects/4961/circle-studies/

---

## 02｜TRIGGER CELLS

文件：`works/audiovisual-trigger-cells.html`

**问题：一个“有效单元”到底是什么？**

屏幕被理解为五个不可见的触发区域。每个区域都不是“只有一个视觉效果”，而是一对已经成立的行为：

`触发 → 声音事件 + 视觉事件`

打开 BPM 后，触发会进入更明显的节拍关系，参与者可以感受到“自由触发”和“被时钟组织”之间的区别。

### 源头

**touch:waves** 是最直接的参照：ICC 的作品说明明确写到，画面被分成 27 个区域，每个区域分别映射声音和对应视觉；触摸、拖动都可以改变声音。

- ICC / sascacci + ksmt, `touch:waves`: https://www.ntticc.or.jp/ja/archive/works/touch-waves/

也可以把 Patatap 作为“键盘触发一对声音/视觉”的轻量补充案例，但正文不需要展开。

---

## 03｜GESTURE MAPPING

文件：`works/audiovisual-gesture-mapping.html`

**问题：一个动作能不能同时控制很多东西？**

拖动不是触发预制 clip，而是连续参数：

- X → 滤波、声像、横向位置；
- Y → 音高、纵向位置；
- 速度 → 能量、Q、线宽与残留；

即同一个动作被拆成多组连续数值，并同时进入声音与视觉。

### 源头

**Michel Waisvisz — The Hands (1984)**：MIDI 标准出现后，把手、臂、手指动作翻译成声音控制，重点是身体和电子乐器之间形成连续关系。

- Digital Canon: https://www.digitalcanon.nl/artworks/michel-waisvisz/

**Andy Hunt & Ross Kirk — Mapping Strategies for Musical Performance (2000)**：可用于解释 divergent / convergent / multiparametric mapping。论文的关键不是让每个旋钮只控制一个东西，而是说明连续、多参数 mapping 对数字乐器的演奏感很重要。

- https://www.researchgate.net/publication/243774325_Mapping_Strategies_for_Musical_Performance

---

## 04｜STEP PATTERN

文件：`works/audiovisual-step-pattern.html`

**问题：时间本身能不能成为界面？**

一个简化的 BPM 网格：

- 横向 = time；
- 纵向 = pitch / voice；
- 点亮一个单元 = 同时写入声音事件与视觉事件；
- transport 扫过时，音乐结构本身就是可见结构。

### 源头

**Toshio Iwai + Yamaha — TENORI-ON** 是非常干净的历史例子。Yamaha 对 TNR-i/TENORI-ON 的说明直接把 16×16 网格定义为“横向时间、纵向音高”，按钮被触发时同时发声与发光。

- Yamaha TNR-i: https://usa.yamaha.com/products/music_production/apps/tnr-i/index.html

这里不要复制 TENORI-ON 的外观；只借用“时间 / 音高 / 发声 / 发光来自同一矩阵”的结构原则。

---

## 05｜FIVE-STATE INSTRUMENT

文件：`works/audiovisual-instrument-special.html`

**课堂位置：结尾 / Starter Case 的目标参照。**

这不是自动播放的 Live Set，而是一件真的可以现场操作的网页乐器：

- 1–5 切换五种已成立的表演状态；
- 所有状态共享同一个 BPM；
- 鼠标/触控在不同状态里被不同方式解释；
- State 01：Pulse；
- State 02：Trigger Cells；
- State 03：Continuous Trace；
- State 04：Step Pattern；
- State 05：Stack / high-energy combination；
- 不自动替表演者完成完整演出。

它要证明的是：**Live Set 不需要从“做一场 Live Set”开始。先攒下 3、5、10 个真正成立的单元，再把它们组织成状态，就自然可以支撑更长的表演。**

### 源头

**Golan Levin + Gregory Shakar + Scott Gibbons — Scribble / AVES (2000)**：官方说明把 AVES 定义为一组可同时实时生成抽象动画与声音的 interactive systems；Scribble 进一步把这些系统组织成现场演出。这个案例适合用来解释“软件工具 → 乐器 → 演出”的升级。

- https://www.flong.com/archive/projects/scribble/index.html

本人的 `No Further Input Required V0.4` 则提供了当前网页实现的直接技术母体：浏览器 WebAudio、共享 transport、多个视觉状态与状态切换。

---

# 2. 课程里要明确区分的两个尺度

## A｜一个有效内容 / A Valid Unit

最小单位不等于“一个效果”。它至少要有：

`输入 → 规则 → 声音结果 + 视觉结果`

最好再有一个可判断的时间关系或状态变化。

开场一个按钮，就是把这个问题限制到最狠：如果只有一个动作，你还能设计什么？

## B｜一系列有效内容 / An Instrument

当多个有效单元已经成立后，再做：

- 复制；
- 变体；
- 排列；
- 切换；
- 共享 BPM；
- 安静 / 高能状态；
- MIDI / 键盘控制；
- 最终组织成 30–60 秒，甚至更长的演出。

所以“演出框架”是结果，不是课程一开始就要解决的主旨。

---

# 3. 海报方向

海报不要使用外部艺术家的作品截图作为主视觉，也不要再重新发明一套视觉风格。

直接从这五个网页的真实运行中取一张画面，尤其建议：

- One Button 的按钮 + 一次状态扩散；或
- Five-State Instrument 中五个状态留下的结构痕迹。

画面延续《无需进一步输入》已经成立的黑底、灰白、稀疏线、节点、正交路径与状态痕迹。

海报核心内容可以只保留：

**一个动作，可以有多少种结果？**

以及课程名称 / 时间 / 地点 / 报名信息。不要在海报上解释 Mapping 历史。

---

# 4. 图片与视频使用规则

## 可直接使用

1. 我们自己写的五个 Demo 的截图、录屏、GIF；
2. 自己重新绘制的 mapping / state / signal-flow 图；
3. 明确授权给媒体使用且许可覆盖本次用途的 press image。

## 默认需要再次确认

1. 艺术家官网、博物馆、档案馆里的现场照片；
2. 官方项目页写有 photographer / © / courtesy 的图片；
3. 视频截图；
4. 品牌产品页图片。

## 当前重点案例判断

- **The Hands**：Digital Canon 页面有版权归属信息，文章默认以链接和文字为主；需要刊图再询权。
- **Scribble**：作者页提供 high-resolution press images 入口，是最值得继续核实授权条件的一组。
- **touch:waves**：ICC 现场照片明确有摄影署名；优先发可试玩链接，刊图另行确认。
- **TENORI-ON**：Yamaha 官方资料适合作出处，不默认理解为自由转载。
- **test pattern**：如果作为延伸案例，现场图和作品资料均要尊重摄影/艺术家版权，同时视频使用需加高频闪烁提示。

原则：**“官方网站能看”不等于“官方网站的图可以自由转载”。**
