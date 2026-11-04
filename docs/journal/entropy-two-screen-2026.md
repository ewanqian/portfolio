# ENTROPY — Atmospheric Escape
## 把一套视觉语言放进两块屏幕

**钱誉文 / Ewan Qian · 2026.09.05 · Performance Notes**

这次演出从“逃离大气层”开始。我把航天器、轨道、检修结构、星图和科学终端视为同一套视觉语言，而不是一组互不相关的太空素材。主要任务是让这些内容在横向主屏和顶部屏幕之间形成一个可以持续表演的空间。

**一套世界，两块屏幕。** 主屏承担空间的纵深、横向展开与叙事信息；顶屏不是第二支独立影片，而是从同一视觉世界中提取核心结构、方向和光的延伸。画面在屏幕间保持关系，同时允许两个区域具有不同密度。

### 01 / 从航天器的结构开始

建模阶段，我用 GPT 辅助生成航天器和技术构件的初稿，再根据实际画幅重新整理几何关系。线框、结构剖面、轨道与测量标注比写实金属材质更重要。图像需要在极宽屏幕上成立，所以我会检查结构能否从中间延展到边缘、远景是否仍然可读，以及留白能否支撑较长的音乐段落。

这一套视觉不追求每秒都有新内容。缓慢旋转、局部结构激活、扫描、数据显隐与突然消失可以组成不同的时间状态。它更像一个可以演奏的空间仪器。

### 02 / 可预演的空间

制作过程中，我开始把“在浏览器里查看画面”推进为“在浏览器里查看画面与舞台的关系”。屏幕的位置、裁切、相机、层次和状态切换需要在进入现场之前先验证。这种早期预演方法后来成为我推进 **Scene Forge / 场景铸造** 的重要参考：不仅查看内容，还要查看它所处的空间。

我也在这条制作线上第一次把 **WebRTC** 作为浏览器实时画面预览与连接的实验方向。比起每次导出一个视频来判断舞台效果，浏览器里的即时反馈显著缩短了观察和修改之间的距离。这一段记录的是制作方法的演进；最终演出使用的确切网络链路仍以现场记录为准。

### 03 / 自动化与现场控制

图像被组织成可复用的状态、模块和视觉世界。预先制作的高质量素材负责稳定的结构与细节，实时层负责运动、触发与变化，现场合成工程负责把它们分配到最终屏幕。演出者控制的不是每一颗粒子，而是进入哪个世界、让哪些结构保持、何时切换或撤出。

自动化的意义是减少重复操作，而不是取消表演。一个段落可以自己连续运动，但结构性的进入、停顿和高潮仍要与声音现场发生关系。

### 04 / 从现场到可复用资产

演后整理的重点不是把所有准备期间产生的想法都写成“已经完成”。应当保留真实使用的输出配置、经过验证的视觉模块、现场照片与屏幕关系，以及可以在下一次演出中重新调用的内容。这也是我将这套工程归档为 **FIELD INDEX / live visual asset system** 的原因。

这一工作方法后来继续进入 REACTOR：视觉世界与屏幕空间可以继续复用，BPM 层、Piano Trigger 与更细致的现场即兴控制在下一次演出中得到进一步发展。

---

### English abstract

*ENTROPY — Atmospheric Escape* developed a coordinated visual world for an ultra-wide primary display and a ceiling screen. Spacecraft structures, scientific instrumentation, orbital graphics and wireframe environments were organised as playable states rather than independent video clips. Browser-based previsualisation and realtime media experiments reduced the distance between design and spatial review, forming an early methodological link to Scene Forge. The archive distinguishes the reusable production system from elements that still require final on-site verification.

### Related
- [ENTROPY production archive](../../works/entropy-0905-performance/README.md)
- [SceneForge](https://github.com/ewanqian/SceneForge)
- [REACTOR — BPM System](./reactor-bpm-system-2026.md)
