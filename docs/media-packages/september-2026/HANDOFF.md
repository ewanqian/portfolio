# September 2026 media handoff

## 任务范围

本包只交付派生资产、作品文本与接手说明。没有创建网页、改路由、改首页、上传或发布。用户要求由后续线上 agent 组织网页。

## 入口

- `projects/atmospheric-escape-2026.md`：ATMOSPHERIC ESCAPE 中英文文稿与图注。
- `projects/no-further-input-required-2026.md`：《无需进一步输入》中英文文稿、展览事实、图注。
- `projects/reactor-2026-09-05.md`：REACTOR 事件档案中英文文稿。
- 本目录 `asset-manifest.json` / `.csv`：每个派生文件的来源、尺寸、用途、剪辑时间、署名与 hash。
- 本目录 `source-manifest.json`：50 个源文件的首轮盘点与质量评级；内部使用，不渲染到网页。

## 三页结构

|页面|对象类型|首屏|后续内容|
|---|---|---|---|
|ATMOSPHERIC ESCAPE|work / realtime visual system|arcky 轨道全景 hero；点击播放 selected-live-16x9.mp4|作品短文 → 轨道／人物／粒子短片 → 航天器竖图 → ENTROPY 事件关联|
|No Further Input Required|independent work|longlonglong 展陈图，保留竖向完整比例|作品短文 → exhibition → poster；未来可独立增加 original / live-adaptation|
|REACTOR 2026.09.05|event archive|geometric-highlight-poster.avif；点击播放同名 MP4|事件短文 → geometric / rectilinear 两段 → 跨作品关联与扫描库引用|

沿用已确认方向：黑底、大幅媒体、简短双语。优先原生 16:9；竖图使用 contain 或自然比例，不强裁 16:9。不需要创作新品牌视觉。

## 对象边界

- ATMOSPHERIC ESCAPE 是作品／实时视觉系统；ENTROPY 是 2026.09.05 上海演出事件。
- CELESTIAL / SIGNAL / SPACECRAFT / ENERGY 是用户提供的四个 sequence。素材名称使用可观察描述，不把推测直接写进 sequence 字段。
- REACTOR 是事件，不要创建名为 REACTOR 的独立原创作品。该事件可关联多个作品。
- 《无需进一步输入》独立。REACTOR 矩形画面与它有视觉相似，但不足以证明 live-adaptation 归属；未经用户确认不连为该作品的演出版。
- 工厂点云归 `Personal Scan Library / Factory Scans / Memory Factory`。现场照片仍是 PHOTO、视频仍是 VIDEO；不要把“画面包含扫描”误写成“文件本身是原始扫描”。具体扫描来源仍待确认。
- 扫描资产只存库目录一次；作品／事件页面通过引用使用，不复制成 ATMOSPHERIC ESCAPE 原创视觉。

## 资产目录与命名

所有新媒体都是有含义的 ASCII slug；源文件不改名。`source-manifest.json` 保留原名用于追溯。

```
assets/works/atmospheric-escape/
assets/works/no-further-input-required/
assets/events/entropy-2026-09-05/
assets/events/reactor-2026-09-05/
assets/library/scans/factory/memory-factory/
```

照片选择 9 张，包括海报；每张 hero / preview / thumb 三种 AVIF。长边上限 2400 / 1600 / 640，不放大低分辨率来源。海报与展陈图均不改变比例。其余源文件留原地，50 条仍可从来源清单定位。

视频为精剪静音 H264 MP4，优先 1920×1080 / 30fps。REACTOR 横版来源只有 1280×720，保留原生清晰度，没有放大后标作原生 1080p。所有剪辑 in/out 写入资产清单。未添加音乐、字幕、虚构运镜或生成画面。保留各段单独文件与 ATMOSPHERIC ESCAPE 合辑（20.7 秒）。另交付 REACTOR 工厂点云竖版 720×1280 片段，存扫描库目录；用作次级记录，不裁成横版。

## 动图

`memory-factory-entropy-pointcloud-motion.avif`：从 M0043 的 0.5–3.5 秒截取，960×540、12fps、36 帧、无限循环。它是演出视频片段的动图衍生版，不是 Live Photo 原始动态，也不承诺首尾无缝。

