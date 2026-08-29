# Skill 01 — Beat Clock / Quantized Intent

**Use when:** 输入听起来散、不同层不同步、表演者必须自己把每一下按准。

## 核心

把 BPM / beat / bar 变成系统共享的时间坐标。人的操作可以先表达意图，再在下一个合理边界执行。

```text
human input → pending intent → next beat/bar → audio + visual event
```

## Prompt Seed

```text
为现有系统加入一个共享 transport。不要重写视觉或声音模块。
- BPM 可配置；
- Audio 与 Visual 读取同一个 clock；
- 用户输入先立即给轻微视觉反馈；
- 正式事件 quantize 到下一 1/8 note 或 bar；
- 显示 pending state；
- 保留 Esc / Panic。
先说明要修改哪些文件，再实现。
```

## 验收

- 快按 / 慢按都不会把节奏打散；
- 视觉和声音不是两个独立计时器；
- 延迟可感知但不让人觉得“没按上”。