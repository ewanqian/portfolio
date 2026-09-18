# MECHANIC BATTLE / 机械格斗

> Work in Progress 07  
> Synthetic Combat Anatomy / Robot Combat Live Visual System  
> Initiated 2026-09-19 from live-visual development for the “机器人城市巡回挑战赛”.

## 0. Status

This document is the baseline research archive for **MECHANIC BATTLE**.

The project begins from a real robot-combat event, but the visual system is not intended as a literal engineering visualization of the participating robots. It uses the event as a performance context to study how humanoid machines can be translated into a reusable live-visual language built from:

- machine inspection;
- synthetic anatomy;
- structural wireframe;
- exploded assemblies;
- motion study;
- force and impact analysis;
- procedural mechanical detail;
- real-time camera and state control.

The current target is a playable WebGL liveset with Blender-authored / procedurally generated GLB assets.

---

## 1. Background

The immediate context is a live visual commission for a robot combat / city-tour event.

The visual problem is not simply “make futuristic graphics for robots”. Existing event material already presents the machines as entertainment objects and competition performers. The visual system therefore needs to add another layer of interpretation rather than repeat the event’s promotional language.

The system is developed as a continuation of the earlier **WIREFRAME MACHINE INSPECTION MOTION LANGUAGE** and the machine-inspection logic used in **ATMOSPHERIC ESCAPE / SPACECRAFT INSPECTION**:

```text
ACQUISITION
→ PROFILE
→ SECTION
→ EXPLODED ASSEMBLY
→ DETAIL INSPECTION
→ FORMATION
→ OVERLOAD
```

MECHANIC BATTLE extends this grammar from spacecraft into humanoid machines and combat motion.

---

## 2. Project position

MECHANIC BATTLE is defined as:

> **a real-time synthetic-combat-anatomy instrument for reading humanoid machines through structure, motion, signal and force.**

It is not:

- a generic cyberpunk HUD skin;
- a literal digital twin of the competition robot;
- a fictional claim about the robot’s real internal engineering;
- a pre-rendered AI montage;
- a conventional fighting-game interface.

It is a **visual interpretation system**.

The external robot remains the identity anchor.  
The internal anatomy is a designed speculative layer.

---

## 3. Core conceptual distinction

The project separates three bodies:

### 3.1 MACHINE SHELL

The recognizable competition robot.

Includes:

- head shell;
- chest shell;
- shoulder panels;
- forearm shell;
- pelvis;
- thigh / shin armor;
- foot structure.

Purpose:

- preserve machine identity;
- establish scale and silhouette;
- support full-body combat and profile views.

### 3.2 SYNTHETIC BODY

A human-like organizational layer used for visual explanation.

Includes:

- cranial volume;
- spine;
- rib structure;
- pelvis;
- muscle-like actuator bundles;
- nerve-like signal cables;
- tendon-like transmission paths.

This layer is **not literal anatomy**.

Human anatomy is used as a visual topology because it is immediately readable for posture, tension, balance and motion.

### 3.3 MACHINE CORE

The technical-mechanical layer.

Includes:

- bearings;
- rotary joints;
- servo blocks;
- pistons;
- rails;
- brackets;
- signal nodes;
- cooling lines;
- power buses;
- impact dampers.

This is where procedural mechanical density is concentrated.

---

## 4. Visual ontology

The master hierarchy is:

```text
ROBOT
│
├── SHELL
├── FRAME
├── SYNTHETIC
│   ├── MUSCLE
│   └── SIGNAL
└── CORE
```

A live state does not require a different model.

The same body should transition continuously between these layers.

Examples:

```text
ROBOT
→ STRUCTURE
→ ANATOMY
→ SIGNAL
→ MOTION
→ IMPACT
```

This continuity is a core production rule.

---

## 5. Naming standard

Every exported Blender object must expose its role through naming.

Examples:

```text
SYS_SHELL_HEAD_FRONT
SYS_SHELL_CHEST_L
SYS_SHELL_CHEST_R

SYS_FRAME_SPINE_01
SYS_FRAME_RIB_L_01
SYS_FRAME_PELVIS
SYS_FRAME_ARM_R_FOREARM

SYS_MUSCLE_TORSO_01
SYS_MUSCLE_ARM_R_FLEXOR_01

SYS_SIGNAL_HEAD_01
SYS_SIGNAL_SPINE_01
SYS_SIGNAL_ARM_R_01

SYS_CORE_SHOULDER_R_SERVO
SYS_CORE_ELBOW_R_ROTARY
SYS_CORE_WRIST_R_GIMBAL
```

WebGL grouping should be derived from prefixes rather than manually maintained object lists.

