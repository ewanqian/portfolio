import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const acceptableStatuses = new Set(['published', 'draft'])

export function validateWritingCatalog(repoRoot = defaultRoot) {
  const root = path.join(repoRoot, 'content', 'writings')
  const files = fs.readdirSync(root).filter((name) => name.endsWith('.json')).sort()
  const errors = []
  const slugs = new Set()
  const summary = { active: files.length, published: 0, draft: 0, featured: 0, archived: 0, backlog: 0 }

  for (const folder of ['_archive', '_backlog']) {
    const dir = path.join(root, folder)
    const count = fs.existsSync(dir) ? fs.readdirSync(dir).filter((name) => name.endsWith('.json')).length : 0
    summary[folder === '_archive' ? 'archived' : 'backlog'] = count
  }

  for (const name of files) {
    const fullPath = path.join(root, name)
    let entry
    try {
      entry = JSON.parse(fs.readFileSync(fullPath, 'utf8'))
    } catch (error) {
      errors.push(name + ': invalid JSON: ' + error.message)
      continue
    }

    if (entry.id !== name.slice(0, -5)) errors.push(name + ': id does not match filename')
    const slug = entry.slug || entry.id
    if (!slug || slugs.has(slug)) errors.push(name + ': missing/duplicate slug')
    slugs.add(slug)

    if (!acceptableStatuses.has(entry.status)) {
      errors.push(name + ': active entries must be published or draft; move plans to _backlog and old concepts to _archive')
    } else {
      summary[entry.status] += 1
    }

    if (!entry.title || !entry.type || !entry.summary || entry.summary.trim().length < 20) {
      errors.push(name + ': title, type and informative summary required')
    }

    if (entry.featured === true) {
      summary.featured += 1
      if (entry.status !== 'published') errors.push(name + ': featured is only allowed for published work')
    }

    if (!entry.articlePath) {
      errors.push(name + ': every active entry requires a complete articlePath; move metadata-only candidates out of active Writing')
      continue
    }

    const documentPath = path.resolve(repoRoot, entry.articlePath)
    const relative = path.relative(repoRoot, documentPath)
    if (relative.startsWith('..') || path.isAbsolute(relative) || !fs.existsSync(documentPath)) {
      errors.push(name + ': articlePath is outside repository or missing: ' + entry.articlePath)
      continue
    }
    if (!fs.statSync(documentPath).isFile()) {
      errors.push(name + ': articlePath is not a file')
      continue
    }
    const markdown = fs.readFileSync(documentPath, 'utf8')
    if (markdown.trim().length < (entry.status === 'published' ? 1000 : 450)) {
      errors.push(name + ': body too short for ' + entry.status + ' publication')
    }
    const headings = (markdown.match(/^#{1,4} +\S/gm) || []).length
    if (entry.status === 'published' && headings < 2) errors.push(name + ': published article must include section headings')

    if (entry.status === 'published' && entry.articlePath.startsWith('docs/portfolio-maintenance-os/')) {
      errors.push(name + ': internal project-management document cannot be a Published Writing article')
    }

    for (const media of entry.sectionMedia || []) {
      if (!media.afterHeading || !markdown.split('\n').some((line) => line.replace(/^#{1,4}\s+/, '').trim() === media.afterHeading)) {
        errors.push(name + ': sectionMedia anchor must match an existing Markdown heading')
      }
      if (!media.alt || !media.caption || !media.credit) {
        errors.push(name + ': sectionMedia needs accessible alt, caption and credit')
      }
      if (!media.repoPath || !media.src || !media.src.startsWith('/portfolio/')) {
        errors.push(name + ': sectionMedia must include an existing public asset and repoPath')
        continue
      }
      const figurePath = path.resolve(repoRoot, media.repoPath)
      const figureRelative = path.relative(repoRoot, figurePath)
      if (figureRelative.startsWith('..') || path.isAbsolute(figureRelative) || !fs.existsSync(figurePath)) {
        errors.push(name + ': missing or unsafe sectionMedia asset: ' + media.repoPath)
      }
    }
  }

  if (errors.length) throw new Error('Writing publication gate failed:\n- ' + errors.join('\n- '))
  return summary
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    console.log('Writing publication gate passed:', validateWritingCatalog())
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
