# Projects Index

> 这是 `projects/` 的总索引，也是人工项目文档与对象化数据库之间的桥接页。
> 项目正文放在 `projects/*.md`，结构化索引放在 `database/works.json`，前台展示再从 `content/` 与 `react/src/data/generated/` 继续编译。

## 使用原则

- `projects/*.md`：保留人工书写、版本脉络、背景说明、补录材料与非标准信息。
- `database/works.json`：保留稳定字段，是项目对象化的第一层入口。
- `content/`：保留前台要消费的精选对象，是内容系统的正式输入。
- `react/src/data/generated/`：构建产物，不直接手改。

## 当前总览

- 项目总数：40
- 已有项目正文：39
- 仅有对象索引、未补正文：1
- 推荐优先补录：先补 `featured: true` 且 `filePath: null` 的项目，再补高价值公开节点与重要合作。

## Featured Snapshot

- `observe-symbiosis-workshop-2026`：《观察与共生》Workshop｜高斯扫描/方法分享｜《观察与共生》Workshop 高斯扫描方法分享
- `rain-singapore-visual-2026`：Rain 新加坡跨年专场｜曲目+Opening视觉｜Rain 新加坡跨年专场视觉制作
- `yujiayun-45ping-visual-2025`：余佳运「45㎡」演唱会｜Opening+舞台视觉｜余佳运演唱会 Opening 和舞台视觉制作
- `drop-flow-visual-2025`：首届中国（杭州）艺术与科技国际双年展开幕式「滴流」｜沉浸式大屏+VR头显｜首届中国（杭州）艺术与科技国际双年展开幕式作品，沉浸式大屏视觉与 VR 头显内容制作
- `kashiwa-band-visual-2025`：Can Festival 舟山｜舞台视觉（参与部分）｜Can Festival 舟山 Kashiwa Daisuke 演出舞台视觉
- `kashiwa-titan-visual-2025`：柏大辅 / KASHIWA Daisuke《TITAN》深圳专场｜视觉制作（全息纱幕 / 裸眼 3D / 音画互动）｜围绕《TITAN》展开的现场音画视觉项目，负责全息纱幕、裸眼 3D 与音画互动视觉部分
- `shanhaifusheng2-visual-2025`：爱丁堡《山海浮生II》｜舞台视觉｜爱丁堡《山海浮生II》舞台视觉制作
- `new-media-artist-simulator-2025`：杭州中心「巴别瓶」｜交互作品参展｜杭州中心美术馆「巴别瓶」新媒体艺术家模拟器交互作品参展
- `observe-symbiosis-exhibit-2025`：深圳坪山「观察与共生」｜数据可视化｜深圳坪山「观察与共生」展览数据可视化
- `digital-garden-visual-2025`：西安万象城「数字游园」｜Unity VFX Graph｜西安万象城「数字游园」Unity VFX Graph 视觉开发
- `drop-flow-ufo-2025`：UFO Terminal「滴流3.0」｜音画互动现场｜UFO Terminal「滴流3.0」音画互动现场
- `derive-dual-city-2024`：FutureLab 2024「Dérive 双城记」｜城市扫描 / Apple Vision Pro 呈现｜FutureLab 城市空间叙事实践
- `timer-series-visual-2024`：Timer 系列｜视觉设计、现场呈现｜Timer 系列作品的展映、现场视觉呈现与环形沉浸屏幕实验，获 ChinaGraph 2024 二等奖。
- `ether-fragment-exhibit-2023`：西岸艺术博览会「以太碎片」｜影像展映｜西岸艺术博览会「以太碎片」影像展映
- `xtep-xdna22aw-visual-2022`：上海时装周XTEP-XDNA｜视频制作｜上海时装周 XTEP-XDNA 视频内容制作

## 演艺舞台 / Audiovisual Collaborations

