// 816 Web -> Processing Visual Grammar Harness
// Processing 4 / Java mode / dependency-free
// Principle: reproduce behavior, not assets.

final int W = 1280;
final int H = 720;
final float BPM = 104.0;
final int AUTO_BARS = 8;
final int AGENT_COUNT = 420;
final int MAX_RESIDUE = 180;
final int CAPTURE_FRAMES_PER_STATE = 45;

PGraphics layerOld;
PGraphics layerNew;

ControlBus bus = new ControlBus();
ArrayList<Agent> agents = new ArrayList<Agent>();
ArrayList<Pulse> pulses = new ArrayList<Pulse>();
ArrayList<Scar> scars = new ArrayList<Scar>();
ArrayList<Residue> residues = new ArrayList<Residue>();

String[] stateNames = {
  "FLOWCHAIN",
  "RING_WAVE",
  "SCAR_FLASH",
  "RESIDUE_FIELD",
  "SIZZLE_GRAIN",
  "PRESSURE_CHAMBER",
  "SCREEN_POINTS",
  "CHROMA_STRAND"
};

int currentState = 1;
int previousState = 1;
boolean autoMode = true;
boolean holdMode = false;
boolean showHUD = true;
boolean captureMode = false;

long transportStartMs;
long lastFrameMs;
long lastBeat = -1;
long lastAutoBoundary = -1;
long transitionStartMs = -9999;
float transitionDurationMs = 1200.0;

float pointerImpulse = 0;
float pointerVX = 0;
float pointerVY = 0;
float pointerNX = 0.5;
float pointerNY = 0.5;

int seed = 81626;

void settings() {
  size(W, H, P3D);
  smooth(8);
}

void setup() {
  frameRate(60);
  randomSeed(seed);
  noiseSeed(seed);

  // Keep the presentation surface P3D, but use stable 2D transition buffers.
  // Two simultaneous offscreen P3D framebuffers fail validation on this macOS runtime.
  layerOld = createGraphics(width, height, JAVA2D);
  layerNew = createGraphics(width, height, JAVA2D);

  for (int i = 0; i < AGENT_COUNT; i++) {
    agents.add(new Agent(random(width), random(height), random(10000)));
  }

  transportStartMs = millis();
  lastFrameMs = millis();
  resetBus();
  captureMode = "816_GRAMMAR".equals(System.getenv("NFI_CAPTURE_MODE"));
  if (captureMode) {
    autoMode = false;
    holdMode = true;
    showHUD = false;
    new java.io.File(sketchPath("captures")).mkdirs();
  }
}

void draw() {
  long now = millis();
  float dt = max(0.001, (now - lastFrameMs) / 1000.0);
  lastFrameMs = now;

  updateTransport(now);
  updateControlBus(now, dt);
  updateWorld(now, dt);

  if (captureMode) {
    int captureFrame = (frameCount - 1) % CAPTURE_FRAMES_PER_STATE;
    currentState = constrain((frameCount - 1) / CAPTURE_FRAMES_PER_STATE + 1, 1, 8);
    previousState = currentState;
    transitionStartMs = -9999;
    if (captureFrame == 0 && (currentState == 2 || currentState == 3 || currentState == 7 || currentState == 8)) {
      injectHit(1.0, 0.62, 0.48, false);
    }
  }

  float t = constrain((now - transitionStartMs) / transitionDurationMs, 0, 1);
  float eased = smoothstep(t);

  if (t < 1 && previousState != currentState) {
    renderState(layerOld, previousState, now);
    renderState(layerNew, currentState, now);

    background(4, 5, 6);
    tint(255, 255 * (1.0 - eased));
    image(layerOld, 0, 0);
    tint(255, 255 * eased);
    image(layerNew, 0, 0);
    noTint();
  } else {
    renderState(layerNew, currentState, now);
    background(4, 5, 6);
    image(layerNew, 0, 0);
  }

  if (showHUD) drawHUD(now);

  if (captureMode) {
    int captureFrame = (frameCount - 1) % CAPTURE_FRAMES_PER_STATE;
    if (captureFrame == CAPTURE_FRAMES_PER_STATE - 1) {
      saveFrame("captures/" + nf(currentState, 2) + "-" + stateNames[currentState - 1].toLowerCase() + ".png");
    }
    if (frameCount >= CAPTURE_FRAMES_PER_STATE * 8) exit();
  }
}

