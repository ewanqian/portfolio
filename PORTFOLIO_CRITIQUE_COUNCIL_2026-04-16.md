# Portfolio Critique Council 2026-04-16

这份文档用于把“批判委员会 + 用户进入模拟 + 执行路线”固定下来，避免后续每轮迭代重新从口头判断开始。

## 当前判断

- 当前完成度：约 `65% - 70%`
- 距理想状态的差距：约 `30% - 35%`
- 主要问题不是内容不够，而是：
  - 同一批内容被多套结构反复讲
  - 对外层级还没完全收口
  - CTA、命名和对象关系还存在系统内语言残留

## 批判委员会构成

- 信息架构委员：审导航、页面层级、Archive / Gaussian / Works / Production 关系
- 客户转化委员：审客户 30 秒判断、咨询路径、信任建立
- 内容系统委员：审 canonical id、content / database / projects 边界
- 文案叙事委员：审标题、CTA、双语规则、内部术语残留

## 十轮讨论

### Round 1 - 首访 30 秒判断

- 结论：首访者已经能知道“这是艺术实践 + 合作服务 + 档案系统”，但还不能稳定在 30 秒内完成“我接下来该点哪里”的判断。
- 核心问题：
  - 首页仍承担了太多功能
  - 有些解释性模块抢了决策层内容的位置
  - CTA 动词系统不统一
- 执行动作：
  - 首页只保留一条主阅读线
  - 让 CTA 用一套语义
  - 让合作入口比解释性内容更早可见

### Round 2 - 顶层导航与入口语义

- 结论：顶层入口已经比之前干净，但 `Overview / Works / Gaussian / Production / Archive / Writing` 之间还需要更强的职责合同。
- 核心问题：
  - `Overview` 需要明确只是首页阅读起点
  - `Gaussian` 与 `Archive` 之间还存在轻微平级感
  - `Works` 是精选，不是总目录
- 执行动作：
  - 保持顶栏只服务一级目的地
  - `Archive` 负责总索引
  - `Gaussian` 固定为样本子库，而不是另一个总目录

### Round 3 - 首页结构层级

- 结论：首页已经比旧版更清楚，但模块数量仍偏多，解释层和导流层没有完全分家。
- 核心问题：
  - `ProfileDirections`、`PracticeLines`、`ArtisticOverview` 都在解释“怎么理解这个人/这个站”
  - `ImageWall` 和 `SelectedWorks` 都在承担证据建立，但命名和角色还可继续收敛
- 执行动作：
  - 把首页视为“首读路径”
  - 解释性模块后移
  - 证据型模块前移并缩短引导语

### Round 4 - Production 转化页

- 结论：`Production` 已经是明确的合作页，但仍有较强的系统术语残留，联系动作还可以更前。
- 核心问题：
  - 服务标题偏技术分类，不够结果导向
  - 交付规格能力块占据主语义位置
  - 联系动作不够早
- 执行动作：
  - 改写服务标题为客户结果语言
  - 在概览后立即给联系入口
  - 把技术细节放到支持区而不是首页式标题位

### Round 5 - Archive 作为总索引

- 结论：`Archive` 目前最容易出现“命名过满”的风险，因为它对外叫“完整档案”，但实际承担的是“当前公开索引”。
- 核心问题：
  - 容易误导成“全量内容”
  - `Gaussian` 横幅视觉权重过大
  - `Open Detail / Open Record` 一类 CTA 语气太工具化
- 执行动作：
  - 把页面定位改成“档案索引”
  - 明确说明深层对象仍在 `database/` 和 `projects/`
  - CTA 中文优先，语义更像阅读动作

### Round 6 - Gaussian 作为样本子库

- 结论：`Gaussian` 的价值很高，但最容易滑回内部方法页。它应该是“样本库 + 研究子页”，而不是另一个总入口。
- 核心问题：
  - `Open Production / Open Writing / Open Archive / Workflow Note` 的互导过密
  - `Reading Angles / Current Scope / Workflow & Service Path` 的命名偏系统语言
  - `Open SuperSplat / Open Scene / Embed URL` 的按钮语气偏内部工具
- 执行动作：
  - 保留一条主要转向 `Production`
  - 用“这页怎么看 / 你能在这里判断什么 / 从样本到合作”替代内部术语式标题
  - 把工具按钮改成阅读动作

### Round 7 - 文案与 CTA 系统

