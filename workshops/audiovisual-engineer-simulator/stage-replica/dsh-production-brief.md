# Stage Replica｜DeepSeek Harness Production Brief

**Date:** 2026-10-15  
**Purpose:** 交给 DeepSeek Harness 执行的 4 个 Demo 生产要求、统一验收标准与任务清单。  
**Related:** `README.md` / `demo-packs.md` / `demo-prompts.md` / Issues #78–#81

---

# 0｜工作坊当前核心

## 舞台复刻 / Stage Replica
### 在真正进场之前，先把演出跑一遍

这不是单纯的舞台建模任务。Demo 要证明的是：

> 一个舞台想法可以先被低保真地搭出来，真正播放、观看、切换、修改，再逐步发展成自己的演出原型。

AI Coding 不替代 Blender、网页或其他现有软件。它可以寄宿在这些环境中，帮助快速修改结构、增加功能、替换内容、生成版本，并降低重复预演的成本。

四个 Demo 的共同目标不是“做一张漂亮效果图”，而是完成一次：

```text
REFERENCE
  ↓
GRAYBOX / STRUCTURE
  ↓
V1 RUN
  ↓
WATCH / FIND PROBLEMS
  ↓
EDIT
  ↓
V2 RUN
```

必须保留 V1 和 V2。只有做出第一版、完整看一遍、再修改，才算完成一个有效的 Stage Replica Demo。

---

# 1｜统一生产要求

## 1.1 软件环境不锁死

允许选择最适合当前 Demo 的载体：

- Browser / Three.js / WebGL
- Blender
- 已有三维工程
- 以上两种或多种组合

网页不是唯一主线；Blender 也不是门槛。判断标准是：**能否更快地把演出跑起来并继续迭代。**

## 1.2 每个 Demo 必须包含

- [ ] 1 组真实参考来源，并保存链接 / 截图来源
- [ ] 1 个低保真灰盒 / stage structure
- [ ] 明确的人物 / performer 尺度参考
- [ ] 4 个最小演出状态
- [ ] 至少 4 个 camera / viewpoint preset
- [ ] 自己的视觉或实时视觉真正进入场景
- [ ] V1 完整运行一次
- [ ] 记录 V1 的 3–5 个问题
- [ ] 修改后得到 V2
- [ ] V2 再完整运行一次
- [ ] 20–30 秒最终预演录屏
- [ ] 1 张 `reference → graybox → V1 → V2` 对照图
- [ ] README / notes 记录结构、尺寸、状态、修改原因

## 1.3 第一版不要做

- 不追求真实人群模拟
- 不追求真实 16K / 8K final output
- 不做复杂多人 WebRTC
- 不追求完整灯光控制台
- 不做完整 Unity / Unreal production pipeline
- 不用大量无关 AI 视频堆满所有屏幕
- 不为了技术炫技加入无法解释的功能

## 1.4 统一验收问题

每个 Demo 完成前回答：

1. 10 秒内能不能看懂这个空间的核心关系？
2. 人物、屏幕和观看位置是否有明确尺度？
3. 四个状态真的有不同，还是只换了素材？
4. V1 完整播放后发现了什么问题？
5. V2 具体删掉、改变或保留了什么？
6. 自己的内容放进去以后，是否真的比静态效果图多获得了信息？
7. 这个 Demo 是否可以作为工作坊案例，让参与者理解“为什么要预演”？

---

# 2｜Demo 01 — Sphere / Immersive Dome

**Issue:** #81  
**Priority:** P0 / 第一主 Demo  
**Role:** 大型演唱会 / 沉浸式空间主视觉

## 核心问题

> 同一个视觉从“前方一块屏”扩展到“包住整个观众”以后，构图、观看位置、音乐段落和视觉密度怎样改变？

## Proxy Spec

- `dome_radius_m`: 25
- `audience_floor_diameter_m`: 34
- `stage_platform`: 14m × 8m
- `proxy_master`: 4096 × 4096
- `fast_proxy`: 2048 × 2048
- `program_out`: 1920 × 1080

以上物理尺寸为教学 proxy，不声称为 Sphere 真实场馆尺寸。

## States

1. `HORIZON` — 只有低位 / 前方区域有内容，大面积保持暗
2. `ENCLOSE` — 内容开始向左右和顶部扩展
3. `FULL_FIELD` — 整个 Dome 形成连续环境
4. `APERTURE` — 大面积收回，只留下中央窗口 / opening