// ------------------------------------------------------------
// Transport / structure
// ------------------------------------------------------------

void updateTransport(long now) {
  float beatMs = 60000.0 / BPM;
  long beat = floor((now - transportStartMs) / beatMs);
  long bar = beat / 4;

  if (beat != lastBeat) {
    boolean strongBeat = (beat % 4 == 0);

    if (autoMode && strongBeat) {
      injectHit(0.42, 0.5 + 0.34 * sin(beat * 0.61), 0.5 + 0.22 * sin(beat * 0.37 + 1.2), false);
    }

    lastBeat = beat;
  }

  if (autoMode && !holdMode) {
    long boundary = bar / AUTO_BARS;
    if (bar > 0 && bar % AUTO_BARS == 0 && boundary != lastAutoBoundary) {
      setState((currentState % 8) + 1);
      lastAutoBoundary = boundary;
    }
  }
}

void updateControlBus(long now, float dt) {
  float slowA = 0.5 + 0.5 * sin(now * 0.00019);
  float slowB = 0.5 + 0.5 * sin(now * 0.00011 + 1.7);
  float slowC = 0.5 + 0.5 * sin(now * 0.000073 + 4.2);

  float targetEnergy = 0.24 + 0.34 * slowA;
  float targetPressure = 0.18 + 0.48 * slowB;
  float targetTension = 0.12 + 0.52 * slowC;
  float targetDensity = 0.20 + 0.42 * (0.55 * slowA + 0.45 * slowB);
  float targetSpace = 0.84 - targetPressure * 0.48;
  float targetSizzle = 0.08 + 0.44 * abs(sin(now * 0.00043));

  bus.energy = easeTo(bus.energy, targetEnergy + pointerImpulse * 0.14, dt, 2.2);
  bus.pressure = easeTo(bus.pressure, targetPressure + pointerImpulse * 0.22, dt, 2.8);
  bus.tension = easeTo(bus.tension, targetTension + bus.hit * 0.30, dt, 2.0);
  bus.density = easeTo(bus.density, targetDensity + bus.hit * 0.16, dt, 2.4);
  bus.space = easeTo(bus.space, targetSpace - bus.hit * 0.10, dt, 1.8);
  bus.sizzle = easeTo(bus.sizzle, targetSizzle + pointerImpulse * 0.14, dt, 4.0);

  bus.direction = easeTo(bus.direction, constrain(pointerVX * 0.008, -1, 1), dt, 3.2);
  bus.stereoBias = easeTo(bus.stereoBias, constrain((pointerNX - 0.5) * 2.0, -1, 1) * pointerImpulse, dt, 2.4);

  bus.hit *= pow(0.025, dt);
  pointerImpulse *= pow(0.12, dt);

  bus.memory = constrain(0.10 + residues.size() / float(MAX_RESIDUE) * 0.72, 0, 1);
  bus.clampAll();
}

float easeTo(float current, float target, float dt, float speed) {
  float k = 1.0 - exp(-speed * dt);
  return lerp(current, target, k);
}

// ------------------------------------------------------------
// World update
// ------------------------------------------------------------

