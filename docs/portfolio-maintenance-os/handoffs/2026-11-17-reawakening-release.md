# Reawakening 音乐发行

2026-11-17，Asia/Shanghai。

## 本轮范围

作品身份为 `reawakening-2026`，作品名沿用艺术家已发布的 Reawakening / 复苏。单曲约 110 秒，编曲署名 Ewan Qian。

源记录保存于 `database/works.json`、`database/canonical_names.json`、`projects/reawakening-2026.md`。公开视图使用 `content/works/reawakening-2026.json`，同期更新项目、媒体、来源登记及 publication manifest 项目计数。

页面使用现有 React HashRouter、Header、Footer、LanguageContext。地址为 `https://ewanqian.site/#/music/reawakening`，可从音乐导航、首页链接和项目档案进入。

## 资产

- 封面采用艺术家本轮提供的原图。居中裁切区域 x315/y0/810×810，底部框架两端少量裁除。最终文件为 `assets/music/reawakening/cover-square.jpg`。
- 音源为艺术家提供的 MP3，保留字节。SHA-256 为 `3ed74244bc8883e0ebe7a71786c3361c008a15c5d5315a94daecf6a37e7ce553`。
- SoundCloud 公开入口为 `https://soundcloud.com/ewan-qian/reawakening`。浏览器核验了正式标题、Electronic 分类、封面及编曲署名。
- 页面以原生音频控件直听，SoundCloud iframe 按需展开。展开时暂停本地音源，本地播放时卸载 iframe，避免两路重叠。

## 已验收

- React 正式构建通过。
- `audit:graph` 无错误，保留基线的 58 条历史警告。
- `audit:preservation` 14 条历史保护通过。
- `audit:portfolio-os`、`audit:cv`、`audit:media`、release consistency 和公开文案检查通过。
- Chromium 1440px 桌面、390px 手机布局无横向溢出，中英文切换可用。
- 原生音源解码时长 110.0016 秒，播放时间推进，支持跳转进度。

## 发布状态

源码已完成本地验收，正在提交与部署。正式站点 HTTP、音源、封面及播放验收结果在完成后回写。

回滚使用本轮功能提交的 Git revert。既有作品与履历永久地址继续保留。
