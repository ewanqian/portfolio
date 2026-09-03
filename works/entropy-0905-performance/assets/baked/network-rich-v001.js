// ENTROPY 0905 — canonical production asset v001
// Immutable production identity. Do not edit this version; create v002+ instead.
// This module reconstructs one deterministic 30k-node bake from fixed parameters,
// so future show files can import the same structure without depending on a sibling binary file.

export const NETWORK_RICH_V001_SPEC = Object.freeze({
  id: 'network-rich-v001',
  kind: 'baked-point-network',
  version: 1,
  seed: 6230905,
  nodeCount: 30000,
  clusterCount: 17,
  crossLinkStride: 97,
  branchStride: 29,
  scale: [1.0, 0.48, 0.72],
  sourceState: 'ENTROPY 5.3 / NETWORK CORE',
  cameraPreset: 'network_core'
});

let CACHE = null;

function rngFactory(seed) {
  let s = seed >>> 0;
  return () => {
    s ^= s << 13; s ^= s >>> 17; s ^= s << 5;
    return (s >>> 0) / 4294967296;
  };
}

export function getNetworkRichV001() {
  if (CACHE) return CACHE;

  const spec = NETWORK_RICH_V001_SPEC;
  const rand = rngFactory(spec.seed);
  const n = spec.nodeCount;
  const positions = new Float32Array(n * 3);
  const classes = new Uint8Array(n);
  const parent = new Uint32Array(n);
  const phase = new Float32Array(n);

  // Seventeen stable filament families. The large structure remains still;
  // live motion should happen through camera, packets, scan and activation.
  for (let i = 0; i < n; i++) {
    const cluster = i % spec.clusterCount;
    const generation = Math.floor(i / spec.clusterCount);
    const t = generation / Math.ceil(n / spec.clusterCount);
    const base = cluster / spec.clusterCount * Math.PI * 2;
    const spiral = base + t * (5.2 + cluster * 0.035);
    const trunk = 0.08 + Math.pow(t, 0.72) * 0.94;
    const branchWave = Math.sin(t * 31 + cluster * 1.7) * (0.03 + t * 0.09);
    const jitter = (rand() - 0.5) * (0.012 + t * 0.028);

    let x = Math.cos(spiral) * (trunk + branchWave) + jitter;
    let y = Math.sin(spiral * 0.61 + cluster) * (0.16 + t * 0.44) + (rand() - 0.5) * 0.018;
    let z = Math.sin(spiral) * (trunk * 0.72) + Math.cos(t * 19 + cluster) * 0.09 + jitter;

    // Add secondary nerve-like bending without destroying the macro silhouette.
    x += Math.sin(t * 8.0 + cluster * 0.8) * 0.11 * t;
    z += Math.cos(t * 7.0 + cluster * 0.6) * 0.10 * t;

    positions[i * 3] = x * spec.scale[0];
    positions[i * 3 + 1] = y * spec.scale[1];
    positions[i * 3 + 2] = z * spec.scale[2];
    classes[i] = cluster;
    phase[i] = (rand() + t * 0.37) % 1;
    parent[i] = i < spec.clusterCount ? i : Math.max(cluster, i - spec.clusterCount - ((generation % 11 === 0) ? spec.branchStride : 0));
  }

  const edges = [];
  for (let i = spec.clusterCount; i < n; i++) {
    edges.push(parent[i], i);
    if (i % spec.crossLinkStride === 0) {
      const j = (i * 13 + 541) % i;
      if (classes[j] !== classes[i]) edges.push(j, i);
    }
    if (i % 233 === 0) {
      const j = (i * 31 + 71) % i;
      edges.push(j, i);
    }
  }

  CACHE = Object.freeze({
    spec,
    positions,
    classes,
    phase,
    edges: new Uint32Array(edges)
  });
  return CACHE;
}
