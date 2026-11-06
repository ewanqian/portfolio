# Portfolio OS 2.0 — 统一作品、履历、证据与发布系统
**Architecture decision record | 2026-11-06 | owner: Ewan Qian | status: staged implementation**

> 目标不是把 GitHub 变成一个巨型数据库，而是让创作者只维护一次事实，自动生成多种适合阅读和合作决策的呈现。档案永久，展示可随时重组。迁移期不要删除历史文件、旧链接或合作署名。

## 0. 北极星：能帮助三种人做决定

| 读者 | 30 秒 | 3 分钟 | 深入 |
| --- | --- | --- | --- |
| 策展人、研究者 | 艺术家是谁、核心作品、展出与获奖 | 3–5 个作品，概念、形式、机构、影像、独立/合作署名 | 展出版本、研究史、论文、图像与证据 |
| 品牌、技术/舞台客户 | 能解决什么现场问题、服务边界 | 3 个商业案例：问题→角色→技术→交付→结果 | 屏幕、播控、制作流程、场地、可重复能力 |
| 合作音乐人、艺术家 | 声音与视觉如何一起被表演 | 代表合作，输入→映射→舞台运行→视频 | 实时系统、控制接口、作品谱系、研究日志 |

**首页不等于完整 CV。** 首页只讲清身份和精选，CV 负责可核实的履历，Archive 保存完整历史，Work Page 让人感知作品，Production/Services 让潜在委托方判断合作方式。

## 1. 当前事实，不要假装已经完成统一

截至 2026-11-06 检查：
- `database/works.json`: **40** 个内部作品对象（对象积累源）；`database/canonical_names.json`: 4 个命名覆盖。
- `content/project-registry-2026-11.json`: **49** 个公开母项目，只有 **21** 个与内部作品对象 ID 直接相同。其余既有不同版本，也有真实缺口；**不可凭文字相似强制合并**。
- `content/cv-records-2026-11.json`: **61** 条履历；约 **60** 条尚无独立英文内容，**43** 条无明确母项目 ID（教育等允许无母项目，但仍需要记录类型）。
- 项目索引：**29/49** 指向某个封面路径，不代表文件及授权通过检查；**10/49** 指向独立详情网页。
- 构建器 `scripts/build-content.js` 目前仍从 `content/works/*.json` 生成 React 数据；新版 project registry 和 CV JSON 尚未成为全站唯一构建输入。
- 旧 `AGENTS.md` 指定 `database/works.json` 为对象来源、`database/canonical_names.json` 为命名来源。**这与后来称 project-registry 为“唯一数据库”的口径冲突。**

### 关键决议

**先规范现有 Git + JSON，不新增在线 SQL/向量数据库。** 当前规模有限，真正的瓶颈是结构不一致、证据缺失、发布脚本不共用、双语和媒体引用未标准化。只要读取和编辑需求主要由你与 Agent 完成，Git 文件是合理的结构化知识库，并且能离线使用、回滚、审查改动。

**目标状态（有顺序地迁移，不要在一轮里同时重写全部历史）：**
1. `database/` 存作品身份、来源事实、人员、场地和版本关系，最终以稳定 ID 为准。
2. `projects/` 保存长篇制作记录和人工策展判断。
3. `content/` **从已审核对象生成公开视图**：艺术项目、演出记录、制作案例、奖项、课程、媒体、文章、服务摘要。
4. `react/src/data/generated/`、网页、CV/PDF、sitemap/JSON-LD 都是**衍生物**，永不作为唯一事实来源。
5. `content/project-registry-2026-11.json` 与 `content/cv-records-2026-11.json` 暂作为**迁移期的公开快照及永久 URL 注册表**，后续接入自动生成；它们不是第三份事实来源。
6. 所有 ID 映射用显式 alias/crosswalk 表，不凭名字猜。对同一艺术作品的不同展出记录使用 presentation ID；不同作品不能因为合作艺术家、地点相同而强行合并。

## 2. 对象图（语义统一，不要求一夜之间拆成八个新数据库）

