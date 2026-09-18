# ReStage — Re-executable Performance Space

**可再执行的演出空间 / Re-executable Performance Space**  
**Status:** Long-term Research Project  
**Initiated:** 2026-09-18  
**Researcher:** Ewan Qian / 钱誉文

## Abstract

ReStage investigates how a live audiovisual performance can be preserved not as a flat recording, but as a **re-executable spatial state**. The project combines spatial capture, screen/media reconstruction, room-acoustic measurement, ambisonic field recording, media-driven illumination, spatial audio rendering, show-clock synchronization, and AI-assisted reconstruction into one cross-platform research system.

The long-term goal is to represent a performance as an open, machine-readable scene package that can be reloaded across Web, Unity and Apple Vision Pro. Instead of preserving only a video of what happened, ReStage preserves the venue, media surfaces, acoustic field, speaker configuration, timing, lighting influence, and performance state so that the work can be re-entered, compared, modified and re-performed.

ReStage extends earlier research on realtime audiovisual control systems, including TIMER, DROP FLOW, Performance Control Model and live visual systems developed for performance. The research question shifts from **how an audiovisual performance system runs** to **how the spatial state of a performance can be measured, reconstructed and executed again**.

## 摘要

ReStage 研究如何把一次现场视听演出保存为一种**可再次执行的空间状态**，而不是只留下单一机位的视频记录。

项目将空间扫描、屏幕与媒体重建、房间声学测量、Ambisonics 球形声场、媒体驱动环境光、空间音频渲染、Show Clock、多端同步与 AI 辅助重建整合为一套长期研究系统。目标是把一次现场演出压缩成一个开放、机器可读的 Performance Scene，使同一份演出数据能够在 Web、Unity、Apple Vision Pro 以及未来的空间计算终端中重新加载。

研究不只保存“当时播放了什么”，还试图保存：演出发生在哪里、屏幕如何影响空间、声音怎样被材料与几何改变、扬声器和观众位于何处、时间与状态如何推进，以及这些关系怎样在另一个终端中再次被执行。

ReStage 承接 TIMER、DROP FLOW、Performance Control Model 与现场实时视觉系统的研究脉络，把研究问题从“如何设计和控制一个演出系统”推进到“如何测量、表示、重建并再次执行一个演出空间”。

---

## 1. Core Research Question

> **Can a live audiovisual performance be represented as a sparse, multimodal, machine-readable spatial state that can be reconstructed and re-executed across Web and spatial-computing platforms?**

Supporting questions:

1. How little visual and acoustic data is needed to reconstruct a perceptually convincing performance space?
2. Can measured room responses and simulated acoustics be combined into one editable field?
3. Can large LED / video surfaces drive convincing environmental illumination without full realtime path tracing?
4. Can one platform-independent scene description drive Web, Unity and RealityKit implementations?
5. Can AI agents reliably build, validate and migrate these scenes through a structured harness rather than ad-hoc prompting?

---

## 2. Research Position

ReStage is not a video archive and not a digital-twin project in the conventional facility-management sense.

It treats a performance as:

```text
PERFORMANCE
=
SPACE
+ MEDIA
+ SOUND
+ LIGHT
+ TIME
+ STATE
+ HUMAN ACTION
```

The archive therefore aims to preserve **relationships**, not only assets.

A reconstruction is successful when a new runtime can recover enough of those relationships to produce a meaningful re-performance.

---

## 3. Open Performance Scene — OPS v0.1

ReStage proposes **Open Performance Scene (OPS)** as an experimental, open working specification for AI-era performance archives.

OPS is not claimed as an industry standard. It is a research format designed to remain readable by humans, browsers, game engines, spatial-computing runtimes and AI agents.

### Canonical coordinate system

- meters
- Y-up
- one venue-local origin
- all screens, speakers, probes, cameras and listeners expressed in the same coordinate space
- runtime adapters may convert to platform-specific coordinates

### Proposed package

