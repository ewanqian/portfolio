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
