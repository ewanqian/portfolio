# Demo 04｜Stadium / 360° Concert

**Issue:** [#79](https://github.com/ewanqian/portfolio/issues/79) ｜ **Priority:** **P3 / 技术强化 Demo（最后做）** ｜ **载体:** 待定（Web 优先，导播层可复用 SceneForge）
**完成定义（不许改写）：** 必须让参与者看到——**舞台预演不只是在看模型；摄像机本身也在重新编排演出。**

## 核心问题

> 同一条视觉进入 360° 圆柱媒体面以后，人物、观看位置和导播切换怎样改变最终观看结果？

## Proxy Spec（教学 proxy）

| 项 | 值 |
|---|---|
| Arena proxy | 120m diameter |
| Main stage | 30m diameter |
| Performer zone | 12m diameter |
| LED cylinder | 20m diameter × **8m H（教学 proxy，非已确认原项目高度）** |
| Halo ring | 12m diameter（灯光环，非主屏） |
| Panorama master / fast proxy | 4096 × 512 / 2048 × 256 |
| Program out | 1920 × 1080 |

**Reference:** STUFISH — Anna Vissi / Live at OAKA（可确认：360° in-the-round、95,000 人环绕、30m circular stage、20m cylindrical blow-through LED screen）。

## States

`LOW`（环屏低亮度，人物为中心） → `BUILD`（纹理旋转/分区响应，灯光从屏后穿出） → `PEAK`（360° 连成完整环，Program 切换加快） → `RELEASE`（退回低密度/局部窗口，人物重回中心）

## Cameras

`BOWL_WIDE`（Program 默认 / Space 复位）｜`PERFORMER_FRONT`｜`ORBIT_45`｜`TOP`

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

## 状态

| 阶段 | 状态 | 备注 |
|---|---|---|
| REFERENCE LOCK | ⬜ 未开始 | |
| GRAYBOX | ⬜ | 全部 `blocked_by` Sphere DELIVERY |
| V1 RUN | ⬜ | |
| REVIEW | ⬜ | |
| V2 RUN | ⬜ | |
| DELIVERY | ⬜ | |

**Write scope:** `lab/stage-replica/stadium/**`
