const KEY_ORDER = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');

const MODES = {
  core: {
    title: '牛来 CORE',
    label: 'NIULAI CORE',
    hint: '按 A–Z 演奏 · TAB 切换到 初音牛来 · ESC 重置',
    bpm: 128,
    voicePitch: 1.05,
    voiceRate: 1.0,
    palette: ['#f5f0df', '#9ddf53', '#e7ba48', '#7d9c54'],
    labels: {
      Q:'牛', W:'来', E:'牛来', R:'欢迎', T:'你来了', Y:'不一样', U:'一样', I:'勇敢', O:'将来', P:'今天',
      A:'KICK', S:'SNARE', D:'HAT', F:'CLAP', G:'BASS', H:'BASS+', J:'BELL', K:'PAD', L:'CHORD',
      Z:'汪', X:'咚', C:'哒', V:'啪', B:'啵', N:'倒放牛', M:'DROP'
    }
  },
  miku: {
    title: '初音牛来',
    label: 'HATSUNE NIULAI',
    hint: 'VIRTUAL NIULAI MODE · A–Z PLAY · TAB 回到 CORE',
    bpm: 150,
    voicePitch: 1.6,
    voiceRate: 1.28,
    palette: ['#eaffff', '#51f5dc', '#ff54cb', '#7d72ff'],
    labels: {
      Q:'NIU', W:'LAI', E:'NIULAI', R:'WELCOME', T:'HELLO', Y:'DIFFERENT', U:'SAME', I:'BRAVE', O:'FUTURE', P:'TODAY',
      A:'KICK+', S:'SNARE+', D:'HAT+', F:'CLAP+', G:'BASS', H:'ARP', J:'BELL', K:'PAD', L:'CHORD',
      Z:'NI!', X:'LA!', C:'DONG!', V:'PA!', B:'POP!', N:'REVERSE', M:'DROP!'
    }
  }
};

const TYPES = {};
'QWERTYUIOP'.split('').forEach(k => TYPES[k] = 'voice');
'ASDFGHJKL'.split('').forEach(k => TYPES[k] = 'music');
'ZXCVBNM'.split('').forEach(k => TYPES[k] = 'fx');

let mode = 'core';
let audioCtx = null;
let master = null;
let started = false;
let energy = 0;
let lastHit = {};
let chains = {};
const downAt = {};
const holdTimers = {};

const keyboard = document.getElementById('keyboard');
const soundButton = document.getElementById('soundButton');
const modeLabel = document.getElementById('modeLabel');
const bpmLabel = document.getElementById('bpmLabel');
const modeTitle = document.getElementById('modeTitle');
const modeHint = document.getElementById('modeHint');
const wordLayer = document.getElementById('wordLayer');
const canvas = document.getElementById('stageCanvas');
const ctx = canvas.getContext('2d');

const particles = [];

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    master = audioCtx.createGain();
    master.gain.value = 0.65;
    master.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  started = true;
  soundButton.textContent = 'AUDIO ON';
}

function osc(type, freq, duration=.18, gain=.12, detune=0) {
  initAudio();
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = type;
  o.frequency.value = freq;
  o.detune.value = detune;
  const t = audioCtx.currentTime;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(Math.max(.0002, gain), t + .008);
  g.gain.exponentialRampToValueAtTime(.0001, t + duration);
  o.connect(g).connect(master);
  o.start(t);
  o.stop(t + duration + .03);
}

