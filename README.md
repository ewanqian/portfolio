
# portfolio

钱誉文 Ewan Qian 的个人作品与项目入口。

这里优先回答四件事:

- 我是谁，以及我在做什么
- 哪些项目最值得先看
- 我的方法和研究线索是什么
- 如果你想继续深入，应该去哪个仓库

## Read This First

如果你第一次进入，建议按下面的路线阅读:

- 想快速看代表项目: [精选项目 | Selected](#精选项目--selected)
- 想理解我的方法: [核心能力 | Tooling & Method](#核心能力--tooling--method)
- 想看研究与文章: [研究与文章](#研究与文章)
- 想看分享、工作坊和公共活动: [行业分享与交流活动](#行业分享与交流活动)
- 想了解团队与生态结构: 看下面这组入口

## 团队与生态入口

这个仓库是个人入口，不重复承担团队主仓、公共导览前台或工具主线的职责。

- 团队主入口：[VIRTURA-Collective](https://github.com/ewanqian/VIRTURA-Collective)
- 团队公共导览与档案前台：[VIRTURA-SpacePort](https://github.com/ewanqian/VIRTURA-SpacePort)
- 团队方法与知识网络入口：[our-theory](https://github.com/ewanqian/VIRTURA-SpacePort/tree/main/knowledge-network/our-theory)
- 团队发布出口：[VIRTURA-Newsroom](https://github.com/ewanqian/VIRTURA-Newsroom)
- 工具主线：[SceneForge](https://github.com/ewanqian/SceneForge)

# 钱誉文 Ewan Qian | 现场演出与沉浸视觉制作人
## Live & Immersive Visual Producer
> 核心主张：把一次性发生的演出与展览，延伸为可保存、可再体验、可迁移的数字资产

---

## 目录
- [关于我](#关于我)
- [核心能力](#核心能力--tooling--method)
- [研究与文章](#研究与文章)
- [行业分享与交流活动](#行业分享与交流活动)
- [项目参与](#项目参与--credits)
- [作品](#作品--visual-arts)
- [合作与委托](#合作与委托)
- [链接与开源仓库](#链接与开源仓库)

---

### 关于我
我主要从事现场演出视觉、沉浸内容制作和空间化影像系统设计。对我来说，影像不是附着在屏幕上的装饰层，而是舞台、空间、时间和观演关系的一部分。一个画面是否成立，不只取决于视觉本身，还取决于它如何进入真实场域，如何与音乐、结构、材质、观看距离和人的身体经验发生关系。

我持续关注的核心问题，是如何把一次性发生的演出与展览，转化为可保存、可再体验、可迁移的数字资产。这个问题同时牵涉创作、工程和发布: 一方面要让作品在现场足够成立，另一方面也要让它在巡演复用、展陈复映、网页端迁移和空间计算媒介中继续保持生命力，而不是在一次交付后迅速失真。

因此，我目前的实践并不把“艺术表达”和“工程方法”拆开，而是把它们视为同一条工作链上的不同环节:

- 在生成层，用 Blender 程序化系统、音频分析与时间线控制搭建可复用的视觉结构
- 在空间层，把重点放在纵深、层级、材质、光影和观看关系，而不是只把内容平铺到一个载体上
- 在迁移层，持续探索作品如何进入网页端、数字舞台和空间计算媒介，延长它的公开生命周期

这也是我为什么会同时维护个人作品、团队入口、公共导览前台和工具主线。这里是个人入口，`VIRTURA-Collective` 承担团队本体，`VIRTURA-SpacePort` 承担公共导览与知识网络主宿主，`SceneForge` 承担工具与数字舞台实验，`RepoForge` 与私有 `Forge` 负责治理和工作流。

---

### 精选项目 | Selected

| 项目 | 说明 |
|------|------|
| [Rain 新加坡跨年专场](./projects/rain-singapore-visual-2026.md) | 曲目视觉 / 跨年 Opening |
| [余佳运「45㎡」演唱会](./projects/yujiayun-45ping-visual-2025.md) | Opening / 地坪联动 |
| [Kashiwa Daisuke 深圳专场](./projects/kashiwa-titan-visual-2025.md) | 全息纱幕 / 裸眼3D |
| [杭州双年展开幕式「滴流」](./projects/drop-flow-visual-2025.md) | 开幕式视觉 / VR头显 |
| [杭州中心美术馆「巴别瓶」](./projects/babel-bottle-art-2025.md) | 参展艺术家 / 工作坊导师 |
| [SceneForge](https://github.com/ewanqian/SceneForge) | 舞台查看器 / 网页预演 |

---

### 核心能力 | Tooling & Method
如果你只想快速判断我的方法结构，这一节先看 4 个关键词就够了：

- 程序化生成
- 音画联动
- 屏幕空间建构
- 迁移与发布

#### 程序化生成 × 音频分析
以 Blender 程序化系统（几何节点/模拟节点）为底座，用音频分析与时间线节拍控制作为驱动信号，实现从屏幕/投影的空间建构到空间计算与网页端迁移的可交付流程；并具备现场同步与实时演出控制能力。
- 几何节点/模拟节点用于搭建可复用、可参数化的视觉结构
- 通过音频分析提取节拍、能量、频段与段落变化
- 将分析结果与时间线/节拍控制联动，用于卡点、段落切换与动态细节控制（系统化而非堆特效）

#### 屏幕空间建构
通过纵深、层级与光影策略延展有限空间，善用投影与墙面/环境的关系：不强调"这是一块屏幕"，而是让影像融入材质与结构，用最少的设备完成"以假乱真"的空间叙事与概念表达。

#### 迁移与拓展
将艺术家/客户的概念与内容系统迁移到空间计算（沉浸呈现）或网页端，重点解决呈现链路与体验一致性：内容格式、播放稳定性与空间观感。

#### 现场演出与同步控制
能处理视频同步与时间码（timecode）触发，配合音乐/舞台流程触发视觉效果，熟悉 Resolume Arena 等现场播放与控制工具，可承担舞台现场的视觉播放控制与实时演出配合。

---

### 研究与文章

这里保留两层内容:

- 第一层是较稳定的研究主张与方法框架，主要宿主在团队知识网络
- 第二层是项目复盘、技术笔记和工具实践，保留在个人仓中

#### 核心研究主张

如果只看几条主线，优先看下面四个方向:

| 方向 | 处理的问题 | 当前入口 |
|------|------------|----------|
| 智力装备 | 如何把静态知识转化为可部署、可调用、可在真实工作中触发的动态知识结构 | [intellectual-equipment](https://github.com/ewanqian/VIRTURA-SpacePort/tree/main/knowledge-network/our-theory/intellectual-equipment) |
| 空间创作框架 | 如何把空间计算、工程化方法和创作者思维连接成一条从认知到落地的创作路径 | [spatial-creative-framework](https://github.com/ewanqian/VIRTURA-SpacePort/tree/main/knowledge-network/our-theory/spatial-creative-framework) |
| 工程控制论 | 如何用无公式、强思维的方式理解复杂系统、反馈结构和 AI 时代的通用控制逻辑 | [engineering-cybernetics](https://github.com/ewanqian/VIRTURA-SpacePort/tree/main/knowledge-network/our-theory/engineering-cybernetics) |
| 数字情感容器 | 如何让空间化表达真正形成可感知、可共鸣、可持续传播的情感体验 | [digital-emotion-container](https://github.com/ewanqian/VIRTURA-SpacePort/tree/main/knowledge-network/our-theory/digital-emotion-container) |

这些方向主要宿主在 `VIRTURA-SpacePort / knowledge-network / our-theory`，这里保留的是个人研究视角下的索引入口。

#### 文章归档

这一层更接近工作现场留下来的方法痕迹，而不是已经完全定稿的总论。

这批旧稿已经做过一轮内容审计。当前公开优先保留的，是和真实项目、真实方法、真实工作链最贴近的条目，而不是那些把规划写成既成事实的稿子。

如果你想快速判断我的研究脉络，建议按下面的顺序读:

- 核心主张: [从手工作坊到工程化的沉浸式内容创作思维重构](./articles-hidden/01-core-proposition.md)
- 项目复盘: [DropFlow2](./articles-hidden/02-dropflow2-review.md), [Timer](./articles-hidden/03-timer-review.md)
- 技术底层: [Blender 程序化](./articles-hidden/04-blender-procedural.md), [音画联动进阶](./articles-hidden/05-audio-visual-advanced.md)

当前已经从首页降级的旧稿，主要问题包括:

- 把未来规划写成已完成能力
- 把工具和系统描述得比真实完成度更成熟
- 把个人与小团队实践放大成行业级叙事
- 文件重复或文本损坏

审计记录见: [articles-hidden audit](./articles-hidden/README.md)

更完整的团队研究入口见:

- [VIRTURA-Collective / Research](https://github.com/ewanqian/VIRTURA-Collective/tree/main/research)
- [VIRTURA-SpacePort / knowledge-network](https://github.com/ewanqian/VIRTURA-SpacePort/tree/main/knowledge-network)

---

### 行业分享与交流活动

这一部分更适合回答两个问题：

- 我如何把方法转成可交流的内容
- 我的工作是否持续进入公开场景和现实讨论

如果你更关心项目本身，可以先跳到“项目参与”。

| 时间 | 主题 | 角色 |
|------|------|------|
| 2026.01 | [上海·愚见观池｜情感容器构建工作坊](./workshops/202601-愚见观池-情感容器工作坊.md) | 主讲人 |
| 2025.07.12 | [杭州·中心美术馆｜「巴别瓶」展览公共活动 2｜游戏化 AI 生活解构师](./workshops/202507-杭州中心-AI-Agent工作坊.md) | 工作坊导师 |
| 2025.05 | [线上（B站/小红书/CCtalk）｜5天直播工作坊](./workshops/202505-线上-5天直播工作坊.md) | 主讲人 / 课程设计 |
| 2025.04.03 | [上海·巨鹿路 Cedar Kitchen｜重新定义数字空间](./workshops/202504-巨鹿路-半成品沙龙.md) | 分享嘉宾 |
| 2024.12.27 | [上海·漕河泾AI校友中心｜AI+3D空间交互艺术创作工坊](./workshops/202412-漕河泾-AI3D工坊.md) | 特邀分享嘉宾 |
| 2024.07 | [芬兰·阿尔托大学｜VR暑期学校](./workshops/202407-阿尔托大学-VR暑期学校.md) | 参训学员 |
| 2020.01.14-20 | [上海｜OF COURSE｜Processing音画互动创作](./workshops/201901-OFCOURSE-Processing工作坊.md) | 参训学员 |

---

### 项目参与 | Credits

> 详细项目列表可查看 [projects](./projects/)

这一部分是完整项目参与记录。

如果你是第一次进入，不建议从这里开始通读；更适合先看上面的“精选项目”，再回到这里查完整履历。

#### 演艺舞台

| 时间 | 项目 | 角色 |
|------|------|------|
| 26/01 | [Rain 新加坡跨年专场](./projects/rain-singapore-visual-2026.md) | 曲目视觉 / 跨年 Opening |
| 25/11 | [余佳运「45㎡」演唱会](./projects/yujiayun-45ping-visual-2025.md) | Opening / 地坪联动 |
| 25/10 | [Kashiwa Daisuke 深圳专场](./projects/kashiwa-titan-visual-2025.md) | 全息纱幕 / 裸眼3D |
| 25/10 | [Can Festival 舟山](./projects/kashiwa-band-visual-2025.md) | 舞台视觉 / 乐队专场 |
| 25/08 | [爱丁堡《山海浮生II：八荒祭》](./projects/shanhaifusheng2-visual-2025.md) | 视觉制作 / 工程交付 |
| 23/10 | [上海广播艺术中心「孤独？」](./projects/lonely-av-live-2023.md) | 舞台视觉 / 广播艺术中心 |
| 22/11 | [Germany Hamburg《Water Music》](./projects/watermusic-multi-visual-2022.md) | 多媒体视觉 / Hamburg |
| 22/10 | [谢欣舞蹈剧场《四相》《汞》](./projects/xiexindance-sixiang-gong-visual-2022.md) | 影像视觉 / 舞蹈剧场 |
| 22/09 | [上海时装周XTEP-XDNA](./projects/xtep-xdna22aw-visual-2022.md) | 视频制作 / 时装周 |

#### 混合媒介

| 时间 | 项目 | 角色 |
|------|------|------|
| 26/01 | [《观察与共生》Workshop](./projects/observe-symbiosis-workshop-2026.md) | 工作坊 / 方法分享 |
| 25/10 | [首届中国（杭州）艺术与科技国际双年展开幕式「滴流」](./projects/drop-flow-visual-2025.md) | 开幕式视觉 / VR头显 |
| 25/09 | [杭州国际电子音乐节「滴流」一等奖](./projects/dropflow-award-2025.md) | 竞赛获奖 / 滴流 |
| 25/08 | [上海西岸漩心「Round a Clock」](./projects/westbund-ambient-visual-2025.md) | 视觉制作 / Round a Clock |
| 25/07-08 | [杭州中心美术馆「巴别瓶」](./projects/babel-bottle-art-2025.md) | 参展艺术家 / 工作坊导师 |
| 25/07 | [UFO Terminal「滴流3.0」](./projects/dropflow3-live-2025.md) | 音画现场 / 滴流3.0 |
| 25/07 | [西安万象城「数字游园」](./projects/digital-garden-visual-2025.md) | Unity VFX / 商业空间 |
| 25/07 | [深圳坪山「观察与共生」](./projects/observe-symbiosis-exhibit-2025.md) | 数据可视化 / 坪山 |
| 23/11 | [西岸艺术博览会「以太碎片」](./projects/ether-fragment-exhibit-2023.md) | 影像展映 / 艺博会 |
| 23/08 | [上海K11「观察与共生」](./projects/observe-symbiosis-k11-2023.md) | 视频装置 / K11 |
| 23/01 | [安昌光影艺术季](./projects/glance-thousand-install-2023.md) | 古桥投影 / 光影艺术季 |
| 22/12 | [深圳光影艺术季AR](./projects/ar-shenzhen-resort-2022.md) | AR作品 / 光影艺术季 |
| 22/09 | [西岸凤巢AI PLAZA](./projects/meta-speaker-install-2022.md) | 数字艺术 / AI PLAZA |

---

### 作品 | Visual Arts

> 个人创作系列 [更多](./visual-arts/)
> 公开视频、官网与微信原文索引见 [已核对外部链接与公开资料索引](./visual-arts/已核对外部链接与公开资料索引.md)

这一部分更偏个人长期创作线，和上面的项目参与记录不是同一层。

可以把它理解为：

- `项目参与`：我参与过哪些现实项目
- `作品`：我持续发展的个人创作系列

| 系列 | 版本数 | 说明 |
|------|--------|------|
| [Timer系列](https://github.com/ewanqian/VIRTURA-SpacePort/tree/main/organization/works/timer-series) | 5 | 音画联动 / Chinagraph 2024 二等奖 |
| [滴流系列](https://github.com/ewanqian/VIRTURA-SpacePort/tree/main/organization/works/drop-flow-series) | 7 | 空间叙事 / 杭州双年展开幕 |
| [Kashiwa Daisuke系列](./visual-arts/kashiwa-daisuke-series/) | 20+ | 日本音乐人合作 / 巡演视觉 |
| [日常练习](./visual-arts/daily-practice/) | 持续更新 | Blender / 扫描 / 点云 |

---

### 自发研究项目

> 个人发起的长期研究项目与工具

| 项目 | 说明 | 链接 |
|------|------|------|
| VIRTURA-Collective | 团队主入口 | [GitHub](https://github.com/ewanqian/VIRTURA-Collective) |
| VIRTURA-SpacePort | 公共导览前台 / 公开资料库 | [GitHub](https://github.com/ewanqian/VIRTURA-SpacePort) |
| SceneForge | 舞台查看器 / 网页预演 | [GitHub](https://github.com/ewanqian/SceneForge) |
| LiveForge | 演出工作流 / 已冻结 | [GitHub](https://github.com/ewanqian/LiveForge) |
| RepoForge | 仓库治理 / 自动化运维 | [GitHub](https://github.com/ewanqian/RepoForge) |
| Senia-Digital-Resort | 空间实验 / Minecraft | - |

---

### 合作与委托
> 基于多年一线大屏工程与沉浸式演出落地经验，聚焦解决中小团队/下沉市场文旅项目、独立创作者的核心痛点：**制作成本高、素材无法复用、隐性返工成本多、技术门槛高**

如果你只关心合作方向，可以先看下面三块：

- 企业 / 商业项目服务
- 独立创作者服务
- 核心优势

#### 企业/商业项目服务
1. 现场演出视觉全流程交付
2. 轻量化光影内容定制
3. 沉浸式内容制作
4. 数字资产沉淀服务
5. 工程化工具与工作流搭建
6. 技术咨询

#### 独立创作者服务
1. 艺术项目商业落地适配
2. 个人资产库搭建咨询
3. 工程化模板定制
4. 行业分享与工作坊

#### 核心优势
- 多年一线演出与展览落地经验
- 工程化思维为核心的复用工作流
- 实时引擎与AI工具落地应用
- 兼顾艺术审美与商业落地
- 轻量化运作，适配中小项目

---

### 🔗 链接与开源仓库
- 个人GitHub：[https://github.com/ewanqian](https://github.com/ewanqian)
- 个人作品集官网：[https://ewanqian.github.io/portfolio](https://ewanqian.github.io/portfolio)
- VIRTURA-Collective：[https://github.com/ewanqian/VIRTURA-Collective](https://github.com/ewanqian/VIRTURA-Collective)
- VIRTURA-SpacePort：[https://github.com/ewanqian/VIRTURA-SpacePort](https://github.com/ewanqian/VIRTURA-SpacePort)
- VIRTURA-Newsroom：[https://github.com/ewanqian/VIRTURA-Newsroom](https://github.com/ewanqian/VIRTURA-Newsroom)

---

> 本页面内容将持续更新
> 知识产权归钱誉文 Ewan Qian 所有，未经允许禁止商用
> 开源项目遵循MIT协议
