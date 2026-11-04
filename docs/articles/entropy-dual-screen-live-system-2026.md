# 逃离大气层：一次双屏实时影像的制作记录
## Atmospheric Escape — Building a Dual-Screen Live Visual System

2026.09 / ENTROPY / Ewan Qian

### 从一片屏幕到一个空间

这次演出最早面对的是一组不寻常的显示关系：一片超宽曲面主屏，以及位于上方的天屏。它们不应该像两台电视那样播放两个彼此独立的节目。我的办法是先建立一个共同的三维世界，再决定同一个场景如何分别进入前方和顶部的画幅。

《逃离大气层》由此成为整套视觉的工作概念。舞台是一处观察站，观众从恒星地图与航天器结构开始，逐步进入轨道、信号网络和更抽象的能量场。主屏负责横向的结构展开和空间纵深；顶部屏幕承担向上延伸、中心光源和方向感。两处画面的关系，比单张画面内部的复杂程度更重要。

### 航天器、线框与科学图像

早期使用 GPT 协助生成航天器和机械结构的初始模型与描述，再围绕真正需要上屏的部分做筛选和调整。我没有把“模型看起来复杂”当作完成标准。真正有用的是清晰的轮廓、可以识别的部件关系，以及适合放大到舞台尺寸的剖面、线框和运动。

视觉系统使用黑、白、灰作为主要语言，借用星图工作站、CAD 检查界面、航天器检修图和轨道计算图的阅读方式。注释和数字只在能说明结构时出现；线条需要交代物体的形状、方向和尺度，而不只是让画面显得更像“技术”。

制作过程中有一个反复发生的判断：哪些细节在电脑屏幕上很好看，却会在舞台上变得难以阅读？哪些结构只要留下几个清楚的线框，就足以让空间成立？这些判断决定了模型需要怎样简化、镜头怎样移动、画面什么时候保持安静。

### 先预演，再进现场

我在这一阶段使用了一个较早期的网页场景预演方式，后来它逐步发展为「场景铸造 / Scene Forge」的部分研究方向。预演的重点不是完整模拟舞台施工，而是尽早看到主屏与天屏、相机、构图和不同视觉段落之间的关系。

这次还开始直接试验 WebRTC：把网页中的实时画面发送到另一个浏览器查看，而不再每次都把一段内容导出成视频，才能确认它放到另一台设备或另一个视角时的样子。这改变了我的迭代速度。场景可以在原来生成的位置修改，预演窗口负责观察；两者之间不再必须经过一整轮离线渲染。

这个试验后来被保留在 SceneForge RTC 的独立实验里。浏览器串流解决的是预览和跨设备查看；真正的现场播控、输出、备用画面，仍然需要另外设计。这两件事不能混为一谈。

### 演奏的是状态，不是窗口

可演出的视觉不能依靠不停地切换文件。更稳定的办法是让每组画面先拥有完整的状态：进入、保持、变化、事件、退出。按钮触发的不是一张图，而是一段准备好的运动行为。

我在制作时把这条关系写成：

\`\`\`
INPUT
→ STATE
→ PHRASE
→ SPATIAL OUTPUT
\`\`\`

INPUT 是键盘、控制器或现场信号。STATE 决定当前正在观看怎样的世界。PHRASE 决定它在几个拍子之内如何变化。SPATIAL OUTPUT 再决定这段变化如何进入主屏、天屏和舞台空间。

有些内容是可以直接渲染成稳定素材的；有些则保留为网页中的实时图像。这样做并不是为了让所有东西都实时，而是为了让实时部分只承担真正需要现场决定的事情。

### 保留可以回到黑场的能力

现场系统的另一半是撤退。一个视觉可以慢慢进入，也必须可以迅速、干净地退出。舞台不可能永远处在“信息最多”的时候；需要黑场、低密度和足够长的安静段落，后面的光和结构才会重新有重量。

这次演出之后，我保留了航天器、星图、能量场等多条版本分支和不同状态下的截图。它们记录了视觉语言如何形成，但不能把仓库里存在的全部状态都写成现场当晚实际播放过的段落。最终使用的双屏路由、输出参数和现场记录仍应按当晚工程与录像核对。

这份制作记录保留的是我希望继续使用的方法：先确定空间关系，再做图像；先使状态可控，再增加复杂度；把舞台预演、实时生成、浏览器传输和现场播控放在同一条可修改的制作路径上。

### 项目与相关阅读

- [ENTROPY 现场资产档案](https://github.com/ewanqian/portfolio/tree/main/works/entropy-0905-performance)
- [Atmospheric Escape 原始 liveset / 版本与截图](https://github.com/ewanqian/atmospheric-escape-liveset)（制作档案，访问权限以仓库设置为准）
- [SceneForge — 浏览器舞台预演](https://github.com/ewanqian/SceneForge)
- [SceneForge RTC — 早期跨浏览器预览实验](https://github.com/ewanqian/portfolio/tree/main/lab/sceneforge-rtc)
- [REACTOR：BPM、闪烁与现场判断](https://ewanqian.site/writing/reactor-bpm-live-control-2026)

---

## English abstract

*Atmospheric Escape* began with a practical question: how can an ultra-wide curved LED wall and an overhead screen behave as two views into a shared spatial world? I developed spacecraft, orbital, astronomical and technical-inspection imagery, moving between prepared assets and realtime browser-based material. Early stage previs and WebRTC experiments helped shorten the distance between generating a scene and seeing it in context. The lasting method is to design for the spatial relationship first, then make each visual state enter, develop and exit as a playable phrase. This account describes the production approach; the final on-site routing and exact performed states remain separate items in the performance archive.
