// 816 Web -> Processing / Six State Version
// Processing 4, Java mode, dependency-free
// Current states: ROUTE / FIELD / ORBIT / REWIND / CELLS / PARTITION

final int W = 1280;
final int H = 720;
final float BPM = 104.0;
final int AUTO_BARS = 8;

PGraphics oldLayer;
PGraphics newLayer;
PFont displayFont;

String[] STATE_NAMES = {
  "ROUTE",
  "FIELD",
  "ORBIT",
  "REWIND",
  "CELLS",
  "PARTITION"
};

int state = 1;
int previousState = 1;
boolean autoMode = true;
boolean holdMode = false;
boolean hud = true;

long transportStart;
long lastBeat = -1;
long lastAutoBoundary = -1;
long transitionStart = -9999;
float transitionMs = 1100;

float energy = 0.32;
float hit = 0;
float motion = 0.28;
float density = 0.30;
float memory = 0.10;
float direction = 0;

float pointerImpulse = 0;
float pointerNX = 0.5;
float pointerNY = 0.5;
float pointerVX = 0;
float pointerVY = 0;

ArrayList<VisualEvent> events = new ArrayList<VisualEvent>();
ArrayList<FieldPoint> fieldPoints = new ArrayList<FieldPoint>();

float[] partitionCuts = {0.18, 0.38, 0.61, 0.82};
float[] partitionTarget = {0.18, 0.38, 0.61, 0.82};

void settings() {
  size(W, H, P2D);
  smooth(8);
}

void setup() {
  frameRate(60);
  oldLayer = createGraphics(width, height, P2D);
  newLayer = createGraphics(width, height, P2D);
  displayFont = createFont("SansSerif.bold", 96, true);

  buildFieldPoints();
  transportStart = millis();
}

void draw() {
  long now = millis();

  updateTransport(now);
  updateControlValues(now);
  updateEvents(now);
  updatePartitions();

  float t = constrain((now - transitionStart) / transitionMs, 0, 1);
  float mix = smoothStep(t);

  if (t < 1 && previousState != state) {
    renderState(oldLayer, previousState, now);
    renderState(newLayer, state, now);

    background(5, 6, 7);
    tint(255, 255 * (1 - mix));
    image(oldLayer, 0, 0);
    tint(255, 255 * mix);
    image(newLayer, 0, 0);
    noTint();
  } else {
    renderState(newLayer, state, now);
    background(5, 6, 7);
    image(newLayer, 0, 0);
  }

  if (hud) drawHUD();
}

// ------------------------------------------------------------
// Shared timing / control
// ------------------------------------------------------------

void updateTransport(long now) {
  float beatMs = 60000.0 / BPM;
  long beat = floor((now - transportStart) / beatMs);
  long bar = beat / 4;

  if (beat != lastBeat) {
    if (autoMode && beat % 2 == 0) {
      float x = 0.5 + 0.28 * sin(beat * 0.63);
      float y = 0.5 + 0.18 * sin(beat * 0.37 + 1.4);
      triggerEvent('*', x, y, 0.34, false);
    }
    lastBeat = beat;
  }

  if (autoMode && !holdMode) {
    long boundary = bar / AUTO_BARS;
    if (bar > 0 && bar % AUTO_BARS == 0 && boundary != lastAutoBoundary) {
      setState((state % 6) + 1);
      lastAutoBoundary = boundary;
    }
  }
}

void updateControlValues(long now) {
  float slowA = 0.5 + 0.5 * sin(now * 0.00017);
  float slowB = 0.5 + 0.5 * sin(now * 0.000093 + 1.7);

  energy = lerp(energy, 0.22 + 0.38 * slowA + hit * 0.13, 0.025);
  motion = lerp(motion, 0.18 + 0.38 * slowB + pointerImpulse * 0.16, 0.03);
  density = lerp(density, 0.24 + 0.30 * slowA + hit * 0.10, 0.02);
  direction = lerp(direction, constrain(pointerVX / 45.0, -1, 1), 0.055);

  hit *= 0.90;
  pointerImpulse *= 0.92;
  memory = constrain(events.size() / 30.0, 0, 1);
}

void updateEvents(long now) {
  for (int i = events.size() - 1; i >= 0; i--) {
    if (events.get(i).expired(now)) events.remove(i);
  }
}

void updatePartitions() {
  for (int i = 0; i < partitionCuts.length; i++) {
    partitionCuts[i] = lerp(partitionCuts[i], partitionTarget[i], 0.035);
  }
}

