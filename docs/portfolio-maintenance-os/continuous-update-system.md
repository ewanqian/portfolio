# Continuous Update System / 持续更新系统

Last updated: 2026-10-25

## 1. Purpose

The portfolio needs two different behaviours at the same time:

1. the public site must stay selective and finished;
2. the repository must stay alive while research, performances, workshops and projects continue changing.

This document defines the bridge between those two states.

The system is not an automatic publishing pipeline. It is a controlled promotion pipeline.

```text
ACTIVE WORK
↓
DOCUMENTATION
↓
PUBLIC-SAFE EVIDENCE
↓
CASE STUDY
↓
SELECTED WORK
```

## 2. Lifecycle

Use the following lifecycle in `database/active_practice.json`.

### `active-research`

Use when the project is still being designed, coded, rehearsed or tested.

Allowed surfaces:

- research/
- projects/
- Issues
- `NOW.md`
- `database/active_practice.json`

Not allowed by default:

- homepage Selected Works
- canonical completed CV claims

### `documented`

Use when meaningful work has happened and enough internal evidence exists to describe the project accurately.

Required minimum:

- stable working title or canonical id;
- current status;
- authorship / role boundary;
- evidence source;
- explicit next gate.

This still does not mean the project is ready for public Works.

### `public-safe`

Use when the material can be discussed publicly without unresolved credit, rights or factual blockers.

Required minimum:

- public-safe title;
- date / venue / institution, or a clearly marked research status;
- exact Ewan role;
- collaboration / team boundary;
- at least one public-safe evidence item;
- no unresolved rights blocker for the material being shown.

This state can feed the rolling CV, Archive or Research pages.

### `case-study-ready`

Use when the project is strong enough to support an independent public project page.

Required minimum:

- concise Chinese and English summaries;
- 3–8 strong images or equivalent video / interactive evidence;
- stable credits;
- clear context, role and outcome;
- complete page structure;
- process material separated from final public documentation.

### `selected-work`

Use only when the project deserves homepage-level attention.

Additional requirements:

- strong final documentation;
- clear public outcome;
- complete project page;
- high visual quality;
- enough curatorial importance to displace an existing Selected Work.

Being new, technically difficult or currently important is not enough.

## 3. Layer responsibilities

### `NOW.md`

Human-readable answer to:

> What is Ewan actively developing now?

Keep it concise and public-safe. It may include unfinished research if the status is explicit.

### `database/active_practice.json`

Machine-readable active-state registry.

Each record should maintain, where applicable:

```text
id
title
type
status
publicVisibility
homepageEligible
practiceLine
date / targetDate
venue
role
summary
evidenceStatus
nextGate
sourceRefs / issue
lastReviewedAt
```

`homepageEligible` must never be inferred only from recency.

### `docs/bio/2026-rolling-cv.md`

Staging area for current-year CV entries.

It separates:

- repository-verified entries;
- user-confirmed entries still needing repository evidence;
- completed practice that still needs packaging;
- future / active research that must not be written as completed.

### Canonical CV / Bio

Only stable, evidence-supported entries graduate here.

Canonical public biography and CV should not need to describe every active research line.

### `content/`

Public frontend content source.

Only move an active project into `content/works` or equivalent public content once the project is stable enough for the intended public surface.

### Homepage Selected Works

This is the strictest layer.

It remains a small curated set. New active work does not automatically append to it.

## 4. Update triggers

Review the active registry when one of these happens:

1. a public performance, exhibition, screening or workshop is completed;
2. a project receives a stable canonical title;
3. final credits or authorship boundaries are confirmed;
4. 3–8 strong documentation images arrive;
5. a public video / article / official event page becomes available;
6. rights or publication restrictions are resolved;
7. a research prototype becomes a repeatable working system;
8. a planned date passes and its status must be corrected from `target` to `completed`, `postponed` or `cancelled`;
9. a CV, press kit, application or major website release is being prepared.

## 5. Evidence rule

Never promote a project by smoothing over missing facts.

Before a public Works entry, verify:

- canonical title;
- date / venue / research status;
- Ewan's exact role;
- authorship / team relationship;
- public-safe media;
- evidence source;
- rights / credit status;
- concise bilingual summary.

If a field is unresolved, keep the project in active / research / archive and write the uncertainty explicitly.

## 6. Future-date rule

A future target is not a completed CV credit.

Example:

```text
Stage Casting 04
Target: 2026-12-04
Status: active research
```

Until the event actually happens and evidence exists, it must not be phrased as a completed performance.

After the target date, explicitly update the record to one of:

- completed;
- postponed;
- cancelled;
- research continued without public presentation.

Do not leave a past target date silently labelled as upcoming.

## 7. Public homepage guardrail

The current homepage policy remains:

```text
TITAN
Drop Flow / 滴流
TIMER / 控时者
Digital Garden
```

A new project only enters Selected Works after a curatorial comparison with the existing set.

Research and prototypes belong in `NOW`, Research, Archive or Writing until they earn promotion.

## 8. Suggested maintenance rhythm

### After every public event

Within the next repository update:

- record exact date / venue / role;
- add evidence links;
- set `evidenceStatus`;
- define `nextGate`;
- decide whether the item belongs in rolling CV.

### Monthly

Do a short maintenance pass:

- check future dates that have passed;
- review `active_practice.json`;
- promote evidence-ready entries;
- demote or archive abandoned prototypes;
- merge duplicate project names / aliases;
- update `NOW.md` so it does not become stale.

### Before major applications / press / portfolio releases

- review the rolling CV;
- resolve the highest-value evidence gaps first;
- generate the application-specific selection from verified records;
- do not expand the homepage merely because the CV expanded.

## 9. Issue governance

Use Issue #86 as the continuing operational maintenance tracker.

Use Issue #87 as the current 2026 CV evidence queue while it remains useful.

Existing deeper systems remain where they already belong:

- #43 — project tier / contextual weighting;
- #44 — Bio / CV retrieval index;
- #23 — media / text completeness;
- project-specific research issues for actual R&D.

Avoid creating a new policy issue for every small update. Once a rule is encoded in repository documentation, close redundant policy-only issues.

## 10. Main principle

> The repository can be alive without making the homepage look unfinished.

Keep active work visible to the system, but make public prominence something a project has to earn through evidence, completion and curatorial importance.
