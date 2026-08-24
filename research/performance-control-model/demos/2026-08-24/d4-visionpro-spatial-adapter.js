import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';

const BPM = 128;
const BEAT = 60 / BPM;
const STEP = BEAT / 4;
const LOOK = 0.12;
const BAR_STEPS = 16;
const CAPSULE_STEPS = 32;
const MAX_VOICES = 32;

const FAMILY = [
  ['ROUTE', 50], ['FIELD', 38], ['ORBIT', 69], ['REWIND', 74],
  ['CELLS', 62], ['PARTITION', 50], ['SCAN', 65], ['DROP', 38]
];
const VARS = [
  ['SPARSE',16,3,0], ['SHIFT',15,4,2], ['SPLIT',12,5,1], ['BROKEN',16,6,5],
  ['DRIFT',20,7,3], ['DENSE',14,9,4], ['BURST',8,5,0], ['LONG',18,8,7]
];

const el = id => document.getElementById(id);
const stage = el('stage');
const status = el('status');
const xrEl = el('xr');
const handsEl = el('hands');
const nearEl = el('near');
const selEl = el('sel');
const motionEl = el('motion');
const spaceEl = el('space');
const actionEl = el('action');
const familyButtons = el('familyButtons');

let ac = null;
let master = null;
let comp = null;
let noiseBuffer = null;
let timer = null;
let nextStepTime = 0;
let globalStep = 0;
let voices = 0;
let running = false;
let ground = true;
let selectedFamily = 0;
let xrCentered = false;
let recenterRequested = false;
let gestureEnergy = 0;
let spaceAmount = 0.5;
let bothCooldown = 0;
let effects = [];

const pinchState = { left:false, right:false };
const lastPos = { left:null, right:null };
const lastTime = { left:0, right:0 };
const trails = { left:[], right:[] };

function spreadPattern(len, hits, rot) {
  const out = Array(len).fill(0);
  for (let i = 0; i < len; i++) {
    const a = Math.floor(i * hits / len);
    const b = Math.floor((i + 1) * hits / len);
    if (a !== b) out[(i + rot) % len] = 1;
  }
  return out;
}

const families = FAMILY.map((d, fi) => ({
  name: d[0],
  base: d[1],
  variations: VARS.map((p, vi) => {
    const len = p[1];
    const hits = Math.min(len, p[2] + (fi % 3 === 0 && vi > 4 ? 1 : 0));
    const rot = (p[3] + fi * 2 + vi) % len;
    return { name:p[0], length:len, hits, rot, pattern:spreadPattern(len, hits, rot) };
  }),
  lane: { on:false, evolve:true, current:0, prob:0.72, cycleBars:2 },
  pulse: 0
}));

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020202);
scene.fog = new THREE.Fog(0x020202, 2.2, 5);

const camera = new THREE.PerspectiveCamera(62, 1, 0.01, 20);
camera.position.set(0, 1.55, 2.5);

const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.xr.enabled = true;
renderer.xr.setReferenceSpaceType('local-floor');
stage.prepend(renderer.domElement);

scene.add(new THREE.HemisphereLight(0xffffff, 0x111111, 2));
const key = new THREE.DirectionalLight(0xffffff, 2.3);
key.position.set(1,3,2);
scene.add(key);
scene.add(new THREE.GridHelper(5,10,0x242424,0x101010));

const controlRoot = new THREE.Group();
scene.add(controlRoot);
controlRoot.position.set(0,1.36,-0.78);

const centerMark = new THREE.Mesh(
  new THREE.RingGeometry(0.028,0.038,24),
  new THREE.MeshBasicMaterial({ color:0x777777, side:THREE.DoubleSide })
);
centerMark.rotation.x = Math.PI / 2;
controlRoot.add(centerMark);

const parentGeo = new THREE.SphereGeometry(0.065,22,14);
const childGeo = new THREE.SphereGeometry(0.022,14,9);
const parents = [];
const children = [];
const parentLayout = [
  [-.28,.18,.02],[-.09,.21,-.02],[.10,.20,-.02],[.29,.16,.02],
  [-.27,-.10,.02],[-.09,-.14,-.02],[.10,-.13,-.02],[.29,-.09,.02]
];