// ------------------------------------------------------------
// Rendering
// ------------------------------------------------------------

void renderState(PGraphics g, int which, long now) {
  g.beginDraw();
  g.background(5, 6, 7);
  g.noFill();
  g.strokeCap(SQUARE);
  g.strokeJoin(MITER);
  g.textFont(displayFont);

  if (which == 1) drawRoute(g, now);
  if (which == 2) drawField(g, now);
  if (which == 3) drawOrbit(g, now);
  if (which == 4) drawRewind(g, now);
  if (which == 5) drawCells(g, now);
  if (which == 6) drawPartition(g, now);

  g.endDraw();
}

// 01 ROUTE ---------------------------------------------------

void drawRoute(PGraphics g, long now) {
  int lanes = 6;
  float left = width * 0.08;
  float right = width * 0.92;

  for (int i = 0; i < lanes; i++) {
    float y = map(i, 0, lanes - 1, height * 0.18, height * 0.82);
    float laneOffset = sin(now * (0.00012 + i * 0.000006) + i * 0.8) * 7;

    g.stroke(116, 133, 138, 78);
    g.strokeWeight(i % 2 == 0 ? 1.0 : 0.6);
    g.line(left, y + laneOffset, right, y + laneOffset);

    int nodes = 12;
    for (int n = 0; n < nodes; n++) {
      float x = lerp(left, right, n / float(nodes - 1));
      float s = (n % 3 == 0) ? 4 : 2;
      g.stroke(174, 191, 195, 95);
      g.rect(x - s * 0.5, y + laneOffset - s * 0.5, s, s);
    }
  }

  for (VisualEvent e : events) {
    float age = e.age01(now);
    float lane = constrain(floor(e.ny * lanes), 0, lanes - 1);
    float y = map(lane, 0, lanes - 1, height * 0.18, height * 0.82);
    float travel = easeOutCubic(age);
    float x = lerp(left, right, travel);
    float tail = 90 + 180 * e.strength;

    g.stroke(229, 237, 238, 220 * (1 - age));
    g.strokeWeight(1.4 + e.strength * 1.5);
    g.line(max(left, x - tail), y, x, y);

    g.noStroke();
    g.fill(236, 241, 241, 220 * (1 - age));
    g.ellipse(x, y, 5 + e.strength * 8, 5 + e.strength * 8);
    g.noFill();
  }

  float scanX = lerp(left, right, (now % 9000) / 9000.0);
  g.stroke(116, 198, 214, 65);
  g.line(scanX, height * 0.13, scanX, height * 0.87);
}

// 02 FIELD ---------------------------------------------------

void buildFieldPoints() {
  fieldPoints.clear();
  int rows = 4;
  int cols = 18;

  for (int r = 0; r < rows; r++) {
    for (int c = 0; c < cols; c++) {
      float nx = (c + 0.5) / cols;
      float ny = (r + 0.5) / rows;
      fieldPoints.add(new FieldPoint(nx, ny, r, c, random(1000)));
    }
  }
}

void drawField(PGraphics g, long now) {
  float[] amp = {18, 34, 25, 14};
  float[] speed = {0.00055, 0.00034, 0.00046, 0.00068};

  for (FieldPoint p : fieldPoints) {
    float baseX = lerp(width * 0.08, width * 0.92, p.nx);
    float baseY = lerp(height * 0.16, height * 0.84, p.ny);

    float phase = now * speed[p.row] + p.col * 0.33 + p.seed;
    float x = baseX + sin(phase * 0.41) * (4 + p.row * 2);
    float y = baseY + sin(phase) * amp[p.row];

    float lift = 0;
    for (VisualEvent e : events) {
      float dx = x - e.nx * width;
      float dy = y - e.ny * height;
      float d = sqrt(dx * dx + dy * dy);
      float local = max(0, 1 - d / 180.0);
      lift += local * e.strength * (1 - e.age01(now)) * 70;
    }

    y -= lift;

    float size = 3 + p.row * 1.2 + energy * 3;
    g.stroke(193, 210, 213, 80 + p.row * 18);
    g.strokeWeight(0.8);
    g.ellipse(x, y, size, size);

    if (p.col < 17 && p.col % 3 == 0) {
      g.stroke(116, 198, 214, 22);
      g.line(x, y, x + 44, y + sin(phase + 0.8) * 8);
    }
  }
}

// 03 ORBIT ---------------------------------------------------

