// No Further Input Required / 无需进一步输入
// Unicode Pictographic Computation System — MASTER PRESET
// Processing 4 / Java Mode / P2D / deterministic 30-second loop

final int DESIGN_W = 1920;
final int DESIGN_H = 1080;
final int TARGET_FPS = 60;
final int LOOP_SECONDS = 30;
final int LOOP_FRAMES = TARGET_FPS * LOOP_SECONDS;
final int MAX_ROWS = 22;

int PAPER;
int NAVY;
int CYAN;
int CORAL;
int BEIGE;
int GRAPHITE;
int NEAR_BLACK;

PFont fontCode;
PFont fontPattern;
PFont fontMacro;

GlyphGrammar glyphGrammar;
SpringMotion springMotion;
MemoryScoreEngine memoryScore;
RowEngine rowEngine;
ConnectionEngine connectionEngine;

int loopOriginFrame = 0;
int previousLoopFrame = -1;
boolean paused = false;
boolean debug = false;

void settings() {
  boolean review = "1".equals(System.getenv("NFI_REVIEW"));
  if (review) size(1920, 1080, P2D);
  else size(3840, 2160, P2D);
  pixelDensity(1);
  smooth(4);
}

void setup() {
  surface.setTitle("No Further Input Required — Unicode Pictographic Computation System");
  frameRate(TARGET_FPS);
  noCursor();

  PAPER      = color(243, 240, 232);
  NAVY       = color(18, 42, 64);
  CYAN       = color(0, 153, 190);
  CORAL      = color(236, 78, 67);
  BEIGE      = color(177, 143, 105);
  GRAPHITE   = color(83, 88, 89);
  NEAR_BLACK = color(17, 18, 17);

  // Java logical fonts: no bundled/external font files required.
  fontCode = createFont("Monospaced", 18, true);
  fontPattern = createFont("SansSerif", 36, true);
  fontMacro = createFont("SansSerif", 220, true);

  springMotion = new SpringMotion(0.245, 0.72);
  glyphGrammar = new GlyphGrammar();
  memoryScore = new MemoryScoreEngine();
  rowEngine = new RowEngine(glyphGrammar, springMotion, memoryScore);
  connectionEngine = new ConnectionEngine(memoryScore);

  resetMaster();
}

void resetMaster() {
  memoryScore.reset();
  rowEngine.reset();
  connectionEngine.reset();
  previousLoopFrame = -1;
}

void draw() {
  int rawFrame = paused ? max(previousLoopFrame, 0) : frameCount - loopOriginFrame;
  int loopFrame = ((rawFrame % LOOP_FRAMES) + LOOP_FRAMES) % LOOP_FRAMES;

  if (!paused && loopFrame == 0 && previousLoopFrame > 0) {
    resetMaster();
  }

  memoryScore.update(loopFrame);
  rowEngine.update(memoryScore);

  background(PAPER);

  float sx = width / float(DESIGN_W);
  float sy = height / float(DESIGN_H);
  float s = min(sx, sy);
  float ox = (width - DESIGN_W * s) * 0.5;
  float oy = (height - DESIGN_H * s) * 0.5;

  pushMatrix();
  translate(ox, oy);
  scale(s);

  rowEngine.drawPatternField(g, memoryScore);
  connectionEngine.draw(g, memoryScore, rowEngine);
  rowEngine.drawRows(g, memoryScore);
  rowEngine.drawMacroField(g, memoryScore);

  if (debug) drawDebugOverlay();
  popMatrix();

  previousLoopFrame = loopFrame;
}

void drawDebugOverlay() {
  pushStyle();
  textFont(fontCode);
  textSize(14);
  textAlign(LEFT, TOP);
  fill(NEAR_BLACK, 180);
  noStroke();
  rect(24, 20, 410, 66);
  fill(PAPER);
  String s = "t " + nf(memoryScore.time, 2, 2) +
             "   rows " + nf(memoryScore.rowTarget, 2, 1) +
             "   complexity " + nf(memoryScore.complexity, 1, 2) +
             "   recall " + nf(memoryScore.recall, 1, 2);
  text(s, 34, 30);
  text("fps " + nf(frameRate, 2, 1) + "   frame " + previousLoopFrame + "/" + LOOP_FRAMES, 34, 54);
  popStyle();
}

void keyPressed() {
  if (key == ' ') {
    paused = !paused;
  } else if (key == 'r' || key == 'R') {
    loopOriginFrame = frameCount;
    resetMaster();
  } else if (key == 's' || key == 'S') {
    saveFrame("captures/NFI-Unicode-Master-####.png");
  } else if (key == 'd' || key == 'D') {
    debug = !debug;
    if (debug) cursor(); else noCursor();
  }
}

float clamp01(float x) {
  return constrain(x, 0, 1);
}

float smooth01(float x) {
  x = clamp01(x);
  return x * x * (3.0 - 2.0 * x);
}

float smoothRange(float a, float b, float x) {
  if (abs(b - a) < 0.0001) return x >= b ? 1 : 0;
  return smooth01((x - a) / (b - a));
}

float bandScore(float x, float a, float b, float edge) {
  return smoothRange(a, a + edge, x) * (1.0 - smoothRange(b - edge, b, x));
}

float hash01(float n) {
  return abs(sin(n * 12.9898 + 78.233) * 43758.5453) % 1.0;
}
