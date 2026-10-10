# Spatial Capture Infrastructure Upgrade: Gaussian Scenes → Research Archive & Service Platform

## Intended outcome

Evolve the current Gaussian Scenes page into a durable spatial-capture practice: a public research archive with selected, viewable scenes and a clear route for future professional services, workshops, and spatial-computing experiments.

## Starting point

- PR #27 cleans up the existing Gaussian Scenes page and documents the current capture-to-reconstruction workflow.
- The public archive currently contains five documented SuperSplat scenes.
- Zhengzhou Ersha remains a workflow/practice note until public-facing scene material, credits, and permissions are confirmed.

## Workstreams

### 1. Scene archive and asset protocol

- Define a public-safe metadata record for each scene: title, location, date, capture method, reconstruction method, author/credit, permissions, viewer URL, and downloadable-asset status.
- Establish an ingest path for 360° source capture, equirectangular conversion, frame sampling, reconstruction, Gaussian export, SuperSplat publishing, and archival storage.
- Keep private source files, unapproved imagery, raw paths, and production notes outside the public repository.

### 2. Public scene library

- Add a browsable index with stable scene records and explicit public/archival status.
- Support SuperSplat viewing where public assets are approved.
- Define a release checklist for PLY / Gaussian downloads, including copyright, contributor credit, license, and file-hosting decisions.

### 3. Services and learning

- Define public-facing offerings for spatial documentation, Gaussian reconstruction, and web viewing without overclaiming unavailable capacity.
- Build a reusable workshop format around capture, reconstruction, and publication.
- Document client handoff standards: source ownership, approved assets, viewers, downloadable files, credits, licenses, and long-term hosting.

### 4. Spatial-computing R&D

- Evaluate Vision Pro and related spatial-computing delivery paths only after the web archive and rights model are stable.
- Track compatibility, performance, viewer UX, and device-specific presentation requirements as separate experiments.

## Acceptance checks for the first milestone

- [ ] Public metadata schema and asset-release checklist are documented.
- [ ] At least one scene record is complete end-to-end, including credits and publication status.
- [ ] The archive separates public viewer assets from private capture and production material.
- [ ] A follow-on Issue or PR is created for each independently deliverable workstream.

## Related work

- Related PR: #27
