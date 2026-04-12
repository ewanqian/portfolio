# Portfolio Execution Checklist

> 这份清单是当前仓库的主控路线图。
> 目标不是一次性重写网站，而是把页面系统、内容系统、数据库系统、作品研究系统逐步对齐，避免信息再次丢失。

## Phase 0 - Ground Rules

- 首页原则：保留当前整体结构，只做高价值补强，不做大幅重构。
- Source of truth：
  - `projects/` = 人工详细文档与补录层
  - `database/` = 对象化沉淀层
  - `content/` = 前台正式消费层
  - `react/src/data/generated/` = 构建产物
- 任何高价值信息都不应该只存在于页面文案或提交历史里。

## Phase 1 - Website Shell Fixes

### 1. Header / Topbar System

- 修复顶栏在不同页面上的继承问题
- 修复移动端自适应和菜单开合问题
- 修复 theme toggle 缺失、跳位、状态不一致问题
- 统一导航跳转逻辑，避免 `HashRouter` 和手动 `window.location.hash` 混用
- 清理重复样式定义，避免 `index.css` / `global.css` 双份控制同一组件

### 2. Cross-page Consistency

- 统一 Header / Footer / section spacing
- 统一页面标题层级和 section anchors
- 检查 Practice / Writing / Archive / Production 的交互继承
- 建立公共 layout 规则，避免每页各写一套

## Phase 2 - Content System Hardening

### 3. Project Index

- 保持 `projects/README.md` 为数据库驱动
- 持续显示：
  - 正文覆盖率
  - content system 覆盖率
  - 缺正文项目
  - 关联节点 / 奖项 / 重要信号

### 4. Database Expansion

- `works.json` 继续补字段：
  - `collaboratorIds`
  - `venueId`
  - `relatedNodeIds`
  - `awards`
  - `sourceDocs`
  - `displayModes`
  - `analysisIds`
- 扩充对象表：
  - `people.json`
  - `venues.json`
  - `nodes.json`
  - `screens.json`
  - `notes_index.json`
  - 未来补 `collectives.json` / `assets_index.json`

### 5. Content Promotion

- 从 `database/works.json` 里挑选更多 featured 项目进入 `content/works`
- 建立进入 `content/` 的规则：
  - 有稳定标题
  - 有清晰摘要
  - 有至少一个 public node / source doc / related writing
- 避免前台只有 3 个 work 对象，数据库却已经有完整项目总表

## Phase 3 - Writing and Text Strategy

### 6. Writing Archive

- 识别哪些文本值得写成长期归档：
  - 作品评析
  - production notes
  - public node debrief
  - 方法论说明
  - archive / content system 研究
- 区分：
  - 可公开写作
  - 内部草稿
  - 未来研究提纲

### 7. Commercial / Cooperation Text

- 整理合作目录、报价目录、服务目录
- 去水分，减少泛化句子
- 强化：
  - 做过什么
  - 适合什么合作
  - 为什么你和别人不一样
  - 为什么某些服务更贵
- 建立 “作品线” 和 “服务线” 之间的映射，不让商业文本脱离作品本体

## Phase 4 - Artistic System

### 8. Artistic Timeline

- 建立单独的 artistic timeline 数据层
- 不只是年份排序，而是创作结构排序：
  - 时间结构
  - 空间生成
  - 环境成为作品
  - 感知迁移

### 9. Visual Gene Library

- 为重点作品建立 visual gene / technical route / prompt lineage
- 先从以下对象开始：
  - Kashiwa TITAN
  - Drop Flow
  - TIMER
  - Observation and Symbiosis
- 每个对象至少包含：
  - 风格来源
  - 视觉母题
  - 技术路径
  - 观看关系
  - 延伸方向

### 10. Work Analysis Structure

- 建立作品评析结构，不只保存“做了什么”
- 目标字段：
  - `coreQuestion`
  - `formalLanguage`
  - `visualGene`
  - `technicalRoute`
  - `publicContext`
  - `analysisSummary`
  - `nextDirections`

## Phase 5 - Presentation Layer

### 11. Gallery / Archive / Graph Presentation

- 设计更强的作品展示状态，而不是普通项目列表
- 重点方向：
  - gallery database view
  - archive matrix
  - node relationship view
  - work-to-node-to-writing graph

### 12. Public-facing Strength

- 让访问者一眼能感知：
  - 这是创作系统，不是普通接单页
  - 作品、研究、方法、制作能力是联动的
  - 项目不是离散案例，而是一条持续展开的实践网络

## Immediate Next Actions

- [ ] 完成顶栏 / theme / navigation 系统修复
- [ ] 把 header 修复结果写入统一 layout 规则
- [ ] 再补 5-8 个 featured 项目到 `content/works`
- [ ] 给 `works.json` 增加 `displayModes` / `analysisIds`
- [ ] 起草 artistic timeline 数据 schema
- [ ] 起草 visual gene library 数据 schema
- [ ] 整理 writing / commercial / archive 的长期写作清单

