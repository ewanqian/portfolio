# Portfolio Memory System

This document defines how the public `ewanqian/portfolio` repository can function as a durable external memory without turning private life or sensitive working material into public data.

## 1. Core principle

The repository is public. Therefore it stores only **public-safe professional memory**.

It should become better at answering questions such as:

- What works has Ewan Qian made or participated in?
- What was the exact credit relationship?
- Which work appeared at which event, venue, institution, or award context?
- Which records are strong enough for an Artist Bio, CV, live profile, research profile, or commercial profile?
- Which claims are verified, unresolved, or unsafe to publish?

It should not become a dump of all personal memory.

## 2. What `intake` means

`intake` is a staging state, similar to an inbox or receiving tray.

Something can enter intake when:

- a performance has just happened;
- a new project has started;
- a poster, programme, article, contract, screenshot, or link arrives;
- an old project is remembered but not yet verified;
- a role/date/title is uncertain;
- a new public claim may need to be added later.

Intake is intentionally incomplete. Its purpose is to prevent information loss before normalization.

### Public-safe intake

If the information is already public and contains no sensitive material, it may be captured in the public repository and later normalized into `database/` and `projects/`.

### Private intake

If the material contains private conversations, contact information, unreleased client information, fees, contracts, personal scheduling, health data, identification details, authentication data, or anything not intended for publication, it must stay outside Git history.

Suggested local-only ignored locations:

```text
.memory-private/
private/
inbox/private/
CURRENT.local.md
*.private.md
*.private.json
```

The public repository should record only the public-safe facts extracted from that private material when explicitly approved.

## 3. Lifecycle

Lifecycle is a maintenance state, not a public label shown on the portfolio website.

```text
intake
  ↓
researching
  ↓
verified
  ↓
public_ready
  ↓
archived
```

### `intake`
Captured but incomplete.

### `researching`
Dates, title, role, ownership, collaborators, evidence, or disclosure boundaries still need checking.

### `verified`
The factual record is supported well enough to become stable portfolio knowledge.

### `public_ready`
The record and wording are approved for use in public pages, Bio/CV generation, press materials, and public-facing AI retrieval.

### `archived`
The record remains true and searchable but is no longer an active editorial priority.

A record can be important while still not being `public_ready`.

## 4. Source hierarchy

Existing repository structure remains valid:

```text
projects/                     detailed human-readable records
database/                     canonical structured knowledge
content/                      public-ready website copy
react/src/data/generated/     generated frontend output
```

The next layer adds retrieval metadata rather than replacing the existing system.

Recommended future fields for works/nodes and related objects:

```json
{
  "lifecycle": "verified",
  "publicSafe": true,
  "creditType": "participating_creator",
  "organizationContext": "virtura",
  "bioTier": "S",
  "weights": {
    "art": 5,
    "commercial": 2,
    "live": 5,
    "research": 4,
    "education": 0,
    "media": 4
  },
  "evidenceStatus": "verified_repository",
  "publicClaim": "..."
}
```

These fields should be added gradually; do not rewrite all existing records at once.

## 5. Separate works from events

A work and an event are different objects.

Example:

```text
TIMER / 控时者                     work
2024 Hangzhou electronic music     event
ChinaGraph 2024                    award/event context
UFO Terminal Permission 2          exhibition/event
```

The database should express relationships between them rather than treating every presentation as a new independent work.

This makes questions easier to answer:

- “Where has TIMER been presented?” → follow event relations.
- “Which works are S-tier for Artist Bio?” → query work objects and credits.
- “What happened in 2024?” → query event/time objects.

## 6. Credit is a relationship

Presence in the personal portfolio does not mean sole authorship.

Prefer explicit relationships such as:

```text
solo_work
participating_creator
virtura_work
collaborative_work
commissioned_work
live_visual
av_performance
visual_direction
commercial_production
workshop
```

For team works such as TIMER / Drop Flow, public text should preserve the VIRTURA context rather than automatically converting the project into an individual work claim.

## 7. Evidence and safe claims

For important CV/Bio facts, keep three ideas separate:

1. **fact** — what happened;
2. **evidence** — why we believe it;
3. **public claim** — how it is safe and accurate to say publicly.

Example:

```text
fact:
TIMER was presented at the 2024 Hangzhou International Electronic Music Festival.

public-safe wording:
“TIMER 曾于 2024 杭州国际电子音乐节演出。”

avoid until verified:
“首演”
```

When sources conflict, mark the conflict instead of silently choosing one value.

Recommended evidence states:

```text
verified_repository
verified_official_source
user_confirmed
needs_verification
date_conflict
role_conflict
```

## 8. Weight is contextual

Do not use one universal “importance score”.

A record may have different value in different contexts:

```text
art
commercial
live
research
education
media
```

`bioTier` is an editorial shortcut:

- `S` — core Artist Bio / major identity node
- `A` — Extended Bio / Selected CV
- `B` — Full CV / Archive
- `C` — process, supporting production, low-priority historical record
- `pending` — not yet judged

Weights and tiers should be reviewed periodically, not every time a new fact arrives.

## 9. Daily / weekly / monthly maintenance

### After a new event — 2–5 minutes

Capture only the minimum useful facts:

- title
- date
- place/event
- role
- work/series relationship
- source/evidence location
- whether it is public-safe
- unresolved questions

Do not spend time deciding final prestige or writing a polished project page.

### Weekly — 15–30 minutes

Normalize recent intake:

- resolve aliases;
- connect work/event/people/venue records;
- verify roles and dates;
- extract public-safe facts from private sources when appropriate;
- mark conflicts;
- update lifecycle;
- close Issues whose facts have been absorbed into the database.

### Monthly — 30–60 minutes

Perform editorial review:

- reconsider S/A/B/C tiers;
- update contextual weights;
- identify stale public copy;
- review unresolved date/role conflicts;
- reconsider homepage/Selected Works priorities;
- check whether recent work changes the overall practice narrative.

## 10. Privacy rules for an open-source portfolio

Keep these out of the repository entirely:

- credentials and authentication secrets;
- non-public phone/address/identity/payment details;
- private medical information;
- private conversations and contact lists;
- confidential contracts and unreleased client material;
- private fee negotiations;
- personal travel/location plans before they are intended to be public;
- private research notes whose publication would create legal, safety, or relationship risks.

If a source is private but supports a public fact, store the public fact and a non-sensitive evidence descriptor rather than committing the private document itself.

Example:

```json
{
  "evidenceStatus": "user_confirmed",
  "evidenceNote": "private event correspondence reviewed; source not committed"
}
```

Do not include the private correspondence, email address, phone number, contract amount, or screenshot.

## 11. Retrieval entry point for agents

Agents should use the following order:

```text
AGENTS.md
  ↓
database/README.md
  ↓
database/works.json
  ↓
related nodes / people / venues
  ↓
projects/*.md when exact context is needed
  ↓
content/ only for already-approved public wording
```

This prevents broad GitHub keyword search from being the default memory mechanism.

## 12. Definition of success

The system is working when:

- adding a new event takes only a few minutes;
- private material does not leak into the public repository;
- team work is not rewritten as solo work;
- dates and roles are traceable;
- Bio/CV generation can filter by context and evidence;
- an agent can answer most portfolio-history questions by following stable IDs and relations instead of scanning the entire repository;
- the repository becomes easier to use as it grows rather than harder.
