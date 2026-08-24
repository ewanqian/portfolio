# SP-WEBXR — References

Verified reference set for the Spatial Playground experiment. Platform behaviour can change; re-check these sources when visionOS/Safari versions change.

## Apple / WebKit

### WebXR support in Safari 18 / visionOS 2

WebKit — *WebKit Features in Safari 18.0*  
https://webkit.org/blog/15865/webkit-features-in-safari-18-0/

Use for:

- immersive WebXR shipping in Safari on visionOS;
- `immersive-vr`;
- `transient-pointer`;
- WebXR hand tracking.

### Natural input on Apple Vision Pro

WebKit — *Introducing Natural Input for WebXR in Apple Vision Pro*  
https://webkit.org/blog/15162/introducing-natural-input-for-webxr-in-apple-vision-pro/

Use for:

- look + pinch interaction model;
- `transient-pointer` lifecycle;
- `targetRaySpace` vs `gripSpace`;
- combining transient pointer with full hand tracking;
- privacy-preserving interaction assumptions.

Important implementation note from this source: persistent hand-tracking input sources and transient-pointer input sources can coexist. Do not assume the first two `inputSources` are selection controllers.

### Safari 26.2 / WebGPU in WebXR

WebKit — *WebKit Features for Safari 26.2*  
https://webkit.org/blog/17640/webkit-features-for-safari-26-2/

Use for:

- current WebXR/WebGPU platform direction;
- confirmation that WebXR has continued beyond the original Safari 18 release.

WebGPU is not required for the first harness.

### Current immersive-ar boundary on visionOS

WebKit Bugzilla — *[WebXR|VisionOS] WebXR incorrect reports support for 'immersive-ar' sessions*  
https://bugs.webkit.org/show_bug.cgi?id=305459

Use for:

- evidence that `immersive-ar` was still unsupported on visionOS when this bug was fixed in January 2026;
- preventing the first experiment from depending on passthrough AR.

Apple Developer Forums — WebXR tag  
https://developer.apple.com/forums/tags/webxr

Use only as secondary/current implementation discussion. Do not treat forum questions as specification.

---

## WebXR standards / MDN

### WebXR Hand Input Module — Level 1

Immersive Web Working Group  
https://immersive-web.github.io/webxr-hand-input/

Use for:

- normative 25-joint WebXR hand model;
- joint names;
- `XRHand`;
- `XRJointPose`;
- joint radius semantics.

### XRHand

MDN  
https://developer.mozilla.org/en-US/docs/Web/API/XRHand

Use for:

- practical joint list;
- `XRHand.size === 25`;
- browser-facing examples.

### XRFrame.getJointPose()

MDN  
https://developer.mozilla.org/en-US/docs/Web/API/XRFrame/getJointPose

Use for:

- querying a hand-joint pose relative to a chosen reference space.

### XRViewerPose

MDN  
https://developer.mozilla.org/en-US/docs/Web/API/XRViewerPose

### XRFrame.getViewerPose()

MDN  
https://developer.mozilla.org/en-US/docs/Web/API/XRFrame/getViewerPose

Use these for:

- headset/viewer position;
- orientation;
- deriving head-facing direction and yaw/pitch/roll from orientation.

### WebXR spatial tracking / reference spaces

MDN  
https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API/Spatial_tracking

MDN  
https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API/Geometry

Use for:

- reference-space reasoning;
- consistent local coordinate systems;
- avoiding accidental mixing of viewer-local and world/local coordinates.

---

## OSC / browser transport

### osc-js

GitHub  
https://github.com/adzialocha/osc-js

Use for:

- OSC packet creation in browser/Node environments;
- browser WebSocket client;
- Node bridge between WebSocket and UDP OSC.

The browser side must not assume direct UDP access. The bridge exists because browser WebSocket transport and performance-software UDP OSC are different network environments.

### osc.js

GitHub  
https://github.com/colinbdclark/osc.js

Alternative reference implementation for OSC over browser WebSocket + Node/UDP workflows.

---

## Research interpretation rule

These sources establish API/platform capability. They do **not** establish that a particular spatial mapping is musically or performatively superior.

Claims such as:

```text
Z depth is more expressive than 2D
head tilt is a useful musical control
control volumes improve performance
six macros are the optimal control vocabulary
```

remain experiment results or provisional hypotheses until tested under `TASKBOOK.md` and `ACCEPTANCE.md`.
