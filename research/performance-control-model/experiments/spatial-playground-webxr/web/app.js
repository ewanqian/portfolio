import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';

const JOINT_NAMES = [
  'wrist',
  'thumb-metacarpal', 'thumb-phalanx-proximal', 'thumb-phalanx-distal', 'thumb-tip',
  'index-finger-metacarpal', 'index-finger-phalanx-proximal', 'index-finger-phalanx-intermediate', 'index-finger-phalanx-distal', 'index-finger-tip',
  'middle-finger-metacarpal', 'middle-finger-phalanx-proximal', 'middle-finger-phalanx-intermediate', 'middle-finger-phalanx-distal', 'middle-finger-tip',
  'ring-finger-metacarpal', 'ring-finger-phalanx-proximal', 'ring-finger-phalanx-intermediate', 'ring-finger-phalanx-distal', 'ring-finger-tip',
  'pinky-finger-metacarpal', 'pinky-finger-phalanx-proximal', 'pinky-finger-phalanx-intermediate', 'pinky-finger-phalanx-distal', 'pinky-finger-tip'
];

const $ = (id) => document.getElementById(id);
const ui = {
  stage: $('stage'),
  status: $('status-pill'),
  mode: $('mode-value'),
  xr: $('xr-value'),
  hands: $('hands-value'),
  fps: $('fps-value'),
  head: $('head-readout'),
  left: $('left-readout'),
  right: $('right-readout'),
  leftPinch: $('left-pinch'),
  rightPinch: $('right-pinch'),
  handDistance: $('hand-distance'),
  headYaw: $('head-yaw'),
  headPitch: $('head-pitch'),
  headRoll: $('head-roll'),
  toggleMode: $('toggle-mode'),
  record: $('record'),
  export: $('export'),
  clear: $('clear')
};

const state = {
  mode: 'mock',
  xrSupported: false,
  recording: false,
  frames: [],
  lastCaptureMs: 0,
  lastUiMs: 0,
  fpsFrames: 0,
  fpsWindowMs: performance.now(),
  fps: 0,
  latest: createEmptyFrame()
};

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050505);
scene.fog = new THREE.Fog(0x050505, 4, 10);

const camera = new THREE.PerspectiveCamera(55, 1, 0.01, 30);
camera.position.set(0, 1.45, 2.8);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.xr.enabled = true;
renderer.xr.setReferenceSpaceType('local-floor');
ui.stage.appendChild(renderer.domElement);

document.body.appendChild(VRButton.createButton(renderer, {
  optionalFeatures: ['hand-tracking', 'local-floor']
}));

scene.add(new THREE.HemisphereLight(0xffffff, 0x202020, 2.2));
const key = new THREE.DirectionalLight(0xffffff, 3.5);
key.position.set(1.5, 3, 2);
scene.add(key);

const grid = new THREE.GridHelper(8, 16, 0x343434, 0x171717);
grid.position.y = 0;
scene.add(grid);

const originAxes = new THREE.AxesHelper(0.35);
originAxes.position.set(0, 0.01, 0);
scene.add(originAxes);

const jointGeometry = new THREE.SphereGeometry(1, 10, 8);
const jointMaterialLeft = new THREE.MeshStandardMaterial({ color: 0xe9e9e9, roughness: 0.55 });
const jointMaterialRight = new THREE.MeshStandardMaterial({ color: 0x9f9f9f, roughness: 0.55 });
const jointMeshes = new Map();

const headMarker = new THREE.Group();
const headBox = new THREE.Mesh(
  new THREE.BoxGeometry(0.16, 0.10, 0.08),
  new THREE.MeshStandardMaterial({ color: 0x666666, wireframe: true })
);
headMarker.add(headBox);
headMarker.add(new THREE.AxesHelper(0.22));
scene.add(headMarker);

const panel = makeWorldPanel();
panel.mesh.position.set(0, 1.35, -1.8);
scene.add(panel.mesh);

const mock = createMockRig();
scene.add(mock.root);

