const app = document.querySelector('#app')
const stage = document.querySelector('#stage')
const word = document.querySelector('#word')
const shape = document.querySelector('#shape')
const sceneLabel = document.querySelector('#sceneLabel')
const keyLabel = document.querySelector('#keyLabel')
const keyboard = document.querySelector('#keyboard')

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

// v0.1 placeholders. Replace labels + synth voices with the sliced sample pack later.
const labels = [
  '大','狗','叫','汪','叮','咚','鸡','搞','核','酸','来','了','喂',
  '哈','嘿','啊','嗷','呜','哒','咔','啪','嘭','滴','答','嗯','嘘'
]

const palettes = {
  playful: ['#ff5b45','#2d7cff','#ffd52e','#71ef70','#f05cff','#00d7c9','#f4f1ea','#ff8bc8'],
  club: ['#f6f6f3','#a8ff2f','#ff4141','#4b6cff','#111111','#e9ff00'],
  ambient: ['#dbe7ef','#d7d2ff','#b7e3d2','#f0dfd0','#ccd9cf','#ebe8df']
}

const scenes = {
  '1': { name: 'PLAYFUL', key: 'playful' },
  '2': { name: 'CLUB', key: 'club' },
  '3': { name: 'AMBIENT', key: 'ambient' }
}

let currentScene = scenes['1']
let audioCtx
let activeKeys = new Set()
let pressTimes = new Map()
let rapidCounter = new Map()
let resetTimer

function ensureAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  if (audioCtx.state === 'suspended') audioCtx.resume()
}

function hashKey(key) {
  return Math.max(0, letters.indexOf(key))
}

function colorFor(key) {
  const p = palettes[currentScene.key]
  return p[hashKey(key) % p.length]
}

function playVoice(key, held = false) {
  ensureAudio()
  const i = hashKey(key)
  const now = audioCtx.currentTime
  const out = audioCtx.createGain()
  out.connect(audioCtx.destination)

  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  const filter = audioCtx.createBiquadFilter()
  osc.connect(filter)
  filter.connect(gain)
  gain.connect(out)

  const base = currentScene.key === 'ambient' ? 110 : currentScene.key === 'club' ? 70 : 150
  const scale = [0,2,3,5,7,8,10,12]
  const semitone = scale[i % scale.length] + Math.floor(i / 8) * 12
  osc.frequency.value = base * Math.pow(2, semitone / 12)
  osc.type = currentScene.key === 'club' ? 'square' : currentScene.key === 'ambient' ? 'sine' : (i % 2 ? 'triangle' : 'sine')
  filter.type = 'lowpass'
  filter.frequency.value = currentScene.key === 'ambient' ? 900 : 2600 + (i % 5) * 800

  const attack = currentScene.key === 'ambient' ? .08 : .005
  const release = held ? .8 : currentScene.key === 'ambient' ? 1.1 : .22
  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(currentScene.key === 'club' ? .11 : .08, now + attack)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + attack + release)

  osc.start(now)
  osc.stop(now + attack + release + .03)

  if (currentScene.key === 'club' && i % 3 === 0) playClick(now, i)
}

function playClick(now, i) {
  const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * .06, audioCtx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let n = 0; n < data.length; n++) data[n] = (Math.random() * 2 - 1) * (1 - n / data.length)
  const src = audioCtx.createBufferSource()
  const g = audioCtx.createGain()
  const hp = audioCtx.createBiquadFilter()
  hp.type = 'highpass'
  hp.frequency.value = 2200 + i * 55
  g.gain.value = .045
  src.buffer = buffer
  src.connect(hp); hp.connect(g); g.connect(audioCtx.destination)
  src.start(now)
}

