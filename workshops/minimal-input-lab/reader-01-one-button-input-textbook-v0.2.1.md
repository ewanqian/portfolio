# MINIMAL INPUT LAB

## 01 一键输入

### ONE-BUTTON INPUT

从一个动作到可演奏音画系统的实践读本与 SOP 手册

主讲 / FACILITATORS：Ewan Qian / 钱誉文 · yiyisogreen  
Reader 0.2.1 · 2026-11-02  
Ewan Qian Workshop Series

---

# 出版说明

《一键输入》来自 2026 年 8 月 29 日由 Ewan Qian / 钱誉文与 yiyisogreen 共同主讲的一次工作坊，也来自两位分享者及相关项目更早的一批现场实践。它最初并不是为了证明“一个按钮能做很多事”，而是为了处理一个反复出现的问题：当实时视觉、声音和控制器的功能越来越多时，作品往往并没有因此更容易演奏。按钮变多、页面变复杂、参数表变长，操作者却仍然不知道什么时候该按、为什么要按，以及失控以后怎样把系统收回来。

这本 Reader 因此从一个极端的限制开始：先只保留一个主要输入。它可以是空格键、Pad、脚踏，也可以是鼠标的一次点击。我们暂时不讨论完整控制台，而是把这个动作拆开，观察它的按下、持续、松开、重复、间隔和停止怎样进入系统；再讨论系统如何把这些输入变成状态、节拍、声音、图像与下一次判断。

这不是某一种网页框架、MIDI 设备或软件的教程。浏览器只是很适合快速原型的一种运行环境，Web Audio、Web MIDI、Ableton Link、OSC、TouchDesigner、Resolume 或其他工具都可以在后续替换。真正需要长期保留的是一套可迁移的结构：Gesture / Input、Mapping、State、Clock、Memory、Sound、Visual、Feedback 和 Recovery。

本册同时参考数字乐器与 NIME（New Interfaces for Musical Expression）领域关于 Mapping、学习曲线、演奏性和数字乐器长期实践的研究。Hunt、Wanderley 与 Paradis 在 2002 年提出，电子乐器的核心不能只理解成“控制界面 + 声音发生器”，输入与系统参数之间的 Mapping 本身会改变乐器的性质。[1] Jordà 随后把 learning curve、apprenticeship 与 musical efficiency 纳入数字乐器设计的讨论。[2] 这些研究与本工作坊的经验相互印证：一件实时系统是否值得保留，不只取决于它能产生多少效果，而取决于人能否逐渐学会它、记住它，并通过练习获得更细的控制。

第一次阅读时，建议先连续读到第七章。第八章以后进入练习、排练记录、控制器迁移和现场可靠性。实践部分可以重复很多次，不要求一次做完；相反，每次只改一个关系，往往比不断增加功能更有效。

---

# 目录

导论　为什么从一个按钮开始

第一章　一个输入如何获得时间

第二章　Mapping：真正需要设计的不是按钮，而是关系

第三章　State、Memory 与 Feedback：让系统拥有上下文

第四章　Clock、BPM 与 Quantize：把人的意图放进共同时间

第五章　音画同源：不是声音驱动画面

第六章　从玩具到乐器：身体记忆、学习曲线与演奏性

第七章　案例：Found VJ Deck、Starter Ladder 与 NFI Performance Pattern

第八章　标准练习：从 Trigger 到 60 秒 Micro Performance

第九章　练习与排练：怎样把原型变成可以反复演奏的东西

第十章　控制器与外部输入：从键盘迁移到 MIDI、脚踏与传感器

第十一章　现场可靠性：Panic、Reset、Resync 与 Fallback

第十二章　AI 协作：让 Agent 负责实现，让创作者负责关系

第十三章　从一次工作坊到长期 Live Set

附录 A　Mapping Card

附录 B　Rehearsal Log / 排练记录

附录 C　Performance Preflight

附录 D　阅读地图与参考文献

---

# 导论　为什么从一个按钮开始

实时系统很容易被“更多”吸引。多一个按钮，就能多触发一个效果；多一个推子，就能多控制一个参数；再接一台 MIDI Controller，页面看起来马上更像专业设备。问题是，功能数量和演奏能力并不是一回事。

我在做现场视觉和交互原型时也经历过这种扩张。键盘上可以绑定很多东西，Arena 或网页里也可以不断增加 effect，但真正上台以后，手不会按照功能列表工作。人在高声压、黑暗和时间压力里更依赖身体记忆：左手知道哪里是主要 Trigger，右手知道哪里可以拉高强度，某个位置必须永远能黑场，系统乱掉以后必须有一个不用思考就能找到的 Reset。功能如果没有形成身体边界，现场越复杂，越容易把注意力从演出本身抽走。

2026 年 4 月的 Found Video VJ Battle Royale 第八轮里，我为了满足“只能使用网页公开视频”的规则，临时做了一套 Found VJ Deck，并把素材切换、节拍、黑场、闪烁、状态推进以及 CLEAR / PANIC / RESYNC 映射到 APC mini mk2。那次实践给我留下的最重要经验不是“控制器很好用”，而是独立控制器把浏览器本身混乱的快捷键、焦点和输入状态隔离开，形成了一个身体可以记住的边界。手放在哪里、什么动作属于表演、出错以后怎样回来，突然变得清楚。

