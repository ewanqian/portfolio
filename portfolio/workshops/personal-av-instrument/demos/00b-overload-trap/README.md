# Bad Demo B — Overload Trap

这是一个**故意做坏的演出系统**，用于 2026-08-29 MANA 工作坊课堂比较。

## 它故意保留的问题

- 没有 BPM / musical boundary；
- 没有 Section / State；
- 每次输入只会继续增加 layer；
- 没有局部 REMOVE / RELEASE；
- 视觉中心直接跟随 pointer；
- 多按只会变得更满，不会自动形成 composition；
- 唯一可靠的退出方式是全部 RESET。

## 课堂玩法

1. Start；
2. 连续点击或按 `Space` 10–15 秒；
3. 停手；
4. 问参与者：
   - 现在是什么段落？
   - 能不能只减掉一点？
   - 如果要等 8 bars 再释放，怎么做？
   - 鼠标是在“表达意图”，还是只是在拖动画面中心？
5. 再进入 `02-safe-loop`，比较系统如何承担时间、密度、安全与退出。

## Controls

- `Space` / click: add another layer
- pointer move: directly moves the visual center（故意的坏例子）
- `R`: reset everything

## Teaching conclusion

> 更多效果不等于更多控制。一个不能减少、等待、释放和返回的系统，很难支撑一场演出。
