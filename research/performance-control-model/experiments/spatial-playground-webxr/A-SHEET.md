# SP-WEBXR — A-SHEET

> Single coordination surface for Ewan / ChatGPT Reviewer / local Codex Executor.  
> Executor updates implementation facts only. Reviewer owns PASS / REVISE / REJECT and research interpretation.

---

# 0. Project identity

```text
PROJECT CODE      SP-WEBXR
PROJECT NAME      Spatial Playground / WebXR Performance Control
PARENT RESEARCH   research/performance-control-model/
PLATFORM TARGET   Apple Vision Pro / Safari / WebXR
WEB STACK         Vite + TypeScript + Three.js + WebXR
TRANSPORT         WSS → Mac Node bridge → UDP OSC
STATUS            SPEC READY
```

---

# 1. Mandatory read order

```text
01 README.md
02 TASKBOOK.md
03 HARNESS.md
04 ACCEPTANCE.md
05 REFERENCES.md
06 A-SHEET.md
07 ../../AGENT-HANDOFF.md if parent control-model clarification is needed
```

Do not start implementation from this sheet alone.

---

# 2. Roles

## REVIEWER

Ewan + ChatGPT.

Owns:

```text
research question
scope
PASS / REVISE / REJECT
mapping judgment
performance judgment
architecture unlock
frozen decisions
next stage
```

## EXECUTOR

Local Codex / implementation agent.

Owns:

```text
code
build
runtime test
logs
capture
metrics
fact reporting
commit
```

Executor does not convert an implemented feature into a research conclusion.

---

# 3. ACTIVE TASK

```text
TASK ID           W000
TASK NAME         Repository + Harness Bootstrap
TASK STATUS       READY_FOR_EXECUTOR
REVIEW STATUS     NOT REVIEWED
DEVICE TEST       NOT REQUIRED FOR W000
ARTISTIC MAPPING  FORBIDDEN
MUSIC SYSTEM      FORBIDDEN
```

## Objective

Create the minimum reproducible web + bridge harness described in `TASKBOOK.md → W000`.

## Required implementation

```text
research/performance-control-model/experiments/spatial-playground-webxr/
  web/
    package.json
    src/
      main.ts
      xr/
      debug/
      transport/
      volumes/
      state/
  bridge/
    package.json
    src/
      server.ts
  reports/
  captures/
```

Runtime modes must exist architecturally:

```text
mock
xr
replay
```

Only `mock` must be functional in W000.

## Required visible runtime

```text
SP-WEBXR
build id
mode = mock
XR support state
WSS state
FPS
message rate
recorder state
reset control
```

No polished interface required.

## Required test

```text
1 install dependencies cleanly
2 build successfully
3 launch mock mode
4 run 60 seconds
5 no uncaught exception
6 reload
7 reconnect/reinitialize cleanly
8 save screenshot
9 write report
```

## Evidence

```text
captures/W000-desktop.png
reports/W000-report.md
```

## Stop condition

After implementation + test + factual A-SHEET update:

```text
TASK STATUS = AWAITING_REVIEW
STOP
```

Do not begin W001.

---

# 4. EXECUTOR REPORT — W000

```text
TASK STATUS            READY_FOR_EXECUTOR
BRANCH                  NOT STARTED
COMMIT SHA              NOT STARTED
NODE VERSION            NOT TESTED
PACKAGE MANAGER         NOT TESTED
WEB BUILD               NOT TESTED
BRIDGE BUILD            NOT TESTED
MOCK RUNTIME            NOT TESTED
60S IDLE                NOT TESTED
RELOAD                   NOT TESTED
UNCAUGHT ERRORS         NOT TESTED
SCREENSHOT PATH          NOT TESTED
REPORT PATH              NOT TESTED
KNOWN LIMITATIONS        NOT TESTED
```

### Files changed

```text
NOT STARTED
```

### Commands used

```text
NOT STARTED
```

### Observed failures

```text
NONE REPORTED YET
```

### Executor questions

Maximum three. Ask only if implementation cannot proceed without a design-level decision.

```text
NONE
```

---

# 5. REVIEWER DECISION — W000

```text
DECISION                PENDING
TECHNICAL GATE          PENDING
RESEARCH GATE           NOT APPLICABLE
FREEZE MODULES          PENDING
NEXT TASK               PENDING
NEXT SINGLE QUESTION    PENDING
```

---

# 6. Stage board

```text
W000 Harness Bootstrap                  ACTIVE / READY_FOR_EXECUTOR
W001 D00 Sensor Scope                   LOCKED
W002 Secure Transport + OSC             LOCKED
W003 D01 Control Volumes                LOCKED
W004 D02 Playground 2D → 3D             LOCKED
W005 D03 Performance Control Loop       LOCKED
W006 Human Validation                   LOCKED
```

---

# 7. Frozen decisions

```text
F01 Browser-first WebXR is the first implementation path.
F02 First platform target is Safari on Apple Vision Pro.
F03 First XR session target is immersive-vr, not immersive-ar.
F04 Continuous raw gaze is not a required input.
F05 Full WebXR hand tracking is required for the research line.
F06 Viewer/head pose is part of the capability probe.
F07 Browser → Mac transport uses secure WebSocket first.
F08 Mac bridge → performance software uses UDP OSC.
F09 Raw joint data is diagnostic; live performance defaults to derived features/macros.
F10 D00 must pass on a real Vision Pro before control-volume claims are accepted.
F11 3D is not assumed better than 2D; D02 is a controlled comparison.
F12 Evidence and replay are first-class parts of the harness.
F13 Performance Control Model remains the parent theory and evaluation framework.
```

---

# 8. Change-request protocol

If a frozen decision blocks implementation:

1. stop;
2. record the exact platform/build/runtime evidence;
3. explain the incompatibility;
4. provide at most three implementation alternatives;
5. choose none;
6. set `TASK STATUS = BLOCKED_REVIEW_REQUIRED`;
7. wait for Reviewer decision.

---

# 9. Handoff instruction for local Codex

Use this exact instruction:

> Read `research/performance-control-model/experiments/spatial-playground-webxr/A-SHEET.md` and every mandatory file it lists. Execute only the ACTIVE TASK. You are the implementation executor, not the research or artistic reviewer. Run every required test, create the required evidence, update only factual Executor Report fields, commit the work, set the task to AWAITING_REVIEW, and stop. Do not begin the next W-stage.
