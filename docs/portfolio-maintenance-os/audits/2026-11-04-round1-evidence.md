# Portfolio October 2026 — Round 1 evidence / QA ledger
Date: 2026-11-04
Branch: `audit/portfolio-oct2026-round1-20261104`
Status: READ-ONLY SOURCE AUDIT PARTIAL; runtime checks NOT RUN.

## Baseline
- Handoff: `docs/portfolio-maintenance-os/handoffs/2026-10-deepseek-website-backfill.md` on `homepage-editorial-rescue-20261102`.
- PR #101 merged 2026-11-04T09:19:38Z, merge SHA `168b6910bd0727220a3ec1f4c2d13c5a4643c2a3`; use latest main as baseline, not former PR branch.
- Issues #93, #96, #100 read. #93 holds incomplete releases and unverified claims; #96 requests publicly navigable Scene Forge case study with privacy review; #100 limits homepage to four selected works until visual QA.
- No original media files changed or removed.

## Concrete source-code findings
1. `react/src/pages/DigitalGarden.jsx`: motion sample is `<picture><source srcSet="/portfolio/assets/digital-garden/digital-garden-loop.avif" type="image/avif" /><img src="/portfolio/assets/digital-garden/digital-garden-xian-mixc-03.webp" ... /></picture>`. The fallback is static; multi-frame property of AVIF and animation in browsers **NOT RUN** / unverified. The label "motion sample" must not be treated as playback proof. Verify actual file (magic, number of frames, dimensions, duration), server response, Chrome/Firefox/Safari playback. Then publish only after verified, preferably as muted MP4 with poster and reduced-motion handling when appropriate.
2. `react/src/data/siteDisplay.js`: returned images mix `/portfolio/assets/...` and `./assets/...`; routes mix `/works/titan`, `/portfolio/projects/digital-garden`, `/portfolio/#/projects/xtep-xdna`, and archive fallbacks. This is a **path consistency risk**, not proof of broken deployment. Validate root-custom-domain, GitHub Pages /portfolio, SPA/hash routes and standalone /works path before changes.
3. `react/src/pages/Works.jsx`: `workIndexIds` contains 22 IDs on current main (not necessarily all resolvable). Selected 4 are also repeated in the index. `recoveredRecords` is a temporary manual override bridge, contrary to canonical `content/works/*.json`; remove only after generator verification. Audit each card for resolved record, image request and functioning target before promoting an 8–9 project editorial subset.
4. `react/src/pages/Workshops.jsx`: there is a Workshops index, but #96 confirms Oct 31 Scene Forge case-study acceptance is still open. Verify actual public case route + demo/process images + both-language cross-links. Do not publish participant counts or identifiable feedback without verification.
5. `react/vite.config.js`: dev middleware maps `/portfolio/assets/` to root assets; production behaviour must be tested against `react/scripts/copy-workspace-assets.mjs` and hosting. Passing in dev is insufficient proof of passing in deployment.

## Existing recovered-asset candidates (source references, not publication confirmation)
- National Geographic Crystal: `space-lobby.jpg`, `space-preview.gif`, `hero-crystal.jpg`, crystal/material studies, external asset host. Verify host availability, credits and rights.
- SYSTEM × ERSHA: `hero.webp`, panorama, X-ray/section, facade, structure and Blender process. Motion/public scan permissions not cleared (#26).
- Drop Flow: Hangzhou performance hero, video cover, UFO / Rooooooom719 / Gaussian archive. One canonical series only.
- TIMER: main / circular-stage stills, Vision Pro and MOV/MP4 sources. One canonical series only.
- Greenhouse in Transit: suitcase-object/web/archive/point-cloud narrative; document delivered evidence before release.
- 山海浮生 III｜炁 QI: potential WebXR entry, role not verified.
- Oct 31 Scene Forge workshop: #96 public-program case, demo/process screenshot/privacy gates.
- WORLD REMIX 2026: event/showcase/deliverable verification pending.
- October festival dual-screen deliveries: publish only against actual delivery evidence.
- ENTROPY and REACTOR: separate final evidence from plans, consolidate credits and suitable field documentation.
- Unmatched uploads: `img_2106_gif.gif`, `公众号_3x2_1.5x.gif`, `ui_dynamic_preview_locked.gif`; Hermione GIFs reference/possible duplicates. None approved for publication on name alone.

## Required per-media CSV columns
`source_path,project_id,rights_credit,width,height,duration_seconds,frame_count,format,file_size_bytes,sha256,current_site_url,http_status,browser_playback,chosen_publication_format,notes`

## Verification truth table
| Check | Status | Reason |
| --- | --- | --- |
| GitHub handoff, PR, Issue and source read | PASS | Direct connector reads, 2026-11-04 |
| Latest main compared with historic handoff branch | PASS | Merge state checked; historic comparison is not an asset audit |
| Complete media enumeration / SHA / frames | NOT RUN | No cloned media tree / source bytes inspected |
| Digital Garden AVIF multi-frame test | NOT RUN | Binary not decoded |
| Chrome / Firefox / Safari playback | NOT RUN | No browser playback session |
| `cd react && npm ci && npm run build` | NOT RUN | No local repository build |
| `npm run audit:public` / `audit:portfolio-os` / `media:report` | NOT RUN | No execution |
| Desktop / mobile visual QA / screenshots | NOT RUN | No rendered browser evidence |
| Cross-link HTTP/SPA navigation sweep | NOT RUN | No exhaustive route crawler |

## Next three actions
1. Check out the new audit branch locally, run non-destructive file inventory and hash/metadata extraction; publish full motion CSV and Oct ledger.
2. Decode and test `digital-garden-loop.avif` end-to-end; implement motion-safe fallback without removing source.
3. Build from current `main` baseline, test every home/Work/Workshops/project asset and link on desktop/mobile, capture screenshots and publish a small reviewable PR. No merge until checks pass.
