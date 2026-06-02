# Yu Jiayun「45㎡」Case Manifest

## Status

Production case pilot complete.

## Public Files

| File | Role |
| --- | --- |
| `react/src/pages/YuJiayun45m2.jsx` | Public project page. |
| `projects/yujiayun-45ping-visual-2025.md` | Project case document. |
| `visual-arts/45m2-ningbo/README.md` | Visual-arts archive entry. |
| `content/works/yujiayun-45ping-visual-2025.json` | Content index entry. |
| `assets/yujiayun-45ping/` | Selected public media and candidates. |

## Public Page Requirements

- Clear title and one-line summary.
- Project facts.
- Director and visual director credits.
- Ewan Qian role stated as visual production / delivery engineering support.
- Opening sequence as a standalone section.
- Orange quick-cut section included.
- Song surface map by PGM, floor LED, and spatial surface.
- Video references for live context.
- No raw project files or private paths.

## Media Requirements

| Media Group | Required |
| --- | --- |
| Opening timeline | Technical prelude, amber threshold, orange quick cuts, line/title resolve. |
| Song surface map | 防沉迷系统, 触碰不到的你, 尘埃, 卸妆, 千禧, 夏夜入梦前. |
| Hero | Strong 45㎡ opening frame. |
| Archive media | Selected final frames and curated gallery frames. |

## Credit Boundary

| Credit | Public wording |
| --- | --- |
| Director | KANES |
| Visual Director | 陈哲 |
| Ewan Qian | Visual Production / Delivery Engineering Support |

## Verification

Run:

```bash
npm run audit:public
npm run audit:portfolio-os
```

Then build the React app from the mapped workspace drive:

```bash
npm run build
```
