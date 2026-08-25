class ArtworkComposer {
  final AppConfig config;
  final ReferenceRegistry references = new ReferenceRegistry();
  final VisualState[] states;
  int active = 0;
  boolean auto = true;
  float autoEpoch = 0;

  ArtworkComposer(AppConfig config) {
    this.config = config;
    states = new VisualState[] {
      new State01HighDimProjection(config),
      new State02SignalLayer(config),
      new State03ConstraintMechanism(config),
      new State04IndexField(config),
      new State05QuantizedMemory(config),
      new State06RecursiveAssembly(config)
    };
    resetAll(config.seed);
    select(0, false);
  }

  void resetAll(int seed) {
    for (int i = 0; i < states.length; i++) states[i].reset(seed + i * 101);
  }

  void updateSelection(ArtworkContext ctx) {
    if (!auto) return;
    int next = floor((ctx.time - autoEpoch) / config.stateSeconds) % states.length;
    if (next < 0) next += states.length;
    if (next != active) select(next, false);
  }

  void select(int index, boolean manual) {
    active = constrain(index, 0, states.length - 1);
    if (manual) auto = false;
    for (int i = 0; i < states.length; i++) states[i].setWeight(i == active ? 1 : 0);
  }

  void resumeAuto(float time) {
    auto = true;
    autoEpoch = time - active * config.stateSeconds;
  }

  void update(ArtworkContext ctx) {
    states[active].update(ctx.dt, ctx);
  }

  void draw(PGraphics pg, ArtworkContext ctx) {
    states[active].draw(pg, ctx);
  }

  int activeIndex() {
    return active;
  }
}
