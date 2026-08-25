# CURRENT EXHIBITION BOARD — No Further Input Required

Date: 2026-08-25
Status: **R4 FROZEN ARTWORK / WEB PRESENTATION MASTER / QA PENDING**
Issue anchor: `#56`
Freeze: `FINAL-FREEZE-2026-08-25.md`

The artwork is frozen. The browser build is now the primary viewing, recording and sharing implementation. Processing remains a reference implementation and provenance record.

## 1. Primary viewing entry

```text
https://ewanqian.site/nfi-r4.html
```

Repository runtime:

```text
projects/no-further-input-required/NFI_Web_R4/
  index.html
  sketch.js
```

Runtime:

```text
p5.js / Canvas
30-second deterministic loop
1800 logical frames @ 60 fps
16:9 responsive presentation
fullscreen capable
no audience input
no visible UI
```

Keys are QA-only and invisible during presentation:

```text
F fullscreen
D debug
R restart loop
S capture frame
SPACE pause
```

## 2. Frozen visual system

```text
Constraint Mechanism
+ Index Field
+ Quantized Memory
+ Sparse Historical Topology
+ Deterministic Outline Glyph Language
```

Shared hierarchy:

```text
12 × 7 major grid
→ 24 × 14 index grid
→ 72 × 42 memory micro-grid
```

Continuous progression:

```text
registration / sparse address
→ absorption / structural growth
→ recall / historical return + topology
→ autonomy / remainder
→ seamless return
```

No hard scene switch.

## 3. Why Web is now primary

The artistic system does not require Processing-specific features. The frozen R4 consists of deterministic 2D geometry, timing and state envelopes, so p5.js can express the same behaviour directly while making visual review, screen recording and sharing much cheaper.

Ponytail rule applied:

```text
do not maintain two active artwork implementations
→ Web is presentation master
→ PDE is frozen reference
```

Do not continue visual development in PDE unless Web parity exposes a specific missing behaviour.

## 4. Processing reference implementation

Historical/frozen implementation remains at:

```text
projects/no-further-input-required/NFI_Artwork_P3D/
```

Important reference files:

```text
NFI_Artwork_P3D.pde
AppConfig.pde
ArtworkContext.pde
Exhibition30Composer.pde
UnifiedGridSystem.pde
MechanicalGlyphLanguage.pde
```

The browser port preserves the R4 logic but is now the version to inspect first.

## 5. Frozen glyph language

No system-font Unicode is required for the final visual surface. Unicode research remains semantic ancestry only.

Runtime geometry:

```text
point
line
square
triangle
diamond
cross
ring
return arc
```

Glyphs share the same measurement system as Constraint / Index / Memory.

## 6. Graph / historical topology

During recall only, six fixed historical anchors expose seven fixed relations. The topology must read as historical relation, not network diagram, HUD or interface.

## 7. Locked visual rules

```text
near-black / grayscale
no readable prose
no HUD/dashboard
no random glitch
no particle filler
no decorative bloom
no camera orbit
no hard scene switches
no literal audio-reactive mapping
no performance-controller UI
```

## 8. Acceptance questions

1. Can an earlier structure be recognised when it returns?
2. Does later structure visibly depend on prior history?
3. Does topology read as historical relation rather than diagram/UI?
4. Is the densest moment ordered rather than merely busy?
5. Is empty space active?
6. Does the system remain alive when new activity falls away?
7. Does 29.5s → 0s feel continuous?
8. From several metres away, is hierarchy legible?
9. Do glyphs feel like machine material rather than typography?

## 9. Remaining QA only

```text
browser visual parity with frozen R4
30-second seam
stable 60 fps at presentation resolution
4K/fullscreen recording test
10-minute stability
several-metres distance view
recording compression
```

Do not add a new visual family while closing these checks.

## 10. Change boundary

Before adding code:

```text
reuse current behaviour
→ tune an existing parameter
→ modify one existing method
→ delete before adding
→ only then add minimum code
```

Permitted final tuning: line weight, alpha, timing, memory density, topology visibility, glyph scale/density and browser performance cost.
