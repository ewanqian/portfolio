# Portfolio Site State OS — agent handoff and evidence contract

> Repository: `ewanqian/portfolio`  
> Working PR: [#112](https://github.com/ewanqian/portfolio/pull/112)  
> Baseline: 2026-11-04, from latest `main`. **Do not merge without a separate human release decision.**

## Purpose

Maintain a verifiable inventory of **every page, link, clickable UI surface, media file, crop, size, visible state and project claim** on the public portfolio, not only a handful of pretty homepage screenshots. Preserve original files and their credits. No new top-level section or architecture redesign.

Evidence store:
- `docs/media-intake/browser-qa-2026-11.json` — Chromium-rendered route/image/link measurements, CI artifact
- `docs/portfolio-maintenance-os/site-state/summary.json` — aggregate machine status
- `docs/portfolio-maintenance-os/site-state/clickable-links.csv` — every page-language-viewport anchor occurrence
- `docs/portfolio-maintenance-os/site-state/unique-link-targets.csv` — deduplicated destinations with classification
- `docs/portfolio-maintenance-os/site-state/media-geometry.csv` — intrinsic and rendered dimensions, image ratio, object-fit
- `docs/portfolio-maintenance-os/site-state/responsive-layout.csv` — viewport overflow and controls
- `docs/portfolio-maintenance-os/site-state/editorial-content.csv` — verified project and workshop counts
- `docs/portfolio-maintenance-os/site-state/findings.csv` — triaged errors and editorial review flags
- `docs/media-intake/motion-audit-2026-10.csv` — source media metadata/hashes
- `docs/media-intake/qa-screenshots/` — fixed-viewport screenshot evidence

## Independent workstreams (assign to parallel local agents)

| Workstream | Responsibility | Machine evidence | Required local/human check | Exit gate |
| --- | --- | --- | --- | --- |
| A — LINK & NAVIGATION | Every anchor, CTA, card, header/footer menu, workshop links, project↔project relationships, no-op and redirect targets | `clickable-links.csv` and `unique-link-targets.csv`, CDP route scan | Physically click visible controls in desktop Chromium + Safari; assess redirects and target contents, not HTTP 200 alone | Every internal link ends at the intended page/section; no P0 failures |
| B — MEDIA & ART DIRECTION | Every thumb/hero/gallery/media reference, source format/dimensions/ratio, crop/focus, photo/visual credibility | `media-geometry.csv`, `motion-audit-2026-10.csv`, contact sheets | Inspect original composition versus rendered crop; decide which performance photograph represents large LED projects; image usage rights/credits | No decode errors, accidental stretch/crop, wrong cover, distorted faces/stages or lost image provenance |
| C — RESPONSIVE & ACCESSIBILITY | Desktop/mobile sizing, overflow, clipped text, gestures, nav drawer, touch targets, EN/ZH readability and reduced motion | `responsive-layout.csv`, screenshots, CDP control dimensions | macOS Safari + iPhone Safari and Android Chrome (or real device), menu taps, orientation change, font rendering | No horizontal overflow/hidden CTA/readability failure; min tap target reviews resolved |
| D — CONTENT & EVIDENCE | 8–10 honest work entries, Home 4, workshop discoverability, project completeness and captions; enforce no proposal as presented | `editorial-content.csv`, October ledger, Issues #93/#96/#100 | Review credits, contract/permission, actual photographs, user authorship and event status | Editorial and rights approval before moving proposed cases into public Work |
| E — RUNTIME / CROSS-BROWSER | React build, MP4 autoplay/mute/loop, AVIF original, resource HTTP/MIME/cache, Browser console and Cloudflare/GitHub Pages deployment | GitHub Actions build, browser QA logs, ffprobe, deployed URL measurements | Safari macOS/iOS and Firefox playback; production domain + `/portfolio` compatibility, cache/incognito | Verified media playback and link navigation at the exact public origin |

**Parallelism rule:** A–E use separate changesets and evidence ledgers; no agent may rewrite another lane's accepted data without explicit reconciliation. Current `Promise.allSettled` audit lanes are automated concurrent checks, **not** claimed human or LLM agents. The local operator can assign lanes concurrently via their agent/harness environment and combine findings in PR #112.

## Status definitions

- `PASS`: actually executed against specified source SHA, browser, viewport and origin; evidence saved.
- `SOURCE VERIFIED`: source path exists or SPA route declaration matches; **not** an actual click/redirect test.
- `REVIEW`: observed technical condition requiring visual/editorial judgement (e.g. `object-fit: cover` with substantial crop).
- `FAIL`: observed failure with source/route and reproducible evidence.
- `NOT RUN`: no valid execution evidence (especially external targets, production domain, Safari/Firefox).
- `BLOCKED`: requires original file, rights, media provenance, credentials or local real device.

## Severity

- P0: dead critical CTA, malformed/missing route, broken key cover, image distortion `object-fit: fill`, false project claim, security/privacy leak.
- P1: mobile horizontal overflow, link leads to wrong content, motion inaccessible, missing workshop or project public entry, contact page impossible to find.
- P2: cramped targets, intentional crops needing editorial sign-off, secondary document cleanup, redundant labels.

## Acceptance protocol

1. Record `repository/ref/commit_SHA`, exact URL origin, browser version, viewport, language, screenshots and timestamps.
2. Regenerate site-state CSV via:
   `cd react && npm ci && npm run build`, then `npm run preview -- --host 127.0.0.1 --port 4173`; from root: `node scripts/audit-portfolio-browser.mjs && node scripts/compile-portfolio-site-state.mjs`.
3. Open every `P0` and `P1` row in an issue/commit with reproduction, expected behaviour, owner and verification.
4. A source path returning HTTP 200 with the SPA shell is **not** sufficient to establish that a standalone page exists.
5. Open all images, identify stage/LED screen proportions, inspect screenshot against the source. Document intentional `cover` crops; never alter native image canvas just to satisfy a card ratio.
6. Reject unsupported performer credits, audience counts, non-public materials, and proposed workshops represented as completed events.
7. Only mark passing results from a fresh run on the PR head SHA. Preserve all `NOT RUN` items.
8. Review latest main before merging; do not force-push old editorial branch, use independent PRs and inspect changes.

## Known manual blockers

- Safari, iOS Safari, Firefox and real touch-device check: NOT RUN.
- External URL reachability and *semantic destination* checks: NOT RUN unless a separate link verifier actually hits target.
- Image rights/credits, venue/client release permissions: requires human sign-off.
- Actual deployed `ewanqian.site` and GitHub Pages compatibility/caching: NOT RUN.
- One Cloudflare-sized `MKE.pdf` is skipped from production copied assets.
- Public-boundary audit remains advisory/failing and must be handled as its own cleanup.
- The `current-edition` workshop record labeled 2026-08-29 is now historical; verify correction against canonical public naming rather than blindly updating dates.
- Home `href="#works"` on HashRouter is a candidate anchor/navigation conflict; requires click test.

## Local agent exact task prompts

**A:** “Read the site-state unique links CSV and all clickable-link occurrences. Test each visible control using Playwright or browser automation on localhost and production; verify the resulting page heading and destination, not only status 200. Submit a row-level patch and screenshot for each failure. Do not alter architecture.”

**B:** “Read media geometry CSV and originals. Make contact sheets for each large-screen performance (TITAN, Drop Flow, TIMER and other verified cases); review all 16:9, 2.35:1, panoramic LED and portrait crops. Flag stretching, subject clipping, wrong photo attribution and insufficient resolution. Preserve source files.”

**C:** “At 390×844, 375×812, 768×1024, 1440×900 and a real iPhone/Safari, test all navigation and project pages in both languages. Record horizontal scroll, text clipping, overlapping layers, menu behavior, touch targets and reduced motion, with before/after screenshots.”

**D:** “Validate every proposed Work entry against `content/works/*.json`, historical credits and source event evidence. Confirm whether at least 8–10 entries truly meet publication standards; keep unverified cases in Archive, do not write future proposals as completed. Check that completed Stage Replica and earlier Minimal Input workshops are easy to find.”

**E:** “Build the PR commit, check standalone static HTML paths, hash routes, asset MIME and 404/SPA rewrites at both origins; test Digital Garden H264 autoplay and Safari/Firefox, cache behavior and Cloudflare size exclusions. Mark unavailable environments NOT RUN.”

### Current publication decision
Keep PR #112 as **Draft** until P0/P1 are closed, external resources and rights verified, and preview vs actual production differences are assessed.