“一键输入”把这个经验缩小到最基本的尺度。如果只留一个按钮，系统还能不能产生时间、结构与选择？如果答案是不能，那么加更多按钮通常只是把同一个问题复制二十六次。

一个按钮表面上只有 On / Off，但它实际包含很多时间信息：什么时候按下、按住多久、什么时候松开、连续输入的频率、两次输入之间的间隔、当前系统正处在什么状态。只要开始读取这些信息，一个开关就不再只是开关，而开始成为动作。

这也是本册最重要的限制原则：**极简输入不是极简行为。** 我们减少的是入口，不是表达。以下章节会从这个最小入口出发，逐步加入 Mapping、State、Clock、Memory、Feedback 和 Recovery，并最终让一套原型具有可以练习、可以被别人试玩、也可以进入真实现场的基本条件。

# 第一章　一个输入如何获得时间

## 1.1 从 Keydown 开始，为什么很快会无聊

很多第一次做实时交互的人，会从最直接的规则开始：按一下 A，播放一个声音，同时出现一个视觉。这是非常好的基线，因为动作与结果清楚；但连续玩二三十秒以后，它通常会迅速耗尽。你只能继续按，或者换另一个按钮。系统本身并没有形成时间。

Starter Ladder 把这种最简单的一对一关系故意保留为 Starter 00：Trigger Baseline。它不是失败版本，而是对照组。只有先完成“按一下、响一下、闪一下”，才能切身体会后面 State、Clock 与 Memory 为什么重要。

## 1.2 Press、Hold、Release、Idle

同一个按钮至少可以被拆成四种时间状态。Press 是动作开始的瞬间；Hold 是动作持续的时间；Release 不是“什么都没有”，而是从动作状态退出；Idle 则是长时间没有输入时系统怎样存在。

最常见的错误，是把所有逻辑都塞在 keydown 里。这样 Hold 没有意义，Release 也没有意义，操作者只能不断点击。更合理的做法是让每一个阶段承担不同功能。例如 Press 给一个清晰但短促的确认；Hold 逐渐提高密度或张力；Release 进入一段衰减；Idle 保留很轻的残响，让系统不会在没有输入时突然死掉。

这里的关键不在具体参数。Hold 可以控制 brightness，也可以控制 filter cutoff、粒子密度、音色厚度或空间尺度。真正重要的是：操作者能否通过“按住”这个动作预期系统会发生什么。只要动作和结果之间形成稳定关系，身体才可能逐渐记住它。

## 1.3 离散输入如何变成连续控制

按钮本身是离散信号，但围绕按钮的时间量可以被转换成连续值。Hold Duration 可以归一化为 0–1，连续按压的 repetition rate 可以变成 energy，两次输入的 interval 可以影响 decay 或密度。这使一个按钮具备类似推子的某些特性。

例如，重复频率可以控制系统能量：短时间连续点击越多，声音密度和视觉密度越高；停止输入以后，energy 缓慢衰减。这样，人的动作不会接触控制面，而系统读取的是动作的状态。

这种设计比“再加一个强度按钮”更值得练，因为它要求设计者思考动作本身的含义。一个好的输入不是把界面的功能搬到物理设备上，而是让动作的时间特征成为表达的一部分。

## 1.4 Residue：动作结束以后还留下什么

《无需进一步输入 / No Further Input Required》的 Interactive V0.7 给了我另一个重要参考：动作结束以后，视觉或者声音行为可以继续存在一段时间，甚至留下 residue，影响后面的系统。这样，人的手不需要持续按住着物体，输入也不必和输出一一同时发生。

这类结构更接近真实乐器经验。敲击一个鼓以后，声音不会在手离开的瞬间消失；弓离开琴弦以后，房间里仍然有余响。数字系统如果把每个 gesture 都做成“手停，系统立刻停”，往往会显得像遥控器，而不是乐器。

# 第二章　Mapping：真正需要设计的不是按钮，而是关系

## 2.1 Mapping 为什么是核心

电子与数字乐器和传统声学乐器有一个根本区别：控制界面与声音/图像发生系统可以完全分离。一把小提琴的琴弦既是物理结构，也是发声的一部分；MIDI Pad 与网页视觉之间却没有天然关系。按下这个 Pad 为什么应该改变音高，而不是改变亮度？向右移动鼠标为什么应该打开滤波，而不是增加视觉尺度？这些都需要人为设计。

Hunt、Wanderley 与 Paradis 把这一层称为 Mapping，并指出即使控制器和声音发生器完全不变，只改变 Mapping，乐器的整体性质都可能改变。[1] 对《一键输入》来说，这个判断比任何 API 都重要。一个按钮可以很无聊，也可以很有表现力，差别往往不在按钮本身，而在它被允许影响哪些关系。

## 2.2 一对一不是错误，但不能停在这里

最简单的 Mapping 是一对一：一个按钮触发一个声音。它非常适合教学和建立即时反馈。问题出在把它当成最终结构。只要继续用每一个键绑定一个独立效果，整个系统很快会变成“效果列表”。

更丰富的 Mapping 可以是一对多：同一个 gesture 同时改变声音和视觉中的多个参数；也可以是多对一：几个输入共同影响一个抽象状态，例如 energy；还可以经过 State：同一个按钮在 Quiet 与 Active 状态中产生不同结果。

