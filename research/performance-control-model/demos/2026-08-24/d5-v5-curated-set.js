const BPM=128,BEAT=60/BPM,STEP=BEAT/4,LOOK=.12,MAX_VOICES=40;
const keys=['a','s','d','f','j','k','l',';'];
const PRESET_NAMES=['OPEN','BUILD','PEAK','BREAK'];
const DEF=[
{name:'ROUTE',base:50,role:'anchor / pulse'},
{name:'FIELD',base:38,role:'low pressure / space'},
{name:'ORBIT',base:69,role:'high cyclic motion'},
{name:'REWIND',base:74,role:'descending memory'},
{name:'CELLS',base:62,role:'micro percussion'},
{name:'PARTITION',base:50,role:'mid chord blocks'},
{name:'SCAN',base:65,role:'spectral sweep'},
{name:'DROP',base:38,role:'structural impact'}
];
const P=(strong=[],weak=[])=>{const a=Array(20).fill(0);weak.forEach(n=>{if(n>=1&&n<=20)a[n-1]=1});strong.forEach(n=>{if(n>=1&&n<=20)a[n-1]=2});return a};
const CURATED=[
// A ROUTE — stable anchors first; later presets increase syncopation without crowding low-field events.
[
P([1,9],[5,13,18]),
P([1,5,9,13,17],[3,11,19]),
P([1,5,9,13,17],[3,7,11,15,19]),
P([1,13],[5,9,15,20])
],
// S FIELD — intentionally sparse because each event is long and occupies low spectrum.
[
P([1],[9,14]),
P([4,12],[8,16,20]),
P([1,11],[6,16]),
P([3,13],[8,18])
],
// D ORBIT — off-beat metallic cycle; avoids ROUTE downbeats in OPEN/BUILD.
[
P([],[3,7,11,15,19]),
P([3,7,11,15,19],[5,9,13,17]),
P([2,6,10,14,18],[4,8,12,16,20]),
P([],[6,14,20])
],
// F REWIND — sparse descending gestures placed toward phrase interiors/tails.
[
P([],[12,15,20]),
P([8,16],[12,20]),
P([5,15],[10,20]),
P([4,10,16],[7,13,19])
],
// J CELLS — high-rate fillers, mostly weak; strong cells only mark secondary subdivisions.
[
P([],[4,8,14,18]),
P([4,12],[2,6,10,14,18]),
P([4,12,20],[2,6,8,10,14,16,18]),
P([],[5,11,17])
],
// K PARTITION — mid-band blocks deliberately offset from FIELD attacks.
[
P([6],[14]),
P([1,9,17],[5,13]),
P([3,9,15],[6,12,18]),
P([1,11],[6,16])
],
// L SCAN — rare, bright gestures occupying the gaps between ORBIT/CELLS.
[
P([],[10,15,20]),
P([7,15],[3,11,19]),
P([4,12,20],[8,16]),
P([9,19],[4,14])
],
// ; DROP — structural punctuation only; never a constant drum lane.
[
P([15],[20]),
P([15,20],[]),
P([7,19],[15]),
P([15],[5,20])
]
];
const PROFILE=[
{density:.27,strong:.30,bias:'beat'},
{density:.12,strong:.22,bias:'beat'},
{density:.30,strong:.18,bias:'off'},
{density:.16,strong:.20,bias:'tail'},
{density:.34,strong:.10,bias:'off'},
{density:.17,strong:.26,bias:'beat'},
{density:.13,strong:.28,bias:'gap'},
{density:.055,strong:.70,bias:'tail'}
];
const makeWeights=n=>Array(20).fill(0).map((_,i)=>{if(i>=n)return 0;if(i===0)return 2;if(n===15){return [4,8,12].includes(i)?1:0}if(n===20){return [4,8,12,16].includes(i)?1:0}return i%4===0?1:0});
const beatBanks={8:makeWeights(8),12:makeWeights(12),15:makeWeights(15),16:makeWeights(16),20:makeWeights(20)};
const $=s=>document.querySelector(s),c=$('#c'),ctx=c.getContext('2d'),matrix=$('#matrix'),weightsEl=$('#weights'),status=$('#status'),hud=$('#hud'),bankEl=$('#bank');
let ac=null,master=null,comp=null,noiseBuffer=null,running=false,timer=null,nextStepTime=0,globalStep=0,voices=0,seqLen=16,selected=0,autoMode='HOLD',autoBars=2,visual=[],oldPlay=-1,beatWeight=beatBanks[16];
const lanes=DEF.map((d,i)=>({def:d,latch:false,activePreset:0,presets:CURATED[i].map(p=>p.slice()),oneshotUntil:-1}));
const refs={weights:[],cells:[],heads:[],triggers:[],latches:[],bank:[]};
function resize(){const r=c.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);c.width=r.width*d;c.height=r.height*d;ctx.setTransform(d,0,0,d,0,0)}addEventListener('resize',resize);resize();
function makeNoise(){const b=ac.createBuffer(1,ac.sampleRate,ac.sampleRate),a=b.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1;return b}
async function ensureAudio(){if(!ac)ac=new(AudioContext||webkitAudioContext)();if(ac.state==='suspended')await ac.resume();if(!master){master=ac.createGain();master.gain.value=.70;comp=ac.createDynamicsCompressor();comp.threshold.value=-12;comp.knee.value=12;comp.ratio.value=5;comp.attack.value=.004;comp.release.value=.16;master.connect(comp).connect(ac.destination);noiseBuffer=makeNoise()}}
async function togglePlay(){await ensureAudio();running=!running;if(running){nextStepTime=ac.currentTime+.06;timer&&clearInterval(timer);timer=setInterval(scheduler,20);$('#play').textContent='STOP';$('#play').classList.add('on');status.textContent='PLAYING · CURATED SET'}else{timer&&clearInterval(timer);timer=null;$('#play').textContent='PLAY';$('#play').classList.remove('on');status.textContent='STOPPED · GRID EDITABLE'}updateHud()}
function scheduler(){if(!running||!ac)return;while(nextStepTime<ac.currentTime+LOOK){scheduleStep(globalStep,nextStepTime);nextStepTime+=STEP;globalStep++}}
function scheduleStep(step,t){const local=step%seqLen,bar=Math.floor(step/seqLen);if(local===0&&step>0&&bar%autoBars===0)autoAdvance();lanes.forEach((lane,i)=>{const active=lane.latch||step<lane.oneshotUntil;if(!active)return;const state=lane.presets[lane.activePreset][local]||0;if(!state)return;const bw=beatWeight[local],accent=state*(bw===2?1.36:bw===1?1.08:.80);playFamily(i,t,accent,lane.activePreset,local);visual.push({i,born:performance.now(),life:1,strong:accent>1.5,step:local,preset:lane.activePreset,state})});setTimeout(()=>{movePlayhead(local);updateHud()},Math.max(0,(t-ac.currentTime)*1000))}
function autoAdvance(){if(autoMode==='HOLD')return;lanes.forEach((l,i)=>{if(!l.latch)return;l.activePreset=autoMode==='CYCLE'?(l.activePreset+1)%4:pickNeighborPreset(l.activePreset);updateLane(i)});updateBank();status.textContent=`AUTO ${autoMode} · ${PRESET_NAMES[lanes[selected].activePreset]}`}
function pickNeighborPreset(cur){if(Math.random()<.72)return (cur+(Math.random()<.72?1:3))%4;return Math.floor(Math.random()*4)}
function triggerLane(i){if(!running){status.textContent='PRESS PLAY FIRST';return}lanes[i].oneshotUntil=globalStep+seqLen;selectLane(i);status.textContent=`${keys[i].toUpperCase()} ${lanes[i].def.name} · ONE CYCLE`}
function toggleLatch(i){lanes[i].latch=!lanes[i].latch;selectLane(i);updateLane(i);status.textContent=`${keys[i].toUpperCase()} ${lanes[i].def.name} · LATCH ${lanes[i].latch?'ON':'OFF'}`}
function stepBias(i,s){const p=PROFILE[i],bw=beatWeight[s];if(p.bias==='beat')return bw===2?1.7:bw===1?1.25:.72;if(p.bias==='off')return bw===0?1.35:.72;if(p.bias==='tail')return s>seqLen*.55?1.35:.72;if(p.bias==='gap')return bw===0?1.2:.78;return 1}
function randomizeLaneRaw(i){const lane=lanes[i],p=lane.presets[lane.activePreset],pr=PROFILE[i];p.fill(0);for(let s=0;s<seqLen;s++){const chance=Math.min(.82,pr.density*stepBias(i,s));if(Math.random()<chance){let strong=Math.random()<pr.strong*(beatWeight[s]===2?1.35:1);p[s]=strong?2:1}}const minHits=i===7?1:(i===1||i===6?2:3);let count=p.slice(0,seqLen).filter(Boolean).length;while(count<minHits){const s=Math.floor(Math.random()*seqLen);if(!p[s]){p[s]=1;count++}}}
function resolveRandomizedLane(i){const p=lanes[i].presets[lanes[i].activePreset];for(let s=0;s<seqLen;s++){if(p[s]!==2)continue;const others=lanes.reduce((n,l,j)=>n+(j!==i&&l.presets[l.activePreset][s]===2?1:0),0);if(others>=2)p[s]=1;if(i===1&&lanes[0].presets[lanes[0].activePreset][s]===2&&s!==0)p[s]=1;if(i===5&&lanes[1].presets[lanes[1].activePreset][s]===2)p[s]=1;if(i===4&&lanes[2].presets[lanes[2].activePreset][s]===2&&lanes[6].presets[lanes[6].activePreset][s]>=1)p[s]=1}}
function resolveAllCollisions(){for(let s=0;s<seqLen;s++){const strong=[];lanes.forEach((l,i)=>{if(l.presets[l.activePreset][s]===2)strong.push(i)});const priority=[7,0,1,5,2,3,6,4];strong.sort((a,b)=>priority.indexOf(a)-priority.indexOf(b));strong.slice(2).forEach(i=>lanes[i].presets[lanes[i].activePreset][s]=1);if(lanes[1].presets[lanes[1].activePreset][s]===2&&lanes[5].presets[lanes[5].activePreset][s]===2)lanes[5].presets[lanes[5].activePreset][s]=1}}
function randomizeLane(i){randomizeLaneRaw(i);resolveRandomizedLane(i);selectLane(i);updateLane(i);status.textContent=`RANDOM ${keys[i].toUpperCase()} · ROLE-AWARE`}
function randomizeAll(){lanes.forEach((_,i)=>randomizeLaneRaw(i));resolveAllCollisions();lanes.forEach((_,i)=>updateLane(i));status.textContent='RANDOM ALL · COLLISION LIMITED'}
function cycleCell(i,s){const p=lanes[i].presets[lanes[i].activePreset];p[s]=(p[s]+1)%3;selected=i;updateLane(i);updateBank();status.textContent=`EDIT ${keys[i].toUpperCase()} · STEP ${s+1} · ${['OFF','WEAK','STRONG'][p[s]]}`}
function cycleWeight(s){beatWeight[s]=(beatWeight[s]+1)%3;updateWeight(s);status.textContent=`BEAT ${s+1} · ${['WEAK','BEAT','DOWNBEAT'][beatWeight[s]]}`}
function setPreset(p){lanes[selected].activePreset=p;updateLane(selected);updateBank();status.textContent=`${keys[selected].toUpperCase()} ${lanes[selected].def.name} · P${p+1} ${PRESET_NAMES[p]}`}
function setLen(n){seqLen=n;globalStep%=n;beatWeight=beatBanks[n];document.querySelectorAll('[data-len]').forEach(b=>b.classList.toggle('on',+b.dataset.len===n));buildGrid();status.textContent=`SEQUENCE LENGTH ${n} · CURATED PHRASE`;updateHud()}
function setAutoBars(n){autoBars=n;document.querySelectorAll('[data-bars]').forEach(b=>b.classList.toggle('on',+b.dataset.bars===n));status.textContent=`AUTO EVERY ${n} BAR${n>1?'S':''}`;updateHud()}
function setMode(m){autoMode=m;document.querySelectorAll('[data-mode]').forEach(b=>b.classList.toggle('on',b.dataset.mode===m));status.textContent=`AUTO MODE ${m}`;updateHud()}
function selectLane(i){selected=i;refs.heads.forEach((h,j)=>h.classList.toggle('sel',j===i));updateBank()}
function buildGrid(){oldPlay=-1;weightsEl.innerHTML='';matrix.innerHTML='';refs.weights=[];refs.cells=[];refs.heads=[];refs.triggers=[];refs.latches=[];weightsEl.style.gridTemplateColumns=`repeat(${seqLen},minmax(24px,1fr))`;for(let s=0;s<seqLen;s++){const b=document.createElement('button');b.className='weight';b.onclick=()=>cycleWeight(s);weightsEl.appendChild(b);refs.weights.push(b);updateWeight(s)}lanes.forEach((lane,i)=>{const row=document.createElement('div');row.className='lane';const head=document.createElement('div');head.className='lanehead'+(i===selected?' sel':'');const txt=document.createElement('div');txt.innerHTML=`<strong>${keys[i].toUpperCase()} · ${lane.def.name}</strong><span class="meta"></span>`;txt.onclick=()=>selectLane(i);const trig=document.createElement('button');trig.textContent='TRIGGER';trig.onclick=()=>triggerLane(i);const lat=document.createElement('button');lat.onclick=()=>toggleLatch(i);head.append(txt,trig,lat);const grid=document.createElement('div');grid.className='gridrow';grid.style.gridTemplateColumns=`repeat(${seqLen},minmax(24px,1fr))`;refs.cells[i]=[];for(let s=0;s<seqLen;s++){const b=document.createElement('button');b.className='cell';b.onclick=()=>cycleCell(i,s);grid.appendChild(b);refs.cells[i].push(b)}row.append(head,grid);matrix.appendChild(row);refs.heads.push(head);refs.triggers.push(trig);refs.latches.push(lat);updateLane(i)});updateBank();movePlayhead(globalStep%seqLen)}
function updateWeight(s){const b=refs.weights[s];if(!b)return;b.className='weight '+(beatWeight[s]===2?'down':beatWeight[s]===1?'beat':'');b.textContent=beatWeight[s]===2?'D':beatWeight[s]===1?'B':'W'}
function updateLane(i){const lane=lanes[i],p=lane.presets[lane.activePreset],head=refs.heads[i];if(!head)return;head.classList.toggle('sel',i===selected);head.querySelector('.meta').textContent=`P${lane.activePreset+1} ${PRESET_NAMES[lane.activePreset]} · ${lane.latch?'LATCHED':lane.def.role}`;refs.latches[i].textContent=lane.latch?'LATCH ON':'LATCH';refs.latches[i].classList.toggle('on',lane.latch);refs.cells[i].forEach((b,s)=>{b.className='cell '+(p[s]===2?'strong':p[s]===1?'weak':'');if(s===oldPlay)b.classList.add('play')})}
function updateBank(){const lane=lanes[selected];$('#selectedTitle').textContent=`SELECTED · ${keys[selected].toUpperCase()} ${lane.def.name} · P${lane.activePreset+1} ${PRESET_NAMES[lane.activePreset]}`;bankEl.innerHTML='';refs.bank=[];for(let p=0;p<4;p++){const b=document.createElement('button');b.textContent=`P${p+1} ${PRESET_NAMES[p]}`;b.classList.toggle('on',p===lane.activePreset);b.onclick=()=>setPreset(p);bankEl.appendChild(b);refs.bank.push(b)}}
function movePlayhead(s){if(oldPlay>=0){refs.weights[oldPlay]?.classList.remove('play');refs.cells.forEach(r=>r[oldPlay]?.classList.remove('play'))}oldPlay=s;refs.weights[s]?.classList.add('play');refs.cells.forEach(r=>r[s]?.classList.add('play'))}
function updateHud(){hud.innerHTML=`${BPM} BPM<br>${seqLen} steps<br>step ${(globalStep%seqLen)+1}<br>auto ${autoMode} / ${autoBars}b<br>latched ${lanes.filter(l=>l.latch).length}<br>${seqLen===15?'4+4+4+3 phrase':seqLen===20?'5 × 4 phrase':'shared phrase'}`}
function midi(n){return 440*Math.pow(2,(n-69)/12)}
function tone(n,t,d,g,type='triangle',cut=1800){if(voices>=MAX_VOICES)return;voices++;const o=ac.createOscillator(),f=ac.createBiquadFilter(),v=ac.createGain();o.type=type;o.frequency.value=midi(n);f.type='lowpass';f.frequency.value=cut;v.gain.setValueAtTime(.0001,t);v.gain.exponentialRampToValueAtTime(g,t+.008);v.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(f).connect(v).connect(master);o.start(t);o.stop(t+d+.03);o.onended=()=>voices=Math.max(0,voices-1)}
function noiseHit(t,d,g,freq){if(voices>=MAX_VOICES)return;voices++;const s=ac.createBufferSource(),bp=ac.createBiquadFilter(),v=ac.createGain();s.buffer=noiseBuffer;bp.type='bandpass';bp.frequency.value=freq;bp.Q.value=2.2;v.gain.setValueAtTime(g,t);v.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(bp).connect(v).connect(master);s.start(t);s.stop(t+d);s.onended=()=>voices=Math.max(0,voices-1)}
function kick(t,g){if(voices>=MAX_VOICES)return;voices++;const o=ac.createOscillator(),v=ac.createGain();o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(45,t+.10);v.gain.setValueAtTime(g,t);v.gain.exponentialRampToValueAtTime(.0001,t+.15);o.connect(v).connect(master);o.start(t);o.stop(t+.17);o.onended=()=>voices=Math.max(0,voices-1)}
function playFamily(i,t,a,preset,local){const g=.016+.017*Math.min(2.5,a),b=DEF[i].base,shift=[0,2,5,-2][preset];switch(i){case 0:kick(t,.05+.035*a);tone(b+12+shift,t,.07+(preset===2?.035:0),g,'square',2100+preset*450);if(preset===2&&local%4===3)noiseHit(t+.025,.025,g*.18,7200);break;case 1:tone(b+shift,t,.46+(preset===3?.22:0),g,'sine',720+preset*160);tone(b+7+shift,t,.30,g*.48,'triangle',1000+preset*180);break;case 2:tone(b+shift+(local%3)*2,t,.07,g,'square',4200+preset*600);if(preset>0)tone(b+7+shift,t+.016,.05,g*.42,'triangle',5900);break;case 3:tone(b+shift-(local%6)*2,t,.24+(preset===3?.16:0),g,'sawtooth',1500+preset*180);break;case 4:noiseHit(t,.045+(preset===2?.025:0),g*.72,4700+(local%5)*850+preset*300);break;case 5:tone(b+shift,t,.28,g,'square',1450+preset*220);tone(b+7+shift,t,.27,g*.48,'triangle',1950+preset*240);if(preset===2)tone(b+12+shift,t,.22,g*.22,'sine',2600);break;case 6:tone(b+shift+(local%8),t,.045,g,'square',6200+preset*700);noiseHit(t,.025,g*.28,8000+preset*900);break;case 7:kick(t,.10+.045*a);noiseHit(t,.16+(preset===3?.10:0),g*.65,820+preset*180);break}}
function draw(){const w=c.clientWidth,h=c.clientHeight,t=performance.now()/1000;ctx.fillStyle='rgba(2,2,2,.18)';ctx.fillRect(0,0,w,h);for(let i=0;i<8;i++){const y=(i+.5)*h/8;ctx.strokeStyle=lanes[i].latch?'#555':'#181818';ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}visual=visual.filter(v=>(v.life-=.016)>0);for(const v of visual){const y=(v.i+.5)*h/8,x=(v.step/Math.max(1,seqLen-1))*w,p=v.preset;ctx.globalAlpha=v.life*(v.state===2?1:.58);ctx.strokeStyle='#ddd';ctx.fillStyle='#ddd';if(v.i===0){ctx.beginPath();const yy=y+Math.sin(t*(3+p)+v.step*.7)*(8+p*4);ctx.moveTo(Math.max(0,x-90-p*15),yy);ctx.lineTo(x,yy);ctx.stroke()}else if(v.i===1){const hh=4+p*3;ctx.fillRect(0,y-hh/2,x,hh)}else if(v.i===2){ctx.beginPath();ctx.arc(w*.5,y,12+(1-v.life)*(45+p*20),0,Math.PI*2);ctx.stroke()}else if(v.i===3){ctx.strokeRect(Math.max(0,w-x-40-p*12),y-10-p*3,40+p*12,20+p*6)}else if(v.i===4){for(let k=0;k<5+p*2;k++)ctx.fillRect((k+1)*w/(6+p*2),y-2,2+(p===2?2:0),2+(p===2?2:0))}else if(v.i===5){const ww=5+p*3;ctx.fillRect(x-ww/2,y-16-p*4,ww,32+p*8)}else if(v.i===6){for(let k=0;k<=p;k++)ctx.fillRect(x-k*8,0,1,h)}else{ctx.beginPath();ctx.arc(x,y,(1-v.life)*(70+p*26),0,Math.PI*2);ctx.stroke()}ctx.globalAlpha=1}requestAnimationFrame(draw)}
$('#play').onclick=togglePlay;$('#randomLane').onclick=()=>randomizeLane(selected);$('#randomAll').onclick=randomizeAll;$('#clearAll').onclick=()=>{lanes.forEach(l=>l.presets.forEach(p=>p.fill(0)));lanes.forEach((_,i)=>updateLane(i));status.textContent='CLEAR ALL PATTERNS'};document.querySelectorAll('[data-len]').forEach(b=>b.onclick=()=>setLen(+b.dataset.len));document.querySelectorAll('[data-bars]').forEach(b=>b.onclick=()=>setAutoBars(+b.dataset.bars));document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>setMode(b.dataset.mode));
$('#app').addEventListener('keydown',e=>{if(e.repeat)return;const i=keys.indexOf(e.key.toLowerCase());if(i<0)return;e.preventDefault();if(e.shiftKey)toggleLatch(i);else triggerLane(i)});
buildGrid();updateHud();draw();