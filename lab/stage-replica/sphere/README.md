# Demo 01｜Sphere / Immersive Dome

**Issue:** [#81](https://github.com/ewanqian/portfolio/issues/81) ｜ **Priority:** **P0 / 第一主 Demo** ｜ **载体:** 待定（Web 优先）
**完成定义（不许改写）：** 第一次看到的人应能理解——**预演的意义不是提前看一个 Dome 模型，而是提前发现"画面占据整个视野以后，原来的视觉为什么必须重新编排"。**

## 核心问题

> 同一个视觉从"前方一块屏"扩展到"包住整个观众"以后，构图、观看位置、音乐段落和视觉密度怎样改变？

## Proxy Spec（教学 proxy，非 Sphere 真实场馆尺寸）

| 项 | 值 |
|---|---|
| `dome_radius_m` | 25 |
| `audience_floor_diameter_m` | 34 |
| `stage_platform` | 14m × 8m |
| `eye_height_m` | 1.6 |
| `proxy_master` / `fast_proxy` | 4096×4096 / 2048×2048 |
| `program_out` | 1920×1080 |

**Confirmed（可公开引用的参考事实，非本 Demo 尺寸）：** Sphere Studios Media Plane = 16K × 16K，display surface > 3 acres，屏幕向上、向后并围绕观众展开。

## States

`HORIZON`（只有低位/前方有内容，大面积暗） → `ENCLOSE`（向左右与顶部扩展） → `FULL_FIELD`（整个 Dome 连续环境） → `APERTURE`（大面积收回，只留中央 opening）

## Viewpoints

`AUDIENCE_CENTER`（默认 Program，眼高 1.6m）｜`AUDIENCE_LEFT`｜`STAGE_LOOKBACK`｜`DEBUG_ORBIT`（仅讲解几何）

## Production Checklist

- [ ] Hemisphere / Dome graybox
- [ ] performer / stage scale proxy
- [ ] 4096² proxy UV 或等效映射跑通
- [ ] 四状态完成（差异来自构图面积与密度，不是换素材）
- [ ] 普通 16:9 source → front-window → full dome 的转换
- [ ] 至少一个自己的 WebGL / 视频内容进入 Dome
- [ ] 4 viewpoints
- [ ] V1 录屏并记录问题
- [ ] V2 至少修改 **构图面积 / 状态节奏 / 观看关系** 中的两项
- [ ] 20–30 秒宣传录屏
- [ ] `flat source → mapped dome → audience view → V2` 对照

## 状态

| 阶段 | 状态 | 备注 |
|---|---|---|
| REFERENCE LOCK | ✅ 完成 | [`reference/reference.md`](./reference/reference.md)：confirmed / proxy 已分离；修正 1 条断链与 2 处未获原文支持的措辞 |
| GRAYBOX | ✅ 完成 | [`build/`](./build/)：结构 + 尺度可运行，含 3 张核验截图与已知不足记录（[`build/NOTES.md`](./build/NOTES.md)） |
| V1 RUN | ⬜ | 需先完成 S3（mapping / 四状态 / source / 四机位） |
| REVIEW | ⬜ | `review/review-v1.md` |
| V2 RUN | ⬜ | `review/review-diff-v1-v2.md` |
| DELIVERY | ⬜ | `delivery/` |

**Write scope:** `lab/stage-replica/sphere/**`
