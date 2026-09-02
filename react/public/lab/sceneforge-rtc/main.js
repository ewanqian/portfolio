import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { VRButton } from "three/addons/webxr/VRButton.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Peer } from "peerjs";

const canvas = document.querySelector("#stage");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.xr.enabled = true;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050608);
scene.fog = new THREE.Fog(0x050608, 10, 34);
const camera = new THREE.PerspectiveCamera(54, innerWidth / innerHeight, 0.05, 100);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 1.1;
controls.maxDistance = 30;

scene.add(new THREE.HemisphereLight(0xcbdcff, 0x10131a, 1.7));
const key = new THREE.DirectionalLight(0xffffff, 2.4);
key.position.set(4, 8, 5);
scene.add(key);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40),
  new THREE.MeshStandardMaterial({ color: 0x0d1015, roughness: 0.94, metalness: 0.04 }),
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);
const grid = new THREE.GridHelper(40, 80, 0x34404d, 0x171d25);
grid.position.y = 0.003;
scene.add(grid);

const venueGroup = new THREE.Group();
scene.add(venueGroup);
const screenGroup = new THREE.Group();
scene.add(screenGroup);

const video = document.createElement("video");
video.playsInline = true;
video.autoplay = true;
video.muted = true;
video.setAttribute("playsinline", "");
let videoTexture = null;
const standby = new THREE.MeshBasicMaterial({ color: 0x111820, toneMapped: false, side: THREE.DoubleSide });
let videoPlane = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.8), standby);
let frame = new THREE.Mesh(
  new THREE.BoxGeometry(3.38, 1.98, 0.1),
  new THREE.MeshStandardMaterial({ color: 0x11161d, roughness: 0.5, metalness: 0.35 }),
);
screenGroup.add(frame, videoPlane);
videoPlane.position.z = 0.056;

const $ = (selector) => document.querySelector(selector);
const statusEl = $("#status");
const roomEl = $("#room");
const venueEl = $("#venue");
const venueMetaEl = $("#venue-meta");
const recentEl = $("#recent");
const recentWrapEl = $("#recent-wrap");
const hudVenueEl = $("#hud-venue");
const hudScreenEl = $("#hud-screen");
const hudPeerEl = $("#hud-peer");
const venueToolsEl = $("#venue-tools");

const FALLBACK_VENUES = [
  { id: "quick-16x9", name: "Quick 16:9 Stage", modelUrl: null, screen: { widthM: 3.2, heightM: 1.8, resolution: [1920, 1080], position: [0, 1.75, 0.05] }, camera: [0, 1.65, 5.2], stage: { widthM: 5.4, depthM: 2.4, type: "blackbox" } },
  { id: "wide-led-32x9", name: "Wide LED 32:9", modelUrl: null, screen: { widthM: 6.4, heightM: 1.8, resolution: [3840, 1080], position: [0, 1.85, 0.05] }, camera: [0, 1.7, 7.8], stage: { widthM: 8.6, depthM: 3.2, type: "wide" } },
  { id: "gallery-4k", name: "Gallery Wall 4K", modelUrl: null, screen: { widthM: 4.8, heightM: 2.7, resolution: [3840, 2160], position: [0, 2.05, -0.05] }, camera: [0, 1.65, 7.2], stage: { widthM: 7.2, depthM: 4.2, type: "gallery" } },
];

let venues = FALLBACK_VENUES;
let currentVenue = venues[0];
let mode = "quick";
let peer = null;
let peerRole = "idle";
let localStream = null;
let activeCalls = new Map();
const viewerIds = new Set();
const gltfLoader = new GLTFLoader();

function status(message, level = "info") {
  statusEl.textContent = message;
  statusEl.dataset.level = level;
}

function normalizeRoom(value) {
  return String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
}
function newRoomCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  crypto.getRandomValues(new Uint8Array(6)).forEach((n) => { out += alphabet[n % alphabet.length]; });
  return out;
}
function hostPeerId(room) {
  return `sceneforge-${normalizeRoom(room).toLowerCase()}`;
}

