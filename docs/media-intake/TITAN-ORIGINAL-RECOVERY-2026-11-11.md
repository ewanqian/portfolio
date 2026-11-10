# TITAN original-media recovery — 2026-11-11

User instruction: recover the complete early presentation, including the nine original visual screenshots, per-track covers and later MANA links. Do not substitute PDF page captures for original images. TIMER and Drop Flow require the same provenance standard; hold uncertain images rather than filling gaps with PDF captures.

## What was actually recovered

Read-only audit across all fetched refs: 2,021 commits, 228 target-related historical paths, 587 text versions, 167 candidate media versions. This is the accessible fetched repository history, not a claim to include unreachable/deleted remote refs or a user's local disk.

Original image upload: `b2e8e368073b62372c36c035edf1ec99a9a03d53`, 2026-04-11 11:23:30 +08:00. Adds **nine PNG screenshots and ten JPEG covers** under `assets/kashiwa-titan/`.

Later link sequence on 2026-04-11:
- `accf70121e0f612fde1c76aca9885004af40ec69`: Green, Haze, Infrared and Rose MANA links.
- `3385c53233d380a94a806b15e9d6cc1b848424ae`: Phantom embed.
- `4c83ce6a4f7d9ef988a10b9500acf1b4af8b5e73`: per-track embedded videos.
- `25e77e7a1c00b1a9b13a1162888e4451c7fc5536`: restore thumbnails. This is the completed same-day archive reference, not the earlier README with only four videos.

`works/kashiwa.html` was changed into a redirect during `830259a37450546e53b2d342dcd580e56a2925b5` on 2026-08-15. Later project summaries do not retain the full per-track presentation. Current WebP derivatives still exist; original PNG/JPEG blobs were recoverable from Git. The loss is therefore both presentation regression and removal of original-format files, not total loss of all imagery.

## Original screenshots

Seven 3840×2160 images: Lead, Green, Haze, Infrared, Whitenight, Amb, Titan. Rose: 1920×1080. Aurora: 7680×4320. Every restored file reuses its exact original Git blob; no resizing, recropping, recompression or PDF extraction. All nine images and the ten JPEG covers were visually inspected in contact sheets. The originals are clean artwork frames, not PDF page screenshots.

The historical inventory has ten track names, nine separate PNG screenshots and ten JPEG covers. Phantom has a JPEG cover but no independent PNG in the recovered set. Aurora has an 8K screenshot and a cover but no confirmed per-track MANA URL. Do not invent missing files or links.

## Video edition boundary

Eight Shenzhen-archive track links are retained: Lead 2831761, Green 2903351, Haze 2903422, Infrared 2903434, Whitenight 2831703, Amb 2831826, Rose 2903465, Titan 2831892. The old Phantom embed used 2831944, also explicitly identified in the series archive as CAN Festival. It is displayed as **Phantom · CAN Festival**, not silently relabelled a Shenzhen recording. External playback has not been independently validated in this recovery.

## Public repair

The existing React TITAN project now contains the complete ten-track gallery, with source-derived WebP previews, original PNG links, original JPEG covers and known video links. Existing image aspect ratios are retained. Full staff credits and production-note links are restored from the source record. Public copy no longer says that process materials have been excluded: they are reachable alongside the finished visuals.

CV record IDs, selected record count, awards, and three-page PDFs are unchanged. Images are added to the linked project presentation, not inserted into the compact printed CV without review.

## TIMER / Drop Flow

Do not promote another PDF-derived crop into the CV, homepage or project hero. Existing filenames containing `clean` or `raw` are not provenance evidence. The audit exported original candidates and historical references for image-by-image review; no replacement image has been asserted to be a verified original without that check. High-quality files can be supplied later without manufacturing current completeness.

## Regression / acceptance

Original Git blob IDs and dimensions are recorded in `assets/data/titan-tracks.json`; track IDs remain 01–10. There must be ten covers, nine original PNG links, eight Shenzhen MANA links, and a separately labelled CAN Festival Phantom link. Existing source and preservation gates still apply. Do not close this task on a successful asset commit alone: verify project navigation and decoded previews on the built and deployed site.
