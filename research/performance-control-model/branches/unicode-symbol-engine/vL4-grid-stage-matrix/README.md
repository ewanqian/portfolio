# vL4 — Grid Stage Matrix

Status: DESIGN SPEC / READY FOR IMPLEMENTATION
Branch: `research/unicode-symbol-engine`
Parent: Performance Control Model

## 0. 核心纠偏

vL3 的问题不是 Unicode 本身，而是组织方式仍然过于散点化：符号、粒子和节点各自成立，但屏幕缺少一个足够强的秩序骨架，因此视觉容易显得乱，音乐动作也缺少清晰的“演出结构”。

vL4 改成一个明确的 **10 × 4 Grid Stage Matrix**：

- 10 列 = 10 个声音 / 图形 /舞台行为家族；
- 4 行 = 同一家族从稳定到极端的四级行为；
- 总计 40 个可演 Chunk；
- 网格只是空间组织，不是硬编码的按钮墙；
- 每个 Chunk 都仍然是一个完整的可演行为：ENTER / XY INSIDE / EXIT / RESIDUE / LOCAL SEQUENCER；
- 同一列共享语义，不同行形成可读的能量梯度；
- 跨列移动形成段落结构，纵向移动形成同一行为的深度变化。

可见表面依旧不显示中文或英文，只显示 Unicode / glyph / light / motion / score。

## 1. 参考方向

### Nothing

借用的是“光成为语言”的设计原则，不复制产品外观：

- 一个灯光图形必须传达一种明确状态；
- 声音、光、动作同步设计，而不是后期音频驱动；
- 少量高对比单元可以组合成大量可识别状态；
- 微型矩阵 / 玩具式交互提供立即可理解的反馈；
- 视觉动作短、准、可重复识别。

### Marathon / 失落星船：马拉松

借用的是其高风险科幻世界中的图形纪律：

- 黑暗 / 粗粝 / grounded sci-fi 为底；
- 高饱和信号色只在真正需要提示和危险时使用；
- UI / 图形层像一个正在工作的系统，而不是装饰叠层；
- 强扫描、压强、粒化、warning / hazard 感可以存在，但不能永久开启；
- glitch / grain 只能作为事件和过渡，不作为常驻滤镜。

### Stage Lighting

舞台灯光不是附加层，而是第七列 `⌁` 的一整个行为家族，并且会影响全屏：

- dimmer pulse;
- shutter;
- beam chase;
- moving head sweep;
- iris / zoom;
- frost / haze;
- blinder;
- strobe;
- blackout / negative space.

## 2. 10 × 4 网格

### 列 / 家族

| Column | Visible Symbol | Internal Family | Musical Role | Visual / Lighting Role |
|---|---|---|---|---|
| C1 | `◌` | FIELD | atmosphere / drone / air | haze / pressure / background field |
| C2 | `●` | LOW | sub / body / weight | low pulse / floor pressure / collapse |
| C3 | `▮` | PULSE | kick / groove / subdivision | shutter / blink / quantized blocks |
| C4 | `➜` | ROUTE | phrase motion / forward drive | rail / scan / directional flow |
| C5 | `↻` | ORBIT | loops / arps / cyclic motif | ring / loop / rotary path |
| C6 | `▦` | STRUCT | chord / partition / phrase blocks | cells / tiling / cut / architecture |
| C7 | `⌁` | LIGHT | accents / transient routing | dimmer / beam / chase / blinder |
| C8 | `✦` | PEAK | burst / impact / rise | flash / flare / strobe / overexposure |
| C9 | `⇄` | TRANSITION | gate / reverse / suction / crossfade | wipe / scan / collapse / direction flip |
| C10 | `∿` | RESIDUE | echo / shimmer / decay / silence | trail / afterimage / sparse memory |

### 行 / 强度

四行不代表四种不同乐器，而是同一行为的四级深度：

| Row | Visible Mark | Meaning | Typical State |
|---|---|---|---|
| R1 | `·` | restrained / stable | sparse, long, predictable |
| R2 | `◐` | active / groove | playable, moderate motion |
| R3 | `◉` | build / dense | articulated, layered, tense |
| R4 | `✺` | peak / generative | extreme but time-limited |

因此整个网格天然形成：

`LEFT → RIGHT = 从底层材料走向峰值 / 转场 / 余波`

`BOTTOM → TOP = 从稳定走向密度 / 不确定 / 峰值`

## 3. 40 个 Chunk

### C1 `◌` FIELD

- `◌·` Air Bed — 极轻空气底，长 release；
- `◌◐` Drift Field — 缓慢漂移和宽立体声；
- `◌◉` Grain Pressure — 颗粒压力与频谱推移；
- `◌✺` White Field — 全屏高压场，但自动限时释放。

