# 舞台复刻 / Stage Replica

**系列：** 视听工程师模拟器 / Audiovisual Engineer Simulator  
**当前状态：** 2026-10-15 主推工作坊 / Demo Sprint  
**当前顺序：** 先《舞台复刻》，后《现场副驾》

## 当前定位

### 在真正进场之前，先把演出跑一遍

《舞台复刻》关注的不是舞台外形本身，而是演出如何在空间和时间里真正发生。

参与者可以从一场喜欢的演出、现场录像、舞台参考或自己的视觉内容开始，重新建立其中最重要的屏幕、人物、空间和观看关系，再加入视频、实时画面、摄像机和简单的时间编排，让原本静态的舞台真正开始运行。

原型可以存在于网页、Blender 或已有的三维工程中，并借助 AI Coding 快速修改和扩展。AI 不是为了替代现有软件，而是降低每次修改和重新预演的成本。

工作坊的核心不是 1:1 复刻全部细节，而是：

> **先把想法搭出来，完整跑一遍，看见问题，再改成下一版。**

## 为什么当前先推这一场

近期反馈比较一致：

- 《舞台复刻》第一眼更容易产生“这跟我有关”的感觉；
- 报名以前就能想象最后会做成什么样，也能想象过程；
- 不需要先理解复杂的现场控制、BPM、MIDI 和脚踏；
- 《现场副驾》更适合放在后面，作为已经拥有舞台 / 现场概念之后的进阶。

当前顺序因此调整为：

> **先有一个现场，再去控制这个现场。**

## 工作坊主线

```text
找一个参考
    ↓
找到最重要的屏幕 / 人物 / 空间关系
    ↓
搭低保真灰盒
    ↓
换成自己的内容
    ↓
做几个演出状态 / 时间编排
    ↓
V1 完整预演
    ↓
发现问题并修改
    ↓
V2
```

重点不是完成一张舞台效果图，而是提前发现那些只有演出真正跑起来以后才会出现的问题。

## 3 小时建议结构

- **00:00–00:25｜选择参考**：参考图、现场视频、游戏 / 电影空间，或自己的视觉。
- **00:25–00:55｜拆现场**：视觉中心、主屏、其他屏幕、人物、灯光和空间关系。
- **00:55–01:25｜搭第一版**：只保留真正重要的结构。
- **01:25–01:55｜换自己的内容**：视频、AI 素材、人物 / 舞者、3D 模型、实时网页。
- **01:55–02:25｜让它跑起来**：加入几个状态、摄像机或简单时间编排，完成 V1。
- **02:25–02:45｜完整预演**：从不同位置观看，记录最需要修改的问题。
- **02:45–03:00｜完成 V2 / 扩展**：修改关键问题，并说明 Blender、Web、MCP、WebXR 等后续方向。

## 当前 Demo Sprint

对外宣传优先完成 **3 个主 Demo**：

1. **Sphere / Immersive Dome** — 演唱会 / 超大型沉浸式视觉；负责最强的规模感与主视觉
2. **Festival / Coachella Quasar-inspired** — 两块巨型 LED + 中央 DJ + 实时画面；负责最快看懂的音乐节案例
3. **Installation / data-verse-inspired** — 大画面 + 声音 + 观看距离 + 慢变化；负责证明 Stage Replica 不只做大型演唱会

同时保留一个 **技术型第 4 Demo**：

4. **Stadium / 360° Concert** — 圆形舞台 + 环形 LED + 人物 + 多机位导播；重点测试 Camera / Director / Program Out。

对应 Issues：#78 / #79 / #80 / #81。

### Demo 统一要求

所有 Demo 都必须完成：

**reference → graybox → V1 → 完整观看 → review → V2 → 录屏 / 对照图**

不能只交静态概念图，也不能用大量高保真 AI 素材掩盖空间和编排问题。

详细规格：

- [`demo-packs.md`](./demo-packs.md)
- [`demo-prompts.md`](./demo-prompts.md)
- [`dsh-production-brief.md`](./dsh-production-brief.md) — 交给 DeepSeek Harness 的生产要求与验收清单
- [`dsh-plugin-stack.md`](./dsh-plugin-stack.md) — DSH 推荐插件 / 执行栈

## Realtime / Media Source

Stage Replica 的实时内容可以来自：

- `file`：mp4 / webm / image
- `canvas`：Three.js / Shader / Visual Audio
- `capture`：浏览器标签页 / 窗口
- `webrtc`：另一台设备的实时视频轨

上一期的音画同源演出面板可以直接成为这一期的实时屏幕内容，形成前后联动。

同机情况下优先使用更直接的 canvas / texture / captureStream；跨设备时再使用 WebRTC。实时技术只是帮助预演，不是工作坊本身的目的。

## 摄像机 / 导播

当前 Demo 统一预留：

- 4 个 Camera / Viewpoint Preset
- Quad Preview（需要时）
- Program Out（Stadium 重点）
- Cut 切换

Stadium Demo 重点展示导播；Installation / Sphere 更重视观看位置与空间占据关系。

## 当前宣传需要补齐的资料

- 上一期学员作品录屏：小翅膀、裂解
- 上一期现场拍摄视频
- 1 个完成度最高的 Stage Replica 主 Demo
- 2 个不同类型的短 Demo
- `reference → graybox → V1 → V2` 对照图
- 网页 / Blender 预演、摄像机切换录屏

## 参与准备

笔记本电脑、鼠标即可。

有的话可以带：

- 喜欢的现场参考图 / 演出录像
- 游戏 / 电影里的空间截图
- 自己的视频 / AI 素材
- 3D 模型 / Blender 工程

没有 Blender 基础、没有自己的素材也可以参加。

## 相关

- 历史版本：[`../archive/2026-09-29-stage-replica.md`](../archive/2026-09-29-stage-replica.md)
- 旧课程稿：[`../module-02-stage-previsualization.md`](../module-02-stage-previsualization.md)
- 旧 R&D Snapshot：Issue #77
- Demo Issues：#78 / #79 / #80 / #81
