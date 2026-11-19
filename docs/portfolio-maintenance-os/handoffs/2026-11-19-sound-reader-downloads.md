# Sound Organization: download integrity follow-up

Base: `e651c5764a08be0cad122fc9447b14b67c025649`. Branch: `fix/sound-reader-downloads`.

PR #162 merged on 2026-11-18. On 2026-11-19, the production `sound-organization/events.csv` and `events.json` requests both returned HTTP 200, `text/html`, 2208 bytes: the site shell, not downloadable event data. No subsequent commit to this directory or matching open repair PR was found during preflight.

## Changes
- Remove the two broken export anchors; retain the complete knowledge map and its embedded data unchanged.
- Clarify that the eight public MP3s are listening examples, not independently aligned WAV stems or MIDI files. Material-dependent instructions are explicitly for readers already holding the corresponding files; others can listen or use their own sounds.
- No new dataset, WAV, MIDI, archive or source package is published. No manuscript, audio tags or external links are changed.

## Verified
- All eight production MP3s: HTTP 200 / audio/mpeg; ffprobe parsing and complete ffmpeg decoding passed. Durations: source 4.032 s, tail 2.280 s, cloud 12.024 s, echo 6.024 s, scatter_then_space and space_then_scatter 16.032 s each, phrase 12.024 s, reference_96s 102.024 s including tail.
- Embedded knowledge dataset before/after byte-identical: 200 events, 60 sources, 25 people, 35 terms, 14 relations. Export buttons are removed rather than extending distribution of editorial/research fields from that payload.
- Eight audio tags before/after identical; broken download anchors absent; no package download inserted.
- `npm run build` passed using existing installed dependencies. Initial attempt lacked the Vite executable; rerun after resolving dependencies passed.
- graph: 0 errors / 58 existing warnings; preservation: 14 rules, zero missing facts/links. portfolio-os, CV and media audits passed.

## Not claimed
No desktop/mobile browser visual or listening acceptance, no production fix, no merge or deployment. Root build success alone does not establish publication of the standalone reader. Review the branch preview at both widths before any release. Local private final-quality extension is unavailable; native audits used instead.

Follow-up: restore structured exports only after reviewing the intended public fields and packaging actual files. Keep published teaching MP3s separate from production materials. Rollback consists of reverting this small change; existing reader content remains untouched.
