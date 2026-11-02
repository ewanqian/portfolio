# 02｜场景铸造
## Scene Forge
### Minimal Input Lab / 极简输入实验室

**版本：** Reader 0.1 · 2026-11-02  
**发起 / Instructor:** Ewan Qian

> 先把一场演出看成空间和时间的关系，再决定屏幕里应该发生什么。

---

## 1. 本期解决什么

很多创作者会先把一条视觉、一个装置或一段动画做完，直到真正进入场地以后才开始处理：

- 屏幕有多大；
- 人站在哪里；
- 灯光怎样进入；
- 内容如何跨屏；
- 观看位置发生什么变化；
- 音乐、表演和视觉什么时候一起推进。

场景铸造把这些问题提前。

先做一个足够轻的演出草稿，让团队可以观看、讨论、修改，再决定哪些部分值得进入 Blender、Unreal、TouchDesigner、Arena、灯光控台或真实搭建。

它不是为了替代专业软件，而是建立一个跨工种可以共同看的 **Previs / 预演层**。

---

## 2. Learning Outcomes / 学习结果

完成本模块后，参与者应能够：

1. 根据场地图、参考图或现场照片搭出一个最小 Gray Box；
2. 区分 **空间草稿** 与 **内容草稿**；
3. 用 Stage Plot 表达人物、屏幕、灯光、装置和观看方向；
4. 用 Storyboard / Timeline 组织一段 20–30 秒的演出结构；
5. 在同一时间结构里同时考虑 Music / Performer / Light / Screen；
6. 把自己的视觉、网页、装置或其他媒介放进预演场景；
7. 完成 V1 → 观看 → 找出一个问题 → V2；
8. 能解释“为什么这样安排”，而不只是“AI 帮我做出来了”。

---

## 3. Course Map / 课程地图

```text
REFERENCE / VENUE
↓
GRAY BOX
↓
STAGE PLOT
↓
STORYBOARD / TIME
↓
SCREEN / LIGHT / PERFORMER / SOUND
↓
PREVIS
↓
CRITIQUE
↓
V2
↓
FIELD TEST
```

---

## 4. Core Model / 核心模型

### 两种草稿

**空间草稿 / Spatial Draft**

用于讨论：

- 比例；
- 朝向；
- 遮挡；
- 观看位置；
- 屏幕与装置关系；
- 人在哪里。

**内容草稿 / Content Draft**

用于讨论：

- 视觉材料；
- 灯光状态；
- 音乐状态；
- 节奏；
- 密度；
- 情绪；
- 版本变化。

两者不要一开始就绑死。

```text
SPACE = relatively stable
CONTENT = highly iterable
```

场地物理条件往往难改；内容应该允许快速做很多版。

---

## 5. Standard Exercise / 标准答案

### 30 秒 Opening

这一关不要求个人风格。

所有人先完成同一个时间结构：

```text
00–06s   OPEN
黑场 / 极弱 ambience
只建立空间预期

06–12s   REVEAL
中央主体或主屏慢慢出现
一条主光建立
音乐第一次给出明确材料

12–18s   BUILD 01
视觉密度增加
第二层空间 / 屏幕进入

18–24s   BUILD 02
音乐和灯光继续抬升
人物 / 装置 / 多屏关系扩大

24–30s   PEAK
一次明确 hit
多个媒介第一次真正汇合

30s+     RELEASE
收回一部分信息
准备进入下一段
```

### 最小轨道

必须同时考虑四条：

- Music
- Performer / Object
- Light
- Screen / Visual

装置创作者可以用 Installation 替代 Performer 作为主对象。

### 完成条件

- [ ] 有一个可查看场景；
- [ ] 30 秒结构至少有 OPEN / BUILD / PEAK / RELEASE；
- [ ] 四条轨道在时间上有明确关系；
- [ ] 不是所有东西从第一秒就出现；
- [ ] 至少留一个明显的“空”或“收回”；
- [ ] 完成 V1 后必须指出一个问题并做 V2。

---

## 6. Step-by-Step / 跟做

### Step 01｜先定场地，不做漂亮

**Goal**  
建立所有讨论的共同空间基础。

**Input**  
场地 PDF / 尺寸 / 参考图 / 现场照片。

**Action**  
只搭：

- floor；
- main screen；
- optional top / side screen；
- camera / audience view；
- 一个 performer / object placeholder。

**Done When**  
参与者能回答“人、屏幕、观众大概是什么关系”。

