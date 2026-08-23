# COMMON SOURCE — Golden Mini v0.3 Listening / Viewing QA

> **Purpose:** stop architecture expansion and judge the actual ~62 second performance.  
> **Rule:** run the current canonical `index.html` first. Do not change code before completing one full raw pass.  
> **Recording:** Screen + Sound, HUD OFF, no subtitles, no montage, no keyboard shot.

---

# 0｜Required setup

```text
Browser: Chrome first, Safari second
Headphones / monitors: required
Mode: AUTO
HUD: OFF after start
Duration: full 32 bars / ~62 sec
Volume: fixed for the whole pass
Editing: none
```

Before judging aesthetics, record:

```text
DATE:
COMMIT:
BROWSER:
DEVICE:
AUDIO OUTPUT:
CONSOLE ERRORS:
AUDIOCONTEXT FIRST GESTURE: PASS / FAIL
PUBLIC OR LOCAL URL:
```

---

# 1｜First pass — no stopping

Do not inspect code while listening.

At the end answer only:

```text
A. This felt mainly like an A/V performance.
B. This felt mainly like an autoplay Creative Coding webpage.
C. Unclear / between the two.
```

Then write one sentence:

> The single biggest reason is: ________________________________

Do not list ten problems yet.

---

# 2｜Section audit

The current authored score is approximately:

```text
00:00–00:15  OPEN
00:15–00:31  BUILD
00:31–00:46  PEAK
00:46–00:54  BREAK
00:54–01:02  RETURN
```

Exact seconds vary slightly with startup / scheduling. Judge by musical form, not stopwatch precision.

## OPEN

Questions:

- Does the low density feel intentional, or merely empty?
- Is there already a recognizable sonic / visual world?
- Can it survive several seconds without user input?
- Does it create desire for the next event rather than boredom?

Verdict:

`PASS / REWRITE AUDIO / REWRITE VISUAL / REWRITE STRUCTURE`

Note:

## BUILD

Questions:

- Is forward movement clearly audible before looking at the HUD?
- Does subdivision / accumulation actually develop, or merely add more objects?
- Does the visual structure become more directed rather than just denser?
- Is there enough restraint left for PEAK?

Verdict:

`PASS / REWRITE AUDIO / REWRITE VISUAL / REWRITE STRUCTURE`

Note:

## PEAK

Questions:

- Is there an actual bodily peak?
- If the volume were normalized, would it still feel like the peak?
- Is the foreground identity stronger, not only busier?
- Does Sound + Visual lock into a memorable event or phrase?
- Is layering still readable?

Verdict:

`PASS / REWRITE AUDIO / REWRITE VISUAL / REWRITE STRUCTURE`

Note:

## BREAK

Questions:

- Does something meaningfully leave?
- Can the audience feel release without reading the word BREAK?
- Do tails / residue preserve memory from PEAK?
- Is the space opened deliberately rather than simply muted?

Verdict:

`PASS / REWRITE AUDIO / REWRITE VISUAL / REWRITE STRUCTURE`

Note:

## RETURN

Questions:

- Does the piece feel like it is closing / recalling / reopening?
- Is something from earlier transformed or remembered?
- Does the 62-second form have an ending, or does it merely run out of bars?

Verdict:

`PASS / REWRITE AUDIO / REWRITE VISUAL / REWRITE STRUCTURE`

Note:

---

# 3｜Three isolation tests

## SOUND ONLY

Hide / turn away from screen.

Question:

> Does the audio alone have a readable OPEN → BUILD → PEAK → BREAK → RETURN form?

Additional hard question:

> Does it sound like authored music / sound design, or mostly like browser oscillators being demonstrated?

Verdict:

`PASS / SYNTH-DEMO PROBLEM / ARRANGEMENT PROBLEM / MIX PROBLEM`

## VISUAL ONLY

Mute audio.

Question:

> Does the image itself have continuity, memory, accumulation and release, or is it primarily a screensaver changing parameters?

Verdict:

`PASS / GENERIC-GENERATIVE PROBLEM / CONTINUITY PROBLEM / SECTION PROBLEM`

