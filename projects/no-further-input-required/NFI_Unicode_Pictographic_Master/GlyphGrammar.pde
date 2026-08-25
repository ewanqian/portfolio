// 02 Glyph Grammar
// C-like syntax skeleton + Unicode pictographic vocabulary.
// No readable identifiers, functions, variables, or English pseudo-code.

final int ROLE_STRUCTURE = 0;
final int ROLE_ACTIVE = 1;
final int ROLE_HUMAN = 2;
final int ROLE_MEMORY = 3;
final int ROLE_RESIDUE = 4;

class GlyphPiece {
  String text;
  int role;

  GlyphPiece(String text, int role) {
    this.text = text;
    this.role = role;
  }
}

class GlyphSentence {
  ArrayList<GlyphPiece> pieces = new ArrayList<GlyphPiece>();
  int signature = 17;

  GlyphSentence add(String text, int role) {
    pieces.add(new GlyphPiece(text, role));
    signature = 31 * signature + text.hashCode() * 7 + role;
    return this;
  }

  int size() {
    return pieces.size();
  }
}

class GlyphGrammar {
  final String[] primary = {
    "○", "□", "◇", "△", "◌", "▦", "╳", "◉"
  };

  final String[] dense = {
    "●", "■", "◆", "▲", "▣"
  };

  final String[] lineGlyphs = {
    "─", "│", "═", "┼", "·", "∷", "⋮", "⋯", "◜", "◝", "◞", "◟"
  };

  float birthTime(int row) {
    if (row == 0) return 0.0;
    if (row < 7) return 1.55 + (row - 1) * 0.66;
    return 5.85 + (row - 7) * 0.49;
  }

  String a(int row) {
    return primary[(row * 3 + 1) % primary.length];
  }

  String b(int row) {
    return primary[(row * 5 + 4) % primary.length];
  }

  String c(int row) {
    return primary[(row * 7 + 2) % primary.length];
  }

  String d(int row) {
    return dense[(row * 3 + 2) % dense.length];
  }