这并不意味着越复杂越好。2021 年 NIME 关于现场 Mapping 设计的研究指出，Mapping 需要在演奏者的控制与系统自身的行为之间取得平衡，同时最好让演奏者和观众都能理解基本关系。[3] 如果 Mapping 复杂到只有代码作者知道发生了什么，它可能在技术上很聪明，却未必具有好的演奏性。

## 2.3 观众能不能“看见”关系

现场演出中的 Mapping 还有一个问题：观众并不需要理解全部算法，但应该能逐渐感到某些动作与结果有关。如果演奏者轻压一个键，系统完全不可见地改变一个内部变量，观众很难建立因果感；反过来，如果每次按键都机械地同步闪一下，关系又会很快被看穿。

一个比较合适的状态，是让动作与结果之间既有可读性，又保留系统的内部时间。例如按下以后先给一个很轻的即时反馈，真正的大事件则在下一拍或下一个小节发生。观众知道动作被系统接收了，但不会觉得演奏者只是在“点播放按钮”。

## 2.4 Mapping Card：先用文字决定，再写代码

实践中，我建议在写代码前先做一张 Mapping Card。不要先写“按钮 A 控制效果 1”，而要写动作、意图、系统解释与可观察结果。例如：

| Gesture | Intent | System interpretation | Sound | Visual |
|---|---|---|---|---|
| TAP | accent | one short event | hit / transient | brief flash / object event |
| HOLD | build tension | duration → energy | density / filter rises | fragmentation / trail rises |
| RELEASE | let go | enter decay | tail / reduction | residue / fade |
| IDLE | leave space | autonomous low state | ambience | sparse motion |

这张表的价值，是迫使创作者先说清楚“为什么”，再讨论“怎么实现”。当 Mapping Card 说不清时，直接让 Agent 写代码通常只会更快地产生一套没有理由的控制关系。

# 第三章　State、Memory 与 Feedback：让系统拥有上下文

## 3.1 Result = Input + State

同一个输入如果永远得到同一个结果，系统很难长出结构。Starter 01 因此把公式改成：Result = Input + State。最小版本只有 Quiet 与 Active；演示版本可以继续加入 Open、Build、Peak、Break。

同一个 A 键在 Quiet 状态可能只是一个稀疏脉冲；在 Active 状态里却变成更厚的声音层与更大的视觉行为。按钮没有增加，但它的语义随着上下文变化了。

State 的作用不是给页面多加几个模式，而是让演奏者能够推进和收回。很多实时视觉系统很容易只有“越来越多”：更多图层、更多粒子、更多亮度、更多声音。Quiet / Active 的最小对比首先要求系统学会减少。只有系统能主动降低能量，Peak 才会真正有意义。

## 3.2 Memory：系统应当记住什么

Memory 不一定是复杂数据库。它可以只是系统记住上一次状态、最近输入频率、当前 energy、已经激活的 layer，或者某个 residue 是否仍在存在。

加入 Memory 以后，输入不再只决定“现在发生什么”，还会影响“接下来系统怎样什么条件”。连续快速点击三次可以把 energy 推到更高层；长时间 Idle 可以让系统自动清理；一次 Release 可以逐步撤掉之前累积的声音与视觉。

这种简单记忆会明显改变演奏感，因为操作者开始需要考虑后果，而不是只考虑当前瞬间。

## 3.3 Feedback：确认、预告与结果

好的反馈不只是“按了以后亮一下”。输入发生时，系统可以分成三个反馈层：第一层是 immediate acknowledgement，告诉操作者“我收到了”；第二层是 pending state，让操作者知道事件正在等待一个音乐边界；第三层才是 main event。

如果完全没有即时反馈，量化后的事件可能让按钮显得迟钝；如果所有反馈都立即执行，又会丢失音乐时间结构。把确认和主要结果分开，是浏览器乐器非常实用的一种方法。

## 3.4 Feedback 也包括失败状态

系统反馈还应该告诉人在什么时候出问题。MIDI 没连接、浏览器失去焦点、AudioContext 还没启动、网络资源加载失败，不能只在开发者控制台里报错。演奏者需要在界面上看到足够明显的状态：READY、MIDI OFF、AUDIO LOCKED、PANIC ACTIVE、SYNC LOST。

真正能上台的系统，不只是正常情况下有反馈，也要在异常情况下让人知道自己在哪里。

# 第四章　Clock、BPM 与 Quantize：把人的意图放进共同时间

## 4.1 BPM 不只是一个数字

工作坊里很容易把 BPM 理解为一个“加上去就会有节拍”的参数。更准确地说，Clock 是声音与视觉共享的时间坐标。如果 Audio 和 Visual 各自使用独立 timer，即使一开始看起来同步，长时间运行后也可能逐渐漂移，或者在浏览器负载变化时产生不稳定。

Web Audio API 提供独立于普通系统时钟的高精度时间轴，AudioContext.currentTime 可以用于精确安排未来事件；MDN 的节拍器示例也建议使用 look-ahead scheduling，把即将发生的音乐事件提前排进队列，而不是依赖普通 setTimeout 在最后一刻触发。[4]

这并不意味着初学者要先学完整音频编程。需要理解的只有一条：声音和视觉最好共享同一个音乐时间概念，而不是各自假定自己是准的。

