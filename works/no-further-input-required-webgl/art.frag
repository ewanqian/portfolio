#version 300 es
precision highp float;
precision highp int;
out vec4 outColor;
uniform vec2 uResolution;
uniform float uTime;

const float PI=3.141592653589793;
const float ASP=1.8775510204081634; // 1840 / 980
const vec3 BG=vec3(7.0,7.0,4.0)/255.0;
const vec3 INK=vec3(232.0,234.0,223.0)/255.0;

float sat(float x){return clamp(x,0.0,1.0);}
float hash11(float p){return fract(sin(p*127.1+311.7)*43758.5453123);}
float hash21(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float pulse(float x,float c,float w){return 1.0-smoothstep(w,w+0.0025,abs(x-c));}
float band(float t,float a,float b,float e){return smoothstep(a,a+e,t)*(1.0-smoothstep(b-e,b,t));}
vec2 asp(vec2 p){return vec2(p.x*ASP,p.y);}
float seg(vec2 p,vec2 a,vec2 b){
  p=asp(p);a=asp(a);b=asp(b);
  vec2 pa=p-a,ba=b-a;
  float h=clamp(dot(pa,ba)/dot(ba,ba),0.0,1.0);
  return length(pa-ba*h);
}
float lineInk(float d,float px,float gain){
  float w=px/max(uResolution.y,1.0);
  return gain*(1.0-smoothstep(w,w*2.25,d));
}
float boxFill(vec2 p,vec2 c,vec2 h){
  vec2 q=abs(p-c)-h;
  return 1.0-step(0.0,max(q.x,q.y));
}
float boxStroke(vec2 p,vec2 c,vec2 h,float px){
  vec2 q=abs(p-c)-h;
  float d=abs(max(q.x,q.y));
  return (1.0-step(0.0,max(q.x,q.y)) + step(0.0,max(q.x,q.y)))* (1.0-smoothstep(px/uResolution.y,px*2.2/uResolution.y,d));
}

vec2 designUV(vec2 f,out float inside){
  float va=uResolution.x/uResolution.y;
  vec2 uv=f;
  if(va>ASP){
    float s=ASP/va;
    inside=step((1.0-s)*0.5,f.x)*step(f.x,(1.0+s)*0.5);
    uv.x=(f.x-(1.0-s)*0.5)/s;
  }else{
    float s=va/ASP;
    inside=step((1.0-s)*0.5,f.y)*step(f.y,(1.0+s)*0.5);
    uv.y=(f.y-(1.0-s)*0.5)/s;
  }
  return uv;
}

float majorGrid(vec2 uv,float pressure){
  vec2 g=vec2(10.0,6.0);
  vec2 f=fract(uv*g);
  float dx=min(f.x,1.0-f.x)/g.x*ASP;
  float dy=min(f.y,1.0-f.y)/g.y;
  float d=min(dx,dy);
  return lineInk(d,0.52,0.032+0.018*pressure);
}

float projectionLayer(vec2 uv,float t,float history){
  vec2 q=(uv-vec2(.075,.105))/vec2(.85,.74);
  if(q.x<0.0||q.x>1.0||q.y<0.0||q.y>1.0)return 0.0;
  vec2 cell=floor(q*vec2(4.0,3.0));
  vec2 l=fract(q*vec2(4.0,3.0));
  float id=cell.x+cell.y*4.0;
  float drift=.018*sin(t*.045+id*1.71)+.007*sin(t*.11+id*.41);
  vec2 c=vec2(.5);
  vec2 a=vec2(.17,.22);
  vec2 b=vec2(.82,.18+drift);
  vec2 cc=vec2(.77,.80);
  vec2 d=vec2(.21,.76-drift*.7);
  vec2 ia=mix(c,a,.67)+vec2(drift*.5,-drift*.25);
  vec2 ib=mix(c,b,.64)+vec2(-drift*.32,drift*.42);
  vec2 ic=mix(c,cc,.69)+vec2(drift*.24,drift*.18);
  vec2 idd=mix(c,d,.61)+vec2(-drift*.44,-drift*.12);
  float ink=0.0;
  ink+=lineInk(seg(l,a,b),.72,.19);
  ink+=lineInk(seg(l,b,cc),.72,.19);
  ink+=lineInk(seg(l,cc,d),.72,.19);
  ink+=lineInk(seg(l,d,a),.72,.19);
  ink+=lineInk(seg(l,ia,ib),.58,.17);
  ink+=lineInk(seg(l,ib,ic),.58,.17);
  ink+=lineInk(seg(l,ic,idd),.58,.17);
  ink+=lineInk(seg(l,idd,ia),.58,.17);
  ink+=lineInk(seg(l,a,ia),.50,.12);
  ink+=lineInk(seg(l,b,ib),.50,.12);
  ink+=lineInk(seg(l,cc,ic),.50,.12);
  ink+=lineInk(seg(l,d,idd),.50,.12);
  float mb=min(min(l.x,1.0-l.x)*ASP,min(l.y,1.0-l.y));
  ink+=lineInk(mb,.45,.055);
  if(history>.01){
    vec2 gh=l+vec2(.010*sin(id*2.2),.012*cos(id*1.3));
    ink+=history*.16*lineInk(seg(gh,ia,ib),.52,1.0);
    ink+=history*.11*lineInk(seg(gh,ic,idd),.52,1.0);
  }
  float scan=fract(t/17.0)*1.22-.11;
  float reveal=.72+.75*exp(-abs(q.x-scan)*34.0);
  return ink*reveal;
}

float signalLayer(vec2 uv,float t,float history,float recall){
  vec2 q=(uv-vec2(.07,.08))/vec2(.86,.84);
  if(q.x<0.0||q.x>1.0||q.y<0.0||q.y>1.0)return 0.0;
  vec2 rf=fract(q*vec2(10.0,18.0));
  float rail=min(rf.x,1.0-rf.x)/10.0*ASP;
  float level=min(rf.y,1.0-rf.y)/18.0;
  float ink=lineInk(rail,.48,.052+history*.055)+lineInk(level,.42,.018);
  float qt=floor(t/1.45);
  float routePhase=fract(t/1.45);
  for(int e=0;e<12;e++){
    float fe=float(e);
    float x0=.06+.88*hash11(fe*17.3+2.0);
    float y0=.04+.92*hash11(fe*23.1+7.0);
    float x1=clamp(x0+(.14+.22*hash11(fe*9.2))*((hash11(fe*3.7)>.5)?1.0:-1.0),.03,.97);
    float y1=clamp(y0+(.09+.24*hash11(fe*5.4))*((hash11(fe*8.9)>.5)?1.0:-1.0),.03,.97);
    x0=floor(x0*10.0+.5)/10.0; x1=floor(x1*10.0+.5)/10.0;
    y0=floor(y0*18.0+.5)/18.0; y1=floor(y1*18.0+.5)/18.0;
    float d=seg(q,vec2(x0,y0),vec2(x1,y1));
    float persist=.022+history*(.025+.055*hash11(fe+4.0));
    float active=1.0-step(.5,abs(mod(qt-fe,12.0)-.0));
    float prev=1.0-step(.5,abs(mod(qt-fe-1.0,12.0)-.0));
    float cue=active*(1.0-smoothstep(.60,1.0,routePhase))+prev*smoothstep(0.0,.32,routePhase)*(1.0-smoothstep(.55,.95,routePhase));
    cue+=recall*.32*(1.0-step(.22,hash11(fe*2.3+floor(t/7.0))));
    ink+=lineInk(d,.55,persist+.34*cue);
  }
  return ink;
}

float constraintLayer(vec2 uv,float t,float history){
  vec2 q=(uv-vec2(.075,.09))/vec2(.85,.80);
  if(q.x<0.0||q.x>1.0||q.y<0.0||q.y>1.0)return 0.0;
  vec2 grid=vec2(10.0,6.0);
  vec2 cell=floor(q*grid);
  vec2 l=fract(q*grid);
  float cid=cell.x+cell.y*10.0;
  float dx=min(l.x,1.0-l.x)/grid.x*ASP;
  float dy=min(l.y,1.0-l.y)/grid.y;
  float ink=lineInk(min(dx,dy),.55,.055);
  float activation=34.0+hash11(cid*9.17+3.0)*68.0;
  float accepted=step(hash11(cid*4.83+1.0),.43);
  float held=smoothstep(activation,activation+2.4,t)*(1.0-smoothstep(158.0,178.0,t))*accepted;
  float candidate=band(t,activation-1.2,activation+2.0,.35);
  float diag=seg(l,vec2(.08,.08),vec2(.92,.92));
  ink+=lineInk(diag,.68,.11*candidate+(.10+.14*history)*held);
  float anchorTop=lineInk(seg(l,vec2(.46,.0),vec2(.54,.0)),1.3,.24*(candidate+held*.25));
  float anchorBot=lineInk(seg(l,vec2(.46,1.0),vec2(.54,1.0)),1.3,.17*(candidate+held*.20));
  ink+=anchorTop+anchorBot;
  return ink;
}

float indexLayer(vec2 uv,float t,float history,float recall){
  vec2 q=(uv-vec2(.06,.08))/vec2(.88,.84);
  if(q.x<0.0||q.x>1.0||q.y<0.0||q.y>1.0)return 0.0;
  vec2 grid=vec2(32.0,18.0);
  vec2 cid=floor(q*grid);
  vec2 l=fract(q*grid);
  float h=hash21(cid+vec2(19.0,7.0));
  float exists=step(.79,h);
  float typ=step(.90,h);
  float access=hash21(cid+vec2(4.0,31.0));
  float group=mod(floor(t/2.1),9.0);
  float gid=mod(cid.x+cid.y*2.0,9.0);
  float active=1.0-step(.5,abs(group-gid));
  float pre=recall*step(.82,access);
  float a=exists*(.045+history*.045+active*.22+pre*.13);
  vec2 c=vec2(.5);
  float square=boxStroke(l,c,vec2(.14),.75)*typ;
  float dash=boxFill(l,c,vec2(.27,.035))*(1.0-typ);
  return a*(square+dash);
}

float memoryLayer(vec2 uv,float t,float inputActivity,float autonomy,float recall,float density){
  vec2 q=(uv-vec2(.035,.055))/vec2(.93,.89);
  if(q.x<0.0||q.x>1.0||q.y<0.0||q.y>1.0)return 0.0;
  const float COLS=54.0;
  const float ROWS=26.0;
  vec2 gc=q*vec2(COLS,ROWS);
  vec2 cell=floor(gc);
  vec2 l=fract(gc);
  float row=cell.y;
  float col=cell.x;
  float stepNow=floor(t/.50);
  float born=stepNow-row;
  float h=hash21(vec2(col,born*1.37+11.0));
  float h2=hash21(vec2(col*3.1+5.0,born*.73));
  float sourceEnergy=.20+.60*inputActivity+.42*autonomy;
  float threshold=.80-.11*density-.06*sourceEnergy;
  float exists=step(threshold,h);
  float important=step(.945-.035*sourceEnergy,h2)*exists;
  float age=row/(ROWS-1.0);
  float ageAtt=mix(.96,.08,pow(age,.82));
  float dash=boxFill(l,vec2(.5),vec2(.31,.038));
  float sq=boxFill(l,vec2(.5),vec2(.13));
  float mark=mix(dash,sq,important);
  float ink=mark*exists*ageAtt*(.10+.18*density);
  float base=floor(hash11(floor(t/7.0))*15.0)+12.0;
  float chainCol=mod(base+row*1.62,COLS);
  float chain=1.0-step(.66,abs(col-chainCol));
  float chainGate=step(.56,hash11(row*2.7+floor(t/7.0)));
  ink+=recall*chain*chainGate*sq*(.26+.44*(1.0-age));
  return ink;
}

float sierpinskiMemory(vec2 uv,float recall){
  if(recall<.01)return 0.0;
  vec2 q=(uv-vec2(.34,.20))/vec2(.32,.52);
  if(q.x<0.0||q.x>1.0||q.y<0.0||q.y>1.0)return 0.0;
  int ix=int(floor(q.x*32.0));
  int iy=int(floor(q.y*32.0));
  if(ix<0||iy<0||ix>=32||iy>=32)return 0.0;
  int tri=ix+iy;
  if(tri>=32)return 0.0;
  int m=(ix & iy);
  float keep=(m==0)?1.0:0.0;
  vec2 l=fract(q*32.0);
  float sq=boxFill(l,vec2(.5),vec2(.12));
  return recall*.16*keep*sq*(.35+.65*(1.0-q.y));
}

float recursiveAssembly(vec2 uv,float t,float history,float autonomy){
  float ink=0.0;
  float a=.055+.12*history+.09*autonomy;
  ink+=lineInk(seg(uv,vec2(.56,.08),vec2(.56,.92)),.85,a);
  ink+=lineInk(seg(uv,vec2(.08,.43),vec2(.56,.43)),.85,a*.88);
  ink+=lineInk(seg(uv,vec2(.56,.67),vec2(.92,.67)),.85,a*.92);
  ink+=lineInk(seg(uv,vec2(.23,.08),vec2(.23,.43)),.75,a*.72);
  ink+=lineInk(seg(uv,vec2(.38,.43),vec2(.38,.92)),.75,a*.76);
  ink+=lineInk(seg(uv,vec2(.75,.08),vec2(.75,.67)),.75,a*.70);
  ink+=lineInk(seg(uv,vec2(.56,.27),vec2(.92,.27)),.75,a*.72);
  ink+=lineInk(seg(uv,vec2(.12,.69),vec2(.38,.69)),.75,a*.62);
  ink+=lineInk(seg(uv,vec2(.72,.67),vec2(.72,.92)),.75,a*.66);
  float qt=floor(t/5.0);
  for(int i=0;i<8;i++){
    float fi=float(i);
    vec2 p0=vec2(.10+.77*hash11(fi*13.2+2.0),.11+.72*hash11(fi*17.9+5.0));
    vec2 s=vec2(.07+.12*hash11(fi*7.1),.06+.12*hash11(fi*3.7));
    vec2 p1=clamp(p0+s,vec2(.0),vec2(1.0));
    float chosen=1.0-step(.18,abs(mod(qt-fi,8.0)));
    float d=seg(uv,p0,p1);
    ink+=lineInk(d,.70,(.025+.055*history)+chosen*.21*autonomy);
  }
  return ink;
}

float eventPass(vec2 uv,float t,float pressure,float recall){
  float ink=0.0;
  float cueT=fract(t/11.0);
  float row=floor(hash11(floor(t/11.0))*6.0)+.5;
  float y=.09+.82*row/6.0;
  float open=band(cueT,0.06,.34,.06);
  float x0=.08+.35*hash11(floor(t/11.0)+2.0);
  float x1=.62+.30*hash11(floor(t/11.0)+9.0);
  ink+=lineInk(seg(uv,vec2(x0,y),vec2(x1,y)),1.1,.30*open*pressure);
  float shutter=band(fract(t/29.0),.02,.08,.02);
  float sy=.15+.70*hash11(floor(t/29.0)+17.0);
  ink+=lineInk(seg(uv,vec2(.08,sy),vec2(.92,sy)),1.4,.18*shutter*pressure);
  float diag=band(fract((t+4.0)/23.0),.03,.18,.04)*recall;
  ink+=lineInk(seg(uv,vec2(.18,.78),vec2(.83,.24)),.9,.16*diag);
  return ink;
}

void main(){
  vec2 f=gl_FragCoord.xy/uResolution.xy;
  f.y=1.0-f.y;
  float inside=1.0;
  vec2 uv=designUV(f,inside);
  if(inside<.5){outColor=vec4(BG,1.0);return;}

  float t=mod(uTime,180.0);
  float intro=band(t,8.0,47.0,10.0);
  float absorb=band(t,30.0,102.0,18.0);
  float build=band(t,64.0,137.0,18.0);
  float recall=band(t,112.0,160.0,11.0);
  float remainder=1.0-band(t,15.0,166.0,15.0);
  float inputActivity=1.0-smoothstep(56.0,118.0,t);
  float history=smoothstep(38.0,122.0,t)*(1.0-.68*smoothstep(158.0,180.0,t));
  float autonomy=smoothstep(92.0,146.0,t)*(1.0-.35*smoothstep(163.0,180.0,t));
  float density=.18+.38*absorb+.46*build+.12*recall;
  float pressure=.15+.36*intro+.42*absorb+.58*recall+.10*autonomy;

  float fieldLift=2.0/255.0 + 4.0/255.0*(.5+.5*sin(2.0*PI*t/17.0))*pressure;
  vec3 color=BG+vec3(fieldLift);
  float ink=majorGrid(uv,pressure);

  float wProj=.09+.48*intro+.30*absorb+.08*recall+.05*remainder;
  float wSignal=.04+.50*absorb+.22*build+.42*recall;
  float wConstraint=.03+.45*absorb+.28*build+.12*recall;
  float wIndex=.11+.12*intro+.18*history+.12*remainder;
  float wMemory=.04+.24*absorb+.76*build+.52*recall+.18*autonomy;
  float wAssembly=.02+.08*absorb+.40*build+.52*autonomy+.18*recall;

  ink+=wProj*projectionLayer(uv,t,history);
  ink+=wSignal*signalLayer(uv,t,history,recall);
  ink+=wConstraint*constraintLayer(uv,t,history);
  ink+=wIndex*indexLayer(uv,t,history,recall);
  ink+=wMemory*memoryLayer(uv,t,inputActivity,autonomy,recall,density);
  ink+=sierpinskiMemory(uv,recall);
  ink+=wAssembly*recursiveAssembly(uv,t,history,autonomy);
  ink+=eventPass(uv,t,pressure,recall);

  float edge=min(min(uv.x,1.0-uv.x)*ASP,min(uv.y,1.0-uv.y));
  float edgeFade=smoothstep(.0,.045,edge);
  ink*=mix(.72,1.0,edgeFade);
  ink=1.0-exp(-ink*1.34);
  color=mix(color,INK,sat(ink));
  outColor=vec4(color,1.0);
}
