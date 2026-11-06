# Performable Visual Language / 可再演的视觉语言

**Research register · 2026-11-06 · status: research in progress**

这份资料不是另一件独立作品，也不是已经验证的跨平台引擎。它服务于 [《让作品再次发生》研究草案](../../docs/journal/from-image-to-performable-work-2026.md) 与 Stage Casting 04：从真实版本与素材出发，提炼可识别的视觉规则，再决定哪些值得进入演出、空间体验或衍生设计。

## 1. 资料前史与可使用性

| 作品/版本 | 已有记录（不是新成果） | 本次拟研究的问题 | 资料入口 | 权利/事实边界 |
|---|---|---|---|---|
| TIMER 2024 创作营、杭州首演及环形展览 | 围绕时间、秩序、加速、暂停、逆转的音画叙事；音乐公开说明 A–B–C–B′–A′ 结构 | 逆转运动后，历史与残留是否继续影响下一次出现？ | [系列版本](https://github.com/ewanqian/VIRTURA-Collective/blob/main/works/timer/versions.md) · [创作者公开说明](https://xusihui.com/art) | 团队作品；作曲徐昊、视觉钱誉文，许思慧参与交互协作，具体版本按原档案核验；音轨与 stems 的再次使用需许可 |
| Drop Flow 1.0（2025.01–04） | OSC + Blender Python / Geometry Nodes 的实时音画技术实验；黑白点线面 | 从已有生成规则提炼运动语言，而非宣布第一次实现实时化 | [源档案](https://github.com/ewanqian/VIRTURA-SpacePort/blob/main/organization/works/drop-flow-series/drop-flow-1.0-prototype.md) | 音乐徐昊、视觉钱誉文；“既有技术实现”与“可复用模块”是两种不同结论 |
| Drop Flow 2.0–3.0（2025.05–07） | 加入 AI、现实扫描、声光装置及空间演出；团队跨版本扩展 | 点云、持续流场、空间观看分别提供了什么可识别的形式？ | [版本谱系](https://github.com/ewanqian/VIRTURA-Collective/blob/main/works/drop-flow/versions.md) · [合作人员](https://github.com/ewanqian/VIRTURA-Collective/blob/main/works/drop-flow/collaborators.md) | 不把共同创作的音乐、扫描、AI 视觉与装置归为同一个人的独创素材 |
| Drop Flow 杭州双年展版（2025.10） | 身体表演、舞台预演、VR/屏幕；公开仓库有 24 fps NLA 动作、原始 BVH、33 骨骼工程 | 身体作粒子发射源、扰动源与残留历史 | [舞台与动捕工程](https://github.com/ewanqian/dropflow-biennale-mocap) · [版本档案](https://github.com/ewanqian/VIRTURA-SpacePort/blob/main/organization/works/drop-flow-series/README.md) | 公开下载不等于开放许可；动捕、舞蹈、肖像、演出音乐与非打包外链材料需要单独核验 |
| Stage Casting 04（2026 研究） | WebXR→WSS→Mac Bridge→OSC→Max/Ableton/Jitter 的研究规格 | 验证少量作品视觉宏参数能否可靠接入，而非复制一套新演出架构 | [Spatial Playground](../performance-control-model/experiments/spatial-playground-webxr/README.md) · [SceneForge](https://github.com/ewanqian/SceneForge) | 现有研究文档不代表 Vision Pro 到现场全链路已经实机验收 |

版本出处优先 `database/works.json`、对应 `projects/*.md`、VIRTURA-Collective 的协作与版本文档及 SpacePort 档案。本文件只引用、解释，不覆盖这些事实源。

## 2. 视觉语法：必须区分“已观察”与“待验证”

| 系列 | 已有材料能支持的方向 | 新提出的候选规则（假设） | 不应退化成 |
|---|---|---|---|
| TIMER | 时间分段、音乐曲式、秩序与失序、暂停/逆转、环形观看 | `REVERSAL`: 可逆运动；`RESIDUE`: 不可逆痕迹；`RECALL`: 记忆回访时发生差异 | 红色粒子 + 沙漏图标 + 视频反放 |
| Drop Flow | 黑白流动、几何节点与点线面、音画连续生成、空间层次、身体表演 | `BODY_SOURCE`: 动作局部发射；`FIELD_DEFORMATION`: 身体影响整体流向；`AFTERIMAGE`: 人体消失后残影继续衰变 | 任何骨骼都驱动同一个通用粒子云 |
| Stage Casting | 状态 / Cue / 输入映射 / OSC 等演出控制研究 | 只共享 `ENTER`、`HOLD`、`RELEASE`、`RESET` 与少量密度、记忆、时向参数 | 把艺术作品压扁成统一的视觉效果预设 |

**复用原则**：复用“输入归一化、时间状态、渲染管线”可以提高工程效率；但作品特征须独立策划、独立记录、独立验证。是否成为可复用视觉基因，不能只根据本表决定。

## 3. 三种跨媒介输出与因果关系

| 输出 | 首要问题 | 可以保留 | 需要重新创作 | 先决条件 |
|---|---|---|---|---|
| Shot：镜头短篇 | 一个画面如何准确表达作品？ | 构图、材料、运动语法 | 镜头转场、长短节奏、声画关系 | 10–30 秒 A/B 对照与完整来源记录 |
| Light：舞台实时模块 | 表演者能否通过少量输入制造有意义的变化？ | 关键视觉规则、形态、运动系统 | 输入映射、场景状态、故障恢复 | Stage Casting 04 的关键控制链路验收；键盘/MIDI 兜底 |
| Spatial：头显 / 全景 | 深度、包围和身体位置是否对作品有不可替代的作用？ | 语法及场的空间关系 | 立体合成、观看范围、帧率预算、舒适度 | 先用 SceneForge 做能力检测与独立实机实验；未验证不占演出关键路径 |

WebGPU 不应是需求本身。Apple Safari 26.2 已支持 WebGPU in WebXR；Meta Quest Browser 的 WebGPU in WebXR 也有渐进的实验支持，但应针对浏览器版本、设备和渲染特征分别测试。默认保留 WebGL2 / 非头显降级路径：

- [WebKit / Safari 26.2](https://webkit.org/blog/17640/webkit-features-for-safari-26-2/)
- [Meta Quest Browser specs](https://developers.meta.com/vr/documentation/web/browser-specs/)
- [Meta Horizon OS Browser release notes](https://developers.meta.com/vr/release-notes/?search_key=browser)

## 4. 候选的最小对照

**DF-A：运动消失与痕迹**：相同镜头、相同运动路径，比较“仅人体”“人体+路径”“仅路径残留”，只改变残留规则。初期用自制合成轨迹/取得许可的动作，严禁把未授权 BVH 加进公开 demo。

**TM-A：运动逆转与记忆**：同一沙粒初态，比较“正常向前”“完全反放”“路径可逆但痕迹不可逆”。初期使用合成运动与原创音频，避免未经授权直接处理原音乐。

**Live-A：输入是否成为表演**：用同一小段原创音频，比较固定视频 cue 与人工控制 `HOLD/RELEASE`、段落状态后产生的视觉差异。在输入中断时须能够恢复手动控制。

## 5. 第一轮验收门槛

1. **来源**：每一个对外使用的影像、动作、声音都登记作者/文件/许可；未知不得被解释成已授权。
2. **形式**：删除标题和说明后，观察者仍可指出 TIMER / Drop Flow 中至少一种独有的形式关系；小样本观察仅作迭代反馈，不宣称统计证明。
3. **对照**：A/B 条件只有一个主动变化的规则，留下相同构图、参数、音源和帧位记录；每次实验记录“保留/修改/删除”。
4. **可表演**：一个作品规则进入 Stage Casting 时，须能被有意识地触发、保持、撤回，有离线录屏与键盘/MIDI 安全回退。
5. **可交付**：在 2026-12-03 之前优先完成可上台的小模块及完整排练；未经实机验证的 WebXR 不占用演出 P0 的交付预算。

## 6. 下一步仍是研究，而非同时开工

只读 Agent 任务入口另见 [AGENT_TASKS.md](./AGENT_TASKS.md)。完成来源清单和视觉语法后，选择 **一个** 最小实验。任务不得自动触发新仓库、下载第三方媒体、批量购买插件、部署公开网页或提前更新 `database/visual_genes.json` 的 seed。待一个规则至少在两次真实创作/排练中复用并有记录，再讨论“可复用模块”的标记。

