(async()=>{'use strict';
const canvas=document.getElementById('stage');
const gate=document.getElementById('gate');
const LOOP=180;
const params=new URLSearchParams(location.search);
let startedAt=performance.now();
let pausedOffset=Math.max(0,Math.min(179.999,Number(params.get('t'))||0));
let audio=null;
let recorder=null;
let recorded=[];
let recording=false;

const gl=canvas.getContext('webgl2',{alpha:false,antialias:false,depth:false,stencil:false,preserveDrawingBuffer:false,powerPreference:'high-performance'});
if(!gl){
  document.body.innerHTML='<div style="display:grid;place-items:center;width:100%;height:100%;background:#070704;color:#d8d8d0;font:12px monospace">WebGL 2 required</div>';
  return;
}

const vert=`#version 300 es
in vec2 aPosition;
void main(){gl_Position=vec4(aPosition,0.0,1.0);}`;

const frag=await fetch('./art.frag',{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('shader load failed');return r.text();});

function compile(type,source){
  const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);
  if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){
    const msg=gl.getShaderInfoLog(s);console.error(msg);throw new Error(msg);
  }
  return s;
}
const program=gl.createProgram();
gl.attachShader(program,compile(gl.VERTEX_SHADER,vert));
gl.attachShader(program,compile(gl.FRAGMENT_SHADER,frag));
gl.linkProgram(program);
if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program));
gl.useProgram(program);

const buffer=gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1, 3,-1, -1,3]),gl.STATIC_DRAW);
const loc=gl.getAttribLocation(program,'aPosition');
gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
const uResolution=gl.getUniformLocation(program,'uResolution');
const uTime=gl.getUniformLocation(program,'uTime');

function resize(){
  const dpr=Math.min(window.devicePixelRatio||1,2);
  const w=Math.max(1,Math.floor(innerWidth*dpr));
  const h=Math.max(1,Math.floor(innerHeight*dpr));
  if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);}
}

