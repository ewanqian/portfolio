# Ewan Encyclopedia API

这是一层给 Agent / Codex / 网站构建脚本读取的结构化接口。

## 目标

不要让 Agent 每次从几十篇 README、PDF 和聊天记录里重新猜 Ewan 的经历。

固定数据流：

```text
证据 / 团队仓库 / 项目档案
        ↓
claims-ledger.md（人审）
        ↓
public/data/ewan-encyclopedia.json（Agent 读）
        ↓
Profile / CV / Proposal / Portfolio / PPT / Workshop / Search
```

图片与视频独立维护：

```text
public/data/ewan-media-index.json
```

---

## Agent 入口

### 核心事实

`/public/data/ewan-encyclopedia.json`

### 图片 / 视频索引

`/public/data/ewan-media-index.json`

Agent 应先读取结构化 JSON，再按 `sources`、`repo_path` 或 `media_ids` 追溯详细资料。

---

## 记录类型

- `person`
- `organization`
- `work`
- `series`
- `event`
- `award`
- `performance`
- `exhibition`
- `workshop`
- `collaboration`
- `research_line`
- `production_project`
- `archive_project`

---

## 状态

- `verified-public`：可直接用于公开材料
- `ongoing`：已发生并持续发展
- `presented`：已公开呈现
- `needs-source`：用户确认或有内部资料，但仍需更高等级原始证据
- `proposal`：提案 / 研发中，不能写成已发生
- `deprecated`：旧表述，只保留历史

公开生成器默认只读取：

```text
verified-public
ongoing
presented
```

`needs-source` 只能用于内部整理或明确带状态的时间线。

---

## 关系字段

每条记录尽量使用稳定 ID，而不是重复写名字：

```json
{
  "id": "performance-titan-bolive-2025",
  "people": ["person-ewan-qian", "person-kashiwa-daisuke", "person-yuki-murata"],
  "organization_ids": [],
  "related_record_ids": []
}
```

这样一个人的合作线可以直接通过 ID 聚合。

---

## 图片记录

每个 media item 至少包含：

```json
{
  "id": "media-timer-hero-01",
  "record_ids": ["work-timer"],
  "type": "image",
  "repo": "ewanqian/VIRTURA-Collective",
  "path": "prototype/assets/works/timer-main-clean.jpg",
  "caption_zh": "TIMER / 控时者",
  "rights": "project-documentation",
  "public": true
}
```

未来补图时，不要直接把图片路径写死在 Bio 或 Proposal 文稿里；先登记到 media index。

---

## Agent 使用规则

1. 写个人简介：先读取 `person-ewan-qian` + `featured_record_ids`。
2. 写艺术线：筛 `art`, `exhibition`, `research`, `live-av` tags。
3. 写商业案例：筛 `production`, `spatial-media` tags，不要自动混入个人艺术作品。
4. 写某位合作人：通过 `people` ID 反查记录，不要推断未记录合作。
5. 奖项必须来自 `award` 或带明确 award 字段的记录。
6. `needs-source` 不能被改写成“入选 / 获奖 / 正式合作”。
7. 团队仓库是补充证据源；只有当日期、角色或版本真的不一致时才建立 conflict。
8. SIGGRAPH Asia 当前不进入公开 JSON；结果确认后再新建记录。

---

## 后续可以增加的自动化

- JSON Schema 校验
- Markdown → JSON build script
- media path existence check
- duplicate IDs check
- `needs-source` monthly report
- 自动生成 80 字 / 200 字 / Extended Bio
- 自动生成 Selected Works / Timeline / Collaborators 页面
- 自动为图片生成 contact sheet / caption list

第一阶段保持简单：一套 JSON + 一套媒体索引 + Git 历史即可。
