# Ewan Qian 个人百科

> 作用：为 Portfolio、CV、申请材料、项目页、公开简介、工作坊与长期档案提供统一事实层。  
> 原则：**Bio 是输出，不是事实源。**

## 先从哪里读

- [Knowledge Map / 知识地图](./KNOWLEDGE-MAP.md)：个人仓库、Collective、SpacePort、Newsroom 之间的统一导航
- [Claims Ledger / 事实与证据账本](./claims-ledger.md)：当前可用事实、待补事实与边界
- [Agent API](./api/README.md)：Codex / Agent 的读取规则
- [Encyclopedia JSON](../../public/data/ewan-encyclopedia.json)：结构化人物、项目、事件、奖项与合作记录
- [Media Index](../../public/data/ewan-media-index.json)：图片 / 视频 / 文档索引

如果只是想快速理解“一个项目应该去哪里读”，优先看 **Knowledge Map**；如果要生成 Bio、CV、Proposal 或自动选项目，则从 JSON 与 Claims Ledger 开始。

## 为什么要有这一层

Ewan 的资料已经分布在个人 Portfolio、VIRTURA Collective / SpacePort、项目 README、PDF、视频、演出记录、工作坊、研究稿和历史 Git 提交中。百科的任务不是再写一篇更长的简介，而是把这些资料整理成可以被人和 Agent 共同调用的事实系统。

推荐信息流：

```text
项目文件 / 团队仓库 / 节展记录 / 图片 / 视频 / 新补充
                           ↓
                Claims Ledger（人审）
                           ↓
                结构化 Encyclopedia API
                           ↓
          Profile / CV / Proposal / PPT / Website
```

任何新的成就、合作、奖项、展演、教学或项目版本，优先进入事实层，再由公开页面提取。

## 状态词表

只使用明确状态：

- `verified-public`：已核验，可直接公开
- `ongoing`：已经发生并持续发展
- `presented`：已经公开呈现 / 演出 / 展出
- `needs-source`：已有可靠线索或本人确认，但还需要更强原始证据补齐日期、角色或正式名称
- `proposal`：研发 / 提案阶段，不能写成已发生
- `deprecated`：旧表述，只保留历史

公开生成器默认只能直接使用前三类。

## 证据优先级

1. 主办方 / 节展 / 学校 / 合作方正式页面、证书、节目单、邮件、合同或回执
2. 同期项目文件、展签、现场记录、原始图片与视频
3. GitHub 中同期团队 / 项目仓库的结构化记录
4. 后期整理的 Portfolio / VIRTURA PDF
5. 本人后续口述与对话记忆
6. 推断

第 5 层可以先进入 `needs-source`；第 6 层不能进入公开事实。

## 团队仓库怎么使用

`VIRTURA-Collective` 与 `VIRTURA-SpacePort` 是重要补充证据源。

它们可以用于补足：

- TIMER / Drop Flow 的版本历史
- ChinaGraph 等奖项与呈现
- 项目参与人和角色
- 作品图片与视频
- 项目方法与研究演化

但团队项目仍然是团队项目。百科必须分别记录：

```text
项目 / 版本
    ↓
发生时间与地点
    ↓
Ewan 的具体角色
    ↓
其他合作人及其角色
    ↓
证据
```

不能因为一个项目出现在 VIRTURA 仓库，就自动写成 Ewan 独立创作。

## 合作人的记录方法

合作关系按项目和版本建立，而不是只写“长期合作艺术家”。

例如：

```text
徐昊 Hao Xu
├── TIMER / 2024 / 对应 credit
├── Drop Flow / 对应版本 credit
└── 后续项目 / 单独核验

Georgy Robakidze (RÖ)
├── Urban Resonance / ongoing research line
├── DigitalFUTURES 2026 / 待补正式节目单
└── 后续演出 / 单独建记录
```

人的页面只是关系索引，项目记录才是署名事实源。

## 图片与视频

图片、视频、节目单、海报和证书不要散落写进 Bio。

先登记到 `ewan-media-index.json`：

```text
media_id
→ record_id
→ repo / path / url
→ caption
→ rights / public status
```

以后做网页、PDF、PPT 或 Agent 自动选图时，通过项目 ID 调用。

## 身份边界

本百科只维护 **钱誉文 / Ewan Qian** 的个人与职业档案。

任何其他账号使用者、协作者或历史文件作者的教育、申请、作品、研究方向与个人经历，都不得并入 Ewan。协作者只在有证据的具体项目 credit 中出现。

## 长期维护原则

每次新增资料只回答五件事：

1. 这是什么项目 / 事件 / 合作？
2. 什么时间、什么地点？
3. Ewan 的具体角色是什么？
4. 证据在哪里？
5. 应该关联哪些图片 / 视频 / 合作者？

这样 Git 历史本身会逐渐成为 Ewan 实践演化的可追溯档案，而不是不断重写的一篇 Biography。