void updateWorld(long now, float dt) {
  float speedScale = 0.55 + bus.energy * 1.7;

  for (Agent a : agents) {
    float n = noise(a.x * 0.0023, a.y * 0.0023, now * 0.000055 + a.seed * 0.001);
    float angle = n * TWO_PI * 2.6 + bus.direction * 0.85;

    float fx = cos(angle);
    float fy = sin(angle);

    // Pointer is an impulse field, never a position leash.
    float dx = a.x - pointerNX * width;
    float dy = a.y - pointerNY * height;
    float d2 = dx * dx + dy * dy + 2400.0;
    float local = pointerImpulse * 90000.0 / d2;
    float invLen = 1.0 / max(1.0, sqrt(dx * dx + dy * dy));

    fx += (-dy * invLen) * local + pointerVX * 0.0015 * local;
    fy += ( dx * invLen) * local + pointerVY * 0.0015 * local;

    a.vx = lerp(a.vx, fx * speedScale, 0.09);
    a.vy = lerp(a.vy, fy * speedScale, 0.09);
    a.px = a.x;
    a.py = a.y;
    a.x += a.vx * 60.0 * dt;
    a.y += a.vy * 60.0 * dt;
    a.wrap();
  }

  for (int i = pulses.size() - 1; i >= 0; i--) {
    if (pulses.get(i).expired(now)) pulses.remove(i);
  }

  for (int i = scars.size() - 1; i >= 0; i--) {
    if (scars.get(i).expired(now)) scars.remove(i);
  }

  for (int i = residues.size() - 1; i >= 0; i--) {
    Residue r = residues.get(i);
    r.life *= pow(0.94, dt);
    if (r.life < 0.035) residues.remove(i);
  }

  while (residues.size() > MAX_RESIDUE) residues.remove(0);
}

// ------------------------------------------------------------
// State rendering
// ------------------------------------------------------------

void renderState(PGraphics g, int stateId, long now) {
  g.beginDraw();
  g.background(4, 5, 6);
  g.noFill();
  g.strokeCap(SQUARE);
  g.strokeJoin(MITER);

  if (stateId == 1) drawFlowchain(g, now);
  if (stateId == 2) drawRingWave(g, now);
  if (stateId == 3) drawScarFlash(g, now);
  if (stateId == 4) drawResidueField(g, now);
  if (stateId == 5) drawSizzleGrain(g, now);
  if (stateId == 6) drawPressureChamber(g, now);
  if (stateId == 7) drawScreenPoints(g, now);
  if (stateId == 8) drawChromaStrand(g, now);

  g.endDraw();
}

// 1 — FLOWCHAIN
void drawFlowchain(PGraphics g, long now) {
  g.pushMatrix();

  int stride = max(1, int(map(bus.density, 0, 1, 5, 1)));
  for (int i = 0; i < agents.size(); i += stride) {
    Agent a = agents.get(i);
    float speed = sqrt(a.vx * a.vx + a.vy * a.vy);
    float alpha = 28 + 105 * bus.energy + min(65, speed * 18);
    g.stroke(205, 222, 226, alpha);
    g.strokeWeight(0.65 + bus.pressure * 1.1);
    g.line(a.px, a.py, a.x, a.y);
  }

  // sparse structural links
  g.stroke(113, 193, 209, 35 + 55 * bus.memory);
  g.strokeWeight(0.7);
  for (int i = 0; i < agents.size() - 9; i += 24) {
    Agent a = agents.get(i);
    Agent b = agents.get(i + 9);
    if (dist(a.x, a.y, b.x, b.y) < 120) g.line(a.x, a.y, b.x, b.y);
  }

  drawResidueMarks(g, 0.32);
  g.popMatrix();
}

