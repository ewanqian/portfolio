class CameraRig {
  void applyFront(PGraphics pg) {
    pg.ortho(-pg.width / 2.0, pg.width / 2.0, -pg.height / 2.0, pg.height / 2.0, -5000, 5000);
    pg.camera(
      pg.width / 2.0, pg.height / 2.0, 1200,
      pg.width / 2.0, pg.height / 2.0, 0,
      0, 1, 0
    );
    pg.hint(ENABLE_DEPTH_TEST);
    pg.noFill();
  }
}
