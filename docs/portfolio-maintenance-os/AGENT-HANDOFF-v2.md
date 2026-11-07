# Agent Handoff / 场景：维护 Ewan Qian 的作品与 CV

## 新会话与收尾（2026-11-07）
先读根目录 [START-HERE.md](../../START-HERE.md)，核对最新提交、发行清单和当前任务，再执行下方 preflight。用户问“有什么能做的”时从现有队列回答；说“继续”时推进最高优先级可执行项。每轮完成或阻塞时更新 START-HERE.md；较大变更留下 handoffs/ 记录及测试/提交/下一步，重新读取确认保存成功。不要只在聊天中承诺稍后继续。START-HERE 是维护状态入口，作品事实及发行产物仍分别以 database 与 manifest 为准。

这是给 Codex、ChatGPT、其他连接 GitHub 的 Agent 直接执行的操作规约。可在新对话中说：**“按照 `docs/portfolio-maintenance-os/AGENT-HANDOFF-v2.md` 维护我的网站，先执行 preflight，处理下面的新资料：……”**

## Preflight（每次执行，禁止跳过）

1. 在 `ewanqian/portfolio` 的当前分支先读 `AGENTS.md`、`docs/portfolio-maintenance-os/PORTFOLIO-OS-v2-architecture.md` 和 `content/publication-manifest-2026-11.json`。
2. 读取 `database/works.json`、`database/identity-crosswalk-2026-11.json`、`database/canonical_names.json`、`content/project-registry-2026-11.json`、`content/cv-records-2026-11.json`。任何展示文案都必须能回溯事实和出处。
3. 确认变更对象是作品、一次呈现、奖项/荣誉、学历/课程、图片、文章或服务。多种对象可关联，但不能硬合并。
4. 查看同 ID 的现有网页、历史 URL、图片版权状态和最近 Git 变更，避免新建重复版本。
5. 运行 `npm run audit:graph` 并记录当前基线；找出本次修改的风险和最短路径。

## Agent 在任务开始前应给出的四项信息

- **事实对象 ID**：原本是什么，是否已有项目或旧版别名？
- **影响面**：会修改数据库、CV、作品页、首页、图片、PDF 中的哪些，哪些不修改？
- **证据和权限**：机构与时间是否确认？完整作者署名是什么？媒体是否有公开授权？
- **验收标准**：链接、手机/桌面显示、双语一致、历史链接兼容、变更可回滚。

## 对不同任务的标准动作

| 用户要求 | Agent 必须做 | 禁止 |
|---|---|---|
| “补一个作品” | 先查 ID 和别名，修改项目对象、详细文档；关联版本与图像，进入候选，审后发布 | 不查重就复制一份首页项目 |
| “新参加展览/获奖” | 建立 Presentation / Claim，核实日期、主办、角色、证据、独立/团队署名 | 把团体奖写成个人独立获奖；将未核实称号写进正式 CV |
| “换封面/传视频” | 检查来源、作者、授权、格式、时长与尺寸；保留原件和 provenance | 裁坏比例、用别的项目图片兜底、直接覆盖唯一原片 |
| “更新 CV” | 从稳定记录筛选中/英文，审核发布，输出 PDF，登记 release manifest；链接到永久记录 | 用旧 Google Docs 反向覆盖项目事实 |
| “改网页样式” | 选择 archive / record / art / production 模板，只改设计 Token 或共同组件；差异用局部 override | 为一条记录重新做一套 Header/Footer |
| “帮我搜网上资料” | 先用官方、参与者及一手出处，保存候选链接、日期、引用与使用权限 | 自动把搜索摘要和不明版权图片公开发表 |
| “全站更新” | 先生成影响清单、可回滚计划，检查 GitHub Pages 发布结果与所有变更 URL | 因为 CI 构建成功就说线上全可用 |

## 交付时必须汇报（不可省略）

```text
Change: 改了哪些文件和 ID
Source of truth: 此次事实存在哪个对象/字段
Generated: 哪些页面/CSV/PDF 是重新生成的
Validated: 本地脚本、构建、实际线上 HTTP 和视觉测试分别是通过/失败/未测试
Risk: 尚需版权、署名、奖项级别、图片或英文校对的内容
Rollback: Git commit 或 PR、旧 URL 保留方式
Next: 只列最值得执行的 1–2 项 P0
```

## 防遗忘、防越权机制

- 永久 ID 不因页面标题或设计变化而重命名；旧 ID 进入映射，不删除历史内容。
- 不在公共 GitHub 提交私人合同、未公开聊天、证件与源素材的受限信息。
- 一次会话中处理不完的事情，写入可追踪的文件/Issue（**只有公开安全信息可进入公开 Issue**）；不要把“之后我再做”当完成。
- 不自动改写真实性判断；保留来源冲突与人类审查门槛。
- 数据源与视觉输出之间的联动如尚未实现，必须明确说“未同步”，不能假装 CV 与网站已经共享构建器。
