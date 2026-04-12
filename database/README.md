# Database Layer

`database/` 是这个仓库里“先对象化、再继续沉淀”的中间层。

它不等于前台展示，也不等于最终内容系统；它更像长期项目索引、协作资料和未来内容编排之间的缓冲区。很多早期项目、临时整理、聊天里补录的信息，应该先在这里变成稳定字段，再决定是否进入 `content/`。

## 目录职责

- `works.json`：项目对象总表。当前最重要的入口。
- `nodes.json`：公开节点、展览、演出、创作营、比赛等奖项语境。
- `people.json`：合作艺术家、团队成员、甲方、策展相关人物。
- `venues.json`：场地、剧场、展厅、机构、节展。
- `screens.json`：屏幕、投影、全息纱幕、裸眼 3D、双目等显示条件。
- `assets_index.json`：图片、视频、文档、外链等资源索引。
- `notes_index.json`：制作笔记、研究笔记、复盘、方法稿索引。
- `manifest.json`：数据库总体状态和计数。

## 推荐工作流

1. 新项目或旧项目补录时，先写 `works.json`。
2. 如果项目有清晰公开节点，再补 `nodes.json`。
3. 如果项目进入首页或需要前台消费，再抽取到 `content/works`、`content/nodes`。
4. React 前台只读取 `react/src/data/generated/`，不要把临时信息直接写进生成结果。

## Source of Truth

- 项目存在性：以 `database/works.json` 为准。
- 人工详细正文：以 `projects/*.md` 为准。
- 前台精选内容：以 `content/` 为准。
- 构建产物：以 `react/src/data/generated/` 为准，但不能当源头。

## 当前问题

- 目前 `works.json` 已经有较完整的项目总表，但其他对象表还几乎没展开。
- 这意味着很多“合作人 / 场地 / 节点 / 设备 / 笔记”还停留在正文文本里，尚未拆成可复用对象。
- 下一阶段最值得做的是把高频出现的协作者、场地、公开节点和交付条件对象化，这样后面无论改首页、做 archive、做搜索还是做知识图谱，都不容易再丢信息。

查看 [projects 索引](../projects/README.md) ｜ 查看 [content schema](../content/README.md)
