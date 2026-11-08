import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { ThrusterTrailSystem, createRadialGlowTexture } from '../../src/game/trail.js';
import { WeaponsSystem } from '../../src/game/weapons.js';
import { SpaceEnvironment } from '../../src/game/space.js';
import { MeteorSystem } from '../../src/game/meteor.js';

describe('GPU InstancedMesh Particle & Explosion Systems', () => {
  let scene;

  beforeEach(() => {
    scene = new THREE.Scene();
  });

  describe('Radial Glow DataTexture Generator', () => {
    it('should generate a valid headless-safe THREE.DataTexture with smooth falloff', () => {
      const tex = createRadialGlowTexture(32);
      expect(tex).toBeInstanceOf(THREE.DataTexture);
      expect(tex.image.width).toBe(32);
      expect(tex.image.height).toBe(32);
      expect(tex.format).toBe(THREE.RGBAFormat);

      const data = tex.image.data;
      expect(data.length).toBe(32 * 32 * 4);

      // Center pixel (15, 15) must be bright and fully opaque
      const centerIdx = (15 * 32 + 15) * 4;
      expect(data[centerIdx + 3]).toBeGreaterThan(200);

      // Corner pixel (0, 0) must be completely transparent (d >= 1.0)
      expect(data[3]).toBe(0);
    });
  });

  describe('ThrusterTrailSystem (Ship Engine Vapor Plumes)', () => {
    let trails;

    beforeEach(() => {
      trails = new ThrusterTrailSystem(scene);
    });

    it('should use single-draw-call THREE.InstancedMesh with DynamicDrawUsage and frustumCulled false', () => {
      expect(trails.mesh).toBeInstanceOf(THREE.InstancedMesh);
      expect(trails.points).toBe(trails.mesh); // Backwards compatibility alias
      expect(trails.mesh.count).toBe(2400);
      expect(trails.mesh.frustumCulled).toBe(false);
      expect(trails.mesh.instanceMatrix.usage).toBe(THREE.DynamicDrawUsage);
      expect(trails.mesh.instanceColor).toBeDefined();
      expect(trails.mesh.instanceColor.usage).toBe(THREE.DynamicDrawUsage);
    });

    it('should perform sub-frame distance interpolation between consecutive emits', () => {
      const p1 = new THREE.Vector3(0, 0, 0);
      const fwd = new THREE.Vector3(0, 0, 1);

      // Initial emission
      trails.emit(p1, fwd, false, 'ship1');
      const count1 = trails.particles.length;
      expect(count1).toBe(1);

      // Second emission 7 units away (should interpolate ~9 intermediate puffs)
      const p2 = new THREE.Vector3(0, 0, 7);
      trails.emit(p2, fwd, false, 'ship1');
      const count2 = trails.particles.length;
      expect(count2).toBeGreaterThan(5);
    });

    it('should decay particles over exactly 15 seconds', () => {
      trails.emit(new THREE.Vector3(10, 0, 0), new THREE.Vector3(1, 0, 0), false, 'ship-decay');
      expect(trails.particles.length).toBe(1);
      const p = trails.particles[0];
      expect(p.maxAge).toBe(15.0);

      // Advance by 14 seconds: still active
      trails.update(14.0);
      expect(trails.particles.length).toBe(1);

      // Advance past 15 seconds: expired and purged
      trails.update(1.2);
      expect(trails.particles.length).toBe(0);
    });

    it('should orient billboard quads toward camera quaternion and apply turbulence', () => {
      trails.emit(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 1), false, 'cam-test');
      const camera = new THREE.PerspectiveCamera();
      camera.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 4);

      trails.update(0.1, camera);

      const mat = new THREE.Matrix4();
      trails.mesh.getMatrixAt(0, mat);
      const pos = new THREE.Vector3();
      const rot = new THREE.Quaternion();
      const scale = new THREE.Vector3();
      mat.decompose(pos, rot, scale);

      expect(rot.y).toBeCloseTo(camera.quaternion.y, 2);
      expect(scale.x).toBeGreaterThan(1.0);
    });

    it('should assign distinct color palettes for player (electric cyan) and hostile (fiery crimson)', () => {
      trails.emit(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 1), false, 'player');
      trails.emit(new THREE.Vector3(10, 0, 0), new THREE.Vector3(0, 0, 1), true, 'hostile');

      trails.update(0.016);

      const playerCol = new THREE.Color();
      const hostileCol = new THREE.Color();
      trails.mesh.getColorAt(0, playerCol);
      trails.mesh.getColorAt(1, hostileCol);

      // Player should be cyan/blue (blue > red)
      expect(playerCol.b).toBeGreaterThan(playerCol.r);
      // Hostile should be orange/red (red > blue)
      expect(hostileCol.r).toBeGreaterThan(hostileCol.b);
    });
  });

  describe('FireTrailSystem & WeaponsSystem Instanced Explosions', () => {
    let weapons;
    let mockSpaceEnv;

    beforeEach(() => {
      mockSpaceEnv = {
        checkCollision: () => null,
        triggerCombatFlash: () => {}
      };
      weapons = new WeaponsSystem(scene, mockSpaceEnv, null);
    });

    it('should configure FireTrailSystem as InstancedMesh with DynamicDrawUsage and frustumCulled false', () => {
      expect(weapons.fireTrails.mesh).toBeInstanceOf(THREE.InstancedMesh);
      expect(weapons.fireTrails.points).toBe(weapons.fireTrails.mesh);
      expect(weapons.fireTrails.points.frustumCulled).toBe(false);
      expect(weapons.fireTrails.mesh.instanceMatrix.usage).toBe(THREE.DynamicDrawUsage);
    });

    it('should support sub-frame distance interpolation for fast-moving missiles', () => {
      const p1 = new THREE.Vector3(0, 0, 0);
      const dir = new THREE.Vector3(0, 0, -1);

      weapons.fireTrails.emit(p1, dir, 2, 'missile-1');
      const initialCount = weapons.fireTrails.particles.length;

      const p2 = new THREE.Vector3(0, 0, -8);
      weapons.fireTrails.emit(p2, dir, 2, 'missile-1');
      expect(weapons.fireTrails.particles.length).toBeGreaterThan(initialCount + 2);
    });

    it('should spawn both backward-compatible multi-stage explosion meshes and GPU InstancedMesh quads', () => {
      const pos = new THREE.Vector3(20, 10, -50);
      weapons.spawnExplosion(pos, 22, 0xff5500);

      // Multi-stage backward-compatible structure
      expect(weapons.explosions.length).toBe(1);
      const exp = weapons.explosions[0];
      expect(exp.fireball.frustumCulled).toBe(false);
      expect(exp.ring.frustumCulled).toBe(false);
      expect(exp.sparks.length).toBeGreaterThanOrEqual(6);

      // GPU Instanced explosion pool
      expect(weapons.explosionMesh).toBeInstanceOf(THREE.InstancedMesh);
      expect(weapons.explosionMesh.frustumCulled).toBe(false);
      expect(weapons.explosionQuads.length).toBeGreaterThanOrEqual(45);
    });

    it('should spawn laser impact sparks when laser hits targets', () => {
      const pos = new THREE.Vector3(10, 0, 0);
      weapons.spawnLaserImpactSparks(pos, new THREE.Vector3(0, 1, 0), 0x00d4ff);
      expect(weapons.explosionQuads.length).toBeGreaterThanOrEqual(12);

      const spark = weapons.explosionQuads[0];
      expect(spark.vel.length()).toBeGreaterThan(20);
      expect(spark.life).toBeLessThan(0.6);
    });

    it('should update and billboard instanced explosion quads in weaponsSystem.update', () => {
      weapons.spawnExplosion(new THREE.Vector3(0, 0, 0), 16, 0xff7700);
      const camera = new THREE.PerspectiveCamera();
      camera.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), 0.5);

      const initialCount = weapons.explosionQuads.length;
      weapons.update(0.016, { isDead: false, position: new THREE.Vector3(0, 0, 0) }, new Map(), null, camera);

      expect(weapons.explosionQuads.length).toBe(initialCount);
      const mat = new THREE.Matrix4();
      weapons.explosionMesh.getMatrixAt(0, mat);
      const pos = new THREE.Vector3();
      const rot = new THREE.Quaternion();
      const scale = new THREE.Vector3();
      mat.decompose(pos, rot, scale);
      expect(scale.x).toBeGreaterThan(0.5);
    });
  });

  describe('SpaceEnvironment Rock Debris & Flash Instancing', () => {
    let space;

    beforeEach(() => {
      space = new SpaceEnvironment(scene, 'particle-seed', { voxelQuality: 'low' });
    });

    it('should create pre-allocated debrisMesh and debrisFlashMesh with DynamicDrawUsage and frustumCulled false', () => {
      expect(space.debrisMesh).toBeInstanceOf(THREE.InstancedMesh);
      expect(space.debrisMesh.count).toBe(400);
      expect(space.debrisMesh.frustumCulled).toBe(false);
      expect(space.debrisMesh.instanceMatrix.usage).toBe(THREE.DynamicDrawUsage);

      expect(space.debrisFlashMesh).toBeInstanceOf(THREE.InstancedMesh);
      expect(space.debrisFlashMesh.count).toBe(400);
      expect(space.debrisFlashMesh.frustumCulled).toBe(false);
      expect(space.debrisFlashMesh.instanceMatrix.usage).toBe(THREE.DynamicDrawUsage);
    });

    it('should populate debrisList and update instanced transforms during space.update', () => {
      const hitPoint = new THREE.Vector3(50, 0, 0);
      const hitDir = new THREE.Vector3(1, 0, 0);
      space.spawnRockDebris(hitPoint, hitDir, 16);

      expect(space.debrisList.length).toBe(16);
      expect(space.debrisList[0].pos).toBeDefined();
      expect(space.debrisList[0].vel.length()).toBeGreaterThan(10);

      const camera = new THREE.PerspectiveCamera();
      space.update(0.016, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), camera);

      const mat = new THREE.Matrix4();
      space.debrisMesh.getMatrixAt(0, mat);
      const pos = new THREE.Vector3();
      mat.decompose(pos, new THREE.Quaternion(), new THREE.Vector3());
      expect(pos.x).toBeCloseTo(hitPoint.x + space.debrisList[0].vel.x * 0.016, 1);
    });
  });

  describe('MeteorSystem Fiery Trail & Impact Explosions', () => {
    let meteorSystem;

    beforeEach(() => {
      const mockEnv = {
        asteroids: [],
        meteorLight: new THREE.PointLight(),
        triggerCombatFlash: () => {}
      };
      meteorSystem = new MeteorSystem(scene, mockEnv);
    });

    it('should use InstancedMesh for trailMesh and explosionMesh with DynamicDrawUsage and frustumCulled false', () => {
      expect(meteorSystem.trailMesh).toBeInstanceOf(THREE.InstancedMesh);
      expect(meteorSystem.trailPoints).toBe(meteorSystem.trailMesh);
      expect(meteorSystem.trailMesh.frustumCulled).toBe(false);
      expect(meteorSystem.trailMesh.instanceMatrix.usage).toBe(THREE.DynamicDrawUsage);

      expect(meteorSystem.explosionMesh).toBeInstanceOf(THREE.InstancedMesh);
      expect(meteorSystem.explosionMesh.frustumCulled).toBe(false);
      expect(meteorSystem.explosionMesh.instanceMatrix.usage).toBe(THREE.DynamicDrawUsage);
    });

    it('should trigger instanced explosion burst without standalone requestAnimationFrame loop', () => {
      const pos = new THREE.Vector3(100, 20, -100);
      meteorSystem.triggerExplosion(pos, 32, 0xff4400);

      expect(meteorSystem.explosionQuads.length).toBe(60);
      expect(meteorSystem.explosionQuads[0].vel.length()).toBeGreaterThan(30);

      // Update frame with camera
      const camera = new THREE.PerspectiveCamera();
      meteorSystem.update(0.016, null, null, null, camera);

      const mat = new THREE.Matrix4();
      meteorSystem.explosionMesh.getMatrixAt(0, mat);
      const scale = new THREE.Vector3();
      mat.decompose(new THREE.Vector3(), new THREE.Quaternion(), scale);
      expect(scale.x).toBeGreaterThan(1.0);
    });
  });
});
