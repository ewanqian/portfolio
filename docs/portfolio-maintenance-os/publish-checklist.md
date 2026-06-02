# Publish Checklist

Run this before committing or pushing portfolio changes.

## Content

- Project title matches public usage.
- Year, city, venue, and event are consistent.
- Role language is precise.
- Credits are complete enough for public reading.
- Chinese and English routes both read naturally.
- Public copy avoids internal critique and draft language.

## Media

- Home cover images load.
- Project hero images load.
- Archive thumbnails load.
- No raw file paths are visible.
- No rejected contact sheet appears on a public page.
- External image use has clear source context.

## Site

- Home
- Gallery
- Production
- Archive
- Spatial
- Writing
- Profile
- Key project pages

## Build

- Content build passes.
- Public boundary audit passes.
- Portfolio OS audit passes.
- React build passes.
- Dist assets are copied.
- Browser check covers desktop and mobile where possible.

Windows note: build from the stable mapped workspace drive when working on the network workspace. Building through a temporary `pushd` drive can make Vite see mixed drive letters.

## Git

- `.codex-local/` remains ignored.
- Private notes are not staged.
- Large source videos are not staged.
- Generated files are intentional.
