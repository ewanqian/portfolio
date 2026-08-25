// 01 Row Engine
// The screen is primarily 12–24 symbolic code rows. Pattern Field and macro/micro hierarchy
// are compositions of the same glyph language, not separate visual ontologies.

class RowVisual {
  int index;
  SpringValue x;
  SpringValue y;
  SpringValue alpha;
  SpringValue scale;
  SpringValue write;
  SpringValue accent;
  GlyphSentence sentence;
  int lastSignature = Integer.MIN_VALUE;
  float cachedWidth = 320;
  float visibility = 0;

  RowVisual(int index, SpringMotion motion) {
    this.index = index;
    x = motion.make(260);
    y = motion.make(540);
    alpha = motion.make(index == 0 ? 1 : 0);
    scale = motion.make(1);
    write = motion.make(1);
    accent = motion.make(0);
  }

  void reset() {
    x.snap(260);
    y.snap(540);
    alpha.snap(index == 0 ? 1 : 0);
    scale.snap(1);
    write.snap(1);
    accent.snap(0);
    lastSignature = Integer.MIN_VALUE;
    cachedWidth = 320;
    visibility = index == 0 ? 1 : 0;
    sentence = null;
  }

  void step() {
    x.step();
    y.step();
    alpha.step();
    scale.step();
    write.step();
    accent.step();
  }
}

class RowEngine {
  GlyphGrammar grammar;
  SpringMotion motion;
  MemoryScoreEngine memory;
  RowVisual[] rows = new RowVisual[MAX_ROWS];

  SpringValue macroScale;
  SpringValue macroAlpha;
  int lastMacroGlyph = -1;

  RowEngine(GlyphGrammar grammar, SpringMotion motion, MemoryScoreEngine memory) {
    this.grammar = grammar;
    this.motion = motion;
    this.memory = memory;
    for (int i = 0; i < MAX_ROWS; i++) rows[i] = new RowVisual(i, motion);
    macroScale = motion.make(0.88);
    macroAlpha = motion.make(0);
  }

  void reset() {
    for (int i = 0; i < MAX_ROWS; i++) rows[i].reset();
    macroScale.snap(0.88);
    macroAlpha.snap(0);
    lastMacroGlyph = -1;
  }

  void update(MemoryScoreEngine score) {
    textFont(fontCode);
    textSize(18);

    float visibleRows = max(1.0, score.rowTarget);
    float spacing = lerp(86.0, 31.5, smoothRange(1.0, 16.0, visibleRows));
    spacing = max(spacing, 29.0);
    float blockHeight = max(0, (visibleRows - 1.0) * spacing);
    float top = 540.0 - blockHeight * 0.5;

    for (int i = 0; i < MAX_ROWS; i++) {
      RowVisual r = rows[i];
      float visible = clamp01(visibleRows - i);
      r.visibility = visible;

      float indent = (i % 4) * 13.0 + ((i / 4) % 2) * 7.0;
      float targetX = 252.0 + indent;
      float targetY = top + i * spacing;

      if (visible < 0.001) targetY = 540.0 + (i - visibleRows) * 6.0;

      r.x.set(targetX);
      r.y.set(targetY);
      r.alpha.set(visible);
      r.scale.set(1.0);
      r.write.set(1.0);
      r.accent.set(0.0);

      GlyphSentence next = grammar.compose(i, score);
      r.sentence = next;

      if (next.signature != r.lastSignature) {
        memory.recordMutation(i, next.signature);
        if (r.lastSignature != Integer.MIN_VALUE) {
          // Immediate rewrite with a short overshoot and heavy settle.
          r.write.snap(0.34);
          r.write.set(1.0);
          r.write.kick(0.24);
          r.scale.kick(0.075);
          r.x.kick(-4.8 + (i % 3) * 1.8);
          r.accent.snap(1.0);
          r.accent.set(0.0);
        }
        r.lastSignature = next.signature;
      }

      r.cachedWidth = measureSentence(next);
      r.step();
    }

    macroAlpha.set(score.recall);
    macroScale.set(1.0);
    int macroId = floor(score.time / 1.6) % 4;
    if (macroId != lastMacroGlyph && score.recall > 0.08) {
      macroScale.snap(0.88);
      macroScale.set(1.0);
      macroScale.kick(0.09);
      lastMacroGlyph = macroId;
    }
    macroScale.step();
    macroAlpha.step();
  }

