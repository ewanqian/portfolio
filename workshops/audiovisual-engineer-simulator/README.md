# 视听工程师模拟器
## Audiovisual Engineer Simulator

**项目类型：** 公众工作坊 / Live Audiovisual / AI-Assisted Show Control / Stage Replica  
**发起人 / 主讲：** 钱誉文 Ewan Qian  
**当前状态：** 2026-09-29 对外命名与 MANA 编辑稿定稿

> 从“做出一个系统”继续向现场推进：先控制时间，再改造空间。

## 项目定位

《视听工程师模拟器》延续 2026 年 MANA《极简输入：构建视听系统》的方法。上一期从最简单的输入开始，让参与者把声音、图像与规则组织成可以运行、可以演奏、可以继续修改的实时视听原型。

新的两门科目继续向真实演出推进：

1. **科目一｜现场副驾 / Live Show Copilot**：AI / MCP 帮助把复杂的现场工程整理成少量、分层、可操作的控制；真正演出时由参与者自己听、判断、Tap、Resync、推高、拉掉与恢复。
2. **科目二｜舞台复刻 / Stage Replica**：从演唱会、游戏、电影或其他虚拟世界的参考场景出发，把它整理成一个可播放自己内容、可 Mapping、可切换视角、可继续改造的数字舞台。

两科一眼区分：

- **现场副驾：我怎么演。**
- **舞台复刻：我在哪里演。**

## 前序｜极简输入
### Minimal Input — Building an Audiovisual System

从一个按钮开始，把声音、图像与状态组织成一个可以演奏、可以分享的实时视听系统。

---

# 科目一｜现场副驾
## Live Show Copilot
### AI-Assisted Show Control

**长标题：** 如果一整套现场演出最后只能留几个按钮，你会留下什么？

AI / MCP 先帮助参与者把复杂现场工程整理成一套 **Show-Control Rig**：

```text
Input
↓
Mapping
↓
Layer
↓
State
↓
Safety / Recovery
```

键盘可以，MIDI、脚踏、旋钮和推子也可以。

现场真正开始以后，AI 不替你判断。参与者需要自己：

- 听 DJ / 音乐；
- 跟住 BPM；
- Tap / Resync；
- 切换不同节拍与能量状态；
- 在 Drop、气口、停顿和高潮之间做判断；
- 出错以后回到安全状态继续演。

课程最后进行两段测试：

- **理论考｜听状态**：直接听音乐，在保持、推进、爆发、拉掉、恢复之间做判断。
- **路考｜DJ 现场模拟**：与 DJ 老师共同完成随机桥段组织，检查 BPM、节拍状态、能量升降、留白和恢复。

完整课程稿见：

- [科目一｜现场副驾](./module-01-one-button-show-control.md)

---

# 科目二｜舞台复刻
## Stage Replica
### Build, Remix & Previsualize a Digital Stage

**长标题：** 你有没有看过一场演唱会、一款游戏或者一个电影场景，想过：如果这个舞台是我的，我会在上面放什么？

课程从一张参考图、一段现场视频，或者一个喜欢的虚拟世界开始，把它重新整理成一个可以播放自己内容的数字舞台。

参与者会：

- 找到最重要的屏幕和空间结构；
- 改造屏幕、比例与舞台关系；
- 把自己的视频 Mapping 进去；
- 从不同观看位置检查；
- 建立“铺垫 → 建立 → 爆发 → 收束”的最小时间结构；
- 最后留下一个可以继续修改的舞台沙盘。

主线优先使用网页工具，让没有 Blender 基础的人也能完成。

AI / MCP 用于：

- 从参考图、视频或场地资料中整理屏幕与空间信息；
- 生成 Screen / Stage Description；
- 辅助生成或修改网页舞台；
- 会 Blender 的参与者可以继续通过 Blender / MCP 修改模型、相机、灯光、关键帧与场景；
- 输出可读规格与结构化场景数据。

课程会引用一次 **ENTROPY Show** 的实际准备作为案例：曲面主屏原生画幅 **9600 × 3456（25:9）**，并与天屏共同工作。通过整理尺寸、比例与 Mapping，再把实时窗口放入数字舞台，可以在正式进场以前检查多屏关系与不同观看位置的视觉效果。

完整课程稿见：

- [科目二｜舞台复刻](./module-02-stage-previsualization.md)

---

## Research Branch｜Visual Audio
### 从视觉生成音乐

《Visual Audio》是“音画同源”的进一步研究方向：

> **把视觉工程里的时间、运动、空间和状态，当作音乐生成的输入。**

视觉工程中的 Camera Move、Keyframe、Light、Object Motion、Cut、Scene State 等，可以通过 Agent / MCP 转换为 Rhythm、Dynamics、Texture、Transition、Sound Event 等音乐结构。

研究入口：

- [Visual Audio](../../research/visual-audio/README.md)
- [Issue #77｜Live Show Copilot / Stage Replica / Visual Audio](https://github.com/ewanqian/portfolio/issues/77)

---

## MANA 2026 推文资料

为三场工作坊联合招募准备的最终精简编辑稿：

- [MANA 联合推文编辑素材｜现场副驾 + 舞台复刻](./mana-editorial-2026-09-29.md)

## 版本说明

- **2026-09-29**：系列名确定为 **视听工程师模拟器 / Audiovisual Engineer Simulator**。
- **科目一最终对外名：** 现场副驾 / Live Show Copilot
- **科目二最终对外名：** 舞台复刻 / Stage Replica
- **研究支线：** Visual Audio
