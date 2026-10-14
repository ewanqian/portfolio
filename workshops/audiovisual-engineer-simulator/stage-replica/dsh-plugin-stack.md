# DeepSeek Harness Plugin Stack｜Stage Replica Demo Sprint

**Date:** 2026-10-15  
**Goal:** 为 4 个 Stage Replica Demo 的长任务执行提供一个尽量小、可控的 DSH 扩展栈。

> 原则：先用 DSH 官方内置能力。DeepSeek Harness 本身已经包含 shell / fs / web / subagent / plan / sandbox / skill 等能力，不需要为了“插件很多”一次装满社区生态。DSH 仍处于 preview / RC 阶段，社区插件存在兼容性变化。

---

# 推荐层级

## A｜先装 / 最适合这次任务

### 1. DSH Task Board

**用途：** 把 Sphere / Festival / Installation / Stadium 四个 Demo 拆成长期任务，持续追踪 V1、review、V2、录屏与交付状态。

安装（DSHub 审查固定版）：

```bash
dsh plugin --profile web add @linxin666/dsh-client-ui-task-board@0.1.15
```

适合这次的原因：四个 Demo 本身就是并行的可验收任务，不需要再靠一段超长聊天记进度。

---

### 2. ModLens

**用途：** 让 DSH 更可靠地读取参考舞台截图、layout、灰盒截图、V1/V2 对比图和 UI 截图；尤其适合当前主模型视觉能力不稳定或纯文本时。

安装（DSHub 审查固定版）：

```bash
npx -y @deepseek-ai/dsh plugin --profile web add @liustack/modlens@3.16.6
```

适合这次的原因：Stage Replica 大量判断来自图片，而不是纯代码。参考图和预演截图应该进入同一个 review loop。

---

### 3. dsh-genui

**用途：** 在 DSH 对话中直接生成交互式 UI、Mermaid、图表和 Three.js 3D scene，用来快速看 stage layout / camera / scene manifest。

社区目录安装方式：

```bash
dsh plugin add @omdsh-dev/dsh-genui
```

适合这次的原因：可以把“先搭低保真、马上看结果”的节奏留在 Harness 内部，特别适合 Stage Replica 的 graybox / previs。

**注意：** 此项来自社区插件目录；安装前检查当前 DSH 版本兼容性。

---

## B｜任务大了以后再开

### 4. dsh-agent-teams

**用途：** 多 Agent 并行工作。可以把四个 Demo 分给独立 agent，但统一共享生产规范与最终验收标准。

社区目录安装方式：

```bash
dsh plugin add dsh-agent-teams
```

建议角色：

- `sphere-agent`
- `festival-agent`
- `installation-agent`
- `stadium-agent`
- `review-agent`（只负责检查共同标准，不擅自改设计方向）

**什么时候值得装：** Sphere 已经跑通一个最小闭环以后。不要一开始就四路并行，否则会同时产生四套不一致的工程结构。

---

### 5. dsh-context

**用途：** 查看长会话里实际进入模型的 context、历史变化、文件活动和 agent 关系。

适合这次的原因：这个项目约束很多，最怕 Harness 做到后面逐渐忘掉“不是建模课、必须 V1→review→V2、proxy 不能冒充真实尺寸”等约束。

建议在任务明显变长、出现指令漂移以后安装，而不是第一天就加。

---

### 6. Ouroboros for DSH

**用途：** spec-first 长任务；先明确 Seed / specification，再执行并做 QA。

适合这次的地方：`dsh-production-brief.md` 已经很接近一个可以交给 spec-first agent 的任务说明。

但它会增加 Python / uvx / MCP 运行链路，工具调用可能持续较久，所以这次不是第一优先。只有当普通 plan + subagent 已经控制不住任务时再加。

---

## C｜按环境需要

### 7. Skills / MCP Manager（如果当前 Desktop 版本已提供）

用途：连接 Blender MCP 或其他已有 MCP，而不是为了 Stage Replica 再造一套 Blender 插件。

推荐原则：

- Browser / Three.js 能快速验证的 Demo，先 Web。
- Blender 更适合的舞台结构，直接让 Agent 进入 Blender 工程迭代。
- 不把 Blender 和网页做成二选一。

---

### 8. dsh-remote

**用途：** 如果 Harness 跑在一台机器，而最终工程、渲染或录屏跑在另一台 Windows / NAS / Linux 主机，可以通过 SSH/SFTP 操作远程 workspace、命令和端口转发。

如果所有东西都在同一台电脑，不装。

---

# 本次不建议优先安装

- 大量模型路由插件：先把单模型 + 生产规范跑稳。
- 数据库 Agent：与这次任务无关。
- 复杂跨实例消息插件：四个 Demo 尚未大到需要分布式 Agent 网络。
- Computer Use：只有明确必须点 GUI、且 MCP / 文件 / 脚本无法完成时再使用；不要让 GUI 自动化成为主工作流。
- 重型长期记忆插件：项目状态首先以仓库 Markdown + Git 历史为准，避免记忆和真实文件冲突。

---

# 推荐最小组合

第一天只建议：

```text
DSH Standard / built-ins
+ Task Board
+ ModLens
+ GenUI（确认兼容后）
```

Sphere 完成 V1→V2 后，如果确实要并行：

```text
+ Agent Teams
+ dsh-context
```

如果后面需要让 Agent 长时间严格按规格自主执行：

```text
+ Ouroboros
```

如果要跨机器 / Blender：

```text
+ MCP Manager / Blender MCP
+ dsh-remote（仅跨 SSH 主机时）
```

---

# 推荐任务分工

不要让一个 Agent 同时“找参考、设计、写代码、评价自己”。更稳的结构：

```text
LEAD
读取 production brief / 决定当前 phase

REFERENCE
整理参考与已确认尺寸，不做创意扩张

BUILD
搭 graybox / source / camera / states

REVIEW
完整观看 V1，记录问题，不直接重写全部工程

REVISION
按 review 修改成 V2

DELIVERY
录屏 / still / README / 对照图
```

这些角色可以先用 DSH 官方 subagent 完成；只有并行度明显提高时再引入 AgentTeams。

---

# 插件安全与版本原则

DSH 当前仍在快速迭代。安装任何社区插件前：

1. 记录 DSH 版本与 profile；
2. 每次只加一个插件；
3. 安装后先跑最小测试；
4. 固定可工作的版本；
5. 再开始正式 Demo；
6. 不把 API Key、SSH 凭据和重要项目目录随意授权给未经检查的插件。

仓库文件、Git 历史和 `dsh-production-brief.md` 应作为项目真相源，而不是依赖会话记忆。
