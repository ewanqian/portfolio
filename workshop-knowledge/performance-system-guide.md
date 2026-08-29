# Final Guide — 从网页视觉到可演出的音画控制系统

这份文档用于把一个已经存在的网页视觉、几段独立 HTML、几张参考图，或一个刚刚完成的音画 Demo，整理成一套可以直接打开并用于现场演出的浏览器工程。

目标不是继续增加功能，而是把已有内容组织成一个稳定、清楚、可演奏的系统。

---

# 1. 最终要得到什么

打开一个网页以后，系统应当具备以下能力：

```text
INPUT
  ↓
INPUT FILTER / QUANTIZE
  ↓
SHARED CLOCK + PERFORMANCE STATE
  ↓
AUDIO ENGINE      VISUAL ENGINE
  ↓                    ↓
MUSIC PHRASE      VISUAL SCENE
  ↘                    ↙
       PERFORMANCE
```

最低要求：

- 一个统一 BPM / Transport；
- 3–10 个可区分的演出状态；
- Keyboard + Mouse XY 至少两种输入维度；
- 输入可以被 quantize / debounce / cooldown，不会因为乱按直接破坏音乐结构；
- Audio 与 Visual 读取同一个 State；
- `F` 进入 / 退出全屏；
- `Esc` 或独立 `PANIC` 立即停止危险状态；
- Master Volume；
- 1–3 个真正有意义的连续参数，例如 FX、Density、Line Width；
- 多次快速操作后仍然稳定；
- 演出模式中尽量不出现解释文字。

---

# 2. 建议先保留的系统骨架

如果系统已经可以运行，以下部分建议优先保留，不要每一轮都让 Agent 重写：

```text
/app
  index.html
  /audio
    engine.js
  /visuals
    scene-01.html
    scene-02.html
    scene-03.html
  /core
    transport.js
    state.js
    input.js
    router.js
  /assets
  /references
```

## 建议固定的核心对象

```js
state = {
  bpm,
  beat,
  bar,
  step,
  scene,
  energy,
  density,
  mouseX,
  mouseY,
  holdDuration,
  fxAmount,
  lineWidth,
  patternVariant
}
```

Audio 与 Visual 都从这里读取信息。

## 可以自由修改的内容

这些是创作层，适合不断更换：

- Scene 数量；
- 视觉语言；
- 音色；
- pattern；
- scale / key；
- Keyboard Mapping；
- Mouse XY 的意义；
- Scene 之间的 Transition；
- 图像、文字、几何体、点云、Glyph、波形、图表；
- 每个状态的强度与密度。

## 建议谨慎修改的内容

这些属于演出基础设施：

- AudioContext 启动逻辑；
- Transport / Scheduler；
- Quantize；
- Master Gain；
- Compressor / Limiter；
- Voice Limit；
- Fullscreen；
- Panic / Reset；
- Scene Dispose / Cleanup；
- Asset preload。

---

# 3. 如果你已经有很多独立 HTML 视觉

这是工作坊里最快的路线。

把已有视觉文件放进：

```text
/visuals/scene-01.html
/visuals/scene-02.html
/visuals/scene-03.html
...
```

## 快速方案：Stage Shell + iframe Scene

主页面负责：

- Web Audio；
- BPM / Transport；
- Keyboard / Mouse；
- Scene Router；
- Fullscreen；
- Panic；
- Master Volume。

独立视觉 HTML 只负责画面。

主页面通过 `postMessage` 把共享状态送给当前视觉：

```js
frame.contentWindow.postMessage({
  type: 'AV_STATE',
  state
}, '*')
```

视觉文件加入一个很小的 Adapter：

```js
window.addEventListener('message', (event) => {
  if (event.data?.type !== 'AV_STATE') return
  const state = event.data.state

  // 例：
  // state.energy
  // state.beat
  // state.mouseX
  // state.mouseY
  // state.lineWidth
})
```

这样可以先保留原来的视觉，再逐渐让它进入统一控制系统。

### 什么时候不再使用 iframe

当你需要：

- 更精确的 GPU / WebGL 资源管理；
- Scene 之间共享 Three.js Scene / Camera / Renderer；
- 大量状态每帧同步；
- 更可靠的资源释放；

再把视觉改造成模块：

```js
scene.mount(container)
scene.update(state, dt)
scene.trigger(event)
scene.dispose()
```

第一次整理演出工程时，不必先完成这一步。

---

# 4. 输入应该怎么设计

输入不等于“多放几个键”。

优先把输入控制在 2–3 个维度。

## 推荐组合

### Keyboard = 离散决定

