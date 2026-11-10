import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { getGitShortSha, generateBuildId, injectBuildId } from '../../src/utils/sw_build.js';

describe('Service Worker Build-Time Cache Derivation', () => {
  it('should get git short SHA or fallback dev', () => {
    const sha = getGitShortSha();
    expect(typeof sha).toBe('string');
    expect(sha.length).toBeGreaterThan(0);
  });

  it('should generate build id combining SHA and timestamp', () => {
    const buildId = generateBuildId('abc1234', 1700000000000);
    expect(buildId).toBe('abc1234-1700000000000');
  });

  it('should replace __BUILD_ID__ placeholder in text', () => {
    const template = "const CACHE_NAME = 'rockets-pwa-__BUILD_ID__';";
    const result = injectBuildId(template, 'abc1234-1700000000000');
    expect(result).toBe("const CACHE_NAME = 'rockets-pwa-abc1234-1700000000000';");
  });

  it('should verify public/sw.js contains the __BUILD_ID__ placeholder', () => {
    const swPath = path.resolve(process.cwd(), 'public/sw.js');
    expect(fs.existsSync(swPath)).toBe(true);
    const content = fs.readFileSync(swPath, 'utf-8');
    expect(content).toContain("const CACHE_NAME = 'rockets-pwa-__BUILD_ID__';");
  });

  it('should verify ASSETS_TO_CACHE lists existing files', () => {
    const swPath = path.resolve(process.cwd(), 'public/sw.js');
    const content = fs.readFileSync(swPath, 'utf-8');

    // Extract ASSETS_TO_CACHE array
    const match = content.match(/const ASSETS_TO_CACHE = \[([\s\S]*?)\];/);
    expect(match).not.toBeNull();

    const assets = match[1]
      .split(',')
      .map(s => s.trim().replace(/['"]/g, ''))
      .filter(Boolean);

    expect(assets).toEqual(['./', './index.html', './manifest.json', './icon.svg']);

    // Check files exist in public or project root
    expect(fs.existsSync(path.resolve(process.cwd(), 'index.html'))).toBe(true);
    expect(fs.existsSync(path.resolve(process.cwd(), 'public/manifest.json'))).toBe(true);
    expect(fs.existsSync(path.resolve(process.cwd(), 'public/icon.svg'))).toBe(true);
  });
});
