# shared｜共享契约与可复用层

**目的：** 让 4 个 Stage Replica Demo 共用同一套场景结构、media source 与机位契约，而不是产生四套不一致的工程。
**依据：** `workshops/audiovisual-engineer-simulator/stage-replica/demo-packs.md`（Shared Web Architecture）+ `dsh-production-brief.md` §6。

---

## 1｜Scene Manifest 契约

```json
{
  "sceneId": "sphere-dome-a",
  "units": "meters",
  "screens": [],
  "cameras": [],
  "states": ["HORIZON", "ENCLOSE", "FULL_FIELD", "APERTURE"],
  "programCamera": "AUDIENCE_CENTER"
}
```

每块 screen 至少包含：`id / shape / physicalSize / raster / transform / source / fallback`

- `shape` 允许：`plane` / `arc` / `cylinder` / `dome`
- `physicalSize` 用米；`raster` 标明 `master` / `fast` proxy
- `transform` 用 `positionM` / `rotationDeg`，避免出现第二个单位制
- `source` 与 `fallback` 至少要能表达"当前是本地还是实时源"以及"源丢失时怎么办"
- 允许额外顶层键（如 `structure`、`note`），但不得改变上述字段语义

**大尺度场地的已知陷阱：** 99 m 级屏幕会被 `scene.fog` 与 `camera.far` 吃掉；SceneForge 在 0.5.0 中已为此调整 `fog` / `camera.far` / `OrbitControls.maxDistance`。新场景必须显式决定这三项，而不是沿用默认值。

**当前消费者：**

| Demo | manifest | 状态 |
|---|---|---|
| Sphere | [`sphere/build/scene.json`](./sphere/build/scene.json) | 已存在（S2 灰盒） |
| Festival / Installation / Stadium | — | 待各自 BUILD 阶段建立 |

---

## 2｜Media Source 抽象

```text
file     → mp4 / webm / image
canvas   → Three.js / Shader / Visual Audio
capture  → getDisplayMedia()
webrtc   → remote MediaStreamTrack
```

- **同一台机器优先** `canvas.captureStream()` / 直接 texture 共享；只有跨设备才走 WebRTC。
- V1 不做 SFU。目标是 1 publisher → 1 viewer。

## 3｜Stream State

```text
idle → armed → connecting → live → fallback → offline
```

- `armed`：用户已主动选择捕获源（浏览器不允许无授权自动捕获）。
- `fallback`：保持最后一帧或切本地 loop，**不因 live source 丢失直接黑屏**。

## 4｜Camera / Director 公共层

- 4 个 Camera Preset（坐标与 FOV 写在各自 `scene.json`，不写死在代码里）
- Quad Preview · Program Out
- 数字键 `1–4` Cut · `Space` 回 `programCamera`
- **V1 只做 Cut**，不做复杂转场

## 5｜可复用基线：SceneForge RTC 0.5.0（尚未冻结）

[`lab/sceneforge-rtc`](../../sceneforge-rtc/) 是本仓库已验证过的浏览器舞台查看器，包含：

- 屏幕几何（平面 / 弧面 / 圆柱）与 `physicalSize` / `physicalResolution`
- `fit` / `cover` / `stretch` / `center-1to1` / `pixel-1to1` 适配模式与黑边遮罩
- `captureStream` / `getDisplayMedia` / WebRTC 源与状态面板
- 点评面板（可导出 JSON / Markdown）

**当前状态：** 0.5.0 的改动存在于本地工作副本中且**尚未提交**，因此在本目录**还没有冻结副本**。冻结时的规则：

1. 不改动 `lab/sceneforge-rtc` 原目录，只做只读复制；
2. 在本目录记录来源：原文件路径 + 文件内容 hash + 复制日期；
3. 冻结后作为基线，各 Demo 只在此基础上扩展，不回写原工程；
4. 若原工程随后提交进 Git，改用 commit hash 作为来源标识。

**谁需要它：** Sphere 的 dome 映射与 16:9 输入适配（S3）、Festival 的双屏 crop / UV、Stadium 的圆柱 UV 与导播层。在使用之前先冻结，避免把工作建立在不可追溯的基线上。

## 6｜录屏 / 截图工具链

- 页面内 `?record=1` 确定性回放 + `canvas.captureStream()` + `MediaRecorder` → 20–30s webm
- 无头 Chrome 截图：`chrome --headless=new --screenshot`（已在 Sphere 灰盒上验证可用）
- `ffmpeg`（`C:\Program Files\FFmpeg\ffmpeg.exe`）转 mp4、抽帧、拼版
