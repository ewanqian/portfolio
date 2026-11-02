# Portfolio Taxonomy + Project Recovery Audit — 2026-11-02

## Decision

The public site should not expose internal production taxonomy as primary navigation.

### Public top level

```text
Work
Archive
Workshops
About
```

### Not top-level categories

These remain project attributes, filters, or archive routes:

```text
Spatial
Production
Realtime
Research
Gaussian / Point Cloud
XR
Writing
Collaboration
Commission
```

Reason: the previous `Works / Spatial / Production` navigation mixed three different kinds of concepts:

- `Works` = a collection of projects;
- `Spatial` = a medium / method;
- `Production` = a role / commercial context.

They are not mutually exclusive categories. A single project can be spatial, commissioned, realtime, collaborative, and research-informed at the same time.

## Project rule

**One project appears once in Work.**

Performance dates, exhibition nodes, technical prototypes, alternate versions and supporting repositories are attached to the canonical project or moved to Archive.

Examples:

- `Drop Flow` = one project / series; Hangzhou Biennale and UFO Terminal are presentation nodes.
- `TIMER` = one project; Loading… Access 2 is a public presentation.
- `TITAN` = one collaboration line; BO LIVE / CAN Festival are public nodes inside that line.
- `National Geographic — Crystal Landscape` = one spatial-media project; CNG design archive / spatial tour are supporting documentation systems.
- `SYSTEM × ERSHA` = one spatial-capture project; scanning / point cloud / Gaussian / previs are attributes and process, not separate works.

---

# Recovery board

## P0 — recovered into personal Portfolio now

### National Geographic — Crystal Landscape / 中国国家地理·矿晶空间影像

**Decision:** recover as a personal Portfolio project record.

Why:
- finished public-facing 2026 project;
- strong hospitality / commercial-space evidence;
- real multi-screen spatial-media application;
- fills a missing proof between stage imagery and permanent architectural media.

Current source evidence:
- VIRTURA public project page;
- `cng-design-archive`;
- `cng-spatial-tour`.

Boundary:
- the personal Portfolio may contain the project;
- VIRTURA team scope must not automatically be rewritten as solo Ewan credit;
- individual credit line still needs a direct source if it is to be more specific.

Homepage: **not automatic**. First enter Work index and pass image/authorship comparison against current Selected Works.

### SYSTEM × ERSHA / 郑州二砂建筑空间扫描

**Decision:** recover as a personal spatial-capture project record.

Why:
- Ewan participation in spatial scanning / point cloud / 3D reconstruction is already recorded in Issue #26;
- public project media exists;
- it demonstrates real architectural capture and reconstruction rather than a software demo.

Boundary:
- collaboration / documentary context remains visible;
- do not claim documentary direction, whole-project authorship, raw-data rights, or final-film ownership without evidence.

Homepage: **not automatic**. First Work / Archive, then reassess after credit + moving-image evidence is complete.

### Greenhouse in Transit / 箱中温室

**Decision:** reclassify from `tooling-research / content-infrastructure` to **personal spatial-narrative artwork**.

Reason:
- the external repository explicitly credits Ewan Qian;
- it has a concrete artwork premise, physical object, mobile web archive and Vision Pro experience path;
- treating it as infrastructure hid an authored work behind internal system language.

Current promotion state: Work index candidate; visual documentation still needs review before homepage consideration.

---

## P1 — next recovery review

### 山海浮生 III｜炁 QI — WebXR / spatial preview, 2026

Repository: `ewanqian/shanhaifusheng-2026`

Evidence found:
- WebXR spatial preview exists;
- VR and MR entries exist;
- 90-second spatial playback structure exists;
- director: Yuyang Cheng / 程雨阳;
- production: SET / 旁观实验剧场.

Why it matters:
- this is stronger than a generic technical demo because it is attached to a named performance work and a real production context;
- it can show WebXR / spatial-computing work without creating a separate `Spatial` top-level identity.

Gate before ingest:
- identify Ewan’s exact public role;
- decide whether this is a standalone collaboration case or a 2026 extension of the existing 山海浮生 line;
- select documentation that proves the spatial experience rather than only the web interface.

### New Media Artist Simulator

Repository: `ewanqian/new-media-artist-simulator`

Already represented in the personal Portfolio. **No duplicate recovery object needed.** Audit media/case-study quality only.

---

## Supporting repositories — attach, do not promote as separate works

### `cng-design-archive`
Attach to National Geographic — Crystal Landscape as spatial documentation / design-archive evidence.

### `cng-spatial-tour`
Attach to National Geographic — Crystal Landscape as spatial-tour / panorama / annotation evidence.

### `dropflow-biennale-mocap`
Attach to Drop Flow as motion-capture / production evidence.

### `atmospheric-escape-liveset`
Attach to ENTROPY / FIELD INDEX as live-system production evidence.

### `SceneForge`
Treat as shared production / previs infrastructure and workshop context unless a concrete SceneForge artwork becomes independently public.

---

## Archive / HOLD — do not elevate to Work frontstage now

### Senia Digital Resort
A useful world-building / digital-resort research context. Keep in Archive / research history. Do not confuse it with the National Geographic hotel project.

### VIRTURA2114
Large world-building archive / textual immersive universe. Keep as historical VIRTURA / world-building context. It should not define the current personal artist homepage.

### Portal of All Beings / 众生之门
Current repository describes a v0.1 fan-made text prototype based on an existing IP. Keep in Archive / prototype layer; do not promote as a representative personal work.

### XUAN Spatial Perception (`xuanart-demo`)
Current README only establishes a static website demo. Treat as technical / presentation support until a concrete public project, authorship, and outcome are documented.

### Forge / RepoForge / WorkForge / BodyForge / MAGI / career OS repositories
Operational or personal infrastructure. They may support practice, but they are not Portfolio works by default.

---

# Work index policy

The public Work page should be **curated but broader than the homepage**.

### Homepage Selected Works
Remain a hard editorial shortlist. A recovered project must displace an existing selected work on:

1. image strength;
2. public outcome;
3. authorship clarity;
4. case-study completeness;
5. relevance to current practice.

### Work index
Can include completed personal work, strong collaborations, commissions, and spatial-media cases.

### Archive
Keeps:
- alternate versions;
- event nodes;
- unfinished research;
- prototypes;
- supporting tools;
- historical / low-evidence records;
- process and evidence repositories.

This removes the need for separate public `Production` and `Spatial` silos.
