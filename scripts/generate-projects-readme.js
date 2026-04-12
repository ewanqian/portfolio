import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const worksPath = path.join(rootDir, 'database', 'works.json');
const outputPath = path.join(rootDir, 'projects', 'README.md');
const contentWorksDir = path.join(rootDir, 'content', 'works');

const works = JSON.parse(fs.readFileSync(worksPath, 'utf8'));
const contentWorkIds = new Set(
  fs.existsSync(contentWorksDir)
    ? fs.readdirSync(contentWorksDir)
        .filter((file) => file.endsWith('.json'))
        .map((file) => {
          const item = JSON.parse(fs.readFileSync(path.join(contentWorksDir, file), 'utf8'));
          return item.id;
        })
    : []
);

const practiceOrder = [
  'Audiovisual Collaborations',
  'Drop Flow',
  'Perceptual Environments'
];

const practiceLabels = {
  'Audiovisual Collaborations': '演艺舞台 / Audiovisual Collaborations',
  'Drop Flow': 'Drop Flow / 时间-空间作品线',
  'Perceptual Environments': '环境、展览与感知系统 / Perceptual Environments'
};

const typeLabels = {
  stage: 'Stage',
  exhibition: 'Exhibition',
  live: 'Live',
  competition: 'Competition',
  workshop: 'Workshop'
};

const statusLabels = {
  done: 'done',
  in_progress: 'in-progress',
  archived: 'archived'
};

function formatTime(year, month) {
  return `${String(year).slice(2)}/${String(month).padStart(2, '0')}`;
}

function toProjectLink(filePath) {
  if (!filePath) return 'pending';
  const relative = `./${path.basename(filePath)}`;
  return `[doc](${relative})`;
}

function toDatabaseLink(slug) {
  return `[\`${slug}\`](../database/works.json)`;
}

function toContentStatus(work) {
  const hasProjectDoc = Boolean(work.filePath);
  const featured = work.featured ? 'featured' : 'standard';
  const contentState = contentWorkIds.has(work.slug.replace(/-\d{4}$/, '')) || contentWorkIds.has(work.id)
    ? 'content-ready'
    : 'db-only';
  return `${hasProjectDoc ? 'doc' : 'index-only'} / ${featured} / ${contentState}`;
}

function summarizeLinks(items) {
  if (!Array.isArray(items) || items.length === 0) return '-';
  return items.map((item) => `\`${item}\``).join('<br>');
}

function sortWorks(items) {
  return [...items].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    if (b.month !== a.month) return b.month - a.month;
    return a.name.localeCompare(b.name, 'zh-CN');
  });
}

function buildSection(title, items) {
  const rows = sortWorks(items).map((work) => {
    const fields = [
      formatTime(work.year, work.month),
      `\`${work.slug}\``,
      work.name,
      work.role,
      work.location,
      typeLabels[work.type] || work.type,
      statusLabels[work.status] || work.status,
      summarizeLinks(work.relatedNodeIds),
      summarizeLinks(work.awards),
      toProjectLink(work.filePath),
      toContentStatus(work)
    ];

    return `| ${fields.join(' | ')} |`;
  });

  return [
    `## ${title}`,
    '',
    '| 时间 | slug | 项目 | 角色 | 地点/语境 | 类型 | 状态 | 关联节点 | 奖项/信号 | 项目文档 | 内容状态 |',
    '|------|------|------|------|-----------|------|------|----------|-----------|----------|----------|',
    ...rows,
    ''
  ].join('\n');
}

const groupedSections = practiceOrder
  .map((practiceLine) => {
    const items = works.filter((work) => work.practiceLine === practiceLine);
    if (items.length === 0) return '';
    return buildSection(practiceLabels[practiceLine] || practiceLine, items);
  })
  .filter(Boolean);

const coverageGaps = sortWorks(works.filter((work) => !work.filePath))
  .map((work) => `- \`${work.slug}\`：数据库中已有对象，但项目正文文档仍缺失，当前只有索引信息。`)
  .join('\n');

const featuredWorks = sortWorks(works.filter((work) => work.featured))
  .map((work) => `- \`${work.slug}\`：${work.name}｜${work.role}｜${work.description}`)
  .join('\n');

const content = `# Projects Index

> 这是 ` + '`projects/`' + ` 的总索引，也是人工项目文档与对象化数据库之间的桥接页。
> 项目正文放在 ` + '`projects/*.md`' + `，结构化索引放在 ` + '`database/works.json`' + `，前台展示再从 ` + '`content/`' + ` 与 ` + '`react/src/data/generated/`' + ` 继续编译。

## 使用原则

- ` + '`projects/*.md`' + `：保留人工书写、版本脉络、背景说明、补录材料与非标准信息。
- ` + '`database/works.json`' + `：保留稳定字段，是项目对象化的第一层入口。
- ` + '`content/`' + `：保留前台要消费的精选对象，是内容系统的正式输入。
- ` + '`react/src/data/generated/`' + `：构建产物，不直接手改。

## 当前总览

- 项目总数：${works.length}
- 已有项目正文：${works.filter((work) => work.filePath).length}
- 仅有对象索引、未补正文：${works.filter((work) => !work.filePath).length}
- 推荐优先补录：先补 ` + '`featured: true`' + ` 且 ` + '`filePath: null`' + ` 的项目，再补高价值公开节点与重要合作。

## Featured Snapshot

${featuredWorks}

${groupedSections.join('\n')}
## Coverage Gaps

${coverageGaps || '- 当前所有 works 对象都已绑定项目文档。'}

## Content Coverage

- 已进入 content/works 的对象数：${contentWorkIds.size}
- 当前已进入内容系统的 work ids：${Array.from(contentWorkIds).map((id) => `\`${id}\``).join('、') || '无'}
- 未进入 content/works 的项目仍然已经被 \`database/works.json\` 保底索引，不会因为首页改版或内容筛选而消失。

## 下一步建议

- 新增项目时，先写入 ` + '`database/works.json`' + `，再决定是否需要独立 ` + '`projects/*.md`' + ` 正文。
- 当项目进入首页、Archive、Writing 或 public nodes 时，再同步写入 ` + '`content/`' + ` 对象。
- 如果某条信息还只是草稿、聊天记录、微信文章或现场笔记，也先把最稳定的字段落到 ` + '`database/works.json`' + `，避免只存在于仓库角落里。

> 返回 [主目录](../README.md) ｜ 查看 [database 说明](../database/README.md)
`;

fs.writeFileSync(outputPath, content);
console.log(`Generated ${path.relative(rootDir, outputPath)}`);
