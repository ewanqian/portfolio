const app=document.querySelector('#app'),stage=document.querySelector('#stage');
const glc=document.querySelector('#gl'),hud=document.querySelector('#hud'),h=hud.getContext('2d');
const gl=glc.getContext('webgl2',{alpha:false,antialias:true,premultipliedAlpha:false});
if(!gl){document.body.innerHTML='<div style="display:grid;place-items:center;width:100vw;height:100vh;color:#fff;font-size:72px">∅</div>';throw new Error('WebGL2');}

const BPM=142,BEAT=60/BPM,EIGHTH=BEAT/2,LOOK=.12,MAXP=1800,MAXV=72;
const GLYPHS=['·','•','◌','○','◉','●','◐','◑','▮','▯','△','➜','⇢','⇥','↻','⟲','⁙','╳','┼','▰','▦','▟','▞','✦','✺','⊙','↟','⇈','↶','⊘','∅','∿','⋯','✧','░','▒','▓','⌁','◎','↘','↗'];
const GI=Object.fromEntries(GLYPHS.map((g,i)=>[g,i]));
const NODES=[
{id:'F',g:'◌',x:.13,y:.72,r:.095,f:'F',next:['P','R','L'],base:[2,0,0,0,1,0,0,0],notes:[45,52,57],band:'low'},
{id:'P',g:'●',x:.32,y:.68,r:.075,f:'P',next:['F','R','X'],base:[2,0,1,0,2,0,1,0],notes:[38,38,41],band:'low'},
{id:'R',g:'➜',x:.32,y:.48,r:.082,f:'M',next:['P','O','X','F'],base:[2,0,1,0,2,1,0,1],notes:[62,65,69,72],band:'mid'},
{id:'O',g:'↻',x:.49,y:.36,r:.078,f:'M',next:['R','X','B'],base:[2,0,1,1,0,1,0,1,0,1,2,0],notes:[74,77,81,84,86],band:'high'},
{id:'X',g:'╳',x:.62,y:.46,r:.082,f:'S',next:['R','O','B','I','L'],base:[2,0,1,1,0,2,1,0],notes:[50,57,62,65],band:'wide'},
{id:'B',g:'✦',x:.76,y:.26,r:.072,f:'X',next:['O','X','I','L'],base:[2,1,0,1,2,1,0,1],notes:[81,84,89],band:'high'},
{id:'I',g:'⊙',x:.80,y:.53,r:.078,f:'X',next:['X','B','L'],base:[2,0,0,0,1,0,0,0],notes:[31,38,43],band:'low'},
{id:'L',g:'↶',x:.66,y:.75,r:.086,f:'R',next:['I','X','F'],base:[2,0,1,0,0,1,0,0],notes:[72,69,65,62],band:'wide'}
];
const BY=Object.fromEntries(NODES.map(n=>[n.id,n]));
NODES.forEach(n=>{n.pattern=Array(16).fill(0);n.base.forEach((v,i)=>n.pattern[i]=v);n.len=n.base.length;n.prob=.88;n.density=.55;n.scale=.55;n.random=.12;n.heat=0;n.phase=0;});

let W=0,H=0,DPR=1,running=false,auto=false,showLinks=false,stageMode=false;
let current=null,previous=null,pointerDown=false,last={x:0,y:0,t:0},trail=[],tick=0,nextTick=0,scheduler=null,autoBar=-1,autoStep=0,voices=0;
let ac=null,master=null,comp=null,noiseBuffer=null,history=[];
let particles=[];

function clamp(v,a,b){return Math.max(a,Math.min(b,v))} function midi(n){return 440*Math.pow(2,(n-69)/12)}
function resize(){const r=stage.getBoundingClientRect();DPR=Math.min(devicePixelRatio||1,2);W=Math.max(1,r.width);H=Math.max(1,r.height);glc.width=W*DPR;glc.height=H*DPR;hud.width=W*DPR;hud.height=H*DPR;glc.style.width=W+'px';glc.style.height=H+'px';hud.style.width=W+'px';hud.style.height=H+'px';h.setTransform(DPR,0,0,DPR,0,0);gl.viewport(0,0,glc.width,glc.height)}
addEventListener('resize',resize);resize();