---

## 6. Model architecture

The first MK-01 body should be assembled from approximately 50–70 primary objects plus procedural detail.

### 6.1 Primary geometry

Required structural modules:

- 1 head volume;
- 4 cranial shell panels;
- 1 cranial ring;
- 1 optic core;
- 1 cervical joint stack;
- 7 spine modules;
- 8 rib pairs;
- 1 sternum rail;
- 2 clavicle rails;
- 2 shoulder joints;
- 2 upper-arm rails;
- 2 elbow rotary joints;
- 2 forearm rails;
- 2 wrist gimbals;
- 2 fist / impact assemblies;
- 1 pelvis frame;
- 2 hip joints;
- 2 thigh rails;
- 2 knee rotary joints;
- 2 shin rails;
- 2 ankle gimbals;
- 2 feet.

### 6.2 Procedural detail

Target:

- ~80 synthetic-muscle curves;
- ~100 signal cables;
- ~30 cooling / utility lines;
- ~40 joint rings;
- ~100 secondary nodes / bolts / connectors.

The model should look structurally dense without requiring a fully hand-sculpted hero robot.

---

## 7. Human topology as visual logic

Human-like structure is used only as a conceptual visualization framework.

Allowed references:

- spine;
- rib cage;
- pelvis;
- clavicle;
- shoulder line;
- flexor / extensor relationship;
- cranial section;
- synthetic muscle direction;
- nervous-system-like signal routing.

Avoid literal biological organs.

Do not model a real:

- heart;
- lung;
- stomach;
- brain.

Instead translate biological roles into machine systems:

```text
POWER CORE
COOLING NETWORK
MOTION SPINE
SIGNAL CORTEX
ACTUATOR MUSCLE
BALANCE GYRO
```

---

## 8. Model density / LOD standard

### LOD 0 — ANALYSIS

Target: 5k–20k triangles.

Contains:

- skeleton;
- joint markers;
- simplified silhouette;
- wireframe proxy.

Used for:

- arrays;
- motion history;
- pose studies;
- distant views.

### LOD 1 — PERFORMANCE

Target: 80k–150k triangles.

Contains:

- full body;
- shell;
- major frame;
- major joint assemblies;
- selected internal systems.

This is the default live model.

### LOD 2 — ANATOMY / HERO

Target: 250k–500k triangles across detailed submodels.

Separate files are preferred:

```text
MK01_PERFORMANCE.glb
MK01_HEAD_ANATOMY.glb
MK01_TORSO_ANATOMY.glb
MK01_ARM_R_ANATOMY.glb
```

High density is spent only where the camera can read it.

---

## 9. Surface / transparency rule

Do not rely on large-area alpha transparency.

The “X-ray” look should be constructed from simultaneous visual layers:

```text
SOLID
+
WIREFRAME
+
INTERNAL
```

Examples:

### STRUCTURAL BODY

```text
shell      hidden
frame      solid
muscle     hidden
signal     dim
```

### SYNTHETIC BODY

```text
shell      wireframe
frame      solid
muscle     solid
signal     selected
```

### SIGNAL BODY

```text
shell      hidden
frame      dim
muscle     hidden
signal     bright
```

This avoids WebGL transparency-sorting problems and gives clearer LED readability.

---

## 10. Performance state standard

The initial live system is defined as ten major states.

### 01 — ACQUISITION

Visual logic:

```text
node
→ axis
→ skeleton
→ contour
→ machine
```

Purpose:

- introduce the body as something discovered by an instrument;
- avoid a conventional fade-in.

### 02 — BODY PROFILE

Full body / slow orbit.

Display:

- body axis;
- shoulder axis;
- pelvis axis;
- center of mass;
- stance width;
- contact points.

### 03 — STRUCTURAL BODY

Remove the shell.

Reveal:

- mechanical spine;
- rib braces;
- pelvis;
- major joints;
- limb rails.

### 04 — CRANIAL SECTION

Head close-up.

Sequence:

```text
complete shell
→ one side opens
→ cranial frame
→ optic system
→ wireframe volume
→ signal bundle
```

### 05 — SYNTHETIC TORSO

Torso becomes the main field.

Reveal by event:

1. frame;
2. synthetic muscle;
3. signal;
4. utility / cooling;
5. reassembly.

### 06 — STRIKE ARM

Hero right arm.

Sequence:

```text
shell
→ frame
→ servo
→ muscle / tendon
→ wrist
→ impact plate
```

Supports progressive exploded assembly.

### 07 — SIGNAL BODY

实体逐渐撤出，只保留人形信号网络。

Key structure:

```text
HEAD NODE
↓
SPINAL BUS
↓
PELVIS NODE
↓
LIMB NETWORK
```

