# NFI-P3D-HARNESS

> **Code name:** `NFI-P3D-HARNESS`  
> **Full name:** No Further Input Required — Performance P3D Harness  
> **Role:** 《无需进一步输入》**演出专线**的 Processing / P3D 研发与测试工程。  
> **Golden behavioural reference:** `works/no-further-input-required.html` — Interactive v0.7  
> **Control-model parent:** `research/performance-control-model/`  
> **Workshop / instrument parent:** `workshops/personal-av-instrument/`  
> **Decision authority:** ChatGPT / Ewan review. Local Codex is implementation + test executor only.

---

## 0. Boundary

这不是《无需进一步输入》展览作品线的替代品，也不是把展览作品改写成 Processing。

本项目只处理：

```text
NFI PERFORMANCE LINE
= v0.7 演奏骨架
+ Performance Control Model
+ Processing OOP
+ true P3D spatial renderer
+ deterministic harness / replay / capture
```

展览作品线继续保留 autonomous process / machine process / residual memory 等研究；本项目聚焦 **Live A/V Instrument / Performance System**。

---

## 1. Why this exists

v0.7 已经证明以下内容成立：

- continuous generative music；
- global BPM / bar / 16th-note transport；
- quantized keyboard input；
- `1–0 / QWERTY / ASDF / ZXCV` 36-key topology；
- AUTO / HOLD / NEXT；
- 同一运行时中的多个 visual states；
- performer 可以从“随便按”逐渐进入“有意识按行、按方向、按节律”的演奏。

但 v0.7 的 renderer 是 Canvas 2D；所谓 FIELD / ORBIT 并没有真实 Z、camera、perspective、occlusion。后续快速网页版本也证明：**增加状态数量或视觉效果不会自动提高演出质量。**

因此下一阶段不再要求 Agent “做一个酷的 P3D 效果”。

正确顺序：

```text
freeze behavioural reference
→ build test harness
→ port transport / score / keyboard
→ build ControlBus
→ verify deterministic replay
→ only then implement one P3D state at a time
→ capture evidence
→ human review
```

---

## 2. Mandatory reading order for local Codex

本地 Codex 每次开始工作必须按顺序读取：

1. `README.md` — 当前文件；
2. `GOLDEN-RULES.md` — 禁止违反；
3. `PROCESSING-ARCHITECTURE.md` — 类、职责、依赖；
4. `TASKBOOK.md` — 只执行当前被批准的 R-stage；
5. `ACCEPTANCE.md` — 只负责跑测试和记录事实，不负责最终判断；
6. `A-SHEET.md` — 找到当前 `ACTIVE TASK`；
7. 必要时读取 v0.7：`works/no-further-input-required.html`；
8. 必要时读取：`research/performance-control-model/AGENT-HANDOFF.md` 与 `README.md`。

如果这些文件之间出现冲突：

```text
A-SHEET 当前任务
> GOLDEN-RULES
> TASKBOOK
> PROCESSING-ARCHITECTURE
> parent AGENT-HANDOFF
> old issues / old experiments
```

不要自行选择另一套设计。

---

## 3. Division of responsibility

### Local Codex may

- 创建 / 修改 Processing `.pde` 文件；
- 创建 harness scripts；
- 编译；
- 跑 deterministic replay；
- 跑 smoke tests；
- 保存 screenshot / recording / logs / metrics；
- 记录实际行为；
- 报告 bug、限制、性能数据；
- 提出最多 3 个“实现层选择”，但不得自行采用改变设计方向的方案。

### Local Codex must NOT

- 重新定义作品概念；
- 自行决定 state 数量；
- 自行增加 particle / bloom / random geometry；
- 用“更酷”替代 specification；
- 因实现方便而改变 QWERTY topology；
- 自行判定视觉是否“好看 / 成立 / 可演出”；
- 把自己的判断写成 PASS；
- 未获得 Reviewer Decision 时进入下一 R-stage；
- 同时重写多个 accepted states；
- 把 `NOT TESTED` 写成“完成”。

### Reviewer (ChatGPT / Ewan) owns

- visual judgment；
- musical judgment；
- state distinction；
- whether P3D depth is meaningful；
- whether interaction feels performable；
- PASS / REVISE / REJECT；
- whether to freeze a module；
- next single biggest problem。

---

## 4. Canonical working loop

```text
Reviewer writes ACTIVE TASK in A-SHEET
↓
Local Codex reads spec
↓
implements ONLY requested scope
↓
compiles
↓
runs required tests
↓
produces evidence
↓
updates A-SHEET FACTS ONLY
↓
STOP
↓
Reviewer inspects evidence
↓
PASS / REVISE / REJECT
↓
next task
```

No automatic progression.

---

## 5. First milestone

第一里程碑不是“做出三维视觉”。

第一里程碑是：

> **在 Processing / P3D 中得到一个没有新视觉、但已经完整继承 v0.7 演奏骨架并可 deterministic replay 的 runtime。**

必须先完成：

```text
R000 Harness bootstrap
R001 Transport + StructuralScore
R002 ControlBus + input/event model
R003 v0.7 QWERTY instrument port
```

这四项没有 Reviewer PASS 前，不允许进入 R004 P3D visual state。

---

## 6. Project state

Current status: `SPEC READY / IMPLEMENTATION NOT STARTED`

Canonical coordination file: [`A-SHEET.md`](./A-SHEET.md)