```text
show.ops/
├── manifest.json
├── timeline.json
├── venue/
│   ├── venue.glb
│   ├── venue.usdz
│   ├── gaussian.ply
│   └── materials.json
├── screens/
│   ├── screens.json
│   └── visual-master/
├── audio/
│   ├── master.wav
│   ├── stems/
│   ├── ambix.wav
│   └── rir/
├── probes/
│   ├── acoustic-probes.json
│   └── lighting-probes.json
├── speakers/
│   └── speakers.json
├── cameras/
│   └── cameras.json
├── state/
│   └── performance-state.json
└── evidence/
    ├── capture-log.json
    └── validation-log.json
```

### Core manifest concepts

```json
{
  "opsVersion": "0.1",
  "title": "Example Performance",
  "units": "meters",
  "upAxis": "Y",
  "timebase": "seconds",
  "scene": "venue/venue.glb",
  "timeline": "timeline.json",
  "screens": "screens/screens.json",
  "speakers": "speakers/speakers.json",
  "acousticProbes": "probes/acoustic-probes.json",
  "agentContract": "AGENT-HANDOFF.md"
}
```

---

## 4. Four Reconstruction Layers

### A. Spatial Reconstruction

Inputs:

- camera video / photographs
- LiDAR when available
- photogrammetry
- Gaussian Splatting
- manually verified venue dimensions

Outputs:

- venue mesh
- Gaussian representation
- material segmentation
- screen / stage / speaker coordinates

The visual representation does not need to be one format. OPS stores one canonical coordinate system and allows GLB, USDZ and Gaussian assets to coexist.

### B. Acoustic Reconstruction

Three acoustic modes are treated separately:

#### MEASURED

Real Room Impulse Responses, Ambisonic field recordings and direct board audio.

Goal: preserve the acoustic evidence of the actual event.

#### SIMULATED

Geometry + material properties + geometric acoustics / convolution.

Goal: produce a physically interpretable approximation that works at positions not directly measured.

#### DESIGNED

Artist-adjustable room scale, materials, decay, reflection structure and source routing.

Goal: turn reconstruction into a creative instrument without confusing designed acoustics with archival truth.

### C. Media-driven Illumination

Large LED screens are treated as dynamic light emitters.

Instead of requiring full path tracing, the system investigates low-cost mappings from screen/video space into receiving surfaces:

```text
VIDEO
→ spatial downsample / emitter texture
→ screen-to-surface mapping
→ diffuse spill + specular approximation
→ venue surfaces
```

This layer will compare:

- reference rendering
- LTC / area-light approximations
- RealityKit-style video reflection methods
- custom Unity shader implementations

### D. Temporal / Performance State

A reconstruction must preserve more than synchronized playback.

The canonical timeline stores:

```text
time
state
world
media
audio
screen
camera
event
transition
```

The same timeline should be able to drive Web, Unity and Vision Pro runtimes.

This continues the Performance Control Model principle that:

```text
Result = Input + State + History
```

but changes the problem from live control to preservation and re-execution.

---

## 5. Web + Apple Vision Pro Compatibility

The system uses a **platform-independent data layer** and platform-specific renderers.

### Web renderer

Primary roles:

- public portfolio access
- lightweight reconstruction
- dataset inspection
- timeline playback
- WebAudio / WebXR experiments
- agent-readable debugging
- low-barrier publication

Target technologies:

- WebGL / WebGPU
- WebAudio
- WebXR
- glTF / GLB
- WebSocket / WebRTC when synchronization is required

### Unity research renderer

Primary roles:

- authoring
- acoustic probe visualization
- DSP and convolution experiments
- material / geometry comparison
- shader research
- cross-platform validation
- custom native audio / spatializer plugins

Unity is treated as the main experimental workbench.

### RealityKit / visionOS reference renderer

Primary roles:

- Apple Vision Pro
- spatial audio
- custom reverb mesh
- physical-space lighting
- video reflections
- Gaussian Splatting
- native spatial interaction
- perception and presence testing

RealityKit is treated as the reference implementation for Apple spatial computing, not as the definition of the archive format.

---

## 6. AI Layer

AI is used for **inference, orchestration and validation**, not as an uncontrolled replacement for deterministic audio / graphics rendering.