```text
A / S / D / F     Scene / Phrase
J / K / L / ;     Secondary Phrase
1 / 2 / 3 / 4     Energy / Section
Space             Next / Route / Accent
```

### Mouse X / Y = 连续控制

例如：

```text
Mouse X → filter cutoff / visual width / orbit radius
Mouse Y → density / reverb / line thickness / depth
```

### Modifier + Mouse = 第二层控制

例如：

```text
A + Mouse XY
→ 只控制 Scene A 的特殊参数

Shift + Mouse XY
→ 精细控制
```

重点是：同一个输入在不同 State 中可以拥有不同意义。

---

# 5. 输入过滤：让“乱按”也可以进入音乐

现场系统不应该要求表演者每一下都准确踩中节拍。

可以加入：

- `Quantize`：正式事件落到下一 1/8 note / beat / bar；
- `Immediate Ack`：按下瞬间先给一个很轻的视觉确认；
- `Debounce`：过滤机械重复输入；
- `Cooldown`：同一个事件短时间内不能无限叠加；
- `Max Active`：限制同时存在的 Phrase；
- `Group Cap`：Low / Mid / High / FX 各有上限；
- `Priority`：人工输入优先于 Auto；
- `Manual Guard Window`：人操作以后，自动系统暂时退让。

推荐：

```text
human input
→ acknowledge now
→ pending intent
→ next musical boundary
→ launch audio + visual phrase
```

---

# 6. 演出结构：3–10 个状态怎样才不只是 Preset

每个 Scene 最好回答一个演出功能，而不是只回答一种颜色。

例如：

```text
01 OPEN
稀疏 / 建立空间 / 低密度

02 GRID
节奏明确 / 数字图表 / 时间刻度

03 WAVE
波形 / 连续运动 / 流体感

04 OBJECT
3D 几何体 / 旋转 / 空间推进

05 SCAN
快速扫描 / 高频 / 断裂

06 MATRIX
字符 / Glyph / 数据矩阵

07 IMPACT
强重音 / 闪现 / 结构击打

08 RELEASE
尾声 / 残影 / 延迟 / 回忆
```

可以继续增加到 10 个，但先确保：

- 每个状态的声音角色不同；
- 每个状态的视觉行为不同；
- 状态之间存在进入和退出；
- 至少有一个低能状态与一个高能状态；
- 不需要每一幕都满屏。

---

# 7. 音乐如何自己运行，又一直变化

持续变化不等于完全随机。

推荐：

```text
Shared BPM
→ 16-step / 8-step pattern
→ 3–4 pattern variants
→ 每 1–2 bars 允许小变化
→ 每 4–8 bars 才允许 Scene / Energy 变化
```

自动变化可以修改：

- note order；
- octave；
- density；
- velocity；
- filter；
- FX send；
- visual population；
- camera distance；
- line width；
- graph route。

每次只变化少量参数。

## 音乐角色建议

```text
LOW      kick / bass / impact
MID      chord / pluck / body
HIGH     hat / glass / metal / ticks
AMBIENT  drone / pad / residue
FX       rise / suction / noise / stutter
```

统一 scale / key，并加入 Compressor + Limiter。

---

# 8. Visualizer 不只做频谱

可以保留 analyser，但它只作为一个输入来源。

更推荐使用：

```text
beat
bar
step
energy
scene
noteIndex
patternVariant
mouseX / mouseY
releaseAmount
```

来驱动视觉。

## 适合现场快速做的视觉家族

### 01 Audio Waveform
- waveform；
- oscilloscope；
- spectrum bars；
- radial waveform。

### 02 Data / Infographic
- grid；
- chart；
- matrix；
- timeline；
- node graph；
- moving labels / index；
- signal route。

### 03 Geometry
- line field；
- concentric rings；
- polyhedron；
- wireframe cube；
- orbiting points；
- tunnel / corridor。

### 04 Flash / Scan
- single-frame flash；
- scanline；
- cut；
- inversion；
- wipe；
- partition。

### 05 Spatial Abstract
- 3D camera movement；
- abstract object；
- fog / depth；
- point cloud；
- particle volume。

建议每个 Scene 只选择 1–2 个主要视觉动作。

---

# 9. 使用自己的参考图

如果视觉语言不够明确，可以把参考图放进：

```text
/references/
```

然后告诉 Agent 具体借鉴什么。

不要只说：

```text
参考这张图做得更酷。
```

可以写：

```text
读取 references/01.png。
只分析并借鉴以下视觉属性：
- 黑底白线；
- 中央主结构占画面约 60%；
- 信息密度集中在左下与右上；
- 线宽非常细；
- 存在纵深透视；
- 动画应该像扫描，不像漂浮粒子。

不要直接复制图像内容。
把这些属性转换成当前 Scene 的 WebGL / Canvas 行为。
```

