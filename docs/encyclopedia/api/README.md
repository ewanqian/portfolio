# Ewan Encyclopedia API

这是一层给 Agent / Codex / 网站构建脚本读取的结构化接口。

## 入口

- 核心事实：`/public/data/ewan-encyclopedia.json`
- 图片 / 视频：`/public/data/ewan-media-index.json`
- 人类审阅：`docs/encyclopedia/claims-ledger.md`

推荐调用顺序：

```text
Agent request
   ↓
ewan-encyclopedia.json
   ↓
record_id / people / tags / status
   ↓
ewan-media-index.json
   ↓
需要时再追 sources / repo_path
```

## 记录类型

`person`、`organization`、`work`、`series`、`event`、`award`、`performance`、`exhibition`、`workshop`、`collaboration`、`research_line`、`production_project`、`archive_project`。

## 状态

- `verified-public`：可以公开
- `ongoing`：已发生且持续发展
- `presented`：已公开呈现
- `needs-source`：内部可检索，公开输出前需补证据
- `proposal`：研发 / 提案中
- `deprecated`：旧表述

默认公开生成只读取：

```text
verified-public
ongoing
presented
```

## Agent 使用规则

1. 写 Ewan 简介时先读 `person-ewan-qian` 和 `featured_record_ids`。
2. 写艺术线时筛选 `art / exhibition / research / live-av` 标签。
3. 写 Production 时筛选 `production / spatial-media`，不要自动混成个人艺术作品。
4. 写合作人时通过 `people` ID 反查项目，不推断未登记合作。
5. 奖项必须来自 `award` 记录或明确的团队仓库来源。
6. `needs-source` 不得改写成“入选、获奖、正式合作”。
7. 团队仓库是补充证据源，只有真的出现日期 / 角色 / 版本不一致才标 conflict。
8. 同一系列不同版本的 credit 分开维护。
9. 当前研究术语不得倒写成历史项目当时已经采用的原始概念。
10. SIGGRAPH Asia 当前不进入公开记录，待本年度结果确认后再新增状态条目。

## 媒体规则

任何图片 / 视频先登记 media index，再让页面或 Agent 选图：

```json
{
  "id": "media-timer-main",
  "record_ids": ["series-timer"],
  "type": "image",
  "repo": "ewanqian/VIRTURA-Collective",
  "path": "prototype/assets/works/timer-main-clean.jpg",
  "public": true
}
```

后续可以逐步增加：JSON Schema、重复 ID 检查、media path 校验、自动 Bio / Timeline / CV 生成和 monthly `needs-source` report。