function noise(duration=.12, gain=.13, highpass=1000) {
  initAudio();
  const frames = Math.floor(audioCtx.sampleRate * duration);
  const buffer = audioCtx.createBuffer(1, frames, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;
  const src = audioCtx.createBufferSource();
  src.buffer = buffer;
  const hp = audioCtx.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = highpass;
  const g = audioCtx.createGain();
  const t = audioCtx.currentTime;
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(.0001, t + duration);
  src.connect(hp).connect(g).connect(master);
  src.start(t);
}

function kick() {
  initAudio();
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  const t = audioCtx.currentTime;
  o.type = 'sine';
  o.frequency.setValueAtTime(mode === 'miku' ? 145 : 120, t);
  o.frequency.exponentialRampToValueAtTime(42, t + .15);
  g.gain.setValueAtTime(.38, t);
  g.gain.exponentialRampToValueAtTime(.0001, t + .18);
  o.connect(g).connect(master);
  o.start(t); o.stop(t + .2);
}

function snare() { noise(.16, .17, 1300); osc('triangle', 170, .08, .06); }
function hat() { noise(.055, .08, 6000); }
function clap() { noise(.05, .09, 1500); setTimeout(()=>noise(.045,.06,1700), 38); }
function bass(freq=55) { osc('sawtooth', freq, .26, .11); osc('sine', freq/2, .3, .10); }
function bell(freq=660) { osc('sine', freq, .65, .08); osc('sine', freq*2.01, .42, .035); }
function pad(freq=220) { [-9,0,7].forEach((d,i)=>osc('sine', freq*Math.pow(2,d/12), 1.15, .035, i*3)); }
function chord(root=220) { [0,3,7,10].forEach(d=>osc('triangle', root*Math.pow(2,d/12), .62, .045)); }

function fxBurst(kind='up') {
  initAudio();
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  const t = audioCtx.currentTime;
  o.type = mode === 'miku' ? 'square' : 'sawtooth';
  if (kind === 'down') {
    o.frequency.setValueAtTime(900, t); o.frequency.exponentialRampToValueAtTime(70, t+.22);
  } else {
    o.frequency.setValueAtTime(80, t); o.frequency.exponentialRampToValueAtTime(1200, t+.16);
  }
  g.gain.setValueAtTime(.07, t); g.gain.exponentialRampToValueAtTime(.0001, t+.24);
  o.connect(g).connect(master); o.start(t); o.stop(t+.26);
}

function speak(text, chain=1) {
  if (!('speechSynthesis' in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = mode === 'miku' ? 'zh-CN' : 'zh-CN';
  utter.pitch = Math.min(2, MODES[mode].voicePitch + Math.min(chain-1, 4)*.08);
  utter.rate = Math.min(2, MODES[mode].voiceRate + Math.min(chain-1, 5)*.08);
  utter.volume = .72;
  const voices = speechSynthesis.getVoices();
  const zh = voices.find(v => /zh|Chinese|Ting|Meijia|Xiaoxiao/i.test(`${v.lang} ${v.name}`));
  if (zh) utter.voice = zh;
  speechSynthesis.speak(utter);
}

function speechText(key) {
  const core = {Q:'牛',W:'来',E:'牛来',R:'欢迎',T:'你来了',Y:'不一样',U:'一样',I:'勇敢',O:'将来',P:'今天'};
  const virtual = {Q:'牛',W:'来',E:'牛来',R:'欢迎',T:'你好',Y:'不一样',U:'一样',I:'勇敢',O:'未来',P:'今天'};
  return (mode === 'miku' ? virtual : core)[key] || MODES[mode].labels[key];
}

function playSound(key, chain) {
  if ('QWERTYUIOP'.includes(key)) {
    speak(speechText(key), chain);
    const idx = 'QWERTYUIOP'.indexOf(key);
    const base = mode === 'miku' ? 440 : 220;
    osc(mode === 'miku' ? 'square' : 'triangle', base * Math.pow(2, (idx%5)/12), .14, .035);
    return;
  }
  switch (key) {
    case 'A': kick(); break;
    case 'S': snare(); break;
    case 'D': hat(); break;
    case 'F': clap(); break;
    case 'G': bass(mode === 'miku' ? 65.4 : 55); break;
    case 'H': bass(mode === 'miku' ? 82.4 : 73.4); break;
    case 'J': bell(mode === 'miku' ? 880 : 660); break;
    case 'K': pad(mode === 'miku' ? 261.6 : 220); break;
    case 'L': chord(mode === 'miku' ? 261.6 : 196); break;
    case 'Z': speak('汪', chain); osc('square', 330, .08, .05); break;
    case 'X': osc('sine', 120, .09, .12); break;
    case 'C': osc('triangle', 260, .08, .09); break;
    case 'V': noise(.035, .12, 400); break;
    case 'B': osc('sine', 760, .10, .08); break;
    case 'N': speak('牛来', chain); fxBurst('down'); break;
    case 'M': kick(); snare(); bass(43.7); fxBurst('up'); break;
  }
}

function chainFor(key) {
  const now = performance.now();
  if (now - (lastHit[key] || 0) < 280) chains[key] = Math.min((chains[key] || 1) + 1, 6);
  else chains[key] = 1;
  lastHit[key] = now;
  return chains[key];
}

function displayLabel(key, chain) {
  let text = MODES[mode].labels[key];
  if (key === 'Q' && chain > 1) text = mode === 'miku' ? 'NIU'.repeat(Math.min(chain,4)) : '牛'.repeat(Math.min(chain,5));
  if (key === 'W' && chain > 1) text = mode === 'miku' ? 'LAI'.repeat(Math.min(chain,4)) : '来'.repeat(Math.min(chain,5));
  return text;
}

function spawnWord(text, type='voice', chain=1) {
  const el = document.createElement('div');
  el.className = 'word';
  el.textContent = text;
  const x = 18 + Math.random()*64;
  const y = 20 + Math.random()*57;
  const dx = `${(Math.random()-.5)*110}px`;
  const dy = `${-30-Math.random()*80}px`;
  const r = `${(Math.random()-.5)*(mode === 'miku' ? 18 : 8)}deg`;
  const life = `${Math.max(.55, 1.7 - chain*.12)}s`;
  el.style.setProperty('--x', `${x}%`);
  el.style.setProperty('--y', `${y}%`);
  el.style.setProperty('--dx', dx);
  el.style.setProperty('--dy', dy);
  el.style.setProperty('--r', r);
  el.style.setProperty('--life', life);
  if (type === 'music') el.style.fontSize = 'clamp(34px,7vw,100px)';
  wordLayer.appendChild(el);
  setTimeout(()=>el.remove(), 2200);
}

function addParticles(key, chain) {
  const rect = canvas.getBoundingClientRect();
  const count = Math.min(8 + chain*4 + Math.floor(energy*8), 42);
  const palette = MODES[mode].palette;
  for (let i=0; i<count; i++) {
    particles.push({
      x: rect.width*(.25 + Math.random()*.5),
      y: rect.height*(.25 + Math.random()*.5),
      vx: (Math.random()-.5)*(mode === 'miku' ? 9 : 5)*(1+energy),
      vy: (Math.random()-.5)*(mode === 'miku' ? 9 : 5)*(1+energy),
      life: 1,
      decay: .012 + Math.random()*.018,
      size: 2 + Math.random()*(mode === 'miku' ? 14 : 28),
      color: palette[(key.charCodeAt(0)+i)%palette.length],
      square: mode === 'miku' || TYPES[key] === 'music'
    });
  }
  if (particles.length > 320) particles.splice(0, particles.length-320);
}

function trigger(key, source='keyboard') {
  if (!KEY_ORDER.includes(key)) return;
  initAudio();
  const chain = chainFor(key);
  energy = Math.min(1, energy + .12 + chain*.035);
  document.body.classList.add('key-active');
  const pad = document.querySelector(`[data-key="${key}"]`);
  if (pad) pad.classList.add('active');
  spawnWord(displayLabel(key, chain), TYPES[key], chain);
  addParticles(key, chain);
  playSound(key, chain);
  downAt[key] = performance.now();
  clearTimeout(holdTimers[key]);
  holdTimers[key] = setTimeout(()=>{
    if (downAt[key]) {
      spawnWord(mode === 'miku' ? `${displayLabel(key, chain)}—HOLD` : `${displayLabel(key, chain)}——`, TYPES[key], chain+1);
      if (TYPES[key] === 'voice') padHoldTone(key);
      energy = Math.min(1, energy + .2);
    }
  }, 480);
}

function padHoldTone(key) {
  const idx = Math.max(0, 'QWERTYUIOP'.indexOf(key));
  osc(mode === 'miku' ? 'sawtooth' : 'sine', (mode === 'miku' ? 220 : 110) * Math.pow(2, idx/12), .7, .035);
}

function release(key) {
  if (!KEY_ORDER.includes(key)) return;
  delete downAt[key];
  clearTimeout(holdTimers[key]);
  const pad = document.querySelector(`[data-key="${key}"]`);
  if (pad) pad.classList.remove('active');
  if (!document.querySelector('.key.active')) document.body.classList.remove('key-active');
}

function accent() {
  initAudio();
  kick();
  fxBurst('up');
  energy = 1;
  spawnWord(mode === 'miku' ? 'NIULAI MODE!' : '牛来!', 'fx', 4);
  KEY_ORDER.slice(0, 10).forEach((k,i)=>setTimeout(()=>addParticles(k,3), i*18));
}

function reset() {
  energy = 0;
  particles.length = 0;
  wordLayer.innerHTML = '';
  speechSynthesis?.cancel?.();
  document.body.classList.remove('key-active');
  document.querySelectorAll('.key.active').forEach(el=>el.classList.remove('active'));
  Object.keys(downAt).forEach(k=>delete downAt[k]);
}

function toggleMode() {
  reset();
  mode = mode === 'core' ? 'miku' : 'core';
  document.body.classList.toggle('mode-core', mode === 'core');
  document.body.classList.toggle('mode-miku', mode === 'miku');
  buildKeyboard();
  updateModeUI();
  accent();
}

function updateModeUI() {
  const m = MODES[mode];
  modeLabel.textContent = m.label;
  bpmLabel.textContent = m.bpm;
  modeTitle.textContent = m.title;
  modeHint.textContent = m.hint;
}

function buildKeyboard() {
  keyboard.innerHTML = '';
  KEY_ORDER.forEach(key => {
    const el = document.createElement('div');
    el.className = `key ${TYPES[key]}`;
    el.dataset.key = key;
    el.innerHTML = `<strong>${key}</strong><span>${MODES[mode].labels[key]}</span>`;
    el.addEventListener('pointerdown', e => { e.preventDefault(); trigger(key, 'pointer'); });
    el.addEventListener('pointerup', ()=>release(key));
    el.addEventListener('pointerleave', ()=>release(key));
    keyboard.appendChild(el);
  });
}

function resizeCanvas() {
  const r = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(r.width*dpr);
  canvas.height = Math.floor(r.height*dpr);
  ctx.setTransform(dpr,0,0,dpr,0,0);
}

function draw() {
  const r = canvas.getBoundingClientRect();
  ctx.clearRect(0,0,r.width,r.height);
  const palette = MODES[mode].palette;
  ctx.globalCompositeOperation = mode === 'miku' ? 'lighter' : 'screen';
  for (let i=particles.length-1; i>=0; i--) {
    const p = particles[i];
    p.x += p.vx; p.y += p.vy;
    p.vx *= .988; p.vy *= .988;
    p.life -= p.decay;
    if (p.life <= 0) { particles.splice(i,1); continue; }
    ctx.globalAlpha = Math.max(0,p.life)*.74;
    ctx.fillStyle = p.color || palette[0];
    if (p.square) ctx.fillRect(p.x,p.y,p.size*(.4+p.life),p.size*(.4+p.life));
    else {
      ctx.beginPath(); ctx.arc(p.x,p.y,p.size*(.3+p.life),0,Math.PI*2); ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';
  energy *= .985;
  requestAnimationFrame(draw);
}

window.addEventListener('keydown', e => {
  const key = e.key.toUpperCase();
  if (e.code === 'Tab') { e.preventDefault(); toggleMode(); return; }
  if (e.code === 'Escape') { reset(); return; }
  if (e.code === 'Space') { e.preventDefault(); if (!e.repeat) accent(); return; }
  if (KEY_ORDER.includes(key) && !e.repeat) trigger(key);
});
window.addEventListener('keyup', e => release(e.key.toUpperCase()));
window.addEventListener('resize', resizeCanvas);
soundButton.addEventListener('click', initAudio);

buildKeyboard();
updateModeUI();
resizeCanvas();
draw();