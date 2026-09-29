# 2026-09-29 Concept Update
## Live Show Copilot / Stage Replica / Visual Audio

**Status:** Working snapshot  
**Issue:** #77

## Current public-facing direction

### Module 01｜Live Show Copilot / 现场副驾
Previous short name: 一键控场 / One-Button Show Control

Core idea:

> AI / MCP helps compress a complex live-performance setup into a small number of layered, playable controls. The performer remains in control during the show.

Possible inputs:
- plain keyboard
- MIDI controller
- foot pedals
- faders / knobs

Possible control layers:
- safe base layer
- BPM / pulse layer
- visual clips
- strobe / accent
- BLACK / CLEAR / recovery

The AI role is primarily **setup assistance and control-system organization**, not autonomous live performance.

## Module 02｜Stage Replica / 舞台复刻
Previous short name: 舞台预演 / Stage Previsualization

Public hook:

> 你有没有看过一场演唱会、一款游戏或者一个电影场景，想过：如果这个舞台是我的，我会在上面放什么？

Main experience:
- start from a reference image / live video / virtual world
- identify key screens and spatial structure
- rebuild or remix them into a digital stage
- map personal video content into the screens
- inspect from multiple viewpoints
- keep the result as a reusable stage sandbox

The browser workflow is the default path. Blender / Blender MCP is an optional advanced layer.

## Research branch｜Visual Audio

Visual-first audiovisual composition:

```text
VISUAL STRUCTURE
↓
EVENTS / CURVES / STATES
↓
AI / MCP
↓
MUSICAL STRUCTURE
```

Visual sources can include:
- camera movement
- object motion
- keyframes
- light states
- cuts
- scale changes
- scene states
- spatial changes

Potential musical outputs:
- tempo / pulse
- dynamics
- rhythm
- texture
- sound events
- transitions
- stereo / spatial motion

Definition:

> Visual Audio treats time, motion, space and state inside a visual scene as inputs for generating or controlling musical structure.

This is not simply automatic BGM generation. It is an extension of the same-source audiovisual method: the visual project itself becomes a source for sound structure.
