# Performance Control Model — Agent Handoff

> **Purpose:** 给 ChatGPT / Codex / 本地 Agent 的快速引用入口。  
> **Updated:** 2026-08-23  
> **Canonical long text:** [`README.md`](./README.md)  
> **Implementation tracker:** GitHub Issue #59  
> **Boundary:** 这是 Live A/V / Workshop 研究，不属于《无需进一步输入》正式作品线。

---

# 1. STABLE — 当前可以引用

下面内容已经通过连续讨论、现有原型失败经验与相关 DMI / NIME 研究形成稳定的**内部设计原则**。可以用于下一轮代码、Workshop 文本、QA 与研究说明，但不要包装成“行业已经证明的唯一理论”。

## 1.1 Dynamic State + Feedback

Live A/V 不只看成：

```text
Input → Effect
```

优先看成：

```text
Current State
+ Human Input
+ Disturbance
→ Next State
→ Music / Visual / Light
→ Feedback
→ Next Human Decision
```

## 1.2 Same Input, Different State

同一个 Input 可以在不同 State 中产生不同结果：

```text
Result = Input + State + History
```

不要默认 `A` 永远触发同一组 one-shot effect。

## 1.3 Hybrid Control

当前优先：

```text
curated / pre-authored reliable material
+
automatic timing / safety
+
high-value performer decisions
```

不是完全 autoplay，也不是完全随机 live generation。

## 1.4 Human / Machine division

Machine 优先处理：

- BPM / transport
- quantization
- pitch compatibility
- voice limits
- gain / limiter
- density budget
- transition scheduling
- reset / panic

Human 优先处理：

- enter
- wait
- hold
- add
- remove
- release
- recall
- when to leave space

## 1.5 Shared State, not mandatory full sync

Music / Visual / Light 可以读取同一个高层 State，但分别解释。

不要把“同源”缩减为：

```text
kick → flash
bass → scale
volume → particle count
```

## 1.6 Performance first, instrument second

Golden Demo 的顺序：

```text
make a good performance
→ mime / infer meaningful controls
→ implement instrument
```

不要先扩充 26 keys / effects，再希望最后自然像演出。

## 1.7 Generative Arrangement > unreviewed Generative Material

当前阶段更可靠的路径：

```text
AI + Human generate many candidates offline
→ human selects
→ curated library
→ live recombination / arrangement
```

不要把最终舞台质量押在未经筛选的实时随机材料上。

## 1.8 Quality Gate

每个重要版本优先检查：

- Stability
- Controllability
- Observability
- Robustness
- Expressivity
- Depth

并执行：

- Sound-only
- Visual-only
- Screen + Sound blind test
- novice performance test
- audience causality / performer agency test

未实际执行必须写 `NOT TESTED`。

---

# 2. PROVISIONAL — 可以开发，不可宣传为定论

以下仍是 working hypotheses：

1. `Energy / Tension / Density / Space / Memory` 是否是最终最优 State vector。
2. `OPEN / BUILD / PEAK / BREAK` 是否适合跨 genre 使用。
3. `Cell / Capsule` 是否长期保留为术语。
4. 一个通用 Structural Score 是否能跨 DJ / Concert / Club / Music Game。
5. AI Critic 是否能可靠判断 energy arc / release timing。
6. Lighting 是否进入公众 Starter Kit，而不是只在导师 Demo。
7. Mini Live System 最优控制命令是否是 `ENTER / HOLD / ADD / REMOVE / RELEASE / RECALL`。
8. 自动 background continuity 与 performer agency 的最佳比例。

Agent 可以实验，但必须标记为 `PROVISIONAL`。

---

# 3. TO PRODUCE — 禁止写成已完成

截至 2026-08-23，以下内容仍需要实际生产 / 验证：

- [ ] `/writing/performance-control-model` 专题 Reader 完整部署与验证
- [ ] Reader 的 3–4 个 micro demos
- [ ] Starter 00 — Trigger Baseline
- [ ] Starter 01 — State Instrument
- [ ] Starter 02 — Safe Loop / Quantized Layering
- [ ] Starter 03 — Shared State A/V
- [ ] 60–90 秒 Golden Mini Live System
- [ ] raw Screen + Sound recording
- [ ] 至少一次 novice test
- [ ] 至少一次 audience-only blind test
- [ ] 3 个 DJ / Concert structural transcriptions
- [ ] Reference Set Transfer Test
- [ ] lighting / OSC / show-control integration
- [ ] Vision Pro / touch input study
- [ ] 半年 repertoire（至少 3 套不同 Set）

---

# 4. 2026-08-29 P0

不要继续扩理论。

优先顺序：

```text
1 Reader v0.1
2 Trigger vs State demo
3 Open vs Controlled Loop demo
4 Random vs Stable demo
5 Starter ladder update
6 common-source-liveset → 60–90s Golden Mini Live System
7 raw recording
8 novice / audience test
```

## Explicit non-goals before 8.29

- new DAW
- complete show-control software
- 26 new performance phrases
- full lighting protocol
- complex MIDI learn
- OSC / sensors / camera
- live AI generative performance
- universal genre-independent theory
- another parallel live-set HTML

---

# 5. Canonical code roles

## Personal material / immediate fun

```text
workshops/personal-av-instrument/demos/nfi-keyboard-liveset/
```

Role: 叮咚鸡 / personal material / QWERTY identity / Starter reference.

## Golden performance runtime

```text
workshops/personal-av-instrument/demos/common-source-liveset/
```

Role: Performance Control runtime candidate.

Do not create a third parallel live-set system unless explicitly approved as a temporary experiment branch.

---

# 6. Agent completion report

任何声称完成 Reader / Starter / Golden System 的 Agent 必须报告：

```text
CANONICAL PATH
FILES CHANGED
COMMIT SHA
BUILD RESULT
PLAYABLE / READER URL
URL VERIFICATION RESULT
CHROME TEST
SAFARI TEST
AUDIOCONTEXT TEST
CONSOLE ERRORS
RAW RECORDING
NOVICE TEST
AUDIENCE TEST
KNOWN LIMITATIONS
NEXT SINGLE BIGGEST PROBLEM
```

没有执行的项目写 `NOT TESTED`。
