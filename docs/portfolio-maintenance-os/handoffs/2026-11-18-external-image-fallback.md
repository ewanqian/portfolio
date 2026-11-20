# External image failure handling · 2026-11-18

Status: draft source change only; not merged or deployed.

## Scope
Base: e651c5764a08be0cad122fc9447b14b67c025649. Branch: fix/virtura-image-failure-fallback.
Open PRs were checked before implementation; no competing image fallback change was found.

Two selected-work covers and the SYSTEM / ERSHA and China AI Gala detail-page images now hide their broken-image rendering on decode/network failure. Existing frames, image URLs, alt text, project links, descriptions and credits remain unchanged. Successful image loads restore visibility; changed sources are not held in the previous failed state. No replacement artwork, remote binary, rights claim, or team-site change is included.

## Validation
- React production build: passed.
- Graph audit before and after: zero errors; 58 existing warnings.
- Archive preservation before and after: 14 rules, zero missing facts/links.
- Portfolio OS audit: passed.
- Targeted ESLint: passed.
- Local React/DOM event test: passed initial rendering, error hiding, changed source, repeated error, load recovery, unchanged alt text.
- Added repeatable Playwright regression for three routes at 1440px/390px with HTTP-200 HTML, network failure and valid mocked image responses. Not completed here: Chromium could not launch because the environment denied socket creation, including the reviewed retry. Desktop/mobile visual QA remains pending.
- Live source check: the two original cover URLs returned HTTP 200 with text/html maintenance content, not image bytes. Production has not received this patch.
- Optional private-machine quality gate unavailable; native gates used instead.

## Next / rollback
Run scripts/test-virtura-image-fallback.mjs against the built local React preview using Playwright in a browser-capable environment. Review the neutral empty frames, including both languages. Merge and deployment require separate review; confirm production after deployment.
Local image copies remain out of scope until asset-specific reuse permission and required photographer/owner credits are confirmed. Existing public availability is not a license.
Rollback: revert this isolated source change. No data migration or external action occurred.
