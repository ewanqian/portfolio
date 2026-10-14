# Demo 02｜Festival / Two-Wall Stage

**Issue:** [#78](https://github.com/ewanqian/portfolio/issues/78) ｜ **Priority:** **P1 / 第二主 Demo** ｜ **载体:** 待定（Web 优先）
**完成定义（不许改写）：** 第一次看到的人应能理解——**不是把两个屏幕都塞满，而是在预演里真正看出"什么时候分开、什么时候连接"会改变演出。**

## 核心问题

> 两块巨型屏幕什么时候应该独立，什么时候应该连成一个整体？中央 performer 怎样保持视觉中心？

## Proxy Spec（教学 proxy）

| 项 | 值 |
|---|---|
| Stage | 44m W × 20m D |
| Screen L / R | 18m × 9m，各向内 18° |
| DJ platform | 6m × 4m（可做楔形/三角低保真结构） |
| Screen raster | 2048 × 1024 each |
| Preview master | 2560 × 1440 |

**Reference:** Vita Motus / Quasar（Coachella 2024）— 两块 monolithic LED walls、艺人在中间、支持实时 playback、数字内容与现场地平线共存。

## States

`LOW`（两屏低密度，环境仍是主角） → `BUILD`（左右开始呼应但不完全同步） → `PEAK`（两屏连成一个整体，出现节奏重音） → `RELEASE`（一侧先退，再回到低密度）

## Cameras

`FOH_WIDE`（Program 默认）｜`DJ_FRONT`｜`STAGE_LEFT`｜`HIGH_WIDE`

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
- [ ] V2 至少修改 **屏幕关系 / 视觉密度 / 状态持续时间** 中的两项
- [ ] 20–30 秒录屏
- [ ] `reference → two-wall graybox → own content → V2` 对照

## 状态

| 阶段 | 状态 | 备注 |
|---|---|---|
| REFERENCE LOCK | ⬜ 未开始 | |
| GRAYBOX | ⬜ | 等 Sphere DELIVERY 放行 |
| V1 RUN | ⬜ | |
| REVIEW | ⬜ | |
| V2 RUN | ⬜ | |
| DELIVERY | ⬜ | |

**Write scope:** `lab/stage-replica/festival/**`
