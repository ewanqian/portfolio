# Exercise 01 — 一个按钮，三种状态

**目标：** 先完成一个最小可玩的网页音画乐器。整个系统只有一个主要按钮 / Space 键，只研究三种状态：**Press / Hold / Release**。

不需要先做复杂 UI、多个按键、录音、完整音序器或大型视觉系统。先把一个输入的时间关系做清楚。

---

## 基础结构

```text
PRESS
→ 约 0.12 秒的短促声音
→ 同时出现一个明确的视觉冲击

HOLD  > 350ms
→ 进入持续状态
→ 跟随统一 BPM / Transport
→ drone / arpeggiator / short loop / sequencer 任选一种
→ 每 1–2 小节只发生少量受约束变化

RELEASE
→ 停止产生新的主事件
→ 进入独立的 release / tail
→ delay / reverb + visual residue 在 1–3 秒内衰减
```

### 最小共享状态

```text
pressed
holdDuration
BPM
beat
step
energy
releaseAmount
```

Audio 与 Visual 都读取这些状态。不要只做 `sound → analyser → visual`。

---

# 直接复制：4 个风格版本

## A — Ambient / Monochrome Field

```text
做一个只有一个按钮 / Space 的浏览器音画乐器，使用 Web Audio API + Canvas 或 WebGL，BPM 124。

Press：0.12 秒柔和 pluck / transient，同时出现一个黑白圆环或线框扩散。
Hold >350ms：进入低音 drone + 1/8 note arpeggiator，限定在同一个五声音阶，每 2 小节只改变一次 note order 或 filter；视觉变成缓慢呼吸的粒子 / field。
Release：停止新音符，保留 2 秒 delay / reverb tail，视觉残影慢慢消失。

声音偏 ambient electronic，干净、克制、有空间感。Audio 和 Visual 共用 BPM、beat、energy、holdDuration、releaseAmount。页面保持极简，不加复杂 UI。
```

## B — Club / High Energy Grid

```text
做一个只有一个按钮 / Space 的实时音画乐器，使用 Web Audio API + Canvas/WebGL，BPM 146。

Press：0.12 秒短促 kick + metallic hit，同时触发一个高对比黑白网格冲击。
Hold >350ms：进入 16-step rhythm loop，使用 kick / hat / short synth pulse；每 2 小节从 3 个固定 pattern variant 中切换一次，不能完全随机。视觉跟随同一个 step 形成扫描线、格点和快速位移。
Release：停止新的节奏事件，进入 1–2 秒 stutter / delay tail，网格留下衰减轨迹。

音乐偏实验 club / audiovisual performance，速度快但不要刺耳。加入 voice limit、compressor、limiter。只保留一个主按钮和必要的 Play / Reset。
```

## C — Organic / Liquid / Topology

```text
做一个只有一个按钮 / Space 的网页音画乐器，使用 Web Audio API + Canvas/WebGL，BPM 132。

Press：触发约 0.12 秒 filtered pluck + soft noise，同时生成一个液体结点 / 波纹。
Hold >350ms：进入持续 pulse + granular-like texture；holdDuration 控制密度，beat 控制脉冲，系统每 2 小节只轻微改变 density、filter cutoff 或 octave。视觉形成会连接、分裂、扩散的拓扑节点。
Release：停止生成新节点，声音进入长一点的 filter / reverb tail，已有视觉连接继续衰减 2–3 秒。

声音偏实验电子、organic、略带颗粒感。随机只能发生在限定范围内。Audio 与 Visual 读取同一个 clock 和 state。
```

## D — Glyph / Matrix / Minimal Tech

```text
做一个只有一个按钮 / Space 的实验电子音画乐器，使用 Web Audio API + Canvas/WebGL，BPM 138。

视觉只使用少量 Unicode glyph、点、线和 matrix 网格，黑底高对比。
Press：0.12 秒 pulse / click，同时点亮一个 glyph 节点。
Hold >350ms：启动与 BPM 同步的短 arpeggiator / pulse sequence；系统沿 FIELD → PULSE → ROUTE → RELEASE 的小型 graph 缓慢前进，每 2 小节最多改变一个节点状态。
Release：停止新的 pulse，进入 reverse / delay tail；glyph、route 和 matrix residue 在 1–2 秒内退场。

不要堆效果。重点是节点、路径、状态变化和非常清楚的动作反馈。
```

---

# 如果第一次生成得太复杂

把下面这段直接追加给 Agent：

```text
请缩减当前版本：
- 只保留一个主按钮 / Space；
- 只保留 Press / Hold / Release 三个状态；
- 只使用一个共享 BPM / clock；
- 最多 3 个同时发声 voice；
- 删除说明文字、复杂控制面板和多余特效；
- 保留 Reset；
- 让我在 10 秒内看懂怎么操作。
```

# 如果声音不好听

```text
不要增加更多声音。先统一 key / scale，减少高频，降低同时发声数量，重新做 gain staging；给 master 加 compressor + limiter。Press 要短，Hold 要稳定，Release 要有尾巴，而且三个状态听起来必须明显不同。
```

# 验收

1. 页面打开后，一次点击即可启动音频。
2. Press / Hold / Release 三个状态在声音和视觉上都能明显区分。
3. Hold 可以持续至少 20 秒而不过度机械重复。
4. 所有持续事件共享同一个 BPM / clock。
5. Release 后仍有 1–3 秒可感知的尾音 / 残影。
6. 只有一个主输入，不靠增加按钮解决问题。
