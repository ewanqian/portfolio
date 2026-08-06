# ExecPlan — Unified Project Page System

## Goal

Replace individually authored and inconsistently routed project pages with a shared bilingual project record, reusable React page components, and repeatable publication checks.

The first release should make four representative records feel complete and institution-ready while preserving the site's existing black-and-white visual language.

## Current State

- The site uses React with `HashRouter` for primary navigation.
- Project information is duplicated across generated data, page components, static HTML, Markdown, and homepage arrays.
- Some Gallery links still open repository Markdown instead of public project pages.
- Some React project links use ordinary `/portfolio/projects/...` paths and fail on the Cloudflare branch preview.
- Existing dedicated React pages do not share one data contract or one section order.
- Selected Works currently includes development-state descriptions for SRE and an unpublished Mikael Lind / KASHIWA Daisuke collaboration.
- Root build assets are copied from `react/dist` for deployment, so source and generated output can drift.

## Source Documents

- `docs/portfolio-maintenance-os/project-page-standard.md`
- `docs/portfolio-maintenance-os/project-template.md`
- `docs/portfolio-maintenance-os/project-page.schema.json`
- `docs/portfolio-maintenance-os/credit-template.md`
- `docs/portfolio-maintenance-os/media-template.md`

## Files to Touch

Expected shared implementation:

- `content/projects/*.json`
- `react/src/App.jsx`
- `react/src/data/siteDisplay.js`
- `react/src/data/siteTaxonomy.js`
- `react/src/components/projects/ProjectPage.jsx`
- `react/src/components/projects/ProjectHero.jsx`
- `react/src/components/projects/ProjectFacts.jsx`
- `react/src/components/projects/ProjectMediaSequence.jsx`
- `react/src/components/projects/ProjectCredits.jsx`
- `react/src/components/projects/RelatedWorks.jsx`
- `react/src/pages/Works.jsx`
- `react/src/styles/global.css`
- `react/scripts/audit-route-contract.mjs`
- content-generation and schema-validation scripts as required

Pilot pages:

- Drop Flow
- TIMER
- TITAN / KASHIWA Daisuke
- Digital Garden

## Steps

### Milestone 1 — Route Integrity

1. Make all React routes hash-relative.
2. Keep legacy static work URLs explicit and separate from React project routes.
3. Add `npm run audit:routes` to validation.
4. Confirm the Gallery, Production, Archive, and four project entries work on a branch preview.

Done when every primary card and contact-sheet row opens a visible page rather than a blank document or repository source.

### Milestone 2 — Data Contract

1. Add a schema validator for `project-page.schema.json`.
2. Create one bilingual JSON record for each pilot page.
3. Move facts, descriptions, credits, media, and links out of page components.
4. Preserve technical and administrative notes under `technicalArchive`; do not render them automatically.

Done when the four pilot records validate and no project fact is duplicated inside a React page component.

### Milestone 3 — Shared Components

1. Build the shared project page and section components.
2. Reuse the current typography, spacing, border, and image behavior.
3. Support optional presentation history, video, and related works.
4. Allow a project-specific media module only after the shared hero, facts, copy, and credits are rendered from data.

Done when the four pilots share the same reading order while retaining distinct images and project character.

### Milestone 4 — Editorial Migration

1. Rewrite each pilot record to the copy limits in the standard.
2. Remove webpage-process language, capability lists, and development-state commentary.
3. Confirm exact authorship and collaboration credits.
4. Move SRE and the unpublished Mikael Lind collaboration out of Selected Works until their public records are complete.
5. Keep Aalto Introduction to VR in Profile / Education and Training.

Done when the Gallery reads as a curated artistic selection and Production reads as a separate professional record.

### Milestone 5 — Media and Rights

1. Select one hero and at least two supporting images per pilot.
2. Add useful alt text, caption, photographer or source credit, and rights status.
3. Remove repeated frames and images that overstate authorship.
4. Test the first viewport before and after image loading.

Done when each project establishes work, scale, and context without an unexplained blank media area.

### Milestone 6 — Responsive and Accessibility Pass

1. Check 1440px desktop, 1024px tablet, and 390px mobile widths.
2. Test keyboard navigation and visible focus from Header through project links.
3. Check heading order, link names, image alternatives, reduced motion, and text contrast.
4. Confirm Chinese and English layouts do not overflow.

Done when the full project reading path remains usable without a pointer and at 200% zoom.

### Milestone 7 — Build and Publication

Run from `react/`:

```bash
npm run lint
npm run audit:routes
npm run build
```

Run from the repository root:

```bash
node scripts/audit-public-boundary.js
node scripts/audit-portfolio-os.js
node scripts/check-asset-refs.mjs
git diff --check
```

Open the branch preview and test:

- Home → Gallery
- Gallery → each pilot project
- Project → related work
- Header → Profile / Production / Archive
- Chinese → English on each pilot

Done when source checks pass and the branch preview completes every path above.

## Risks

- Changing all project pages at once can hide credit and media regressions; use four pilots first.
- Generated content may overwrite manual edits; establish which files are generated before migration.
- GitHub Pages and Cloudflare previews use different base-path assumptions; hash-relative navigation is mandatory for React routes.
- Large committed build assets make review noisy; keep source changes and generated output clearly separated in commit messages.
- Some image rights and collaborator credits require human confirmation before publication.

## Done When

- Four pilot projects use validated records and shared components.
- Gallery, Production, Research, and Archive classification is explicit.
- No selected work links to a repository Markdown file as its main destination.
- All internal routes pass the route audit and branch-preview click test.
- Public copy contains no internal process language or inflated authorship.
- The next project can be added primarily by creating one validated record and selecting media.

## Agent Handoff Prompt

```text
Read AGENTS.md, docs/portfolio-maintenance-os/project-page-standard.md,
docs/portfolio-maintenance-os/project-template.md,
docs/portfolio-maintenance-os/project-page.schema.json, and
docs/exec-plans/project-page-system-rollout.md in full.

Implement only the next incomplete milestone. Preserve the existing visual system.
Do not rewrite unrelated pages. Before editing, report which files are generated and
which are authoritative. After editing, run every validation command named for that
milestone and provide the branch-preview paths that were manually checked.
```
