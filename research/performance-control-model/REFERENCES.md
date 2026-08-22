# Performance Control Model — References v0.1

> 这不是为了给项目堆理论名词，而是记录哪些外部研究真正改变了系统判断。后续每新增一篇，必须写清“它改变了什么”，没有作用的参考不进入核心阅读。

---

# A. Control / Cybernetics

## Qian Xuesen — *Engineering Cybernetics* (1954)

用途：理解 feedback、dynamic system、stability、control、switching、disturbance 等工程控制问题如何跨具体机器使用。

- Google Books: https://books.google.com/books?id=NfgvAAAAIAAJ

本项目不复制其数学推导，而借用一种思考方式：

> 不先问系统由多少功能组成，而问系统的状态是什么、怎样被控制、受到扰动后是否还能到达目标。

---

# B. Digital Musical Instrument / Mapping

## David Wessel, Matthew Wright — *Problems and Prospects for Intimate Musical Control of Computers* (NIME 2001)

https://www.nime.org/proc/nime2001_wessel/index.html

对本项目的作用：

- low entry fee / high ceiling；
- low and stable latency；
- gesture 与结果之间需要足够清楚；
- 新手可进入并不意味着系统只能很浅。

## Andy Hunt, Marcelo M. Wanderley, Matthew Paradis — *The Importance of Parameter Mapping in Electronic Instrument Design* (NIME 2002)

https://nime.org/proc/nime2002_hunt/

对本项目的作用：

- Mapping 不是接线细节，本身会改变 instrument character；
- 不能把 Controller / WebAudio / Canvas 本身当成乐器；
- 输入与多个系统参数之间的关系值得被设计。

## Joel Chadabe — *The Limitations of Mapping as a Structural Descriptive in Electronic Instruments* (NIME 2002)

https://www.nime.org/proc/nime2002_chadabe/index.html

对本项目的作用：

- 当系统自身包含复杂 algorithmic behaviour 时，`gesture → parameter` 已经不足以解释全部关系；
- 支持本项目从简单 Mapping 转向 `Input → State Change → System Behaviour`。

---

# C. Performance-first / Audiovisual Instrument

## Alon Ilsar, David Hughes, Andrew Johnston — *NIME or Mime: A Sound-First Approach to Developing an Audio-Visual Gestural Instrument* (NIME 2020)

https://www.nime.org/proc/nime2020_60/index.html

对本项目的作用：

- 先用已经存在的 sound / visual 进行 mime performance；
- 通过真实表演观察动作—结果关系，再实现 mapping；
- 直接支持 `Performance first, instrument second`。

## Sam Trolland, Alon Ilsar, Jon McCormack — *Visually-Led Design for Gestural Audiovisual Instruments* (NIME 2025)

https://www.nime.org/proc/nime2025_45/index.html

对本项目的作用：

- Visual 不必永远是 Sound 的 reactive result；
- Visual scene 也可以反向产生 gesture、sound 与 composition；
- 有意识的限制可能帮助形成更清晰的 instrument identity。

---

# D. Longevity / Repertoire / Practice

## Fabio Morreale, Andrew McPherson — *Design for Longevity: Ongoing Use of Instruments from NIME 2010–14* (NIME 2017)

https://www.nime.org/proc/nime2017_fmorreale/index.html

对本项目的作用：

- 新乐器“做出来”不等于会长期存在；
- signature feature、独有 playing style、持续 practice 很重要；
- 推动本项目从 Golden Demo 继续发展 repertoire，而不是停在 prototype。

## Adnan Marquez-Borbon, Juan Pablo Martinez-Avila — *The Problem of DMI Adoption and Longevity: Envisioning a NIME Performance Pedagogy* (NIME 2018)

https://www.nime.org/proc/nime2018_marquezborbon/index.html

对本项目的作用：

- 支持 Workshop → Practice → Rehearsal → Performance 的长期路径；
- 一次 workshop 不能替代真正的演奏练习。

---

# E. Audience / Agency / Liveness

## Liveness through agency and causality in digital musical instrument performance

NIME 相关研究入口：

https://www.nime.org/proc/nime2015_hlimerick/

对本项目的作用：

- performer 自己知道在控制什么，不代表 audience 能感到 causality；
- 自动化越多，越需要检查人的判断是否仍然在舞台结果中有可感知后果；
- 支持 audience-only test 与 performer agency test。

---

# F. Reference products / practices — not academic proof

这些不是用来“证明理论”的论文，而是具体交互和表演结构参考。

## Patatap

https://patatap.com/

观察：极低进入门槛、keyboard trigger、即时 sound + visual identity。

研究问题：怎样保留即时性，同时避免停在 one-shot trigger？

## touch:waves / R-MONO Lab related browser A/V interaction references

作为键盘 / touch audiovisual cell 的设计参考。公开来源需要继续整理并核实 canonical developer page。

研究问题：一个输入怎样本身成为完整的 1–4 秒 audiovisual behaviour？

## PlayGround / Organic Remix

作为 safe musical interaction / touch remix 的产品参考。后续需要补官方或更稳定的 archive source。

研究问题：怎样把 tempo、pitch、phrase boundary 等容易出错的音乐复杂度放到系统内部，让普通用户主要操作结构？

---

# G. To research next

以下主题需要继续补论文 / 专业资料：

- DJ set long-form energy allocation
- automatic / assisted DJ transition analysis
- phrase-aware mixing
- adaptive music / vertical re-orchestration
- horizontal re-sequencing
- interactive music systems for games
- concert show control
- lighting dramaturgy / lighting console cue structure
- live drummer fills / accent architecture
- audience attention in audiovisual performance
- model predictive control as an analogy for AI arrangement planning

每一条后续研究都要回答：

> **它具体能改变哪个 Demo、哪个控制变量、哪个测试方法？**

如果回答不了，就不进入核心教材。
