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

# 3. IMPLEMENTED / UNVERIFIED — 源码已经存在，但不能写成“已验证完成”

2026-08-23 已经完成第一轮**源码生产**。以下内容可以被 Agent 读取、比较、修改和测试，但在通过真实浏览器 / 声音 / 观众测试以前，不能写成“课程 Starter 已完成”“Golden Demo 已成立”或“线上已经可玩”。

## 3.1 Writing Reader source

```text
content/writings/performance-control-model.json
react/src/pages/WritingDetail.jsx
react/src/styles/writing-detail.css
react/src/components/content/MarkdownReader.jsx
scripts/build-content.js
```

当前事实：

- `/writing/:slug` route 已实现；
- Performance Control Model 专题 metadata 已实现；
- `articlePath` 会在 build-time 读取 canonical Markdown 并写入 `articleMarkdown`；
- 一个最小本地 fixture 已验证 article embedding 逻辑：PASS；
- Reader 内已有 Trigger vs State / Open vs Controlled / Random vs Stable micro interaction source。

仍未验证：

- production build on actual deploy environment；
- public Reader URL；
- mobile reading；
- real browser interaction。

## 3.2 Starter 00 — Trigger Baseline

```text
workshops/personal-av-instrument/demos/00-trigger-baseline/
```

Source status:

- index.html exists；
- README exists；
- inline JS `node --check`: PASS；
- intentionally fixed one-shot behaviour；
- public deploy / AudioContext / Chrome / Safari: NOT TESTED。

## 3.3 Starter 01 — State Instrument

```text
workshops/personal-av-instrument/demos/01-state-instrument/
```

Source status:

- index.html exists；
- README exists；
- inline JS `node --check`: PASS；
- `1 = QUIET / 2 = ACTIVE / Space = same input`；
- public deploy / AudioContext / Chrome / Safari: NOT TESTED。

## 3.4 Starter 02 — Safe Loop

```text
workshops/personal-av-instrument/demos/02-safe-loop/
```

Source status:

- index.html exists；
- README exists；
- inline JS `node --check`: PASS；
- 120 BPM internal transport；
- next-bar ADD / REMOVE / RELEASE；
- HOLD；
- max 3 layers；
- master compressor；
- automatic safety decay；
- Reset；
- public deploy / real listening / Chrome / Safari: NOT TESTED。

## 3.5 Golden Mini v0.3 source

Canonical runtime remains:

```text
workshops/personal-av-instrument/demos/common-source-liveset/index.html
```

Current implementation spec:

```text
workshops/personal-av-instrument/demos/common-source-liveset/GOLDEN-MINI-v0.3.md
```

Source facts:

- ~62 sec / 32-bar AUTO score；
- working form: `OPEN → BUILD → PEAK → BREAK → RETURN`；
- AUTO + PERFORM modes；
- shared provisional vector `energy / tension / density / space / memory`；
- quantized ADD / REMOVE / RELEASE / RECALL；
- HOLD / safe Accent；
- 1–4 quantized section request；
- H hides HUD；
- master compressor / finite synthesized events；
- inline JS `node --check`: PASS；
- Python `HTMLParser`: PASS。

This is **8.29 Golden Mini source**, not the final long-term 8-Hero-Phrase / 5–10 minute Performance System defined in Issue #55.

Still NOT TESTED:

- actual 62-sec sound quality / mix；
- section distinction with HUD off；
- no-input continuity as perceived by audience；
- Chrome / Safari；
- AudioContext first gesture；
- novice performance；
- audience-only blind test；
- raw recording；
- public URL。

## 3.6 Static deploy-copy source

`react/scripts/copy-workspace-assets.mjs` now publishes the canonical demo tree to:

```text
/lab/personal-av-instrument/<demo>/
/portfolio/lab/personal-av-instrument/<demo>/
```

A minimal local fixture verified this copy logic: PASS.

This does not prove the external Cloudflare build has completed.

---

# 4. TO PRODUCE / TO VERIFY — 禁止写成已完成

截至当前，真正剩下的 P0 已经从“继续写源码”转向“听、看、部署、测试、重写内容”。

- [ ] production build / deploy verification for Reader
- [ ] verify public Reader URL
- [ ] verify public Starter 00 URL
- [ ] verify public Starter 01 URL
- [ ] verify public Starter 02 URL
- [ ] verify public Golden Mini URL
- [ ] Chrome interaction + console test
- [ ] Safari interaction + console test
- [ ] AudioContext first-gesture test
- [ ] raw 62-sec Golden Mini listening / viewing pass
- [ ] HUD-off section distinction test
- [ ] Sound-only test
- [ ] Visual-only test
- [ ] raw Screen + Sound recording
- [ ] at least one novice 5-minute test
- [ ] at least one audience-only blind test
- [ ] revise Golden authored audio / choreography from those tests
- [ ] Starter 03 — Shared State A/V as separate teaching artifact **only if still necessary after Golden test**
- [ ] 3 DJ / Concert structural transcriptions
- [ ] Reference Set Transfer Test
- [ ] lighting / OSC / show-control integration
- [ ] Vision Pro / touch input study
- [ ] long-term 8 Hero Phrase / 5–10 minute Performance System
- [ ] 半年 repertoire（至少 3 套不同 Set）

---

# 5. 2026-08-29 P0 — current order

不要继续扩理论，也不要先增加 controls。

当前优先顺序已经更新为：

```text
1 verify Reader build / URL
2 verify Starter 00 / 01 / 02 in real browser
3 listen + watch Golden Mini AUTO for full ~62 sec
4 rewrite sound / visual choreography if it still reads like webpage demo
5 record HUD-off raw Screen + Sound
6 run 2-minute instruction → novice 5-minute test
7 run audience-only blind test
8 only then update public workshop page / teaser claims
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

# 6. Canonical code roles

## Personal material / immediate fun

```text
workshops/personal-av-instrument/demos/nfi-keyboard-liveset/
```

Role: 叮咚鸡 / personal material / QWERTY identity / Starter reference.

## Control comparison Starters

```text
workshops/personal-av-instrument/demos/00-trigger-baseline/
workshops/personal-av-instrument/demos/01-state-instrument/
workshops/personal-av-instrument/demos/02-safe-loop/
```

Role: 课堂 A/B / A/B/C comparison。不要把它们扩展成三套完整作品。

## Golden performance runtime

```text
workshops/personal-av-instrument/demos/common-source-liveset/
```

Role: Performance Control runtime candidate / 8.29 Golden Mini / 后续 full Performance System 的 canonical 演进路径。

Do not create a third parallel live-set system unless explicitly approved as a temporary experiment branch.

---

# 7. Agent completion report

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
