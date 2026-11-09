# 本地 Codex 增量交接：REACTOR、HERO DOME、Ableton、二砂与并行评审

> 2026-11-09 / follow-up to [主技术交接](./2026-11-09-local-agent-brief.md)。先读 [作者口述续篇](./2026-11-09-artist-account-reactor-hero-dome-audio-ersha.md)。  
> 本文件是**检索、辨认、提纯与恢复**任务。未经确认不得修改、重渲染覆盖或上传源工程。该机器上的文件未在本轮云端实际检查。

## 0. 不要混淆这三类任务

- **Drop Flow**：优先研究 Blender **Simulation Zone** 的状态数据、逐帧更新与忠实的本地 GPU Runtime 移植。
- **Entropy → REACTOR → HERO DOME**：优先找出具有高美术完成度的模型 Reveal / Curve / Shader / Compositor / Camera / Lighting 工程，成为可重用的视觉资产；并非所有资产都要变成 compute simulation。
- **Ableton + 二砂**：分别保护音频工程/高质量听感与点云镜头/色彩属性/扫描源数据的可恢复性。

## 1. REACTOR / Tokamak / Blender 资产恢复

从 2026-09 至 2026-11 的 Blender 工程、下载、临时备份、渲染输出与相关对话工作目录中，搜索 reactor、tokamak、opening、hero、wire、curve、reveal、line reveal 等别名；留意实际文件夹命名与自动保存的 .blend1/.blend2。

**不要按文件名认定属于同一工程。** 先做内容只读指纹：对象/Collection、主相机、场景尺寸、几何节点、材质、Mesh→Curve 转换路径、F-Curves、颜色与光照、Compositor、链接素材。

按作品谱系找出：
- Entropy 的线条出现/结构 Reveal 版本；
- REACTOR 由参考图辅助构造的托卡马克线框/曲线与 Shader 高亮；
- 作者手动灯光、材质与镜头调校的较优版本；
- 在 HERO DOME 超宽屏测试中被复用和调整的 Blender 工程。

**提取失败时停止猜测**，用真实 Blender 版本运行；提供相同帧的截图对比和 Camera/Material/NodeGroup 依赖链。不以“结构复杂”证明其工程机械精度。

## 2. HERO DOME Shader / Compositor 资产

重点查找以下**实际节点连接**：
- Wireframe 或边线生成、Curves 对象与线段动画的连接；
- Wave/Wave Texture、ColorRamp、Emission、Principled/其他 Shader、光源的关系；
- 逐段扫描/高亮的具体变量：position/time/object coordinate/attribute/driver；
- Compositor Noise 的实现方式、其与 Glow/Glare/Dither/输出位深之间的关系；
- 是否有明确的约四组暗→明视觉状态，分别由 Scene、Action、NLA、相机还是 Clip 定义；
- 不同超宽画幅中相机、FOV、Crop、Aspect 的设置。

只读抽取一份**可以在不含原图/商业模型情况下工作的中性测试工程**，保留技术机制而非完整商业素材。将真实 Shader 图、数值范围、最满意的最终渲染与源工程相连保存到**私有/本地**。公共档案只保存不透露工程诀窍的高层方法及作者批准的图。

## 3. Ableton 高完成度版本 / 音频质量 A-B 恢复

从 Mac 所有授权可访问的用户指定工作目录和已有项目索引中检索 `.als`、`.adg`、`.adv`、Max devices、MIDI、WAV、FLAC、AIFF、render/bounce、Groove、插件列表、工程备份和 Ableton Backup。不要遍历私人账户或复制授权音源库到公开仓库。

目标搜索：
- REACTOR 后音乐实验（一个作者高度认可的本地 Ableton 版本；混响/音色/混音较佳）；
- 锅碗瓢盆/物件打击乐、快门/闪光节奏版本；
- 空间音频前后移动的研究残片（仅有构想时明确零交付）；
- 最近另一台 Mac 的约四种音乐方向 × 每种六个候选工程，**确认本地真实文件个数与时间戳**；
- 网络端 FLAC demo / MIDI 与本地优质音源版之间的 A/B 对照。
  
保存音频索引（只在本地保留完整路径和插件授权状态）：project ID、对应 bounce 文件、BPM、演奏长度、音源/插件**名称和是否缺失**、混响/发送结构、响度、音色质量备注、作者选中/淘汰理由、可否在本机完整回放、需要的授权及移动工程的许可。不要上传付费插件和采样包文件。

主观 A/B 试听必须在可比较响度下进行，不能把响度更大当成音色更好；参考版本应先由作者认定，不凭随机评分替代耳朵。

作者说的 “waveforms 里面更高质量的东西” **含义未明确**：可能指 DAW/音色工作流或波形素材。不要未经确认就假定是某个具体软件或去下载插件。

