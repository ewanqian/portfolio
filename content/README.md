# Content Schema - 轻量内容系统

这是面向创作网络的内容中台，管理作品、节点、资产、文章与关系。

它不是仓库里最早接触信息的地方，而是“已经过一轮整理、可以安全给前台消费”的正式层。

## 与 `projects/`、`database/` 的关系

- `projects/`：人工详细文档层，保留非结构化描述、补录材料、版本脉络与长文本。
- `database/`：对象化沉淀层，先把项目、人物、节点、场地等稳定字段存下来。
- `content/`：前台内容层，只收那些已经被挑选过、适合 React 页面和内容系统直接消费的对象。
- `react/src/data/generated/`：编译结果，不直接作为信息源维护。

一句话说：

- 新信息先避免丢失，落到 `database/`
- 需要叙述和补录的，放到 `projects/`
- 要上前台和内容系统的，再提炼进 `content/`

## 目录结构

```
content/
├── works/           # 作品/系列
├── nodes/           # 公开节点/事件
├── assets/          # 图片/媒体资产
├── writings/        # 文章/评论
├── relations/       # 关系定义
└── taxonomies/      # 分类/标签（可选）
```

## 核心 Schema

### 1. Work (作品/系列)

```json
{
  "id": "drop-flow",
  "title": "Drop Flow",
  "subtitle": "一种持续性的结构涌现",
  "years": "2024–2025",
  "type": "series",
  "summary": "围绕空间生成、流动结构与沉浸式观看展开的系列实践。",
  "practiceLine": "spatial-generation",
  "tags": ["immersive", "space", "flow"],
  "coverImage": "drop-flow-cover.jpg",
  "relatedNodes": ["ufo-terminal", "hangzhou-opening"],
  "relatedWritings": ["drop-flow-note"],
  "repoLink": "/portfolio/works/drop-flow",
  "priority": 0
}
```

### 2. Node (公开节点/事件)

```json
{
  "id": "ufo-terminal",
  "title": "UFO Terminal / Creation Camp",
  "year": "2025",
  "type": "public-node",
  "category": "Live Experiment / Process",
  "summary": "与实时生成、现场环境和空间测试密切相关的重要实验节点。",
  "relatedWork": "drop-flow",
  "timelineStage": "spatial-generation",
  "images": ["ufo-01.jpg", "ufo-02.jpg"],
  "externalLink": "https://example.com/ufo-terminal",
  "showOnHome": true,
  "tags": ["live", "experiment"]
}
```

### 3. Asset (图片/媒体)

```json
{
  "id": "ufo-01",
  "filename": "ufo-01.jpg",
  "type": "image",
  "caption": "UFO Terminal creation camp现场截图",
  "relatedWork": "drop-flow",
  "relatedNode": "ufo-terminal",
  "year": "2025",
  "source": "local-library",
  "featured": true
}
```

### 4. Writing (文章/评论)

```json
{
  "id": "drop-flow-note",
  "title": "从空间内部展开的图像经验",
  "type": "essay",
  "summary": "关于 Drop Flow 系列的创作笔记",
  "relatedWork": "drop-flow",
  "relatedStage": "spatial-generation",
  "source": "newsroom",
  "path": "/newsroom/drop-flow-note"
}
```

## 生成流程

运行内容生成脚本：

```bash
cd /Users/ewanqian/Library/Mobile\ Documents/com~apple~CloudDocs/VIRTURA-Workspace/portfolio
node scripts/build-content.js
```

这会将 `content/` 下的 JSON 文件编译到 `react/src/data/generated/` 供 React 使用。

## 维护原则

- 不要把临时补录直接写进 `react/src/data/generated/`
- 不要让首页或组件成为唯一的信息保存位置
- 对于奖项、公开节点、协作者、场地、显示条件这类高复用信息，优先考虑对象化
- 如果一条信息暂时还不适合上前台，也应该先进入 `database/`，而不是只留在聊天记录、commit 历史或零散 markdown 里