如果有多张图，可以为每幕分别指定参考。

---

# 10. 一幕视觉应该怎样描述

使用这 6 个字段即可：

```text
SCENE NAME
COMPOSITION
MOTION
DENSITY
MATERIAL
RESPONSE
```

例如：

```text
SCENE: MATRIX SCAN

COMPOSITION:
中央是一组 40×24 的数据网格，两侧留黑。

MOTION:
每个 beat 出现一次横向扫描；每 4 beats 有一次结构错位。

DENSITY:
OPEN 20%，PEAK 80%。

MATERIAL:
细白线、少量高亮 Glyph、无渐变背景。

RESPONSE:
Mouse X 控制扫描方向；Mouse Y 控制线宽；A 键触发一次局部坍缩。
```

---

# 11. 终极版：复制给 Agent 的完整 Prompt

```text
请把当前网页项目整理成一个可以直接用于现场演出的浏览器音画系统。

先完整读取当前项目，不要从零重写已经能运行的视觉文件。
优先复用现有 HTML / Canvas / WebGL 内容。

## 目标
打开 index.html 后，我可以使用键盘和鼠标完成一段连续的实时音画表演。
系统需要自己维持音乐结构，同时允许我的输入改变 Phrase、Scene、Energy 与连续参数。

## 技术结构
- Visual：保留现有 Canvas / WebGL / Three.js；
- Audio：Web Audio API 或 Tone.js；
- 建立唯一的 BPM / Transport / Scheduler；
- Audio 与 Visual 使用同一个 shared state；
- 不建立互相漂移的独立 timer；
- 第一次用户操作后再启动 AudioContext。

## Shared State
至少包含：
BPM / beat / bar / step / scene / energy / density / mouseX / mouseY / holdDuration / fxAmount / lineWidth / patternVariant。

## 输入
Keyboard 负责离散决定；Mouse XY 负责连续控制。

建议：
A/S/D/F、J/K/L/; = 主要 Scene / Phrase；
1/2/3/4 = OPEN / BUILD / PEAK / BREAK；
Space = NEXT / ROUTE / ACCENT；
Mouse X/Y = 当前 Scene 的两个连续参数；
按住某个 Scene Key + Mouse XY 时，可以进入该 Scene 的第二层控制。

不要要求表演者精确踩点。
加入 input filter：Quantize / Debounce / Cooldown / Max Active / Priority。
按键发生时立即有轻量 acknowledgement，正式音乐事件进入下一 1/8 note、beat 或 bar。
人工输入优先于自动系统。

## 音乐
建立一段可以持续运行的实验电子音乐结构。
速度可在约 128–150 BPM 调整。
使用统一 scale / key。
至少有 Low / Mid / High / Ambient / FX 五类声音角色。

系统可以自己持续变化，但使用 constrained variation：
- 每 1–2 bars 只改变 1–2 个参数；
- pattern 从有限 variants 中选择；
- note 只能来自限定 scale；
- 每 4–8 bars 才允许较大的 Scene / Energy 变化；
- 用户操作优先。

加入合理 gain staging、master volume、compressor、limiter、voice limit。

## Visual Performance
整理出 4–8 个主要视觉状态。
优先从以下视觉家族选择：
- waveform / oscilloscope；
- data grid / chart / infographic；
- node graph / route；
- wireframe geometry；
- 3D abstract object；
- scan / flash / partition；
- glyph / matrix；
- release / residue。

每个 Scene 至少定义：
COMPOSITION / MOTION / DENSITY / MATERIAL / RESPONSE。

不要只使用 frequency analyser 驱动画面。
beat、bar、step、energy、scene、patternVariant、mouseX/Y 都可以直接驱动画面。

## 已有 HTML 视觉
如果项目中存在多个独立 HTML visual：
先使用 Stage Shell + iframe / same-origin postMessage 的方式接入，避免立即重写。
主 Stage 负责 Audio、Clock、Input、Router、Fullscreen、Panic。
每个 Visual 只负责渲染并接收 AV_STATE。
如果后续需要更高性能，再改造成 mount / update / dispose 模块。

## 参考图
如果 references/ 文件夹存在图片：
读取参考图，只提取 composition、line language、density、depth、motion、material 等视觉属性。
不要直接复制图像内容。
把这些属性转译成当前 WebGL / Canvas Scene。

## 演出控制
必须提供：
- F：Fullscreen；
- Esc：Panic；
- Master Volume；
- FX Amount；
- 至少一个视觉连续参数，例如 Line Width / Density；
- 可选 Guide UI；
- Stage Mode 中隐藏大部分文字和调试信息。

## 稳定性
- 所有资源提前 preload；
- 不依赖演出过程中实时加载第三方网络资源；
- 限制同时音频 voices；
- Scene 切换时正确 dispose；
- 快速连续按键不会爆音或无限创建对象；
- 浏览器失焦后可以恢复；
- 页面 resize / fullscreen 后画面尺寸正确；
- 提供 Reset / Panic。

## 输出
先完成一个稳定 V1，不要继续堆功能。
完成后给我：
1. CONTROLS：所有演出控制；
2. SCENES：每幕的声音与视觉角色；
3. SAFE TO MODIFY：我可以继续自由改哪些文件 / 参数；
4. CORE — KEEP STABLE：哪些基础设施建议不要随意重写；
5. HOW TO ADD A VISUAL：如何加入一个新的 HTML / WebGL Scene；
6. HOW TO ADD A REFERENCE IMAGE：怎样使用参考图扩展视觉；
7. PERFORMANCE CHECK：演出前检查清单。

如果当前系统已经可以运行，优先局部改造，而不是重新生成整个项目。
```