let lastTimestamp = performance.now();
renderer.setAnimationLoop((timestamp, xrFrame) => {
  lastTimestamp = timestamp;
  updateFps(timestamp);

  if (xrFrame && renderer.xr.isPresenting) {
    state.mode = 'xr';
    mock.root.visible = false;
    readXRFrame(xrFrame, timestamp);
  } else {
    if (state.mode === 'xr') state.mode = 'mock';
    mock.root.visible = true;
    readMockFrame(timestamp);
  }

  renderJointMarkers(state.latest);
  updateWorldPanel(timestamp);
  updateDom(timestamp);
  captureFrame(timestamp);
  renderer.render(scene, camera);
});

window.addEventListener('resize', resize);
resize();
checkXRSupport();

ui.toggleMode.addEventListener('click', () => {
  state.mode = 'mock';
  ui.status.textContent = 'MOCK ACTIVE';
});

ui.record.addEventListener('click', () => {
  state.recording = !state.recording;
  ui.record.textContent = state.recording ? 'Stop Recording' : 'Start Recording';
  ui.status.textContent = state.recording ? 'RECORDING' : 'READY';
});

ui.export.addEventListener('click', exportRecording);
ui.clear.addEventListener('click', () => {
  state.frames = [];
  ui.export.disabled = true;
  ui.status.textContent = 'CLEARED';
});

renderer.xr.addEventListener('sessionstart', () => {
  state.mode = 'xr';
  ui.status.textContent = 'XR SESSION';
});

renderer.xr.addEventListener('sessionend', () => {
  state.mode = 'mock';
  ui.status.textContent = 'XR ENDED / MOCK';
});

async function checkXRSupport() {
  if (!('xr' in navigator)) {
    state.xrSupported = false;
    ui.xr.textContent = 'NO API';
    ui.status.textContent = 'MOCK ONLY';
    return;
  }

  try {
    state.xrSupported = await navigator.xr.isSessionSupported('immersive-vr');
    ui.xr.textContent = state.xrSupported ? 'VR READY' : 'NO VR';
    ui.status.textContent = state.xrSupported ? 'XR READY' : 'MOCK READY';
  } catch (error) {
    console.warn('XR capability check failed', error);
    ui.xr.textContent = 'ERROR';
    ui.status.textContent = 'MOCK READY';
  }
}

function createEmptyFrame() {
  return {
    t: 0,
    mode: 'mock',
    head: null,
    hands: { left: null, right: null },
    derived: {}
  };
}

function readXRFrame(frame, timestamp) {
  const refSpace = renderer.xr.getReferenceSpace();
  if (!refSpace) return;

  const out = createEmptyFrame();
  out.t = timestamp;
  out.mode = 'xr';

  const viewerPose = frame.getViewerPose(refSpace);
  if (viewerPose) {
    out.head = poseToObject(viewerPose.transform);
    out.head.euler = quaternionToEuler(out.head.orientation);
  }

  const session = renderer.xr.getSession();
  if (session) {
    for (const source of session.inputSources) {
      if (!source.hand || !source.handedness) continue;
      const handedness = source.handedness;
      if (handedness !== 'left' && handedness !== 'right') continue;

      const joints = {};
      for (const [jointName, jointSpace] of source.hand.entries()) {
        const jointPose = frame.getJointPose(jointSpace, refSpace);
        if (!jointPose) continue;
        joints[jointName] = {
          position: vec3Object(jointPose.transform.position),
          orientation: quatObject(jointPose.transform.orientation),
          radius: jointPose.radius ?? null
        };
      }
      out.hands[handedness] = { joints };
    }
  }

  out.derived = deriveSignals(out);
  state.latest = out;
}