  float measureSentence(GlyphSentence sentence) {
    float w = 0;
    if (sentence == null) return 0;
    textFont(fontCode);
    textSize(18);
    for (GlyphPiece p : sentence.pieces) w += textWidth(p.text);
    return w;
  }

  int roleColor(int role) {
    if (role == ROLE_ACTIVE) return CYAN;
    if (role == ROLE_HUMAN) return CORAL;
    if (role == ROLE_MEMORY) return BEIGE;
    if (role == ROLE_RESIDUE) return GRAPHITE;
    return NAVY;
  }

  PVector leftAnchor(int row) {
    RowVisual r = rows[constrain(row, 0, MAX_ROWS - 1)];
    return new PVector(r.x.value - 14, r.y.value - 5);
  }

  PVector rightAnchor(int row) {
    RowVisual r = rows[constrain(row, 0, MAX_ROWS - 1)];
    return new PVector(r.x.value + r.cachedWidth + 12, r.y.value - 5);
  }

  float rowVisibility(int row) {
    return clamp01(rows[constrain(row, 0, MAX_ROWS - 1)].alpha.value);
  }

  void drawPatternField(PGraphics pg, MemoryScoreEngine score) {
    pg.pushStyle();
    pg.textAlign(CENTER, CENTER);
    pg.noStroke();

    // Top-left index/pattern band: strict repeated grammar, never random Unicode.
    int topCols = 14;
    int topRows = 4;
    float topReveal = smoothRange(1.8, 8.0, score.time) * (1.0 - smoothRange(27.4, 30.0, score.time));
    int visibleCells = floor(topCols * topRows * (0.10 + 0.90 * topReveal));
    pg.textFont(fontCode);
    pg.textSize(14);
    int counter = 0;
    for (int yy = 0; yy < topRows; yy++) {
      for (int xx = 0; xx < topCols; xx++) {
        if (counter++ >= visibleCells) continue;
        String gl = grammar.patternGlyph(0, xx, yy, score.mutationTick);
        int col = ((xx + yy) % 7 == 0 && score.process > 0.15) ? CYAN : GRAPHITE;
        pg.fill(col, 215);
        pg.text(gl, 128 + xx * 20, 106 + yy * 19);
      }
    }

    // Ordered 6x6 modular ornament on the upper-right.
    float blockW = smoothRange(5.5, 11.0, score.time) * (1.0 - smoothRange(26.0, 29.5, score.time));
    if (blockW > 0.01) {
      pg.textFont(fontPattern);
      pg.textSize(23);
      for (int yy = 0; yy < 6; yy++) {
        for (int xx = 0; xx < 6; xx++) {
          String gl = grammar.patternGlyph(1, xx, yy, score.mutationTick / 2);
          int col = (xx == yy || xx + yy == 5) ? CYAN : ((xx + yy) % 3 == 0 ? BEIGE : NAVY);
          pg.fill(col, 205 * blockW);
          pg.text(gl, 1590 + xx * 31, 102 + yy * 31);
        }
      }
    }

    // Radial Unicode motif. It is a pattern field, not a HUD dial: no labels, ticks, or UI chrome.
    float radialW = bandScore(score.time, 8.5, 26.5, 2.5);
    if (radialW > 0.01) {
      float cx = 1602;
      float cy = 318;
      for (int ring = 0; ring < 4; ring++) {
        int count = 12 + ring * 6;
        float rr = 58 + ring * 29;
        pg.textFont(fontCode);
        pg.textSize(13 + ring * 1.6);
        for (int k = 0; k < count; k++) {
          float a = TWO_PI * k / count - HALF_PI;
          float x = cx + cos(a) * rr;
          float y = cy + sin(a) * rr;
          String gl = grammar.patternGlyph(3, k, ring, score.mutationTick / 3);
          int col = ring == 1 ? CYAN : (ring == 2 ? BEIGE : NAVY);
          pg.fill(col, 205 * radialW);
          pg.text(gl, x, y);
        }
      }
    }

    // Bottom textile-like residue band. It grows from accumulated process, then thins again.
    float bottomW = bandScore(score.time, 7.0, 28.4, 2.4);
    if (bottomW > 0.01) {
      pg.textFont(fontCode);
      pg.textSize(14);
      int cols = 24;
      int rowsN = 3;
      for (int yy = 0; yy < rowsN; yy++) {
        for (int xx = 0; xx < cols; xx++) {
          if ((xx + yy * 2) % 5 == 4 && score.patternDensity < 0.35) continue;
          String gl = grammar.patternGlyph(2, xx % 5, yy % 5, score.mutationTick);
          int col = (xx % 9 == 0) ? CYAN : ((xx + yy) % 6 == 0 ? BEIGE : GRAPHITE);
          pg.fill(col, 195 * bottomW);
          pg.text(gl, 230 + xx * 34, 952 + yy * 25);
        }
      }
    }

    pg.popStyle();
  }

