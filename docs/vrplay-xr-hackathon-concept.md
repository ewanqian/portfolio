# VR Play Hackathon / WORLD REMIX 2026

> Work in Progress
>
> 当前方向：品牌视觉、动态传播、空间化专题体验，以及一个**持续生长的数字世界**。

## 1. 项目定位

本阶段优先完成传播与体验层，不先承诺完整赛事平台。

核心工作：

- WORLD REMIX 视觉升级
- 主视觉 / 动态视觉系统
- PPT / SlidesV 模板
- 宣传与合作伙伴物料
- 空间化专题网页概念
- Sponsor 展示模块

WORLD REMIX 延续 2025 已形成的 CD、磁带、代码、Wireframe、点云 / Gaussian、重复字带等视觉语言，但 2026 不再只做“更复杂的一张海报”，而是将这些元素转化成可持续的世界构造规则。

完整视觉规则见：[WORLD REMIX 视觉设定](./vrplay-world-remix-visual-system.md)。

---

## 2. 母概念：生长中的数字世界

不是 Finished Metaverse，也不是一个已经完成的“未来绿洲”。

WORLD REMIX 被设定为一个持续搭建、测试、接入和生长的数字生态：

- 世界结构仍在搭建；
- 温室和植物持续生长；
- 项目、创作者和工具不断成为新的档案节点；
- 供应商以 Plug-in 模块接入；
- 活动开始时，世界本身仍处于 Work in Progress；
- 每一届活动都留下新的空间和记忆。

核心句：

> **一个持续生长、持续被重混的数字世界。**

---

## 3. 视觉—空间结构

所有空间优先由三种结构生成：

### GRID / FRAME

Truss、脚手架、Wireframe、坐标、临时平台、半透明布、设备箱。

代表：**正在建造**。

### DISC / ORBIT

CD、圆盘、WORLD REMIX 环形字带、舞台、数据轨道。

代表：**正在 Remix**。

### GREENHOUSE / GROWTH

温室骨架、透明材料、植物、点云植物、Living Archive。

代表：**正在生长**。

空间主层级：

```text
WORLD REMIX ORBIT
        ↓
GREENHOUSE CORE / LIVING ARCHIVE
        ↓
PLUG-IN MODULES
供应商 / 工作坊 / 媒体 / 舞台 / 项目展示
```

---

## 4. 风格原则

目标：近未来、简洁几何、扁平 / 半扁平、游戏化、可快速建模。

### 保留

- 黑 / 银 / Off-white 的数字底层
- 植物绿
- CD 镭射 Cyan / Lime / Violet / Pink
- 2025 的数字复古媒介感
- Code / Terminal 的局部信息层
- Point Cloud / Gaussian 的扫描质感

### 新增

- 更明确的温室结构
- Truss / Scaffold / 临时架
- 半透明布和施工围挡
- 活动正在搭建的真实尺度
- 更强的空间导视

### 避免

- 超写实“AI 未来城市”
- 商业综合体式白色科技展厅
- Low Poly
- 全空间高饱和霓虹
- 到处都是全息屏幕
- WORLD REMIX Logo 墙纸化

判断标准：普通 Blender / Spline / Three.js 场景使用相对简单模型，也应能实现主要效果。

---

## 5. 中文信息与游戏化语气

支持文字以中文为主，标题 WORLD REMIX 与必要技术词保留英文。

语气短、直接、像游戏内部提示：

- 欢迎回到温室
- 先来逛逛
- 点子上桌
- 先试玩
- 温室档案
- 媒体花园
- 施工中
- 测试中
- 先别急
- 还在搭，但先开场
- 一起把世界搭起来

避免“共创未来生态平台”“赋能创新”等企业展厅话术。

---

## 6. 专题网页 / Spatial Landing Page

网页首先是活动传播入口，不是完整多人元宇宙。

```text
Landing / Dynamic Poster
        ↓
Welcome Lobby
        ↓
Greenhouse Core
        ↓
Event Information
        ↓
Partner Modules
        ↓
Living Archive / Project Showcase
```

