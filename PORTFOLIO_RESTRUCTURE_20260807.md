# Portfolio restructure — 2026-08-07

## Goal

Turn the site from a repeated project wall into a maintainable personal practice hub:

- works establish artistic judgment;
- spatial archive exposes scanning / Gaussian practice;
- realtime systems and production show technical depth without turning the homepage into a service list;
- workshops become a long-term public program with stable routes and reusable resources;
- archive and writing remain available as secondary depth rather than primary navigation clutter.

## Homepage structure implemented in this branch

1. Single hero: identity + current practice statement + Works / Workshops entry points.
2. Four practice lines: Live Audiovisual / Spatial Image & Scanning / Realtime Systems & Creative Tools / Workshops & Shared Methods.
3. Six non-repeating selected works.
4. Short practice bio.
5. Secondary archive / writing / GitHub links in the footer.

Removed from the homepage composition:

- auto-rotating hero project rail;
- standalone Drop Flow mainline section immediately after the hero;
- StageStrip project wall.

These modules remain in the repository and can be reused elsewhere, but no longer stack multiple versions of the same project on the homepage.

## Homepage work set

The homepage now uses a controlled ID list rather than `showOnHome` accumulation:

1. TIMER
2. Drop Flow
3. Kashiwa / TITAN
4. MKE Terminal
5. Digital Garden / Xi’an MixC
6. SRE Realtime Live Set

This is a temporary editorial set, not a claim that these are the only important works. It can be revised when the newest 2026 projects have formal content objects and suitable media.

## Workshop architecture

Routes:

- `/workshops`
- `/workshops/tools-for-one`
- `/workshops/personal-av-instrument`

Content source:

- `content/workshops/*.json`

Generated frontend data:

- `react/src/data/generated/workshops.js`

Build command:

```bash
node scripts/build-workshops.js
```

Each series already reserves `editions` and `resources` arrays. Future editions should add date, place, host, participant outcomes, documentation, starter kits, templates, examples, and FAQ without changing route structure.

## Current project inventory

The existing `projects/README.md` reports 40 projects, 39 with project documents and 1 index-only object. The repository already has enough material; the main editorial problem is hierarchy.

### Tier A — homepage / immediate identity

Keep the homepage to about six projects at a time. Current set is listed above. When the newest 2026 projects are fully ingested, the set should be reconsidered around artistic direction rather than chronology.

### Tier B — featured Works candidates

Repository-backed featured or strong public-facing candidates include:

- Drop Flow series and its Hangzhou Biennale / UFO Terminal nodes
- TIMER series
- Kashiwa Daisuke / TITAN
- Digital Garden / Xi’an MixC
- New Media Artist Simulator / Babel Bottle
- Observation and Symbiosis exhibition
- Observation and Symbiosis workshop
- Ether Fragment / West Bund Art & Design
- Dérive / FutureLab 2024
- Rain Singapore
- Yu Jiayun “45㎡”
- Kashiwa band visual / CAN Festival
- Floating Life II / Edinburgh
- XTEP XDNA 22AW
- SRE realtime live-set system
- MKE Terminal / spatial audiovisual environment

Not all of these should be shown at once. Works should prioritize artistic practice; role-specific commercial and stage delivery records can move to Production.

### Tier C — Production / collaboration proof

Useful production records that should remain visible but should not dominate the personal-art homepage include:

- Rain Singapore
- Yu Jiayun “45㎡”
- Kashiwa band visual / CAN Festival
- Floating Life II
- Future String / Central Conservatory concert
- THE BOXX “Hallucination Resonance”
- @onefive ChocoLove
- @onefive Underground / Overground
- Shanghai Broadcast Art Center “Lonely?”
- CHINATIME Hamburg “Water Music”
- Xie Xin Dance Theatre “Four Phases / Mercury”
- XTEP XDNA 22AW
- China Mobile Migu Winter Olympics promotional visual
- ZCOOL CUBE / HP G8 launch
- Shanghai Xintiandi Rythem New Year live visual