```text
AI
↓
scene understanding / parameter estimation / task planning
↓
structured parameters
↓
deterministic renderer / DSP / build system
↓
measurable output
```

### AI research tasks

1. Visual material segmentation and acoustic-material priors.
2. Sparse RIR completion / acoustic-field estimation.
3. Geometry and material parameter fitting from measured acoustics.
4. Automatic OPS metadata extraction from capture sessions.
5. Natural-language control translated into explicit acoustic / visual parameters.
6. Cross-platform migration: Web ↔ Unity ↔ RealityKit.
7. Agent-based scene validation and regression testing.

---

## 7. Agent Harness Research

The AI component is not evaluated only by model quality. ReStage treats the **agent harness** as part of the research system.

The harness must provide:

```text
CONTEXT
+ TOOLS
+ FILE CONTRACT
+ BUILD COMMANDS
+ DEVICE TARGET
+ TESTS
+ EVIDENCE
+ FAILURE RECOVERY
```

The portfolio repository already uses `AGENTS.md` and evidence-based completion rules. ReStage extends that approach to spatial-media research.

### Baseline model

The first reference model is **DeepSeek V4.1 Flash** through `deepseek-flash`.

The baseline is selected because the current model provides native multimodal input, strong agent/coding benchmark results, low-cost cache behaviour and compatibility with coding-agent workflows.

### Harness benchmark

Each task must record:

```text
TASK
MODEL
HARNESS VERSION
INPUT CONTEXT
TOOL CALLS
TOKENS / COST
WALL-CLOCK TIME
BUILD RESULT
DEVICE RESULT
TEST RESULT
REGRESSION RESULT
HUMAN FIXES
FINAL EVIDENCE
```

Initial benchmark tasks:

1. Read an OPS package and explain its structure.
2. Add a new venue asset without breaking coordinate alignment.
3. Convert one Web scene into the Unity reference implementation.
4. Generate a RealityKit adapter from an existing OPS manifest.
5. Detect missing acoustic / visual metadata.
6. Run build and test loops until passing or report a blocked state.
7. Compare measured and simulated acoustic parameters and generate a reproducible report.
8. Inspect a screenshot / capture and locate probable screen, speaker and reflective-surface regions.

The research measures **task success, recovery, reproducibility, cost and evidence quality**, not only benchmark score.

---

## 8. First Demonstrator

The first complete demonstrator intentionally uses one room:

```text
1 real venue
2 PA sources
1 LED / video screen
1 listener
3–5 measured RIR positions
1 Ambisonic field recording when available
1 visual master
1 stereo audio master
1 canonical show clock
```

The demonstrator must prove:

1. venue reconstruction;
2. media-driven screen illumination;
3. listener-dependent spatial audio;
4. Measured / Simulated / Designed acoustic modes;
5. one OPS package loading in Web and Unity;
6. the same package translated into a Vision Pro reference scene;
7. an agent completing at least one cross-platform modification through the harness with a reproducible evidence report.

---

## 9. Evaluation

### Acoustic

- RT60
- EDT
- C50 / C80
- RIR similarity
- source / listener interpolation error
- perceptual listening comparison

### Visual

- screen-light approximation against reference
- reflected-light colour / intensity error
- runtime frame cost
- memory cost
- perceptual comparison

### Reconstruction

- sparse input count
- capture time
- spatial alignment error
- percentage of manually corrected materials / geometry

### Agent Harness

- completion rate
- build-pass rate
- recovery after induced failure
- number of human interventions
- token and API cost
- total runtime
- reproducibility on a fresh checkout
- quality of generated evidence

---

## 10. Research Lineage

```text
TIMER / DROP FLOW
→ realtime media, timing and spatial image

Performance Control Model
→ state, feedback, timing, reliability, 2D→3D control

Live visual systems / ATMOSPHERIC ESCAPE
→ multi-world realtime performance, mapping and show clock

ReStage
→ capture, measure, represent, reconstruct and re-execute the performance state
```

The new research object is therefore not only the performance system.

It is the **performance state after the event has ended**.

