import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { VRButton } from "three/addons/webxr/VRButton.js";

const canvas = document.querySelector("#stage");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.xr.enabled = true;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050608);
scene.fog = new THREE.Fog(0x050608, 9, 30);

const camera = new THREE.PerspectiveCamera(54, innerWidth / innerHeight, 0.05, 80);
camera.position.set(0, 1.65, 5.2);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.25, 0);
controls.enableDamping = true;
controls.minDistance = 1.6;
controls.maxDistance = 15;

scene.add(new THREE.HemisphereLight(0xc9dcff, 0x111318, 1.6));
const key = new THREE.DirectionalLight(0xffffff, 2.6);
key.position.set(4, 7, 4);
scene.add(key);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: 0x0d1015, roughness: 0.92, metalness: 0.06 }),
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const grid = new THREE.GridHelper(20, 40, 0x34404d, 0x171d25);
grid.position.y = 0.003;
scene.add(grid);

function box(x, y, z, sx, sy, sz, color = 0x141922) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(sx, sy, sz),
    new THREE.MeshStandardMaterial({ color, roughness: 0.8, metalness: 0.18 }),
  );
  mesh.position.set(x, y, z);
  scene.add(mesh);
  return mesh;
}

box(0, 0.18, 0.15, 5.4, 0.36, 2.4, 0x0a0d12);
box(-3.05, 1.65, 0.2, 0.22, 3.3, 0.22, 0x202732);
box(3.05, 1.65, 0.2, 0.22, 3.3, 0.22, 0x202732);
box(0, 3.2, 0.2, 6.3, 0.2, 0.22, 0x202732);
for (let i = -2; i <= 2; i += 1) box(i * 1.15, 3.02, 0.05, 0.08, 0.42, 0.08, 0x3d4654);

const screenGroup = new THREE.Group();
screenGroup.position.set(0, 1.75, 0.05);
scene.add(screenGroup);

const frame = new THREE.Mesh(
  new THREE.BoxGeometry(3.38, 1.98, 0.1),
  new THREE.MeshStandardMaterial({ color: 0x11161d, roughness: 0.5, metalness: 0.35 }),
);
screenGroup.add(frame);

const video = document.createElement("video");
video.playsInline = true;
video.autoplay = true;
video.muted = true;
video.setAttribute("playsinline", "");

const standby = new THREE.MeshBasicMaterial({ color: 0x111820, toneMapped: false });
const videoPlane = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.8), standby);
videoPlane.position.z = 0.056;
screenGroup.add(videoPlane);

const statusEl = document.querySelector("#status");
const signalEl = document.querySelector("#signal");
let pc = null;
let localStream = null;
let videoTexture = null;
let lastSignalUrl = "";

function status(message, level = "info") {
  statusEl.textContent = message;
  statusEl.dataset.level = level;
}

function encodeSignal(desc) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(desc))));
}
function decodeSignal(input) {
  const trimmed = input.trim();
  const fromUrl = (() => {
    try {
      const url = new URL(trimmed);
      return url.hash.match(/^#(offer|answer)=(.+)$/)?.[2] || url.searchParams.get("signal");
    } catch { return null; }
  })();
  const raw = fromUrl || trimmed.replace(/^#(?:offer|answer)=/, "");
  try {
    return JSON.parse(raw);
  } catch {
    return JSON.parse(decodeURIComponent(escape(atob(raw))));
  }
}

async function waitIceComplete(peer) {
  if (peer.iceGatheringState === "complete") return;
  await new Promise((resolve) => {
    const listener = () => {
      if (peer.iceGatheringState === "complete") {
        peer.removeEventListener("icegatheringstatechange", listener);
        resolve();
      }
    };
    peer.addEventListener("icegatheringstatechange", listener);
    setTimeout(resolve, 5000);
  });
}

function setRemoteVideo(stream) {
  video.srcObject = stream;
  void video.play().catch(() => {});
  if (videoTexture) videoTexture.dispose();
  videoTexture = new THREE.VideoTexture(video);
  videoTexture.colorSpace = THREE.SRGBColorSpace;
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  videoPlane.material = new THREE.MeshBasicMaterial({ map: videoTexture, toneMapped: false, side: THREE.DoubleSide });
  status("Remote video connected. Enter XR and verify continuous motion.");
}

function createPeer() {
  if (pc) pc.close();
  pc = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });
  pc.addEventListener("connectionstatechange", () => status(`Peer: ${pc.connectionState}`));
  pc.addEventListener("track", (event) => setRemoteVideo(event.streams[0] || new MediaStream([event.track])));
  return pc;
}