| 时间 | slug | 项目 | 角色 | 地点/语境 | 类型 | 状态 | 关联节点 | 奖项/信号 | 项目文档 | 内容状态 |
|------|------|------|------|-----------|------|------|----------|-----------|----------|----------|
| 26/01 | `rain-singapore-visual-2026` | Rain 新加坡跨年专场 | 曲目+Opening视觉 | Singapore | Stage | done | - | - | [doc](./rain-singapore-visual-2026.md) | doc / featured / db-only |
| 25/11 | `yujiayun-45ping-visual-2025` | 余佳运「45㎡」演唱会 | Opening+舞台视觉 | China | Stage | done | - | - | [doc](./yujiayun-45ping-visual-2025.md) | doc / featured / db-only |
| 25/10 | `kashiwa-band-visual-2025` | Can Festival 舟山 | 舞台视觉（参与部分） | Zhoushan Can Festival | Stage | done | `kashiwa-can-festival-zhoushan-2025` | - | [doc](./kashiwa-band-visual-2025.md) | doc / featured / content-ready |
| 25/10 | `kashiwa-titan-visual-2025` | Kashiwa Daisuke 深圳专场 | 视觉制作（全息纱幕 / 裸眼3D / 音画互动） | Shenzhen BO LIVE | Stage | done | `kashiwa-bo-live-shenzhen-2025` | - | [doc](./kashiwa-titan-visual-2025.md) | doc / featured / db-only |
| 25/08 | `shanhaifusheng2-visual-2025` | 爱丁堡《山海浮生II》 | 舞台视觉 | Edinburgh | Stage | done | - | - | [doc](./shanhaifusheng2-visual-2025.md) | doc / featured / db-only |
| 25/05 | `future-string-tianhua-2025` | 中央音乐学院王楚婷博士毕业音乐会 | Audiovisual 新媒体视觉制作 | Beijing | Stage | done | - | - | [doc](./future-string-tianhua-2025.md) | doc / standard / db-only |
| 24/06 | `hallu-resonance-live-2024` | THE BOXX「幻觉共振」沉浸式视听演出 | 视觉演出执行 | Shanghai THE BOXX | Live | done | - | - | [doc](./hallu-resonance-live-2024.md) | doc / standard / db-only |
| 24/01 | `onefive-chocolove-video-2024` | @onefive「ChocoLove」Official Lyric Video | 视频制作 | Official Release | Video | done | - | - | [doc](./onefive-chocolove-video-2024.md) | doc / standard / db-only |
| 23/12 | `onefive-underground-visual-2023` | @onefive Underground | 视觉制作 | Japan | Stage | done | - | - | [doc](./onefive-underground-visual-2023.md) | doc / standard / db-only |
| 23/11 | `onefive-overground-visual-2023` | @onefive Overground | 视觉制作 | Japan | Stage | done | - | - | [doc](./onefive-overground-visual-2023.md) | doc / standard / db-only |
| 23/10 | `lonely-av-live-2023` | 上海广播艺术中心「孤独？」 | 舞台视觉 | Shanghai | Stage | done | - | - | [doc](./lonely-av-live-2023.md) | doc / standard / db-only |
| 22/11 | `watermusic-multi-visual-2022` | CHINATIME Hamburg《Water Music》 | 多媒体视觉 | Hamburg, Germany | Stage | done | - | - | [doc](./watermusic-multi-visual-2022.md) | doc / standard / db-only |
| 22/10 | `xiexindance-sixiang-gong-visual-2022` | 谢欣舞蹈剧场《四相》《汞》 | 影像视觉制作 | 上海国际舞蹈中心 | Stage | done | - | - | [doc](./xiexindance-sixiang-gong-visual-2022.md) | doc / standard / db-only |
| 22/09 | `xtep-xdna22aw-visual-2022` | 上海时装周XTEP-XDNA | 视频制作 | Shanghai Fashion Week | Stage | done | - | - | [doc](./xtep-xdna22aw-visual-2022.md) | doc / featured / db-only |
| 22/01 | `migu-olympic-vfx-2022` | 中国移动咪咕冬奥宣传片 | 视觉制作 | China | Video | done | - | - | [doc](./migu-olympic-vfx-2022.md) | doc / standard / db-only |
| 21/09 | `zcool-hp-live-2021` | 站酷 2021 CUBE 设计大会 HP G8 工作站发布会 | 视觉制作 | Beijing | Stage | done | - | - | [doc](./zcool-hp-live-2021.md) | doc / standard / db-only |
| 21/01 | `rythem-newyear-live-2021` | 上海新天地 Rythem 新年跨年演出 | 视觉制作 | Shanghai | Stage | done | - | - | [doc](./rythem-newyear-live-2021.md) | doc / standard / db-only |

## Drop Flow / 时间-空间作品线

