/* D5 v13 — Sequencer Map patch over v12 runtime */
const V13_PATTERNS={
 FIELD:[1,0,0,0,1,0,0,0], ROUTE:[1,0,1,0,1,0,1,1], ORBIT:[1,0,1,1,0,1,0,1,0,1,1,0],
 PARTITION:[1,0,1,1,0,1,1,0], BURST:[1,1,0,1,1,1,0,1], DROP:[1,0,0,1,0,0,1,0],
 REWIND:[1,0,1,0,0,1,0,0], RESIDUE:[1,0,0,0,1,0,0,1,0,0,0,0]
};
const V13_ROLE={FIELD:'AMBIENT BASE',ROUTE:'PULSE / GROOVE',ORBIT:'CYCLIC HIGH',PARTITION:'CUT / CHORD',BURST:'STROBE / PEAK',DROP:'SUB / COMMIT',REWIND:'RELEASE / REVERSE',RESIDUE:'MEMORY / DECAY'};
let v13Corridor=null, v13LastNode=null, v13LastExit=0, v13Events=[];
document.title='D5 v13 — Sequencer Map';
const brand=document.querySelector('.brand'); if(brand) brand.innerHTML='SEQUENCER MAP<br>D5 v13 · 150 BPM';
const legend=document.querySelector('.legend'); if(legend) legend.innerHTML='MAP = MUSICAL TOPOLOGY · MICRO SEQUENCER = LOCAL SCORE<br>ENTER → INSIDE → EXIT → CORRIDOR → NEXT NODE';

/* Robust fullscreen: native Fullscreen API first, viewport stage-mode fallback second. */
(function setupV13Fullscreen(){
 const style=document.createElement('style');
 style.textContent=`
 html.v13-stage-mode,body.v13-stage-mode{width:100%!important;height:100%!important;overflow:hidden!important;background:#000!important;overscroll-behavior:none!important}
 body.v13-stage-mode .app{position:fixed!important;inset:0!important;width:100vw!important;height:100dvh!important;min-height:100dvh!important;z-index:2147483646!important;background:#050505!important}
 body.v13-stage-mode .stage{position:absolute!important;inset:0!important;width:100vw!important;height:100dvh!important;min-height:100dvh!important}
 body.v13-stage-mode .dock{bottom:max(12px,env(safe-area-inset-bottom))!important}
 body.v13-stage-mode .brand{top:max(14px,env(safe-area-inset-top))!important}
 :fullscreen .app,:fullscreen .stage{width:100vw!important;height:100vh!important;min-height:100vh!important}
 :-webkit-full-screen .app,:-webkit-full-screen .stage{width:100vw!important;height:100vh!important;min-height:100vh!important}
 `;
 document.head.appendChild(style);
 const fsBtn=document.querySelector('#fullscreen');
 if(!fsBtn)return;
 let pseudo=false;
 const isNative=()=>!!(document.fullscreenElement||document.webkitFullscreenElement);
 const refresh=()=>{fsBtn.textContent=(isNative()||pseudo)?'EXIT FULLSCREEN':'FULLSCREEN';fsBtn.classList.toggle('on',isNative()||pseudo);setTimeout(()=>{try{resize()}catch(e){}},40)};
 const leavePseudo=()=>{pseudo=false;document.documentElement.classList.remove('v13-stage-mode');document.body.classList.remove('v13-stage-mode');refresh()};
 const enterPseudo=()=>{pseudo=true;document.documentElement.classList.add('v13-stage-mode');document.body.classList.add('v13-stage-mode');window.scrollTo(0,0);refresh()};
 async function toggleFullscreen(){
   if(isNative()){
     try{if(document.exitFullscreen)await document.exitFullscreen();else if(document.webkitExitFullscreen)document.webkitExitFullscreen()}catch(e){}
     refresh();return;
   }
   if(pseudo){leavePseudo();return;}
   const target=document.documentElement;
   try{
     if(target.requestFullscreen){await target.requestFullscreen({navigationUI:'hide'});refresh();return;}
     if(target.webkitRequestFullscreen){target.webkitRequestFullscreen();setTimeout(refresh,80);return;}
   }catch(e){/* fall through to stage mode */}
   enterPseudo();
 }
 fsBtn.onclick=toggleFullscreen;
 document.addEventListener('fullscreenchange',refresh);
 document.addEventListener('webkitfullscreenchange',refresh);
 window.addEventListener('resize',()=>{if(pseudo)refresh()});
 document.addEventListener('keydown',e=>{
   if(e.key.toLowerCase()==='f'&&!e.metaKey&&!e.ctrlKey&&!e.altKey){e.preventDefault();toggleFullscreen();}
   if(e.key==='Escape'&&pseudo){e.preventDefault();leavePseudo();}
 },true);
 refresh();
})();

