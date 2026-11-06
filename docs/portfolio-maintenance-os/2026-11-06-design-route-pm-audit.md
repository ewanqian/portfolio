# Portfolio / 网站版本与视觉体系审计 · PM Review 2026-11-06

> Scope: ewanqian/portfolio, `main`, source-level audit. Reviewer role: project manager / editorial design lead. This report distinguishes repository existence from proven live deployment. Review source: repository files, Git commit history and linked pages, plus attempts to access current site on 2026-11-06. Public browser tools could open the homepage as an empty JS shell but could not access several new static subpages: **no claim of visual E2E testing or HTTP 200 for all URLs**.

## Decision / 经理结论

**The missing product is a site-wide publication system, not another art project page.**

The portfolio currently mixes separate design eras. A consistent archival shell should coexist with expressive work-specific fullscreen pages. Unification means shared routes, canonical IDs, navigation, credits, evidence references, asset permissions, a design-token system, and responsive QA; it does **not** mean painting all works white or removing black immersive experiences.

Do not add blockchain now. Git revisions + SHA-256 file manifests + offsite backups + source/credit records are the proper first step. If verifiable media provenance becomes needed, evaluate C2PA signed Content Credentials separately; blockchain alone does not prove ownership.

## Source-of-truth inventory

- **49 root projects**: `content/project-registry-2026-11.json`. 29 have image paths assigned, **not** necessarily verified image bytes / rights; only 10 have already designated direct editorial or project pages.
- **61 CV entries**: `content/cv-records-2026-11.json`; 61 static `works/records/{id}.html` record pages created via commit `5ffe9c62`.
- **21 legacy variant references** linked under root projects, instead of 21 extra root artworks.
- **22 app routes** from `react/src/App.jsx` (HashRouter); **27 root `works/*.html` static files** (as of review), plus the 61 record pages; **14 writing source JSON** files in `content/writings`.
- Raw generated React works and `Archive.jsx` contain old parallel data sources. **Do not treat the 49 roots as all 49 having complete human-written articles.**

### Detailed destination / style / version map

| Link / destination | Source or change provenance | Visual family by inspected CSS / component | Decision | Issue |
|---|---|---|---|---|
| `/#/` (home) | `react/src/pages/Home.jsx`, `SelectedWorks.jsx`; selection adjusted commits `c737e457`, `10f92cd6` | React editorial home, CSS modules | KEEP & NORMALIZE | lead art vs commissioned work hierarchy; global nav should link to CV and project archive |
| `/#/works` | `react/src/pages/Works.jsx`, generated works + recovered map | React editorial index | REFACTOR | selected cards and index use manually maintained IDs, not canonical JSON; duplicate presentation identity |
| `/#/archive` | `react/src/pages/Archive.jsx` | React mixed index | REFACTOR | hard-coded `backlogRows` + generated works + nodes; collisions and duplicate listing |
| `/#/profile` | `react/src/pages/Profile.jsx` | React profile/longform | KEEP but shorten entry | very long nested narrative; link to CV and separate long writing |
| `/#/production` | `react/src/pages/Production.jsx` | React commissions | KEEP | explicit attribution / role / client treatment, not identical to authored art |
| `/#/writing` | `react/src/pages/Writing.jsx`; `content/writings/*.json` | React publication | KEEP, separate journals | writing should cite work IDs rather than write duplicate factual bios |
| `/works/drop-flow.html` | standalone HTML; edition/credit refactor commit `bf288ec8` | existing standalone dark/artwork CSS | CANONICAL WORK | retain medium-specific art direction; use archival header/credits/links shared with TIMER |
| `/works/timer.html` | standalone HTML; edition/credit refactor commit `bf288ec8` | standalone art-detail CSS | CANONICAL WORK | TIMER award and Hangzhou presentations as version/occurrence records, not new root works |
| `/works/titan.html` | standalone HTML | Inter dark visual page | KEEP | align entry metadata and return navigation; do not erase performance-specific design |
| `/works/mke-terminal.html` | standalone HTML; included in earlier editorial work commit `1991a954` | radial dark graphic scene | KEEP as distinct work | different visual system and older site metadata |
| `/works/sre-realtime-liveset.html` | standalone HTML | dark technical project | KEEP | move notes into consistent `Documentation` section |
| `/works/no-further-input-required.html` | standalone HTML, several adjacent experiment pages | #050505 immersive mono display | KEEP canonical work | no representative image found in page source; add confirmed exhibition images and link to approved experimental versions |
| `/works/no-further-input-required-*.html` | multiple standalone experimental pages | artwork-dependent independent code | ARCHIVE AS VARIANTS | preserve URLs, attach `experiment` status and backlink to main NFI |
| `/works/ar-shenzhen-2022.html` | standalone HTML | #fdfdfb editorial white | KEEP | align global masthead / credits / image labels |
| `/works/topological-playground.html` | standalone interactive art | #050505 standalone canvas | KEEP AS EXPERIMENT | no requirement to inherit journal colors; add a return route |
| `/works/archive-2026.html` | new commit `caaa10c0`, subsequent fixes | #f5f5f1 editorial white + Georgia | CANONICAL PROJECT INDEX | correct for archival UI; must load 49 root projects; partial image coverage, test lazy-loaded image paths |
| `/works/cv-records.html` | new commit `56f026ba`, subsequent links | #f7f7f4 light list | CANONICAL CV INDEX | 61 records must all resolve to distinct records; use one design token package with archive |
| `/works/records/*.html` | 61 pages commit `5ffe9c62` | #f7f7f4 shared template | PERMALINK RECORDS | generated descriptions not independently verified; add evidence/media/organization dates as they become available |
| `/works/{production}.html` and `/#/projects/{slug}` | generated React project components, `content/works/*.json` | React case studies | KEEP | one canonical URL per commission; redirect alt routes after validation |
| `content/works/*.json` | older content layer | not public pages | MIGRATE TO REGISTRY | `id` consistency, credit/roles, media refs, variants |
| `react/src/data/generated/works.js` | generated content output | not public page | GENERATED ONLY | never manually edit as authority; replace generation source with registry |
| `react/src/data/siteDisplay.js` | legacy path overrides | presentation adapter | REFACTOR | legacy `/portfolio/assets/` vs custom-domain root paths; fallback imagery can misattribute projects |