```text
Artist / People / Organizations
       | credits / roles
       v
Work (稳定身份) ←-- Version (媒介/系统或创作阶段)
       |                 |
       +---- Presentation (具体的一次展览/演出)
       |            |
       |            +---- Award / CV Occurrence (具体奖项、日期、机构与角色)
       |
       +---- Assets (原件、封面、图集、视频、授权与 sha256)
       +---- Sources (证书、机构、录像、报道、现场文档)
       +---- Essays / Research (批评、过程与方法)
       +---- Audience Views (首页、服务、精选、CV、英文版)
```

**常见字段：**
- Work: `id`, `title_zh`, `title_en`, `aliases`, `summary`, `authors`, `collaborators`, `my_role`, `category`, `rights`, `updated_at`.
- Presentation: `id`, `work_id`, `edition_label`, `event`, `venue`, `date`, `role`, `credits`.
- Source: `id`, `url_or_path`, `source_type`, `publisher`, `date`, `retrieved_at`, `claim_ids`, `confidence`, `rights`.
- Asset: `id`, `work_id`, `source`, `sha256`, `credit`, `license`, `caption_zh/en`, `renditions`, `status`.
- Claim/CV entry: `id`, `type`, `date`, `claims`, `work_id?`, `presentation_id?`, `evidence_ids`, `verification_state`, `publication_state`.

**不要混淆**：项目=艺术作品；呈现=作品在特定时间/空间的一个版本；奖项=组织对特定作品/呈现的一项具体认可；视频=证据和媒体，不是新项目。

## 3. 可阅读性与重组

采用 *layout tokens + content schema + display profile* 三层，禁止复制全文来改视觉：
- **Shared shell**：统一导航、标题、返回路径、移动端、字体、对比度、署名、页脚、更新时间、站点域名。
- **Archive theme**：高可读、灰白/黑白、密集但分层、检索、可引用；所有 CV record、Award、Education、Source 页面使用。
- **Artwork theme**：允许黑场、满屏、WebGL、XR、视频与作品自有世界；但共享面包屑、信息抽屉、关键事实和档案链接。
- **Profile views**：`artist_30s`, `curator_3min`, `production_3min`, `research_deep`, `full_cv_zh`, `full_cv_en`。这些应当选择和排序相同的对象，不另外复制项目事实。

用户 30 秒以内要看到：“Ewan Qian / 媒体艺术家、现场视听和空间影像 → 一句个人定位 → 三个代表作品（真实影像）→ 可合作能力 / 联系入口”。
3 分钟内要看到：“3–5 个案例：制作背景、我做什么、影响或展览、现场图/视频、引用证据”。
深入访问才看细节技术、历史版本、笔记与全部 CV。

**CV 的意义不是 show off 数量。** 每条 CV 与主页应各有表达用途：艺术成果、合作资格、执行能力、研究能力。弱但真实的记录可在 Full Archive 保留，不必同等权重出现在精选 CV。

## 4. 更新与审核工作流

```text
新素材/新外部链接
→ Intake（独立于公开页面；是否有版权/隐私/证据？）
→ Normalize（稳定 ID、日期、别名、署名、来源）
→ Verify（机构官网、演出物料、团队署名交叉印证；保留不确定性）
→ Curate（决定它出现在 30 秒、3 分钟还是深档案）
→ Build（网站/中英 CV/社交图像由相同已核准事实导出）
→ QA（ID、链接、图片、中文禁则、双语、显示与移动端）
→ Publish（保留不可变 URL，旧路径重定向）
→ Monitor（定期检查 HTTP、媒体和过期证据）
```

**自主 Agent 的权限界限：**
- 可自动：搜集候选资料、建立待审证据、查重、计算哈希、建议别名、对比版本、检测路由/图片、生成 PR。
- 人工或明确授权后：确认获奖/作者身份、纠正职业事实、允许发布敏感素材、替换正式封面/公开介绍、删除旧路由。
- 不得：因网页标题相似就合并作品；自动将推测写入对外 CV；用不相干图片兜底；为 SEO 生成不存在的奖项；在无访问权限时宣称链接验证成功。

