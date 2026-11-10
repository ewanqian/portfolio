# 2026-11-11 · Profile、CV 与 VIRTURA 入口审查

## 范围与状态

用户要求：团队人物介绍取消“合作艺术家”及解释性署名文案；更新个人介绍；检查个人站、团队站的主要导航和有价值但未持续维护的内容。

本轮是内容与入口修复，不是视觉改版。个人站基线 `f34a468ed8018ea3164cc66a66d9db82c710846d`，分支 `fix/profile-copy-navigation-audit-20261111`。团队站基线 `401a7b3621663518b81ffd251239e66e984606ee`，对应分支 `fix/team-bios-site-audit-20261111`。

状态：代码已提交到独立分支，等待 PR 审查及发布验收。没有直接推送 main，没有重新生成 PDF，也没有声称正式网站已更新。此文件补充 PORT-01 的入口检查，不关闭其完整浏览器验收。

## 已修改的个人站源码

1. `react/src/pages/Profile.jsx`：重写中英文简介、艺术家陈述、方法和合作介绍；删去面向编辑者的页面说明与重复的署名提醒。近期实践说明 BPM System 2026、空间手部输入和可表演音乐；后两者明确为实验与原型，不新增完成的演出、奖项或职位。
2. 章节导航从裸 `#profile-*` 改为 React Router 的 `/profile` + `state.scrollTo`，复用 `App.jsx` 现有滚动逻辑。原写法会覆盖 HashRouter 的 `#/profile` 路由。
3. 个人介绍首屏、履历章节、全站 Footer 统一提供 `/works/cv.html`。中文和英文均先到 CV 发布入口，避免英文直接跳打印版、访客找不到下载入口。
4. 六张作品卡接入现有路由：`/works/timer`、`/works/drop-flow`、`/projects/kashiwa-titan`、`/projects/yujiayun-45m2`、`/projects/rain-singapore`、`/gaussian-scenes`。这些目标已与 `App.jsx` 对照；两个 `/works/` 入口使用既有静态页转接规则。
5. 保留六张个人图片和现有 CSS 类；肖像路径按根站与 `/portfolio` 前缀选择，不再固定只引用兼容前缀。根目录 `assets/profile/` 的六个文件已通过 GitHub contents 返回确认。
6. `Footer.jsx` 只新增 CV 链接，不扩充一级导航、不调整网站架构。

个人站代码提交：`4fc052b8ae1663e10f2081bbb4787020051b9459`、`29ca4ab7b5bb19fd3a303c928ac71ecea8f708dd`。

## 当前可追踪的入口分工

| 入口 | 用途 | 修复策略 |
|---|---|---|
| `/#/profile` 与 `/portfolio/#/profile` | 正式个人简介与实践概览 | 两种入口保留；章节导航不得破坏路由 |
| `/#/works` | 精选艺术作品 | 保持精选，不将所有实验升格为作品 |
| `/#/production` | 制作项目 | 与作者作品区分；从个人介绍和作品资料相互连接 |
| `/works/cv.html` | CV 页面与正式 PDF 下载 | 作为共享入口；版本与 manifest 一致 |
| `/works/cv-records.html`、`/works/records/{id}.html` | 履历索引与详细记录 | 保留永久链接，不全部重定向首页 |
| `/#/writing` | 写作与研究 | 从个人介绍、相关案例进入具体文章 |
| `/#/apps` | 应用与实验入口 | 连接实际体验，不把仓库说明页当应用 |
| `/works/atlas.html`、`/works/timeline.html`、`/works/cabinet.html` | 图谱、时间线、收藏室 | 继续作为次级入口，不增加新一级栏目 |
| `virtura.space/#people` | 团队成员介绍 | 专业简介，不用合作关系免责声明代替人物介绍 |

以上是源码与路径契约检查，不是所有生产页面均已被浏览器点击验收的声明。

## 新鲜度：修改日期不能替代内容审查

