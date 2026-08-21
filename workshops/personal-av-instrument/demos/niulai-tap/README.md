# NIULAI TAP / 牛来 Tap

**Parent project:** [Personal A/V Instrument / 音画同源乐器](../../README.md)  
**Status:** playable prototype v0.3  
**Type:** browser audiovisual instrument / workshop demo / theme-pack experiment

## Current playable build

- root entry: `/niulai-tap-v03.html`
- workshop redirect: `./index.html`

v0.3 removes the dependency on device-specific `SpeechSynthesis` voices. The vocal layer now uses a deterministic browser **formant voice synth** built with Web Audio API: vowel/formant patterns, fixed pitch ranges, procedural percussion, bass, chord and FX. This makes the sound character more consistent across devices and closer to a synthetic performer / playable vocal instrument.

## Two directions

### 1. NIULAI CORE

A more direct NIULAI-themed mode. `牛 / 来 / 牛来 / 欢迎 / 我的孩子 / 不一样 / 一样 / 勇敢 / 将来 / 今天` are treated as playable visual-vocal fragments rather than long dialogue playback.

`Q / W` are the main proof of concept:

- tap → single `牛 / 来`
- rapid repeat → `牛 → 牛牛 → 牛牛牛` / `来 → 来来 → 来来来`
- hold → sustained formant voice + extended visual state

### 2. 出音牛来 / CHUYIN NIULAI

A synthetic-performer / electronic-performance reinterpretation. It does not use Hatsune Miku voice data or character assets. Instead, it uses a brighter, higher formant voice, faster electronic percussion, scanline / glitch visual treatment and keyboard-performance logic.

## Current interaction

- `A–Z`: trigger sound + visual events
- `Q / W`: primary vocal-performance keys
- key hold: sustained vocal / visual state
- rapid repeated key presses: increase repetition and visual energy
- `SPACE`: global drop / accent
- `TAB`: switch `NIULAI CORE ↔ 出音牛来`
- `ESC`: reset / panic

## Audio architecture v0.3

```text
Keyboard input
  ↓
Fixed formant voice synth (vowels / pitch / vibrato)
  +
Procedural Web Audio rhythm / bass / chord / FX
  ↓
Master compressor
  ↓
Browser output
```

No original film dialogue audio is bundled in the public build. The next sound-design layer can replace or augment the procedural voice with an original / licensed NIULAI Voice Pack without changing the interaction engine.

## Workshop role

`Instrument Engine + Sound Pack + Visual Pack + Mapping Rules = Personal A/V Instrument`

NIULAI TAP is a theme-pack proof of concept: participants should eventually be able to replace the pack with their own song, voice, images, internet material or field recordings while preserving the same playable engine.

## Next iteration

- [ ] make the reduced 8-key set genuinely fun for 30 seconds
- [ ] tune formant voice articulation for `牛 / 来`
- [ ] build original / licensed Voice Pack layer
- [ ] create Ambient / Club / Playful musical sub-banks
- [ ] add optional BPM quantization
- [ ] add visual-memory / decay logic inspired by *No Further Input Required*
- [ ] record keyboard-as-guitar 15s / 30s promo performance
