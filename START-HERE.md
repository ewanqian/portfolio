# 从这里继续 / Portfolio Resume
更新：2026-11-07（Asia/Shanghai）  
范围：作品集、CV、媒体恢复和发布维护。此页只保存公开安全的工作状态，不是作品事实数据库。

## 新对话怎么唤起
连接 GitHub 后说：
> 读取 ewanqian/portfolio 的 START-HERE.md 和 AGENTS.md，告诉我现在有什么能做的。

继续执行：
> 继续 portfolio，按 START-HERE.md 领取最高优先级可执行任务，完成验收并保存交接。

收尾：
> 保存当前进度，明确哪些已提交、哪些已上线验证、哪些没做，以及下一步从哪里开始。

连接仓库不保证聊天工具自动载入文件；Agent 必须实际读取当前分支文件。没有写权限时只可给出待提交补丁，不能声称已保存。

## 启动协议
1. 读本页和 AGENTS.md，确认仓库/分支与最近提交；读本页最近更改之后的提交和相关开放 PR，避免重复工作或覆盖其他会话。
2. 读 content/publication-manifest-2026-11.json 和下方发布报告，核对实际产物。历史报告的数字是当时快照，不能当成最新运行结果。
3. 用户只问“有什么能做的”：简述当前阶段、一个首选任务、验收标准和阻塞；至多列三个选项。用户说“继续/做”：执行最高优先级可执行任务。
4. 按 AGENT-HANDOFF-v2.md 执行对应 preflight；只加载相关项目历史、媒体索引和证据，不从头重新规划网站。
5. 本页负责续接；NOW.md 保留创作研究方向；manifest 负责发行产物；database/ 负责事实。遇冲突查原始来源并记录差异，不让进度笔记覆盖事实。

## 当前进度基线
依据本轮读取的 manifest 与发布报告，未重新运行原有网站检查：
| 层 | 已记录结果 | 尚未关闭 |
| --- | --- | --- |
| CV PDF | 正式 R1.2.1 中英各三页、60条链接；网站生成器与正式 PDF 已统一 | Google Drive 另存版本与网站正式 PDF 字节不同，网站版本为准 |
| 永久页面 | 50 项目页、61 履历页、24 母项目关联；R1.2 实际线上 160/160 HTTP/内容校验通过 | 六类页面完整桌面/手机视觉验收与外站视频未完成 |
| 历史内容保护 | 14 条媒体/署名/历史内容保护规则；27 项封面已登记 | MANA/Bilibili 播放、原片恢复及 27 项图片权利待核对 |
| 全项目审计 | 50 项证据账本及精选作品页；61 条履历均有中英文 | 不能代表全部项目都已获独立证据与许可确认 |

当前候选输出为 R1.2.1（排版与短版字段已生成，当前版线上 HTTP 复验尚未结束；旧 R1.2 保留）：共用60条双语选用记录，保持中英各三页肖像版式；正式域名160/160项HTTP与PDF校验码验收通过。旧R1.1文件保留。

## 下一任务队列
状态只允许 ready / active / blocked / done；done 必须有验收依据。一次只领取一项；阻塞时记录原因并转向可独立执行项。

| ID | 优先级/状态 | 工作与第一步 | 验收标准 |
| --- | --- | --- | --- |
| PORT-01 | P0 / active | 发布验收：先读取 publisher 与 health 最新 Actions run，再检查正式域名 CV、archive、项目和履历路径 | 保存 run URL/commit/conclusion；逐URL结果；六类页面手机/桌面截图；失败与未测明确区分 |
| PORT-02 | P0 / ready | 重点媒体恢复：从 TIMER、Drop Flow、VAOE、Kashiwa、观察与共生、二砂中选一项，对照旧文档、Git历史、团队库和现有证据 | 每项有稳定ID、影像清单、来源、署名/权利状态；既有视频和版本关系不丢；相关保护检查通过 |
| PORT-03 | P1 / done | 双语统一生成：先对照 R1.1 HTML、正式60条记录及现有构建器，列字段差异 | 同一审核数据生成网页/中英PDF；保留认可的三页肖像排版；文字/链接/渲染检查及manifest同步 |
| PORT-04 | P1 / ready | 其余项目证据审计：读取证据账本，按缺口逐项搜索一手来源 | 每条记录搜索日期、候选出处、支持范围和未解决问题；搜索不到不等于不存在 |

PORT-01：R1.2 最新生产验证已由旧版 154/154 提升为 160/160（含精确 PDF SHA-256、打印页与 JSON 路由）。旧版浏览器抽查通过；完整 R1.2 六类页面视觉、第三方视频播放和媒体权利审查仍未关闭。

