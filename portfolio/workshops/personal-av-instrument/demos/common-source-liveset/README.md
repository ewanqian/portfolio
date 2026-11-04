# COMMON SOURCE / 同源场 — LIVE SET

`COMMON SOURCE / 同源场 — LIVE SET` 是工作坊 Demo 体系里的 **Performance System / 演出系统线**。它与“键盘乐器线”分开：这里不要求表演者拥有很强的键盘或音乐演奏能力，而是让每一次输入触发一段已经具有时间结构、音画结构和舞台完整度的 **Audiovisual Phrase**。

## 为什么从 Instrument 改成 Live Set

旧版 `COMMON SOURCE` 更接近一件数字乐器：按键 → 音高 / 节奏 / Texture。它适合解释 Mapping，但如果表演者没有成熟音乐技能，很难单靠逐音演奏支撑一场完整现场。

LIVE SET 版本的评价对象改变为：

> **一个普通参与者能不能在几分钟内，通过少量判断与按键，组织出一段观众角度成立的完整 Audio Visual Performance？**

因此核心单位不再是 Note / Hit，而是：

> **Phrase / 段落事件。**

一个键按下以后，系统会持续若干拍 / 若干小节，内部自己经历进入、发展、变化、退出；声音和视觉都读取同一个 Phrase 数据。

---

## 1. Internal BPM / 内部时间轴

第一版默认：`124 BPM / 4-4 / 16-step grid`。

所有主要事件进入统一 Clock：

- 输入自动 Quantize 到 beat / bar；
- 不要求使用者自己按得绝对准；
- Phrase 可以安全叠加；
- Scene / Section 切换尽量发生在下一小节；
- 后续可以接外部 MIDI Clock / BPM，但第一版先保证网页内部独立成立。

这解决的是“演出时间结构”，而不只是音频播放。

---

## 2. 四个 Performance Sections

数字键不再只是换颜色，而是切换整场演出的结构状态。

### `1 · GROUND / 铺垫`

- 低密度
- 大空间
- 长释放
- 少量脉冲
- 适合开场和恢复

### `2 · BUILD / 推进`

- 节奏密度增加
- phrase 之间开始建立回应
- 视觉运动加速
- 适合把能量推上去

### `3 · PEAK / 主段`

- 完整节奏层
- 更短的视觉切换周期
- 更高对比
- 多 Phrase 同时存在时形成完整舞台画面

### `4 · BRIDGE / 桥段`

- 主节奏暂时抽掉 / 重组
- 空间重新打开
- 使用 echo / delay / reverse-like structure 制造转折
- 可继续回到 BUILD / PEAK，也可以进入结束

Section 本身就是 Arrangement，而不是 Palette。

---

## 3. QWERTY 不再是一键一音，而是一键一段

### `Q–P · MOTIF / 主题段`

每个键触发 1–2 bars 的短 Motif：

- Pentatonic / safe pitch material
- 内部有 3–6 个音频事件
- 视觉同步经历多个阶段
- 随 Section 改变密度与演奏方式

### `A–L · PULSE / 节奏段`

不是单次 Kick / Snare，而是短 Pattern：

- 1 bar rhythm phrase
- 自动落在 Grid 上
- 可以叠加，但有最大密度保护
- 每个 pattern 同时生成视觉冲击序列

### `Z–M · TEXTURE / 转场段`

负责：

- 空间铺底
- 氛围变化
- transition
- break / fill
- visual field transformation

它们更像 Live Set 中的 clip / scene layer，而不是一个单音。

---

## 4. 一次按键内部必须发生什么

每个 Phrase 至少包含四个内部阶段：

`ENTER → DEVELOP → TRANSFORM → RELEASE`

例如一个 2-bar visual phrase：

- 第 1–2 beat：进入 / 建立核心形态
- 第 3–4 beat：扩大 / 复制 / 建立结构
- 第 2 bar 前半：发生第二层变化
- 第 2 bar 后半：收束 / 残影 / 退出

因此观众看到的不是“按一下闪一下”，而是一段能够自己支撑几秒的演出内容。

---

## 5. Hold / 长按

长按不只是延长声音。

第一版定义：

- Tap：标准 1–2 bar phrase
- Hold：进入 Sustain / Accumulate 版本
- Release：触发 phrase 的收束 / exit gesture
- Rapid repeat：不重新从头暴力触发，而是增加 density / variation

目标是让同一个键拥有不同演奏层级，但仍然保持可预测。

---

## 6. Audience-first / 观众视角完整度

任何版本都必须通过下面的测试：

1. **没有输入时也不能像死网页。** 必须存在与 BPM / Section 相关的轻微背景运动。
2. **一个键至少支撑 2–8 秒。** 不能只是一次文字或圆形闪现。
3. **连续随机按键不能立刻崩坏。** 音高限制、量化、最大声部数和视觉密度要主动保护表演者。
4. **Section 切换必须明显。** 观众能感觉“演出进入下一段”，而不只是换色。
5. **5 分钟 novice test。** 不懂乐理的人经过 2 分钟说明，应该能够完成一段有开场、推进、主段、桥段和结束感的现场。
6. **可以被录成完整视频。** 关闭键盘 UI 后，仅看全屏画面和听声音仍然应像一段完整 AV Live Set。

---

## 7. 当前 v0.2 Prototype Controls

- `1 / 2 / 3 / 4`：GROUND / BUILD / PEAK / BRIDGE
- `Q–P`：Motif phrases
- `A–L`：Pulse phrases
- `Z–M`：Texture / transition phrases
- `[` / `]`：BPM -2 / +2
- `Space`：安全 Fill
- `H`：Hide / Show HUD
- `0 / Esc`：Reset

Demo 默认 124 BPM。

---

## 8. 两条线从这里正式分开

### A · Instrument Line / 乐器线

关注：

- 一个动作与声音 / 视觉之间的 Mapping
- personal sample pack
- “大狗叫叮咚鸡” / NIULAI / 自定义声音
- 键盘像吉他 / Launchpad 一样被直接玩

### B · Performance System Line / 演出系统线

关注：

- BPM / Grid
- Phrase
- Arrangement
- Section
- Transition
- Audience continuity
- novice performer safety
- 5–10 min Live Set

`COMMON SOURCE / 同源场 — LIVE SET` 从现在起属于 **B 线**。

---

## 9. 下一步验收

这一条线后续不以“键盘好不好弹”为首要标准，而以：

> **它能不能真的撑起一场演出？**

下一轮重点：

- Phrase variation 数量
- Section 间的过渡质量
- 长按的第二层行为
- BPM 可视化 / musical phrasing
- 5 分钟录屏测试
- 观众盲测：只看最终录屏，不解释网页操作
