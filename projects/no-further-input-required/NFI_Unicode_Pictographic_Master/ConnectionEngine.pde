// 04 Connection Engine
// Every line has a deterministic source, destination, and history.
// Connections are the only semi-transparent visual objects in the work.

class Relation {
  int source;
  int target;
  int kind;
  float start;
  float life;

  Relation(int source, int target, int kind, float start, float life) {
    this.source = source;
    this.target = target;
    this.kind = kind;
    this.start = start;
    this.life = life;
  }
}

class ConnectionEngine {
  MemoryScoreEngine memory;
  ArrayList<Relation> relations = new ArrayList<Relation>();

  ConnectionEngine(MemoryScoreEngine memory) {
    this.memory = memory;
    buildTopology();
  }

  void reset() {
    // Relations themselves are permanent topology. Their visible history is score-driven.
  }

  void buildTopology() {
    relations.clear();

    // CODE -> CODE: the initial intervention expands through adjacent rows.
    for (int i = 0; i < 19; i++) {
      relations.add(new Relation(i, i + 1, 0, 4.7 + i * 0.43, 13.0));
    }

    // CURRENT -> PREVIOUS / INDEX -> MEMORY: recall reaches four rows backward.
    for (int i = 5; i < 22; i++) {
      relations.add(new Relation(i, i - 4, 1, 13.8 + (i - 5) * 0.37, 12.0));
    }

    // MEMORY -> RECALL: mirrored archival relations make the late graph dense but still legible.
    for (int i = 2; i < 20; i += 2) {
      int target = 21 - i;
      if (target != i && target >= 0 && target < MAX_ROWS) {
        relations.add(new Relation(i, target, 2, 16.2 + i * 0.26, 10.5));
      }
    }
  }

  void draw(PGraphics pg, MemoryScoreEngine score, RowEngine rows) {
    pg.pushStyle();
    pg.noFill();

    float t = score.time;
    int autonomousRelation = -1;
    if (t >= 23.0 && t < 29.0) {
      autonomousRelation = (floor((t - 23.0) / 0.72) * 7 + 5) % relations.size();
    }

    for (int i = 0; i < relations.size(); i++) {
      Relation r = relations.get(i);
      float sourceVisible = rows.rowVisibility(r.source);
      float targetVisible = rows.rowVisibility(r.target);
      float rowVisible = min(sourceVisible, targetVisible);
      if (rowVisible < 0.04) continue;

      float local = t - r.start;
      boolean autonomousReplay = i == autonomousRelation && score.autonomy > 0.02;

      float grow = 0;
      float history = 0;
      float targetPulse = 0;

      if (local >= 0 && local <= r.life) {
        grow = backAttack(local / 0.46);
        float settle = smoothRange(0.42, 1.15, local);
        history = (1.0 - smoothRange(r.life - 2.8, r.life, local)) * settle;
        targetPulse = bandScore(local, 0.28, 1.25, 0.20);
      }

      if (autonomousReplay) {
        float replayLocal = (t - 23.0) % 0.72;
        grow = max(grow, backAttack(replayLocal / 0.29));
        history = max(history, 0.55 * score.autonomy);
        targetPulse = max(targetPulse, bandScore(replayLocal, 0.17, 0.68, 0.11) * score.autonomy);
      }

      float historyMemory = min(score.memoryForRow(r.source), score.memoryForRow(r.target));
      history = max(history, historyMemory * score.connectionDensity * 0.42);

      // All relations disappear toward the canonical single-glyph recurrence.
      float finalFade = 1.0 - smoothRange(28.7, 30.0, t);
      grow *= finalFade;
      history *= finalFade;
      targetPulse *= finalFade;

      if (grow < 0.01 && history < 0.01) continue;

      PVector a = relationSource(r, rows);
      PVector b = relationTarget(r, rows);
      PVector c1 = controlOne(r, a, b);
      PVector c2 = controlTwo(r, a, b);

      // History is always a faint full relation line.
      if (history > 0.01) {
        int hc = r.kind == 1 ? GRAPHITE : NAVY;
        pg.stroke(hc, min(34, 12 + 22 * history) * rowVisible);
        pg.strokeWeight(r.kind == 2 ? 0.72 : 0.82);
        drawPartialBezier(pg, a, c1, c2, b, 1.0);
      }

      // The currently travelling route rapidly grows over its own historical path.
      if (grow > 0.01 && local < 1.55 || autonomousReplay) {
        int activeColor = r.kind == 1 ? BEIGE : CYAN;
        pg.stroke(activeColor, min(60, 28 + 32 * targetPulse) * rowVisible);
        pg.strokeWeight(1.05);
        drawPartialBezier(pg, a, c1, c2, b, clamp01(grow));
      }

      // Nodes are solid. A relation is never represented by a translucent box or glow.
      if (targetPulse > 0.03) {
        pg.noStroke();
        int nodeColor = r.kind == 1 ? BEIGE : CYAN;
        pg.fill(nodeColor, 225 * clamp01(targetPulse) * rowVisible);
        float rr = 4.5 + 4.0 * targetPulse;
        pg.ellipse(b.x, b.y, rr, rr);
        pg.fill(nodeColor, 205 * clamp01(targetPulse) * rowVisible);
        pg.ellipse(a.x, a.y, 4.2, 4.2);
        pg.noFill();
      }
    }

    pg.popStyle();
  }

  float backAttack(float x) {
    x = clamp01(x);
    // easeOutBack: fast attack with ~8% overshoot before heavy visual settle.
    float c1 = 1.70158;
    float c3 = c1 + 1.0;
    float y = 1.0 + c3 * pow(x - 1.0, 3) + c1 * pow(x - 1.0, 2);
    return clamp01(y);
  }

  PVector relationSource(Relation r, RowEngine rows) {
    if (r.kind == 1) return rows.leftAnchor(r.source);
    return rows.rightAnchor(r.source);
  }

  PVector relationTarget(Relation r, RowEngine rows) {
    if (r.kind == 1) return rows.leftAnchor(r.target);
    return rows.rightAnchor(r.target);
  }

  PVector controlOne(Relation r, PVector a, PVector b) {
    if (r.kind == 0) {
      float cx = max(a.x, b.x) + 90 + (r.source % 3) * 28;
      return new PVector(cx, a.y);
    }
    if (r.kind == 1) {
      float cx = 86 - (r.source % 4) * 13;
      return new PVector(cx, a.y);
    }
    float cx = 1770 - (r.source % 3) * 34;
    return new PVector(cx, a.y);
  }

  PVector controlTwo(Relation r, PVector a, PVector b) {
    if (r.kind == 0) {
      float cx = max(a.x, b.x) + 90 + (r.target % 3) * 28;
      return new PVector(cx, b.y);
    }
    if (r.kind == 1) {
      float cx = 86 - (r.target % 4) * 13;
      return new PVector(cx, b.y);
    }
    float cx = 1770 - (r.target % 3) * 34;
    return new PVector(cx, b.y);
  }

  void drawPartialBezier(PGraphics pg, PVector a, PVector c1, PVector c2, PVector b, float amount) {
    int segments = 42;
    int visibleSegments = max(1, floor(segments * clamp01(amount)));
    pg.beginShape();
    for (int i = 0; i <= visibleSegments; i++) {
      float u = i / float(segments);
      float x = bezierPoint(a.x, c1.x, c2.x, b.x, u);
      float y = bezierPoint(a.y, c1.y, c2.y, b.y, u);
      pg.vertex(x, y);
    }
    pg.endShape();
  }
}
