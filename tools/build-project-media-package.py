"""Create selected derived media only. Never modify source media; never upload."""
import argparse, csv, hashlib, json, subprocess, io
from pathlib import Path
from PIL import Image, ImageOps

REPO = Path(__file__).resolve().parents[1]
REPORT = REPO / 'docs/media-packages/260912-01-live-performance'
SOURCE = Path(r'E:\wip\media-inventory-20260911-155919\quality-review-v1\media-manifest.json')
AE='assets/works/atmospheric-escape'
NFI='assets/works/no-further-input-required'
REACTOR='assets/events/reactor-2026-09-05'
SCAN='assets/library/scans/factory/memory-factory'
PHOTOS=[
 (1,AE,'atmospheric-escape-entropy-orbit-panorama-photo-arcky','环绕屏幕中的轨道图形与现场表演者。','Orbital graphics and performers within the wraparound screen.'),
 (2,AE,'atmospheric-escape-entropy-audience-orbit-photo-hejian-z','观众视角下的轨道图形与顶部屏幕。','Orbital graphics and overhead screen seen from the audience.'),
 (24,AE,'atmospheric-escape-entropy-spacecraft-portrait','竖向构图中的航天器结构与表演者。','Spacecraft structures and performers in a portrait composition.'),
 (27,AE,'atmospheric-escape-entropy-particle-panorama','粒子形态延伸至正面与顶部屏幕。','Particle forms extend across the front and overhead screens.'),
 (12,'assets/events/entropy-2026-09-05','entropy-live-performers-photo-hejian-z','ENTROPY 现场的双人操作。','Two performers operating their setups at ENTROPY.'),
 (10,SCAN,'memory-factory-entropy-pointcloud-panorama-photo-hejian-z','工厂点云在 ENTROPY 现场环绕屏幕中的呈现。','Factory point-cloud imagery across the wraparound screens at ENTROPY.'),
 (14,SCAN,'memory-factory-entropy-hall-depth-photo-hejian-z','厂房点云的纵深结构与现场表演者。','The depth of the factory point cloud alongside live performers.'),
 (46,NFI,'no-further-input-required-exhibition-photo-longlonglong','《无需进一步输入》的展陈与作品标签。','No Further Input Required on display with its artwork label.'),
 (47,NFI,'no-further-input-required-entangled-exhibition-poster','采用《无需进一步输入》图像的展览海报。','Exhibition poster featuring imagery from No Further Input Required.'),
]
# In/out are seconds in original files. Native 16:9 sources only for highlights.
CLIPS=[
 (33,AE,'atmospheric-escape-entropy-orbit-highlight',7.8,18.8,'轨道图形与上下屏幕的空间呼应。','Orbital graphics connect the front and overhead screens.'),
 (35,AE,'atmospheric-escape-entropy-performers-highlight',1.5,6.8,'轨道图形前的现场表演者。','Performers in front of the orbital graphics.'),
 (37,AE,'atmospheric-escape-entropy-particle-highlight',0.35,4.75,'粒子形态在双屏空间中展开。','Particle forms unfold across the two-screen space.'),
 (41,AE,'atmospheric-escape-entropy-spacecraft-highlight',0.4,7.8,'航天器结构在环绕屏幕中变化。','Spacecraft structures change across the wraparound screen.'),
 (43,SCAN,'memory-factory-entropy-pointcloud-highlight',0.4,6.5,'工厂点云的现场动态呈现。','Factory point-cloud imagery in a live setting.'),
 (48,REACTOR,'reactor-2026-09-05-geometric-highlight',14.5,24.5,'REACTOR 现场的红色几何图形。','Red geometric imagery at REACTOR.'),
 (48,REACTOR,'reactor-2026-09-05-rectilinear-highlight',39.5,55.5,'REACTOR 现场的矩形结构变化。','Changing rectilinear structures at REACTOR.'),
]

def run(args, data=None):
 p=subprocess.run(args,input=data,capture_output=True)
 if p.returncode: raise RuntimeError(p.stderr.decode('utf-8',errors='replace')[-4000:])
 return p.stdout

def digest(p):
 h=hashlib.sha256()
 with Path(p).open('rb') as f:
  for b in iter(lambda:f.read(8*1024*1024),b''):h.update(b)
 return h.hexdigest()

