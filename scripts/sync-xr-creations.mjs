// XR Creations is authored in xr-works. This repository carries only a verified
// static release so the existing public domain can host it without another
// source fork or a new hosting account.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const release = JSON.parse(fs.readFileSync(path.join(root, '.github/xr-creations-source.json'), 'utf8'));
if (release.repository !== 'ewanqian/xr-works' || !/^[0-9a-f]{40}$/.test(release.ref)) throw new Error('Invalid XR source pin');
const source = path.resolve(process.argv[2] || path.join(root, '.xr-creations-source'));
const sha = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: source, encoding: 'utf8' }).trim();
if (sha !== release.ref) throw new Error(`XR source mismatch: expected ${release.ref}, received ${sha}`);
const dirty = execFileSync('git', ['status', '--porcelain', '--untracked-files=normal'], { cwd: source, encoding: 'utf8' }).trim();
if (dirty) throw new Error('XR source must be a clean checkout of the pinned commit');
execFileSync(process.execPath, ['scripts/check-site.mjs'], { cwd: source, stdio: 'inherit' });
execFileSync(process.execPath, ['scripts/build-site.mjs'], { cwd: source, stdio: 'inherit' });
const built = path.join(source, 'dist');
const manifest = JSON.parse(fs.readFileSync(path.join(built, 'release.json'), 'utf8'));
if (manifest.sourceCommit !== release.ref) throw new Error('XR build provenance mismatch');
for (const relative of ['xr-creations', 'portfolio/xr-creations']) {
  const target = path.join(root, relative);
  fs.rmSync(target, { recursive: true, force: true });
  fs.cpSync(built, target, { recursive: true });
}
console.log(`Published XR Creations static snapshot: ${release.repository}@${sha}`);
