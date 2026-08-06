# Ewan Qian Portfolio — Project Page Standard

## Purpose

This document defines the durable public structure for project pages on `ewanqian.site`. It is designed for repeated use by a local Agent without turning the site into a generic template library.

The system separates stable project facts from page layout. A project record should be reusable across Gallery, Profile, Archive, related-work modules, and future exports without rewriting the same biography or project description in several places.

## Editorial Position

The personal site presents an artistic practice first. It may include commissioned and production work, but those records enter a clearly labeled Production section.

The first screen of an artwork page should answer four questions:

1. What is the work?
2. What does the audience encounter?
3. Where and when did it take place?
4. Who made it, and what was Ewan Qian's role?

Software and technical workflow are secondary information. They belong in a short technical note, a process archive, or a separate repository link when they materially help readers understand the work.

## Reference Research

The standard draws on four useful patterns from official artist, studio, and digital-art archive pages:

### United Visual Artists

UVA project pages establish title, location, year, commission or collaboration context, a concise account of the audience experience, image sequences, and image credits. The technology is mentioned only when it explains the behavior of the work.

- https://www.uva.co.uk/features/aether
- https://www.uva.co.uk/features/great-animal-orchestra-cartier-foundation

### Ryoji Ikeda / Forma

The Forma project page for `the transfinite` is economical: a short experiential description, premiere information, a strong image sequence, and credits. It demonstrates that institutional clarity does not require a long explanatory essay.

- https://forma.org.uk/projects/the-transfinite

### Refik Anadol Studio

The studio's project records consistently expose category, location, date, work description, presentation context, media, and credits. The valuable lesson is the metadata discipline; Ewan Qian's pages should use substantially shorter prose.

- https://refikanadol.com/works/machine-hallucinations-sphere/
- https://refikanadol.com/works/data-crystal-osu/

### Rhizome ArtBase

Rhizome separates descriptive metadata, administrative information, and technical preservation metadata. It also distinguishes the artwork from its different accessible variants. This is especially useful for realtime, web-based, and spatial work that may have live, recorded, archived, and emulated forms.

- https://artbase.rhizome.org/wiki/User_Guide
- https://archive.rhizome.org/artbase/preserving-the-rhizome-artbase-richard-rinehart/

## Page Sequence

Every finished project page uses this sequence unless the media itself requires a justified exception.

### 1. Hero

- One strong image or video still.
- Project title.
- Year, city / venue, format, and authorship label.
- One-line summary.
- Avoid a large wall of copy above the first image.

### 2. Work Description

- 80–140 words per language.
- Begin with the work's central situation or perceptual question.
- Describe what changes over time and what the audience encounters.
- Establish whether the work is an installation, live performance, screen work, web work, or a series.

### 3. Image Sequence

Use three kinds of evidence in a deliberate order:

1. orientation — the whole venue, screen, installation, or performance;
2. experience — a view that communicates scale, duration, or the audience position;
3. detail — image texture, material, interface, scan, or spatial relationship.

Do not fill a gallery with several visually equivalent frames.

### 4. Spatial / Audiovisual Logic

Explain the minimum necessary system behavior: the relationship between sound and image, screen arrangement, audience position, realtime response, duration, or site-specific constraint.

This section should not read as a software capability list.

### 5. Role and Credits

Keep authorship visible and calm. For collaboration pages, credits are part of the main reading path, not a disclaimer hidden at the bottom.

### 6. Presentation History and Links

Use verified public links. A GitHub Markdown file can support an archive, but it should not be the primary visitor-facing destination for a selected work.

### 7. Related Works

Show two or three related works based on practice line, series, or shared collaborator. Do not use a generic chronological carousel.

## Five Page Types

### Personal Artwork

Emphasize the artistic question, audience experience, spatial or temporal structure, and presentation history. Technology appears only as part of the material conditions.

### Collaborative Artwork

State all principal collaborators in the hero metadata. Explain the shared project context and Ewan Qian's role without reducing the page to a production case study.

### Production Case

Place only in Production. State the client or event, visual direction, Ewan Qian's scope, screen conditions, and delivered outputs. Do not mix it into Gallery simply because the final images are visually strong.

