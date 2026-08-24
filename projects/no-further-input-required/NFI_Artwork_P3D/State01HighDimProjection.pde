class State01HighDimProjection extends BaseVisualState {
  int seed;

  State01HighDimProjection(AppConfig config) {
    super(config);
  }

  public String id() { return "01"; }
  public void reset(int seed) { this.seed = seed; }
  public void update(float dt, ArtworkContext ctx) {}

  public void draw(PGraphics pg, ArtworkContext ctx) {
    int cols = 4;
    int rows = 3;
    float marginX = 46;
    float marginY = 24;
    float gap = 10;
    float cellW = (pg.width - marginX * 2 - gap * (cols - 1)) / cols;
    float cellH = (pg.height - marginY * 2 - gap * (rows - 1)) / rows;

    pg.noFill();
    pg.strokeWeight(0.72);

    for (int row = 0; row < rows; row++) {
      for (int col = 0; col < cols; col++) {
        int index = row * cols + col;
        float x = marginX + col * (cellW + gap);
        float y = marginY + row * (cellH + gap);

        pg.stroke(rgba(26));
        pg.rect(x, y, cellW, cellH);

        float cx = x + cellW * 0.5;
        float cy = y + cellH * 0.52;
        float phase = index * 0.73 + ctx.time * 0.055;
        float sx = cellW * (0.22 + stableHash(seed, index, 1) * 0.06);
        float sy = cellH * (0.24 + stableHash(seed, index, 2) * 0.08);
        float skewX = (stableHash(seed, index, 3) - 0.5) * sx * 0.9 + sin(phase) * 7;
        float skewY = (stableHash(seed, index, 4) - 0.5) * sy * 0.6 + cos(phase * 0.83) * 5;

        PVector[] outer = {
          new PVector(cx - sx + skewX * 0.25, cy - sy),
          new PVector(cx + sx, cy - sy * 0.42 + skewY * 0.35),
          new PVector(cx + sx * 0.62 - skewX * 0.20, cy + sy),
          new PVector(cx - sx * 0.72, cy + sy * 0.56 - skewY * 0.25)
        };

        float innerScale = 0.46;
        float innerDx = skewX * 0.36;
        float innerDy = skewY * 0.45;
        PVector[] inner = new PVector[4];
        for (int i = 0; i < 4; i++) {
          inner[i] = new PVector(
            lerp(cx, outer[i].x, innerScale) + innerDx,
            lerp(cy, outer[i].y, innerScale) + innerDy
          );
        }

        pg.strokeWeight(0.82);
        pg.stroke(rgba(118));
        drawClosed(pg, outer, 0);
        pg.stroke(rgba(92));
        drawClosed(pg, inner, 0);
        for (int i = 0; i < 4; i++) {
          float connectorAlpha = i == index % 4 ? 134 : 70;
          pg.stroke(rgba(connectorAlpha));
          pg.line(outer[i].x, outer[i].y, 0, inner[i].x, inner[i].y, 0);
        }
      }
    }

    pg.stroke(rgba(210));
    pg.strokeWeight(1.35);
    pg.line(pg.width * 0.865, pg.height - 16, pg.width * 0.883, pg.height - 16);
  }
}
