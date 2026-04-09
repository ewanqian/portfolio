# Content Schema - 轻量内容系统

这是面向创作网络的内容中台，管理作品、节点、资产、文章与关系。

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
