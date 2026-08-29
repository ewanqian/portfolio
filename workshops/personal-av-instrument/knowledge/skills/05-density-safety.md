# Skill 05 — Density / Voice / Safety Guard

**Use when:** 连续操作后声音越来越炸、视觉越来越满、系统只能靠刷新页面恢复。

## 核心

自由度需要保护层：

```text
max voices
max active phrases
per-group cap
decay
cooldown
priority
limiter
panic/reset
```

## Prompt Seed

```text
为现有实时系统增加 safety layer，不改变主要美术与交互。
要求：
- max audio voices；
- max active visual phrases；
- low/mid/high/fx 分组并设置上限；
- 重复输入有 cooldown / debounce；
- 超出上限时优先拒绝或淡出最低优先级事件；
- master compressor / limiter；
- Esc = Panic，恢复到稳定状态。
请在 UI 上只给必要的状态反馈，不增加复杂控制面板。
```

## 验收

连续高速操作 60 秒后：音量不持续抬升、视觉仍有层次、Reset 可以立即恢复。