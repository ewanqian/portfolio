# 2026-11-04 Editorial Portfolio Review / Q4 Release Manager

## Release decision

Ship a smaller site with stronger work evidence and readable authored writing. Do not create another top-level taxonomy. Continue the already-open [editorial PR #101](https://github.com/ewanqian/portfolio/pull/101), which is still pending rendered visual QA and deployment. This change set is a **dependent editorial PR** against that branch, not permission to bypass the QA gate.

Current website hierarchy: **Work / Archive / Workshops / About**. Writing is reachable as a secondary link, not another homepage grid. Works have one canonical ID; a future study appears as a chapter or related writing rather than an unrelated new selected card.

## Confirmed source read

| Source | Public purpose | Current evidence / boundary |
|---|---|---|
| `portfolio` | Ewan personal work, writing and accurate role | #101 contains CNG + ERSHA React pages, project records and Work index; not merged |
| `VIRTURA-Collective` | Team identity and selected collaboration network | Existing team work entry; should link project narratives without replacing solo credits |
| `VIRTURA-SpacePort` | Canonical team version and evidence archive | Drop Flow / TIMER 2026 plan files exist; CNG/ERSHA not yet in team archive index |
| `cng-design-archive` | Public-safe CNG venue browsing and design archive | 12 public viewpoints in current archive; partial lobby mesh; rights reserved |
| `cng-spatial-tour` | Source spatial explorer | Eight areas, 27 panoramic viewpoints; local/desktop usage documented; venue routes schematic; partial lobby model |
| `dropflow-biennale-mocap` | Mocap/data provenance | Blender dancer and stage files, 33-bone character + BVH; public download != open commercial reuse |
| `atmospheric-escape-liveset` | Private source visual/runtime/archive | Spacecraft, galaxy, energy-field versions and Playwright screenshots exist, but private images must not be linked as public assets |
| `SceneForge` | Stage previs / WebRTC and workshop evidence | Browser-first app; old RTC experiments also under portfolio/lab |
| `virtura.space` public site | Team case page and source imagery | CNG / ERSHA public project URLs exist; exact host/source repo and downloadable rights need verification before any publishing changes |

**CNG deployment gate**: GitHub-connected source repos are readable, but the live Pages URLs of the spatial explorers are not yet confirmed from a browser. Publish only a verified URL, otherwise use source repo link with accurate label; never invent a launch state.

**WAIC** is not synonymous with `China AI Gala`: the latter has robot-arm/robot-stage imagery in older VIRTURA pages, but no source in this scan proves that the user-requested WAIC robot/robot-arm work is that same event. Wait for event poster/title, year, role and approved images.

## P0 — editorial content already committed on working branch

1. **CNG Crystal** React page: user-confirmed crystal video/visual design, multi-screen adaptation, hotel/experience-centre 3D capture; source links to existing archive/tour. Next: choose 1 installed view, 1 motion, 1 crystal image, 1 capture view and test site/tour link.
2. **SYSTEM × ERSHA** React page: user-confirmed point-cloud scanning/reconstruction and visual-effects imagery for documentary production with SYSTEM. New self-edited/soundtracked factory study is future work, not a shipped film. Next: improve media proof, verify full credits and personal recut rights; Issue #26 remains internal evidence ledger.
3. **REACTOR: BPM, Flash and Live Judgment** first-person field note: Arena layering, Ableton Link, BPM envelopes, Piano Trigger, waveform watching, blackouts, pedals, Live Show Copilot. Next: add actual event photos/Arena screenshots, verify binding map from real project. Do not confuse a general four-part control method with the particular archived six-layer Arena build.
4. **Atmospheric Escape: Building a Dual-Screen Live Visual System** first-person production record: shared world for front/ceiling screens, spacecraft/wireframe, early stage preview and WebRTC browser link. Next: export 3–5 approved screenshots from private liveset/source project and one system figure; reconcile actual venue output and show credits before promoting a finished-case claim.
5. **Performable Music / Agent Music Performance** new research article + small homepage link. It is a research entry, not a claim of an already finished agent performance system.
6. **Drop Flow — Motion Capture**, **TIMER — Volumetric Desert** concise public concept texts + related-writing links under the existing four selected cards. Both are in development. Maintain series identity and correct reference rights.

## P1 — next editorial intake

- **WAIC 2026**: verify event and individual role from factual source, then retrieve robot/robot-arm image set. Do not substitute China AI Gala images.
- **Hero Dome**: one proposal/research note connected to future immersive opening, not a new standalone flagship until there is a short audiovisual score/preview with actual technical budget.
- **Scene Forge workshop 2026-10-31**, Issue #96: one readable public-program case with process images and truthful anonymised participant notes; don't duplicate full textbook in personal Work.
- **REACTOR Day One** images and controlled workflow screenshot; choose a short 10–20-second live sample; use actual media rather than stock/AI imagery.
- **CNG and ERSHA** image audit + verified source publishing.
- **ENTROPY**: check venue naming conflict between personal notes and earlier portfolio's GWANTSI record before publishing detailed location; do not derive actual show mapping from pre-show screen specs.

## HOLD

- Homepage category expansion, additional unrelated Selected Work cards, speculative tooling framework, duplicated project/series entries.
- Publishing raw private liveset/screenshots, third-party film clips or dancer data without needed permissions.
- A new public page pretending sphere/large-format delivery or completed Vision Pro performance exists.
- Automated mass conversion of media: existing `scripts/optimize-media-assets.mjs` does not handle GIF and may delete original JPG/PNG.

## Suggested publish order

1. **PR #101** source build, desktop/mobile browser QA, media/route checks, then merge and deploy.
2. Dependent Q4 editorial PR: build/test the new articles, homepage link, series chapters, CNG/ERSHA copy; add source images only if licensed.
3. Cross-repo archival PR to SpacePort; verify `cng-design-archive` and `cng-spatial-tour` GitHub Pages real URL before adding live 'Enter 3D tour' buttons.
4. Final WAIC and Hero Dome follow-up after source media/research acceptance.
5. CNG / ERSHA VIRTURA team website adjustment after source hosting/deploy pipeline is identified; do not assume the VIRTURA-Collective repository directly builds `virtura.space`.

## Quality and governance

- **Pass**: 1 project = 1 canonical record, short factual copy, no defensive internal-audit prose on public pages, corresponding images with actual caption/credits, no aspect-ratio crop, links resolve, site deploy verified.
- **Not run**: local React build, browser screenshots/visual QA, GitHub Pages CNG live hosting verification, WAIC role/media verification, public release. Do not mark 'Done' without tests.
- Editorial manager = [Issue #93](https://github.com/ewanqian/portfolio/issues/93); homepage gate = #100; ERSHA credits = #26; workshops = #96.
- The current repo's `WritingDetail` loads Markdown from `content/writings/*.json` through `scripts/build-content.js`. Changing Markdown/JSON does not alone update deployed website; run `cd react && npm ci && npm run build`, verify `react/dist`, and follow verified publishing path.
- **Next proof**: 3–5 authored photos/screenshots for ENTROPY, 3–8 real REACTOR visuals and Arena screenshots, CNG/tour browser verified, ERSHA source rights and preview, exact WAIC credits/media.
