import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

export function getGitShortSha() {
  try {
    return execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();
  } catch (e) {
    return 'dev';
  }
}

export function generateBuildId(gitSha = getGitShortSha(), timestamp = Date.now()) {
  return `${gitSha}-${timestamp}`;
}

export function injectBuildId(content, buildId) {
  return content.replace(/__BUILD_ID__/g, buildId);
}

export function swBuildPlugin() {
  return {
    name: 'sw-build-id',
    closeBundle() {
      const swPath = path.resolve('dist', 'sw.js');
      if (fs.existsSync(swPath)) {
        const content = fs.readFileSync(swPath, 'utf-8');
        const buildId = generateBuildId();
        const updated = injectBuildId(content, buildId);
        fs.writeFileSync(swPath, updated, 'utf-8');
      }
    }
  };
}
