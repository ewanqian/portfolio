# P01 Source Report — Sensor Scope

**Date:** 2026-08-24  
**Status:** SOURCE IMPLEMENTED / REAL VISION PRO NOT TESTED

## Scope implemented

A rapid no-build WebXR prototype now exists at:

```text
web/
  index.html
  styles.css
  app.js
  README.md
```

The rapid prototype deliberately precedes the long-term Vite/TypeScript migration so the first Vision Pro capability probe can happen with the least deployment friction.

## Implemented runtime paths

### Mock

- synthetic left hand with the 25 standard WebXR joint names;
- synthetic right hand with the 25 standard WebXR joint names;
- synthetic head position + quaternion;
- derived yaw / pitch / roll;
- changing pinch distances;
- changing two-hand distance;
- visual 3D joint markers;
- world-space diagnostic panel.

### XR source path

When an immersive WebXR frame is available, the page attempts to read:

```text
XRFrame.getViewerPose(referenceSpace)
XRSession.inputSources
XRInputSource.hand
XRFrame.getJointPose(jointSpace, referenceSpace)
```

For each available hand joint it records:

```text
position x y z
orientation x y z w
radius
```

Derived signals currently implemented:

```text
left pinch distance
right pinch distance
two-wrist distance
head yaw
head pitch
head roll
```

## Recorder

The browser can record timestamped frame snapshots in memory at approximately 30 Hz and export them as JSON.

The export includes:

```text
schema
export time
user agent
XR support flag
frame count
viewer pose
available hand joints
derived signals
mode = mock | xr
```

## Static checks performed by ChatGPT environment

```text
node --check app.js                  PASS
HTML element ids                     19
JS DOM references                    19
missing DOM references               0
standard WebXR joint names declared  25
```

## Runtime limitation of this report

The execution environment used to prepare this source did not have external CDN network resolution, so Three.js could not be loaded there for a meaningful browser-render smoke test. This is an environment limitation, not evidence that the browser runtime passes.

Therefore the following remain explicitly:

```text
DESKTOP WEBGL RUNTIME      NOT TESTED
PUBLIC HTTPS DEPLOY        NOT TESTED
VISION PRO IMMERSIVE-VR    NOT TESTED
REAL HAND TRACKING         NOT TESTED
REAL HEAD POSE             NOT TESTED
REAL JSON XR RECORDING     NOT TESTED
```

## Next validation action

Open the HTTPS-hosted page on a real Apple Vision Pro and execute the exact sequence in `web/README.md`.

Do not proceed to Control Volumes based only on mock data. The project gate remains real-device evidence of WebXR hands + viewer pose.