// 2 — RING_WAVE
void drawRingWave(PGraphics g, long now) {
  g.pushMatrix();

  float cx = width * (0.5 + bus.stereoBias * 0.08);
  float cy = height * 0.5;

  g.stroke(160, 180, 184, 26);
  g.strokeWeight(1);
  for (int i = 1; i <= 5; i++) {
    float r = i * min(width, height) * 0.085;
    float wobble = sin(now * 0.0007 + i) * 7 * bus.tension;
    g.ellipse(cx, cy, r * 2 + wobble, r * 2 - wobble);
  }

  for (Pulse p : pulses) {
    float age = p.age01(now);
    float e = 1.0 - age;
    float r = lerp(8, min(width, height) * (0.18 + 0.54 * p.strength), age);
    float squash = 1.0 + sin(age * PI * 3 + p.seed) * 0.08 * bus.tension;
    g.stroke(225, 236, 238, 220 * e);
    g.strokeWeight(0.7 + 2.2 * e);
    g.ellipse(p.x, p.y, r * 2 * squash, r * 2 / squash);

    if (p.strength > 0.65) {
      g.stroke(116, 198, 214, 90 * e);
      for (int k = 0; k < 12; k++) {
        float a = TWO_PI * k / 12.0 + p.seed * 0.17;
        g.line(p.x + cos(a) * r * 0.84, p.y + sin(a) * r * 0.84,
               p.x + cos(a) * r, p.y + sin(a) * r);
      }
    }
  }

  drawResidueMarks(g, 0.22);
  g.popMatrix();
}

// 3 — SCAR_FLASH
void drawScarFlash(PGraphics g, long now) {
  g.pushMatrix();

  g.stroke(116, 198, 214, 24);
  for (int i = 0; i < 12; i++) {
    float x = width * (i + 1) / 13.0;
    g.line(x, height * 0.18, x, height * 0.82);
  }

  for (Scar s : scars) {
    float age = s.age01(now);
    float e = 1.0 - age;
    float len = lerp(30, width * (0.24 + 0.36 * s.strength), min(1, age * 3.0));

    g.pushMatrix();
    g.translate(s.x, s.y);
    g.rotate(s.angle);
    g.stroke(235, 239, 238, 235 * e);
    g.strokeWeight(0.8 + 3.5 * e * s.strength);

    g.beginShape();
    int segments = 18;
    for (int i = 0; i <= segments; i++) {
      float u = i / float(segments);
      float x = lerp(-len * 0.5, len * 0.5, u);
      float y = sin(u * PI * 7 + s.seed) * 3.5 * s.strength;
      y += (noise(s.seed, u * 4.0) - 0.5) * 18 * s.strength;
      g.vertex(x, y);
    }
    g.endShape();
    g.popMatrix();
  }

  if (bus.hit > 0.55) {
    float a = 65 * sq(bus.hit);
    g.noStroke();
    g.fill(235, 242, 242, a);
    float side = bus.stereoBias >= 0 ? width * 0.79 : width * 0.08;
    g.rect(side, 0, width * 0.13, height);
    g.noFill();
  }

  drawResidueMarks(g, 0.18);
  g.popMatrix();
}

// 4 — RESIDUE_FIELD
void drawResidueField(PGraphics g, long now) {
  g.pushMatrix();

  g.strokeWeight(1);
  for (int i = 0; i < residues.size(); i++) {
    Residue r = residues.get(i);
    float a = 25 + 135 * r.life;
    float size = 3 + r.energy * 20;

    g.stroke(184, 202, 205, a);
    g.rect(r.x - size * 0.5, r.y - size * 0.5, size, size);

    if (i > 0 && i % 3 == 0) {
      Residue q = residues.get(i - 1);
      if (dist(r.x, r.y, q.x, q.y) < 180) {
        g.stroke(112, 193, 208, 38 * min(r.life, q.life));
        g.line(r.x, r.y, q.x, q.y);
      }
    }
  }

  // The field reacts to its own history without framebuffer smearing.
  int stride = 4;
  for (int i = 0; i < agents.size(); i += stride) {
    Agent a = agents.get(i);
    float influence = 0;
    for (int j = max(0, residues.size() - 20); j < residues.size(); j++) {
      Residue r = residues.get(j);
      float d = dist(a.x, a.y, r.x, r.y);
      influence += r.life * max(0, 1.0 - d / 170.0);
    }
    if (influence > 0.02) {
      g.stroke(215, 226, 228, min(150, 28 + influence * 85));
      g.point(a.x, a.y);
    }
  }

  g.popMatrix();
}

