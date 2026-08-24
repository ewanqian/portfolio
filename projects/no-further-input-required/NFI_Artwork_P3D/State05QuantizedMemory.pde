class State05QuantizedMemory extends BaseVisualState {
  int seed;

  State05QuantizedMemory(AppConfig config) {
    super(config);
  }

  public String id() { return "05"; }
  public void reset(int seed) { this.seed = seed; }
  public void update(float dt, ArtworkContext ctx) {}

  public void draw(PGraphics pg, ArtworkContext ctx) {
    int cols = 74;
    int rows = 47;
    float dx = pg.width / (float) cols;
    float dy = pg.height / (float) rows;

    pg.noStroke();
    for (int row = 0; row < rows; row++) {
      float verticalFade = map(row, 0, rows - 1, 1.0, 0.18);
      for (int col = 0; col < cols; col++) {
        float existence = stableHash(seed, col, row);
        if (existence < 0.44) continue;

        float x = col * dx + 8;
        float y = row * dy + dy * 0.52;
        float alpha = (48 + stableHash(seed + 11, col, row) * 122) * verticalFade;
        pg.fill(rgba(alpha));

        if (stableHash(seed + 23, col, row) < 0.075) {
          float side = 8 + stableHash(seed + 31, col, row) * 8;
          pg.rect(x - side * 0.5, y - side * 0.5, side, side);
        } else {
          float len = 8 + stableHash(seed + 41, col, row) * 9;
          pg.rect(x - len * 0.5, y - 1.0, len, 2.0);
        }
      }
    }

    int streamCount = 10;
    for (int stream = 0; stream < streamCount; stream++) {
      int spacing = 7 + stream % 4;
      for (int row = -4; row < rows + 3; row += spacing) {
        float drift = (ctx.time * (6 + stream * 0.22)) % (dx * spacing);
        float x = (stream * 185 + row * 14 + drift) % pg.width;
        float y = row * dy;
        if (x < 0) x += pg.width;
        if (y < 0 || y > pg.height) continue;
        float verticalFade = map(y, 0, pg.height, 1.0, 0.24);
        pg.fill(rgba((128 + (stream % 3) * 34) * verticalFade));
        float side = 12 + (stream % 2) * 3;
        pg.rect(x - side * 0.5, y - side * 0.5, side, side);
      }
    }

    pg.stroke(rgba(150));
    pg.strokeWeight(0.72);
    pg.line(0, 9, pg.width, 9);
    pg.noFill();
  }
}
