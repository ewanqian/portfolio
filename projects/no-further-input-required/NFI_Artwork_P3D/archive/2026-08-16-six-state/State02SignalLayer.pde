class State02SignalLayer extends BaseVisualState {
  int seed;

  State02SignalLayer(AppConfig config) {
    super(config);
  }

  public String id() { return "02"; }
  public void reset(int seed) { this.seed = seed; }
  public void update(float dt, ArtworkContext ctx) {}

  public void draw(PGraphics pg, ArtworkContext ctx) {
    int rails = 10;
    int levels = 18;
    float left = 40;
    float right = pg.width - 40;
    float top = 30;
    float bottom = pg.height - 28;
    float dx = (right - left) / (rails - 1);
    float dy = (bottom - top) / (levels - 1);

    pg.noFill();
    pg.strokeWeight(0.55);
    pg.stroke(rgba(25));
    for (int level = 0; level < levels; level++) {
      float y = top + level * dy;
      pg.line(left, y, right, y);
    }

    for (int rail = 0; rail < rails; rail++) {
      float x = left + rail * dx;
      pg.stroke(rgba(32));
      pg.rect(x - 7, top - 8, 14, bottom - top + 16);

      for (int level = 0; level < levels; level++) {
        float y = top + level * dy;
        float active = stableHash(seed, rail, level);
        if (active < 0.34) {
          float pulse = 0.5 + 0.5 * sin(ctx.time * 0.42 + rail * 0.9 + level * 0.31);
          float alpha = active < 0.08 ? 205 : 74 + pulse * 64;
          pg.stroke(rgba(alpha));
          pg.strokeWeight(active < 0.08 ? 1.45 : 0.85);
          pg.line(x - 7, y, x + 7, y);
        } else {
          pg.stroke(rgba(24));
          pg.strokeWeight(0.52);
          pg.line(x - 4, y, x + 4, y);
        }
      }
    }

    for (int rail = 0; rail < rails - 1; rail++) {
      float x1 = left + rail * dx;
      float x2 = left + (rail + 1) * dx;
      for (int level = 0; level < levels; level++) {
        float route = stableHash(seed + 19, rail, level);
        if (route < 0.34) {
          int delta = floor(stableHash(seed + 41, rail, level) * 5) - 2;
          int target = constrain(level + delta, 0, levels - 1);
          float y1 = top + level * dy;
          float y2 = top + target * dy;
          float pulse = 0.5 + 0.5 * sin(ctx.time * 0.28 + rail + level * 0.13);
          pg.stroke(rgba(route < 0.07 ? 88 + pulse * 80 : 23 + pulse * 24));
          pg.strokeWeight(route < 0.07 ? 0.82 : 0.48);
          pg.line(x1, y1, x2, y2);
        }
      }
    }
  }
}