void drawOrbit(PGraphics g, long now) {
  float cx = width * 0.5;
  float cy = height * 0.5;
  float base = min(width, height) * 0.10;

  for (int r = 0; r < 4; r++) {
    float radius = base + r * min(width, height) * 0.085;
    float phase = now * (0.00013 + r * 0.000035) * (1 + motion * 0.5);

    g.stroke(175, 191, 195, 55 + r * 12);
    g.strokeWeight(r == 2 ? 1.2 : 0.7);
    g.ellipse(cx, cy, radius * 2, radius * 2);

    int satellites = 2 + r;
    for (int s = 0; s < satellites; s++) {
      float a = phase + TWO_PI * s / satellites;
      float x = cx + cos(a) * radius;
      float y = cy + sin(a) * radius;
      g.stroke(224, 232, 233, 120);
      g.rect(x - 2, y - 2, 4, 4);
    }
  }

  for (VisualEvent e : events) {
    float age = e.age01(now);
    int ring = constrain(floor(e.ny * 4), 0, 3);
    float radius = base + ring * min(width, height) * 0.085;
    float a = e.seed + age * (0.8 + e.strength * 1.6);
    float x = cx + cos(a) * radius;
    float y = cy + sin(a) * radius;

    g.stroke(236, 240, 239, 220 * (1 - age));
    g.strokeWeight(1.4 + e.strength * 1.5);
    g.arc(cx, cy, radius * 2, radius * 2, a - 0.35, a + 0.35);
    g.ellipse(x, y, 7 + e.strength * 9, 7 + e.strength * 9);
  }
}

// 04 REWIND --------------------------------------------------

void drawRewind(PGraphics g, long now) {
  g.textAlign(CENTER, CENTER);

  for (VisualEvent e : events) {
    float age = e.age01(now);
    float envelope = sin(constrain(age, 0, 1) * PI);
    float size = 58 + 150 * e.strength * envelope;
    float x = e.nx * width;
    float y = e.ny * height;

    int row = keyRow(e.glyph);
    float sx = 1;
    float sy = 1;

    if (row == 0) { sx = 0.72; sy = 1.28; }
    if (row == 1) { sx = 1.28; sy = 0.92; }
    if (row == 2) { sx = 1.05; sy = 1.05; }
    if (row == 3) { sx = 1.38; sy = 0.70; }

    for (int k = 3; k >= 1; k--) {
      float back = k * (18 + e.strength * 24) * age;
      float alpha = (52.0 / k) * (1 - age);
      g.pushMatrix();
      g.translate(x - direction * back, y + (row - 1.5) * back * 0.12);
      g.scale(sx, sy);
      g.fill(116, 198, 214, alpha);
      g.noStroke();
      g.textSize(size * (1 - k * 0.05));
      g.text(str(e.glyph), 0, 0);
      g.popMatrix();
    }

    g.pushMatrix();
    g.translate(x, y);
    g.scale(sx, sy);
    g.fill(237, 240, 239, 220 * (1 - age));
    g.noStroke();
    g.textSize(size);
    g.text(str(e.glyph), 0, 0);
    g.popMatrix();
  }

  g.noFill();
}

int keyRow(char c) {
  String digits = "1234567890";
  String qrow = "QWERTYUIOP";
  String arow = "ASDFGHJKL";
  String zrow = "ZXCVBNM";
  char u = Character.toUpperCase(c);

  if (digits.indexOf(u) >= 0) return 0;
  if (qrow.indexOf(u) >= 0) return 1;
  if (arow.indexOf(u) >= 0) return 2;
  if (zrow.indexOf(u) >= 0) return 3;
  return 2;
}

// 05 CELLS ---------------------------------------------------