### 发布门槛

- **入库**：允许不完整，保留日期、来源、待办。
- **公开档案**：机构、时间、角色、至少一个有效出处、署名准确、权限明确；若尚未证实，保留为明确标注的候选，而非“已获奖”。
- **精选作品**：进一步要求强封面/视频、完整职责、内容质量、中文英文可读、代表性足够高。
- **商业服务**：还要有实际可交付物、屏幕/硬件/媒介能力边界和明确联系人/咨询入口。

## 5. 质量与 SLA（作为可测目标，而不是当前完成状态）

| 目标 | 目标值 | 机制 |
| --- | --- | --- |
| 已发布的 CV 每条有稳定记录入口 | 100% | 路由生成与唯一 ID 检查 |
| 首页/精选项目无错误图片或死链 | 100% | 预发布媒体检查与站点实际 HTTP 检查 |
| 已发布中英 CV 的条目语义一致 | 100% | 双语字段缺失时禁止进入正式双语精选版 |
| 对外获奖不夸大、署名不丢失 | 100% 人工确认 | Claim → Source → Credit 复核 |
| 已发布页面引用权属明确的媒体 | 100% | 资产清单 + 许可状态 |
| Agent 更新后不会覆盖过往已审核事实 | 每次合并复核 | PR diff + 快照测试 |
| 新材料处理可追溯 | 100% | Intake → Evidence → Approved → Release 事件记录 |

**检查不是修复**：检查脚本可以自动找到问题；机器只能提出 PR 或标记红黄绿。事实与版权相关修复必须回到来源确认。

## 6. 维护节奏与后续迁移

**P0（冻结新首页改版，先把发布源连通）：**
1. 列出 40→49 ID 映射的 19 个非直接匹配对象。逐条归类：同根不同版本、别名、缺项、独立项目。
2. 让 React Works/Archive 读取统一项目 ID；停止新增手写的平行项目列表。
3. 为 CV 加中英文结构化视图，确保 Google Docs 不再是事实源，与发布 PDF 做 release manifest 关联。
4. 处理误导性未核实奖项及未授权媒体、错图/坏链。

**P1（观众能快速理解你）：**
1. 30 秒主页、策展 3 分钟、制作合作 3 分钟三个筛选视图。
2. 定义公共视觉 Token、Header/Footer、记录页/艺术页/生产案例页三套模板。
3. 为主项目补强真实图像、视频与角色说明。

**P2（自动发现与保存）：**
1. 周度媒体/外链监控，官网、艺术机构、合作作者、主办方、视频发布页面等设定可信来源。
2. 候选来源入箱，保留 URL/抓取日/引用、去重与权属说明，由 Agent 建草案、人工核准。
3. 视数据增长再考虑 SQLite/Supabase；**不要为了“数据库”而搬家**。视频/高清原片使用独立对象存储与多副本，不把大视频扔进 Git。

## 7. C2PA 与区块链

本阶段只做媒体源文件和 SHA-256 清单、长期备份、日期和授权记录。C2PA 可用于合规的内容来源声明与防篡改证据，**不能证明署名一定真实或版权必然归属**。区块链时间戳只在合同、发行或明确第三方不可变证明需求存在时另作试点；不要替代来源、法律文件或 Git 历史。

## 8. 本轮落地文件

- `scripts/audit-portfolio-graph.mjs` — 检查 ID/引用/缺失路由、英语字段、媒体路径（无破坏行为）。
- `.github/workflows/portfolio-health.yml` — 主分支及 PR 触发，周一例行执行，保存 JSON 报告；**不自动修改作品**。
- `AGENTS.md` — 项目经理和其他 Agent 先读本决议、执行检查。
- `content/publication-manifest.json` — 中英 CV、网站当前基准版本、同步状态。
- 后续必须实现的：**中英 PDF 从统一数据生成、迁移 crosswalk、公开链接现场监测、完整图像许可记录、真正的视觉 QA**。本文件明确不声称它们已经完成。