// 5 — SIZZLE_GRAIN
void drawSizzleGrain(PGraphics g, long now) {
  g.pushMatrix();

  float bandY = height * (0.38 + 0.12 * sin(now * 0.00024));
  float bandH = height * (0.10 + 0.20 * bus.energy);

  g.stroke(194, 211, 214, 18);
  g.line(width * 0.08, bandY, width * 0.92, bandY);
  g.line(width * 0.08, bandY + bandH, width * 0.92, bandY + bandH);

  int count = int(70 + bus.density * 280);
  randomSeed(seed + int(now / 70));
  for (int i = 0; i < count; i++) {
    float x = random(width * 0.08, width * 0.92);
    float y = random(bandY, bandY + bandH);
    float jitter = random(-1, 1) * (2 + 18 * bus.sizzle);
    float len = random(1, 4 + 18 * bus.sizzle);
    float a = random(24, 105) * (0.55 + bus.sizzle * 0.8);

    g.stroke(220, 229, 231, a);
    g.strokeWeight(random(0.5, 1.3));
    if (i % 3 == 0) g.line(x, y, x + len, y + jitter);
    else g.point(x + jitter, y);
  }

  // stable macro structure
  g.noFill();
  g.stroke(112, 193, 208, 62 + 70 * bus.hit);
  g.rect(width * 0.08, bandY, width * 0.84, bandH);

  g.popMatrix();
}

// 6 — PRESSURE_CHAMBER
void drawPressureChamber(PGraphics g, long now) {
  g.pushMatrix();

  float leftPressure = constrain(bus.pressure * (1.0 - bus.stereoBias * 0.52), 0, 1);
  float rightPressure = constrain(bus.pressure * (1.0 + bus.stereoBias * 0.52), 0, 1);
  float leftX = width * (0.05 + leftPressure * 0.21);
  float rightX = width * (0.95 - rightPressure * 0.21);

  g.noStroke();
  g.fill(112, 193, 208, 12 + 48 * leftPressure);
  g.rect(0, 0, leftX, height);
  g.fill(128, 46, 58, 10 + 52 * rightPressure);
  g.rect(rightX, 0, width - rightX, height);
  g.noFill();

  int curtains = 18;
  for (int i = 0; i < curtains; i++) {
    float u = i / float(curtains - 1);
    float y = lerp(height * 0.12, height * 0.88, u);
    float wave = sin(now * 0.0007 + i * 0.72) * 13 * bus.tension;

    g.stroke(200, 216, 219, 36 + 76 * bus.tension);
    g.strokeWeight(0.7);
    g.line(leftX + wave, y, width * 0.5 - width * 0.06 * bus.space, y + wave * 0.2);
    g.line(rightX - wave, y, width * 0.5 + width * 0.06 * bus.space, y - wave * 0.2);
  }

  g.stroke(232, 237, 237, 90 + 100 * bus.hit);
  g.rect(leftX, height * 0.12, rightX - leftX, height * 0.76);

  g.popMatrix();
}

