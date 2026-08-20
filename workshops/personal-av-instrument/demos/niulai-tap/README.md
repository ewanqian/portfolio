# NIULAI TAP / 牛来 Tap

**Parent project:** [Personal A/V Instrument / 音画同源乐器](../../README.md)  
**Status:** playable prototype v0.1  
**Type:** browser audiovisual instrument / workshop demo / theme pack experiment

## Why this exists

NIULAI TAP is a workshop-side demo used to test a simple question: **can a familiar cultural / personal material pack become a playable audiovisual instrument before the participant understands any software?**

The prototype follows a Patatap-like interaction principle—keyboard input produces immediate sound + visual feedback—but does not copy Patatap assets or visual language. The goal is to create a reusable workshop engine where a participant can later replace the voice, sound and visual pack with their own material.

## Two directions in v0.1

### 1. NIULAI CORE

A more direct NIULAI-themed mode. Short words such as `牛 / 来 / 欢迎 / 今天 / 昨天 / 将来 / 长大 / 不一样 / 一样` are treated as playable fragments rather than long dialogue playback. The page combines browser-synthesized speech, simple percussion / synth voices and a restrained organic visual system.

### 2. HATSUNE NIULAI / 初音牛来

A fan-made virtual-idol / electronic-performance concept. It does **not** use or imitate Hatsune Miku voice data. Instead it reinterprets the idea of a synthetic singer as a bright, fast, glitchy NIULAI instrument with browser speech synthesis, pitch-like electronic gestures, scanline visuals and club-oriented feedback.

## Current interaction

- `A–Z`: trigger sound + visual events
- key hold: keep an on-screen state alive
- rapid repeated key presses: increase visual intensity
- `SPACE`: global accent / flash
- `TAB`: switch between `NIULAI CORE` and `HATSUNE NIULAI`
- `ESC`: reset / panic

The prototype intentionally uses only browser-native Web Audio + Speech Synthesis. No film audio samples are included in v0.1, so the public demo can be shared without redistributing source-film dialogue recordings.

## Workshop role

This demo is not the final class template. It is a **theme-pack proof of concept** showing that the same instrument engine could later become:

- an artist's own song / visual pack;
- a meme or internet-culture pack;
- a personal field-recording instrument;
- a participant's custom 26-key audiovisual instrument.

The useful teaching sequence is:

`play first → understand mapping → replace material → change rules → blind playtest → perform`

## Next iteration

- [ ] replace generic synth voices with a curated original NIULAI sound pack
- [ ] add three stronger musical banks: Ambient / Club / Playful
- [ ] test 8-key reduced version for 15–30 second promo video
- [ ] add optional BPM quantization
- [ ] add per-key hold / release behaviours
- [ ] add visual memory / decay inspired by *No Further Input Required*
- [ ] export participant-friendly `starter/` version
- [ ] record keyboard-as-guitar performance teaser

## Public URLs

When GitHub Pages has deployed the main branch, the static demo should be reachable at:

- `https://ewanqian.site/workshops/personal-av-instrument/demos/niulai-tap/`
- fallback: `https://ewanqian.github.io/portfolio/workshops/personal-av-instrument/demos/niulai-tap/`

## Rights note

This is a fan-made research / workshop prototype. v0.1 uses browser-generated speech and original procedural audio / visuals and does not bundle film audio, Hatsune Miku voice data, or Patatap assets.