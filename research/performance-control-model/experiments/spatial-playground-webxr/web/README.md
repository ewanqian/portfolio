# Phase 01 — Sensor Scope

This is the first runnable browser prototype of **Spatial Playground / WebXR Performance Control**.

## Purpose

Prove the sensing layer before OSC, music mapping or artistic state design.

The page has two runtime states:

- `mock`: synthetic head + two 25-joint hands for desktop development;
- `xr`: real WebXR viewer pose + `XRHand` joint poses when available.

## What is shown

- WebXR immersive-vr capability state;
- head position;
- head orientation quaternion;
- derived yaw / pitch / roll;
- left hand joint count;
- right hand joint count;
- index fingertip XYZ;
- wrist XYZ;
- thumb–index pinch distance;
- two-wrist distance;
- FPS;
- in-memory recording state.

The immersive scene also contains a world-space diagnostic panel so the basic sensor state remains visible after entering XR.

## Vision Pro test

1. Open this page in Safari on Apple Vision Pro over HTTPS.
2. Confirm `XR = VR READY`.
3. Press `Start Recording` before entering XR if a capture is required.
4. Press the WebXR enter button.
5. Grant the requested WebXR permissions.
6. Move both hands into view.
7. Verify each tracked hand reports `25/25 joints`.
8. Pinch thumb and index finger repeatedly and verify pinch distance changes.
9. Move hands independently in X/Y/Z.
10. Turn head left/right, up/down and tilt it; verify yaw/pitch/roll change.
11. Exit XR.
12. Press `Export JSON` and preserve the recording as experimental evidence.

## Pass condition for the first device probe

Do not call Phase 01 device-validated until a real Vision Pro run confirms:

- immersive session starts;
- head pose updates continuously;
- left/right WebXR hands appear when granted;
- 25 standard joints are readable for each tracked hand;
- joint XYZ values move with the performer;
- pinch distance responds to real thumb/index motion;
- exported recording contains real `mode: "xr"` frames.

## Deliberate exclusions

Not in Phase 01:

- gaze coordinates;
- OSC;
- WebSocket transport;
- control volumes;
- audio;
- visuals beyond diagnostics;
- performance states;
- claims that 3D control is superior to 2D.

## Dependency choice

The rapid prototype intentionally uses pinned Three.js ES modules from jsDelivr instead of introducing a build step. This keeps the first device test to a single HTTPS page. Once the sensing assumptions pass on a real Vision Pro, the reusable harness can be migrated into the long-term Vite / TypeScript structure described by the project Taskbook.