体验：

- 游戏主菜单式进入
- 轻量 3D 浏览
- 少量可发现节点
- 通过场景组织活动信息
- Sponsor 可逛、可点开、可返回

技术路线：

1. **Spline**：第一版空间、镜头、模块和交互验证。
2. **Three.js / React Three Fiber**：需要更强自定义时升级。
3. **GSAP**：镜头、滚动与界面动效。
4. **Gaussian Splatting**：用于扫描档案节点，不作为整个网页底层。
5. **WebXR**：后续扩展，不作为第一阶段上线条件。

---

## 7. Sponsor / 合作伙伴空间

赞助商不各自设计一个完全不同的元宇宙展台，而是接入统一 WORLD REMIX 模块。

### S / Display

- Logo
- 简介
- 图片
- 小型展示模型

### M / Lab

- 产品 / 技术 Demo
- 3D 模型
- 互动屏
- 简单体验桌

### L / Garden

- 重点品牌区域
- Workshop / Demo
- 独立植物和小型 Truss
- 更完整的品牌体验

合作方素材：

- Logo 矢量文件
- 品牌色
- 100–200 字介绍
- 产品图
- 可选 3D 模型
- 视频 / Demo
- 技术资源

建议 Sponsor 品牌色只占空间约 20–30%，避免破坏 WORLD REMIX 母系统。

---

## 8. Sponsor SlidesV 提案模板

标准化 PPT 用于前期招商与供应商对接：

1. VR Play Hackathon / WORLD REMIX 是什么
2. 本届数字世界概念
3. Sponsor 在世界中的位置
4. S / M / L 三类模块
5. 品牌空间视觉参考
6. 可展示内容 / 互动方式
7. 素材与 3D 模型需求
8. Web / 线上展示方式
9. 线下 / 舞台联动可能
10. 合作权益与交付边界

重点不是“多一个 Logo 位”，而是让赞助商成为世界中的一个可进入节点。

---

## 9. 设计参考

参考用于建立方法，不复制表面风格：

- **Otl Aicher**：大型活动的导视、色彩、图标和信息系统。
- **The Designers Republic**：音乐 / 游戏 / 数字媒介文化和电子复古语言。
- **Experimental Jetset**：用少量文字、重复和尺度建立系统，帮助降噪。
- **Studio Dumbar**：动态身份、Creative Coding、声音与品牌系统。
- **Cedric Price / Fun Palace**：持续变化、可插拔、未固定的建筑逻辑。
- **Lacaton & Vassal**：温室、简单钢结构、透明材料和低成本大空间。
- **Centre Pompidou / Piano + Rogers**：裸露结构和设备如何形成清晰的视觉秩序。

---

## 10. 2025 资产继承

2025 资料已拆解为以下可继承母元素：

- WORLD REMIX Hero
- Logo Ribbon / Orbit
- Iridescent CD
- Tape / Media Archive
- Code / Terminal
- Grid / Coordinate / Wireframe
- Point Cloud / Gaussian Plant
- Greenhouse / Digital Garden

归档与升级说明见：[WORLD REMIX 2025 视觉资产归档](./vrplay-world-remix-2025-visual-archive.md)。

---

## 11. 当前优先级

### P0 — 现在做

- WORLD REMIX 视觉方向定稿
- KV / 动态系统
- SlidesV / PPT 模板
- 中文导视与文案语气
- 基础合作伙伴展示模板

### P1 — 紧接着

- Greenhouse Core 3D 原型
- Spatial Landing Page
- Sponsor 模块
- Dynamic Poster / Web Motion

### P2 — 后续评估

- Living Archive 数据化
- 长期线上作品档案
- 完整参赛者工作台
- 更深 WebXR / 空间计算体验

---

## 12. 当前边界

当前阶段不承诺：

- 完整报名系统
- 用户账号
- 组队平台
- 提交后台
- 完整赛事运营平台

优先把视觉、传播、空间入口和可展示的信息组织做扎实，再依据预算与技术资源决定是否向平台层扩展。