## 4.2 Immediate Feedback + Quantized Main Event

一个实用结构是：用户可以任何时候按下按钮，系统立即给轻微确认；真正的主声音和主视觉事件等待到下一 1/8 note、下一拍或下一小节执行。

例如用户在 bar 15.7 发出 PEAK 意图，系统把 pending state 设为 PEAK，到 bar 16.0 再切换。这样既保留了人的自由输入，也让整个演出保持音乐边界。

量化不是为了把人纠正成机器，而是让系统承担一部分时间整理。人的工作是表达意图，系统负责在合适的边界执行。

## 4.3 Quantize 过多也会失去手感

所有东西都等到下一小节才响应，会让乐器变得迟钝。因此要区分“即时触觉/视觉反馈”和“结构事件”。一个很短的 click、边框变化、微小闪烁或触发指示可以立即发生；大层级变化再量化。

这也是设计乐器手感的重要部分。延迟不只是一项性能指标，它还决定动作是否像自己的延伸。

## 4.4 Ableton Link：共享的是 tempo、beat 与 phase

当浏览器或其他运行时需要和 Ableton Live、手机应用或另一台电脑同步时，Ableton Link 提供了一个很有价值的模型：参与者共享 tempo、beat 和 phase，但每个应用仍然可以独立开始和停止，也可以自由加入或离开 session。[5]

它并不是传送所有 MIDI 消息的替代品，而是一种共享音乐时间的机制。

对于本课程而言，最重要的不是要求所有人马上接入 Link，而是理解“共享时间”和“共享控制数据”是两件不同的事。Clock 可以统一，但不同系统仍然保留自己的表达逻辑。

# 第五章　音画同源：不是声音驱动画面

## 5.1 Audio Reactive 只是其中一种关系

电子视觉最常见的结构是把音量、频谱或 onset 直接喂给画面。声音一大，粒子变多；低频一来，屏幕抖一下。这类 audio reactive visual 非常有效，但它不等于本课程所说的“音画同源”。

这里的工作定义是：Sound 与 Visual 尽量共同读取一个 gesture、参数、规则或 state 来源。它们不需要做相同动作，也不必须同步镜像，而是从同一层系统逻辑出发，各自解释。

例如 STATE = HIGH TENSION / PRE-RELEASE 时，声音可以去掉 kick、保留低频暗示并增加 subdivision；视觉则可以保留主结构、增加内部碎裂但减少新对象。声音和视觉都在表达“快到了，但现在不能释放”，却不是一对一复制。

## 5.2 共享来源，不等于完全同步

如果视觉每次都和鼓点同时闪，十秒以后关系会变得非常机械。更有意思的系统往往允许不同媒介拥有各自时间尺度。声音可能在一个 beat 内发生，视觉可以延迟两个 beat 才完成一次形态变化；声音 release 已经结束，画面仍保留 residue。

所谓“同源”因此更接近共同结构，而不是同时发生。

## 5.3 从声音开始、从视觉开始、从动作开始都可以

课程不规定一定先有音乐。参与者可以先从一段声音、一个视觉行为、一个动作甚至一种材料开始。AirSticks 的相关研究曾讨论通过 “表演动作”再形成 Mapping 的方法，用 mime 和表演情境打破选择瘫痪。[6] 这类思路很适合作为练习：如果你不知道一个按钮应该控制什么，可以先假装这件乐器已经存在，做出你希望身体产生的动作，再反推系统该怎样回应。

## 5.4 评价音画关系时关掉一边

一个简单但有效的检查方法是分别关闭声音和视觉。关闭声音后，视觉是否仍然有自己的段落与节奏？关闭视觉后，声音是否仍然像一段有完整结构的音乐？如果两边单独都完全瘫痪，所谓“同源”很可能只是互相遮掩。

这并不是要求两边都成为独立作品，而是检查它们是否各自承担了足够清楚的职责。

# 第六章　从玩具到乐器：身体记忆、学习曲线与演奏性

## 6.1 “好玩”是入口，不是终点

工作坊适合从玩开始。键盘、鼠标、Pad、Knob、Fader、计算器式界面、游戏机式操作都很熟悉，参与者不用先理解理论就能判断某个东西是否让人想继续触碰。

但是“第一次很好玩”与“值得练习”是两回事。很多 Demo 在前一分钟非常惊艳，五分钟以后就只剩下重复。数字乐器设计必须考虑更长的时间尺度：第一次接触是否能理解，十分钟以后有没有新的控制空间，一个星期以后练习者是否还能发现更细的技巧。

Jordà 把数字乐器的学习曲线与 apprenticeship 放进设计讨论，并询问这件乐器是否能够陪伴不同层次的演奏者。[2] 对本课程来说，这意味着作品不应追求“完全不需要学习”。如果所有行为表现在第一次点击时就被耗尽，它很难形成真正的演奏深度。

## 6.2 Blind Playtest：别人能不能不用解释就开始

Blind Playtest 是课程里很重要的一步。交换电脑，作者不能解释，让另一个人直接尝试。观察他从哪里开始，是否知道哪个动作最重要，什么时候会迷路，Reset 是否找得到。

这个测试不是为了把作品变成大众产品，而是帮助作者发现自己已经习惯的隐性规则。一个作者自己练了两小时的快捷键，对第一次使用的人可能完全不可见。