  GlyphSentence compose(int row, MemoryScoreEngine score) {
    float t = score.time;
    float born = birthTime(row);
    float age = t - born;

    // Canonical seed: the same single glyph that closes the loop.
    if (row == 0 && t < 1.0) {
      return new GlyphSentence().add("○", ROLE_STRUCTURE);
    }

    // Before a row exists it still has an archival seed, but RowEngine keeps it invisible.
    if (age < 0) {
      return new GlyphSentence().add("·", ROLE_RESIDUE);
    }

    String A = a(row);
    String B = b(row);
    String C = c(row);
    String D = d(row);

    // 00–06s INPUT: one coral intervention, followed by immediate symbolic expansion.
    if (t < 6.0) {
      int stage = constrain(floor(age / 0.72), 0, 5);
      boolean sourceRow = row == 0 && score.input > 0.02;
      int sourceRole = sourceRow ? ROLE_HUMAN : ROLE_ACTIVE;

      if (stage == 0) {
        return new GlyphSentence()
          .add("[", ROLE_STRUCTURE)
          .add(sourceRow ? "●" : A, sourceRole)
          .add("]", ROLE_STRUCTURE);
      }
      if (stage == 1) {
        return new GlyphSentence()
          .add("[", ROLE_STRUCTURE)
          .add(sourceRow ? "●" : A, sourceRole)
          .add(A, ROLE_ACTIVE)
          .add(A, ROLE_ACTIVE)
          .add("]", ROLE_STRUCTURE);
      }
      if (stage == 2) {
        return new GlyphSentence()
          .add("{ ", ROLE_STRUCTURE)
          .add("[", ROLE_STRUCTURE)
          .add(A, ROLE_ACTIVE)
          .add(sourceRow ? "●" : B, sourceRole)
          .add(A, ROLE_ACTIVE)
          .add("]", ROLE_STRUCTURE)
          .add(" : ", ROLE_STRUCTURE)
          .add(C, ROLE_ACTIVE)
          .add(" };", ROLE_STRUCTURE);
      }
      if (stage == 3) {
        return new GlyphSentence()
          .add("[", ROLE_STRUCTURE).add(A, ROLE_ACTIVE).add(" : ", ROLE_STRUCTURE).add(C, ROLE_ACTIVE).add("]", ROLE_STRUCTURE)
          .add(" = ", ROLE_STRUCTURE)
          .add("{ ", ROLE_STRUCTURE).add(B, ROLE_ACTIVE).add(" | ", ROLE_STRUCTURE).add(B, ROLE_ACTIVE).add(" | ", ROLE_STRUCTURE).add(A, ROLE_ACTIVE).add(" };", ROLE_STRUCTURE);
      }
      return new GlyphSentence()
        .add("{ ", ROLE_STRUCTURE).add(A, ROLE_ACTIVE).add(" : [", ROLE_STRUCTURE)
        .add(B, ROLE_ACTIVE).add(A, ROLE_ACTIVE).add(B, ROLE_ACTIVE)
        .add("] : ", ROLE_STRUCTURE).add(D, ROLE_ACTIVE).add(" };", ROLE_STRUCTURE);
    }

    // 06–14s PROCESS: fast write/substitute/expand/bind cycles.
    if (t < 14.0) {
      int mode = (score.mutationTick + row * 2) % 4;
      int current = ((score.mutationTick + row) % 3 == 0) ? ROLE_ACTIVE : ROLE_STRUCTURE;

      if (mode == 0) {
        return new GlyphSentence()
          .add("{ [", ROLE_STRUCTURE).add(A, current).add(A, ROLE_ACTIVE).add("] : [", ROLE_STRUCTURE)
          .add(B, ROLE_ACTIVE).add(" ", ROLE_STRUCTURE).add(C, ROLE_ACTIVE).add("] };", ROLE_STRUCTURE);
      }
      if (mode == 1) {
        return new GlyphSentence()
          .add("[", ROLE_STRUCTURE).add(A, ROLE_ACTIVE).add(" : ", ROLE_STRUCTURE).add(D, ROLE_ACTIVE).add("]", ROLE_STRUCTURE)
          .add(" = (", ROLE_STRUCTURE).add(C, ROLE_ACTIVE).add(" | ", ROLE_STRUCTURE).add(B, ROLE_ACTIVE).add(" | ", ROLE_STRUCTURE).add(C, ROLE_ACTIVE).add(");", ROLE_STRUCTURE);
      }
      if (mode == 2) {
        return new GlyphSentence()
          .add("{ ", ROLE_STRUCTURE).add(D, ROLE_ACTIVE).add(D, ROLE_ACTIVE).add(" } :: [", ROLE_STRUCTURE)
          .add(A, ROLE_ACTIVE).add(" , ", ROLE_STRUCTURE).add(B, ROLE_ACTIVE).add(" , ", ROLE_STRUCTURE).add(C, ROLE_ACTIVE).add("];", ROLE_STRUCTURE);
      }
      return new GlyphSentence()
        .add("[", ROLE_STRUCTURE).add("◌", ROLE_ACTIVE).add("] += { ", ROLE_STRUCTURE)
        .add(A, ROLE_ACTIVE).add(A, ROLE_ACTIVE).add(B, ROLE_ACTIVE).add(" };", ROLE_STRUCTURE);
    }

    // 14–23s MEMORY / RECALL: old glyphs return as beige memory while current computation stays cyan.
    if (t < 23.0) {
      int mode = (score.mutationTick + row * 3) % 5;
      boolean recalled = score.rowIsCurrentRecall(row);
      int oldRole = recalled ? ROLE_MEMORY : (score.memoryForRow(row) > 0.18 ? ROLE_MEMORY : ROLE_STRUCTURE);
      int activeRole = recalled ? ROLE_ACTIVE : ROLE_STRUCTURE;

      if (mode == 0) {
        return new GlyphSentence()
          .add("{ [", ROLE_STRUCTURE).add(A, oldRole).add("·", ROLE_RESIDUE).add(A, oldRole).add("] : { ", ROLE_STRUCTURE)
          .add(B, activeRole).add(" = (", ROLE_STRUCTURE).add(D, ROLE_ACTIVE).add(" | ", ROLE_STRUCTURE).add(C, oldRole).add("); } };", ROLE_STRUCTURE);
      }
      if (mode == 1) {
        return new GlyphSentence()
          .add("[", ROLE_STRUCTURE).add(C, oldRole).add(" : ", ROLE_STRUCTURE).add("╳", ROLE_ACTIVE).add("] = { ", ROLE_STRUCTURE)
          .add("◌", ROLE_MEMORY).add(" , ", ROLE_STRUCTURE).add(A, activeRole).add(" , ", ROLE_STRUCTURE).add(D, oldRole).add(" };", ROLE_STRUCTURE);
      }
      if (mode == 2) {
        return new GlyphSentence()
          .add("{ ", ROLE_STRUCTURE).add(A, oldRole).add("[", ROLE_STRUCTURE).add(B, ROLE_ACTIVE).add(B, ROLE_MEMORY).add("]", ROLE_STRUCTURE)
          .add(C, oldRole).add(" } : [", ROLE_STRUCTURE).add(D, activeRole).add("];", ROLE_STRUCTURE);
      }
      if (mode == 3) {
        return new GlyphSentence()
          .add("[", ROLE_STRUCTURE).add("◌", ROLE_MEMORY).add("] += { ", ROLE_STRUCTURE)
          .add(A, oldRole).add(A, ROLE_ACTIVE).add(D, oldRole).add(" } :: [", ROLE_STRUCTURE).add(C, ROLE_ACTIVE).add("];", ROLE_STRUCTURE);
      }
      return new GlyphSentence()
        .add("{ [", ROLE_STRUCTURE).add(D, oldRole).add(" : ", ROLE_STRUCTURE).add(A, ROLE_ACTIVE).add("] | [", ROLE_STRUCTURE)
        .add(B, ROLE_MEMORY).add(" : ", ROLE_STRUCTURE).add(C, oldRole).add("] };", ROLE_STRUCTURE);
    }

    // 23–30s NO FURTHER INPUT: no coral. Stored structures continue to rewrite themselves.
    if (t < 28.45) {
      int autoTick = floor((t - 23.0) / 1.10);
      int mode = (autoTick + row * 2 + score.mutationCount[row]) % 4;
      int oldRole = score.residueForRow(row) > 0.16 ? ROLE_RESIDUE : ROLE_MEMORY;
      int currentRole = score.rowIsCurrentRecall(row) ? ROLE_ACTIVE : ROLE_MEMORY;

      if (mode == 0) {
        return new GlyphSentence()
          .add("[", ROLE_STRUCTURE).add("◌", currentRole).add("] += { ", ROLE_STRUCTURE)
          .add(A, oldRole).add(" ", ROLE_STRUCTURE).add(B, ROLE_MEMORY).add(" ", ROLE_STRUCTURE).add(D, currentRole).add(" };", ROLE_STRUCTURE);
      }
      if (mode == 1) {
        return new GlyphSentence()
          .add("{ ", ROLE_STRUCTURE).add(A, ROLE_MEMORY).add(" : [", ROLE_STRUCTURE)
          .add(C, oldRole).add("·", ROLE_RESIDUE).add(C, currentRole).add("] : ", ROLE_STRUCTURE).add(B, ROLE_MEMORY).add(" };", ROLE_STRUCTURE);
      }
      if (mode == 2) {
        return new GlyphSentence()
          .add("[", ROLE_STRUCTURE).add(A, oldRole).add(" | ", ROLE_STRUCTURE).add(B, ROLE_MEMORY).add(" | ", ROLE_STRUCTURE).add(C, currentRole)
          .add("] :: { ", ROLE_STRUCTURE).add(D, ROLE_MEMORY).add(" };", ROLE_STRUCTURE);
      }
      return new GlyphSentence()
        .add("{ ", ROLE_STRUCTURE).add("·", ROLE_RESIDUE).add(" ", ROLE_STRUCTURE).add(A, ROLE_MEMORY).add(" ", ROLE_STRUCTURE)
        .add("·", ROLE_RESIDUE).add(" } : [", ROLE_STRUCTURE).add("◌", currentRole).add("];", ROLE_STRUCTURE);
    }

    // DECAY / RECURRENCE. All rows collapse toward the same seed grammar.
    if (row == 0) {
      if (t < 29.25) {
        return new GlyphSentence().add("·   ", ROLE_RESIDUE).add("○", ROLE_MEMORY).add("   ·", ROLE_RESIDUE);
      }
      return new GlyphSentence().add("○", ROLE_STRUCTURE);
    }

    return new GlyphSentence().add("·", ROLE_RESIDUE).add(" ", ROLE_STRUCTURE).add(A, ROLE_MEMORY).add(" ", ROLE_STRUCTURE).add("·", ROLE_RESIDUE);
  }

  // Ordered pattern vocabulary. The rules are explicit; no random Unicode soup.
  String patternGlyph(int pattern, int x, int y, int tick) {
    if (pattern == 0) {
      if ((x + y) % 4 == 0) return "●";
      if ((x + y) % 2 == 0) return "○";
      return "·";
    }
    if (pattern == 1) {
      boolean edge = x == 0 || y == 0 || x == 5 || y == 5;
      if (edge) return "▦";
      if (x == y || x + y == 5) return "◇";
      return ((x + y + tick) % 3 == 0) ? "●" : "○";
    }
    if (pattern == 2) {
      if (x == 2 || y == 2) return "┼";
      if ((x + y) % 2 == 0) return "△";
      return "◇";
    }
    return primary[(x + y * 3 + tick) % primary.length];
  }

  String macroGlyph(MemoryScoreEngine score) {
    int k = floor(score.time / 1.6) % 4;
    if (k == 0) return "○";
    if (k == 1) return "◇";
    if (k == 2) return "▦";
    return "╳";
  }
}
