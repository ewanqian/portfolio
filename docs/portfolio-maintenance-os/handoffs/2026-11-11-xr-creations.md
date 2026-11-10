# XR Creations — 入口、声音与四作品交接

日期：2026-11-11（Asia/Shanghai）。本次用户范围：修复 Apps → XR 入口、改善 Hand Lab 声音、收拢旧 demo，并形成四个结合工作坊方法的可试玩方向与 Destiny 三职业后续计划。

## 当前状态

- 音乐修复已合并并通过 Pages 发布，线上 JS 与本地字节一致。
- XR 正本已合并：`aba5e1e717e02e0520efec913e3ec4840c84da87`；[XR PR #1](https://github.com/ewanqian/xr-works/pull/1)。
- Portfolio 入口与固定版本发布管线已完成本地验收；本文件创建时，正式域名发布验收仍待执行，不能把源提交当作上线。

## 问题与处理

原 Apps 的 XR 按钮指向 GitHub Markdown 测试表。`xr-works` 当时没有首页；它并非大量开发分支失控，混乱主要来自分散入口、相似 demo 和重复运行时。

现在 Apps 保留两个常用手部工具，并设置真正的 [XR Creations](https://ewanqian.site/xr-creations/) 入口。新主页提供四作品入口、20 项可检索研究目录、Warlock / Titan / Hunter 分职业计划和本地切片试听台。四作品共用 `apps/studio/` 的输入、状态、声音和渲染层。

Hand / Synth / Space 的旧音门把手存在度混入持续声，导致没有演奏意图也发声。新实现移除低频持续层，提供瓷／弦／息三种有限时长声音，覆盖松手、丢手、静音、隐藏页面、XR 退出和取消排队事件。基础 OSC 入口和接口保持原协议。

另修复音乐站点缺少 `protocols/show-score.mjs` 的打包问题，覆盖 Spatial Studies 和两个 Gestural Atlas 页面；仅 HTML 返回 200 原本不能发现这个模块缺失。

## 正本与发布机制

| 内容 | 正本 / 发布 |
| --- | --- |
| 新 XR 首页、四作品、目录、计划 | `ewanqian/xr-works` |
| 既有音乐 demo 与声音实现 | `ewanqian/performable-music` |
| 个人主页入口和公共域名发布 | `ewanqian/portfolio` |
| Greenhouse | 保持原独立仓库；目录仅提供入口 |

`.github/xr-creations-source.json` 固定完整 XR SHA。工作流检出该版本，要求干净源工作树，检查后构建，并把产物复制到 `xr-creations/` 与 `portfolio/xr-creations/`。React 构建同时携带这两个路径。发布 rebase 后再次核对 pin 与两处 `release.json.sourceCommit`，避免新 pin 配上旧产物。生成快照不可手工分叉维护；升级应先改 XR 正本，再更新 pin。

本次仅改 Apps 展示、静态目录复制、XR 发布逻辑与交接；未把四个原型记作已完成的履历作品。旧应用和旧分享 URL 保留。构建导致的 `react/src/data/generated/*.js` 差异不随此次源补丁提交。

## 验收记录

| 检查 | 结果 |
| --- | --- |
| XR `npm test` | 15/15：既有手势稳定器与新作品状态测试 |
| XR `npm run check` / `npm run build` | 10 份公开 JS / 12 条本地 HTML 链接检查通过；静态构建通过 |
| XR CI | [Validate XR Creations 42859014240](https://github.com/ewanqian/xr-works/actions/runs/42859014240)，success |
| 四作品浏览器交互 | 残响 6 次松手、铸谱 8 事件、星图 7 次正确顺序、共生 6 次输入且松手后等待 3 秒，均到达完成状态；错误顺序、重播、重置已检查 |
| 首页交互 | 职业切换、Phalanx 搜索、无结果与清空恢复通过；目录 20 项 |
| 手机布局 | 375 px 内容宽度下首页与 Studio 无横向溢出；与 Portfolio Apps 一同视觉检查 |
| 旧目录 HTTP / 依赖 | 20 页 HTTP 200 且标题匹配；63 个可达音乐本地文件的闭包审计定位到唯一漏打包协议文件 |
| 音乐完整测试 | 176/176 通过；实际浏览器 OfflineAudioContext PCM 7/7 通过，空闲及尾部静音已验证 |
| 音乐上线 | [PR #55](https://github.com/ewanqian/performable-music/pull/55)，merge `3b550984e4e4fac97959535959d07e15dd2267c4`；[Pages run](https://github.com/ewanqian/performable-music/actions/runs/42858210433) success |
| 音乐线上模块 | `instrument-audio.mjs` 与 `protocols/show-score.mjs` 均 HTTP 200 / JavaScript，SHA-256 与本地完全一致 |
| Portfolio 构建 | `npm run build --prefix react` 成功；四处根／兼容／dist `release.json` 均指向上述 XR SHA |
| Portfolio 数据保护 | `audit:graph` 0 errors / 58 既有 warnings；`audit:preservation` 14 规则、0 缺失；`audit:portfolio-os` 通过 |

## 作品与后续方向

- **掌中残响**：从触发反馈走向有收束的声音短句，六次松手完成。
- **空间铸谱**：用点、线、面、息写一个八事件动作谱；休止是明确的输入。
- **掌上星图**：用七个当代符号做顺序、认位与反馈；尚非贴附真实指节的训练系统。
- **共生之庭**：六次局部输入扩散成空间网络，再通过主动松手让环境安定；不是科学神经／生态模拟。

完整概念、工作坊方法交叉和整合取舍保存在 XR [四作品方案](https://github.com/ewanqian/xr-works/blob/main/docs/FOUR_STUDIES_2026-11-11.md)、[项目经理评审](https://github.com/ewanqian/xr-works/blob/main/docs/PM_REVIEW_2026-11-11.md)与 [Destiny 三职业计划](https://github.com/ewanqian/xr-works/blob/main/docs/DESTINY_CLASS_ROADMAP.md)。Warlock 保留原试玩；Titan 和 Hunter 是计划。每职业六个声音事件槽可本地试听，刷新清空，尚未接入游戏运行时。

## 未测与下一步

云浏览器没有 WebGL 上下文，Studio 交互使用清楚标注的 Canvas2D 三维投影后备。不能据此声称 WebGL 画面、双眼立体、Quest / Vision Pro 真手势、设备帧率或作者听感已验收。四项是有完整小环的可试玩原型，艺术完成度仍由作者试玩决定。

下一次先对四作品各试玩一轮并选一项深入；再做真实设备收放、丢手、重新进入与声音听感记录。Destiny 切片按职业／技能／事件标注后，接入统一声音事件合同，逐个完成 Titan 和 Hunter 的独特动作环。
