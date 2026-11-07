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
| CV PDF | R1.1 中英各三页、各60条链接；哈希及 Drive 入口见 manifest | 尚未由统一事实数据自动生成 |
| 永久页面 | 报告记录50项目页、61履历页、24条母项目关联、128 sitemap URL | 最新 Actions、实际 HTTP 与手机/桌面显示未验收 |
| 历史内容保护 | 报告记录11条规则通过源码检查；已恢复部分 TITAN/VAOE 等历史资料 | 视频真实播放、媒体权利与全部历史素材恢复未完成 |
| 全项目审计 | 已建立证据账本与优先项目页面 | 不等于每个项目已被独立来源验证 |

当前正式输出正升级至 R1.2：共用60条双语选用记录，保持三页肖像版式；等待本轮生产部署验收。旧R1.1文件保留。

## 下一任务队列
状态只允许 ready / active / blocked / done；done 必须有验收依据。一次只领取一项；阻塞时记录原因并转向可独立执行项。

| ID | 优先级/状态 | 工作与第一步 | 验收标准 |
| --- | --- | --- | --- |
| PORT-01 | P0 / active | 发布验收：先读取 publisher 与 health 最新 Actions run，再检查正式域名 CV、archive、项目和履历路径 | 保存 run URL/commit/conclusion；逐URL结果；六类页面手机/桌面截图；失败与未测明确区分 |
| PORT-02 | P0 / ready | 重点媒体恢复：从 TIMER、Drop Flow、VAOE、Kashiwa、观察与共生、二砂中选一项，对照旧文档、Git历史、团队库和现有证据 | 每项有稳定ID、影像清单、来源、署名/权利状态；既有视频和版本关系不丢；相关保护检查通过 |
| PORT-03 | P1 / active | 双语统一生成：先对照 R1.1 HTML、正式60条记录及现有构建器，列字段差异 | 同一审核数据生成网页/中英PDF；保留认可的三页肖像排版；文字/链接/渲染检查及manifest同步 |
| PORT-04 | P1 / ready | 其余项目证据审计：读取证据账本，按缺口逐项搜索一手来源 | 每条记录搜索日期、候选出处、支持范围和未解决问题；搜索不到不等于不存在 |

PORT-01 当前已定位两份 JSON 未复制到自定义域名发布目录，修复已通过本地154项HTTP检查，正式域名已通过154/154项HTTP检查；浏览器验证了50项目加载、TITAN筛选、61履历加载、南昌路检索及详情跳转，手机宽度抽查无横向溢出；六类页面全量视觉/视频验收仍未完成。

本轮优先关闭 PORT-03 的 R1.2 发布验收，再完成 PORT-01 剩余视觉检查。

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
2026-11-07：建立固定续接入口，将其连接到 README、AGENTS、既有 handoff 和 NOW；沿用已存档 R1.1 / permalink 基线。本轮已读取 Actions：部署成功，线上旧版154项中152通过、两份JSON落入SPA首页。新增公开字段导出、61个记录页清理、发布目录兼容JSON。React构建、CV/graph/preservation/portfolio-os检查、本地发布包154项HTTP检查通过；线上HTTP复验154/154通过；桌面项目搜索及手机履历搜索/详情抽查通过，六类页面完整视觉验收和视频仍待做。已恢复61条英文（缺失0），增加60条选用记录的统一生成器、React Profile荣誉引用、双语打印HTML及三页PDF R1.2；本地160/160发布包HTTP检查通过，等待新生产验收。详见 handoffs/2026-11-07-public-output-pipeline.md。

## 详细依据
- [操作规约](docs/portfolio-maintenance-os/AGENT-HANDOFF-v2.md)
- [架构](docs/portfolio-maintenance-os/PORTFOLIO-OS-v2-architecture.md)
- [发行清单](content/publication-manifest-2026-11.json)
- [R1.1 发布报告](docs/portfolio-maintenance-os/releases/CV-PORTFOLIO-1.1-2026-11-07.md)
- [永久链接交付报告](docs/portfolio-maintenance-os/releases/P0-PERMALINK-COVERAGE-2026-11-07.md)
- [证据账本](database/evidence-reconciliation-2026-11.json)
- [研究方向](NOW.md)

## 复盘与剩余轮数
[已保存的踩坑经验与轮数预算](docs/portfolio-maintenance-os/reviews/2026-11-07-pipeline-retrospective.md)。
当前估计：本轮交付R1.2后，正式CV/网页管线再需1–2轮收尾（取决于生产部署与完整响应式验收）；全部历史媒体/权利核查另列长期队列。不要再次翻译已有英文或重写首页来替代验收。R1.1原英文的AI盛典/国家地理两条ID曾倒置；恢复时必须交叉核对中文语义，不能只相信链接ID。
