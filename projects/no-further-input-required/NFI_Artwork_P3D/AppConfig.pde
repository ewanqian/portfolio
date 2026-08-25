class AppConfig {
  final int background = color(7, 7, 4);
  final int ink = color(232, 234, 223);
  final int seed = 160826;

  // Exhibition master target.
  final int outputW = 3840;
  final int outputH = 2160;
  final int targetFps = 60;
  final float loopSeconds = 30.0;
  final int loopFrames = targetFps * 30;

  // Shared hierarchical grid. Constraint lives on the major grid,
  // Index Field on its subdivisions, Quantized Memory on the micro-grid.
  final int majorCols = 12;
  final int majorRows = 7;
  final int memorySubX = 6;
  final int memorySubY = 6;
  final float marginX = 0.055;
  final float marginY = 0.075;

  // Three local refinement rounds are built into the same sketch.
  // 1 = order baseline, 2 = mechanical glyph layer, 3 = exhibition candidate.
  int round = 3;

  // Legacy fields are kept so the recovered 08/16 source-state files still compile.
  final float stateSeconds = 12.0;
  final int stateCount = 6;

  float alpha(float value) {
    return constrain(value, 0, 255);
  }
}
