import fs from 'fs/promises';
import path from 'path';

const rootDir = process.cwd();
const sourcePath = path.join(rootDir, 'archive', 'gaussian-scenes', 'scenes-source.json');
const outputJsonPath = path.join(rootDir, 'archive', 'gaussian-scenes', 'scenes.json');
const outputReadmePath = path.join(rootDir, 'archive', 'gaussian-scenes', 'README.md');
const outputReactDataPath = path.join(rootDir, 'react', 'src', 'data', 'generated', 'gaussianScenes.js');
const thumbnailDir = path.join(rootDir, 'assets', 'gaussian-scenes');

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, options = {}, attempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`);
      }
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        await sleep(300 * attempt);
      }
    }
  }

  throw lastError;
}

function stripTags(value) {
  return value.replace(/<[^>]+>/g, '').trim();
}

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function getMatch(html, regex) {
  const match = html.match(regex);
  return match ? decodeEntities(stripTags(match[1])) : null;
}

function getMeta(html, property) {
  const escaped = property.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return getMatch(
    html,
    new RegExp(`<meta[^>]+(?:property|name)=["']${escaped}["'][^>]+content=["']([^"']+)["']`, 'i')
  );
}

function getSceneBodyMeta(html) {
  const title = getMatch(html, /<h1[^>]*>(.*?)<\/h1>/is);
  const description = getMatch(html, /<p class="whitespace-pre-wrap text-sm break-words overflow-wrap-anywhere">(.*?)<\/p>/is);
  const uploader = getMatch(html, /data-testid="view-user-link"[^>]*>(.*?)<\/a>/is);

  const infoLine = html.match(
    /lucide-eye[\s\S]*?<span>([^<]+)<\/span>[\s\S]*?lucide-hard-drive[\s\S]*?<span>([^<]+)<\/span>[\s\S]*?<span class="cursor-help"[^>]*>([^<]+)<\/span>/is
  );

  return {
    title,
    description,
    uploader,
    views: infoLine ? infoLine[1].trim() : null,
    size: infoLine ? infoLine[2].trim() : null,
    publishedAgo: infoLine ? infoLine[3].trim() : null
  };
}

function buildReadme(scenes) {
  const header = [
    '# Gaussian Scenes Archive',
    '',
    '这组归档用于保存 SuperSplat 上的高斯场景预览、本地缩略图、嵌入方式和后续展示方向。',
    '它们适合放在扫描实践、空间采样、网页嵌入展示、Vision Pro 观看路径和后续空间应用开发的中间层。',
    '',
    '## Included Scenes',
    ''
  ];

  const sections = scenes.flatMap((scene) => {
    const thumbnailPath = `/Users/ewanqian/Library/Mobile Documents/com~apple~CloudDocs/VIRTURA-Workspace/portfolio/${scene.localThumbnail}`;
    const lines = [
      `## ${scene.displayTitle}`,
      '',
      `![${scene.displayTitle}](${thumbnailPath})`,
      '',
      `- Scene URL: [${scene.sceneUrl}](${scene.sceneUrl})`,
      `- Embed URL: [${scene.embedUrl}](${scene.embedUrl})`,
      `- Uploader: ${scene.uploader || 'unknown'}`,
      `- Views: ${scene.views || 'unknown'}`,
      `- Size: ${scene.size || 'unknown'}`,
      `- Published: ${scene.publishedAgo || 'unknown'}`,
      `- Related Work: ${scene.relatedWork || 'none'}`,
      `- Location: ${scene.location || 'unknown'}`,
      `- Capture Moment: ${scene.captureMoment || 'unknown'}`,
      `- Tags: ${(scene.tags || []).join(', ')}`,
      '',
      scene.summary,
      ''
    ];

    if (scene.notes?.length) {
      lines.push('### Notes', '');
      for (const note of scene.notes) {
        lines.push(`- ${note}`);
      }
      lines.push('');
    }

    lines.push(
      '### Embed',
      '',
      '```html',
      `<iframe id="viewer" width="800" height="500" allow="fullscreen; xr-spatial-tracking" src="${scene.embedUrl}"></iframe>`,
      '```',
      ''
    );

    return lines;
  });

  return [...header, ...sections].join('\n');
}

function buildReactModule(scenes) {
  const reactScenes = scenes.map((scene) => ({
    ...scene,
    thumbnail: `/portfolio/${scene.localThumbnail}`
  }));

  return `export default ${JSON.stringify(reactScenes, null, 2)};\n`;
}

async function main() {
  const source = JSON.parse(await fs.readFile(sourcePath, 'utf8'));
  await fs.mkdir(thumbnailDir, { recursive: true });

  const results = [];

  for (const scene of source) {
    const sceneUrl = `https://superspl.at/scene/${scene.id}`;
    const embedUrl = `https://superspl.at/s?id=${scene.id}`;
    const html = await fetchWithRetry(sceneUrl).then((res) => res.text());

    const ogImage = getMeta(html, 'og:image');
    const bodyMeta = getSceneBodyMeta(html);
    const thumbnailExt = ogImage ? path.extname(new URL(ogImage).pathname) || '.webp' : '.webp';
    const localThumbnail = path.join('assets', 'gaussian-scenes', `${scene.slug}${thumbnailExt}`);
    const thumbnailPath = path.join(rootDir, localThumbnail);

    if (ogImage) {
      const imageBuffer = Buffer.from(await fetchWithRetry(ogImage).then((res) => res.arrayBuffer()));
      await fs.writeFile(thumbnailPath, imageBuffer);
    }

    results.push({
      ...scene,
      sceneUrl,
      embedUrl,
      ogImage,
      localThumbnail,
      pageTitle: getMeta(html, 'og:title') || bodyMeta.title,
      pageDescription: getMeta(html, 'description') || bodyMeta.description,
      titleFromPage: bodyMeta.title,
      descriptionFromPage: bodyMeta.description,
      uploader: bodyMeta.uploader,
      views: bodyMeta.views,
      size: bodyMeta.size,
      publishedAgo: bodyMeta.publishedAgo
    });
  }

  await fs.writeFile(outputJsonPath, JSON.stringify(results, null, 2) + '\n');
  await fs.writeFile(outputReadmePath, buildReadme(results));
  await fs.writeFile(outputReactDataPath, buildReactModule(results));

  console.log(`Archived ${results.length} SuperSplat scenes.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
