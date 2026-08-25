class MechanicalGlyphLanguage {
  final AppConfig config;
  final UnifiedGridSystem grid;

  MechanicalGlyphLanguage(AppConfig config, UnifiedGridSystem grid) {
    this.config = config;
    this.grid = grid;
  }

  // Kept for compatibility with the composer. The frozen exhibition glyph system
  // no longer depends on platform fonts: every mark is drawn as geometry.
  void setupFonts() {
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

    // Finite addressable zones share the same grid as Constraint / Index / Memory.
    // The frozen vocabulary is geometric: point, line, square, triangle, diamond,
    // cross, ring and return arc. No text rendering is required.
    drawAddressableZone(pg, ctx, 0, global);
    drawAddressableZone(pg, ctx, 1, global);
    drawAddressableZone(pg, ctx, 2, global);
    drawAddressableZone(pg, ctx, 3, global);
    drawAddressableZone(pg, ctx, 4, global);
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
    float scale = min(sx, sy) * (zone == 4 ? 0.25 : 0.20);

    for (int r = 0; r < rows; r++) {
      for (int c = 0; c < cols; c++) {
        if (!belongsToZone(zone, c, r, cols, rows)) continue;
        if (hash(c, r, 211 + zone) < 0.55) continue;

        float x = grid.left + (c + 0.5) * sx;
        float y = grid.top + (r + 0.5) * sy;
        float local = 0.45 + 0.55 * pulse(ctx.loopT, (centers[zone] + hash(c, r, 223) * 0.055) % 1.0, 0.035);
        float alpha = 180 * intensity * local;
        drawMechanicalMark(pg, c, r, x, y, alpha, scale, zone == 4);
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
    // Segmented progress without text or moving objects.
    int segments = config.majorCols;
    float progress = 0.5 - 0.5 * cos(TWO_PI * ctx.loopT);
    float active = progress * (segments - 1);
    float y = grid.top + grid.dy * 0.38;
    float s = max(2.0, grid.dy * 0.055);

    pg.noStroke();
    for (int i = 0; i < segments; i++) {
      float distance = abs(i - active);
      float a = constrain(1.0 - distance / 2.2, 0, 1);
      if (a < 0.02) continue;
      float x = grid.majorX(i) + grid.dx * 0.5;
      pg.fill(232, 234, 223, 115 * a * global * (0.35 + 0.65 * ctx.pressure));
      if (i % 3 == 0) pg.rect(x - s, y - s, s * 2, s * 2);
      else pg.rect(x - s * 0.65, y - s * 0.18, s * 1.3, s * 0.36);
    }
  }

  void drawPersistentMemoryAnchors(PGraphics pg, ArtworkContext ctx, float global) {
    if (ctx.historyDepth < 0.08) return;
    int[][] anchors = {{2, 2}, {5, 4}, {8, 1}, {10, 5}};
    float s = max(5.0, min(grid.dx, grid.dy) * 0.12);

    for (int i = 0; i < anchors.length; i++) {
      int c = anchors[i][0];
      int r = anchors[i][1];
      float x = grid.majorX(c) + grid.dx * 0.5;
      float y = grid.majorY(r) + grid.dy * 0.5;
      float a = (26 + 76 * ctx.historyDepth + 52 * ctx.recall * pulse(ctx.loopT, (0.64 + i * 0.07) % 1.0, 0.05)) * global;
      drawAnchor(pg, x, y, a, s, i % 2);
    }
  }

  void drawAnchor(PGraphics pg, float x, float y, float alpha, float s, int kind) {
    pg.noFill();
    pg.stroke(232, 234, 223, alpha);
    pg.strokeWeight(max(0.8, s * 0.08));
    if (kind == 0) {
      pg.ellipse(x, y, s * 2.0, s * 2.0);
      pg.noStroke();
      pg.fill(232, 234, 223, alpha * 0.72);
      pg.ellipse(x, y, max(2.0, s * 0.34), max(2.0, s * 0.34));
    } else {
      pg.beginShape();
      pg.vertex(x, y - s);
      pg.vertex(x + s, y);
      pg.vertex(x, y + s);
      pg.vertex(x - s, y);
      pg.endShape(CLOSE);
    }
  }

  void drawMechanicalMark(PGraphics pg, int c, int r, float x, float y, float alpha, float s, boolean preferStructural) {
    int kind = floor(hash(c, r, config.seed + 251) * 8.0) % 8;
    if (preferStructural && kind < 3) kind += 3;

    pg.pushStyle();
    pg.noFill();
    pg.stroke(232, 234, 223, alpha);
    pg.strokeWeight(max(0.7, s * 0.10));

    if (kind == 0) {
      pg.noStroke();
      pg.fill(232, 234, 223, alpha * 0.92);
      pg.ellipse(x, y, max(2.0, s * 0.34), max(2.0, s * 0.34));
    } else if (kind == 1) {
      pg.line(x - s, y, x + s, y);
    } else if (kind == 2) {
      pg.rect(x - s * 0.72, y - s * 0.72, s * 1.44, s * 1.44);
    } else if (kind == 3) {
      pg.triangle(x, y - s, x + s * 0.88, y + s * 0.74, x - s * 0.88, y + s * 0.74);
    } else if (kind == 4) {
      pg.beginShape();
      pg.vertex(x, y - s);
      pg.vertex(x + s, y);
      pg.vertex(x, y + s);
      pg.vertex(x - s, y);
      pg.endShape(CLOSE);
    } else if (kind == 5) {
      pg.line(x - s * 0.85, y - s * 0.85, x + s * 0.85, y + s * 0.85);
      pg.line(x + s * 0.85, y - s * 0.85, x - s * 0.85, y + s * 0.85);
    } else if (kind == 6) {
      pg.ellipse(x, y, s * 1.75, s * 1.75);
      pg.line(x - s * 0.54, y, x + s * 0.54, y);
    } else {
      pg.arc(x, y, s * 2.0, s * 2.0, PI * 0.10, PI * 1.52);
      pg.line(x - s * 0.93, y - s * 0.08, x - s * 0.62, y - s * 0.38);
    }

    pg.popStyle();
  }
}