These are valuable because they show scale, collaboration, delivery, and live-screen competence. Their role should be explicit so they do not blur into authored artworks.

### Tier D — Archive / historical and public nodes

Archive should carry the long tail: festival nodes, public presentations, older production records, alternate versions, process records, and project-history evidence. It should be comprehensive without asking the homepage to be comprehensive.

## Newer material still needing content-source cleanup

Based on the 2026-08-07 audit and current repository search:

- **Urban Resonance**: appears in generated/frontend references, but its authoritative content-source path should be traced and normalized before making it a primary homepage card.
- **XTEP XDNA 22AW**: has a project document and database presence, but is still marked as database-only rather than content-ready.
- **DigitalFUTURES 2026**: not found as a formal repository work object in the current search; ingest into database/projects/content before homepage use.
- **Zhengzhou Ersha Factory Scan**: not found as a formal repository work object in the current search; should become a spatial-archive / scanning work object when media and credits are settled.
- **Waves Cross**: not found as a formal repository work object in the current search; verify project name, role, year, and media before ingest.

## Technical rules going forward

1. New facts first enter `database/` or `projects/`.
2. Public-ready objects enter `content/`.
3. React consumes generated content or small editorial taxonomy files; components should not become the only copy of project facts.
4. Homepage selection is editorial and explicit by ID.
5. One project appears once on the homepage.
6. Internal taxonomy values must not be exposed as public labels.
7. Workshop editions accumulate under stable series slugs rather than creating one-off event pages.
8. Primary navigation stays short; Archive and Writing are depth layers.
9. VIRTURA remains an outward organization link/context, not the voice of the personal portfolio.

## Next content pass

Recommended order after this structural branch:

1. Normalize Urban Resonance source object.
2. Add DigitalFUTURES 2026.
3. Add Zhengzhou Ersha Factory Scan.
4. Promote XTEP XDNA 22AW from database-only to content-ready if the credit/media are suitable.
5. Verify Waves Cross.
6. Re-select the six homepage works after these objects exist.
7. Fill workshop editions/resources without changing routes or layout.

## VIRTURA public-project intake queue — 2026-08-07