## Viewpoints

- `AUDIENCE_CENTER`
- `AUDIENCE_LEFT`
- `STAGE_LOOKBACK`
- `DEBUG_ORBIT`

## Production Checklist

- [ ] Hemisphere / Dome graybox
- [ ] performer / stage scale proxy
- [ ] 4096² proxy UV 或等效映射跑通
- [ ] 四状态完成
- [ ] 普通 16:9 source → front-window → full dome 的转换
- [ ] 至少一个自己的 WebGL / 视频内容进入 Dome
- [ ] 4 viewpoints
- [ ] V1 录屏并记录问题
- [ ] V2 至少修改构图面积、状态节奏或观看关系中的两项
- [ ] 20–30 秒宣传录屏
- [ ] `flat source → mapped dome → audience view → V2` 对照

## Done Definition

第一次看到的人应能理解：**预演的意义不是提前看一个 Dome 模型，而是提前发现“画面占据整个视野以后，原来的视觉为什么必须重新编排”。**

---

# 3｜Demo 02 — Festival / Two-Wall Stage

**Issue:** #78  
**Priority:** P1 / 第二主 Demo  
**Role:** 最容易一眼看懂课程怎么玩的音乐节案例

## 核心问题

> 两块巨型屏幕什么时候应该独立，什么时候应该连成一个整体？中央 performer 怎样保持视觉中心？

## Proxy Spec

- Stage: 44m W × 20m D
- Screen L: 18m × 9m / inward 18°
- Screen R: 18m × 9m / inward 18°
- DJ platform: 6m × 4m
- Raster: 2048 × 1024 each

## States

- `LOW`
- `BUILD`
- `PEAK`
- `RELEASE`

## Cameras

- `FOH_WIDE`
- `DJ_FRONT`
- `STAGE_LEFT`
- `HIGH_WIDE`

## Production Checklist

- [ ] 两屏 + 中央 performer 灰盒
- [ ] 两屏可独立显示不同内容
- [ ] 同一 source 可通过 crop / UV / offset 形成两种构图
- [ ] LOW / BUILD 中两屏不完全同步
- [ ] PEAK 才第一次形成整体视觉
- [ ] RELEASE 明确退回低密度状态
- [ ] 至少一个自己的 loop / real-time source
- [ ] 4 cameras
- [ ] V1 完整播放并记录 3–5 个问题
- [ ] V2 至少修改屏幕关系、视觉密度或状态持续时间中的两项
- [ ] 20–30 秒录屏
- [ ] `reference → two-wall graybox → own content → V2` 对照

## Done Definition

第一次看到的人应能理解：**不是把两个屏幕都塞满，而是在预演里真正看出“什么时候分开、什么时候连接”会改变演出。**

---

# 4｜Demo 03 — Installation / Black Box

**Issue:** #80  
**Priority:** P2 / 第三主 Demo  
**Role:** 证明 Stage Replica 不只适用于演唱会

## 核心问题

> 当素材很少、变化很慢时，尺寸、观看距离、声音与持续时间能否共同形成完整现场？

## Proxy Spec

- Main projection: 10.24m × 5.4m
- Raster: 4096 × 2160
- Black box: 14m W × 18m D × 7m H
- Viewer zone: 6–12m
- Optional floor projection: 10.24m × 5.4m（教学扩展）

## States

- `SPARSE`
- `ACCUMULATE`
- `DENSE`
- `AFTERIMAGE`

## Viewpoints

- `CENTER`
- `FAR`
- `LEFT`
- `FLOOR`

## Production Checklist

- [ ] 极简黑盒灰盒
- [ ] 正确的主投影尺度
- [ ] viewer distance 可切换
- [ ] 四状态保持同一视觉规则，不用四条无关视频
- [ ] 至少一个 Visual Audio / WebGL / 自己的视频 source
- [ ] 墙面 only 与 wall + floor 两个版本对比
- [ ] 音频可以播放，但不要求 audio-reactive
- [ ] V1 完整观看一遍
- [ ] 记录“太满 / 太快 / 太累 / 尺度不对”等实际问题
- [ ] V2 至少修改密度、持续时间、观看位置或空间投影中的两项
- [ ] 20–30 秒 walkthrough
- [ ] `single image → spatial version → V2` 对照

