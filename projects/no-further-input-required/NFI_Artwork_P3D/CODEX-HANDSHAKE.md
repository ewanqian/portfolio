# CODEX HANDSHAKE — No Further Input Required / Processing Exhibition Master

Date: 2026-08-25
Project: 《无需进一步输入 / No Further Input Required》
Repository: `ewanqian/portfolio`
Working directory: `projects/no-further-input-required/NFI_Artwork_P3D/`
Current master: **R3 / 30-second exhibition loop**
Local Codex role: implementation, runtime QA and visual-refinement executor
Reviewer / taste decision: Ewan Qian

## 0. First handshake

Do not redesign, migrate engine or refactor architecture when you first open this directory.

Run this sequence first:

1. Pull the latest `main` and confirm this directory is current.
2. Read `CURRENT-EXHIBITION-BOARD.md`.
3. Read `EXHIBITION-30S-R3-BRIEF.md`.
4. Read `research/GLYPH-ASCII-NOTHING-RESEARCH.md` and `research/DESIGN-AESTHETIC-CROSS-REFERENCE.md` before touching glyph / symbol / visual-language code.
5. Inspect the active Processing files listed in the current board.
6. Run **R3 unchanged once** before editing.
7. Reply to Ewan with exactly this compact status block:

```text
HANDSHAKE OK
Current master: R3
Runtime: WORKS / COMPILE ERROR / NOT TESTED
Resolution tested: ...
Observed FPS: ...
30s seam: PASS / FAIL / NOT TESTED
Glyph fallback/tofu: NONE / FOUND / NOT TESTED
First proposed refinement: ...
Blockers: NONE / ...
```

Do not start R4 until R3 is visible locally or a specific compile/runtime blocker has been isolated.

## 1. Source-of-truth precedence

If files disagree, use this order:

```text
1. CURRENT-EXHIBITION-BOARD.md
2. CODEX-HANDSHAKE.md
3. EXHIBITION-30S-R3-BRIEF.md
4. current active .pde code
5. research/ current documents
6. archive/ historical material only
```

The old 180-second execution brief and the old six-state Processing runner are archived history. Do not let them redefine the current build.

## 2. Current artwork lock

The current system is:

```text
Processing 4 / Java / P3D OpenGL
3840 × 2160 target
60 fps target
30-second deterministic seamless loop
1800 frames per loop
~3-minute delivery capture = six loops
fully autonomous visual runtime
no audience input required
no visible UI
```

The current foreground visual language combines three recovered 2026-08-16 structures inside one shared coordinate system:

```text
CONSTRAINT MECHANISM
+
INDEX FIELD
+
QUANTIZED MEMORY
```

Shared spatial hierarchy:

```text
12 × 7 major grid
→ 24 × 14 index grid
→ 72 × 42 memory micro-grid
```

They are not three scenes. They coexist and exchange visual pressure through the same time/history variables.

## 3. Artwork meaning translated into engineering constraints

The viewer should be able to feel:

```text
something happened
→ it left a structural consequence
→ the consequence accumulated
→ old structure returned in altered form
→ new input diminished
→ the system continued using what remained
```

The strongest acceptance question is:

> “刚刚发生过的东西，怎么还在这里？”

Every new effect must therefore answer at least one of these:

- What does it inherit?
- What does it leave behind?
- Why does its second appearance differ from its first?
- Can it return without becoming a replay?
- Does it improve order, tension, persistence, subtraction or recall?

If the answer is only “it looks more complex,” do not add it.

## 4. Mechanical symbol language

ASCII / Unicode are permitted as **non-verbal machine marks**, never as explanatory copy.

Current restricted families include:

```text
ASCII
+ - = / \\ | : . _ < > [ ]

Unicode
· • □ ■ ◇ ◆ △ ▽ ○ ●
─ │ ┼ ╱ ╲ ╳ ⊕ ⊙ ∷ ≡
```

Rules:

- no words;
- no state labels;
- no terminal prose;
- no random text rain;
- glyphs must align to the same grid / address system as the rest of the work;
- symbols may indicate address, boundary, pulse, persistence, recall or structural relation;
- fewer, better marks are preferred to high symbol density.

