# XR Interaction / Spatial Input — Research Index

**Owner:** Ewan Qian / individual experimental spatial interface research  
**Position:** input technology and embodied interaction, not inherently a music-production project.

## Research taxonomy

- **XR Interaction** — head, hand, finger joints, tracked-space coordinate frames and event interpretation.
- **Spatial Input / OSC** — transform hand poses and volumetric region crossing into semantic events and structured control data.
- **Spatial Audiovisual Performance** — downstream use of those data to operate sound, visual fields, 3D scenes and live stage cues.

## Two current playable applications

1. **Hand / Space / OSC — Hand OSC Lab 02**  
   Category: XR Interaction / Spatial Input  
   Source: https://github.com/ewanqian/performable-music/tree/main/spatial-playground/hand-osc-lab  
   Preview: https://ewanqian.github.io/performable-music/spatial-playground/hand-osc-lab/  
   25 WebXR hand joints per hand, wireframe hands, index fingertip interactions with editable 3D regions, OSC bridge.

2. **Critical Field XR**  
   Category: Spatial Audiovisual Performance / Spatial Instrument  
   Source: https://github.com/ewanqian/performable-music/tree/main/spatial-playground  
   Preview: https://ewanqian.github.io/performable-music/spatial-playground/  
   Four-act immersive virtual stage with Show Score, record/replay and desktop/headset previews.

## Repository boundary

Current source of both web apps is the public **performable-music** repository; the personal **portfolio** repository provides the long-term research taxonomy and external-facing application launchpad at https://ewanqian.site/#/apps.

This ownership is practical, not an assertion that Hand / Space / OSC belongs conceptually to music. If the sensor input library grows beyond a performance demo, extract reusable hand-space geometry, OSC messages, zone engines and QA into a dedicated **spatial-playground** repository as a documented migration. Avoid duplicating live application code across repos until such a migration is agreed and tested.

## Operational / privacy boundary

This index is a public catalog, not a backstage control panel. It does not host protected WSS tokens, non-public collaborator data, private OSC addresses, personal location, raw hand recordings, or API secrets. A user must explicitly enter connection details in the local app when testing.

Quest Browser passthrough, Vision Pro immersive VR, input tracking quality, WSS bridge connectivity and event latency remain contingent on real hardware and runtime verification. Publishing a link does not imply headsets or audio hardware have passed acceptance.

## Quality goal

A user should be able to:
1. open the personal site,
2. tap **Apps**,
3. launch a WebXR prototype in a new tab on desktop/Quest/Vision Pro,
4. test independently with simulated control, then connect to local OSC with user-supplied credentials,
5. return to the app directory without losing the personal portfolio.
