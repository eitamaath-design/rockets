import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { RemoteShip } from '../../src/game/remoteShip.js';

describe('Distant Celestial Star-Glow Beacon for Remote Ships', () => {
  let scene;
  let camera;
  let remote;

  beforeEach(() => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 12000);
    camera.position.set(0, 0, 0);
    remote = new RemoteShip('peer-glow-1', scene, 'StarGlowPilot');
  });

  it('should create a dedicated star-glow mesh with AdditiveBlending and depthWrite: false', () => {
    expect(remote.starGlowMesh).toBeInstanceOf(THREE.Mesh);
    expect(remote.starGlowMesh.material.blending).toBe(THREE.AdditiveBlending);
    expect(remote.starGlowMesh.material.depthWrite).toBe(false);
    expect(remote.starGlowMesh.material.transparent).toBe(true);
  });

  it('should fade out star glow completely at close range (<= 100u)', () => {
    remote.position.set(0, 0, 80);
    remote.update(0.016, camera);

    expect(remote.starGlowMesh.material.opacity).toBe(0.0);
  });

  it('should smoothly transition / fade in glow between 100u and 200u', () => {
    remote.position.set(0, 0, 150);
    remote.update(0.016, camera);

    expect(remote.starGlowMesh.material.opacity).toBeGreaterThan(0.0);
    expect(remote.starGlowMesh.material.opacity).toBeLessThan(0.95);
  });

  it('should scale and brighten star glow at standoff and far distances (> 200u to 4000u+)', () => {
    // Standoff range (500u)
    remote.position.set(0, 0, 500);
    remote.update(0.016, camera);
    const opacity500 = remote.starGlowMesh.material.opacity;
    const scale500 = remote.starGlowMesh.scale.x;

    expect(opacity500).toBeCloseTo(0.95, 2);
    expect(scale500).toBeGreaterThan(8.0);

    // Extreme deep space range (4000u)
    remote.position.set(0, 0, 4000);
    remote.update(0.016, camera);
    const scale4000 = remote.starGlowMesh.scale.x;

    expect(scale4000).toBeGreaterThan(scale500);
  });

  it('should hide star glow when ship is cloaked (isInvisible = true)', () => {
    remote.position.set(0, 0, 1000);
    remote.isInvisible = true;
    remote.update(0.016, camera);

    expect(remote.starGlowMesh.visible).toBe(false);
    expect(remote.starGlowMesh.material.opacity).toBe(0.0);
  });

  it('should hide star glow when ship is destroyed (isDead = true)', () => {
    remote.position.set(0, 0, 1000);
    remote.isDead = true;
    remote.update(0.016, camera);

    expect(remote.starGlowMesh.visible).toBe(false);
    expect(remote.starGlowMesh.material.opacity).toBe(0.0);
  });

  it('should have strictly controlled heap allocations during update', () => {
    remote.position.set(0, 0, 1500);
    
    // Warm up
    for (let i = 0; i < 50; i++) {
      remote.update(0.016, camera);
    }

    if (global.gc) {
      global.gc();
    }

    const initialHeap = process.memoryUsage().heapUsed;
    
    for (let i = 0; i < 1000; i++) {
      remote.update(0.016, camera);
    }

    const finalHeap = process.memoryUsage().heapUsed;
    // Allow up to 4MB for V8 runtime and test runner framework overhead during 1000 iterations
    expect(finalHeap - initialHeap).toBeLessThan(4 * 1024 * 1024);
  });
});
