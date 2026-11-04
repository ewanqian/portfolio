# User-uploaded GIF / Motion Intake — 2026-11-02

Purpose: recover useful uploaded motion material without publishing unlinked or duplicate files by accident.

## Rule

An uploaded GIF is **not** automatically a Portfolio asset.

Before public use it needs:

1. project match;
2. provenance / rights confidence;
3. one clear editorial function (hero / process / motion sample / reference);
4. duplicate cleanup;
5. a stable project asset name.

---

## 1. `37831023482ccf32c6075eadeafafc76.gif`

Also uploaded as:
- `37831023482ccf32c6075eadeafafc76(1).gif`
- `37831023482ccf32c6075eadeafafc76(2).gif`

### Visual
Black scientific plotting field with spherical wireframe geometry, coordinates and the label `Hermione / 16 2 2004`.

### Decision
**DUPLICATE / REFERENCE ONLY**

- all three visible files appear to be the same asset;
- keep one canonical reference only;
- do not put it on a project page until its source / intended project relationship is identified;
- likely useful as visual research material, not finished documentation.

Recommended canonical name after provenance is known:
`reference-hermione-orbital-diagram.gif`

---

## 2. `公众号_3x2_1.5x.gif`

### Visual
Dark, wide multi-panel composition with sparse line networks, nodes, radial diagrams and a restrained technical-interface language.

### Decision
**NEEDS PROJECT LINK / POSSIBLE MOTION COMMUNICATION ASSET**

Potential value:
- visually consistent with live-system / FIELD INDEX language;
- could work as a motion sample or communication crop if it belongs to an actual project.

Do not publish until its project and source are confirmed.

Recommended next naming pattern:
`<project>-motion-system-wide.gif`

---

## 3. `img_2106_gif.gif`

### Visual
Large immersive event / presentation space: blue digital side walls, central vertical screen, audience tables and a high-scale spatial media environment.

### Decision
**P0 TRACE — STRONG DOCUMENTATION CANDIDATE**

This is the most immediately Portfolio-useful uploaded GIF in the current Library scan because it visibly proves spatial scale and audience context.

Next action:
- identify event / project;
- find still frames or source video;
- if authorship and rights are valid, ingest under that project rather than leaving it as an anonymous upload.

Do **not** guess that it belongs to China AI Gala or another named project from visual similarity alone.

Recommended canonical name after match:
`<project>-installed-motion-wide.gif`

---

## 4. `ui_dynamic_preview_locked.gif`

### Visual
Dark technical UI frame with dense instrumentation around a large empty central viewport.

### Decision
**ARCHIVE / UI STUDY**

- useful as system-interface research;
- not strong project documentation by itself;
- do not use as homepage / Work hero;
- attach only if a finished live system page needs to explain operator UI.

Recommended canonical name after match:
`<system>-operator-ui-study.gif`

---

# Intake result

Current GIF Library scan found **6 GIF files**, but only **4 distinct visible assets** because the Hermione diagram appears three times.

Priority:

```text
P0  img_2106_gif.gif               → identify project; possible strong documentation
P1  公众号_3x2_1.5x.gif              → identify project; possible motion/system sample
P2  ui_dynamic_preview_locked.gif  → archive / interface study
HOLD Hermione diagram ×3           → dedupe; source/project unknown
```

## Cleanup policy

Do not upload these directly into `assets/` with their current filenames.

When a project match is established:

```text
assets/<project>/motion/<descriptive-name>.gif
```

or preferably convert a display copy to a more web-efficient video/animated format while retaining the source GIF in archival storage.

The Portfolio database should reference the project, not the original ChatGPT upload filename.
