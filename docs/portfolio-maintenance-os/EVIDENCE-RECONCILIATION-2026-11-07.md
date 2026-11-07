# 2026.11 全站作品证据、媒体与历史版本审计

**更新：2026-11-07（证书图像核验及第二轮来源补充后）｜范围：50 个母项目｜状态：第一轮来源交叉核对，不代表49个项目已全部取得独立证明。**

## 审计目标

新网站采用**信息身份永久、页面表达可变**的原则。本表将已发表事实、团队制作、本人角色、历史展出版本、展览录像、MANA 视频及来源文件分别管理。它不能替代原始工作工程，也不得自动把团队项目转化为个人独立作品。

- 对象关系依据：[母项目表](../../content/project-registry-2026-11.json)、[40 个历史对象](../../database/works.json)、[ID 迁移映射](../../database/identity-crosswalk-2026-11.json)。
- 早期独立事实记录：[Ewan Encyclopedia](../../public/data/ewan-encyclopedia.json)、[claims-ledger](../encyclopedia/claims-ledger.md)、[media-index](../../public/data/ewan-media-index.json)。
- 逐个项目的准确链接和证据范围：[完整机器可读账本](../../database/evidence-reconciliation-2026-11.json)。

## 覆盖状况

| 情况 | 计数 | 应如何理解 |
|---|---:|---|
| A 外部来源直接点名艺术家/作品 | 8 | 不等于艺术家承担了所有制作职责 |
| B 独立来源能证明活动存在，但未点名个人职责 | 6 | 需要原制作文件 / 署名 |
| C 只有个人所在团队的公开案例或成员记录 | 3 | 必须明确团队项目属性 |
| D 本轮尚无足够匹配的独立外部证据 | 33 | 可以存档，不能冒充已核实 |
| 有独立项目页 / 公共网址的记录 | 15 | 尚需真实 HTTP 和移动端验收 |
| 已登记封面媒体路径 | 28 | 不代表图片存在或有使用授权 |
| 没有登记封面媒体路径 | 22 | 不用其他项目图片冒充 |

## 最优先抢救与更正的项目

### VAOE / 2023 南昌路

- 改为 **四组影像作品 + 扫码进入 AR 的增强现实项目**，不再笼统称为“纯虚拟空间个展”。
- 独立《青年报》报道证明展览、作者与地址。四组影像和 QR-AR 结构由艺术家确认，原始文件待恢复。
- 当前网页：[`works/vaoe.html`](../../works/vaoe.html)；历史源：[`projects/vaoe-exhibition-2023.md`](../../projects/vaoe-exhibition-2023.md)。

### KASHIWA / TITAN / 深圳及舟山

- 抢救历史 Markdown 里的 **10 段深圳曲目结构、完整 credits、舞台实施与备份路径**。
- 重新链接 4 个深圳 MANA 曲目：Lead、Whitenight、Amb、Titan，以及另场舟山 CAN 的 Phantom、Ice；视频仍要验收实际播放。
- 柏大辅官方页面提供 2025.10.21 BO LIVE 深圳三人阵容外部佐证。
- 旧源：[`Shenzhen BO LIVE README`](../../visual-arts/kashiwa-daisuke/Shenzhen-BO-LIVE-2025-TITAN/README.md)，新页：[`works/titan.html`](../../works/titan.html)。
- **曲目编号为现场视觉档案顺序，不能与《TITAN》正式专辑曲目表混为一谈。**

### @onefive / 分号 C

- 2023 年 Underground / Overground 演出地点与日期以 @onefive 官方日程为准。
- 2024 年 ChocoLove 官方发行/歌词视频与 Semicolon C 官方 2024 巡演集体制作经历分开标记。
- 官方只确认团体或活动，没有明确个人每个段落的独立职责任务单；个人参与采用分号 C 时期署名，不写为“和分号 C 合作”。
- 新页：[`works/onefive-semicolonc.html`](../../works/onefive-semicolonc.html)。

### 二砂包豪斯 / SYSTEM

- VIRTURA 旧网页是 **Spatial Capture 点云与空间扫描案例**；个人 CV 的《时间是空间恒久的观察者》则是**关联实验影像工作**。两个表述相关，但不能互相替代。
- 新个人制作页：[`works/system-ersha.html`](../../works/system-ersha.html)；团队空间采集网页作为相关资料。
- 仍缺片尾字幕、确切片名版本、影片正式发行地址与个人署名的独立材料。