function readMockFrame(timestamp) {
  const t = timestamp / 1000;
  const out = createEmptyFrame();
  out.t = timestamp;
  out.mode = 'mock';

  out.head = {
    position: { x: 0, y: 1.62 + Math.sin(t * 0.45) * 0.015, z: 0.15 },
    orientation: quatObject(new THREE.Quaternion().setFromEuler(new THREE.Euler(
      Math.sin(t * 0.7) * 0.12,
      Math.sin(t * 0.42) * 0.25,
      Math.sin(t * 0.55) * 0.08,
      'YXZ'
    )))
  };
  out.head.euler = quaternionToEuler(out.head.orientation);

  out.hands.left = { joints: mockHandJoints('left', t) };
  out.hands.right = { joints: mockHandJoints('right', t + 0.8) };
  out.derived = deriveSignals(out);
  state.latest = out;
}

function mockHandJoints(handedness, t) {
  const sign = handedness === 'left' ? -1 : 1;
  const base = new THREE.Vector3(sign * 0.28, 1.22 + Math.sin(t * 1.1) * 0.04, -0.55 + Math.cos(t * 0.8) * 0.03);
  const joints = {};

  const fingerX = {
    thumb: sign * -0.045,
    index: sign * -0.025,
    middle: 0,
    ring: sign * 0.025,
    pinky: sign * 0.05
  };

  JOINT_NAMES.forEach((name) => {
    if (name === 'wrist') {
      joints[name] = mockJoint(base.x, base.y - 0.09, base.z + 0.02, 0.022);
      return;
    }

    const finger = name.startsWith('thumb') ? 'thumb' :
      name.startsWith('index') ? 'index' :
      name.startsWith('middle') ? 'middle' :
      name.startsWith('ring') ? 'ring' : 'pinky';

    const segments = name.includes('metacarpal') ? 0 :
      name.includes('proximal') ? 1 :
      name.includes('intermediate') ? 2 :
      name.includes('distal') ? 3 : 4;

    const flex = 0.5 + Math.sin(t * 1.6 + (finger === 'index' ? 0 : 0.7)) * 0.5;
    const y = base.y + 0.015 + segments * 0.036 - flex * segments * 0.006;
    const z = base.z - segments * 0.012 - flex * segments * 0.015;
    const x = base.x + (fingerX[finger] ?? 0);
    joints[name] = mockJoint(x, y, z, segments === 4 ? 0.012 : 0.015);
  });

  const indexTip = joints['index-finger-tip'].position;
  const pinchWave = (Math.sin(t * 1.8) + 1) * 0.5;
  const thumbTip = joints['thumb-tip'].position;
  thumbTip.x = THREE.MathUtils.lerp(base.x + sign * -0.07, indexTip.x, pinchWave * 0.82);
  thumbTip.y = THREE.MathUtils.lerp(base.y + 0.07, indexTip.y, pinchWave * 0.82);
  thumbTip.z = THREE.MathUtils.lerp(base.z - 0.015, indexTip.z, pinchWave * 0.82);

  return joints;
}

function mockJoint(x, y, z, radius) {
  return {
    position: { x, y, z },
    orientation: { x: 0, y: 0, z: 0, w: 1 },
    radius
  };
}

function deriveSignals(frame) {
  const left = frame.hands.left?.joints;
  const right = frame.hands.right?.joints;
  const derived = {};

  if (left) {
    derived.leftPinch = distanceBetween(left['thumb-tip']?.position, left['index-finger-tip']?.position);
  }
  if (right) {
    derived.rightPinch = distanceBetween(right['thumb-tip']?.position, right['index-finger-tip']?.position);
  }
  if (left && right) {
    derived.handDistance = distanceBetween(left.wrist?.position, right.wrist?.position);
  }
  if (frame.head?.euler) Object.assign(derived, frame.head.euler);

  return derived;
}