- GitHub main 上，`Profile.jsx` 最近一次修改是 **2026-11-07** 的 CV 发布提交 `302e99461e48fb9ae3b37a5d2f6476139fab442f`。文件日期很新，但简介仍保留旧的编辑备注和阶段性叙述。因此不能单凭 mtime 或最近提交判断内容已更新。
- `content/publication-manifest-2026-11.json` 记录当前 CV 为 **R1.2.1 / 2026-11-07**。不是需要重做一份旧 CV；本轮修复其访问入口。清单明确区分历史 R1.2 的 160/160 HTTP 结果与 R1.2.1 尚待完成的新一轮生产验收，不能混用。
- `database/active_practice.json` 的 `updatedAt` / `lastReviewedAt` 仍为 **2026-10-29**，预定复核为 **2026-11-05**。这份维护状态已落后于 11 月的文章与应用工作；需要对照具体产物更新，而不是直接把研究标为完成。
- 项目发生时间、文章原始发布日期、内容修订时间、最近验证时间应该分别解释。旧作品不因年份早而降级；没有实质修订，不批量改成今天。

## 值得优先维护的内容

以下为编辑优先级判断，不是对尚未审阅的全部影像进行质量评分。

| 优先级 | 内容 / 已知入口 | 当前证据与问题 | 下一项可验收交付 |
|---|---|---|---|
| P1 | ENTROPY / FIELD INDEX；`docs/journal/entropy-two-screen-2026.md` | 状态表记录 2026-09-05 已发生的演出，仍缺最终媒体挑选及实际交付与原计划的对照 | 完成一页演后案例：现场片段、最终画面、系统说明、实际职责；不继续只展示制作计划 |
| P1 | REACTOR / BPM System；`/#/writing/reactor-bpm-system-2026` | 已有正式研究文章，状态表仍写多处资料分散；两者没有充分对齐 | 从个人介绍与相关案例直达文章；把已证实的日期、场地、职责、现场素材整理到既有项目记录 |
| P1 | 后续评论；`/#/writing/after-bpm-system-from-sync-to-work-2026` | 2026-11-05 已发布的系统反思文章，具有承接前文与当前研究的价值 | 与 BPM 正文、工作坊、当前实验相互连接；保留原发布日期，不重复生成同题文章 |
| P1 | TIMER / Drop Flow；`/works/timer.html`、`/works/drop-flow.html`；团队 `work/ufo-circular-series.html` | 已有长期作品和多版本档案；不同展演版本、媒体与个人/团队叙述需要对照 | 补代表片段、版本时间线与详情页 credit；人物简介不重复声明“分别署名” |
| P1 | 空间采集与二砂；`/#/projects/system-ersha`、团队 `work/system-ersha.html` | 现有个人与团队入口，可支撑扫描、重建、空间影像的方法表达 | 保持一致的项目名与职责，补采集到最终影像的案例过程；不得把全部影片制作归为个人独立完成 |
| P2 | Stage Casting 04、空间手部输入、可表演音乐 | 研究线仍在开发；状态表的 2026-12-04 是目标时间，不是已完成履历 | 从 Apps 或 Writing 进入可用实验，标明设备与验证边界；不要直接加入已完成 CV |

## 剩余导航与内容问题

### 个人站

- **P0 / 发布验收**：从根站及用户实际使用的 `/portfolio/#/profile` 分别验证中英文、七个章节、六个作品入口、CV 页和两个 PDF、浏览器后退及移动端。生产抓取失败或 SPA 无可提取正文不等于 HTTP 404。
- **P1 / Apps 路径**：既有 PR #156 已处理 XR Creations 从 Markdown 表格转向实际站点的入口及发布流程。本轮没有复制修改或合并该 PR。需跟进其自身 CI、部署与设备验收。
- **P1 / 容错**：所审 `App.jsx` 没有通用未知路由页面。应另加有作品/CV 返回入口的未找到页面，并保留已公布的旧 URL 映射。
- **P1 / 信息维护**：复用 `database/`、`content/` 和现有生成器，减少 Profile、Works 摘要和 CV 的漂移；不要再新增一套数据库或全文搬迁。

