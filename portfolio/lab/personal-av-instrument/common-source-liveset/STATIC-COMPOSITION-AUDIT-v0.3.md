# COMMON SOURCE — Static Composition Audit v0.3

> **Type:** code-derived risk audit, **not a listening result**  
> **Date:** 2026-08-23  
> **Canonical runtime:** `index.html`  
> **Next real gate:** [`LISTENING-QA.md`](./LISTENING-QA.md)

This document answers one narrow question:

> **Before anyone listens, what parts of the current implementation are structurally most likely to make Golden Mini feel like a Creative Coding demo instead of an authored A/V performance?**

Anything about actual sound quality remains `NOT TESTED` until real playback.

---

# P0 risk 1 — Section changes are authored, but most sections do not develop internally

The 32-bar score has a clear large form:

```text
8 bars OPEN
8 bars BUILD
8 bars PEAK
4 bars BREAK
4 bars RETURN
```

That is useful.

But inside each section, the current audio scheduler mostly repeats one rule set every bar.

Likely consequence:

```text
section boundary = obvious
section interior = loop-like
```

For example, OPEN repeatedly calls the same low tone / air family; BUILD repeatedly applies the same kick / hat / motif rule; PEAK repeatedly applies a denser version of a fixed rule.

### Listen for

- Does BUILD actually *build* across its eight bars?
- Does PEAK have an internal phrase, or is it eight bars of “peak mode on”? 
- Can a listener predict every bar after hearing the first two?

### If confirmed

Do not add controls.

Author 2–3 **within-section stages**, e.g.:

```text
BUILD A  establish pulse
BUILD B  introduce subdivision
BUILD C  withhold / tension
BUILD D  handoff to PEAK
```

The State can stay BUILD while its internal choreography develops.

---

# P0 risk 2 — BUILD and PEAK share too much visual grammar

The current visual code gives BUILD and PEAK the same main radial segmentation branch:

```text
if scene === BUILD || scene === PEAK
    draw radial line field
```

They differ mostly through state values such as energy / density / tension.

This is exactly the failure the research has been trying to avoid:

> **same algorithm + stronger parameters ≠ necessarily a new performance state**

### Likely consequence

PEAK may read as “BUILD but busier / brighter” rather than a genuinely different foreground event.

### Listen / watch for

With HUD hidden:

- Can someone point to the exact moment PEAK begins?
- Is PEAK identifiable if screen brightness is normalized?
- Does a new foreground relation appear, or only more radial marks?

### If confirmed

Give PEAK one authored visual grammar that BUILD never uses.

It does **not** need more effects. One strong difference is enough, such as:

```text
BUILD = directional accumulation / approach
PEAK = locked foreground body / compression / collision
```

---

# P0 risk 3 — Current sound identity is mostly browser synthesis

Current sound is generated from:

- OscillatorNode tones;
- synthesized kick;
- filtered noise hats;
- filtered noise wash;
- fixed pitch scale.

This is technically clean and dependency-free, but has a high risk of communicating:

> “Web Audio demo with a musical grid.”

rather than:

> “A specific live-performance sound world.”

The problem is not that synthesis is bad. The problem is that the timbral vocabulary is currently highly recognizable as minimal browser synthesis and has not yet been auditioned as a deliberate aesthetic decision.

### Listen for

Sound-only:

- Would this audio be worth hearing without the code context?
- Is the PEAK physically convincing at the same loudness as BUILD?
- Is there a specific sonic identity after 15 seconds?
- Does BREAK carry memory from PEAK, or merely remove drums?

### If confirmed

Choose one of two paths only:

```text
A. author a much stronger synth sound family offline / in code
B. attach a tiny curated Material Pack
```

Do not add a large sampler framework first.

See [`MATERIAL-PACK.md`](./MATERIAL-PACK.md).

---

# P0 risk 4 — State transition itself has little authored gesture

The scene vector interpolates smoothly toward new target values. This prevents ugly hard cuts, which is useful.

But most transitions are currently:

```text
new scene name
→ target parameters change
→ renderer gradually moves there
```

