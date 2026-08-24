class CaptureHarness {
  final AppConfig config;
  final float[] times = {4.0, 5.5, 3.0, 6.0, 7.5, 4.5};

  CaptureHarness(AppConfig config) {
    this.config = config;
  }

  float captureTime(int index) {
    return times[constrain(index, 0, times.length - 1)];
  }

  void saveFront(PGraphics pg, int index) {
    String filename = nf(index + 1, 2) + "-front.png";
    pg.save(sketchPath("captures/A001/" + filename));
    println("CAPTURED " + filename);
  }
}
