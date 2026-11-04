// src/artwork/nfir-lattice.ts
import {
  BoxGeometry,
  Color,
  DynamicDrawUsage,
  InstancedMesh,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  OctahedronGeometry,
  PerspectiveCamera,
  SRGBColorSpace,
  Scene,
  Timer,
  Vector3,
  WebGLRenderer
} from "three";
var CYCLE = 90;
var N = 4;
var CELLS = 64;
var SPACING = 1;
var EXTENT = (N - 1) / 2 * SPACING;
var BASE_SEED = 1313229138;
var GEN_START = 44;
var GEN_END = 84;
var GEN_DT = 1.15;
var CONTRACT_T = 84;
var INK = { r: 0.91, g: 0.902, b: 0.875 };
function clamp(v, a, b) {
  return Math.min(b, Math.max(a, v));
}
function saturate(v) {
  return clamp(v, 0, 1);
}
function smoothstep(e0, e1, x) {
  const t = saturate((x - e0) / Math.max(1e-6, e1 - e0));
  return t * t * (3 - 2 * t);
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function idx(x, y, z) {
  return x + y * N + z * N * N;
}
function decode(i) {
  return { x: i & 3, y: i >> 2 & 3, z: i >> 4 };
}
function isCorner(i) {
  const { x, y, z } = decode(i);
  return (x === 0 || x === 3) && (y === 0 || y === 3) && (z === 0 || z === 3);
}
function parentOf(i) {
  const { x, y, z } = decode(i);
  return idx(x < 2 ? 0 : 3, y < 2 ? 0 : 3, z < 2 ? 0 : 3);
}
function manh(a, b) {
  const A = decode(a);
  const B = decode(b);
  return Math.abs(A.x - B.x) + Math.abs(A.y - B.y) + Math.abs(A.z - B.z);
}
function mulberry32(seed) {
  let a = seed | 0;
  return () => {
    a = a + 1831565813 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function neighbors(i, state) {
  const { x, y, z } = decode(i);
  let n = 0;
  if (x > 0) n += state[i - 1];
  if (x < 3) n += state[i + 1];
  if (y > 0) n += state[i - 4];
  if (y < 3) n += state[i + 4];
  if (z > 0) n += state[i - 16];
  if (z < 3) n += state[i + 16];
  return n;
}
function measure(state, prev) {
  let alive = 0;
  let changed = 0;
  let mx = 0;
  let my = 0;
  let mz = 0;
  for (let i = 0; i < CELLS; i++) {
    alive += state[i];
    if (state[i] !== prev[i]) changed++;
    const { x, y, z } = decode(i);
    if (state[i] === state[idx(3 - x, y, z)]) mx++;
    if (state[i] === state[idx(x, 3 - y, z)]) my++;
    if (state[i] === state[idx(x, y, 3 - z)]) mz++;
  }
  const octCounts = /* @__PURE__ */ new Map();
  for (let oz = 0; oz < 2; oz++) {
    for (let oy = 0; oy < 2; oy++) {
      for (let ox = 0; ox < 2; ox++) {
        let bits = 0;
        let b = 0;
        for (let dz = 0; dz < 2; dz++) {
          for (let dy = 0; dy < 2; dy++) {
            for (let dx = 0; dx < 2; dx++) {
              bits |= state[idx(ox * 2 + dx, oy * 2 + dy, oz * 2 + dz)] << b++;
            }
          }
        }
        octCounts.set(bits, (octCounts.get(bits) ?? 0) + 1);
      }
    }
  }
  let H = 0;
  for (const c of octCounts.values()) {
    const p = c / 8;
    H -= p * Math.log2(p);
  }
  const density = alive / CELLS;
  const symmetry = (mx + my + mz) / (CELLS * 3);
  const stability = 1 - changed / CELLS;
  const entropy = H / 3;
  let weakest = 0;
  if (my <= mx && my <= mz) weakest = 1;
  else if (mz <= mx && mz <= my) weakest = 2;
  const fingerprint = alive & 255 | (Math.floor(density * 255) & 255) << 8 | (Math.floor(symmetry * 255) & 255) << 16 | (Math.floor(entropy * 255) & 255) << 24;
  return { density, symmetry, stability, entropy, weakest, fingerprint };
}
function selectRule(m) {
  if (m.density < 0.17) return "GROW";
  if (m.density > 0.64) return "PRUNE";
  if (m.symmetry < 0.44) return "MIRROR";
  if (m.entropy > 0.78) return "CRYSTAL";
  if (m.stability > 0.88) return "ALIGN";
  return "CONSERVE";
}
function survive(rule, n, now) {
  switch (rule) {
    case "GROW":
      return n >= 1 || now === 1 ? 1 : 0;
    case "PRUNE":
      return n === 2 || n === 3 ? 1 : 0;
    case "CRYSTAL":
      return n === 2 || n === 3 ? 1 : 0;
    case "ALIGN":
      return now;
    case "MIRROR":
    case "CONSERVE":
      return n >= 2 && n <= 4 ? 1 : 0;
    default:
      return now;
  }
}
function birth(rule, n) {
  switch (rule) {
    case "GROW":
      return n === 1 || n === 2 ? 1 : 0;
    case "PRUNE":
      return n === 3 ? 1 : 0;
    case "CRYSTAL":
      return n === 2 ? 1 : 0;
    case "MIRROR":
    case "CONSERVE":
      return n === 3 ? 1 : 0;
    case "ALIGN":
      return 0;
    default:
      return 0;
  }
}
function stepCA(state, prev, next, rule, forceCorners) {
  prev.set(state);
  for (let i = 0; i < CELLS; i++) {
    const n = neighbors(i, state);
    next[i] = state[i] ? survive(rule, n, state[i]) : birth(rule, n);
  }
  if (rule === "ALIGN") {
    for (let i = 0; i < CELLS; i++) {
      const { x, y, z } = decode(i);
      const ox = x < 2 ? 0 : 2;
      const oy = y < 2 ? 0 : 2;
      const oz = z < 2 ? 0 : 2;
      let s = 0;
      for (let dz = 0; dz < 2; dz++) {
        for (let dy = 0; dy < 2; dy++) {
          for (let dx = 0; dx < 2; dx++) {
            s += state[idx(ox + dx, oy + dy, oz + dz)];
          }
        }
      }
      next[i] = s >= 5 ? 1 : 0;
    }
  }
  if (rule === "MIRROR") {
    const m = measure(state, prev);
    for (let i = 0; i < CELLS; i++) {
      const { x, y, z } = decode(i);
      let j = i;
      if (m.weakest === 0) j = idx(Math.min(x, 3 - x), y, z);
      else if (m.weakest === 1) j = idx(x, Math.min(y, 3 - y), z);
      else j = idx(x, y, Math.min(z, 3 - z));
      const src = next[j] | next[i];
      next[i] = src;
      next[j] = src;
    }
  }
  if (forceCorners) {
    for (let i = 0; i < CELLS; i++) if (isCorner(i)) next[i] = 1;
  }
  state.set(next);
}
function buildEdges() {
  const edges = [];
  for (let z = 0; z < N; z++) {
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        const a = idx(x, y, z);
        if (x < 3) {
          const b = idx(x + 1, y, z);
          edges.push({
            a,
            b,
            axis: 0,
            cube: (y === 0 || y === 3) && (z === 0 || z === 3),
            dist: Math.min(manh(a, parentOf(a)), manh(b, parentOf(b)))
          });
        }
        if (y < 3) {
          const b = idx(x, y + 1, z);
          edges.push({
            a,
            b,
            axis: 1,
            cube: (x === 0 || x === 3) && (z === 0 || z === 3),
            dist: Math.min(manh(a, parentOf(a)), manh(b, parentOf(b)))
          });
        }
        if (z < 3) {
          const b = idx(x, y, z + 1);
          edges.push({
            a,
            b,
            axis: 2,
            cube: (x === 0 || x === 3) && (y === 0 || y === 3),
            dist: Math.min(manh(a, parentOf(a)), manh(b, parentOf(b)))
          });
        }
      }
    }
  }
  return edges;
}
var EDGES = buildEdges();
var INTERIORS = [];
for (let i = 0; i < CELLS; i++) if (!isCorner(i)) INTERIORS.push(i);
function cornerBits(i) {
  const { x, y, z } = decode(i);
  return { bx: x === 3 ? 1 : 0, by: y === 3 ? 1 : 0, bz: z === 3 ? 1 : 0 };
}
function cornerReveal(bx, by, bz, t) {
  if (t < 10) return 0;
  if (t < 16) return bx === 0 && bz === 0 ? smoothstep(10, 11.4, t) : 0;
  if (t < 22) {
    if (bz !== 0) return 0;
    return bx === 0 ? 1 : smoothstep(16, 17.4, t);
  }
  return bz === 0 ? 1 : smoothstep(22, 23.4, t);
}
function cellPos(i, t, out) {
  const { x, y, z } = decode(i);
  if (isCorner(i) && t < 28) {
    const { bx, by, bz } = cornerBits(i);
    const yT = smoothstep(10, 16, t);
    const xT = smoothstep(16, 22, t);
    const zT = smoothstep(22, 28, t);
    out.set((bx * 2 - 1) * EXTENT * xT, (by * 2 - 1) * EXTENT * yT, (bz * 2 - 1) * EXTENT * zT);
    return out;
  }
  out.set(x * SPACING - EXTENT, y * SPACING - EXTENT, z * SPACING - EXTENT);
  return out;
}
function seedState(live, prev, ever, cycle, memory) {
  live.fill(0);
  prev.fill(0);
  ever.fill(0);
  for (let i = 0; i < CELLS; i++) {
    if (isCorner(i)) {
      live[i] = 1;
      ever[i] = 1;
    }
  }
  if (cycle > 0 && memory) {
    const rng = mulberry32(BASE_SEED ^ Math.imul(cycle, 2654435769) ^ memory.fingerprint);
    const extra = 2 + Math.floor(rng() * 5);
    for (let k = 0; k < extra; k++) {
      const i = Math.floor(rng() * CELLS);
      live[i] = 1;
      ever[i] = 1;
    }
  }
}
function mountNfirLattice(container) {
  let disposed = false;
  const offset = Number(new URLSearchParams(location.search).get("t")) || 0;
  const scene = new Scene();
  scene.background = new Color(0);
  const camera = new PerspectiveCamera(30, 16 / 9, 0.1, 48);
  camera.position.set(0, 1.8, 5.6);
  camera.lookAt(0, 0, 0);
  scene.add(camera);
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
    preserveDrawingBuffer: true
  });
  renderer.setClearColor(0, 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.xr.enabled = false;
  const canvas = renderer.domElement;
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;outline:none;touch-action:none;";
  container.appendChild(canvas);
  const mat = new MeshBasicMaterial({ color: 16777215 });
  const originMat = new MeshBasicMaterial({ color: 15263455 });
  const nodeGeo = new OctahedronGeometry(1, 0);
  const originGeo = new OctahedronGeometry(1, 0);
  const edgeGeo = new BoxGeometry(1, 1, 1);
  const origin = new Mesh(originGeo, originMat);
  scene.add(origin);
  const nodes = new InstancedMesh(nodeGeo, mat, CELLS);
  nodes.instanceMatrix.setUsage(DynamicDrawUsage);
  nodes.frustumCulled = false;
  scene.add(nodes);
  const edges = new InstancedMesh(edgeGeo, mat, EDGES.length);
  edges.instanceMatrix.setUsage(DynamicDrawUsage);
  edges.frustumCulled = false;
  scene.add(edges);
  const traces = new InstancedMesh(edgeGeo, mat, INTERIORS.length);
  traces.instanceMatrix.setUsage(DynamicDrawUsage);
  traces.frustumCulled = false;
  scene.add(traces);
  const dummy = new Object3D();
  const color = new Color();
  const va = new Vector3();
  const vb = new Vector3();
  const vm = new Vector3();
  const live = new Uint8Array(CELLS);
  const prev = new Uint8Array(CELLS);
  const next = new Uint8Array(CELLS);
  const ever = new Uint8Array(CELLS);
  let cycle = -1;
  let appliedGen = -1;
  let lastTick = GEN_START;
  let memory = null;
  let metrics = {
    density: 8 / 64,
    symmetry: 1,
    stability: 1,
    entropy: 0,
    weakest: 0,
    fingerprint: 8
  };
  const timer = new Timer();
  timer.connect(document);
  function tint(v) {
    const g = saturate(v);
    color.setRGB(INK.r * g, INK.g * g, INK.b * g);
    return color;
  }
  let viewX = 0;
  let viewY = 0;
  let viewW = 1;
  let viewH = 1;
  function setInstance(mesh, i, pos, sx, sy, sz, rot, shade) {
    dummy.position.copy(pos);
    dummy.scale.set(sx, sy, sz);
    if (rot) dummy.rotation.set(rot.x, rot.y, rot.z);
    else dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
    mesh.setColorAt(i, tint(shade));
  }
  function layoutLetterbox() {
    const w = Math.max(1, container.clientWidth);
    const h = Math.max(1, container.clientHeight);
    renderer.setSize(w, h, false);
    const target = 16 / 9;
    const a = w / h;
    let vw;
    let vh;
    let vx;
    let vy;
    if (a > target) {
      vh = h;
      vw = h * target;
      vx = (w - vw) * 0.5;
      vy = 0;
    } else {
      vw = w;
      vh = w / target;
      vx = 0;
      vy = (h - vh) * 0.5;
    }
    renderer.setViewport(vx, vy, vw, vh);
    renderer.setScissor(vx, vy, vw, vh);
    viewX = vx;
    viewY = vy;
    viewW = vw;
    viewH = vh;
    camera.aspect = target;
    camera.updateProjectionMatrix();
  }
  function ensureCycle(elapsed) {
    const c = Math.floor(elapsed / CYCLE);
    if (c === cycle) return;
    if (cycle >= 0) memory = metrics;
    cycle = c;
    appliedGen = -1;
    seedState(live, prev, ever, cycle, memory);
    metrics = measure(live, prev);
  }
  function maybeStep(t) {
    if (t < GEN_START || t >= GEN_END) return;
    const gen = Math.floor((t - GEN_START) / GEN_DT);
    while (appliedGen < gen) {
      appliedGen += 1;
      const force = t < 68;
      const rule = selectRule(metrics);
      stepCA(live, prev, next, rule, force);
      for (let i = 0; i < CELLS; i++) if (live[i]) ever[i] = 1;
      metrics = measure(live, prev);
      lastTick = GEN_START + appliedGen * GEN_DT;
    }
  }
  function updateCamera(elapsed, presenting) {
    if (presenting) return;
    const az = elapsed * 0.032;
    const el = 0.32 + 0.045 * Math.sin(elapsed * 0.07);
    const r = 5.55;
    camera.position.set(
      r * Math.cos(el) * Math.cos(az),
      r * Math.sin(el),
      r * Math.cos(el) * Math.sin(az)
    );
    camera.lookAt(0, 0, 0);
  }
  function frame() {
    if (disposed) return;
    timer.update();
    const elapsed = timer.getElapsed() + offset;
    const t = (elapsed % CYCLE + CYCLE) % CYCLE;
    ensureCycle(elapsed);
    maybeStep(t);
    const presenting = renderer.xr.isPresenting;
    updateCamera(elapsed, presenting);
    const contract = smoothstep(CONTRACT_T, 89.4, t);
    const pulse = Math.exp(-2.8 * Math.max(0, t - lastTick));
    const breath = 1 + 0.055 * Math.sin(elapsed * (1.15 + (memory?.density ?? 0.12)));
    const originVis = (1 - smoothstep(10.1, 13.2, t)) * (1 - contract) + 0.07 * smoothstep(13, 18, t) * (1 - smoothstep(82, 86, t)) + contract;
    const originScale = lerp(0.03, 0.52 * breath, originVis);
    origin.position.set(0, 0, 0);
    origin.scale.setScalar(originScale);
    origin.rotation.set(0, 0, 0);
    originMat.color.setRGB(INK.r, INK.g, INK.b);
    origin.visible = originScale > 0.01;
    for (let i = 0; i < CELLS; i++) {
      cellPos(i, t, va);
      va.multiplyScalar(1 - contract);
      let vis = 0;
      let shade = 0;
      let scale = 0;
      if (isCorner(i)) {
        vis = cornerReveal(cornerBits(i).bx, cornerBits(i).by, cornerBits(i).bz, t);
        shade = 0.96 * vis * (1 + 0.05 * pulse);
        scale = lerp(0.22, 0.135, smoothstep(28, 48, t)) * vis;
      } else {
        const delay = 44 + manh(i, parentOf(i)) * 0.55;
        const ready = smoothstep(delay, delay + 0.8, t);
        if (live[i]) {
          vis = ready * (1 - contract);
          shade = 0.82 * vis * (1 + 0.04 * pulse);
          scale = 0.105 * vis;
        } else if (ever[i]) {
          vis = 0.22 * ready * (1 - smoothstep(80, 88, t));
          shade = 0.16 * vis;
          scale = 0.048 * vis;
        }
      }
      if (contract > 0 && isCorner(i)) {
        scale *= 1 - contract * 0.85;
        shade *= 1 - contract * 0.7;
      }
      dummy.quaternion.identity();
      setInstance(nodes, i, va, scale, scale, scale, null, shade);
    }
    nodes.instanceMatrix.needsUpdate = true;
    if (nodes.instanceColor) nodes.instanceColor.needsUpdate = true;
    for (let e = 0; e < EDGES.length; e++) {
      const edge = EDGES[e];
      cellPos(edge.a, t, va);
      cellPos(edge.b, t, vb);
      va.multiplyScalar(1 - contract);
      vb.multiplyScalar(1 - contract);
      vm.addVectors(va, vb).multiplyScalar(0.5);
      const len = va.distanceTo(vb);
      const cubeIn = edge.cube ? smoothstep(26.5, 34, t) : smoothstep(34 + edge.dist * 0.7, 42 + edge.dist * 0.35, t);
      const both = live[edge.a] && live[edge.b] ? 1 : 0;
      const one = live[edge.a] || live[edge.b] ? 1 : 0;
      const relation = cubeIn * (1 - contract);
      let shade = 0.06 * relation;
      if (edge.cube) shade = 0.36 * relation;
      if (t >= GEN_START) {
        shade = Math.max(shade, 0.12 * one * relation + 0.5 * both * relation);
      }
      shade *= 1 + 0.06 * pulse;
      const thick = edge.cube ? 0.022 : 0.012;
      dummy.quaternion.identity();
      dummy.position.copy(vm);
      dummy.scale.set(edge.axis === 0 ? len * 0.92 : thick, edge.axis === 1 ? len * 0.92 : thick, edge.axis === 2 ? len * 0.92 : thick);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      edges.setMatrixAt(e, dummy.matrix);
      edges.setColorAt(e, tint(shade));
    }
    edges.instanceMatrix.needsUpdate = true;
    if (edges.instanceColor) edges.instanceColor.needsUpdate = true;
    for (let k = 0; k < INTERIORS.length; k++) {
      const i = INTERIORS[k];
      const p = parentOf(i);
      cellPos(i, t, va);
      cellPos(p, t, vb);
      va.multiplyScalar(1 - contract);
      vb.multiplyScalar(1 - contract);
      vm.addVectors(va, vb).multiplyScalar(0.5);
      const len = Math.max(1e-4, va.distanceTo(vb));
      const delay = 44 + manh(i, p) * 0.55;
      const ready = smoothstep(delay, delay + 1.1, t);
      const born = ever[i] ? 1 : 0;
      const shade = 0.11 * ready * born * (live[i] ? 0.9 : 0.35) * (1 - contract);
      dummy.position.copy(vm);
      dummy.scale.set(9e-3, 9e-3, len);
      dummy.lookAt(va);
      dummy.updateMatrix();
      traces.setMatrixAt(k, dummy.matrix);
      traces.setColorAt(k, tint(shade));
    }
    traces.instanceMatrix.needsUpdate = true;
    if (traces.instanceColor) traces.instanceColor.needsUpdate = true;
    if (presenting) {
      renderer.setScissorTest(false);
      renderer.render(scene, camera);
    } else {
      const rw = Math.max(1, container.clientWidth);
      const rh = Math.max(1, container.clientHeight);
      renderer.setScissorTest(false);
      renderer.setViewport(0, 0, rw, rh);
      renderer.clear();
      renderer.setViewport(viewX, viewY, viewW, viewH);
      renderer.setScissor(viewX, viewY, viewW, viewH);
      renderer.setScissorTest(true);
      renderer.render(scene, camera);
    }
  }
  async function toggleXR() {
    if (!navigator.xr || disposed) return;
    try {
      if (renderer.xr.isPresenting) {
        await renderer.xr.getSession()?.end();
        return;
      }
      const modes = ["immersive-vr", "immersive-ar"];
      let mode = null;
      for (const m of modes) {
        if (await navigator.xr.isSessionSupported(m)) {
          mode = m;
          break;
        }
      }
      if (!mode) return;
      renderer.xr.enabled = true;
      renderer.xr.setReferenceSpaceType("local");
      const session = await navigator.xr.requestSession(mode, {
        optionalFeatures: ["local-floor"]
      });
      await renderer.xr.setSession(session);
      session.addEventListener("end", () => {
        renderer.xr.enabled = false;
        layoutLetterbox();
      });
    } catch {
    }
  }
  const onResize = () => layoutLetterbox();
  const onDblClick = () => {
    void toggleXR();
  };
  const onContext = (e) => e.preventDefault();
  const ro = new ResizeObserver(onResize);
  ro.observe(container);
  canvas.addEventListener("dblclick", onDblClick);
  canvas.addEventListener("contextmenu", onContext);
  layoutLetterbox();
  renderer.setAnimationLoop(frame);
  return () => {
    disposed = true;
    timer.disconnect();
    renderer.setAnimationLoop(null);
    ro.disconnect();
    canvas.removeEventListener("dblclick", onDblClick);
    canvas.removeEventListener("contextmenu", onContext);
    const session = renderer.xr.getSession();
    if (session) void session.end();
    nodeGeo.dispose();
    originGeo.dispose();
    edgeGeo.dispose();
    mat.dispose();
    originMat.dispose();
    nodes.dispose();
    edges.dispose();
    traces.dispose();
    renderer.dispose();
    canvas.remove();
  };
}
export {
  mountNfirLattice
};
