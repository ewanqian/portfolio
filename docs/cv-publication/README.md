# Bilingual CV publication

Current scope: the CV records and selected public CV, not the entire Works catalog or Google Docs.

- Fact/public copy: `content/cv-records-2026-11.json`. English recovered from R1.1 by stable record URLs, with AI Gala / National Geographic ID inversion corrected against Chinese records.
- Editorial selection/order: `content/cv-selection.json` (60 selected IDs; all 61 historical records retained).
- Layout only: `templates/cv-{zh,en}.html`. Record text must never be retyped into these templates.
- `node scripts/build-content.js`: regenerates print HTML, public records, public JSON and React data. React Profile recognition reads `generated/cv.js`; the main CV screen rows read the same selected records.
- `python scripts/render-cv-publication.py`: regenerates both PDFs only when inputs change; checks three pages, 60 unique record links and text; records checksums and source fingerprints in the release manifest.
- `node scripts/audit-cv-data.mjs`: rejects missing selected bilingual fields, selection/order drift, public audit-field leaks, stale PDFs and checksum/source mismatches.

Install renderer: `python -m pip install -r docs/cv-publication/requirements.txt`; provide Noto Sans CJK SC regular/bold fonts and Pango. CI installs Ubuntu `fonts-noto-cjk` and Pango. Font metrics are part of visual acceptance: never shrink typography to hide a pagination regression.

Publish workflow renders and validates PDFs before the React build, then commits generated CV artifacts alongside the site. Root custom-domain and `/portfolio/` compatibility output include PDF assets and print HTML. Production QA checks JSON identity, PDF signature/checksum, permanent pages and image media type.

Updates: edit the record once; add/remove an ID in the selection only deliberately; run build + renderer + CV/public/graph/preservation checks; inspect all six PDF pages; publish and inspect live results. Keep previous PDF files/URLs and dated release reports. Google Docs is not a round-trip authority; any future native Doc export must derive from this selected data.

Known limits: evidence collection and media rights are separate; source recovery does not independently verify claims. English text retains R1.1 editorial wording except ID corrections. Full Works/Archive semantic unification, native Docs export and all video playback checks are not claimed complete.