// 7 — SCREEN_POINTS
void drawScreenPoints(PGraphics g, long now) {
  g.pushMatrix();

  int cols = 18;
  int rows = 9;
  float x0 = width * 0.09;
  float x1 = width * 0.91;
  float y0 = height * 0.16;
  float y1 = height * 0.84;
  float activePhase = (now * 0.00018 * (0.6 + bus.energy)) % 1.0;

  for (int r = 0; r < rows; r++) {
    for (int c = 0; c < cols; c++) {
      float nx = c / float(cols - 1);
      float ny = r / float(rows - 1);
      float x = lerp(x0, x1, nx);
      float y = lerp(y0, y1, ny);

      float diag = abs((nx * 0.72 + ny * 0.28) - activePhase);
      diag = min(diag, 1.0 - diag);
      float phrase = max(0, 1.0 - diag * 8.0);

      float residueInfluence = 0;
      for (int j = max(0, residues.size() - 10); j < residues.size(); j++) {
        Residue rr = residues.get(j);
        float d = dist(x, y, rr.x, rr.y);
        residueInfluence = max(residueInfluence, rr.life * max(0, 1.0 - d / 120.0));
      }

      float active = constrain(phrase * (0.35 + bus.energy) + residueInfluence + bus.hit * 0.55, 0, 1);
      float size = 2.0 + active * 8.0;

      g.stroke(192, 210, 213, 32 + active * 185);
      g.strokeWeight(0.7 + active * 1.2);
      g.rect(x - size * 0.5, y - size * 0.5, size, size);

      if (c < cols - 1 && active > 0.52) {
        float nx2 = lerp(x0, x1, (c + 1) / float(cols - 1));
        g.stroke(112, 193, 208, 42 * active);
        g.line(x, y, nx2, y);
      }
    }
  }

  g.popMatrix();
}

// 8 — CHROMA_STRAND
void drawChromaStrand(PGraphics g, long now) {
  g.pushMatrix();

  int strands = 3;
  int samples = 150;
  for (int s = 0; s < strands; s++) {
    float offset = (s - 1) * 38;
    float depth = (s - 1) * 35;
    g.strokeWeight(0.7 + (s == 1 ? 1.4 : 0.5));

    if (s == 1) g.stroke(202, 226, 230, 150 + 80 * bus.energy);
    else if (s == 0) g.stroke(112, 193, 208, 62 + 65 * bus.memory);
    else g.stroke(128, 46, 58, 55 + 70 * bus.tension);

    g.beginShape();
    for (int i = 0; i < samples; i++) {
      float u = i / float(samples - 1);
      float x = lerp(width * 0.06, width * 0.94, u);
      float phase = u * TWO_PI * (1.1 + bus.tension * 1.8) + now * 0.00038;
      float y = height * 0.5 + offset;
      y += sin(phase + s * 0.7) * (36 + 88 * bus.energy);
      y += sin(phase * 2.7 + 1.4) * 18 * bus.tension;
      y += bus.direction * (u - 0.5) * height * 0.18;
      // Preserve depth behavior as projected separation inside the 2D crossfade buffer.
      float projectedDepth = depth + sin(phase * 0.72) * 55 * bus.memory;
      g.vertex(x, y + projectedDepth * 0.12);
    }
    g.endShape();
  }

  for (Pulse p : pulses) {
    float age = p.age01(now);
    float u = constrain(age * 1.25, 0, 1);
    float x = lerp(width * 0.06, width * 0.94, u);
    float phase = u * TWO_PI * (1.1 + bus.tension * 1.8) + now * 0.00038;
    float y = height * 0.5 + sin(phase + 0.7) * (36 + 88 * bus.energy);
    float rr = 5 + 20 * (1.0 - age) * p.strength;
    g.stroke(237, 240, 239, 220 * (1.0 - age));
    g.ellipse(x, y, rr, rr);
  }

  g.popMatrix();
}

void drawResidueMarks(PGraphics g, float strength) {
  for (int i = max(0, residues.size() - 45); i < residues.size(); i++) {
    Residue r = residues.get(i);
    float a = 110 * r.life * strength;
    g.stroke(180, 201, 205, a);
    g.strokeWeight(0.7);
    float d = 2 + 12 * r.energy;
    g.rect(r.x - d * 0.5, r.y - d * 0.5, d, d);
  }
}

// ------------------------------------------------------------
// Input / events
// ------------------------------------------------------------

