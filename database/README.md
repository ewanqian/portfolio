# Database Layer

`database/` 是这个仓库里“先对象化、再继续沉淀”的中间层。

它不等于前台展示，也不等于最终内容系统；它更像长期项目索引、协作资料和未来内容编排之间的缓冲区。很多早期项目、临时整理、聊天里补录的信息，应该先在这里变成稳定字段，再决定是否进入 `content/`。

## Stack Role / 在整套内容系统里的位置

- `projects/`
  人工详细文档与补录层，适合保留长正文、时间线、制作说明和现场细节。
- `database/`
  对象化沉淀层，适合把项目、节点、人物、场地、设备、笔记索引变成稳定字段。
- `content/`
  前台正式消费层，适合首页、作品页、节点页等需要稳定摘要的内容。
- `react/src/data/generated/`
  构建产物，只负责被前台读取，不能当成 source of truth。

## Current Table Status / 当前表状态

### Active Tables / 已展开并可继续使用

- `works.json`
  项目对象总表，也是当前最重要的入口。已经开始承载 `collaboratorIds`、`venueId`、`relatedNodeIds`、`awards`、`sourceDocs` 这类关系字段。
- `nodes.json`
  公开节点、展览、演出、创作营、奖项语境。适合承接“这个项目为什么在公共层面重要”。
- `people.json`
  合作艺术家、团队成员、相关人物。
- `venues.json`
  场地、剧场、展厅、机构、节展。
- `screens.json`
  屏幕、投影、全息纱幕、裸眼 3D、双目等显示条件。
- `notes_index.json`
  制作笔记、研究笔记、复盘、方法稿索引。

### Seed Tables / 已建但还需要继续补

- `collectives.json`
  团队与合作组织对象，目前还是种子层。
- `project_analysis.json`
  作品评析与方法问题，目前已建立第一批核心条目，但还需要继续补齐更多项目。
- `artistic_timeline.json`
  艺术实践时间线，目前已建立阶段骨架，后续可继续细化到更具体的作品章节。
- `visual_genes.json`
  视觉母题与技术谱系，目前已建立第一批核心作品的 gene 条目。
- `assets_index.json`
  图片、视频、文档、外链等资源索引，目前还没真正展开。
- `mapping_files.json`
  mapping 文件与输出配置索引，目前还是占位层。

### Meta Tables / 元信息与执行追踪

- `manifest.json`
  数据库总体状态、计数和表说明。
- `tasks.json`
  当前仓库执行任务的对象化追踪表。

## Source of Truth / 真正的来源关系

- 项目存在性：以 `database/works.json` 为准。
- 人工详细正文：以 `projects/*.md` 为准。
- 前台精选内容：以 `content/` 为准。
- 构建产物：以 `react/src/data/generated/` 为准，但不能当源头。

## Recommended Workflow / 推荐工作流

1. 新项目或旧项目补录时，先写 `works.json`。
2. 如果项目有清晰公开节点，再补 `nodes.json`。
3. 如果出现稳定协作者、场地、屏幕条件、方法笔记，再补 `people / venues / screens / notes_index`。
4. 如果项目进入首页或需要前台消费，再抽取到 `content/works`、`content/nodes`。
5. React 前台只读取 `react/src/data/generated/`，不要把临时信息直接写进生成结果。

## What Changed / 这轮更新后有什么不同

这层已经不再是“只有 `works.json` 能用，其余表都没展开”的状态。  
第一批高价值对象已经开始落进：

- `nodes.json`
- `people.json`
- `venues.json`
- `screens.json`
- `notes_index.json`

这意味着很多原本只会散落在项目正文、首页文案或历史提交里的信息，开始有了稳定落点。

## Next Schema Expansions / 下一阶段最值得补的对象

- `project_analysis.json`
  从“第一批核心作品”继续扩到更多 featured projects，并把 analysis 与 works 正式连起来。
- `artistic_timeline.json`
  从阶段骨架扩到更细的创作章节与阶段转折。
- `visual_genes.json`
  从核心系列继续扩到更多项目节点、技术支路与风格变体。
- `collectives.json`
  继续补 VIRTURA 以及其他合作结构。
- `assets_index.json`
  把图片、视频、外部链接和关键证据系统化。

## Non-Destructive Ingestion Rule / 非破坏式补录原则

- 不直接删掉旧版本里有价值的信息。
- 先迁移到 `projects/` 或 `database/`，再决定是否进入 `content/`。
- 任何高价值信息都不应该只存在于首页文案、生成结果或提交历史里。

查看 [projects 索引](../projects/README.md) ｜ 查看 [content schema](../content/README.md)
