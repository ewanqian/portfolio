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

    drawRoundThree(pg, ctx);
  }

  void drawRoundThree(PGraphics pg, ArtworkContext ctx) {
    float q = ctx.loopT;

    // Earlier structure returns slightly before the current one during recall.
    // Time-shifted periodic drawing keeps the 30-second loop exact without a feedback buffer.
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

    // Frozen graph rule: history occasionally reveals relation between a small number
    // of already-addressed grid anchors. This is not a new scene and not a network HUD;
    // it is the recall surface becoming structurally legible for a few seconds.
    drawHistoricalTopology(pg, ctx);

    glyphs.draw(pg, ctx, 3);

    // Rare long calibration segment, kept from R3.
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

  void drawHistoricalTopology(PGraphics pg, ArtworkContext ctx) {
    float presence = ctx.recall * (0.35 + 0.65 * ctx.historyDepth);
    if (presence < 0.035) return;

    int[][] anchors = {
      {2, 1}, {5, 3}, {8, 2}, {10, 5}, {7, 6}, {3, 5}
    };
    int[][] edges = {
      {0, 1}, {1, 2}, {2, 3}, {3, 4}, {4, 5}, {5, 1}, {1, 4}
    };

    pg.pushStyle();
    pg.noFill();
    float baseStroke = max(0.7, pg.width / 4300.0);

    for (int i = 0; i < edges.length; i++) {
      float local = pulse(ctx.loopT, (0.49 + i * 0.037) % 1.0, 0.085);
      float a = presence * (0.18 + 0.82 * local);
      if (a < 0.025) continue;

      int aIndex = edges[i][0];
      int bIndex = edges[i][1];
      float x1 = grid.majorX(anchors[aIndex][0]) + grid.dx * 0.5;
      float y1 = grid.majorY(anchors[aIndex][1]) + grid.dy * 0.5;
      float x2 = grid.majorX(anchors[bIndex][0]) + grid.dx * 0.5;
      float y2 = grid.majorY(anchors[bIndex][1]) + grid.dy * 0.5;

      pg.stroke(232, 234, 223, 62 * a);
      pg.strokeWeight(baseStroke * (0.8 + local * 0.55));
      pg.line(x1, y1, x2, y2);
    }

    pg.noStroke();
    float s = max(2.5, pg.width / 1850.0);
    for (int i = 0; i < anchors.length; i++) {
      float local = pulse(ctx.loopT, (0.46 + i * 0.061) % 1.0, 0.10);
      float a = presence * (0.30 + 0.70 * local);
      float x = grid.majorX(anchors[i][0]) + grid.dx * 0.5;
      float y = grid.majorY(anchors[i][1]) + grid.dy * 0.5;
      pg.fill(232, 234, 223, 112 * a);
      if (i % 2 == 0) pg.rect(x - s * 0.5, y - s * 0.5, s, s);
      else pg.ellipse(x, y, s, s);
    }

    pg.popStyle();
  }

  float pulse(float phase, float center, float width) {
    float d = abs(phase - center);
    d = min(d, 1.0 - d);
    float v = constrain(1.0 - d / max(0.0001, width), 0, 1);
    return v * v * (3.0 - 2.0 * v);
  }
}