FAMILY.forEach((d, i) => {
  const m = new THREE.Mesh(
    parentGeo,
    new THREE.MeshStandardMaterial({ color:0x555555, roughness:.38, emissive:0x020202 })
  );
  m.position.set(...parentLayout[i]);
  m.userData.base = new THREE.Vector3(...parentLayout[i]);
  m.userData.fi = i;
  controlRoot.add(m);
  parents.push(m);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(.082,.003,8,48),
    new THREE.MeshBasicMaterial({ color:0x303030 })
  );
  ring.rotation.x = Math.PI / 2;
  m.add(ring);
});

for (let i = 0; i < 8; i++) {
  const m = new THREE.Mesh(
    childGeo,
    new THREE.MeshStandardMaterial({ color:0x8a8a8a, roughness:.32, emissive:0x050505 })
  );
  m.visible = false;
  m.userData.vi = i;
  controlRoot.add(m);
  children.push(m);
}

const pointerGeo = new THREE.SphereGeometry(.014,12,8);
const pointerMat = new THREE.MeshBasicMaterial({ color:0xffffff });
const pointers = {
  left: new THREE.Mesh(pointerGeo, pointerMat),
  right: new THREE.Mesh(pointerGeo, pointerMat)
};
pointers.left.visible = pointers.right.visible = false;
scene.add(pointers.left, pointers.right);

function makeTrailLine() {
  const line = new THREE.Line(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({ color:0x777777, transparent:true, opacity:.55 })
  );
  scene.add(line);
  return line;
}
const trailLine = { left:makeTrailLine(), right:makeTrailLine() };
const linkLine = new THREE.Line(
  new THREE.BufferGeometry(),
  new THREE.LineBasicMaterial({ color:0xb0b0b0, transparent:true, opacity:.38 })
);
linkLine.visible = false;
scene.add(linkLine);

document.body.appendChild(VRButton.createButton(renderer, {
  optionalFeatures:['hand-tracking','local-floor']
}));

FAMILY.forEach((d, i) => {
  const b = document.createElement('button');
  b.addEventListener('click', () => {
    selectedFamily = i;
    triggerCapsule(i, 'desktop');
  });
  familyButtons.appendChild(b);
});

async function startAudio() {
  if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)();
  if (ac.state === 'suspended') await ac.resume();
  if (!master) {
    master = ac.createGain();
    master.gain.value = .7;
    comp = ac.createDynamicsCompressor();
    comp.threshold.value = -12;
    comp.ratio.value = 5;
    comp.attack.value = .004;
    comp.release.value = .16;
    master.connect(comp).connect(ac.destination);
    noiseBuffer = makeNoiseBuffer();
  }
  running = true;
  nextStepTime = ac.currentTime + .08;
  globalStep = 0;
  if (timer) clearInterval(timer);
  timer = setInterval(scheduler, 20);
  status.textContent = 'AUDIO READY · ENTER XR';
}

function scheduler() {
  if (!ac || !running) return;
  while (nextStepTime < ac.currentTime + LOOK) {
    scheduleGround(globalStep, nextStepTime);
    families.forEach((fam, fi) => scheduleLane(fi, fam, globalStep, nextStepTime));
    nextStepTime += STEP;
    globalStep++;
  }
}

function scheduleGround(step, t) {
  if (!ground) return;
  const s = step % 16;
  if (s === 0 || s === 8) kick(t, .06);
  if (s === 4 || s === 12) noiseHit(t, .024, .0035, 6400);
  if (s % 4 === 2) noiseHit(t, .016, .002, 9000);
  if (s === 0) {
    tone(38,t,.7,.008,'sine',600);
    tone(45,t,.5,.005,'triangle',900);
  }
}

function scheduleLane(fi, fam, step, t) {
  if (!fam.lane.on) return;
  const v = fam.variations[fam.lane.current];
  const local = step % v.length;
  if (v.pattern[local] && Math.random() < fam.lane.prob) {
    playFamily(fi,t,local,v,.65);
    fam.pulse = 1;
  }
  if (step > 0 && step % (BAR_STEPS * fam.lane.cycleBars) === 0 && fam.lane.evolve) {
    fam.lane.current = (fam.lane.current + 1) % 8;
    updateDesktopButtons();
    actionEl.textContent = `${fam.name} EVOLVE → V${fam.lane.current + 1}`;
  }
}