PORT-03 的选用履历→网页/React引用/打印HTML/中英PDF生成及生产HTTP验收已完成。下一步完成 PORT-01 剩余视觉检查；完整Works语义合并和原生Google Docs输出仍独立待办，不能称为全站统一完成。

默认先做 PORT-01。若网络/权限阻塞，留下具体失败信息，推进 PORT-02 的仓库历史恢复。不要反复增加数据库、框架或新样式来代替交付。

## 每轮保存协议
- 开始执行时更新领取任务为 active，记分支/基线提交/本轮范围；连接器写入需用最新文件SHA，冲突后重读合并，禁止强推。
- 在较大里程碑、切换任务或结束前，更新本页任务状态、阻塞与下一条具体操作；详细记录保存到 docs/portfolio-maintenance-os/handoffs/YYYY-MM-DD-主题.md，保留旧记录。
- 交接包含：变更文件/项目ID、事实来源、已生成产物、测试命令与结果、未测项、发布/PR/提交链接、下一步。已提交不等于已上线，HTTP成功不等于视频播放成功。
- 发生发行变化才更新 manifest；未重生成的 PDF 明写未同步。作品、版本、媒体、来源和旧URL继续保留。
- 提交成功后重新读取关键文件核对，并向用户给出提交或PR链接；本地未推送必须明说。
- 不保存私人聊天、合同或其他敏感资料到公开仓库。
- 无新进展时不虚增版本、不把待办改为 done。

## 最近交接
2026-11-07：建立固定续接入口，将其连接到 README、AGENTS、既有 handoff 和 NOW；沿用已存档 R1.1 / permalink 基线。本轮已读取 Actions：部署成功，线上旧版154项中152通过、两份JSON落入SPA首页。新增公开字段导出、61个记录页清理、发布目录兼容JSON。React构建、CV/graph/preservation/portfolio-os检查、本地发布包154项HTTP检查通过；线上HTTP复验154/154通过；桌面项目搜索及手机履历搜索/详情抽查通过，六类页面完整视觉验收和视频仍待做。已恢复61条英文（缺失0），增加60条选用记录的统一生成器、React Profile荣誉引用、双语打印HTML及三页PDF R1.2；本地160/160发布包HTTP检查通过，正式域名160/160项HTTP检查通过，包括两份PDF的SHA-256。详见 handoffs/2026-11-07-public-output-pipeline.md。

## 详细依据
- [本轮批量收尾交接：R1.2、英文补档、独立 Drive 备份及验收边界](docs/portfolio-maintenance-os/handoffs/2026-11-07-r12-batch-closeout.md)
- [操作规约](docs/portfolio-maintenance-os/AGENT-HANDOFF-v2.md)
- [架构](docs/portfolio-maintenance-os/PORTFOLIO-OS-v2-architecture.md)
- [发行清单](content/publication-manifest-2026-11.json)
- [R1.1 发布报告](docs/portfolio-maintenance-os/releases/CV-PORTFOLIO-1.1-2026-11-07.md)
- [永久链接交付报告](docs/portfolio-maintenance-os/releases/P0-PERMALINK-COVERAGE-2026-11-07.md)
- [证据账本](database/evidence-reconciliation-2026-11.json)
- [研究方向](NOW.md)

## 复盘与剩余轮数
[已保存的踩坑经验与轮数预算](docs/portfolio-maintenance-os/reviews/2026-11-07-pipeline-retrospective.md)。
当前估计：R1.2已上线，正式CV/网页管线还需1轮集中视觉与端到端收尾，复杂缺陷预留第2轮；全部历史媒体/权利核查另列长期队列。不要再次翻译已有英文或重写首页来替代验收。R1.1原英文的AI盛典/国家地理两条ID曾倒置；恢复时必须交叉核对中文语义，不能只相信链接ID。

R1.2提交：302e99461e48fb9ae3b37a5d2f6476139fab442f；publisher/build/prepare/graph均成功。2026-11-07正式域名160/160通过；PDF图形版六页本地渲染检查通过。此次连接浏览器的线上视觉复核因origin授权检查不可用而阻塞，不绕过；不要把完整手机验收标为通过。详见 releases/CV-PORTFOLIO-1.2-2026-11-07.md。