Mapping 研究也指出，演奏者与观众能否理解关系，是现场映射设计的重要评价维度之一。[3] Blind Playtest 把这个问题变成了非常低成本的课堂实验。

## 6.3 身体记忆需要稳定边界

Found VJ Deck 的经验再次说明：物理控制器的价值不是“更专业”，而是让身体有稳定位置。某个 Pad 永远属于黑场，某个区域负责推进 State，某个按键永远是 Panic。只要这些边界不断变化，练习就无法积累。

因此控制器迁移时不要同时改 Mapping。先在键盘上把关系搞明白，再把相同关系迁移到 Pad、Knob 或 Fader，观察变了以后是否更符合演奏。

## 6.4 乐器性不是固定属性

近年的 NIME 讨论越来越强调，instrumentality 并不是设备天生拥有的一项属性，它会在技术、表演者、观众、社群与使用情境中形成。[7] 这与工作坊的长期方向一致：一个网页第一次运行只是原型；当它被命名、练习、修改、交给别人、进入现场并积累版本后，它才逐渐成为一件真正属于某个人的乐器。

# 第七章　案例：Found VJ Deck、Starter Ladder 与 NFI Performance Pattern

## 7.1 Found VJ Deck：恢复逻辑也是乐器设计

Found Video VJ Battle Royale 的规则要求只能使用视频网站或流媒体平台已有的公开视频。浏览器天然有自己的快捷键、输入框焦点和播放逻辑，如果直接依赖电脑键盘，现场很容易出现“按键到底被谁接收”的混乱。

Found VJ Deck 把素材切换、节拍、黑场、闪烁、状态推进和 CLEAR / PANIC / RESYNC 映射到 APC mini mk2。实际使用后，我越来越确定：Reset 和 Panic 并不是工程结束以后补上的安全功能，它们本身属于演奏接口。因为只有知道自己随时能收回来，操作者才敢在现场做更激进的选择。

这也改变了课程设计。一个系统如果只有“增加”，没有“撤回”，它的高能状态很快会成为默认状态；真正的演奏需要进入，也需要退出。

## 7.2 Starter 00：故意做一个很快耗尽的玩具

Starter 00 只有一个按钮、一个声音和一个视觉 Hit。参与者会很快发现它很好懂，但连续玩二三十秒后没有结构可言。这个“不够好”是故意设计的，因为它让后面 State 与 Clock 的价值可以被身体直接比较，而不是靠讲解解释。

## 7.3 Starter 01：State Instrument

Starter 01 仍然只保留一个主要输入，但增加 Quiet / Active。Result 不再只等于 Input，而变成 Input + State。学员只改两个状态的差异，并解释为什么同一个动作在两个状态里应该不同。

这一步比继续增加按键重要，因为它第一次让系统拥有上下文。

## 7.4 Starter 02：Safe Loop / Quantized Layering

Starter 02 把一部分工作交给系统：BPM、音乐边界、最大 voices、最大 density、gain safety、decay 由系统维持；人只负责 ENTER、ADD、REMOVE、HOLD、RELEASE 等结构意图。

它的目标不是自动作曲，而是解决“必须狂按系统才不去死”的问题。演奏者停手两到四秒，作品仍然成立；连续 ADD 不会无限叠加；REMOVE 与 RELEASE 能真实降低能量。

## 7.5 NFI v0.7：动作启动行为，而不是持续拖动物体

《无需进一步输入》Interactive V0.7 的价值不在具体视觉风格，而在一种结构：系统拥有连续生成背景、统一 BPM / bar clock、多种 visual behaviour 和一定自治；人的操作更稀疏，gesture 可以启动一个持续运行的 audiovisual phrase，动作结束以后仍保留 residue。

这比“鼠标一直跟着物体走”更适合作为演出模型。人的角色不是持续做低级控制，而是在关键时刻改变系统结构。

# 第八章　标准练习：从 Trigger 到 60 秒 Micro Performance

这一组练习按顺序执行。第一次不要跳级，也不要同时加入第二个主要输入。每一天只增加一个新的控制概念。

## 8.1 Exercise 00：Trigger Baseline

只用一个键。按下时同时出现一个短声音与一个短视觉事件，另有 Reset。连续玩 30 秒并录屏。

这一次的目标不是做得好，而是建立对照。完成以后回答：什么时候开始无聊？为了让它继续成立，你最自然想增加的是什么？

## 8.2 Exercise 01：Tap / Hold / Release / Idle

把一个按钮拆成四个时间状态。Tap 保持短促；Hold 至少控制一个连续参数；Release 进入 1–3 秒 decay；Idle 保留很轻的 ambience 或视觉 residue。

完成后不要增加新效果，只测试：四种状态在不说明的情况下是否能被听出或者看出差别。

## 8.3 Exercise 02：One Clock / Quantize

加入唯一 BPM / Transport。输入发生以后立即给轻反馈，主要事件量化到下一 1/8 note 或下一拍。Audio 与 Visual 读取同一 beat / bar。

这一关最重要的检查是：连续乱按以后，系统是否仍然保持音乐时间；同时按钮有没有因为量化而变得迟钝。

## 8.4 Exercise 03：State Instrument

只增加 Quiet / Active 两个 State。不要增加第二个主控键。同一个 Tap、Hold、Release 在两个 State 中有不同结果。

