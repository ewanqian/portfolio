# Personal Portfolio × VIRTURA — November 2026 Editorial Sync
**Coordinator:** Portfolio PM / issue #102 · **Source:** `ewanqian/portfolio` PR #101
**Release scope:** public work, technical field notes, future chapters. Date: 2026-11-04.

## Website structure
1. **Work**: projects with a concrete brief, outcome, role and documentation.
2. **Journal**: first-person methods, process and repeatable performance knowledge. Existing URL route is `/writing`; use **Journal** editorially without adding another competing top-level navigation item.
3. **In Development**: small current-research note plus next-chapter entries; not completed CV credits.
4. **Archive / Workshops / About** remain unchanged. No replacement of the homepage's four Selected Works without image/case-study review.

## Ownership and sync matrix

| Canonical work | Ewan personal site | VIRTURA site | Source / media | Current gate |
| --- | --- | --- | --- | --- |
| CNG Crystal Landscape | Work: personal spatial image design + 3D scanning/capture of hotel and experience centre | team project `https://virtura.space/work/natgeo-crystal.html` | `cng-design-archive`, `cng-spatial-tour`, current VIRTURA public media | Ewan role author-confirmed 11/04. Verify deployment for browser tour before “View Online” CTA; 8 areas / 27 panoramas, partial lobby Mesh |
| SYSTEM × ERSHA / Point Cloud Factory | Work: SYSTEM documentary point-cloud capture and VFX imagery | team project `https://virtura.space/work/system-ersha.html` | current public images; rights ledger #26 | Independent re-edit and original score planned; do NOT imply own release or unlimited documentary/raw-scan rights |
| China AI Gala / 中国·AI盛典 | Existing VIRTURA team record; candidate personal work after Ewan role check | `https://virtura.space/work/ai-gala.html` | 2026 box-stage, robot-figure frames | **Not the same event as WAIC by default** |
| WAIC 2026 / robotics visual | **Intake only**: prospective personal case | No verifiable WAIC-specific VIRTURA work record | Ask local Codex/source footage to resolve exact client, Ewan role, event and image rights | No live case yet; WAIC event itself took place July 17–20, 2026 |
| ENTROPY — Atmospheric Escape | Journal article + archive link; not new flagship | Potential team archive excerpt after public media sign-off | Portfolio Issue #70 + post-show README; private `atmospheric-escape-liveset` has 42 browser-state screenshots | Select real performance photo separately; source screenshots ≠ onsite-use proof |
| REACTOR — BPM System | Journal/Live Copilot reading; optional specific Day One case after show-credit/media check | Technical-method excerpt only if a VIRTURA team audience needs it | personal performance recollection + private Reactor/Arena docs + official Resolume/Ableton docs | Day One photo/event confirmation and 4 foot-pedal assignment ledger |
| Performable Music | Current Research link on Home → Journal entry | Optional Research mention, not a studio service | `research/performable-music/README.md` | Research in progress |
| Drop Flow — Motion Capture | New chapter inside **same** Drop Flow series | Future team development entry inside same project | `docs/portfolio-maintenance-os/next-works-2026-2027.md` | Motion capture/performer records and permission; planned, not delivered |
| TIMER — Volumetric Sand | Next chapter inside **same** TIMER | Future team development entry inside same project | same programme | AVP spatial preview and technical verification; planned, not delivered |
| HERO DOME | Future stage-opening study, NOT new selected flagship | Spatial show research / opening programme | same programme, SceneForge sphere proxy optional | No Sphere compatibility claim; verify actual venue specs |

