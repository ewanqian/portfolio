interface VisualState {
  void reset(int seed);
  void update(float dt, ArtworkContext ctx);
  void draw(PGraphics pg, ArtworkContext ctx);
  void setWeight(float weight);
  String id();
}

abstract class BaseVisualState implements VisualState {
  final AppConfig config;
  float weight = 1;

  BaseVisualState(AppConfig config) {
    this.config = config;
  }

  public void setWeight(float value) {
    weight = constrain(value, 0, 1);
  }

  int rgba(float alpha) {
    return color(red(config.ink), green(config.ink), blue(config.ink), config.alpha(alpha * weight));
  }
}
