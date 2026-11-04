# COMMON SOURCE — Curated Material Pack Contract

> **Status:** v0.1 specification / no production audio pack attached yet  
> **Runtime:** `index.html`  
> **Reason:** Golden Mini v0.3 currently uses browser-synth / noise fallback. The next quality pass should improve authored musical identity without expanding the control architecture.

---

# 0｜Current fact

Repository audit on 2026-08-23 found no conventional committed `.wav / .mp3 / .m4a / .ogg / .flac / .aac` audio pack and no committed `.mp4 / .mov` media binary that can be safely assumed to be a reusable Golden stem library.

`nfi-keyboard-liveset` contains its own embedded low-rate speech samples for `叮 / 咚 / 鸡 / 大 / 狗 / 叫`. Those samples belong to the Personal Material / Instrument Identity line and **must not be silently reused as Golden performance material**.

Therefore:

> Do not invent stems. Do not download random music. Do not hide the current synth quality by adding more effects.

Until a real curated pack is supplied and auditioned, browser synthesis remains the explicit fallback.

---

# 1｜Minimum material pack

The Golden system only needs a very small number of authored roles.

```text
OPEN BED
BUILD PULSE
PEAK BODY
BREAK TEXTURE
ACCENT       optional
TRANSITION   optional
```

This is a role contract, not a required folder count. One source recording may provide several derived slices if the relationship is musically intentional.

## OPEN BED

Purpose:
- establish atmosphere without immediately declaring a beat;
- tolerate 8 bars of low interaction;
- leave headroom for later layers.

Good candidates:
- field recording;
- room / machine tone;
- processed sustained source;
- restrained harmonic bed.

Avoid:
- a full finished song intro that already dictates the entire form;
- bright loop with no space;
- material whose copyright / permission status is unclear.

## BUILD PULSE

Purpose:
- make subdivision and forward movement audible;
- survive repetition without feeling like a stock drum loop;
- combine cleanly with PEAK BODY.

Good candidates:
- self-recorded percussion;
- short rhythmic texture;
- processed mechanical / environmental pulse;
- deliberately authored synth loop rendered offline.

## PEAK BODY

Purpose:
- create an actual bodily peak rather than merely “more notes”;
- provide low / mid weight and a strong temporal identity.

It can be:
- one 4–8 bar loop;
- a small family of compatible hits;
- a rendered rhythmic phrase.

## BREAK TEXTURE

Purpose:
- make subtraction perceptible;
- preserve memory / tail while opening space;
- make RELEASE feel designed rather than muted.

## ACCENT / TRANSITION

Optional. Only add if they solve a clear formal problem.

A dramatic whoosh or impact is not automatically a transition.

---

# 2｜Technical requirements

Preferred delivery:

```text
48 kHz
24-bit WAV when practical
stereo or intentional mono
no master clipping
rough peak around -6 dBFS to -3 dBFS
clear file role
```

For browser deployment, an optimized derivative may later be generated, but the authored source should remain higher quality.

Every pack entry must record:

```text
id
role
source / author
rights status
bpm if rhythmic
key / pitch center if relevant
bars / duration
gain trim
loopable true/false
notes
```

Do not assume BPM or key from filename alone.

---

# 3｜Rights / provenance

Allowed by default:

- self-recorded material;
- material authored by the project team;
- commissioned / explicitly cleared material;
- CC / public-domain material whose exact license is recorded and compatible with public deployment.

Not allowed by default:

- ripping a commercial track because it is only used in a workshop;
- extracting audio from an unrelated Portfolio video without confirming authorship / permission;
- AI-generated music with unclear service / model usage conditions and no provenance note;
- treating an old collaboration stem as reusable merely because the file is locally available.

`rights status = unknown` means **do not publish**.

---

# 4｜How material should enter the control model

Do not map every State to a completely different song.

The useful model is:

```text
shared curated material family
+
State
+
Arrangement rule
→ different temporal interpretation
```

For example:

```text
OPEN
open-bed only
long tail
few attacks

BUILD
open-bed + build-pulse
more subdivision
controlled accumulation

PEAK
build-pulse + peak-body
strong foreground
shorter event cycle

BREAK
remove pulse / body
keep break-texture + residue

RETURN
recall a reduced fragment
close or re-open
```

The listener should hear one system changing state, not five unrelated tracks crossfading.

---

# 5｜AI boundary

AI may help:

- label / catalogue provided material;
- detect rough BPM / transient candidates;
- propose slices;
- propose compatible layer combinations;
- write loading / scheduling code;
- compare arrangement alternatives;
- identify clipping, dead air, repeated patterns;
- generate offline synth candidates that are then auditioned and curated.

AI must not be trusted to:

- infer rights ownership;
- decide a source is publishable because it exists in the repo;
- choose the final best musical material without listening tests;
- silently replace missing material with random web audio;
- equate more layers with a stronger peak.

---

# 6｜Implementation rule

**Do not build a general sample engine before real material exists.**

When the first real pack is supplied:

1. audition every source outside the runtime;
2. select the minimum useful set;
3. record metadata;
4. add only the loader / scheduler functions needed by those actual files;
5. retain synth fallback until browser loading has been verified;
6. A/B record synth fallback vs curated material;
7. keep whichever version performs better.

If curated samples do not improve the raw performance, remove them.

---

# 7｜Definition of Done for Material Pack v1

```text
[ ] all sources have provenance / rights notes
[ ] OPEN / BUILD / PEAK / BREAK roles are covered
[ ] pack is auditioned, not only technically loaded
[ ] no clipping after runtime mix
[ ] 62-second AUTO score has clearer musical identity than synth fallback
[ ] BREAK is perceptibly a release, not only lower volume
[ ] HUD-off audience test can distinguish major sections by sound
[ ] public browser load succeeds
[ ] fallback behaviour remains reliable
```

Anything not tested must remain `NOT TESTED`.