### What looks inconsistent

1. **Two color systems** are intentional, but there is no shared transition: white list pages vs dark cinematic pages have different headers, tabs, max widths and buttons.
2. **Many one-off inline styles**: `drop-flow.html`, `timer.html`, `titan.html`, `mke-terminal.html`, `no-further-input-required.html` each maintain a separate stylesheet and type scale.
3. **Route-family collision**: HashRouter `/#/projects`, static `/works/*.html`, old `/portfolio/works`, `ewanqian.github.io/portfolio`, and `ewanqian.site` all appear in source history. `CNAME` declares `ewanqian.site`; a redirect/accessibility test must precede URL cleanup.
4. **Images as placeholders**: a registry cover path is not proof that the file exists or is correctly licensed. Missing works must not display a generic image from another project.
5. **Unequal detail levels**: long-form standalone work sites, thumbnail-only archive records, and one-paragraph generated CV pages represent different states; show `Overview / Documentation pending / Experiment` clearly.
6. **Publication claims**: the existence of `works/records/*.html` in the Git tree does not establish they were deployed. During this audit live subpage reads were unavailable; mark live verification outstanding.

## The target web system

**Level 0 / Entry:** `/` — selected 4–6 artistic projects and identity, no complete CV on homepage.

**Level 1 / Navigation:** `/works` selected works; `/works/archive-2026.html` all parent projects; `/works/cv-records.html` record evidence; `/#/writing` publications; `/#/production` commissions; `/#/profile` biography.

**Level 2 / Detail:**
- `/works/{slug}.html`: creative story, media and presentation variants.
- `/works/records/{id}.html`: immutable academic, award, exhibition, gig or employment occurrence. References parent work where appropriate.
- `/works/{slug}.html#editions`: optional version/presentation chapters, not separate root projects without reason.

**Level 3 / Evidence:** full-resolution originals, photographer/license/credits, organizer proof, version history, link back to parent and CV occurrence.

**Design contract:**
- Core archival UI: warm off-white (#f7f7f4), near-black (#202321), grey rules (#cfd0cb), one sans font (Noto Sans CJK SC), optional serif only on cover-level titles, readable text >= 13 px screen.
- Artwork pages: freely themed dark/light but **one shared header** (artist, works, index, CV) and **one shared footer** (year, title, author(s), version, role, sources and permalink).
- All images honor original aspect ratio by default; no non-source artwork, invalid cover fallback or loss of exhibition context.
- Responsive breakpoints, accessible contrast, keyboard focus, descriptive labels, real images and explicit pending states.

## Prioritized PM work packets

| Priority | Ticket | Acceptance criteria |
|---|---|---|
| P0 | Publication and link QA | 61 record pages + 49 project anchors + all direct targets return intended page, no unexpected root fallback or 404; screenshot representative pages in mobile and desktop |
| P0 | Single truth for content and routes | React Works and Archive consume canonical registry or generated output solely derived from registry; eliminate parallel hard-coded backlog and aliases through migration |
| P0 | Credits and awards | distinguish ChinaGraph 2024 TIMER, 2024 Hangzhou performance, 2025 music competition; verify exact awards; separate team vs solo roles |
| P1 | Shared design shell | 3 page families (editorial index, evidence record, artistic work); common navigation, tokens, breadcrumbs, footers, responsive rules |
| P1 | Image and file provenance | 20 missing project cover assignments and all unverified imagery; photographer, author, source, license and SHA-256; verify correct file exists |
| P1 | Homepage editorial review | Artistic research lead; show Drop Flow, TIMER, NFI, TITAN and one spatial practice; secondary production links, not 9 equal-heavy cards |
| P2 | Optional provenance signatures | Git SHA + checksums, external immutable archive/offsite backup; C2PA only for supported deliverables; blockchain only if specific contractual/market need |

## Owner / project management boundary

The *project manager* here is an editorial/technical review role, not a separate human employee appointed without authority. GitHub commits document actual repository writes; **no formal CI/deployment pass or full visual browser QA has been observed in this audit**.

## Source / commit trace

- New project index: [commit caaa10c0](https://github.com/ewanqian/portfolio/commit/caaa10c076f2107a3d0c62176ca07bfc68e6db5d)
- CV list page: [commit 56f026ba](https://github.com/ewanqian/portfolio/commit/56f026ba07dab67b1bc968c5c1b7b84ca5f7cf9c)
- Individual CV records: [commit 5ffe9c62](https://github.com/ewanqian/portfolio/commit/5ffe9c62c0214a5f36a9d93259695361318d4d4b)
- Earlier collaborative editions: [commit bf288ec8](https://github.com/ewanqian/portfolio/commit/bf288ec8b798e7c72a034545e54e7343c484ffca)
- Homepage source selections: [commits c737e457](https://github.com/ewanqian/portfolio/commit/c737e457b1ec1f6cf8536ebea9e139140cabe160) and [10f92cd6](https://github.com/ewanqian/portfolio/commit/10f92cd6abec4cf87db06c13c4d0a6c6e59d808a)
