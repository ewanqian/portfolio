import { Fragment, useMemo } from 'react'
import '../../styles/markdown-reader.css'

function resolveRepositoryHref(href, sourcePath) {
  if (!href) return '#'
  if (/^(https?:|mailto:|tel:|#)/i.test(href)) return href

  const sourceDir = (sourcePath || '').split('/').slice(0, -1)
  const parts = [...sourceDir, ...href.split('/')]
  const resolved = []

  parts.forEach((part) => {
    if (!part || part === '.') return
    if (part === '..') resolved.pop()
    else resolved.push(part)
  })

  return `https://github.com/ewanqian/portfolio/blob/main/${resolved.join('/')}`
}

function headingId(text = '') {
  const plain = text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .trim()
    .toLowerCase()

  return plain
    .replace(/[\s/]+/g, '-')
    .replace(/[^\p{L}\p{N}\-_]+/gu, '')
    .replace(/^-+|-+$/g, '') || 'section'
}

function renderInline(text, sourcePath, keyPrefix = 'inline') {
  const pattern = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g
  const parts = text.split(pattern).filter(Boolean)

  return parts.map((part, index) => {
    const key = `${keyPrefix}-${index}`
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      const href = resolveRepositoryHref(linkMatch[2], sourcePath)
      const external = /^https?:/i.test(href)
      return (
        <a key={key} href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
          {linkMatch[1]}
        </a>
      )
    }

    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={key}>{part.slice(2, -2)}</strong>
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={key}>{part.slice(1, -1)}</code>
    }

    return <Fragment key={key}>{part}</Fragment>
  })
}

function parseMarkdown(markdown, sourcePath) {
  const lines = (markdown || '').replace(/\r\n/g, '\n').split('\n')
  const blocks = []
  let paragraph = []
  let list = []
  let listType = null
  let quote = []
  let code = []
  let inCode = false
  let table = null
  let tableDelimiterIndex = -1

  const tableCells = (line) => line.trim().replace(/^\\|/, '').replace(/\\|$/, '').split('|').map((cell) => cell.trim())
  const isTableDivider = (line, count) => {
    const cells = tableCells(line)
    return cells.length === count && cells.every((cell) => /^:?-{3,}:?$/.test(cell))
  }

  const flushTable = () => {
    if (!table) return
    blocks.push({ type: 'table', head: table.head, rows: table.rows })
    table = null
  }

  const flushParagraph = () => {
    if (!paragraph.length) return
    const text = paragraph.join(' ').trim()
    if (text) blocks.push({ type: 'paragraph', text })
    paragraph = []
  }

  const flushList = () => {
    if (!list.length) return
    blocks.push({ type: listType || 'ul', items: list })
    list = []
    listType = null
  }

  const flushQuote = () => {
    if (!quote.length) return
    blocks.push({ type: 'quote', text: quote.join(' ').trim() })
    quote = []
  }

  const flushCode = () => {
    if (!code.length) return
    blocks.push({ type: 'code', text: code.join('\n') })
    code = []
  }

  lines.forEach((line, index) => {
    const trimmed = line.trim()

    if (index === tableDelimiterIndex) return

    if (table) {
      if (trimmed.startsWith('|')) {
        table.rows.push(tableCells(trimmed))
        return
      }
      flushTable()
    }

    const next = lines[index + 1]?.trim() || ''
    if (!inCode && trimmed.startsWith('|') && next.startsWith('|') && isTableDivider(next, tableCells(trimmed).length)) {
      flushParagraph()
      flushList()
      flushQuote()
      table = { head: tableCells(trimmed), rows: [] }
      tableDelimiterIndex = index + 1
      return
    }

    if (trimmed.startsWith('```')) {
      flushParagraph()
      flushList()
      flushQuote()
      if (inCode) flushCode()
      inCode = !inCode
      return
    }

    if (inCode) {
      code.push(line)
      return
    }

    if (!trimmed) {
      flushParagraph()
      flushList()
      flushQuote()
      return
    }

    if (/^---+$/.test(trimmed)) {
      flushParagraph()
      flushList()
      flushQuote()
      blocks.push({ type: 'hr' })
      return
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/)
    if (heading) {
      flushParagraph()
      flushList()
      flushQuote()
      blocks.push({ type: 'heading', level: heading[1].length, text: heading[2] })
      return
    }

    if (trimmed.startsWith('> ')) {
      flushParagraph()
      flushList()
      quote.push(trimmed.slice(2))
      return
    }

    const unordered = trimmed.match(/^[-*]\s+(.+)$/)
    if (unordered) {
      flushParagraph()
      flushQuote()
      if (listType && listType !== 'ul') flushList()
      listType = 'ul'
      list.push(unordered[1])
      return
    }

    const ordered = trimmed.match(/^\d+[.)]\s+(.+)$/)
    if (ordered) {
      flushParagraph()
      flushQuote()
      if (listType && listType !== 'ol') flushList()
      listType = 'ol'
      list.push(ordered[1])
      return
    }

    flushList()
    flushQuote()
    paragraph.push(trimmed.replace(/\s{2,}$/, ''))
  })

  flushParagraph()
  flushList()
  flushQuote()
  flushTable()
  if (inCode) flushCode()

  return blocks
}

export default function MarkdownReader({ markdown, sourcePath, renderAfterHeading }) {
  const blocks = useMemo(() => parseMarkdown(markdown, sourcePath), [markdown, sourcePath])
  const headingCounts = new Map()

  return (
    <article className="markdown-reader">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`

        if (block.type === 'heading') {
          const Tag = `h${Math.min(block.level + 1, 5)}`
          const baseId = headingId(block.text)
          const count = headingCounts.get(baseId) || 0
          headingCounts.set(baseId, count + 1)
          const id = count ? `${baseId}-${count + 1}` : baseId
          return <Fragment key={key}><Tag id={id} className="markdown-heading-anchor">{renderInline(block.text, sourcePath, key)}</Tag>{renderAfterHeading ? renderAfterHeading(block.text) : null}</Fragment>
        }

        if (block.type === 'paragraph') {
          return <p key={key}>{renderInline(block.text, sourcePath, key)}</p>
        }

        if (block.type === 'quote') {
          return <blockquote key={key}>{renderInline(block.text, sourcePath, key)}</blockquote>
        }

        if (block.type === 'code') {
          return <pre key={key}><code>{block.text}</code></pre>
        }

        if (block.type === 'hr') {
          return <hr key={key} />
        }

        if (block.type === 'table') {
          return (
            <div className="markdown-table-scroll" key={key}>
              <table>
                <thead><tr>{block.head.map((cell, column) => <th scope="col" key={column}>{renderInline(cell, sourcePath, `${key}-head-${column}`)}</th>)}</tr></thead>
                <tbody>{block.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>{block.head.map((_, column) => (
                    <td key={column}>{renderInline(row[column] || '', sourcePath, `${key}-row-${rowIndex}-${column}`)}</td>
                  ))}</tr>
                ))}</tbody>
              </table>
            </div>
          )
        }

        const ListTag = block.type === 'ol' ? 'ol' : 'ul'
        return (
          <ListTag key={key}>
            {block.items.map((item, itemIndex) => (
              <li key={`${key}-${itemIndex}`}>{renderInline(item, sourcePath, `${key}-${itemIndex}`)}</li>
            ))}
          </ListTag>
        )
      })}
    </article>
  )
}