function nextGrid() {
  if (!ac) return 0;
  return nextStepTime + Math.max(0, Math.ceil((ac.currentTime - nextStepTime) / (STEP * 2))) * STEP * 2;
}

function triggerCapsule(fi, source) {
  if (!ac || !running) return;
  const fam = families[fi];
  const v = fam.variations[fam.lane.current];
  const t0 = nextGrid();
  for (let k = 0; k < CAPSULE_STEPS; k++) {
    const local = k % v.length;
    if (v.pattern[local]) playFamily(fi, t0 + k * STEP, local, v, 1);
  }
  spawnEffect(fi, fam.lane.current);
  actionEl.textContent = `${fam.name} V${fam.lane.current + 1} · ${source}`;
  status.textContent = `CAPSULE ${fam.name} / V${fam.lane.current + 1}`;
}

function midi(n) { return 440 * Math.pow(2, (n - 69) / 12); }
function guard() { if (voices >= MAX_VOICES) return false; voices++; return true; }
function ended(node) { node.onended = () => voices = Math.max(0, voices - 1); }

function tone(n,t,d=.15,gain=.02,type='triangle',cut=2400) {
  if (!guard()) return;
  const o = ac.createOscillator(), f = ac.createBiquadFilter(), g = ac.createGain();
  o.type = type; o.frequency.value = midi(n);
  f.type = 'lowpass'; f.frequency.value = cut + gestureEnergy * 2200; f.Q.value = 2;
  g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(gain,t+.006); g.gain.exponentialRampToValueAtTime(.0001,t+d);
  o.connect(f).connect(g).connect(master); o.start(t); o.stop(t+d+.02); ended(o);
}

function fm(n,t,d=.1,gain=.02,ratio=3,index=150) {
  if (!guard()) return;
  const carrier = ac.createOscillator(), mod = ac.createOscillator(), mg = ac.createGain(), g = ac.createGain();
  const f = midi(n);
  carrier.frequency.value = f; mod.frequency.value = f * ratio;
  mg.gain.setValueAtTime(index + gestureEnergy * 260,t); mg.gain.exponentialRampToValueAtTime(2,t+d);
  mod.connect(mg).connect(carrier.frequency);
  g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(gain,t+.004); g.gain.exponentialRampToValueAtTime(.0001,t+d);
  carrier.connect(g).connect(master); mod.start(t); carrier.start(t); mod.stop(t+d+.02); carrier.stop(t+d+.02); ended(carrier);
}

function gliss(n,t,d=.22,gain=.02,down=true) {
  if (!guard()) return;
  const o = ac.createOscillator(), g = ac.createGain();
  o.type = 'sawtooth';
  o.frequency.setValueAtTime(midi(n + (down ? 7 : -7)), t);
  o.frequency.exponentialRampToValueAtTime(midi(n + (down ? -7 : 7)), t + d);
  g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(gain,t+.008); g.gain.exponentialRampToValueAtTime(.0001,t+d);
  o.connect(g).connect(master); o.start(t); o.stop(t+d+.02); ended(o);
}

function makeNoiseBuffer() {
  const n = ac.sampleRate * 2;
  const b = ac.createBuffer(1,n,ac.sampleRate);
  const a = b.getChannelData(0);
  for (let i=0;i<n;i++) a[i] = Math.random()*2-1;
  return b;
}

function noiseHit(t,d=.04,gain=.008,freq=2500) {
  if (!guard()) return;
  const s = ac.createBufferSource(), bp = ac.createBiquadFilter(), g = ac.createGain();
  s.buffer = noiseBuffer;
  bp.type = 'bandpass'; bp.frequency.value = freq + gestureEnergy * 3200; bp.Q.value = 3;
  g.gain.setValueAtTime(gain,t); g.gain.exponentialRampToValueAtTime(.0001,t+d);
  s.connect(bp).connect(g).connect(master); s.start(t); s.stop(t+d+.01); ended(s);
}

function kick(t,gain=.09) {
  if (!guard()) return;
  const o = ac.createOscillator(), g = ac.createGain();
  o.frequency.setValueAtTime(150,t); o.frequency.exponentialRampToValueAtTime(44,t+.09);
  g.gain.setValueAtTime(gain,t); g.gain.exponentialRampToValueAtTime(.0001,t+.14);
  o.connect(g).connect(master); o.start(t); o.stop(t+.16); ended(o);
}

