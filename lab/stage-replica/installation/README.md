# Demo 03｜Installation / Black Box

**Issue:** [#80](https://github.com/ewanqian/portfolio/issues/80) ｜ **Priority:** **P2 / 第三主 Demo** ｜ **载体:** 待定（Web 优先）
**完成定义（不许改写）：** 必须能证明——**少量素材也可以通过预演被组织成一个成立的现场；课程不是"做大屏模板"。**

## 核心问题

> 当素材很少、变化很慢时，尺寸、观看距离、声音与持续时间能否共同形成完整现场？

## Proxy Spec（教学 proxy）

| 项 | 值 |
|---|---|
| Main projection | 10.24m × 5.4m |
| Raster | 4096 × 2160 |
| Black box | 14m W × 18m D × 7m H |
| Viewer zone | 6–12m |
| Optional floor | 10.24m × 5.4m（**课程比较实验，非 data-verse 原作配置**） |

**Reference:** Ryoji Ikeda — data-verse（可确认：DCI-4K DLP projector / computer / speakers；最低展示尺寸 W10.24 × H5.4m）。

## States

`SPARSE`（少量点/线/字符，大量黑） → `ACCUMULATE`（密度缓慢增加，底层规则不变） → `DENSE`（高密度 + 声音强度提高，仍是同一系统） → `AFTERIMAGE`（逐步退出，只留残留结构与低频）

## Viewpoints

`CENTER`（6m）｜`FAR`（12m）｜`LEFT`（左侧 30°）｜`FLOOR`（低机位，看墙 + 地关系）— **不做快速导播感，镜头变化应慢。**

## Production Checklist

- [ ] 极简黑盒灰盒
- [ ] 正确的主投影尺度
- [ ] viewer distance 可切换（6m / 12m）
- [ ] 四状态保持同一视觉规则，不用四条无关视频
- [ ] 至少一个 Visual Audio / WebGL / 自己的视频 source
- [ ] 墙面 only 与 wall + floor 两个版本对比
- [ ] 音频可以播放，但不要求 audio-reactive
- [ ] V1 完整观看一遍
- [ ] 记录"太满 / 太快 / 太累 / 尺度不对"等实际问题
- [ ] V2 至少修改 **密度 / 持续时间 / 观看位置 / 空间投影** 中的两项
- [ ] 20–30 秒 walkthrough
- [ ] `single image → spatial version → V2` 对照

## 状态

| 阶段 | 状态 | 备注 |
|---|---|---|
| REFERENCE LOCK | ⬜ 未开始 | |
| GRAYBOX | ⬜ | |
| V1 RUN | ⬜ | |
| REVIEW | ⬜ | 重点检查 duration / density / viewer distance |
| V2 RUN | ⬜ | |
| DELIVERY | ⬜ | |

**Write scope:** `lab/stage-replica/installation/**`
