# CV 文字与版式规范 / Artist CV Copy Style
2026-11-07 · Version 1.2.1 · 60 selected records

## Purpose
The PDF and website CV are concise professional artist résumés; dates, full credits, certificate details and version history belong in permanent record pages.

References:
- College Art Association — Visual Artist CV: https://www.collegeart.org/standards-and-guidelines/guidelines/visual-art-cv
- College Art Association — Artist Résumé: https://www.collegeart.org/standards-and-guidelines/guidelines/resume
- School of the Art Institute of Chicago: https://www.saic.edu/capx/career-resources/resumes-cvs

## Three layers, same record ID
- `zh` and `en`: full archived statements; preserved through copyediting.
- `cv_zh` and `cv_en`: short, proofread publication overrides for three-page PDF, selected website CV, React selection and searchable CV index.
- `source`, `evidence_status`, certificates, credits and linked presentations: archival and evidential layer; never spill debugging or verification narrative into printed CV.

## Editorial rules
1. The year lives in its own left column; dates/months only on the detailed page unless absolutely necessary to distinguish an event.
2. Chinese: `《作品》｜展览／活动，机构，城市（职责或版本）`. English: `Work — Event, Venue, City (role/edition)`. Avoid sentence-style paragraphs and final stops.
3. Use 《》 for works, 「」 for exhibition/series titles, a single full-width `｜` between object and context, consistent parenthesis and Chinese punctuation.
4. Do not repeat “与…合作 / 共同署名 / 参与团队制作” on every line. Credit collaborators where it distinguishes actual authorship or award recipients, with names and specific roles retained in detailed records.
5. Never turn collaborative prizes into solo awards. Award name/level is a verified claim; media format (such as 异形屏版) is an edition designation.
6. Keep author identity, work identity and presentation separate. 2023 Observation and Symbiosis and 2025/2026 exhibition entries should not be silently merged.
7. Names from existing credits: 徐昊 (certificate, NOT 徐浩), 钱誉文, 沈轩, Semicolon C / 分号 C, KASHIWA Daisuke, TIMER, Drop Flow. No phonetic guesswork.
8. For collaborators, `Shen Xuan × Ewan Qian` identifies coauthors; `with…` is a role when essential. “Six creators on certificate” is archive-level evidence, not printed-CV sentence material.
9. No unsupported solo-show, lead-artist, company-employment, organizer-verified role, or copyright claim.
10. CJK line-break safety: strict kinsoku punctuation breaking, no forced spaces or fake inserted media. Preserve accessible font, A4 3 pages, 60 clickable unique records, and existing artist portrait.

## Examples
- Before: `个人署名参展证书由展览方于 2025 年 12 月颁发，证书列有六位合作创作者`
- CV: `《滴流 / Drop Flow》｜中国（杭州）艺术与科技国际双年展入选，余杭美术馆，杭州`
- Detail: retain certificate date, all six credited authors and primary proof.

- Before: `《观察与共生》，「共生协议：算法公地」…；与沈轩合作`
- CV: `《观察与共生》｜「共生协议：算法公地」，愚见观池艺术空间，上海`
- Detail: retain exact exhibition dates and Shen Xuan's credit.

- Before: `《控时者 / TIMER》，ChinaGraph 2024 … 徐昊、钱誉文共同署名`
- CV: `《控时者 / TIMER》｜ChinaGraph 2024 电子剧场优秀音乐作品（二等）；徐昊、钱誉文`
- Detail: primary certificate and exact coauthor roles.

## Update costs and versioning
An everyday editorial edit needs only `cv_zh` and `cv_en` under one existing record ID. The existing publishing pipeline rebuilds website CV, public index, print HTML and bilingual PDFs; record page retains full `zh/en` if facts did not change. The cost is one ordinary Git diff and the already-configured CI build, not a new database or 61 manual page edits.

For a genuine factual correction, also update full `zh/en`, linked source, evidence/roles and references. Keep old PDFs in historical paths. Release 1.2.1 is a copyediting patch; do not call it published until its new PDF hashes, 3-page typography, 60 links and public URLs have passed.
