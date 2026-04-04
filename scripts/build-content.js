import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content');
const outputDir = path.join(process.cwd(), 'react/src/data/generated');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 读取目录下的所有 JSON 文件
function readJsonFiles(dir) {
  const files = fs.readdirSync(dir);
  const data = [];
  
  files.forEach(file => {
    if (file.endsWith('.json')) {
      const filePath = path.join(dir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      try {
        data.push(JSON.parse(content));
      } catch (error) {
        console.error(`Error parsing ${file}:`, error);
      }
    }
  });
  
  return data;
}

// 生成作品数据
const works = readJsonFiles(path.join(contentDir, 'works'));
fs.writeFileSync(
  path.join(outputDir, 'works.js'),
  `export default ${JSON.stringify(works, null, 2)};`
);

// 生成节点数据
const nodes = readJsonFiles(path.join(contentDir, 'nodes'));
fs.writeFileSync(
  path.join(outputDir, 'nodes.js'),
  `export default ${JSON.stringify(nodes, null, 2)};`
);

// 生成资产数据
const assets = readJsonFiles(path.join(contentDir, 'assets'));
fs.writeFileSync(
  path.join(outputDir, 'assets.js'),
  `export default ${JSON.stringify(assets, null, 2)};`
);

// 生成文章数据
const writings = readJsonFiles(path.join(contentDir, 'writings'));
fs.writeFileSync(
  path.join(outputDir, 'writings.js'),
  `export default ${JSON.stringify(writings, null, 2)};`
);

// 生成关系数据
const relations = readJsonFiles(path.join(contentDir, 'relations'));
fs.writeFileSync(
  path.join(outputDir, 'relations.js'),
  `export default ${JSON.stringify(relations, null, 2)};`
);

// 生成网络数据（用于 CreativeNetwork 组件）
const networkData = {
  nodes: [
    ...works.map(work => ({
      id: work.id,
      label: work.title,
      type: 'work'
    })),
    ...nodes.map(node => ({
      id: node.id,
      label: node.title,
      type: 'node'
    }))
  ],
  links: []
};

// 添加关系链接
works.forEach(work => {
  if (work.relatedNodes) {
    work.relatedNodes.forEach(nodeId => {
      networkData.links.push({
        source: work.id,
        target: nodeId
      });
    });
  }
});

nodes.forEach(node => {
  if (node.relatedWork) {
    networkData.links.push({
      source: node.id,
      target: node.relatedWork
    });
  }
});

fs.writeFileSync(
  path.join(outputDir, 'network.js'),
  `export default ${JSON.stringify(networkData, null, 2)};`
);

// 生成时间线数据
const timelineData = nodes
  .sort((a, b) => parseInt(b.year) - parseInt(a.year))
  .map(node => ({
    id: node.id,
    title: node.title,
    year: node.year,
    category: node.category,
    summary: node.summary
  }));

fs.writeFileSync(
  path.join(outputDir, 'timeline.js'),
  `export default ${JSON.stringify(timelineData, null, 2)};`
);

// 生成图片墙数据
const imageWallData = assets
  .filter(asset => asset.featured)
  .map(asset => ({
    id: asset.id,
    src: asset.filename,
    caption: asset.caption,
    year: asset.year,
    relatedWork: asset.relatedWork
  }));

fs.writeFileSync(
  path.join(outputDir, 'imageWall.js'),
  `export default ${JSON.stringify(imageWallData, null, 2)};`
);

console.log('Content build completed successfully!');
