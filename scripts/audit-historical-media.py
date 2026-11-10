#!/usr/bin/env python3
"""Read-only recovery audit. Original Git blobs only: no PDF extraction, OCR or invented media.
Inspect all fetched refs, preserve immutable blob IDs and original paths, and export
candidate originals for manual review. Nothing is promoted to a public gallery here.
"""
import json, re, subprocess, hashlib
from pathlib import Path, PurePosixPath
from urllib.parse import unquote, urlsplit
OUT = Path('qa-artifacts/media-recovery')
OUT.mkdir(parents=True, exist_ok=True)
TARGET = re.compile(r'kashiwa|titan|timer|drop[-_ ]?flow|柏大辅|卡西瓦|控时者|滴流', re.I)
IMAGES = {'.jpg','.jpeg','.png','.webp','.avif','.gif'}
TEXT = {'.md','.html','.json','.jsx','.tsx','.js','.csv'}
def git(*args):
    return subprocess.check_output(['git', *args])
def dump(name, data):
    p=OUT/name;p.parent.mkdir(parents=True,exist_ok=True)
    p.write_text(json.dumps(data, ensure_ascii=False, indent=2)+'\n',encoding='utf-8')
objects=[]
for line in git('rev-list','--objects','--all').decode().splitlines():
    pair=line.split(' ',1)
    if len(pair)==2:objects.append({'sha':pair[0],'path':pair[1]})
current={}
for line in git('ls-tree','-r','--full-tree','HEAD').decode().splitlines():
    meta,p=line.split('\t',1);mode,kind,sha=meta.split()
    if kind=='blob':current[p]=sha
sizes={}
proc=subprocess.run(['git','cat-file','--batch-check=%(objectname) %(objecttype) %(objectsize)'],input=('\n'.join(x['sha'] for x in objects)+'\n').encode(),stdout=subprocess.PIPE,check=True)
for line in proc.stdout.decode().splitlines():
    sha,kind,size=line.split()
    if kind=='blob':sizes[sha]=int(size)
refs=git('for-each-ref','--format=%(refname) %(objectname)').decode().splitlines()
dump('refs.json',refs)
paths=sorted({x['path'] for x in objects if TARGET.search(x['path'])})
dump('matching-historical-paths.json',paths)
# Include exact old published entrypoints and canonical registries, not just target-named folders.
extra={'README.md','index.html','content/cv-records-2026-11.json','content/project-registry-2026-11.json','database/works.json','database/identity-crosswalk-2026-11.json','database/media-publication-register-2026-11.json','database/evidence-reconciliation-2026-11.json','public/data/ewan-encyclopedia.json','public/data/ewan-media-index.json','react/src/data/siteDisplay.js','react/src/data/siteTaxonomy.js','AGENTS.md'}
text_rows=[];ref_paths=set();external=[];text_count=0
for x in objects:
    p=x['path'];ext=PurePosixPath(p).suffix.lower()
    if ext not in TEXT or sizes.get(x['sha'],0)>1500000:continue
    if not TARGET.search(p) and p not in extra:continue
    if p.startswith(('assets/index-','portfolio/assets/index-','node_modules/')):continue
    data=git('cat-file','blob',x['sha'])
    try:s=data.decode('utf-8')
    except UnicodeDecodeError:continue
    if p in {'README.md','index.html'} and not TARGET.search(s):continue
    dest=OUT/'text-blobs'/(x['sha']+ext);dest.parent.mkdir(exist_ok=True);dest.write_bytes(data)
    mana=sorted(set(re.findall(r'https?://(?:www\.)?manamana\.net/[^\s\)\]<>"\x27]+',s)))
    imgs=[]
    for match in re.finditer(r'(?:src\s*=\s*["\x27]|["\x27]|\]\()([^\s"\x27<>\)]+\.(?:png|jpe?g|webp|avif|gif))(?:[?#][^\s"\x27<>\)]*)?',s,re.I):
        val=unquote(match.group(1));imgs.append(val)
        if val.startswith(('http:','https:')):
            external.append({'source_path':p,'source_blob':x['sha'],'url':val})
            u=urlsplit(val)
            if 'raw.githubusercontent.com' in u.netloc:
                parts=u.path.lstrip('/').split('/',3)
                if len(parts)==4 and parts[0:2]==['ewanqian','portfolio']:ref_paths.add(parts[3])
        else:
            import posixpath
            for candidate in [val.lstrip('/'),posixpath.normpath(posixpath.join(str(PurePosixPath(p).parent),val)),val.removeprefix('/portfolio/')]:
                ref_paths.add(candidate)
    text_rows.append({**x,'bytes':len(data),'is_current':current.get(p)==x['sha'],'artifact':str(dest.relative_to(OUT)),'mana_urls':mana,'image_refs':sorted(set(imgs)),'headings':re.findall(r'^#{1,4} .+',s,re.M)[:80]})
    text_count+=1
# Prefer native project folders; still export candidate derivatives separately and flag them.
media=[];total=0;max_total=300*1024*1024
for x in objects:
    p=x['path'];ext=PurePosixPath(p).suffix.lower()
    if ext not in IMAGES:continue
    if not TARGET.search(p) and p not in ref_paths:continue
    size=sizes.get(x['sha'],0)
    row={**x,'bytes':size,'is_current':current.get(p)==x['sha'],'path_exists_now':p in current,'pdf_or_layout_suspect':bool(re.search(r'pdf|extracted|cv[-_/]|page[-_]?\d|portfolio[-_]?page',p,re.I))}
    if size<=18000000 and total+size<=max_total:
        data=git('cat-file','blob',x['sha']);dest=OUT/'original-blobs'/(x['sha']+ext);dest.parent.mkdir(exist_ok=True);dest.write_bytes(data)
        row.update({'artifact':str(dest.relative_to(OUT)),'sha256':hashlib.sha256(data).hexdigest()});total+=size
    else:row['not_exported']='size budget; blob remains available in Git'
    media.append(row)
# Current files useful for repairing routes and for reviewing provenance, without credentials.
current_paths=set(paths)|extra|{'scripts/audit-archive-preservation.mjs','scripts/build-project-record-pages.mjs','scripts/build-cv-project-links.mjs','react/scripts/copy-workspace-assets.mjs','works/cv.html','content/publication-manifest-2026-11.json'}
for p in current_paths:
    if p in current and PurePosixPath(p).suffix.lower() in TEXT and sizes.get(current[p],0)<1500000:
        dest=OUT/'current'/p;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(git('cat-file','blob',current[p]))
# Recover commits and deletions/renames for every path, not just current files.
log=git('-c','core.quotePath=false','log','--all','--date=iso-strict','--format=@@COMMIT %H %aI %s','--name-status','--find-renames','--',*paths)
(OUT/'target-history.txt').write_bytes(log)
# Also retain messages from the very first uploads to distinguish a fabricated empty directory from a deleted asset.
(OUT/'all-commit-subjects.txt').write_bytes(git('log','--all','--reverse','--date=iso-strict','--format=%H %aI %s'))
dump('text-versions.json',text_rows);dump('media-blobs.json',media);dump('external-image-refs.json',external)
summary={'head':git('rev-parse','HEAD').decode().strip(),'commit_count_all_refs':int(git('rev-list','--all','--count')),'historical_target_paths':len(paths),'text_versions':text_count,'media_versions':len(media),'exported_bytes':total,'missing_now_media_versions':sum(not x['path_exists_now'] for x in media),'policy':'No PDF rasterisation. Originals are historical candidates; association, edition and source-image quality require review before publication.'}
dump('summary.json',summary)
print(json.dumps(summary,ensure_ascii=False,indent=2))
