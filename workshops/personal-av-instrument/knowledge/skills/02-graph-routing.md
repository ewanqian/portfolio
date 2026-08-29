# Skill 02 — Graph / Node / Route

**Use when:** 系统已经有很多按钮和效果，但没有结构，不知道下一步该往哪里走。

## 核心

把功能改写成“演出角色”，再用节点和路径连接。

例如：

```text
FIELD → PULSE → ROUTE → ORBIT → PARTITION → RELEASE → FIELD
```

节点不是 preset；节点表示系统当前可以承担的功能。Edge 表示合理的迁移关系。

## Prompt Seed

```text
把当前 effects 列表重新组织成 5–7 个 performance roles。
要求：
- 每个 role 有明确功能，而不是视觉名称；
- 建立 graph edges，说明哪些状态可以自然互相迁移；
- Space = 前进到下一 route node；
- 点击节点 = 直接进入；
- 当前 node、previous node、next node 都必须可观察；
- 不增加新的视觉效果，优先重新组织已有内容。
```

## 验收

- 操作者可以回答“我现在在哪里”；
- 路径改变时声音、视觉和时间结构都发生变化；
- 关闭文字 HUD 后仍能感觉到迁移。