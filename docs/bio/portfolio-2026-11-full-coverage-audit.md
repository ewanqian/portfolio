# Ewan Qian / Portfolio · 2026-11 comprehensive archive and website audit

**Audit date:** 2026-11-06  
**Scope:** Portfolio GitHub repository `ewanqian/portfolio`, current working branch `main`, CV source, generated works, legacy archive, static work webpages, homepage editorial selection.
**State:** Repository/source coverage established. Live deployment, every image, and external event-credit evidence are **not yet fully verified**.

## Canonical model

- **One person:** Ewan Qian / 钱誉文.
- **One CV record per event, course, award, work presentation or commission:** `content/cv-records-2026-11.json`, each with immutable stable record ID and public `works/records/{id}.html`.
- **One root project/series per artwork or commission:** `content/project-registry-2026-11.json`. Formerly duplicated presentation entries are linked in `variants[]`.
- **Root work pages:** Existing approved `works/{slug}.html` remain for artwork reading, rather than being deleted or reused for unrelated projects.
- **Public indices:** `works/archive-2026.html` (all project roots) and `works/cv-records.html` (all CV occurrences).
- **PDF:** A year/date portion links to the record page; the work text links to the existing public artwork page when one exists, otherwise the record page. **Never emit a dead link.**
- **Language:** Canonical IDs are language-independent. Chinese and English CVs must share destinations.
- **Images:** one approved cover per root project, further images per version with source, rights and production credits. Do not fabricate art or alter its aspect ratio for a thumbnail.

## Coverage snapshot

| Source layer | Count | State |
|---|---:|---|
| 2026-11 CV occurrences, incl. education and awards | 61 | Indexed and individually published as static HTML |
| Root projects / commissions / research lines | 49 | Canonical registry, merged from existing generated works and legacy archive |
| Original generated React works records | 26 | All folded into project roots or variants |
| React Archive legacy backlog entries | 22 | All folded into project roots or variants |
| Historical work/presentation variant references in registry | 21 | Kept as variants, not conflicting independent roots |
| Root projects with assigned legacy image paths | 29/49 | Remaining 20 require artwork-specific approved media |
| Root projects with already assigned direct website URLs | 10/49 | Other projects have a functional record/index destination but not necessarily an editorial artwork page |
| Existing `works/` static HTML pages | 25 | Preserve; some are experimental/version routes, not canonical |

**Important:** Coverage means **indexed**, not that all 49 pages have finished editorial writeups, images, credit verification, or independent live HTTP smoke tests.

## Architecture and routing findings

1. `CNAME` declares **ewanqian.site**, whereas older code/links alternate between `ewanqian.github.io/portfolio`, `/portfolio/`, `/works/`, and `/#/archive`. Canonicalize new links to `https://ewanqian.site/works/...`, preserve legacy URLs as redirects when possible, and test redirect status before removing anything.
2. The app uses **HashRouter**. Existing static work pages coexist with hash routes. Keep published static `works/{slug}.html` independent of hash navigation; do not replace these with React routes without a tested redirect map.
3. React `generated/works.js` is generated and has legacy presentation records that can duplicate the root artwork identity. The canonical registry must drive future generation; hand-editing a generated list is not a permanent solution.
4. `react/src/pages/Archive.jsx` has an additional 22-entry `backlogRows` set. It is now indexed in the canonical registry; migrate the React page to consume the canonical data, then remove the hard-coded backlog to avoid two competing inventories.
5. `react/src/data/siteDisplay.js` has many `/portfolio/assets/...` image paths and id-specific overrides. Resolve paths by configured site base and test image existence rather than prepending `/portfolio` arbitrarily.
6. Previously, the PDF only linked approximately 21 occurrences. The revised bilingual PDFs now include each chronological CV row, each with record-specific destinations.
7. Some source claims in awards and collaboration credits need official evidence checks; an archived entry is not the same thing as a verified award or independently authored work.

## Awards: distinct records (do not merge)

- **2025 Hangzhou International Electronic Music Composition Competition** — C category first prize, Drop Flow, collaborative work; source verification remains a task.
- **2025 “流光绘影” Light & Shadow festival** — Excellent Work, Drop Flow special-format display.
- **2024 ChinaGraph Electronic Theater** — TIMER collaborative project, historical claim of Second Prize for Outstanding Music Work; confirm against CCF's dated award list or certificate before unequivocal external claim.
- **2024 Musicacoustica Hangzhou** — TIMER live audiovisual performance and reported award; **exact award name, ranking and recipient not verified**. Keep separate from ChinaGraph and from the composition competition.
- **2023 Musicacoustica Hangzhou** — official competition A-category first prize listed for *Timer*, under **Xu Hao**. This is neither evidence for a 2024 prize nor a solo Ewan Qian award.

### Source pointers

- 2023 official award list: https://musicacoustica.zjcm.edu.cn/chinese/yyjjchg/202311/35581.html
- 2024 official competition list (separate award series): https://musicacoustica.zjcm.edu.cn/chinese/yyjgg/202410/40917.html
- 2025 official competition list: https://musicacoustica.zjcm.edu.cn/chinese/yyjgg/202510/49413.html

## Homepage editorial priority

The homepage is **not** the full CV. The homepage should have:

1. A restrained artist identity / portrait and a clear link to full CV records.
2. **Lead works / artistic practice:** Drop Flow, TIMER, No Further Input Required (pending approved image), selected live audiovisual work (TITAN), and spatial image/point-cloud works (SYSTEM × Ersha Bauhaus or Digital Garden). Keep mixed-media/creative research legible.
3. A smaller **Selected production** section for credible delivery references (AI Gala, National Geographic, RAIN, large-screen commissions) without presenting every production as an independently authored art work.
4. **Current research and writing:** Stage Casting / Spatial Performance Instrument, BPM System, Performable Music. Mark research/prototypes accurately.
5. Direct routes for **All projects**, **CV records**, **Profile**, **Workshops**, **Writing**.

The source homepage's ordered cards and archive links were updated in this work. **A screenshot/rendered build of the deployed homepage must be checked before asserting visual parity.**

## Required next tests and repairs

- Confirm GitHub Pages deployments/Actions status for the latest main commit and perform HTTP 200 tests for all 61 `works/records/{id}.html`, 49 parent anchors, all official artwork links and images.
- Add approved image assets where missing, preserving original ratios and providing photographers/rights.
- Generate React works and Archive pages from the canonical JSON rather than duplicated hand-maintained arrays.
- Check canonical URLs, OpenGraph metadata, English translations, accessible alt text and responsive layout.
- Once published links are verified, update the PDFs' direct artwork links where a finished public work page replaces a general record page.
- Verify all award and academic record documents. Do not overstate 2024 Hangzhou award rank or conflate official 2023 result with it.
- Never delete historical work pages until incoming links are inventoried and redirect behavior is verified.

## Stable entrypoints (repository state)

- Canonical projects: `/works/archive-2026.html`
- All CV records: `/works/cv-records.html`
- Individual CV record: `/works/records/{id}.html`
- E.g. `/works/records/education-aalto-introduction-to-vr-2024.html`
- E.g. `/works/records/award-chinagraph-2024-timer.html`
- E.g. `/works/records/award-hangzhou-2024-timer-live.html`