const COLS=8,ROWS=Math.ceil(GLYPHS.length/COLS),CELL=96,atlas=document.createElement('canvas');atlas.width=COLS*CELL;atlas.height=ROWS*CELL;const ax=atlas.getContext('2d');ax.clearRect(0,0,atlas.width,atlas.height);ax.textAlign='center';ax.textBaseline='middle';ax.fillStyle='#fff';ax.font='64px "Segoe UI Symbol","Apple Symbols","Noto Sans Symbols 2",sans-serif';GLYPHS.forEach((g,i)=>ax.fillText(g,(i%COLS)*CELL+CELL/2,Math.floor(i/COLS)*CELL+CELL/2+3));

const vs=`#version 300 es
precision highp float;
layout(location=0) in vec2 aQuad;
layout(location=1) in vec2 iPos;
layout(location=2) in float iScale;
layout(location=3) in float iRot;
layout(location=4) in float iGlyph;
layout(location=5) in float iAlpha;
uniform vec2 uRes;
out vec2 vUv;flat out float vGlyph;out float vAlpha;
void main(){float c=cos(iRot),s=sin(iRot);vec2 q=vec2(aQuad.x*c-aQuad.y*s,aQuad.x*s+aQuad.y*c)*iScale;vec2 px=iPos+q;vec2 ndc=vec2(px.x/uRes.x*2.0-1.0,1.0-px.y/uRes.y*2.0);gl_Position=vec4(ndc,0,1);vUv=aQuad*.5+.5;vGlyph=iGlyph;vAlpha=iAlpha;}`;
const fs=`#version 300 es
precision highp float;
in vec2 vUv;flat in float vGlyph;in float vAlpha;uniform sampler2D uAtlas;uniform vec2 uGrid;out vec4 outColor;
void main(){float col=mod(vGlyph,uGrid.x);float row=floor(vGlyph/uGrid.x);vec2 uv=(vec2(col,row)+vUv)/uGrid;float a=texture(uAtlas,uv).a*vAlpha;if(a<.02)discard;outColor=vec4(vec3(.96),a);}`;
function shader(type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s}
const prog=gl.createProgram();gl.attachShader(prog,shader(gl.VERTEX_SHADER,vs));gl.attachShader(prog,shader(gl.FRAGMENT_SHADER,fs));gl.linkProgram(prog);if(!gl.getProgramParameter(prog,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(prog));gl.useProgram(prog);
const quad=new Float32Array([-1,-1,1,-1,-1,1,1,1]);const qbuf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,qbuf);gl.bufferData(gl.ARRAY_BUFFER,quad,gl.STATIC_DRAW);gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
const ibuf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,ibuf);gl.bufferData(gl.ARRAY_BUFFER,MAXP*6*4,gl.DYNAMIC_DRAW);const stride=6*4;[[1,2,0],[2,1,8],[3,1,12],[4,1,16],[5,1,20]].forEach(([loc,size,off])=>{gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,size,gl.FLOAT,false,stride,off);gl.vertexAttribDivisor(loc,1)});
const tex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tex);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,atlas);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
gl.uniform2f(gl.getUniformLocation(prog,'uGrid'),COLS,ROWS);gl.uniform1i(gl.getUniformLocation(prog,'uAtlas'),0);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);

