# Publication System v1 — Stable Quality Without a Second Website

**Goal:** publish complete, readable performance research from real source material, while preserving future proposals and archival traceability.

## Recommended stack after researching official project documentation

| Component | Use | Adoption decision |
| --- | --- | --- |
| react-markdown + remark-gfm | CommonMark/GFM rendering; links, tables, media, and custom React element mappings | **P0 next technical migration.** Replace the bespoke MarkdownReader after visual regression coverage. |
| Markdoc (Stripe) | Stronger document syntax and validation, custom figures and notes | Evaluate in a small branch only if Markdown figure manifests become unmanageable. Do not force it on all writing. |
| Astro Starlight | Automatic sidebars, search, accessible docs layouts, multilingual docs | Borrow UX patterns; not a site migration. |
| Docusaurus MDX | Technical manuals, live React components, docs versioning | Not worth duplicating the portfolio renderer yet; a secondary handbook site can be considered if volumes demand it. |

Official references:
- https://github.com/remarkjs/react-markdown
- https://github.com/remarkjs/remark-gfm
- https://markdoc.dev/docs/overview
- https://starlight.astro.build/guides/sidebar/
- https://docusaurus.io/docs

**Principle:** content is authored as Markdown and media manifests; interactive components are reusable, optional, and never the only way to understand a claim.

## Proposed reusable React reading components

1. **ArticleFigure** — image, alt text, caption, owner, source, display width; anchored to a heading or paragraph, not a page-wide end gallery.
2. **StagePlot** — source-backed stage geometry and screen measurements, with units and exportable static fallback.
3. **TimeAxis** — chronological historical cases with project/creator/date, a real source URL, operating mechanism, and why it helps this article.
4. **SignalFlow** — labelled inputs, transforms, outputs and operator actions. Use data, not a screenshot of a fake node graph.
5. **ProcessCompare** — one observable before/after or method A/B comparison; every image retains its native aspect ratio.
6. **SOPAccordion** — steps, prerequisites, expected result and test. Must be readable without opening unrelated sections.
7. **ReferenceList** — source title, author, publication date, URL, role (primary project, manual, interview or reporting).
8. **TermNote** — a concise first-use term definition, avoiding entire separate glossary pages.
9. **PublicationCardExport** — reproducible 9 × 1:1 image layout from the same source text and figure register, without regenerated pictures.

Avoid a new micro-site for every essay. A single article can use none, one or several of these components.

## Stable publication production

**Stage 0 — Sources:** link to canonical work, video / images, operations logs and actual reference research.

**Stage 1 — Editorial brief:** define the reader, question, one-sentence contribution and 3–7-section narrative spine. Record what the text will not cover.

**Stage 2 — Draft:** plain Markdown that remains useful without images. Explain terms only at first use. Move specialist training and extra devices into appendix when not central.

**Stage 3 — Figure register:** for each visual, record exact asset file, rights owner, provenance, section anchor, alt and caption. The mobile view places the figure next to that section; desktop may show it in a contextual rail.

**Stage 4 — Evidence:** historical/technical claims use verified project-team/official docs; clearly distinguish firsthand observations from independently sourced examples.

**Stage 5 — Review:** run Node catalogue gate, review text, verify links, inspect desktop and mobile 390/768/1280px, confirm media fit and attributions.

**Stage 6 — Publication:** source PR, Vite build, compiled-site PR if required by this repository, then GitHub Pages release verification.

**Stage 7 — Reuse:** archive source notes, create a 9-card derivative and bilingual abstract where helpful. A social image set is an edition of the publication, not a second canonical article.

## Acceptance checklist

- [ ] Specific and useful question in the introduction
- [ ] One main idea per section; concrete operations before abstract theory
- [ ] Full canonical Markdown, not title and summary only
- [ ] Images placed near their claims on mobile
- [ ] Source and rights recorded for each image
- [ ] Claims backed by credible primary documentation or identified as personal observations
- [ ] Keyboard/mouse path works before extra hardware recommendations
- [ ] SOP has a visible result, failure/recovery step and setup assumptions
- [ ] Technical build/metadata validation passed
- [ ] Visual QA checked in actual browser (not inferred from CI)

The automated gate intentionally covers objective publication hygiene only. It does not assign a pretend artistic-quality score.