**Failure Mode**  
一开始就研究材质、辉光、反射、真实感，把时间耗在无关细节上。

---

### Step 02｜画 Stage Plot

先用二维图表达：

- 屏幕；
- 人；
- 灯；
- 装置；
- 观看方向。

不需要专业制图精度，但必须让别人一眼看懂。

**Done When**  
不打开 3D 工程也能讨论主要空间关系。

---

### Step 03｜写 30 秒 Storyboard

不要先写“画面效果”。

先写每一段的作用：

| Time | Function | Question |
|---|---|---|
| 00–06 | OPEN | 观众先知道什么？ |
| 06–12 | REVEAL | 第一个明确材料是什么？ |
| 12–18 | BUILD | 哪一层信息开始增加？ |
| 18–24 | BUILD | 空间怎样变大？ |
| 24–30 | PEAK | 哪些媒介第一次汇合？ |
| 30+ | RELEASE | 什么应该被拿掉？ |

---

### Step 04｜补四条轨道

用最简单的 Cue Sheet：

| Time | Music | Performer / Object | Light | Screen |
|---|---|---|---|---|
| 00:00 | ambience | still | 0% | black |
| 00:06 | texture | enter / wake | 15% top | center fade |
| 00:12 | pulse | hold | 25% | layer 2 |
| 00:18 | rhythm | move / expand | 40% | expand |
| 00:24 | build | center / lock | 70% | multi-screen |
| 00:28 | hit | stop | flash | full |
| 00:30 | release | still | 20% | reduce |

这里不是要求学员成为灯光师或导演。

目的是建立跨工种共同语言。

---

### Step 05｜把自己的媒介放进去

这一步才开始 Remix。

#### 如果你做视觉
把网页、视频或实时程序放进 Screen。

#### 如果你做装置
把装置模型 / 图片 / 简化几何作为主体，不需要先做屏幕视觉。

#### 如果你做音乐
让音乐结构成为 Timeline 的主轴，再检查灯光、屏幕和对象怎样回应。

#### 如果你做灯光
可以让屏幕保持极简，优先研究空间如何被光改变。

#### 如果你做 Unity / VR
把当前场景当成跨软件沟通层或 previs reference。

---

### Step 06｜只看一次，然后挑一个毛病

第一次预演不准继续无目的加东西。

必须先回答：

1. 视觉中心清楚吗？
2. 哪一段信息太满？
3. 哪一段完全没有推进？
4. 人 / 装置和屏幕有关系吗？
5. 音乐变化和空间变化是不是都在同一时刻抢？
6. Peak 之前有没有留足空间？

然后 V2 **只改最严重的一个问题**。

---

## 7. 为什么不是所有项目都要重建 3D

预演是工具，不是仪式。

如果作品只需要一个固定主视角，现场已经有照片，而且最重要的是合成画面，那么：

- 一张正确透视的现场照片；
- 一个简单 UV / mask；
- 一次内容合成；

可能比完整建模更高效。

只有当问题确实涉及：

- 多观看位置；
- 遮挡；
- 多屏关系；
- 空间移动；
- XR；
- 灯光 / 对象关系；

再进入更完整 3D。

判断标准不是“能不能做”，而是“这个模拟解决什么问题”。

---

## 8. Case Study Framework / 案例怎么讲

后续主案例统一使用：

```text
CONSTRAINT
↓
FIRST DECISION
↓
SPATIAL DRAFT
↓
CONTENT DRAFT
↓
V1
↓
WHAT FAILED
↓
REVISION
↓
FIELD RESULT
```

案例至少回答：

- 场地给了什么限制？
- 为什么选这种屏幕 / 空间关系？
- 音乐 / 内容什么时候进入？
- 第一版哪里不成立？
- 现场与预演哪里不一样？

最终效果图只是一部分。

---

## 9. Checkpoints / 检查点

### Checkpoint 01｜Gray Box Review

只讨论：

- 比例；
- 视线；
- 屏幕 / 人 / 装置关系。

禁止讨论材质和审美细节。

### Checkpoint 02｜Timeline Review

两人一组互看 30 秒结构。

每个人只说两句话：

> 我最清楚的一段是……

> 我最不清楚的一段是……

### Checkpoint 03｜V1 → V2

最终展示必须同时放：

- V1；
- 收到的一个反馈；
- V2；
- “我只改了什么”。

---

