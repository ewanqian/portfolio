# Branch Audit / 2026-04-16

这份记录用于回答一个很具体的问题：

- 当前仓库为什么会看到很多分支
- 哪些分支其实已经被主线吸收
- 哪些分支还有独立信息，不能当作“已经合并”
- 哪些内容应该保留，但不适合直接粗暴并回 `main`

## 当前结论

- 当前工作分支是 `main`
- 已把远端 `origin/main` 合并回本地 `main`
- 当前 `main` 相对 `origin/main` 为 `ahead 7`，不再 `behind`
- 这次检查时没有额外的临时 worktree 留存；之前 `/private/tmp/...` 的构建/同步 worktree 已消失，不是长期内容分支

## 已被主线吸收的分支

这些分支已经是 `main` 的祖先，或者它们的内容已被后续主线覆盖：

- `backup-current-20260410`
- `codex/content-system-hardening`
- `codex/content-system-phase-two`
- `pre-react-version`
- `research-pre-react-version`
- `version-before-restructure-5d35845`
- `origin/bo-live-credits`

这些不属于“还有东西没并回来”的风险分支。

## 今天已吸收的远端提交

已合并：

- `origin/main`
  - 原始提交：`9102d4d Add Node Weaver public-safe intro`
  - 处理方式：合并到本地 `main`
  - 结果：`README.md` 中保留了 `Node Weaver` 公开安全说明

## 仍有独立信息的分支

下面这些分支还有 `main` 没有的内容，但不建议一把全并。

### 1. `origin/codex/portfolio-cn-fixes`

这是一个内容与文档调整分支，含有真实独立信息，但它来自较早的页面组织阶段，直接合并会把当前首页、项目文档和 workshop 表述一起卷回旧结构。

它包含的独立新增文件主要有：

- `README-en.md`
- `articles-hidden/README.md`
- `visual-arts/已核对外部链接与公开资料索引.md`
- `workshops/202507-杭州中心-AI-Agent工作坊.md`
- `workshops/assets/202507-杭州中心-AI-Agent工作坊-海报信息.md`

其中这 5 个“纯新增、不回滚主线”的文件，已在本轮直接救回并提交到当前 `main`。

它还尝试删除这些条目：

- `projects/onefive-chocolove-video-2024.md`
- `projects/onefive-overground-visual-2023.md`
- `projects/onefive-underground-visual-2023.md`
- `visual-arts/onefive-series/README.md`

判断：

- 这个分支有“值得保留检查”的材料
- 但不适合直接 merge
- 后续应按“逐文件挑拣”的方式吸收，而不是按分支整体吸收

### 2. `node-database-experiment`

这是一个完整的实验性原型分支，不是主线内容补丁。

它的独立内容集中在：

- `node-database/`
- `node-database-preview.sh`
- `NODE_DATABASE_EXPERIMENT_SUMMARY.md`
- `Skills/virtura_node_database_skill_pack/`

判断：

- 它是独立原型，不是当前 portfolio 前台必须并入的内容
- 信息没有丢，因为整条实验线还完整保留在这个分支里
- 如果后续要吸收，应该作为“独立功能迁移”处理，而不是普通文案 merge

### 3. `experimental-three-section-version`

这是旧版 React 资源和首页结构试验分支。

它的独立内容几乎都是：

- `react/src/assets/home/*`
- 一个旧版 `react/src/components/sections/PracticeLines.jsx`

判断：

- 主要是旧资产 staging，不是当前主线缺失的结构化信息
- 当前站点已经改用其他前台资源路径，这条分支不建议回灌

## 为什么会看起来像“很多子分支”

本质上是三类东西叠在一起：

1. 历史快照分支
   例如某次大改前的保底点、pre-react 版本、重构前版本。

2. 任务型分支
   例如内容系统加固、高斯档案页、中文文案修正。

3. 实验型分支
   例如 `node-database-experiment`、`experimental-three-section-version`。

它们不是“主分支下面再长子分支”的树状治理，只是多个并列 ref。

## 当前最稳的处理原则

- 不删除分支上的有效信息
- 不把旧实验整条硬并进 `main`
- 先吸收明确安全的上游提交
- 对有价值但不宜整体并入的分支，按文件级别迁移

## 下一步建议

最值得单独处理的是 `origin/codex/portfolio-cn-fixes`，因为它既有新增材料，也有删除动作。

建议下一步按下面顺序做：

1. 先审 `README-en.md`、`articles-hidden/README.md`、`202507-杭州中心-AI-Agent工作坊.md` 这些新增材料是否要落回主线
2. 再判断 `codex/portfolio-cn-fixes` 里对现有项目正文和 onefive 相关条目的改写/删除是否要继续吸收
3. `node-database-experiment` 保持独立，等需要时再拆迁，不建议今天直接并