| 时间 | slug | 项目 | 角色 | 地点/语境 | 类型 | 状态 | 关联节点 | 奖项/信号 | 项目文档 | 内容状态 |
|------|------|------|------|-----------|------|------|----------|-----------|----------|----------|
| 25/11 | `drop-flow-qingdao-2025` | 重庆「流光绘影」光影科技艺术节「滴流」 | 异形屏幕装置 | Chongqing | Exhibition | done | - | `2025 流光绘影 光影科技艺术节优秀作品` | pending | index-only / standard / db-only |
| 25/10 | `drop-flow-visual-2025` | 首届中国（杭州）艺术与科技国际双年展开幕式「滴流」 | 沉浸式大屏+VR头显 | Hangzhou Biennale | Exhibition | done | `drop-flow-hangzhou-biennale-2025` | - | [doc](./drop-flow-visual-2025.md) | doc / featured / content-ready |
| 25/07 | `drop-flow-ufo-2025` | UFO Terminal「滴流3.0」 | 音画互动现场 | UFO Terminal Shanghai | Live | done | `drop-flow-ufo-terminal-2025` | - | [doc](./dropflow3-live-2025.md) | doc / featured / content-ready |

## 时间结构 / Temporal Structures

| 时间 | slug | 项目 | 角色 | 地点/语境 | 类型 | 状态 | 关联节点 | 奖项/信号 | 项目文档 | 内容状态 |
|------|------|------|------|-----------|------|------|----------|-----------|----------|----------|
| 24/08 | `timer-series-visual-2024` | Timer 系列 | 视觉设计、现场呈现 | Shanghai / Hangzhou | Series | done | - | `ChinaGraph 2024 电子剧场优秀音乐作品二等奖` | [doc](./timer-series-visual-2024.md) | doc / featured / content-ready |

## 城市扫描 / Spatial Archive

| 时间 | slug | 项目 | 角色 | 地点/语境 | 类型 | 状态 | 关联节点 | 奖项/信号 | 项目文档 | 内容状态 |
|------|------|------|------|-----------|------|------|----------|-----------|----------|----------|
| 24/11 | `derive-dual-city-2024` | FutureLab 2024「Dérive 双城记」 | 城市扫描 / Apple Vision Pro 呈现 | 上海西岸艺术中心 N 馆 | Exhibition | done | - | FutureLab 2024 | [doc](./derive-dual-city-2024.md) | doc / featured / content-ready |

## 环境、展览与感知系统 / Perceptual Environments