### C2 `●` LOW

- `●·` Sub Bed — 低频地板；
- `●◐` Body Pulse — 低频脉冲和缓慢 sidechain；
- `●◉` Rumble Drive — rolling low / tom / sub rhythm；
- `●✺` Drop Core — 单次 commit / drop / floor collapse。

### C3 `▮` PULSE

- `▮·` Clock — 极简四拍或两拍脉冲；
- `▮◐` Offbeat — groove / ghost hit；
- `▮◉` Triplet / Ratchet — 三连音 / 细分 / rolling；
- `▮✺` Gate Storm — 高频门控和时间切片，自动 density guard。

### C4 `➜` ROUTE

- `➜·` Rail — 单方向轻推进；
- `➜◐` Scan — 左右扫描 / spectral travel；
- `➜◉` Chase — 多层追逐 / phrase chain；
- `➜✺` Hyperlane — 高速多重路径但保持同一 clock。

### C5 `↻` ORBIT

- `↻·` Slow Loop — 长周期回旋；
- `↻◐` Arp Ring — 有明显旋律 / 高频循环；
- `↻◉` Phase Loop — 多相位 polyrhythm / delay loop；
- `↻✺` Vortex — 多圈收束 / expand-collapse，但保持音高关系。

### C6 `▦` STRUCT

- `▦·` Chord Block — 稳定和声块；
- `▦◐` Partition — 2–4 段切分；
- `▦◉` Cell Matrix — 多单元 pattern，但共用 transport；
- `▦✺` Architecture Shift — 大尺度 block rearrange / chord tension。

### C7 `⌁` LIGHT

- `⌁·` Dimmer — 大面积低亮呼吸；
- `⌁◐` Shutter — 量化 shutter / bounce；
- `⌁◉` Beam Chase — 多 beam chase / pan sweep；
- `⌁✺` Blinder — blinder + strobe + iris close/open，强制短时使用。

### C8 `✦` PEAK

- `✦·` Accent — 单一短促亮点；
- `✦◐` Burst — 一组爆点 / fills；
- `✦◉` Impact — low impact + full screen contraction；
- `✦✺` Flare — peak overexposure + wide noise / metallic transient。

### C9 `⇄` TRANSITION

- `⇄·` Crossfade — 平滑移交；
- `⇄◐` Gate Wipe — 量化切走一部分 layer；
- `⇄◉` Reverse / Suction — 反向和吸入；
- `⇄✺` Hard Cut — 高风险 commit / blackout / immediate new state。

### C10 `∿` RESIDUE

- `∿·` Tail — 短尾 / afterimage；
- `∿◐` Echo — delay / reflected glyph trail；
- `∿◉` Shimmer Memory — 高频 memory / spectral residue；
- `∿✺` Negative Space — 主动减少事件，制造下一次动作的空间。

## 4. 视觉构图

### 4.1 常态不是 40 个方按钮

网格只提供对齐和空间语法，真实画面采用：

- node outline;
- micro-sequencer;
- light bar / glyph strip;
- symbol density field;
- connecting rails;
- active cell expansion;
- neighbour cell compression.

被进入的 Chunk 可以从一个网格单元“打开”为 2×2 或 3×3 占位，附近单元自动缩小但不消失，因此具有 Nothing Glyph Matrix 的矩阵秩序，又有舞台控制面的动态尺度。

### 4.2 光语言

视觉亮度分四层：

1. IDLE — 5–10%；
2. READY — 15–25%；
3. ACTIVE — 40–70%；
4. PEAK — 90–100%，短时。

灯光永远不是全屏都亮。峰值必须建立在足够暗的前后状态之上。

### 4.3 色彩

默认：

- carbon black;
- phosphor white;
- graphite gray.

功能性 accent 一次只允许一个主色：

- acid green = active / route;
- warning orange = build / hazard;
- electric magenta = peak / unstable;
- cold cyan = release / memory.

禁止同时彩虹化；色彩是状态编码，不是装饰。

### 4.4 Marathon 向的粗粝感

保留：

- scanline burst;
- grain burst;
- compression artifact;
- warning blocks;
- signal clipping;
- chromatic edge split;
- hard white / black cut.

但这些只能绑定到 `⇄`, `✦`, `⌁` 的特定状态；不能常驻。

## 5. 交互

## 5.1 主操作

`POINTER / HAND POSITION` 直接落在 Grid Stage Matrix 上。

进入某单元：激活该 Chunk。

在单元内部移动：

### X

- left → phrase shorter / simpler / narrower;
- right → phrase longer / wider / more articulated;
- 同时改变 sequencer length / phase span / visual width / beam spread。

### Y