完成后做一次 30 秒演奏：Quiet → Active → Quiet。第一次练习“下降”，而不是只练 build。

## 8.5 Exercise 04：Shared State A/V

选择一个状态，例如 HIGH TENSION / PRE-RELEASE，分别写出 Audio 和 Visual 如何解释这个状态。禁止使用“音量越大，画面越亮”作为唯一关系。

完成以后分别静音声音和视觉检查。

## 8.6 Exercise 05：60 秒 Micro Performance

最终只使用已经建立的输入与 State，完成 60 秒演奏。推荐结构：LOW → BUILD → PEAK → DROP / BREAK → RETURN。

DROP 不是“什么都没有”，而是主动把系统删到最低状态。可以只留下一个低频脉冲、一个极弱 residue 或完全黑场。真正的目标是让演奏者感受到：减少同样是一种控制。

录制 V1。回看后只选一个最大问题，做 V2。禁止因为不满意就重新整套系统。

# 第九章　练习与排练：怎样把原型变成可以反复演奏的东西

## 9.1 Build 结束以后，才真正开始学习

数字乐器的一个常见问题，是作品在“终于跑起来”的那一天就停止发展。代码完成被误认为作品完成。但如果目标是演奏，真正重要的阶段往往从这时才开始：手需要形成记忆，创作者需要发现哪些 Mapping 在压力下仍然清楚，哪些参数只在开发时看起来有趣。

NIME 关于 DMI longevity 与 performance pedagogy 的讨论指出，很多新型数字乐器缺少促使它们形成长期学习、练习和社群机制，因此很容易在展示之后失去生命。[8] 对工作坊最直接的启发是：必须给参与者一个可以重复练习的路径，而不是只看见作品如何被“做出来”。

## 9.2 15 分钟重复练习

推荐把练习压缩到十五分钟，而不是每次都做“大改版本”。

前三分钟只运行，不改；接下来的五分钟，只练一个动作，例如 Hold 的长度；再用三分钟演一次 30 秒演奏；最后四分钟看并写下一条修改。

第二天重复同样的地方。先重复同一练习，再判断原来的问题是否仍然存在。只有一个关系已经稳定，才增加下一层复杂度。

## 9.3 排练记录应该写什么

排练记录不需要像论文。每次保留六项已经足够：日期与版本、BPM / Clock、这次只练什么、哪一次失控、怎样恢复、下一版只改什么。

例如：

> V0.6 / 100 BPM。今天只练 Hold → Release。问题：Hold 超过 2.5 秒后视觉密度太高，Release 时声音已经下来了但画面还很满。Panic 正常。下一版只把 visual decay 从 3.5 秒降到 2.2 秒。

这种记录的价值在于把“感觉不对”变成下一次可以验证的变化。

## 9.4 Blind Playtest 与第二演奏者

当自己的操作已经稳定以后，可以把系统交给另一个人。不要先解释全部功能，只给他最少规则，例如“Space 是主输入，Esc 是 Panic”。观察他是否会自然使用 Hold，是否知道什么时候该停止，是否会把系统一直推到最大。

这里不是要把作品设计成所有人都一样会玩，而是用另一个身体发现自己的盲区。如果另一个人每次都在同一个地方失控，问题很可能不只是“他不会用”。

## 9.5 排练不是追求每次一模一样

实时系统的价值恰恰在于每次存在选择。排练的目标不是固定每一个操作，而是建立稳定边界：知道怎样进入、怎样 build、怎样 drop、怎样恢复，至于中间每一次 Trigger，可以保留现场判断。

# 第十章　控制器与外部输入：从键盘迁移到 MIDI、脚踏与传感器

## 10.1 键盘是最好的第一台控制器

QWERTY 键盘的价值是几乎每个人都有，也很容易发布网页让别人测试。第一版用 Space、方向键与 Esc 足够建立主输入、State、BPM 和 Panic。

只有 Mapping 已经有意义以后，迁移到 MIDI 才真正有价值。否则硬件只是把一套还没想清楚的逻辑变得更贵。

## 10.2 从角色而不是编号设计按键

控制器上的按钮最好拥有稳定角色，例如 Main Trigger、Scene、Accent、Clear、Panic，而不是 Effect 1、Effect 2、Effect 3。角色可以跨项目复用，身体记忆也能保留。

Found VJ Deck 的经验说明，独立物理控制器还能隔离浏览器焦点与系统快捷键，这在现场尤其重要。

## 10.3 Web MIDI 的便利与边界

Web MIDI API 可以让支持的浏览器直接访问 MIDI 输入输出，但它并不是所有主流浏览器都完整支持，而且要求 HTTPS secure context 和用户授权。[9] 因此网页乐器不应把 MIDI 当作唯一入口。

核心功能最好同时保留键盘 / 鼠标 fallback。MIDI 是增强层，不是参加门槛。

## 10.4 一个连续输入可以比很多按钮更有价值

下一阶段可以只增加一个 Knob、Fader 或鼠标轴。让它控制一个抽象参数，例如 energy，而不是直接控制十个独立效果。energy 再映射到声音密度、视觉密度、filter、trail 等多个层级。

这会让控制器更接近“演奏一个维度”，而不是“遥控很多功能”。

## 10.5 外部传感器仍然遵守同一套结构