function visualHit(key, isRepeat = false) {
  const i = hashKey(key)
  const color = colorFor(key)
  const label = labels[i]

  word.textContent = label
  word.style.color = currentScene.key === 'ambient' ? '#161616' : '#f8f7f2'
  stage.style.backgroundColor = color
  shape.style.borderRadius = i % 3 === 0 ? '0' : i % 3 === 1 ? '50%' : '24%'
  shape.style.borderColor = currentScene.key === 'ambient' ? 'rgba(20,20,20,.45)' : 'rgba(255,255,255,.76)'
  shape.style.transform = `rotate(${(i * 19) % 180}deg) scale(.35)`

  app.classList.remove('flash', 'shake')
  void app.offsetWidth
  app.classList.add('flash')
  if (isRepeat || i % 5 === 0) app.classList.add('shake')

  keyLabel.textContent = `KEY · ${key} / ${label}`
  setActiveButton(key, true)

  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => {
    app.classList.remove('flash', 'shake')
  }, 440)
}

function trigger(key, repeat = false) {
  if (!letters.includes(key)) return
  playVoice(key, false)
  visualHit(key, repeat)
}

function keyDown(key, fromPointer = false) {
  if (scenes[key]) {
    currentScene = scenes[key]
    sceneLabel.textContent = `SCENE · ${currentScene.name}`
    stage.style.backgroundColor = '#101010'
    word.textContent = currentScene.name
    return
  }
  if (key === '0') return reset()
  if (!letters.includes(key)) return

  if (!activeKeys.has(key)) {
    activeKeys.add(key)
    pressTimes.set(key, performance.now())
    const last = rapidCounter.get(key) || { t: 0, n: 0 }
    const now = performance.now()
    const rapid = now - last.t < 260
    rapidCounter.set(key, { t: now, n: rapid ? last.n + 1 : 1 })
    trigger(key, rapid)
    app.classList.add('hold')
  } else if (fromPointer) {
    trigger(key, true)
  }
}

function keyUp(key) {
  if (!letters.includes(key)) return
  const start = pressTimes.get(key) || performance.now()
  const duration = performance.now() - start
  activeKeys.delete(key)
  pressTimes.delete(key)
  setActiveButton(key, false)

  if (activeKeys.size === 0) app.classList.remove('hold')

  // Holding the key creates a longer release tone and a quieter visual release.
  if (duration > 360) {
    playVoice(key, true)
    word.style.opacity = '.64'
    setTimeout(() => { word.style.opacity = '1' }, 260)
  }
}

function reset() {
  activeKeys.clear()
  pressTimes.clear()
  app.classList.remove('flash', 'shake', 'hold')
  stage.style.backgroundColor = '#101010'
  word.style.color = '#f5f5f2'
  word.textContent = 'A–Z'
  shape.style.opacity = '.12'
  sceneLabel.textContent = `SCENE · ${currentScene.name}`
  keyLabel.textContent = 'KEY · —'
  document.querySelectorAll('.key').forEach(el => el.classList.remove('is-active'))
}

function setActiveButton(key, on) {
  const el = keyboard.querySelector(`[data-key="${key}"]`)
  if (el) el.classList.toggle('is-active', on)
}

function buildKeyboard() {
  letters.forEach((key, i) => {
    const btn = document.createElement('button')
    btn.className = 'key'
    btn.dataset.key = key
    btn.type = 'button'
    btn.textContent = `${key} · ${labels[i]}`
    btn.addEventListener('pointerdown', e => { e.preventDefault(); keyDown(key, true) })
    btn.addEventListener('pointerup', () => keyUp(key))
    btn.addEventListener('pointercancel', () => keyUp(key))
    keyboard.appendChild(btn)
  })
}

window.addEventListener('keydown', e => {
  if (e.metaKey || e.ctrlKey || e.altKey) return
  const key = e.key.toUpperCase()
  if (letters.includes(key) || scenes[e.key] || e.key === '0') e.preventDefault()
  keyDown(scenes[e.key] ? e.key : key)
})

window.addEventListener('keyup', e => keyUp(e.key.toUpperCase()))
window.addEventListener('blur', () => activeKeys.forEach(key => keyUp(key)))

buildKeyboard()
reset()
