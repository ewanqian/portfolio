# Stage Replica Demo Packs

**Date:** 2026-10-14  
**Use:** 10/31 宣传 Demo、课堂预演模板、后续网页工程 preset。

> 所有“Demo 几何设定”都是教学 / 预演用 proxy，不等于真实场馆精确施工尺寸。能确认的公开数据会单独标明。

## Shared Web Architecture

### Scene Manifest

建议所有 Demo 最后统一成同一个 `scene.json` 结构：

```json
{
  "sceneId": "festival-quasar-a",
  "units": "meters",
  "screens": [],
  "cameras": [],
  "states": ["LOW", "BUILD", "PEAK", "RELEASE"],
  "programCamera": "CAM_1"
}
```

每块 screen 至少保留：

```text
id / shape / physicalSize / raster / transform / source / fallback
```

### Screen Source

- `file`: mp4 / webm / image
- `canvas`: Three.js / Shader / Visual Audio panel
- `capture`: `getDisplayMedia()`
- `webrtc`: remote MediaStreamTrack

### WebRTC Minimal Flow

```text
Browser / WebGL / Visual Audio
        ↓
getDisplayMedia() / canvas.captureStream()
        ↓
Publisher
        ↓ WebRTC
Stage Replica Viewer
        ↓ VideoTexture
Stage Screen
```

第一版不需要 SFU。目标是 1 publisher → 1 viewer / 同局域网演示。Signaling 可用轻量 WebSocket。

统一状态：

```text
idle → armed → connecting → live → fallback → offline
```

- `armed`: 用户已主动选择 capture source；浏览器权限不允许无授权自动捕获。
- `fallback`: 保持最后一帧或切本地 loop。
- 同机运行时，优先直接共享 canvas / texture；跨设备才走 WebRTC。

### Camera / Director

所有 Demo 预留：

- 4 Camera Presets
- Quad Preview
- Program Out
- 数字键 `1–4` Cut
- `Space` 回默认主视角

第一版只做 Cut，不必先做复杂转场。

---

# A｜Festival / Coachella Quasar-inspired

**Issue:** #78  
**Reference:** Vita Motus / Quasar 2024

公开参考可确认：Quasar 以两块 monolithic LED walls 为核心，艺人在中间，支持实时内容 playback，并刻意让数字画面与 Coachella 周围景观共存。

Reference:
- https://vitamotus.com/project/coachella-quasar-2024/
- https://vitamotus.com/press/
- https://jakehalbakken.com/work/quasar-stage-coachella-2024/

## Demo Spec

| Item | Spec |
|---|---|
| Stage | 44m W × 20m D |
| Screen L | 18m × 9m, inward 18° |
| Screen R | 18m × 9m, inward 18° |
| DJ Platform | 6m × 4m |
| Screen Raster | 2048 × 1024 each |
| Preview | 2560 × 1440 |

States: `LOW / BUILD / PEAK / RELEASE`

Camera: `FOH_WIDE / DJ_FRONT / STAGE_LEFT / HIGH_WIDE`

Primary test: **两块屏幕如何从独立状态变成一个整体。**

---

# B｜Stadium / 360° Concert

**Issue:** #79  
**Reference:** STUFISH — Anna Vissi / Live at OAKA

公开参考可确认：95,000 人环绕观看；30m circular stage；20m cylindrical blow-through LED screen。

Reference:
- https://stufish.com/project/anna-vissi/

## Demo Spec

| Item | Spec |
|---|---|
| Arena Proxy | 120m diameter |
| Main Stage | 30m diameter |
| Performer Zone | 12m diameter |
| LED Cylinder | 20m diameter × 8m H* |
| Halo Ring | 12m diameter |
| Cylinder Master | 4096 × 512 |
| Fast Proxy | 2048 × 256 |
| Program Out | 1920 × 1080 |

`* 8m 高度为教学 Demo 自定义；不是公开来源中的已确认原项目高度。`

States: `LOW / BUILD / PEAK / RELEASE`

Camera: `BOWL_WIDE / PERFORMER_FRONT / ORBIT_45 / TOP`

Primary test: **同一条视觉进入 360° 圆柱屏以后，人物、观看位置和导播如何改变它。**

---

# C｜Installation / data-verse-inspired

**Issue:** #80  
**Reference:** Ryoji Ikeda — data-verse

公开参考可确认：DCI-4K DLP projector、computer、speakers；展示尺寸可变，minimum W10.24 × H5.4m。

Reference:
- https://www.ryojiikeda.com/project/x_verse/
- https://www.ryojiikeda.com/archive/works/

## Demo Spec

| Item | Spec |
|---|---|
| Main Projection | 10.24m × 5.4m |
| Raster | 4096 × 2160 |
| Black Box | 14m W × 18m D × 7m H |
| Viewer Zone | 6–12m |
| Optional Floor | 10.24m × 5.4m* |

`* Floor 是课程比较实验，不声称为 data-verse 原作配置。`

States: `SPARSE / ACCUMULATE / DENSE / AFTERIMAGE`

Viewpoints: `CENTER / FAR / LEFT / FLOOR`

Primary test: **少量素材、长时间状态、声音与观看距离如何形成完整现场。**

---

# D｜Sphere / Immersive Dome

**Issue:** #81  
**Reference:** Sphere Studios — Media Plane

公开参考可确认：Media Plane 为 16K × 16K，display surface 超过 3 acres，屏幕向上并围绕观众展开。

Reference:
- https://www.thesphere.com/studios-proxy/spherestudios/canvases
- https://www.spherestudios.com/capabilities
- https://www.spherestudios.com/spherestudios/v-u2-immersive-concert-film

## Demo Spec

| Item | Spec |
|---|---|
| Dome Radius | 25m* |
| Audience Floor | 34m diameter* |
| Stage Platform | 14m × 8m* |
| Proxy Master | 4096 × 4096 |
| Fast Proxy | 2048 × 2048 |
| Program Out | 1920 × 1080 |

`* 物理尺寸全部是低保真教学 proxy，不是 Sphere 实际场馆尺寸。`

States: `HORIZON / ENCLOSE / FULL_FIELD / APERTURE`

Viewpoints: `AUDIENCE_CENTER / AUDIENCE_LEFT / STAGE_LOOKBACK / DEBUG_ORBIT`

Primary test: **同一视觉从“前方屏幕”扩展到“包裹整个观众”时，构图与音乐结构怎么改变。**

---

# Demo Production Order

如果时间紧，优先级：

1. **Festival** — 最快看懂，适合宣传第一条
2. **Stadium** — 把摄像机 / 导播功能做出来
3. **Sphere** — 最有规模感，适合主视觉
4. **Installation** — 用来证明 Stage Replica 不是只做大型演唱会

## 每个 Demo 的最低交付

- 1 张参考图 / 官方案例页面
- 1 张灰模结构图
- 1 张自己的视觉放入后的画面
- 4 states
- 4 cameras / viewpoints
- 20–30 秒录屏
- 1 张 `reference → structure → own content` 对照图

## 第一版不要做

- 不追求完整灯光控制台
- 不追求真实人群模拟
- 不追求真实 16K / 8K 输出
- 不做复杂多人 WebRTC
- 不做完整 Unity / Unreal pipeline
- 不把 AI 生成素材本身当成 Demo 价值

第一版只证明：

> **参考可以被拆开；自己的内容可以放进去；状态可以被编排；网页里可以真正预演。**