function v13NearestCorridor(from,x,y){
 if(!from||!BY_ID[from]) return null; let best=null,bd=1e9;
 const A=nodePoint(from);
 for(const to of BY_ID[from].neighbors){const B=nodePoint(to),vx=B.x-A.x,vy=B.y-A.y,l2=vx*vx+vy*vy||1,t=clamp(((x-A.x)*vx+(y-A.y)*vy)/l2,0,1),px=A.x+t*vx,py=A.y+t*vy,d=Math.hypot(x-px,y-py);if(d<bd){bd=d;best={from,to,t,d,A,B}}}
 return best&&best.d<Math.min(W,H)*.13?best:null;
}
const v12EnterNode=enterNode;
enterNode=async function(id,source='MANUAL',time=null){
 if(!current&&v13LastNode&&source!=='AUTO'&&source!=='START'&&!isNeighbor(v13LastNode,id)){
   status.textContent=`NO EDGE · ${v13LastNode} → ${id}`; v13Events.push({type:'reject',id,t:performance.now()}); return false;
 }
 const from=current||v13LastNode; const ok=await v12EnterNode(id,source,time);
 if(ok!==false){v13Corridor=null;v13LastNode=id;v13Events.push({type:'enter2',from,to:id,t:performance.now()});}
 return ok;
};
function v13ExitNode(){
 if(!current||performance.now()-v13LastExit<180)return;
 const old=current;v13LastExit=performance.now();v13LastNode=old;previous=old;current=null;nodeDepth=0;releasePhrase(old,qTime(1));v13Events.push({type:'exit2',id:old,t:performance.now()});status.textContent=`EXIT · ${old} · FOLLOW A CONNECTED ROUTE`;
}
stage.addEventListener('pointermove',e=>{
 if(!pointerDown||e.pointerId!==pointerId)return;const p=pointerPos(e),n=hitNode(p.x,p.y);
 if(current&&!n){const cp=nodePoint(current),rr=BY_ID[current].r*Math.min(W,H);if(Math.hypot(p.x-cp.x,p.y-cp.y)>rr*1.35)v13ExitNode()}
 if(!current&&v13LastNode){v13Corridor=v13NearestCorridor(v13LastNode,p.x,p.y);if(v13Corridor)status.textContent=`CORRIDOR · ${v13Corridor.from} → ${v13Corridor.to} · ${Math.round(v13Corridor.t*100)}%`;}
});
stage.addEventListener('pointerup',()=>{if(current)v13ExitNode();});

const v12Ground=groundEvent;
groundEvent=function(t,t0){
 v12Ground(t,t0);
 if(!ac)return;
 if(!current&&v13Corridor){if(t%4===0){const up=BY_ID[v13Corridor.to].energy>BY_ID[v13Corridor.from].energy;sweep(up?57:74,t0,.32,.006,up?500:5200,up?3000:620,'triangle',up?.35:-.35)}return;}
 if(!current)return;
 const pat=V13_PATTERNS[current],s=t%pat.length;if(!pat[s])return;
 if(current==='ROUTE')tone([62,65,69,72][s%4],t0,.075,.010,'square',2700,s%2?-.3:.3);
 if(current==='ORBIT')tone([74,77,81,84,86][s%5],t0,.05,.008,'triangle',5600,Math.sin(s)*.6);
 if(current==='PARTITION'){if(s%2===0)chord(s%4===0?[50,57,62]:[53,60,65],t0,.25,.014,1900+s*150);else noiseHit(t0,.03,.005,5600+s*260,6,(s%3-1)*.4)}
 if(current==='BURST'&&s%2===0)noiseHit(t0,.025,.006,7800+s*220,5,0);
 if(current==='DROP'&&(s===0||s===3))kick(t0,.06);
 if(current==='REWIND'&&s%2===0)sweep(77-s,t0,.22,.005,4200,720,'sawtooth',-.3);
 if(current==='FIELD'&&s===0)tone(45,t0,.65,.004,'sine',900,0);
 if(current==='RESIDUE'&&(s===0||s===4))tone(69-s,t0,.7,.0035,'sine',1300,s?.3:-.3);
};
const v12NodePhrase=nodePhrase;
nodePhrase=function(id,t){
 v12NodePhrase(id,t);
 if(id==='FIELD'){tone(57,t+.55,2.2,.006,'sine',1500,.3);air(t+2.6,.006,.7,-.3)}
 if(id==='ROUTE'){[.7,1.5,2.3,3.1].forEach((o,k)=>noiseHit(t+o,.035,.0045,6800+k*420,5,k%2?-.45:.45))}
 if(id==='ORBIT'){sweep(62,t+.15,3.4,.006,900,4800,'triangle',.55)}
 if(id==='PARTITION'){sweep(43,t+.2,3.6,.007,500,2200,'sawtooth',-.45)}
 if(id==='BURST'){burstAudio(t+.42,.75);noiseHit(t+.8,.12,.012,2400,1.2,0)}
 if(id==='DROP'){sweep(38,t+.1,2.6,.008,2100,320,'sawtooth',0)}
 if(id==='REWIND'){tone(50,t+2.2,1.5,.005,'sine',1100,-.4)}
 if(id==='RESIDUE'){tone(74,t+2.1,1.8,.004,'triangle',1800,.4)}
};