void keyPressed() {
  if (key >= '1' && key <= '8') {
    setState(int(key - '0'));
    return;
  }

  if (key == ' ') {
    injectHit(1.0, 0.5 + bus.stereoBias * 0.22, 0.5, true);
  }

  if (key == 'a' || key == 'A') autoMode = !autoMode;
  if (key == 'h' || key == 'H') holdMode = !holdMode;
  if (key == 'r' || key == 'R') resetRuntime();
  if (key == 's' || key == 'S') saveFrame("capture-####.png");
  if (key == 'u' || key == 'U') showHUD = !showHUD;
}

void mousePressed() {
  updatePointerFromMouse();
  pointerImpulse = min(1.0, pointerImpulse + 0.62);
  injectHit(0.72, pointerNX, pointerNY, true);
}

void mouseDragged() {
  updatePointerFromMouse();
  pointerVX = mouseX - pmouseX;
  pointerVY = mouseY - pmouseY;
  float speed = sqrt(pointerVX * pointerVX + pointerVY * pointerVY);
  pointerImpulse = constrain(pointerImpulse + speed / 95.0, 0, 1);

  if (frameCount % 4 == 0) {
    addResidue(pointerNX * width, pointerNY * height, constrain(speed / 45.0, 0.15, 1.0));
  }
}

void mouseMoved() {
  updatePointerFromMouse();
  pointerVX = mouseX - pmouseX;
  pointerVY = mouseY - pmouseY;
}

void updatePointerFromMouse() {
  pointerNX = constrain(mouseX / float(width), 0, 1);
  pointerNY = constrain(mouseY / float(height), 0, 1);
}

void injectHit(float strength, float nx, float ny, boolean human) {
  nx = constrain(nx, 0.02, 0.98);
  ny = constrain(ny, 0.02, 0.98);

  bus.hit = max(bus.hit, strength);
  bus.energy = constrain(bus.energy + strength * 0.08, 0, 1);
  bus.pressure = constrain(bus.pressure + strength * 0.06, 0, 1);

  float x = nx * width;
  float y = ny * height;
  pulses.add(new Pulse(x, y, millis(), strength, random(1000)));
  addResidue(x, y, strength);

  float angle = lerp(-PI * 0.35, PI * 0.35, nx) + bus.direction * 0.4;
  if (currentState == 3 || strength > 0.88) {
    scars.add(new Scar(x, y, angle, millis(), strength, random(1000)));
  }

  if (human) {
    pointerNX = nx;
    pointerNY = ny;
    pointerImpulse = max(pointerImpulse, 0.48 * strength);
  }
}

void addResidue(float x, float y, float energy) {
  residues.add(new Residue(x, y, energy));
  while (residues.size() > MAX_RESIDUE) residues.remove(0);
}

void setState(int nextState) {
  nextState = constrain(nextState, 1, 8);
  if (nextState == currentState) return;
  previousState = currentState;
  currentState = nextState;
  transitionStartMs = millis();
}

void resetRuntime() {
  pulses.clear();
  scars.clear();
  residues.clear();
  randomSeed(seed);
  noiseSeed(seed);
  for (Agent a : agents) a.reset(random(width), random(height));
  transportStartMs = millis();
  lastBeat = -1;
  lastAutoBoundary = -1;
  pointerImpulse = 0;
  pointerVX = 0;
  pointerVY = 0;
  resetBus();
}

void resetBus() {
  bus.energy = 0.34;
  bus.pressure = 0.28;
  bus.tension = 0.22;
  bus.density = 0.32;
  bus.space = 0.72;
  bus.memory = 0.18;
  bus.hit = 0;
  bus.direction = 0;
  bus.stereoBias = 0;
  bus.sizzle = 0.12;
}

// ------------------------------------------------------------
// HUD
// ------------------------------------------------------------

