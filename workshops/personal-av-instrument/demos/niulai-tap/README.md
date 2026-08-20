# NIULAI TAP / 牛来 Tap

**Parent project:** [Personal A/V Instrument / 音画同源乐器](../../README.md)  
**Status:** playable prototype v0.1  
**Type:** browser audiovisual instrument / workshop demo / theme pack experiment

## Why this exists

NIULAI TAP is a workshop-side demo used to test a simple question: **can a familiar cultural / personal material pack become a playable audiovisual instrument before the participant understands any software?**

The prototype follows a Patatap-like keyboard interaction principle—keyboard input produces immediate sound + visual feedback—but does not copy Patatap assets or visual language. The goal is a reusable workshop engine where participants can later replace voice, sound and visual packs with their own material.

## Two directions

### 1. NIULAI CORE

A more direct NIULAI-themed mode. Short fragments such as `牛 / 来 / 欢迎 / 我的孩子 / 今天 / 将来 / 长大 / 不一样 / 一样` are treated as playable units rather than long dialogue playback. The public prototype uses browser-synthesized speech, procedural Web Audio, typography and generative geometry rather than source-film dialogue audio.

### 2. 出音牛来 / CHUYIN NIULAI

A fan-made synthetic-performer / electronic-performance reinterpretation. “出音” emphasizes **making sound / performing sound** rather than copying Hatsune Miku as a character or voice product.

- synthetic high voice
- brighter electronic percussion / bass / chord bank
- scanline / glitch / stage-like visual state
- fast keyboard performance suitable for the “keyboard as guitar” promo video
- no Hatsune Miku voice data or visual assets

## Current interaction

- `A–Z`: trigger sound + visual events
- repeated `Q / W`: `牛 → 牛牛 → 牛牛牛` / `来 → 来来 → 来来来`
- key hold: extended vocal / visual state
- `SPACE`: global accent / drop
- `TAB`: switch between `NIULAI CORE` and `出音牛来`
- `ESC`: reset / panic

## Playable entry

The current self-contained public file is stored at repository root:

`/niulai-tap.html`

Canonical website target after deployment:

`https://ewanqian.site/niulai-tap.html`

The older nested workshop route redirects to this file:

`/workshops/personal-av-instrument/demos/niulai-tap/`

## Workshop role

This demo is not the final class template. It is a **theme-pack proof of concept** showing that the same instrument engine could later become:

- an artist's song / visual pack;
- a meme or internet-culture pack;
- a personal field-recording instrument;
- a participant's custom 26-key audiovisual instrument.

Useful teaching sequence:

`play first → understand mapping → replace material → change rules → blind playtest → perform`

## Next iteration

- [ ] make the reduced 8-key version genuinely fun for 30 seconds
- [ ] curate an original NIULAI sound pack
- [ ] strengthen Ambient / Club / Playful musical banks
- [ ] add optional BPM quantization
- [ ] deepen per-key hold / release behaviour
- [ ] borrow visual memory / decay logic from *No Further Input Required*
- [ ] export a participant-friendly `starter/` version
- [ ] record keyboard-as-guitar performance teaser

## Rights note

This is a fan-made research / workshop prototype. The public version uses browser-generated speech and original procedural audio / visuals and does not bundle film audio, Hatsune Miku voice data, Patatap assets, or other copyrighted source media.