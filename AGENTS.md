# Portfolio Agent Rules

## Session resume and checkpoint
For “继续”, “有什么能做的”, progress/status requests or a fresh session, read [START-HERE.md](START-HERE.md) first. It is the maintenance checkpoint and task queue, not a factual database. Check newer commits and related open PRs before continuing. Follow its startup and save protocol, update task/checkpoint state after meaningful work, and verify the committed result by reading it back. Never leave the only record of unfinished work in chat. Existing factual, privacy and publication gates below still apply.

## Publication consistency amendment (2026-11-07)

- For CV release status, **use the current `content/publication-manifest-2026-11.json` and actual generated `assets/cv` PDFs**, never outdated 1.1 URLs or an old handoff excerpt. The canonical R1.2 website PDFs have confirmed 160/160 production HTTP checks; earlier static-only status is historical.
- Check `npm run audit:cv` plus `node scripts/audit-release-consistency.mjs` after updating CV data, selected IDs or any PDF link. **A Google Drive duplicate with a different SHA-256 is an alternate export, not the canonical website release**.
- Read the [lessons and stop rules](docs/portfolio-maintenance-os/RETROSPECTIVE-AND-RELEASE-RULES-2026-11-07.md) before proposing another data store, duplicate PDF design or project rewrite. Verify that a missing feature is not already implemented.

## Portfolio OS v2 — mandatory preflight (2026-11-06)

This policy supplements the existing rules below and applies to every Agent, including short one-off sessions.

1. Read [PORTFOLIO-OS-v2-architecture.md](docs/portfolio-maintenance-os/PORTFOLIO-OS-v2-architecture.md) **before** making public biography, CV, project, image, or site-wide changes.
2. Project identity still starts at `database/works.json`. Legacy identity relationships MUST be looked up in `database/identity-crosswalk-2026-11.json` and presentation variants; do not silently infer or rename a work. `database/canonical_names.json` governs public names.
3. `content/project-registry-2026-11.json` and `content/cv-records-2026-11.json` are current **publication/route snapshot registers**, not rival original-fact databases. Their links must stay stable; don't silently delete or rewrite old records.
4. `content/works/*.json` still builds the frontend through `scripts/build-content.js`. A change to the registry does NOT automatically propagate to the public React site or PDFs. Be explicit about what was and was not synchronized.
4a. **Historical source recovery first:** before rewriting a public artwork, read `projects/*.md`, `visual-arts/*`, `public/data/ewan-encyclopedia.json`, `public/data/ewan-media-index.json`, `docs/encyclopedia/claims-ledger.md` and `database/evidence-reconciliation-2026-11.json` where relevant. Inspect historical Git commits and team repositories. Preserve old links to MANA, official organizer pages, collaborator credits, and distinct performance editions. Run `npm run audit:preservation` to catch lost context. External source URLs are evidence for scoped claims, not blanket verification of individual roles.
5. **Before/after each public change:** run `npm run audit:graph` and `npm run audit:preservation`, inspect unresolved issues, check relevant pages (desktop/mobile), and confirm published GitHub Pages routes and their images. A GitHub file commit is not proof a URL works.
6. Public records must NOT expose internal agent notes, speculative award names, unreviewed collaborator claims, private assets, or unverified media rights. External search discoveries enter evidence intake, never public CV automatically.
7. When a new project or event is added, choose its correct entity: Work / Presentation / Claim-CV / Media / Source / Writing. One original artwork can have many presentations; a new performance or client commission may be distinct.
8. Prioritize the reader's decision within 30 seconds and 3 minutes. Keep complete unselected history in the archive, rather than reclassifying every job as a selected art work.


## Scope

This repo is the personal portfolio for Ewan Qian / 钱誉文.

Use it for:

- personal practice
- selected works
- personal services
- external collaboration proof
- `ewanqian.site`

Do not use it as the team frontstage. Team-facing material belongs to `VIRTURA-Collective/repo`.

## Retrieval Protocol

Before answering questions about Ewan Qian's works, exhibitions, performances, awards, collaborators, credits, CV, biography, or project history:

1. Start with `database/README.md` to understand the source-of-truth hierarchy.
2. Search `database/works.json` by canonical id, title, alias, collaborator, venue, or related node.
3. Follow `relatedNodeIds`, `collaboratorIds`, `venueId`, `sourceDocs`, and other relation fields instead of inferring relationships from prose.
4. Read the relevant `projects/*.md` source document when exact dates, roles, production details, or chronology are needed.
5. Use `content/` only for public-ready copy; do not treat generated frontend files as factual sources.
6. Preserve credit boundaries. A work appearing in the personal portfolio does not automatically mean it is a solo work.
7. If sources conflict, report the conflict or use an explicitly verified public-safe wording. Do not silently choose the more impressive claim.
8. Prefer a short verified claim over a stronger but unsupported claim.

## Public Repository Privacy Boundary

This repository is open source and public.

Never commit or reproduce in tracked files:

- passwords, API keys, access tokens, private keys, recovery codes, or authentication material
- private home addresses, personal phone numbers, identity-document numbers, bank/payment details, private medical information
- private contracts, unreleased client information, private conversations, private contact lists, or material shared under confidentiality
- personal planning notes that are not intended to become public portfolio history

Sensitive intake belongs outside Git history in local-only ignored paths such as `.memory-private/`, `private/`, `inbox/private/`, or `CURRENT.local.md`.

A `.gitignore` rule is preventive, not retroactive: if sensitive material has already been committed, remove it from history as appropriate and rotate/revoke any exposed credential.

## Intake Rule

`intake` means an unverified staging record: something happened or a source arrived, but it has not yet been normalized into the portfolio database.

Use two lanes:

- **Public-safe intake**: may enter tracked project/database files after checking credits, dates, evidence, and disclosure boundaries.
- **Private intake**: stays local-only and ignored until the user explicitly decides which facts, if any, can become public.

Do not create a public GitHub Issue merely to remember private or uncertain personal information.

## Lifecycle

Use lifecycle as an editorial/data status, not as public-facing prose:

- `intake`: captured, not yet normalized
- `researching`: relationships / dates / credits still being checked
- `verified`: factual record is sufficiently supported
- `public_ready`: wording and disclosure boundary are approved for public use
- `archived`: retained for history but not an active public priority

`public_ready` is the only status that should be assumed safe for automatic Bio/CV/public copy generation.

## Final Quality Gate

Final portfolio pages must read as complete public copy.

Before treating HTML, Markdown, project pages, bios, or service pages as final, run:

`python3 /Users/ewanqian/.codex/skills/virtura-final-quality-gate/scripts/final_quality_gate.py <paths>`

This is an **optional local extension path**, not a portable command: if unavailable on the agent's machine, report that limitation and run the repository-native gates (`npm run audit:graph`, `npm run audit:portfolio-os`, build checks, and actual browser checks). Never claim the local private skill ran when it did not.

Final pages must not include:

- draft / review / approval language
- proof / evidence / source-path language
- TODO / needs / fix / verify language
- "if you want to read..." instructions
- internal boundary warnings

Put working notes in workspace docs or cache, not in final portfolio pages.

## Boundary

- Kashiwa / TITAN stays personal / external collaboration context.
- VIRTURA team identity links outward; it does not replace the personal portfolio voice.
- Portfolio can link to Collective, SpacePort, and Newsroom through finished navigation, not long process explanations.
