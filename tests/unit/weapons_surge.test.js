import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as THREE from 'three';
import { WeaponsSystem, LaserSurgeSystem } from '../../src/game/weapons.js';
import { PlayerShip } from '../../src/game/ship.js';

describe('Continuous Surging Oscillating Laser Energy Particle System (LaserSurgeSystem)', () => {
  let scene;
  let mockSpaceEnv;
  let mockNetwork;
  let weapons;
  let ship;
  let camera;

  beforeEach(() => {
    scene = new THREE.Scene();
    mockSpaceEnv = {
      checkCollision: () => null,
      checkRayCollision: () => null,
      checkRayBlocked: () => false,
      carveAsteroid: () => {}
    };
    mockNetwork = {
      selfId: 'pilot-alpha',
      broadcastLaser: vi.fn(),
      broadcastMissile: vi.fn(),
      broadcastDecoy: vi.fn(),
      broadcastCannon: vi.fn(),
      broadcastMine: vi.fn(),
      sendHitTarget: vi.fn(),
      onLaser: () => () => {},
      onMissile: () => () => {},
      onDecoy: () => () => {},
      onCannon: () => () => {},
      onMine: () => () => {}
    };

    weapons = new WeaponsSystem(scene, mockSpaceEnv, mockNetwork);
    camera = new THREE.PerspectiveCamera();
    camera.position.set(0, 85, 3215);
    camera.quaternion.set(0, 0, 0, 1);
    ship = new PlayerShip(camera, mockSpaceEnv);
    ship.position.set(0, 80, 3200);
    ship.quaternion.set(0, 0, 0, 1);
  });

  afterEach(() => {
    weapons.cleanup();
    vi.restoreAllMocks();
  });

  describe('1. InstancedMesh Specification & Initialization', () => {
    it('should initialize a single-draw-call InstancedMesh with 1024 slots and DynamicDrawUsage', () => {
      const surge = weapons.laserSurgeSystem;
      expect(surge).toBeInstanceOf(LaserSurgeSystem);
      expect(surge.mesh).toBeInstanceOf(THREE.InstancedMesh);
      expect(surge.maxParticles).toBe(1024);
      expect(surge.mesh.count).toBe(1024);
      expect(surge.mesh.frustumCulled).toBe(false);
      expect(surge.mesh.instanceMatrix.usage).toBe(THREE.DynamicDrawUsage);
      expect(surge.mesh.instanceColor.usage).toBe(THREE.DynamicDrawUsage);

      // Verify initial slots are hidden (diagonal scale elements 0)
      const matrix = new THREE.Matrix4();
      surge.mesh.getMatrixAt(0, matrix);
      expect(matrix.elements[0]).toBe(0);
      expect(matrix.elements[5]).toBe(0);
      expect(matrix.elements[10]).toBe(0);
    });
  });

  describe('2. Continuous Surging Quad Generation During Active Laser', () => {
    it('should generate active surging quads along twin beam paths when firing', () => {
      const surge = weapons.laserSurgeSystem;
      expect(surge._prevActiveCount).toBe(0);

      // Fire primary laser
      weapons.triggerPrimary(true, ship, 1000);
      expect(weapons.laserBeams.length).toBe(1);

      // Update weapons system for one frame (dt = 0.016s)
      weapons.update(0.016, ship, new Map(), null, camera);

      // In balanced mode, 64 quads per beam * 2 twin beams = 128 quads
      expect(surge._prevActiveCount).toBe(128);

      // Inspect active quad matrices
      const matrix = new THREE.Matrix4();
      const pos = new THREE.Vector3();
      const rot = new THREE.Quaternion();
      const scale = new THREE.Vector3();

      surge.mesh.getMatrixAt(0, matrix);
      matrix.decompose(pos, rot, scale);

      expect(scale.x).toBeGreaterThan(0);
      expect(scale.y).toBeGreaterThan(0);
      expect(scale.z).toBeGreaterThan(0);

      // Position should be forward of ship (z < 3200)
      expect(pos.z).toBeLessThan(ship.position.z);
    });
  });

  describe('3. Multi-Strand Harmonic Synthesis (Core Solitons & Double-Helix Filaments)', () => {
    it('should place Core Solitons on beam axis and Helical Filaments with transverse offset', () => {
      weapons.triggerPrimary(true, ship, 1000);
      weapons.update(0.016, ship, new Map(), null, camera);

      const surge = weapons.laserSurgeSystem;
      const beam = weapons.laserBeams[0];
      const leftOrigin = beam.leftOrigin;
      const hitPoint = beam.hitPoint;

      const beamDir = new THREE.Vector3().subVectors(hitPoint, leftOrigin).normalize();
      const matrix = new THREE.Matrix4();
      const pos = new THREE.Vector3();
      const rot = new THREE.Quaternion();
      const scale = new THREE.Vector3();

      // Check particle 0 (mode 0 = Core Soliton)
      surge.mesh.getMatrixAt(0, matrix);
      matrix.decompose(pos, rot, scale);
      const toPos0 = new THREE.Vector3().subVectors(pos, leftOrigin);
      const proj0 = toPos0.dot(beamDir);
      const perp0 = new THREE.Vector3().copy(toPos0).addScaledVector(beamDir, -proj0);
      expect(perp0.length()).toBeCloseTo(0, 4); // Core soliton is strictly axial

      // Check particle 1 (mode 1 = Helical Strand A)
      surge.mesh.getMatrixAt(1, matrix);
      matrix.decompose(pos, rot, scale);
      const toPos1 = new THREE.Vector3().subVectors(pos, leftOrigin);
      const proj1 = toPos1.dot(beamDir);
      const perp1 = new THREE.Vector3().copy(toPos1).addScaledVector(beamDir, -proj1);
      expect(perp1.length()).toBeGreaterThan(0.001); // Filament has transverse radial displacement
    });
  });

  describe('4. Multi-Variant Chromatic Modulation', () => {
    it('should assign electric cyan/white palette for standard local laser', () => {
      weapons.triggerPrimary(true, ship, 1000);
      weapons.update(0.016, ship, new Map(), null, camera);

      const surge = weapons.laserSurgeSystem;
      const color = new THREE.Color();

      // Core particle (mode 0) -> white-hot
      surge.mesh.getColorAt(0, color);
      expect(color.r).toBeGreaterThanOrEqual(0.85);
      expect(color.g).toBeGreaterThanOrEqual(0.85);
      expect(color.b).toBeGreaterThanOrEqual(0.95);

      // Filament particle (mode 1) -> vibrant cyan
      surge.mesh.getColorAt(1, color);
      expect(color.b).toBeGreaterThan(color.r);
      expect(color.g).toBeGreaterThan(color.r);
    });

    it('should assign incandescent sun-gold and fiery orange/crimson palette for Fire Laser', () => {
      ship.hasFireLaser = true;
      weapons.triggerPrimary(true, ship, 1000);
      weapons.update(0.016, ship, new Map(), null, camera);

      const surge = weapons.laserSurgeSystem;
      const color = new THREE.Color();

      // Core particle (mode 0) -> sun-gold
      surge.mesh.getColorAt(0, color);
      expect(color.r).toBeCloseTo(1.0, 1);
      expect(color.g).toBeGreaterThan(0.8);

      // Filament Strand A (mode 1) -> blazing orange (r > g > b)
      surge.mesh.getColorAt(1, color);
      expect(color.r).toBeGreaterThan(0.9);
      expect(color.r).toBeGreaterThan(color.b);
    });

    it('should assign hot neon magenta and electric violet palette for remote peer beams', () => {
      weapons.spawnRemoteLaserBeam({
        origin: { x: 10, y: 80, z: 3200 },
        leftOrigin: { x: 8, y: 80, z: 3200 },
        rightOrigin: { x: 12, y: 80, z: 3200 },
        hitPoint: { x: 10, y: 80, z: 2500 },
        isFireLaser: false
      }, 'peer-beta');

      weapons.update(0.016, ship, new Map(), null, camera);

      const surge = weapons.laserSurgeSystem;
      const color = new THREE.Color();

      // Filament Strand A for remote -> magenta (high r, low g, high b)
      surge.mesh.getColorAt(1, color);
      expect(color.r).toBeGreaterThan(0.8);
      expect(color.b).toBeGreaterThan(0.5);
      expect(color.g).toBeLessThan(0.2);
    });
  });

  describe('5. Particle Density Scaling', () => {
    it('should scale quad allocation according to particleDensity setting', () => {
      const surge = weapons.laserSurgeSystem;

      // Balanced (1.0x): 64 per beam * 2 = 128
      weapons.setParticleDensity('balanced');
      weapons.triggerPrimary(true, ship, 1000);
      weapons.update(0.016, ship, new Map(), null, camera);
      expect(surge._prevActiveCount).toBe(128);

      // Low (0.5x): 32 per beam * 2 = 64
      weapons.setParticleDensity('low');
      weapons.update(0.016, ship, new Map(), null, camera);
      expect(surge._prevActiveCount).toBe(64);

      // High (1.5x): 96 per beam * 2 = 192
      weapons.setParticleDensity('high');
      weapons.update(0.016, ship, new Map(), null, camera);
      expect(surge._prevActiveCount).toBe(192);
    });
  });

  describe('6. Immediate Release Teardown & Zero Idle Uploads', () => {
    it('should zero out active quads immediately upon trigger release and skip idle PCIe transfers', () => {
      const surge = weapons.laserSurgeSystem;

      // Start firing
      weapons.triggerPrimary(true, ship, 1000);
      weapons.update(0.016, ship, new Map(), null, camera);
      expect(surge._prevActiveCount).toBe(128);

      // Release fire
      weapons.triggerPrimary(false, ship, 1100);
      weapons.update(0.016, ship, new Map(), null, camera);

      // Should be reset to 0 active
      expect(surge._prevActiveCount).toBe(0);

      // Idle frame: must not trigger PCIe buffer upload (version does not increment)
      const prevMatrixVersion = surge.mesh.instanceMatrix.version;
      const prevColorVersion = surge.mesh.instanceColor.version;

      weapons.update(0.016, ship, new Map(), null, camera);
      expect(surge._prevActiveCount).toBe(0);
      expect(surge.mesh.instanceMatrix.version).toBe(prevMatrixVersion);
      expect(surge.mesh.instanceColor.version).toBe(prevColorVersion);
    });
  });

  describe('7. Boundary Conditions & Safety Guards', () => {
    it('should cleanly skip particle generation when beam distance is degenerate (< 0.5u)', () => {
      const surge = weapons.laserSurgeSystem;

      // Manually push a beam with distance 0.1u
      const dummyBeam = {
        life: 0.28,
        isLocal: true,
        leftOrigin: new THREE.Vector3(0, 0, 0),
        rightOrigin: new THREE.Vector3(0, 0, 0),
        hitPoint: new THREE.Vector3(0, 0, 0.1) // 0.1u < 0.5u
      };

      surge.update(0.016, [dummyBeam], camera);
      expect(surge._prevActiveCount).toBe(0);
    });
  });

  describe('8. Zero Disposal Invariant & Teardown', () => {
    it('should not dispose surge materials during normal firing/release cycles, but cleanly dispose on cleanup', () => {
      const surge = weapons.laserSurgeSystem;
      const mat = surge.material;
      const disposeSpy = vi.spyOn(mat, 'dispose');

      weapons.triggerPrimary(true, ship, 1000);
      weapons.update(0.016, ship, new Map(), null, camera);
      weapons.triggerPrimary(false, ship, 1100);
      weapons.update(0.016, ship, new Map(), null, camera);

      // Firing release must never dispose material
      expect(disposeSpy).not.toHaveBeenCalled();

      // System cleanup must dispose material
      weapons.cleanup();
      expect(disposeSpy).toHaveBeenCalledTimes(1);
    });
  });
});
