# Minimal Input Lab Publication Template
## 极简输入实验室统一出版规范

**版本：** 0.1 · 2026-11-02  
**用途：** Reader / Workbook / Casebook / After Workshop 的统一源结构

## 出版目标

每一期工作坊结束后，都留下一个可以脱离现场独立阅读、练习、提交和复盘的正式出版物。

出版物不是 PPT 导出，也不是逐字稿整理。它应当把现场材料重新编辑成：

- 可以理解的课程地图；
- 可以照做的练习；
- 可以检查的结果；
- 可以复现的项目记录；
- 可以继续生长的下一关。

## 固定结构

### 01 · Cover / 封面

必须包含：

- Minimal Input Lab / 极简输入实验室
- Module 编号
- 本期中英文名
- 日期 / 场地 / 合作方（只写已确认事实）
- Ewan Qian
- Version

### 02 · Series / 系列说明

控制在一页：

> 极简输入不是追求功能最少，而是先把一个关系做清楚，再增加复杂度。

并给出系列模块地图。

### 03 · This Module / 本期解决什么

只回答三个问题：

1. 这期解决什么问题？
2. 学完后能独立做什么？
3. 最终要交什么？

### 04 · Learning Outcomes / 学习结果

必须使用可观察动词。

避免：

- 了解
- 感受
- 掌握一些

优先：

- 搭建
- 标记
- 编排
- 操作
- 对齐
- 比较
- 修改
- 解释
- 提交

### 05 · Course Map / 课程地图

一张图展示本期路径。

所有课程地图遵循：

```text
SEE → COPY → MODIFY → REVIEW → REMIX → SUBMIT
```

### 06 · Core Model / 核心模型

每期只允许一个主模型。

例如：

```text
INPUT → STATE → CLOCK → SOUND + VISUAL → FEEDBACK
```

或：

```text
VENUE → GRAY BOX → TIME → MEDIA RELATION → PREVIS → REVISION
```

### 07 · Standard Exercise / 标准答案

必须存在。

要求：

- 初学者可以严格照做；
- 20–40 分钟内出现第一个可运行结果；
- 明确输入材料；
- 明确完成条件；
- 不要求个人风格；
- 后续所有自由练习都从这里修改。

### 08 · Step-by-Step / 跟做

每一步固定使用五个字段：

**目的 / Goal**  
为什么做这一步。

**输入 / Input**  
需要什么材料。

**动作 / Action**  
现在只做什么。

**完成 / Done When**  
怎么判断做完。

**常见错误 / Failure Mode**  
最容易出现什么问题。

### 09 · Case Study / 案例深拆

一册只需要 1–3 个主案例。

优先展示：

```text
CONSTRAINT
→ FIRST DECISION
→ V1
→ PROBLEM
→ REVISION
→ V2 / FIELD RESULT
```

不能只展示最终漂亮画面。

### 10 · Professional Practice Notes / 生产常识

只补足学员完成当前任务需要知道的专业常识。

必须区分：

- 本课程的最小工作模型；
- 专业行业完整流程。

不得暗示三小时课程可以替代专业导演、灯光、音乐、舞美等岗位训练。

### 11 · Exercise Cards / 练习卡

每张卡只增加一个能力点。

```text
LEVEL
TASK
CONSTRAINT
SUBMIT
PASS
NEXT
```

### 12 · Checkpoint & Assessment / 检查与验收

不使用模糊的“好不好看”作为唯一评价。

统一能力维度：

- Structure / 结构
- Timing / 时间
- Relation / 关系
- Control / 控制
- Iteration / 迭代
- Documentation / 文档

### 13 · Reflection / 复盘

固定四问：

1. 这一版只研究了什么？
2. 哪一部分真的有效？
3. 哪一部分不成立？
4. 下一版只改什么？

### 14 · After Workshop / 课后反馈

只保留匿名、聚合、可公开反馈。

结构：

```text
OBSERVATION
→ TEACHING PROBLEM
→ CHANGE
→ HOW TO VERIFY NEXT TIME
```

### 15 · Further Reading / 延伸阅读

分成三层：

- Required / 必看
- Optional / 可选
- Reference / 参考库

避免把延伸资料重新塞回主课。

### 16 · Credits / Sources / Version

至少包含：

- Author / Instructor
- Collaborators
- Venue / Organizer（实际发生时）
- External cases / references
- AI / Agent 在研究、文字、代码或生成中的作用说明
- Version
- Changelog
- Repository / URL

## 图像规则

每张图必须有 caption：

```text
PROJECT / DATE
STEP OR VERSION
WHAT TO LOOK AT
```

禁止：

- 为排版拉伸图片；
- 没有说明的大图堆叠；
- 用最终效果图代替过程；
- 使用无法确认授权或来源的外部图片作为核心教材资产。

## 视觉规则

- 黑 / 灰白为基础；
- 保证打印可读性；
- Serif + Monospace 可用于标题与系统信息层；
- 正文优先高可读无衬线字体；
- 页面层级稳定，不为每一期重新发明版式；
- 图、表、流程统一编号；
- A4 竖版为默认 Reader；需要展示空间图时允许跨页 / A3 附件。

## 文件结构建议

```text
minimal-input-lab/
├── README.md
├── publication-template.md
├── reader-01-one-button-input.md
├── reader-02-scene-forge.md
├── reader-03-show-copilot.md
├── assets/
│   ├── shared/
│   ├── 01-one-button/
│   └── 02-scene-forge/
└── exports/
    ├── pdf/
    └── web/
```

## 发布前检查

- [ ] 本期 Learning Outcomes 可观察
- [ ] 有 Standard Exercise
- [ ] 有至少一个 Checkpoint
- [ ] 有 V1 → Feedback → V2
- [ ] 学员知道提交什么
- [ ] 学员知道下一关是什么
- [ ] 资料来源与 Credits 完整
- [ ] 私人聊天、姓名、头像等已去敏感
- [ ] 未确认活动没有写成已确定
- [ ] PDF 与网页来自同一份源结构
