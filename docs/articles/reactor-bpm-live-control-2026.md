# REACTOR：BPM、闪烁与现场判断
## A Live-Control Method for Resolume Arena

Ewan Qian / 2026 / Live Visual Notes

### 一套能跟随 DJ、但又不需要完全预测音乐的系统

我在 REACTOR 使用的视觉工程，核心并不是更大的素材库，而是把不同性质的动作分开：有些变化必须跟住节拍，有些需要我当下按下去，有些画面则应该保持很久。它们在 Arena 里叠在一起，却不该交给同一套触发逻辑。

如果只靠手动触发，我能打出很即时的重拍，却很难在整段音乐里保持稳定、有层次的规律闪烁。如果只靠 BPM 自动循环，画面又可能在音乐突然留白、切断或 Drop 之后继续闪。我的解决方式是让 **稳定的节拍结构持续运行，把真正需要判断的瞬间留给人**。

### 从底层开始搭建

我通常把工程理解成四个相互独立的部分。它们是制作方法，而不是所有 REACTOR 场次都必须采用的固定层号。

\`\`\`
EVENT / MANUAL TRIGGER   — 手动的强调、切断、偶发碎拍
RHYTHM / BPM LAYERS      — 有规律的闪烁与参数曲线
LIVE / VIDEO CONTENT     — 预制 clip、网页或 TD 等实时源
GROUND / LONG LOOP       — 可以长期存在的底层画面与黑场
\`\`\`

最下面是一段能够持久播放的画面，也可以是接近黑场的低密度素材。上一层放视觉内容：事先剪好的片段、生成动画或外部实时画面；TouchDesigner、Processing 和浏览器程序可以通过合适的视频输入链路进入 Arena。中间是节拍层：它不一定拥有自己的“主题画面”，而是在合成中改变亮度、节奏和画面密度。最上面是我随时可以按下、松开或清除的触发层。

四部分之间要留出余地。不是每一层同时打开才算完整。最重要的动作有时是把一层彻底关掉。

### BPM 并不等于自动完成演出

我会先从 DJ 的设备或软件确认速度与拍点。能够接入 Ableton Link 时，让 Arena 的全局 BPM 与其他 Link 应用保持节拍关系；不能接入时，就手动估计 BPM、重新对齐，再用耳朵和眼睛核对。

Link 提供的是 tempo、beat 和 phase 的同步，不会替我判断下一段是不是 Bridge、Break 或 Drop，也不会把 DJ 软件里的波形颜色自动转成演出指令。看到波形快进入空白，听见音乐正在抽掉低频，或者 DJ 正准备切入下一首，这些仍然需要人来判断。

我通常预先准备几种真正不同的 BPM 动画，而不是十几种仅仅换色的效果：

- **稀疏脉冲**：较低亮度、较长呼吸，保留空间。
- **稳定拍点**：清楚的循环，有连续性，但不制造高峰。
- **短促衰减**：快速亮起、较快衰减，给音乐增加边缘。
- **碎拍／错位感**：可以是分拍或错位包络，局部听起来更不规则，但底层仍有拍点参考。
- **峰值层**：只在确实需要时引入的强强调，不作为常态背景。

同样的一拍，可以是瞬间出现后消失，也可以是缓慢进入再退出。决定体感的往往不是素材本身，而是动画的 attack、hold、decay、release，以及参数的亮度范围。

在 Arena 中，Clip 的 BPM Sync、Beat Snap、参数动画和 Envelope 可以承担这些工作。它们不是同一个功能：前者关乎片段播放与节拍对齐，后者决定某个视觉参数在拍子内部怎样运动。

### Piano Trigger：把不规则的动作留给身体

另一个层是 **Piano Trigger**。我给某些 Clip 设置按住生效、松开即退出的触发方式，让按键或 MIDI 控制器像乐器一样工作。它特别适合捕捉 DJ 不规则的重音、碎拍、转场动作，以及那些不值得预先写进 BPM 循环里的瞬间。

我不要求手指打出全部节拍。相反，大多数规律变化交给已经同步好的层；手动触发负责细节、异常和判断。

脚踏的价值也在这里：它能让控制动作落到身体上，双手继续处理推子、切换和其他状态。目前使用过多踏板的控制思路，包括 Tap / 重新对齐、瞬时强调等；**四只踏板的最终键位图仍需要从实际 Arena/MIDI 工程核对**，不应把任意一套猜测写成现场既定配置。

### 读波形，但不依赖颜色做决定

我会尽量看 DJ 正在操作的轨道：波形哪里密、哪里空、下一次 Break 在哪里。RGB 波形通常能给出频率组成的线索；但不同 DJ 软件的配色方案并不相同。它只能帮助我预判，不能代替听觉。

例如一段音乐的重心明显进入低频，我可能保留比较深、比较少的光，把频闪压得更克制；高频与碎拍增多时，再引入更短、更硬的事件。到了乐句尾端、即将停下或突然留白，我会主动把层切掉，而不是等一条自动循环自己结束。

这是我的现场系统最重要的能力：**不是只会加，还要会减；不是只有触发，也要能清除。**

### 色彩与空间的推进

Club 的黑场通常比软件预览里更黑。初段我倾向于限制色相、压低亮度和对比，把视觉留在较窄的色域，例如深红或近单色。音乐逐步推高后，才扩展颜色与空间层次。

Arena 对我而言是一个足够快的组合台：改变层的混合关系、颜色、效果和媒体源，不需要先把所有可能发生的东西剪成一条最终时间线。预先制作 Clip 并不是放弃即兴，而是给即兴提供可靠边界。

实际演出仍要考虑频闪对观众的光敏风险、场地安全要求和长时间高亮造成的疲劳。高峰状态应当是经过控制的短段落，不是系统的默认运行方式。

### 一个可以交给新手的最小练习

1. 在 Arena 放一段可以稳定循环的低密度背景，准备一个可立即恢复的黑场。
2. 建立两种不同的 BPM 参数动画：一个慢、一个短促。不要只换颜色。
3. 准备一层 Piano Trigger，按住出现、松开消失。
4. 把三层放到同一段 DJ 音乐上练习，先不加入新素材。
5. 听一段铺垫、一段密集、一段留白：分别练习保持、叠加和清除。
6. 录屏回看：哪里闪得太早，哪里应该保留暗处，哪里虽然跟拍却没有跟住结构。

### 从 REACTOR 到 Live Show Copilot

这些经验正在进入「现场副驾 / Live Show Copilot」的工作坊准备。AI 或 MCP 可以在演出前帮助整理控制器映射、参数和素材、检查工程；真正表演时，还是由演出者判断什么时候增加、保持、松开或清除。

我不把它称作自动 VJ。它是一套**可以由人稳定演奏的现场系统**。

### 技术参考

- [Resolume — Trigger Style / Piano, Beat Snap, Clip Target](https://resolume.com/support/en/7/clips)
- [Resolume — Parameter Animation / BPM Sync / Envelope](https://resolume.com/support/en/7/parameter-animation)
- [Resolume — Ableton Link](https://resolume.com/support/en/link)
- [Ableton — Link Concepts](https://ableton.github.io/link/)
- [Resolume — Sources and Routing](https://resolume.com/support/en/sources)
- [现有 Live Show Copilot 工作坊源文档](https://github.com/ewanqian/portfolio/blob/main/workshops/audiovisual-engineer-simulator/module-01-one-button-show-control.md)
- [REACTOR 资产与 Arena 分层归档](https://github.com/ewanqian/atmospheric-escape-liveset/blob/main/arena/ARENA_BUILD.md)

---

## English abstract

REACTOR is a live visual control practice built around four concurrent responsibilities: continuous image, prepared clips and realtime sources, beat-synchronised visual behaviour, and short manual events. Rather than asking one performer to trigger every pulse, BPM automation handles repeatable structures while Piano-style triggers, faders and pedals remain available for irregular accents and immediate removal. Watching the DJ's waveform is useful, but musical direction is still judged by listening and responding to energy, interruption, silence and the shape of a phrase. This method also forms the working basis for *Live Show Copilot*, an upcoming practice-based workshop.