void drawCells(PGraphics g, long now) {
  int rows = 4;
  int cols = 10;
  float left = width * 0.10;
  float right = width * 0.90;
  float top = height * 0.20;
  float bottom = height * 0.80;

  for (int r = 0; r < rows; r++) {
    for (int c = 0; c < cols; c++) {
      float x = lerp(left, right, c / float(cols - 1));
      float y = lerp(top, bottom, r / float(rows - 1));
      float pulse = 0;

      for (VisualEvent e : events) {
        int ec = constrain(floor(e.nx * cols), 0, cols - 1);
        int er = constrain(floor(e.ny * rows), 0, rows - 1);
        int md = abs(ec - c) + abs(er - r);
        if (md <= 1) pulse = max(pulse, (1 - e.age01(now)) * e.strength * (md == 0 ? 1.0 : 0.35));
      }

      float s = 6 + pulse * 24;
      float a = 55 + pulse * 175;
      g.stroke(205, 218, 220, a);
      g.strokeWeight(0.7 + pulse);

      if (r == 0) {
        g.ellipse(x, y, s, s);
      } else if (r == 1) {
        g.rect(x - s * 0.5, y - s * 0.5, s, s);
      } else if (r == 2) {
        g.line(x - s, y, x + s, y);
      } else {
        g.noStroke();
        g.fill(185, 204, 207, a * 0.75);
        g.rect(x - s * 0.65, y - s * 0.24, s * 1.3, s * 0.48);
        g.noFill();
      }

      if (c % 2 == 0 && pulse > 0.25 && c < cols - 1) {
        float nx = lerp(left, right, (c + 1) / float(cols - 1));
        g.stroke(116, 198, 214, 80 * pulse);
        g.line(x, y, nx, y);
      }
    }
  }
}

// 06 PARTITION -----------------------------------------------

void drawPartition(PGraphics g, long now) {
  float[] xs = {
    0,
    partitionCuts[0] * width,
    partitionCuts[1] * width,
    partitionCuts[2] * width,
    partitionCuts[3] * width,
    width
  };

  for (int i = 0; i < xs.length - 1; i++) {
    float x = xs[i];
    float w = xs[i + 1] - xs[i];
    float inset = 7 + (i % 2) * 5;

    float alpha = 10 + i * 5;
    if (i % 2 == 0) {
      g.noStroke();
      g.fill(116, 198, 214, alpha);
      g.rect(x + inset, height * 0.14, max(0, w - inset * 2), height * 0.72);
      g.noFill();
    }

    g.stroke(190, 205, 208, 70);
    g.strokeWeight(0.8);
    g.rect(x + inset, height * 0.14, max(0, w - inset * 2), height * 0.72);
  }

  for (int i = 0; i < partitionCuts.length; i++) {
    float x = partitionCuts[i] * width;
    g.stroke(230, 235, 235, 95 + hit * 110);
    g.strokeWeight(1.2);
    g.line(x, height * 0.10, x, height * 0.90);
  }

  for (VisualEvent e : events) {
    float age = e.age01(now);
    float a = 60 * (1 - age) * e.strength;
    g.noStroke();
    g.fill(236, 240, 239, a);
    float bandY = e.ny < 0.5 ? height * 0.14 : height * 0.55;
    g.rect(0, bandY, width, height * 0.31);
    g.noFill();
  }
}

// ------------------------------------------------------------
// Events / input
// ------------------------------------------------------------

void keyPressed() {
  if (key >= '1' && key <= '6') {
    setState(int(key - '0'));
    return;
  }

  if (key == 'a' || key == 'A') {
    autoMode = !autoMode;
    return;
  }

  if (key == 'h' || key == 'H') {
    holdMode = !holdMode;
    return;
  }

  if (key == 'r' || key == 'R') {
    resetRuntime();
    return;
  }

  if (key == 'u' || key == 'U') {
    hud = !hud;
    return;
  }

  if (key == ' ') {
    triggerEvent('*', 0.5, 0.5, 1.0, true);
    return;
  }

  if (Character.isLetterOrDigit(key)) {
    float nx = keyX(key);
    float ny = keyY(key);
    triggerEvent(key, nx, ny, 0.82, true);
  }
}

void mousePressed() {
  updatePointer();
  triggerEvent('*', pointerNX, pointerNY, 0.75, true);
}

void mouseDragged() {
  updatePointer();
  pointerVX = mouseX - pmouseX;
  pointerVY = mouseY - pmouseY;
  pointerImpulse = constrain(pointerImpulse + sqrt(pointerVX * pointerVX + pointerVY * pointerVY) / 75.0, 0, 1);

  if (frameCount % 7 == 0) {
    triggerEvent('*', pointerNX, pointerNY, 0.32 + pointerImpulse * 0.35, false);
  }
}

void mouseMoved() {
  updatePointer();
  pointerVX = mouseX - pmouseX;
  pointerVY = mouseY - pmouseY;
}

void updatePointer() {
  pointerNX = constrain(mouseX / float(width), 0, 1);
  pointerNY = constrain(mouseY / float(height), 0, 1);
}

