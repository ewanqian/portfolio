# Featured Works · Editorial QA / 2026-11-07

**Source snapshot:** GitHub repository `ewanqian/portfolio`, project pages and original media repository. This document is an independently inspectable *source-level* QA report; it does **not** claim all six URLs and hosted videos passed a new live HTTP or mobile browser test.

## Six featured works — assessed and retained

| Work | Artwork-specific local media | Working source link(s) recorded | Result / next media gate |
|---|---|---|---|
| No Further Input Required | Development capture board (clearly labelled, NOT final artwork) | Curator's official Inclusion artwork/gallery page, CV exhibition record, two interactive WebGL development entries | **Corrected**: 90-second final single-channel exhibition version remains distinct from exploratory WIP; real finished-exhibition photo is accessed through curator page, not mirrored or misrepresented. |
| Drop Flow | 12 distinct local images (20 image references) | Bilibili films, superspl.at Gaussian scene, studio/collaborator docs | Existing complete editorial page retained; external playback still unverified. |
| TIMER | 2 distinct local images (3 references) | Bilibili film, superspl.at scene, ChinaGraph original certificate, project record | Existing complete page retained; award authors and rank preserved. |
| Kashiwa / TITAN | 4 local performance photos | 4 Shenzhen MANA visual previews, 2 separate Zhoushan CAN Festival previews, KASHIWA artist official post | **Corrected** missing `.html` canonical link; MANA live playback remains to verify. |
| VAOE / 虚拟航线 | No artwork video originals in repository | 2023 Youth Daily exhibition reporting with site image | **Corrected** 4 fake-looking media placeholders to plain numbered archival units; does not invent titles/frames. Original 4 videos, QR target and AR recording still needed. |
| Dialogue of Forms | No work-specific local original image found | Henan Provincial Cultural Center guide, exhibition record | **Improved** access to external exhibit artwork/source page; avoids presenting Observation and Symbiosis photo as a still of this separate work. |

## Actual changes committed

- `works/no-further-input-required.html`: added development image `projects/no-further-input-required/NFI_Artwork_P3D/captures/A001/front-board.png`, clearly labelled **development capture; not final exhibited film**. Added confirmed exhibition version and curatorial photo/documentation link. Its actual final performance is still about 90 seconds, not an obsolete 8–10 minute prototype.
- `works/vaoe.html`: four genuinely documented moving-image groups now shown as archival numbers 01–04, not synthetic screenshots, unknown names or dummy image placeholders; the independent press includes the original on-site photo.
- `works/dialogue-of-forms.html`: promoted institutional online artwork guide link above the fold and explained separation from sister work `Observation and Symbiosis`.
- `works/titan.html`: canonical link matches actual `/works/titan.html` file.
- `database/archive-preservation-checks.json`: three new protective checks for above factual/media distinctions; overall now **14 preservation rules**.
- `works/drop-flow.html` and `works/timer.html` were inspected but not rewritten because they already preserve rich image/video/credits structures. Do not edit a working page merely to produce a change count.

## Static integrity validation

- Inspected `works/no-further-input-required.html`, `works/drop-flow.html`, `works/timer.html`, `works/titan.html`, `works/vaoe.html`, `works/dialogue-of-forms.html`.
- All images and internal link paths appearing in these six pages resolve to files or directory entrypoints in the current repository tree: **0 missing internal references**.
- The original NFI development capture exists as a PNG in the project record. It is explicitly *not* a screenshot of the final film.
- Drop Flow: 20 image tags / 12 unique local image assets; TIMER: 3 image tags / 2 local assets; TITAN: 4 local images, plus six externally hosted performance video references.
- New pages do not counterfeit an image for VAOE or Dialogue of Forms.
- GitHub source commits were created successfully; cloud Pages may still be publishing updates.

## Next acceptance requirements

1. Confirm GitHub Pages postdeploy workflow produced a successful `portfolio-live-health.json` report. Validate public 200 + correct content + MIME, not just source exists.
2. Visit desktop/mobile and verify line breaks, image crops, and contrast. Historic browser tabs establish an *older* page response only, not today's newly published version.
3. Request/locate exact final gallery photo or authorized finished-film still for NFI, four VAOE original videos + QR AR capture, and Dialogue of Forms exhibition stills. Keep precise author/photo/license metadata.
4. Verify MANA and Bilibili video playback from China-facing as well as international networks where relevant.
5. Review whether a featured work has a convincing **30-second visual summary + 3-minute documented case**, then adjust homepage selection before creating CV PDF 1.2.

**Release decision:** The six priority pages are more accurate and source navigable; full browser and media QA remains **open**. Do not claim formal media-rich release completion.
