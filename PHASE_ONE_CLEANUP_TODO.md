# Phase One Cleanup Todo

> 这份清单只记录“一期清洁”。
> 原则：不直接删信息，只迁移、提炼、对象化，并给每条高价值信息明确落点。

## Already Cleaned

- 顶栏 / theme / navigation 公共壳已收口
- `HashRouter` 与手动 hash 混用问题已解除
- `react/src/data/generated(1)` 已恢复为正式 `react/src/data/generated/`
- Kashiwa 目录下的 `(1)` 重复目录已清理
- `build:content` 和 React 生产构建已重新通过
- 根 `README.md` 已收口为入口页，详细定位/能力/研究/实践生态已迁移到 `about/` 与 `services/`
- `services/README.md` 已收口为目录页，合作判断与商业说明已迁移到 support docs

## P0 - Immediate Cleanup

### 1. Root README

File: `README.md`

Problems:
- 信息密度过高，入口页承担了太多定位、写作、合作、研究和项目列表功能
- 同一批高价值信息同时在 `README`、`services/`、`projects/`、`Writing` 里重复出现
- 目前更像“全部信息堆叠”，不像仓库入口页

Status:
- 已完成

Migration destinations:
- `about/public-positioning.md`
- `about/current-directions.md`
- `about/core-capabilities.md`
- `about/practice-ecosystem.md`

### 2. Services README

File: `services/README.md`

Problems:
- 与 `react/src/pages/Production.jsx`、`pricing-policy.md`、`case-notes.md`、`faq.md` 重复
- 目前既像 landing page，又像详细销售页，职责不清

Status:
- 已完成

Migration destinations:
- `services/project-types.md`
- `services/pricing-policy.md`
- `services/case-notes.md`
- `services/faq.md`
- `services/inquiry.md`
- `services/collaboration-overview.md`

### 3. Database README

File: `database/README.md`

Problems:
- 文案还停留在“其他对象表几乎没展开”的旧状态
- 还没说明下一阶段将扩到 `project_analysis / artistic_timeline / visual_genes`

Status:
- 已完成

Action:
- 已更新数据库现状描述
- 已补入下一阶段 schema 扩展路线

## P1 - Structural Cleanup

### 4. Projects README Upgrade

File: `projects/README.md`

Problems:
- 已经有索引能力，但还不够像“项目总控台”
- 目前缺少 `sourceDocs / collaborators / display modes / analysis coverage`

Action:
- 继续增强索引维度
- 保持数据库驱动，不回到手写列表

### 5. Writing / Archive Boundary

Files:
- `react/src/pages/Writing.jsx`
- `react/src/pages/Archive.jsx`
- `about/about-full-practice-lines.md`

Problems:
- `Writing` 混了 archive 和 backlog
- `Archive` 现在只有 works / nodes，没有把文字真正归档进去
- `about-full-practice-lines.md` 太像研究长文，不像 About 支撑文件

Action:
- 区分 published / backlog / planned
- 把 archive 纳入 writing objects
- 把过长的 conceptual prose 从 about 支撑层迁出到正式写作或研究对象

### 6. Visual Arts README Normalization

Files:
- `visual-arts/**/README.md`

Problems:
- 内容有价值，但结构不统一
- 有的更像 raw note，有的更像 archive page

Action:
- 统一 archive 模板
- 至少收齐：
  - 项目名
  - 时间
  - 地点
  - collaborators
  - public evidence
  - project notes
  - technical notes
  - works archive

## P2 - Objectization Tasks

### 7. Project Analysis Layer

Action:
- 新建 `database/project_analysis.json`
- 把作品为什么重要、方法问题、复用模式正式对象化

### 8. Artistic Timeline Layer

Action:
- 新建 `database/artistic_timeline.json`
- 让 `react/src/data/timeline.js` 和 `practiceMap` 未来从数据库生成

### 9. Visual Gene Library

Action:
- 新建 `database/visual_genes.json`
- 先从 `Kashiwa / Drop Flow / TIMER / Observation and Symbiosis` 开始

## Non-Destructive Rule

- 不做删除式压缩
- 只做迁移式整理
- 每次迁移都记录：
  - 原位置
  - 新位置
  - 为什么迁移
  - 是否已对象化