## SCREEN + SOUND

Restore both, HUD OFF.

Question:

> Are Sound and Visual explaining the same high-level state while remaining individually meaningful?

Fail condition:

- the connection is only obvious because every beat produces a flash;
- or the two media feel unrelated despite sharing a variable.

Verdict:

`PASS / TOO REACTIVE / TOO DISCONNECTED / BOTH MEDIA WEAK`

---

# 4｜Control test — PERFORM mode

Only after AUTO has been judged.

Explain controls in under two minutes:

```text
A ADD
S REMOVE
D HOLD
F RELEASE
R RECALL
1–4 SECTION
SPACE ACCENT
ESC RESET
```

Then perform without looking at code.

Judge:

### CONTROLLABILITY
Can the performer deliberately increase **and decrease** intensity?

### OBSERVABILITY
Can the performer understand current / pending system state quickly enough to make a decision?

### ROBUSTNESS
Do slightly early / late inputs still land coherently?

### AGENCY
Does the performer make meaningful judgments, or does AUTO still do almost everything important?

### SAFETY
Can repeated input create clipping, density overload, stuck audio or unrecoverable state?

Verdict:

`PASS / TOO AUTOMATIC / TOO FRAGILE / TOO MANY CONTROLS / TOO LITTLE CONTROL`

---

# 5｜Novice test

Tester has not read the code.

Instruction limit: **2 minutes**.

Performance: **5 minutes**.

Record:

```text
Could start audio: YES / NO
Could understand current state: YES / NO
Could ADD intentionally: YES / NO
Could REMOVE intentionally: YES / NO
Could HOLD intentionally: YES / NO
Could RELEASE intentionally: YES / NO
Created at least one clear build → peak → release: YES / NO
Needed to mash keys to avoid dead air: YES / NO
System broke / clipped / stuck: YES / NO
Wanted another control that was genuinely necessary: __________
Control they never needed: __________
```

One-sentence tester answer:

> “I felt I was ______________________________.”

---

# 6｜Audience-only blind test

Show the raw HUD-off recording to someone who did not build the system.

Ask exactly:

> **“这更像一段 Audio Visual Performance，还是像有人做了一个会自动播放的网页？”**

Then ask:

> **“你觉得最明确的一次变化发生在哪里？”**

Do not explain OPEN / BUILD / PEAK / BREAK first.

Result:

```text
PERFORMANCE / WEBPAGE / UNCLEAR
Most legible transition:
Least legible transition:
```

---

# 7｜Decision gate

After QA, choose exactly one next P0:

## REWRITE AUDIO
Choose this when structure is legible but browser-synth identity is weak / generic.

Next action:
- supply / curate real Material Pack;
- or render a stronger offline authored sound family;
- do not add controls.

## REWRITE VISUAL
Choose this when sound form works but image still reads like generic generative motion.

Next action:
- author one strong visual event / residue grammar per structural role;
- reduce interchangeable parameter animation;
- do not add UI.

## REWRITE STRUCTURE
Choose this when PEAK / BREAK / RETURN are not temporally convincing even with acceptable materials.

Next action:
- change bar lengths / cue order / transition timing;
- do not build more effects first.

## PASS TO PROMO
Only choose this if:

```text
[ ] AUTO raw pass reads primarily as performance
[ ] SOUND ONLY form passes
[ ] VISUAL ONLY continuity passes
[ ] HUD-off Screen + Sound passes
[ ] novice test passes
[ ] audience-only result is not mainly WEBPAGE
[ ] no blocking technical failure
```

Then produce teaser / workshop claims.

---

# 8｜Completion report

```text
COMMIT:
URL:
BROWSER TEST:
AUDIO TEST:
AUTO VERDICT:
OPEN:
BUILD:
PEAK:
BREAK:
RETURN:
SOUND ONLY:
VISUAL ONLY:
SCREEN + SOUND:
PERFORM MODE:
NOVICE TEST:
AUDIENCE TEST:
NEXT SINGLE BIGGEST PROBLEM:
NEXT P0:
```

Any unexecuted item = `NOT TESTED`.
