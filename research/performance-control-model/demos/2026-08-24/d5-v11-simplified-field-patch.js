(()=>{
const PRESETS=['MIN','LOW','MID','FULL','PEAK'];
const YVAL=[.20,.36,.52,.70,.90];
const KEYMAP=['a','s','d','f','j','k','l',';','q','w','e','r','u','i','o','p'];
const preset=MATERIALS.map((_,i)=>i<8?2:1);
let drag=null,holdTimer=null,spaceTimer=null,spaceHeld=false,lastCross=-1,trail=[],flash=[];
const app=document.getElementById('app'),fx=document.getElementById('fx'),fctx=fx.getContext('2d');
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function fit(){const r=stage.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);fx.width=r.width*d;fx.height=r.height*d;fctx.setTransform(d,0,0,d,0,0)} addEventListener('resize',fit);fit();
function zoneIndexAt(x,y){const r=zonesEl.getBoundingClientRect(),xx=(x-r.left)/r.width,yy=(y-r.top)/r.height;if(xx<0||xx>1||yy<0||yy>1)return-1;return Math.min(3,Math.floor(yy*4))*4+Math.min(3,Math.floor(xx*4))}
function local(i,x,y){const r=refs.zones[i].getBoundingClientRect();return{x:clamp((x-r.left)/r.width,0,1),y:clamp((y-r.top)/r.height,0,1)}}
function setSelected(i){selected=i;refs.zones.forEach((z,k)=>z.classList.toggle('sel',k===i));paintZone(i);status.textContent=`${MATERIALS[i].key} ${MATERIALS[i].name} · ${PRESETS[preset[i]]}`}
function setPreset(i,n){n=clamp(Math.round(n),0,4);if(n===preset[i])return;preset[i]=n;mods[i].y=YVAL[n];mods[i].vel=.18+n*.12;updateBus(i);paintZone(i);if(ac&&active.some(a=>a.i===i))presetLayer(i,n,quantTime());flash.push({i,born:performance.now(),kind:'preset'});status.textContent=`${MATERIALS[i].key} ${MATERIALS[i].name} · ${PRESETS[n]}`}
function setX(i,x){mods[i].x=clamp(x,0,1);updateBus(i);paintZone(i)}
function presetLayer(i,lvl,t){if(lvl<2||!ac)return;const m=MATERIALS[i],x=mods[i].x,pan=(x-.5)*1.2,n=Math.max(1,lvl-1);if(['cells','air','stutter'].includes(m.kind)){for(let k=0;k<n*2;k++)air(i,t+.18+k*(.18-.018*lvl),.008+.003*lvl,.05+.012*lvl,k%2?pan:-pan)}else if(['partition','field','residue'].includes(m.kind)){if(lvl>=2)chord(i,[m.base,m.base+7,m.base+12],t+BEAT*.75,.22+.05*lvl,.012+.003*lvl,1500+lvl*600);if(lvl>=4)chord(i,[m.base+3,m.base+10],t+BEAT*1.5,.18,.016,3200)}else if(['drop','impact'].includes(m.kind)){if(lvl>=3)kick(i,t+BEAT,.055+.01*lvl);if(lvl>=4)noiseHit(i,t+BEAT*1.5,.08,.012,1200,1,pan)}else if(['orbit','metal','glass'].includes(m.kind)){for(let k=0;k<n*2;k++)tone(i,m.base+12+(k%5)*2,t+.2+k*.16,.055,.010+.002*lvl,'triangle',4200+lvl*900,k%2?pan:-pan)}else{for(let k=0;k<n;k++)sweep(i,m.base+7-k*2,t+.28+k*.32,.28,.010+.002*lvl,500+lvl*350,2200+lvl*700,'sawtooth',k%2?pan:-pan)}}
const baseLaunch=launch;launch=function(i,t,source){baseLaunch(i,t,source);presetLayer(i,preset[i],t)};
function paintZone(i){const z=refs.zones[i];if(!z)return;let badge=z.querySelector('.densityBadge');if(!badge){badge=document.createElement('div');badge.className='densityBadge';z.appendChild(badge)}badge.textContent=PRESETS[preset[i]];let rail=z.querySelector('.densityRail');if(!rail){rail=document.createElement('div');rail.className='densityRail';rail.innerHTML='<i></i>';z.appendChild(rail)}rail.firstChild.style.top=`${(1-preset[i]/4)*100}%`;const cur=refs.cursors[i];if(cur){cur.style.left=`${mods[i].x*100}%`;cur.style.top=`${(1-preset[i]/4)*100}%`}const map=z.querySelector('.map');if(map)map.innerHTML=`Y ${PRESETS[preset[i]]}<br>X ${MATERIALS[i].x}`}
async function fire(i,source='manual'){setSelected(i);const ok=await triggerMaterial(i,source);if(ok!==false)flash.push({i,born:performance.now(),kind:'trigger'})}
function crossFire(i){if(i<0||i===lastCross)return;lastCross=i;fire(i);}
function holdOn(i){mods[i].hold=1;mods[i].deep=true;updateBus(i);refs.zones[i].classList.add('deep');flash.push({i,born:performance.now(),kind:'hold'});status.textContent=`HOLD · ${MATERIALS[i].key} ${MATERIALS[i].name}`}
function holdOff(i){if(i<0)return;mods[i].hold=0;mods[i].deep=false;updateBus(i);refs.zones[i]?.classList.remove('deep')}
function pointerDown(e){const i=zoneIndexAt(e.clientX,e.clientY);if(i<0)return;e.preventDefault();e.stopImmediatePropagation();const p=local(i,e.clientX,e.clientY);drag={id:e.pointerId,i,startX:e.clientX,startY:e.clientY,moved:false};lastCross=i;setX(i,p.x);setPreset(i,(1-p.y)*4);trail.push({x:e.clientX,y:e.clientY,t:performance.now()});fire(i);holdTimer=setTimeout(()=>{if(drag)holdOn(drag.i)},420)}
function pointerMove(e){if(!drag||e.pointerId!==drag.id)return;e.preventDefault();e.stopImmediatePropagation();const i=zoneIndexAt(e.clientX,e.clientY);if(i<0)return;if(i!==drag.i){holdOff(drag.i);drag.i=i;crossFire(i);if(holdTimer){clearTimeout(holdTimer);holdTimer=setTimeout(()=>drag&&holdOn(drag.i),420)}}const p=local(i,e.clientX,e.clientY);setX(i,p.x);setPreset(i,(1-p.y)*4);if(Math.hypot(e.clientX-drag.startX,e.clientY-drag.startY)>5)drag.moved=true;trail.push({x:e.clientX,y:e.clientY,t:performance.now()});if(trail.length>80)trail.shift()}
function pointerUp(e){if(!drag||e.pointerId!==drag.id)return;e.preventDefault();e.stopImmediatePropagation();if(holdTimer){clearTimeout(holdTimer);holdTimer=null}holdOff(drag.i);drag=null;lastCross=-1}
zonesEl.addEventListener('pointerdown',pointerDown,true);zonesEl.addEventListener('pointermove',pointerMove,true);zonesEl.addEventListener('pointerup',pointerUp,true);zonesEl.addEventListener('pointercancel',pointerUp,true);
function moveSelection(dx,dy){const r=Math.floor(selected/4),c=selected%4;setSelected(clamp(r+dy,0,3)*4+clamp(c+dx,0,3))}
app.addEventListener('keydown',e=>{const k=e.key.toLowerCase();if(['arrowleft','arrowright','arrowup','arrowdown','enter',' '].includes(k)||KEYMAP.includes(k)){e.preventDefault();e.stopImmediatePropagation()}
if(k==='arrowleft'){e.shiftKey?setX(selected,mods[selected].x-.04):moveSelection(-1,0)}
else if(k==='arrowright'){e.shiftKey?setX(selected,mods[selected].x+.04):moveSelection(1,0)}
else if(k==='arrowup')setPreset(selected,preset[selected]+1)
else if(k==='arrowdown')setPreset(selected,preset[selected]-1)
else if(k==='enter')fire(selected)
else if(k===' '&&!e.repeat){fire(selected);spaceHeld=true;spaceTimer=setTimeout(()=>spaceHeld&&holdOn(selected),380)}
else{const i=KEYMAP.indexOf(k);if(i>=0)fire(i)}
},true);
app.addEventListener('keyup',e=>{if(e.key===' '){e.preventDefault();e.stopImmediatePropagation();spaceHeld=false;if(spaceTimer){clearTimeout(spaceTimer);spaceTimer=null}holdOff(selected)}},true);
function drawOverlay(){requestAnimationFrame(drawOverlay);const d=Math.min(devicePixelRatio||1,2),w=fx.width/d,h=fx.height/d,now=performance.now(),audioNow=ac?.currentTime||0;fctx.clearRect(0,0,w,h);
trail=trail.filter(p=>now-p.t<700);if(trail.length>1){fctx.beginPath();trail.forEach((p,j)=>j?fctx.lineTo(p.x,p.y):fctx.moveTo(p.x,p.y));fctx.strokeStyle='rgba(255,255,255,.12)';fctx.lineWidth=1.2;fctx.stroke()}
for(const a of active){const m=MATERIALS[a.i],p=clamp((audioNow-a.start)/(a.end-a.start),0,1),q=1-p,lv=preset[a.i],cx=((a.i%4)+.5)*w/4,cy=(Math.floor(a.i/4)+.5)*h/4;fctx.save();fctx.strokeStyle=`rgba(255,255,255,${.05+.12*q})`;fctx.fillStyle=`rgba(255,255,255,${.018+.035*q})`;fctx.lineWidth=1+lv*.45;
if(m.kind==='partition'){const n=3+lv*2;for(let k=0;k<n;k++){const ww=w*(.12+.05*k),hh=h*(.05+.018*k);fctx.strokeRect((cx-ww/2)+(mods[a.i].x-.5)*w*.18,cy-hh/2+Math.sin(p*9+k)*18,ww,hh)}}
else if(m.kind==='orbit'){for(let k=0;k<2+lv;k++){fctx.beginPath();fctx.arc(cx,cy,50+k*38+p*120,0,Math.PI*2);fctx.stroke()}}
else if(m.kind==='scan'){for(let k=0;k<2+lv;k++){const x=(p*w+k*31)%w;fctx.fillRect(x,0,1+lv*.35,h)}}
else if(m.kind==='field'){for(let k=0;k<6+lv*5;k++){const y=(k+1)*h/(7+lv*5)+Math.sin(p*8+k)*10;fctx.fillRect(0,y,w*(.45+.45*mods[a.i].x),1)}}
else if(m.kind==='drop'||m.kind==='impact'){for(let k=0;k<2+lv;k++){fctx.beginPath();fctx.arc(cx,cy,30+p*Math.max(w,h)*(.18+k*.05),0,Math.PI*2);fctx.stroke()}}
else if(m.kind==='air'||m.kind==='cells'){for(let k=0;k<10+lv*8;k++){const x=(cx+(k*83)%w+p*w*.4)%w,y=(cy+(k*47)%h-p*h*.3+h)%h;fctx.fillRect(x,y,12+lv*6,1)}}
else{const rr=40+p*180+lv*24;fctx.beginPath();fctx.arc(cx,cy,rr,0,Math.PI*2);fctx.stroke()}fctx.restore()}
flash=flash.filter(f=>now-f.born<420);for(const f of flash){const age=(now-f.born)/420,q=1-age,cx=((f.i%4)+.5)*w/4,cy=(Math.floor(f.i/4)+.5)*h/4;fctx.fillStyle=`rgba(255,255,255,${(f.kind==='trigger'?.08:.035)*q})`;if(f.kind==='trigger')fctx.fillRect(0,0,w,h);fctx.beginPath();fctx.arc(cx,cy,20+age*120,0,Math.PI*2);fctx.strokeStyle=`rgba(255,255,255,${.35*q})`;fctx.stroke()}}
refs.zones.forEach((z,i)=>{z.dataset.v11=i;paintZone(i)});setSelected(selected);drawOverlay();
})();
