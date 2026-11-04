# ENTROPY / FIELD INDEX — Post-show Closeout

Status review: 2026-10-29  
Event date: 2026-09-05  
Venue: GWANTSI XR Studio, Shanghai

This file converts the ENTROPY production archive from a pre-show planning state into a post-show evidence package.

It deliberately separates:

- **verified event facts**;
- **repository-confirmed production assets**;
- **onsite-used elements that still need confirmation**;
- **pre-show ideas that should not be retroactively described as shipped**.

Portfolio PM tracker: Issue #93.  
Production source: Issue #70.

---

## 1. Verified public facts

### Event

**ENTROPY — immersive audiovisual live performance**  
**Date:** 5 September 2026  
**Venue:** GWANTSI XR Studio, Shanghai

### Performance credit currently documented in the repository

- Leon Krykhtin
- Ewan Qian / 钱誉文
- Georgy Robakidze (RÖ)

### Ewan role currently documented in the repository

- realtime visual
- spatial image
- live visual system

### Working system identity

**FIELD INDEX — SRE Live Visual System**

These facts are already represented in Issue #70 and the 2026 rolling CV layer. Any public case study should still run a final credit check before publication.

---

## 2. Repository-confirmed production architecture

The repository contains a reusable production asset structure under:

`works/entropy-0905-performance/`

Confirmed components include:

```text
assets/baked/
config/
runtime/
states/
```

The current canonical baked asset is:

`assets/baked/network-rich-v001.js`

The state manifest references ten repository-defined states sharing that canonical asset:

1. `01-network-core`
2. `02-signal-globe`
3. `03-nerve-field`
4. `04-circular-array`
5. `05-data-wall`
6. `06-depth-puncture`
7. `07-neural-bloom`
8. `08-luoshu-field`
9. `09-celestial-lock`
10. `10-collapse-residual`

### Important evidence boundary

The existence of a state in `states/manifest.json` proves that the state was encoded in the production archive.

It does **not by itself** prove that every state was used live onsite on 2026-09-05.

The public case study must not collapse those two claims.

---

## 3. Production model worth preserving

The strongest transferable production idea is not the number of states or effects. It is the asset/state separation:

```text
BAKED ASSET
+
CAMERA PRESET
+
LAYERS
+
MOTION / PERFORMANCE PHRASE
```

This allows a successful spatial structure to survive beyond one HTML prototype and be reused through stable asset identity.

The earlier production planning also defined a larger live-control model:

```text
Input
→ State
→ Phrase
→ Spatial Output
```

For the final case study, only describe the parts of that model that can be supported by actual performance evidence, repository state or post-show confirmation.

---

## 4. Screen / venue context already documented

Issue #70 records the following production context:

### Main LED

- native grid: `9600 × 3456 px`
- aspect: `25:9`
- main LED area: `84 m²`
- straight-line width: `12.4 m`
- arc width: `15.2 m`
- height: `5.5 m`
- Sony Crystal LED / Micro-LED

### Secondary surfaces

- ceiling LED: `35 m²`
- auxiliary LED: `10 m²`

The pre-show issue explicitly said the ceiling resolution still needed confirmation. Do not convert that unresolved pre-show field into a confident final technical specification without post-show evidence.

### Working render profiles recorded before the show

- primary realtime profile: `3840 × 1382`
- target high-quality profile: `4800 × 1728`
- preview / emergency profile: `3200 × 1152`

**Post-show verification needed:** which profile(s) were actually used during the final performance.

---

## 5. What must be verified before public case-study promotion

### A. Final technical reality

- [ ] final render/output profile actually used onsite
- [ ] final main-screen routing / mapping configuration
- [ ] whether and how the ceiling / auxiliary surfaces were used
- [ ] exact live software chain used in the final performance
- [ ] which FIELD INDEX states / modules were actually used live
- [ ] whether BPM / phrase quantisation was used in the final show and in what form
- [ ] which planned components were abandoned before the performance

### B. Final documentation

- [ ] select 3–8 strong live photographs
- [ ] select one strong short video excerpt or public performance clip
- [ ] identify one image suitable for the project hero
- [ ] identify one image suitable for explaining screen / spatial context
- [ ] identify one diagram / screenshot suitable for explaining the system

### C. Credits / publication

