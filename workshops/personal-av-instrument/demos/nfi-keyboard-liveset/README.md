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

- 从 `39929580155-1-192.mp4` 等素材中切分真实声音片段
- 建立 sample manifest，把 A–Z 映射到真实素材
- 为同一视频增加 Normal / Loop / Freeze / Stutter / Speed 等少量可控状态
- 录制 15s / 30s promotion teaser
- 将参与者自己的素材包做成可替换 pack

## 发布

构建时由 `scripts/copy-static-works.mjs` 将本目录复制到：

`dist/workshops/personal-av-instrument/demos/nfi-keyboard-liveset/`

预期线上路径：

`/workshops/personal-av-instrument/demos/nfi-keyboard-liveset/`