Nothing Glyph is a **behavioural reference only**:

```text
finite addressable zones
+ timed illumination
+ segmented progress
+ persistence
+ recall
```

Do not copy Nothing hardware geometry, branding, phone-back C-shapes, icons or notification semantics.

## 5. Visual taste constraints

The intended quality is ordered, restrained, precise and exhibition-scale.

Prioritise:

- black as primary material;
- grayscale line-weight hierarchy;
- exact alignment;
- negative space;
- sparse/dense contrast;
- directional structure;
- repetition with controlled difference;
- long enough holds to perceive order;
- subtraction as an active event;
- history that becomes visible structure.

Reject by default:

- generic sci-fi HUD;
- random glitch;
- particle filler;
- decorative data visualisation;
- full-screen grain/noise;
- bloom used to fake richness;
- constant motion everywhere;
- obvious scene cuts;
- generic 3D camera orbit;
- literal audio amplitude → visual amount mapping;
- readable explanatory text;
- claims of AI preference learning or machine understanding.

## 6. R4–R10 working protocol

Ewan intends to refine this locally through multiple rounds. Treat each round as a **taste experiment**, not a feature release.

For each round:

1. Change one coherent variable family only.
2. Keep R3 recoverable.
3. Run at least one complete 30-second loop.
4. Save one representative still and, when useful, a 30-second capture.
5. Record only:

```text
WORKED
FAILED
NEXT CHANGE
```

6. Commit the round separately with a specific visual reason.

Recommended tuning order:

```text
R4  line weight + hierarchy
R5  empty/dense proportion
R6  glyph family + glyph density
R7  address / pulse timing
R8  recall rarity + history lead
R9  29.5s → 0s seam + compression
R10 final 4K stability + distance-view reduction
```

This order is guidance, not a requirement if Ewan gives a more specific taste direction.

## 7. Performance / 4K rule

Do not claim 4K/60 is passed until it is physically measured on the local/exhibition machine.

If 3840×2160 misses 60 fps:

```text
first: smooth(4) → smooth(2)
then: profile
then: reduce expensive rendering only if measured
```

Do not reduce composition or remove structural behaviour before testing the lower AA cost.

Current R3 intentionally has no external dependency. PixelFlow or another GPU library may be tested only in a separate refinement branch when there is a visible artistic need such as feedback/history/shader processing. A library is not an upgrade by itself.

## 8. Repository research sweep

Before inventing a new visual grammar, grep/search the repository for:

```text
Nothing
Glyph
Unicode
ASCII
REWIND
Quantized Memory
Index Field
Constraint
Phase Scan
Accumulation
Residue
Addressable
Partition
```

Start with the sources indexed in `research/DESIGN-AESTHETIC-CROSS-REFERENCE.md`.

If a genuinely relevant older study is found locally or on another branch:

1. record its exact path/commit;
2. extract the useful formal rule in one or two sentences;
3. add the pointer to the cross-reference document;
4. do not copy its whole interface/system into this artwork.

Performance-system research can contribute timing, accumulation, topology, subtraction and shared-state principles. It must not turn the exhibition artwork back into a playable controller or workshop demo.

## 9. Archive boundary

`archive/` is read-only historical evidence.

Archived `.pde` files are intentionally outside the active sketch root so Processing does not compile the obsolete six-state runtime into the current master.

Do not move an archived file back into the active root just to fix a compile error. Fix the current R3 code first. Restore historical files only after Ewan explicitly requests a historical reconstruction.

## 10. Stop conditions

Stop and ask for a taste decision when:

- two visual directions are both technically valid but aesthetically different;
- a proposed change adds a new primitive family;
- a library materially changes the visual character;
- glyphs begin to read as language/UI rather than mechanical marks;
- a refactor would make historical R3 comparison difficult;
- the next step requires deleting rather than archiving source material.

The local executor’s job is to make visual comparisons cheap and reliable. Ewan makes the final selection.