function recentRooms() {
  try { return JSON.parse(localStorage.getItem("sceneforge.recentRooms") || "[]"); }
  catch { return []; }
}
function rememberRoom(room, venueId = currentVenue.id) {
  const code = normalizeRoom(room);
  if (!code) return;
  const next = [{ room: code, venueId, at: Date.now() }, ...recentRooms().filter((item) => item.room !== code)].slice(0, 6);
  localStorage.setItem("sceneforge.recentRooms", JSON.stringify(next));
  renderRecent();
}
function renderRecent() {
  const items = recentRooms();
  recentEl.innerHTML = "";
  recentWrapEl.classList.toggle("hide", !items.length);
  for (const item of items) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = item.room;
    button.title = `Open recent room ${item.room}`;
    button.addEventListener("click", () => {
      roomEl.value = item.room;
      if (venues.some((v) => v.id === item.venueId)) {
        venueEl.value = item.venueId;
        applyVenueById(item.venueId);
      }
      joinRoom();
    });
    recentEl.appendChild(button);
  }
}

function box(parent, x, y, z, sx, sy, sz, color = 0x141922) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(sx, sy, sz),
    new THREE.MeshStandardMaterial({ color, roughness: 0.8, metalness: 0.18 }),
  );
  mesh.position.set(x, y, z);
  parent.add(mesh);
  return mesh;
}
function clearVenue() {
  while (venueGroup.children.length) {
    const child = venueGroup.children.pop();
    child.traverse?.((node) => {
      node.geometry?.dispose?.();
      if (Array.isArray(node.material)) node.material.forEach((m) => m.dispose?.());
      else node.material?.dispose?.();
    });
  }
}
function buildProceduralVenue(venue) {
  clearVenue();
  const width = venue.stage?.widthM || venue.screen.widthM + 2.2;
  const depth = venue.stage?.depthM || 2.8;
  const type = venue.stage?.type || "blackbox";
  box(venueGroup, 0, 0.18, 0.2, width, 0.36, depth, 0x0a0d12);
  if (type === "gallery") {
    box(venueGroup, 0, 2.2, -0.32, width + 1.2, 4.4, 0.18, 0x1c2027);
    box(venueGroup, -width / 2 - 0.6, 2.2, 1.6, 0.18, 4.4, 4.0, 0x151920);
    box(venueGroup, width / 2 + 0.6, 2.2, 1.6, 0.18, 4.4, 4.0, 0x151920);
  } else {
    const towerX = width / 2 + 0.38;
    box(venueGroup, -towerX, 1.7, 0.2, 0.22, 3.4, 0.22, 0x202732);
    box(venueGroup, towerX, 1.7, 0.2, 0.22, 3.4, 0.22, 0x202732);
    box(venueGroup, 0, 3.3, 0.2, width + 1.0, 0.2, 0.22, 0x202732);
    const lamps = Math.max(5, Math.round(width / 1.2));
    for (let i = 0; i < lamps; i += 1) {
      const x = THREE.MathUtils.lerp(-width * 0.4, width * 0.4, lamps === 1 ? 0.5 : i / (lamps - 1));
      box(venueGroup, x, 3.1, 0.05, 0.08, 0.42, 0.08, 0x3d4654);
    }
  }
}
async function loadVenueModel(url) {
  if (!url) return;
  try {
    const gltf = await gltfLoader.loadAsync(url);
    clearVenue();
    venueGroup.add(gltf.scene);
    status("Venue model loaded.");
  } catch (error) {
    console.error(error);
    status("Venue model failed; using procedural proxy.", "warn");
    buildProceduralVenue(currentVenue);
  }
}
function updateScreenGeometry(venue) {
  const { widthM, heightM, position } = venue.screen;
  videoPlane.geometry.dispose();
  frame.geometry.dispose();
  videoPlane.geometry = new THREE.PlaneGeometry(widthM, heightM);
  frame.geometry = new THREE.BoxGeometry(widthM + 0.18, heightM + 0.18, 0.1);
  videoPlane.position.z = 0.056;
  screenGroup.position.fromArray(position || [0, heightM / 2 + 0.25, 0]);
  screenGroup.quaternion.identity();
}
function updateVenueMeta(venue) {
  const [rw, rh] = venue.screen.resolution;
  const ratio = (venue.screen.widthM / venue.screen.heightM).toFixed(2);
  venueMetaEl.textContent = `${venue.screen.widthM.toFixed(2)} × ${venue.screen.heightM.toFixed(2)} m · ${rw} × ${rh} px · ratio ${ratio}`;
  hudVenueEl.textContent = venue.name;
  hudScreenEl.textContent = `${venue.screen.widthM.toFixed(2)} × ${venue.screen.heightM.toFixed(2)} m · ${rw} × ${rh}`;
}
function resetView() {
  camera.position.fromArray(currentVenue.camera || [0, 1.65, 5.2]);
  controls.target.copy(screenGroup.position);
  controls.target.y = Math.max(1, screenGroup.position.y - 0.25);
  controls.update();
}
function applyVenueById(id) {
  currentVenue = venues.find((venue) => venue.id === id) || venues[0];
  venueEl.value = currentVenue.id;
  updateScreenGeometry(currentVenue);
  buildProceduralVenue(currentVenue);
  if (currentVenue.modelUrl) loadVenueModel(currentVenue.modelUrl);
  updateVenueMeta(currentVenue);
  resetView();
}