function playFamily(fi,t,step,v,scale=1) {
  const base = families[fi].base;
  switch (fi) {
    case 0: fm(base+[0,3,7,10][step%4],t,.08,.022*scale,2.2+(step%3)*.45,90+v.hits*8); break;
    case 1: tone(base+[0,3,7,10][step%4],t,.30,.015*scale,'sawtooth',500+v.hits*70); break;
    case 2: fm(base+[0,3,5,8,12][step%5],t,.14,.020*scale,3.5,170+v.rot*7); break;
    case 3: gliss(base-(step%5)*2,t,.22,.018*scale,true); break;
    case 4: noiseHit(t,.024,.008*scale,1800+((step*713)%6200)); if(step%3===0) fm(base+[0,7,12][step%3],t,.05,.01*scale,4.1,220); break;
    case 5: tone(base+[0,5,7,12][step%4],t,.17,.016*scale,'square',1800); tone(base+7+[0,3,5][step%3],t,.14,.008*scale,'triangle',2600); break;
    case 6: gliss(base+(step%7)*2,t,.065,.012*scale,false); noiseHit(t,.028,.0035*scale,5200+v.rot*140); break;
    case 7: kick(t,.075*scale); if(step%2===0) noiseHit(t,.16,.012*scale,1000+v.hits*120); if(step%4===0) tone(base,t,.45,.015*scale,'sine',480); break;
  }
}

function updateChildPositions(ts=0) {
  const p = parents[selectedFamily];
  for (let vi=0;vi<8;vi++) {
    const a = vi/8*Math.PI*2 + ts*.00025;
    const rad = .115 + (vi%2)*.012;
    const child = children[vi];
    child.visible = true;
    child.position.set(p.position.x+Math.cos(a)*rad, p.position.y+Math.sin(a)*rad, p.position.z+.015*Math.sin(a*2));
    child.material.color.set(vi===families[selectedFamily].lane.current ? 0xe0e0e0 : 0x777777);
    child.scale.setScalar(vi===families[selectedFamily].lane.current ? 1.3 : 1);
  }
}

function updateDesktopButtons() {
  [...familyButtons.children].forEach((b,i) => {
    const f = families[i];
    b.textContent = `${f.name} · V${f.lane.current+1}`;
    b.classList.toggle('on',f.lane.on);
  });
}

function toggleLane(fi,source) {
  const f = families[fi];
  f.lane.on = !f.lane.on;
  selectedFamily = fi;
  actionEl.textContent = `${f.name} LANE ${f.lane.on?'ON':'OFF'} · ${source}`;
  updateDesktopButtons();
}

function setVariation(fi,vi,source) {
  selectedFamily = fi;
  families[fi].lane.current = vi;
  selEl.textContent = `SELECT ${families[fi].name} V${vi+1} ${families[fi].variations[vi].name}`;
  triggerCapsule(fi,source);
  updateDesktopButtons();
}

function spawnEffect(fi,vi) {
  const p = parents[fi];
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(.07+.006*vi,.004,8,48),
    new THREE.MeshBasicMaterial({ color:0xd0d0d0,transparent:true,opacity:.72 })
  );
  ring.position.copy(p.position);
  ring.rotation.x = Math.PI/2;
  controlRoot.add(ring);
  effects.push({ mesh:ring,born:performance.now() });
}

function recenterFromFrame(frame,ref) {
  const pose = frame.getViewerPose(ref);
  if (!pose) return;
  const p = pose.transform.position;
  const q = pose.transform.orientation;
  const quat = new THREE.Quaternion(q.x,q.y,q.z,q.w);
  const e = new THREE.Euler().setFromQuaternion(quat,'YXZ');
  const yawQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(0,e.y,0));
  const forward = new THREE.Vector3(0,0,-1).applyQuaternion(yawQ).normalize();
  controlRoot.position.set(p.x+forward.x*.70,p.y-.18,p.z+forward.z*.70);
  controlRoot.rotation.set(0,e.y,0);
  xrCentered = true;
  recenterRequested = false;
  status.textContent = 'RECENTERED · 0.70m AHEAD';
}

