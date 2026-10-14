// Stage Replica — Sphere / Immersive Dome
// S2 GRAYBOX: structure + scale only. No show content, no mapping yet (that is S3).
// Every dimension here comes from ./scene.json, which traces back to
// ../reference/reference.md §4 (教学 proxy).

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const params = new URLSearchParams(location.search);
const requestedView = params.get("view") || "AUDIENCE_CENTER";

const sceneJson = await (await fetch("./scene.json")).json();
const S = sceneJson.structure;
const view = sceneJson.cameras.find((c) => c.id === requestedView) || sceneJson.cameras[0];
const isDebug = view.id === "DEBUG_ORBIT";

// ---------------------------------------------------------------- renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0x05070b, 1);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(view.fovDeg, innerWidth / innerHeight, 0.05, 400);
camera.position.fromArray(view.positionM);
camera.lookAt(new THREE.Vector3().fromArray(view.targetM));

// No scene.fog on purpose: at dome scale fog reads as "the screen is disappearing",
// which is exactly the failure mode this demo must be able to show or rule out.

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.fromArray(view.targetM);
controls.enableDamping = !isDebug;
controls.enabled = isDebug; // graybox default view is a fixed audience viewpoint
controls.update();

// ---------------------------------------------------------------- lighting
scene.add(new THREE.HemisphereLight(0x8899bb, 0x090b10, 1.15));
const key = new THREE.DirectionalLight(0xffffff, 1.15);
key.position.set(12, 26, 12);
scene.add(key);

// ---------------------------------------------------------------- audience floor (⌀34m)
const floorRadius = S.audienceFloorDiameterM / 2;
const floor = new THREE.Mesh(
  new THREE.CircleGeometry(floorRadius, 96),
  new THREE.MeshStandardMaterial({ color: 0x0d1117, roughness: 1, metalness: 0 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Radial scale grid, clipped to the circular floor: a square GridHelper reads as a
// square room and fights the "audience is inside a circle" fact this demo must convey.
const gridGroup = new THREE.Group();
gridGroup.position.y = 0.01;
const ringMat = new THREE.LineBasicMaterial({ color: 0x2b3646, transparent: true, opacity: 0.9 });
const radialMat = new THREE.LineBasicMaterial({ color: 0x1d2531, transparent: true, opacity: 0.9 });
for (let r = S.gridRingM; r <= floorRadius + 1e-6; r += S.gridRingM) {
  const pts = Array.from({ length: 129 }, (_, i) => {
    const a = (i / 128) * Math.PI * 2;
    return new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r);
  });
  gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), ringMat));
}
for (let i = 0; i < S.gridRadials; i++) {
  const a = (i / S.gridRadials) * Math.PI * 2;
  gridGroup.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(Math.cos(a) * floorRadius, 0, Math.sin(a) * floorRadius)
      ]),
      radialMat
    )
  );
}
scene.add(gridGroup);

const rim = new THREE.LineLoop(
  new THREE.BufferGeometry().setFromPoints(
    Array.from({ length: 129 }, (_, i) => {
      const a = (i / 128) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(a) * floorRadius, 0.02, Math.sin(a) * floorRadius);
    })
  ),
  new THREE.LineBasicMaterial({ color: 0x6ea8ff, transparent: true, opacity: 0.85 })
);
scene.add(rim);

// ---------------------------------------------------------------- dome (r=25m hemisphere)
const domeGeo = new THREE.SphereGeometry(S.domeRadiusM, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2);
const dome = new THREE.Mesh(
  domeGeo,
  new THREE.MeshStandardMaterial({
    color: 0x161d29,
    side: THREE.BackSide,
    roughness: 1,
    metalness: 0,
    transparent: isDebug,
    opacity: isDebug ? 0.18 : 1
  })
);
scene.add(dome);

const domeWireLow = new THREE.SphereGeometry(S.domeRadiusM, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2);
scene.add(
  new THREE.LineSegments(
    new THREE.WireframeGeometry(domeWireLow),
    new THREE.LineBasicMaterial({ color: 0x3a4759, transparent: true, opacity: isDebug ? 0.5 : 0.3 })
  )
);

// ---------------------------------------------------------------- stage platform 14m x 8m
const stageH = S.stagePlatform.heightM;
const stage = new THREE.Mesh(
  new THREE.BoxGeometry(S.stagePlatform.widthM, stageH, S.stagePlatform.depthM),
  new THREE.MeshStandardMaterial({ color: 0x222a36, roughness: 0.95, metalness: 0 })
);
stage.position.y = stageH / 2;
scene.add(stage);
scene.add(
  new THREE.LineSegments(
    new THREE.EdgesGeometry(stage.geometry),
    new THREE.LineBasicMaterial({ color: 0x55657c })
  ).translateY(stageH / 2)
);

// ---------------------------------------------------------------- performer scale proxy 1.7m
const perfH = S.performerHeightM;
const perfBodyH = perfH - 0.56; // capsule: cylinder part + 2 caps of r=0.28
const performer = new THREE.Mesh(
  new THREE.CapsuleGeometry(0.28, perfBodyH, 8, 16),
  new THREE.MeshStandardMaterial({ color: 0xffb86b, roughness: 0.8, metalness: 0 })
);
performer.position.set(0, stageH + perfH / 2, 0);
scene.add(performer);

// performer height marker: 1.7m vertical rule next to the figure
const markX = 1.1;
const heightRule = new THREE.Line(
  new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(markX, stageH, 0),
    new THREE.Vector3(markX, stageH + perfH, 0)
  ]),
  new THREE.LineBasicMaterial({ color: 0xffb86b, transparent: true, opacity: 0.9 })
);
scene.add(heightRule);

// ---------------------------------------------------------------- 5m scale bar on the floor
const barLen = S.scaleBarM;
const scaleBar = new THREE.Line(
  new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-barLen / 2, 0.03, 7.5),
    new THREE.Vector3(barLen / 2, 0.03, 7.5)
  ]),
  new THREE.LineBasicMaterial({ color: 0xffffff })
);
scene.add(scaleBar);

// ---------------------------------------------------------------- readout
const eyeText = view.eyeHeightM === null ? "—（外部调试机位）" : `${view.eyeHeightM} m`;
document.getElementById("r-view").textContent = `${view.id}｜${view.label}`;
document.getElementById("r-cam").textContent =
  `x ${view.positionM[0]} · y ${view.positionM[1]} · z ${view.positionM[2]} m`;
document.getElementById("r-eye").textContent = eyeText;
document.getElementById("r-scale").textContent =
  `dome r=${S.domeRadiusM}m ｜ 地面 ⌀${S.audienceFloorDiameterM}m ｜ 舞台 ${S.stagePlatform.widthM}×${S.stagePlatform.depthM}m ｜ 人物 ${perfH}m`;

// ---------------------------------------------------------------- loop
addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

let frames = 0;
renderer.setAnimationLoop(() => {
  if (controls.enabled) controls.update();
  renderer.render(scene, camera);
  frames += 1;
  if (frames === 2) window.__REPLICA_READY__ = true;
});

// Headless / deterministic capture hook
window.__REPLICA_STATE__ = () => ({
  sceneId: sceneJson.sceneId,
  view: view.id,
  structure: S,
  frames
});
