# Portfolio OS · P0 Site and Media QA · 2026-11-07

**Scope:** `ewanqian/portfolio`, 2026.11 release after CV 1.1. This report distinguishes repository/build validation from proven live HTTPS availability.

## Deliverables now in GitHub

1. **Source-aware postdeployment monitor**: `scripts/audit-portfolio-live.mjs` verifies the expected HTML identity of 50 project permalinks, 61 CV records, CV/Archive/Index pages and project cover MIME types. It recognizes incorrect SPA fallback content instead of only testing HTTP 200. It separates network failures, 403/429, actual HTTP 404 and content mismatch.
2. **Automatic monitoring workflow**: `.github/workflows/portfolio-post-deploy-qa.yml` attempts to run on successful `pages-build-deployment` / Pages publishing completion or manual dispatch, uploading an inspectable JSON artifact. Successful postdeployment QA **has not yet been independently observed**; workflow existence does not establish successful run.
3. **27-item image publication register**: `database/media-publication-register-2026-11.json` records 24 local repo images and three VIRTURA-hosted first-party team assets. Git blob SHA-1 and sizes support technical version tracking; they are not copyright evidence or SHA-256 media proofs.
4. **Media structural safeguard**: `scripts/audit-media-publication.mjs`, `npm run audit:media` and publisher/health workflows check missing, duplicate or unregistered covers, with a separate nonblocking author/rights-review count. Known generic posterwall and unrelated Classy Crush imagery cannot be introduced as project cover unnoticed.
5. **Media role captions**: `scripts/build-project-record-pages.mjs` now reads image type/caption data and recognizes existing VIRTURA first-party-hosted project images without copying bytes.

## Actual cover corrections in source

| Project | Previous image | New image | Why |
|---|---|---|---|
| Rain Singapore | `/assets/home/posterwall.webp` | `/assets/rain-singapore/gallery/its-raining-wide-05.webp` | Corresponding stage-visual archive frame |
| The Floating Life II | `/assets/home/posterwall.webp` | `/assets/raw-library/floating-life-ii-performance.webp` | Formal event poster. **Not an individual Ewan poster-design credit.** |
| Glance Thousand | `/assets/home/archive-observation-clean.webp` | `/assets/raw-library/glance-thousand-anchang-bridge-projection.webp` | Real installation image |
| New Media Artist Simulator | `/assets/home/featured-perceptual-environments.webp` | `/assets/raw-library/event-2025-babel-bottle-new-media-artist-simulator-exhibition.webp` | Official group-exhibition poster; not a still from a specific work |
| @onefive / Semicolon C period | `/assets/raw-library/onefive-classy-crush-signed.webp` | no cover yet | Classy Crush image cannot prove ChocoLove or Underground/Overground delivery |

These four replacement images were directly inspected from the repository. The image-role distinctions prevent overclaiming personal ownership of venue posters.

## Checked technical state

- 50 project IDs / unique permanent HTML records.
- 61 CV record IDs, 60 public CV entries, 24 explicit CV-to-mother-project relations.
- 128 sitemap URLs.
- 27 image assignments; **zero duplicate file paths and zero ledger mismatches**.
- 24 local repository cover files found. Three external VIRTURA image URLs are configured, but their HTTP delivery remains unverified.
- **27/27 photo/asset creators and publication rights remain unreviewed** in the media register. This does not mean rights are absent, only that the structured register has not been populated with confirmed documentation.
- `scripts/audit-portfolio-live.mjs` was parsed as async JavaScript, and the two relevant generator and media QA scripts passed static syntax parse.
- A GitHub Actions bot commit `publish: sync canonical React homepage bundles to Pages root` was observed, with compiled `index.html` referencing JS/CSS bundles that are present in repository `assets/`. This proves a publish file commit but **not the public domain's HTTP status or browser UI**.
- External crawler requests to `ewanqian.site/works/cv.html`, `archive-2026.html`, `works/projects/timer.html`, and sitemap failed with tool access errors; **do not report these as 404**.

## P0 remaining to close

1. Inspect GitHub Actions postdeploy run after Pages deployment and download `portfolio-live-health.json`. Fix any actual 404 / incorrect page / wrong MIME, then retest.
2. Real device desktop & mobile browser screenshots for CV, Archive, four target art pages, one permanent record and one media-heavy page. Check typography, Chinese line-break rules, image crops, and links.
3. Prioritize original media and credits for: No Further Input Required (organizer gallery), VAOE (four moving-image groups and QR AR), Dialogue of Forms, Digital Tundra, @onefive exact visual delivery, and TIMER/Drop Flow scene/video footage.
4. After image/rights reviews, enable selected poster and installation captions; keep non-verified images unpublished as new derivative marketing material.
5. Create a deterministic bilingual CV 1.2 generator from approved records. Current R1.1 PDFs are released, but not automatically generated from the live register.

## Links

- Main CV: https://ewanqian.site/works/cv.html
- Archive: https://ewanqian.site/works/archive-2026.html
- New media register: https://github.com/ewanqian/portfolio/blob/main/database/media-publication-register-2026-11.json
- Postdeploy workflow: https://github.com/ewanqian/portfolio/blob/main/.github/workflows/portfolio-post-deploy-qa.yml

**Publication judgment:** Source structure and media mapping are improved; **do not label Release 1.1 as fully browser-verified** until a network-capable browser/CI run produces positive evidence.
