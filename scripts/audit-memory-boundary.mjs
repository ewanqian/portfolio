import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const forbiddenPathPatterns = [
  /(^|\/)\.memory-private\//i,
  /(^|\/)private\//i,
  /(^|\/)inbox\/private\//i,
  /(^|\/)CURRENT\.local\.md$/i,
  /\.private\.(md|json|ya?ml)$/i,
  /(^|\/)\.env($|\.)/i,
  /(^|\/)secrets?\.(json|ya?ml|txt|md)$/i,
];

const sensitiveKeyPatterns = [
  /\b(access[_-]?token|api[_-]?key|client[_-]?secret|password|passwd|private[_-]?key|recovery[_-]?code)\b\s*[:=]/i,
  /-----BEGIN (RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----/i,
  /\b(home[_-]?address|passport[_-]?number|id[_-]?number|bank[_-]?account)\b\s*[:=]/i,
];

const textExtensions = new Set([
  '.md', '.txt', '.json', '.jsonl', '.yaml', '.yml', '.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx', '.html', '.css', '.scss', '.env', '.toml', '.ini', '.csv'
]);

function extname(path) {
  const name = path.split('/').pop() || '';
  const dot = name.lastIndexOf('.');
  return dot >= 0 ? name.slice(dot).toLowerCase() : '';
}

let tracked = [];
try {
  tracked = execFileSync('git', ['ls-files'], { encoding: 'utf8' })
    .split('\n')
    .map((x) => x.trim())
    .filter(Boolean);
} catch (error) {
  console.error('Unable to list tracked files with git ls-files.');
  process.exit(2);
}

const violations = [];

for (const path of tracked) {
  if (forbiddenPathPatterns.some((pattern) => pattern.test(path))) {
    violations.push({ path, reason: 'private/local-only path is tracked' });
    continue;
  }

  if (!textExtensions.has(extname(path)) && !['AGENTS.md', 'README.md'].includes(path)) continue;

  let content;
  try {
    content = readFileSync(path, 'utf8');
  } catch {
    continue;
  }

  if (sensitiveKeyPatterns.some((pattern) => pattern.test(content))) {
    violations.push({ path, reason: 'possible sensitive credential/private-data key pattern' });
  }
}

if (violations.length) {
  console.error(`Public-memory boundary audit failed: ${violations.length} potential issue(s).`);
  for (const item of violations) {
    console.error(`- ${item.path}: ${item.reason}`);
  }
  console.error('No secret values are printed by this audit. Review the files manually before publishing.');
  process.exit(1);
}

console.log(`Public-memory boundary audit passed (${tracked.length} tracked files checked).`);
