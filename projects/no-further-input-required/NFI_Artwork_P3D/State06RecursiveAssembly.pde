class AssemblyCell {
  float x;
  float y;
  float w;
  float h;
  int depth;
  int id;

  AssemblyCell(float x, float y, float w, float h, int depth, int id) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.depth = depth;
    this.id = id;
  }
}

class State06RecursiveAssembly extends BaseVisualState {
  int seed;
  final ArrayList<AssemblyCell> cells = new ArrayList<AssemblyCell>();

  State06RecursiveAssembly(AppConfig config) {
    super(config);
  }

  public String id() { return "06"; }

  public void reset(int seed) {
    this.seed = seed;
    cells.clear();
    cells.add(new AssemblyCell(24, 14, 1792, 950, 0, 1));
    while (cells.size() < 31) splitLargest();
  }

  void splitLargest() {
    int chosen = -1;
    float best = -1;
    for (int i = 0; i < cells.size(); i++) {
      AssemblyCell cell = cells.get(i);
      float area = cell.w * cell.h * (0.82 + stableHash(seed, cell.id, cell.depth) * 0.36);
      if (cell.w < 150 || cell.h < 90) area *= 0.35;
      if (area > best) {
        best = area;
        chosen = i;
      }
    }
    if (chosen < 0) return;

    AssemblyCell source = cells.remove(chosen);
    boolean vertical = source.w / source.h > 1.22;
    if (source.h / source.w > 1.28) vertical = false;
    if (source.depth % 3 == 2) vertical = !vertical;
    float ratio = 0.36 + stableHash(seed + 17, source.id, source.depth) * 0.28;
    float gap = 7;
    int leftId = source.id * 2;
    int rightId = source.id * 2 + 1;

    if (vertical) {
      float first = source.w * ratio - gap * 0.5;
      cells.add(new AssemblyCell(source.x, source.y, first, source.h, source.depth + 1, leftId));
      cells.add(new AssemblyCell(source.x + first + gap, source.y, source.w - first - gap, source.h, source.depth + 1, rightId));
    } else {
      float first = source.h * ratio - gap * 0.5;
      cells.add(new AssemblyCell(source.x, source.y, source.w, first, source.depth + 1, leftId));
      cells.add(new AssemblyCell(source.x, source.y + first + gap, source.w, source.h - first - gap, source.depth + 1, rightId));
    }
  }

  public void update(float dt, ArtworkContext ctx) {}

  public void draw(PGraphics pg, ArtworkContext ctx) {
    int primary = floor(ctx.time * 0.48) % cells.size();
    int secondary = (primary + 11) % cells.size();
    int tertiary = (primary + 23) % cells.size();

    pg.noFill();
    for (int i = 0; i < cells.size(); i++) {
      AssemblyCell cell = cells.get(i);
      boolean selected = i == primary || i == secondary || i == tertiary;
      float alpha = selected ? 205 : 33 + stableHash(seed, cell.id, 7) * 23;
      pg.stroke(rgba(alpha));
      pg.strokeWeight(selected ? 1.15 : 0.68);
      pg.rect(cell.x, cell.y, cell.w, cell.h);

      boolean down = stableHash(seed + 31, cell.id, cell.depth) > 0.48;
      float inset = 1.5;
      pg.stroke(rgba(selected ? 218 : 42));
      pg.strokeWeight(selected ? 1.25 : 0.62);
      if (down) {
        pg.line(cell.x + inset, cell.y + inset, cell.x + cell.w - inset, cell.y + cell.h - inset);
      } else {
        pg.line(cell.x + inset, cell.y + cell.h - inset, cell.x + cell.w - inset, cell.y + inset);
      }
    }
  }
}