function updateTrail(side) {
  const pts = trails[side].map(x=>x.p);
  trailLine[side].geometry.setFromPoints(pts);
  trailLine[side].visible = pts.length > 1;
}

function nearestTarget(pos) {
  let kind='parent', index=-1, d=.18;
  parents.forEach((n,i)=>{
    const w = new THREE.Vector3();
    n.getWorldPosition(w);
    const dd = w.distanceTo(pos);
    if (dd < d) { d=dd; index=i; kind='parent'; }
  });
  children.forEach((n,i)=>{
    if (!n.visible) return;
    const w = new THREE.Vector3();
    n.getWorldPosition(w);
    const dd = w.distanceTo(pos);
    if (dd < d && dd < .085) { d=dd; index=i; kind='child'; }
  });
  return { kind,index,d };
}

function processHand(frame,ref,source,now) {
  const side = source.handedness === 'left' ? 'left' : 'right';
  const hand = source.hand;
  const index = hand?.get('index-finger-tip');
  const thumb = hand?.get('thumb-tip');
  if (!index || !thumb) return null;
  const ip = frame.getJointPose(index,ref), tp = frame.getJointPose(thumb,ref);
  if (!ip || !tp) return null;

  const p = ip.transform.position;
  const pos = new THREE.Vector3(p.x,p.y,p.z);
  pointers[side].visible = true;
  pointers[side].position.copy(pos);

  const dt = Math.max(16, now-lastTime[side]) / 1000;
  if (lastPos[side]) gestureEnergy = Math.max(gestureEnergy*.84, Math.min(1,lastPos[side].distanceTo(pos)/dt*1.25));
  lastPos[side] = pos.clone();
  lastTime[side] = now;
  trails[side].push({p:pos.clone(),life:1});
  trails[side] = trails[side].slice(-22);
  updateTrail(side);

  const target = nearestTarget(pos);
  if (target.index >= 0 && target.kind === 'parent') {
    selectedFamily = target.index;
    const prox = 1-target.d/.18;
    families[target.index].lane.prob = .35 + Math.max(0,prox)*.65;
    nearEl.textContent = `NEAR ${families[target.index].name} ${(target.d*100).toFixed(0)}cm · P ${families[target.index].lane.prob.toFixed(2)}`;
  } else if (target.index >= 0) {
    nearEl.textContent = `NEAR V${target.index+1} ${(target.d*100).toFixed(0)}cm`;
  }

  linkLine.visible = false;
  if (target.index >= 0) {
    const wp = new THREE.Vector3();
    (target.kind==='parent' ? parents[target.index] : children[target.index]).getWorldPosition(wp);
    linkLine.geometry.setFromPoints([pos,wp]);
    linkLine.visible = true;
  }

  const pd = Math.hypot(
    ip.transform.position.x-tp.transform.position.x,
    ip.transform.position.y-tp.transform.position.y,
    ip.transform.position.z-tp.transform.position.z
  );
  const pinching = pd < .028;
  if (pinching && !pinchState[side] && target.index >= 0) {
    if (target.kind === 'parent') toggleLane(target.index,`xr-${side}`);
    else setVariation(selectedFamily,target.index,`xr-${side}`);
  }
  pinchState[side] = pinching;
  return { pinching,pos,target };
}

async function checkXR() {
  if (!navigator.xr) { xrEl.textContent='XR NO API'; status.textContent='DESKTOP FALLBACK'; return; }
  try {
    const ok = await navigator.xr.isSessionSupported('immersive-vr');
    xrEl.textContent = ok ? 'XR READY' : 'XR UNSUPPORTED';
    status.textContent = ok ? 'XR READY · START AUDIO' : 'DESKTOP FALLBACK';
  } catch {
    xrEl.textContent='XR ERROR';
  }
}
checkXR();

