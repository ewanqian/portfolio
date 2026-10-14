# Stage Replica Demo Prompt Pack

**Date:** 2026-10-14  
**Use:** 10/31 宣传 Demo、低保真 layout、AI 辅助预演、网页实现。

> 这 4 组 Prompt 的目标不是直接生成“最终成片”，而是先快速得到可比较的结构草稿、状态草稿和预演素材。先看空间与编排是否成立，再决定哪些值得继续做。

---

# Shared Rules

## 共同要求

- 优先低保真、结构清晰、可读性强；
- 不追求 1:1 复刻真实舞台；
- 必须保留人物 / Performer 尺度参考；
- 必须能清楚看出主屏、辅助屏、观众和空间关系；
- 不把所有屏幕从一开始全部打满；
- 每个 Demo 先做四个状态，再考虑细节；
- AI 输出先作为候选，不直接当 final；
- 同一个结构至少看一遍、再改一遍。

## Shared State

```text
LOW / 铺垫
BUILD / 建立
PEAK / 爆发
RELEASE / 收束
```

## Shared Output

每个 Demo 至少产出：

1. 1 张结构 / graybox 图；
2. 4 张状态图；
3. 1 条 20–30 秒低保真 cue / 卡点预演；
4. 1 张 `reference → structure → own content` 对照；
5. 1 个网页预演版本。

---

# 01｜Sphere / Immersive Dome

## Layout / Image Prompt

```text
Low-fidelity technical previsualization of an immersive dome concert environment, audience standing or seated inside a huge hemispherical LED media surface, one restrained central stage platform, clear performer scale reference, the media surface wrapping upward and around the audience, no decorative architecture, no unnecessary truss detail, dark black venue, precise spatial hierarchy, readable stage geometry, strong negative space, cinematic but diagrammatically clear, designed as a stage previsualization rather than a finished concept artwork.

Show the media system in four possible states: a narrow low horizon band, content expanding to the side walls and ceiling, a full-field enveloping state, and a final central aperture state. Keep the same stage geometry and camera position across versions. Visual content should be abstract, minimal, monochrome-to-silver procedural particles and light fields, suitable for later replacement with custom visuals. No text, no logos, no fake audience closeups, no fantasy architecture.

16:9 overview frame, audience-center viewpoint, physically plausible performer scale, clean black background, large readable dome silhouette.
```

## Motion / Cue Prompt

```text
Create a 24–32 second low-fidelity show previsualization using one continuous dome space and four clearly different states.

0–8s: HORIZON — only the lower front region is active, very low brightness, large dark ceiling area.
8–16s: ENCLOSE — visual information gradually climbs the left and right sides and begins to reach overhead.
16–24s: FULL FIELD — the entire dome becomes one continuous visual environment, strongest spatial impact, music and motion at maximum density.
24–32s: APERTURE — most of the dome falls dark again, leaving one central opening / window / sky-like aperture.

Do not use rapid random cuts. The spatial expansion itself is the main transition. Maintain one coherent visual language throughout.
```

## Agent Build Prompt

```text
Build a browser-based Stage Replica demo for an immersive dome.

Requirements:
- pure web implementation;
- one dome / hemisphere proxy;
- audience-center camera plus 3 additional viewpoints;
- 4 show states: HORIZON, ENCLOSE, FULL_FIELD, APERTURE;
- one local generative source;
- allow a browser canvas or captured window to become the media source;
- WebRTC stream state: idle → armed → connecting → live → fallback → offline;
- 4 camera presets and Program view;
- keyboard shortcuts for states and cameras;
- do not attempt true 16K rendering; use 4096×4096 / 2048×2048 proxy logic;
- fallback to local loop if live source disappears;
- prioritize readability, robustness and low-fi previs over visual complexity.
```

---

# 02｜Festival / Two-Wall Stage

## Layout / Image Prompt

```text
Low-fidelity festival stage previsualization with two monumental rectangular LED walls facing slightly inward toward a central DJ / performer platform, open-air environment still visible between and around the screens, minimal structure, strong horizontal composition, clear audience-facing sightline, performer scale reference, no giant decorative roof, no generic EDM fantasy stage, no excessive truss.

The two LED walls should be capable of operating independently and then becoming one combined composition. Use restrained abstract real-time visuals, large graphic areas, simple monochrome and silver procedural fields. The stage must read immediately as: left screen / performer / right screen.

16:9 FOH wide shot, technical but visually polished previsualization, dark evening festival atmosphere.
```

## Motion / Cue Prompt

```text
Create a 24–32 second festival stage previs in four states.

LOW: both screens are quiet and low-density; the surrounding environment remains visually important.
BUILD: left and right screens begin to answer each other but are not yet identical.
PEAK: both screens connect into one large visual statement and hit a clear rhythmic accent together.
RELEASE: one side withdraws first, then both return to a restrained low-density state.

Keep the performer in the center throughout. Avoid constant full-screen flashing. The difference between states should come from composition, density and timing rather than changing to unrelated AI videos.
```

## Agent Build Prompt

