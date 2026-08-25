class ArtworkContext {
  float time = 0;
  float dt = 0;
  int width = 1840;
  int height = 980;
  final int seed;

  int loopFrame = 0;
  float loopT = 0;
  float inputActivity = 0;
  float absorption = 0;
  float recall = 0;
  float autonomy = 0;
  float density = 0;
  float pressure = 0;
  float historyDepth = 0;

  ArtworkContext(int seed) {
    this.seed = seed;
  }

  void setLoopFrame(int frame, AppConfig config) {
    loopFrame = ((frame % config.loopFrames) + config.loopFrames) % config.loopFrames;
    loopT = loopFrame / (float) config.loopFrames;
    time = loopFrame / (float) config.targetFps;
    updateDramaturgy();
  }

  void updateDramaturgy() {
    // Four perceptual phases inside one periodic 30-second gesture.
    // Envelopes overlap; there are no scene switches.
    inputActivity = cyclicWindow(loopT, 0.00, 0.27, 0.06);
    absorption    = cyclicWindow(loopT, 0.16, 0.58, 0.10);
    recall        = cyclicWindow(loopT, 0.46, 0.82, 0.09);
    autonomy      = cyclicWindow(loopT, 0.69, 0.98, 0.08);

    density = constrain(0.12 + absorption * 0.52 + recall * 0.24 + autonomy * 0.08, 0, 1);
    pressure = constrain(inputActivity * 0.22 + absorption * 0.42 + recall * 0.62, 0, 1);
    historyDepth = constrain(absorption * 0.55 + recall * 0.95 + autonomy * 0.78, 0, 1);
  }

  float cyclicWindow(float p, float start, float end, float feather) {
    float in = smooth01((p - start) / feather);
    float out = 1.0 - smooth01((p - (end - feather)) / feather);
    if (end >= start) return constrain(in * out, 0, 1);
    return max(cyclicWindow(p, start, 1.0, feather), cyclicWindow(p, 0.0, end, feather));
  }

  float smooth01(float v) {
    v = constrain(v, 0, 1);
    return v * v * (3.0 - 2.0 * v);
  }
}
