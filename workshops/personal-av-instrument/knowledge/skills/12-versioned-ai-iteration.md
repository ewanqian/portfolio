# Skill 12｜版本化 AI 开发

## 用途

适合使用 Codex、ChatGPT、Claude Code、豆包、Kimi 或其他 Agent 修改网页、声音系统和 Creative Coding 项目时使用。

目标不是让 Agent 一次改完，而是让每一轮修改都能被看见、比较和回退。

---

## 基本结构

```text
当前可运行版本
↓
建立 Git 记录
↓
描述这次只改什么
↓
Agent 修改
↓
运行 / 试玩 / 检查
↓
查看 diff
↓
保留并 commit
   或
回退
↓
下一轮
```

## 为什么需要版本记录

AI 很容易在解决一个问题时顺带改动其他部分。只靠聊天记录，很难准确知道哪一轮改了哪些文件，也很难回到某个稳定状态。

Git 把每一轮修改变成可比较的版本：

- 可以看到修改了哪些文件；
- 可以比较改动前后；
- 可以保留多个有效方向；
- 可以撤销一次失败修改；
- 可以把某个稳定版本发布到 GitHub Pages；
- 后续 Agent 可以直接读取项目历史，而不是只依赖当前聊天。

---

## 最小工作方法

### 1. 项目开始时

如果项目还没有 Git：

```bash
git init
git add .
git commit -m "baseline: working prototype"
```

如果已经在 GitHub，先确认当前页面可以正常运行，再开始新一轮修改。

### 2. 一轮只解决一个明确问题

例如：

- `Hold 后的声音太短`；
- `BPM 切换会让视觉跳变`；
- `Visual Variant 之间差异太小`；
- `ESC Reset 没有清理 Audio Voice`。

避免一次同时要求 Agent 重做声音、视觉、交互和页面布局。

### 3. 修改前让 Agent 先说明范围

```text
先读取当前仓库。
这轮只解决：______。

修改前告诉我：
1. 你准备改哪些文件；
2. 哪些部分保持不动；
3. 最小测试方法是什么。

不要顺手重构无关代码。
```

### 4. 修改后检查 diff

```text
完成后先不要继续下一轮。
总结：
- 修改了哪些文件；
- 每个文件改了什么；
- 有哪些行为变化；
- 怎么验证；
- 是否存在已知限制。
```

### 5. 有效版本立即保存

```bash
git add .
git commit -m "feat: add hold-to-density mapping"
```

Commit message 不必复杂，但要能说明这一版为什么存在。

---

## 推荐的提交节奏

```text
baseline: working starter
feat: add shared BPM clock
feat: add tap hold release states
fix: stop voices on reset
experiment: graph routing v1
revert: remove unstable auto scene
refine: reduce visual density at peak
release: workshop demo v0.7
```

这比 `update 1 / update 2 / final-final-2` 更容易长期阅读。

---

## 回退方式

### 整个提交有问题

优先使用：

```bash
git revert <commit-sha>
```

它会产生一条新的撤销记录，历史仍然保留。

### 只恢复某个文件

```bash
git restore --source <commit-sha> -- path/to/file
```

检查后再提交。

### 初学者注意

除非清楚后果，不要把 `git reset --hard` 当作默认回退方式。公开或多人协作项目更适合用 `revert` 保留历史。

---

## 保存 AI 修改记录

推荐在仓库里增加一个简短的 `DEVLOG.md`：

```md
## 2026-09-02 / v0.8
Goal: Hold 进入持续状态

Prompt intent:
- 保留单键输入
- Hold > 350ms 后启动 sequencer
- Release 保留 2 秒 residue

Changed:
- audio.js
- state.js

Keep:
- Hold 的声音结构

Remove next:
- Peak 时视觉密度过高
```

不需要保存完整聊天。保存目标、关键决定、有效结果和下一步即可。

---

## GitHub 网页也可以使用

没有本地 Git 经验时，可以先通过 GitHub 网页查看：

- Commits / History；
- 每次提交的 diff；
- 不同文件的历史；
- GitHub Pages 当前发布版本。

需要精确回退、分支实验或大量文件修改时，再使用本地 Git 或让 Agent 在仓库中执行 Git 操作。

---

## 发布检查

一个版本准备分享时：

1. Commit 当前稳定版本；
2. 确认 `index.html` 和资源路径；
3. 发布 GitHub Pages / Cloudflare Pages；
4. 用无痕窗口打开最终 URL；
5. 测试声音解锁、键盘、全屏、Reset；
6. 把最终 URL 和 commit SHA 一起记录。

这样以后看到一个公开视频，就能找到当时实际运行的代码版本。

---

## 可直接复制给 Agent

```text
把这次修改当成一个可回退的版本迭代。

先读取 Git 历史和当前项目，不要重写框架。
这轮只解决：______。

开始前：
1. 告诉我准备修改哪些文件；
2. 保持哪些部分不动；
3. 给出最小验收方法。

完成后：
1. 运行必要检查；
2. 总结 diff；
3. 不继续追加功能；
4. 如果当前版本成立，创建一条能说明意图的 commit；
5. 记录 commit SHA 和已知限制。

不要提交 token、密码、API key 或私人地址。
```