Cables may extend beyond the body into the frame to imply that the machine is an interface inside a larger system.

### 08 — MOTION STUDY

Use repeated structural poses:

```text
LOAD
ROTATE
EXTEND
CONTACT
RECOVER
```

The repetition is a mechanical motion study, not a particle trail.

### 09 — COMBAT ANALYSIS

Two machines enter the same frame.

Analysis includes:

- strike vector;
- shoulder rotation;
- hip drive;
- guard angle;
- contact point;
- motion trajectory;
- pose history.

Combat should remain a minority of the total visual system. Most of the project is machine study.

### 10 — TERMINAL BODY

Do not end with an explosion.

Remove layers:

```text
SHELL OFF
FRAME OFF
MUSCLE OFF
SIGNAL REMAINS
```

Final state:

a single remaining signal / spinal line.

---

## 11. Camera vocabulary

The first camera library should contain:

| ID | Camera | Purpose |
| --- | --- | --- |
| C01 | FULL BODY | acquisition / silhouette |
| C02 | PROFILE | structural reading |
| C03 | HEAD 3/4 | visor / cranial shell |
| C04 | HEAD SIDE | section / signal routing |
| C05 | CHEST FRONT | spine / rib / torso systems |
| C06 | CHEST 3/4 | cable / synthetic muscle depth |
| C07 | SHOULDER | joint mechanics |
| C08 | ARM SIDE | actuator / exploded view |
| C09 | FIST MACRO | impact assembly |
| C10 | HIP | balance / center of mass |
| C11 | KNEE | load / rotary joint |
| C12 | DUEL | two-machine combat |

Camera transitions should interpolate rather than hard-cut unless the state explicitly calls for impact.

Typical transition time:

```text
0.5–1.2 s
```

---

## 12. Motion grammar

All large state transitions preserve object identity.

Do not destroy and recreate the robot for each state.

Use stored home transforms:

```text
homePosition
homeRotation
homeScale
```

and interpolate toward target states.

This rule applies to:

- exploded view;
- shell opening;
- formation changes;
- part isolation;
- reassembly;
- camera focus.

---

## 13. Exploded assembly standard

Exploded views should be progressive and playable.

Example for STRIKE ARM:

```text
SPACE 1 → shell open
SPACE 2 → servo separate
SPACE 3 → cable / tendon reveal
SPACE 4 → wrist isolate
SPACE 5 → impact plate isolate
SPACE 6 → reassemble
```

The exploded view is therefore an instrument, not a static diagram.

---

## 14. Synthetic-muscle standard

Synthetic muscle is generated primarily as curves.

Implementation principle:

```text
anchor A
→ curve bundle
→ anchor B
```

Examples:

- sternum → shoulder;
- spine → shoulder;
- pelvis → rib;
- shoulder → elbow;
- elbow → wrist;
- pelvis → knee.

Each muscle family should have a system tag and be controllable as a group.

Visual activation:

```text
idle gray
→ active paper-white
→ return
```

Avoid literal red anatomical muscle unless a specific scene requires biological contrast.

---

## 15. Signal system standard

Signal lines use the body as routing topology.

Primary route:

```text
HEAD
↓
NECK
↓
SPINE
↓
PELVIS
↓
LIMBS
```

Three conceptual line families:

- POWER;
- SIGNAL;
- COOLING.

Color use should remain restrained.

Recommended hierarchy:

- paper white / gray as base;
- cyan for sensing / signal;
- warm amber for power / impact;
- no rainbow “cyber” palette in the default show.

---

## 16. Force-analysis standard

Force graphics should be based on a small number of meaningful points.

For a strike:

```text
shoulder
elbow
wrist
target
```

Derive visible vectors from those points.

The live HUD may display:

- angle;
- extension;
- velocity;
- strike direction;
- target distance;
- contact point.

Numbers may be stylized / illustrative unless derived from known data, but the relationship shown must remain geometrically coherent.

---

## 17. Impact event

An impact event should prioritize temporal structure over particles.

Recommended event:

1. contact;
2. freeze for ~120–250 ms;
3. impact ring expands;
4. structural wireframe flashes;
5. force vector resolves;
6. body returns to normal time.

Sparks are secondary.

The system should still work with zero particles.

---

## 18. UI standard

The interface must expose a machine operation.

Avoid generic filler such as:

- SYSTEM ONLINE;
- AI CORE;
- CYBER MODE;
- TARGET LOCK everywhere.

Prefer state-specific information.

### Head

- OPTIC AXIS;
- HEAD YAW;
- CERVICAL ROTATION;
- SENSOR ARC.

