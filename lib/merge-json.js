import { promises as fs } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { homedir } from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function isObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

export function deepMerge(target, source) {
  const output = { ...(target || {}) };
  if (isObject(target) && isObject(source)) {
    for (const key of Object.keys(source)) {
      if (isObject(source[key])) {
        output[key] = deepMerge(output[key], source[key]);
      } else {
        output[key] = source[key];
      }
    }
  }
  return output;
}

export async function readJsonSafe(path) {
  try {
    const raw = await fs.readFile(path, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export async function backupIfExists(path, fsImpl = fs) {
  try {
    await fsImpl.access(path);
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `${path}.bak-${stamp}`;
    const content = await fsImpl.readFile(path, 'utf-8');
    await fsImpl.writeFile(backupPath, content, 'utf-8');
    return backupPath;
  } catch {
    return null;
  }
}

export async function writeJsonPretty(path, data) {
  await fs.mkdir(dirname(path), { recursive: true });
  await fs.writeFile(path, JSON.stringify(data, null, 2), 'utf-8');
}