### 团队站

- **P0 / 人物文案**：另一个分支已修改两人角色与简介，并将栏目名改为 Team。照片、其他四人、项目详情署名及版式保留。
- **P1 / 英文完整度**：`index.html` 的合作方式正文、流程正文、咨询表单仍有未纳入语言切换的中文；`assets/lang.js` 只设置语言属性、按钮和元信息，没有替这些文本翻译。需要补齐中英文，而不是仅更换导航标签。
- **P1 / 咨询转化**：表单只调用 `mailto:studio@virtura.space`，不会直接向服务器提交。代码已经提示打开邮件客户端；仍需验证目标邮箱确实可收信，并增加复制简报等失败回退。没有完成收件测试，不能判断邮箱无效或声称已测试发送。
- **P1 / 链接语义**：“沉浸式目的地”卡片说明文旅、酒店、商业综合体等服务，却跳到个人站的 Gaussian 场景列表。应换成匹配的现有案例，或明确标为“空间采集与交互研究”，不能拿实验入口冒充完整交付案例。
- **P2 / 入口命名**：Spaces、SpacePort、Collective 需在既有相关入口中明确“体验 / 研究与世界 / 艺术档案”的区别。先修标签、返回路径和可用状态，不新建第四个门户。

## 已执行检查与未执行检查

已执行：
- 对本地新 `Profile.jsx` 进行 TypeScript JSX 转译语法检查：0 语法诊断；这不是完整 React 构建。
- 静态断言通过：两种语言各 7 个章节目标、各 6 个作品路径、未保留裸 `#profile-*` 导航、两个 CV hub 链接、六个原照片名称。
- 人工对照 `App.jsx` 的 `state.scrollTo`、静态作品转接和项目 routes。
- GitHub 返回确认个人站两个文件已写入分支。
- 团队站提交差异确认只改栏目标题及两份人物卡文案，另有文件末尾换行差异；没有 CSS、JS、媒体或项目内容变更。

未执行：完整 `npm ci` / React production build、全站 graph/preservation 回归、真实桌面/移动浏览器逐项点击、截图比较、外站视频、头显、邮件收件、当前 PR 的生产部署验证。连接浏览器在本轮不可用；运行环境不能取得完整依赖。不得将静态语法检查写成全站 QA 通过。

## 发布与回滚

个人站按现有 publisher 生成 root 与 `/portfolio` 兼容入口及 hashed bundles；不要手工替换编译资源。团队站按其现有部署链发布，Git main、构建状态和实际页面分别确认。此文不是合并或上线证明。

审查后分别合并两个小 PR，按上面的 P0 路径验收。出问题只回滚对应 PR，不覆盖后来提交；旧文件及项目历史仍在 Git 中。团队 R06 的完整版本级 credit 审核和个人 PORT-01 的完整视觉验收仍未关闭。

## 依据

仓库来源：`AGENTS.md`、`START-HERE.md`、`docs/portfolio-maintenance-os/PORTFOLIO-OS-v2-architecture.md`、`react/src/App.jsx`、`Profile.jsx`、`Header.jsx`、`Footer.jsx`、`database/active_practice.json`、`content/publication-manifest-2026-11.json`、`.github/workflows/publish-portfolio-root.yml`、PR #156；团队 `index.html`、`assets/lang.js`、`AGENTS.md`、`docs/pm/tasks.json`、`docs/pm/VIRTURA-SPACE-PROGRAM-2026-11-07.md`。

人物资料：许思慧官网 https://xusihui.com/about ；马逍遥官网 https://xiaoyaoma.com/information 和 https://xiaoyaoma.com/ 。仅支持新增的个人经历简介，不替代项目级署名核验。
