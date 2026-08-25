class UnifiedGridSystem {
  final AppConfig config;
  float left, right, top, bottom, dx, dy, microDx, microDy;
  int microCols, microRows;

  UnifiedGridSystem(AppConfig config) {
    this.config = config;
    microCols = config.majorCols * config.memorySubX;
    microRows = config.majorRows * config.memorySubY;
  }

  void update(int w, int h) {
    left = w * config.marginX;
    right = w * (1.0 - config.marginX);
    top = h * config.marginY;
    bottom = h * (1.0 - config.marginY);
    dx = (right - left) / config.majorCols;
    dy = (bottom - top) / config.majorRows;
    microDx = dx / config.memorySubX;
    microDy = dy / config.memorySubY;
  }

  float majorX(int col) { return left + col * dx; }
  float majorY(int row) { return top + row * dy; }
  float microX(int col) { return left + (col + 0.5) * microDx; }
  float microY(int row) { return top + (row + 0.5) * microDy; }

  float hash(int a, int b, int salt) {
    float n = sin(a * 127.1 + b * 311.7 + salt * 74.7) * 43758.5453;
    return n - floor(n);
  }

  float periodicPulse(float phase, float center, float width) {
    float d = abs(phase - center);
    d = min(d, 1.0 - d);
    float v = constrain(1.0 - d / max(0.0001, width), 0, 1);
    return v * v * (3.0 - 2.0 * v);
  }

  void drawBaseGrid(PGraphics pg, ArtworkContext ctx, int round) {
    float gridAlpha = round == 1 ? 19 : (round == 2 ? 14 : 10);
    gridAlpha += ctx.absorption * 9 + ctx.recall * 5;

    pg.noFill();
    pg.strokeWeight(max(0.65, pg.width / 3840.0));
    for (int c = 0; c <= config.majorCols; c++) {
      float a = gridAlpha * ((c % 3 == 0) ? 1.0 : 0.54);
      pg.stroke(232, 234, 223, a);
      pg.line(majorX(c), top, majorX(c), bottom);
    }
    for (int r = 0; r <= config.majorRows; r++) {
      float a = gridAlpha * ((r % 2 == 0) ? 1.0 : 0.54);
      pg.stroke(232, 234, 223, a);
      pg.line(left, majorY(r), right, majorY(r));
    }

    // A few invariant registration anchors make the field feel measured, not decorative.
    pg.noStroke();
    for (int r = 0; r <= config.majorRows; r += 2) {
      for (int c = 0; c <= config.majorCols; c += 3) {
        float a = 22 + ctx.historyDepth * 22;
        pg.fill(232, 234, 223, a);
        float s = max(2.0, pg.width / 1800.0);
        pg.rect(majorX(c) - s * 0.5, majorY(r) - s * 0.5, s, s);
      }
    }
  }

  void drawConstraint(PGraphics pg, ArtworkContext ctx, int round) {
    float presence = 0.24 + ctx.inputActivity * 0.34 + ctx.absorption * 0.42 + ctx.recall * 0.28;
    if (round == 1) presence *= 1.0;
    if (round == 2) presence *= 0.86;
    if (round >= 3) presence *= 0.72;

    float phase = ctx.loopT;
    float baseStroke = max(0.7, pg.width / 4200.0);
    pg.noFill();

    // Existing accepted constraints: stable, quiet, slowly strengthened by accumulated history.
    for (int r = 0; r < config.majorRows; r++) {
      for (int c = 0; c < config.majorCols; c++) {
        float accepted = hash(c, r, config.seed + 31);
        if (accepted < 0.72) continue;
        boolean down = hash(c, r, config.seed + 33) > 0.5;
        float x1 = majorX(c);
        float y1 = down ? majorY(r) : majorY(r + 1);
        float x2 = majorX(c + 1);
        float y2 = down ? majorY(r + 1) : majorY(r);
        float a = (12 + 33 * ctx.historyDepth) * presence;
        pg.stroke(232, 234, 223, a);
        pg.strokeWeight(baseStroke);
        pg.line(x1, y1, x2, y2);
      }
    }

    // Candidate constraints appear region-by-region and either stabilise or vanish.
    for (int r = 0; r < config.majorRows; r++) {
      for (int c = 0; c < config.majorCols; c++) {
        float localPhase = hash(c, r, config.seed + 41);
        float pulse = periodicPulse(phase, localPhase, 0.052);
        if (pulse < 0.018) continue;
        boolean down = hash(c, r, config.seed + 43) > 0.5;
        float x1 = majorX(c);
        float y1 = down ? majorY(r) : majorY(r + 1);
        float x2 = majorX(c + 1);
        float y2 = down ? majorY(r + 1) : majorY(r);
        pg.stroke(232, 234, 223, (32 + 128 * pulse) * presence);
        pg.strokeWeight(baseStroke * (1.0 + pulse * 0.8));
        pg.line(x1, y1, x2, y2);
      }
    }

    // Gate anchors pulse independently; never all at once.
    int[] anchorCols = {0, 3, 6, 9, 12};
    for (int i = 0; i < anchorCols.length; i++) {
      float local = (phase + i * 0.17) % 1.0;
      float pulse = periodicPulse(local, 0.18, 0.075);
      if (pulse < 0.015) continue;
      int c = anchorCols[i];
      for (int edge = 0; edge < 2; edge++) {
        float x = majorX(c);
        float y = edge == 0 ? top : bottom;
        float s = min(dx, dy) * 0.11;
        pg.stroke(232, 234, 223, (28 + 98 * pulse) * presence);
        pg.strokeWeight(baseStroke);
        pg.noFill();
        pg.rect(x - s, y - s, s * 2, s * 2);
        pg.noStroke();
        pg.fill(232, 234, 223, (65 + 155 * pulse) * presence);
        float q = max(3, s * 0.25);
        pg.rect(x - q * 0.5, y - q * 0.5, q, q);
      }
    }
  }

  void drawIndexField(PGraphics pg, ArtworkContext ctx, int round) {
    float presence = 0.20 + ctx.inputActivity * 0.20 + ctx.absorption * 0.60 + ctx.recall * 0.34 + ctx.autonomy * 0.14;
    if (round == 1) presence *= 0.92;
    if (round == 2) presence *= 0.78;
    if (round >= 3) presence *= 0.66;

    int cols = config.majorCols * 2;
    int rows = config.majorRows * 2;
    float sx = (right - left) / cols;
    float sy = (bottom - top) / rows;
    float baseStroke = max(0.7, pg.width / 4300.0);
    pg.noFill();

    for (int r = 0; r < rows; r++) {
      for (int c = 0; c < cols; c++) {
        float existence = hash(c, r, config.seed + 71);
        if (existence < 0.42) continue;
        float x = left + (c + 0.5) * sx;
        float y = top + (r + 0.5) * sy;
        float family = hash(c, r, config.seed + 73);
        float addressPhase = hash(c, r, config.seed + 79);
        float active = periodicPulse(ctx.loopT, addressPhase, 0.035 + 0.025 * hash(c, r, 81));
        float historyLead = periodicPulse((ctx.loopT + 0.08 * ctx.recall) % 1.0, addressPhase, 0.045);
        float alpha = (18 + 48 * hash(c, r, 83) + 135 * max(active, historyLead * ctx.recall)) * presence;

        pg.stroke(232, 234, 223, alpha);
        pg.strokeWeight(baseStroke * (active > 0.65 ? 1.45 : 1.0));

        if (family < 0.30) {
          float s = min(sx, sy) * (0.24 + 0.13 * hash(c, r, 89));
          pg.rect(x - s, y - s, s * 2, s * 2);
          if (hash(c, r, 91) > 0.80) {
            pg.stroke(232, 234, 223, alpha * 0.55);
            pg.rect(x - s * 0.52, y - s * 0.52, s * 1.04, s * 1.04);
          }
        } else if (family < 0.63) {
          float len = sx * (0.23 + 0.16 * hash(c, r, 97));
          pg.line(x - len, y, x + len, y);
        } else if (family < 0.83) {
          float len = sx * 0.25;
          float rise = sy * (hash(c, r, 101) > 0.5 ? 0.12 : -0.12);
          pg.line(x - len, y + rise, x + len, y - rise);
        } else {
          float len = min(sx, sy) * 0.24;
          pg.line(x, y - len, x, y + len);
        }
      }
    }
  }

  void drawQuantizedMemory(PGraphics pg, ArtworkContext ctx, int round) {
    float presence = 0.10 + ctx.absorption * 0.38 + ctx.recall * 0.88 + ctx.autonomy * 0.52;
    if (round == 1) presence *= 0.78;
    if (round == 2) presence *= 0.88;
    if (round >= 3) presence *= 1.0;

    pg.noStroke();
    float dashH = max(1.2, pg.height / 1800.0);

    for (int r = 0; r < microRows; r++) {
      float age = r / (float) max(1, microRows - 1);
      float verticalFade = lerp(1.0, 0.14, pow(age, 1.25));
      for (int c = 0; c < microCols; c++) {
        float existence = hash(c, r, config.seed + 131);
        if (existence < 0.49) continue;

        // Every mark has a periodic access phase. This is smooth at the 30s boundary.
        float cellPhase = hash(c, r, config.seed + 137);
        float active = periodicPulse(ctx.loopT, cellPhase, 0.028 + 0.015 * hash(c, r, 139));
        float oldPhase = (cellPhase + 0.23 + 0.11 * hash(c, r, 141)) % 1.0;
        float recalled = periodicPulse(ctx.loopT, oldPhase, 0.036) * ctx.recall;
        float value = max(active * (0.30 + ctx.absorption * 0.45), recalled);

        float x = microX(c);
        float y = microY(r);
        float base = 22 + 72 * hash(c, r, 149);
        float alpha = (base + 142 * value) * verticalFade * presence;
        pg.fill(232, 234, 223, alpha);

        boolean important = hash(c, r, config.seed + 151) > 0.925;
        if (important) {
          float side = min(microDx, microDy) * (0.30 + 0.20 * hash(c, r, 157));
          pg.rect(x - side * 0.5, y - side * 0.5, side, side);
        } else {
          float len = microDx * (0.42 + 0.35 * hash(c, r, 163));
          pg.rect(x - len * 0.5, y - dashH * 0.5, len, dashH);
        }
      }
    }

    // Rare diagonal recall chains: the older surface becomes active history.
    int chainCount = round >= 3 ? 7 : 5;
    for (int chain = 0; chain < chainCount; chain++) {
      float chainPhase = (0.11 + chain * 0.137) % 1.0;
      float a = periodicPulse(ctx.loopT, chainPhase, 0.075) * ctx.recall;
      if (a < 0.012) continue;
      int startCol = floor(hash(chain, 0, config.seed + 173) * (microCols - 16));
      int stride = 3 + (chain % 4);
      for (int r = 1; r < microRows - 1; r += stride) {
        int c = (startCol + r * (chain % 2 == 0 ? 1 : -1) + microCols) % microCols;
        float x = microX(c);
        float y = microY(r);
        float side = min(microDx, microDy) * 0.52;
        pg.fill(232, 234, 223, (70 + 150 * a) * (1.0 - 0.72 * r / (float) microRows));
        pg.rect(x - side * 0.5, y - side * 0.5, side, side);
      }
    }

    pg.stroke(232, 234, 223, 85 * presence);
    pg.strokeWeight(max(0.7, pg.width / 4300.0));
    pg.line(left, top + microDy * 0.22, right, top + microDy * 0.22);
  }
}