---

## 11. Publication Strategy

### Technical paper

Working title:

**Sparse Multimodal Reconstruction of Live Audiovisual Performance Spaces for Spatial Computing**

Core contribution should remain narrow and measurable:

> Can sparse visual and acoustic observations reconstruct a sufficiently accurate and perceptually convincing live-performance space for realtime re-execution?

System components such as Web publication, Vision Pro playback and show-clock synchronization support the contribution but are not all claimed as independent scientific innovations.

### Artistic / practice-research paper

Working title:

**From Recording to Re-execution: Multimodal Spatial Archives for Live Audiovisual Performance**

Core question:

> When a live performance can be measured, stored, modified and re-executed as a spatial state, what remains unique about the original event?

---

## 12. Research Phases

### Phase 0 — Specification

- OPS v0.1 manifest
- coordinate and time conventions
- capture folder standard
- agent evidence contract

### Phase 1 — Screen Light

- one video emitter
- Unity LTC / low-cost reflection prototype
- RealityKit reference comparison
- Web approximation

### Phase 2 — Acoustic Room

- 3–5 RIR points
- two virtual PA sources
- movable listener
- Measured / Simulated / Designed modes

### Phase 3 — Real Venue Capture

- geometry / Gaussian capture
- materials
- screen / speaker survey
- board master
- acoustic measurements
- optional Ambisonics

### Phase 4 — Cross-platform Reconstruction

- Web
- Unity
- RealityKit / Apple Vision Pro

### Phase 5 — Agent Harness

- DeepSeek V4.1 Flash baseline
- repeatable repository tasks
- multimodal scene inspection
- automatic build / test / evidence loop
- cost and recovery evaluation

### Phase 6 — Full Performance Reconstruction

- show clock
- multi-screen
- spatial audio
- performance state
- audience / performer viewpoints
- archival playback and re-performance

### Phase 7 — Paper Evaluation

- acoustic evaluation
- visual performance evaluation
- perception study
- agent harness evaluation
- publication dataset

---

## 13. Key References

- NeRAF: *3D Scene Infused Neural Radiance and Acoustic Fields*, ICLR 2025  
  https://proceedings.iclr.cc/paper_files/paper/2025/hash/e84aaafaf35a7e2b4389dfa22b0889c4-Abstract-Conference.html

- AV-RIR: *Audio-Visual Room Impulse Response Estimation*, CVPR 2024  
  https://openaccess.thecvf.com/content/CVPR2024/html/Ratnarajah_AV-RIR_Audio-Visual_Room_Impulse_Response_Estimation_CVPR_2024_paper.html

- AV-DAR: *Differentiable Room Acoustic Rendering with Multi-View Vision Priors*, ICCV 2025  
  https://openaccess.thecvf.com/content/ICCV2025/html/Jin_Differentiable_Room_Acoustic_Rendering_with_Multi-View_Vision_Priors_ICCV_2025_paper.html

- AV-Twin: *Building Audio-Visual Digital Twins with Smartphones*, MobiSys 2026  
  https://waves.seas.upenn.edu/projects/av-twin/

- Apple RealityKit: Custom Reverb Mesh / Gaussian Splatting / physical-space lighting, WWDC 2026  
  https://developer.apple.com/videos/play/wwdc2026/279/

- Apple: Video Reflections in an Immersive Environment  
  https://developer.apple.com/documentation/visionOS/enabling-video-reflections-in-an-immersive-environment

- LTCGI / Linearly Transformed Cosines implementation for Unity / VRChat  
  https://github.com/pimaker/ltcgi

- DeepSeek V4.1 Flash  
  https://api-docs.deepseek.com/updates/

---

## 14. Current Gate

The project is established when one real venue can be represented as an OPS package and the same package can:

1. load in Web;
2. load in Unity;
3. produce a Vision Pro reference reconstruction;
4. reproduce one measured-vs-simulated acoustic comparison;
5. reproduce one media-driven lighting comparison;
6. survive one agent-driven cross-platform modification with build, test and evidence.

Until then, all larger claims remain research hypotheses.
