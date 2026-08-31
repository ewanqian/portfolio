# Skill 10 — State Instrument / 状态化网页乐器

**Use when:** 已经有一个可运行的按钮或键盘 Demo，但它仍然像“按一下出一个效果”，缺少持续变化、音乐段落与演出结构。

## 核心

把状态分成三层，而不是把所有变化都塞进同一个按钮：

```text
INPUT STATE
IDLE → TAP → HOLD → RELEASE

MUSIC STATE
OPEN → BUILD → PEAK → BREAK

VISUAL STATE
GRID / ORBIT / GLYPH / FIELD

SHARED
BPM / BEAT / BAR / ENERGY / MEMORY
```

同一个输入可以在不同 Music State 中拥有不同意义；同一个 Music State 也可以用不同 Visual State 表达。

## 最小键盘控制

- `Space`：Tap / Hold / Release
- `↑ / ↓`：BPM ±5
- `← / →`：切换 OPEN / BUILD / PEAK / BREAK
- `1–4`：切换视觉模式
- `A`：Auto Scene
- `F`：Fullscreen
- `Esc`：Reset

## Prompt Seed

```text
先读取当前网页项目，不要重写框架。

把现有 one-shot Demo 改造成三层状态系统：

1. Input State: IDLE / TAP / HOLD / RELEASE
2. Music State: OPEN / BUILD / PEAK / BREAK
3. Visual State: 4 个可切换的空间组织方式

统一使用一个 BPM / Transport。

键盘：
- Space = Tap / Hold / Release
- Up / Down = BPM ±5
- Left / Right = Music State
- 1–4 = Visual State
- F = Fullscreen
- Esc = Reset

要求：
- Tap 使用短 transient；
- Hold 超过 350ms 后进入持续状态；
- Release 留下 1–3 秒 residue；
- OPEN / BUILD / PEAK / BREAK 分别改变 density、release、pitch range、brightness；
- Visual State 不只是换颜色，要改变空间组织；
- Audio / Visual 读取同一个 beat / bar / state；
- 保持系统可恢复，并提供 Reset / Panic。

修改后给出：FILES CHANGED / CONTROLS / HOW TO TEST。
```

## 验收

- 不看说明时，至少能通过 Space 和方向键发现不同状态；
- BPM 改变后声音与视觉时间关系同时改变；
- Hold 与 Tap 明显不同；
- Release 后不会立即归零；
- 四个 Visual State 的差异来自结构，不只是配色；
- 任意状态都可以 Reset 回到稳定起点。

## 公开练习

`/workshop-state-instrument/`