- 结论：目前最大的问题之一是 CTA 动词系统还没完全统一。
- 核心问题：
  - `Open / Enter / View / 返回 / Workflow Note` 混用
  - 同一页面里中英顺序反复切换
  - 某些关键词仍像数据库字段而不是公开标题
- 执行动作：
  - 全站 CTA 统一为“查看 / 返回 / 直接联系”体系
  - 中文主句，英文补充
  - 内部术语后移到次级区块

### Round 8 - 内容系统与对象层

- 结论：公开层的真实风险不只在页面，还在对象层边界和 canonical id。
- 核心问题：
  - `dropflow3-live-2025` 与 `drop-flow-ufo-2025` 并存
  - `hangzhou-opening` 仍出现在 content schema 示例和资产关系里
  - `Archive` 的公开语义比真实 coverage 更满
- 执行动作：
  - 先修旧 id 断链
  - 让旧 id 只存在于 mapping 层
  - 继续把字符串摘要对象化

### Round 9 - 用户进入模拟

- 模拟 1：陌生首访者
  - 进入首页
  - 先看 `Selected Works`
  - 再看 `PracticeLines`
  - 目标：30 秒内知道这是创作实践 + 合作服务 + 档案系统
- 模拟 2：潜在客户
  - 首页 -> `Production`
  - 看概览、服务类型、交付规格、联系入口
  - 目标：1 分钟内知道自己该不该联系
- 模拟 3：档案型读者
  - 首页 -> `Archive`
  - 再分流到 `Gaussian`
  - 目标：确认“索引页”和“样本子库”不是两个平级总目录
- 模拟 4：方法型读者
  - 首页 -> `Gaussian` 或 `Writing`
  - 目标：理解方法和样本，但不会迷失在过多互导中

### Round 10 - 综合结论

- 最终理想状态：
  - 首页只负责首读判断
  - Production 只负责合作判断
  - Archive 只负责总索引
  - Gaussian 只负责空间样本子库
  - Writing 只负责方法与研究
- 当前与理想之间最关键的差距：
  - 术语系统还没完全统一
  - 某些页面的“职责边界”仍会滑动
  - 对象层 canonical id 还没完全清干净

## 长任务清单

### Phase A - 公开层收口

- [x] 顶栏语义从混合型导航收成更稳定的一级入口
- [x] 首页去掉多余 banner，保留主阅读线
- [x] `Production` 增加更早的联系动作
- [x] `Archive` 从“完整档案”改为“档案索引”
- [x] `Gaussian` 的 CTA 改成阅读动作而不是工具动作
- [ ] 继续压缩首页解释性模块的长度
- [ ] 评估 `Overview` 是否保留英文，还是改成中文主句

### Phase B - 文案系统统一

- [x] `Public Signals` 改成更公开的说法
- [x] `Viewer / Spec` 改成客户结果语言
- [x] `Open / Enter / View` 开始统一成“查看 / 返回 / 直接联系”
- [ ] 把所有按钮再扫一遍，清掉残余英文动词
- [ ] 把双语顺序统一成“中文主句 + 英文补充”
- [ ] 检查 `Writing` 页和 `SelectedWorks` 页是否仍有旧按钮语气

### Phase C - 档案与样本边界

- [x] 明确 `Archive` 是索引页
- [x] 明确 `Gaussian` 是样本子库
- [ ] 继续减少 `Archive` 与 `Gaussian` 的重复导流
- [ ] 决定 `Gaussian` 是否继续保留在顶栏一级入口
- [ ] 评估 `PracticeLines` 是否需要缩成 3 条路径而不是 5 条

### Phase D - 内容系统硬化

- [x] 修正 `hangzhou-opening` -> `drop-flow-hangzhou-biennale`
- [x] 修正 `dropflow3-live-2025` 的 canonical 关系引用
- [ ] 审查所有旧 id 是否都只留在 mapping 层
- [ ] 给 `publicSignals`、`readingPaths`、`caseNotes` 做对象化准备
- [ ] 把 `Writing` 页面从硬编码数组迁到对象层

### Phase E - 验证与迭代

- [ ] 每轮改动后执行一次 React build
- [ ] 每轮改动后同步根目录静态 bundle
- [ ] 每轮改动后复看四条用户路径
- [ ] 每轮改动后把结果写回 automation memory

## 这轮已经执行的内容

- 收紧了 `Archive / Production / Gaussian` 的职责命名
- 统一了一批 CTA 语言
- 修正了几处旧 id 和旧归档链接
- 把 `Production` 的服务标题往客户结果语言拉近
- 把 `Gaussian` 的几个主要区块标题改成更公开的说法
