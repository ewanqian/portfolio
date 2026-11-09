# 本地 Codex 交接：Blender 作品考古 → Simulation Zone 原生 GPU Runtime

> 2026-11-09 / research handoff v1。属于技术研究任务，不是网站重构、重新做特效或新的作品提案。  
> 先读同目录 [作者口述](./2026-11-09-author-account-blender-to-runtime.md) 与 [创作偏好](./2026-11-09-creative-preferences.json)。  
> 当前本地已报告的 246 个工程候选、13 份只读拆解、179 条节点组记录、42 个模块候选是**待核验证据**，不能视为全部正确或已完成。

## 核心任务

从已完成的 Blender 工程中辨别：

- 值得继承的技术机制、视觉手法、形态、参数和声音控制；
- 已经完成但未整理的资产；未完成的实验；完成度不高的环节；
- 过去 GPU / Processing / openFrameworks 尝试中为什么“看起来不像原作”；
- 一条最低限度的、从 **Drop Flow Simulation Zone → 本地 GPU Compute Runtime → 实时控制/显示** 的忠实移植路径。

优先准确理解**一个现有工程**，不要大规模改写所有项目。源文件全部只读，复制研究副本；记录 Blender 版本、哈希、依赖及路径，但**原始 NAS 和本机路径、未公开素材与私人数据不得提交公共 GitHub**。

## A. 作品搜索顺序

### A1. TIMER：先找真正的版本差异

分别定位：
1. 俯视正方形时钟主工程；
2. 从圆形/正方形的投影“反求”至长条屏幕的转译工程；
3. 长条平面内从左向右流动的点 / 早期 Simulation Zone；
4. 时间线、预烘焙图像、视频纹理和音乐曲线相关文件。

对每份文件采集：
- 场景、相机、渲染分辨率、关键对象、约束、NLA、动作、驱动器、视频/图像纹理。
- 音频 Bake 曲线及其实际目标路径：Action / FCurve / keyframes / drivers / modifiers；区分手 K 与 Bake（仅凭曲线外形不能下定论，结合动作命名、密集采样、来源文件与作者记忆）。
- ColorRamp、映射、亮度/黑白、Compositor 与最终输出。
- “反求”工程真实的对象、相机、透视数学、变换与屏幕规格。不要把它简化成方形图的裁切。

### A2. Drop Flow：最高优先级的技术对象

找原始二维实验、三维主工程、4.0.15、不同屏幕和相机/渲染版本。对每一个实际参与输出的 Geometry Node Group 递归展开：

- Simulation Input 与 Simulation Output 配对、所有 state item：类型、名称、默认值、所属 Geometry 域、存储/恢复方式；
- 具体状态链：初始发射、每帧出生、上帧保留、位置/方向更新、速度/生命期/半径、筛选删除、实例化；
- Scene Time / Delta Time / 4D Noise / Wave / Voronoi / Float Curve / Map Range / Math / Sample / Store Named Attribute 等关键节点的参数和连线；
- 一秒复制很多次的实际实现：每帧新点数、循环次数、FPS、是否与外部子帧/渲染采样混淆；
- 音乐曲线被用在哪里；哪些是手 K；哪些由作者设置的不同相机或角度产生；
- 如果在 Simulation Zone 内有 Curve 类运动映射，查清到底控制的是 age->position、speed、scale、emission、time gate 还是 visibility；
- 历史文件的 Blender 版本兼容、缓存是否存在、初始帧/中间帧非空输出和渲染/视口差异。

优先复用已找到的 201 节点 / 225 连接的 Drop Flow 3.0 节点网络记录作为导航；**数字是历史记录，不等于已验证当下工程。**

### A3. KASHIWA（2025）

在 Blender/NAS/Mac 中按曲名及其拼写变体检索 Lead、Ice、Amb、Whitenight / White Night、Titan、Phantom。

