class Exhibition30Composer {
  final AppConfig config;
  final UnifiedGridSystem grid;
  final MechanicalGlyphLanguage glyphs;

  Exhibition30Composer(AppConfig config) {
    this.config = config;
    grid = new UnifiedGridSystem(config);
    glyphs = new MechanicalGlyphLanguage(config, grid);
  }

  void setup() {
    glyphs.setupFonts();
  }

  void draw(PGraphics pg, ArtworkContext ctx) {
    grid.update(pg.width, pg.height);

    // Round 1 — ORDER: recovered Constraint + Index + Memory on one hierarchical grid.
    // Round 2 — MECHANICAL LANGUAGE: same system plus addressable ASCII/Unicode glyph pulses.
    // Round 3 — EXHIBITION: reduced scaffolding, stronger memory weighting and restrained glyph layer.
    grid.drawBaseGrid(pg, ctx, config.round);

    if (config.round == 1) {
      grid.drawConstraint(pg, ctx, 1);
      grid.drawIndexField(pg, ctx, 1);
      grid.drawQuantizedMemory(pg, ctx, 1);
      return;
    }

    if (config.round == 2) {
      grid.drawConstraint(pg, ctx, 2);
      grid.drawIndexField(pg, ctx, 2);
      grid.drawQuantizedMemory(pg, ctx, 2);
      glyphs.draw(pg, ctx, 2);
      return;
    }

    // Round 3: current exhibition candidate. The same three sources coexist but are
    // hierarchically weighted: constraint establishes order, index addresses it,
    // memory becomes the dominant historical surface, and glyphs act as sparse machine speech.
    drawRoundThree(pg, ctx);
  }

  void drawRoundThree(PGraphics pg, ArtworkContext ctx) {
    float q = ctx.loopT;

    // A previous configuration returns slightly before the current one during recall.
    // We do not use a feedback buffer: time-shifted periodic drawing keeps the 30s loop exact.
    if (ctx.recall > 0.05) {
      pg.pushStyle();
      float oldRecall = ctx.recall;
      float oldAbsorption = ctx.absorption;
      float oldInput = ctx.inputActivity;

      ctx.recall *= 0.28;
      ctx.absorption *= 0.20;
      ctx.inputActivity = 0;
      grid.drawConstraint(pg, ctx, 3);
      grid.drawIndexField(pg, ctx, 3);

      ctx.recall = oldRecall;
      ctx.absorption = oldAbsorption;
      ctx.inputActivity = oldInput;
      pg.popStyle();
    }

    grid.drawConstraint(pg, ctx, 3);
    grid.drawIndexField(pg, ctx, 3);
    grid.drawQuantizedMemory(pg, ctx, 3);
    glyphs.draw(pg, ctx, 3);

    // Rare structural accent: a single long calibration segment enters and leaves in one cycle.
    // It is intentionally not a HUD element; it belongs to the same grid measure.
    float accent = pulse(q, 0.515, 0.055) * ctx.recall;
    if (accent > 0.01) {
      float y = grid.majorY(2) + grid.dy * 0.5;
      float x1 = grid.majorX(2);
      float x2 = grid.majorX(10);
      pg.stroke(232, 234, 223, 72 * accent);
      pg.strokeWeight(max(0.8, pg.width / 4000.0));
      pg.line(x1, y, x2, y);
      pg.noStroke();
      float s = max(3, pg.width / 1500.0);
      pg.fill(232, 234, 223, 145 * accent);
      pg.rect(x1 - s * 0.5, y - s * 0.5, s, s);
      pg.rect(x2 - s * 0.5, y - s * 0.5, s, s);
    }
  }

  float pulse(float phase, float center, float width) {
    float d = abs(phase - center);
    d = min(d, 1.0 - d);
    float v = constrain(1.0 - d / max(0.0001, width), 0, 1);
    return v * v * (3.0 - 2.0 * v);
  }
}
