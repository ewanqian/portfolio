class State03ConstraintMechanism extends BaseVisualState {
  int seed;

  State03ConstraintMechanism(AppConfig config) {
    super(config);
  }

  public String id() { return "03"; }
  public void reset(int seed) { this.seed = seed; }
  public void update(float dt, ArtworkContext ctx) {}

  public void draw(PGraphics pg, ArtworkContext ctx) {
    int cols = 10;
    int rows = 6;
    float left = 80;
    float right = pg.width - 78;
    float top = 64;
    float bottom = pg.height - 68;
    float dx = (right - left) / cols;
    float dy = (bottom - top) / rows;

    pg.noFill();
    pg.strokeWeight(0.64);
    pg.stroke(rgba(35));
    for (int c = 0; c <= cols; c++) {
      float x = left + c * dx;
      pg.line(x, top, x, bottom);
    }
    for (int r = 0; r <= rows; r++) {
      float y = top + r * dy;
      pg.line(left, y, right, y);
    }

    for (int c = 0; c < cols; c++) {
      for (int r = 0; r < rows; r++) {
        if ((c + r * 3) % 5 == 0 || stableHash(seed, c, r) < 0.11) {
          float x1 = left + c * dx;
          float y1 = top + r * dy;
          pg.stroke(rgba(43));
          pg.strokeWeight(0.62);
          pg.line(x1, y1, x1 + dx, y1 + dy);
        }
      }
    }

    for (int c = 0; c <= cols; c++) {
      for (int r = 0; r <= rows; r++) {
        float x = left + c * dx;
        float y = top + r * dy;
        float nodeAlpha = 58 + stableHash(seed + 7, c, r) * 70;
        pg.noStroke();
        pg.fill(rgba(nodeAlpha));
        pg.rect(x - 1.6, y - 1.6, 3.2, 3.2);
      }
    }

    int[] anchorCols = {0, 3, 6, 9};
    for (int i = 0; i < anchorCols.length; i++) {
      int c = anchorCols[i];
      float x = left + c * dx;
      for (int edge = 0; edge < 2; edge++) {
        float y = edge == 0 ? top : bottom;
        float pulse = 0.66 + 0.34 * sin(ctx.time * 0.36 + i * 1.2 + edge);
        pg.noFill();
        pg.stroke(rgba(46 + pulse * 35));
        pg.strokeWeight(0.7);
        pg.rect(x - 11, y - 11, 22, 22);
        pg.noStroke();
        pg.fill(rgba(180 + pulse * 55));
        pg.rect(x - 3.5, y - 3.5, 7, 7);
      }
    }
    pg.noFill();
  }
}