| 时间 | slug | 项目 | 角色 | 地点/语境 | 类型 | 状态 | 关联节点 | 奖项/信号 | 项目文档 | 内容状态 |
|------|------|------|------|-----------|------|------|----------|-----------|----------|----------|
| 26/01 | `observe-symbiosis-workshop-2026` | 《观察与共生》Workshop | 高斯扫描/方法分享 | China | Workshop | done | - | - | [doc](./observe-symbiosis-workshop-2026.md) | doc / featured / content-ready |
| 25/09 | `wavefilm-hackathon-staff-2025` | 海浪电影周艺动 AI 电影黑客松 | 活动执行 | Aranya, Qinhuangdao | Event Support | done | - | - | [doc](./wavefilm-hackathon-staff-2025.md) | doc / standard / db-only |
| 25/08 | `new-media-artist-simulator-2025` | 杭州中心「巴别瓶」 | 交互作品参展 | Hangzhou Center | Exhibition | done | `babel-bottle-hangzhou-center-2025` | - | [doc](./new-media-artist-simulator-2025.md) | doc / featured / content-ready |
| 25/08 | `westbund-ambient-visual-2025` | 上海西岸漩心 | 环境视觉 | Westbund Shanghai | Exhibition | done | - | - | [doc](./westbund-ambient-visual-2025.md) | doc / standard / db-only |
| 25/07 | `observe-symbiosis-exhibit-2025` | 深圳坪山「观察与共生」 | 数据可视化 | Shenzhen Pingshan | Exhibition | done | `observe-symbiosis-pingshan-2025` | - | [doc](./observe-symbiosis-exhibit-2025.md) | doc / featured / content-ready |
| 25/07 | `digital-garden-visual-2025` | 西安万象城「数字游园」 | Unity VFX Graph | Xi'an MixC | Exhibition | done | - | - | [doc](./digital-garden-visual-2025.md) | doc / featured / content-ready |
| 25/07 | `vrplay-hackathon-visual-2025` | VRplay WORLD REMIX XR 黑客松 | 视觉制作 | China | Event Support | done | - | - | [doc](./vrplay-hackathon-visual-2025.md) | doc / standard / db-only |
| 25/06 | `flatland-mr-content-2025` | WWDC Flatland: Mixed Reality Dreams | 内容制作 | Santa Clara, USA | Mixed Reality | done | - | - | [doc](./flatland-mr-content-2025.md) | doc / standard / db-only |
| 24/06 | `hallu-matrix-exhibit-2024` | THE BOXX「幻觉矩阵」沉浸式多媒体展 | 参展艺术家 | Shanghai THE BOXX | Exhibition | done | - | - | [doc](./hallu-matrix-exhibit-2024.md) | doc / standard / db-only |
| 23/11 | `ether-fragment-exhibit-2023` | 西岸艺术博览会「以太碎片」 | 影像展映 | Westbund Art Fair Shanghai | Exhibition | done | - | - | [doc](./ether-fragment-exhibit-2023.md) | doc / featured / content-ready |
| 23/08 | `observe-symbiosis-k11-2023` | 上海K11「观察与共生」 | 视频装置 | K11 Shanghai | Exhibition | done | - | - | [doc](./observe-symbiosis-k11-2023.md) | doc / standard / db-only |
| 23/06 | `vaoe-exhibition-2023` | 虚拟航线 VAOE | 策划与呈现 | Shanghai | Exhibition | done | - | - | [doc](./vaoe-exhibition-2023.md) | doc / standard / db-only |
| 23/05 | `life-praise-install-2023` | 上海世纪汇广场《生命的礼赞》 | 气膜装置视觉制作 | Shanghai | Installation | done | - | - | [doc](./life-praise-install-2023.md) | doc / standard / db-only |
| 23/03 | `nature-numeral-install-2023` | 龙湖上海奉贤天街「数字空间与自然共生」 | 视频艺术装置制作 | Shanghai | Installation | done | - | - | [doc](./nature-numeral-install-2023.md) | doc / standard / db-only |
| 23/01 | `glance-thousand-install-2023` | 安昌光影艺术季 | 古桥投影 | Anchang | Exhibition | done | - | - | [doc](./glance-thousand-install-2023.md) | doc / standard / db-only |
| 22/12 | `ar-shenzhen-resort-2022` | 深圳光影艺术季AR | AR作品 | Shenzhen Light Art Festival | Exhibition | done | - | - | [doc](./ar-shenzhen-resort-2022.md) | doc / standard / db-only |
| 22/09 | `meta-speaker-install-2022` | 西岸凤巢 AI PLAZA《元语者・棱镜现实》 | 地面数字艺术装置 | Westbund AI PLAZA Shanghai | Exhibition | done | - | - | [doc](./meta-speaker-install-2022.md) | doc / standard / db-only |
| 22/03 | `matrix-navi-2022` | 上海青年艺术博览会「矩阵导航」 | 参展 | Shanghai | Installation | done | - | - | [doc](./matrix-navi-2022.md) | doc / standard / db-only |

## Coverage Gaps

- `drop-flow-qingdao-2025`：数据库中已有对象，但项目正文文档仍缺失，当前只有索引信息。

## Content Coverage

- 已进入 content/works 的对象数：13
- 当前已进入内容系统的 work ids：`derive-dual-city-2024`、`digital-garden-visual-2025`、`drop-flow-ufo-2025`、`drop-flow-visual-2025`、`drop-flow`、`ether-fragment-exhibit-2023`、`kashiwa-band-visual-2025`、`kashiwa`、`new-media-artist-simulator-2025`、`observe-symbiosis-exhibit-2025`、`observe-symbiosis-workshop-2026`、`timer-series-visual-2024`、`timer`
- 未进入 content/works 的项目仍然已经被 `database/works.json` 保底索引，不会因为首页改版或内容筛选而消失。

## 下一步建议

- 新增项目时，先写入 `database/works.json`，再决定是否需要独立 `projects/*.md` 正文。
- 当项目进入首页、Archive、Writing 或 public nodes 时，再同步写入 `content/` 对象。
- 如果某条信息还只是草稿、聊天记录、微信文章或现场笔记，也先把最稳定的字段落到 `database/works.json`，避免只存在于仓库角落里。

> 返回 [主目录](../README.md) ｜ 查看 [database 说明](../database/README.md)