```text
Build a browser-based Festival Stage Replica demo.

Geometry proxy:
- stage 44m W × 20m D;
- screen L 18m × 9m, 18° inward;
- screen R 18m × 9m, 18° inward;
- central DJ platform 6m × 4m;
- 2048×1024 proxy per screen.

Functions:
- four states LOW / BUILD / PEAK / RELEASE;
- one live source can be cropped differently across left and right screens;
- optional two independent tracks later;
- 4 cameras: FOH_WIDE, DJ_FRONT, STAGE_LEFT, HIGH_WIDE;
- Quad Preview + Program Out;
- local file / canvas / capture / WebRTC source;
- fallback loop if source disconnects.
```

---

# 03｜Stadium / 360° Concert

## Layout / Image Prompt

```text
Low-fidelity 360-degree stadium concert previsualization, a large circular central stage with a performer at the center, a cylindrical LED media screen suspended above the stage, audience surrounding the stage on all sides, very clear in-the-round geometry, minimal arena bowl, no decorative stadium branding, no unnecessary rigging detail.

The cylindrical screen should read as one continuous panoramic media surface while still allowing four directional regions. Keep the performer visually important and do not let the LED cylinder dominate every state. Add a subtle lighting ring behind / above the media cylinder to show the relationship between screen and light.

Use a technical cinematic wide shot from the audience bowl, 16:9, dark venue, restrained monochrome visual content, clean scale hierarchy.
```

## Motion / Cue Prompt

```text
Create a 24–32 second in-the-round stadium previs.

LOW: cylindrical screen low brightness, performer remains the visual center.
BUILD: panoramic texture slowly rotates / divides into regions; back lighting becomes visible through or around the screen.
PEAK: the full 360-degree media surface becomes one connected environment; director camera cuts become slightly faster.
RELEASE: screen density drops, only partial windows remain, performer returns to the center of attention.

Include a short camera sequence: BOWL_WIDE → PERFORMER_FRONT → ORBIT_45 → TOP → BOWL_WIDE.
```

## Agent Build Prompt

```text
Build a browser-based 360 stadium Stage Replica demo.

Proxy geometry:
- 120m arena bowl diameter;
- 30m circular stage;
- 12m performer zone;
- 20m cylindrical LED diameter;
- 8m LED cylinder height as teaching proxy;
- 4096×512 panoramic media master, 2048×256 fast proxy.

Functions:
- cylindrical UV mapping;
- one panoramic media source;
- support front-window, repeat-4 test mode, and shader-fill for 16:9 inputs;
- four cameras: BOWL_WIDE, PERFORMER_FRONT, ORBIT_45, TOP;
- Quad Preview + Program Out;
- Cut only for v1;
- four show states;
- local / capture / WebRTC source and fallback.
```

---

# 04｜Installation / Black Box

## Layout / Image Prompt

```text
Minimal black-box audiovisual installation previsualization with one monumental 10.24m × 5.4m projection wall, a dark rectangular room, visitors standing between 6 and 12 meters away, almost no decorative architecture, no stage truss, no concert staging.

The projected image is sparse, rule-based and precise: points, lines, fine particles, numerical-like structures, large areas of black, controlled density. The visual should feel capable of remaining on screen for a long time without becoming exhausting. Optional second version includes a matching floor projection to compare a single frontal image with a spatialized environment.

16:9 perspective from inside the room, quiet, precise, high contrast, low-fi technical previsualization.
```

## Motion / Cue Prompt

```text
Create a 24–32 second audiovisual installation previs with no fast editing.

SPARSE: very few visual elements, large black area, quiet low-frequency sound bed.
ACCUMULATE: density slowly increases while the same underlying rule remains visible.
DENSE: high density and stronger audio level, but still one coherent system rather than many unrelated effects.
AFTERIMAGE: visual information gradually disappears, leaving residual lines / points and low sound.

Avoid music-video cutting. Let duration, density and viewing distance create the experience.
```

## Agent Build Prompt

```text
Build a browser-based black-box installation Stage Replica demo.

Proxy:
- room 14m W × 18m D × 7m H;
- main projection 10.24m × 5.4m;
- 4096×2160 media proxy;
- viewer positions at 6m and 12m;
- optional floor projection of the same physical size for comparison.

Functions:
- states SPARSE / ACCUMULATE / DENSE / AFTERIMAGE;
- connect a Visual Audio / WebGL canvas as live source;
- same-machine path should prefer canvas.captureStream() or direct texture sharing;
- cross-device path uses WebRTC;
- 4 viewpoints CENTER / FAR / LEFT / FLOOR;
- no rapid director cuts;
- allow audio track but do not require audio-reactive behavior.
```

---

# Prompt Usage Order

建议不要一次性让 AI 把所有东西做完。

```text
1. Layout Prompt → 看空间关系
2. Graybox / Web Build → 看比例和观看位置
3. 4 State Prompt → 看状态差异
4. Motion Cue → 看时间结构
5. 换成自己的视觉
6. 完整看一遍
7. 第二次修改
```

当前优先级：

1. Sphere / Immersive Dome
2. Festival / Two-Wall Stage
3. Installation / Black Box
4. Stadium / 360° Concert（保留做导播与多机位强化）
