# 2026-11-04 — Personal Portfolio × VIRTURA editorial release
**Editorial PM source · Issue #103 · Draft publication branch `portfolio-nov2026-editorial-release`**

## Release position

Not another website redesign. Merge the already prepared PR #101 only after visual QA. This editorial follow-up is a **stacked branch based on PR #101**, not directly on `main`; it must be rebased/retargeted only after #101 merges. No direct main pushes.

A project needs only three outward-facing forms:

1. **Work** — concise image-led case with accurate Ewan-specific role and credits.
2. **Journal** — one substantive readable article about the making, method, decisions, limitations and relation to other works.
3. **Archive** — masters, variants, source assets, data, technical implementation, rights and source links.

Research concepts stay inside the canonical work; do not multiply project cards.

## Cross-site publication ledger

| Canonical project | Personal website | VIRTURA website / source | Editorial action | Public state |
| --- | --- | --- | --- | --- |
| National Geographic — Crystal Landscape | Work + online archive entry | `https://virtura.space/work/natgeo-crystal.html`; `cng-design-archive` public | Ewan: crystal moving-image design; 3D scanning/capture of hotel + experience centre. Link only a verified public browser deploy. Private `cng-spatial-tour` cannot be copied wholesale; read-only public archive must be permission-filtered. | existing image case, browser entry pending |
| SYSTEM × ERSHA | Work + Point Cloud Factory process | `https://virtura.space/work/system-ersha.html` | Ewan: point-cloud capture and VFX imagery for a SYSTEM documentary/ad production. A personal re-edit / new score is an **upcoming separate edition**; rights and credits remain #26. | existing public scan case, new film planned |
| China AI Gala / “AI Together” | Work listing | `https://virtura.space/work/ai-gala.html` | Reuse existing official team images; hero selection is mechanical-arm mapping and robotics frames. Ewan's exact individual role still requires credit review; **WAIC ≠ China AI Gala unless independently confirmed.** | team case public, personal scope review |
| ENTROPY / Atmospheric Escape | Work record + Journal field note | `works/entropy-0905-performance/`, `atmospheric-escape-liveset` evidence | One dual-screen live image, screen/space diagram, model-to-wireframe, early Scene Forge and WebRTC; compare with final onstage evidence. | live event complete; field note drafted |
| REACTOR Day One / BPM System | Work/Archive entry + Journal field note | live engineering archive / images to trace | One strong stage hero; beat layer/trigger layer/recovery diagram; link to future Live Show Copilot. | field note drafted; images pending |
| Drop Flow | canonical artwork | team Drop Flow archive + `dropflow-biennale-mocap` | “Capturing Movement” / motion capture, performance body, theatre/staging, AR and realtime space as **future chapter**. | research in development |
| TIMER | canonical artwork | team TIMER archive | “Volumetric Desert” / suspended, dense sand field for Apple Vision Pro panoramic study and future multi-screen/dome editions. | concept / research in development |
| Performable Music | Home current-research link + Journal | personal research / Minimal Input Lab | Director / Show Score → Ableton Live → Render / Live. Connect to interactive AV, XR and stage, not fifth finished work. | ongoing research draft |
| HeroDome | Research/Archive | existing live-stage / Scene Forge studies | future Arena-level opening for dome/large screens, drawing from Drop Flow/TIMER musical time materials; not an independently delivered show. | concept only |

## Project presentation — exact short copy

### CNG / National Geographic — Crystal Landscape
**ZH:** 为中国国家地理酒店设计矿晶主题的多屏影像，并进行酒店及体验中心的三维扫描与空间采集。影像在横向主屏、立柱与侧屏间重新构图；采集资料延伸为可浏览的空间档案。

**EN:** Crystal-based moving-image design for the National Geographic hotel, alongside 3D scanning and spatial capture of the hotel and experience centre. Imagery is recomposed across a main display, columns and side screens, while capture material extends into a browsable spatial archive.

### SYSTEM × ERSHA / Point Cloud Factory
**ZH:** 参与 SYSTEM 郑州二砂纪录影像项目的点云扫描与特效影像制作。建筑的立面、楼层与内部空间被重组为可供镜头穿行的三维结构。个人重新剪辑与配乐版本正在筹备。

**EN:** Point-cloud capture and VFX imagery for a SYSTEM documentary production at Zhengzhou’s China Second Grinding Wheel Factory. The building is reconstructed as navigable spatial layers. A personal re-edit and new score are in preparation.

### AI Gala / robotics visual
**ZH:** 为《中国·AI盛典「AI在一起」》开场秀制作盒体舞台影像，以机械结构、机器人角色与透视映射组织三维开场画面。

