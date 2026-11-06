# Ewan Qian · CV / Portfolio Release 1.0
**Release date:** 2026-11-07  
**Snapshot:** 2026-11 · Chinese and English, 3-page PDFs + single responsive CV web entry.

## Release links

- Proposed public CV / artist page: `https://ewanqian.site/works/cv.html`
- Source page: `works/cv.html`
- Canonical project archive: `works/archive-2026.html`
- CV record index: `works/cv-records.html`
- Individual evidence record: `works/records/{id}.html`
- Chinese PDF: https://drive.google.com/file/d/1pbUox-4YrkhdvqZH7AGL6xV02_AzKQCt/view
- English PDF: https://drive.google.com/file/d/1DS7y_f3gu3lhS-WdPtDuF7TgN-A7Yi7Y/view

## Release content and decisions

- Both PDFs: three A4 pages, original approved personal portrait, Unicode searchable text, 60 distinct CV record targets.
- Both PDFs derive their line content from the previous linked bilingual CV with a 2026-11 normalized selection; formal 2024 ChinaGraph row is presented neutrally as collaborative Electronic Theater work **without a claimed ranking**. The unverified 2024 Hangzhou award ranking is excluded from public awards; the confirmed live performance remains in Live Audiovisual. The underlying 61 original records remain in the archival database.
- Website: reader-oriented 30-second identity, four representative work links, capabilities / production / writing links, and 60 chronological CV records. Uses existing GitHub portrait and genuine project images; the NFI card uses typographic treatment while the actual exhibition image is not archived online.
- Changed homepage / project archive / record index navigation to include CV 1.0 without deleting existing links.

## Technical QA completed

- Both PDF files opened by PyMuPDF and rendered to PNG; three pages each.
- Chinese and English text extract correctly, including non-Latin glyphs and project names; no prohibited Chinese sentence punctuation appeared at the start of extracted lines.
- All PDF link annotations point to the designated `ewanqian.site` domain; each includes 60 distinct record pages.
- New HTML source confirmed to contain exactly 60 distinct record URLs, all IDs exist in `content/cv-records-2026-11.json`, and `<a>` tag counts are balanced.
- Drive file upload independently verified by file metadata: Chinese 362,985 bytes and English 283,312 bytes.

## Still requiring independent acceptance

**This source-file release does NOT constitute verified live GitHub Pages availability.** A public crawler failed to read new nested `ewanqian.site/works/` URLs during this session; whether deployment is pending, blocked, or responding incorrectly must be confirmed via a browser / CI network probe. Do not assert live 200 or that 60 individual pages can be opened.

- Run `node scripts/audit-portfolio-live.mjs` from network-enabled GitHub Actions; review actual status/content for the main CV route and all 60 records.
- Visually inspect mobile and desktop pages, fonts, images, and anchored external links.
- Only 29/49 root projects have designated image paths and only 10/49 authored project pages; not all have full case studies.
- `content/cv-records-2026-11.json` still needs reviewed English fields. PDF and React content are **not yet generated automatically from one immutable dataset**. R1 is a publication baseline, not a claim of completed synchronization.
- Evidence review: obtain organizer certificate/official 2024 ChinaGraph and Musicacoustica Hangzhou prize names before adding rankings, and keep all shared works correctly attributed.

## Next P0 / no new database needed

1. Make CI/browser verify the public CV, record pages and media; correct any deployment route problem.
2. Publish one bilingual, approved `cv-release` dataset and deterministic generator for website + PDF; treat this release manifest as a snapshot and keep the previous PDFs as historical versions.
