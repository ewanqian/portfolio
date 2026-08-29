/* SRE Lab — p5.js browser ports from the 2026 Processing live-set sketches. */
const SRE = (() => {
  const configs = {
    'data-infographics': {title:'SRE / Data Infographics', modes:['RADIAL SPECTRA','ROUTER NETWORK','FLOW BUNDLES','TAG TIMELINE','INDEX MATRIX','ECO TERRAIN','TEXT VORTEX','ORBIT RELAY','PARTICLE GRAINS','BLACK INDEX']},
    'osu-signal': {title:'SRE / OSU Signal', modes:['SIGNAL CONSTELLATION','BEAT LANES','BURST FRAME','BURST MATRIX']},
    'stage-lights': {title:'SRE / Stage Lights Motor', modes:['STAGE RIG','CROSS PLANES','BLACKOUT GRID','RUNWAY WASH','CLUB SHUTTERS','DEEP FLAGS','STROBE GRID','BLACK MOTOR']},
    'midi-monitor': {title:'SRE / MIDI Signal Monitor', modes:['SIGNAL MONITOR']},
    'index-disc': {title:'SRE / Index Disc Stage', modes:['CENTRAL DISC','FIVE DIAL ARRAY','ORBIT ROUTER','SCAN COMPASS','DENSE INDEX FIELD','BLACK DISC BUS','CAGED CLOUD']},
    'fog-scan': {title:'SRE / Fog Scan Lab', modes:['DEPTH GRID','FOG STACK','STAGE BLOCKS','SIGNAL ALTAR','VERTICAL SCAN','L/R SWEEP','TOP/DOWN SWEEP','BLOCK MATRIX','TUNNEL PULSE','SILENT BLACK']},
    'wide-gui': {title:'SRE / Wide GUI', modes:['ROTARY SIGNAL','STABLE SCAN','TARGET STACK','V4 STARTING','ENTRY SPINE','TRIAD DATA WALL','ALERT SCAN WALL','STAR WALL','ORBIT ROUTE WALL','BLACK GLASS']},
    'wire-studies': {title:'SRE / Wire Studies', modes:['VANISHING FRAME','NODE CHAIN','GATE STACK','VECTOR SCORE','RUNWAY CATHEDRAL','IMPACT BURST','MONOLITH SCAN','COMPASS ARRAY','SPLIT CAMERA','BLACK PULSE']}
  };

  let demo, cfg, mode=0, bpm=100, beat=0, note=0, cc=0, flash=0, step=0, nextBeat=0, midiStatus='KEYBOARD / POINTER';
  let hits=[], nodes=[], bursts=[];
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const pulse=(s=1)=>{ note=Math.max(note,s); flash=Math.max(flash,s*.45); bursts.push({x:random(width),y:random(height),a:1,s:18+100*s}); };

  function setup(){
    demo=(document.body.dataset.demo||'data-infographics'); cfg=configs[demo]||configs['data-infographics'];
    createCanvas(windowWidth, windowHeight, WEBGL); pixelDensity(1); frameRate(60); textFont('monospace'); strokeCap(SQUARE); noFill();
    nextBeat=millis(); seed(); setupMidi();
  }
  function seed(){ nodes=[]; for(let i=0;i<48;i++) nodes.push({x:random(-.46,.46),y:random(-.34,.34),z:random(-1,.15),p:random(TWO_PI),v:random(.2,1)}); }
  function windowResized(){ resizeCanvas(windowWidth,windowHeight); }
  function tick(){
    const now=millis(); if(now>=nextBeat){ beat=1; step=(step+1)%16; nextBeat=now+60000/bpm; if(demo==='osu-signal') spawnHit(); }
    beat*=.88; note*=.9; cc*=.92; flash*=.86;
    for(const b of bursts)b.a*=.91; bursts=bursts.filter(b=>b.a>.03);
    for(const h of hits){h.r-=h.speed;h.a*=.994;} hits=hits.filter(h=>h.r>7&&h.a>.03);
  }
  function draw(){ tick(); background(0); perspective(PI/3,width/Math.max(1,height),1,10000); drawDemo(); drawBurstOverlay(); drawHud(); }
  function keyPressed(){
    if(key>='1'&&key<='9'){ mode=clamp(parseInt(key)-1,0,cfg.modes.length-1); pulse(.7); }
    if(key==='0'){ mode=clamp(9,0,cfg.modes.length-1); pulse(.7); }
    if(key===' '){ pulse(1); return false; }
    if(key==='ArrowRight'){mode=(mode+1)%cfg.modes.length;pulse(.55);}
    if(key==='ArrowLeft'){mode=(mode-1+cfg.modes.length)%cfg.modes.length;pulse(.55);}
  }
  function mousePressed(){ pulse(clamp(mouseY/Math.max(1,height),.35,1)); if(demo==='osu-signal') judgeHit(mouseX-width/2,mouseY-height/2); }
  function mouseMoved(){ cc=Math.max(cc,abs(movedX)+abs(movedY)>8?.35:0); }

  async function setupMidi(){
    if(!navigator.requestMIDIAccess)return;
    try{ const access=await navigator.requestMIDIAccess(); let count=0; for(const input of access.inputs.values()){ input.onmidimessage=onMidi; count++; } if(count)midiStatus=`WEB MIDI / ${count} INPUT${count>1?'S':''}`; }
    catch(e){}
  }
  function onMidi(e){ const [s,d1=0,d2=0]=e.data, type=s&0xf0; if(s===0xf8){beat=1;return;} if(type===0x90&&d2>0){pulse(d2/127); if(d1>=84&&d1<84+cfg.modes.length)mode=d1-84;} if(type===0xb0){cc=Math.max(cc,d2/127); if(d1===1)bpm=40+(d2/127)*180;} }

  function drawDemo(){
    if(demo==='data-infographics')drawData(); else if(demo==='osu-signal')drawOsu(); else if(demo==='stage-lights')drawLights(); else if(demo==='midi-monitor')drawMonitor(); else if(demo==='index-disc')drawDisc(); else if(demo==='fog-scan')drawFog(); else if(demo==='wide-gui')drawGui(); else drawWire();
  }
  function U(){return Math.min(width/10,height*.7)}
  function grid(alpha=55){ const u=U(); stroke(255,alpha); strokeWeight(1); for(let x=-width/2;x<width/2;x+=u*.7)line(x,-height/2,x,height/2); for(let y=-height/2;y<height/2;y+=u*.45)line(-width/2,y,width/2,y); }
  function ring(x,y,r,a=180){ stroke(255,a); circle(x,y,r*2); }
  function beatRail(y=height*.36){ stroke(255,70); line(-width*.45,y,width*.45,y); for(let i=0;i<16;i++){ let x=map(i,0,15,-width*.45,width*.45); if(i===step)fill(255);else noFill(); circle(x,y,3+(i===step?8*beat:0)); } noFill(); }

  function drawData(){
    const u=U(), t=millis()/1000; if(mode!==9)grid(18);
    if(mode===0){ for(let i=0;i<96;i++){ const a=TWO_PI*i/96+t*.05,r=u*(1.05+.22*sin(i*.41+t)); const h=u*(.18+.75*(.5+.5*sin(i*.23+t*1.8))+note*.5); push(); rotate(a); translate(r,0); stroke(255,90+130*(i%7===step%7)); line(0,0,h,0); pop(); } ring(0,0,u*.62,170); }
    else if(mode===1){ for(let i=0;i<nodes.length;i++){ let n=nodes[i],x=n.x*width,y=n.y*height; stroke(255,120); circle(x,y,2+5*n.v); let m=nodes[(i*7+11)%nodes.length]; if(i%2===0)line(x,y,m.x*width,m.y*height); } }
    else if(mode===2){ noFill(); for(let i=0;i<28;i++){ stroke(255,45+i%5*22); beginShape(); for(let j=0;j<8;j++)curveVertex(map(j,0,7,-width*.48,width*.48), sin(i*.7+j*.8+t)*height*.16 + map(i,0,27,-height*.28,height*.28)); endShape(); } }
    else if(mode===3){ for(let i=0;i<70;i++){let x=map(i,0,69,-width*.47,width*.47);stroke(255,55);line(x,-height*.22,x,height*.22); if((i+step)%11===0){fill(255);noStroke();circle(x,0,5+18*beat);noFill();}} beatRail(); }
    else if(mode===4){ for(let y=0;y<14;y++)for(let x=0;x<84;x++){let v=(x*13+y*7+step)%17; stroke(255,v<3?200:35); rect(map(x,0,84,-width*.47,width*.47),map(y,0,14,-height*.33,height*.28),width*.009,height*.028);} }
    else if(mode===5){ rotateX(-.58); rotateZ(.12*sin(t*.15)); for(let i=0;i<70;i++){let n=nodes[i%nodes.length]; push();translate(n.x*width,n.y*height,n.z*u*4);stroke(255,70+120*n.v);box(u*.18*(.5+n.v),u*.18*(.5+n.v),u*(.6+1.8*n.v));pop();} }
    else if(mode===6){ for(let i=0;i<120;i++){let a=i*.43+t*.18,r=3+i*3.2;push();translate(cos(a)*r,sin(a)*r*.44);rotate(a);fill(255,40+i%5*35);noStroke();textSize(8+3*(i%4));text(['DATA','FLOW','MIDI','PHASE','INDEX'][i%5],0,0);pop();}noFill(); }
    else if(mode===7){ rotateY(t*.12); ring(0,0,u*1.25,130); for(let i=0;i<180;i++){let a=i*2.399,t2=acos(map(i,0,179,-1,1)),r=u*1.25;stroke(255,60+(i%13===step%13?180:0));point(r*sin(t2)*cos(a),r*cos(t2),r*sin(t2)*sin(a));} }
    else if(mode===8){ for(let i=0;i<700;i++){let x=((i*73)%997)/997*width-width/2,y=((i*193)%991)/991*height-height/2;stroke(255,20+90*((i+step)%19===0));point(x+sin(t+i)*3,y+cos(t*.8+i)*3);} }
    else { background(0); stroke(255,150+100*beat); ring(0,0,u*(.6+beat*.3)); beatRail(0); }
  }

  function spawnHit(){ const lanes=5; hits.push({x:map(step%lanes,0,lanes-1,-width*.34,width*.34),y:random(-height*.18,height*.18),r:120+random(40),speed:1.1+random(.5),a:1}); }
  function judgeHit(x,y){ let best=null,dist=1e9; for(const h of hits){let d=Math.hypot(x-h.x,y-h.y);if(d<dist){dist=d;best=h;}} if(best&&dist<best.r*.7){pulse(1);best.a=.05;} }
  function drawOsu(){ const t=millis()/1000; grid(12); if(mode===0){for(let i=0;i<70;i++){let a=i*.89+t*.08,r=(i%17)*28+35;stroke(255,35+i%8*15);point(cos(a)*r,sin(a*1.2)*r*.45);if(i%9===0)ring(cos(a)*r,sin(a)*r*.45,8+beat*9,90);}} else {for(let i=0;i<5;i++){let x=map(i,0,4,-width*.34,width*.34);stroke(255,45);line(x,-height*.34,x,height*.34);} for(const h of hits){stroke(255,220*h.a);ring(h.x,h.y,h.r,220*h.a);ring(h.x,h.y,18,120*h.a);} if(mode===2){stroke(255,170*beat);rect(-width*.43,-height*.29,width*.86,height*.58);} if(mode===3){for(let i=0;i<32;i++){let x=map(i%16,0,15,-width*.43,width*.43),y=(i<16?-1:1)*height*.28;fill(255,((i+step)%5===0?190:35));noStroke();rect(x,y,6,16+note*22);}noFill();}} }

  function drawLights(){ const u=U(),t=millis()/1000; rotateX(-.28); translate(0,height*.08,-u); grid(14); if(mode===7){background(0);stroke(255,140*beat);line(-width*.4,0,width*.4,0);return;} const count=mode===6?9:6; for(let i=0;i<count;i++){let x=map(i,0,count-1,-width*.36,width*.36),z=-u*(1+i*.42),sw=sin(t*(.7+i*.09)+i)*u*.6; push();translate(x, -height*.22, z);stroke(255,80+130*((i+step)%4===0));line(0,0,sw,height*.54,0); if(mode===0||mode===3){line(0,0,-sw*.4,height*.54,u*.7);}pop();} if(mode===1){for(let z=0;z<8;z++){push();translate(0,0,-z*u*.6);stroke(255,55);rect(-width*.34,-height*.25,width*.68,height*.5);pop();}} if(mode===2||mode===6){for(let i=0;i<24;i++){let x=map(i%12,0,11,-width*.4,width*.4),y=(i<12?-1:1)*height*.24;stroke(255,(i+step)%3===0?220:35);rect(x,y,14+beat*18,20+note*35);}} if(mode===4){for(let i=0;i<12;i++){let x=map(i,0,11,-width*.42,width*.42);stroke(255,(i+step)%4===0?230:35);line(x,-height*.32,x,height*.32);}} if(mode===5){for(let i=0;i<8;i++){push();translate(map(i,0,7,-width*.36,width*.36),0,-i*u*.3);stroke(255,90);rect(-u*.13,-height*.3,u*.26,height*.6);pop();}} }

  function drawMonitor(){ const u=U(); grid(20); ring(0,0,u*(.6+beat*.08),220); ring(0,0,u*(.38+note*.12),100); for(let i=0;i<24;i++){let a=TWO_PI*i/24-HALF_PI,l=u*(.5+.7*((i+step)%7===0?beat:.12));stroke(255,55+180*((i+step)%7===0));line(cos(a)*u*.7,sin(a)*u*.7,cos(a)*(u*.7+l),sin(a)*(u*.7+l));} for(let i=0;i<16;i++){let x=map(i,0,15,-width*.43,width*.43),v=i===step?1:.12;fill(255,40+215*v);noStroke();rect(x,height*.28,8,-height*.19*v);}noFill(); }

  function drawDisc(){ const u=U(),t=millis()/1000; grid(12); const d=(x,y,r,s)=>{push();translate(x,y);rotate(t*.08*s);for(let k=0;k<32;k++){let a=TWO_PI*k/32;stroke(255,k%4===step%4?190:45);line(cos(a)*r*.72,sin(a)*r*.72,cos(a)*r,sin(a)*r);}ring(0,0,r,170);ring(0,0,r*.55,70);pop();}; if(mode===0)d(0,0,u*1.25,1); else if(mode===1)for(let i=0;i<5;i++)d(map(i,0,4,-width*.35,width*.35),0,u*.45,i%2?1:-1); else if(mode===2){d(0,0,u*.8,1);for(let i=0;i<12;i++){let a=TWO_PI*i/12+t*.08;d(cos(a)*u*1.6,sin(a)*u*.55,u*.15,-1);}} else if(mode===3){d(0,0,u*.8,1);stroke(255,150);line(-width*.42,0,width*.42,0);line(0,-height*.34,0,height*.34);} else if(mode===4){for(let i=0;i<44;i++)d(map(i%11,0,10,-width*.42,width*.42),map(floor(i/11),0,3,-height*.26,height*.26),u*.12,(i%2?1:-1));} else if(mode===5){background(0);d(0,0,u*.68,1);beatRail(0);} else {rotateX(-.6);for(let i=0;i<36;i++){let n=nodes[i];push();translate(n.x*width,n.y*height,n.z*u*3);stroke(255,80);box(u*.16);pop();}d(0,0,u*.5,1);} }

  function drawFog(){ const u=U(),t=millis()/1000; if(mode===9)return; rotateX(-.32); grid(15); if(mode<=3){for(let i=0;i<46;i++){let n=nodes[i],z=map(i,0,45,-u*6,u*.6),a=25+95*(.5+.5*sin(t*.4+i));push();translate(n.x*width,n.y*height,z);stroke(255,a);box(u*(.16+n.v*.3),u*(.12+n.v*.2),u*(.4+n.v));pop();}} if(mode===4||mode===5||mode===6){for(let i=0;i<28;i++){let p=(i/27+t*.16)%1;stroke(255,35+180*(1-p)); if(mode===4)line(map(i,0,27,-width*.42,width*.42),-height*.34,map(i,0,27,-width*.42,width*.42),height*.34);if(mode===5)line(-width*.45,map(i,0,27,-height*.3,height*.3),width*.45,map(i,0,27,-height*.3,height*.3));if(mode===6){let y=map(p,0,1,-height*.35,height*.35);line(-width*.45,y,width*.45,y);}}} if(mode===7){for(let i=0;i<54;i++){let x=map(i%18,0,17,-width*.42,width*.42),y=map(floor(i/18),0,2,-height*.23,height*.23);stroke(255,(i+step)%7===0?220:45);rect(x,y,u*.12,u*.12);}} if(mode===8){for(let z=0;z<18;z++){push();translate(0,0,-z*u*.5);stroke(255,25+130*(z%4===step%4));rect(-width*.32,-height*.25,width*.64,height*.5);pop();}} }

  function drawGui(){ const u=U(),t=millis()/1000; grid(18); stroke(255,45); rect(-width*.46,-height*.34,width*.92,height*.68); if(mode===0){for(let i=0;i<5;i++){push();translate(map(i,0,4,-width*.34,width*.34),0);rotate(t*(i%2?.15:-.15));ring(0,0,u*(.35+i*.03),170);for(let j=0;j<12;j++){let a=TWO_PI*j/12;line(cos(a)*u*.12,sin(a)*u*.12,cos(a)*u*.36,sin(a)*u*.36);}pop();}} else if(mode===1){for(let i=0;i<30;i++){let y=map(i,0,29,-height*.3,height*.3);stroke(255,(i+step)%7===0?200:35);line(-width*.44,y,width*.44,y);}} else if(mode===2){for(let i=0;i<4;i++){ring(0,0,u*(.45+i*.32),70+i*30);stroke(255,100);line(-u*1.7,0,u*1.7,0);line(0,-u*1.1,0,u*1.1);}} else if(mode===3){for(let i=0;i<24;i++){let x=map(i%8,0,7,-width*.38,width*.38),y=map(floor(i/8),0,2,-height*.23,height*.23);push();translate(x,y);rotate((i%2?-1:1)*(t*.3+i));stroke(255,(i+step)%5===0?220:55);rect(-u*.14,-u*.14,u*.28,u*.28);line(-u*.2,0,u*.2,0);pop();}} else if(mode===4){stroke(255,180);line(0,-height*.3,0,height*.3);for(let i=0;i<18;i++){let y=map(i,0,17,-height*.28,height*.28),w=u*(.2+(i%5)*.13);line(-w,y,w,y);}} else if(mode===5||mode===6){for(let r=0;r<18;r++){let y=map(r,0,17,-height*.29,height*.29);for(let c=0;c<3;c++){let x=map(c,0,2,-width*.3,width*.3);stroke(255,(r+c+step)%6===0?220:38);rect(x-u*.45,y-u*.08,u*.9,u*.14);}}} else if(mode===7){for(let i=0;i<180;i++){let a=i*2.399+t*.02,r=sqrt(i)*u*.12;stroke(255,25+120*(i%17===step));point(cos(a)*r,sin(a)*r*.5);}} else if(mode===8){for(let i=0;i<9;i++){let a=TWO_PI*i/9+t*.1,x=cos(a)*u*1.8,y=sin(a)*u*.55;ring(x,y,u*.16,110);stroke(255,60);line(0,0,x,y);}} else {background(0);stroke(255,100+120*beat);rect(-width*.25,-height*.18,width*.5,height*.36);ring(0,0,u*.35,180);} }

  function drawWire(){ const u=U(),t=millis()/1000; if(mode===9){background(0);stroke(255,170*beat);ring(0,0,u*.45,180);return;} rotateX(-.18); if(mode===0||mode===4){for(let i=0;i<16;i++){let z=-i*u*.55,s=1+i*.16;push();translate(0,0,z);stroke(255,35+130*(i%4===step%4));rect(-u*1.7*s,-u*.48*s,u*3.4*s,u*.96*s);pop();}} else if(mode===1){for(let i=0;i<nodes.length-1;i++){let a=nodes[i],b=nodes[i+1];stroke(255,45+120*a.v);line(a.x*width,a.y*height,a.z*u*3,b.x*width,b.y*height,b.z*u*3);if(i%5===0){push();translate(a.x*width,a.y*height,a.z*u*3);box(5+8*a.v);pop();}}} else if(mode===2){for(let i=0;i<13;i++){push();translate(0,0,-i*u*.6);stroke(255,40+140*(i%4===step%4));rect(-width*.3,-height*.24,width*.6,height*.48);pop();}} else if(mode===3){for(let i=0;i<42;i++){let x=map(i,0,41,-width*.42,width*.42),h=sin(i*.7+t)*height*.18;stroke(255,45+100*(i%6===step%6));line(x,0,x,h);line(x,h,x+u*.18,h);}} else if(mode===5){for(let i=0;i<44;i++){let a=TWO_PI*i/44,r=u*(.25+i*.035)*(1+beat*.3);stroke(255,40+160*(i%4===step%4));line(0,0,cos(a)*r,sin(a)*r*.55);}} else if(mode===6){stroke(255,170);rect(-u*.7,-height*.3,u*1.4,height*.6);for(let i=0;i<21;i++){let y=map(i,0,20,-height*.27,height*.27);stroke(255,(i+step)%5===0?210:45);line(-u*.7,y,u*.7,y);}} else if(mode===7){ring(0,0,u*.8,150);for(let i=0;i<24;i++){let a=TWO_PI*i/24;stroke(255,50+140*(i%4===step%4));line(cos(a)*u*.3,sin(a)*u*.3,cos(a)*u*1.3,sin(a)*u*.75);}} else if(mode===8){stroke(255,100);line(0,-height*.32,0,height*.32);for(let side=-1;side<=1;side+=2){push();translate(side*width*.22,0);rotateY(side*.35*sin(t*.2));for(let i=0;i<8;i++)rect(-u*.55,-height*.22+i*u*.11,u*1.1,u*.08);pop();}} }

  function drawBurstOverlay(){ push();resetMatrix();translate(-width/2,-height/2); for(const b of bursts){stroke(255,180*b.a);ring(b.x,b.y,b.s*(2-b.a),180*b.a);} pop(); }
  function drawHud(){ push();resetMatrix();translate(-width/2,-height/2); noStroke();fill(0,190);rect(12,12,Math.min(540,width-24),74); fill(255);textSize(12);text(cfg.title,24,34);fill(180);text(`${String(mode+1).padStart(2,'0')} / ${cfg.modes[mode]}   ·   ${Math.round(bpm)} BPM   ·   STEP ${String(step+1).padStart(2,'0')}`,24,54);text(`${midiStatus}   ·   1–0 MODE   ←/→ MODE   SPACE HIT   POINTER HIT`,24,73); pop(); }

  return {setup,draw,windowResized,keyPressed,mousePressed,mouseMoved};
})();
window.setup=SRE.setup; window.draw=SRE.draw; window.windowResized=SRE.windowResized; window.keyPressed=SRE.keyPressed; window.mousePressed=SRE.mousePressed; window.mouseMoved=SRE.mouseMoved;