## 10. Assessment / 验收

### Structure
空间关系是否读得懂？

### Timing
30 秒是否真的有推进和收回？

### Relation
Music / Light / Performer / Screen 是否互相解释，而不是同时堆满？

### Control
内容能否替换、播放、暂停、查看或回到稳定状态？

### Iteration
是否真的完成一次问题识别和 V2？

### Documentation
别人能否从 Stage Plot、Storyboard、Cue 和链接理解项目？

---

## 11. Submit / 提交

每人至少提交：

1. 场景 URL / 工程；
2. Stage Plot 一张；
3. 30 秒 Storyboard / Cue Sheet；
4. 10–30 秒预演录屏；
5. V1 / V2 对比；
6. 一句话：这版最重要的决定是什么？
7. 一句话：下一版只改什么？

---

## 12. Professional Practice Notes / 生产常识

### 这不是“导演速成”

真实演出通常涉及多个专业角色：导演、舞美、灯光、音乐、编舞 / 表演、视觉、技术与现场执行等。

本模块只提供一个初学者可以使用的最小协作语言，让创作者知道什么时候应该问谁、需要准备什么中间产物。

### 常见沟通物

- Stage Plot / Ground Plan
- Reference / Moodboard
- Storyboard
- Cue Sheet / Show Score
- Screen Spec
- Content List
- Technical Rider
- Previs / Render / Recording

不同项目会有不同格式，不把本课程模板当成行业唯一标准。

---

## 13. AI / Agent 在这里做什么

适合：

- 从场地资料提取尺寸；
- 快速搭 Gray Box；
- 根据截图生成多个结构版本；
- 编写网页场景；
- 替换 screen source；
- 整理 cue / timeline 数据；
- 保存版本；
- 帮助检查遗漏。

不适合替代：

- 你对空间的判断；
- 你对时间的判断；
- 对现场观看体验的真实测试；
- 跨工种沟通；
- 创作选择。

AI 让实现变快以后，**选择会变成新的瓶颈。**

---

## 14. Level Up / 下一关

### L1 COPY
完成 30 秒 Opening 标准答案。

### L2 MODIFY
只改一个变量：舞台结构 / 灯光 / 内容 / 音乐 / blocking 五选一。

### L3 COMPOSE
独立编排一条 30–60 秒结构。

### L4 COLLAB
与另一位音乐 / 灯光 / 装置 / 表演方向的人共用同一 Stage Plot 和 Cue。

### L5 PERFORM
把预演结果接入真实屏幕、灯光、控制器或 The Point 等实际空间进行测试。

---

## 15. Further Reading / 延伸阅读

### Required

- 10/31 工作坊课程地图与 After Workshop
- Scene Forge / 场景铸造公开仓库
- 30 秒 Opening 标准练习

### Previous Module

前一期「一键输入」解决：

**一个输入怎样变成状态、节拍、声音和视觉。**

这一期继续解决：

**这些内容最后应该出现在什么空间、什么时间、和什么人 / 光 / 声音发生关系。**

### Optional

- Stage Replica 案例库
- 8/29 一键输入课后延伸
- Blender / Arena / WebGL / WebXR 扩展

---

## 16. After Workshop / 已验证反馈

当前反馈反复指向：

- 案例启发有效，但需要更深解释 WHY / HOW；
- 初学者需要先完整跟做一次，再自由发散；
- 需要一个真正从空白到可运行的演示；
- 参与者希望理解表演者、灯光、音乐、屏幕怎样协调；
- 不同背景的人需要更早看到“自己的媒介怎样进入这套方法”。

因此下一版不以增加案例数量为目标，而以提高可复现性为目标。

---

## 17. Reflection / 复盘

1. 这场演出最重要的空间关系是什么？
2. 如果屏幕全部关掉，还剩下什么？
3. 哪一个 Cue 真正改变了观看体验？
4. 哪一段只是“东西更多了”，但没有更强？
5. 下一版只改什么？

---

## 18. Credits / Version

**Series:** Minimal Input Lab / 极简输入实验室  
**Module:** 02 Scene Forge / 场景铸造  
**Instructor / Initiator:** Ewan Qian  
**Version:** Reader 0.1 · 2026-11-02

本 Reader 根据 10/31 工作坊原始录音、现场课程资料、课后匿名回访和既有 Scene Forge / 舞台预演研发重新编辑。私人聊天、参与者姓名与可识别信息不进入公开教材。
