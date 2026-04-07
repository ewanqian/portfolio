import fs from 'fs';
import path from 'path';

// 示例 CSV 格式映射
// CSV 列：id,filename,type,caption,relatedWork,relatedNode,year,source,featured

function csvToJson(csvPath, outputDir) {
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',');
  
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const item = {};
    
    headers.forEach((header, index) => {
      let value = values[index] || '';
      // 确保值是字符串
      const stringValue = String(value);
      // 处理布尔值
      if (stringValue.toLowerCase() === 'true') {
        value = true;
      } else if (stringValue.toLowerCase() === 'false') {
        value = false;
      } else if (!isNaN(stringValue) && stringValue !== '') {
        // 处理数字
        value = parseInt(stringValue);
      } else {
        value = stringValue;
      }
      item[header.trim()] = value;
    });
    
    data.push(item);
  }
  
  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // 按类型分组
  const assets = data.filter(item => item.type === 'image');
  
  // 生成 assets JSON 文件
  assets.forEach(asset => {
    const assetPath = path.join(outputDir, 'assets', `${asset.id}.json`);
    fs.writeFileSync(assetPath, JSON.stringify(asset, null, 2));
  });
  
  console.log(`Converted ${assets.length} assets from CSV to JSON`);
  console.log(`Output directory: ${outputDir}`);
}

// 示例用法
// csvToJson('./images.csv', './content');

// 导出函数供其他脚本使用
export { csvToJson };