建立工程继承关系：哪些直接复制 Drop Flow 主链，哪些改动音频曲线、发射、材质、光照、相机、门控、实例几何和时间线。每条曲目输出一个关键效果截图与至少一个非同质化的差异描述。

特别调查：Ice 看似准确卡点是因为单通道整体强度、预处理的音频频段、密集 Keyframe、人工调整，还是多因素叠加？不能因作者回忆“自动检测音乐”就直接宣称有 beat detector。

### A4. NFIR

分开研究：持续生成的原始系统；作者手动更改多边形边数、角度、画面重合与视口观察的屏幕录制；后期 LOOP 版本增加的编排。不要用计算机“自主演化”替代人的镜头/参数选择。

### A5. 动捕（尚未完成）

搜舞蹈骨骼 FBX/BVH/动画、录制、时间重采样与舞台复合文件。首要研究不是从人体撒粒子，而是**同一舞蹈动作的多时间片复制、交错、累积、从不同观察角度组成新的编排**。所有涉及舞者身份、可识别影像或版权不明确数据只在本地分析；不上传公共仓库。

目标设想可包括从多时间线复制触发 Drop Flow、机器人/AI 编排、360° VR 观察；不能宣称已有完成输出。

### A6. SRE / Entropy

先读取现有 GitHub 的 projects/bpm-link-experiment-2026.md、archive/sre-lab/、works/entropy-0905-performance/POST-SHOW-CLOSEOUT.md，勿重复建档。

本地搜索 Mac 上 Processing / PDE / p5 / Java / MIDI 视觉工程、截图、测试录屏，以及对应视频文件名 SRE_2026_UFO-Terminal_加载创作营_主机位_正式版_1080p。比较约十套原型/多状态与历史档案中的约四组入选**两个粒度**。

Entropy 查核两组星空、三组航天器观察、3D 模型、状态过渡与多屏控制的实际文件；仓库预演计划≠真实现场使用。

## B. 本轮最重要：Simulation Zone 本体实现与 GPU 可迁移性

先研究 Blender 官方文档与相关 C++ 源码：
- https://docs.blender.org/manual/en/3.6/modeling/geometry_nodes/simulation/simulation_zone.html
- https://developer.blender.org/docs/release_notes/3.6/nodes_physics/
- https://projects.blender.org/blender/blender/src/branch/main/source/blender/nodes/geometry/nodes/node_geo_simulation.cc

关键事实：Simulation Zone 将前一帧状态供下一帧读取；输入的初始模拟状态与从区外连接进入的逐帧驱动要区分；Delta Time、Bake/Cache、字段和几何数据类型都影响移植。**这不等于直接把 Blender 整个评估器编译为 GPU Kernel。**

研究输出两张图：

**Blender 实际机制图**：从已找到的具体连接精确画出每个状态字段的来源、更新和输出；未知部分写 UNKNOWN。

**原生运行时映射图**：给出对应的 CPU 控制端与 GPU Compute 端：状态结构、缓冲区布局、发射/更新/筛选、Geometry instance 参数、渲染输入及音频驱动。注明节点到代码的等价程度与未支持的行为。

首选利用已有的 C++ / OpenGL Compute / SSBO 和 openFrameworks 分支，避免为了“原生”再引入多个陌生框架。需要时才比较 CUDA 与 Vulkan Compute；OptiX 面向光线追踪，不应误当作通用模拟器。

**特别调查旧失败**：在 E:/Ewan/wip/2605 Timer to Dropflow/OpenFrameworksDropFlowResearch 的旧研究（本地路径仅用于搜索，不提交实际机器资产）。那里历史上曾有一个 18,000 点的 indexed-flow 程序，编译成功但**视觉校准没有完成**。读代码并列出与 Blender 原链缺失的关系，例如发射时序、固定索引、同一随机种子、噪声域与时间输入、曲线采样、点云拓扑、密度门控、光学/合成效果。

## C. GPU 最小验证：不是先做漂亮的新特效

