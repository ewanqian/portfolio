# MANA 2026-08-29 — Starter Kit Execution Spec v0.1

> **Internal execution document.**  
> Public course page remains unchanged until runnable demos are verified.  
> Theory source: [`../../research/performance-control-model/README.md`](../../research/performance-control-model/README.md)  
> Starter mother spec: [`../personal-av-instrument/starter-control-model.md`](../personal-av-instrument/starter-control-model.md)  
> Tracker: Issue #59

---

# What changes on 8.29

旧的 HOUR 2 目标：

```text
一个 Input
→ Sound + Visual + State
```

新的内部教学目标：

```text
一个 Input
→ 改变 State
→ 系统继续运行
→ Sound / Visual 分别解释 State
→ 人根据 Feedback 再决定下一步
```

参与者不需要学习控制论术语。

导师只让他们亲手体验三个区别：

1. Trigger vs State
2. Fixed / Open Loop vs Controlled Loop
3. Random Accumulation vs Stable System

---

# P0 files to produce before class

```text
workshops/personal-av-instrument/demos/
  00-trigger-baseline/
  01-state-instrument/
  02-safe-loop/
  common-source-liveset/   # Golden Mini Live System canonical runtime
```

如果时间不足，不做第 4 套平行系统。

Shared State A/V 直接进入 `common-source-liveset` 的 Golden Demo。

---

# STARTER 00 — Trigger Baseline

## Time in class

5–8 min.

## Student sees

```text
KEY
→ SOUND HIT
+ VISUAL HIT
```

## Exercise

连续玩 20–30 秒。

只问：

> 什么时候开始无聊？为什么？

不要在这里花时间美化。

---

# STARTER 01 — State Instrument

## Time in class

12–18 min.

## Student sees

```text
same KEY
+
QUIET / ACTIVE
→ different result
```

## Student edits

只允许先改：

- `quiet` behaviour
- `active` behaviour
- transition

不鼓励先增加更多 key。

## Minimum result

```text
QUIET
→ sparse / long / low density

ACTIVE
→ layered / rhythmic / higher energy
```

---

# STARTER 02 — Safe Loop

## Time in class

20–30 min guided build.

## System does automatically

- global BPM
- background continuity
- quantized transition
- max voices
- gain protection
- max visual density
- decay
- reset

## Student controls

```text
ENTER
ADD
REMOVE
HOLD
RELEASE
```

Keyboard can be minimal:

```text
A = ADD
S = REMOVE
D = HOLD
F = RELEASE
SPACE = ACCENT
ESC = RESET
```

Exact keys are provisional; structural roles matter more than letters.

---

# GOLDEN MINI LIVE SYSTEM

Canonical path:

```text
workshops/personal-av-instrument/demos/common-source-liveset/
```

## Required modes

### AUTO

60–90 sec sequence that already works as raw Screen + Sound.

### PERFORM

Human can override / shape:

- HOLD
- ADD
- REMOVE
- RELEASE
- optional RECALL

Do not require the performer to manually generate every beat.

## Minimum sections

Use only what is necessary. Suggested working form:

```text
OPEN
BUILD
PEAK
BREAK / RELEASE
RETURN
```

Section names remain provisional and can change after reference-set study.

---

# Personal material layer

`nfi-keyboard-liveset / 叮咚鸡` remains useful in class because it proves:

> personal material creates instrument identity immediately.

Use it as a fast hook / remix example, not as the Golden 5-minute performance architecture.

Students may replace:

- labels
- sound samples
- image / color

but should first inherit the safe control structure rather than rebuild transport from zero.

---

# Suggested HOUR 2 teaching flow

```text
14:30–14:38
PLAY Starter 00

14:38–14:50
PLAY Starter 01
same input / different state

14:50–15:05
PLAY Starter 02
system continues without mashing keys

15:05–15:30
guided edit
replace one sound / one visual
change one state relationship
```

The exact schedule can be adjusted against the final event run-of-show; the important order is comparison → state → safe loop → personal modification.

---

# AI prompts should become narrower

Bad classroom prompt:

> 做一个很酷的音画网页。

Better prompt:

> Keep the current transport, limiter, reset and state machine unchanged. Replace only the ACTIVE visual behaviour. It must enter in 300ms, develop for 2–4 seconds, decay without hard reset, and stay below the existing density budget. Return only files changed and known limitations.

Or:

> Given QUIET and ACTIVE states, propose three different transitions. Do not add new controls. Explain how each transition changes continuity, density and performer feedback.

AI should modify a controlled system, not rebuild the whole instrument on every prompt.

---

# Class QA

Before class, each Starter must report:

```text
PATH
BUILD
CHROME
SAFARI
FIRST AUDIO GESTURE
RESET
CONSOLE
KNOWN LIMITATIONS
```

For Golden Demo add:

```text
RAW 60–90S RECORDING
NOVICE TEST
AUDIENCE-ONLY RESULT
```

Any missing test = `NOT TESTED`.

---

# Do not produce before 8.29 unless P0 is already stable

- lighting protocol
- OSC
- Vision Pro
- advanced MIDI mapping
- complete DJ transcription editor
- AI autonomous performance
- another parallel live-set runtime
- 26 authored performance keys

The first class only needs to prove:

> **State + safe continuity + a small number of human decisions can already make the same basic materials feel more like a performance than a pile of triggers.**