## 本轮新增清单（2026-11-07）
- 保存了 [完整踩坑与工程收尾规约](docs/portfolio-maintenance-os/RETROSPECTIVE-AND-RELEASE-RULES-2026-11-07.md)。
- R1.2 由单一 CV 数据生成网页、打印源与正式站点 PDF；60 选用/61 双语记录，生产端 160/160 HTTP 验收。已发布 PDF 原始位置为 `/assets/cv/`，不要再把独立排版的 Drive PDF 视为同 SHA 的正式主文件。
- 新增 `scripts/audit-release-consistency.mjs`，要求 50/61/60 记录计数、14 条保护规则、PDF SHA-256、英文 61/61 一致；历史报告数字只按其发布日期解释。
- **下一次只做 PORT-01 剩余视觉验收（桌面与 390px 手机六类模板）**；若浏览器授权阻塞，转做 PORT-02 重点影像原件/出处，不再重复生成 CV。

## 2026-11-07 · CV 文字校样补丁 R1.2.1
已逐条建立 60 组 cv_zh/cv_en 简版字段，原 61 条 zh/en 详情完整保留；删除 CV 中赘述式“六位合作创作者”“与沈轩合作”等重复短语，保留证书和详细页。见 [文字规范](docs/cv-publication/CV-COPY-STYLE-2026-11.md) 和 [版本报告](docs/portfolio-maintenance-os/releases/CV-PORTFOLIO-1.2.1-2026-11-07.md)。新版仍为 3 页/60 链接；网站发布链接已自动切换到 R1.2.1。**R1.2.1 的新一轮线上 160 路由 HTTP 和手机端逐页审阅仍待完成**，不要把旧 R1.2 的 160/160 记录套用到本版。

## 2026-11-07 · Personal Atlas / Timeline / Cabinet 扩展
- 已建立 41 个公开词条（26 百科、6 研究、4 笔记、5 空间扫描片段；沿用 `public/data/ewan-encyclopedia.json` 和 `database/active_practice.json`），生成 `works/atlas/*.html` 和 `works/atlas.html`。
- `works/cabinet.html` 首件藏品：@onefive《CLASSY CRUSH》签名 CD 封套原有照片，关联分号 C 制作档案；不能据此证明该唱片封套的设计或 ChocoLove 的个人职务。
- `works/timeline.html` 已按年份分组 61 条正式 CV，不是假设所有日期精确可排序。
- 微信个人朋友圈当前无已连接官方数据入口；Instagram 专业号需单独 OAuth，普通个人号从官方数据下载入手。私人素材必须先存在 `inbox/private/`（Git 忽略）经审阅再公开。
- 61 履历内容补充基础账本：24 条母项目关系、26 条外部来源候选、20 条项目影像候选。模板已更新为短标题＋完整中英文记录＋关系与候选出处；实际部署须按本轮最新提交检查。
- 参照 `docs/portfolio-maintenance-os/SOCIAL-ATLAS-INGESTION.md` 与 `docs/portfolio-maintenance-os/CV-61-RECORD-ENRICHMENT-2026-11-07.md`。

## 2026-11-07 · Personal Atlas v1 已完成可访问的第一版

- 41 个 Atlas 独立词条、1 件 Cabinet 实物、按 61 条 CV 组织的 Timeline 均已公开；主页/全站导航链接已接入，搜索隐藏、作者关系、空白占位及 @onefive CD 错配已修。
- 站点发布、graph health 和 archive smoke 均成功。正式域名 [205/205 HTTP/内容/媒体类型核验通过](https://github.com/ewanqian/portfolio/actions/runs/42388082724)，41 个词条页逐条覆盖；这是机器 HTTP 验证，**不是移动端完整视觉验收**。
- [本轮具体交接](docs/portfolio-maintenance-os/handoffs/2026-11-07-personal-atlas-first-release.md)。接下来的 PORT-01 仍做 390px 手机与桌面视觉检查、媒体播放器人工核验，不再重复造词条或导入社交数据。

## 2026-11-08 · PORT-01 六类模板真实 Chromium QA

- 由 Actions 运行真实 Chromium：1440px 桌面和 390px 手机各 6 页，**最终 12/12 通过**，附全页 PNG 截图及机器 JSON 诊断：[visual QA run 42402410843](https://github.com/ewanqian/portfolio/actions/runs/42402410843)。
- 修复首页语义 `h1`、TIMER 归档图像加载和图片源登记表不同步；旧缓存与懒加载图片造成的误判已经在检测流程中区分。
- 之前已通过 205/205 正式域名内容/路由检查。现在 PORT-01 的工程性视觉/交互回归完成，**尚未逐张人工审美核对截图、未测试 Bilibili/MANA 实际播放，未完成媒体权利确认**，不可标注整项 done。
- 详情：[2026-11-08-browser-qa-12-of-12.md](docs/portfolio-maintenance-os/handoffs/2026-11-08-browser-qa-12-of-12.md)。下一步仅做重点视频播放或已存截图的人工视觉复核；若被访问权限阻塞，启动 PORT-02 原片恢复。
