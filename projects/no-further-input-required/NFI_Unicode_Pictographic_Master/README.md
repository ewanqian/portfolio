# NFI Unicode Pictographic Computation System — Processing Master

Current exhibition direction for **《无需进一步输入 / No Further Input Required》**.

This master deliberately abandons the recent WebGL / six-structure experiment. The artwork is now one unified **Unicode Pictographic Computation System** built in Processing 4 / Java Mode / P2D.

## Allowed systems

Only these five systems exist:

1. `RowEngine.pde` — code rows, ordered pattern composition, macro / micro hierarchy
2. `GlyphGrammar.pde` — C-like symbolic syntax + Unicode pictographic language
3. `SpringMotion.pde` — shared fast-attack / overshoot / heavy-settle motion personality
4. `ConnectionEngine.pde` — deterministic source → destination → history relationships
5. `MemoryScoreEngine.pde` — index, stored mutation, residue, recall, autonomy, 30-second score

`NFI_Unicode_Pictographic_Master.pde` is only the sketch entry point and composition order.

## Visual rules

- no readable English pseudo-code
- no terminal / hacker / Matrix-rain aesthetic
- no random Unicode soup
- no random graph
- no particles, bloom, fog, glitch, HUD or UI
- glyphs / code / nodes are solid
- only guide, connection, history and residue relation **lines** may be transparent
- color roles are fixed: Navy structure, Cyan current computation, Coral human input, Beige memory, Graphite residue, Warm Paper background
- every visual mutation must inherit, change, leave residue, and be recallable

## Score

- `00–06s` INPUT — one small Coral intervention expands into symbolic rows
- `06–14s` PROCESS — write / substitute / expand / bind
- `14–23s` MEMORY / RECALL — old glyphs return and the connection graph becomes dense
- `23–30s` NO FURTHER INPUT — Coral disappears; stored memory and previous routes continue to rewrite the system
- end state converges to `○`, matching the beginning for recurrence

## Run

Open the folder in **Processing 4**, Java Mode.

Default target:

- `3840×2160`
- `P2D`
- `60 fps`
- deterministic `30 s` loop

For 1920×1080 review, launch Processing with environment variable:

```bash
NFI_REVIEW=1
```

Controls:

- `R` — restart the 30-second loop
- `S` — save a frame to `captures/`
- `Space` — pause
- `D` — debug overlay; debug is off in exhibition use

No external images or font files are required. The sketch uses Java logical fonts (`Monospaced` and `SansSerif`) and a deliberately restricted Unicode set.