- down → sparse / stable / predictable;
- up → dense / probabilistic / larger / brighter;
- 同时改变 probability / density / octave-or-spectrum / glyph scale / light intensity。

## 5.2 深度操作

- dwell → 加深但不自动峰值；
- fast cross → fill / hit / flash；
- circle → phase / orbit / loop；
- retrace → rewind / release；
- diagonal move → family-specific macro；
- exit → autonomous release + residue。

## 5.3 微型时序器

不再主要依赖“点格子”。

每个 cell 都显示一个 8 / 12 / 16-step miniature score：

- X 改 length / rotate / grouping；
- Y 改 density / probability / accent ratio；
- 长按 / secondary mode 才进入逐 step 编辑；
- pattern 的视觉变化必须能提前暗示听觉变化。

## 6. 音乐系统

目标：关掉屏幕也值得听。

### 6.1 Tempo / tonal world

建议初始验证：

- 144–148 BPM；
- tonal center: D / Dorian-ish / suspended pitch field；
- pitch set 优先：D F G A C + 少量 E / Bb 作为 tension；
- 低频保持干净，不让多个 cell 同时争夺 sub；
- metallic / air / hiss / synthetic percussion 作为身份。

### 6.2 六条音频总线

1. GROUND BUS — drone / atmosphere；
2. LOW BUS — sub / low pulse；
3. RHYTHM BUS — kick / perc / gate；
4. TONAL BUS — chord / arp / phrase；
5. TEXTURE BUS — noise / metal / air；
6. EVENT BUS — impact / rise / reverse / burst。

Master 之后：

- high-pass safety on non-low buses；
- bus sidechain / ducking；
- max active voices；
- limiter；
- density guard。

### 6.3 每个 Chunk 的音频不是 preset oscillator

正式版本要使用：

- curated original WAV / OGG phrase bank；
- one-shots；
- impacts；
- metallic hits；
- hiss / air；
- transient noise；
- short chord / arp phrases；
- resampled loops；
- controlled synthesis 只做 glue / modulation。

每个 family 至少准备 4 base phrase × 4 variations：

`10 families × 4 rows × 4 variations = 160 auditionable behaviours`

运行时不会全部同时播放，而是从兼容 bank 中挑选。

## 7. 冲突控制

40 个 Chunk 可用，不代表 40 个同时 active。

硬规则：

- LOW family active max 1；
- PEAK active max 1；
- LIGHT peak 与 PEAK peak 不同时长期开启；
- STRUCT max 2；
- PULSE max 2；
- total sustained active families max 5；
- transient events 可临时超过，但 1–2 bars 内自动衰减。

Soft rules：

- spectral ducking；
- shared density budget；
- shared brightness budget；
- shared strobe budget；
- release priority；
- neighbour compatibility score。

Principle:

`40 AVAILABLE CHUNKS → 3–5 COHERENT ACTIVE LAYERS`

## 8. 演出路径

不固定单一路径，但提供四种可读的宏观趋势：

### OPEN
`◌ → ● → ▮`

### DRIVE
`▮ → ➜ → ↻ → ▦`

### PEAK
`▦ → ⌁ → ✦`

### RELEASE
`✦ / ⌁ → ⇄ → ∿ → ◌`

演奏者可以跳过、回退、循环，但 Signal Guard 会限制连续 peak、重复无效动作和频段冲突。

## 9. WebGL / rendering

vL4 应从 vL3 的 glyph atlas 继续，但将粒子自由场改为 **grid-constrained instanced symbol field**。

建议：

- WebGL2;
- SDF / MSDF glyph atlas;
- instanced quads;
- grid coordinate + local deformation;
- per-cell render budget;
- global stage lighting pass;
- trail / residue framebuffer；
- event pass；
- optional post-process: grain / scan / chromatic split only on event。

每个实例至少：

`grid cell / local position / glyph / scale / alpha / phase / energy / life / family / row / velocity`

## 10. Acceptance

vL4 只有达到下面条件才值得继续扩大：

- GRID ORDER — 40 个可用单元仍然一眼有秩序；
- NO TEXT UI — 演出界面没有中文 / 英文；
- SYMBOL LEGIBILITY — 至少 80% cell 可以通过符号 + 动态区别；
- AUDIO-ONLY — 3 分钟自动路线可以单独听；
- VISUAL-ONLY — 静音观看 3 分钟仍有结构；
- XY PLAYABILITY — 不进深编辑也能完成 80% 演奏；
- STAGE LIGHTING — 至少 8 种真正不同的灯光行为；
- PEAK DISCIPLINE — 强闪 / glitch / grain 不常驻；
- PERFORMANCE FORM — 可完成 OPEN → DRIVE → PEAK → RELEASE；
- WEBXR READY — grid cell 可映射成未来 3D volume / plane / corridor。