- [ ] final performer / collaborator credit line
- [ ] venue naming check
- [ ] image/video photographer or source credit where required
- [ ] public-use / rights status for selected documentation

---

## 6. Shipped vs planned reconciliation

The original production issue is intentionally broad. It includes many states, phrase ideas, Unicode experiments, particle-field research, Blender / Simulation Zone studies, output profiles and Arena strategies.

After the event, those items must be classified into one of four states:

```text
SHIPPED_LIVE
SHIPPED_AS_FALLBACK_OR_ASSET
TESTED_NOT_USED
PLANNED_NOT_COMPLETED
```

Do not leave unchecked pre-show tasks in a form that implies they remain current portfolio obligations.

Suggested reconciliation table:

| Item | Final status | Evidence | Public relevance |
|---|---|---|---|
| `network-rich-v001` | repository-confirmed asset | production archive | high |
| 10 manifest states | repository-confirmed definitions | `states/manifest.json` | medium; onsite use needs check |
| 3840×1382 profile | pre-show working profile | Issue #70 | actual use needs check |
| 4800×1728 profile | pre-show target profile | Issue #70 | actual use needs check |
| Unicode Field | pre-show R&D direction | Issue #70 | do not claim shipped without evidence |
| Stateful Particle Field | pre-show R&D direction | Issue #70 | do not claim shipped without evidence |
| Blender Simulation Zone | pre-show R&D direction | Issue #70 | do not claim shipped without evidence |

Extend this table only with evidence-backed classifications.

---

## 7. Case-study narrative draft structure

Do not publish the full production backlog as the artwork story.

Use a compact case-study structure:

### 01 — Context

ENTROPY was an immersive audiovisual performance presented at GWANTSI XR Studio, Shanghai on 5 September 2026.

### 02 — Role

Ewan Qian developed and performed realtime visual / spatial image work and the supporting live visual system.

### 03 — Spatial problem

The primary visual field was an ultra-wide 25:9 LED environment. The visual system therefore treated the display as a spatial field rather than a conventional widescreen canvas.

### 04 — System

FIELD INDEX separated reusable baked visual structures from camera, layer and state logic, allowing the same canonical asset to support multiple spatial visual states.

### 05 — Performance logic

Describe the actual input / state / phrase / spatial-output relationship only after the final show configuration is verified.

### 06 — Result

Use final live documentation and post-show observations rather than future-facing production language.

### 07 — Archive / reuse

Show how the production asset standard preserves successful spatial structures for later work without claiming that every planned subsystem was completed.

---

## 8. Draft Chinese summary — evidence-safe version

> **ENTROPY** 是一场于 2026 年 9 月 5 日在上海 GWANTSI XR Studio 呈现的沉浸式视听演出。钱誉文参与实时视觉、空间影像与现场视觉系统的创作与演出。项目围绕超宽 LED 空间建立视觉结构，并将可复用的几何/网络资产与相机、图层和状态逻辑拆分，使同一视觉资产能够在不同空间状态之间被重新组织。当前仓库保留了 FIELD INDEX 的生产资产与状态结构；最终公开案例仍需以现场实际使用的输出配置、状态、影像记录与完整 credits 为准。

This summary is intentionally conservative until the shipped-vs-planned reconciliation is complete.

---

## 9. Draft English summary — evidence-safe version

> **ENTROPY** was an immersive audiovisual performance presented at GWANTSI XR Studio, Shanghai on 5 September 2026. Ewan Qian contributed realtime visual performance, spatial image and the supporting live visual system. Developed around an ultra-wide LED environment, the production separated reusable baked visual structures from camera, layer and state logic so that a stable spatial asset could be reorganized across multiple visual states. The repository preserves the FIELD INDEX production asset and state architecture; the final public case study should describe only the output configuration, states and performance behaviours verified as actually used onsite.

---

## 10. Promotion gate

Current lifecycle state: **documented / public-safe**.

Promote to `case-study-ready` only when:

- [ ] final credits are checked;
- [ ] final live media is selected;
- [ ] actual output / mapping configuration is recorded;
- [ ] shipped-vs-planned table is substantially completed;
- [ ] one readable final system diagram exists;
- [ ] the case-study copy is updated from conservative draft to final evidence-backed text.

Until then, ENTROPY remains a high-priority completed project under active packaging — not an unfinished performance and not yet a finished public case study.