### ChinaGraph 2024 / TIMER（单独证据线）

- VIRTURA-SpacePort 已有一条历史文档，明确登记“电子剧场优秀音乐作品二等奖”，获奖者“徐昊、钱誉文”，并链接原始证书照片。与 2023 杭州作曲比赛徐昊《Timer》个人奖 **不是同一条**。
- 2026.11 原 CV Release 1.0 初版曾暂用中性表述，以等待证书图片核验。已打开并目视复核源仓库的原始证书图像，确认《Timer》为电子剧场优秀音乐作品（二等），证书作者徐昊、钱誉文。已恢复到 CV 网页与奖项永久记录；已发布的 PDF 若仍用旧措辞，须在下次 CV 发行版中同步。

## 新增身份核对：2026《数字苔原》的两件作品

- **《观察与共生》**：2025 年创作。2026 年 1 月上海《共生协议：算法公地》公开资料列出沈轩、钱誉文；同年在河南省文化馆《数字苔原》再次展出，确有独立作品身份。
- **《形态的对话》**：也是两人 2025 年共同创作的影像作品，2026 年在河南展出，**不能当作《观察与共生》的另一名称或版本**。因此恢复为第 50 个母项目。
- **《数字苔原》**：这是 2026 年展览呈现记录，关联上述两个母项目，不是第三件独立艺术作品。
- 来源：[TOPYS 展览资料](https://www.topys.cn/activity/728)、[河南省文化馆线上作品导览](https://www.sohu.com/a/1041385483_121106991)。原照片与录像的摄影/使用权限仍需确认；旧 2023 K11 同名条目的版次关系尚未核实。

## 50 个项目逐条工作台

| # | 项目 ID | 项目 | 证据级别 | 已索引来源数 | 详情链接 | 封面路径 | 下一次核对重点 |
|---:|---|---|:---:|---:|:---:|:---:|---|
| 1 | `no-further-input-required` | 无需进一步输入 | A | 1 | 有 | 缺 | link approved official gallery images from curatorial source, preserve a |
| 2 | `drop-flow` | 滴流 | B | 1 | 有 | 已登记 | audit exact media, external attribution and official venue records |
| 3 | `timer` | 控时者 | D | 1 | 有 | 已登记 | Link original certificate to public TIMER and award pages; keep separate |
| 4 | `system-ersha-2026` | 二砂包豪斯：时间是空间恒久的观察者 | C | 1 | 有 | 已登记 | find complete credits or official film release for '时间是空间恒久的观察者'; do not |
| 5 | `natgeo-crystal-2026` | 中国国家地理·矿晶空间影像 | C | 1 | 有 | 已登记 | audit exact media, external attribution and official venue records |
| 6 | `china-ai-gala-2026` | 中国·AI 盛典开场秀 | B | 1 | 有 | 已登记 | audit exact media, external attribution and official venue records |
| 7 | `kashiwa-titan-2025` | 机械光合：TITAN 的全息声林 | A | 3 | 有 | 已登记 | verify playback of MANA IDs 2831761 / 2831703 / 2831826 / 2831892 and CA |
| 8 | `ar-shenzhen-2022` | AR 深圳计划 | B | 1 | 有 | 已登记 | audit exact media, external attribution and official venue records |
| 9 | `ether-fragment-2023` | 以太碎片 | A | 2 | 缺 | 已登记 | locate reliable artwork/event source, then approve individual credit and |
| 10 | `vaoe-2023` | 虚拟航线 | A | 1 | 有 | 缺 | ingest four original exhibition videos, AR QR target/capture, onsite pho |
| 11 | `digital-tundra-2026` | 数字苔原：观察与共生、形态的对话 | A | 2 | 有 | 缺 | reconcile 2026 exhibition photos, separate two artwork titles and film s |
| 12 | `obs-symbiosis-2025` | 观察与共生 | A | 3 | 有 | 已登记 | assign precise licensed photos and original render to 2025/2026 versions |
| 13 | `dialogue-of-forms-2025` | 形态的对话 | A | 1 | 有 | 缺 | recover original greenhouses/plant scan video, exhibition stills, credit |
| 14 | `new-media-artist-simulator-2025` | 新媒体艺术家模拟器 | A | 3 | 缺 | 已登记 | link artwork title to dated museum label/exhibition photo; avoid treatin |
| 15 | `illusion-matrix-2024` | 幻觉矩阵 | D | 0 | 缺 | 缺 | locate reliable artwork/event source, then approve individual credit and |
| 16 | `illusion-resonance-2024` | 幻觉共振 | D | 0 | 缺 | 已登记 | locate reliable artwork/event source, then approve individual credit and |
| 17 | `derive-2024` | Dérive / 双城记 | D | 0 | 缺 | 已登记 | locate reliable artwork/event source, then approve individual credit and |
| 18 | `entropy-2026` | ENTROPY — ATMOSPHERIC ESCAPE | D | 0 | 缺 | 缺 | locate reliable artwork/event source, then approve individual credit and |
| 19 | `waves-cross-2026` | WAVES CROSS VOL.3 | D | 0 | 缺 | 缺 | locate reliable artwork/event source, then approve individual credit and |
| 20 | `urkl-2026` | URKL 机器人格斗赛 VJ | B | 2 | 缺 | 缺 | locate reliable artwork/event source, then approve individual credit and |
| 21 | `reactor-2026` | REACTOR GRAND OPENING | D | 0 | 缺 | 缺 | locate reliable artwork/event source, then approve individual credit and |
| 22 | `digitalfutures-2026` | DigitalFUTURES 2026 | B | 1 | 缺 | 缺 | locate reliable artwork/event source, then approve individual credit and |
| 23 | `flatland-2025` | Flatland: Mixed Reality Dreams | D | 0 | 缺 | 缺 | locate reliable artwork/event source, then approve individual credit and |
| 24 | `vrplay-2025` | WORLD REMIX XR 黑客松视觉 | D | 0 | 缺 | 已登记 | locate reliable artwork/event source, then approve individual credit and |
| 25 | `stage-casting-2026` | 场景铸造 | D | 0 | 缺 | 缺 | locate reliable artwork/event source, then approve individual credit and |
| 26 | `performable-music-2026` | 可表演音乐研究 | D | 0 | 缺 | 缺 | active research: no completed concert claim; preserve ongoing status |
| 27 | `sre-realtime-2026` | 实时音画系统研究 | D | 0 | 有 | 已登记 | audit exact media, external attribution and official venue records |
| 28 | `digital-garden-visual-2025` | Digital Garden / 西安万象城「数字游园」 | D | 0 | 缺 | 已登记 | locate reliable artwork/event source, then approve individual credit and |
| 29 | `glance-thousand-install-2023` | 安昌光影艺术季「一眼万千」 | D | 0 | 缺 | 已登记 | locate reliable artwork/event source, then approve individual credit and |
| 30 | `kashiwa-band-visual-2025` | Kashiwa Daisuke / CAN Festival Zhoushan | D | 0 | 缺 | 已登记 | locate reliable artwork/event source, then approve individual credit and |
| 31 | `mke-terminal` | Mikael Lind × KASHIWA Daisuke × Qian Yuwen | D | 0 | 有 | 已登记 | audit exact media, external attribution and official venue records |
| 32 | `rain-singapore-visual-2026` | Rain 新加坡跨年专场 | D | 0 | 缺 | 已登记 | locate reliable artwork/event source, then approve individual credit and |
| 33 | `shanhaifusheng2-visual-2025` | 爱丁堡《山海浮生II》 | D | 1 | 缺 | 已登记 | find specific 2025 Edinburgh Floating Life II performance publicity and  |
| 34 | `transit` | 箱中温室 / Greenhouse in Transit | D | 0 | 缺 | 已登记 | locate reliable artwork/event source, then approve individual credit and |
| 35 | `xtep-xdna22aw-visual-2022` | XTEP XDNA / Shanghai Fashion Week | D | 0 | 缺 | 已登记 | locate reliable artwork/event source, then approve individual credit and |
| 36 | `yujiayun-45ping-visual-2025` | 余佳运「45㎡」演唱会 宁波站 | D | 0 | 缺 | 已登记 | locate reliable artwork/event source, then approve individual credit and |
| 37 | `zcool-hp-live-2021` | ZCOOL CUBE 2021 / HP G8 Workstation Launch | D | 0 | 缺 | 已登记 | locate reliable artwork/event source, then approve individual credit and |
| 38 | `future-string-tianhua-2025` | 中央音乐学院王楚婷博士毕业音乐会 | D | 0 | 缺 | 缺 | locate reliable artwork/event source, then approve individual credit and |
| 39 | `wavefilm-hackathon-staff-2025` | 海浪电影周艺动 AI 电影黑客松 | D | 0 | 缺 | 缺 | locate reliable artwork/event source, then approve individual credit and |
| 40 | `westbund-ambient-visual-2025` | 上海西岸漩心 | D | 0 | 缺 | 缺 | locate reliable artwork/event source, then approve individual credit and |
| 41 | `semicolon-c-onefive` | @onefive — 分号 C 时期视觉制作 | B | 3 | 有 | 已登记 | locate original 2023/2024 deliveries to attribute individual roles; keep |
| 42 | `lonely-av-live-2023` | 上海广播艺术中心「孤独？」 | D | 0 | 缺 | 已登记 | locate reliable artwork/event source, then approve individual credit and |
| 43 | `life-praise-install-2023` | 上海世纪汇广场《生命的礼赞》 | D | 0 | 缺 | 缺 | locate reliable artwork/event source, then approve individual credit and |
| 44 | `nature-numeral-install-2023` | 龙湖上海奉贤天街「数字空间与自然共生」 | D | 0 | 缺 | 缺 | locate reliable artwork/event source, then approve individual credit and |
| 45 | `xiexindance-sixiang-gong-visual-2022` | 谢欣舞蹈剧场《四相》《汞》 | D | 0 | 缺 | 已登记 | locate reliable artwork/event source, then approve individual credit and |
| 46 | `watermusic-multi-visual-2022` | CHINATIME Hamburg《Water Music》 | C | 1 | 缺 | 已登记 | locate reliable artwork/event source, then approve individual credit and |
| 47 | `migu-olympic-vfx-2022` | 中国移动咪咕冬奥宣传片 | D | 0 | 缺 | 缺 | locate reliable artwork/event source, then approve individual credit and |
| 48 | `meta-speaker-install-2022` | 西岸凤巢 AI PLAZA《元语者・棱镜现实》 | D | 0 | 缺 | 缺 | locate reliable artwork/event source, then approve individual credit and |
| 49 | `matrix-navi-2022` | 上海青年艺术博览会「矩阵导航」 | D | 1 | 缺 | 缺 | locate reliable artwork/event source, then approve individual credit and |
| 50 | `rythem-newyear-live-2021` | 上海新天地 Rythem 新年跨年演出 | D | 0 | 缺 | 缺 | locate reliable artwork/event source, then approve individual credit and |

**证据级别不是艺术价值排名。** 它只反映本轮外部可核对程度；资料没公开或尚未被搜索到，不等于作品没有价值。

## 防内容倒退的规则

1. 新网页要继承原始项目档案中的**已核实视频、官方链接、合作署名、历史展出版本**，同时保留完整旧稿链接。
2. 对一条内容的每个 claim 标明“活动存在”“作品署名”“个人职位”“奖项等级”“视频真实性/版权”中的哪一层得到了支持。禁止拿一个链接兜底全部 claim。
3. 原片和授权图像先进入媒体索引，公开页面再挑选，不应该反过来从站点截图推断原始媒体。
4. 完整 CV 保留全部真实履历；30 秒首页只放 3–5 件精选作品，商业合作独立区分。
5. 修改重大历史作品时先看源文档和 Git diff，CI 要防止旧媒体链接被静默删掉。
6. 本文为审计资料，不要把内部缺口描述原样复制进公共作品正文。

## 下轮工作拆分

- **P0**：核查 Kashiwa 6 个动态视频实际可播放；补齐 VAOE 四组原片与二维码记录；确认二砂影片正式署名；完成 ChinaGraph 原始证书验收。
- **P1**：优先追索独立艺术线与制作信用：Ether Fragment、Digital Tundra、Observation and Symbiosis、新媒体艺术家模拟器、URKL、AR 深圳、AI 盛典；把本轮已有外部报道映射到公开作品页。
- **P2**：其余项目逐项官网/参与者/媒体交叉搜索；在官方证据不存在时保存原始工作文件的出处而不是编造新链接。
