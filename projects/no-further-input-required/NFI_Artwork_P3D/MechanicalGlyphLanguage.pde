class MechanicalGlyphLanguage {
  final AppConfig config;
  final UnifiedGridSystem grid;
  PFont asciiFont;
  PFont symbolFont;

  // No words. These marks are treated as machine-state primitives, not readable language.
  final String[] ascii = {
    "+", "-", "=", "/", "\\", "|", ":", ".", "_", "<", ">", "[", "]"
  };

  // Deliberately restricted to a compact, geometric set that stays legible at distance.
  final String[] unicode = {
    "·", "•", "□", "■", "◇", "◆", "△", "▽", "○", "●",
    "─", "│", "┼", "╱", "╲", "╳", "⊕", "⊙", "∷", "≡"
  };

  MechanicalGlyphLanguage(AppConfig config, UnifiedGridSystem grid) {
    this.config = config;
    this.grid = grid;
  }

  void setupFonts() {
    // Final exhibition target is Windows. Consolas + Segoe UI Symbol are widely available there.
    // The sketch still runs if a glyph falls back; no font file is bundled into the repository.
    asciiFont = createFont("Consolas", 32, true);
    symbolFont = createFont("Segoe UI Symbol", 32, true);
  }

  float hash(int a, int b, int salt) {
    float n = sin(a * 127.1 + b * 311.7 + salt * 74.7) * 43758.5453;
    return n - floor(n);
  }

  float pulse(float phase, float center, float width) {
    float d = abs(phase - center);
    d = min(d, 1.0 - d);
    float v = constrain(1.0 - d / max(0.0001, width), 0, 1);
    return v * v * (3.0 - 2.0 * v);
  }

  void draw(PGraphics pg, ArtworkContext ctx, int round) {
    if (round < 2) return;

    float global = round == 2 ? 0.70 : 0.48;
    global *= 0.18 + ctx.absorption * 0.38 + ctx.recall * 0.82 + ctx.autonomy * 0.36;

    pg.pushStyle();
    pg.textAlign(CENTER, CENTER);
    pg.noStroke();

    // Nothing-Glyph-inspired logic: a small set of addressable zones is activated in temporal
    // patterns. We borrow the behaviour (zones, pulses, progress, persistence), not device shapes.
    drawAddressableZone(pg, ctx, 0, global); // top rail
    drawAddressableZone(pg, ctx, 1, global); // left register
    drawAddressableZone(pg, ctx, 2, global); // centre cross
    drawAddressableZone(pg, ctx, 3, global); // right register
    drawAddressableZone(pg, ctx, 4, global); // descending memory lane
    drawProgressSequence(pg, ctx, global);
    drawPersistentMemoryAnchors(pg, ctx, global);

    pg.popStyle();
  }

  void drawAddressableZone(PGraphics pg, ArtworkContext ctx, int zone, float global) {
    float[] centers = {0.06, 0.22, 0.39, 0.57, 0.76};
    float zonePulse = pulse(ctx.loopT, centers[zone], 0.055 + zone * 0.004);
    float recallPulse = pulse(ctx.loopT, (centers[zone] + 0.31) % 1.0, 0.07) * ctx.recall;
    float intensity = max(zonePulse, recallPulse * 0.70) * global;
    if (intensity < 0.01) return;

    int cols = config.majorCols * 2;
    int rows = config.majorRows * 2;
    float sx = (grid.right - grid.left) / cols;
    float sy = (grid.bottom - grid.top) / rows;
    float textSize = min(sx, sy) * (zone == 4 ? 0.29 : 0.24);
    pg.textSize(max(10, textSize));

    for (int r = 0; r < rows; r++) {
      for (int c = 0; c < cols; c++) {
        if (!belongsToZone(zone, c, r, cols, rows)) continue;
        if (hash(c, r, 211 + zone) < 0.55) continue;

        float x = grid.left + (c + 0.5) * sx;
        float y = grid.top + (r + 0.5) * sy;
        float local = 0.45 + 0.55 * pulse(ctx.loopT, (centers[zone] + hash(c, r, 223) * 0.055) % 1.0, 0.035);
        float alpha = 180 * intensity * local;
        drawGlyph(pg, c, r, x, y, alpha, zone == 4);
      }
    }
  }

  boolean belongsToZone(int zone, int c, int r, int cols, int rows) {
    if (zone == 0) return r <= 1 && c % 2 == 0;
    if (zone == 1) return c <= 3 && r >= 3 && r <= rows - 4;
    if (zone == 2) return (abs(c - cols / 2) <= 1 || abs(r - rows / 2) <= 1) && c > 4 && c < cols - 5;
    if (zone == 3) return c >= cols - 4 && r >= 3 && r <= rows - 4;
    if (zone == 4) {
      float t = r / (float) max(1, rows - 1);
      int target = round(cols * (0.30 + 0.42 * t));
      return abs(c - target) <= 1;
    }
    return false;
  }

  void drawProgressSequence(PGraphics pg, ArtworkContext ctx, float global) {
    // A finite segmented sweep: information appears as ordered illumination instead of moving objects.
    int segments = config.majorCols;
    float progress = (0.5 - 0.5 * cos(TWO_PI * ctx.loopT)); // 0 -> 1 -> 0, seamless
    float active = progress * (segments - 1);
    float y = grid.top + grid.dy * 0.38;

    pg.textFont(symbolFont);
    pg.textSize(max(12, grid.dy * 0.14));
    pg.textAlign(CENTER, CENTER);
    for (int i = 0; i < segments; i++) {
      float distance = abs(i - active);
      float a = constrain(1.0 - distance / 2.2, 0, 1);
      if (a < 0.02) continue;
      float x = grid.majorX(i) + grid.dx * 0.5;
      pg.fill(232, 234, 223, 115 * a * global * (0.35 + 0.65 * ctx.pressure));
      pg.text(i % 3 == 0 ? "■" : "·", x, y);
    }
  }

  void drawPersistentMemoryAnchors(PGraphics pg, ArtworkContext ctx, float global) {
    // Similar to a persistent notification concept, but here it means historical residue:
    // a few addressed marks remain available after the original pulse has ended.
    if (ctx.historyDepth < 0.08) return;
    int[][] anchors = {{2, 2}, {5, 4}, {8, 1}, {10, 5}};
    pg.textFont(symbolFont);
    pg.textSize(max(12, min(grid.dx, grid.dy) * 0.16));
    for (int i = 0; i < anchors.length; i++) {
      int c = anchors[i][0];
      int r = anchors[i][1];
      float x = grid.majorX(c) + grid.dx * 0.5;
      float y = grid.majorY(r) + grid.dy * 0.5;
      float a = (26 + 76 * ctx.historyDepth + 52 * ctx.recall * pulse(ctx.loopT, (0.64 + i * 0.07) % 1.0, 0.05)) * global;
      pg.fill(232, 234, 223, a);
      pg.text(i % 2 == 0 ? "⊙" : "◇", x, y);
    }
  }

  void drawGlyph(PGraphics pg, int c, int r, float x, float y, float alpha, boolean preferUnicode) {
    float h = hash(c, r, config.seed + 251);
    boolean useUnicode = preferUnicode || h > 0.47;
    if (useUnicode) {
      pg.textFont(symbolFont);
      String s = unicode[floor(hash(c, r, 257) * unicode.length) % unicode.length];
      pg.fill(232, 234, 223, alpha);
      pg.text(s, x, y);
    } else {
      pg.textFont(asciiFont);
      String s = ascii[floor(hash(c, r, 263) * ascii.length) % ascii.length];
      pg.fill(232, 234, 223, alpha * 0.92);
      pg.text(s, x, y);
    }
  }
}
