// 03 Spring Motion
// One motion personality for all active visual elements:
// FAST ATTACK -> SMALL OVERSHOOT -> HEAVY SETTLE -> LONG RESIDUE.

class SpringMotion {
  final float stiffness;
  final float damping;

  SpringMotion(float stiffness, float damping) {
    this.stiffness = stiffness;
    this.damping = damping;
  }

  SpringValue make(float initial) {
    return new SpringValue(initial, stiffness, damping);
  }
}

class SpringValue {
  float value;
  float target;
  float velocity;
  final float stiffness;
  final float damping;

  SpringValue(float initial, float stiffness, float damping) {
    value = initial;
    target = initial;
    velocity = 0;
    this.stiffness = stiffness;
    this.damping = damping;
  }

  void set(float nextTarget) {
    target = nextTarget;
  }

  void snap(float v) {
    value = v;
    target = v;
    velocity = 0;
  }

  void kick(float impulse) {
    velocity += impulse;
  }

  void step() {
    velocity += (target - value) * stiffness;
    velocity *= damping;
    value += velocity;
  }
}