void drawHUD(long now) {
  hint(DISABLE_DEPTH_TEST);
  pushStyle();

  fill(236, 239, 238, 210);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text("816 / PROCESSING VISUAL GRAMMAR", 22, 18);

  fill(172, 185, 188, 205);
  text("0" + currentState + "  " + stateNames[currentState - 1], 22, 38);
  text("104 BPM  ·  AUTO " + (autoMode ? "ON" : "OFF") + "  ·  HOLD " + (holdMode ? "ON" : "OFF"), 22, 56);
  text("1–8 STATE  SPACE HIT  A AUTO  H HOLD  R RESET  S SAVE  U HUD", 22, height - 31);

  float bx = width - 225;
  float by = 20;
  float bw = 90;
  drawMeter("ENERGY", bus.energy, bx, by, bw);
  drawMeter("PRESS", bus.pressure, bx, by + 18, bw);
  drawMeter("TENSION", bus.tension, bx, by + 36, bw);
  drawMeter("MEMORY", bus.memory, bx, by + 54, bw);

  popStyle();
  hint(ENABLE_DEPTH_TEST);
}

void drawMeter(String label, float v, float x, float y, float w) {
  fill(150, 164, 167, 190);
  textSize(9);
  text(label, x, y);
  noFill();
  stroke(105, 119, 122, 110);
  rect(x + 65, y + 2, w, 5);
  noStroke();
  fill(210, 224, 226, 180);
  rect(x + 65, y + 2, w * constrain(v, 0, 1), 5);
}

float smoothstep(float x) {
  x = constrain(x, 0, 1);
  return x * x * (3.0 - 2.0 * x);
}

// ------------------------------------------------------------
// Data classes
// ------------------------------------------------------------

class ControlBus {
  float energy;
  float pressure;
  float tension;
  float density;
  float space;
  float memory;
  float hit;
  float direction;
  float stereoBias;
  float sizzle;

  void clampAll() {
    energy = constrain(energy, 0, 1);
    pressure = constrain(pressure, 0, 1);
    tension = constrain(tension, 0, 1);
    density = constrain(density, 0, 1);
    space = constrain(space, 0, 1);
    memory = constrain(memory, 0, 1);
    hit = constrain(hit, 0, 1);
    direction = constrain(direction, -1, 1);
    stereoBias = constrain(stereoBias, -1, 1);
    sizzle = constrain(sizzle, 0, 1);
  }
}

class Agent {
  float x, y, px, py;
  float vx = 0;
  float vy = 0;
  float seed;

  Agent(float x_, float y_, float seed_) {
    x = px = x_;
    y = py = y_;
    seed = seed_;
  }

  void reset(float x_, float y_) {
    x = px = x_;
    y = py = y_;
    vx = vy = 0;
  }

  void wrap() {
    if (x < -4) { x = width + 4; px = x; }
    if (x > width + 4) { x = -4; px = x; }
    if (y < -4) { y = height + 4; py = y; }
    if (y > height + 4) { y = -4; py = y; }
  }
}

class Pulse {
  float x, y;
  long birth;
  float strength;
  float seed;
  float duration = 1750;

  Pulse(float x_, float y_, long birth_, float strength_, float seed_) {
    x = x_;
    y = y_;
    birth = birth_;
    strength = strength_;
    seed = seed_;
  }

  float age01(long now) {
    return constrain((now - birth) / duration, 0, 1);
  }

  boolean expired(long now) {
    return now - birth > duration;
  }
}

class Scar {
  float x, y, angle;
  long birth;
  float strength;
  float seed;
  float duration = 1100;

  Scar(float x_, float y_, float angle_, long birth_, float strength_, float seed_) {
    x = x_;
    y = y_;
    angle = angle_;
    birth = birth_;
    strength = strength_;
    seed = seed_;
  }

  float age01(long now) {
    return constrain((now - birth) / duration, 0, 1);
  }

  boolean expired(long now) {
    return now - birth > duration;
  }
}

class Residue {
  float x, y;
  float energy;
  float life = 1.0;

  Residue(float x_, float y_, float energy_) {
    x = x_;
    y = y_;
    energy = energy_;
  }
}