**EN:** Opening imagery for the China AI Gala’s “AI Together” show, using robotic forms, mechanical structures and perspective-mapped 3D compositions for a box-shaped LED stage.

### Drop Flow / Capturing Movement
**ZH:** 从既有舞者动作捕捉资料出发，将身体运动重新编排为实时图像和剧场空间。新阶段继续研究身体、叙事与数字场景的关系，并探索增强现实及现场演出的不同呈现方式。

**EN:** Reworking motion-capture material into realtime images and spatial choreography, the next chapter of Drop Flow connects bodily movement, narrative and digital environments across live performance and augmented reality.

### TIMER / Volumetric Desert
**ZH:** 将时间的推进、停滞与逆转转译为密集的体积化沙粒空间。新版本面向 Apple Vision Pro 全景观看，并研究向环幕、穹幕与大型多屏场景的转译。

**EN:** A volumetric sand environment translating time into accumulation, suspension and reversal. Conceived for panoramic Apple Vision Pro viewing, with future adaptation studies for curved screens, domes and large-scale multi-screen environments.

### Performable Music
**ZH:** 研究可以被演奏、延长、重新编排并进入空间的音乐结构。连接 Show Score、Ableton Live 与实时视听系统，让音乐从固定音频转变为可持续演出的材料。

**EN:** Research into playable musical structures that can be extended, rearranged and spatialised, connecting Show Score, Ableton Live and realtime audiovisual performance.

## Priority order (separate content from build tasks)

**P0 — Next publication:** REACTOR BPM System Journal + Day One selected images; CNG case with scanning credit and verified public browser link. These most directly answer user-visible gaps and give reusable workshop material.

**P1 — Remaining finished evidence:** ERSHA credit + static scan gallery, AI Gala correct name + robotics pictures, ENTROPY dual-screen story + hero images, followed by project-level publication checks.

**P1 — Current research:** Performable Music current research link and draft reader; Drop Flow motion-capture chapter; TIMER volumetric study.

**HOLD:** independent HeroDome flagship; new instrument/agent framework; direct homepage expansion beyond four existing selected works.

## Engineering and archive gates

- Existing personal-site primary navigation remains Work / Archive / Workshops / About, per PR #101; Journal stays discoverable through Work/Home and existing Writing path.
- Existing `content/works` and `content/writings` JSON are source-of-truth. Run `cd react && npm ci && npm run build` to regenerate JS; do not maintain two hand-written data stores.
- Avoid source media republishing until copyright/permissions and source resolution are checked. Use official remote imagery as approved editorial references initially; make local optimized derivatives only with rights.
- CNG: verify whether a public deployed URL actually exists, since `cng-design-archive` repo has `index.html` and `tour.json` but the Pages URL could not be verified by available web tools. The private spatial tour includes panorama assets and must not be linked as a public website. Hand off local Codex browser deployment and public asset whitelist verification.
- REACTOR: screenshot actual Arena layer group, BPM envelope and actual foot/control map. No fabricated fourth pedal action. Ableton Link synchronizes musical timing; DJ waveform visual analysis is a distinct, human interpretation layer.
- ENTROPY: choose one real image with both screens visible. Archive manifest states and planned WebRTC modules are **not** evidence that every module was used onstage. Keep production notes separate.
- Animated assets: preserve masters; test MP4/WebM/animated WebP/AVIF in actual browsers. Record dimensions, duration, frame count, rights, public route and final loaded bytes. Do not run destructive media optimization on whole repo.
- Use source-original frame ratios; no generated title-card placeholders and no unrelated concept imagery passed off as documentation.

## QA and completion proof

- [ ] PR #101 passes browser-rendered QA and is merged before retargeting this branch to main.
- [ ] React prebuild regenerates writings/works without JSON syntax failure.
- [ ] CNG / ERSHA role lines and images render correctly; old audit text is removed from public paragraphs.
- [ ] AI Gala mechanical-arm hero and robotics frames are sourced from VIRTURA and linked correctly; WAIC identity remains unresolved until user evidence.
- [ ] Three Journal articles are browsable with intentional draft/published state, actual media and mobile type legibility.
- [ ] Future chapters labelled “in development”, not listed as completed shows.
- [ ] Build/lint/public audit and actual site tests are recorded as PASS / FAIL / NOT RUN with commit SHA; no imagined deployment.

## Review manager

Issue #103 is the delivery board; #93 remains parent PM, #100 remains visual gate. Review the **next broken public proof**, not number of files changed. Report one actual blocker and one next concrete gate per active line.