Source reviewed: [VIRTURA Featured Work](https://virtura.space/index.html)

This is an internal ingestion manifest, not public portfolio copy. VIRTURA's team-level role must not be copied into the personal portfolio as Ewan Qian's individual credit without checking the project record. Remote URLs below are public-source references; final portfolio media should be downloaded, rights-checked, renamed, and stored through the repository asset workflow rather than hotlinked.

### Intake decisions

| Priority | VIRTURA record | Year | Personal-repo destination | Current decision |
| --- | --- | ---: | --- | --- |
| P0 | [中国·AI盛典开场秀影像 / China AI Gala — Opening Show Visuals](https://virtura.space/work/ai-gala.html) | 2026 | Production / collaboration record | New project object needed. Verify Ewan's exact individual role and credits before public copy. |
| P0 | [中国国家地理·矿晶空间影像 / National Geographic — Crystal Landscape](https://virtura.space/work/natgeo-crystal.html) | 2026 | Production / spatial-media record | New project object needed. Confirm client-facing title, venue disclosure, individual role and image permission. |
| P0 | [SYSTEM × ERSHA 建筑空间扫描 / Spatial Capture](https://virtura.space/work/system-ersha.html) | 2026 | Spatial archive + project record | New object needed. Strong candidate for the Spatial Image & Scanning practice line; use the public image set as an ingest source. |
| P0 | [CONTROL CLUB / MISSING SIGNALS](https://virtura.space/work/circular-matrix-screen.html) | 2025—2026 | Two works + one shared venue/series node | Do not ingest as one undifferentiated project. Split CONTROL CLUB and MISSING SIGNALS, then connect both to the UFO Terminal circular matrix-screen venue/system node. |
| P1 | [西岸旋心 >>round-a-clock](https://virtura.space/work/west-bund-xuanxin.html) | 2025 | Production / collaboration node | Record only Ewan's actual media-system and event-visual contribution. Do not claim curation, participating artworks, LED hardware or the display system. |
| P1 | [TITAN](https://virtura.space/work/titan.html) | 2025 | Existing TITAN project | Do not create a duplicate. Use the VIRTURA page to reconcile date, venue, credits and five public images with the existing personal record. |
| P1 | [TIMER / DROP FLOW](https://virtura.space/work/ufo-circular-series.html) | 2024—2026 | Existing TIMER and DROP FLOW records | Do not merge the existing personal works into a single object. Import only useful public media and add a series relationship if absent. |

### Project facts and media sources

#### China AI Gala — Opening Show Visuals

- Public title: 2026 中国·AI盛典「AI在一起」开场秀 / 2026 China AI Gala — “AI Together” Opening Show
- Format: large-scale opening show / glasses-free 3D stage content
- Public team scope: spatial mapping, 3D content production, AI-image integration, stage previsualisation and show-file delivery
- Blocker: replace the team scope with Ewan's exact individual role
- Suggested classification: Production / Brand Experience / Spatial Media
- Media:
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/01_AI_GALA/hero-robot-cube.jpg
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/01_AI_GALA/detail_04_final-stage.jpg
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/01_AI_GALA/detail_01_mapping.jpg
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/01_AI_GALA/detail_02_ai-figure.jpg
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/01_AI_GALA/detail_05_robot-light.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/01_AI_GALA/detail_03_spatial-water.jpg

#### National Geographic — Crystal Landscape

- Public title: 中国国家地理·矿晶空间影像 / National Geographic — Crystal Landscape
- Context: permanent media content for hospitality and commercial interiors
- System: horizontal main screen, vertical columns and side displays; long-duration loops and versioned multi-output delivery
- Blockers: exact individual role, venue/client disclosure boundary and image permission
- Suggested classification: Production / Spatial Media / Permanent Installation
- Media:
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/02_NATGEO_CRYSTAL/space-lobby.jpg
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/02_NATGEO_CRYSTAL/space-preview.gif
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/02_NATGEO_CRYSTAL/crystal-landscape-pink.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/02_NATGEO_CRYSTAL/hero-crystal.jpg
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/02_NATGEO_CRYSTAL/quartz-white.jpg
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/02_NATGEO_CRYSTAL/quartz-amber.jpg
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/02_NATGEO_CRYSTAL/mineral-scan-color.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/02_NATGEO_CRYSTAL/crystal-flow-pink.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/02_NATGEO_CRYSTAL/amethyst-mosaic.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/02_NATGEO_CRYSTAL/crystal-data-glitch.webp

#### SYSTEM × ERSHA — Spatial Capture

- Public title: SYSTEM × ERSHA 建筑空间扫描 / SYSTEM × ERSHA — Spatial Capture
- Format: spatial scanning / point-cloud media / architectural study
- Process: capture, cleanup, spatial separation, scale and coordinate alignment, 3D reconstruction, camera previsualisation and moving-image output
- Suggested classification: Work or Research / Spatial Image & Scanning
- Blocker: confirm collaborators, site naming/public boundary and Ewan's individual role
- Media:
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/06_SYSTEM_ERSHA/hero.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/06_SYSTEM_ERSHA/detail_02_panorama.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/06_SYSTEM_ERSHA/detail_01_xray.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/06_SYSTEM_ERSHA/detail_04_facade.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/06_SYSTEM_ERSHA/detail_06_vertical.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/06_SYSTEM_ERSHA/detail_07_side.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/06_SYSTEM_ERSHA/detail_03_structure.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/06_SYSTEM_ERSHA/process_blender.webp

#### CONTROL CLUB / MISSING SIGNALS

- Shared venue: UFO Terminal, Shanghai
- Venue scale: 15.6 m navigable interior; 34.5 × 6.5 m main curved screen; multiple secondary displays
- Required model: one series/venue node plus two separately authored works
- CONTROL CLUB media:
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/09_CIRCULAR_MATRIX_SCREEN/control_live_cover.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/09_CIRCULAR_MATRIX_SCREEN/control_01.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/09_CIRCULAR_MATRIX_SCREEN/control_02.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/09_CIRCULAR_MATRIX_SCREEN/control_04_detail.png
- MISSING SIGNALS media:
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/09_CIRCULAR_MATRIX_SCREEN/missing_02.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/09_CIRCULAR_MATRIX_SCREEN/missing_03.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/09_CIRCULAR_MATRIX_SCREEN/missing_04.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/09_CIRCULAR_MATRIX_SCREEN/missing_05.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/09_CIRCULAR_MATRIX_SCREEN/missing_01.webp

#### West Bund Xuanxin — >>round-a-clock

- Date: 14 Nov 2025
- Location: Orbit · West Bund Xuanxin · Shanghai
- Curator: SenSend
- Public team scope: selected content ingest, playback testing, media-workflow support, and layout/image/event-visual production for selected content
- Exclusions: exhibition curation, participating artworks, LED hardware and the overall display system
- Suggested classification: Production / Collaboration Node
- Media:
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/05_WEST_BUND_XUANXIN/hero.jpg
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/05_WEST_BUND_XUANXIN/xuanxin_02.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/05_WEST_BUND_XUANXIN/xuanxin_03.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/05_WEST_BUND_XUANXIN/xuanxin_04.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/05_WEST_BUND_XUANXIN/xuanxin_05.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/05_WEST_BUND_XUANXIN/xuanxin_06.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/05_WEST_BUND_XUANXIN/xuanxin_07.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/05_WEST_BUND_XUANXIN/xuanxin_08.webp

#### Existing record reconciliation — TITAN

- Formal title: 机械光合：TITAN 的全息声林 / TITAN: A Holographic Sound Forest
- Artists: KASHIWA Daisuke × Yuki Murata × Ewan Qian
- Venue/date: BO LIVE Qianhai, Shenzhen · 21 Oct 2025
- Ewan Qian credit: Visual Artist / Live Visual Production
- Media:
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/04_TITAN/hero.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/04_TITAN/detail_01_particles.jpg
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/04_TITAN/detail_02_live.jpeg
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/04_TITAN/detail_03_stage.jpg
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/04_TITAN/process.webp

#### Existing record reconciliation — TIMER / DROP FLOW

- Keep TIMER and DROP FLOW as separate personal work objects
- Optional shared relationship: evolving 15K panoramic audiovisual series supported by UFO Terminal Loading Project
- Reconcile public media and system facts; do not create a duplicate combined project page
- Media:
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/03_UFO_CIRCULAR_SERIES/dropflow_03_live.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/03_UFO_CIRCULAR_SERIES/detail_01_timer.jpg
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/03_UFO_CIRCULAR_SERIES/dropflow_01_system.jpg
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/03_UFO_CIRCULAR_SERIES/dropflow_08_garden.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/03_UFO_CIRCULAR_SERIES/dropflow_07_title.webp
  - https://virtura.space/VIRTURA_WEBSITE_ASSETS/03_UFO_CIRCULAR_SERIES/dropflow_04_structure.webp

### Recommended ingestion order

1. Download and checksum the P0 media; do not hotlink production pages.
2. Create authoritative project records for China AI Gala, Crystal Landscape and SYSTEM × ERSHA.
3. Split CONTROL CLUB and MISSING SIGNALS into separate works connected by a shared venue/series node.
4. Reconcile TITAN and TIMER / DROP FLOW without creating duplicates.
5. Add West Bund Xuanxin only as a scoped collaboration/production record.
6. Run public-boundary, asset-reference, route, lint and build checks before promoting any item into the React site.

