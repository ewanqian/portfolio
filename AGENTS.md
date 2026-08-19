# Portfolio Agent Rules

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