1. 明确一帧规则和持续状态字段：时间步长 dt、position、velocity、age、life、radius、seed、id、可选 history/attribute。
2. 先实现可确定性复验的局部机制：如固定点数/固定种子下给出前 N 帧数值、几何边界、寿命分布；与 Blender 抽取值比较，允许明确浮点误差。
3. 再实现生成、更新、compact/delete 和 indirect drawing，分析 CPU-GPU 往返及纹理/Buffer 复制开销。
4. 使用 RTX 4080 SUPER 的真实运行，记录不同点数下 GPU simulation ms、render ms、显存、帧时间 p50/p95。测试不同画幅和 60Hz 目标，不只展示平均 FPS。
5. 做逐帧画面对照：同一状态/相机/时间轴对齐，展示整体形态、局部密度、速度节奏、强弱门控和生命周期。定量指标可辅助，但**不能代替作者“有没有那个味儿”的视觉审阅**。
6. 只在等价性成立后增加 Live Input：将同一个参数连接到（a）离线 FCurve；（b）实时音频 envelope；（c）MIDI/BPM；（d）OSC/手势。分别记录曲线输入的时间采样、平滑、延迟和事件逻辑。

特别回答：GPU 加速在当前算法中可否获益？瓶颈是 Blender CPU 几何评估、点数拓扑改变、节点开销、模拟 Bake、数据上传还是渲染？哪些操作无法高效变为 GPU 稠密并行？对比现有方案的可维护性，而不是“GPU 天生一定更快”。

## D. 每件作品输出的检查表

| 字段 | 要求 |
|---|---|
| identity | 正式名称、版本、时间、文件哈希、来源 |
| artwork_state | completed / study / unfinished / undocumented；证据支持 |
| visual_intent | 作者想实现什么，不用模板化套话 |
| runtime_graph | 输入→状态→更新→渲染，未知即标未知 |
| control | Bake 音频 / 手 K / Scene Time / 随机 / Live / 录屏手动 |
| assets | geometry / materials / textures / actions / scripts / external files |
| limitation | 当时控制不住、技术粗糙、没有完成的部分 |
| reusable | 可实际提取的算法、曲线、场景、镜头、状态、素材 |
| port | 原生计算可行性、忠实度与性能障碍 |
| evidence | 源文件与节点路径、截图、命令、日志 |
| confidence | artist-recalled / observed-in-source / tested / uncertain |

**交付物**：
- local research/asset-inventory.csv（本地完整路径，不发布）
- local research/scene-and-state-graphs/（真实节点/状态图）
- local research/control-provenance.csv（音频 Bake、手 K、视频、实时驱动）
- local research/reproduction/（代表性截图和复验脚本）
- local research/runtime-port-feasibility.md（替代方案与下一实验）
- 可发布的 evidence-safe 摘要（相对路径或资产 ID，无隐私数据）

## E. 停止条件

不要再把“找到 200 多个路径”当成成果。每轮只回答：

1. 新确认了哪一条作者记忆？
2. 哪条记忆被工程推翻或应修正？
3. 发现了哪段真实而独特的机制？
4. 哪些机制能够忠实进入 GPU，哪些不能？
5. 过去“没有那个味儿”的技术差异究竟在哪里？

先提交 **Drop Flow 的一个实际 Simulation Zone 全链与输入来源**，附一个与其时间行为一致的最小 GPU 测试。没有证据就不要宣称移植成功。

## F. 与在线仓库交接

公共 GitHub 只保存经过脱敏的研究文档、来源索引、参数摘要和可公开代码；不要提交原始 Blender 商业工程、舞者原始动作数据、NAS 路径、音乐源文件或未经授权的录像。

本交接和作者口述在个人 Portfolio 的 visual-arts/research/ 中；已完成作品详情仍遵从各项目原 canonical 档案，未来的 Writing 用这份作者口述做素材但必须单独编辑与验证。
