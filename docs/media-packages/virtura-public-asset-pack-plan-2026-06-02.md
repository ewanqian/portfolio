# VIRTURA Public Asset Pack Plan / 2026-06-02

> Status: source-of-truth planning doc  
> Host repo now: `ewanqian/VIRTURA-SpacePort`  
> Future candidate repo: `ewanqian/virtura-base-web` / `ewanqian/virtura.space` / `ewanqian/virtual-spaceport-web`  
> Purpose: 为 VIRTURA SpacePort / Collective / Creation Network 前台准备可复用的视觉素材、文案、预览视频、AVIF 动图和媒体包。

---

## 1. Decision

当前不要把网页本体、团队档案、素材母本、SpacePort 文档全部塞在一个地方继续混乱增长。

短期方案：

- `VIRTURA-SpacePort` 继续作为公共前厅、station dock 与资料母本；
- `VIRTURA-Collective` 继续作为团队主入口；
- 新网站仓库建议独立为 `virtura-base-web` 或 `virtura-space-web`；
- 本文件和 `virtura-asset-source-manifest.json` 先放在 SpacePort，作为未来新站的交接母本；
- 真正的二进制大文件、短视频、AVIF loop 应由本地 WorkspaceManager 处理后再提交。

---

## 2. Why not put everything in SpacePort forever?

SpacePort 是公共前厅，不应永久承担所有网页产品、素材仓、媒体发布、Vision Pro 逻辑、团队官网的职责。

建议边界：

| Layer | Role |
|---|---|
| `VIRTURA-SpacePort` | public dock / station archive / app-frontstage source data |
| `VIRTURA-Collective` | team identity / members / collaboration frontstage |
| `VIRTURA-Newsroom` | articles / media packages / public updates |
| `virtura-base-web` future repo | production website / app launcher / visual frontstage |
| local WorkspaceManager | asset processing / AVIF generation / repo sync / release checklist |

---

## 3. Asset Package Goals

This package should support:

1. SpacePort app-like frontstage;
2. Collective creation network homepage;
3. media packages for Xiaohongshu / Instagram / press kit;
4. Vision Pro / spatial interface future logic;
5. public-safe archive cards;
6. web-embedded lightweight previews using AVIF / WebP / poster images.

---

## 4. Package List

### 4.1 Creation Network

Use for: team identity, collaboration map, network introduction.

Required outputs:

- `creation-network-hero.avif`
- `creation-network-map.avif`
- `creation-network-card.avif`
- `creation-network-short-copy.md`

Core copy:

> VIRTURA 是一个面向舞台视觉、空间屏幕、音画系统、数字展映与 AI 辅助制作工具的创作网络。

### 4.2 Stage Visuals

Use for: musicians, venues, performance producers.

Proof projects:

- TIMER / 控时者
- Drop Flow / 滴流
- KASHIWA Daisuke / 柏大辅 related visual work
- CAN Festival
- WPÜ Japan / 新宿 WPÜ

Required outputs:

- 30–60s reel
- 3s AVIF loops
- stage visual case cards
- project metadata cards
- contact CTA card

### 4.3 Spatial Screens

Use for: ultra-wide screens, LED ring screens, large display delivery.

Proof projects:

- Drop Flow / 滴流
- TIMER / 控时者
- UFO Terminal
- MOVA viewing room

Required outputs:

- ultra-wide hero strips
- screen format cards
- stage / venue visual diagrams
- screen-safe stills

### 4.4 Audiovisual Systems

Use for: live AV, audio curves, cue structures, Blender procedural workflow.

Required outputs:

- audio-to-scene diagram
- control UI preview
- cue / timeline screenshot
- visual instrument explanation card

### 4.5 Digital Exhibition

Use for: MOVA, digital viewing room, online exhibition, project archive.

Required outputs:

- MOVA app icon
- viewing room hero
- exhibition cards
- archive cards

### 4.6 AI Production Tools

Use for: WorkspaceManager, Skill Forge, tool-production narrative.

Required outputs:

- AI tool workflow card
- script preview card
- WorkspaceManager dashboard concept
- public-safe tool note

### 4.7 SpacePort App Frontstage

Use for: iCloud-like launcher / Vision Pro future logic.

Required outputs:

- app launcher hero
- station app icon set
- station window preview
- activity calendar card
- Lu.ma current event card
- Vision Pro spatial launcher diagram

### 4.8 Guangzhou Expo Viewer Materials

Status: pending local ingestion.

Use for: explaining onsite viewer / Vision Pro / web viewing logic.

Required outputs:

- viewer screenshot
- Vision Pro still
- onsite photo
- spatial UI note
- media package preview

---

## 5. Asset Naming Rule

Pattern:

```txt
virtura__{package}__{project-or-station}__{asset-role}__{variant}__{YYYYMMDD}.{ext}
```

Examples:

```txt
virtura__stage-visuals__timer__poster__wide__20260602.avif
virtura__spatial-screens__drop-flow__hero-strip__ultrawide__20260602.avif
virtura__stage-visuals__kashiwa-daisuke__loop__3s__20260602.avif
virtura__spaceport-frontstage__mova__app-icon__v1__20260602.avif
virtura__guangzhou-viewer__visionpro-demo__still__v1__20260602.avif
```

---

## 6. Recommended Folder Structure

Future web repo:

