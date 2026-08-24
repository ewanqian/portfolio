class State04IndexField extends BaseVisualState {
  int seed;

  State04IndexField(AppConfig config) {
    super(config);
  }

  public String id() { return "04"; }
  public void reset(int seed) { this.seed = seed; }
  public void update(float dt, ArtworkContext ctx) {}

  public void draw(PGraphics pg, ArtworkContext ctx) {
    int cols = 15;
    int rows = 9;
    float left = 42;
    float right = pg.width - 42;
    float top = 42;
    float bottom = pg.height - 46;
    float dx = (right - left) / (cols - 1);
    float dy = (bottom - top) / (rows - 1);
    int movingSelection = floor(ctx.time * 0.65) % (cols * rows);

    pg.noFill();
    pg.stroke(rgba(32));
    pg.strokeWeight(0.68);
    pg.rect(left, top, right - left, bottom - top);

    for (int row = 0; row < rows; row++) {
      for (int col = 0; col < cols; col++) {
        int index = row * cols + col;
        float jx = (stableHash(seed, col, row) - 0.5) * dx * 0.28;
        float jy = (stableHash(seed + 13, col, row) - 0.5) * dy * 0.28;
        float x = left + col * dx + jx;
        float y = top + row * dy + jy;
        float family = stableHash(seed + 29, col, row);
        boolean selected = index == movingSelection || stableHash(seed + 71, col, row) < 0.035;
        float alpha = selected ? 210 : 25 + stableHash(seed + 43, col, row) * 35;

        pg.stroke(rgba(alpha));
        pg.strokeWeight(selected ? 1.25 : 0.65);
        if (family < 0.28) {
          float side = min(dx, dy) * (0.46 + stableHash(seed + 3, col, row) * 0.12);
          pg.rect(x - side * 0.5, y - side * 0.5, side, side);
        } else {
          float len = dx * (0.45 + stableHash(seed + 5, col, row) * 0.18);
          float slope = (stableHash(seed + 7, col, row) - 0.5) * 17;
          pg.line(x - len * 0.5, y - slope * 0.5, x + len * 0.5, y + slope * 0.5);
        }
      }
    }
  }
}
