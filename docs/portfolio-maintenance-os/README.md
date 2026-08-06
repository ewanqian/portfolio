# Portfolio Maintenance OS v1

This folder defines the working system for maintaining the portfolio as a long-term public archive.

## Purpose

The portfolio has four public layers:

| Layer | Role |
| --- | --- |
| Gallery | Selected artworks and public artistic projects. |
| Production | Stage, event, commercial, delivery, and collaboration records. |
| Spatial | Gaussian Splat, spatial preservation, XR, and web-embedded spatial samples. |
| Writing | Essays, methods, project histories, and long-form narrative. |

## Working Rule

Every project should move through the same path:

1. Project record
2. Credit boundary check
3. Media selection
4. Case page or archive row
5. Language pass
6. Build and route check

## File Map

| File | Use |
| --- | --- |
| `project-page-standard.md` | Editorial, visual, routing, and classification standard. |
| `project-template.md` | Human authoring template for one project record. |
| `project-page.schema.json` | Machine-readable contract for project data. |
| `media-template.md` | Image and video selection rules. |
| `credit-template.md` | Credit and role-writing rules. |
| `publish-checklist.md` | Final check before committing or pushing. |
| `case-register.md` | Current case status and next additions. |
| `yujiayun-45m2-case-manifest.md` | First complete production-case manifest. |
| `external-source-approval.md` | Review flow for web-found sources before public use. |
| `roadmap.md` | Next targets and maintenance rhythm. |
| `../exec-plans/project-page-system-rollout.md` | Milestones and validation for the shared project-page system. |

## Public / Local Boundary

Use tracked repository files for public-safe project records and reusable templates.

Use `.codex-local/` for private notes, scores, rejected images, raw paths, temporary research, and sensitive production details. `.codex-local/` is ignored by Git.

## Current Pilot Case

The first complete production-case example is:

- `projects/yujiayun-45ping-visual-2025.md`
- `visual-arts/45m2-ningbo/README.md`
- `react/src/pages/YuJiayun45m2.jsx`
- `assets/yujiayun-45ping/`

The pilot case is tracked in `yujiayun-45m2-case-manifest.md`.
