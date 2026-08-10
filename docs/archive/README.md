# Ewan Portfolio Archive Registry

> 目的：保留历史链接与 Git 过程，但防止旧文档、重复页面和 superseded PR 再次成为事实源。

## 状态定义

- `canonical`：当前唯一主入口，继续维护
- `redirect`：旧 URL 兼容入口，只跳转 canonical
- `legacy-reference`：历史资料，可用于理解演化，不用于生成当前事实
- `superseded`：已被新架构取代，不再继续维护

---

## Public Program

### canonical

`docs/public-programs/README.md`

[长期工作坊项目内容介绍](../public-programs/README.md)

### redirect

`docs/public-program/README.md`

旧“2026 年 8 月公共项目介绍”路径已经改为兼容跳转页，不再保留第二份正文。

---

## TIMER

### personal canonical

`visual-arts/timer-series/README.md`

### team canonical

`VIRTURA-Collective/works/timer/README.md`

### archive canonical

`VIRTURA-SpacePort/organization/works/timer-series/README.md`

### redirect / compatibility

- `VIRTURA-Collective/works/timer.md`
- `VIRTURA-SpacePort/organization/works/timer.md`

这些旧路径保留，但正文与版本更新只进入 series 目录。

---

## Drop Flow

### personal canonical

`visual-arts/drop-flow-series/README.md`

### team canonical

`VIRTURA-Collective/works/drop-flow/README.md`

### archive canonical

`VIRTURA-SpacePort/organization/works/drop-flow-series/README.md`

### redirect / compatibility

`VIRTURA-Collective/works/drop-flow.md`

---

## Personal Facts / Biography

### canonical

- `docs/encyclopedia/README.md`
- `docs/encyclopedia/claims-ledger.md`
- `public/data/ewan-encyclopedia.json`
- `public/data/ewan-media-index.json`
- `docs/encyclopedia/KNOWLEDGE-MAP.md`

### legacy-reference

- `projects/projects-credits-full.md`
- `PORTFOLIO_RESTRUCTURE_20260807.md`
- 历史 PDF / 旧版 Profile 文稿

这些资料可以补证据、理解旧口径，但如果与当前结构化事实层冲突，必须回到项目原始 source 核验。

---

## Pull Requests

### merged / integrated

- PR #11 — verified production records
- PR #12 — homepage / workshop infrastructure
- PR #13 — unified content generation
- PR #17 — personal encyclopedia + Agent data layer

### superseded

- PR #9 — old profile branch；有用文案只能经过当前百科重新提取
- PR #16 — old venue-programme/encyclopedia branch；有效内容已由 PR #17 重建并合并

---

## Cross-repository machine bridge

SpacePort 已提供：

`api/ewan-portfolio-bridge.json`

它把团队 / 档案 `object_id` 映射到 Ewan 个人百科 `encyclopedia_id`，用于 Agent 从团队知识图回到个人事实层。

---

## Agent Rule

当 Agent 访问到旧文件时：

```text
legacy / duplicate path
        ↓
查 Archive Registry
        ↓
找到 canonical path
        ↓
读取 Encyclopedia / source record
        ↓
再生成 Bio / CV / Proposal / 页面
```

禁止直接用 `legacy-reference` 或 `superseded` 文档生成当前履历事实。

---

## 删除策略

第一阶段**不物理删除**历史路径。

先用 redirect 与 registry 保证：

- 旧链接不失效
- 历史提交可追溯
- Agent 不再误读
- canonical 足够明确

只有确认外部引用已经迁移、自动检查没有依赖后，才考虑删除真正无价值的重复文件。