同时提供真实 MP4 精彩片段与静态 poster。不要把完整视频改成 AVIF。网页优先使用 MP4 + poster；动态 AVIF 仅用于小幅循环展示，点击后再加载。静态 poster 作为失败与减少动态偏好时的替代；提供暂停／切换静态按钮。AVIF 图片不能像 video 一样直接 pause，暂停时应替换为 poster。上线前在目标浏览器检查动画是否真正逐帧播放，不能只测静态 AVIF 支持。

技术依据：AVIF 支持 image sequences，参见 https://github.com/AOMediaCodec/libavif/wiki/Sequences 。本机 ffmpeg avif muxer 支持 `-loop 0`；实际帧数在验证报告中记录。

## Live Photo 与程序截图

三个来源目录共 29 JPG、21 MP4，没有 MOV 配对文件；29 JPG 未检出内嵌 MP4 的 ftyp 标记。当前这批是静态图片与独立视频，未恢复出 Live Photo 动态。

仓库已按项目名称和截图文件名搜索（包括隐藏文件，排除依赖、git、构建目录），没有找到可确认对应这三页的程序截图。此结论仅指搜索范围，不等于整个硬盘不存在。M0049 包含控制屏与舞台，但为低质量竖视频；不伪装成程序原始截图，不纳入主资产。

用户补充截图目录后：保留原截图，确认所属作品、软件界面是否可公开，再输出 `作品名-system-overview-preview.avif`。未确认软件前，文稿不声称使用 TouchDesigner / Unity / Blender 或某种生成算法。

## 文稿事实依据

- 作品／事件边界、四个 sequence、日期：用户本次说明。
- ATMOSPHERIC ESCAPE 屏幕形态与空间：本地照片、视频可观察内容。文字中的观察仪器／拆解结构是视觉描述，不是技术实现声明。
- 《无需进一步输入》名称与作者：M0046 作品标签、M0047 海报图源署名。
- 展览标题、日期、HERO DOME 地点：M0047 海报。海报同时注明 9 月 11 日下午暂停开放，因此日期范围不能解释为每天全时段开放；作品文稿没有写开放时间建议。
- REACTOR：用户事件日期与 M0048–M0050 现场记录。城市、主办、演出者身份均未补猜。

## 署名与权限

- arcky、Hejian_z、longlonglong：文件名摄影 credit 已保留；对应媒体展示摄影署名。
- 未知摄影来源：manifest 保持 `unknown`，不能默认归 Ewan 拍摄。
- 原创作品作者与记录影像摄影作者是两个角色；摄影 credit 不代表已取得发布授权。
- 所有资产 `publication_ready=false`。这不影响本地整理／提交，但线上 agent 发布前须由用户确认权限。内部权限说明不得混入公开作品文稿。

## 接手步骤

1. 读取三份作品文稿、资产清单与本说明。
2. 确认媒体权限与需要的摄影署名。
3. 使用上表页面顺序；原型不必加入所有素材，避免同类镜头重复。
4. 原生 16:9 视频用 video controls / playsinline / preload=none 与对应 poster；自动播放仅静音且遵守减少动态偏好。
5. 从 manifest 读取实际尺寸；不要按文件名假定每个 hero 都是 2400px。
6. 验证静态 AVIF、动态 AVIF、MP4、手机比例、懒加载、署名与键盘操作。
7. 本次不改 `content/`、`database/` 或 generated 数据；线上 agent 按当前仓库 schema 正式落 work / node / asset 对象。

## 质量门禁

仓库要求的 `/Users/ewanqian/.codex/skills/virtura-final-quality-gate/scripts/final_quality_gate.py` 在此 Windows 环境不存在，本机技能目录也未找到副本。三份文稿作人工事实与公开措辞检查；不能声称官方门禁已通过。接手 agent 在有该脚本的环境对三份文稿运行正式门禁后再发布。

## 可复现

`python tools/build-september-media-package.py` 从本地来源生成媒体。来源索引默认指向本次 E 盘盘点；线上无需重跑，直接消费已交付资产。原图／原视频没有移动、覆盖、删除。未推送。
