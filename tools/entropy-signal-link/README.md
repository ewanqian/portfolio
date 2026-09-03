# ENTROPY SIGNAL LINK / Web v0.2

## 快速使用 / Quick use

### A. 今天立刻测试，不需要服务器
1. 两台电脑打开 `index.html`（部署到 HTTPS 后最好）。
2. 音乐电脑选择 `SEND / 发送`。
3. 视觉电脑选择 `RECEIVE / 接收`。
4. Sender 点击 `CREATE OFFER`，把文本发给 Receiver。
5. Receiver 粘贴，点击 `CREATE ANSWER`，把新文本发回 Sender。
6. Sender 粘贴，点击 `APPLY REMOTE`。
7. Connected 后，Audio / analysis / MIDI data 会走 WebRTC。

### B. 正式快速配对
部署 `worker.js` 为 Cloudflare Worker，并绑定 KV namespace `SIGNALS`。
把 Worker URL 填到网页 `Signaling URL`。
两边输入相同 Room，例如 `ENTROPY-01`：
- Sender: SEND → AUTO PAIR
- Receiver: RECEIVE → AUTO PAIR

之后不需要复制 SDP。

## 页面能做什么
- 浏览器直接捕获音频输入
- Web Audio FFT: LOW / MID / HIGH / RMS / ENERGY / TEXTURE
- WebRTC 传输真实音频流
- WebRTC DataChannel 传输分析值和控制数据
- Web MIDI 读取本机系统已经暴露出来的 MIDI ports
- 手动 SDP 配对，无后台也能跑
- 配置 signaling 后用 Room code 配对

## 不能做什么
浏览器不会直接扫描 LAN 上所有 MIDI / OSC / synth 设备。
Web MIDI 看到的是操作系统暴露的 MIDI ports。

如果要让 RTP-MIDI / Network MIDI 出现在网页中：
macOS Audio MIDI Setup 先建立 Network MIDI Session，
然后 Chrome 才会把该 session 当作一个普通 MIDI port。

## 推荐演出结构

Ableton / Synth
├─ Audio Aux → browser getUserMedia → FFT
├─ MIDI / Network MIDI → Web MIDI
├─ Max for Live / OSC → optional native bridge
└─ WebRTC Audio/Data → ENTROPY visual receiver

## GStreamer
GStreamer 很适合做“非浏览器音频设备 / NDI / RTP / capture card → WebRTC”的桥。
它不是你现在传 4–20 个控制参数的最短路径。

建议：
- control values: WebRTC DataChannel / MIDI / OSC
- actual audio stream: WebRTC
- complex hardware/media routing: GStreamer → WebRTC

## GitHub Pages
这个前端是纯静态文件，可以直接放 GitHub Pages。
自动 Room 配对仍需要一个 signaling endpoint；`worker.js` 就是这个很小的后端。