There is little explicit transition choreography carrying the old state into the new one.

### Likely consequence

The audience may perceive “mode changed” rather than “something happened that caused the next section.”

### Watch / listen for

- Is BUILD → PEAK a consequence, or a preset switch?
- Does PEAK → BREAK feel released, collapsed, reversed, emptied, or simply reduced?
- Does BREAK → RETURN recall anything recognizable from OPEN?

### If confirmed

Add transition behaviour to existing scenes, not a new TRANSITION MODE.

Examples:

```text
BUILD → PEAK
last BUILD subdivision compresses / locks into first PEAK body

PEAK → BREAK
foreground disappears but one rhythmic / visual residue survives

BREAK → RETURN
residue reorganizes into an OPEN motif
```

---

# P0 risk 5 — RETURN is structurally named but visually under-authored

RETURN currently has a distinct audio rule, but the renderer does not have a strong RETURN-specific visual branch comparable to BREAK.

### Likely consequence

The final four bars may feel like “energy lowered again” rather than a deliberate closing / recollection.

### If confirmed

RETURN should not introduce a new visual effect.

It should transform something already seen:

- earlier orbit becomes incomplete;
- PEAK residue becomes sparse points;
- OPEN circle returns but carries visible history;
- previous geometry closes / aligns / disappears.

The goal is **memory**, not novelty.

---

# P1 risk — AUTO musical density does not use the manual `density` control as a real authored arc

In AUTO mode, large-form change is mostly determined by each Scene's own scheduler rules. Manual `density` begins at 1 and is mainly used in PERFORM mode.

This is not necessarily wrong, but it means:

```text
AUTO State vector density
≠ manual performance density layer
```

Two separate meanings of “density” may confuse future code and Agent reasoning.

### Recommendation

After listening, either:

1. explicitly rename manual `density` to `manualLayerDepth`, or
2. deliberately connect it to the authored State density model.

Do not refactor before the listening test unless it causes a real bug.

---

# P1 risk — Visual memory is generic across most states

Memory dots are emitted through a largely shared mechanism every beat.

This gives continuity, which is good, but may make memory feel like a universal particle layer rather than a consequence of specific actions / states.

### Watch for

- Does residue tell the audience what happened before?
- Or is it simply ambient decoration?

If decorative, reduce it or make the residue source-specific.

---

# What is already structurally useful

Do not throw these away before testing:

## 1. The score is small enough to judge

~62 seconds is much better for the current problem than a sprawling 5–10 minute system.

## 2. BREAK has at least one genuinely different visual branch

Unlike BUILD / PEAK, BREAK introduces a different line-space relation. This is useful evidence for what section differentiation could become.

## 3. Human controls are now structural rather than note-by-note

`ADD / REMOVE / HOLD / RELEASE / RECALL` is aligned with the Performance Control Model and should remain the main interaction hypothesis until tested.

## 4. Quantized requests protect form

Section / density actions waiting for a musical boundary is one of the strongest pieces of the current runtime. Do not sacrifice it for immediacy unless a test shows the performer cannot understand the delay.

## 5. HUD can disappear

This makes audience-only validation possible. Use it.

---

# Predicted priority order if the first raw test fails

Do **not** automatically follow this list; the real recording decides. This is only the static prediction.

Most likely order:

```text
1 AUDIO IDENTITY / INTERNAL PHRASE DEVELOPMENT
2 BUILD vs PEAK VISUAL DIFFERENTIATION
3 TRANSITION CHOREOGRAPHY
4 RETURN / MEMORY
5 ONLY THEN interaction refinements
```

Least useful response to failure:

```text
add more keys
add MIDI learn
add OSC
add more random particles
add more section labels
add AI generation
```

---

# Required next action

Run [`LISTENING-QA.md`](./LISTENING-QA.md) against the untouched v0.3 runtime.

After one full raw pass, choose exactly one:

```text
REWRITE AUDIO
REWRITE VISUAL
REWRITE STRUCTURE
PASS TO PROMO
```

Until then this static document is a **risk forecast**, not evidence that any of those failures actually occurred.