手机陀螺仪、摄像头亮度、frame difference、脚踏、距离传感器都可以进入系统，但它们仍然只是 Input。新的传感器不会自动带来新的艺术关系。

每增加一种输入，都先问：它的身体意义是什么？它是 Trigger、Continuous Control，还是 State Change？如果回答不清楚，先不要接。

# 第十一章　现场可靠性：Panic、Reset、Resync 与 Fallback

## 11.1 可靠性不是技术人员最后收尾的工作

实时演出里，系统一定会遇到意外：浏览器失去焦点、音频没有解锁、MIDI 断开、网络卡顿、视频源不可用、CPU 升高。设计时如果只考虑“正常运行”，演奏者会在最需要判断的时候被迫处理技术支持。

因此 Panic、Reset、Resync 应该从第一版就存在。它们不是附属功能，而是乐器的演奏安全边界。

## 11.2 Panic 与 Reset 不同

Panic 的目标是立刻让系统回到安全状态，例如停止持续声音、压低 master gain、关闭高密度视觉、解除 stuck note。Reset 则负责回到一套已知初始状态。Resync 用于重新对齐 Clock、Transport 或外部同步。

三个动作不要混成一个“刷新网页”。现场恢复需要尽可能快，最好能由一个固定键或控制器位置完成。

## 11.3 Gain Safety 与 Density Safety

音画系统都需要上限。声音需要防止 voices 无限叠加和 master gain 过载；视觉需要防止粒子、对象和 post effect 无限积增加造成性能崩溃。

Starter 02 的 Safe Loop 之所以把 max voices、max density 和 decay 放在系统侧，就是为了让演奏者能自由操作而不会每次计算风险。

## 11.4 本地 fallback

正式现场不要把关键素材完全依赖外网。公开视频、远程接口和 CDN 都可能变化。至少准备本地素材、预渲染短片或一个简化模式。网页版本也应测试离线或局域网条件。

系统的目标不是“永远不出错”，而是错误发生以后仍然有可以继续演出的路径。

# 第十二章　AI 协作：让 Agent 负责实现，让创作者负责关系

## 12.1 AI 最适合把清楚的问题实现得更快

工作坊里，Agent 最有效的用法不是“一句话生成一件乐器”，而是处理小而明确的任务：接一个键盘输入、把 Hold Duration 转成 0–1、让声音和视觉读取同一个 State、加入 BPM、接 Web MIDI、修复浏览器焦点、添加 Panic。

如果问题本身没有被想清楚，Agent 只会更快地产生更多候选。真正稀缺的仍然是人对 Mapping 和演奏关系的判断。

## 12.2 把任务写成 Issue，而不是许愿

当前 coding-agent 的工程实践越来越强调明确目标、仓库上下文与验收条件。OpenAI 的 Codex 工程经验也建议把任务写得像 GitHub Issue：指出文件、组件、现状、约束与完成标准，而不是只描述一个模糊愿望。[10]

对本课程，一个好的 Agent 任务可以写成：

> 先读取当前项目，不重写框架。保留 Space 为唯一主输入。加入 TAP / HOLD / RELEASE / IDLE 四种状态；Sound 与 Visual 读取同一 state；Hold Duration 归一化为 0–1；Esc 为 Panic。完成后提供测试步骤，并不要增加第二个主要输入。

这类任务的优势不是“提示词更长”，而是验收条件明确。

## 12.3 仓库是长期记忆，不要把所有历史塞进对话

Agent 参与长期项目时，可靠上下文应该进入仓库：README 说明作品是什么，CONTROL.md 说明如何操作，CHANGELOG 记录版本，known-issues 记录当前缺陷。OpenAI 2026 年关于 harness engineering 的总结也强调，把 repository knowledge 作为 system of record，并用短入口文件指向更深的文档，而不是维护一个越来越巨大的说明文本。[11]

对个人创作者来说，这种方式同样有效。下一次换模型、换电脑或换 Agent，工程仍然可以自己解释自己。

## 12.4 每次让 Agent 改完，都要演奏一次

代码测试通过不代表乐器好用。Agent 可以检查变量、运行测试、确保页面能打开，但 Hold 的手感、Drop 是否有力量、按钮是否像自己的身体延伸，仍然只能通过实际演奏判断。

因此每轮 AI 修改以后，至少完成一次 20–30 秒实际操作。录屏、记一条问题，再决定下一次修改。不要连续让 Agent 改十轮才第一次打开页面。

# 第十三章　从一次工作坊到长期 Live Set

## 13.1 每天保存一个值得复用的小状态

一次工作坊没有必要做完整 Live Set。更可靠的路线是每天完成一个小状态：一个好用的 Hold、一个成立的 Quiet State、一个能够安全进入的 Peak、一个真正有力量的 Drop。只要这些单元能独立播放都成立，它们就可以逐渐组合。

每个单元至少满足：进入方式明确、持续时不难受、退出方式明确、音量和密度不过载、能在下一次工程里被重新调用。

## 13.2 Build → Incubate → Rehearse → Perform

长期版工作坊更适合分成四个阶段。Build 完成第一版；Incubate 给参与者几天时间真正使用；Rehearse 通过 Blind Playtest 与短排练发现问题；Perform 再进入小型公开演出或 After Party。

这比在三小时结束前强迫每个人做“最终作品”更真实。数字乐器的价值往往只有在练习之后才出现。