function v13DrawSeq(n,time){
 const p=nodePoint(n.id),r=n.r*Math.min(W,H),pat=V13_PATTERNS[n.id],steps=pat.length,cell=Math.min(7.5,r*.12),gap=1.8,total=steps*(cell+gap)-gap,x0=p.x-total/2,y=p.y+r*.34,play=tick%steps;
 for(let i=0;i<steps;i++){const on=pat[i],a=(i===play&&running)?.95:(on?.5:.10);ctx.fillStyle=`rgba(250,250,244,${a})`;ctx.fillRect(x0+i*(cell+gap),y,cell,cell*(on?1:.5));}
}
const v12DrawNode=drawNode;
drawNode=function(n,time){v12DrawNode(n,time);v13DrawSeq(n,time);if(guide&&n.id===current){const p=nodePoint(n.id),r=n.r*Math.min(W,H);ctx.fillStyle='rgba(255,255,255,.32)';ctx.font='7px ui-monospace,monospace';ctx.fillText(V13_ROLE[n.id],p.x-r*.68,p.y+r*1.22+27)}};

const v12DrawGlobal=drawGlobal;
drawGlobal=function(time){
 v12DrawGlobal(time);
 if(v13Corridor&&!current){const {A,B,t}=v13Corridor,g=ctx.createLinearGradient(A.x,A.y,B.x,B.y);g.addColorStop(0,'rgba(255,255,248,.01)');g.addColorStop(t,'rgba(255,255,248,.12)');g.addColorStop(1,'rgba(255,255,248,.01)');ctx.strokeStyle=g;ctx.lineWidth=20;ctx.beginPath();ctx.moveTo(A.x,A.y);ctx.lineTo(B.x,B.y);ctx.stroke();ctx.lineWidth=1;}
 if(current==='BURST'){const a=.025+.035*Math.max(0,Math.sin(time*.032));ctx.fillStyle=`rgba(255,255,248,${a})`;ctx.fillRect(0,0,W,H);}
 if(current==='PARTITION'&&tick%4===0){ctx.fillStyle='rgba(255,255,248,.018)';ctx.fillRect((tick*71)%W,0,Math.max(2,W*.015),H);}
};
const v12DrawEvents=drawEvents;
drawEvents=function(now){
 v12DrawEvents(now);v13Events=v13Events.filter(e=>now-e.t<1500);
 for(const e of v13Events){const age=(now-e.t)/1500,q=1-age,p=e.id?nodePoint(e.id):null;
  if(e.type==='enter2'&&p){ctx.strokeStyle=`rgba(255,255,248,${.32*q})`;ctx.lineWidth=1.2;for(let k=0;k<3;k++){ctx.beginPath();ctx.arc(p.x,p.y,20+age*(120+k*100),0,Math.PI*2);ctx.stroke()}}
  if(e.type==='exit2'&&p){ctx.strokeStyle=`rgba(255,255,248,${.18*q})`;for(let k=0;k<3;k++){ctx.beginPath();ctx.arc(p.x,p.y,30+age*(160+k*80),.25,Math.PI*1.65);ctx.stroke()}ctx.fillStyle=`rgba(255,255,248,${.025*q})`;ctx.fillRect(0,0,W,H)}
  if(e.type==='reject'&&p){ctx.setLineDash([4,7]);ctx.strokeStyle=`rgba(255,255,248,${.22*q})`;ctx.beginPath();ctx.arc(p.x,p.y,20+age*50,0,Math.PI*2);ctx.stroke();ctx.setLineDash([])}
 }
};
status.textContent='V13 · ENTER A MUSICAL LANDMARK';