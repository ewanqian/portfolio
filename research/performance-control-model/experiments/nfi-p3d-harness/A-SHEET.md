# NFI-P3D-HARNESS — A-SHEET

> **Single coordination surface** for Ewan / ChatGPT Reviewer / local Codex Executor.  
> **Rule:** Executor updates facts only. Reviewer writes decisions.

---

# 0. Project identity

```text
PROJECT CODE      NFI-P3D-HARNESS
PROJECT NAME      No Further Input Required — Performance P3D Harness
LINE              NFI Performance / Personal A/V Instrument
ENGINE            Processing + P3D
GOLDEN REFERENCE  works/no-further-input-required.html (Interactive v0.7)
CONTROL MODEL     research/performance-control-model/
STATUS            SPEC READY
```

---

# 1. Roles

## REVIEWER

ChatGPT + Ewan.

Owns:

```text
PASS / REVISE / REJECT
visual judgment
musical judgment
performance judgment
scope changes
architecture unlock
state freeze / unfreeze
next task
```

## EXECUTOR

Local Codex.

Owns:

```text
implementation
compilation
runtime test
replay
capture
logs
metrics
fact reporting
```

Executor does **not** own final artistic judgment.

---

# 2. Mandatory read order

Before touching code, Executor must read:

```text
01 README.md
02 GOLDEN-RULES.md
03 PROCESSING-ARCHITECTURE.md
04 TASKBOOK.md
05 ACCEPTANCE.md
06 A-SHEET.md
07 works/no-further-input-required.html when behaviour reference is needed
08 research/performance-control-model/AGENT-HANDOFF.md when control-model clarification is needed
```

Then execute only `ACTIVE TASK` below.

---

# 3. ACTIVE TASK

```text
TASK ID           R000
TASK NAME         Harness Bootstrap
TASK STATUS       READY_FOR_EXECUTOR
REVIEW STATUS     NOT REVIEWED
ARTISTIC WORK     FORBIDDEN
P3D ARTWORK       FORBIDDEN
AUDIO REDESIGN    FORBIDDEN
```

## R000 objective

Create the minimum Processing / P3D runtime + harness required to make later experiments reproducible.

This is infrastructure only.

## Required implementation

Read `TASKBOOK.md → R000` and implement exactly that scope.

Minimum expected structure:

```text
runtime/
  NFI_Performance_P3D/
    NFI_Performance_P3D.pde
    AppConfig.pde
    HarnessMode.pde
    CaptureController.pde
  harness/
  captures/R000/
  reports/
```

If local repository / Processing constraints require a slightly different folder layout, Executor may adjust once and must document it below.

## Required visible runtime

Diagnostic only:

```text
dark background
build id
mode
FPS
BPM 104
bar / beat / step placeholder or initial clock
state id placeholder
seed
```

No designed particle / line / object system.

## Required test

```text
1 launch cleanly
2 run idle for 60 seconds
3 no uncaught exception
4 save one screenshot
5 restart with same seed
6 report whether initialization facts match
```

## Required evidence

```text
captures/R000/idle.png
reports/R000-report.md
```

If screenshot automation is impossible, document the exact manual capture action and still save the result.

## Stop condition

After implementation + test + A-SHEET update:

```text
TASK STATUS = AWAITING_REVIEW
STOP
```

Do not begin R001.

---

# 4. EXECUTOR REPORT — R000

> Executor fills this section only after running the task. Do not delete placeholders; replace values.

```text
TASK STATUS            READY_FOR_EXECUTOR
BRANCH                  NOT STARTED
COMMIT SHA              NOT STARTED
PROCESSING VERSION      NOT TESTED
JAVA VERSION            NOT TESTED
OS                      NOT TESTED
DEPENDENCIES ADDED      NONE / NOT STARTED
BUILD METHOD            NOT TESTED
BUILD RESULT            NOT TESTED
RUNTIME RESULT          NOT TESTED
60S IDLE RESULT         NOT TESTED
CONSOLE ERRORS          NOT TESTED
MEAN FPS                NOT TESTED
SEED                     NOT TESTED
RESTART CONSISTENCY     NOT TESTED
SCREENSHOT PATH          NOT TESTED
REPORT PATH              NOT TESTED
KNOWN LIMITATIONS        NOT TESTED
```

### Files changed

```text
NOT STARTED
```

### Exact commands / manual steps used

```text
NOT STARTED
```

### Observed failures

```text
NONE REPORTED YET
```

### Technical cause hypothesis

Executor may add a short implementation-level hypothesis. If unknown, write `UNKNOWN`.

```text
UNKNOWN
```

### Executor questions for Reviewer

Maximum 3 questions. Only ask if implementation cannot proceed without a design-level decision.

```text
NONE
```

---

# 5. REVIEWER DECISION — R000

> **Executor must not edit this section.**

```text
DECISION                PENDING
TECHNICAL GATE          PENDING
ARTISTIC GATE           NOT APPLICABLE FOR R000
FREEZE MODULES          PENDING
NEXT TASK               PENDING
NEXT SINGLE PROBLEM     PENDING
```

### Reviewer notes

```text
Pending evidence.
```

---

# 6. Stage board

```text
R000 Harness bootstrap                  ACTIVE / READY_FOR_EXECUTOR
R001 Transport + StructuralScore        LOCKED
R002 ControlBus + Event model           LOCKED
R003 v0.7 QWERTY instrument port        LOCKED
R004 Diagnostic P3D proof               LOCKED
R005 FIELD P3D                          LOCKED
R006 ORBIT P3D                          LOCKED
R007 REWIND / MEMORY P3D                LOCKED
R008 ROUTE / CELLS / PARTITION          LOCKED
R009 AudioObserver / offline analysis   LOCKED
R010 Performance integration            LOCKED
R011 Human validation                   LOCKED
```

Only Reviewer unlocks the next line.

---

# 7. Frozen decisions

The following decisions are already frozen for the current experiment:

```text
F01 v0.7 behavioural baseline is canonical.
F02 project is Performance Line, not NFI exhibition line.
F03 default BPM = 104.
F04 36-key QWERTY topology is core asset.
F05 Processing uses P3D from project bootstrap, even before artistic P3D states.
F06 new visual effects are forbidden before R004.
F07 Agent is executor; Reviewer owns artistic judgment.
F08 deterministic replay / evidence capture is mandatory.
F09 one state / layer at a time.
F10 a failed stage does not authorize free redesign.
```

---

# 8. Change-request protocol

If Executor discovers that a frozen decision makes implementation technically impossible:

1. stop;
2. explain the exact incompatibility;
3. show compiler/runtime evidence;
4. propose no more than 3 implementation alternatives;
5. do not choose one;
6. set task status `BLOCKED_REVIEW_REQUIRED`;
7. wait for Reviewer.

---

# 9. Handoff instruction for local Codex

The user can instruct local Codex simply:

> Read `research/performance-control-model/experiments/nfi-p3d-harness/A-SHEET.md` and all mandatory files it lists. Execute only the ACTIVE TASK. You are the executor, not the artistic reviewer. Run every required test, update only the Executor Report / factual status in A-SHEET, commit your work, and stop at AWAITING_REVIEW. Do not begin the next R-stage.

No additional creative prompt is required for R000.
