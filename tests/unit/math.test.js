import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { createPRNG, hashString, clamp, lerp, distSq } from '../../src/utils/math.js';

describe('Math & PRNG Utilities', () => {
  it('should generate identical sequence for identical seeds (determinism)', () => {
    const prng1 = createPRNG('alpha-seed-42');
    const prng2 = createPRNG('alpha-seed-42');

    const seq1 = [prng1(), prng1(), prng1(), prng1(), prng1()];
    const seq2 = [prng2(), prng2(), prng2(), prng2(), prng2()];

    expect(seq1).toEqual(seq2);
  });

  it('should generate different sequence for different seeds', () => {
    const prng1 = createPRNG('seed-A');
    const prng2 = createPRNG('seed-B');

    const val1 = prng1();
    const val2 = prng2();

    expect(val1).not.toBe(val2);
  });

  it('should clamp values properly', () => {
    expect(clamp(15, 0, 10)).toBe(10);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('should compute linear interpolation correctly', () => {
    expect(lerp(0, 100, 0.5)).toBe(50);
    expect(lerp(10, 20, 0.25)).toBe(12.5);
  });

  it('should calculate squared distance accurately', () => {
    const v1 = new THREE.Vector3(0, 0, 0);
    const v2 = new THREE.Vector3(3, 4, 0);
    expect(distSq(v1, v2)).toBe(25);
  });
});
