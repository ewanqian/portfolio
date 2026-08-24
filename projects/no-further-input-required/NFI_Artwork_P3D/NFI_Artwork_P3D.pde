AppConfig config;
ArtworkContext artworkContext;
ArtworkComposer composer;
CameraRig cameraRig;
CaptureHarness captureHarness;

boolean paused = false;
boolean captureOnly = false;
int previousMillis = 0;

void settings() {
  size(1840, 980, P3D);
  smooth(8);
}

void setup() {
  surface.setTitle("No Further Input Required — 08/16 Front Fidelity");
  frameRate(60);

  config = new AppConfig();
  artworkContext = new ArtworkContext(config.seed);
  cameraRig = new CameraRig();
  composer = new ArtworkComposer(config);
  captureHarness = new CaptureHarness(config);
  captureOnly = "A001_FRONT".equals(System.getenv("NFI_CAPTURE_MODE"));
  previousMillis = millis();
}

void draw() {
  int now = millis();
  float dt = min(0.05, max(0, (now - previousMillis) / 1000.0));
  previousMillis = now;

  artworkContext.dt = paused ? 0 : dt;
  if (!paused) artworkContext.time += dt;
  artworkContext.width = width;
  artworkContext.height = height;

  if (captureOnly) {
    int captureIndex = constrain(frameCount - 1, 0, 5);
    composer.select(captureIndex, false);
    artworkContext.time = captureHarness.captureTime(captureIndex);
  } else {
    composer.updateSelection(artworkContext);
  }

  background(config.background);
  cameraRig.applyFront(g);
  composer.update(artworkContext);
  composer.draw(g, artworkContext);

  if (captureOnly) {
    captureHarness.saveFront(g, composer.activeIndex());
    if (frameCount >= 6) exit();
  }
}

void keyPressed() {
  if (key >= '1' && key <= '6') {
    composer.select(key - '1', true);
  } else if (key == 'a' || key == 'A') {
    composer.resumeAuto(artworkContext.time);
  } else if (key == ' ') {
    paused = !paused;
  } else if (key == 'r' || key == 'R') {
    artworkContext.time = 0;
    composer.resetAll(config.seed);
    composer.resumeAuto(0);
  } else if (key == 's' || key == 'S') {
    captureHarness.saveFront(g, composer.activeIndex());
  }
}
