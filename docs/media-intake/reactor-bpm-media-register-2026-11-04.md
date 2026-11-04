# REACTOR BPM / Media provenance · 2026-11-04

## Source and publication manifest

| Published asset | Source | Onsite evidence | Usage |
| --- | --- | --- | --- |
| `assets/reactor-2026/reactor-2026-01.webp`…`09.webp` | Existing portfolio photographic archive (on `main`) | REACTOR venue / stage photographs; precise shooting dates not established by this audit | Article cover, technical context, full nine-image archive |
| `assets/reactor-2026/reactor-opening-2026-poster.webp` | User-uploaded Opening promo poster | Public Grand Opening 2026 flyer covering Sep 24–25; not credited as author's photograph | Article event-context poster |
| `assets/reactor-2026/reactor-beatlink-waveform-square.jpg` | User-provided video `19572.mp4`, approximately 00:24 | Actual operator video showing Player 3 and 128 BPM readout; capture date unverified | Square 900×900 Beat Link close-up for chapter 05 |
| `assets/reactor-2026/reactor-operator-view.jpg` | User video `19572.mp4`, frame at approximately 00:00 | Operator screen and equipment view | Chapter 05 behind-the-scenes frame |
| `assets/reactor-2026/reactor-venue-photo.jpg` | User-provided `19573.jpg` | Original vertical ambient photograph; EXIF date unavailable | Retained supplementary archive copy, not promoted above stronger REACTOR portfolio photos |

## Verification boundaries

- Resident Advisor's REACTOR Grand Opening Day 1 event listing is dated September 24, 2026: https://ra.co/events/2534022.
- Neither `19572.mp4` nor `19573.jpg` proves its own date or the operator's precise event slot; do not infer all public asset captures were taken September 24.
- The visible `128 BPM` is a player readout, not the speed of the 100 BPM four-bar REACTOR production loop documented in the private Arena build notes.
- The uploaded video shows Beat Link Trigger's player status, not a proven Beat Link Trigger → Ableton Link → Resolume control connection.
- The original ~89 MB video is not published, and only compressed stills are in the public repository.
- The current public article links to official Resolume / Ableton / Deep Symmetry docs rather than copying their copyrighted example screenshots as local assets.
- The site uses existing `HashRouter` Writing route, and asset path aliases are mirrored under `/portfolio/assets` by the React build's postbuild copy step.

## Acceptance checks

- `assets/reactor-2026/` includes all nine existing WEBP stage images, plus the opening poster, waveform square and operator-view still.
- Visual crops preserve subject context. Waveform square is 900×900; original operator-view still retains portrait ratio.
- Article images are inserted by heading in the same Published Writing reader column; the other Writing entries are unaffected.
- Verify production build, actual public browser rendering, and final merge/deploy separately. A PR build is not a site deployment.