function spawn(g,x,y,n=1,opt={}){for(let i=0;i<n&&particles.length<MAXP;i++){const a=Math.random()*Math.PI*2,sp=opt.speed??(.1+Math.random()*.5),rad=opt.radius??20;particles.push({x:x+Math.cos(a)*Math.random()*rad,y:y+Math.sin(a)*Math.random()*rad,vx:(opt.vx??0)+Math.cos(a)*sp,vy:(opt.vy??0)+Math.sin(a)*sp,scale:(opt.scale??14)*(0.7+Math.random()*.65),rot:(Math.random()-.5)*.5,vr:(Math.random()-.5)*.01,g:GI[g]??0,life:opt.life??1.5,age:0,alpha:opt.alpha??.5,drag:opt.drag??.985,mode:opt.mode||'free',cx:opt.cx??x,cy:opt.cy??y,phase:Math.random()*Math.PI*2})}}
function seed(){for(let i=0;i<220;i++)spawn(['·','•','◌','░'][i%4],Math.random()*W,Math.random()*H,1,{scale:6+Math.random()*10,alpha:.08,life:999,speed:.03,drag:1})}
seed();
function eventBurst(n,power=1){const x=n.x*W,y=n.y*H;if(n.id==='F')spawn('◌',x,y,40,{scale:14+power*16,alpha:.22,life:2.4,speed:.25,radius:80});if(n.id==='P')spawn('●',x,y,24,{scale:10+power*10,alpha:.38,life:1.2,speed:.5,radius:30});if(n.id==='R')spawn('➜',x,y,34,{scale:12+power*10,alpha:.28,life:1.5,vx:1.2+power*1.4,vy:(Math.random()-.5)*.15,radius:60});if(n.id==='O')spawn('↻',x,y,36,{scale:12+power*12,alpha:.3,life:1.8,speed:.45,radius:95,mode:'orbit',cx:x,cy:y});if(n.id==='X')spawn(['╳','┼','▦'][Math.floor(Math.random()*3)],x,y,34,{scale:11+power*12,alpha:.32,life:1.3,speed:.7,radius:90});if(n.id==='B')spawn(['✦','✺'][Math.random()>.5?0:1],x,y,70,{scale:9+power*16,alpha:.5,life:.75,speed:2.0,radius:40});if(n.id==='I')spawn('⊙',x,y,50,{scale:12+power*18,alpha:.42,life:1.0,speed:1.1,radius:120,mode:'collapse',cx:x,cy:y});if(n.id==='L')spawn(['↶','∿','⋯'][Math.floor(Math.random()*3)],x,y,46,{scale:11+power*11,alpha:.22,life:2.2,vx:-.6-power*.8,vy:(Math.random()-.5)*.3,radius:90})}
function residue(n){spawn(n.id==='B'?'·':n.g,n.x*W,n.y*H,20,{scale:8+n.scale*10,alpha:.14,life:2.8,speed:.15,radius:100})}
function updateParticles(dt,t){for(const p of particles){p.age+=dt;if(p.mode==='orbit'){const dx=p.x-p.cx,dy=p.y-p.cy,a=.35*dt;p.x=p.cx+dx*Math.cos(a)-dy*Math.sin(a);p.y=p.cy+dx*Math.sin(a)+dy*Math.cos(a)}else if(p.mode==='collapse'){p.vx+=(p.cx-p.x)*.0009;p.vy+=(p.cy-p.y)*.0009;p.x+=p.vx*dt*60;p.y+=p.vy*dt*60}else{p.x+=p.vx*dt*60;p.y+=p.vy*dt*60;p.vx*=p.drag;p.vy*=p.drag}p.rot+=p.vr*dt*60;if(p.life>100){p.x=(p.x+W)%W;p.y=(p.y+H)%H;p.alpha=.04+.03*Math.sin(t*.001+p.phase)}else p.alpha*=.994}particles=particles.filter(p=>p.life>100||p.age<p.life);while(particles.length<220)spawn(['·','•','◌','░'][particles.length%4],Math.random()*W,Math.random()*H,1,{scale:6+Math.random()*10,alpha:.06,life:999,speed:.03,drag:1})}
function renderGL(){const data=new Float32Array(Math.min(MAXP,particles.length)*6);let k=0;for(let i=0;i<particles.length&&i<MAXP;i++){const p=particles[i],fade=p.life>100?1:Math.max(0,1-p.age/p.life);data[k++]=p.x*DPR;data[k++]=p.y*DPR;data[k++]=p.scale*DPR;data[k++]=p.rot;data[k++]=p.g;data[k++]=p.alpha*fade}gl.bindBuffer(gl.ARRAY_BUFFER,ibuf);gl.bufferSubData(gl.ARRAY_BUFFER,0,data);gl.clearColor(.018,.018,.018,1);gl.clear(gl.COLOR_BUFFER_BIT);gl.useProgram(prog);gl.uniform2f(gl.getUniformLocation(prog,'uRes'),glc.width,glc.height);gl.drawArraysInstanced(gl.TRIANGLE_STRIP,0,4,Math.min(MAXP,particles.length))}