function renderJointMarkers(frame) {
  let handCount = 0;
  for (const handedness of ['left', 'right']) {
    const hand = frame.hands[handedness];
    if (!hand?.joints) continue;
    handCount += 1;

    for (const [jointName, joint] of Object.entries(hand.joints)) {
      const id = `${handedness}:${jointName}`;
      let mesh = jointMeshes.get(id);
      if (!mesh) {
        mesh = new THREE.Mesh(
          jointGeometry,
          handedness === 'left' ? jointMaterialLeft : jointMaterialRight
        );
        mesh.userData.id = id;
        scene.add(mesh);
        jointMeshes.set(id, mesh);
      }

      mesh.visible = true;
      mesh.position.set(joint.position.x, joint.position.y, joint.position.z);
      mesh.quaternion.set(joint.orientation.x, joint.orientation.y, joint.orientation.z, joint.orientation.w);
      const r = Math.max(joint.radius ?? 0.011, 0.008);
      mesh.scale.setScalar(r);
    }
  }

  for (const [id, mesh] of jointMeshes.entries()) {
    const [handedness, jointName] = id.split(':');
    if (!frame.hands[handedness]?.joints?.[jointName]) mesh.visible = false;
  }

  ui.hands.textContent = String(handCount);

  if (frame.head) {
    headMarker.visible = true;
    headMarker.position.set(frame.head.position.x, frame.head.position.y, frame.head.position.z);
    headMarker.quaternion.set(
      frame.head.orientation.x,
      frame.head.orientation.y,
      frame.head.orientation.z,
      frame.head.orientation.w
    );
  } else {
    headMarker.visible = false;
  }
}

function createMockRig() {
  const root = new THREE.Group();
  const ringGeo = new THREE.TorusGeometry(0.24, 0.003, 8, 64);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x2a2a2a });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  ring.position.set(0, 1.22, -0.55);
  root.add(ring);
  return { root };
}

function makeWorldPanel() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.94 });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.8), material);
  return { canvas, ctx, texture, mesh, lastUpdate: 0 };
}

function updateWorldPanel(timestamp) {
  if (timestamp - panel.lastUpdate < 120) return;
  panel.lastUpdate = timestamp;
  const { ctx, canvas, texture } = panel;
  const frame = state.latest;
  const d = frame.derived || {};

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#444';
  ctx.lineWidth = 2;
  ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);

  ctx.fillStyle = '#f2f2f2';
  ctx.font = '32px monospace';
  ctx.fillText('SPATIAL PLAYGROUND / SENSOR SCOPE', 40, 62);
  ctx.fillStyle = '#9a9a9a';
  ctx.font = '22px monospace';
  ctx.fillText(`MODE ${frame.mode.toUpperCase()}    FPS ${state.fps}`, 40, 105);

  ctx.fillStyle = '#e8e8e8';
  ctx.font = '25px monospace';
  const lines = [
    `LEFT  ${frame.hands.left ? Object.keys(frame.hands.left.joints).length : 0}/25 joints`,
    `RIGHT ${frame.hands.right ? Object.keys(frame.hands.right.joints).length : 0}/25 joints`,
    `L PINCH ${formatMeters(d.leftPinch)}`,
    `R PINCH ${formatMeters(d.rightPinch)}`,
    `2H DIST ${formatMeters(d.handDistance)}`,
    `HEAD YAW ${formatDegrees(d.yaw)}  PITCH ${formatDegrees(d.pitch)}  ROLL ${formatDegrees(d.roll)}`,
    state.recording ? `RECORDING ${state.frames.length} frames` : `RECORDING OFF`
  ];
  lines.forEach((line, i) => ctx.fillText(line, 40, 165 + i * 43));
  texture.needsUpdate = true;
}

function updateDom(timestamp) {
  if (timestamp - state.lastUiMs < 120) return;
  state.lastUiMs = timestamp;
  const frame = state.latest;
  const d = frame.derived || {};

  ui.mode.textContent = frame.mode.toUpperCase();
  ui.fps.textContent = String(state.fps);
  ui.head.textContent = frame.head ? formatHead(frame.head) : 'not tracked';
  ui.left.textContent = formatHand(frame.hands.left);
  ui.right.textContent = formatHand(frame.hands.right);
  ui.leftPinch.textContent = formatMeters(d.leftPinch);
  ui.rightPinch.textContent = formatMeters(d.rightPinch);
  ui.handDistance.textContent = formatMeters(d.handDistance);
  ui.headYaw.textContent = formatDegrees(d.yaw);
  ui.headPitch.textContent = formatDegrees(d.pitch);
  ui.headRoll.textContent = formatDegrees(d.roll);
  ui.export.disabled = state.frames.length === 0;
}