### Research / Prototype

State the question, method, current public outcome, and relation to a larger practice line. Research that has not reached a coherent public form belongs in Archive rather than Selected Works.

### Workshop / Public Program

State the institution, audience, teaching or facilitation role, learning structure, and public outcome. It belongs in Profile or Archive unless the workshop itself is an artwork.

## Current Portfolio Classification

The next migration should use the following working classification:

| Project | Section | Page type | Priority | Editorial note |
| --- | --- | --- | --- | --- |
| Drop Flow | Gallery | Collaborative artwork / long-term series | Pilot | Clarify versions and full collaboration credits. |
| TIMER | Gallery | Collaborative artwork / long-term series | Pilot | Separate the series from the `Loading Permission 2` presentation. |
| TITAN / KASHIWA Daisuke | Gallery | Collaborative artwork | Pilot | Keep exact live-visual responsibility and all major music credits. |
| Ether Fragment | Gallery | Personal artwork | Pilot candidate | Strengthen installation context and image sequence. |
| Dérive: A Tale of Two Cities | Gallery or Research | Spatial research artwork | Second pass | Clarify the public outcome before promotion. |
| SRE Realtime Liveset | Research / Archive | Collaborative realtime system | Second pass | Remove development-state language before Gallery placement. |
| Mikael Lind × KASHIWA Daisuke | Research / Archive | Collaboration in development | Hold | Do not foreground an unpublished track or internal workflow. |
| Digital Garden | Production | Production case | Pilot | Strong existing facts and media; keep visual direction credit. |
| Yu Jiayun 45㎡ | Production | Production case | Pilot | Preserve delivery and visual-direction boundaries. |
| Rain / SINGLAND | Production | Production case | Second pass | Use conservative image and artist-portrait rights. |
| Aalto Introduction to VR | Profile / Archive | Education and training | Complete | Keep as a two-week course, not a degree or artwork. |

## Copy Limits

Recommended maximum public copy per project:

- one-line summary: 35–65 Chinese characters / 18–35 English words;
- main description: 80–140 words per language;
- spatial or audiovisual note: 50–100 words per language;
- role statement: 35–80 words per language;
- image caption: one sentence;
- technical note: 3–6 facts, only when necessary.

Remove these patterns from public copy:

- descriptions of what the webpage is trying to do;
- statements about the current build, future completion, or testing state;
- software lists used as proof of artistic value;
- claims that a system is scalable, efficient, or deliverable without an artistic reason;
- process history that belongs in repository notes;
- repeated restatements of the title, venue, and role.

## Data and Page Architecture

Use one structured project record as the source of truth. Components should render the record; pages should not duplicate facts in several arrays and paragraphs.

Recommended structure:

```text
content/projects/{slug}.json
react/src/components/projects/ProjectPage.jsx
react/src/components/projects/ProjectHero.jsx
react/src/components/projects/ProjectFacts.jsx
react/src/components/projects/ProjectMediaSequence.jsx
react/src/components/projects/ProjectCredits.jsx
react/src/components/projects/RelatedWorks.jsx
```

The JSON record follows `project-page.schema.json`. Exceptional installations may add a dedicated visual component, but facts, credits, links, and bilingual copy still come from the shared record.

## Routing Contract

The React site uses `HashRouter`.

- React navigation uses `#/works`, `#/profile`, and `#/projects/{slug}`.
- Static legacy pages may remain at `/portfolio/works/{file}.html` during migration.
- No selected work may link directly to a local Markdown source.
- Cloudflare branch previews and the primary domain must resolve the same project entry.
- Run `npm run audit:routes` before building.

## Definition of a Finished Project Page

A page is finished when:

- its section and authorship are accurate;
- its hero, title, and one-line summary establish the work immediately;
- it contains a coherent image sequence rather than an asset dump;
- Chinese and English records have equivalent meaning;
- roles, collaborators, commissioners, and image credits are present;
- its main visitor link opens on both the branch preview and primary domain;
- no internal writing, unpublished material, or uncertain credit appears publicly;
- mobile layout, keyboard focus, image loading, and reduced-motion behavior have been checked.