---

# 12. 如果视觉不够丰富：追加 Prompt

```text
保持现有控制系统、Audio、Transport、Keyboard Mapping 完全不变。
只扩展 Visual Scene。

请先列出当前 Scene，并为它们建立视觉差异。
每一幕只增加一个主要视觉语言，不要同时增加大量效果。

我希望整个演出包含：
1. DATA / INFOGRAPHIC
2. WAVEFORM / SIGNAL
3. WIREFRAME GEOMETRY
4. 3D ABSTRACT OBJECT
5. GLYPH / MATRIX
6. SCAN / FLASH
7. RELEASE / RESIDUE

每幕说明：Composition / Motion / Density / Material / Response。
所有 Scene 仍然读取现有 shared state。
```

---

# 13. 如果音乐太单调：追加 Prompt

```text
保持视觉与演出控制不变，只重新整理音乐结构。

不要增加很多随机声音。
请建立：
- 统一 scale / key；
- Low / Mid / High / Ambient / FX 分工；
- 3–4 个 pattern variants；
- OPEN / BUILD / PEAK / BREAK 四个 energy state；
- 每 1–2 bars 的小变化；
- 每 4–8 bars 的结构变化；
- 用户输入优先；
- Quantize；
- Compressor / Limiter / Voice Limit。

重点改善：groove、层次、release、空间与动态，而不是继续增加声音数量。
```

---

# 14. 演出前不可忽略的条件

## Audio
- 第一次点击后 AudioContext 正常；
- Master 不削波；
- Limiter 工作；
- 连续快速操作 30 秒没有失控；
- Panic 后声音可以真正停下；
- 音量 Slider 有合理范围。

## Visual
- F 全屏正常；
- 退出全屏正常；
- resize 后正确；
- 1920×1080 能稳定运行；
- Guide 可以隐藏；
- 不依赖解释文字；
- 高频闪烁有可关闭或可降低的控制。

## Input
- 键盘焦点不会轻易丢失；
- key repeat 不会产生不可控重复；
- Mouse XY 有 clamp；
- Quantize 不让人产生“按了没反应”的感觉；
- Esc 永远保留给 Panic。

## System
- 所有相对路径正确；
- 资源在演出前已经加载；
- 不依赖临时 CDN / 登录状态；
- 断网后核心系统仍然能工作；
- 至少有一个低能状态，可以让舞台重新呼吸。

---

# 15. 什么时候网页已经接近极限

如果系统开始需要以下能力，可以考虑把控制模型迁移到 Processing、TouchDesigner、Max、openFrameworks、Unity / Unreal 或其他本地工具：

- 大量高负载 3D / Shader / 点云同时运行；
- 多屏输出；
- 更严格的音频延迟；
- MIDI / OSC / DMX / 灯光设备；
- 摄像头 / 深度摄像头 / 传感器；
- 多进程或多机同步；
- 长时间稳定运行；
- 更精细的资源生命周期控制。

这时不需要重新发明控制逻辑。

可以继续沿用：

```text
INPUT
→ FILTER
→ CLOCK
→ STATE
→ ROUTER
→ AUDIO + VISUAL
→ FEEDBACK
```

只把执行环境从 Browser 换成本地实时工具。

---

# 最终判断

一个适合现场的网页工程，不取决于它有多少效果。

更重要的是：

- 系统自己可以持续；
- 人的输入可以改变它；
- 输入不会轻易把音乐打散；
- 声音与画面共享同一套时间和状态；
- 你知道什么时候进入、什么时候退出；
- 任何时候都能恢复；
- 打开这个网页，就可以开始演出。