void triggerEvent(char glyph, float nx, float ny, float strength, boolean human) {
  VisualEvent e = new VisualEvent(glyph, nx, ny, strength, millis(), random(TWO_PI));
  events.add(e);
  while (events.size() > 36) events.remove(0);

  hit = max(hit, strength);
  energy = constrain(energy + strength * 0.08, 0, 1);

  if (human) {
    pointerNX = nx;
    pointerNY = ny;
    pointerImpulse = max(pointerImpulse, strength * 0.55);
  }

  if (state == 6) mutatePartition(nx, strength);
}

void mutatePartition(float nx, float strength) {
  int idx = constrain(floor(nx * partitionTarget.length), 0, partitionTarget.length - 1);
  float delta = random(-0.09, 0.09) * (0.45 + strength);
  partitionTarget[idx] = constrain(partitionTarget[idx] + delta, 0.10 + idx * 0.16, 0.42 + idx * 0.16);

  for (int i = 1; i < partitionTarget.length; i++) {
    partitionTarget[i] = max(partitionTarget[i], partitionTarget[i - 1] + 0.10);
  }
  for (int i = partitionTarget.length - 2; i >= 0; i--) {
    partitionTarget[i] = min(partitionTarget[i], partitionTarget[i + 1] - 0.10);
  }
}

float keyX(char c) {
  String row;
  char u = Character.toUpperCase(c);
  if ("1234567890".indexOf(u) >= 0) row = "1234567890";
  else if ("QWERTYUIOP".indexOf(u) >= 0) row = "QWERTYUIOP";
  else if ("ASDFGHJKL".indexOf(u) >= 0) row = "ASDFGHJKL";
  else row = "ZXCVBNM";

  int index = max(0, row.indexOf(u));
  return map(index, 0, max(1, row.length() - 1), 0.12, 0.88);
}

float keyY(char c) {
  int row = keyRow(c);
  float[] ys = {0.20, 0.39, 0.58, 0.77};
  return ys[row];
}

void setState(int nextState) {
  nextState = constrain(nextState, 1, 6);
  if (nextState == state) return;
  previousState = state;
  state = nextState;
  transitionStart = millis();
}

void resetRuntime() {
  events.clear();
  state = 1;
  previousState = 1;
  transitionStart = -9999;
  transportStart = millis();
  lastBeat = -1;
  lastAutoBoundary = -1;
  energy = 0.32;
  hit = 0;
  motion = 0.28;
  density = 0.30;
  memory = 0.10;
  direction = 0;
  pointerImpulse = 0;

  float[] reset = {0.18, 0.38, 0.61, 0.82};
  for (int i = 0; i < reset.length; i++) {
    partitionCuts[i] = reset[i];
    partitionTarget[i] = reset[i];
  }
}

// ------------------------------------------------------------
// HUD / helpers
// ------------------------------------------------------------

void drawHUD() {
  pushStyle();
  fill(226, 232, 232, 220);
  noStroke();
  textFont(displayFont);
  textSize(12);
  textAlign(LEFT, TOP);
  text("816 / SIX STATES", 20, 18);

  fill(160, 175, 178, 210);
  text("0" + state + "  " + STATE_NAMES[state - 1], 20, 38);
  text("1–6 STATE   SPACE HIT   A AUTO   H HOLD   R RESET   U HUD", 20, height - 30);
  text("AUTO " + (autoMode ? "ON" : "OFF") + "   HOLD " + (holdMode ? "ON" : "OFF") + "   104 BPM", width - 265, 18);
  popStyle();
}

float smoothStep(float x) {
  x = constrain(x, 0, 1);
  return x * x * (3 - 2 * x);
}

float easeOutCubic(float x) {
  x = constrain(x, 0, 1);
  return 1 - pow(1 - x, 3);
}

class VisualEvent {
  char glyph;
  float nx;
  float ny;
  float strength;
  long birth;
  float seed;
  float duration;

  VisualEvent(char glyph_, float nx_, float ny_, float strength_, long birth_, float seed_) {
    glyph = glyph_;
    nx = nx_;
    ny = ny_;
    strength = strength_;
    birth = birth_;
    seed = seed_;
    duration = 1800 + strength * 900;
  }

  float age01(long now) {
    return constrain((now - birth) / duration, 0, 1);
  }

  boolean expired(long now) {
    return now - birth > duration;
  }
}

class FieldPoint {
  float nx;
  float ny;
  int row;
  int col;
  float seed;

  FieldPoint(float nx_, float ny_, int row_, int col_, float seed_) {
    nx = nx_;
    ny = ny_;
    row = row_;
    col = col_;
    seed = seed_;
  }
}
