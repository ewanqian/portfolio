#!/usr/bin/env python3
"""Generate and validate both release PDFs from the selected bilingual record set."""
from pathlib import Path
import json, hashlib, subprocess, sys
import fitz
from weasyprint import HTML
ROOT=Path(__file__).resolve().parents[1]
subprocess.run(['node','scripts/build-cv-publication.mjs'],cwd=ROOT,check=True)
profile=json.loads((ROOT/'content/cv-selection.json').read_text())
ids={id for section in profile['sections'] for id in section['record_ids']}
manifest_path=ROOT/'content/publication-manifest-2026-11.json'
manifest=json.loads(manifest_path.read_text())
input_paths=['content/cv-records-2026-11.json','content/cv-selection.json','docs/cv-publication/templates/cv-zh.html','docs/cv-publication/templates/cv-en.html','assets/cv/portrait-r1.1.jpg','scripts/build-cv-publication.mjs','scripts/render-cv-publication.py']
input_hash=hashlib.sha256(b''.join((ROOT/p).read_bytes() for p in input_paths)).hexdigest()
if manifest.get('bilingual_publication',{}).get('generator_input_sha256')==input_hash:
    valid=all((ROOT/'assets/cv'/a['file_name']).exists() and hashlib.sha256((ROOT/'assets/cv'/a['file_name']).read_bytes()).hexdigest()==a['sha256'] for a in manifest['cv_pdf'].values())
    if valid:
        print('CV PDFs already match all generation inputs; preserving verified release status')
        sys.exit(0)

if manifest.get('release')!='CV / Portfolio Release '+profile['release']:
    manifest['previous_cv_pdf']=manifest['cv_pdf']
artifacts={}
for lang in ('zh','en'):
    source=ROOT/f'works/cv-print-{lang}.html'
    name=f'Ewan_Qian_CV_2026-11_R{profile["release"]}_{lang.upper()}.pdf'
    target=ROOT/'assets/cv'/name
    HTML(filename=str(source)).write_pdf(str(target))
    doc=fitz.open(target)
    if len(doc)!=3: raise RuntimeError(f'{lang}: expected 3 pages, found {len(doc)}')
    actual={link['uri'].rsplit('/',1)[-1].removesuffix('.html') for page in doc for link in page.get_links() if '/works/records/' in link.get('uri','')}
    if actual!=ids: raise RuntimeError(f'{lang}: PDF record links differ from selection')
    text=''.join(page.get_text() for page in doc)
    if '\ufffd' in text: raise RuntimeError(f'{lang}: replacement glyph in PDF')
    artifacts[lang]={'file_name':name,'pages':3,'size_bytes':target.stat().st_size,'sha256':hashlib.sha256(target.read_bytes()).hexdigest(),'public_url':'https://ewanqian.site/assets/cv/'+name,'distinct_record_links':len(actual),'source_html':'works/cv-print-'+lang+'.html'}
    print(lang, '3 pages,',len(actual),'record targets,',target.stat().st_size,'bytes')
manifest['cv_pdf']=artifacts
manifest['release']='CV / Portfolio Release '+profile['release']
manifest['release_date']='2026-11-07'
manifest['status']='r1-2-generated-awaiting-production-verification'
manifest['bilingual_publication']={'generator_input_sha256':input_hash,'selection':'content/cv-selection.json','records':'content/cv-records-2026-11.json','generator':'scripts/build-cv-publication.mjs','pdf_generator':'scripts/render-cv-publication.py','selected_records':len(ids),'selected_missing_english':0,'data_sha256':hashlib.sha256((ROOT/'content/cv-records-2026-11.json').read_bytes()).hexdigest(),'selection_sha256':hashlib.sha256((ROOT/'content/cv-selection.json').read_bytes()).hexdigest(),'scope':'CV rows, 61 bilingual record pages, React profile recognition section, Chinese/English print HTML and PDFs share record data. Full Works catalog and Google Docs are separate.'}
manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
