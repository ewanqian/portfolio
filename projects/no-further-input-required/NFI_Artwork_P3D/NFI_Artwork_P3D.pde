AppConfig config;
ArtworkContext artworkContext;
Exhibition30Composer exhibition;

boolean paused = false;
boolean debug = false;
int loopOriginFrame = 0;

void settings() {
  boolean review = "1".equals(System.getenv("NFI_REVIEW"));
  if (review) size(1920, 1080, P3D);
  else size(3840, 2160, P3D);
  pixelDensity(1);
  smooth(4);
}

void setup() {
  surface.setTitle("No Further Input Required — 30s Processing Exhibition Loop");
  frameRate(60);
  noCursor();
  hint(DISABLE_DEPTH_TEST);

  config = new AppConfig();
  artworkContext = new ArtworkContext(config.seed);
  exhibition = new Exhibition30Composer(config);
  exhibition.setup();
  loopOriginFrame = frameCount;
}

void draw() {
  // Frame-indexed time makes the master deterministic and exactly loopable at 60 fps.
  // A 3-minute screen capture contains six identical 30-second temporal cycles.
  int localFrame = paused ? artworkContext.loopFrame : frameCount - loopOriginFrame;
  artworkContext.dt = paused ? 0 : 1.0 / config.targetFps;
  artworkContext.width = width;
  artworkContext.height = height;
  artworkContext.setLoopFrame(localFrame, config);

  background(config.background);
  hint(DISABLE_DEPTH_TEST);
  blendMode(BLEND);
  exhibition.draw(g, artworkContext);

  if (debug) drawDebug();
}

void drawDebug() {
  hint(DISABLE_DEPTH_TEST);
  cursor();
  pushStyle();
  textAlign(LEFT, TOP);
  textFont(createFont("Consolas", 16, true));
  textSize(16);
  fill(232, 234, 223, 190);
  String s = "R" + config.round +
             "  LOOP " + nf(artworkContext.time, 2, 2) + " / 30.00" +
             "  FRAME " + artworkContext.loopFrame + " / " + config.loopFrames +
             "  FPS " + nf(frameRate, 2, 1) +
             "  " + width + "x" + height;
  text(s, 24, 22);
  popStyle();
}

void keyPressed() {
  if (key >= '1' && key <= '3') {
    config.round = key - '0';
  } else if (key == ' ') {
    paused = !paused;
  } else if (key == 'r' || key == 'R') {
    loopOriginFrame = frameCount;
    artworkContext.setLoopFrame(0, config);
  } else if (key == 'd' || key == 'D') {
    debug = !debug;
    if (!debug) noCursor();
  } else if (key == 's' || key == 'S') {
    saveFrame("captures/NFI-R" + config.round + "-####.png");
  }
}