function formatHead(head) {
  const p = head.position;
  const q = head.orientation;
  return [
    `POSITION`,
    `x ${fixed(p.x)}  y ${fixed(p.y)}  z ${fixed(p.z)}`,
    ``,
    `QUATERNION`,
    `x ${fixed(q.x)}  y ${fixed(q.y)}`,
    `z ${fixed(q.z)}  w ${fixed(q.w)}`,
    ``,
    `EULER`,
    `yaw ${formatDegrees(head.euler?.yaw)}`,
    `pitch ${formatDegrees(head.euler?.pitch)}`,
    `roll ${formatDegrees(head.euler?.roll)}`
  ].join('\n');
}

function formatHand(hand) {
  if (!hand?.joints) return 'not tracked';
  const names = Object.keys(hand.joints);
  const tip = hand.joints['index-finger-tip'];
  const wrist = hand.joints.wrist;
  return [
    `${names.length}/25 joints`,
    ``,
    `INDEX TIP`,
    tip ? `x ${fixed(tip.position.x)}\ny ${fixed(tip.position.y)}\nz ${fixed(tip.position.z)}` : 'not tracked',
    ``,
    `WRIST`,
    wrist ? `x ${fixed(wrist.position.x)}\ny ${fixed(wrist.position.y)}\nz ${fixed(wrist.position.z)}` : 'not tracked'
  ].join('\n');
}

function captureFrame(timestamp) {
  if (!state.recording) return;
  if (timestamp - state.lastCaptureMs < 33) return;
  state.lastCaptureMs = timestamp;

  state.frames.push(JSON.parse(JSON.stringify({
    ...state.latest,
    capturedAtMs: timestamp
  })));

  if (state.frames.length > 18000) state.frames.shift();
}

function exportRecording() {
  const payload = {
    schema: 'spatial-playground-sensor-scope-v1',
    exportedAt: new Date().toISOString(),
    userAgent: navigator.userAgent,
    xrSupported: state.xrSupported,
    frameCount: state.frames.length,
    frames: state.frames
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `spatial-playground-sensor-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function updateFps(timestamp) {
  state.fpsFrames += 1;
  const elapsed = timestamp - state.fpsWindowMs;
  if (elapsed >= 500) {
    state.fps = Math.round((state.fpsFrames * 1000) / elapsed);
    state.fpsFrames = 0;
    state.fpsWindowMs = timestamp;
  }
}

function poseToObject(transform) {
  return {
    position: vec3Object(transform.position),
    orientation: quatObject(transform.orientation)
  };
}

function vec3Object(v) {
  return { x: v.x, y: v.y, z: v.z };
}

function quatObject(q) {
  return { x: q.x, y: q.y, z: q.z, w: q.w };
}

function quaternionToEuler(q) {
  const quaternion = new THREE.Quaternion(q.x, q.y, q.z, q.w);
  const e = new THREE.Euler().setFromQuaternion(quaternion, 'YXZ');
  return { yaw: e.y, pitch: e.x, roll: e.z };
}

function distanceBetween(a, b) {
  if (!a || !b) return null;
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function fixed(v) {
  return Number.isFinite(v) ? v.toFixed(3) : '—';
}

function formatMeters(v) {
  return Number.isFinite(v) ? `${v.toFixed(3)} m` : '—';
}

function formatDegrees(v) {
  return Number.isFinite(v) ? `${THREE.MathUtils.radToDeg(v).toFixed(1)}°` : '—';
}

function resize() {
  const rect = ui.stage.getBoundingClientRect();
  const width = Math.max(rect.width, 1);
  const height = Math.max(rect.height, 1);
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
