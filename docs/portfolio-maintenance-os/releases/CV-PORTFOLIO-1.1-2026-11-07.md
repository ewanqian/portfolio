# CV / Portfolio Release 1.1 · 2026-11-07

**Baseline:** three A4 pages each; 60 linked public CV entries, 61 permanent record IDs retained in data; now 50 project/presentation identities after independently identifying Dialogue of Forms (2025). This is a publication baseline, not proof that all website pages and videos are reachable to all visitors.

## Official deliverables (Google Drive)
- [Chinese PDF R1.1](https://drive.google.com/file/d/1keAienWYQ3U0ZcHZDLFI_8r-Hn7el90l/view) — 3 pages, 364499 bytes; SHA-256 `c412c9e742cd0956daa99aa55ee9debfba98490af7fda2b8643f7bc1c16d0943`.
- [English PDF R1.1](https://drive.google.com/file/d/1a9P6iK5Sk0XDMcoaBy1hkdWnAPNdcmWQ/view) — 3 pages, 283558 bytes; SHA-256 `e2abe93df45a43f6c15fc45ce405f8ecf10390f938e4998de46fd4c1e855f2eb`.
- [Chinese source HTML](https://drive.google.com/file/d/1Pz1bPvtVG0GWh6_29pOX90VH4D32-JOT/view) and [English source HTML](https://drive.google.com/file/d/1d6ekfUnqEp0SI1HiUOYo-2f-4K_1HQrQ/view). Each embeds portrait bytes so it can regenerate without looking up a local image.
- [Archived regeneration script](https://drive.google.com/file/d/1lIe1o6_RZxXgpkqOk9GbtJppeSs6tIVK/view); requires WeasyPrint 68+ and PyMuPDF. These HTML templates describe **this fixed release**, not a fully database-driven publisher.

## Record corrections included in BOTH PDFs
1. ChinaGraph 2024 TIMER: Electronic Theater Outstanding Musical Work, Second class, jointly authored **Xu Hao and Ewan Qian**; original stored CCF certificate visually reviewed.
2. VAOE / 虚拟航线: four moving-image groups + QR-code-accessed augmented reality experience, Shanghai 312 Nanchang Road.
3. SYSTEM × Ersha Bauhaus: clarify personal spatial capture, 3D reconstruction, and partial moving-image production role.
4. 2026.10.31: use **Stage Replica / 舞台复刻** as the workshop title under the larger Stage Casting / 场景铸造 series.
5. AI PLAZA: describe confirmed exhibition participation; do not overclaim an independently unverified double-solo show.

## Website and database connections
- Public artist CV: `/works/cv.html`; two Drive PDFs are current R1.1 links, no old R1 PDF is promoted.
- Canonical 60 CV rows point to 60 distinct `works/records/*.html`; permanent record store contains 61 because one unverified award is archived separately.
- Works Archive currently has **50** identities: restored `dialogue-of-forms-2025` as an independently titled work, rather than merging it into `obs-symbiosis-2025`. The 2026 Digital Tundra entry is a presentation with both IDs, not a third work.
- Added curated work pages: `/works/vaoe.html`, `/works/onefive-semicolonc.html`, `/works/system-ersha.html`, `/works/observation-and-symbiosis.html`, `/works/dialogue-of-forms.html`, `/works/digital-tundra.html`.
- TITAN historical MANA six links and 10 cue structures restored to work page; TIMER certificate linked; Drop Flow media preserved.
- 11 historic archive preservation rules and CV release integrity checks added to `.github/workflows/portfolio-health.yml`.

## Public evidence cross-check
- [TOPYS: Symbiosis Protocols, 2026 Jan](https://www.topys.cn/activity/728): Observation and Symbiosis, Shen Xuan and Ewan Qian; venue/date.
- [Henan Provincial Cultural Center published online artworks guide](https://www.sohu.com/a/1041385483_121106991): both Observation and Symbiosis and Dialogue of Forms, coauthored by Ewan Qian / Shen Xuan.
- [Henan opening press](https://www.sohu.com/a/1038025598_121106991): Digital Tundra 2026 venue and opening period.
- [GitHub original ChinaGraph certificate record](https://github.com/ewanqian/VIRTURA-SpacePort/blob/main/organization/works/timer-series/timer-chinagraph-2024.md).

## Acceptance remaining
- **Unverified live site:** attempts to open the new static work pages via public tool returned inaccessible; GitHub file existence proves source was committed but not public HTTP 200 or mobile rendering. Video playback through dynamic MANA remains to be checked on a real device.
- **Source granularity:** 50 identities / 31 external-source references now recorded. Some link scopes only establish event/team existence and do not prove an individual camera, renderer or shot attribution.
- **Long-term publishing:** approved bilingual CV fields are still not centrally generated into both HTML and PDF. The archived templates make R1.1 reproducible, but future production should replace them with one reviewed source-data exporter.
- **Media:** missing artwork-specific cover for Dialogue of Forms; do not reuse Observation image as the sibling's thumbnail. Local image paths still need independent rights verification.

## Quality checks carried out during release
- Both PDFs rendered to page images: 3 pages; portrait embedded on first page; Chinese and English text extract correctly; 60 distinct record URL targets per file.
- Website source / record IDs / registry checked: 50 unique mother/project identities, 50 evidence rows, 61 CV records, 60 unique public rows, zero invalid project refs, 11/11 preservation rules and five critical CV text checks satisfied.
- PDF binary hash stored in `content/publication-manifest-2026-11.json` and mirrored here. No external live site QA was claimed.
