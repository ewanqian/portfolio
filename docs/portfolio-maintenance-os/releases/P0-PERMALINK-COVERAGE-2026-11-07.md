# P0 · 2026-11-07 Project and CV permalink coverage

**Scope:** Ewan Qian Portfolio OS, source-level implementation on `main`. This is an extension to CV/Portfolio Release 1.1 and does not silently regenerate or alter the approved PDFs.

## Delivered

1. **50 immutable project URLs** committed at `works/projects/{id}.html`. Each has a stable project ID, year, public registry summary, authored work-page link where available, historical related presentations, mapped CV records and source URLs with claim-scope caveat.
2. **Project Archive cards** now always open a permanent record page, even if an independent artwork editorial page does not yet exist. If the work has a separate artwork/team website, the card keeps an additional direct link to it. No existing `works/{slug}.html` routes were removed.
3. **24 CV entries** with explicit `project_id` / `related_work_ids` now link to the 50 project pages. Other CV entries remain untouched rather than guessing relationships from similar names.
4. **128 sitemap URLs**, including 50 generated permanent project pages and all 61 individual CV record pages.
5. Automatic generators:
   - `scripts/build-project-record-pages.mjs`
   - `scripts/build-cv-project-links.mjs`
   - `scripts/build-portfolio-sitemap.mjs`
6. Publisher updated: `.github/workflows/publish-portfolio-root.yml` regenerates all three, commits generated pages and sitemap alongside the compiled homepage. Health workflow now watches these generators and the sitemap.
7. `scripts/audit-portfolio-graph.mjs` now treats missing or wrong project permalink pages and absent sitemap entries as errors.

## Source-level checks performed

| Test | Result |
|---|---|
| Project registry IDs | 50 |
| Generated project files under `works/projects/` | 50 |
| CV records | 61 |
| Public CV rows in R1.1 | 60 |
| Mapped CV record pages to project pages | 24 |
| Published sitemap URL count | 128 |
| Project images with local `/assets/` paths in registry | 25 / 25 files found via GitHub directory lists |
| Archive page JS syntax | Parsed successfully |
| Five build/audit JS scripts syntax | Parsed successfully |
| Original artwork pages kept | Yes; source files not deleted |

**Important distinctions:** Static source existence is not proof of successful public HTTP delivery; script parsing is not a successful GitHub Actions execution; an image file existing is not the same as media permissions and proper credits.

## Remaining P0 and publication gate

- Run the new GitHub Actions publisher and health workflow. Confirm actual run conclusions and inspect generated artifacts/reports; no successful workflow run evidence was available in this session.
- Visit `https://ewanqian.site/works/cv.html`, `/works/archive-2026.html`, all 50 `/works/projects/{id}.html` and 61 `/works/records/{id}.html` via a browser or network-enabled runner. Failed web-crawler access alone should be labelled **unverified**, not 404.
- Mobile and desktop visual QA for at least 6 representative page types (CV, archive, authored artwork, generated project, CV record, full-screen experimental work).
- Image credit/licence verification; local file paths were checked but release rights and correct project ownership were not proved by path lookup.
- Create a reviewed, deterministic bilingual CV publication generator. R1.1 self-contained HTML sources are reproducible but still not fully generated from the same published registry.

## Operational rule

1. Edit one canonical project, CV or evidence object.
2. Run `node scripts/build-project-record-pages.mjs`, `node scripts/build-cv-project-links.mjs`, `node scripts/build-portfolio-sitemap.mjs`.
3. Run `npm run audit:graph`, `npm run audit:cv`, `npm run audit:preservation`.
4. Review the Git diff, image rights and factual credit scope.
5. Release and check external URLs. Do not claim automatic live verification before the network probe completes.

**Stable entrypoints:**
- [CV 1.1](https://ewanqian.site/works/cv.html)
- [Full archive](https://ewanqian.site/works/archive-2026.html)
- [Sample TIMER permanent record](https://ewanqian.site/works/projects/timer.html)
- [Sample coauthored art permanent record](https://ewanqian.site/works/projects/dialogue-of-forms-2025.html)