el('audio').addEventListener('click',startAudio);
el('recenter').addEventListener('click',()=>recenterRequested=true);
el('nextVar').addEventListener('click',()=>{const f=families[selectedFamily];f.lane.current=(f.lane.current+1)%8;updateDesktopButtons();});
el('trigger').addEventListener('click',()=>triggerCapsule(selectedFamily,'desktop'));
el('allOff').addEventListener('click',()=>{families.forEach(f=>f.lane.on=false);updateDesktopButtons();});
el('allOn').addEventListener('click',()=>{families.forEach((f,i)=>{f.lane.on=true;f.lane.evolve=true;f.lane.cycleBars=2+i%4;});updateDesktopButtons();});
el('ground').addEventListener('click',e=>{ground=!ground;e.target.textContent=`GROUND ${ground?'ON':'OFF'}`;});
el('thin').addEventListener('click',()=>{families.forEach((f,i)=>{if(i%2===0&&i!==selectedFamily)f.lane.on=false;});updateDesktopButtons();});
el('resetSel').addEventListener('click',()=>{families[selectedFamily].lane.current=0;updateDesktopButtons();});
el('panic').addEventListener('click',()=>{families.forEach(f=>f.lane.on=false);effects.forEach(e=>controlRoot.remove(e.mesh));effects=[];updateDesktopButtons();status.textContent='CLEAR';});

renderer.setAnimationLoop((ts,frame)=>{
  gestureEnergy *= .965;
  families.forEach((f,i)=>{
    f.pulse *= .88;
    const n=parents[i], b=n.userData.base;
    n.position.x=b.x+Math.sin(ts*.0005+i*1.4)*.015;
    n.position.y=b.y+Math.sin(ts*.00075+i)*.022;
    n.position.z=b.z+Math.cos(ts*.00045+i*.8)*.012;
    n.scale.setScalar(1+f.pulse*.22+(f.lane.on ? .08 : 0));
    n.material.color.set(f.lane.on ? 0xb0b0b0 : (i===selectedFamily ? 0x777777 : 0x4a4a4a));
    n.material.emissive.setScalar(f.lane.on ? .06 : .005);
  });

  updateChildPositions(ts);
  pointers.left.visible = pointers.right.visible = false;
  linkLine.visible = false;

  let hc=0;
  const results=[];
  if (frame && renderer.xr.isPresenting) {
    const ref=renderer.xr.getReferenceSpace(), session=renderer.xr.getSession();
    if (ref) {
      if (!xrCentered || recenterRequested) recenterFromFrame(frame,ref);
      if (session) {
        for (const source of session.inputSources) {
          if (!source.hand) continue;
          const r=processHand(frame,ref,source,ts);
          if (r) { hc++; results.push(r); }
        }
      }
      if (results.length===2) {
        spaceAmount=Math.min(1,Math.max(0,(results[0].pos.distanceTo(results[1].pos)-.18)/.55));
        if (results[0].pinching&&results[1].pinching&&ts>bothCooldown) {
          recenterFromFrame(frame,ref);
          bothCooldown=ts+900;
        }
      }
    }
  }

  handsEl.textContent=`HANDS ${hc}`;
  motionEl.textContent=`MOVE ${gestureEnergy.toFixed(2)}`;
  spaceEl.textContent=`SPACE ${spaceAmount.toFixed(2)}`;
  selEl.textContent=`SELECT ${families[selectedFamily].name} · V${families[selectedFamily].lane.current+1} ${families[selectedFamily].variations[families[selectedFamily].lane.current].name}`;
  if (master&&ac) master.gain.setTargetAtTime(.55+spaceAmount*.17,ac.currentTime,.06);

  for (const side of ['left','right']) {
    trails[side].forEach(x=>x.life-=.06);
    trails[side]=trails[side].filter(x=>x.life>0);
    updateTrail(side);
  }

  effects=effects.filter(e=>{
    const p=(ts-e.born)/3600;
    e.mesh.scale.setScalar(1+p*5);
    e.mesh.material.opacity=Math.max(0,.72*(1-p));
    e.mesh.rotation.z+=.012;
    if (p>=1) {
      controlRoot.remove(e.mesh);
      e.mesh.geometry.dispose();
      e.mesh.material.dispose();
      return false;
    }
    return true;
  });

  renderer.render(scene,camera);
});

function resize() {
  const r=stage.getBoundingClientRect();
  renderer.setSize(r.width,r.height,false);
  camera.aspect=r.width/r.height;
  camera.updateProjectionMatrix();
}
addEventListener('resize',resize);
resize();
updateDesktopButtons();
renderer.xr.addEventListener('sessionstart',()=>{xrCentered=false;status.textContent='XR SESSION · AUTO RECENTER';});
renderer.xr.addEventListener('sessionend',()=>{xrCentered=false;status.textContent='XR ENDED · DESKTOP READY';});
