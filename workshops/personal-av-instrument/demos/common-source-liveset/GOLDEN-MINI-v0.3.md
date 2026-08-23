# COMMON SOURCE — Golden Mini Live System v0.3

> **Purpose:** 8.29 workshop P0 / raw performance proof  
> **Canonical runtime:** `index.html`  
> **Theory:** `research/performance-control-model/README.md`  
> **Status:** source implemented 2026-08-23; auditory / browser / audience QA still required.

This is deliberately smaller than the long-term full Performance System requested in Issue #55. It does **not** claim to complete the 8 Hero Phrase / 5–10 minute live-set target. Its job is to prove a smaller proposition first:

> **A reliable pre-authored temporal system plus a few high-level human decisions can already produce a more convincing A/V performance than a page full of thin triggers.**

## AUTO SCORE

Default: `124 BPM`, `32 bars`, approximately `62 seconds`.

```text
Bars 01–08  OPEN
Bars 09–16  BUILD
Bars 17–24  PEAK
Bars 25–28  BREAK
Bars 29–32  RETURN
```

AUTO then loops back to OPEN.

The four working performance states plus RETURN use a shared state vector:

```text
energy
tension
density
space
memory
```

This vector is **provisional**. Sound and Visual read the same state but interpret it separately rather than doing one-to-one audio reactivity.

### OPEN

- no full kick pattern;
- low tones / filtered air;
- large negative space;
- slow residue.

### BUILD

- quarter pulse enters;
- offbeat / subdivision material enters;
- visual radial segmentation grows;
- memory remains long enough to show accumulation.

### PEAK

- stronger rhythmic lock;
- higher register motif layer;
- shorter visual cycles / denser foreground;
- still protected by master compressor and finite event design.

### BREAK

- kick removed;
- filtered noise / low sustained tones;
- spatial opening;
- memory / residual lines become more important than new foreground events.

### RETURN

- reduced pulse;
- sparse motif;
- visual density falls;
- score can close or cycle back to OPEN.

## PERFORM MODE

Press `P` or use any structural command while AUTO is running.

Human controls:

- `A / ADD` — increase manual density at next bar, max 3.
- `S / REMOVE` — reduce density at next bar, min 1.
- `D / HOLD` — suspend automatic density decay.
- `F / RELEASE` — request BREAK + density 1 at next bar.
- `R / RECALL` — return to previous performance state at next bar.
- `Space / ACCENT` — immediate but gain-limited accent.
- `1–4` — request OPEN / BUILD / PEAK / BREAK on next bar.
- `H` — hide HUD for audience-only screen recording.
- `Esc` — reset to OPEN.

The machine handles:

- transport;
- quantized section / density changes;
- compatible pitch material;
- finite voice events;
- master compression;
- maximum density;
- automatic safety decay in PERFORM mode;
- continuous background / residue behaviour.

## Why this is different from v0.2

v0.2 improved architecture but still invited evaluation through many keyboard phrases. v0.3 temporarily removes that pressure and asks one harder question:

> **Does the raw 62-second screen + sound sequence itself feel like an authored performance?**

If the answer is no, do not add keys. Rewrite composition / sound / choreography first.

## Required QA

### Code-level completed before commit

- Inline JS extracted and checked with `node --check`: **PASS**.
- HTML parsed with Python standard `HTMLParser`: **PASS**.

### Still required

- Chrome load: NOT TESTED.
- Safari load: NOT TESTED.
- AudioContext first gesture: IMPLEMENTED, NOT MANUALLY TESTED.
- Actual 62-second audio balance: NOT TESTED.
- Section perceptual distinction with HUD off: NOT TESTED.
- No-input continuity: NOT TESTED.
- Gain / compressor listening test: NOT TESTED.
- 60–90 sec raw screen+sound recording: NOT RECORDED.
- 2-minute novice instruction test: NOT TESTED.
- 5-minute performer test: NOT TESTED.
- audience-only blind test: NOT TESTED.
- public deployed URL: NOT VERIFIED.

## Pass / fail rule

Record AUTO with HUD hidden. Do not add explanatory subtitles.

Ask:

> “这更像一段 Audio Visual Performance，还是像一个自动播放的网页 Demo？”

If it still reads primarily as a webpage demo, v0.3 fails. The next step is authored sound / visual choreography, not framework expansion.
