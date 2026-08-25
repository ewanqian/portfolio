// 05 Memory / Score Engine
// 30-second deterministic score + persistent row memory/residue.

class MemoryScoreEngine {
  float time;
  float phase;
  float input;
  float process;
  float memoryPhase;
  float recall;
  float autonomy;
  float recurrence;
  float complexity;
  float patternDensity;
  float connectionDensity;
  float rowTarget;
  int beatStep;
  int mutationTick;

  float[] rowMemory = new float[MAX_ROWS];
  float[] rowResidue = new float[MAX_ROWS];
  int[] lastSignature = new int[MAX_ROWS];
  int[] mutationCount = new int[MAX_ROWS];

  void reset() {
    time = 0;
    phase = 0;
    beatStep = 0;
    mutationTick = 0;
    for (int i = 0; i < MAX_ROWS; i++) {
      rowMemory[i] = 0;
      rowResidue[i] = 0;
      lastSignature[i] = Integer.MIN_VALUE;
      mutationCount[i] = 0;
    }
  }

  void update(int loopFrame) {
    time = loopFrame / float(TARGET_FPS);
    phase = time / LOOP_SECONDS;

    // A single small human intervention. Coral exists only here.
    input = smoothRange(1.00, 1.10, time) * (1.0 - smoothRange(2.20, 4.80, time));

    process = bandScore(time, 3.8, 15.6, 2.0);
    memoryPhase = bandScore(time, 10.8, 26.6, 2.6);
    recall = bandScore(time, 13.4, 25.4, 2.3);
    autonomy = smoothRange(22.6, 24.0, time) * (1.0 - smoothRange(29.0, 30.0, time));
    recurrence = smoothRange(24.0, 25.4, time) * (1.0 - smoothRange(29.1, 30.0, time));

    if (time < 1.0) {
      rowTarget = 1.0;
    } else if (time < 6.0) {
      rowTarget = lerp(1.0, 7.0, smoothRange(1.0, 6.0, time));
    } else if (time < 14.0) {
      rowTarget = lerp(7.0, 20.0, smoothRange(6.0, 14.0, time));
    } else if (time < 23.0) {
      rowTarget = lerp(20.0, 22.0, smoothRange(14.0, 18.0, time));
    } else if (time < 26.0) {
      rowTarget = lerp(22.0, 16.0, smoothRange(23.0, 26.0, time));
    } else if (time < 28.5) {
      rowTarget = lerp(16.0, 6.0, smoothRange(26.0, 28.5, time));
    } else {
      rowTarget = lerp(6.0, 1.0, smoothRange(28.5, 30.0, time));
    }

    complexity = 0.06
      + 0.28 * smoothRange(1.0, 6.0, time)
      + 0.46 * smoothRange(5.2, 14.0, time)
      + 0.22 * recall;
    complexity *= 1.0 - 0.88 * smoothRange(26.6, 30.0, time);
    complexity = max(complexity, 0.045);

    patternDensity = 0.05 + 0.58 * process + 0.28 * recall;
    patternDensity *= 1.0 - 0.82 * smoothRange(27.0, 30.0, time);
    patternDensity = max(patternDensity, 0.035);

    connectionDensity = 0.06 * process + 0.94 * recall;
    connectionDensity *= 1.0 - 0.72 * smoothRange(26.0, 30.0, time);

    // 120 BPM, 16th-note index. Used only to schedule deterministic substitutions.
    beatStep = floor(time * 8.0);
    mutationTick = floor(time * (time < 14.0 ? 2.4 : 1.35));

    // Stored history decays slowly. Residue decays faster, then is refreshed by mutations.
    for (int i = 0; i < MAX_ROWS; i++) {
      rowMemory[i] *= 0.9992;
      rowResidue[i] *= 0.9825;

      // NO FURTHER INPUT: old memory periodically reactivates itself.
      if (autonomy > 0.01) {
        int autonomousIndex = (floor((time - 23.0) / 1.15) * 5 + 3) % MAX_ROWS;
        if (i == autonomousIndex) {
          rowResidue[i] = max(rowResidue[i], 0.32 * autonomy);
          rowMemory[i] = max(rowMemory[i], 0.24 * autonomy);
        }
      }

      // Force the last second back toward the canonical seed state for a clean recurrence.
      float finalFade = smoothRange(28.85, 30.0, time);
      rowMemory[i] *= 1.0 - 0.82 * finalFade;
      rowResidue[i] *= 1.0 - 0.94 * finalFade;
    }
  }

  void recordMutation(int row, int signature) {
    if (row < 0 || row >= MAX_ROWS) return;
    if (lastSignature[row] == signature) return;

    if (lastSignature[row] != Integer.MIN_VALUE) {
      mutationCount[row]++;
      rowMemory[row] = min(1.0, rowMemory[row] + 0.13);
      rowResidue[row] = 1.0;
    }
    lastSignature[row] = signature;
  }

  float memoryForRow(int row) {
    if (row < 0 || row >= MAX_ROWS) return 0;
    return rowMemory[row];
  }

  float residueForRow(int row) {
    if (row < 0 || row >= MAX_ROWS) return 0;
    return rowResidue[row];
  }

  boolean rowIsCurrentRecall(int row) {
    if (recall <= 0.01) return false;
    int a = (floor((time - 13.0) / 0.78) * 7 + 2) % MAX_ROWS;
    int b = (a + 5) % MAX_ROWS;
    return row == a || row == b;
  }
}