## Newly authored site-readable content (branch #101)
- `docs/journal/reactor-bpm-system-2026.md` — long-form field note on continuous layer / BPM layer / manual Piano triggers, perceived DJ cue, and Live Copilot. Explicitly separates Link timing from waveform analysis.
- `docs/journal/entropy-two-screen-2026.md` — 2-screen architecture, spacecraft structure, browser previs and WebRTC experiment. Separate planned from confirmed onsite output.
- `research/performable-music/README.md` — present research.
- `docs/portfolio-maintenance-os/next-works-2026-2027.md` — compact public-safe next chapters.
- Four new `content/writings/*.json` records use existing MarkdownReader through `scripts/build-content.js`.
- `react/src/pages/Home.jsx` links Performable Music as **one compact editorial note**, not a fifth Selected Work card.
- Personal CNG and ERSHA page copy and work records updated on the same branch.

## Images and media

### CNG
Start with already-published installed-view photo `space-lobby.jpg`; follow with `space-preview.gif`, crystal scene/detail and a clean panorama-station screenshot. Audit `space-preview.gif` as animated content; export web-friendly MP4/WebM or animated WebP/AVIF only after verifying playback and approval. Do not publish private internal exhibition media.

### SYSTEM × ERSHA
Use `hero.webp`, `detail_02_panorama.webp`, `detail_01_xray.webp`, `detail_04_facade.webp` and `process_blender.webp`. Save independent-remix stills for a later update only if new original work is actually produced.

### ENTROPY
Private liveset source contains 42 Playwright screenshots in `output/playwright`. Editorial first-pass candidates to *review*, not automatic approvals:
- `version-1-state-1.png` / `version-1-state-3.png` / `version-1-state-4.png` — spacecraft acquisition, cutaway and exploded machine;
- `version-2-state-4.png` / `version-2-state-5.png` — celestial coordinates / orbit;
- `version-5-state-1.png` / `version-5-state-8.png` — nerve bundle / hero convergence.

These are browser prototype states, not live-stage documentary photography. Keep original private; move only approved exported display copies under a named public asset directory. Match a true onsite photo before claiming actual two-screen stage view.

### REACTOR
Private `atmospheric-escape-liveset/REACTOR_AGENT_BRIEF.md`, `reactor/README.md`, `arena/ARENA_BUILD.md` are source materials for system method. Find the distinct Day One/club performance media with event/date/role first; don't use another concert's image as evidence. Keep low-light image quality; no arbitrary bright neon cover.

## Editorial and safety gates
- No new hero slides, taxonomy, tag clouds, duplicate Work cards, speculative technical success or claim of a paid commission without evidence.
- Preserve exact collaborator roles. Publication from a VIRTURA website does not automatically license reuse outside approved scope.
- `cng-spatial-tour` source exists but web-hosted Pages URL was not independently accessible in this check; **never invent a live interactive URL.** Check GitHub Pages settings, publication workflow and actual browser panorama loading, including rights gating.
- `WAIC` requires exact project confirmation separate from VIRTURA's **China AI Gala**.
- `Live Copilot` is under development; journal material can be published now but no “completed workshop” credit.
- Resolume Link shares tempo/beat/phase, not waveform content; beat-driven envelope and manual musical decisions are distinct.
- Project imagery over UI. Primary goal is readable 10–13px metadata, stronger stills and concise writing, subject to rendered mobile legibility.
- Create one editorial release PR, verify static assets/render, media autoplay rules and navigation; do not treat draft commit as deployed.

## Practical release order
**P0 (first review):** PR #101 build and design QA; publish CNG and ERSHA personal pages with verified links; REACTOR article + images; Performable Music homepage note.
**P1:** ENTROPY image-led article and 2-screen production evidence; CNG spatial-tour publicly accessible browser; Day One / pedals evidence and Live Copilot handoff.
**P2:** WAIC after role/media confirmation; Drop Flow/TIMER approved future-stage visuals; HERO DOME only after real opening demo.

### Suggested follow-up issues
- Existing #102 is the single release gate and checklist, not a new separate manager.
- Existing #93 remains overall PM. #26 tracks ERSHA rights, #70 ENTROPY post-show, #100 rendered homepage editorial QA, #96 10/31 workshop, #87 CV claims.
