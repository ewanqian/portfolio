# NFI Keyboard Liveset v0.1

《无需进一步输入 / No Further Input Required》与「音画同源乐器 / Personal A/V Instrument」工作坊下的键盘音画乐器原型。

## 当前版本

- A–Z：26 个即时 Sound + Visual 触发单元
- 1 / 2 / 3：PLAYFUL / CLUB / AMBIENT 三种场景
- 0：Reset
- Tap / Hold / Repeat：同一个键会产生不同时间行为
- 视觉保持干净：单字、纯色、基础几何、轻微位移与缩放
- 当前声音为 Web Audio 合成占位，后续替换为切分后的真实语音 / 视频采样

## 目标

这个 Demo 不追求复杂特效。它要先证明三件事：

1. 第一次打开就知道可以按键玩；
2. 一个单字 / 单音节可以同时拥有声音和视觉身份；
3. 键盘可以被像一件小型乐器一样连续演奏，而不是只做一次 Trigger。

## 后续迭代

- 从真实素材中切分语音 / 单音节片段
- 建立 sample manifest，把 A–Z 映射到真实素材
- 为同一视频增加 Normal / Loop / Freeze / Stutter / Speed 等少量可控状态
- 录制 15s / 30s promotion teaser
- 将参与者自己的素材包做成可替换 pack

## 发布与试玩

Canonical source 仍保存在本工作坊目录；另外维护一个单文件发布入口：

`works/nfi-keyboard-liveset.html`

该单文件版本不依赖外部 CSS / JS，便于独立预览和后续站点发布。

当前可直接试玩的 immutable preview：

https://rawcdn.githack.com/ewanqian/portfolio/c2b1d0b4959f69f369357ff592234b6f76b49cab/works/nfi-keyboard-liveset.html

站点下一次成功 build / deploy 后，预期正式路径为：

https://ewanqian.site/works/nfi-keyboard-liveset.html

注意：`ewanqian.site` 是否已经更新取决于站点部署流程；仅提交到 `main` 不应被写成“已经上线”。
