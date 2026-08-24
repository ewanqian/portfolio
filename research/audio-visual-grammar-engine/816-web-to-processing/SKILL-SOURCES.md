# Skill Sources — Motion / Creative Coding / Product Design

These public repositories are references for the **workflow and implementation discipline** around the 816 Processing translation. They do not define the artwork's final visual identity.

## Recommended stack

| Priority | Repository | Use here | Do not copy |
| --- | --- | --- | --- |
| A | `skinnye/generative-art-pack` | generative systems, flow fields, attractors, reaction-diffusion, shaders, seeded sketch workflow | its gallery look or preset compositions |
| A | `joepUI/motion-ref-skill` | motion taxonomy, timing references, state-change / data-viz / background behaviors | stacking many UI effects into one sketch |
| B | `Leonxlnx/taste-skill` | anti-slop review discipline; variance / motion / density as explicit design dials | frontend styling conventions that do not belong in live visuals |
| B | `superdesigndev/superdesign-skill` | inspect existing system first, extract design DNA, branch alternatives, iterate from evidence | product-dashboard aesthetics |

## 1. skinnye/generative-art-pack

Repository:

`https://github.com/skinnye/generative-art-pack`

Most useful pieces:

- `generative-art-director` — composition / technique / seed planning;
- `generative-systems` — flow fields, packing, cellular automata, reaction-diffusion, attractors, WFC;
- `shader-artist` — GLSL / TSL / GPU visual methods;
- `color-composition` — palette and composition review;
- `/flow-field` — direct algorithm reference for FLOWCHAIN-type studies;
- seeded / reproducible sketch workflow.

Best use in this project:

- borrow algorithms and tuning methods;
- convert them to Processing Java where appropriate;
- keep our own visual grammar, timing, density, and composition.

## 2. joepUI/motion-ref-skill

Repository:

`https://github.com/joepUI/motion-ref-skill`

Install:

```bash
npx skills add https://github.com/joepUI/motion-ref-skill
```

The repository organizes many production-ready motion references into categories such as:

- state change;
- atmosphere / background;
- data visualization;
- enter / exit;
- loading / waiting;
- navigation / transition.

Best use in this project:

- use it as a **timing and event taxonomy**;
- inspect how motion communicates state change;
- translate only the useful principle into Processing;
- avoid turning a performance system into a collection of web microinteractions.

## 3. Leonxlnx/taste-skill

Repository:

`https://github.com/Leonxlnx/taste-skill`

Useful install options:

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "gpt-taste"
```

or

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```

Most useful idea for this project:

- treat variance, motion, and density as separate deliberate dials;
- audit and redesign before adding more decoration;
- push against generic AI-generated sameness.

Our Processing-specific version of the dials is:

```text
STRUCTURAL_VARIANCE
MOTION_INTENSITY
VISUAL_DENSITY
```

## 4. superdesigndev/superdesign-skill

Repository:

`https://github.com/superdesigndev/superdesign-skill`

Install:

```bash
npx skills add superdesigndev/superdesign-skill
```

Most useful process:

```text
inspect current system
→ extract design system / behavior context
→ make a faithful baseline
→ branch multiple directions
→ compare
→ iterate selected direction
```

This maps well to the SRE / Processing method:

```text
working source
→ abstract visual grammar
→ produce runnable variants
→ watch them fullscreen
→ keep / mute / delete
→ integrate survivors
```

## Local project skill

A Processing-specific skill has been created in this repository:

`skills/processing-motion-director/SKILL.md`

It combines only the useful workflow ideas above with this project's own rules:

- behavior, not asset;
- normalized control bus;
- three motion timescales;
- input as impulse / force / topology / timing;
- autonomous continuation;
- deterministic variants;
- deletion-first review;
- Processing-first runnable output.

For this project, use the local skill as the primary instruction and the external repositories as method / code references.