async function hostScreen() {
  if (!window.isSecureContext) {
    status("Screen capture requires HTTPS or localhost.", "warn");
    return;
  }
  try {
    localStream?.getTracks().forEach((track) => track.stop());
    localStream = await navigator.mediaDevices.getDisplayMedia({ video: { frameRate: { ideal: 30, max: 60 } }, audio: false });
    const peer = createPeer();
    localStream.getTracks().forEach((track) => peer.addTrack(track, localStream));
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    await waitIceComplete(peer);
    const encoded = encodeSignal(peer.localDescription);
    signalEl.value = encoded;
    lastSignalUrl = `${location.origin}${location.pathname}#offer=${encoded}`;
    status("Offer ready. Copy Signal Link and open it on Vision Pro.");
  } catch (error) {
    console.error(error);
    status(`Host failed: ${error?.message || error}`, "error");
  }
}

async function joinOffer() {
  try {
    const hashOffer = location.hash.startsWith("#offer=") ? location.hash.slice(7) : "";
    const desc = decodeSignal(hashOffer || signalEl.value);
    if (desc.type !== "offer") throw new Error("Not an SDP offer");
    const peer = createPeer();
    await peer.setRemoteDescription(desc);
    status("Offer loaded. Click Create Answer.");
  } catch (error) {
    console.error(error);
    status(`Join failed: ${error?.message || error}`, "error");
  }
}

async function createAnswer() {
  try {
    if (!pc?.remoteDescription) await joinOffer();
    if (!pc?.remoteDescription) return;
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    await waitIceComplete(pc);
    const encoded = encodeSignal(pc.localDescription);
    signalEl.value = encoded;
    lastSignalUrl = `${location.origin}${location.pathname}#answer=${encoded}`;
    status("Answer ready. Send this Answer Link back to the desktop host.");
  } catch (error) {
    console.error(error);
    status(`Answer failed: ${error?.message || error}`, "error");
  }
}

async function applyAnswer() {
  try {
    const hashAnswer = location.hash.startsWith("#answer=") ? location.hash.slice(8) : "";
    const desc = decodeSignal(hashAnswer || signalEl.value);
    if (desc.type !== "answer") throw new Error("Not an SDP answer");
    if (!pc) throw new Error("Create the host offer first in this tab");
    await pc.setRemoteDescription(desc);
    status("Answer applied. Waiting for peer connection…");
  } catch (error) {
    console.error(error);
    status(`Apply failed: ${error?.message || error}`, "error");
  }
}

function resetScene() {
  screenGroup.position.set(0, 1.75, 0.05);
  screenGroup.quaternion.identity();
  camera.position.set(0, 1.65, 5.2);
  controls.target.set(0, 1.25, 0);
  controls.update();
  status("Scene reset.");
}

function screenAhead() {
  const p = new THREE.Vector3();
  const q = new THREE.Quaternion();
  const forward = new THREE.Vector3(0, 0, -1);
  camera.getWorldPosition(p);
  camera.getWorldQuaternion(q);
  forward.applyQuaternion(q);
  screenGroup.position.copy(p).addScaledVector(forward, 2.2);
  screenGroup.quaternion.copy(q);
  status("16:9 screen placed 2.2 m ahead of current view.");
}

function stopAll() {
  localStream?.getTracks().forEach((track) => track.stop());
  localStream = null;
  pc?.close();
  pc = null;
  video.srcObject = null;
  if (videoTexture) videoTexture.dispose();
  videoPlane.material = standby;
  status("Stopped.");
}

document.querySelector("#host").addEventListener("click", hostScreen);
document.querySelector("#join").addEventListener("click", joinOffer);
document.querySelector("#make-answer").addEventListener("click", createAnswer);
document.querySelector("#apply-answer").addEventListener("click", applyAnswer);
document.querySelector("#copy-link").addEventListener("click", async () => {
  const value = lastSignalUrl || location.href;
  try { await navigator.clipboard.writeText(value); status("Signal link copied."); }
  catch { signalEl.value = value; status("Clipboard blocked; copy the link from the text box.", "warn"); }
});
document.querySelector("#reset").addEventListener("click", resetScene);
document.querySelector("#screen-ahead").addEventListener("click", screenAhead);
document.querySelector("#stop").addEventListener("click", stopAll);

const vrButton = VRButton.createButton(renderer, { optionalFeatures: ["hand-tracking", "local-floor"] });
vrButton.style.display = "none";
document.body.appendChild(vrButton);
document.querySelector("#enter-xr").addEventListener("click", () => vrButton.click());

if (location.hash.startsWith("#offer=")) {
  signalEl.value = location.hash.slice(7);
  status("Offer detected in URL. Click Join Offer, then Create Answer.");
} else if (location.hash.startsWith("#answer=")) {
  signalEl.value = location.hash.slice(8);
  status("Answer detected in URL. Return to the original host tab to apply it.");
}

renderer.setAnimationLoop(() => {
  controls.update();
  renderer.render(scene, camera);
});

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