  void drawRows(PGraphics pg, MemoryScoreEngine score) {
    pg.pushStyle();
    pg.textAlign(LEFT, BASELINE);
    pg.noStroke();

    for (int i = 0; i < MAX_ROWS; i++) {
      RowVisual r = rows[i];
      float a = clamp01(r.alpha.value);
      if (a < 0.015 || r.sentence == null) continue;

      float y = r.y.value;
      float x = r.x.value;
      float sc = max(0.72, r.scale.value);
      float write = clamp01(r.write.value);
      float accent = clamp01(r.accent.value);

      // Index is part of the machine order, not explanatory UI.
      pg.textFont(fontCode);
      pg.textSize(15.5 * sc);
      pg.fill(GRAPHITE, 215 * a);
      pg.text(nf(i + 1, 2) + " :", 145, y);

      // Alignment/construction line: transparent line only.
      pg.stroke(NAVY, 20 * a);
      pg.strokeWeight(0.75);
      pg.line(190, y - 5, x - 15, y - 5);
      pg.noStroke();

      pg.textFont(fontCode);
      pg.textSize(18.0 * sc * (1.0 + 0.035 * accent));
      float cursorX = x;
      int total = max(1, r.sentence.size());
      int pieceIndex = 0;

      for (GlyphPiece piece : r.sentence.pieces) {
        float threshold = pieceIndex / float(total);
        float visible = smoothRange(threshold - 0.08, threshold + 0.035, write);
        if (visible > 0.01) {
          int c = roleColor(piece.role);
          float pieceAlpha = 235 * a * visible;
          if (piece.role == ROLE_RESIDUE) pieceAlpha = 190 * a * visible;
          pg.fill(c, pieceAlpha);
          pg.text(piece.text, cursorX, y);
        }
        cursorX += pg.textWidth(piece.text);
        pieceIndex++;
      }

      // Solid glyph residue left by a previous rewrite. No translucent boxes or washes.
      float residue = score.residueForRow(i) * a;
      if (residue > 0.08) {
        pg.textSize(15);
        pg.fill(GRAPHITE, 190 * min(1.0, residue));
        float rx = x + r.cachedWidth + 28;
        pg.text("·", rx, y);
        if (residue > 0.35) pg.text("·", rx + 18, y);
        if (residue > 0.62) pg.text("·", rx + 36, y);
      }
    }

    pg.popStyle();
  }

  void drawMacroField(PGraphics pg, MemoryScoreEngine score) {
    float a = clamp01(macroAlpha.value);
    if (a < 0.02) return;

    pg.pushStyle();
    pg.noStroke();
    pg.textAlign(CENTER, CENTER);

    String gl = grammar.macroGlyph(score);
    float sc = max(0.70, macroScale.value);
    pg.textFont(fontMacro);
    pg.textSize(188 * sc);
    int macroColor = (floor(score.time / 1.6) % 3 == 0) ? CYAN : ((floor(score.time / 1.6) % 3 == 1) ? BEIGE : NAVY);
    pg.fill(macroColor, 225 * a);
    pg.text(gl, 1585, 780);

    // Medium-scale magnification of the same state around the macro glyph.
    pg.textFont(fontPattern);
    pg.textSize(32);
    for (int yy = 0; yy < 4; yy++) {
      for (int xx = 0; xx < 6; xx++) {
        String m = grammar.patternGlyph(1, xx, yy, score.mutationTick);
        int c = (xx + yy) % 5 == 0 ? CYAN : ((xx + yy) % 3 == 0 ? BEIGE : GRAPHITE);
        pg.fill(c, 205 * a);
        pg.text(m, 1430 + xx * 42, 905 + yy * 38);
      }
    }

    pg.popStyle();
  }
}