def avif(im,p,replace_derived=False):
 if p.exists() and not replace_derived: return
 p.parent.mkdir(parents=True,exist_ok=True)
 b=io.BytesIO();im.save(b,format='PNG')
 run(['ffmpeg','-v','error','-y' if replace_derived else '-n','-i','pipe:0','-frames:v','1','-c:v','libaom-av1','-still-picture','1','-cpu-used','6','-crf','25','-pix_fmt','yuv420p','-threads','4',str(p)],b.getvalue())

def probe(p):return json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)]))

def main():
 REPORT.mkdir(parents=True,exist_ok=True)
 source=json.loads(SOURCE.read_text(encoding='utf-8')); lookup={int(r['id'][1:]):r for r in source}; products=[]
 def entry(p,r,role,caption,en,**extra):
  products.append(dict(path=p.relative_to(REPO).as_posix(),source_ids=[r['id']],source_sha256=[r['sha256']],role=role,caption_zh=caption,caption_en=en,photographer=r['photographer'],rights_status=r['rights_status'],publication_ready=False,**extra))
 for n,folder,slug,caption,en in PHOTOS:
  r=lookup[n]
  with Image.open(r['original_path']) as im:
   im=ImageOps.exif_transpose(im).convert('RGB')
   for role,bound in [('hero',2400),('preview',1600),('thumb',640)]:
    small=im.copy();small.thumbnail((bound,bound),Image.Resampling.LANCZOS)
    p=REPO/folder/f'{slug}-{role}.avif';avif(small,p)
    entry(p,r,role,caption,en,width=small.width,height=small.height,upscaled=False,requested_long_edge=bound)
  print('photo',n,flush=True)
 for n,folder,slug,start,end,caption,en in CLIPS:
  r=lookup[n];p=REPO/folder/f'{slug}-16x9.mp4';p.parent.mkdir(parents=True,exist_ok=True)
  if not p.exists():
   run(['ffmpeg','-v','error','-n','-ss',str(start),'-i',r['original_path'],'-t',str(end-start),'-map','0:v:0','-an','-vf',"scale=w='min(1920,iw)':h=-2,fps=30,setsar=1",'-c:v','libx264','-preset','medium','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart','-map_metadata','-1',str(p)])
  meta=probe(p);v=next(s for s in meta['streams'] if s['codec_type']=='video')
  entry(p,r,'highlight',caption,en,source_in=start,source_out=end,duration=float(meta['format']['duration']),width=v['width'],height=v['height'],audio='silent',upscaled=False)
  poster_time=.5 if n==41 else (end-start)/2
  b=run(['ffmpeg','-v','error','-ss',str(poster_time),'-i',str(p),'-frames:v','1','-f','image2pipe','-vcodec','png','pipe:1'])
  im=Image.open(io.BytesIO(b));im.thumbnail((1600,1600))
  poster=REPO/folder/f'{slug}-poster.avif';avif(im,poster,replace_derived=(n==41));entry(poster,r,'poster',caption,en,width=im.width,height=im.height,source_time=start+poster_time)
  print('clip',n,flush=True)
 # Silent 20.7-second editorial reel; hard cuts preserve each segment's visual language.
 selected=[x for x in products if x['role']=='highlight' and x['path'].startswith(AE) and 'spacecraft-highlight' not in x['path']]
 reel=REPO/AE/'atmospheric-escape-entropy-selected-live-16x9.mp4'
 if not reel.exists():
  args=['ffmpeg','-v','error','-n']
  for x in selected:args+=['-i',str(REPO/x['path'])]
  run(args+['-filter_complex',''.join(f'[{i}:v:0]' for i in range(len(selected)))+f'concat=n={len(selected)}:v=1:a=0[v]','-map','[v]','-c:v','libx264','-preset','medium','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',str(reel)])
 products.append(dict(path=reel.relative_to(REPO).as_posix(),source_ids=[i for x in selected for i in x['source_ids']],source_sha256=[i for x in selected for i in x['source_sha256']],role='selected-reel',caption_zh='ATMOSPHERIC ESCAPE · ENTROPY 现场节选',caption_en='ATMOSPHERIC ESCAPE · Selected moments at ENTROPY',photographer='unknown',rights_status='unknown',publication_ready=False,audio='silent',edits=[dict(path=x['path'],source_in=x['source_in'],source_out=x['source_out']) for x in selected]))
 # Explicitly requested animated AVIF, derived from real footage; MP4 remains available.
 motion=REPO/SCAN/'memory-factory-entropy-pointcloud-motion.avif'
 if not motion.exists():run(['ffmpeg','-v','error','-n','-ss','0.5','-i',lookup[43]['original_path'],'-t','3','-an','-vf','fps=12,scale=960:540','-c:v','libaom-av1','-cpu-used','7','-crf','32','-b:v','0','-pix_fmt','yuv420p','-row-mt','1','-threads','4','-loop','0',str(motion)])
 entry(motion,lookup[43],'animated-image','工厂点云现场片段，3 秒循环。','A three-second loop of factory point-cloud imagery in performance.',source_in=.5,source_out=3.5,width=960,height=540,fps=12,frames=36,fallback='assets/library/scans/factory/memory-factory/memory-factory-entropy-pointcloud-highlight-16x9.mp4')
 # The only REACTOR scan source is portrait; keep its aspect ratio honest.
 r=lookup[50];p=REPO/SCAN/'memory-factory-reactor-2026-09-05-pointcloud-highlight-9x16.mp4'
 if not p.exists():run(['ffmpeg','-v','error','-n','-ss','0.5','-i',r['original_path'],'-t','10','-map','0:v:0','-an','-vf','fps=30,setsar=1','-c:v','libx264','-preset','medium','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart','-map_metadata','-1',str(p)])
 entry(p,r,'highlight','REACTOR 现场的工厂点云，竖版记录。','Factory point-cloud imagery at REACTOR, recorded in portrait orientation.',source_in=.5,source_out=10.5,width=720,height=1280,duration=10,audio='silent',upscaled=False)
 poster=REPO/SCAN/'memory-factory-reactor-2026-09-05-pointcloud-highlight-poster.avif'
 b=run(['ffmpeg','-v','error','-ss','4','-i',str(p),'-frames:v','1','-f','image2pipe','-vcodec','png','pipe:1']);im=Image.open(io.BytesIO(b));avif(im,poster)
 entry(poster,r,'poster','REACTOR 现场的工厂点云。','Factory point-cloud imagery at REACTOR.',width=720,height=1280,source_time=4.5)
 # Event poster frame for REACTOR, with appropriate native resolution.
 for x in products:
  p=REPO/x['path'];x['size_bytes']=p.stat().st_size;x['sha256']=digest(p)
  x['creator']='unknown';x['sequence']='unknown'
  x['project']='ATMOSPHERIC ESCAPE' if x['path'].startswith(AE) else 'No Further Input Required' if x['path'].startswith(NFI) else 'Personal Scan Library / Factory Scans / Memory Factory' if x['path'].startswith(SCAN) else 'unknown'
  x['event']='REACTOR 2026.09.05' if 'reactor' in x['path'] else 'ENTROPY 2026.09.05 Shanghai' if 'entropy' in x['path'] else 'Entangled: Day for Night / Inclusion Conference 2026'
  if x['role']=='selected-reel':
   m=probe(p);v=next(s for s in m['streams'] if s['codec_type']=='video');x.update(width=v['width'],height=v['height'],duration=float(m['format']['duration']))
 (REPORT/'asset-manifest.json').write_text(json.dumps(products,ensure_ascii=False,indent=2),encoding='utf-8')
 with (REPORT/'asset-manifest.csv').open('w',encoding='utf-8-sig',newline='') as f:
  keys=list(dict.fromkeys(k for r in products for k in r));w=csv.DictWriter(f,fieldnames=keys);w.writeheader()
  for r in products:w.writerow({k:json.dumps(v,ensure_ascii=False) if isinstance(v,(list,dict)) else v for k,v in r.items()})
 # Internal provenance includes all initial files and ratings, even unselected material.
 (REPORT/'source-manifest.json').write_text(json.dumps(source,ensure_ascii=False,indent=2),encoding='utf-8')
 print(json.dumps({'assets':len(products),'bytes':sum(r['size_bytes'] for r in products)}),flush=True)

if __name__=='__main__':main()
