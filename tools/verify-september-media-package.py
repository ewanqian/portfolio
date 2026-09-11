"""Decode and validate the derived package; compare source files with initial hashes."""
import csv,json,subprocess,hashlib,re
from pathlib import Path
repo=Path(__file__).resolve().parents[1];folder=repo/'docs/media-packages/september-2026'
assets=json.loads((folder/'asset-manifest.json').read_text(encoding='utf-8'))
sources=json.loads((folder/'source-manifest.json').read_text(encoding='utf-8'))
errors=[];checks=[]
def sha(p):
 h=hashlib.sha256()
 with p.open('rb') as f:
  for b in iter(lambda:f.read(8*1024*1024),b''):h.update(b)
 return h.hexdigest()
assert len(assets)==len(list(csv.DictReader((folder/'asset-manifest.csv').open(encoding='utf-8-sig'))))
assert len({a['path'] for a in assets})==len(assets)
for a in assets:
 p=repo/a['path'];assert p.is_file();assert sha(p)==a['sha256']
 assert re.fullmatch(r'[a-z0-9-]+\.(mp4|avif)',p.name)
 m=json.loads(subprocess.check_output(['ffprobe','-v','error','-count_frames','-show_streams','-show_format','-of','json',str(p)]))
 # AVIF can expose both its default still item and a separate timed sequence.
 v=max((s for s in m['streams'] if s['codec_type']=='video'),key=lambda s:int(s.get('nb_read_frames',0)))
 result=subprocess.run(['ffmpeg','-v','error','-i',str(p),'-map','0:v','-f','null','-'],capture_output=True)
 if result.returncode or result.stderr:errors.append({'path':a['path'],'error':result.stderr.decode(errors='replace')})
 assert not any(s['codec_type']=='audio' for s in m['streams'])
 assert v['width']==a.get('width',v['width']) and v['height']==a.get('height',v['height'])
 if p.suffix=='.mp4':
  assert v['codec_name']=='h264' and v['pix_fmt']=='yuv420p'
  if '16x9' in p.name:assert v['width']*9==v['height']*16
  if '9x16' in p.name:assert v['width']*16==v['height']*9
  if 'source_in' in a:assert abs(float(m['format']['duration'])-(a['source_out']-a['source_in']))<.08
 if a['role']=='animated-image':assert int(v['nb_read_frames'])==36
 elif p.suffix=='.avif':assert int(v['nb_read_frames'])==1
 checks.append(dict(path=a['path'],width=v['width'],height=v['height'],frames=int(v['nb_read_frames']),duration=m['format'].get('duration'),decode='pass' if result.returncode==0 else 'fail'))
for s in sources:assert sha(Path(s['original_path']))==s['sha256']
copyfiles=['projects/atmospheric-escape-2026.md','projects/no-further-input-required-2026.md','projects/reactor-2026-09-05.md']
for rel in copyfiles:
 t=(repo/rel).read_text(encoding='utf-8')
 assert not re.search(r'\b(TODO|NEEDS_REVIEW|draft|verify|approval|source.path)\b|待确认|待审核|证据|源路径',t,re.I)
report={'assets':len(assets),'total_bytes':sum(a['size_bytes'] for a in assets),'source_files_unchanged':len(sources),'decode_errors':errors,'checks':checks,'public_copy_manual_check':'passed bounded wording and source review; not official gate','official_quality_gate':'unavailable: required macOS path absent on Windows','browser_animation_playback':'not tested; no webpage built'}
(folder/'validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
assert not errors,errors
print(json.dumps({k:v for k,v in report.items() if k!='checks'}))