## Done Definition

必须能证明：**少量素材也可以通过预演被组织成一个成立的现场；课程不是“做大屏模板”。**

---

# 5｜Demo 04 — Stadium / 360° Concert

**Issue:** #79  
**Priority:** P3 / 技术强化 Demo  
**Role:** Camera / Director / Program Out 验证

## 核心问题

> 同一条视觉进入 360° 圆柱媒体面以后，人物、观看位置和导播切换怎样改变最终观看结果？

## Proxy Spec

- Arena proxy: 120m diameter
- Main stage: 30m diameter
- Performer zone: 12m diameter
- LED cylinder: 20m diameter × 8m H（8m 为教学 proxy）
- Panorama master: 4096 × 512
- Fast proxy: 2048 × 256
- Program out: 1920 × 1080

## States

- `LOW`
- `BUILD`
- `PEAK`
- `RELEASE`

## Cameras

- `BOWL_WIDE`
- `PERFORMER_FRONT`
- `ORBIT_45`
- `TOP`

## Production Checklist

- [ ] 30m 圆形舞台 graybox
- [ ] 20m 圆柱 LED + cylindrical UV
- [ ] performer proxy
- [ ] 单条 panoramic source 跑通
- [ ] 16:9 输入至少支持 front-window / repeat-test / shader-fill 中两种
- [ ] 四状态完成
- [ ] Quad Preview
- [ ] Program Out
- [ ] Cut only v1
- [ ] 1–4 数字键切 camera
- [ ] V1 完整切一轮导播
- [ ] 记录哪些 camera 让视觉关系变坏或变清楚
- [ ] V2 修改 camera sequence 与至少一个视觉状态
- [ ] 20–30 秒最终导播录屏
- [ ] `panorama source → cylinder → camera views → Program` 对照

## Done Definition

必须让参与者看到：**舞台预演不只是在看模型；摄像机本身也在重新编排演出。**

---

# 6｜Shared Realtime / Media Source

所有 Demo 尽量使用统一 source abstraction：

```text
file     → mp4 / webm / image
canvas   → Three.js / Shader / Visual Audio
capture  → getDisplayMedia()
webrtc   → remote MediaStreamTrack
```

同机优先直接使用 canvas / texture / captureStream；只有跨设备时再上 WebRTC。

统一 stream state：

```text
idle → armed → connecting → live → fallback → offline
```

V1 不需要复杂 SFU。目标是让上一期实时音画页面、自己的 WebGL 或视频能够真正进入 Stage Replica。

---

# 7｜DSH 执行顺序

## Phase 1 — 读资料，不开工

- [ ] 读取 `README.md`
- [ ] 读取 `demo-packs.md`
- [ ] 读取 `demo-prompts.md`
- [ ] 读取 Issues #78–#81
- [ ] 建立 4 个 Demo 的独立任务目录
- [ ] 输出计划，不修改核心要求

## Phase 2 — Sphere P0

- [ ] graybox
- [ ] mapping
- [ ] 4 states
- [ ] own source
- [ ] 4 viewpoints
- [ ] V1
- [ ] review notes
- [ ] V2
- [ ] recording / stills

## Phase 3 — Festival P1

同样执行 `graybox → states → V1 → review → V2 → recording`。

## Phase 4 — Installation P2

同样执行，并重点检查 duration / density / viewer distance。

## Phase 5 — Stadium P3

最后完成 Camera / Director / Program Out 技术强化。

---

# 8｜DSH 行为约束

- 不因为“更酷”擅自替换 Demo 类型。
- 不把 proxy 尺寸说成真实场馆精确尺寸。
- 不直接生成大量高保真内容掩盖空间问题。
- 每完成一个阶段先跑一次，再继续。
- 保留失败版本与修改记录，不覆盖 V1。
- 不自动删除用户已有资产。
- 新增依赖前记录用途。
- 如果 Web 版本已经能说明问题，不为了技术复杂度强行换引擎。
- 如果 Blender 更适合当前关系，则允许直接在 Blender 中继续迭代。

最终判断标准只有一个：

> **这个 Demo 是否让“在真正进场之前，先把演出跑一遍”变得可见、可操作、可修改。**
