const BPM=128,BEAT=60/BPM,EIGHTH=BEAT/2,LOOK=.12,MAX_VOICES=64;
const STRUCT_KEYS=['a','s','d','f','j','k','l',';'],FX_KEYS=['q','w','e','r','u','i','o','p'];
const CLIPS=[
{name:'ROUTE',key:'A',kind:'route',dur:4.2,role:'pulse path / anchor'},
{name:'FIELD',key:'S',kind:'field',dur:5.2,role:'low pressure / harmonic bed'},
{name:'ORBIT',key:'D',kind:'orbit',dur:4.8,role:'metallic cyclic phrase'},
{name:'REWIND',key:'F',kind:'rewind',dur:4.6,role:'descending / memory gesture'},
{name:'CELLS',key:'J',kind:'cells',dur:4.0,role:'air / micro-percussion phrase'},
{name:'PARTITION',key:'K',kind:'partition',dur:5.6,role:'chord blocks / split / stutter tail'},
{name:'SCAN',key:'L',kind:'scan',dur:4.7,role:'spectral sweep / razor line'},
{name:'DROP',key:';',kind:'drop',dur:4.3,role:'impact / residue / sub'},
{name:'AIR / HISS',key:'Q',kind:'air',dur:2.4,role:'pressure release'},
{name:'METAL',key:'W',kind:'metal',dur:2.6,role:'metallic punctuation'},
{name:'GLASS',key:'E',kind:'glass',dur:3.4,role:'glass resonance'},
{name:'IMPACT',key:'R',kind:'impact',dur:2.8,role:'structural hit'},
{name:'STUTTER / CUT',key:'U',kind:'stutter',dur:2.4,role:'gated interruption'},
{name:'RISE / PRESSURE',key:'I',kind:'rise',dur:4.5,role:'pressure build'},
{name:'REVERSE / SUCTION',key:'O',kind:'suction',dur:3.8,role:'reverse pull'},
{name:'RESIDUE / TAIL',key:'P',kind:'residue',dur:5.0,role:'long decay / memory'}
];
const $=s=>document.querySelector(s),c=$('#c'),ctx=c.getContext('2d'),status=$('#status'),hud=$('#hud'),pads=$('#pads'),clipList=$('#clipList'),arrangerEl=$('#arranger');
let ac=null,master=null,comp=null,noiseBuffer=null,running=false,timer=null,nextTick=0,tick=0,voices=0,ground=0,quant=8,selectedClip=5,arrangerOn=false,arrange=Array(16).fill(-1),visuals=[],ackVisuals=[],oldStep=-1;
function resize(){const r=c.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);c.width=r.width*d;c.height=r.height*d;ctx.setTransform(d,0,0,d,0,0)}addEventListener('resize',resize);resize();
function makeNoise(){const b=ac.createBuffer(1,ac.sampleRate*2,ac.sampleRate),a=b.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1;return b}
async function ensureAudio(){if(!ac)ac=new(AudioContext||webkitAudioContext)();if(ac.state==='suspended')await ac.resume();if(!master){master=ac.createGain();master.gain.value=.72;comp=ac.createDynamicsCompressor();comp.threshold.value=-10;comp.knee.value=12;comp.ratio.value=5;comp.attack.value=.003;comp.release.value=.18;master.connect(comp).connect(ac.destination);noiseBuffer=makeNoise()}}
async function togglePlay(){await ensureAudio();running=!running;if(running){nextTick=ac.currentTime+.05;timer&&clearInterval(timer);timer=setInterval(schedule,20);$('#play').textContent='STOP';$('#play').classList.add('on');status.textContent='PLAYING · CLIP-FIRST'}else{clearInterval(timer);timer=null;$('#play').textContent='PLAY';$('#play').classList.remove('on');status.textContent='STOPPED'}updateHud()}
function schedule(){while(running&&nextTick<ac.currentTime+LOOK){scheduleGround(tick,nextTick);if(arrangerOn&&tick%2===0){const step=(tick/2)%16|0,ci=arrange[step];if(ci>=0)launchClipAt(ci,nextTick,false,'arranger');setTimeout(()=>moveArrange(step),Math.max(0,(nextTick-ac.currentTime)*1000))}nextTick+=EIGHTH;tick++}}
function scheduleGround(t,t0){const s=t%8;if(ground===0){if(s===0||s===4)kick(t0,.07);if(s===2||s===6)hat(t0,.016,7600);if(s===0)sub(38,t0,.7,.012)}else if(ground===1){if(s===0||s===3||s===6)kick(t0,.065);if(s%2===1)hat(t0,.018,6200+(s*450));if(s===4)sub(41,t0,.45,.01)}else if(ground===2){if(s===0)kick(t0,.08);if([1,3,4,6,7].includes(s))hat(t0,.02,8200);if(s===5)noiseHit(t0,.12,.012,1600,1)}else{if(s===0||s===5)kick(t0,.055);if(s===2||s===7)air(t0,.02,.08);if(s===4)sub(36,t0,.9,.012)}}
function quantTime(){if(!ac)return 0;const unit=quant===8?EIGHTH:BEAT;return Math.ceil(ac.currentTime/unit)*unit+.002}
async function triggerClip(i){await ensureAudio();ack(i);if(!running)await togglePlay();launchClipAt(i,quantTime(),true,'manual')}
function launchClipAt(i,t,withVisual=true,source='manual'){const clip=CLIPS[i];playClip(i,t);if(withVisual||source==='arranger')visuals.push({i,kind:clip.kind,start:t,end:t+clip.dur,seed:Math.random(),source});flashPad(i);status.textContent=`${clip.key} ${clip.name} · ${clip.dur.toFixed(1)}s`}
function midi(n){return 440*Math.pow(2,(n-69)/12)}
function tone(n,t,d,g,type='triangle',cut=2400,pan=0){if(voices>=MAX_VOICES)return;voices++;const o=ac.createOscillator(),f=ac.createBiquadFilter(),v=ac.createGain(),p=ac.createStereoPanner();o.type=type;o.frequency.value=midi(n);f.type='lowpass';f.frequency.value=cut;f.Q.value=2.2;v.gain.setValueAtTime(.0001,t);v.gain.exponentialRampToValueAtTime(Math.max(.0002,g),t+.008);v.gain.exponentialRampToValueAtTime(.0001,t+d);p.pan.value=pan;o.connect(f).connect(v).connect(p).connect(master);o.start(t);o.stop(t+d+.04);o.onended=()=>voices=Math.max(0,voices-1)}
function sweep(n,t,d,g,startCut,endCut,type='sawtooth',pan=0){if(voices>=MAX_VOICES)return;voices++;const o=ac.createOscillator(),f=ac.createBiquadFilter(),v=ac.createGain(),p=ac.createStereoPanner();o.type=type;o.frequency.value=midi(n);f.type='bandpass';f.Q.value=5;f.frequency.setValueAtTime(startCut,t);f.frequency.exponentialRampToValueAtTime(endCut,t+d*.9);v.gain.setValueAtTime(.0001,t);v.gain.exponentialRampToValueAtTime(g,t+.02);v.gain.exponentialRampToValueAtTime(.0001,t+d);p.pan.setValueAtTime(pan,t);p.pan.linearRampToValueAtTime(-pan,t+d);o.connect(f).connect(v).connect(p).connect(master);o.start(t);o.stop(t+d+.05);o.onended=()=>voices=Math.max(0,voices-1)}
function noiseHit(t,d,g,freq=5000,q=2,pan=0){if(voices>=MAX_VOICES)return;voices++;const s=ac.createBufferSource(),f=ac.createBiquadFilter(),v=ac.createGain(),p=ac.createStereoPanner();s.buffer=noiseBuffer;f.type='bandpass';f.frequency.value=freq;f.Q.value=q;v.gain.setValueAtTime(g,t);v.gain.exponentialRampToValueAtTime(.0001,t+d);p.pan.value=pan;s.connect(f).connect(v).connect(p).connect(master);s.start(t);s.stop(t+d);s.onended=()=>voices=Math.max(0,voices-1)}
function kick(t,g=.08){if(!ac)return;const o=ac.createOscillator(),v=ac.createGain();o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(43,t+.1);v.gain.setValueAtTime(g,t);v.gain.exponentialRampToValueAtTime(.0001,t+.16);o.connect(v).connect(master);o.start(t);o.stop(t+.18)}
function sub(n,t,d,g){tone(n,t,d,g,'sine',700)}
function hat(t,g=.015,f=7800){noiseHit(t,.045,g,f,2.5)}
function air(t,g=.035,d=.18,pan=0){noiseHit(t,d,g,4300,1.0,pan);noiseHit(t+.012,d*.72,g*.55,8400,2.2,-pan)}
function chord(ns,t,d,g,cut=2200){ns.forEach((n,k)=>tone(n,t,d,g*(1-k*.13),k%2?'triangle':'square',cut+k*420,(k-1)*.18))}
function playClip(i,t){switch(i){
case 0: // ROUTE
 kick(t,.09);[0,.47,.94,1.41,2.34,2.81,3.28].forEach((o,k)=>tone([62,65,69,72,69,65,74][k],t+o,.16,k%3===0?.055:.036,'square',2400+(k*240),(k%2?.45:-.45)));sweep(50,t+.18,3.5,.025,420,2300,'sawtooth',-.5);break;
case 1: // FIELD
 chord([38,45,50],t,2.2,.028,1100);chord([41,48,53],t+2.0,2.1,.026,1450);sweep(57,t+.5,4.2,.018,350,1900,'triangle',.4);air(t+3.7,.014,.55,.55);break;
case 2: // ORBIT
 [0,.23,.47,.7,.94,1.41,1.88,2.34,2.81,3.28,3.75].forEach((o,k)=>{const n=[69,74,77,81,74,84,77,86,81,74,88][k];tone(n,t+o,.10,.035,'square',5200+(k%4)*900,Math.sin(k*1.7)*.75);if(k%3===1)noiseHit(t+o+.025,.035,.008,8800,4,-Math.sin(k)*.6)});sweep(62,t+.4,3.9,.014,1800,7200,'triangle',-.6);break;
case 3: // REWIND
 [0,.42,.85,1.28,1.75,2.3,2.9,3.55].forEach((o,k)=>sweep([79,76,72,69,65,62,57,53][k],t+o,.55,.03,5200,700,'sawtooth',k%2?.5:-.5));air(t+3.85,.018,.5,-.5);break;
case 4: // CELLS
 [0,.18,.52,.74,1.05,1.31,1.7,2.02,2.38,2.67,3.05,3.35].forEach((o,k)=>{air(t+o,.028+(k%4===0?.018:0),.10+(k%3)*.035,k%2?.6:-.6);if(k%4===2)tone(74+k%5,t+o+.03,.055,.015,'triangle',6200)});break;
case 5: // PARTITION benchmark
 chord([50,57,62],t,.62,.045,1800);air(t+.20,.014,.18,-.6);
 chord([53,60,65],t+.72,.52,.043,2300);noiseHit(t+.98,.06,.012,6800,3,.55);
 chord([45,52,57],t+1.46,.78,.048,1550);sweep(69,t+1.64,.70,.022,900,4200,'sawtooth',-.65);
 chord([48,55,60],t+2.42,.56,.046,2700);air(t+2.66,.016,.22,.65);
 chord([50,57,65],t+3.18,.84,.052,3200);
 [4.05,4.17,4.29,4.41,4.53].forEach((o,k)=>{chord(k%2?[53,60]:[50,57],t+o,.085,.026,3500+k*450);noiseHit(t+o,.035,.008,7600,3,k%2?.6:-.6)});
 sweep(38,t+4.55,.88,.024,1800,330,'sawtooth',.5);air(t+5.0,.022,.42,0);break;
case 6: // SCAN
 sweep(65,t,1.45,.035,550,8000,'square',-.8);sweep(72,t+.9,1.55,.030,8000,650,'triangle',.8);[2.25,2.48,2.7,2.94,3.18,3.42].forEach((o,k)=>tone(77+k,t+o,.07,.024,'square',6800+k*400,k%2?.7:-.7));sweep(57,t+3.45,1.0,.022,400,6200,'sawtooth',0);break;
case 7: // DROP
 kick(t,.14);sub(36,t,.9,.04);noiseHit(t,.34,.035,900,.8);kick(t+1.42,.11);sub(41,t+1.42,.65,.028);air(t+2.05,.02,.35,.6);sweep(50,t+2.25,1.65,.025,2600,420,'sawtooth',-.5);noiseHit(t+3.55,.42,.012,1300,1);break;
case 8: air(t,.055,.55,0);air(t+.52,.028,.7,.5);air(t+1.26,.02,.8,-.5);break;
case 9: [0,.28,.61,1.05,1.55].forEach((o,k)=>{tone(83+(k%3)*4,t+o,.13,.04,'square',8200,k%2?.7:-.7);tone(90,t+o+.018,.08,.022,'triangle',10000,-(k%2?.7:-.7))});break;
case 10: [0,.55,1.18,2.02].forEach((o,k)=>{tone(84+[0,5,9,12][k],t+o,.45,.033,'sine',9800,k%2?.6:-.6);tone(91,t+o+.03,.3,.014,'triangle',11000)});break;
case 11: kick(t,.16);noiseHit(t,.42,.045,820,.75);sub(33,t,.9,.035);air(t+.7,.02,.28,.4);break;
case 12: for(let k=0;k<12;k++){const o=k*.15;noiseHit(t+o,.055,.018+(k%4===0?.01:0),4200+(k%5)*900,2,k%2?.6:-.6);if(k%3===0)tone(69+k%7,t+o,.055,.018,'square',5200)}break;
case 13: for(let k=0;k<8;k++){const o=k*.48,g=.012+k*.004;air(t+o,g,.18+k*.025,k%2?.5:-.5);sweep(50+k*2,t+o,.42,g*.6,500+k*400,2500+k*650,'sawtooth',k%2?.5:-.5)}noiseHit(t+3.9,.45,.03,1800,1);break;
case 14: [0,.5,1.0,1.52,2.05,2.62].forEach((o,k)=>sweep(81-k*4,t+o,.65,.026,6200,500,'sawtooth',k%2?.7:-.7));air(t+3.1,.025,.5,0);break;
case 15: chord([45,52,57],t,1.6,.022,1400);noiseHit(t+.1,1.8,.014,1700,.7);tone(69,t+1.9,1.5,.015,'sine',3200,.5);air(t+3.55,.012,1.1,-.4);break;
}}
function ack(i){if(!ac)return;const t=ac.currentTime+.003;if(i===5){chord([74,81],t,.045,.018,4800)}else if(i<8){tone(74+i,t,.045,.018,'triangle',4500)}else air(t,.018,.06,(i%2?.5:-.5));ackVisuals.push({i,born:performance.now(),life:1})}
function flashPad(i){const b=pads.children[i];if(!b)return;b.classList.add('flash');setTimeout(()=>b.classList.remove('flash'),120)}
function buildPads(){pads.innerHTML='';CLIPS.forEach((cl,i)=>{const b=document.createElement('button');b.className='pad '+(i<8?'struct':'fx');b.innerHTML=`<strong>${cl.key} · ${cl.name}</strong><span>${cl.role}<br>${cl.dur.toFixed(1)} sec clip</span>`;b.onclick=()=>triggerClip(i);pads.appendChild(b)})}
function buildClipList(){clipList.innerHTML='';CLIPS.forEach((cl,i)=>{const b=document.createElement('button');b.className='clipBtn'+(i===selectedClip?' sel':'');b.textContent=`${cl.key} ${cl.name}`;b.onclick=()=>{selectedClip=i;buildClipList()};clipList.appendChild(b)})}
function buildArranger(){arrangerEl.innerHTML='';const h=document.createElement('div');h.className='head';h.textContent='16 STEP';arrangerEl.appendChild(h);for(let s=0;s<16;s++){const b=document.createElement('button');b.className='step'+(arrange[s]>=0?' on':'');b.textContent=arrange[s]>=0?CLIPS[arrange[s]].key:'';b.onclick=()=>{arrange[s]=arrange[s]===selectedClip?-1:selectedClip;buildArranger()};arrangerEl.appendChild(b)}}
function moveArrange(s){if(oldStep>=0)arrangerEl.children[oldStep+1]?.classList.remove('play');oldStep=s;arrangerEl.children[s+1]?.classList.add('play')}
function setMode(m){const perf=m==='PERFORM';$('#performArea').classList.toggle('hidden',!perf);$('#editArea').classList.toggle('hidden',perf);$('#performMode').classList.toggle('on',perf);$('#editMode').classList.toggle('on',!perf)}
function updateHud(){hud.innerHTML=`${BPM} BPM<br>backtrack ${ground+1}<br>quantize 1/${quant}<br>active clips ${visuals.length}<br>arranger ${arrangerOn?'ON':'OFF'}`}
function drawVisual(v,p,w,h,t){const a=p<.12?p/.12:p>.82?(1-p)/.18:1;ctx.globalAlpha=Math.max(0,a)*.8;ctx.strokeStyle='#ddd';ctx.fillStyle='#ddd';ctx.lineWidth=1;const s=v.seed;if(v.kind==='partition'){const cols=4+Math.floor(p*8);for(let k=0;k<cols;k++){const x=w*k/cols,hh=h*(.18+.62*((k*3+Math.floor(p*8))%7)/7);ctx.fillRect(x+3,h*.5-hh/2,w/cols-6,hh)}if(p>.7){for(let k=0;k<8;k++){const y=(k+1)*h/9;ctx.fillRect(w*(.15+.7*((k+Math.floor(t*10))%8)/8),y,45,2)}}}
else if(v.kind==='route'){ctx.beginPath();for(let k=0;k<12;k++){const x=w*(.04+k*.083),y=h*(.5+Math.sin(k*.7+t*2.1+s*5)*.2*a);k?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.stroke();ctx.fillRect(w*(.05+p*.9),h*.5-5,10,10)}
else if(v.kind==='field'){for(let k=0;k<20;k++){const y=h*(k+1)/21;ctx.globalAlpha=a*(.08+.25*Math.sin(t*.6+k+s)**2);ctx.fillRect(0,y,w*(.35+.6*p),1)}}
else if(v.kind==='orbit'){for(let k=0;k<8;k++){const r=24+k*20+p*30,an=t*(.7+k*.07)+k+s*3;ctx.beginPath();ctx.arc(w*.5,h*.5,r,0,Math.PI*2);ctx.stroke();ctx.fillRect(w*.5+Math.cos(an)*r-2,h*.5+Math.sin(an)*r-2,4,4)}}
else if(v.kind==='rewind'){for(let k=0;k<12;k++)ctx.strokeRect(w*(1-p*.82)-k*24,h*(.2+k*.045)+Math.sin(t*2+k)*6,80+k*7,28+k*2)}
else if(v.kind==='cells'||v.kind==='air'){for(let k=0;k<48;k++){const x=((k*83+s*999)%997)/997*w,y=((k*47+s*333)%991)/991*h,q=(Math.sin(t*7+k)+1)/2;ctx.globalAlpha=a*(.08+q*.4);ctx.fillRect(x,y,2+q*10,1+q*3)}}
else if(v.kind==='scan'){const x=w*p;ctx.fillRect(x,0,2,h);for(let k=1;k<18;k++){ctx.globalAlpha=a*(1-k/18)*.35;ctx.fillRect(x-k*15,0,1,h)}}
else if(v.kind==='drop'||v.kind==='impact'){const r=15+p*Math.min(w,h)*.62;ctx.beginPath();ctx.arc(w*.5,h*.5,r,0,Math.PI*2);ctx.stroke();for(let k=0;k<30;k++){const an=k/30*Math.PI*2+s*4,rr=p*Math.min(w,h)*.58;ctx.fillRect(w*.5+Math.cos(an)*rr,h*.5+Math.sin(an)*rr,2,2)}}
else if(v.kind==='metal'){for(let k=0;k<10;k++){ctx.save();ctx.translate(w*.5,h*.5);ctx.rotate(t*.6+k*.3);ctx.strokeRect(30+k*16,-8,60,16);ctx.restore()}}
else if(v.kind==='glass'){for(let k=0;k<9;k++){ctx.beginPath();ctx.moveTo(w*.5,h*.5);ctx.lineTo(w*(.1+.8*((k*131)%997)/997),h*(.1+.8*((k*71)%991)/991));ctx.stroke()}}
else if(v.kind==='stutter'){for(let k=0;k<16;k++)if((k+Math.floor(t*12))%3===0)ctx.fillRect(k*w/16,0,w/32,h)}
else if(v.kind==='rise'){for(let k=0;k<20;k++){const y=h-(p*h)+(k*9)%h;ctx.fillRect(0,y,w,1)}}
else if(v.kind==='suction'){for(let k=0;k<16;k++){const r=(1-p)*(30+k*18);ctx.beginPath();ctx.arc(w*.5,h*.5,r,0,Math.PI*2);ctx.stroke()}}
else if(v.kind==='residue'){for(let k=0;k<24;k++){ctx.globalAlpha=a*(1-k/24)*.28;ctx.strokeRect(w*.5-k*9,h*.5-k*5,k*18,k*10)}}ctx.globalAlpha=1}
function draw(){const w=c.clientWidth,h=c.clientHeight,now=ac?.currentTime||0,t=performance.now()/1000;ctx.fillStyle='rgba(2,2,2,.20)';ctx.fillRect(0,0,w,h);visuals=visuals.filter(v=>now<v.end+.05);for(const v of visuals){const p=Math.max(0,Math.min(1,(now-v.start)/(v.end-v.start)));drawVisual(v,p,w,h,t)}ackVisuals=ackVisuals.filter(v=>(v.life-=.08)>0);for(const a of ackVisuals){ctx.globalAlpha=a.life*.8;ctx.strokeStyle='#fff';ctx.strokeRect(10+a.i*7,10+a.i*4,w-20-a.i*14,h-20-a.i*8)}ctx.globalAlpha=1;updateHud();requestAnimationFrame(draw)}
$('#play').onclick=togglePlay;$('#performMode').onclick=()=>setMode('PERFORM');$('#editMode').onclick=()=>setMode('EDIT');document.querySelectorAll('[data-ground]').forEach(b=>b.onclick=()=>{ground=+b.dataset.ground;document.querySelectorAll('[data-ground]').forEach(x=>x.classList.toggle('on',x===b));status.textContent=`BACKTRACK ${ground+1}`});document.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{quant=+b.dataset.q;document.querySelectorAll('[data-q]').forEach(x=>x.classList.toggle('on',x===b))});$('#arrangeOn').onclick=e=>{arrangerOn=!arrangerOn;e.currentTarget.textContent=`ARRANGER ${arrangerOn?'ON':'OFF'}`;e.currentTarget.classList.toggle('on',arrangerOn)};$('#clearArrange').onclick=()=>{arrange.fill(-1);buildArranger()};$('#release').onclick=()=>{visuals=[];status.textContent='VISUAL RELEASE'};$('#panic').onclick=()=>{visuals=[];arrangerOn=false;if(running)togglePlay();status.textContent='PANIC'};
$('#app').addEventListener('keydown',e=>{if(e.repeat)return;const k=e.key.toLowerCase();let i=STRUCT_KEYS.indexOf(k);if(i>=0){e.preventDefault();triggerClip(i);return}i=FX_KEYS.indexOf(k);if(i>=0){e.preventDefault();triggerClip(i+8)}});
buildPads();buildClipList();buildArranger();draw();