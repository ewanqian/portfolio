# Visual Audio
## Visual-first Audiovisual Composition

**Established:** 2026-09-29  
**Status:** Early research / prototype direction  
**Related:** #15 / #59 / #77

> **把视觉工程里的时间、运动、空间和状态，当作音乐生成的输入。**

## Why

Most audiovisual pipelines are described as:

```text
AUDIO
↓
VISUAL
```

Audio drives animation, FFT drives parameters, or music is analyzed first and visuals follow.

Visual Audio explores the reverse direction:

```text
VISUAL STRUCTURE
↓
MACHINE-READABLE EVENTS / CURVES
↓
AI / MCP
↓
MUSICAL STRUCTURE
```

A visual scene already contains temporal information:
- camera movement
- object motion
- keyframes
- light states
- cuts
- scene changes
- scale and density
- spatial expansion / contraction

Instead of treating those only as image data, they can become compositional inputs.

## Working pipeline

### 1. Visual source
A Blender scene, realtime visual scene, stage timeline or other visual project.

### 2. Extract structure
Convert visual events into a simple intermediate description:

```json
{
  "time": 42.0,
  "event": "camera_accelerate",
  "energy": 0.8,
  "space": "expand",
  "state": "overload"
}
```

### 3. Translate
Agent / MCP maps these visual events into musical decisions.

Possible outputs:
- tempo or pulse
- dynamic envelope
- rhythmic density
- texture
- sound events
- section boundaries
- stereo / spatial movement
- transition instructions

### 4. Execute
Send the result toward Ableton / DAW / generative audio systems as:
- arrangement instructions
- MIDI
- automation
- structured prompts
- control data

## Important distinction

Visual Audio is **not** simply:

> “AI watches a video and makes background music.”

The intended model is:

> **The visual project's structure becomes a compositional source.**

This extends the earlier same-source audiovisual idea:

```text
ONE INPUT
→ SOUND + VISUAL
```

toward:

```text
VISUAL SYSTEM
→ MUSICAL SYSTEM
```

## Current experiment

Current direction uses a Blender visual project because it already contains explicit:
- keyframes
- camera data
- lights
- animation curves
- scene states

MCP / Agent can read or summarize these structures and translate them into musical organization.

The first useful demo should be small:
1. choose one short visual scene;
2. export a few key visual events;
3. derive 3–4 musical states;
4. send them into an Ableton or DAW workflow;
5. compare the generated structure with the visual timeline.

## Research questions

- What visual parameters are musically meaningful?
- Which mappings should be deterministic, and which should remain generative?
- How can visual pacing become rhythmic pacing without literal one-to-one synchronization?
- Can camera and spatial movement become stereo / spatial audio movement?
- Can this become a reusable authoring method rather than a one-off AI trick?