## 13.3 从 Personal Instrument 到 Archive

如果每一件作品都保存名字、版本、Playable URL、控制图、短演出和练习记录，长期就可以形成 Personal A/V Instrument Archive。它记录的不只是结果，也记录一件乐器怎样随着演奏者的练习发生变化。

这样的档案比一组工作坊合影更有价值，因为它让课程留下可继续使用的生产内容。

# 附录 A　Mapping Card

每次开始新练习，先填一张卡，不要超过一页。

| 字段 | 内容 |
|---|---|
| Instrument / Version | 作品名与版本 |
| Main Input | 这次唯一主要输入 |
| Gesture | TAP / HOLD / RELEASE / continuous 等 |
| Intent | 这个动作在表演里想表达什么 |
| State | Quiet / Active / Build / Peak / Break 等 |
| Sound | 声音如何解释它 |
| Visual | 视觉如何解释它 |
| Clock | immediate / 1/8 / beat / bar |
| Feedback | 操作者怎样知道系统收到输入 |
| Recovery | Panic / Reset / Release |
| One Question | 这次只研究哪一个关系 |

# 附录 B　Rehearsal Log / 排练记录

每次排练只要求记录一页。不要把排练变成新的写作任务。

- Date / Version
- Runtime / Browser / Controller
- BPM / Sync
- Today I only practice
- Best moment
- Where I lost control
- How I recovered
- One mapping that felt natural
- One mapping that felt confusing
- Next version changes only

# 附录 C　Performance Preflight

演出前至少确认：

- 页面在目标浏览器正常打开；
- AudioContext 已解锁，输出设备正确；
- 主输入、Panic、Reset 可用；
- MIDI 如果使用，设备名与权限正确；
- 断开 MIDI 后键盘 fallback 仍能操作；
- BPM / Clock 正确；
- 如果使用 Link，确认 tempo / phase 同步；
- 声音最大增益经过实际扩声测试；
- 视觉最大 density 不会导致掉帧；
- 外部资源有本地 fallback；
- 全屏、焦点、休眠、电源设置已确认；
- 完成一次从冷启动到 60 秒演奏再 Panic 的完整测试。

# 附录 D　阅读地图与参考文献

## 必要阅读

1. Hunt, Andy D.; Wanderley, Marcelo M.; Paradis, Matthew. “The Importance of Parameter Mapping in Electronic Instrument Design.” NIME 2002. 核心阅读：Mapping 不只是技术连接，而可能定义乐器性格。
2. Jordà, Sergi. “Digital Instruments and Players: Part I - Efficiency and Apprenticeship.” NIME 2004. 核心阅读：学习曲线、熟练度与数字乐器设计。
3. West, Travis; Caramiaux, Baptiste; Hout, Stéphane; Wanderley, Marcelo M. “Making Mappings: Design Criteria for Live Performance.” NIME 2021. 核心阅读：控制权、可理解性与现场 Mapping 评价。
4. MDN Web Audio API - Advanced Techniques: Creating and Sequencing Audio. 用于理解 look-ahead scheduling 与 AudioContext.currentTime。
5. Ableton Link Documentation. 用于理解 tempo、beat、phase 与独立 transport 的关系。

## 补充阅读

6. Ilsar, Alon A.; Hughes, Matthew; Johnston, Andrew. “NIME or Mime: A Sound-First Approach to Developing an Audio-Visual Gestural Instrument.” NIME 2020.
7. Bin, S. M. Astrid. “Looking NIME in the ‘I’: Tracing the social life of digital musical instruments.” NIME 2026.
8. Marquez-Borbon, Adnan; Martinez-Avila, Juan Pablo. “The Problem of DMI Adoption and Longevity: Envisioning a NIME Performance Pedagogy.” NIME 2018.
9. MDN Web MIDI API. 注意浏览器支持、HTTPS 与授权要求。
10. OpenAI. “How OpenAI Uses Codex to Accelerate Engineering.” 2026.
11. OpenAI. “Harness engineering: leveraging Codex in an agent-first world.” 2026.

## 项目内部资料

- `workshops/personal-av-instrument/2026-08-29-workshop-conclusions.md`
- `workshops/personal-av-instrument/2026-08-29-participant-followup.md`
- `workshops/personal-av-instrument/starter-control-model.md`
- `workshops/personal-av-instrument/cases/202604-found-vj-battle-round8.md`
- `workshops/personal-av-instrument/research/nfi-v07-performance-pattern.md`

## 版本记录

**Reader 0.2.1 · 2026-11-02**  
将 yiyisogreen 补充为 8/29 工作坊共同主讲者；正文内容仍为待共同审核的内部初稿。

**Reader 0.2 · 2026-11-02**  
按《场景铸造》正式 Reader 的文本密度重新编写：把 0.1 的课程骨架扩展为连续正文；以 8/29 工作坊结论、Starter Ladder、Found VJ Deck 与 NFI v0.7 为主要实践材料；增加 Mapping、Clock、学习曲线与演奏性研究；新增标准练习、排练记录、控制器迁移、现场可靠性、AI 协作与长期 Live Set 章节。

**Reader 0.1 · 2026-11-02**  
建立 One-Button Input 的课程骨架、Standard Exercise、Checkpoint 与提交格式。
