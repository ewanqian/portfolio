# 2026-11-07 · Pipeline retrospective and completion budget

## Assessment
Useful completed work: stable project/CV IDs; historical media-preservation checks; public-field projection; postdeployment identity checks; fixed JSON omission in the custom-domain artifact. Production HTTP reached 154/154. These are real deliverables but do not establish complete bilingual/PDF synchronization, rights verification or video playback.

## Pitfalls and permanent lessons
1. Four competing snapshots made “single source” an inaccurate claim. Keep object facts, approved public copy, editorial selection, generated output and release status distinct. Never describe a migration target as implemented.
2. File presence and successful build did not prove deployed availability: two JSON requests returned SPA HTML with HTTP 200. Check the actual deploy directory, parse JSON, compare IDs and test the custom domain.
3. English prose existed in released PDFs/HTML but 57 JSON fields were empty. Match archived publication by stable record URL before translating again. Preserve exact wording; language backfill is not factual re-verification.
4. New designs omitted historical video links and versions. Read older project sources and preserve scoped credits/media; compare retained links before/after.
5. Public records carried internal evidence notes. Export allowlisted display fields, keep review information in repository working records, and check visible page copy.
6. Progress reports repeated old numbers and generated new documents without closing acceptance gates. Maintain one current checkpoint; release reports are dated evidence. Update the checkpoint with actual outcomes.
7. Cloudflare/custom-domain and GitHub Pages are separate delivery paths. Verify both relevant artifacts; avoid assuming one green job covers every host.
8. Concurrent sessions modify main. Read current head, preserve unrelated commits, use expected-head fast-forward writes; do not overwrite from stale local work.
9. Avoid promising “next round” for independently executable work. Batch recovery, implementation, rendering, validation and persistence in the same session.

## Completion estimate (not a guarantee)
Scope: approved three-page bilingual CV plus public website publication pipeline; excludes full independent verification of every historical project.
- This round: recover R1.1 sources; map English by permanent ID; capture section/order selection; build data-driven web/print output; render and test as far as dependencies permit.
- Next round: close remaining layout/publication integration and full responsive acceptance; ship synchronized release if not closed this round.
- Contingency round: only for source conflicts, rendering defects or host-specific failures.
Expected total: 2–3 rounds including this one. Reduce the estimate when actual acceptance gates pass; do not manufacture extra rounds.
Full historical media/rights verification is a separate backlog and cannot be promised in a fixed number of chats.

## Definition of done
An explicit selected record-ID set generates Chinese and English web/print views; no missing bilingual fields in selected entries; both PDFs preserve three-page portrait layout, Unicode and links; build/deploy artifacts contain the actual outputs; live acceptance and release manifest agree; changes and remaining limits are recorded in START-HERE.md.
