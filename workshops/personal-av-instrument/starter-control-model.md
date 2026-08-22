# Personal A/V Instrument — Starter Ladder v0.1

> **For:** 2026-08-29 MANA pilot + long-term Personal A/V Instrument  
> **Related theory:** [`research/performance-control-model/README.md`](../../research/performance-control-model/README.md)  
> **Implementation tracker:** Issue #59  
> **Status:** Starter specification. Individual runnable Starter 00–03 must not be claimed as finished until they exist and are tested.

---

# Why change the Starter Kit

旧 Starter 的核心逻辑：

```text
Input
↓
Mapping
↓
Sound + Visual + State
```

它仍然成立，但对第一次参与者来说，`State` 很容易变成“再加一个模式”，最后仍然回到：

```text
按一下
→ 响一下
→ 闪一下
```

新的 Starter 不增加软件难度，而是让参与者通过几个非常小的对比，亲手理解：

> **一个输入怎样改变系统，而不是只触发一次效果。**

---

# Starter 00 — Trigger Baseline

## Purpose

故意保留最简单的一对一 Mapping，作为对照组。

```text
KEY A
↓
Sound Hit
+
Visual Hit
```

## Minimum controls

- one key / one button
- reset

## What participant should notice

- 第一次很直接；
- 连续玩 20–30 秒以后结构很快耗尽；
- 多按并不自动产生 composition。

## Pass condition

它不是 Golden Demo。

只需要足够清楚地成为后面 Starter 的 baseline。

---

# Starter 01 — State Instrument

## Purpose

同一个输入因为 State 不同产生不同结果。

最小公众版：

```text
QUIET
ACTIVE
```

导师 Demo 可以扩为：

```text
OPEN
BUILD
PEAK
BREAK
```

## Model

```text
Result = Input + State
```

而不是：

```text
Result = Input
```

## Minimum controls

- one performance input
- one state switch
- reset / panic

## Example

同一个 `A`：

```text
QUIET
→ sparse pulse + small visual trace

ACTIVE
→ layered phrase + larger visual behaviour
```

## Participant task

只修改两件事：

1. 两个 State 的差异；
2. 同一个 Input 在两个 State 中为什么应该不同。

不要先增加更多按键。

---

# Starter 02 — Safe Loop / Quantized Layering

## Purpose

让系统可以自己连续运行，而参与者不必手动制造每个 beat。

参考方向：adaptive music / PlayGround-style safe interaction。

## System handles

- BPM / transport
- musical boundary
- compatible pitch / material
- max voices
- max density
- gain safety
- decay

## Human handles

```text
ENTER
ADD
REMOVE
HOLD
RELEASE
```

## Key idea

用户可以在任意时间提出一个意图，但系统在安全的 musical boundary 执行。

```text
user presses PEAK at bar 15.7
↓
pending = PEAK
↓
bar 16.0
↓
execute PEAK
```

## Pass condition

- 用户停手 2–4 秒系统仍然成立；
- 不需要狂按才能维持音乐；
- ADD 连续操作不会无限叠加；
- REMOVE / RELEASE 能真正降低能量；
- reset 可靠。

---

# Starter 03 — Shared State A/V

## Purpose

让 Sound 和 Visual 读取同一套 State，但不进行廉价 1:1 reactive mapping。

## Example

```text
STATE: HIGH TENSION / PRE-RELEASE
```

Audio：

```text
remove kick
keep bass hint
increase subdivision
```

Visual：

```text
keep dominant structure
increase internal fragmentation
reduce new objects
```

两边都在表达：

> “快到了，但现在还不能释放。”

## Pass condition

- 关闭音乐以后视觉仍有段落；
- 关闭视觉以后音乐仍有结构；
- 二者合起来不是简单重复同一个 beat；
- State change 对二者都有实际后果。

---

# Golden Demo — Mini Live System

Canonical runtime candidate:

```text
workshops/personal-av-instrument/demos/common-source-liveset/
```

## Target for 8.29

只需要 **60–90 秒**，但必须认真完成。

### AUTO

不操作，系统自己播放已经像一段小型演出。

### PERFORM

演奏者只接管少量结构命令，例如：

```text
HOLD
ADD
REMOVE
RELEASE
RECALL
ACCENT
```

### Acceptance

- raw Screen + Sound 可以独立观看；
- AUTO 不是无聊 background loop；
- PERFORM 的操作真的改变 structure；
- performer 停手不 dead；
- audio / visual density 有保护；
- novice 在两分钟说明后能做一次 build → release；
- 任何未测试项写 `NOT TESTED`。

---

# Existing demo roles

## nfi-keyboard-liveset / 叮咚鸡

```text
workshops/personal-av-instrument/demos/nfi-keyboard-liveset/
```

继续负责：

- personal material
- identity
- immediate fun
- QWERTY / keyboard-as-instrument
- “我也想换成自己的声音”的冲动

不要强行让它承担完整长时 Live Set。

## common-source-instrument

保留 Mapping / Shared Source 教学 reference。

## common-source-liveset

逐步成为 Performance Control runtime。

下一轮重点不是再增加 thin keys，而是：

- stable state transition
- safe continuity
- real section contrast
- human structural decisions
- raw performance quality

## NIULAI TAP

Theme Pack / later content study，8.29 P0 暂不扩张。

---

# 8.29 minimum set

如果时间紧，只做：

```text
00_TRIGGER_BASELINE
01_STATE
02_SAFE_LOOP
GOLDEN_MINI_LIVE_SYSTEM
```

`03_SHARED_STATE_A/V` 可以由 Golden Demo 直接展示，不要求所有参与者从零实现。

---

# Classroom sequence

```text
PLAY BAD
↓
PLAY BETTER
↓
问：差别到底在哪里？
↓
拆 Input / State / Feedback / Constraint
↓
Starter 00
↓
Starter 01
↓
Starter 02
↓
换个人材料
↓
Blind test
↓
只修一个最大问题
↓
30–60 sec micro performance
```

课程不要求参与者记住 `Stability / Controllability / Observability` 这些词。

导师自己用它们判断系统即可。

参与者只需要反复回答：

1. 现在是什么状态？
2. 我这个动作改变了什么？
3. 我停手以后会发生什么？
4. 我怎么把它收回来？
