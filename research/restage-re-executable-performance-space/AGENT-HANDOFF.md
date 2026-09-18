# ReStage — Agent Handoff

**Project:** ReStage — Re-executable Performance Space  
**Canonical document:** `README.md`  
**Repository:** `ewanqian/portfolio`  
**Status:** active long-term research

## 1. Agent role

Agents are implementation and research assistants. They may inspect, transform, build and test ReStage assets, but they must not silently convert hypotheses into verified claims.

Every task must preserve:

- canonical coordinate system;
- provenance of measured vs simulated data;
- distinction between archival truth and designed variation;
- platform-independent OPS data;
- reproducible build and test evidence.

## 2. Stable architecture

```text
CAPTURE
→ OPS PACKAGE
→ PLATFORM ADAPTER
→ RENDERER
→ TEST
→ EVIDENCE
```

Platform adapters:

- Web
- Unity
- RealityKit / visionOS

Research layers:

- spatial reconstruction
- acoustics
- media-driven illumination
- temporal / performance state
- AI inference
- agent harness

## 3. Model baseline

Use **DeepSeek V4.1 Flash** (`deepseek-flash`) as the first tracked external baseline when evaluating low-cost multimodal coding-agent execution.

Do not call older `deepseek-v4-flash` behaviour a separate current model; it is a compatibility route.

## 4. Mandatory completion report

Any agent claiming a task is complete must return:

```text
TASK
MODEL
HARNESS VERSION
CANONICAL PATHS
FILES CHANGED
COMMIT SHA
BUILD COMMAND
BUILD RESULT
TEST COMMAND
TEST RESULT
DEVICE / RUNTIME
VISUAL EVIDENCE
AUDIO EVIDENCE
REGRESSION CHECK
TOKENS / COST
KNOWN LIMITATIONS
HUMAN INTERVENTIONS
NEXT SINGLE BIGGEST PROBLEM
```

Unexecuted fields must say `NOT TESTED`.

## 5. Data truth labels

Every acoustic / visual reconstruction artifact must carry one of:

```text
MEASURED
SIMULATED
INFERRED
DESIGNED
```

Never merge these labels into one ambiguous “reconstruction” result.

## 6. Agent acceptance gates

### Repository understanding

Agent must identify:

- canonical OPS manifest;
- coordinate system;
- timeline;
- media;
- acoustic probes;
- platform adapters;
- test entry points.

### Edit safety

Agent must not:

- rewrite measured data to make simulation look better;
- invent device-test evidence;
- claim Vision Pro validation without a device or simulator result;
- collapse GLB / USDZ / Gaussian assets into one canonical truth;
- bypass build / test instructions.

### Cross-platform task

A successful adapter task must prove:

```text
same OPS input
→ platform-specific runtime
→ same canonical positions / timing
→ documented visual / acoustic differences
```

## 7. Current first implementation target

One room:

- one venue mesh;
- one screen;
- two speaker positions;
- one listener;
- 3–5 RIR measurements;
- one visual master;
- one stereo master;
- optional Ambisonic recording.

Required prototypes:

1. Unity media-driven illumination.
2. Unity acoustic field with Measured / Simulated / Designed modes.
3. Web OPS inspector.
4. RealityKit reference reconstruction.
5. DeepSeek V4.1 Flash harness task that modifies one scene property and produces a passing evidence report.