```txt
public/
  assets/
    virtura/
      01-creation-network/
      02-stage-visuals/
      03-spatial-screens/
      04-audiovisual-systems/
      05-digital-exhibition/
      06-ai-production-tools/
      07-spaceport-app-frontstage/
      08-guangzhou-viewer-materials/
      archive/

src/
  content/
    packages/
    works/
    stations/
    collaborators/
  data/
    virtura-asset-manifest.json
    spaceport-apps.json
    media-packages.json
```

Current SpacePort staging:

```txt
docs/media-packages/
  virtura-public-asset-pack-plan-2026-06-02.md
  virtura-asset-source-manifest.json
  scripts/
    prepare-virtura-avif-assets.mjs
```

---

## 7. Source Candidates Already Found

From current accessible repos:

- `portfolio/scripts/optimize-media-assets.mjs` already contains a WebP optimization workflow using `ffmpeg` / `ffprobe`.
- `portfolio/scripts/check-asset-refs.mjs` already contains reference checking logic for assets in JS / JSON / MD / HTML / CSS files.
- `portfolio/content/works/drop-flow.json` contains Drop Flow public work metadata and cover image references.
- `portfolio/content/works/timer.json` contains TIMER public work metadata and cover image references.
- `portfolio/content/works/kashiwa.json` contains KASHIWA Daisuke / 柏大辅 visual project metadata and display modes.
- `portfolio/content/nodes/can-festival.json` contains CAN Festival public node metadata.
- `VIRTURA-SpacePort/docs/design/spaceport-app-frontstage-design-brief-2026-06-02.md` contains the app-frontstage / iCloud-like UI direction.

---

## 8. AVIF / Video Preview Policy

GitHub Pages can host AVIF images. AVIF loops can be generated from short video clips, but compatibility varies across browsers. Use a paired fallback strategy:

| Asset type | Primary | Fallback |
|---|---|---|
| still image | `.avif` | `.webp` / `.jpg` |
| 3s silent loop | `.avif` sequence / animated AVIF | `.webm` / `.mp4` |
| poster | `.avif` | `.webp` |
| documentation video | `.mp4` / external link | poster `.avif` |

Rule:

- Use AVIF for light, high-quality stills and short loops.
- Keep MP4/WebM for reliable video playback.
- Never rely on AVIF-only for important public playback.

---

## 9. Public Copy Seed

### VIRTURA

VIRTURA 是一个面向舞台视觉、空间屏幕、音画系统、数字展映与 AI 辅助制作工具的创作网络。

它将音乐现场、空间影像、网页前台、数字展映、AI 工具和长期档案组织成可以被进入、被展示、被合作、被传播的公共界面。

### SpacePort

SpacePort 是 VIRTURA 创作网络的应用化公众前台。它不是普通网页目录，而是一组可以打开的 station apps：MOVA、Balloon Live Space、Space Salon、Research Laboratory、Skill Forge 和 Activity Calendar。

### MOVA

MOVA 是 VIRTURA 的数字美术馆与线上展映入口，用于把作品、图像、文字、视频和档案组织为普通观众可以进入的观看路径。

### Balloon Live Space

Balloon Live Space 是面向 live set、浏览器舞台、线上演出和 session 记录的公共入口。

### Stage Visuals

Stage Visuals 是面向音乐现场、演出空间、舞台屏幕和实验现场的视觉制作包。它强调视觉不是背景视频，而是演出结构、屏幕尺度、声音节奏和现场气氛的一部分。

### AI Production Tools

AI 在 VIRTURA 中不是廉价图像生成器，而是用于资料整理、中间态分析、音频处理、控制插件、转码脚本、媒体包生产和团队工作流维护的工具生产层。

---

## 10. Handoff Instructions for Local WorkspaceManager

1. Pull latest `portfolio` and `VIRTURA-SpacePort`.
2. Scan these sources:
   - `portfolio/assets/`
   - `portfolio/content/works/*.json`
   - `portfolio/content/nodes/*.json`
   - `VIRTURA-SpacePort/organization/works/assets/`
   - local Guangzhou viewer materials
   - local Vision Pro demo screenshots
   - local team intro pages / images
3. Copy public-safe source images/videos into a staging folder.
4. Run `prepare-virtura-avif-assets.mjs`.
5. Generate:
   - AVIF stills
   - WebP fallbacks
   - MP4/WebM video fallbacks where needed
   - `asset-manifest.generated.json`
6. Review public boundary.
7. Commit to either:
   - `VIRTURA-SpacePort` staging path; or
   - future `virtura-base-web` repo.
8. Do not push raw private source media.

---

## 11. Future Repo Decision

Recommended repo name:

```txt
virtura-base-web
```

Alternative names:

```txt
virtura-space-web
virtura-frontstage
virtura-spaceport-web
```

Avoid:

```txt
virtual.space
virtual.spase
virtura.spaceport
```

Reason:

- GitHub repo names with dots are possible but less clean for tooling.
- `virtura-base-web` reads like a stable web frontstage foundation.
- Domain can still be `virtura.space` later.

Recommended split:

```txt
VIRTURA-SpacePort = content/data/archive/source docs
virtura-base-web = polished website/app shell consuming data/assets
```

If speed matters, first build the web inside `VIRTURA-SpacePort` as current prototype, but treat it as a temporary frontstage. Move to `virtura-base-web` when app-shell logic stabilizes.
