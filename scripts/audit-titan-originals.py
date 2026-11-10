#!/usr/bin/env python3
import hashlib,json,struct
from pathlib import Path
source=json.loads(Path('assets/data/titan-tracks.json').read_text())
tracks=source['tracks'];assert len(tracks)==10
assert len({x['id'] for x in tracks})==10
originals=[x for x in tracks if x['original']];assert len(originals)==9
assert len([x for x in tracks if x['mana']])==8
assert next(x for x in tracks if x['id']=='09')['related_edition']=='CAN Festival'
for x in tracks:
 for field in ['preview','cover']:
  p=Path(source['asset_base'])/x[field];assert p.is_file(),p
 if x['original']:
  p=Path(source['asset_base'])/x['original'];raw=p.read_bytes()
  assert raw.startswith(b'\x89PNG\r\n\x1a\n'),p
  assert struct.unpack('>II',raw[16:24])==(x['width'],x['height']),p
  sha=hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()
  assert sha==x['blob'],f'Original blob changed: {p}'
print('PASS: 10 covers, 9 exact original PNG blobs, 8 Shenzhen MANA links; CAN Festival Phantom separate')
