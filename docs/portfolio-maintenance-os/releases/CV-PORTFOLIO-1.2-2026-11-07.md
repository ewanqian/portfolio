# CV / Portfolio Release 1.2 · 2026-11-07

## Delivered
- All 61 stable CV records have English. Recovered R1.1 text and retained concurrent provenance updates; AI Gala / National Geographic inversion corrected against Chinese records rather than blindly trusting old linked IDs.
- 60 selected records explicitly ordered in `content/cv-selection.json`; excluded historical award record retained in full archive.
- Shared data generates main CV screen rows, Chinese/English print HTML, both PDFs, bilingual permanent records, public JSON and React Profile recognition paragraphs.
- Print templates retain R1.1 A4 three-page portrait typography; project titles and images not redesigned. Old release files/Drive links retained in history.
- CI renders both languages, checks three pages and all 60 permanent-record targets, publishes the actual files, and validates deployed PDF checksums as well as JSON identity.
- `audit-cv-data` rejects incomplete English, selection/order drift, leaked internal fields, stale data fingerprints and mismatched PDF checksums. Renderer skips unchanged inputs to avoid status/commit churn.

## Local acceptance
- Both PDF languages: 3 pages, 60 distinct record targets, searchable text. Six pages rendered and inspected; final corrected English production page inspected again.
- CV publication integrity: 60 links, 0 problems.
- Graph: 0 errors; missing English 57→0; existing warnings 115→58.
- Preservation: 14/14 rules pass. Media structure: 0 errors, 54 existing credit/permission review items.
- React build passes (95 modules); existing >500kB bundle warning and >25MiB MKE.pdf skip remain.
- Built artifact static HTTP: 160/160, including two PDFs with exact SHA-256, print pages, new/old JSON URLs and permanent paths.
- Negative test: missing selected English blocks generation. Unchanged renderer inputs skip output and preserve release status.

## Boundaries
Not claimed: full Works catalog semantic unification, native Google Docs regeneration, complete six-template responsive visual QA, all external video playback or independent verification of every historical claim/media right. These remain separate acceptance/backlog items. English preserves existing editorial wording; translation recovery is not independent fact verification.

## Reproduce
`node scripts/build-content.js` → `python scripts/render-cv-publication.py` → `node scripts/audit-cv-data.mjs` → normal CV/graph/preservation gates → `npm run build --prefix react` → inspect six PDF pages → publish → production HTTP and visual checks.

## Production
Pending this release commit; record actual run URLs and outcome here after deployment. Do not equate local160/160 with production acceptance.

## Estimate
One to two follow-up rounds for full formal pipeline/visual acceptance after this delivery; historical media/rights audit has no fixed-chat guarantee. Pitfall retrospective already committed separately.