### Arm

- ELBOW ANGLE;
- WRIST ANGLE;
- EXTENSION;
- TORQUE;
- IMPACT PLATE.

### Torso

- SPINE BUS;
- SHOULDER AXIS;
- PELVIS AXIS;
- CENTER OF MASS;
- LOAD PATH.

UI is functional annotation, not decoration.

---

## 19. Web architecture

Target structure:

```text
mechanic-battle/
│
├── index.html
├── src/
│   ├── main.js
│   ├── stage.js
│   ├── robot.js
│   ├── camera.js
│   ├── state.js
│   ├── clock.js
│   │
│   └── systems/
│       ├── wireframe.js
│       ├── exploded.js
│       ├── scanner.js
│       ├── xray.js
│       ├── trajectory.js
│       ├── motionStudy.js
│       └── hud.js
│
├── assets/
│   └── robot/
│       ├── MK01_PERFORMANCE.glb
│       ├── MK01_HEAD_ANATOMY.glb
│       ├── MK01_TORSO_ANATOMY.glb
│       └── MK01_ARM_R_ANATOMY.glb
│
└── data/
    ├── robot.json
    ├── states.json
    └── poses.json
```

The visual state system must remain separate from the input layer.

---

## 20. Control standard

Initial live controls:

```text
1–0     major states
SPACE   quantized contextual event
Q / E   switch unit / variation
C       camera family
Z / X   raster / line density
F       fullscreen
H       hide operator UI
R       reset
```

The event triggered by SPACE depends on the current state.

Examples:

- HEAD → visor / cranial scan;
- TORSO → frame / muscle / signal reveal;
- ARM → progressive exploded assembly;
- COMBAT → impact event.

---

## 21. Clock

Default live grid remains:

```text
100 BPM
```

Recommended hierarchy:

- quarter note: camera settle / pose / assembly;
- eighth note: scan / indicator / numeric motion;
- explicit event: impact / component advance / major reveal.

The system remains manually playable.  
The clock supports timing but does not force autoplay.

---

## 22. Production priorities

The first build should not attempt a perfect complete robot.

Priority:

```text
BODY
→ HEAD
→ RIGHT ARM
→ TORSO
→ ACTION
```

### BODY

Needs silhouette and articulation.

### HEAD

Needs high visual identity and sectional readability.

### RIGHT ARM

Needs the highest mechanical detail density.

### TORSO

Needs the clearest layered anatomy.

### ACTION

Only after the above structures are stable.

---

## 23. MVP

The first functional proof requires only four universal operations:

1. camera focus;
2. exploded view;
3. solid ↔ wireframe transition;
4. part highlight / system reveal.

Once these four operations work, most of the ten states are parameter combinations rather than separate scene development.

---

## 24. Artistic constraints

Default visual language:

- black field;
- paper-white / gray hierarchy;
- restrained cyan and amber accents;
- no full-frame bloom;
- no decorative transparent glass panels;
- no random sci-fi text;
- no dependence on particles;
- no requirement for physically accurate internals;
- no literal biological organ display;
- strong negative space;
- high mechanical readability on LED.

The system should remain legible from a distance.

---

## 25. References and interpretation boundary

Reference families include:

- machine inspection and technical illustration;
- motorsport / professional telemetry UI;
- retro-futurist military / tactical interfaces;
- cybernetic anatomy and synthetic-body illustration;
- Japanese science-fiction mechanical design;
- motion study and biomechanical analysis.

References are used for:

- hierarchy;
- density;
- shot language;
- structural decomposition;
- line behavior;
- body topology.

The project should not reproduce franchise logos, characters, or proprietary interface compositions.

---

## 26. Long-term research value

MECHANIC BATTLE is not limited to one robot event.

The reusable research target is:

> **Machine Anatomy as a Performance Grammar**

Potential future subjects:

- humanoid robots;
- industrial machines;
- exoskeletons;
- vehicles;
- spacecraft;
- architecture;
- anatomical / scientific models;
- technical products.

The important transferable idea is not “wireframe style”.

It is the transformation:

```text
OBJECT
→ STRUCTURE
→ SYSTEM
→ MOTION
→ FORCE
→ PERFORMANCE
```

---

## 27. Next production step

Build **MK-01 SYNTHETIC COMBAT BODY v0.1**.

Required first pass:

- mechanical spine;
- rib frame;
- pelvis;
- limb frame;
- cranial frame;
- shell groups;
- synthetic-muscle curves;
- signal cable network;
- named parts for GLB export.

The first success criterion is not beauty.

It is:

> a Blender model that can be separated, exported, loaded into WebGL, and controlled layer-by-layer as a live instrument.