先阅读已有 `performable-music` 与 Stage Casting 的构建协议；之前的 `SPATIAL_GRAIN`、Show Score 等研究是参考，不等于当前 4×6 工程已经完成。

## 4. 二砂 / Metashape / 点云素材抢救

按 SYSTEM/ERSHA/二砂/郑州工厂/Metashape/Factory/Scan/Point Cloud/PLY/FBX/OBJ/Alembic/Vertex Color 等进行多位置**只读索引**，包含 Windows 本地、NAS、用户指定 Mac 工作目录、旧硬盘归档和项目版本控制历史。

具体寻找：
- 原扫描项目/Metashape 文件、变换和坐标系统、导出模型与点云；
- 前进穿越工厂的 camera path、渲染片段、镜头列表和可回溯的剪辑；
- Blender 用于显示颜色的 Mesh Color Attribute / Vertex Color 材质与灯光；
- 与 Drop Flow 或 Simulation Zone 叠加的特效镜头、旧渲染样片；
- 曾存在却现找不到的镜头/点云，依据版本号、备份/自动保存、缓存和时间戳建立**真实缺失表**。

特别注意：找不到 ≠ 数据丢失；文件仍可能在 NAS/自动保存/另名工程中。禁止自动清理、改名、重做同名输出、删除缓存、上传扫描原件。不要从少量公开图反推可公开完整厂区数据的权利。

## 5. 九灯光方案与参数选择历史

找最近 Blender/Codex 的 variant grid、lighting test、nine lights、underlight、rim light 等输出；抽取同一相机、同一几何、同一曝光与材质条件下的参考图。作者明确记得入选的一组是**底光 + 轮廓光**；第二组记忆模糊，不得由 Agent 编出。对比该组九个方案的光源位置、能量、颜色、边缘对比和阴影，再登记具体选择理由。

下一轮研究不必重复生成九组。首先确认旧九组资产和源参数是否仍在，并把“有实质差别的变体、同条件比对、作者二选”作为今后 Agent 的评审方法。

## 6. 决定什么进入公共 GitHub

| 素材/内容 | 推荐位置 | 原因 |
|---|---|---|
| 作者已确认的创作谱系、公开项目链接、原则性审美选择 | portfolio 的 Artworks / Research，经审阅后可公开 | 便于追溯、访谈、写作 |
| 经确认可公开的缩略图、活动照片、公开演出片段 | Portfolio Media Index / 项目档案 | 先查版权、署名、引用 |
| 精细的 Shader 节点图、最佳参数、用于高完成度商业项目的相机/灯光与控制配方 | **本地 ignored/private 目录；如需同步优先私有且受控的仓库** | 避免泄露商业工程细节与长期独特技术资产 |
| 原始 `.blend`、未公开舞者动作数据、工程源、托卡马克参考素材 | 本地/NAS 原样只读、哈希索引、许可审查 | 原始资产大，可能含客户/合作方内容 |
| `.als`、授权音源、商业插件、采样包、音轨与私人演出录像 | 本地/受权私有工作空间 | 音频与版权/许可依赖 |
| 点云位置坐标、完整厂区扫描与原始摄影测量素材 | 仅本地/必要时受控存储 | 地点、合作权利和空间数据风险 |
| 可共享的零依赖算法、去敏后中性测试工程、模拟输入输出统计 | 公共研究库（仅版权允许时） | 允许复验而不复制原项目核心素材 |
| 个人付款/账号/序列号/本机隐私文件路径 | 不上传公共仓库 | 个人信息风险 |

**不能因为“太牛逼”就自动判定必须隐藏；公开与否取决于权利、独特性、商业策略和作者决定。** 目前只有高层创作口述可以安全先行，未经核验的源工程/贴图/音乐及精细配方先保留在本地。

## 7. 研究完成的最小证据包

每项只回复三个实际结果：
1. 找到的原件（本地私有 manifest 和哈希，公共只给脱敏 ID）；
2. 该原件说明作者回忆的哪个技术或视觉判断成立、哪条仍无证据；
3. 选出的一个可复用资产 + 它的依赖和现实风险。

建议本地输出：
- `recovery/reactor-hero-asset-inventory.csv`
- `recovery/ersha-missing-and-found.csv`
- `recovery/audio-project-pairs.csv`
- `recovery/lighting-nine-comparison.md`
- `recovery/visibility-rights-review.md`

所有原件只读。完成一轮后将**脱敏证据摘要**按 Artworks 研究文档同一分支提交 PR。仓库已有 [作者自述](./2026-11-09-artist-account-reactor-hero-dome-audio-ersha.md)、[主技术任务](./2026-11-09-local-agent-brief.md)、[偏好 JSON](./2026-11-09-creative-preferences.json)，不要新建重复事实库。