async function loadVenueManifest() {
  try {
    const response = await fetch("./venues.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (Array.isArray(data) && data.length) venues = data;
  } catch (error) {
    console.warn("Venue manifest fallback", error);
  }
  venueEl.innerHTML = "";
  venues.forEach((venue) => {
    const option = document.createElement("option");
    option.value = venue.id;
    option.textContent = venue.name;
    venueEl.appendChild(option);
  });
  const requested = new URL(location.href).searchParams.get("venue");
  applyVenueById(venues.some((v) => v.id === requested) ? requested : venues[0].id);
}

async function setVideoStream(stream, source = "remote") {
  if (!stream) return;
  video.srcObject = stream;
  try { await video.play(); } catch (error) { console.warn("video.play", error); }
  videoTexture?.dispose();
  videoTexture = new THREE.VideoTexture(video);
  videoTexture.colorSpace = THREE.SRGBColorSpace;
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  videoPlane.material = new THREE.MeshBasicMaterial({ map: videoTexture, toneMapped: false, side: THREE.DoubleSide });
  status(source === "local" ? "Local screen is mapped to the 3D screen." : "Remote WebRTC stream is mapped to the 3D screen.");
}

async function captureScreen() {
  if (!window.isSecureContext || !navigator.mediaDevices?.getDisplayMedia) throw new Error("Screen sharing requires HTTPS and getDisplayMedia support");
  localStream?.getTracks().forEach((track) => track.stop());
  localStream = await navigator.mediaDevices.getDisplayMedia({ video: { frameRate: { ideal: 30, max: 60 } }, audio: false });
  localStream.getVideoTracks()[0]?.addEventListener("ended", () => {
    localStream = null;
    status("Screen sharing ended.", "warn");
  }, { once: true });
  await setVideoStream(localStream, "local");
  return localStream;
}

function closeRtc() {
  activeCalls.forEach((call) => call.close());
  activeCalls.clear();
  viewerIds.clear();
  peer?.destroy();
  peer = null;
  peerRole = "idle";
  hudPeerEl.textContent = "RTC idle";
}
function wirePeerErrors(instance) {
  instance.on("error", (error) => {
    console.error(error);
    const message = error?.type === "unavailable-id" ? "Room code is already hosted. Create another room." : `RTC: ${error?.type || error?.message || error}`;
    status(message, "error");
    hudPeerEl.textContent = "RTC error";
  });
  instance.on("disconnected", () => { hudPeerEl.textContent = `${peerRole} · signaling disconnected`; });
}
function callViewer(viewerId) {
  if (!peer || !localStream || !viewerId) return;
  activeCalls.get(viewerId)?.close?.();
  const call = peer.call(viewerId, localStream, { metadata: { role: "host", room: roomEl.value, venue: currentVenue.id } });
  activeCalls.set(viewerId, call);
  call.on("close", () => activeCalls.delete(viewerId));
  call.on("error", (error) => console.warn("media call", error));
}
function startCallsToViewers() {
  viewerIds.forEach((id) => callViewer(id));
}

function startHostPeer(room) {
  closeRtc();
  const code = normalizeRoom(room);
  roomEl.value = code;
  peerRole = "host";
  const instance = new Peer(hostPeerId(code), { debug: 1 });
  peer = instance;
  wirePeerErrors(instance);
  instance.on("open", () => {
    hudPeerEl.textContent = `HOST · ${code} · 0 viewer`;
    status(`Room ${code} is live. Open the room link on another browser.`);
  });
  instance.on("connection", (conn) => {
    const viewerId = conn.peer;
    viewerIds.add(viewerId);
    const refresh = () => { hudPeerEl.textContent = `HOST · ${code} · ${viewerIds.size} viewer${viewerIds.size === 1 ? "" : "s"}`; };
    conn.on("open", () => {
      refresh();
      if (localStream) callViewer(viewerId);
      else conn.send({ type: "waiting-for-screen" });
    });
    conn.on("data", (data) => { if (data?.type === "viewer-ready" && localStream) callViewer(viewerId); });
    conn.on("close", () => { viewerIds.delete(viewerId); activeCalls.get(viewerId)?.close?.(); activeCalls.delete(viewerId); refresh(); });
  });
}

function startViewerPeer(room) {
  closeRtc();
  const code = normalizeRoom(room);
  roomEl.value = code;
  peerRole = "viewer";
  const instance = new Peer(undefined, { debug: 1 });
  peer = instance;
  wirePeerErrors(instance);
  instance.on("call", (call) => {
    activeCalls.set(call.peer, call);
    if (call.metadata?.venue && venues.some((v) => v.id === call.metadata.venue)) applyVenueById(call.metadata.venue);
    call.answer();
    call.on("stream", (stream) => setVideoStream(stream, "remote"));
    call.on("close", () => activeCalls.delete(call.peer));
  });
  instance.on("open", (id) => {
    hudPeerEl.textContent = `VIEWER · ${code}`;
    const conn = instance.connect(hostPeerId(code), { reliable: true, metadata: { role: "viewer", venue: currentVenue.id } });
    conn.on("open", () => {
      conn.send({ type: "viewer-ready", viewerId: id });
      status(`Connected to room ${code}. Waiting for host screen…`);
    });
    conn.on("data", (data) => { if (data?.type === "waiting-for-screen") status("Host connected. Waiting for screen sharing…"); });
    conn.on("error", (error) => status(`Room connection failed: ${error?.message || error}`, "error"));
  });
}

function updateRoomUrl(room) {
  const url = new URL(location.href);
  url.searchParams.set("room", normalizeRoom(room));
  url.searchParams.set("venue", currentVenue.id);
  url.hash = "";
  history.replaceState(null, "", url);
  return url.toString();
}
async function hostRoom() {
  try {
    const code = normalizeRoom(roomEl.value) || newRoomCode();
    roomEl.value = code;
    await captureScreen();
    startHostPeer(code);
    rememberRoom(code);
    updateRoomUrl(code);
    startCallsToViewers();
  } catch (error) {
    console.error(error);
    status(`Share failed: ${error?.message || error}`, "error");
  }
}
async function localPreview() {
  try { await captureScreen(); }
  catch (error) { console.error(error); status(`Preview failed: ${error?.message || error}`, "error"); }
}
function joinRoom() {
  const code = normalizeRoom(roomEl.value);
  if (!code) { status("Enter a room code first.", "warn"); return; }
  roomEl.value = code;
  rememberRoom(code);
  updateRoomUrl(code);
  startViewerPeer(code);
}
function stopAll() {
  localStream?.getTracks().forEach((track) => track.stop());
  localStream = null;
  closeRtc();
  video.srcObject = null;
  videoTexture?.dispose();
  videoTexture = null;
  videoPlane.material = standby;
  status("Stopped.");
}
function setMode(next) {
  mode = next;
  $("#tab-quick").classList.toggle("active", mode === "quick");
  $("#tab-venue").classList.toggle("active", mode === "venue");
  venueToolsEl.classList.toggle("hide", mode !== "venue");
  if (mode === "quick") applyVenueById("quick-16x9");
}
function screenAhead() {
  const activeCamera = renderer.xr.isPresenting ? renderer.xr.getCamera(camera) : camera;
  const position = new THREE.Vector3();
  const orientation = new THREE.Quaternion();
  activeCamera.getWorldPosition(position);
  activeCamera.getWorldQuaternion(orientation);
  const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(orientation);
  screenGroup.position.copy(position).addScaledVector(forward, 2.2);
  screenGroup.quaternion.copy(orientation);
  status("Screen placed 2.2 m ahead of the current view.");
}

$("#host").addEventListener("click", hostRoom);
$("#preview").addEventListener("click", localPreview);
$("#join").addEventListener("click", joinRoom);
$("#stop").addEventListener("click", stopAll);
$("#new-room").addEventListener("click", () => { roomEl.value = newRoomCode(); status("New temporary room code created."); });
$("#copy-room").addEventListener("click", async () => {
  const code = normalizeRoom(roomEl.value) || newRoomCode();
  roomEl.value = code;
  const url = updateRoomUrl(code);
  rememberRoom(code);
  try { await navigator.clipboard.writeText(url); status("Room link copied."); }
  catch { status(url, "warn"); }
});
$("#screen-ahead").addEventListener("click", screenAhead);
$("#reset").addEventListener("click", () => { applyVenueById(currentVenue.id); status("View reset."); });
$("#tab-quick").addEventListener("click", () => setMode("quick"));
$("#tab-venue").addEventListener("click", () => setMode("venue"));
venueEl.addEventListener("change", () => { applyVenueById(venueEl.value); updateRoomUrl(roomEl.value || newRoomCode()); });
roomEl.addEventListener("input", () => { roomEl.value = normalizeRoom(roomEl.value); });

const vrButton = VRButton.createButton(renderer, { optionalFeatures: ["hand-tracking", "local-floor"] });
vrButton.style.display = "none";
document.body.appendChild(vrButton);
const externalXrButton = $("#enter-xr");
externalXrButton.addEventListener("click", () => vrButton.click());
(async () => {
  if (!navigator.xr) { externalXrButton.disabled = true; externalXrButton.textContent = "XR unavailable"; return; }
  try {
    const supported = await navigator.xr.isSessionSupported("immersive-vr");
    externalXrButton.disabled = !supported;
    externalXrButton.textContent = supported ? "Enter XR" : "XR unavailable";
  } catch {
    externalXrButton.disabled = true;
    externalXrButton.textContent = "XR unavailable";
  }
})();

await loadVenueManifest();
renderRecent();
const initialParams = new URL(location.href).searchParams;
const initialRoom = normalizeRoom(initialParams.get("room"));
roomEl.value = initialRoom || newRoomCode();
if (initialParams.get("venue") && venues.some((v) => v.id === initialParams.get("venue"))) {
  setMode("venue");
  applyVenueById(initialParams.get("venue"));
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
