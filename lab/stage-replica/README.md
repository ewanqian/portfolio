# 舞台复刻 / Stage Replica — Demo Sprint

**工作坊：** 视听工程师模拟器 / Audiovisual Engineer Simulator
**Demo Issues：** #78 Festival ｜ #79 Stadium ｜ #80 Installation ｜ #81 Sphere
**生产要求：** [`workshops/audiovisual-engineer-simulator/stage-replica/dsh-production-brief.md`](../../workshops/audiovisual-engineer-simulator/stage-replica/dsh-production-brief.md)

## 这里是什么

《舞台复刻》4 个 Demo 的可运行工程。核心不是四张舞台效果图，而是同一条流水线跑通一遍：

```text
REFERENCE → GRAYBOX / STRUCTURE → V1 RUN → WATCH / FIND PROBLEMS → EDIT → V2 RUN
```

**V1 与 V2 都必须保留。** 每个 Demo 的空间几何、屏幕、状态、机位与修改原因，都记录在各自的 `README.md` 与 `review/` 里。

## Demo 与优先级

| 目录 | Demo | Issue | 优先级 | 载体 |
|---|---|---|---|---|
| [`sphere/`](./sphere/) | Immersive Dome | #81 | **P0** | Browser / WebGL |
| [`festival/`](./festival/) | Two-Wall Stage | #78 | P1 | Browser / WebGL |
| [`installation/`](./installation/) | Black Box | #80 | P2 | Browser / WebGL |
| [`stadium/`](./stadium/) | 360° Concert | #79 | P3 | Browser / WebGL |

## 尺寸说明

四个 Demo 的几何尺寸与分辨率都是**教学预演 proxy**，不代表任何真实场馆的施工尺寸或母版规格。可公开引用的参考事实与自定 proxy 在每个 Demo 的 `reference/reference.md` 中分开记录。

## 共享层

[`shared/`](./shared/) 存放 `scene.json` 契约、media source 抽象与 camera / director 公共层，避免四个 Demo 各自长出一套不一致的工程结构。

## 运行

各 Demo 的运行方式记录在自己的 `README.md`。
