# NFI-P3D-HARNESS — GOLDEN RULES

These rules are mandatory. Local Codex may not reinterpret them for convenience.

---

# A. Behavioural reference

1. **Interactive v0.7 is the behavioural Golden Reference.**
2. Preserve the v0.7 idea of a continuously running audiovisual instrument.
3. Preserve the global transport concept: BPM → subdivisions → bars → sections.
4. Default BPM remains **104** unless a task explicitly changes it.
5. Preserve quantized keyboard performance.
6. Preserve `AUTO / HOLD / NEXT` as system-level behaviours, even if UI changes.
7. State transition must never silently reset the global transport.
8. Background musical continuity must survive visual state transitions.
9. The performer must be able to stop touching the system for several seconds without the performance becoming dead.
10. A performer must be able to increase **and reduce** activity.

---

# B. QWERTY topology

11. Treat the physical keyboard as a **spatial score**, not merely a key list.
12. Canonical rows:

```text
1234567890
QWERTYUIOP
ASDFGHJKL
ZXCVBNM
```

13. Every key must retain at least:

```text
key
row
index
normalized x
normalized y
note / pitch identity
energy / weight identity
```

14. `Q → P` must be capable of reading as a left-to-right phrase.
15. `1 → 0`, `A → L`, `Z → M` must preserve ordered progression.
16. Visual states may remap the topology into lines / rings / depth / cells / partitions, but **neighbour relationships must remain recoverable**.
17. Do not randomly reshuffle keys between frames.
18. Do not make every key trigger the same generic effect at a different coordinate.

---

# C. Control-model rules

19. Interpret input as **disturbance / intention**, not absolute command whenever possible.
20. Prefer:

```text
Current State + Input + History → Next State / Event
```

rather than:

```text
Input → fixed effect
```

21. Same key may produce different strength / duration / spatial consequence in different structural states.
22. Machine handles timing / quantization / safety / budgets.
23. Human handles high-value decisions: enter / wait / hold / add / remove / release / recall.
24. Sound and visual may read the same high-level state but must not be forced into cheap 1:1 audio-reactive duplication.
25. `energy / tension / density / space / memory` are currently **provisional control variables**, not dogma. Do not add more without explicit task instruction.
26. StructuralScore defines intent over time; individual visual modules do not invent their own macro dramaturgy.
27. Every accumulating variable must have a decay / cap / reset path.

---

# D. P3D rules

28. `P3D` must mean actual spatial behaviour.
29. A state is not accepted as 3D merely because it uses `box()` or `sphere()`.
30. Meaningful P3D evidence must include at least one of:

- camera-visible parallax;
- Z distribution;
- perspective change;
- occlusion;
- depth-dependent scale / focus / line relation;
- geometry existing at stable XYZ positions.

31. Z must have a conceptual role tied to state / topology / history, not decoration.
32. Camera is part of the system, not a screensaver.
33. No constant dramatic camera orbit unless explicitly specified.
34. Camera motion must stay inside a playable safe range.
35. No default starfield.
36. No particle explosion unless a state spec explicitly requests particles.
37. No bloom / glow / post-effect used to hide weak structure.
38. No random geometry filler.
39. When uncertain: simplify.

---

# E. Interaction rules

40. Pointer / mouse position must not directly leash the center of a major object.
41. Preferred interaction:

```text
pointer / key / gesture
→ impulse / force / weight / phase / density / selection
→ system continues after release
```

42. If mouse is implemented before gesture recognition, it is a disturbance source only.
43. Keyboard remains the primary performance reference for the first milestone.
44. Gesture recognition is a later stage and must not block core porting.

---

# F. State distinction

45. One state = one distinct behavioural proposition.
46. A new state must differ in more than layout.
47. Difference can come from topology, temporal behaviour, depth model, persistence, camera relationship, event propagation, history handling, or structural role.
48. Do not create six variants of “lines + boxes + pulse”.
49. A state may be quieter than another; visual complexity is not a quality metric.
50. An accepted state becomes **frozen**. Other tasks may not alter it unless A-SHEET explicitly unlocks it.

---

# G. Audio rules

51. Audio is not a click track attached afterward.
52. Preserve the idea of continuous musical ground + user gesture layer.
53. Audio scheduler / transport must be separated from drawing frame rate.
54. Processing Sound may be the first implementation, but AudioEngine must be abstracted enough to replace later.
55. Do not call `draw()` timing the authoritative musical clock.
56. Sound safety required: master gain / compressor or limiter strategy / finite voice count / no stuck notes.
57. Do not redesign harmony / motif merely because another library is easier.
58. If exact WebAudio behaviour cannot be ported, document the deviation; do not silently substitute.

---

# H. Harness / evidence rules

59. No claim without evidence.
60. Every R-stage must compile before review.
61. Every R-stage must output the exact evidence requested in `ACCEPTANCE.md`.
62. Every test run must record seed / build / task id where applicable.
63. Deterministic tests must use fixed random seed.
64. Local Codex reports observations, not artistic verdicts.
65. Local Codex must write `NOT TESTED` for anything not executed.
66. Local Codex must stop after updating A-SHEET.
67. It may not move itself to the next R-stage.
68. Reviewer alone writes `PASS / REVISE / REJECT`.

---

# I. Scope discipline

69. Implement one architectural layer or one visual state at a time.
70. Do not “while I am here” refactor accepted unrelated modules.
71. Do not add dependencies without logging reason in A-SHEET.
72. Do not create a parallel runtime if the canonical runtime can be extended.
73. Preserve old accepted captures and reports; never overwrite evidence silently.
74. Version every meaningful review point.
75. A working ugly implementation may pass a **technical gate** but cannot pass an **artistic gate** without Reviewer approval.