function timeline(){return ((performance.now()-startedAt)/1000+pausedOffset)%LOOP;}
function frame(){
  resize();
  const t=timeline();
  gl.uniform2f(uResolution,canvas.width,canvas.height);
  gl.uniform1f(uTime,t);
  gl.drawArrays(gl.TRIANGLES,0,3);
  if(audio)audio.update(t);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

function mulberry32(a){return()=>{let t=a+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}

class AudioEngine{
  constructor(){
    const AC=window.AudioContext||window.webkitAudioContext;
    this.ctx=new AC();
    this.master=this.ctx.createGain();
    this.master.gain.value=.18;
    this.streamDest=this.ctx.createMediaStreamDestination();
    this.master.connect(this.ctx.destination);
    this.master.connect(this.streamDest);
    this.rand=mulberry32(260825);
    this.lastPulse=-1;
    this.lastMajor=-1;
    this.initNoise();
    this.initDrone();
  }
  initNoise(){
    const sr=this.ctx.sampleRate,len=sr*8,buf=this.ctx.createBuffer(1,len,sr),d=buf.getChannelData(0),r=mulberry32(92811);
    let lp=0;
    for(let i=0;i<len;i++){lp=lp*.985+(r()*2-1)*.015;d[i]=lp;}
    const src=this.ctx.createBufferSource();src.buffer=buf;src.loop=true;
    const hp=this.ctx.createBiquadFilter();hp.type='highpass';hp.frequency.value=34;
    const lpF=this.ctx.createBiquadFilter();lpF.type='lowpass';lpF.frequency.value=340;lpF.Q.value=.72;
    const g=this.ctx.createGain();g.gain.value=.055;
    src.connect(hp).connect(lpF).connect(g).connect(this.master);src.start();
    this.noiseFilter=lpF;
  }
  initDrone(){
    this.droneGain=this.ctx.createGain();this.droneGain.gain.value=.0001;
    const f=this.ctx.createBiquadFilter();f.type='lowpass';f.frequency.value=190;f.Q.value=.9;
    this.droneGain.connect(f).connect(this.master);
    [41.203,55.0,82.407].forEach((hz,i)=>{
      const o=this.ctx.createOscillator();o.type=i===1?'triangle':'sine';o.frequency.value=hz;o.detune.value=(i-1)*3.2;
      const g=this.ctx.createGain();g.gain.value=[.19,.12,.05][i];o.connect(g).connect(this.droneGain);o.start();
    });
    this.droneGain.gain.setTargetAtTime(.07,this.ctx.currentTime,.8);
  }
  ping(freq,amp=.035,dur=.11,delay=0){
    const now=this.ctx.currentTime+delay,o=this.ctx.createOscillator(),g=this.ctx.createGain(),f=this.ctx.createBiquadFilter();
    o.type='sine';o.frequency.value=freq;f.type='lowpass';f.frequency.value=720;f.Q.value=.7;
    g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(amp,now+.012);g.gain.exponentialRampToValueAtTime(.0001,now+dur);
    o.connect(f).connect(g).connect(this.master);o.start(now);o.stop(now+dur+.04);
  }
  update(t){
    if(this.ctx.state==='suspended')return;
    const history=Math.max(0,Math.min(1,(t-38)/84))*(1-.68*Math.max(0,Math.min(1,(t-158)/22)));
    const autonomy=Math.max(0,Math.min(1,(t-92)/54));
    this.noiseFilter.frequency.setTargetAtTime(170+210*history+90*Math.sin(t*.07+1.2),this.ctx.currentTime,.3);
    this.droneGain.gain.setTargetAtTime(.035+.040*history+.025*autonomy,this.ctx.currentTime,.5);
    const pulse=Math.floor(t/1.45);
    if(pulse!==this.lastPulse){
      this.lastPulse=pulse;
      const gate=(pulse*37)%11;
      if(gate<5||t>108){
        const scale=[55,61.735,73.416,82.407,110];
        const f=scale[pulse%scale.length];
        this.ping(f,t>112?.030:.018,t>112?.15:.08);
        if(t>122&&pulse%4===0)this.ping(f*2,.012,.055,.07);
      }
    }
    const major=Math.floor(t/29);
    if(major!==this.lastMajor){
      this.lastMajor=major;
      if(t>6)this.ping(41.203,.045,.32);
    }
  }
}

async function enter(){
  gate.classList.add('hide');document.body.classList.add('running');
  let fs=null;
  if(!document.fullscreenElement){try{fs=document.documentElement.requestFullscreen({navigationUI:'hide'});}catch(_){}}
  if(!audio){audio=new AudioEngine();await audio.ctx.resume();}
  else if(audio.ctx.state==='suspended')await audio.ctx.resume();
  if(fs){try{await fs;}catch(_){}}
}

gate.addEventListener('pointerdown',enter,{once:true});
addEventListener('dblclick',enter);
addEventListener('keydown',async e=>{
  const k=e.key.toLowerCase();
  if(k==='f'){if(!document.fullscreenElement)try{await document.documentElement.requestFullscreen({navigationUI:'hide'});}catch(_){ }else document.exitFullscreen();}
  if(k==='s'){await enter();}
  if(k==='0'){startedAt=performance.now();pausedOffset=0;}
  if('12345'.includes(k)){const jumps={1:15,2:45,3:82,4:126,5:162};startedAt=performance.now();pausedOffset=jumps[k];}
  if(k==='r'){if(!recording)startRecording();else stopRecording();}
});

function startRecording(){
  if(recording)return;
  const stream=canvas.captureStream(60);
  if(audio){for(const track of audio.streamDest.stream.getAudioTracks())stream.addTrack(track);}
  const types=['video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm'];
  const mimeType=types.find(x=>MediaRecorder.isTypeSupported(x))||'';
  recorded=[];recorder=new MediaRecorder(stream,mimeType?{mimeType,videoBitsPerSecond:28000000}:undefined);
  recorder.ondataavailable=e=>{if(e.data&&e.data.size)recorded.push(e.data);};
  recorder.onstop=()=>{
    const blob=new Blob(recorded,{type:recorder.mimeType||'video/webm'}),a=document.createElement('a');
    a.href=URL.createObjectURL(blob);a.download='no-further-input-required-webgl.webm';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),4000);
  };
  recorder.start(1000);recording=true;
}
function stopRecording(){if(!recording||!recorder)return;recording=false;recorder.stop();}
})();
