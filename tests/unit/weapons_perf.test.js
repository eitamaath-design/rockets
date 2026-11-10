import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as THREE from 'three';
import { WeaponsSystem } from '../../src/game/weapons.js';
import { SpaceEnvironment } from '../../src/game/space.js';
import { MeteorSystem } from '../../src/game/meteor.js';
import { GameEngine } from '../../src/game/engine.js';
import { logger } from '../../src/utils/logger.js';
import { audio } from '../../src/game/audio.js';

describe('Weapons & Performance Optimization Suite (Task 4)', () => {
  let scene;

  beforeEach(() => {
    scene = new THREE.Scene();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('1. Laser Material Pooling & Zero Disposal Churn', () => {
    it('should reuse pooled laser beams and avoid calling material.dispose() on firing release', () => {
      const space = new SpaceEnvironment(scene, 101, { voxelQuality: 'low', asteroidCount: 3 });
      const weapons = new WeaponsSystem(scene, space, null);

      const mockShip = {
        position: new THREE.Vector3(0, 80, 3200),
        quaternion: new THREE.Quaternion(),
        velocity: new THREE.Vector3(0, 0, 0),
        isDead: false,
        hasFireLaser: false,
        getForwardVector: () => new THREE.Vector3(0, 0, -1),
        getRightVector: () => new THREE.Vector3(1, 0, 0),
        breakInvisibility: vi.fn()
      };

      // First shot: creates beam
      weapons.triggerPrimary(true, mockShip, 1000);
      expect(weapons.activeLaserBeam).toBeTruthy();
      const initialBeam = weapons.activeLaserBeam;
      const coreMat = initialBeam.coreMat;
      const glowMat = initialBeam.glowMat;

      const disposeSpyCore = vi.spyOn(coreMat, 'dispose');
      const disposeSpyGlow = vi.spyOn(glowMat, 'dispose');

      // Release fire button
      weapons.triggerPrimary(false, mockShip, 1100);
      expect(weapons.activeLaserBeam).toBeNull();

      // Materials MUST NOT be disposed on release! (prevents GPU program cache trashing)
      expect(disposeSpyCore).not.toHaveBeenCalled();
      expect(disposeSpyGlow).not.toHaveBeenCalled();
      expect(weapons._laserBeamPool.length).toBe(1);

      // Second shot: reuses beam from pool
      weapons.triggerPrimary(true, mockShip, 1200);
      expect(weapons.activeLaserBeam).toBe(initialBeam);
      expect(weapons._laserBeamPool.length).toBe(0);

      // Cleanup
      weapons.cleanup();
      expect(disposeSpyCore).toHaveBeenCalled();
      expect(disposeSpyGlow).toHaveBeenCalled();
      space.destroy();
    });
  });

  describe('2. Invariant PointLight Define Stability', () => {
    it('should permanently maintain visible = true across combatFlashLight and meteorLight', () => {
      const space = new SpaceEnvironment(scene, 42, { voxelQuality: 'low', asteroidCount: 2 });
      
      // Invariant: lights must start visible = true with 0 intensity
      expect(space.combatFlashLight.visible).toBe(true);
      expect(space.combatFlashLight.intensity).toBe(0.0);
      expect(space.meteorLight.visible).toBe(true);
      expect(space.meteorLight.intensity).toBe(0.0);

      // Trigger combat flash
      space.triggerCombatFlash(new THREE.Vector3(0, 0, 0), 0xff6600, 4.0);
      expect(space.combatFlashLight.visible).toBe(true);
      expect(space.combatFlashLight.intensity).toBe(4.0);

      // Decay intensity to 0
      space.update(2.0, new THREE.Vector3(0, 80, 3200), new THREE.Vector3());
      expect(space.combatFlashLight.intensity).toBe(0.0);
      expect(space.combatFlashLight.visible).toBe(true);

      // Meteor hazard activation & destruction
      const meteorSys = new MeteorSystem(scene, space, { frequency: 10 });
      meteorSys.spawnMeteor();
      expect(space.meteorLight.visible).toBe(true);
      expect(space.meteorLight.intensity).toBeGreaterThan(0.0);

      meteorSys.destroyMeteor();
      expect(space.meteorLight.intensity).toBe(0.0);
      expect(space.meteorLight.visible).toBe(true);

      meteorSys.cleanup();
      space.destroy();
    });
  });

  describe('3. Shader Pre-Warming & Weapon Material Coverage', () => {
    it('should prewarm shaders without errors and cover all weapon materials', () => {
      const space = new SpaceEnvironment(scene, 7, { voxelQuality: 'low', asteroidCount: 2 });
      const weapons = new WeaponsSystem(scene, space, null);

      const mockRenderer = {
        compile: vi.fn(),
        setPixelRatio: vi.fn(),
        setSize: vi.fn()
      };

      const mockEngine = {
        renderer: mockRenderer,
        scene,
        camera: new THREE.PerspectiveCamera(),
        spaceEnv: space,
        weaponsSystem: weapons,
        prewarmShaders: GameEngine.prototype.prewarmShaders
      };

      // Run pre-warming
      mockEngine.prewarmShaders();
      expect(mockRenderer.compile).toHaveBeenCalledWith(scene, mockEngine.camera);

      // Verify lights invariant is guaranteed in pre-warm
      expect(space.combatFlashLight.visible).toBe(true);
      expect(space.meteorLight.visible).toBe(true);

      weapons.cleanup();
      space.destroy();
    });
  });

  describe('4. Bounding Sphere Reduction Bypass During Combat Hits', () => {
    it('should not execute redundant computeBoundingSphere on 150k vertices during real-time fracture ticks', () => {
      const space = new SpaceEnvironment(scene, 1, { voxelQuality: 'low', asteroidCount: 2 });
      const megaAsteroid = space.asteroids.find(a => a.isMegaAsteroid);
      expect(megaAsteroid).toBeTruthy();

      const mc = megaAsteroid.mc || megaAsteroid.mesh;
      expect(mc.geometry.boundingSphere).toBeTruthy();

      const computeSphereSpy = vi.spyOn(mc.geometry, 'computeBoundingSphere');

      // Execute fracture on mega-asteroid
      const hitPoint = new THREE.Vector3(0, 80, 2800);
      const hitDir = new THREE.Vector3(0, 0, -1);
      space.fractureAsteroid(megaAsteroid, hitPoint, hitDir, 24.0, 16.0, 75.0, false, 5);

      // Verify full geometry vertex reduction was bypassed
      expect(computeSphereSpy).not.toHaveBeenCalled();

      space.destroy();
    });
  });

  describe('5. Idle Audio Churn Suppression', () => {
    it('should not call audio.stopLaserLoop continuously every frame during idle', () => {
      const space = new SpaceEnvironment(scene, 12, { voxelQuality: 'low', asteroidCount: 1 });
      const weapons = new WeaponsSystem(scene, space, null);
      const stopLoopSpy = vi.spyOn(audio, 'stopLaserLoop');

      const mockShip = {
        position: new THREE.Vector3(0, 80, 3200),
        quaternion: new THREE.Quaternion(),
        velocity: new THREE.Vector3(),
        isDead: false,
        getForwardVector: () => new THREE.Vector3(0, 0, -1),
        getRightVector: () => new THREE.Vector3(1, 0, 0)
      };

      // 60 idle frames without ever firing
      for (let i = 0; i < 60; i++) {
        weapons.update(0.016, mockShip, new Map(), vi.fn());
      }

      // Must be 0 calls during idle!
      expect(stopLoopSpy).not.toHaveBeenCalled();

      // Fire weapon
      weapons.triggerPrimary(true, mockShip, 1000);
      weapons.update(0.016, mockShip, new Map(), vi.fn());

      // Stop weapon
      weapons.triggerPrimary(false, mockShip, 1050);
      expect(stopLoopSpy).toHaveBeenCalledTimes(1);

      // Subsequent idle frames should not call stop again
      stopLoopSpy.mockClear();
      for (let i = 0; i < 30; i++) {
        weapons.update(0.016, mockShip, new Map(), vi.fn());
      }
      expect(stopLoopSpy).not.toHaveBeenCalled();

      weapons.cleanup();
      space.destroy();
    });
  });

  describe('6. High-Resolution Diagnostic Telemetry & Profiling', () => {
    it('should record structured [PERF:] telemetry entries and support threshold warnings', () => {
      const space = new SpaceEnvironment(scene, 99, { voxelQuality: 'low', asteroidCount: 2 });
      const weapons = new WeaponsSystem(scene, space, null);

      logger.logs = [];

      const mockShip = {
        position: new THREE.Vector3(0, 80, 3200),
        quaternion: new THREE.Quaternion(),
        velocity: new THREE.Vector3(),
        isDead: false,
        hasFireLaser: false,
        getForwardVector: () => new THREE.Vector3(0, 0, -1),
        getRightVector: () => new THREE.Vector3(1, 0, 0),
        breakInvisibility: vi.fn()
      };

      weapons.triggerPrimary(true, mockShip, 2000);

      const perfLogs = logger.logs.filter(l => l.includes('PERF:'));
      expect(perfLogs.length).toBeGreaterThan(0);

      // Verify specific tags exist
      const hasWeaponFire = perfLogs.some(l => l.includes('triggerPrimary') || l.includes('PERF:WEAPON_FIRE'));
      const hasRaycast = perfLogs.some(l => l.includes('checkRayCollision') || l.includes('PERF:RAYCAST'));
      expect(hasWeaponFire).toBe(true);
      expect(hasRaycast).toBe(true);

      // Verify diagnostic report includes performance profiling section
      const report = logger.generateDiagnosticReport();
      expect(report).toContain('--- Recent Performance & Profiling Telemetry (Last 25 Events) ---');

      weapons.cleanup();
      space.destroy();
    });
  });
});
