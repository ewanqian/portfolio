class AppConfig {
  final int background = color(7, 7, 4);
  final int ink = color(232, 234, 223);
  final int seed = 160826;
  final float stateSeconds = 12.0;
  final int stateCount = 6;

  float alpha(float value) {
    return constrain(value, 0, 255);
  }
}
