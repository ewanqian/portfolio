# 2026-11-11 · CV UI and original media recovery

## Decisions explicitly requested

- Web CV uses the same actual Header/Footer, language provider and typography as the personal portfolio. Chinese and English controls must be visible; preserve all 60 selected record IDs and the three-page print/PDF layout.
- Restore the fullest TITAN track presentation from original uploaded assets and historical MANA links. Do not substitute PDF page screenshots, text-bearing PDF crops or guessed covers for original media, including TIMER and Drop Flow. Leave uncertain replacements pending until higher-quality sources are supplied.

## CV / Profile: PR157 merged

Merge `363353c4af3dafeb34569db2e46fc7877f8fc521`; publisher produced `f16d509e33a089064302ee147923cef9b0449d46`.

Native entrypoints `/#/cv` and `/portfolio/#/cv`; old `/works/cv.html` forwards to the native view while retaining static/no-JS content. Print HTML and PDFs remain separate. Profile chapters no longer overwrite HashRouter.

Production browser run **42882495951** passed. Downloaded artifact **13794023105** was inspected: actual `https://ewanqian.site` Profile 12 samples and CV 12 samples pass, including 84 Profile chapter clicks, bilingual 60-row equality, responsive layout, language persistence and PDF retrieval matching the current manifest. The automated publisher re-rendered the PDF files without changing the print template; binary hashes can change between renders and must be checked against that publication's manifest, not assumed equal to older snapshots.

The older broad postdeploy HTTP gate run 42882495950 failed and still requires separate diagnosis; this does not invalidate the independently inspected browser results, nor does the browser pass establish full-site completion.

## Team: PR18

Merged `98ba8737767f257a9f1d59d0fd476fcd1a96634e`. Six-member bios preserve portraits and professional focus without collaborator disclaimers. Final preview browser run 42882581491: Chinese/English × 375/768/1440, images and no-overflow pass; mobile/desktop screenshots inspected. A narrowly scoped CJK heading-wrap fix addresses a real 375px overflow. Production verification is separate and must be read before claiming live parity.

## TITAN: PR158

See `docs/media-intake/TITAN-ORIGINAL-RECOVERY-2026-11-11.md` and `assets/data/titan-tracks.json` for immutable source commits, original blob IDs, dimensions and video edition mapping. Nine PNGs and ten JPEG covers restored without altering their bytes. A ten-track gallery exists at the native project and `/works/titan-tracks.html`; permanent `/works/titan.html` links to it. Existing TITAN CV detail records gain three verified visual stills and the complete archive link through the existing marked-section generator.

Eight Shenzhen archive MANA links are retained. Phantom's linked recording remains explicitly labelled CAN Festival; no separate Phantom PNG or Aurora MANA link was invented. Third-party playback remains unverified.

TIMER / Drop Flow candidate provenance still needs image-by-image review; no new PDF-derived image is authorised. Do not use filenames such as clean/raw as provenance proof, and do not delete existing history merely to simplify a public page.

## Next gate

Run original-blob checks, generated CV detail browser checks and postpublisher production gallery checks before closing PR158. Record actual production report IDs. Preserve unrelated XR PR156 and all later commits. No new database or full-site redesign is required.
