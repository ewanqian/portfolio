# Writing Catalogue Audit — 2026-11-05

## Scope and outcome

The audit began from 29 legacy metadata entries, seven with articlePath and twenty-two title/summary-only records. On the same day four additional complete Performable Music essays were added by a separate writing workflow, bringing the latest total to 33 entries, eleven with articlePath. Status and featured flags were not reliable: some metadata-only items were marked published or featured, while project roadmaps were presented as articles.

**Current result: 9 active Writing entries (7 published articles and 2 research drafts), 5 editorial rewrite candidates, 19 archived legacy metadata entries.** This is a catalogue cleanup, not deletion of works or research documentation.

The public index is generated from active metadata and requires a real article. Research proposals remain accessible under Research in Progress, but they are not Published Writing.

## A. Active — original five entries (3 published, 2 research drafts)

| Slug | Editorial class | Reason / next gate |
| --- | --- | --- |
| reactor-bpm-system-2026 | Published; selected | Complete field guide to DJ waveform, BPM Sync and Club live visual operation. Use as publication reference; fix mobile figure-to-section alignment and check every technical link. |
| scene-forge-reader-02 | Published; selected | Long-form workshop reader with exercises and Cue Sheets. Improve image evidence, mobile reading and table QA. |
| entropy-two-screen-2026 | Published; ordinary field note | Real authored live-visual project, but the short essay needs more tested engineering and screen references before featured placement. |
| performable-music | Draft / proposal | Long-term music research; project is not yet a proven performance system. |
| restage-re-executable-performance-space | Draft / long-term research | Substantial OPS specification and experimental plan; no verified full demonstrator yet. Reclassified from Published/Featured. |

## A2. Concurrent Performable Music research additions — four published essays

These records were added after the legacy 29-entry audit began. They contain substantial bodies and were preserved rather than overwritten. Their published labels record a textual publication, **not** proof that all proposed instruments or tracks already exist.

| Slug | Editorial topic | Follow-up quality review |
| --- | --- | --- |
| pm-history-of-programmable-music | Electronic music history and six changes of control | Verify primary historical citations, dates and attribution. |
| pm-seven-audiovisual-lineages | Seven artist/method case studies | Check every artist statement against source work/interview and distinguish interpretive conclusions. |
| pm-eight-instruments-sixteen-works | Composition plan for eight instruments / sixteen candidate tracks | Mark the music as proposed until audio and a listening report exist. |
| pm-human-agent-studio-reader | A reproducible human–agent music-production reader | Require tested exercises, screenshots and outputs before featured promotion. |

All four are grouped as a distinct Performable Music series on the public Writing index; none is Featured.

## B. Keep for evidence-led rewrite — five candidates

Stored in content/writings/_backlog/, NOT Published Writing. Titles below are working references, not approved article headlines.

| Source ID | Grounding | One article to write — evidence gate |
| --- | --- | --- |
| drop-flow-note | Existing Drop Flow works, project files and images | A concrete case study on how source imagery becomes a spatial/immersive composition. Requires authored visual comparisons and verified production sequence. |
| timer-not-sync | TIMER series and project documentation | How temporal structure appears in the actual work; do not write a second generic BPM essay. Use original clips, parameter examples, and annotated frames. |
| kashiwa-collab | Kashiwa / TITAN project and BO LIVE Shenzhen documentation | A collaboration and performance retrospective, with credits, input/output and verified scene captures. Merge the duplicate BO LIVE metadata. |
| ufo-terminal-testing | Existing UFO Terminal nodes, works and exhibition records | A test-based exhibition account: what was tested, what failed, how spatial decisions changed. |
| venue-screen-distance | Real stage dimensions, projection and screen adaptation experience | A practical viewing-distance and playback QA guide; merge viewer spec, rehearsal and playback-test fragments into this evidence-led work. |

**Do not turn candidates into Published by adding only a new title or abstract.** They must pass the publication gate and manual editorial QA.

## C. Archived / hidden — nineteen entries

Moved to content/writings/_archive/. Original ideas are kept for historical traceability but no longer participate in page generation.

### Internal site architecture rather than reader-facing essays (10)
- archive-redesign
- archive-vs-public-node
- content-protocol
- graph-native-structure
- nodal-organization
- portfolio-not-enough
- practice-lines-not-list
- practice-then-production
- public-nodes-not-news
- viewer-venue-spec-objects

These topics belong to repository architecture and internal editorial/process documentation, not to independent practice-research articles.

### Vague, repetitive or unverified thematic essay titles (4)
- observation-symbiosis — lacks a unique documented case
- live-collab-not-bg — overlaps Kashiwa collaboration
- timer-temporal — overlaps the retained TIMER candidate
- bo-live-debrief — overlaps Kashiwa / BO LIVE documentation

### Fragments to consolidate into practical guides (3)
- rehearsal-to-public-node
- viewer-specs-part-of-system
- viewer-test-changes-work

These should inform the retained venue-screen-distance / QA article instead of appearing as three thin notes.

### Research/project files that are NOT finished publications (2)
- next-chapters-2026 — a 2026–2027 roadmap linking Drop Flow, TIMER and HERO DOME; the underlying project plan remains in the repository
- performance-control-model — existing theoretical research source remains under research/performance-control-model; the Writing listing is hidden until grounded by concrete experiments and an editorial rewrite

## D. Publication decision rules

1. Public article = canonical Markdown file with substantive content, metadata, verified evidence, images and explanations an outsider can follow.
2. Proposal = readable research question, method, phases and current validation state, but shown only as development material.
3. Backlog = possible future article with identified authentic materials, no public navigation.
4. Archive = old title/summary, duplicate, internal site operations, or unsupported generalization. Preserve provenance and allow retrieval; never auto-publish.

The Node publication gate checks metadata and file integrity. It **cannot** certify copyright, artistic quality, factual correctness or mobile image placement. Those require an editor and browser QA.

## E. Additional QA findings

- Current MarkdownReader is a hand-rolled parser with limited Markdown features. Plan a staged move to react-markdown + remark-gfm instead of adding more parser edge cases.
- BPM's images currently live mainly in a separate aside, which moves below the entire article on narrow screens. Section-anchored figure placement is a P0 UX issue, not a copy-editing issue.
- Keep third-party show posters out of personal-publication covers unless usage rights are cleared. Prefer author-owned performance photos without dominating third-party logos.
- Latest GitHub Pages success verifies compilation/deployment, not actual responsive reading or source attribution.
