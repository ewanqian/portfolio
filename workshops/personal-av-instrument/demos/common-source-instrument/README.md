# COMMON SOURCE / 同源场

`COMMON SOURCE / 同源场` 是「极简输入：构建视听系统 / Minimal Input · Audiovisual System」工作坊下的一套 **Golden Demo / 完整参考乐器**。

它和 `NIULAI TAP`、`NFI Keyboard Liveset` 的定位不同：前两者更强调 meme、主题素材包和传播性；这一版负责证明这套方法同样可以形成一个 **正常、完整、可持续演奏、适合公开讲解的 Audio Visual Instrument**。

## 核心命题

同一个输入事件，不先被定义成“声音”或“画面”，而先作为一份共享的数据进入系统：

`KEY / EVENT → STATE → SOUND + VISUAL`

声音与视觉读取同一组参数，例如键位、类别、顺序、持续时间、强度和当前状态，因此画面不是在“跟随音乐”，而是与声音从同一个事件中共同发生。

## 键盘结构

### Q–P · TONE

- 10 个音高单元
- 基于五声音阶 / 扩展音区，适合连续弹奏和组合
- 声音：oscillator + filter
- 视觉：ring / orbit
- pitch 同时决定声音频率与视觉尺度

### A–L · PULSE

- 9 个节奏 / 打击单元
- KICK / HAT / CLAP / SNARE / TOM / CLICK / NOISE / RIM / PULSE
- 声音：程序化 percussion
- 视觉：bar / impact
- transient 同时决定声音包络与视觉冲击

### Z–M · TEXTURE

- 7 个空间 / 纹理单元
- AIR / GRAIN / DRONE / HUM / WAVE / DUST / FIELD
- 声音：filtered noise / sustained texture
- 视觉：field / contour
- filter / density 同时作用于声音与图形密度

## 演奏控制

- `Q–P`：Tone
- `A–L`：Pulse
- `Z–M`：Texture
- `Shift`：ALT mapping，改变音区 / 高频状态，同时改变视觉线条性格
- `1 / 2 / 3`：MONO / SIGNAL / DUSK 三套统一视觉配色
- `Tab`：打开 Shared-source Mapping 面板
- `0` 或 `Esc`：Reset

支持多键同时按下。多个声音同时存在时，视觉会在正在演奏的事件之间建立关系线，因此“和弦 / 同时演奏”也会直接进入视觉结构。

## 为什么这一版适合演讲

推荐讲解顺序：

1. **先不解释，直接玩 20–30 秒。** 让观众先判断它是不是一件“乐器”。
2. 只弹 Q–P：说明声音和图形不是一对视频素材，而是同一份 pitch data 生成两种结果。
3. 加 A–L：引入 transient / rhythm 与视觉冲击。
4. 加 Z–M：让持续的 texture 建立背景，再在上面弹节奏和音高。
5. 按 `Tab` 打开 Mapping 面板：现场把 `INPUT → STATE → AUDIO / VISUAL` 关系直接展示出来。
6. 最后再切回 `NIULAI TAP` 或“大狗叫叮咚鸡”主题包，说明 **同一个 Instrument Engine 可以装进完全不同的个人素材与文化语境**。

这样趣味 Demo 不会显得只是整活，而会成为一个清楚的对照：

`Professional reference instrument → same method → personal / meme / artist material pack`

## 工作坊中的角色

这套 Demo 建议作为：

- `00_GOLDEN_DEMO`
- 开场演示
- “什么叫音画同源”的核心解释案例
- 学员 Starter 的上限参考
- 现场 Showcase 前的演奏示范

参与者不需要复制本作品的视觉样式，而是学习其结构：

`Input → Mapping → State → Sound / Visual → Feedback → Performance`

## 状态

- v0.1：单文件、无外部依赖
- Web Audio + Canvas
- 可作为 raw.githack 开发预览
- 后续可以再加入 MIDI / BPM clock，但不作为第一版成立的必要条件
