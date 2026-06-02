# Portfolio Roadmap

## Next Stable Target

Build the portfolio into a maintained public system with four stable public paths:

- Gallery: selected artworks and artistic projects.
- Production: stage, event, delivery, and collaboration records.
- Spatial: Gaussian Splat, XR, web embeds, and spatial preservation.
- Writing: long-form essays, methods, and project histories.

## P0

| Work | Why |
| --- | --- |
| Complete 45㎡ production case | First full production-case pattern for stage visuals. |
| Complete Rain Singapore production case | Strong international stage visual record. |
| Clean KASHIWA Daisuke / 柏大辅 case | Important collaboration page; credit language must stay precise. |
| Expand Production archive rows | Keep UFO Terminal, onefive-related record, Xie Xin Dance Theatre, CHINATIME, Anchang, Shanghai records visible as structured entries. |
| Replace weak thumbnails | Text-heavy, black-center, low-resolution, or unclear images should be replaced. |
| Keep public boundary audit in workflow | Prevent raw paths, draft language, and internal notes from entering public pages. |

## P1

| Work | Why |
| --- | --- |
| Build long-form Writing entries for TIMER and Drop Flow | Needed for deeper reading and applications. |
| Add image selection notes per project | Makes future thumbnail replacement faster. |
| Add project-source manifest | Track where each project draws title, year, venue, media, and credit from. |
| Add mobile layout pass | Current desktop is stronger than mobile; detailed pages need compact checks. |
| Add archive filters or grouping | Production archive will grow; readers need better scanning. |

## Heavy Work

| Area | Workload |
| --- | --- |
| Media search and frame selection | High. Needs local image library, video frame extraction, and permission judgment. |
| Full archive completion | High. Needs each project to have title, year, venue, role, media, and route. |
| Bilingual copy | Medium to high. Chinese should not feel like translated English; English should stay concise. |
| Credit normalization | Medium. Collaboration pages need precise names and role boundaries. |
| Long-form writing | High. Needs editorial shaping, not just pasted notes. |

## Local Protection

- `.codex-local/` is ignored by Git and used for private notes.
- Raw videos, rejected frames, review notes, and uncertain file-location notes stay local.
- Public repo files should only hold stable project records, public-safe templates, selected media, and reusable workflow docs.

## Maintenance Rhythm

| Rhythm | Task |
| --- | --- |
| Every project update | Run public boundary audit, build content, build React. |
| Every thumbnail change | Check Home, Gallery, Production, Archive, and the project page. |
| Every credit change | Check against `credit-template.md`. |
| Every month | Review archive gaps and move one weak project into finished case structure. |
| Before publishing | Use `publish-checklist.md`. |
