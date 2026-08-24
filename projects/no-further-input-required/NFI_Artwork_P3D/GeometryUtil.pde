float stableHash(int a, int b, int c) {
  int n = a * 15731 + b * 789221 + c * 1376312589;
  n = (n << 13) ^ n;
  int v = n * (n * n * 15731 + 789221) + 1376312589;
  return abs(v % 100000) / 100000.0;
}

void drawClosed(PGraphics pg, PVector[] points, float z) {
  pg.beginShape();
  for (PVector p : points) pg.vertex(p.x, p.y, z);
  pg.endShape(CLOSE);
}
