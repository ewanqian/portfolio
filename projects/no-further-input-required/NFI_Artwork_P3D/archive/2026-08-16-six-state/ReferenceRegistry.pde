class ReferenceEntry {
  final String id;
  final String filename;
  final int pixelWidth;
  final int pixelHeight;
  String reviewStatus = "A001_REVIEW";

  ReferenceEntry(String id, String filename, int pixelWidth, int pixelHeight) {
    this.id = id;
    this.filename = filename;
    this.pixelWidth = pixelWidth;
    this.pixelHeight = pixelHeight;
  }
}

class ReferenceRegistry {
  final ReferenceEntry[] entries = {
    new ReferenceEntry("01", "01-高维投影.png", 1840, 980),
    new ReferenceEntry("02", "02-信号层.png", 1840, 980),
    new ReferenceEntry("03", "03-约束机构.png", 1840, 980),
    new ReferenceEntry("04", "04-索引场.png", 1840, 980),
    new ReferenceEntry("05", "05-量化记忆.png", 1840, 980),
    new ReferenceEntry("06", "06-递归装配.png", 1840, 980)
  };
}
