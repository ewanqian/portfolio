import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const databaseDir = path.join(rootDir, 'database');
const manifestPath = path.join(databaseDir, 'manifest.json');

const tableDescriptions = {
  works: '完整的作品项目列表',
  nodes: '公开节点、展览、演出、创作营与奖项语境',
  people: '协作者与相关人物',
  collectives: '团队合作列表',
  tasks: '任务追踪',
  venues: '场地、机构与节展',
  screens: '屏幕、显示条件与输出媒介',
  assets_index: '资源索引',
  mapping_files: 'mapping 文件',
  notes_index: '笔记索引'
};

const tableNames = Object.keys(tableDescriptions);

const tables = tableNames.map((name) => {
  const filePath = path.join(databaseDir, `${name}.json`);
  const content = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
    : [];

  return {
    name,
    count: Array.isArray(content) ? content.length : 0,
    description: tableDescriptions[name]
  };
});

const manifest = {
  version: '1.1.0',
  generatedAt: new Date().toISOString(),
  tables
};

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Generated ${path.relative(rootDir, manifestPath)}`);
